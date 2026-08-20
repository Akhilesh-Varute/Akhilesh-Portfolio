import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SchemaValidatorScene from './SchemaValidatorScene';
import DeployPipelineScene from './DeployPipelineScene';
import SequenceDiagramScene from './SequenceDiagramScene';

const DiamondNode = ({ data }: NodeProps) => (
  <div className="relative w-[100px] h-[100px] flex items-center justify-center">
    <div className="absolute inset-0 rotate-45 border-2 border-foreground bg-background" />
    <Handle type="target" position={Position.Left} className="!bg-foreground !border-none" />
    <span className="relative font-mono text-[10px] font-semibold text-center leading-tight px-3">
      {data.label as string}
    </span>
    <Handle type="source" position={Position.Top} id="a" className="!bg-foreground !border-none" />
    <Handle type="source" position={Position.Bottom} id="b" className="!bg-foreground !border-none" />
  </div>
);

const boxStyle = {
  background: 'hsl(var(--background))',
  border: '2px solid hsl(var(--foreground))',
  borderRadius: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  fontWeight: 600,
  padding: '10px 16px',
  cursor: 'grab',
};

// The Cloud Architecture track — a branching system diagram (not just a
// straight row of boxes): a request fans out through EventBridge to two
// parallel consumers and merges back into Bedrock.
const cloudNodes: Node[] = [
  { id: 'req', position: { x: 0, y: 130 }, data: { label: 'REQUEST' }, style: boxStyle },
  { id: 'gw', position: { x: 150, y: 130 }, data: { label: 'API GATEWAY' }, style: boxStyle },
  { id: 'lambda', position: { x: 330, y: 130 }, data: { label: 'LAMBDA' }, style: boxStyle },
  { id: 'bridge', type: 'diamond', position: { x: 490, y: 85 }, data: { label: 'EVENTBRIDGE' } },
  { id: 'security', position: { x: 660, y: 20 }, data: { label: 'AUDIT LOG' }, style: boxStyle },
  { id: 'cost', position: { x: 660, y: 220 }, data: { label: 'METRICS' }, style: boxStyle },
  {
    id: 'bedrock',
    position: { x: 860, y: 130 },
    data: { label: 'BEDROCK' },
    style: { ...boxStyle, background: 'hsl(var(--primary))' },
  },
];

const cloudEdges: Edge[] = [
  { id: 'e1', source: 'req', target: 'gw', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e2', source: 'gw', target: 'lambda', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e3', source: 'lambda', target: 'bridge', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e4', source: 'bridge', sourceHandle: 'a', target: 'security', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e5', source: 'bridge', sourceHandle: 'b', target: 'cost', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e6', source: 'security', target: 'bedrock', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e7', source: 'cost', target: 'bedrock', animated: true, style: { stroke: 'hsl(var(--primary))' } },
];

const nodeTypes = { diamond: DiamondNode };

const chatMessages = [
  { text: 'Validate the tool-call payload before it hits Bedrock.' },
  { text: 'On it — schema check against ToolDefinition, then execute.' },
  { text: 'Schema passed — shipping.' },
];

const CloudFlowScene = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % chatMessages.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="relative h-[420px]">
      <ReactFlow
        nodes={cloudNodes}
        edges={cloudEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={0} color="transparent" />
      </ReactFlow>

      <div className="absolute bottom-4 right-4 w-64 border border-border bg-background shadow-sm">
        <div className="px-3 py-1.5 border-b border-border font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          Chat
        </div>
        <div className="p-3 min-h-[64px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs leading-relaxed"
            >
              {chatMessages[msgIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const tracks = [
  { title: 'Cloud Architecture', meta: 'AWS · LIVE', hint: 'Drag the blocks on the canvas.', Scene: CloudFlowScene },
  { title: 'AI Guardrails', meta: 'AGENTIC-GATE · DAILY', hint: 'Watch each field clear the schema gate.', Scene: SchemaValidatorScene },
  { title: 'Automation', meta: 'CLOUDFORMATION · LIVE', hint: 'A plan → apply run, stage by stage.', Scene: DeployPipelineScene },
  { title: 'Backend Systems', meta: 'NODE · PYTHON', hint: 'A request tracing through the cache path.', Scene: SequenceDiagramScene },
];

const WorkspacePanel = () => {
  const [active, setActive] = useState(0);
  const track = tracks[active];
  const Scene = track.Scene;

  return (
    <div className="panel">
      <div className="panel-topbar justify-between">
        <span>Portfolio / Workspace / {track.title}</span>
        <span className="inline-flex items-center gap-1.5 text-primary">
          <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Ready
        </span>
      </div>

      <div className="grid md:grid-cols-[220px_1fr]">
        <div className="border-r border-border py-4">
          <p className="px-4 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Expertise</p>
          <ul>
            {tracks.map((t, i) => (
              <li key={t.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-2.5 border-l-2 transition-colors ${
                    active === i ? 'border-primary bg-secondary' : 'border-transparent hover:bg-secondary/60'
                  }`}
                >
                  <span className="block font-mono text-sm">{t.title}</span>
                  <span className="block font-mono text-[10px] text-muted-foreground mt-0.5">{t.meta}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="px-4 mt-4 font-mono text-[10px] text-muted-foreground leading-relaxed">{track.hint}</p>
        </div>

        <div className="relative dot-grid overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePanel;
