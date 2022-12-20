import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import { Rotate90DegreesCcw } from "@mui/icons-material";
import Triangle from "../Reviewericons/Triangle.svg";
import Triangle2 from "../Reviewericons/Triangle2.svg";
import Horizontalarrow from "../Reviewericons/Horizontalarrow.svg";
import { useGetEmployeeByFilterQuery } from "../../../../service";
import Verticalnewarrow from "../Reviewericons/Verticalnewarrow.svg";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import {useLoggedInUser} from "../../../../hooks/useLoggedInUser";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",

  color: theme.palette.text.secondary,
}));

const Text = styled("div")({
  position: "absolute",
  transform: "rotate(270deg)",
  top: "23%",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  fontFamily: "Arial",
});

const Text1 = styled("div")({
  position: "absolute",
  transform: "rotate(270deg)",
  top: "48%",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  right: "86%",
  fontFamily: "Arial",
});

const Text2 = styled("div")({
  position: "absolute",
  transform: "rotate(270deg)",
  top: "70%",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  // right: "97%",
  fontFamily: "Arial",
});

const Text3 = styled("div")({
  position: "absolute",
  transform: "rotate(270deg)",
  top: "48%",
  fontSize: "12px",
  color: "#33333",
  right: "91%",
  fontFamily: "Arial",
});

const Para = styled("div")({
  // paddingLeft: "178px",
  display: "flex",
  justifyContent: "center",
  // paddingRight: "60px",
  position: "absolute",
  left: "50%",
  fontSize: "14px",
  color: "#33333",
  fontFamily: "Arial",
});
const Texthori = styled("div")({
  position: "absolute",
  // paddingLeft: "83px",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  fontFamily: "Arial",
  top: "81%",
  left: "28%",
});

const Texthori1 = styled("div")({
  position: "absolute",
  // paddingLeft: "243px",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  fontFamily: "Arial",
  top: "81%",
  left: "52%",
});

const Texthori2 = styled("div")({
  position: "absolute",
  // paddingLeft: "425px",
  fontSize: "12px",
  color: "#33333",
  opacity: "75%",
  fontFamily: "Arial",
  top: "81%",
  left: "79%",
});

export default function FormRow() {

    const { data: user } = useLoggedInUser();


    const { data:RangeValue } = useGetNineboxQuery("");

  const [Range, setRange] = React.useState<any>([]);
  const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
  React.useEffect(() => {
    if(RangeValue?.data[0]?.performance_definitions !== undefined){
      setRange(RangeValue?.data[0]?.performance_definitions)
      setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from)
      setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to)
      setRangeMediumFrom(RangeValue?.data[0]?.performance_definitions?.medium_from)
      setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to)
      setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from)
      setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to)
    }
    
  }, [RangeValue])


  const { data: low_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );

  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );

  // console.log(data?.count, 'filter')
  return (
    <React.Fragment>

      <Stack
      direction="row"
      // alignItems="center"
      // justifyContent="center"
      paddingRight="30px"
      
      >
      <div style={{position:"relative"}}>
        <p
        style={{
          position: "absolute",
          transform: "rotate(270deg)",
          top: "39%",
          fontSize: "14px",
          color: "#333333",
          right: "91%",
          fontFamily: "Arial",
        }}
>
      
        Potential</p>
      </div>
      <Stack
      minWidth="100%"
      >
        {/* <Text>
        <p>High</p>
      </Text> */}
        {/* <Texthori>
        <p>Low</p>
      </Texthori> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
          <div
            style={{
              width: "1%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                transform: "rotate(270deg)",
                fontSize: "12px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
            >
              High
            </div>
          </div>
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#C00000",
                fontSize: "10px",
                fontFamily: "Arial",
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
              }}
            >
              {console.log(high_3, "high")}
              {high_3?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B0F0",
                fontSize: "10px",
                fontFamily: "Arial",
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
              }}
            >
              {high_4?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B0F0 ",
                fontSize: "10px",
                fontFamily: "Arial",
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
              sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5 }}
            >
              {high_5?.count}
            </Typography>
          </div>
          {/* </Grid> */}
        </Stack>

        {/* 2nd Box */}

        {/* <Texthori1>
        <p>Medium</p>
      </Texthori1> */}
        {/* <Text3>
        <p>Potential</p>
      </Text3> */}
        {/* <Text1>
        <p>Moderate</p>
      </Text1> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <div
            style={{
              width: "1%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                transform: "rotate(270deg)",
                fontSize: "12px",
                color: "#00B050",
                fontFamily: "Arial",
              }}
            >
              Moderate
            </div>
          </div>
          {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
          <div style={{ width: "40%", position: "relative" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              position="relative"
              sx={{
                display: "flex",
                bgcolor: "#C00000",
                fontSize: "10px",
                fontFamily: "Arial",
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
              }}
            >
              {moderate_3?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B050",
                fontSize: "10px",
                fontFamily: "Arial",
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
              }}
            >
              {moderate_4?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B0F0 ",
                fontSize: "10px",
                fontFamily: "Arial",
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
              sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 5 }}
            >
              {moderate_5?.count}
            </Typography>
          </div>
          {/* </Grid> */}
        </Stack>

        {/* 3rd Box */}

        {/* <Text2>
        <p>Low</p>
      </Text2> */}
        {/* <Texthori2>
        <p>High</p>
      </Texthori2> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
          <div
            style={{
              width: "1%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                transform: "rotate(270deg)",
                fontSize: "12px",
                color: "#C00000",
                fontFamily: "Arial",
              }}
            >
              Low
            </div>
          </div>
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#C00000",
                fontSize: "10px",
                fontFamily: "Arial",
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
              }}
            >
              {low_3?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B050",
                fontSize: "10px",
                fontFamily: "Arial",
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
                textAlign: "center",
              }}
            >
              {low_4?.count}
            </Typography>
          </div>
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <div style={{ width: "40%" }}>
            <Typography
              textAlign={"center"}
              gutterBottom
              component="div"
              justifyContent="center"
              sx={{
                display: "flex",
                bgcolor: "#00B050 ",
                fontSize: "10px",
                fontFamily: "Arial",
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
              sx={{ bgcolor: "#F6FAF2", marginTop: -1, padding: 5 }}
            >
              {low_5?.count}
            </Typography>
          </div>
          {/* </Grid> */}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <div
            style={{
              width: "1%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          ></div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              fontSize: "12px",
              color: "#C00000",
              fontFamily: "Arial",
            }}
          >
            Low
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              fontSize: "12px",
              color: "#00B050",
              fontFamily: "Arial",
            }}
          >
            Medium
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "center",
              fontSize: "12px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            High
          </div>
        </Stack>
        <div style={{ paddingLeft: "37px", paddingTop: "10px" }}>
          <img
            src={Horizontalarrow}
            alt="icon"
            style={{ maxWidth: "0px", minWidth: "100%" }}
          />
          <Para>
            <p>Performance</p>
          </Para>
        </div>

        <div
          style={{
            position: "absolute",
            left: "60px",
            top: "305px",
            transform: "translate(-50%, -50%)",
            paddingLeft:"20px"
          }}
        >
          <img
            src={Verticalnewarrow}
            alt="icon"
            style={{ maxHeight: "0px", minHeight: "445px" }}
          />
        </div>
      </Stack>
      </Stack>
    </React.Fragment>
  );
}

