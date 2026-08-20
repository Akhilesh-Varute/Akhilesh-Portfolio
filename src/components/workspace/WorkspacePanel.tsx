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

const DiamondNode = ({ data }: NodeProps) => (
  <div className="relative w-[110px] h-[110px] flex items-center justify-center">
    <div className="absolute inset-0 rotate-45 border-2 border-foreground bg-background" />
    <Handle type="target" position={Position.Left} className="!bg-foreground !border-none" />
    <span className="relative font-mono text-[11px] font-semibold text-center leading-tight px-3">
      {data.label as string}
    </span>
    <Handle type="source" position={Position.Right} id="ok" className="!bg-foreground !border-none" />
    <Handle type="source" position={Position.Bottom} id="no" className="!bg-foreground !border-none" />
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
};

const nodes: Node[] = [
  { id: 'brief', position: { x: 0, y: 40 }, data: { label: 'PROMPT' }, style: boxStyle, draggable: false },
  { id: 'design', position: { x: 190, y: 40 }, data: { label: 'DESIGN' }, style: boxStyle, draggable: false },
  { id: 'validate', type: 'diamond', position: { x: 400, y: -5 }, data: { label: 'GATE PASSES?' }, draggable: false },
  { id: 'ship', position: { x: 620, y: 40 }, data: { label: 'SHIP' }, style: { ...boxStyle, background: 'hsl(var(--primary))' }, draggable: false },
  { id: 'rework', position: { x: 400, y: 190 }, data: { label: 'REWORK' }, style: boxStyle, draggable: false },
];

const edges: Edge[] = [
  { id: 'e1', source: 'brief', target: 'design', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e2', source: 'design', target: 'validate', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e3', source: 'validate', sourceHandle: 'ok', target: 'ship', animated: true, label: 'OK', style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e4', source: 'validate', sourceHandle: 'no', target: 'rework', animated: true, label: 'NO', style: { stroke: 'hsl(var(--destructive))' } },
  { id: 'e5', source: 'rework', target: 'design', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
];

const tracks = [
  { title: 'Cloud Architecture', meta: 'AWS · LIVE' },
  { title: 'AI Guardrails', meta: 'AGENTIC-GATE · DAILY' },
  { title: 'Automation', meta: 'CLOUDFORMATION · LIVE' },
  { title: 'Backend Systems', meta: 'NODE · PYTHON' },
];

const chatMessages = [
  { from: 'you', text: 'Validate the CostBot tool-call payload before it hits Bedrock.' },
  { from: 'gate', text: 'On it — schema check against ToolDefinition, then execute.' },
  { from: 'gate', text: 'Schema passed — shipping.' },
];

const WorkspacePanel = () => {
  const [active, setActive] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % chatMessages.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="panel">
      <div className="panel-topbar justify-between">
        <span>Portfolio / Workspace / Workspace</span>
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
        </div>

        <div className="relative dot-grid h-[420px] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={{ diamond: DiamondNode }}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            proOptions={{ hideAttribution: true }}
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
      </div>
    </div>
  );
};

export default WorkspacePanel;
