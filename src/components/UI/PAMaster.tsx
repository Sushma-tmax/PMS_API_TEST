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
  CALENDER,
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
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  breadCrumbs: {
    fontSize: "18px",
    color: "#3e8cb5",
    fontFamily: "Arial",
      // @media Querry for responsive codes
    ['@media (max-width:994px)']: {
      color:"#3e8cb5 !important",
      fontSize: "16px !important",
    fontFamily: "Arial !important",
    }
  },
  breadCrumbsActive: {
    fontSize: "18px",
    color: "#333333",
    fontFamily: "Arial",
      // @media Querry for responsive codes
    ['@media (max-width:994px)']: {
      color:"#333333 !important",
      fontSize: "16px !important",
    fontFamily: "Arial !important",
    }
  },
   
  breadCrumbsRightside: {
    textTransform: "none",
        color: "#3E8CB5",
       fontSize: "16px",
        fontFamily: "Arial",
      // @media Querry for responsive codes
    ['@media (max-width:994px)']: {
      textTransform: "none",
      color:"#3E8CB5 !important",
      fontSize: "14px !important",
    fontFamily: "Arial !important",
    }
  },
}));

setTimeout(() => {
  let height = document.getElementById("master")!.offsetHeight;
  console.log(height);
}, 5000);

//let intViewportHeight = window.innerHeight;
//console.log(intViewportHeight)

export default function PAMaster(props: any) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { name, nav, secondName, thirdName, nav2,navigationFrom,breadcrumbs } = props;
  console.log(name, nav, secondName, "nns");
  const [pageNavigator, setpageNavigator] = React.useState("");
  const [pageNavigator2, setpageNavigator2] = React.useState("");
  const [pageName, setpageName] = React.useState("");
  const [pageName3, setpageName3] = React.useState("");
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

  const navigateHandler = () => {
    if (nav) {
      navigate(nav);
    } else {
      navigate(`${MASTER_NAV}`);
    }
  };
  useEffect(() => {
    setpageNavigator(nav);
    setpageNavigator2(nav2);
    setpageName(secondName);
    setpageName3(thirdName);
  }, [nav, secondName, thirdName]);
  return (
    // <Container
    //     sx={{
    //         width: "100%",
    //         height: 50,
    //         marginTop: "5px",
    //         backgroundColor: "#EEEDE8",
    //     }}
    // >
    <div id="master">
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar style={{ minHeight: "50px", paddingRight: "25px" }}>
          <Typography
            style={{
              color: "#3E8CB5",
              fontSize: "24px",
              fontFamily: "Arial",
              display: "flex",
              alignItems: "self-end",
              // marginLeft:'0.6%'
            }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            
            <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs == "paadmin" ? 
              
            <Link
            style={{
              color: "#3e8cb5",
            }}
            to={"/ClosedcalendarDashboardNormalizer"} >
            Previous PA
            </Link> 
          
            :
              <Link
                to={`${MASTER_NAV}`}
                className={ classes.breadCrumbs }
                
                // color="inherit"
              >
                Master
              </Link>
            }
           
              {pageName3 && (
                <Link
                className={ classes.breadCrumbs }

                  // color="inherit"
                  to={`${pageNavigator2}`}
                >
                  {thirdName}
                </Link>
              )}
              {pageName && (
                <Link
                  // style={{
                  //   fontSize: "18px",
                  //   color: "#3e8cb5",
                  //   fontFamily: "Arial",
                  // }}
                  className={ classes.breadCrumbs }

                  // color="inherit"
                  to={`${pageNavigator}`}
                >
                  {secondName}
                </Link>
              )}
              <Typography
              className={ classes.breadCrumbsActive }
                style={{
                  fontSize: "18px",
                  color: "#333333",
                  fontFamily: "Arial",
                }}
                color="text.primary"
                // to={''}
                // aria-current="page"
              >
                {name}
              </Typography>
            </Breadcrumbs>
            {navigationFrom == "PAAdmin" ? 
               <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
               <div
                 style={{
                   fontSize: "18px",
                   color: "#333333",
                   fontFamily: "Arial",
                 }}
                 color="inherit"
               >
                 Dashboard
               </div>
             </Breadcrumbs> : "" }
          </Typography>
          <Stack direction="row" alignItems="center" spacing={6}>
          <Link to={`${PA_DASHBOARD}`}>
            <div
             className={ classes.breadCrumbsRightside }
              // style={{
              //   textTransform: "none",
              //   color: "#3E8CB5",
              //   fontSize: "16px",
              //   // marginRight: "30px",
              //   fontFamily: "Arial",
              // }}
            >
              Dashboard
            </div>
          </Link>
          <Link to={`${MASTER_NAV}`}>
            <div
            className={ classes.breadCrumbsRightside }
              // style={{
              //   textTransform: "none",
              //   color: "#3E8CB5",
              //   fontSize: "16px",
              //   // marginRight: "30px",
              //   fontFamily: "Arial",
              // }}
            >
              Master
            </div>
          </Link>
          <Button
          className={ classes.breadCrumbsRightside }
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              // marginRight: "30px",
              fontFamily: "Arial",
            }}
            id="basic-button"
            color="inherit"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={ handleClick}
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
            {/* */}
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
                //to={CREATE_MAPPING_NEW}
                to={MAPPED_TEMPLATE_3}
              >
                Create Employee Mapping
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                style={{ color: "GrayText", fontSize: "14px" }}
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
          className={ classes.breadCrumbsRightside }
            style={{
              textTransform: "none",
              color: "#3E8CB5",
              fontSize: "16px",
              fontFamily: "Arial",
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
                to={CALENDER}
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
                {/* View Calendar Mapping */}
                Calendar List
              </Link>
            </MenuItem>
          </Menu>
          </Stack>
          {/* </Link> */}
        </Toolbar>
      </Box>
    </div>

    // </Container>
  );
}
