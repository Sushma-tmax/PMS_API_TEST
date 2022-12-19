import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name:any,
  calories:any,
  fat:any,
  carbs:any, 
  protein:any,
  trail:any,
  ) 
  {
  return { name, calories, fat, carbs, protein,trail };
}

const rows = [
  createData("Standard", 50, 100, 250, 150,50),
  createData("Actual", 20, 140, 13, 20, 20),

  
];

export default function ChartTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400,bgcolor:"#f3fbff" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:12}}>Rating</TableCell>
            <TableCell align="right" sx={{fontSize:12}}>1 to 1.99</TableCell>
            <TableCell align="right" sx={{fontSize:12}}>2 to 2.99</TableCell>
            <TableCell align="right" sx={{fontSize:12}}>3 to 3.99</TableCell>
            <TableCell align="right" sx={{fontSize:12}}>4 to 4.99</TableCell>
            <TableCell align="right" sx={{fontSize:12}}>5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 },  }}
            >
              <TableCell component="th" scope="row" sx={{fontSize:12,color:"green"}}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{fontSize:12,  }}>{row.calories}</TableCell>
              <TableCell align="right" sx={{fontSize:14}}>{row.fat}</TableCell>
              <TableCell align="right" sx={{fontSize:14}}>{row.carbs}</TableCell>
              <TableCell align="right" sx={{fontSize:14}}>{row.protein}</TableCell>
              <TableCell align="right" sx={{fontSize:14}}>{row.trail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
