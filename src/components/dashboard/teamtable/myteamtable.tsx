import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";
import { AnyAaaaRecord } from "dns";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import excel from "./excelresize.jpg";
import Typography from "@mui/material/Typography";


function createData(
  name: any,
  position: any,
  grade: any,
  status: any,
  viewPA: JSX.Element
) {
  return {
    name,
    position,
    grade,
    status,
    viewPA,
  };
}
{
}

const rows = [
  createData(
    "Alexa",
    "Network & Security Specialist",
    15,
    "Comlpleted",

    <Icon>
      <RemoveRedEyeOutlinedIcon />
    </Icon>
  ),
  createData(
    "Bob",
    "Network & Security Specialist",
    15,
    "Comlpleted",

    <Icon>
      <RemoveRedEyeOutlinedIcon />
    </Icon>
  ),
];

export default function Edittable() {
  const [value, setValue] = React.useState(0);

  //const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <>
      <Box sx={{ width: "155%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            // onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab style={{ textTransform: "none" }} label="All" />
            <Tab style={{ textTransform: "none" }} label="Completed" />
            <Tab style={{ textTransform: "none" }} label="In Progress" />
            <Tab style={{ textTransform: "none" }} label="Not Started" />
            <Tab style={{ textTransform: "none" }} label="Self Rating" />
           


            <div style={{ display: "flex", marginLeft: "400px" }}>
              <Grid>
                <TextField
                  value={"Search..."}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  sx={{
                    borderRadius: 5,
                    bgcolor: "#f2f6f8",
                    paddingTop: 1,
                  }}
                />
              </Grid>
              <Grid>
                <MobiledataOffIcon style={{ color: "#004c75" }} />
                <img src={excel} style={{ width: "20px", height: "20px" }} />
                <OpenInNewIcon
                  sx={{ paddingLeft: 2, width: "50%", color: "#004c75" }}
                />
              </Grid>
            </div>
          </Tabs>
        </Box>
      </Box>
      <TableContainer sx={{ marginTop: 3, width: "155%" }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#ebf2f4" }}>
              <TableCell
                sx={{
                  borderColor: "lightgrey",
                  color: "#005477",
                  fontSize: "13px",
                }}
              >
                Employee
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  borderColor: "lightgrey",
                  color: "#005477",
                  fontSize: "13px",
                }}
              >
                Position
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  borderColor: "lightgrey",
                  color: "#005477",
                  fontSize: "13px",
                }}
              >
                Grade
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  borderColor: "lightgrey",
                  color: "#005477",
                  fontSize: "13px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  borderColor: "lightgrey",
                  color: "#005477",
                  fontSize: "13px",
                }}
              >
                View PA
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": {},
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  width={300}
                  sx={{ padding: 2, borderColor: "lightgrey" }}
                >
                  {row.name}{" "}
                </TableCell>
                <TableCell
                  align="left"
                  width={300}
                  sx={{ padding: 2, borderColor: "lightgrey" }}
                >
                  {row.position}
                </TableCell>
                <TableCell
                  align="center"
                  width={300}
                  sx={{ padding: 2, borderColor: "lightgrey" }}
                >
                  {row.grade}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ padding: 2, borderColor: "lightgrey" }}
                >
                  {row.status}
                </TableCell>

                <TableCell
                  align="center"
                  width={150}
                  sx={{ padding: 2, borderColor: "lightgrey" }}
                >
                  {row.viewPA}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
