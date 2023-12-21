/* eslint-disable */
import React from "react";
import { Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import Verticalnewarrow from "../../assets/Images/Verticalnewarrow.svg";
import Triangle from "../Reviewericons/Triangle.svg";
import Triangle2 from "../Reviewericons/Triangle2.svg";
import Horizontalarrow from "../../assets/Images/Horizontalarrow.svg";
import Timelinerevview from "../reviewer/Dashboard/Timelinerevview";
import {useGetEmployeeByFilterQuery} from "../../service";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "center",
  
    color: theme.palette.text.secondary,
  }));
  
  const Text = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "45%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
  });
  
  const Text1 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "68%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    right: "81.5%",
    fontFamily: "regular",
  });
  
  const Text2 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "90%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    // right: "97%",
    fontFamily: "regular",
  });
  
  const Text3 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "68%",
    fontSize: "14px",
    color: "#33333",
    right: "88%",
    fontFamily: "regular",
  });
  
  const Para = styled("div")({
    // paddingLeft: "178px",
    display: "flex",
    justifyContent: "center",
    // paddingRight: "60px",
    position: "absolute",
    left: "47%",
    fontSize: "12px",
    color: "#33333",
    fontFamily: "regular",
  });
  const Texthori = styled("div")({
    position: "absolute",
    // paddingLeft: "83px",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
    top: "104%",
    left: "25%",
  });
  
  const Texthori1 = styled("div")({
    position: "absolute",
    // paddingLeft: "243px",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
    top: "104%",
    left: "48%",
  });
  
  const Texthori2 = styled("div")({
    position: "absolute",
    // paddingLeft: "425px",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
    top: "104%",
    left: "73%",
  });

  

