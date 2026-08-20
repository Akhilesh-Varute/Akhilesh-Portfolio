import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
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
  cursor: 'grab',
};

interface TrackFlow {
  title: string;
  meta: string;
  labels: { start: string; mid: string; gate: string; ok: string; fail: string };
  chat: { from: string; text: string }[];
}

const tracks: TrackFlow[] = [
  {
    title: 'Cloud Architecture',
    meta: 'AWS · LIVE',
    labels: { start: 'PROMPT', mid: 'DESIGN', gate: 'GATE PASSES?', ok: 'SHIP', fail: 'REWORK' },
    chat: [
      { from: 'you', text: 'Validate the CostBot tool-call payload before it hits Bedrock.' },
      { from: 'gate', text: 'On it — schema check against ToolDefinition, then execute.' },
      { from: 'gate', text: 'Schema passed — shipping.' },
    ],
  },
  {
    title: 'AI Guardrails',
    meta: 'AGENTIC-GATE · DAILY',
    labels: { start: 'TOOL CALL', mid: 'SCHEMA', gate: 'ARGS VALID?', ok: 'EXECUTE', fail: 'REJECT' },
    chat: [
      { from: 'you', text: 'LLM wants to call resetCircuit with a malformed toolName.' },
      { from: 'gate', text: 'safeParse against the Zod schema first.' },
      { from: 'gate', text: 'Validation failed — refusing before it touches real systems.' },
    ],
  },
  {
    title: 'Automation',
    meta: 'CLOUDFORMATION · LIVE',
    labels: { start: 'TEMPLATE', mid: 'PLAN', gate: 'DRIFT DETECTED?', ok: 'DEPLOY', fail: 'ROLLBACK' },
    chat: [
      { from: 'you', text: 'Provision the client environment from the CFN template.' },
      { from: 'gate', text: 'Diffing against current stack state.' },
      { from: 'gate', text: 'No drift — deploying to ECS Fargate.' },
    ],
  },
  {
    title: 'Backend Systems',
    meta: 'NODE · PYTHON',
    labels: { start: 'REQUEST', mid: 'SERVICE', gate: 'CACHE HIT?', ok: 'RESPOND', fail: 'QUERY DB' },
    chat: [
      { from: 'you', text: 'GET /cost-report for tenant 4471.' },
      { from: 'gate', text: 'Checking Redis first.' },
      { from: 'gate', text: 'Hit — responding in 4ms.' },
    ],
  },
];

const buildNodes = (t: TrackFlow): Node[] => [
  { id: 'brief', position: { x: 0, y: 40 }, data: { label: t.labels.start }, style: boxStyle },
  { id: 'design', position: { x: 190, y: 40 }, data: { label: t.labels.mid }, style: boxStyle },
  { id: 'validate', type: 'diamond', position: { x: 400, y: -5 }, data: { label: t.labels.gate } },
  {
    id: 'ship',
    position: { x: 620, y: 40 },
    data: { label: t.labels.ok },
    style: { ...boxStyle, background: 'hsl(var(--primary))' },
  },
  { id: 'rework', position: { x: 400, y: 190 }, data: { label: t.labels.fail }, style: boxStyle },
];

const buildEdges = (): Edge[] => [
  { id: 'e1', source: 'brief', target: 'design', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e2', source: 'design', target: 'validate', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
  { id: 'e3', source: 'validate', sourceHandle: 'ok', target: 'ship', animated: true, label: 'OK', style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e4', source: 'validate', sourceHandle: 'no', target: 'rework', animated: true, label: 'NO', style: { stroke: 'hsl(var(--destructive))' } },
  { id: 'e5', source: 'rework', target: 'design', animated: true, style: { stroke: 'hsl(var(--foreground))' } },
];

const nodeTypes = { diamond: DiamondNode };

const WorkspacePanel = () => {
  const [active, setActive] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const track = tracks[active];

  const [nodes, setNodes, onNodesChange] = useNodesState(buildNodes(tracks[0]));
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges());

  // Switching tracks rebuilds the diagram (new labels, positions reset —
  // any dragging you did on the previous track doesn't carry over).
  useEffect(() => {
    setNodes(buildNodes(track));
    setEdges(buildEdges());
    setMsgIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setMsgIndex((i) => (i + 1) % track.chat.length), 2600);
    return () => clearInterval(id);
  }, [reduceMotion, track]);

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
          <p className="px-4 mt-4 font-mono text-[10px] text-muted-foreground leading-relaxed">
            Drag the blocks on the canvas — each track loads its own run.
          </p>
        </div>

        <div className="relative dot-grid h-[420px] overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
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
                  key={`${active}-${msgIndex}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-xs leading-relaxed"
                >
                  {track.chat[msgIndex].text}
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
