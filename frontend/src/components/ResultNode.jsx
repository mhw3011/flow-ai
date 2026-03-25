import { Handle, Position } from "@xyflow/react";

function ResultNode({ data }) {
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
      <Handle type="target" position={Position.Left} />

      <div style={{ marginBottom: "5px", fontWeight: "bold" }}>Result</div>

      <div
        style={{
          fontSize: "14px",
          color: "#252525",
          maxHeight: "120px",
          overflowY: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "8px",
        }}
      >
        {data.result || "Output will appear here"}
      </div>
    </div>
  );
}

export default ResultNode;