function NormalizerNineBox() {

  const {data: low_3} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=1&normalizer.normalizer_rating[lte]=3`)
  const {data:moderate_3} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=1&normalizer.potential=Moderate&normalizer.normalizer_rating[lte]=3`)
  const {data:high_3} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=1&normalizer.potential=High&normalizer.normalizer_rating[lte]=3`)
  {console.log(high_3,'high')}

  const {data:low_4} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=3&normalizer.potential=Low&normalizer.normalizer_rating[lte]=3.9`)
  const {data:moderate_4} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=3&normalizer.potential=Moderate&normalizer.normalizer_rating[lte]=3.9`)
  const {data: high_4} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=3&normalizer.potential=High&normalizer.normalizer_rating[lte]=3.9`)

  const {data:low_5} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=4&normalizer.potential=High&normalizer.normalizer_rating[lte]=5`)
  const {data:moderate_5} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=4&normalizer.potential=High&normalizer.normalizer_rating[lte]=5`)
  const {data:high_5} = useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_rating,normalizer.potential,manager_code&normalizer.normalizer_rating[gte]=4&normalizer.potential=High&normalizer.normalizer_rating[lte]=5`)


  const managerCode = 1038;
  
  return (
    <div className="Container" style={{ height: "calc (100vh - 500px)"}}>
      <React.Fragment>
        <Typography
          variant="h5"
          align="left"
          sx={{ paddingTop:"30px", marginLeft: 12, marginBottom: 4 }}
          gutterBottom
          component="div"
        >
          9-Box Grid{" "}
        </Typography>
        <Container sx={{ bgcolor: "#fff" }}>

        <Box>
            <Timelinerevview/>
            </Box>
            </Container>
        <br/>
        
        <Container sx={{ bgcolor: "#fff" }}>
            
            <Box style={{paddingLeft:"200px"}}>
            <Stack direction="row" spacing={2}>
            <TextField
          id="All Divisions"
          select
          variant="standard"
          defaultValue="All Divisions"
          sx={{ paddingTop:"20px", marginLeft: 8, marginBottom: 4, width:"15%" }}
        >
        </TextField>
        <TextField
          id="All Sections"
          select
          variant="standard"
          defaultValue="All Sections"
          sx={{ paddingTop:"20px", marginLeft: 8, marginBottom: 4, width:"15%" }}
        >
        </TextField>
        <TextField
          id="All Sub Sections"
          select
          variant="standard"
          defaultValue="All Sub Sections"
 sx={{ paddingTop:"20px", marginLeft: 8, marginBottom: 4, width:"15%" }}
        >
        </TextField>
        <TextField
          id="All Grade"
          select
          variant="standard"
          defaultValue="All Grade"
          sx={{ paddingTop:"20px", marginLeft: 8, marginBottom: 4, width:"15%" }}
        >
        </TextField>

            </Stack>
            </Box>
            
            <Box style={{paddingLeft:"200px", height:"600px"}}>
            <Text>
        <p>High</p>
      </Text>
      <Texthori>
        <p>Low</p>
      </Texthori>
      <Stack direction="row" justifyContent="center" alignItems="center" >
        {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
        <Container sx={{ marginLeft: "10px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#C00000",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            POTENTIAL TALENTS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#FDF2EF",
              marginTop: -1,
              padding: 5,
              textAlign: "center",
              height:"70px"
            }}
          >
           {/* {high_3?.count}     */}
           {high_3?.data.filter((item:any) => {
            return item.manager_code === managerCode
           }).count}    
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B0F0",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            SOLID TALENTS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#EDF9FE",
              marginTop: -1,
              padding: 5,
              textAlign: "center",
              height:"70px"
            }}
          > {high_4?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B0F0 ",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            STARS
            <br />
            (A FUTURE LEADER)
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            textAlign={"center"}
            sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5, height:"70px" }}
          >
             {high_5?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
      </Stack>

      {/* 2nd Box */}
      <Text1>
        <p>Moderate</p>
      </Text1>
      <Texthori1>
        <p>Medium</p>
      </Texthori1>
      <Text3>
        <p>Potential</p>
      </Text3>

      <Stack direction="row" justifyContent="center" alignItems="center">
        {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
        <Container sx={{ marginLeft: "10px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#C00000",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            INCONSISTENT PERFORMERS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#FDF2EF",
              marginTop: -1,
              padding: 5,
              textAlign: "center",
              height:"70px"
            }}
          >
             {moderate_3?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B050",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            SOLID PERFORMERS WITH POTENTIAL
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#F6FAF2",
              marginTop: -1,
              padding: 5,
              textAlign: "center",
              height:"70px"
            }}
          >
             {moderate_4?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B0F0 ",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            HIGH PERFORMERS WITH POTENTIAL
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            textAlign={"center"}
            sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5, height:"70px" }}
          >
              {moderate_5?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
      </Stack>

      {/* 3rd Box */}

      <Text2>
        <p>Low</p>
      </Text2>
      <Texthori2>
        <p>High</p>
      </Texthori2>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
        <Container sx={{ marginLeft: "10px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#C00000",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            LOW PERFORMERS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#FDF2EF",
              marginTop: -1,
              padding: 5,
              textAlign: "center",
              height:"70px"
              
            }}
          >
               {low_3?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B050",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            SOLID PERFORMERS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{
              bgcolor: "#F6FAF2",
              marginTop: -1,
              padding: 5,
              textAlign: "center", height:"70px"
            }}
          >
             {low_4?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-250px", width: "25%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B050 ",
              fontSize: "10px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "34px",
            }}
          >
            HIGH PERFORMERS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            textAlign={"center"}
            sx={{ bgcolor: "#F6FAF2", marginTop: -1, padding: 5, height:"70px" }}
          >
             {low_5?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
      </Stack>
      <div style={{ paddingLeft: "37px", paddingTop: "25px" }}>
        <img
          src={Horizontalarrow}
          alt="icon"
          style={{ maxWidth: "0px", minWidth: "85%" }}
        />
        <Para>
          <p>Performance</p>
        </Para>
      </div>

      <div
        style={{
          position: "absolute",
          left: "60px",
          top: "470px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={Verticalnewarrow}
          alt="icon"
          style={{ paddingLeft:"250px", maxHeight: "0px", minHeight: "445px" }}
        />
      </div>
      </Box>
    
        </Container>
      </React.Fragment>
    </div>
  );
}

export default NormalizerNineBox;
