import { Node, Link } from '../types/graph';

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export const generateMockNetwork = (nodeCount: number = 100): GraphData => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Define probabilities for node types
  const typeDistribution = {
    normal: 0.7,
    influencer: 0.05,
    skeptical: 0.15,
    'fact-checker': 0.1,
  };

  // Generate nodes
  for (let i = 0; i < nodeCount; i++) {
    const rand = Math.random();
    let type: Node['type'] = 'normal';
    let shareProbability = 0.5;
    let radius = 6;

    if (rand < typeDistribution.influencer) {
      type = 'influencer';
      shareProbability = 0.9;
      radius = 10;
    } else if (rand < typeDistribution.influencer + typeDistribution.skeptical) {
      type = 'skeptical';
      shareProbability = 0.1;
      radius = 5;
    } else if (
      rand <
      typeDistribution.influencer + typeDistribution.skeptical + typeDistribution['fact-checker']
    ) {
      type = 'fact-checker';
      shareProbability = 0.0;
      radius = 8;
    }

    nodes.push({
      id: `node-${i}`,
      type,
      infected: false,
      shareProbability,
      radius,
    });
  }

  // Generate links (preferential attachment / scale-free network approximation)
  nodes.forEach((node, i) => {
    // Influencers connect to many, normal to few, etc.
    let maxConnections = 2;
    if (node.type === 'influencer') maxConnections = 15;
    if (node.type === 'normal') maxConnections = 3;
    if (node.type === 'fact-checker') maxConnections = 5;

    const numConnections = Math.floor(Math.random() * maxConnections) + 1;

    for (let j = 0; j < numConnections; j++) {
      // Connect to a random previous node to create a connected component
      if (i > 0) {
        const targetIdx = Math.floor(Math.random() * i);
        const targetNode = nodes[targetIdx];
        
        // Avoid self-loops and duplicate edges (simple check)
        const linkExists = links.some(
          l => (l.source === node.id && l.target === targetNode.id) || 
               (l.source === targetNode.id && l.target === node.id)
        );

        if (!linkExists && node.id !== targetNode.id) {
          links.push({
            source: node.id,
            target: targetNode.id,
          });
        }
      }
    }
  });

  return { nodes, links };
};
