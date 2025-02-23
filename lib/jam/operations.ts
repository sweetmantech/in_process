import { Node, Edge, Connection } from "@xyflow/react";
import { nanoid } from "nanoid";
import { edgeDefaults } from "./consts";

export const createNewNode = (
  x: number,
  y: number,
  label: string = "New Node",
) => ({
  id: nanoid(),
  type: "default",
  position: { x, y },
  data: { label, isEditing: false },
  style: {
    width: 50,
    height: 18,
    fontSize: 7,
  },
});

export const updateNodeLabel = (
  nodes: Node[],
  nodeId: string,
  newLabel: string,
): Node[] =>
  nodes.map((n) =>
    n.id === nodeId
      ? { ...n, data: { ...n.data, label: newLabel, isEditing: false } }
      : n,
  );

export const toggleNodeEditing = (nodes: Node[], nodeId: string): Node[] =>
  nodes.map((n) =>
    n.id === nodeId ? { ...n, data: { ...n.data, isEditing: true } } : n,
  );

export const createNewEdge = (connection: Connection): Edge => ({
  id: nanoid(),
  ...connection,
  data: { isEditing: false },
  type: "custom",
  style: edgeDefaults.style,
  markerEnd: edgeDefaults.markerEnd,
  label: "new edge",
});

export const updateEdgeLabel = (
  edges: Edge[],
  edgeId: string,
  newLabel: string,
): Edge[] =>
  edges.map((e) =>
    e.id === edgeId
      ? { ...e, label: newLabel, data: { ...e.data, isEditing: false } }
      : e,
  );

export const toggleEdgeEditing = (edges: Edge[], edgeId: string): Edge[] =>
  edges.map((e) =>
    e.id === edgeId ? { ...e, data: { ...e.data, isEditing: true } } : e,
  );
