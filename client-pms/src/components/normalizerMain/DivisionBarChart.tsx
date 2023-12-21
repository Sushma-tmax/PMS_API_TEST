import { ApexOptions } from 'apexcharts';
import React from 'react';
import  ReactApexChart  from 'react-apexcharts';

const StatusBarChart = () => {
    const options: ApexOptions = {
        colors: ['#00B050', '#F6C609', '#C00000',],
        chart: {
          height: 250,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
            //   distributed: true,
            borderRadius: 1,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
          
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: any) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '8px',
            colors: ["#606C74"]
          }
        },
        stroke: {
          show: true,
          width: 10,
          colors: ['transparent']
        },
        grid: {
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
    
        xaxis: {
          categories: ['213', '110', '300', '250', '140', '200'],
          //         categories: ['213', '110', '300', '250', '140', '200','30', '40', '35', '50', '49', '60', '70', '91', '125', '67', '87', '45'],
    
          position: 'bottom',
    
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: true
          },
          tooltip: {
            enabled: false,
          }
    
        },
        yaxis: {
          title: {
            //   text: '$ (thousands)'
          },
          labels: {
            show: false
          },
        },
        legend: {
          show: false
        }
    
      }
    
    
      const series = [{
        name: 'Net Profit',
        data: [10, 20, 70, 12, 10, 10]
      }, {
        name: 'Revenue',
        data: [70, 65, 20, 8, 70, 70]
      }, {
        name: 'Free Cash Flow',
        data: [20, 10, 10, 80, 20, 20]
      }]
      return (
        <>
          <ReactApexChart options={options}
            series={series}
            height="160px"
            type="bar" />
        </>
    );
};

export default StatusBarChart;