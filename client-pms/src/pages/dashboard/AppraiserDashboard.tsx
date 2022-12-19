import React from 'react'
import { useState, useEffect } from 'react';

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../components/reviewer/Dashboard/AppraiserDashboardContext';
import Timelinerevview from '../../components/reviewer/Dashboard/Timelinerevview';
import Timeline from '../../components/homepage/Timeline';
import StatusBar from '../../components/homepage/StatusBar';
// import nineBoxGrid from '../../components/homepage/NineBox';
import TopPerformers from '../../components/homepage/TopPerformers';
import PerformanceRatingandEmpRejection from '../../components/homepage/PerformanceRatingandEmpRejection';
import NineboxandTopPerformance from '../../components/homepage/NineboxandTopPerformance';
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useGetEmployeeByFilterQuery } from "../../service";
import { useGetNineboxQuery } from "../../service/ninebox/ninebox";
import Potentialtalents from "../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../assets/Images/Solidtalents.svg";
import Star from "../../assets/Images/Star.svg";
import Inconsistent from "../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../assets/Images/Solidperformer.svg";
import Highperformers from "../../assets/Images/Highperformers.svg";
import Teamreview from '../../components/reviewer/Dashboard/teamtablereview/teamreview';
import EnlargedNineBox from '../../components/homepage/EnlargedNineBox';
import NineBox from '../../components/homepage/NineBox';
import { Link, useLocation, useParams,useNavigate  } from "react-router-dom";
import { Console } from 'console';
import  CalendarFilters from '../../components/homepage/calnderfilter';


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Curveandgrid = React.lazy(() => import("../../components/reviewer/Dashboard/charts/curveandgrid"));
//   const Timelinereview = React.lazy(() => import("./Timelinerevview"));
//   const PerformanceRatingreview = React.lazy(
//     () =>
//       import(
//         "./reviewer/Dashboard/performanceratingchart/performanceratingreview"
//       )
//   );
//   const Teamreview = React.lazy(
//     () => import("../../reviewer/Dashboard/teamtablereview/teamreview")
//   );

//   const Ninebox = React.lazy(
//     () => import("../../reviewer/Dashboard/teamtablereview/ninebox")
//   );

// export default Dashboard
export default function AppraiserDashboard() {
  const calendarId = `636cb1a7960b1548b80ff775`

  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
  // const calId = {user?.calendar?._id}
  console.log(user,"idss")
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  //const [navigationFrom, setnavigationFrom] = React.useState<any>('');
   let navigationFrom = "Appraiser";
  React.useEffect(() => {
    if (user?.calendar?._id !== undefined) {
      setappCalId(user?.calendar?._id)
    }
   
  }, [user])
  const { data: data2 } = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,section,sub section,employee.employee_status&manager_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
  const { data: data1, isLoading } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=appraisal.appraiser_rating,section`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,section,sub section,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`

  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  //console.log(data2,"data2data2")
  // console.log(user?.calendar?._id, employeeData, appCalId, "appCalId")
  const { data: RangeValue } = useGetNineboxQuery("");
  console.log(RangeValue, "RangeValue")
  //function for nine box
  const [Range, setRange] = React.useState<any>([]);
  const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
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
  const { data: low_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
  );
  {
    console.log(high_3, "high");
  }

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );
  console.log(data2, "dataaaaa")
  console.log(moderate_4, "moderate_4")
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
  );

  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraisal.appraiser_rating,appraisal.potential,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,appraisal.status&manager_code=${user?.employee_code}&appraisal.status=completed&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
  );
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  // {isHovering && <h2>helloe jj</h2>}
console.log(RangeValue,"ooooooooo")

//Parent Filter 

//mulitiselect
//const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);

  
//mulitiselect
 const [SectionFilter, setSectionFilter] = React.useState("");
const [employeeData1, setemployeeData1] = React.useState<any>([]);
const [Data2Value, setData2Value] = React.useState<any>([]);
const [Data1Value, setData1Value] = React.useState<any>([]);

