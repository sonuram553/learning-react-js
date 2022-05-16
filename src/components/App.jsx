import React from "react";
import { DrawRectRegion } from "./DrawRectRegion";

export const App = () => {
  const containerStyle = {
    border: "1px solid",
    width: "60%",
    margin: "auto",
    minHeight: "400px",
    position: "relative",
  };

  return (
    <DrawRectRegion containerStyle={containerStyle}>
      <div
        style={{ width: "200px", height: "200px", background: "lightblue" }}
      ></div>
    </DrawRectRegion>
  );
};
