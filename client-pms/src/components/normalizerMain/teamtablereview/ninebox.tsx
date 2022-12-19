import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Typography, Stack } from "@mui/material";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { styled } from "@mui/material/styles";
import Newexcel from "../Reviewericons/Newexcel.svg";
import Horizontalarrow from "../Reviewericons/Horizontalarrow.svg";
import { useGetEmployeeByFilterQuery } from"../../../service";
import Verticalnewarrow from "../Reviewericons/Verticalnewarrow.svg";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";

// import NBoxGrids from "./chartscomponents/nboxgrids";
// const componentRef = useRef(null);
//     const handlePrint = useReactToPrint({
//       content: () => componentRef.current,
//     });
const Heading = styled("div")({
  fontSize: "18px",
  color: "#3e8cb5",
  fontFamily: "Arial",
  // paddingTop: "25px",
  // marginLeft: "20px",
});
const Para = styled("div")({
  // paddingLeft: "178px",
  display: "flex",
  justifyContent: "center",
  // paddingRight: "60px",
  position: "absolute",
  left: "50%",
  fontSize: "16px",
  color: "#333333",
  fontFamily: "Arial",
});
export default function Ninebox() {

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
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  {
    console.log(high_3, "high");
  }

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );

  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  return (
    <div
      style={{
        background: "#FFFFFF",
        marginLeft: "25px",
        marginRight: "25px",
        height:"970px"
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="30px"
        paddingBottom="10px"
      >
        <Heading>9-Box Grid</Heading>
        <Typography>
          <img src={Newexcel} style={{ height: "20px" }} alt="Excel" />
        </Typography>
      </Stack>

      <div>
        <Stack
          direction="row"
          // alignItems="center"
          // justifyContent="center"
          paddingRight="30px"
        >
          <div style={{ position: "relative" }}>
            <p
              style={{
                position: "absolute",
                transform: "rotate(270deg)",
                top: "39%",
                fontSize: "14px",
                color: "#33333",
                // right: "91%",
                fontFamily: "Arial",
              }}
            >
              Potential
            </p>
          </div>
          <Stack minWidth="95%"
          paddingLeft="88px"
          >
          <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="20px"
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
                    fontSize: "14px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                    paddingBottom:"50px",
                    fontWeight:"600"
                  }}
                >
                  High
                </div>
              </div>
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#C00000",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                    height: "50px",
                  }}
                >
                  POTENTIAL TALENTS
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    bgcolor: "#FDF2EF",
                    marginTop: -1,
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {console.log(high_3, "high")}
                  {high_3?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B0F0",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
                  }}
                >
                  SOLID TALENTS
                </Typography>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    bgcolor: "#EDF9FE",
                    marginTop: -1,
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {high_4?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B0F0 ",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
                  }}
                >
                  STARS
                  <br />
                  (A FUTURE LEADER)
                </Typography>
                <Typography
                 
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 8, fontSize: "14px",
                  color:"#333333",
                  opacity:"80%" }}
                >
                  {high_5?.count}
                </Typography>
              </div>
              {/* </Grid> */}
            </Stack>

           
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="20px"
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
                    fontSize: "14px",
                    color: "#00B050",
                    fontFamily: "Arial",
                    paddingBottom:"50px",
                    fontWeight:"600"
                  }}
                >
                  Moderate
                </div>
              </div>
              {/* <Grid item xs={4}  sx={{ width: "40px" }}> */}
              <div style={{ width: "25%", position: "relative" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  position="relative"
                  sx={{
                    display: "flex",
                    bgcolor: "#C00000",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
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
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {moderate_3?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B050",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
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
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {moderate_4?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B0F0 ",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
                  }}
                >
                  HIGH PERFORMERS WITH POTENTIAL
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  sx={{ bgcolor: "#EDF9FE", marginTop: -1, padding: 8, fontSize: "14px",
                  color:"#333333",
                  opacity:"80%" }}
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
              gap="20px"
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
                    fontSize: "14px",
                    color: "#C00000",
                    fontFamily: "Arial",
                    paddingBottom:"50px",
                    fontWeight:"600"
                  }}
                >
                  Low
                </div>
              </div>
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#C00000",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
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
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {low_3?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B050",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
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
                    padding: 8,
                    textAlign: "center",
                    fontSize: "14px",
                    color:"#333333",
                    opacity:"80%"
                  }}
                >
                  {low_4?.count}
                </Typography>
              </div>
              {/* </Grid> */}
              {/* <Grid item xs={4}> */}
              <div style={{ width: "25%" }}>
                <Typography
                  textAlign={"center"}
                  gutterBottom
                  component="div"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    bgcolor: "#00B050 ",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#fff",
                    alignItems: "center",
                     height: "50px",
                  }}
                >
                  HIGH PERFORMERS
                </Typography>
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  textAlign={"center"}
                  sx={{ bgcolor: "#F6FAF2", marginTop: -1, padding: 8, fontSize: "14px",
                  color:"#333333",
                  opacity:"80%" }}
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
              position="relative"
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
                  fontSize: "16px",
                  color: "#C00000",
                  fontFamily: "Arial",
                  paddingTop:"10px",
                  fontWeight:"600"
                }}
              >
                Low
              </div>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#00B050",
                  fontFamily: "Arial",
                  paddingTop:"10px",
                  fontWeight:"600"
                }}
              >
                Medium
              </div>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "#3e8cb5",
                  fontFamily: "Arial",
                  paddingTop:"10px",
                  fontWeight:"600"
                }}
              >
                High
              </div>
              
            </Stack>
           
            <div 
              >
              {/* <img
                src={Horizontalarrow}
                alt="icon"
                style={{ maxWidth: "0px", minWidth: "100%" }}
              /> */}
              <Para>
                <p>Performance</p>
              </Para>
            </div>
            <div
              style={{
                position: "absolute",
                left: "60px",
                top: "348px",
                transform: "translate(-50%, -50%)",
                paddingLeft: "20px",
              }}
            >
              {/* <img
                src={Horizontalarrow}
                alt="icon"
                style={{ maxHeight: "0px", minHeight: "645px" }}
              /> */}
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
