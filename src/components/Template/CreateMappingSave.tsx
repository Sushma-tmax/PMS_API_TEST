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
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";

import Tab from "@mui/material/Tab";
import PAMaster from "../UI/PAMaster";
import Position from "./Position";
import Searchicon from "../../assets/Images/Searchicon.svg";




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
    opacity: "70%"
  },
});


const CreateMappingSave = (props: any) => {
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
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px"
        }}
      >

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <h3  style={{
                  fontSize: "18px",
                  fontFamily: "Arial",
                  color: "#3e8cb5",
                }}
                >Templates</h3>

            <Paper sx={{ height: "calc(100vh - 280px)" }}>
              <div style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
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
                  </Searchfeild></p>
                <p style={{ borderBottom: "1px solid lightgray" }}>Manager
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>Developer
                </p >
                <p style={{ borderBottom: "1px solid lightgray" }}>Designer
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>Tester
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>Sales Manager
                </p>
                <p style={{ borderBottom: "1px solid lightgray" }}>Customer Support
                </p>
              </div>

            </Paper>

          </Grid>

          <Grid item xs={10}>
            <div style={{ paddingTop: "90px" }}>
              <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#71bf74", backgroundColor: " #eff8ef" }}>
                <p>Position is added to the template ***** successfully</p>
              </Box>
            </div>
            <div style={{
              paddingTop: "30px", display: "flex", justifyContent: "center", alignItems: "center"
            }}>
              <Link to={`${LINK_CALENDAR}`}>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3e8cb5",
                    color: "#3e8cb5",
                  }}
                  variant="outlined"
                >
                  Link to Calendar
                </Button>
              </Link>
            </div>



          </Grid>
        </Grid>

      </Box>
    </>
  );
};

export default CreateMappingSave;
