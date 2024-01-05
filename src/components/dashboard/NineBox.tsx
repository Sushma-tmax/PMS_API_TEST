/* eslint-disable */
import React, { useEffect } from "react";
import Time_line from "./timeline/time_line";
import PerformanceRating from "./performanceratingchart/performancerating";
import Team from "./teamtable/team";
import Curveandgrid from "./charts/curveandgrid";
import NBoxGrids from "./charts/chartcomponents/nboxgrids";
import NestedGrid from "./charts/boxgrid";
import { Stack, TextField } from "@mui/material";
import FormRow from "../reviewer/Dashboard/charts/boxgrid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import Verticalnewarrow from "../../assets/Images/Verticalnewarrow.svg";
import Triangle from "../Reviewericons/Triangle.svg";
import Triangle2 from "../Reviewericons/Triangle2.svg";
import Horizontalarrow from "../../assets/Images/Horizontalarrow.svg";
import Timelinerevview from "../reviewer/Dashboard/Timelinerevview";
import { useGetEmployeeByFilterQuery } from "../../service";
import { useGetCalenderQuery } from "../../service";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "center",
  
    color: theme.palette.text.secondary,
  }));
  
  const Text = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "77%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
  });
  
  const Text1 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "108%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    right: "74.3%",
    fontFamily: "regular",
  });
  
  const Text2 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "138%",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    // right: "97%",
    fontFamily: "regular",
  });
  
  const Text3 = styled("div")({
    position: "absolute",
    transform: "rotate(270deg)",
    top: "107%",
    fontSize: "14px",
    color: "#33333",
    right: "81%",
    fontFamily: "regular",
  });
  
  const Para = styled("div")({
    // paddingLeft: "178px",
    display: "flex",
    justifyContent: "center",
    // paddingRight: "60px",
    position: "absolute",
    left: "49%",
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
    top: "156%",
    left: "33%",
  });
  
  const Texthori1 = styled("div")({
    position: "absolute",
    // paddingLeft: "243px",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
    top: "156%",
    left: "49.5%",
  });
  
  const Texthori2 = styled("div")({
    position: "absolute",
    // paddingLeft: "425px",
    fontSize: "12px",
    color: "#33333",
    opacity: "75%",
    fontFamily: "regular",
    top: "156%",
    left: "67%",
  });

