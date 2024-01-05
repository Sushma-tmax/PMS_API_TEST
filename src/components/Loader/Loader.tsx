import * as React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div  
    style={{
      background: "#F1F1F1",
      minHeight: "100px",
      overflow: "hidden",
       height: "auto",
    }}
    >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="loader"></div>
    </div>
    </div>
  );
}
