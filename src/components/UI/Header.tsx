import * as React from "react";
import { useEffect, useState } from "react";
import Headlogo from "../../assets/Images/Headlogo.svg";
import Downarrowheadernew from "../../assets/Images/Downarrowheadernew.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Button, Menu, MenuItem, Stack } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DASHBOARDM,
  MASTER_NAV,
  MIDYEAR_PERFORMANCE,
  NORMALIZER,
  REVIEWER,
  CEO_ROLE,
  VIEW_EMPLOYEE_LIST,
} from "../../constants/routes/Routing";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useAppContext } from "../../context/AppContext";
import { useMsal } from "@azure/msal-react";
import { useUpdateEmployeeAppraisalMutation, useGetEmployeeAppraisalQuery } from "../../service";

{
  /*import logo from "./Images/Taqeef.png";*/
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(-14),
    width: "58%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#A8CEDF",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

setTimeout(() => {
  let height = document.getElementById("header")!.offsetHeight;
  console.log(height);
}, 5000);

//background: "linear-gradient(to right, #023a53, #4286b9,#67cbeb)"
export default function NavBar(props: any) {
  const navigate = useNavigate()
  const { appraisalData } = props;
  const { employee_id } = useParams();

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [opendropdown, setopenDropDown] = React.useState(false);
  const [hoverTR, setHoverTR] = React.useState(false);
  const [hoverTR1, setHoverTR1] = React.useState(false);
  const [hoverTR2, setHoverTR2] = React.useState(false);
  const [hoverTR3, setHoverTR3] = React.useState(false);
  const [hoverTR4, setHoverTR4] = React.useState(false);
  const [RoleName, setRoleName] = React.useState("");

  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const { data: user } = useLoggedInUser();
  const { data: employeeData, isLoading } = useGetEmployeeAppraisalQuery(user?._id);
  console.log(employeeData, "employeeDatainHeader");
  // React.useEffect(()=>{
  //   let LocalstorageName = localStorage.getItem("Name") ?? "";

  //   if(LocalstorageName != undefined || LocalstorageName != ""){
  //     setRoleName(LocalstorageName)
  //   }else{
  //   setRoleName(user?.first_name ? user?.first_name : user?.legal_full_name)
  //   }
  // },[user])
  const handleopen = () => {
    setopenDropDown(true);
    if (opendropdown === true) {
      setopenDropDown(false);
    }
  };
  //latest
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [role, setRole] = useState<any>("");
  const [updateActiveRole] = useUpdateEmployeeAppraisalMutation()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // const app = useAppContext()

  console.log(user, "user");
  const location = useLocation();

  console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  const { instance } = useMsal();

  React.useEffect(() => {
    let Localstorage = localStorage.getItem("currentRole")
    let LocalstorageName = localStorage.getItem("Name") ?? "";
    // console.log(Localstorage,LocalstorageName,"LocalstorageName")
    console.log(role, "rolerole")
    if (user?.current_role == "CEORole") {
      setRoleName(user?.first_name ? user?.first_name : user?.legal_full_name)
      setRole("CEO")
      console.log("rrrrrrrrr")
    }
    else if (user?.current_role == "Normalizer") {
      setRoleName(user?.first_name ? user?.first_name : user?.legal_full_name)
      setRole("HR Normalizer")
    }
    else if (user?.current_role == "" || user?.current_role == undefined) {
      setRole(Localstorage)
      setRoleName(LocalstorageName)
    }
    else {
      setRoleName(user?.first_name ? user?.first_name : user?.legal_full_name)
      setRole(user?.current_role);
    }
    // if(user?.current_role !== null || user?.current_role !== "" || user?.current_role !== undefined){
    //     setRoleName(user?.first_name ? user?.first_name : user?.legal_full_name )
    //     setRole(user?.current_role);
    //   }else if(user?.current_role == "" || user?.current_role == undefined){
    //     setRole(Localstorage)
    //     setRoleName(LocalstorageName)
    //   }
  }, [user]);

  const handleLogout = (logoutType: any) => {
    // if (logoutType === "popup") {
    //   instance.logoutPopup({
    //     postLogoutRedirectUri: "/",
    //     mainWindowRedirectUri: "/",
    //   });
    // } else
    if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCurrentRoleHandler = (role: any) => {
    updateActiveRole({
      current_role: role,
      id: user?._id
    })
  }


  /*************this is to set navigation based on the role selection**************/

  const handleRolesNavigation = async (newRole: string, navigationPath: string) => {
    let newNavigationPath = ""
    if (newRole == "Employee") {
      if (employeeData?.data?.appraisal?.status == "excepted" || 
      employeeData?.data?.appraisal?.status == "not-started" ||
      employeeData?.data?.appraisal?.status == "in-progress" ||
      employeeData?.data?.appraisal?.status == undefined ||
      employeeData?.data?.appraisal?.status == null ||
      employeeData?.data?.appraisal?.status == "") {
      newNavigationPath =`employeeperformance/appraisal-notcompleted/employee/${user?._id}`
      handleClose();
      navigate(newNavigationPath, { state: newRole })
    }
    else {
      newNavigationPath = `employeeperformance/employee-landing/employee/${user?._id}`
      handleClose();
      navigate(newNavigationPath, { state: newRole })
    }
    } else {
      handleClose();
      navigate(navigationPath, { state: newRole })
    }
    };


/****** We need to set role based on the selection , for this if navigation is successful only
 * then we are setting the role which we getting from the location after navigating , whose 
 * value is the used into useEffect to set the roles ******************/
  useEffect(() => {
    if (location?.state !== undefined && location?.state !== null) {

      if (location?.state == "PA Admin") {
        setRole("PA Admin");
        updateCurrentRoleHandler("PA Admin");
      } else if (location?.state == "Appraiser") {
        setRole("Appraiser");
        updateCurrentRoleHandler("Appraiser");
      } else if (location?.state == "Reviewer") {
        setRole("Reviewer");
        updateCurrentRoleHandler("Reviewer");
      } else if (location?.state == "HR Normalizer") {
        setRole("HR Normalizer");
        updateCurrentRoleHandler("Normalizer");
      } else if (location?.state == "CEO") {
        setRole("CEO");
        updateCurrentRoleHandler("CEORole");
      } else if (location?.state == "Employee") {
        setRole("Employee");
        updateCurrentRoleHandler("Employee");
      }
     
    }

  }, [location.state]);


  const employeeRoute = (role: any) => {
    console.log(role, user?._id, 'clicked1')
    updateActiveRole({
      current_role: role,
      id: user._id
    })
    if (employeeData?.data?.appraisal?.status == "excepted" ||
      employeeData?.data?.appraisal?.status == "not-started" ||
      employeeData?.data?.appraisal?.status == "in-progress" ||
      employeeData?.data?.appraisal?.status == undefined ||
      employeeData?.data?.appraisal?.status == null ||
      employeeData?.data?.appraisal?.status == "") {
      console.log(user?._id, 'checkID')
      navigate(`employeeperformance/appraisal-notcompleted/employee/${user?._id}`)
    }
    else {
      navigate(`employeeperformance/employee-landing/employee/${user?._id}`)

    }
  }

  //latest
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          position: "sticky",
          // background: "linear-gradient(to right, #024E77, #3F94BB,#71CCF1)",
          background: " #024E77"
        }}
      >
        <Toolbar>
          <Typography sx={{ mr: 2, flexGrow: 1 }}>
            <img src={Headlogo} alt="logo" height={40} width={100}></img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Here"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
          </Box>
          <a href="https://taqeef.sharepoint.com/sites/TaqeefZone/TaqeefAppraisalForms/Forms/AllItems.aspx?id=%2Fsites%2FTaqeefZone%2FTaqeefAppraisalForms%2FPerformance%20Appraisal%20Guidelines%20for%20LMs&viewid=58ccd321-c8da-43cc-9e9e-095a4364b5d3" target="_blank">
            <Typography style={{ fontSize: "14px", fontFamily: "Arial", color: "#ffffff" }} component="div">
              PA Guidelines
            </Typography>
          </a>
          <div>
            <Stack direction="row" alignItems="center">
              <Button>
                {/* <Avatar
                  sx={{ width: "50px", height: "50px" }}
                  alt="profile"
                  src=""
                /> */}
                {employeeData && employeeData?.data?.profile_image_url != undefined ? (
                  <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
                ) : (
                  <Avatar style={{ width: "55px", height: "55px" }}>
                    {appraisalData &&
                      appraisalData.data.legal_full_name.substring(0, 1)}
                  </Avatar>
                )}
              </Button>
              <Stack>
                <Typography style={{ fontSize: "14px", fontFamily: "Arial" }}>
                  {/* {user?.legal_full_name} */}
                  {RoleName}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                    // opacity: "0.9",
                  }}
                >
                  {" "}
                  {role}
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img src={Downarrowheadernew} alt="logo"></img>
                  </IconButton>
                </Typography>
              </Stack>
            </Stack>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // sx={{ width: "140px" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {user?.roles?.admin && (
                <MenuItem
                  // onClick={() => {
                  //   handleClose();
                  //   setRole("PA Admin");

                  // }}
                  onClick={() => handleRolesNavigation('PA Admin', MASTER_NAV)}
                >
                  {/* <Link
                    style={{ color: "GrayText", fontSize: "14px" }}
                    // to={MASTER_NAV}
                    // onClick={() => updateCurrentRoleHandler('PA Admin')}

                  > */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    PA Admin
                  </Typography>
                  {/* </Link> */}
                </MenuItem>
              )}

              {/* {user?.roles?.appraiser &&  ( */}
              {(user?.roles?.appraiser || role === "Appraiser") && (
                <MenuItem
                  // onClick={() => {
                  //   handleClose();
                  //   setRole("Appraiser");
                  // }}
                  onClick={() => handleRolesNavigation('Appraiser', "/dashboardreview")}
                >
                  {/* <Link
                    style={{ color: "GrayText", fontSize: "14px" }}
                    // to={"/dashboardreview"}
                    // onClick={() => updateCurrentRoleHandler('Appraiser')}
                  // onClick={}
                  > */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    Appraiser
                  </Typography>
                  {/* </Link> */}
                </MenuItem>
              )}

              {/* {user?.roles?.reviewer && ( */}
              {(user?.roles?.reviewer || role === "Reviewer") && (
                <MenuItem
                  onClick={() => handleRolesNavigation('Reviewer', REVIEWER)}

                // onClick={() => {
                //   handleClose();
                //   setRole("Reviewer");
                // }}
                >
                  {/* <Link
                    style={{ color: "GrayText", fontSize: "14px" }}
                    to={REVIEWER}
                    // onClick={() => updateCurrentRoleHandler('Reviewer')}
                  > */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    {" "}
                    Reviewer
                  </Typography>
                  {/* </Link> */}
                </MenuItem>
              )}

              {/* {user?.roles?.normalizer || role == "Normalizer" && ( */}
              {(user?.roles?.normalizer || role === "HR Normalizer") && (

                <MenuItem
                  onClick={() => handleRolesNavigation('HR Normalizer', NORMALIZER)}

                // onClick={() => {
                //   handleClose();
                //   setRole("HR Normalizer");
                // }}
                >
                  {/* <Link
                    style={{ color: "GrayText", fontSize: "14px" }}
                    to={NORMALIZER}
                    // onClick={() => updateCurrentRoleHandler('Normalizer')}
                  > */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    {" "}
                    HR Normalizer
                  </Typography>
                  {/* </Link> */}
                </MenuItem>
              )}
              {(user?.roles?.ceo) && (

                <MenuItem
                  onClick={() => handleRolesNavigation('CEO', CEO_ROLE)}

                // onClick={() => {
                //   handleClose();
                //   setRole("CEO");
                // }}
                >
                  {/* <Link
                    style={{ color: "GrayText", fontSize: "14px" }}
                    to={CEO_ROLE}
                    onClick={() => updateCurrentRoleHandler('CEORole')}
                  > */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                  >
                    {" "}
                    CEO
                  </Typography>
                  {/* </Link> */}
                </MenuItem>
              )}
              {/* CEORole */}
              <MenuItem
                onClick={() => handleRolesNavigation('Employee', "employeeperformance/employee-landing/employee/" + user?._id)}

              // onClick={() => {
              //   handleClose();
              //   setRole("Employee");
              //   employeeRoute('Employee')
              // }}
              >
                {/* <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={
                    "employeeperformance/employee-landing/employee/" + user?._id
                  }
                  onClick={() => updateCurrentRoleHandler('Employee')}
                > */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                >
                  Employee
                </Typography>
                {/* </Link> */}
              </MenuItem>

              <MenuItem onClick={() => handleLogout("redirect")}>

                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                >
                  Log Out
                </Typography>

              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    // <AppBar
    //     id="header"
    //     style={{
    //       position: "sticky",
    //       background: "linear-gradient(to right, #024E77, #3F94BB,#71CCF1)",
    //     }}
    // >
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <Typography
    //           variant="h6"
    //           noWrap
    //           component="div"
    //           sx={{ mr: 2, display: { xs: "none", md: "flex" }, marginRight: 65 }}
    //       >
    //         <img src={Headlogo} alt="logo" height={40} width={100}></img>
    //       </Typography>

    //       {/* <Link
    //         style={{ color: "GrayText", fontSize: "14px" }}
    //         to={REVIEWER}
    //     >
    //       <Typography sx={{fontSize: "15px"}} > Reviewer</Typography>

    //       <Link
    //           style={{ color: "GrayText", fontSize: "14px" }}
    //           to={"/dashboardreview"}

    //       >
    //         <Typography sx={{fontSize: "15px"}} >
    //           Appraiser
    //         </Typography>
    //       </Link>

    //     </Link> */}
    //       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
    //         {/* <Search>
    //         <SearchIconWrapper>
    //           <SearchIcon />
    //         </SearchIconWrapper>
    //         <StyledInputBase
    //           placeholder="Search Here"
    //           inputProps={{ "aria-label": "search" }}
    //         />
    //       </Search> */}
    //       </Box>
    //       <p style={{ fontSize: "15px", paddingRight: "10px" }}>
    //         PA Guidelines
    //       </p>
    //       <Box sx={{ flexGrow: 0, display: "block" }}>
    //         {/* <Tooltip title=""> */}
    //         {/* <IconButton sx={{ p: 0 }}> */}
    //         {/* <Button
    //         style={{
    //           textTransform: "none",
    //           marginRight: "30px",
    //         }}
    //         id="basic-button"
    //         aria-controls={open ? "basic-menu" : undefined}
    //         aria-haspopup="true"
    //         aria-expanded={open ? "true" : undefined}
    //         //onClick={handleClick}
    //         onClick={handleopen}
    //       >
    //         <Avatar alt="" src="" />
    //       </Button> */}
    //         {/* {opendropdown &&
    //         <div style={{ position: 'relative' }} >
    //           <div style={{ textAlign: 'center', background: "white", position: 'absolute', minWidth: '110px', overflow: 'auto', zIndex: '1', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)", borderRadius: '5px' }}>

    //             <Link
    //               style={{ color: "GrayText", fontSize: "14px" }}

    //               to={MASTER_NAV}
    //             >

    //               <Typography sx={{ padding: '5px', backgroundColor: hoverTR === true ? '#EBE6E6' : 'white' }}
    //                 onPointerOver={() => setHoverTR(true)}
    //                 onPointerOut={() => setHoverTR(false)}
    //                 onClick={handleopen} >
    //                 PA Admin
    //               </Typography>

    //             </Link>
    //             <Link
    //               style={{ color: "GrayText", fontSize: "14px" }}
    //               to={"/dashboardreview"}
    //             >
    //               <Typography
    //                 sx={{ padding: '5px', backgroundColor: hoverTR1 === true ? '#EBE6E6' : 'white' }} onClick={handleopen}
    //                 onPointerOver={() => setHoverTR1(true)}
    //                 onPointerOut={() => setHoverTR1(false)}
    //               >
    //                 Appraiser
    //               </Typography>
    //             </Link>
    //             <Link
    //               style={{ color: "GrayText", fontSize: "14px" }}
    //               to={REVIEWER}
    //             >
    //               <Typography
    //                 sx={{ padding: '5px', backgroundColor: hoverTR2 === true ? '#EBE6E6' : 'white' }}
    //                 onPointerOver={() => setHoverTR2(true)}
    //                 onPointerOut={() => setHoverTR2(false)}
    //                 onClick={handleopen} > Reviewer</Typography>

    //             </Link>
    //             <Link
    //               style={{ color: "GrayText", fontSize: "14px" }}
    //               to={NORMALIZER}
    //             >
    //               <Typography
    //                 sx={{ padding: '5px', backgroundColor: hoverTR3 === true ? '#EBE6E6' : 'white' }}
    //                 onPointerOver={() => setHoverTR3(true)}
    //                 onPointerOut={() => setHoverTR3(false)}
    //                 onClick={handleopen} > Normalizer</Typography>

    //             </Link>
    //             <Link
    //               style={{ color: "GrayText", fontSize: "14px" }}
    //               // to={`${MIDYEAR_PERFORMANCE}/employee/6204935ebca89023952f2db3`}
    //               to={`${VIEW_EMPLOYEE_LIST}`}
    //             >
    //               <Typography
    //                 sx={{ padding: '5px', backgroundColor: hoverTR4 === true ? '#EBE6E6' : 'white' }}
    //                 onPointerOver={() => setHoverTR4(true)}
    //                 onPointerOut={() => setHoverTR4(false)}
    //                 onClick={handleopen}
    //               >Employee</Typography>

    //             </Link>
    //           </div>
    //         </div>} */}
    //         <div>
    //           <Button
    //               id="basic-button"
    //               aria-controls={open ? "basic-menu" : undefined}
    //               aria-haspopup="true"
    //               aria-expanded={open ? "true" : undefined}
    //               onClick={handleClick}
    //           >
    //             <Avatar alt="" src="" />

    //           </Button>
    //           <Menu
    //               id="basic-menu"
    //               anchorEl={anchorEl}
    //               open={open}
    //               onClose={handleClose}
    //               sx={{ width: "140px" }}
    //               MenuListProps={{
    //                 "aria-labelledby": "basic-button",
    //               }}
    //           >
    //             {user?.roles?.admin && (
    //                 <MenuItem onClick={handleClose}>
    //                   <Link
    //                       style={{ color: "GrayText", fontSize: "14px" }}
    //                       to={MASTER_NAV}
    //                   >
    //                     <Typography
    //                         sx={{
    //                           fontSize: "14px",
    //                           color: "#333333",
    //                           fontFamily: "Arial",
    //                         }}
    //                     >
    //                       PA Admin
    //                     </Typography>
    //                   </Link>
    //                 </MenuItem>
    //             )}

    //             {user?.roles?.appraiser && (
    //                 <MenuItem onClick={handleClose}>
    //                   <Link
    //                       style={{ color: "GrayText", fontSize: "14px" }}
    //                       to={"/dashboardreview"}
    //                   >
    //                     <Typography
    //                         sx={{
    //                           fontSize: "14px",
    //                           color: "#333333",
    //                           fontFamily: "Arial",
    //                         }}
    //                     >
    //                       Appraiser
    //                     </Typography>
    //                   </Link>
    //                 </MenuItem>
    //             )}

    //             {user?.roles?.reviewer && (
    //                 <MenuItem onClick={handleClose}>
    //                   <Link
    //                       style={{ color: "GrayText", fontSize: "14px" }}
    //                       to={REVIEWER}
    //                   >
    //                     <Typography
    //                         sx={{
    //                           fontSize: "14px",
    //                           color: "#333333",
    //                           fontFamily: "Arial",
    //                         }}
    //                     >
    //                       {" "}
    //                       Reviewer
    //                     </Typography>
    //                   </Link>
    //                 </MenuItem>
    //             )}

    //             {user?.roles?.normalizer && (
    //                 <MenuItem onClick={handleClose}>
    //                   <Link
    //                       style={{ color: "GrayText", fontSize: "14px" }}
    //                       to={NORMALIZER}
    //                   >
    //                     <Typography
    //                         sx={{
    //                           fontSize: "14px",
    //                           color: "#333333",
    //                           fontFamily: "Arial",
    //                         }}
    //                     >
    //                       {" "}
    //                       Normalizer
    //                     </Typography>
    //                   </Link>
    //                 </MenuItem>
    //             )}
    //             <MenuItem onClick={handleClose}>
    //               <Link
    //                   style={{ color: "GrayText", fontSize: "14px" }}
    //                   to={
    //                       "employeeperformance/employee-landing/employee/" +
    //                       user?._id
    //                   }
    //               >
    //                 <Typography
    //                     sx={{
    //                       fontSize: "14px",
    //                       color: "#333333",
    //                       fontFamily: "Arial",
    //                     }}
    //                 >
    //                   Employee
    //                 </Typography>
    //               </Link>
    //             </MenuItem>

    //             <MenuItem onClick={() => handleLogout("redirect")}>
    //               <Link
    //                   style={{ color: "GrayText", fontSize: "14px" }}
    //                   to={`${VIEW_EMPLOYEE_LIST}`}
    //               >
    //                 <Typography
    //                     sx={{
    //                       fontSize: "14px",
    //                       color: "#333333",
    //                       fontFamily: "Arial",
    //                     }}
    //                 >
    //                   Log Out
    //                 </Typography>
    //               </Link>
    //             </MenuItem>
    //           </Menu>
    //         </div>
    //         {/* </IconButton> */}
    //         {/* </Tooltip> */}
    //       </Box>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
}
