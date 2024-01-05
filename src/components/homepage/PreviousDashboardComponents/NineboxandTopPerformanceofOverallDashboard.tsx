import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, IconButton } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
//import ChartTabs from "./chartscomponents/charttabs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../assets/Images/Newexcel.svg";
import Expand from "../../../assets/Images/Expand.svg";
import Topperformers from "../TopPerformers";
import NineBox from "../NineBox";
//import NBoxGrids from "./chartscomponents/nboxgrids";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import { useGetEmployeeByFilterQuery } from "../../../service";
import Potentialtalents from "../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../assets/Images/Solidtalents.svg";
import Star from "../../../assets/Images/Star.svg";
import Inconsistent from "../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../assets/Images/Highperformers.svg";
import * as XLSX from 'xlsx';
import { Link, useNavigate } from "react-router-dom";
import TopPerformerspfOverallDashboard from "../OverallDashboardComponents/Topperformers/TopPerformerspfOverallDashboard";
import { useGetPreviousAppraisalEmployeeByFilterQuery } from "../../../service/employee/previousAppraisal";
import TopPerformersofPaDashboard from "./Topperformers/TopPerformersofPaDashboard";

export default function NineboxandTopPerformanceofOverallDashboard(props: any) {
   const { data: user } = useLoggedInUser();
  const { data:RangeValue } = useGetNineboxQuery("");
  const navigate = useNavigate();
  const { NineBoxValues,valueOfActiveCalender, topPerformerEmployees, ExcelData9Box, navigationFrom ,DataforInitial,high3Value,high4Value,high5Value,
    low3Value,low4Value,low5Value,moderate3Value,moderate4Value,moderate5Value,appCalId} = props;
  const [filData, setfilData] = React.useState<any>([]);
  const [datanew, setDatanew] = React.useState(false);
  const [expandtrigger, setExpandtrigger] = React.useState(false);
console.log(high3Value,high4Value,high5Value,
  low3Value,low4Value,low5Value,moderate3Value,moderate4Value,moderate5Value,"expandtrigger")

const id = 5;
  const handleNavigationForNineBox = () => {
    // setExpandtrigger(true);
    if (navigationFrom === "Appraiser") {
      navigate("/FilteredTableofAppraiserExpNineBoxClosed", { state: { indexBasedValue:indexBasedValue,indexBasedTitle:indexBasedTitle,valueOfActiveCalender } })
    } else if (navigationFrom === "Reviewer") {
      // navigate("/expandnineboxsolidtalentsOfReviewer")
      navigate("/FilteredTableofReviewerExpNineBoxClosed", { state: { indexBasedValue:indexBasedValue,indexBasedTitle:indexBasedTitle,valueOfActiveCalender } })

    } else if (navigationFrom === "Normalizer") {
      // navigate("/expandnineboxsolidtalentsOfNormalizer")
     navigate("/nineboxexpandTable",{  state: { indexBasedValue:indexBasedValue,indexBasedTitle:indexBasedTitle,valueOfActiveCalender } }) 

    }
  }
//  React.useEffect(()=>{
//   if(expandtrigger == true){
//   if (navigationFrom === "Appraiser") {
//     navigate("/expandnineboxsolidtalents",{state :{expandtrigger:expandtrigger} })  
//   } else if (navigationFrom === "Reviewer") {
//     navigate("/expandnineboxsolidtalentsOfReviewer")
//   } else if (navigationFrom === "Normalizer") {
//     navigate("/expandnineboxsolidtalentsOfNormalizer")
//   }
// }
//  },[expandtrigger])

  // const { data:RangeValue } = useGetNineboxQuery("");


  const [indexValue, setindexValue] = React.useState<any>('');
  const [indexBasedValue, setindexBasedValue] = React.useState<any>([]);
  const [indexBasedTitle, setindexBasedTitle] = React.useState<any>('');
  console.log(indexBasedValue,"indexBasedValue")
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

  const { data: low_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
const { data: moderate_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
const { data: high_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
);
{
    console.log(high_3, "high");
}

const { data: low_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);
const { data: moderate_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);
const { data: high_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
);

const { data: low_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const { data: moderate_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const { data: high_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
);
const HandleNaviation = () => {
  setTrigger(true);
}
console.log(indexValue,"indexvalue")
console.log(low_3,low_4,low_5,moderate_4,"1stbox")

// data for initial 9box
// React.useEffect(() => { if(high_3!= undefined && high_4 != undefined && high_5 != undefined && low_3 != undefined &&low_4 !=undefined && low_5 != undefined && moderate_3 != undefined  && moderate_4 != undefined && moderate_5 != undefined)
//   { let DataforInitial: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
//   setindexBasedValue(DataforInitial)
// // console.log(DataforInitial,"DataforInitial")
// // console.log(low_3,low_4,low_5,"1stboxd")
// }},   [high_3,high_4,high_5,moderate_3,moderate_4,moderate_5,low_3,low_4,low_5,indexValue])



React.useEffect(()=>{
  console.log(indexBasedTitle,"indexBasedTitle")

 if(trigger === true){

 
  if(navigationFrom === "Appraiser"){
    if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title || indexBasedValue == high_3){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title || indexBasedValue == high_4 ){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title || indexBasedValue == high_5){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title || indexBasedValue == moderate_3){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title || indexBasedValue == moderate_4){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title || indexBasedValue == moderate_5){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title || indexBasedValue == low_3){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title || indexBasedValue == low_4){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title || indexBasedValue == low_5){
      navigate("/ExpandNineboxandSolidtalentsofClosedAppraiser", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,indexValue:{indexValue},appCalId:{appCalId}} })
    }
  }

  else if(navigationFrom === "Reviewer"){
    if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title|| indexBasedValue == high_3){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title || indexBasedValue == high_4){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title || indexBasedValue == high_5){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title || indexBasedValue == moderate_3){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title || indexBasedValue == moderate_4){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title  || indexBasedValue == moderate_5){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title  || indexBasedValue == low_3){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title || indexBasedValue == low_4){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title || indexBasedValue == low_5){
      navigate("/ExpandNineBoxandSolidtalentsofClosedReviewer", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }
  }else if(navigationFrom === "Normalizer"){
    if(indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[0]?.title|| indexBasedValue == high_3){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[1]?.title || indexBasedValue == high_4){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[2]?.title || indexBasedValue == high_5){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[3]?.title || indexBasedValue == moderate_3){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[4]?.title || indexBasedValue == moderate_4){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[5]?.title  || indexBasedValue == moderate_5){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[6]?.title  || indexBasedValue == low_3){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[7]?.title || indexBasedValue == low_4){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }else if (indexBasedTitle == RangeValue?.data[0]?.box_9_definitions[8]?.title || indexBasedValue == low_5){
      navigate("/nineboxexpandtalents", { state: {indexBasedTitle :indexBasedTitle,valueOfActiveCalender,indexBasedValue:indexBasedValue,appCalId:{appCalId}} })
    }
  }
// }
}
},[indexBasedTitle])

const setIndexBasedValueforNineBox = (indexValue: any) => {
  if (indexValue == 0) {
     setindexBasedValue(high3Value)
     setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
     console.log(indexBasedTitle, "indexBasedTitleinsideuseEffect")
   }
 }
  React.useEffect(() => {
     let DataforInitial: any[] = high3Value?.data?.concat(high4Value?.data, high5Value?.data, moderate3Value?.data, moderate4Value?.data, moderate5Value?.data, low3Value?.data, low4Value?.data, low5Value?.data)
     console.log(DataforInitial,"DataforInitial")
  if(indexValue == ""){
    setindexBasedValue(DataforInitial) 
  }
  else
   if(indexValue == 0){
      setindexBasedValue(high3Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
    }else if(indexValue == 1){
      setindexBasedValue(high4Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[1]?.title)
    }else if(indexValue == 2){
      setindexBasedValue(high5Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[2]?.title)
    }else if(indexValue == 3){
      setindexBasedValue(moderate3Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[3]?.title)
    }else if(indexValue == 4){
      setindexBasedValue(moderate4Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[4]?.title)
    }else if(indexValue == 5){
      setindexBasedValue(moderate5Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[5]?.title)
    }else if(indexValue == 6){
      setindexBasedValue(low3Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[6]?.title)
    }else if(indexValue == 7){
      setindexBasedValue(low4Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[7]?.title)
    }else if(indexValue == 8){
      setindexBasedValue(low5Value)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[8]?.title)
    }
   
  }, [indexValue,high_3,high_4,high_5,moderate_3,moderate_4,moderate_5,low_3,low_4,low_5,low3Value,low4Value
  ,low5Value,moderate3Value,moderate4Value,moderate5Value,high3Value,high4Value,high5Value])

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
          minHeight: "100px",
          overflow: "hidden",
           height: "auto",
           paddingBottom:"50px"
          // height: "650px",
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
          <Grid sx={{paddingRight:"16px"}} item xs={12} md={12} lg={8}>
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
            nineboxValues={NineBoxValues} navigationFrom={navigationFrom} HandleNaviation={HandleNaviation}   setindexValue={setindexValue}/>
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
          
          <Grid  sx={{
            borderLeft: "1px solid #EEEEEE",
            '@media (max-width: 1024px)': {
              borderLeft: "none",
              marginTop:"20px"
            }
        }} item xs={12} md={12} lg={4}>
            {topPerformerEmployees != undefined &&
              <TopPerformersofPaDashboard 
              valueOfActiveCalender={valueOfActiveCalender}
              topPerformerEmployees={topPerformerEmployees} 
              navigationFrom={navigationFrom} 
              appCalId={appCalId}
              />
            }
            
          </Grid>
          
        </Grid>
      </Box>
    </div>
  );
}
