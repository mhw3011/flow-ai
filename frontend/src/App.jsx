import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";
import Toast from "./components/Toast";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 100 },
      data: { prompt: "", setPrompt },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 500, y: 100 },
      data: { result: "" },
    },
  ]);

  const [edges, setEdges] = useState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      // style: { stroke: "black", strokeWidth: 1, strokeDasharray: "2`2" },
      style: {
        strokeDasharray: "2 2",
        stroke: "green",
      },
    },
  ]);

  const runFlow = async () => {
    try {
      if (!prompt.trim()) {
        setResult("Please enter a prompt");
        return;
      }

      setResult("Loading...");

      const res = await fetch(
        " https://flow-ai-1-7ovn.onrender.com/api/ask-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        },
      );

      const data = await res.json();

      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("Error getting response");
    }
  };

  const saveFlow = async () => {
    try {
      if (!prompt || !result || result === "Loading...") {
        setSaveMessage("Nothing to save");
        setTimeout(() => setSaveMessage(""), 2500);
        return;
      }

      const res = await fetch(" https://flow-ai-1-7ovn.onrender.com/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, result }),
      });

      const data = await res.json();

      setSaveMessage(data.message);
      setTimeout(() => setSaveMessage(""), 2500);
    } catch (error) {
      console.error(error);
      setSaveMessage("Error saving data");
      setTimeout(() => setSaveMessage(""), 2500);
    }
  };
  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);

        return updated.map((node) => {
          if (node.id === "1") {
            return {
              ...node,
              data: { ...node.data, prompt, setPrompt },
            };
          }
          if (node.id === "2") {
            return {
              ...node,
              data: { ...node.data, result },
            };
          }
          return node;
        });
      }),
    [prompt, result],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button
        onClick={runFlow}
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          padding: "10px 12px",
          borderRadius: "6px",
          border: "none",
          background: "black",
          color: "white",
          cursor: "pointer",
          width: "100px",
        }}
      >
        Run Flow
      </button>

      <button
        onClick={saveFlow}
        style={{
          position: "absolute",
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          padding: "10px 12px",
          borderRadius: "6px",
          border: "none",
          background: "#10b981",
          color: "white",
          cursor: "pointer",
          width: "100px",
        }}
      >
        Save
      </button>
      <Toast message={saveMessage} type="success" />

      <ReactFlow
        nodes={nodes.map((node) => {
          if (node.id === "1") {
            return {
              ...node,
              data: { ...node.data, prompt, setPrompt },
            };
          }
          if (node.id === "2") {
            return {
              ...node,
              data: { ...node.data, result },
            };
          }
          return node;
        })}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
