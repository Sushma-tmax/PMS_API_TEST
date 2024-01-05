import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
//import ChartTabs from "./chartscomponents/charttabs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Expand from "../../../../assets/Images/Expand.svg";
import Topperformers from "../../TopPerformers";
import NineBox from "../../NineBox";
//import NBoxGrids from "./chartscomponents/nboxgrids";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import { useGetEmployeeByFilterQuery } from "../../../../service";
import Potentialtalents from "../../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../../assets/Images/Solidtalents.svg";
import Star from "../../../../assets/Images/Star.svg";
import Inconsistent from "../../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../../assets/Images/Highperformers.svg";
import * as XLSX from 'xlsx';
import { Link, useNavigate } from "react-router-dom";
import TopPerformerspfOverallDashboard from "../Topperformers/TopPerformerspfOverallDashboard";

export default function NineboxandTopPerformanceofNormalizerOverallDashboard(props: any) {
  const { data: user } = useLoggedInUser();
  const { data:RangeValue } = useGetNineboxQuery("");
  const navigate = useNavigate();
  const { NineBoxData, topPerformerEmployees, ExcelData9Box,
    setNineboxExpand, navigationFrom,setTopperformersExpandActive,
    indexBasedValue, setindexBasedValue,indexBasedTitle, setindexBasedTitle,setSolidperformersExpandActive
  } = props;
  const [filData, setfilData] = React.useState<any>([]);
  const [datanew, setDatanew] = React.useState<any>(false);
const id = 5;
  const handleNavigationForNineBox = () => {
    setSolidperformersExpandActive(true);
    // setDatanew(true);
    // setNineboxExpand(true)
    // if (navigationFrom === "Appraiser") {
    //   setDatanew(true);
    //   navigate("/expandnineboxsolidtalentsOfOverallDashboard", { state: {datanew:datanew} })  
    // } else if (navigationFrom === "Reviewer") {
    //   setDatanew(true);
    //   navigate("/expandnineboxsolidtalentsReviewerOfOverallDashboard", { state: {datanew:datanew} })
    // } else if (navigationFrom === "Normalizer") {
    //   setDatanew(true);
    //   navigate("/expandnineboxsolidtalentsNormalizerOfOverallDashboard", { state: {datanew:datanew} })
    // }
  }
 

  // const { data:RangeValue } = useGetNineboxQuery("");


  const [indexValue, setindexValue] = React.useState<any>('');
  console.log(indexBasedValue,indexValue,"indexBasedValue")

  console.log(indexBasedTitle,"indexBasedTitle")
  const [Range, setRange] = React.useState<any>([]);
  const [select, setSelect] = React.useState<any>([]);
    const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
    const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
    const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
    const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
    const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
    const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [trigger, setTrigger] = React.useState<any>(false);
    console.log(trigger,"trigger")
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
 
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
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
{
    console.log(high_3, "high");
}

const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);
const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);
const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);

const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,talent_category,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&normalizer_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const HandleNaviation = () => {
  setTrigger(true);
}
React.useEffect(()=>{
  console.log(indexBasedTitle,"indexBasedTitle")
  // const HandleNaviation = () => {

  // if(indexBasedTitle == undefined  ){

 if(trigger === true){

 
  if(navigationFrom === "Normalizer"){
    if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title ){
      setNineboxExpand(true)
    //  navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title ){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title ){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title ){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title){
      setNineboxExpand(true)
      //navigate("/expandnineboxsolidtalents", { state: {indexBasedTitle :indexBasedTitle,indexBasedValue:indexBasedValue} })
    }
  }

  // else if(navigationFrom === "Reviewer"){
  //   if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title){
  //     navigate("/expandnineboxsolidtalentsOfReviewer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }
  // }else if(navigationFrom === "Normalizer"){
  //   if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title){
  //     navigate("/expandnineboxsolidtalentsOfNormalizer", { state: {indexBasedTitle :indexBasedTitle} })
  //   }
  // }
// }
}
},[indexBasedTitle])
const setIndexBasedValueforNineBox = (indexValue: any) => {
  if (indexValue == 0) {
     setindexBasedValue(NineBoxData[0]?.category)
     setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
     console.log(indexBasedTitle, "indexBasedTitleinsideuseEffect")
   }
 }
  React.useEffect(() => {
    let DataforInitial: any[] = NineBoxData[0]?.category?.concat(NineBoxData[1]?.category, NineBoxData[2]?.category,NineBoxData[3]?.category, NineBoxData[4]?.category, NineBoxData[5]?.category,NineBoxData[6]?.category, NineBoxData[7]?.category, NineBoxData[8]?.category)
    console.log(DataforInitial,"DataforInitial")
 if(indexValue == ""){
   setindexBasedValue(DataforInitial) 
 }
   else if(indexValue == 0){
      setindexBasedValue(NineBoxData[0]?.category)
      console.log(NineBoxData[0],"NineBoxData")
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
    }else if(indexValue == 1){
      setindexBasedValue(NineBoxData[1]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[1]?.title)
    }else if(indexValue == 2){
      setindexBasedValue(NineBoxData[2]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[2]?.title)
    }else if(indexValue == 3){
      setindexBasedValue(NineBoxData[3]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[3]?.title)
    }else if(indexValue == 4){
      setindexBasedValue(NineBoxData[4]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[4]?.title)
    }else if(indexValue == 5){
      setindexBasedValue(NineBoxData[5]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[5]?.title)
    }else if(indexValue == 6){
      setindexBasedValue(NineBoxData[6]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[6]?.title)
    }else if(indexValue == 7){
      setindexBasedValue(NineBoxData[7]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[7]?.title)
    }else if(indexValue == 8){
      setindexBasedValue(NineBoxData[8]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[8]?.title)
    }
  // },[indexValue])
  }, [indexValue,NineBoxData[0]?.category,NineBoxData[8]?.category,NineBoxData[7]?.category,NineBoxData[6]?.category,NineBoxData[5]?.category
  ,NineBoxData[4]?.category,NineBoxData[3]?.category,NineBoxData[2]?.category,NineBoxData[1]?.category])

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
          height: "auto",
          paddingBottom:"50px"
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
          <Grid sx={{paddingRight:"16px"}}item md={12}  xs={12} lg={8}>
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
                {/* <img src={Newexcel} style={{ paddingRight: "15px" }} onClick={handleExport} /> */}

                <img style={{ cursor: "pointer" }} src={Expand} onClick={handleNavigationForNineBox} />
              </div>
            </Stack>
            <NineBox setIndexBasedValueforNineBox={setIndexBasedValueforNineBox}
            nineboxValues={NineBoxData} navigationFrom={navigationFrom} HandleNaviation={HandleNaviation}   setindexValue={setindexValue}/>
          </Grid>
          {/* <Grid
            sx={{
              borderRight: "1px solid gainsboro",
              marginTop: "44px",
              marginBottom: "25px",
            }}
            item
            xs={0.5}
          >
            <div></div>
          </Grid> */}
          
          <Grid 
          sx={{
              borderLeft: "1px solid #EEEEEE",
              '@media (max-width: 1024px)': {
                borderLeft: "none",
                marginTop:"20px"
              }
              // marginTop: "44px",
              // marginBottom: "25px",
            }}item xs={12} md={12} lg={4}>
            {topPerformerEmployees != undefined &&
              <TopPerformerspfOverallDashboard topPerformerEmployees={topPerformerEmployees} navigationFrom={navigationFrom} setTopperformersExpandActive={setTopperformersExpandActive} />
            }
            
          </Grid>
          
        </Grid>
      </Box>
    </div>
  );
}
