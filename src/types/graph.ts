export type NodeType = 'normal' | 'influencer' | 'skeptical' | 'fact-checker';

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  type: NodeType;
  infected: boolean;
  shareProbability: number;
  radius: number;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

export interface SimulationState {
  nodes: Node[];
  links: Link[];
  isRunning: boolean;
  infectionRate: number;
  spreadSpeed: number;
  factCheckingEnabled: boolean;
}
