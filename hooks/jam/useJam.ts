import { useState, useCallback, useRef } from "react";
import {
  Node,
  NodeChange,
  applyNodeChanges,
  ReactFlowInstance,
} from "@xyflow/react";
import { initialNodes } from "@/lib/jam/consts";
import {
  createNewNode,
  toggleNodeEditing,
  updateNodeLabel,
} from "@/lib/jam/operations";
import domtoimage from "dom-to-image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useEdgeOperations } from "./useEdgeOperations";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

export function useJam() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const { setFileUploading, setImageUri } = useZoraCreateProvider();
  const {
    edgeToDelete,
    onEdgesChange,
    onEdgeDoubleClick,
    onEdgeLabelChange,
    onConnect,
    onEdgeDelete,
    onEdgeClick,
    onPaneClick,
    edges,
  } = useEdgeOperations();

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));

  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    setNodes((nds) => toggleNodeEditing(nds, node.id));
  };

  const onNodeLabelChange = (nodeId: string, newLabel: string) => {
    setNodes((nds) => updateNodeLabel(nds, nodeId, newLabel));
  };

  const onAdd = useCallback(() => {
    if (!reactFlowInstance || !reactFlowWrapper.current) return;
    const { x, y, zoom } = reactFlowInstance.getViewport();
    const centerX =
      -x / zoom + reactFlowWrapper.current.clientWidth / (2 * zoom);
    const centerY =
      -y / zoom + reactFlowWrapper.current.clientHeight / (2 * zoom);
    setNodes((nodes) => nodes.concat(createNewNode(centerX, centerY)));
  }, [reactFlowInstance]);

  const onCrop = async () => {
    if (!reactFlowWrapper.current) return;
    setFileUploading(true);
    const blob = await domtoimage.toBlob(reactFlowWrapper.current);
    const uri = await clientUploadToArweave(
      new File([blob], "image.png", { type: "image/png" }),
    );
    setImageUri(uri);
    setFileUploading(false);
  };

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (
        (event.key === "Delete" || event.key === "Backspace") &&
        edgeToDelete.current
      ) {
        const edge = edges.find((e) => e.id === edgeToDelete.current);
        if (edge) onEdgeDelete(edge);
        edgeToDelete.current = null;
      }
    },
    [edges, onEdgeDelete, edgeToDelete],
  );

  const onInit = useCallback(() => {
    window.onNodeLabelChange = onNodeLabelChange;
    window.onEdgeLabelChange = onEdgeLabelChange;
  }, [onNodeLabelChange, onEdgeLabelChange]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onNodeDoubleClick,
    onNodeLabelChange,
    onEdgeDoubleClick,
    onEdgeLabelChange,
    onConnect,
    onEdgeDelete,
    setNodes,
    setReactFlowInstance,
    reactFlowWrapper,
    onKeyDown,
    onAdd,
    onEdgeClick,
    onPaneClick,
    onCrop,
    onInit,
  };
}
