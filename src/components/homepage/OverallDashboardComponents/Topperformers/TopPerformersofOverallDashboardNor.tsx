import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton } from "@mui/material";
import { Link,useNavigate  } from "react-router-dom";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import Expand from "../../../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import {useGetEmployeeByFilterQuery} from "../../../../service";
// import {
 
//   TOPPERFORMERS_EXPAND
// } from "../../constants/routes/Routing";
const Contain = styled("div")({
  "& .MuiButton-root": {
    // border: ` 1px solid `,
    // borderColor: "#D4D4D4",
    background: "rgb(155 155 155 / 17%)",
    minWidth: "0px",
    borderRadius: "50px",
    width: "55px",
    height: "55px",
    // "&:focus": {
    //   // borderColor: '#3C8BB5',
    // },
  },
});

export default function TopPerformersofOverallDashboardRev(props:any) {
  const {topPerformerEmployees,navigationFrom,setTopperformersExpandActive} = props;
  const navigate = useNavigate();
  console.log(topPerformerEmployees,"topPerformerEmployeeschild")
  const {data} = useGetEmployeeByFilterQuery('?appraisal.appraiser_rating')
  const handleNavigationForTopPerformers = () =>{
    // if(navigationFrom === "Appraiser"){
    //   navigate("/topperformersexpand")
    //  }else if(navigationFrom === "Reviewer"){
    //   navigate("/topperformersexpandofReviewer")
    //  }else if(navigationFrom === "Normalizer"){
    //   navigate("/topperformersexpandofNormalizer")
    //  }
    setTopperformersExpandActive(true)
  }
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >
          Top Performers
        </Typography>
        
          {/* <IconButton> */}
                  {/* <Link to={"/topperformersexpand"}> */}
                    <img src={Expand} style={{cursor:"pointer"}} onClick={handleNavigationForTopPerformers} />
                  {/* </Link> */}
          {/* </IconButton> */}
       
      </Stack>
      {topPerformerEmployees && topPerformerEmployees?.filter((f:any) => f?.normalizer?.normalizer_rating >= 4 && f?.appraisal?.status == "completed")?.sort((a:any,b:any) => b?.normalizer?.normalizer_rating - a?.normalizer?.normalizer_rating)
      ?.map((i:any) => {

     return(
      <>
      <div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div 
           style={{
            width: '300px'
            //backgroundColor:'coral'
          }} 
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt="Syed"
                  src="/static/images/avatar/5.jpg"
                />
              </Typography>
              <Stack direction="column" spacing={1}>
                <span
                  style={{
                    fontSize: "17px",
                    fontFamily: "Arial",
                    color: "#333333",
                  }}
                >
                  {i?.legal_full_name}
                </span>
                <span
                  style={{
                    color: "#333333",
                    opacity: "50%",
                    fontSize: "12px",
                    fontFamily: "Arial",
                    marginTop: "5px",
                  }}
                >
                  {i?.position_long_description}
                </span>
                <span
                  style={{
                    color: "#333333",
                    opacity: "50%",
                    fontSize: "12px",
                    fontFamily: "Arial",
                    marginTop: "5px",
                  }}
                >
                   Grade {i?.grade}
                </span>
              </Stack>
            </Stack>
          </div>
          <div
          // style={{
          //   width: '80px',
          //   backgroundColor:'skyblue'
          // }} 
          >
            <div
             style={{

              // display:"inline-block",

              // height:"25px",

              // width:"25px",

              // borderRadius: "50%",

              // background: "rgb(155 155 155 / 17%)",

              // padding: "10px",

              // textAlign:"center",

              width: "55px",

                lineHeight:"50px",

                borderRadius: "50%",

                textAlign:"center",

                fontSize: "16px",
                fontFamily: "Arial",
                background: "rgb(155 155 155 / 17%)",

            }}
            >
                  {i?.appraisal?.pa_rating}
            </div>
          </div>
         
        </Stack>
      </div> 
      </>
      )})}
     
         
       
      
    </div>
  );
}
