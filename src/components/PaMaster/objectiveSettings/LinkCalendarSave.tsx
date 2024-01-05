import * as React from "react";

import { useState } from "react";

import {
  Box,
  Container,
  Paper,
  Grid,
  Menu,
  Toolbar,
  Typography,
  TextField,
  Stack,
  styled,
  InputAdornment,
  Tooltip,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import Close from "../../../assets/Images/Close.svg";



import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../../assets/Images/Edit.svg";
import Leftarrow from "../../../assets/Images/Leftarrow.svg";
import white_edit from "../../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_FILTER,
  MAPPED_TEMPLATE_2,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
} from "../../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Plus from "../../../assets/Images/Plus.svg";
import Closeiconred from "../../../assets/Images/Closeiconred.svg";
import Filtergroup from "../../../assets/Images/Filtergroup.svg";

import Tab from "@mui/material/Tab";
import PAMaster from "../../UI/PAMaster";
import Searchicon from "../../../assets/Images/Searchicon.svg";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "38px",
    width: "120%",
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

const LinkCalendarSave = (props: any) => {
  const { loading } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      {" "}
      <PAMaster name={"Calendar Mapping"} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px"
        }}
      >
        <Stack
          style={{ paddingTop: "10px" }}
          direction="row"
          justifyContent="space-between"
        >
          <span
            style={{
              fontSize: "22px",

              color: "#004C75",
            }}
          >
            Calendar Mapping
          </span>
          <Stack
            direction="row"
            spacing={2}
          >
            {" "}
            <Box style={{ paddingTop:"6px",backgroundColor:"#eff8ef"}}>
                <span style={{  paddingLeft:"10px", paddingRight:"10px", color:"#7ec580"}}>Templates are successfully linked to a calendar</span>
                </Box>
                <Link to = {MAPPED_TEMPLATE_2}>
            <Button
              style={{
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "sans-serif",
                padding: "2px 9px",
  
                borderColor: "#004C75",
                color: "#004C75",
              }}
              variant="outlined"
              size="small"
            >
              View all Link Calendar
            </Button>
            </Link>
            <Button
              style={{
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "sans-serif",
                padding: "2px 9px",
  
                borderColor: "#004C75",
                color: "#004C75",
              }}
              variant="outlined"
              size="small"

            >
              Link Calendar
            </Button>
            
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ paddingTop: "30px" }}>
            

            <Paper sx={{ paddingTop: "10px", height: "calc(100vh - 280px)" }}>
            <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
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

                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Customer Support</span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Developer</span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Designer</span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Manager</span>
                    <span>
                      <Button
                        style={{
                          borderRadius: "3px",
                          textTransform: "none",
                          backgroundColor: "#ce880f",
                          fontSize: "12px",
                          fontFamily: "sans-serif",
                          padding: "0px 0px",
                        }}
                        variant="contained"
                        size="small"
                      >
                        New
                      </Button>
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Sales Manager</span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack direction="row" spacing={2}>
                    <input
                      name="allSelect"
                      type="checkbox"
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                    <span>Tester</span>
                  </Stack>{" "}
                </p>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <p style={{ paddingTop: "20px" }}>Recent Added</p>
            <TableContainer>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 400px)" }}>
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
                    Template Name
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
                    Year <ArrowDropDownIcon sx={{
                      verticalAlign:"middle"
                    }}/>
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
                    Term <ArrowDropDownIcon sx={{
                      verticalAlign:"middle"
                    }}/>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "regular",
                      borderColor: "#F7F9FB",
                      color: "#004C75",
                      fontSize: "14px",
                    }}
                    align="right"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    Customer Support
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
                    2022
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
                    Mid Year
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "14px", color: "#7A7A7A" }}
                    align="right"
                  >
                    <Tooltip title="Edit">
                      <IconButton aria-label="EditIcon">
                        <img src={Edit} alt="icon" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton aria-label="CancelOutlinedIcon ">
                        <img src={Close} alt="icon" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
               
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <div style={{display:"flex", justifyContent:"center"}}>
          <Link to ={CREATE_CALENDER}>
        <Button
              style={{
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "sans-serif",
                padding: "2px 9px",
  
                borderColor: "#004C75",
                color: "#004C75",
              }}
              variant="outlined"
              size="small"
            >
              View Calendar
            </Button>
            </Link>
            </div>

          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LinkCalendarSave;
