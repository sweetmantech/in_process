import { useRef, useState } from "react";
import { Edge, EdgeChange, applyEdgeChanges, Connection } from "@xyflow/react";
import {
  createNewEdge,
  toggleEdgeEditing,
  updateEdgeLabel,
} from "@/lib/jam/operations";
import { initialEdges } from "@/lib/jam/consts";

export function useEdgeOperations() {
  const edgeToDelete = useRef<string | null>(null);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
    setEdges((eds) => toggleEdgeEditing(eds, edge.id));
  };

  const onEdgeLabelChange = (edgeId: string, newLabel: string) => {
    setEdges((eds) => updateEdgeLabel(eds, edgeId, newLabel));
  };

  const onConnect = (connection: Connection) => {
    setEdges((eds) => [...eds, createNewEdge(connection)]);
  };

  const onEdgeDelete = (edge: Edge) => {
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const onEdgeClick = (event: React.MouseEvent, edge: Edge) =>
    (edgeToDelete.current = edge.id);

  const onPaneClick = () => (edgeToDelete.current = null);

  return {
    edgeToDelete,
    onEdgesChange,
    onEdgeDoubleClick,
    onEdgeLabelChange,
    onConnect,
    onEdgeDelete,
    onEdgeClick,
    onPaneClick,
    edges,
  };
}
