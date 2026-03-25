function Toast({ message, type = "success" }) {
  if (!message) return null;

  const bgColor = type === "success" ? "#10b981" : "#ef4444";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: bgColor,
        color: "white",
        padding: "14px 24px",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: "500",
        zIndex: 1000,
        boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
        minWidth: "220px",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
