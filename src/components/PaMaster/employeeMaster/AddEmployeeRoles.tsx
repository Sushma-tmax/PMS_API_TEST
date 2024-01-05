import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Employeelisttable from "./Employeelisttable";
import PAMaster from '../../UI/PAMaster'
import EmployeelisttableForRoles from "./EmployeelisttableForRoles";


function Item(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) => (theme.palette.mode === "dark" ? "black" : "black"),

        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 1,
        fontSize: "1.1rem",
        fontWeight: "100",
        height: "80px",
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function AddEmployeeRoles() {
  const [value, setValue] = React.useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [grade, setGrade] = useState("");
  const [dateofjoining, setDateofjoining] = useState("");

  //@ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
  
      <PAMaster 
      name={"Roles Master"} 
      nav={"/add-employee"}
      secondName={"Employee Master"} />
      <Box
        sx={{
          //   maxWidth:"95% !important",
          // width: "100%",
          height: "calc(100vh - 200px)",
          backgroundColor: "#fff",
          marginLeft:"25px",
          marginRight:"25px",
          padding:"20px"
         
        }}
      >
        
        <EmployeelisttableForRoles />
      </Box>
    </>
  );
}
