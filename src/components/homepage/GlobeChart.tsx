import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react';

interface ApexChartProps { }

interface ApexChartState {
  options?: any;
  series?: any;
}

const GlobeChart = (props: any) => {
  const { completedCount, inprogressCount, inMediaton,navigationRole } = props;
  console.log(navigationRole,completedCount, inprogressCount, inMediaton, "the counts")
  const theme = useTheme();
  const [action, setAction] = useState<any>(0)
  const [action1, setAction1] = useState<any>(0)
  const [action2, setAction2] = useState<any>(0)
  const [Totalemp, setTotalemp] = useState<any>(0)
  useEffect(() => {
    if (navigationRole == 'PreviousDashboard'){
      setAction(completedCount)
      setAction1(0)
      setAction2(0)
    }else{
      setAction(completedCount)
      setAction1(inprogressCount)
      setAction2(inMediaton)
    }
    // setAction(completedCount)
    // setAction1(inprogressCount)
    // setAction2(inMediaton)
    setTotalemp(completedCount + inprogressCount + inMediaton)
  })
  console.log(action, action1, action2, Totalemp, `${action + action1 + action2}`, "TotalEmpp")
  // let Totalemp = action+action1+action2
  console.log(Totalemp, "Totalemp")
  let options: ApexOptions;
  if (navigationRole === 'PreviousDashboard') {
   options = {
    colors: ["#39ac73"],
    labels: ["Completed"],
    // colors: ["#39ac73", "#ff884d", "#FF0000"],
    //  colors: ["#222222", "#3DB7C0", "#A4DDE1", "#ABB1B5", "#606C74" ],

    // labels: ["Completed", "In Re-normalization", "In mediation"],
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
            type: "donut",
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
      enabled: true,
      formatter: function (value: any, { seriesIndex, dataPointIndex, w }) {
        console.log(w.config.series[seriesIndex], "series")
        return w.config.series[seriesIndex]
      },
      // formatter: function (val) {
      //   return val + "%"
      // },
      // dropShadow: {
      //   ...
      // }
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontFamily: ' Arial',
              color: '#333333',
              // label: '5/10',
              formatter: () => `${completedCount}/${completedCount}`
            }
            // name: {
            //   show: true,
            //   fontSize: '22px',
            //   fontFamily: 'Helvetica, Arial, sans-serif',
            //   fontWeight: 600,
            //   color: undefined,
            //   offsetY: -7,
            //   formatter: () => '0/0'
            // },


          }


        }
      }
    }
  };
}else {
   options = {

    colors: ["#39ac73", "#ff884d", "#FF0000"],
    //  colors: ["#222222", "#3DB7C0", "#A4DDE1", "#ABB1B5", "#606C74" ],

    labels: ["Completed", "In Re-normalization", "In mediation"],
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
            type: "donut",
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
      enabled: true,
      formatter: function (value: any, { seriesIndex, dataPointIndex, w }) {
        console.log(w.config.series[seriesIndex], "series")
        return w.config.series[seriesIndex]
      },
      // formatter: function (val) {
      //   return val + "%"
      // },
      // dropShadow: {
      //   ...
      // }
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontFamily: ' Arial',
              color: '#333333',
              // label: '5/10',
              formatter: () => `${completedCount}/${completedCount + inprogressCount + inMediaton}`
            }
            // name: {
            //   show: true,
            //   fontSize: '22px',
            //   fontFamily: 'Helvetica, Arial, sans-serif',
            //   fontWeight: 600,
            //   color: undefined,
            //   offsetY: -7,
            //   formatter: () => '0/0'
            // },


          }


        }
      }
    }
  };
}
  const series = [1, 1, 1];
  //chart when count is zero
  const zeroSeries = [0, 0, 0, 1];
  const zeroOptions: ApexOptions = {

    colors: ["#abb0b0"],
    chart: {
      type: "donut",
    },
    // labels: [
    //   "Low Performers",
    //   "Average Performers",
    //   "Good Performers",
    //   "High Performers",

    // ],
    legend: {
      show: false,
    },
    responsive: [
      {
        //breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },


        },
      },
    ],
    dataLabels: {
      enabled: false,
      formatter: function (value: any, { seriesIndex, dataPointIndex, w }) {
        console.log(w.config.series[seriesIndex], "series")
        return w.config.series[seriesIndex]
      },
    },
    // plotOptions: {
    //   pie: {
    //     expandOnClick: false
    //   }
    // }
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '16px',
              fontFamily: ' Arial',
              color: '#333333',
              // label: '5/10',
              formatter: () => `${completedCount}/${completedCount + inprogressCount + inMediaton}`
              // formatter: function (w) {
              //   return w.globals.seriesTotals.reduce((a: any, b: any) => {
              //     return a / b
              //   }, 0)
              // }
            },

          }

        },

      }
    }

  };
  return (
    <div>
      {/* {action === 0 && action1 === 0 && action2 === 0 && 
              <div
              style={{
                fontSize: "12px",
                fontFamily: "Arial",
                color:"#abb0b0"
              }}
              >No Data Available
              </div>} */}
      {completedCount === 0 && inprogressCount === 0 && inMediaton === 0 &&

        <ReactApexChart
          options={zeroOptions}
          series={zeroSeries}
          //  series={[10,11,12]}
          type="donut"
          width="270"
        />
      }
      {(completedCount !== 0 || inprogressCount !== 0 || inMediaton !== 0) &&
        <ReactApexChart
        key={`${completedCount}-${ completedCount + inprogressCount +  inMediaton}`}
          options={options}
          series={[action, action1, action2]}
          //  series={[10,11,12]}
          type="donut"
          width="270"
        />}
    </div>
  );
};

export default GlobeChart;
