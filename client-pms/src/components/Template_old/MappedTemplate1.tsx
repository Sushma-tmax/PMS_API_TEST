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
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_FILTER,
  MAPPED_TEMPLATE_2,
  MAPPED_TEMPLATE_3,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Eye from "../../assets/Images/Eye.svg";
import Filtergroup from "../../assets/Images/Filtergroup.svg";

import Tab from "@mui/material/Tab";
import PAMaster from "../UI/PAMaster";
import Searchicon from "../../assets/Images/Searchicon.svg";
import MappedTemplate2 from "../Template/ViewLinkedCalendars";

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

const MappedTemplate1 = (props: any) => {
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
      <PAMaster name={"Mapped Templates"} />
      <Container
        sx={{
          maxWidth: "96% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          marginTop: "2px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>

            <Paper sx={{ paddingTop:"10px", height: "calc(100vh - 200px)" }}>
              <div
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <p >
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
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Customer Support</span>
                    <span  >
                      <Link to = {MAPPED_TEMPLATE_3}>
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                        </Link>
                      
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Developer</span>
                    <span  >
                      
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                      
                    </span>
                  </Stack>{" "}
                </p>                
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Designer</span>
                    <span  >
                      
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                      
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Manager</span>
                    <span  >
                      
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                      
                    </span>
                  </Stack>{" "}
                </p>         
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Sales Manager</span>
                    <span  >
                      
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                      
                    </span>
                  </Stack>{" "}
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    spacing={2}
                  ><input
                  name="allSelect"
                  type="checkbox"
                  style={{
                    height: "17px",
                    width: "17px",
                    border: "1px solid #D5D5D5",
                  }} />
                    <span >Tester</span>
                    <span  >
                      
                        <IconButton style={{ display:"flex",verticalAlign:"middle"}}>
                          <img src={Eye} alt="icon"  style={{ verticalAlign:"middle"}}/>
                        </IconButton>
                      
                    </span>
                  </Stack>{" "}
                </p>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={9}>
          <Stack direction="row" sx={{ display:"flex", justifyContent:"right" }} spacing={2}>
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
                            >
                                View all Linked Calendar
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
                            >
                             Link Calendar
                            </Button>
                            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MappedTemplate1;