// export default function NestedGrid() {
//   return (
//     <>
//       {/* <div style={{ position: "absolute", top: "173%", right: "43.7%" }}>
//         <img
//           src={Triangle}
//           style={{ paddingRight: "10px", maxHeight: "0px", minHeight: "15px" }}
//         /
//       </div>
//       <div style={{ position: "absolute", top: "245%", right: "43.7%" }}>
//         <img
//           src={Triangle2}
//           style={{ paddingRight: "10px", maxHeight: "0px", minHeight: "15px" }}
//         />
//       </div>
//       <div style={{ position: "absolute", top: "175%", right: "45%" }}>
//         <img
//           src={Verticalarrow}
//           alt="icon"
//           style={{ maxHeight: "0px", minHeight: "430px" }}
//         />
//       </div> */}

//       <Box sx={{ flexGrow: 1, position: "relative" }}>
//         <Grid width="110%" container spacing={1}>
//           <Text>
//             <p>High</p>
//           </Text>
//           <Texthori>
//             <p>Low</p>
//           </Texthori>
//           <Grid container item spacing={3}>
//             <FormRow />
//           </Grid>

//           <Text1>
//             <p>Moderate</p>
//           </Text1>
//           <Texthori1>
//             <p>Medium</p>
//           </Texthori1>
//           <Text3>
//             <p>Potential</p>
//           </Text3>
//           <Grid container item spacing={3}>
//             <FormRow />
//           </Grid>

//           <Text2>
//             <p>Low</p>
//           </Text2>
//           <Texthori2>
//             <p>High</p>
//           </Texthori2>
//           <Grid container item spacing={3}>
//             <FormRow />
//           </Grid>
//         </Grid>

//       </Box>
//       <div style={{ paddingLeft: "37px", paddingTop: "25px" }}>
//         <img
//           src={Horizontalarrow}
//           alt="icon"
//           style={{ maxWidth: "0px", minWidth: "92%" }}
//         />
//         <Para>
//           <p>Performance</p>
//         </Para>
//       </div>

//       <div
//         style={{
//           position: "absolute",
//           left: "60px",
//           top: "325px",
//           transform: "translate(-50%, -50%)",
//         }}
//       >
//         <img
//           src={Verticalnewarrow}
//           alt="icon"
//           style={{ maxHeight: "0px", minHeight: "455px" }}
//         />
//       </div>
//     </>
//   );
// }
