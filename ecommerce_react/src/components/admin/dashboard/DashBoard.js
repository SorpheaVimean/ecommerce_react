import React from "react";
import { Chart } from "react-google-charts";

const DashBoard = () => {
  // const data = [
  //   ["Task", "Hours per Day"],
  //   ["Work", 11],
  //   ["Eat", 2],
  //   ["Commute", 2],
  //   ["Watch TV", 2],
  //   ["Sleep", 7], // CSS-style declaration
  // ];

  // const options = {
  //   title: "My Daily Activities",
  //   pieHole: 0.5,
  //   is3D: false,
  //   animation: {
  //     startup: true,
  //     easing: "linear",
  //     duration: 1500,
  //   }, 
  // };
  // const data = [
  //   ["Age", "Weight"],
  //   [8, 12],
  //   [4, 5.5],
  //   [11, 14],
  //   [4, 5],
  //   [3, 3.5],
  //   [6.5, 7],
  // ];
  // const options = {
  //   title: "Age vs. Weight comparison",
  //   hAxis: { title: "Age", minValue: 0, maxValue: 15 },
  //   vAxis: { title: "Weight", minValue: 0, maxValue: 15 },
  //   legend: "none",
  //   animation: {
  //     startup: true,
  //     easing: "linear",
  //     duration: 1500,
  //   },
  //   enableInteractivity: false,
  // };
   const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  
   const options = {
    title: "My Daily Activities",
    pieHole: 0.4, // Creates a donut chart with a hole in the center
    animation: {
      startup: true,
      easing: "pie",
      duration: 1500,
    },
  };
  return (
    <div>
      {/* <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      /> */}
      {/* <Chart
      chartType="Bar"
      width="80%"
      height="400px"
      data={data}
      options={options}
    /> */}
    <Chart
      chartType="PieChart"
      width="80%"
      height="400px"
      data={data}
      options={options}
    />
      <div className="h-[4000px]"></div>
    </div>
  );
};

export default DashBoard;
