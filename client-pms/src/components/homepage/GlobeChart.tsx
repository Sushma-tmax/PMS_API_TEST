import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react';

interface ApexChartProps {}

interface ApexChartState {
  options?: any;
  series?: any;
}

const GlobeChart = (props:any) => {
    const {completedCount,inprogressCount,inMediaton} = props;
    console.log(completedCount,inprogressCount,inMediaton,"the counts")
  const theme = useTheme();
  const [action, setAction] = useState<any>(0)
  const [action1, setAction1] = useState<any>(0)
  const [action2, setAction2] = useState<any>(0)
  useEffect(() => {
    setAction(completedCount)
    setAction1(inprogressCount)
    setAction2(inMediaton)
  }, [completedCount,inprogressCount,inMediaton])
  

  const options: ApexOptions = {
    colors: ["#39ac73", "#a6a6a6", "#33cccc"],
    //  colors: ["#222222", "#3DB7C0", "#A4DDE1", "#ABB1B5", "#606C74" ],

    labels: ["Completed", "In Progress", "In mediation"],
    theme: {
      monochrome: {
        enabled: false,
      },
    },
    responsive: [
      {
        //breakpoint: 480,
        options: {
          chart: {
            width: "100%",
            type: "pie",
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config?.w?.config?.labels[config?.dataPointIndex]);
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
      
    },
  };
  const series = [1,1,1];
  return (
    <div>
       {action === 0 && action1 === 0 && action2 === 0 && 
              <div
              style={{
                fontSize: "12px",
                fontFamily: "Arial",
                color:"#abb0b0"
              }}
              >No Data Available
              </div>}
      <ReactApexChart
        options={options}
        series={[action,action1,action2]}
        type="pie"
        width="220"
      />
    </div>
  );
};

export default GlobeChart;
