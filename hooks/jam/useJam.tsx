import { useState, useCallback } from "react";
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  addEdge,
  MarkerType,
} from "@xyflow/react";

const nodeDefaults = {
  style: {
    width: 50,
    height: 18,
    fontSize: 7,
  },
};

const edgeDefaults = {
  type: "custom",
  style: {
    strokeWidth: 1,
    stroke: "#1a192b",
  },
  markerEnd: {
    type: MarkerType.Arrow,
    width: 10,
    height: 10,
    color: "#1a192b",
  },
};

const initialNodes = [
  {
    id: "1",
    data: {
      label: "Hello",
      isEditing: false,
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: "2",
    data: {
      label: "World",
      isEditing: false,
    },
    position: { x: 100, y: 100 },
    ...nodeDefaults,
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "to the",
    data: { isEditing: false },
    type: "custom",
    style: edgeDefaults.style,
    markerEnd: edgeDefaults.markerEnd,
  },
];

export function useJam() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const addNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: {
        label: `Node ${nodes.length + 1}`,
        isEditing: false,
      },
      position: {
        x: 100 + nodes.length * 50,
        y: 100 + nodes.length * 50,
      },
      ...nodeDefaults,
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length]);

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: {
                ...n.data,
                isEditing: true,
              },
            };
          }
          return n;
        }),
      );
    },
    [],
  );

  const onNodeLabelChange = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              label: newLabel,
              isEditing: false,
            },
          };
        }
        return n;
      }),
    );
  }, []);

  const onEdgeDoubleClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      setEdges((eds) =>
        eds.map((e) => {
          if (e.id === edge.id) {
            return {
              ...e,
              data: {
                ...e.data,
                isEditing: true,
              },
            };
          }
          return e;
        }),
      );
    },
    [],
  );

  const onEdgeLabelChange = useCallback((edgeId: string, newLabel: string) => {
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id === edgeId) {
          return {
            ...e,
            label: newLabel,
            data: {
              ...e.data,
              isEditing: false,
            },
          };
        }
        return e;
      }),
    );
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          data: { isEditing: false },
          type: "custom",
          style: edgeDefaults.style,
          markerEnd: edgeDefaults.markerEnd,
          label: "new edge",
        },
        eds,
      ),
    );
  }, []);

  const onEdgeDelete = useCallback((edge: Edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    onNodeDoubleClick,
    onNodeLabelChange,
    onEdgeDoubleClick,
    onEdgeLabelChange,
    onConnect,
    onEdgeDelete,
    setNodes,
  };
}
