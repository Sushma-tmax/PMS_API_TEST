/* eslint-disable */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  InputAdornment,
  IconButton,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import Searchicon from "../../assets/Images/Searchicon.svg";

import FormRow from "../reviewer/Dashboard/charts/boxgrid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import Verticalnewarrow from "../../assets/Images/Verticalnewarrow.svg";
import Triangle from "../Reviewericons/Triangle.svg";
import Triangle2 from "../Reviewericons/Triangle2.svg";
import Horizontalarrow from "../../assets/Images/Horizontalarrow.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Newexcel from "../../assets/Images/Newexcel.svg";
import Expand from "../../assets/Images/Expand.svg";
import UpDown from "../../assets/Images/UpDown.svg";
import Timelinerevview from "../reviewer/Dashboard/Timelinerevview";

const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
    borderRadius: "25px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#D5D5D5",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "12px",
    color: "#333333",
    opacity: "70%",
  },
});

function EmployeeComplete() {
  return (
    <div className="Container" style={{ height: "calc (100vh - 500px)" }}>
      <React.Fragment>
        <Typography
          variant="h5"
          align="left"
          sx={{ paddingTop: "30px", marginLeft: 12, marginBottom: 4 }}
          gutterBottom
          component="div"
        >
          <IconButton>
            <img src={Leftarrow} alt="button" />
          </IconButton>
          <span
            style={{
              textTransform: "none",
              color: "#004C75",
              fontSize: "26px",
              verticalAlign: "middle",
            }}
          >
            Completed
          </span>{" "}
        </Typography>
        <Container sx={{ bgcolor: "#fff" }}>
          <Box>
            <Timelinerevview />
          </Box>
        </Container>
        <br />
        <Container sx={{ bgcolor: "#fff" }}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <p style={{ paddingTop: "10px", fontSize: "22px" }}>
                {" "}
                All Employee Details{" "}
              </p>
              <Stack direction="row" spacing={2}>
                <p>
                  <Searchfeild>
                    <TextField
                      id="outlined-basic"
                      placeholder="Search Here..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={Searchicon} alt="icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Searchfeild>
                </p>
                <span style={{ paddingTop: "25px" }}>
                  <img src={UpDown} style={{ width: "50px", height: "20px" }} />

                  <img
                    src={Newexcel}
                    style={{
                      width: "50px",
                      height: "20px",
                    }}
                  />
                  {/* <img src={Expand} style={{ width: "50px", height: "20px" }} /> */}
                </span>
              </Stack>
            </Stack>
            <TableContainer>
              <Scrollbar style={{ height: "calc(100vh - 335px)" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Employee Code{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Employee Name{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Position{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Section{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Final Rating{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Self Rating{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          borderColor: "#F7F9FB",
                          color: "#004C75",
                          fontSize: "14px",
                        }}
                        align="left"
                      >
                        Pending Action{" "}
                        <ArrowDropDownIcon
                          sx={{
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        borderBottom: "1px solid lightgrey",
                      }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        EMP001
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Manager
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Administration
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        <p>4.5</p>
                        <span style={{ fontSize: "10px" }}>01-JUN-21</span>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        <p>2.5</p>
                        <span style={{ fontSize: "10px" }}>10-JUN-21</span>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#29c27f",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Completed
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default EmployeeComplete;
