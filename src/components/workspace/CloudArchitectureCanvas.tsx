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

// A branching system diagram: a request fans out through EventBridge to
// two parallel consumers and merges back into Bedrock.
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

/** Open, borderless flow canvas — no panel/box chrome, sized to sit as a
 * half-column companion next to text rather than its own full section. */
const CloudArchitectureCanvas = () => {
  const [nodes, , onNodesChange] = useNodesState(cloudNodes);
  const [edges, , onEdgesChange] = useEdgesState(cloudEdges);

  return (
    <div className="relative h-[320px] dot-grid">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
        translateExtent={[[-60, -60], [1080, 340]]}
        nodeExtent={[[-60, -60], [1080, 340]]}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={0} color="transparent" />
      </ReactFlow>
    </div>
  );
};

export default CloudArchitectureCanvas;
