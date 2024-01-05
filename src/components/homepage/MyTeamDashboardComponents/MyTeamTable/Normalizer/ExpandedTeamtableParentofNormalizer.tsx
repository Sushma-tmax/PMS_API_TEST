import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Stack,Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
// import Newexcel from "../../assets/Images/Newexcel.svg";
import Newexcel from "../../../../../assets/Images/Newexcel.svg"
import Timelinerevview from "../../../../reviewer/Dashboard/Timelinerevview";
import ExpandedTeamTableofNormalizer from "./ExpandedTeamTableofNormalizer";
import Leftarrow from "../../../../../assets/Images/Leftarrow.svg";
import { Link,useNavigate,useLocation  } from "react-router-dom";
interface StateType {
  range: {
    users: any[]; // Replace 'any' with the appropriate type for the 'users' property
    // Other properties in the 'range' object if any
  };
  // Other properties in the state object if any
}
export default function ExpandedTeamtableParentofNormalizer(props: any) {
  const navigate = useNavigate();
  const location: any = useLocation();
console.log(location?.state,"location")
const [breadCrumbName, setbreadCrumbName] = React.useState<any>("")
// const expandEmployees =location?.state?.range?.users || [] ;
const tabLocation = location?.state?.tab;
const expandEmployees = (location?.state as StateType)?.range?.users;
  return (

    <>
      <div
        style={{
          background: "#f1f1f1",
          minHeight: "100px",
          overflow: "hidden",
           height: "auto",
        }}
      >
        <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    spacing={0}
    minHeight="50px"
    marginLeft="32px"
  >
        <Breadcrumbs aria-label="breadcrumb">
        <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/normalizer"}
              state={{
                from: "toMyTeamDashboard",
               }}
            >
              My Team Dashboard
            </Link>
      <Link
       to={"/normalizer"}
       state={{
        from: `${1}`
      }}
      >
      <Typography
        style={{
          fontSize: "18px",
          color: "#3e8cb5",
          fontFamily: "Arial",
        }}
        color="text.primary"
      >
      My Actions
      </Typography>
      </Link>
      <Typography
        style={{
          fontSize: "18px",
          color: "#333333",
          fontFamily: "Arial",
        }}
        color="text.primary"
      >
   {breadCrumbName}
      </Typography>
    </Breadcrumbs>
  </Stack>
        {/* <Stack direction="row" alignItems="center" minHeight="50px" marginLeft="15px">
        <IconButton
        onClick={() => {
          navigate(-1)
        }}
        >
          <img src={Leftarrow} alt="button" />
        </IconButton>
        <Typography
        sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >9-Box Grid</Typography>
        </Stack> */}
        {/* <div
          style={{
            fontSize: "20px",
            color: "#333333",
            padding: "20px",
            fontFamily: "arial",
            backgroundColor: "white",
            marginLeft: "25px",
            marginRight: "25px"

          }}>
          Timeline
        </div>
        <div >
          <Timelinerevview />
        </div> */}
        <div>
          <ExpandedTeamTableofNormalizer 
          expandEmployees ={expandEmployees}
          setbreadCrumbName={setbreadCrumbName}
          tabLocation={tabLocation}
          />
        </div>
      </div>
    </>
  );
}
