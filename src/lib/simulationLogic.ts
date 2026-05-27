import { Node, Link } from '../types/graph';

export const runSimulationStep = (
  nodes: Node[],
  links: Link[],
  spreadSpeed: number,
  factCheckingEnabled: boolean
): { newNodes: Node[]; newInfections: number } => {
  let newInfections = 0;
  // Create a deep copy to avoid mutating the React state directly in-place
  const newNodes = nodes.map(n => ({ ...n }));
  
  // Find currently infected nodes
  const infectedNodes = newNodes.filter(n => n.infected);
  
  // Create an adjacency list for fast neighbor lookup
  const adjList = new Map<string, string[]>();
  newNodes.forEach(n => adjList.set(n.id, []));
  links.forEach(l => {
    // Links can have source/target as objects if D3 has processed them, or strings if not
    const sourceId = typeof l.source === 'object' ? (l.source as Node).id : l.source as string;
    const targetId = typeof l.target === 'object' ? (l.target as Node).id : l.target as string;
    adjList.get(sourceId)?.push(targetId);
    adjList.get(targetId)?.push(sourceId);
  });

  // Fact-checkers logic: If fact-checking is enabled, fact-checkers can "heal" or "protect" neighbors
  if (factCheckingEnabled) {
    const factCheckers = newNodes.filter(n => n.type === 'fact-checker');
    factCheckers.forEach(fc => {
      const neighbors = adjList.get(fc.id) || [];
      neighbors.forEach(neighborId => {
        const neighbor = newNodes.find(n => n.id === neighborId);
        // Fact checkers cure infected neighbors with a certain probability
        if (neighbor && neighbor.infected && Math.random() < 0.4) {
          neighbor.infected = false;
        }
      });
    });
  }

  // Infection spread logic
  infectedNodes.forEach(infectedNode => {
    const neighbors = adjList.get(infectedNode.id) || [];
    
    neighbors.forEach(neighborId => {
      const neighbor = newNodes.find(n => n.id === neighborId);
      if (neighbor && !neighbor.infected) {
        // Base probability modified by spreadSpeed and neighbor's innate shareProbability
        const attackRate = infectedNode.shareProbability * spreadSpeed;
        const defenseRate = 1 - neighbor.shareProbability; // Skeptics have low shareProbability (0.1), so defense is 0.9
        
        // Final probability to get infected
        const infectProb = attackRate * (1 - defenseRate * 0.8);

        if (Math.random() < infectProb) {
          neighbor.infected = true;
          newInfections++;
        }
      }
    });
  });

  return { newNodes, newInfections };
};
