'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import StatsPanel from '../components/StatsPanel';
import ControlPanel from '../components/ControlPanel';
import Legend from '../components/Legend';
import SimulationGraph from '../components/SimulationGraph';
import { generateMockNetwork } from '../lib/graphGenerator';
import { runSimulationStep } from '../lib/simulationLogic';
import { Node, Link } from '../types/graph';
import { motion } from 'framer-motion';

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [factCheckingEnabled, setFactCheckingEnabled] = useState(false);
  const [spreadSpeed, setSpreadSpeed] = useState(1.0);
  
  const [totalNodes, setTotalNodes] = useState(0);
  const [infectedNodesCount, setInfectedNodesCount] = useState(0);
  const [spreadRate, setSpreadRate] = useState(0);

  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize network
  const initNetwork = useCallback(() => {
    const { nodes: initialNodes, links: initialLinks } = generateMockNetwork(150);
    setNodes(initialNodes);
    setLinks(initialLinks);
    setTotalNodes(initialNodes.length);
    setInfectedNodesCount(0);
    setSpreadRate(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    initNetwork();
  }, [initNetwork]);

  // Infect a random normal node
  const handleInfectRandom = useCallback(() => {
    setNodes(currentNodes => {
      const newNodes = currentNodes.map(n => ({ ...n }));
      const normalNodes = newNodes.filter(n => !n.infected && n.type === 'normal');
      if (normalNodes.length > 0) {
        const target = normalNodes[Math.floor(Math.random() * normalNodes.length)];
        target.infected = true;
      } else if (newNodes.length > 0) {
        // Fallback if no normal nodes are available
        const target = newNodes[Math.floor(Math.random() * newNodes.length)];
        target.infected = true;
      }
      
      const infectedCount = newNodes.filter(n => n.infected).length;
      setInfectedNodesCount(infectedCount);
      return newNodes;
    });
    setIsRunning(true);
  }, []);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
      return;
    }

    // Tick speed based on spreadSpeed. base is 1000ms. If speed is 2.0, it ticks every 500ms
    const tickInterval = 1000 / Math.max(0.1, spreadSpeed);

    simulationIntervalRef.current = setInterval(() => {
      setNodes(currentNodes => {
        const { newNodes, newInfections } = runSimulationStep(
          currentNodes,
          links,
          spreadSpeed,
          factCheckingEnabled
        );
        
        const currentInfectedCount = newNodes.filter(n => n.infected).length;
        setInfectedNodesCount(currentInfectedCount);
        setSpreadRate(newInfections);
        
        // Stop if everyone is infected or no one is
        if (currentInfectedCount === 0 || currentInfectedCount === currentNodes.length) {
          setIsRunning(false);
        }
        
        return newNodes;
      });
    }, tickInterval);

    return () => {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, [isRunning, spreadSpeed, factCheckingEnabled, links]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-950 text-slate-50">
      <Header />
      
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 z-10">
        {/* Left Column: Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-3 flex flex-col h-[calc(100vh-140px)]"
        >
          <SimulationGraph nodes={nodes} links={links} />
        </motion.div>

        {/* Right Column: Controls & Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 overflow-y-auto pr-2 pb-8"
        >
          <StatsPanel 
            totalNodes={totalNodes} 
            infectedNodes={infectedNodesCount} 
            spreadRate={spreadRate} 
          />
          
          <ControlPanel 
            isRunning={isRunning}
            factCheckingEnabled={factCheckingEnabled}
            spreadSpeed={spreadSpeed}
            onToggleSimulation={() => setIsRunning(!isRunning)}
            onReset={initNetwork}
            onToggleFactChecking={() => setFactCheckingEnabled(!factCheckingEnabled)}
            onSpeedChange={setSpreadSpeed}
            onInfectRandom={handleInfectRandom}
          />
          
          <Legend />
          
          <div className="mt-auto pt-6 text-xs text-slate-500 border-t border-slate-800/50">
            <p>
              <strong>TruthPulse Engine</strong> visualizes the rapid spread of digital misinformation. 
              Nodes represent users, and links are social connections.
            </p>
          </div>
        </motion.div>
      </main>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
