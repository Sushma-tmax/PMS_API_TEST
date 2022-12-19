import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
//import ChartTabs from "./chartscomponents/charttabs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../assets/Images/Newexcel.svg";
import Expand from "../../assets/Images/Expand.svg";
import Topperformers from "./TopPerformers";
import NineBox from "./NineBox";
//import NBoxGrids from "./chartscomponents/nboxgrids";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useGetNineboxQuery } from "../../service/ninebox/ninebox";
import { useGetEmployeeByFilterQuery } from "../../service";
import Potentialtalents from "../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../assets/Images/Solidtalents.svg";
import Star from "../../assets/Images/Star.svg";
import Inconsistent from "../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../assets/Images/Solidperformer.svg";
import Highperformers from "../../assets/Images/Highperformers.svg";
import * as XLSX from 'xlsx';
import { Link,useNavigate  } from "react-router-dom";

export default function NineboxandTopPerformance(props:any) {
    const { data: user } = useLoggedInUser();
    const navigate = useNavigate();
    const {NineBoxValues,topPerformerEmployees,ExcelData9Box,navigationFrom } = props;
    const [filData, setfilData] = React.useState<any>([]);

    const handleNavigationForNineBox = () =>{
      if(navigationFrom === "Appraiser"){
       navigate("/expandnineboxsolidtalents")
      }else if(navigationFrom === "Reviewer"){
        navigate("/expandnineboxsolidtalentsOfReviewer")
      }else if(navigationFrom === "Normalizer"){
        navigate("/expandnineboxsolidtalentsOfNormalizer")
      }
    }
   
    // const { data:RangeValue } = useGetNineboxQuery("");


  // const [Range, setRange] = React.useState<any>([]);
  // const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  // const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  // const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  // const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  // const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  // const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
  // React.useEffect(() => {
  //     if(RangeValue?.data[0]?.performance_definitions !== undefined){
  //         setRange(RangeValue?.data[0]?.performance_definitions)
  //         setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from)
  //         setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to)
  //         setRangeMediumFrom(RangeValue?.data[0]?.performance_definitions?.medium_from)
  //         setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to)
  //         setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from)
  //         setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to)
  //     }

  // }, [RangeValue])


  // const { data: low_3 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  // );
  // const { data: moderate_3 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  // );
  // const { data: high_3 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  // );
  // {
  //     console.log(high_3, "high");
  // }

  // const { data: low_4 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  // );
  // const { data: moderate_4 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  // );
  // const { data: high_4 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  // );

  // const { data: low_5 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  // );
  // const { data: moderate_5 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  // );
  // const { data: high_5 } = useGetEmployeeByFilterQuery(
  //     `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  // );


    // const NineBoxValues = [
    //     {
    //         title: "Potential Talents",
    //         count: high_3?.count,
    //         color: "linear-gradient(to right, #F89994, #F7665E)",
    //         icon: <img src={Potentialtalents} alt="image" />,
    //     },
    //     {
    //         title: "Solid Talents",
    //         count: high_4?.count,
    //         color: "linear-gradient(to right, #71E1F6, #28B7D3)",
    //         icon: <img src={Solidtalents} alt="image" />,
    //     },
    //     {
    //         title: "Star (A Future Leader)",
    //         count: high_5?.count,
    //         color: "#71E1F6",
    //         icon: <img src={Star} alt="image" />,
    //     },
    //     {
    //         title: "Inconsistent Performers",
    //         count: moderate_3?.count,
    //         color: "linear-gradient(to right, #F89994, #F7665E)",
    //         icon: <img src={Inconsistent} alt="image" />,
    //     },
    //     {
    //         title: "Solid Performers With Potential",
    //         count: moderate_4?.count,
    //         color: "linear-gradient(to right, #33CDB4, #079B82)",
    //         icon: <img src={Solidperformers} alt="image" />,
    //     },
    //     {
    //         title: "High Performers With Potential",
    //         count: moderate_5?.count,
    //         color: "#71E1F6",
    //         icon: <img src={HighPerformerstop} alt="image" />,
    //     },
    //     {
    //         title: "Low Performers",
    //         count: low_3?.count,
    //         color: "linear-gradient(to right, #F89994, #F7665E)",
    //         icon: <img src={Lowperformers} alt="image" />,
    //     },
    //     {
    //         title: "Solid Performers",
    //         count:low_4?.count,
    //         color: "linear-gradient(to right, #33CDB4, #079B82)",
    //         icon: <img src={Solidperformer} alt="image" />,
    //     },
    //     {
    //         title: "High Performers",
    //         count: low_4?.count,
    //         color: "linear-gradient(to right, #33CDB4, #079B82)",
    //         icon: <img src={Highperformers} alt="image" />,
    //     },
    // ];
    // console.log(NineBoxValues,"jjjjjjjj")
    const handleExport = () => {
      
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(ExcelData9Box);
  
  
  
      XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
  
  
  
      XLSX.writeFile(wb, 'MyExcel.xlsx');
    }

  return (
    <div>
      <Box
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          background: "#ffffff",
          padding: "20px",
          height: "650px",
        }}
      >
        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <ChartTabs />
          </Grid>
          <Grid item xs={6}>
            <NBoxGrids />
          </Grid>
        </Grid>  */}

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              paddingBottom="20px"
            >
              <Typography
                sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
              >
                9-Box Grid
              </Typography>
              <div>
                <img src={Newexcel} style={{ paddingRight: "15px" }} onClick={handleExport} />

                <img style={{cursor:"pointer"}} src={Expand} onClick={handleNavigationForNineBox} />
              </div>
            </Stack>
            <NineBox nineboxValues={NineBoxValues} />
          </Grid>
          <Grid
            sx={{
              borderRight: "1px solid gainsboro",
              marginTop: "44px",
              marginBottom: "25px",
            }}
            item
            xs={0.5}
          >
            <div></div>
          </Grid>
          <Grid item xs={3.5}>
            <Topperformers topPerformerEmployees={topPerformerEmployees} navigationFrom={navigationFrom}  />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
