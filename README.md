# 🌐 TruthPulse

<p align="center">
  <em>An interactive Fake News Propagation Simulator demonstrating how misinformation spreads through digital social networks.</em>
</p>

---

## 🛑 The Problem
In the modern digital age, **misinformation spreads faster than truth.** On social platforms, fake news propagates rapidly through complex network topologies, driven by highly connected influencers and echo chambers. Understanding *how* this contagion spreads—and how interventions like fact-checking alter its course—is incredibly difficult to visualize and comprehend through raw data alone. 

## 💡 The Solution
**TruthPulse** is a live, cinematic, interactive monitoring system that simulates the viral propagation of fake news. 

By utilizing a physics-based, force-directed graph representation of a social network, TruthPulse allows users to observe a digital outbreak in real-time. It provides interactive controls to manipulate the speed of the spread, trigger randomized outbreaks, and deploy "fact-checkers" into the network to visualize how interventions suppress the spread of misinformation.

---

## ⚡ Features

### 🧠 Probabilistic Simulation Engine
The core of TruthPulse is built on a realistic contagion model. Nodes in the network have different innate behaviors:
- **🔵 Normal Users:** Standard nodes that consume and share information at an average rate.
- **🟡 Influencers:** Highly connected central nodes with massive reach and a high probability of spreading information rapidly.
- **⚪ Skeptics:** Users who are highly resistant to fake news and act as natural buffers against the spread.
- **🟢 Fact-Checkers:** Special intervention nodes that can "heal" their infected neighbors, effectively suppressing the misinformation outbreak.

### 🕸️ Interactive D3.js Graph
- Powered by a `d3-force` simulation to mimic organic, scale-free social networks.
- Draggable nodes with smooth physics.
- Real-time CSS animations and glowing effects as nodes become infected (🔴).

### 🎛️ Live Control Center
- **Start/Pause:** Freeze the simulation to analyze the current state of the network.
- **Start Outbreak:** Patient Zero injection—infect a random normal node to trigger the cascade.
- **Spread Speed:** A real-time slider to accelerate or decelerate the simulation ticks.
- **Enable Fact-Checking:** Deploy fact-checkers into the network to actively fight the outbreak.

### 📊 Real-Time Analytics
A glassmorphism-styled dashboard built with Framer Motion provides live telemetry:
- Total Network Size
- Active Infections
- Network Infection Percentage
- Real-time Spread Rate (infections/sec)

---

## 🛠️ Technology Stack

TruthPulse is a modern, frontend-only MVP engineered for speed and visual polish:
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Visualization:** [D3.js](https://d3js.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

To run this simulation locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/Chiki-tella/truthpulse.git
cd truthpulse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Monitor the Network
Open [http://localhost:3000](http://localhost:3000) in your browser. 
Click **"Start Outbreak"** on the control panel to unleash the contagion and watch it spread.

---

## 🎨 Design Philosophy
TruthPulse was designed to look and feel like a highly classified, real-time cyber monitoring terminal. It utilizes a deep dark-mode palette, neon-glowing accents, and sleek typography (`Satoshi` and `Space Grotesk`) to invoke a cinematic, "mission control" aesthetic.