// useEffect(() => {
//   if(SectionFilter !== "" && SectionFilter !== "None" && SectionFilter !== undefined ){
//     const Temp =  employeeData?.data?.filter((i:any)=>{
//       return i?.section == SectionFilter
//     })
//     const Temp2 =  data2?.data?.filter((i:any)=>{
//       return i?.section == SectionFilter
//     })
//     const Temp1 =  data1?.data?.filter((i:any)=>{
//       return i?.section == SectionFilter
//     })
//     setemployeeData1(Temp)
//     setData2Value(Temp2)
//     setData1Value(Temp1)
//   }else if(SectionFilter === "" || SectionFilter === "None" || SectionFilter === null){
//    setemployeeData1(employeeData?.data)
//    setData2Value(data2?.data)
//    setData1Value(data1?.data)
//   }
// }, [SectionFilter,employeeData,data2])
//Parent Filter 
//console.log(FiltertingSections(),"FiltertingSections()")
//console.log(Data2Value,"FiltertingSections()")

  const NineBoxValues = [
    {
      title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
      count: high_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Potentialtalents} alt="image" />,
      
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
      count: high_4?.count,
      color: "linear-gradient(to right, #71E1F6, #28B7D3)",
      icon: <img src={Solidtalents} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[2]?.title,
      count: high_5?.count,
      color: "#71E1F6",
      icon: <img src={Star} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
      count: moderate_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Inconsistent} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
      count: moderate_4?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
      count: moderate_5?.count,
      color: "#71E1F6",
      icon: <img src={HighPerformerstop} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
      count: low_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Lowperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
      count: low_4?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformer} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
      count: low_5?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Highperformers} alt="image" />,
    },
  ];
  console.log(moderate_4, "jjjjjjj")
  // const [ExcelData9Box, setExcelData9Box] = React.useState<any>([]);

  // useEffect(() => {
  //   setfilData(moderate_4)
  // }, [moderate_4])
  // console.log(filData, "filData")
  let ExcelData: string | any[] = []
  if (moderate_3?.count > 0) {
    let data = moderate_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Grade: j?.grade,
      }
    })
    console.log(data,"aaaaaaa")
    // setExcelData9Box(ExcelData.concat(data))
   
   
  }
  const ExcelData9Box:any[] = [
    low_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    low_4?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    low_5?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    moderate_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    moderate_4?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    moderate_5?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    high_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    high_4?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
    high_5?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position :j?.position_long_description,
        Grade: j?.grade,
        Division :j?.division,
        Section : j?.section,
        Subsection :j["sub section"],
        Overallrating :j?.appraisal?.appraiser_rating,
        Potential:j?.appraisal.potential,
      }
    }),
  ].flat()
  console.log(ExcelData9Box,"ExcelData9Box")
  
  console.log(ExcelData, "ExcelData")
  
  //function for nine box
  const [range1, setrange1] = React.useState<any>(0);
  const [range2, setrange2] = React.useState<any>(0);
  const [range3, setrange3] = React.useState<any>(0);
  const [range4, setrange4] = React.useState<any>(0);
  const [range5, setrange5] = React.useState<any>(0);
  //for tabs
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
  console.log(tabLocation, "tabLocation");
  const [value, setValue] = React.useState<any>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [statusSort, setstatusSort] = useState<any>("");
  useEffect(() => {
    if (tabLocation !== undefined) {
      setValue(1);
    }
  }, [tabLocation]);
  //for tabs
  //functions for emp rej pie chart
  console.log()
  const checkAppraisalStatusInProgress = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.employee?.employee_agree === true &&  item?.appraisal?.status === status;
    })?.length;
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.appraisal?.status === status && 
      (item?.employee?.employee_status?.status === 'employee-rejected'|| 
      item?.employee?.employee_status?.status === 'rejected') ;
    })?.length;
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.employee?.employee_agree === false &&  item?.appraisal?.status === status;
    })?.length;
  };
  //console.log(checkAppraisalStatus("completed"), "newcheckAppraisalStatus")
  //console.log(checkAppraisalStatusCompleted("completed"), "newcheckAppraisalStatus")
  //functions for emp rej pie chart
  //function for doughnut chart
  const checklengthinRange = (min: number, max: number) => {
    return (
      (data1?.data?.filter((item: any) => {
        // console.log(item?.appraisal?.appraiser_rating, "appraisal_rating3");
        return (
          item?.appraisal?.appraiser_rating >= min &&
          item?.appraisal?.appraiser_rating <= max
        );
      })?.length)
      // *
      //   100) /
      // data1?.data?.length
    );
  };
  useEffect(() => {
    setrange1(Math.round(checklengthinRange(1, 2.49)))
    setrange2(Math.round(checklengthinRange(2.5, 2.99)))
    setrange3(Math.round(checklengthinRange(3, 3.99)))
    setrange4(Math.round(checklengthinRange(4, 5)))
    // setrange5(Math.round(checklengthinRange(4, 5)))
  }, [data1])
  //function for doughnut chart
  //function for status cards
  const checkAppraisalStatusforCards = (status: string) => {
    console.log(employeeData?.data?.filter((item: any) => {
      // console.log(item, status, 'hari')
      // console.log(RangeValue, "RangeValuess")
      return item?.appraisal?.status === status;
    })?.length, "countfuncton")
    if(employeeData)
    return employeeData?.data?.filter((item: any) => {
      return item?.appraisal?.status === status;
    })?.length;
    else return 0;
  };

  const calculatePercentageforCards = (num: number) => {
    if(employeeData && employeeData?.data && employeeData?.data?.length != 0)
    return (num * 100) / employeeData?.data?.length;
    else{
      return 0
    }
  };

  const StatusValues = [
    {
      title: "Not-Started",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("not-started")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("not-started"),
      // color:"linear-gradient(0deg, rgba(54,177,201,0.9472163865546218) 0%, rgba(50,191,194,1) 82%)"
      color: "linear-gradient(to right, #3AB6BF, #1BAAB5)"
    },
    {
      title: "In Progress",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("in-progress")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("in-progress"),
      // color:"linear-gradient(90deg, rgba(246,191,113,0.958420868347339) 27%, rgba(246,191,113,1) 100%, rgba(255,255,255,1) 100%)"
      color: "linear-gradient(to right, #F9C5A1, #F99B5B)"
    },
    {
      title: "Normalized",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("normalized")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("normalized"),
      // color:"linear-gradient(0deg, rgba(37,173,200,1) 98%, rgba(126,221,240,0.9948354341736695) 100%, rgba(251,254,255,1) 100%)"
      color: "linear-gradient(to right, #3BD7F6, #26B4D0)"
    },
    {
      title: "Rejected",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("rejected")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("rejected"),
      // color:"linear-gradient(90deg, rgba(175,191,201,0.8939950980392157) 0%, rgba(148,161,168,1) 100%)"
      color: "linear-gradient(to right, #BECFD9, #89949A)"
    },
    {
      title: "Completed",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("completed")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("completed"),
      // color:"linear-gradient(158deg, rgba(158,232,220,1) 0%, rgba(10,166,141,1) 99%, rgba(35,191,165,1) 100%)"
      color: "linear-gradient(to right, #35CFB6, #079B82)"
    },
  ];
  console.log(StatusValues, calculatePercentageforCards(
    checkAppraisalStatusforCards("completed")
  ).toFixed(2), checkAppraisalStatusforCards("completed"), "parentStatusValues")
  //function for status cards

  const topPerformerEmployees = () => {
    // const Tp = employeeData?.data?.slice()?.sort((a: any, b: any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0, 5)
    // console.log(Tp,"topPerformerEmployees")
    return employeeData?.data?.slice()?.sort((a: any, b: any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0, 5)
  }
  //console.log(topPerformerEmployees(), "topPerformerEmployees")
  const TopPerformersOfAppraiser = employeeData?.data?.slice()?.filter((f:any) => f?.appraisal?.appraiser_rating >= 4)
  ?.sort((a: any, b: any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0, 5)
 // console.log(TopPerformersOfAppraiser,"topPerformerEmployees")
  return <>
    <div
      style={{
        background: "#F1F1F1",
        height: "auto",
      }}
    >
      <Box>
        <div
          style={{
            paddingLeft: "25px",
            paddingBottom: "12px",
            paddingTop: "12px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ borderBottom: 1, borderColor: "divider", marginRight: "30px" }}
          >

            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#3e8cb5",
                },
                textTransform: "capitalize",
                fontSize: "20px",
                fontFamily: "Arial",
                // fontWeight: "600",
                // paddingTop: "0px",
                // paddingBottom: "0px",
              }}
              label="PA Dashboard"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                "&.Mui-selected": {
                  color: "#3e8cb5",
                },
                textTransform: "capitalize",
                fontSize: "20px",
                fontFamily: "Arial",
                // fontWeight: "600",
                // paddingTop: "0px",
                // paddingBottom: "0px",
              }}
              label="My Actions"
              {...a11yProps(1)}
            />
          </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <AppraiserDashboardContext>
          <div>
            {/* <Timeline />
             <Timelinereview /> */}
             <CalendarFilters
             SectionFilter={SectionFilter}
             setSectionFilter={setSectionFilter}
             />
            <Timelinerevview />
          </div>
          {/* <CalendarFilters/> */}
          <div>
            {/* <PerformanceRatingreview setstatusSort={setstatusSort} /> */}
            <PerformanceRatingandEmpRejection
              setstatusSort={setstatusSort}
              completedCount={checkAppraisalStatusCompleted("completed")}
              inprogressCount={checkAppraisalStatusInProgress("rejected")}
              inMediaton={ checkAppraisalinmediationStatus("rejected")}
              range1={range1}
              range2={range2}
              range3={range3}
              range4={range4}
              // range5={range5}
              StatusValues={StatusValues}
            />
          </div>
          <div style={{ marginTop: "25px" }}>
            {/* <Curveandgrid />  */}
            <NineboxandTopPerformance
              NineBoxValues={NineBoxValues}
              topPerformerEmployees={TopPerformersOfAppraiser}
              ExcelData9Box={ExcelData9Box}
              navigationFrom ={navigationFrom }
            />
          </div>
          {/* <StatusBar /> */}
          {/* <nineBoxGrid /> */}
          {/* <TopPerformers /> */}
          {/* <div style={{ marginTop: "25px" }}>
              <Teamreview statusSort={statusSort} />
            </div> */}

          {/* <Curveandgrid /> */}
        </AppraiserDashboardContext>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AppraiserDashboardContext>
          <div>
            <Teamreview statusSort={statusSort} navigationFrom={navigationFrom } />
          </div>

          <div
            style={{
              marginLeft: "25px",
              marginRight: "25px",
              background: "#ffffff",
              padding: "20px",
              height: "650px",
              marginTop: "20px"
            }}
          >
            <div>
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
                {/* <div>
                <img src={Newexcel} style={{ paddingRight: "15px" }} />

                <img src={Expand} />
              </div> */}
              </Stack>
            </div>
            <EnlargedNineBox data={NineBoxValues} />

            {/* <NineBox nineboxValues={NineBoxValues} /> */}
          </div>

        </AppraiserDashboardContext>
      </TabPanel>

    </div>
  </>
}