function NineBox() {
  const {data:calendarData} = useGetCalenderQuery('')
  const { data: low_3 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=1&appraisal.appraiser_rating[lte]=2.9`)
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=1&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=3`)
  const { data: high_3 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=1&appraisal.potential=High&appraisal.appraiser_rating[lte]=3`)
  { console.log(low_3, 'high') }

  const { data: low_4 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=3&appraisal.potential=Low&appraisal.appraiser_rating[lte]=3.9`)
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=3&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=3.9`)
  const { data: high_4 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=3&appraisal.potential=High&appraisal.appraiser_rating[lte]=3.9`)

  const { data: low_5 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=4&appraisal.potential=High&appraisal.appraiser_rating[lte]=5`)
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=4&appraisal.potential=High&appraisal.appraiser_rating[lte]=5`)
  const { data: high_5 } = useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=4&appraisal.potential=High&appraisal.appraiser_rating[lte]=5`)
  const managerCode = 1038;

  return (
    <div className="Container" style={{ height: "calc (100vh - 500px)" }}>
      <React.Fragment>
        <Typography
          variant="h5"
          align="left"
          sx={{ paddingTop: "30px", marginLeft: 12, marginBottom: 4 }}
          gutterBottom
          component="div"
        >
          9-Box Grid{" "}
        </Typography>
        <Container sx={{ bgcolor: "#fff" }}>

          <Box>
            <Timelinerevview calendarData={calendarData}/>
          </Box>
        </Container>
        <br />

        <Container sx={{ bgcolor: "#fff" }}>

          <Box style={{ paddingLeft: "200px" }}>
            <Stack direction="row" spacing={2}>
              <TextField
                id="All Divisions"
                select
                variant="standard"
                defaultValue="All Divisions"
                sx={{ paddingTop: "20px", marginLeft: 8, marginBottom: 4, width: "15%" }}
              >
              </TextField>
              <TextField
                id="All Sections"
                select
                variant="standard"
                defaultValue="All Sections"
                sx={{ paddingTop: "20px", marginLeft: 8, marginBottom: 4, width: "15%" }}
              >
              </TextField>
              <TextField
                id="All Sub Sections"
                select
                variant="standard"
                defaultValue="All Sub Sections"
                sx={{ paddingTop: "20px", marginLeft: 8, marginBottom: 4, width: "15%" }}
              >
              </TextField>
              <TextField
                id="All Grade"
                select
                variant="standard"
                defaultValue="All Grade"
                sx={{ paddingTop: "20px", marginLeft: 8, marginBottom: 4, width: "15%" }}
              >
              </TextField>

            </Stack>
          </Box>

          <Box style={{ paddingLeft: "200px", height: "600px" }}>
            <Text>
                        <p>High</p>
      </Text>
      <Texthori>
        <p>Low</p>
      </Texthori>
      <Stack direction="row" justifyContent="center" alignItems="center" >
        {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
        <Container sx={{ marginLeft: "10px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#C00000",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
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
              height:"90px"
            }}
          >
                {high_3?.count}
                                    {/* {high_3?.data.filter((item:any) => {
            return item.manager_code === managerCode
           }).count}     */}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-220px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B0F0",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
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
              height:"90px"
            }}
          >{high_4?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-220px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B0F0 ",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
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
            sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5, height:"90px" }}
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
<Container sx={{ marginLeft: "10px", width: "30%" }}>
  <Typography
    textAlign={"center"}
    gutterBottom
    component="div"
    justifyContent="center"
    sx={{
      display: "flex",
      bgcolor: "#C00000",
      fontSize: "13px",
      fontfamily: "regular",
      color: "#fff",
      alignItems: "center",
      height: "40px",
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
      height:"90px"
    }}
  >
      {moderate_3?.count}
  </Typography>
</Container>
{/* </Grid> */}
{/* <Grid item xs={4}> */}
<Container sx={{ marginLeft: "-220px", width: "30%" }}>
  <Typography
    textAlign={"center"}
    gutterBottom
    component="div"
    justifyContent="center"
    sx={{
      display: "flex",
      bgcolor: "#00B050",
      fontSize: "13px",
      fontfamily: "regular",
      color: "#fff",
      alignItems: "center",
      height: "40px",
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
      height:"90px"
    }}
  >
     {moderate_4?.count}
  </Typography>
</Container>
{/* </Grid> */}
{/* <Grid item xs={4}> */}
<Container sx={{ marginLeft: "-220px", width: "30%" }}>
  <Typography
    textAlign={"center"}
    gutterBottom
    component="div"
    justifyContent="center"
    sx={{
      display: "flex",
      bgcolor: "#00B0F0 ",
      fontSize: "13px",
      fontfamily: "regular",
      color: "#fff",
      alignItems: "center",
      height: "40px",
    }}
  >
    HIGH PERFORMERS WITH POTENTIAL
  </Typography>
  <Typography
    variant="h5"
    gutterBottom
    component="div"
    textAlign={"center"}
    sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5, height:"90px" }}
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
        <Container sx={{ marginLeft: "10px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#C00000",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
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
              height:"90px"
              
            }}
          >
             {low_3?.data?.filter((item: any) => {
      return (item.manager_code === managerCode)
    }).count
     
    }
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-220px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B050",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
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
              textAlign: "center", height:"90px"
            }}
          >
             {low_4?.count}
          </Typography>
        </Container>
        {/* </Grid> */}
        {/* <Grid item xs={4}> */}
        <Container sx={{ marginLeft: "-220px", width: "30%" }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            justifyContent="center"
            sx={{
              display: "flex",
              bgcolor: "#00B050 ",
              fontSize: "13px",
              fontfamily: "regular",
              color: "#fff",
              alignItems: "center",
              height: "40px",
            }}
          >
            HIGH PERFORMERS
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            textAlign={"center"}
            sx={{ bgcolor: "#F6FAF2", marginTop: -1, padding: 5, height:"90px" }}
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
          style={{ maxWidth: "0px", minWidth: "78%" }}
        />
        <Para>
          <p>Performance</p>
        </Para>
      </div>
      <div
        style={{
          position: "absolute",
          left: "60px",
          top: "750px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={Verticalnewarrow}
          alt="icon"
          style={{ paddingLeft:"450px", maxHeight: "0px", minHeight: "620px" }}
        />
      </div>
      </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default NineBox;
