import React from "react";

type UnderProgressProps = {
  featureName?: string;
};

const UnderProgress: React.FC<UnderProgressProps> = ({ featureName }) => {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginBottom: "0.5rem" }}>
        🚧 {featureName ? `${featureName} ` : ""}Coming Soon
      </h2>
      <p style={{ color: "#666" }}>
        This functionality is currently under development. Please check back later.
      </p>
    </div>
  );
};

export default UnderProgress;