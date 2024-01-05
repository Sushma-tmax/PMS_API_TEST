import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Breadcrumbs } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
//import ChartTabs from "./chartscomponents/charttabs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Expand from "../../../../assets/Images/Expand.svg";
import Topperformers from "../../TopPerformers";
import SolidTalents from "../../MyTeamDashboardComponents/SolidTalents";
import NineBox from "../../NineBox";
import ExpandNineBox from "../../MyTeamDashboardComponents/NineBox/ExpandNineBox";
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
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";
import OverallDashboardSolidTalents from "../../OverallDashboardSolidTalents";

export default function ExpandNineBoxandSolidtalentsofPAadminoverall(props: any) {
  const {NineBoxData,setNineboxExpand,indexBasedTitle,setindexBasedTitle,indexBasedValue,
    setindexBasedValue,setSolidperformersExpandActive} = props
  //console.log(nineboxValues,"nineboxValues")
  const { data: user } = useLoggedInUser();
  // const{select} =props;

  const location = useLocation();
  const { state }: { state: any } = useLocation();
  console.log(location, "select")
  // const { NineBoxValues, topPerformerEmployees } = props;
  const { data: RangeValue } = useGetNineboxQuery("");
  const navigate = useNavigate();
  console.log(RangeValue, "RangeValue")
  const [indexValue, setindexValue] = React.useState<any>(null);
  //function for nine box
  const [Range, setRange] = React.useState<any>([]);
  const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
  const [trigger, setTrigger] = React.useState<any>(true);
  React.useEffect(() => {
    if (RangeValue?.data[0]?.performance_definitions !== undefined) {
      setRange(RangeValue?.data[0]?.performance_definitions)
      setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from)
      setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to)
      setRangeMediumFrom(RangeValue?.data[0]?.performance_definitions?.medium_from)
      setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to)
      setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from)
      setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to)
    }

  }, [RangeValue])
  // console.log(indexBasedTitle,"indexBasedTitle")
  const { data: low_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  {
    console.log(high_3, "high");
  }

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );

  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub%20section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );

  // const [indexBasedValue, setindexBasedValue] = React.useState<any>([]);
  // const [indexBasedTitle, setindexBasedTitle] = React.useState<any>('');
  console.log(indexBasedValue,indexBasedTitle,"ibasedValues")
  // const emp = moderate_3?.data?.map((i: any) => {
  //   return i?.legal_full_name
  // })
  console.log(indexBasedTitle, "indexBasedTitle")
  //console.log(moderate_3?.data[0]?.legal_full_name,moderate_4,moderate_5,"moderate_4")
  // const NineBoxValues = [
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
  //     count: high_3?.count,
  //     category:high_3,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
  //     color: "linear-gradient(to left, #F89994, #F7665E)",
  //     icon: <img src={Potentialtalents} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[1]?.definition,
  //     count: high_4?.count,
  //     category:high_4,
  //     color: "linear-gradient(to left, #71E1F6, #28B7D3)",
  //     icon: <img src={Solidtalents} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[2]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[2]?.definition,
  //     count: high_5?.count,
  //     category:high_5,
  //     color: "linear-gradient(to left, #71E1F6, #28B7D3)",
  //     icon: <img src={Star} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[3]?.definition,
  //     count: moderate_3?.count,
  //     category:moderate_3,
  //     color: "linear-gradient(to left, #F89994, #F7665E)",
  //     icon: <img src={Inconsistent} alt="image" />,

  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[4]?.definition,
  //     count: moderate_4?.count,
  //     category:moderate_4,
  //     color: "linear-gradient(to left, #33CDB4, #079B82)",
  //     icon: <img src={Solidperformers} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[5]?.definition,
  //     count: moderate_5?.count,
  //     category:moderate_5,
  //     color: "linear-gradient(to left, #71E1F6, #28B7D3)",
  //     icon: <img src={HighPerformerstop} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[6]?.definition,
  //     count: low_3?.count,
  //     category:low_3,
  //     color: "linear-gradient(to left, #F89994, #F7665E)",
  //     icon: <img src={Lowperformers} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[7]?.definition,
  //     count: low_4?.count,
  //     category:low_4,
  //     color: "linear-gradient(to left, #33CDB4, #079B82)",
  //     icon: <img src={Solidperformer} alt="image" />,
  //   },
  //   {
  //     title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
  //     defenition: RangeValue?.data[0]?.box_9_definitions[8]?.definition,
  //     count: low_5?.count,
  //     category:low_5,
  //     color: "linear-gradient(to left, #33CDB4, #079B82)",
  //     icon: <img src={Highperformers} alt="image" />,
  //   },
  // ];
//  const DataforInitial : any[] =[
//   high_3,high_4,high_5,moderate_3,moderate_4,moderate_5,low_3,low_4,low_5].flat()
  
  const ExcelData9Box: any[] = [

    high_3?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    high_4?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    high_5?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    moderate_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    moderate_4?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    moderate_5?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    low_3?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    low_4?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    low_5?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.appraisal?.appraiser_rating,
        Potential: j?.appraisal.potential,
      }
    }),

  ].flat()
 // console.log(DataforInitial, "DataforInitial")
// useEffect(()=>{
//  if(state?.datanew == false){
//     setindexBasedValue(DataforInitial)
//  }

