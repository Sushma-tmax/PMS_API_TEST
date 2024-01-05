import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Scrollbar } from "react-scrollbars-custom";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";

const Scroll = styled("div")({
    "& .ScrollbarsCustom-Thumb": {
     background:"#C2C1C1 !important",
    },
    
  });
function createData(
  number: number,
  EmployeeName: any,
  EmployeeEmail: any,
  Department: any,
  Division: any,
  Grade: any,
  Dateofjoining: any,
  action: any
) {
  return {
    number,
    EmployeeName,
    EmployeeEmail,
    Department,
    Division,
    Grade,
    Dateofjoining,
    action,
  };
}

const rows = [
  createData(
    1,
    "Zubair Rahman",
    "abcd@taqeef.com",
    "Sales",
    "Business Development",
    "Grade 12",
    "15-Jan-2017",
    <>
      <IconButton>
        <EditTwoTone fontSize="small" />
      </IconButton>

      <IconButton>
        <CancelOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  ),
  createData(
    2,
    "Ayesha",
    "abcd@taqeef.com",
    "Sales",
    "Retail",
    "Grade 13",
    "18-Jan-2018",
    <>
      <IconButton>
        <EditTwoTone fontSize="small" />
      </IconButton>

      <IconButton>
        <CancelOutlinedIcon fontSize="small" />
      </IconButton>
    </>
  ),

//   createData(
//     3,
//     "Nujoom AlGhanem",
//     "abcd@taqeef.com",
//     "Sales",
//     "Sales Planning",
//     "Grade 14",
//     "20-Jan-2018",
//     <>
//       <IconButton>
//         <EditTwoTone fontSize="small" />
//       </IconButton>

//       <IconButton>
//         <CancelOutlinedIcon fontSize="small" />
//       </IconButton>
//     </>
//   ),
//   createData(
//     4,
//     "Ali Rahid Lootah",
//     "abcd@taqeef.com",
//     "Sales",
//     "Retail",
//     "Grade 15",
//     "18-Apr-2014",
//     <>
//       <IconButton>
//         <EditTwoTone fontSize="small" />
//       </IconButton>

//       <IconButton>
//         <CancelOutlinedIcon fontSize="small" />
//       </IconButton>
//     </>
//   ),
//   createData(
//     5,
//     " Suhail Galadari",
//     "abcd@taqeef.com",
//     "Sales",
//     "Sales Planning ",
//     "Grade 16",
//     "18-Mar-2018",
//     <>
//       <IconButton>
//         <EditTwoTone fontSize="small" />
//       </IconButton>

//       <IconButton>
//         <CancelOutlinedIcon fontSize="small" />
//       </IconButton>
//     </>
//   ),
];

export default function EmployeeUploadlisttable() {
  const CustomScrollbar = Scrollbar as any;

  return (
    <>
      {" "}
      <Typography style={{ color: "#3e8cb5",fontFamily:"arial",fontSize:"16px",marginTop:"10px",marginBottom:"10px" }}>Employee List</Typography>

        <FormControl sx={{  width: 65,paddingRight:"20px"  }}size="small">
          <InputLabel id="label" variant="outlined">
            All
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="All"
          >
            <MenuItem value={10}>1</MenuItem>
            <MenuItem value={20}>2</MenuItem>
            <MenuItem value={30}>3</MenuItem>
            <MenuItem value={30}>4</MenuItem>
            <MenuItem value={30}>5</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 100,paddingRight:"20px"}}size="small">
          <InputLabel id="label" variant="outlined">
            Grade
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Grade"
          >
            <MenuItem value={10}>Grade 12</MenuItem>
            <MenuItem value={20}>Grade 13</MenuItem>
            <MenuItem value={30}>Grade 14</MenuItem>
            <MenuItem value={30}>Grade 15</MenuItem>
            <MenuItem value={30}>Grade 16</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{  width: 150, }}size="small">
          <InputLabel id="label" variant="outlined">
            Department
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Department"
            placeholder="Select"
          >
            <MenuItem value={10}> Business Development</MenuItem>
            <MenuItem value={20}> Retail</MenuItem>
            <MenuItem value={30}> Sales Planning</MenuItem>
          </Select>
        </FormControl>
       
      <TableContainer 
      sx={{
      marginTop:"10px",
// //       width:{

// // // lg:800,
// // xl:1400,
//       },
      }} 
      >
      <Scroll>
          <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 460px)" }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
          <TableHead  style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
            <TableRow sx={{ bgcolor: "#eaeced" }}>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                #
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Employee Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Employee Email
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Department
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Division
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Grade
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Date of joining
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.number}
                sx={{
                    "&:last-child td, &:last-child th": {
                      borderColor: "lightgrey",
                    },
                  }}
              >
                <TableCell
                 align="center"
                  component="th"
                  scope="row"
                  width={50}
                >
                  {row.number}{" "}
                </TableCell>
                <TableCell
                  align="left"
                  width={250}
                >
                  {row.EmployeeName}
                </TableCell>
                <TableCell
                  align="left"
                  width={250}
                >
                  {row.EmployeeEmail}
                </TableCell>
                <TableCell
                  align="left"
                  width={150}
                >
                  {row.Department}
                </TableCell>
                <TableCell
                  align="left"
                  width={200}
                >
                  {row.Division}
                </TableCell>
                <TableCell
                  align="center"
                  width={150}
                >
                  {row.Grade}
                </TableCell>
                <TableCell
                  align="center"
                  width={200}
                >
                  {row.Dateofjoining}
                </TableCell>
                <TableCell
                  align="center"
                  width={130}
                >
                  {/* {row.action} */}
                  <>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                              
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                               
                              
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                           
                          </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </CustomScrollbar>
          </Scroll>
      </TableContainer>
      
    </>
  );
}
