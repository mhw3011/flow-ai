import { Handle, Position } from "@xyflow/react";

function InputNode({ data }) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        background: "white",
        width: "250px",
      }}
    >
      <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
        Enter Prompt
      </div>

      <textarea
        className="nodrag"
        value={data.prompt}
        onChange={(e) => data.setPrompt(e.target.value)}
        placeholder="Type your prompt..."
        rows={3}
        style={{
          width: "90%",
          resize: "none",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          maxHeight: "100px",
          overflowY: "auto",
        }}
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default InputNode;
