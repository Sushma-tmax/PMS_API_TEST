import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Grid, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import Objective from "./objectivegroup/objective";
// import Objectivetype from "./objectivetype/objectivetype";
// import Objectivedescription from "./objectdescription/objdescription";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import {
  CALENDER_VIEWPAGE,
  CREATE_CALENDER,
  CREATE_MAPPING,
  CREATE_MAPPING_NEW,
  EDIT_VIEW_TEMPLATE,
  LINK_CALENDAR,
  LINK_CALENDAR_OPEN,
  MAPPED_TEMPLATE_2,
  MAPPED_TEMPLATE_3,
  VIEW_MAPPED_EMPLOYEE,
  MASTER_NAV,
  VIEW_TEMPLATE,
  VIEW_CALENDAR_MAPPING,
  PA_DASHBOARD,
 
} from "../../constants/routes/Routing";
import { styled, alpha } from "@mui/material/styles";

setTimeout(() => {
  let height = document.getElementById("master")!.offsetHeight;
  console.log(height);
}, 5000);

//let intViewportHeight = window.innerHeight;
//console.log(intViewportHeight)

export default function PAMaster(props: any) {
  const navigate = useNavigate();
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <div id="master">
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar style={{minHeight:"50px",paddingRight:"18px"}}>
          <Typography
            style={{
              color: "#3E8CB5",
              fontSize: "24px",
              fontFamily:"Arial",
              // paddingLeft:"10px"
            }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Master
          </Typography>
          <Link to={`${PA_DASHBOARD}`}>
          <Button
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              marginRight: "30px",
              fontFamily:"Arial",
            }}
          >
            Dashboard
          </Button>
          </Link>
          <Link to={`${MASTER_NAV}`}>
          <Button
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              marginRight: "30px",
              fontFamily:"Arial",
              
            }}
          >
             Master
          </Button>
          </Link>
          <Button
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              marginRight: "30px",
              fontFamily:"Arial",
            }}
            id="basic-button"
            color="inherit"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Template
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to="/template/create-template-1"
              >
                Create Template
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={VIEW_TEMPLATE}
              >
                View Template
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={EDIT_VIEW_TEMPLATE}
              >
                Edit Template
              </Link>
            </MenuItem> */}
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={MAPPED_TEMPLATE_3}
              >
                Create Employee Mapping
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                //to={MAPPED_TEMPLATE_3}
                to={VIEW_MAPPED_EMPLOYEE}
              >
                View Employee Mapping
              </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={LINK_CALENDAR}
              >
                Calendar Mapping
              </Link>
            </MenuItem> */}
          </Menu>
          {/* <Link to={CREATE_CALENDER}> */}


          
          <Button
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              fontFamily:"Arial",
            }}
            id="basic-button"
            color="inherit"
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
          >
            Calendar
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl1}
            open={open1}
            onClose={handleClose1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to="/calender"
              >
                Create Calendar
              </Link>
            </MenuItem>
            
            <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={CALENDER_VIEWPAGE}
              >
                {/* Calendar List */}
                View Calendar
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={LINK_CALENDAR}
              >
                Create Calendar Mapping
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={VIEW_CALENDAR_MAPPING}
              >
                View Calendar Mapping
              </Link>
            </MenuItem>

            {/* <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={MAPPED_TEMPLATE_2}
              >
                View Calendar Mapping
              </Link>
            </MenuItem> */}

            <MenuItem onClick={handleClose1}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                to={CREATE_CALENDER}
              >
                Calendar List
                {/* View Calendar Mapping */}
              </Link>
            </MenuItem>
          </Menu>
          {/* </Link> */}
        </Toolbar>
      </Box>
    </div>
  );
}
