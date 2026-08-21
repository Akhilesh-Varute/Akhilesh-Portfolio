import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const ContainerNode = ({ data }: NodeProps) => (
  <div
    className="w-full h-full relative"
    style={{ border: `1px dashed hsl(var(--foreground) / ${(data.strong as boolean) ? 0.55 : 0.3})` }}
  >
    <span className="absolute -top-[7px] left-2 bg-background px-1.5 font-mono text-[9px] tracking-wide text-muted-foreground whitespace-nowrap">
      {data.label as string}
    </span>
  </div>
);

const boxStyle = {
  background: 'hsl(var(--background))',
  border: '2px solid hsl(var(--foreground))',
  borderRadius: 0,
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fontWeight: 600,
  padding: '8px 12px',
  cursor: 'grab',
  textAlign: 'center' as const,
  whiteSpace: 'pre-line' as const,
  lineHeight: 1.4,
};

const highlightStyle = { ...boxStyle, background: 'hsl(var(--primary))' };

const container = (
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  strong = false,
) => ({
  id,
  type: 'container',
  position: { x, y },
  data: { label, strong },
  style: { width: w, height: h },
  draggable: false,
  selectable: false,
  zIndex: strong ? -1 : 0,
});

// A real HA system design (competency exercise, not a production
// deployment): two-AZ VPC, ALB + NAT Gateway in each public subnet, an
// nginx/app Auto Scaling Group per AZ, and a MongoDB primary/secondary
// replica set split across the private DB subnets.
const cloudNodes: Node[] = [
  container('vpc', 0, 110, 1000, 560, 'VPC 10.0.0.0/16', true),
  container('azA', 20, 150, 460, 500, 'AZ · us-east-1a'),
  container('azB', 520, 150, 460, 500, 'AZ · us-east-1b'),
  container('pubA', 40, 190, 420, 120, 'PUBLIC SUBNET A · 10.0.1.0/24'),
  container('appA', 40, 330, 420, 120, 'PRIVATE APP SUBNET A · 10.0.11.0/24'),
  container('dbA', 40, 470, 420, 150, 'PRIVATE DB SUBNET A · 10.0.21.0/24'),
  container('pubB', 540, 190, 420, 120, 'PUBLIC SUBNET B · 10.0.2.0/24'),
  container('appB', 540, 330, 420, 120, 'PRIVATE APP SUBNET B · 10.0.12.0/24'),
  container('dbB', 540, 470, 420, 150, 'PRIVATE DB SUBNET B · 10.0.22.0/24'),

  { id: 'users', position: { x: 440, y: 0 }, data: { label: 'USERS' }, style: boxStyle },
  { id: 'igw', position: { x: 405, y: 50 }, data: { label: 'INTERNET GATEWAY' }, style: boxStyle },

  { id: 'natA', position: { x: 70, y: 230 }, data: { label: 'NAT GATEWAY\noutbound only' }, style: boxStyle },
  { id: 'albA', position: { x: 290, y: 230 }, data: { label: 'ALB\nTCP 443/80' }, style: highlightStyle },
  { id: 'appNodeA', position: { x: 160, y: 365 }, data: { label: 'nginx + app\nAuto Scaling Group' }, style: boxStyle },
  { id: 'mongoA', position: { x: 160, y: 510 }, data: { label: 'MongoDB\nPRIMARY' }, style: boxStyle },

  { id: 'natB', position: { x: 570, y: 230 }, data: { label: 'NAT GATEWAY\noutbound only' }, style: boxStyle },
  { id: 'albB', position: { x: 790, y: 230 }, data: { label: 'ALB\nTCP 443/80' }, style: highlightStyle },
  { id: 'appNodeB', position: { x: 660, y: 365 }, data: { label: 'nginx + app\nAuto Scaling Group' }, style: boxStyle },
  { id: 'mongoB', position: { x: 660, y: 510 }, data: { label: 'MongoDB\nSECONDARY' }, style: boxStyle },
];

const line = (id: string, source: string, target: string, opts: Partial<Edge> = {}): Edge => ({
  id,
  source,
  target,
  animated: true,
  style: { stroke: 'hsl(var(--foreground))' },
  ...opts,
});

const cloudEdges: Edge[] = [
  line('e-users-igw', 'users', 'igw'),
  line('e-igw-albA', 'igw', 'albA'),
  line('e-igw-albB', 'igw', 'albB'),
  line('e-albA-appA', 'albA', 'appNodeA', { label: 'forward' }),
  line('e-albB-appB', 'albB', 'appNodeB', { label: 'forward' }),
  line('e-appA-mongoA', 'appNodeA', 'mongoA', { label: '27017' }),
  line('e-appB-mongoB', 'appNodeB', 'mongoB', { label: '27017' }),
  line('e-mongo-replication', 'mongoA', 'mongoB', {
    label: 'replication',
    style: { stroke: 'hsl(var(--primary))', strokeDasharray: '4 3' },
  }),
  line('e-alb-health', 'albA', 'albB', {
    label: 'cross-AZ health check',
    style: { stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '2 4' },
  }),
];

const nodeTypes = { container: ContainerNode };

/** Open, borderless flow canvas — a real HA system design (competency
 * exercise, not the actual AI Cloud Insights deployment, which runs on
 * simpler EC2 infra): two-AZ VPC with ALB, NAT Gateway per public subnet,
 * and a MongoDB replica set. */
const CloudArchitectureCanvas = () => {
  const [nodes, , onNodesChange] = useNodesState(cloudNodes);
  const [edges, , onEdgesChange] = useEdgesState(cloudEdges);

  return (
    <div>
      <p className="md:hidden font-mono text-[10px] text-muted-foreground mb-2">
        ← scroll to explore the full diagram →
      </p>
      <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <div className="relative h-[560px] dot-grid" style={{ minWidth: 1080 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.08 }}
            proOptions={{ hideAttribution: true }}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            translateExtent={[[-40, -40], [1040, 700]]}
            nodeExtent={[[-40, -40], [1040, 700]]}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={0} color="transparent" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default CloudArchitectureCanvas;
