import React, { useRef, useState } from "react";

export const DrawRectRegion = ({ children, containerStyle }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [fixedPoint, setFixedPoint] = useState({ x: 0, y: 0 });
  const [isPointerStartedMoving, setIsPointerStartedMoving] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const containerRef = useRef(null);
  const rectangularRegionStyle = {
    border: "1px solid orange",
    top: `${position.top}px`,
    right: `${position.right}px`,
    bottom: `${position.bottom}px`,
    left: `${position.left}px`,
    position: "absolute",
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseDown={(e) => {
        if (!containerRef.current) return;

        const containerElem = containerRef.current;
        const rect = containerElem.getBoundingClientRect();
        const { pageX, pageY } = e;

        const top = pageY - rect.top;
        const left = pageX - rect.left;
        const bottom = containerElem.clientHeight - top;
        const right = containerElem.clientWidth - left;

        setFixedPoint({ x: left, y: top });
        setPosition({ top, right, bottom, left });
        setIsPointerStartedMoving(false);
        setIsMouseDown(true);
      }}
      onMouseMove={(e) => {
        if (!(isMouseDown && containerRef.current)) return;

        if (!isPointerStartedMoving) {
          setIsPointerStartedMoving(true);
          return;
        }

        const containerElem = containerRef.current;
        const rect = containerElem.getBoundingClientRect();
        const { pageX, pageY } = e;

        const currentX = pageX - rect.left;
        const currentY = pageY - rect.top;
        let { top, right, bottom, left } = position;

        if (currentX > fixedPoint.x) {
          left = fixedPoint.x;
          right = containerElem.clientWidth - currentX;
        } else {
          left = currentX;
          right = containerElem.clientWidth - fixedPoint.x;
        }

        if (currentY > fixedPoint.y) {
          top = fixedPoint.y;
          bottom = containerElem.clientHeight - currentY;
        } else {
          top = currentY;
          bottom = containerElem.clientHeight - fixedPoint.y;
        }

        setPosition({ top, right, bottom, left });
      }}
      onMouseUp={() => {
        setIsMouseDown(false);
      }}
    >
      {children}
      {isPointerStartedMoving && <div style={rectangularRegionStyle}></div>}
    </div>
  );
};