// },[indexValue,state])
//console.log(state?.datanew,"new")
  useEffect(() => {
  
    
   if (indexValue == 0) {
      setindexBasedValue(NineBoxData[0]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
    } else if (indexValue == 1) {
      setindexBasedValue(NineBoxData[1]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[1]?.title)
    } else if (indexValue == 2) {
      setindexBasedValue(NineBoxData[2]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[2]?.title)
    } else if (indexValue == 3) {
      setindexBasedValue(NineBoxData[3]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[3]?.title)
    } else if (indexValue == 4) {
      setindexBasedValue(NineBoxData[4]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[4]?.title)
    } else if (indexValue == 5) {
      setindexBasedValue(NineBoxData[5]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[5]?.title)
    } else if (indexValue == 6) {
      setindexBasedValue(NineBoxData[6]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[6]?.title)
    } else if (indexValue == 7) {
      setindexBasedValue(NineBoxData[7]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[7]?.title)
    } else if (indexValue == 8) {
      setindexBasedValue(NineBoxData[8]?.category)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[8]?.title)
    }


  }, [indexValue,indexBasedTitle])
  console.log(indexBasedValue,"indexBasedValue")
  console.log(indexValue,"indexValue")
  const handleExport = () => {
    // console.log(users, "excel");
    // setfilData(topPerformerEmployees)
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(ExcelData9Box);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  //console.log(indexBasedValue,"indexBasedValue")
  //For the new employee table of ninebox
  const handleNavigationForNineBoxEmployee = (name: any) => {
    //navigate("/filteredTableofAppraiserExpNineBox", { state: { selectName: name } })
    // setindexBasedTitleData(indexBasedTitle)
    // setindexBasedValueData(indexBasedValue)
    setNineboxExpand(false);
    setSolidperformersExpandActive(true);
   
  }
  const handleBack = () =>{
    setNineboxExpand(false);
    navigate("/PA_Dashboard") 
  }
  // initial all employees for 9box
// useEffect(() => { 
//   if(NineBoxData[0]?.category!= undefined && NineBoxData[1]?.category != undefined && NineBoxData[2]?.category != undefined 
//     && NineBoxData[6]?.category != undefined &&NineBoxData[7]?.category !=undefined && NineBoxData[8]?.category != undefined 
//     && NineBoxData[3]?.category != undefined  && NineBoxData[4]?.category != undefined && NineBoxData[5]?.category != undefined  && indexValue == null)
//   { let DataforInitial: any[] =NineBoxData[0]?.category?.concat(NineBoxData[1]?.category, 
//     NineBoxData[2]?.category,NineBoxData[3]?.category,NineBoxData[4]?.category, 
//     NineBoxData[5]?.category, NineBoxData[6]?.category,
//     NineBoxData[7]?.category, NineBoxData[8]?.category)
//   setindexBasedValue(DataforInitial) } }, [NineBoxData,indexValue])

  return (
    <>
    <div
        style={{
          background: "#f1f1f1",height:"auto",
          minHeight: "100px",
          overflow: "hidden",
        }}
      >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="25px"
      >

        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
            to={"/PA_Dashboard"}
          > */}
          <Typography 
           style={{
            fontSize: "18px",
            color: "#3e8cb5",
            fontFamily: "Arial",
            cursor:"pointer"
          }}
          color="inherit"
          onClick={()=>handleBack()}
          >
           Overall Dashboard
           </Typography>
          {/* </Link> */}
          {/* <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="text.primary"
            onClick={()=>{setNineboxExpand(false)}}
          >
            Overall Dashboard
          </Typography> */}
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            9-Box Grid
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
        {/* <div >
          <Timelinerevview />
        </div> */}
        <div>
          {/* <div style={{ paddingTop: "30px" }}> */}
          <Box
            style={{
              marginLeft: "25px",
              marginRight: "25px",
              background: "#ffffff",
              padding: "20px",
              height: "auto",
              paddingBottom:"50px",
              marginBottom:"25px"
            }}
          >
            <Grid container spacing={2}>
              <Grid sx={{ paddingRight: "16px" }} item xs={12} md={12} lg={8}>
                {/* <Stack
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
                <img src={Newexcel} style={{ paddingRight: "15px" }} />

                <img src={Expand} />
              </div>
            </Stack> */}
                {/* <img
                  src={Newexcel}
                  // style={{float:"right"}}
                  alt="icon"
                  style={{ marginLeft: "80%", marginTop: "5px", float: "right", cursor: "pointer" }}
                  onClick={handleExport}
                /> */}
                <ExpandNineBox nineboxValues={NineBoxData} BaseStateValue={indexBasedTitle} setindexValue={setindexValue} />

              </Grid>
              {/* <Grid
                sx={{
                  borderRight: "1px solid gainsboro",
                  // marginTop: "44px",
                  marginBottom: "25px",
                }}
                item
                xs={0.5}
              >
                <div></div>
              </Grid> */}
              <Grid sx={{
                borderLeft: "1px solid #EEEEEE",
                '@media (max-width: 1024px)': {
                  borderLeft: "none",
                  marginTop:"20px"
                }
              }} item xs={12} md={12} lg={4}>
                 {/* <div style={{ display:"flex" ,justifyContent:"flex-end" }} > <img style={{ cursor: "pointer" }} src={Expand}  onClick={handleNavigationForNineBoxEmployee} />
                 </div> */}
                <OverallDashboardSolidTalents
                setindexBasedValue={setindexBasedValue}
                  indexBasedValue={indexBasedValue}
                  BaseStateValue={indexBasedTitle}
                  indexValue={indexValue}
                  setNineboxExpand={setNineboxExpand}
                  setindexBasedTitle={setindexBasedTitle}
                  indexBasedTitle={indexBasedTitle}
                  setSolidperformersExpandActive={setSolidperformersExpandActive}
                  handleNavigationForNineBoxEmployee={handleNavigationForNineBoxEmployee}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}
