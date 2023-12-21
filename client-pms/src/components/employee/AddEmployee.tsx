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
import PAMaster from '../../components/UI/PAMaster'


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

export default function Addemployee() {
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
      <PAMaster name={"Employee Master"} />
      <Container
        sx={{
            maxWidth:"95% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
         
        }}
      >
        {/* <Box sx={{ width: "100%" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Single Upload" />
              <Tab label="Multiple Upload" />
            </Tabs>
          </Box>
        </Box>
        <div style={{ width: "95%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
              columnGap: 6,
              rowGap: 3,
            }}
          >
            <Item>
              <TextField
                label="Employee Name"
                id="standard-size-normal"
                variant="standard"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </Item>

            <Item>
              <TextField
                label="Email"
                id="standard-size-normal"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Item>

            <Item>
              <TextField
                label="Department"
                id="standard-size-normal"
                variant="standard"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Item>

            <Item>
              <TextField
                label="Division"
                id="standard-size-normal"
                variant="standard"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              />
            </Item>

            <Item>
              <TextField
                label="Grade"
                id="standard-size-normal"
                variant="standard"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </Item>

            <Item>
              <TextField
                label="Date of joining"
                id="standard-size-normal"
                variant="standard"
                value={dateofjoining}
                onChange={(e) => setDateofjoining(e.target.value)}
              />
            </Item>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Add</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </Box>
        </div> */}
        <Employeelisttable />
      </Container>
    </>
  );
}
