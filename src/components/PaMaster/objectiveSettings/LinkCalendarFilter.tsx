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
} from "@mui/material";
import { Link } from "react-router-dom";

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

const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "38px",
    width: "174px",
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

const LinkCalendarFilter = (props: any) => {
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
      <PAMaster name={"Create Employee Mapping"} />
      <Box
        sx={{
          // maxWidth: "96% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px"

        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <h3
              style={{
                paddingTop: "30px",
                fontWeight: "400",

                color: "#004C75",
              }}
            >
              Templates
            </h3>

            <Paper sx={{ height: "calc(100vh - 280px)" }}>
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between", verticalAlign:"middle" }}
                  >
                    <span style={{ verticalAlign:"middle" }}><Searchfeild>
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
                  </Searchfeild></span>
                    <span style={{ paddingTop:"8px", verticalAlign:"middle" }}>
                      <Tooltip title="Filter">
                        <IconButton>
                          <img src={Filtergroup} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>

                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Customer Support</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Developer</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>                
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Designer</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Manager</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>          
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Sales Manager</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  >
                    <span>Tester</span>
                    <span>
                      <Tooltip title="Delete">
                        <IconButton>
                          <img src={Closeiconred} alt="icon" />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </Stack>{" "}
                </p>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={3}>
          <h3
              style={{
                paddingTop: "52px",
                fontWeight: "400",

                color: "#004C75",
              }}
            >
              
            </h3>
          <Paper sx={{ height: "calc(100vh - 280px)" }}>
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between", paddingTop:"20px"}}
                  >
                    <span style={{
                fontWeight: "300",

                color: "#004C75",
              }}>Filters</span>
                    <span style={{fontSize:"14px"}}>
                    Hide Filter
                    </span>
                  </Stack>{" "}
                </p>
                <div>

                <p style={{fontSize:"14px"}}>
                  Term
                </p>
                <div >
                                <input
                                name="Mid Year"
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                            verticalAlign:"middle"
                                        }} />
                                        
                                            <label style={{                                       
                                            verticalAlign:"middle"
                                        }} >Mid Year</label>
                                        
                                
                            </div>        
                            <div style={{
                                            paddingTop:"20px",
                                            verticalAlign:"middle"
                                        }} >
                                <input
                                name="Mid Year"
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                            verticalAlign:"middle"
                                        }} />
                                        
                                            <label style={{                                       
                                            verticalAlign:"middle"
                                        }} >Final Year</label>
                                        
                                
                            </div>  
                </div>
                <p style={{fontSize:"14px"}}>
                  Year
                </p>
                <div >
                                <input
                                name="Mid Year"
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                            verticalAlign:"middle"
                                        }} />
                                        
                                            <label style={{                                       
                                            verticalAlign:"middle"
                                        }} >2022</label>
                                        
                                
                            </div>        
                            <div style={{
                                            paddingTop:"20px",
                                            verticalAlign:"middle"
                                        }} >
                                <input
                                name="Mid Year"
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                            verticalAlign:"middle"
                                        }} />
                                        
                                            <label style={{                                       
                                            verticalAlign:"middle"
                                        }} >2021</label>
                                        
                                
                            </div>  
                            <div style={{
                                            paddingTop:"20px",
                                            verticalAlign:"middle"
                                        }} >
                                <input
                                name="Mid Year"
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                            verticalAlign:"middle"
                                        }} />
                                        
                                            <label style={{                                       
                                            verticalAlign:"middle"
                                        }} >2020</label>
                                        
                                
                            </div> 
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LinkCalendarFilter;
