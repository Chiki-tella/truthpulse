'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Node, Link } from '../types/graph';

interface SimulationGraphProps {
  nodes: Node[];
  links: Link[];
}

const SimulationGraph: React.FC<SimulationGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  // Keep a ref to the simulation so we can update it
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  useEffect(() => {
    const observeTarget = containerRef.current;
    if (!observeTarget) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(observeTarget);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    // Clear previous
    svg.selectAll("*").remove();

    // Create a container group for zoom/pan
    const g = svg.append("g");

    // Add zoom capabilities
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
      
    svg.call(zoom);
    // Center initially
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2));

    // Colors & Glow based on node type and status
    const getNodeColor = (d: Node) => {
      if (d.infected) return "#ef4444"; // red-500
      switch (d.type) {
        case 'fact-checker': return "#22c55e"; // green-500
        case 'skeptical': return "#94a3b8"; // slate-400
        default: return "#3b82f6"; // blue-500
      }
    };

    // Draw links
    const link = g.append("g")
      .attr("stroke", "#334155")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    // Draw nodes
    const node = g.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => getNodeColor(d))
      .attr("class", d => d.infected ? "infected-node" : "")
      // We can add glow filters in CSS using drop-shadow or SVG defs. 
      // For performance, we'll rely on CSS animations for infected nodes.
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    node.append("title")
      .text(d => `${d.id} (${d.type})`);

    // Setup force simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(30))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(0, 0))
      .force("collide", d3.forceCollide<Node>().radius(d => d.radius + 2).iterations(2));

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
    });

    simulationRef.current = simulation;

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, Node>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions]); // We re-init simulation completely if dimensions change significantly, but normally we wouldn't. For MVP it's okay.

  // Update node colors and effects dynamically without restarting physics
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    
    // Smoothly transition fill and attributes
    svg.selectAll<SVGCircleElement, Node>("circle")
      .data(nodes, d => d.id)
      .transition()
      .duration(300)
      .attr("fill", d => {
        if (d.infected) return "#ef4444";
        switch (d.type) {
          case 'fact-checker': return "#22c55e";
          case 'skeptical': return "#94a3b8";
          default: return "#3b82f6";
        }
      })
      .attr("class", d => d.infected ? "infected-node" : "");
      
  }, [nodes]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] bg-slate-950/80 rounded-xl border border-white/10 overflow-hidden relative shadow-2xl">
      {/* Decorative scanning line or grid can be added here */}
      <div className="absolute inset-0 pointer-events-none grid-bg opacity-20"></div>
      
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default SimulationGraph;
