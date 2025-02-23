import useRandomColor from "@/hooks/useRandomColor";
import { CustomData } from "@/types/jam";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { useState, useEffect, useRef, memo } from "react";

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
      className="size-full rounded-sm flex items-center justify-center min-w-[55px] min-h-[22px] top-0 left-0 -translate-x-[10px] -translate-y-[11px]"
      style={{
        backgroundColor: color,
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
