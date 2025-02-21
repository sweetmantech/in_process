import {
  ReactFlow,
  Controls,
  Background,
  NodeTypes,
  EdgeTypes,
  Edge,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import { useCallback, useRef } from "react";
import { useJamProvider } from "@/providers/JamProvider";
const nodeTypes: NodeTypes = {
  default: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

function JamMedia() {
  const {
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
  } = useJamProvider();

  const handleInit = useCallback(() => {
    // Add label change handlers to window for components to access
    window.onNodeLabelChange = onNodeLabelChange;
    window.onEdgeLabelChange = onEdgeLabelChange;
  }, [onNodeLabelChange, onEdgeLabelChange]);

  // Handle keyboard events for edge deletion
  const edgeToDelete = useRef<string | null>(null);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    edgeToDelete.current = edge.id;
  }, []);

  const onPaneClick = useCallback(() => {
    edgeToDelete.current = null;
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (edgeToDelete.current) {
          const edge = edges.find((e) => e.id === edgeToDelete.current);
          if (edge) {
            onEdgeDelete(edge);
          }
          edgeToDelete.current = null;
        }
      }
    },
    [edges, onEdgeDelete],
  );

  return (
    <div
      style={{ height: "400px", width: "100%" }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <button
        onClick={addNode}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 4,
          padding: "8px 16px",
          background: "#1a192b",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="border border-gray-700"
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        minZoom={0.5}
        maxZoom={2}
        onInit={handleInit}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default JamMedia;
