/* eslint-disable */
import React  from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Time_line from "./timeline/time_line";
import PerformanceRating from "./performanceratingchart/performancerating";
import Team from "./teamtable/team";
import Curveandgrid from "./charts/curveandgrid";




function  Dashboard (){
    return( 
       <div className="Container">
      <React.Fragment>
      

      <Typography
          variant="h5"
          align="left"
          sx={{ marginLeft: 0, marginBottom: 0 }}
          gutterBottom
          component="div"
        >
         Dashboard{" "}
      </Typography>
      
      <Container maxWidth="xl"
          sx={{ bgcolor: "#fff", height: "30vh", marginBottom: 5 }} >
          <Box sx={{}}></Box>
          <Time_line />
        </Container>

        <Container maxWidth="xl" sx={{ bgcolor: "#fff", marginBottom: 5 }}>
          <Box sx={{}}></Box> 
          <PerformanceRating />
        </Container>
        
        <Container maxWidth="xl" sx={{ bgcolor: "#fff", marginBottom: 5 }}>
          <Box sx={{}}></Box> 
          <Team />
        </Container>
        <Curveandgrid />
    
           
      </React.Fragment>
      </div>
  );
      
     
}



export default Dashboard;







