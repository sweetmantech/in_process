import {
  ReactFlow,
  Controls,
  Background,
  NodeTypes,
  EdgeTypes,
} from "@xyflow/react";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import { useJamProvider } from "@/providers/JamProvider";
import Toolbar from "./Toolbar";

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
    onNodeDoubleClick,
    onEdgeDoubleClick,
    onConnect,
    onInit,
    setReactFlowInstance,
    reactFlowWrapper,
    onKeyDown,
    onEdgeClick,
    onPaneClick,
  } = useJamProvider();

  return (
    <>
      <Toolbar />
      <div
        onKeyDown={onKeyDown}
        className="border border-gray-700 h-[400px] w-full rounded-md bg-white"
        ref={reactFlowWrapper}
      >
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
          onInit={(instance) => {
            onInit();
            setReactFlowInstance(instance);
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default JamMedia;
