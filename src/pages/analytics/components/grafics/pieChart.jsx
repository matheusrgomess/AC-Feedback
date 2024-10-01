import { PieChart, Pie, Sector } from "recharts";
import { useState } from "react";

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} textAnchor="middle" fill={"#ffffff"}>
        {payload.name}
        <tspan x={cx} dy="1.2em">
          {(percent * 100).toFixed(1)}%
        </tspan>
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default function PieGrafics() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
  ];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={160} height={160} style={{ overflow: "visible" }}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        dataKey="value"
        isAnimationActive={true}
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={58}
        outerRadius={70}
        paddingAngle={5}
        fill="#971520"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
