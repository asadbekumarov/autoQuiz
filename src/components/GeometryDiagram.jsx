import React from "react";

/**
 * Geometric SVG Diagram Renderer for Math & Geometry Tests
 * Supports: right-triangle, triangle, rectangle, circle, trapezoid, parallelogram
 */
export default function GeometryDiagram({ diagram, className = "" }) {
  if (!diagram || !diagram.type) return null;

  const { type, labels = {}, size = 160 } = diagram;
  const strokeColor = "#1e293b"; // slate-800
  const fillColor = "#f8fafc"; // slate-50
  const accentColor = "#059669"; // emerald-600
  const textColor = "#0f172a"; // slate-900

  switch (type) {
    case "right-triangle": {
      // Katet a (vertikal), Katet b (gorizontal), Gipotenuza c
      const a = labels.a || "a";
      const b = labels.b || "b";
      const c = labels.c || "c";
      const rightAngle = labels.angle !== false;

      return (
        <svg
          viewBox="0 0 160 140"
          className={`w-36 h-32 inline-block select-none ${className}`}
        >
          {/* Triangle Path */}
          <polygon
            points="30,20 30,110 140,110"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Right Angle Symbol */}
          {rightAngle && (
            <path
              d="M 30,95 L 45,95 L 45,110"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
            />
          )}
          {/* Labels */}
          <text x="14" y="68" fill={textColor} fontSize="13" fontWeight="bold">
            {a}
          </text>
          <text x="80" y="130" fill={textColor} fontSize="13" fontWeight="bold">
            {b}
          </text>
          <text
            x="95"
            y="55"
            fill={accentColor}
            fontSize="13"
            fontWeight="bold"
          >
            {c}
          </text>
          {labels.angleAlpha && (
            <text x="120" y="105" fill={textColor} fontSize="11">
              {labels.angleAlpha}
            </text>
          )}
        </svg>
      );
    }

    case "triangle": {
      // Ixtiyoriy uchburchak
      const a = labels.a || "a";
      const b = labels.b || "b";
      const c = labels.c || "c";
      const h = labels.h;

      return (
        <svg
          viewBox="0 0 160 140"
          className={`w-36 h-32 inline-block select-none ${className}`}
        >
          <polygon
            points="75,20 20,110 145,110"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {h && (
            <>
              <line
                x1="75"
                y1="20"
                x2="75"
                y2="110"
                stroke={accentColor}
                strokeWidth="1.8"
                strokeDasharray="4,3"
              />
              <path
                d="M 75,100 L 85,100 L 85,110"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
              />
              <text x="79" y="70" fill={accentColor} fontSize="12" fontWeight="bold">
                h
              </text>
            </>
          )}
          <text x="35" y="60" fill={textColor} fontSize="13" fontWeight="bold">
            {a}
          </text>
          <text x="115" y="60" fill={textColor} fontSize="13" fontWeight="bold">
            {b}
          </text>
          <text x="80" y="128" fill={textColor} fontSize="13" fontWeight="bold">
            {c}
          </text>
        </svg>
      );
    }

    case "rectangle": {
      // To'rtburchak / Kvadrat
      const a = labels.a || "a";
      const b = labels.b || "b";

      return (
        <svg
          viewBox="0 0 160 130"
          className={`w-36 h-32 inline-block select-none ${className}`}
        >
          <rect
            x="25"
            y="25"
            width="110"
            height="75"
            rx="2"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.5"
          />
          {labels.diagonal && (
            <line
              x1="25"
              y1="100"
              x2="135"
              y2="25"
              stroke={accentColor}
              strokeWidth="1.8"
              strokeDasharray="4,3"
            />
          )}
          <text x="75" y="18" fill={textColor} fontSize="13" fontWeight="bold">
            {a}
          </text>
          <text x="142" y="68" fill={textColor} fontSize="13" fontWeight="bold">
            {b}
          </text>
        </svg>
      );
    }

    case "circle": {
      // Aylana / Doira
      const r = labels.r || "r";

      return (
        <svg
          viewBox="0 0 160 140"
          className={`w-36 h-32 inline-block select-none ${className}`}
        >
          <circle
            cx="80"
            cy="70"
            r="48"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.5"
          />
          {/* Center Point */}
          <circle cx="80" cy="70" r="3" fill={accentColor} />
          <text x="70" y="72" fill={textColor} fontSize="10" fontWeight="bold">
            O
          </text>
          {/* Radius line */}
          <line
            x1="80"
            y1="70"
            x2="128"
            y2="70"
            stroke={accentColor}
            strokeWidth="2"
          />
          <text
            x="100"
            y="64"
            fill={accentColor}
            fontSize="12"
            fontWeight="bold"
          >
            {r}
          </text>
        </svg>
      );
    }

    case "trapezoid": {
      // Trapetsiya
      const a = labels.a || "a";
      const b = labels.b || "b";
      const h = labels.h;

      return (
        <svg
          viewBox="0 0 160 130"
          className={`w-36 h-32 inline-block select-none ${className}`}
        >
          <polygon
            points="50,25 110,25 140,105 20,105"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {h && (
            <>
              <line
                x1="50"
                y1="25"
                x2="50"
                y2="105"
                stroke={accentColor}
                strokeWidth="1.8"
                strokeDasharray="4,3"
              />
              <text x="54" y="68" fill={accentColor} fontSize="12" fontWeight="bold">
                h
              </text>
            </>
          )}
          <text x="76" y="18" fill={textColor} fontSize="13" fontWeight="bold">
            {a}
          </text>
          <text x="76" y="123" fill={textColor} fontSize="13" fontWeight="bold">
            {b}
          </text>
        </svg>
      );
    }

    default:
      return null;
  }
}
