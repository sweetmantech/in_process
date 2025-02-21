import { Handle, Position, NodeProps } from "@xyflow/react";
import { useState, useEffect, useRef, memo } from "react";

interface CustomData {
  label: string;
  isEditing: boolean;
  color: string;
}

const useRandomColor = () => {
  const [color, setColor] = useState("rgb(0, 0, 0)");

  useEffect(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }, []);

  return color;
};

const CustomNode = memo(({ id, data, isConnectable }: NodeProps) => {
  const nodeData = data as unknown as CustomData;
  const [editValue, setEditValue] = useState<string>(nodeData.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const color = useRandomColor();

  useEffect(() => {
    if (nodeData.isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [nodeData.isEditing]);

  const onKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" || evt.key === "Escape") {
      evt.preventDefault();
      window.onNodeLabelChange(id, editValue);
    }
  };

  return (
    <div
      className="size-full rounded-sm flex items-center justify-center"
      style={{
        backgroundColor: color, // Using the specific color you provided
        minWidth: "50px",
        minHeight: "22px",
        top: 0,
        left: 0,
        transform: `translate(-10px, -11px)`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      {nodeData.isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full text-[7px] bg-transparent outline-none text-center text-white"
        />
      ) : (
        <div className="text-[7px] w-full text-center text-white">
          {nodeData.label}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});

CustomNode.displayName = "CustomNode";

export default CustomNode;
