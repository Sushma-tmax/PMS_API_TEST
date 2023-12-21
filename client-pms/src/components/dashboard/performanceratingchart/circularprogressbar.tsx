import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const percentage = 60;

const arr =  ['One', "two ", 'three']



function CircuarProgressbar() {
  return (
    <div style={{ width: 120, height: 50, }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#00b050",
          trailColor: "#f6c609",
          
        })}
      />
    </div>
  );
}
export default CircuarProgressbar;
