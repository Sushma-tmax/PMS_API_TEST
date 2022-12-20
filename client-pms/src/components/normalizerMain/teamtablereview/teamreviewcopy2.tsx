import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps } from "@mui/material";
import { Stack, Tab, Tabs, Box, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Searchlensreview from "../Reviewericons/Searchlensreview.svg";
import Expand from "../Reviewericons/Expand.svg";
import Newexcel from "../Reviewericons/Newexcel.svg";
import Updown from "../Reviewericons/Updown.svg";
import Avatar from "@mui/material/Avatar";
import { Scrollbar } from "react-scrollbars-custom";
import Eye from "../Reviewericons/Eyeicon.svg";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Mytable = styled("div")({
  background: "#FFFFFF",
  // marginLeft: "25px",
  // marginRight: "25px",
  // position: "relative",
});
const Tabstyles = styled("div")({
  marginLeft: "20px",
  // marginTop: "15px",
  marginRight: "20px",
  "& .MuiButtonBase-root": {
    color: "#999999",
    textTransform: "none",
    fontWeight: 400,
  },
  "& .Mui-selected": {
    color: "#004C75",
  },
  "&.MuiTabs-indicator": {
    backgroundColor: "#004C75",
  },
  display: "flex",
  // justifyContent: 'space-between'
});
const Heading = styled("div")({
  fontSize: "18px",
  color: "#3e8cb5",
  fontFamily: "Arial",
  // paddingTop: "25px",
  // marginLeft: "20px",
});
const Searchfeild = styled("div")({
  // position: "absolute",
  // marginLeft: "78%",
  //marginRight: '8px',
  // marginTop: "10px",
  "& .MuiOutlinedInput-root": {
    height: "28px",
    width: "144px",
    borderRadius: "15px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    color: "#306D8F",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
    color: "#306D8F",
  },
});
const TableHeadings = styled("div")({
  "& .MuiTableRow-head ": {
    background: "#eaeced",
  },
  "& .MuiTableCell-head": {
    color: "#004C75",
    padding: "0px",
    height: "30px",
    borderBottom: "2px solid white",
  },
  "& .MuiTableCell-root": {
    padding: "0px",
  },
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -17,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Names = styled("div")({
  // marginLeft: "20px",
  // marginTop: "10px",
  color: "#333333",
  //cursor :"pointer"
});

const MyTeam = (props: any) => {
  return (
    <Mytable>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          style={{
            fontSize: "18px",
            fontFamily: "Arial",
            color: "#333333",
          }}
        >
          2020 - Mid Year
        </Typography>
        <Searchfeild>
          <div>
            <TextField
              id="outlined-basic"
              placeholder="Search Here..."
              autoComplete="off"
              inputProps={{ maxLength: 256 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Searchlensreview} alt="icon" />
                  </InputAdornment>
                ),
              }}
            />

            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            />
            <img
              src={Expand}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
            />
          </div>
        </Searchfeild>
      </Stack>

      <TableContainer
        style={{
          paddingTop: "20px",
        }}
      >
        <Scroll>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 259px)" }}>
            <Table  style={{cursor:"pointer"}} size="small" aria-label="simple table">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor: "#eaeced" }}>
                  <TableCell align="left">
                    <input
                      type="checkbox"
                      style={{
                        height: "18px",
                        width: "18px",
                      }}
                    />
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
                    Position
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
                    Final Rating
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
                    View PA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderColor: "lightgrey",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    <Avatar
                      alt="Haytham M. M. Alkurdi"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 35, height: 35 }}
                    />
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    Haytham M. M. Alkurdi
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    Messenger - Admin
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    15
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                     <img src={Eye} alt="icon" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Scrollbar>
        </Scroll>
      </TableContainer>
    </Mytable>
  );
};
export default MyTeam;
