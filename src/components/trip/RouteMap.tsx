"use client";

import { useEffect, useRef, useState } from "react";

interface RouteMapProps {
  waypoints: string[];
}

export default function RouteMap({ waypoints }: RouteMapProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!waypoints || waypoints.length < 2) return null;

  const svgWidth = 320;
  const svgHeight = Math.max(400, waypoints.length * 55 + 40);
  const paddingY = 30;
  const usableHeight = svgHeight - paddingY * 2;

  // Generate waypoint positions along a sinuous curve
  const points = waypoints.map((name, i) => {
    const t = i / (waypoints.length - 1);
    const y = paddingY + t * usableHeight;

    // Create a wave pattern: alternate between left and right
    // Keep curve centered with room for labels on both sides
    const centerX = svgWidth / 2;
    const amplitude = 50;
    // Use sine wave for smooth oscillation
    const x = centerX + Math.sin(t * Math.PI * 2 + Math.PI * 0.5) * amplitude;

    return { name, x, y };
  });

  // Build a smooth bezier path through all points
  const buildPath = () => {
    if (points.length < 2) return "";

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midY = (current.y + next.y) / 2;

      // Cubic bezier: control points pull vertically for smooth S-curve
      d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }

    return d;
  };

  const pathD = buildPath();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
    }

    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [waypoints]);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))", overflow: "visible" }}
      >
        {/* Animated path */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={pathD}
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={pathLength || 1000}
          strokeDashoffset={isVisible ? 0 : pathLength || 1000}
          style={{
            transition: "stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Waypoint dots and labels */}
        {points.map((point, i) => {
          const isLeft = point.x < svgWidth / 2;
          const labelX = isLeft ? point.x - 12 : point.x + 12;
          const textAnchor = isLeft ? "end" : "start";

          // Stagger the appearance
          const delay = isVisible ? `${0.3 + (i / points.length) * 2.2}s` : "0s";

          return (
            <g
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.5s ease ${delay}`,
              }}
            >
              {/* Outer glow ring */}
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="rgba(255,255,255,0.15)"
              />
              {/* Main dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill="white"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1.5"
              />
              {/* Label */}
              <text
                x={labelX}
                y={point.y + 1}
                fill="white"
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="text-[11px] font-semibold"
                style={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.3)",
                  letterSpacing: "0.02em",
                }}
              >
                {point.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
