import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,Legend} from 'recharts';



const data = [
    {
      uv: 50,
      pv: 20,
      
    },
    {
      
      uv: 100,
      pv: 140,
      
    },
    {
      
      uv: 250,
      pv: 13,
     
    },
    {
     
      uv: 150,
      pv: 20,
      
    },
    {
     
      uv: 50,
      pv: 20,
     
    },
   
  ];
  
export default function TrailChart() {
   
    return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      );
    }
    
          
            

















