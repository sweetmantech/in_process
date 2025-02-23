import { MarkerType } from "@xyflow/react";

export const nodeDefaults = {
  style: {
    width: 50,
    height: 18,
    fontSize: 7,
  },
};

export const edgeDefaults = {
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

export const initialNodes = [
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

export const initialEdges = [
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
