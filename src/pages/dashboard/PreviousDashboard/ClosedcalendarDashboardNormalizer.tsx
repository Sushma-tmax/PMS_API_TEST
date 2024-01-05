import React from 'react'
import { useState, useEffect, useMemo } from 'react';

import { Box, Breadcrumbs, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import {
  useAppraisalCalenderFiltersQuery,
  useGetActiveCalenderQuery,
  useGetCalenderQuery,
  useGetEmployeeByFilterQuery,
} from "../../../service";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import Potentialtalents from "../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../assets/Images/Solidtalents.svg";
import Star from "../../../assets/Images/Star.svg";
import Inconsistent from "../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../assets/Images/Highperformers.svg";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import NineboxandTopPerformanceofOverallDashboard from '../../../components/homepage/PreviousDashboardComponents/NineboxandTopPerformanceofOverallDashboard';
import PerformanceRatingandEmpRejectionofClosedcalendar from '../../../components/homepage/PreviousDashboardComponents/PerformanceRatingandEmpRejectionofClosedcalendar';
import { useGetClosedCalenderQuery, useGetPACalendarQuery } from '../../../service/calender/Calender';
import ClosedCalendarfilter from '../../../components/homepage/PreviousDashboardComponents/closedcalendarfilter';
import Closedcalendarteamtable from '../../../components/homepage/PreviousDashboardComponents/MyTeamTable/Closedcalendarteamtable';
import { useGetPreviousAppraisalEmployeeByFilterQuery } from '../../../service/employee/previousAppraisal';
import PAMaster from '../../../components/UI/PAMasterhome';
import Loader from '../../../components/Loader/Loader';
import { makeStyles } from "@mui/styles";

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
const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    marginTop: "50px",
  },
  text1: {
    fontSize: "18px !important",
    color: "#3e8cb5 !important",
    fontFamily: "Arial !important",
    paddingBottom: "20px",
  },
  text2: {
    fontSize: "14px !important",
    color: "#33333 !important",
    fontFamily: "Arial !important",
    paddingBottom: "20px",
  },
});
const ClosedcalendarDashboardNormalizer = (props: any) => {
  const location: any = useLocation();
  console.log(location?.state,"location")
  // NaviGationFrom it is used for Employee master button showing Only on Paadmin
  let NaviGationFrom =location?.state?.from
  const { data: user } = useLoggedInUser();
  const classes = useStyles();

  // console.log(user, "idss")
  let navigationFrom = "Normalizer";
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const navigate = useNavigate();
  //For gtting active cal 
  const { data } = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')
  const { data: calendarData } = useGetCalenderQuery('')
  const { data: PAdata } = useGetPACalendarQuery('')

  // console.log(calendarData, "valueOfActiveCalender")
  const [valueOfActiveCalender, setvalueOfActiveCalender] = React.useState<any>("");
  const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
  const { data: activecalendardata } = useGetActiveCalenderQuery('')
  const {data :closedCalendar, isLoading: isTitleLoading} = useGetClosedCalenderQuery('')

  console.log(valueOfActiveCalender, "valueOfActiveCalender1")
  console.log(activeCalenderName, "valueOfActiveCalender")


  //For sfiltered calendar data
  React.useEffect(() => {
    if (activeCalenderName?._id != undefined) {
      setappCalId(activeCalenderName?._id)
    }
  }, [activeCalenderName])
  console.log(appCalId, "appCalId")
  React.useEffect(() => {
    // const NewCalendar = calendarData?.data?.filter((j:any)=>{
    //   if(j?.isActive == true){
    //     return j?.name
    //   }
    // }
    // )
    // const activeCalender = calendarData?.data?.filter((item: any) => {
    //   console.log(item, "iiiiiii");
    //   return item?.isActive == true;
    // });
    // console.log(activeCalender,"NewCalendarff")
    const ccc = closedCalendar?.data?.find((item2: any) => item2?.name === valueOfActiveCalender)
    if(ccc != undefined){
      setactiveCalenderName(ccc);
    }else{
    setactiveCalenderName(closedCalendar?.data[0])
    }
    // setactiveCalenderName(ccc);
    // console.log(activecalendardata?.data[0], "NewCalendarff")
  }, [PAdata,valueOfActiveCalender,closedCalendar])
  let navigationRole = "PreviousDashboard";
  //For gtting active cal
  // Data2 used in My team dashboard ,Rating distribution
  // const { data: data2 } = useGetPreviousAppraisalEmployeeByFilterQuery(
  //   `?select=appraisal.status,employee.employee_agree,division,sub_section,section,
  //   employee.employee_status&normalizer_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)
  const { data: data1, isLoading } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=appraisal.appraiser_rating`);

  const SELECT_FOR_DASHBOARD = `employee_code,
  legal_full_name,
  employee_rating,
  position_long_description,
  employee.employee_status,first_name,
  grade,
  reviewer_PA_rejected,
reviewer_PA_accepted,
appraiser_PA_accepted,
  normalized_overallRating,
  isGradeException,
  division, service_reference_date,isSupervisor,email,function,
  sub_section,
  talent_category,
  previous_rating,
  section,
  service_reference_date,
function,
email,
appraiser_code,
reviewer_code,
normalizer_code,
previous_rating,
  appraiser_rating,
  appraisal.appraiser_rejected,
  reviewer_rating,
  employee.isGradeException,
  normalizer_rating,
  normalizer.normalizer_rejected,
  appraisal.status,
  appraiser_name,
  normalizer_name,
  reviewer_name,
  appraisal.potential,
  manager_code,
  manager_name,
  manager_position,
  work_location,
  division,
  appraisal.appraiser_name,
  appraisal.appraiser_status,
  reviewer.reviewer_status,
  normalizer.normalizer_status,
  reviewer.rejection_count,
  appraisal.objective_description,
  reviewerIsDisabled,
  normalizerIsChecked,
  normalizerIsDisabled,
  employee.employee_rejection,
  employee.employee_agree,
  pa_status,
  overall_rating,
  appraisal.pa_status`
  const { data: employeeData,isLoading : isemployeeLoading } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=${SELECT_FOR_DASHBOARD}&calendar=${appCalId}&limit=800`)

  // const { data: employeeData } = useGetEmployeeByFilterQuery(
  //   `?normalizer_code=${user?.employee_code}&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  // );
  console.log(employeeData, "thedataE")
  const { data: RangeValue } = useGetNineboxQuery("");
  //console.log(data2, "data2data2")
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

  const { data: low_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,reviewer_rating,employee.employee_status,appraiser_rating,appraiser_code,reviewer_code,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeLowTo}`)
  const { data: moderate_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_rating,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,employee.employee_status,appraiser_rating,employee_rating,appraiser_code,reviewer_code,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeLowTo}`)
  const { data: high_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_rating,employee.employee_status,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,appraiser_rating,employee_rating,appraiser_code,reviewer_code,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=High&overall_rating[lte]=${RangeLowTo}`)
  // { console.log(high_3, 'high') }

  const { data: low_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_rating,employee.employee_status,appraiser_rating,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,employee_rating,appraiser_code,reviewer_code,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeMediumTo}`)
  const { data: moderate_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_rating,employee.employee_status,appraiser_rating,employee_rating,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,appraiser_code,reviewer_code,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,manager_name,work_location,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeMediumTo}`)
  const { data: high_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,normalized_overallRating,reviewer_rating,employee.employee_status,appraiser_rating,employee_rating,appraiser_code,reviewer_code,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,normalizer_code,first_name,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,previous_rating,appraiser_name,reviewer_name,normalizer_name,manager_name,work_location,manager_position,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&overall_rating[lte]=${RangeMediumTo}`)

  const { data: low_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,reviewer_rating,normalized_overallRating,employee.employee_status,appraiser_rating,employee_rating,first_name,appraiser_code,reviewer_code,normalizer_code,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,talent_category, service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,manager_code,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeHighTo}`)
  const { data: moderate_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,reviewer_rating,normalized_overallRating,employee.employee_status,appraiser_rating,employee_rating,first_name,appraiser_code,reviewer_code,normalizer_code,talent_category,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,service_reference_date,isSupervisor,email,function,overall_rating,appraisal.potential,manager_code,previous_rating,appraiser_name,reviewer_name,normalizer_name,work_location,manager_name,manager_position,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeHighTo}`)
  const { data: high_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=normalizer_rating,reviewer_rating,normalized_overallRating,employee.employee_status,appraiser_rating,employee_rating,first_name,talent_category,appraiser_code,reviewer_code,normalizer_code, service_reference_date,reviewer_PA_rejected,reviewer_PA_accepted,appraiser_PA_accepted,isSupervisor,email,function,overall_rating,appraisal.potential,manager_code,employee_code,previous_rating,appraiser_name,reviewer_name,work_location,normalizer_name,manager_name,manager_position,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraisal.status=completed&calendar=${appCalId}&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=High&overall_rating[lte]=${RangeHighTo}`)

  //For changing my actions's tab
  const [valueOfCard, setvalueOfCard] = React.useState<any>("");
  console.log(valueOfCard, "ooooooooo")
  //For changing my actions's tab

  const [talentCategoreyFilter, settalentCategoreyFilter] = React.useState<string[]>([]);
  const [talentCategoreyData, settalentCategoreyData] = React.useState<any>([]);

  //for hiding the tabs
  const [TabsActive, setTabsActive] = React.useState<any>(false);
  const [calendarValDialog, setcalendarValDialog] = useState(false);

  //mulitiselect
  const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
  const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
  const [divisionFilter, setDivisionFilter] = React.useState<string[]>([]);
  console.log(divisionFilter, "divisionFilter");
  const [employeeData1, setemployeeData1] = React.useState<any>([]);
  const [Data2Value, setData2Value] = React.useState<any>([]);
  const [overallDashboard, setOveralldashboard] = React.useState(false);

  //console.log(data2,Data2Value,"dddddddd")
  const [Data1Value, setData1Value] = React.useState<any>([]);
  const [low3Value, setLow3Value] = React.useState<any>([]);
  const [low4Value, setLow4Value] = React.useState<any>([]);
  const [low5Value, setLow5Value] = React.useState<any>([]);
  const [moderate3Value, setmoderate3Value] = React.useState<any>([]);
  const [moderate4Value, setmoderate4Value] = React.useState<any>([]);
  const [moderate5Value, setmoderate5Value] = React.useState<any>([]);
  const [high3Value, sethigh3Value] = React.useState<any>([]);
  const [high4Value, sethigh4Value] = React.useState<any>([]);
  const [high5Value, sethigh5Value] = React.useState<any>([]);
  //console.log(employeeData,"employeeData")
  useEffect(() => {
    //@ts-ignore

    if (
      //@ts-ignore
      (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
      //@ts-ignore
      (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0) &&
      //@ts-ignore
      (divisionFilter === "" || divisionFilter.includes("None") || divisionFilter.length === 0)
    ) {
      setemployeeData1(employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
      setData2Value(employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
      //setData1Value(data1?.data)
      setLow3Value(low_3)
      setLow4Value(low_4)
      setLow5Value(low_5)
      setmoderate3Value(moderate_3)
      setmoderate4Value(moderate_4)
      setmoderate5Value(moderate_5)
      sethigh3Value(high_3)
      sethigh4Value(high_4)
      sethigh5Value(high_5)
      // if( SectionFilter.includes('0')){setSectionFilter([])}

      //@ts-ignore
    } else if (SectionFilter !== "" && SectionFilter !== null && SectionFilter !== undefined) {
      const Temp = employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const Temp2 = employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });
      console.log(Temp, Temp2, "sfsfsfsfsfsf")
      //   const Temp1 =  data1?.data?.filter((item1:any) => {
      //     if(SectionFilter.length === 0){
      //       return item1
      //     }else{ return !!SectionFilter?.find(item2 => item1.section === item2)}
      //   }).filter((item1:any) => {
      //     if(subSectionFilter.length === 0){
      //       return item1
      //     }else{ return !!subSectionFilter?.find(item2 => item1.sub_section === item2)}
      // });

      const TempLow3 = low_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });
      const TempLow4 = low_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempLow5 = low_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempModerate3 = moderate_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempModerate4 = moderate_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempModerate5 = moderate_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempHigh3 = high_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempHigh4 = high_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      const TempHigh5 = high_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      }).filter((item1: any) => {
        if (divisionFilter.length === 0) {
          return item1
        } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
      });

      setemployeeData1(Temp)
      setData2Value(Temp2)
      //   setData1Value(Temp1)
      // setLow3Value(TempLow3)
      setLow3Value(() => {
        if (TempLow3?.count) {
          return TempLow3
        } else {
          return {
            count: TempLow3?.length,
            data :TempLow3
          }
        }
      })
      // setLow4Value(TempLow4)
      setLow4Value(() => {
        if (TempLow4?.count) {
          return TempLow4
        } else {
          return {
            count: TempLow4?.length,
            data :TempLow4
          }
        }
      })
      //   setLow5Value(TempLow5)
      setLow5Value(() => {
        if (TempLow5?.count) {
          return TempLow5
        } else {
          return {
            count: TempLow5?.length,
            data :TempLow5
          }
        }
      })
      // setmoderate3Value(TempModerate3)
      setmoderate3Value(() => {
        if (TempModerate3?.count) {
          return TempModerate3
        } else {
          return {
            count: TempModerate3?.length,
            data :TempModerate3
          }
        }
      })
      // setmoderate4Value(TempModerate4)
      setmoderate4Value(() => {
        if (TempModerate4?.count) {
          return TempModerate4
        } else {
          return {
            count: TempModerate4?.length,
            data :TempModerate4
          }
        }
      })
      // setmoderate5Value(TempModerate5)
      setmoderate5Value(() => {
        if (TempModerate5?.count) {
          return TempModerate5
        } else {
          return {
            count: TempModerate5?.length,
            data :TempModerate5
          }
        }
      })
      // sethigh3Value(TempHigh3)
      sethigh3Value(() => {
        if (TempHigh3?.count) {
          return TempHigh3
        } else {
          return {
            count: TempHigh3?.length,
            data :TempHigh3
          }
        }
      })
      // sethigh4Value(TempHigh4)
      sethigh4Value(() => {
        if (TempHigh4?.count) {
          return TempHigh4
        } else {
          return {
            count: TempHigh4?.length,
            data :TempHigh4
          }
        }
      })
      // sethigh5Value(TempHigh5)
      sethigh5Value(() => {
        if (TempHigh5?.count) {
          return TempHigh5
        } else {
          return {
            count: TempHigh5?.length,
            data :TempHigh5
          }
        }
      })
    }

  }, [
    SectionFilter, divisionFilter, subSectionFilter, employeeData,low_3, low_4, low_5,
    moderate_3, moderate_4, moderate_5, high_3, high_4, high_5
  ])

  const NineBoxValues = [
    {
      title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
      count: high3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <div className='wrapper'><img src={Potentialtalents} alt="image" /></div>,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[1]?.definition,
      count: high4Value?.count,
      color: "linear-gradient(to left, #71E1F6, #28B7D3)",
      icon: <img src={Solidtalents} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[2]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[2]?.definition,
      count: high5Value?.count,
      color: "linear-gradient(to left, #71E1F6, #28B7D3)",
      icon: <img src={Star} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[3]?.definition,
      count: moderate3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Inconsistent} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[4]?.definition,
      count: moderate4Value?.count,
      color: "linear-gradient(to left, #33CDB4, #079B82)",
      icon: <img src={Solidperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[5]?.definition,
      count: moderate5Value?.count,
      color: "linear-gradient(to left, #33CDB4, #079B82)",
      icon: <img src={HighPerformerstop} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[6]?.definition,
      count: low3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Lowperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[7]?.definition,
      count: low4Value?.count,
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)",
      icon: <img src={Solidperformer} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[8]?.definition,
      count: low5Value?.count,
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)",
      icon: <img src={Highperformers} alt="image" />,
    },
  ];
  // console.log(moderate_3,"jjjjjjj")
  // console.log(moderate_4,"jjjjjjjq")
  // console.log(moderate_5,"jjjjjjjk")


  const ExcelData9Box: any[] = [
    low_3?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    low_4?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    low_5?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    moderate_3?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    moderate_4?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    moderate_5?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    high_3?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    high_4?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
    high_5?.data?.map((j: any) => {
      return {
        Ecode: j?.employee_code,
        EName: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        SubSection: j["sub section"],
        Overallrating: j?.normalizer?.normalizer_rating,
        PotentialLevel: j?.appraisal.potential,
      }
    }),
  ].flat()
  //console.log(ExcelData9Box, "ExcelData9Box")
  //function for nine box
  const [range1, setrange1] = React.useState<any>(0);
  const [range2, setrange2] = React.useState<any>(0);
  const [range3, setrange3] = React.useState<any>(0);
  const [range4, setrange4] = React.useState<any>(0);
  const [range5, setrange5] = React.useState<any>(0);
  const [PAAdmin, setPAAdmin] = React.useState(false);

  console.log(range1, range2, range3, range4, "RangeStates")
  //for tabs
  // const location: any = useLocation();
  const tabLocation = location?.state?.from;
  console.log(tabLocation, "tabLocation")
  const [value, setValue] = React.useState<any>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue, "SyntheticEventValue")
    setValue(newValue);
    setvalueOfCard("");
  };
  const [statusSort, setstatusSort] = useState<any>("");
  useEffect(() => {
    if (tabLocation !== undefined && tabLocation !== "AveragePerformers" && tabLocation == "My Team Dashboard") {
      setValue(1);
    } else if (tabLocation !== undefined && tabLocation !== "AveragePerformers") {
      setValue(2);
    }

    if(tabLocation == "PAAdmin"){
      setPAAdmin(true)
    }
    else{
      setPAAdmin(false)
    }
  }, [tabLocation]);
  //for tabs
  //functions for emp rej pie chart
  // renormalization
  const checkAppraisalStatusInProgress = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.employee?.employee_agree == true && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal.status == status ;
    }).length;
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          // item?.employee?.employee_status === 'employee-rejected'
          // || 
          item?.employee?.employee_rejection === "true");
    })?.length;
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.employee?.employee_agree == false && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;
      // return  item?.appraisal?.status === status;

    })?.length;
  };

   console.log(checkAppraisalStatusCompleted("completed"),checkAppraisalinmediationStatus("rejected") ,checkAppraisalStatusInProgress("rejected"),"newcheckAppraisalStatus")

  //  expandableviews inprogress employee rejection chart
  const checkAppraisalStatusI = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.employee?.employee_agree == true &&  item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal.status == status ;
    });
  };
 // expandableviews completed employee rejection chart
  const checkAppraisalStatusC = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          // item?.employee?.employee_status === 'employee-rejected'
          // ||
           item?.employee?.employee_rejection === "true");
    });
  };
  // expandableviews inmediation employee rejection chart
  const checkAppraisalStatusIM = (status: string) => {
    return Data2Value?.filter((item: any) => {
      return item?.employee?.employee_agree == false && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;
      // return  item?.appraisal?.status === status;

    });
  };

  //console.log(checkAppraisalStatus("completed"), "newcheckAppraisalStatus")
  //functions for emp rej pie chart
  //function for doughnut chart
  const Temp = employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
  ?.filter((item1: any) => {
    if (SectionFilter.length === 0) {
      return item1
    } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
  }).filter((item1: any) => {
    if (subSectionFilter.length === 0) {
      return item1
    } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
  }).filter((item1: any) => {
    if (divisionFilter.length === 0) {
      return item1
    } else { return !!divisionFilter?.find(item2 => item1.division === item2) }
  });
  console.log(Temp,"checklengthinRange")
  const checklengthinRange = (min: number, max: number) => {
    return (
      (Temp?.filter((item: any) => {
        //console.log(item.appraisal.appraiser_rating, "appraisal_rating3");
        return (
          item?.overall_rating >= min &&
          item?.overall_rating <= max &&
          item?.appraisal?.status == "completed"
        );
      })?.length)
    );
  };



   // function for expandablle views in rating distribution

  const checklengthinRanges = (min: number, max: number) => {
    return (
      (Temp?.filter((item: any) => {
        //console.log(item.appraisal.appraiser_rating, "appraisal_rating3");
        return (
          item?.overall_rating >= min &&
          item?.overall_rating <= max &&
          item?.appraisal?.status == "completed"
        );
      }))
    );
  };
  // console.log(checklengthinRange(1, 1.99),
  //     checklengthinRange(2, 2.49),
  //     checklengthinRange(2.5, 2.99),
  //     checklengthinRange(3, 3.99),
  //     checklengthinRange(4, 5)
  //     , "RangeCheck")
  useEffect(() => {
    setrange1(Math.round(checklengthinRange(1, 2.49)))
    setrange2(Math.round(checklengthinRange(2.5, 2.99)))
    setrange3(Math.round(checklengthinRange(3, 3.99)))
    setrange4(Math.round(checklengthinRange(4, 5)))
    //setrange5(Math.round(checklengthinRange(4, 5)))
  }, [employeeData, Temp])
  //function for doughnut chart
  //function for status cards
  const checkAppraisalStatusforCards = (status: string) => {
    // console.log(employeeData?.data?.filter((item: any) => {
    //     console.log(item, status, 'hari')
    //     return item?.appraisal?.status === status;
    // })?.length, "countfuncton")
    if (employeeData && employeeData1)
      return employeeData1?.filter((item: any) => {
        return item?.appraisal?.status === status;
      })?.length;
    else return 0;
  };

  const calculatePercentageforCards = (num: number) => {
    if (employeeData1 != undefined && employeeData != undefined) {
      if (employeeData && employeeData?.data && employeeData1?.length != 0)
        return (num * 100) / employeeData1?.length;
      else return 0
    }
    else {
      return 0
    }
  };
  let CompletedEmp = checkAppraisalStatusforCards("completed");
  let TotalEmp = checkAppraisalStatusforCards("not-started") + checkAppraisalStatusforCards("in-progress") +
    checkAppraisalStatusforCards("normalized") + checkAppraisalStatusforCards("rejected") + checkAppraisalStatusforCards("completed")
  let NotStartedEmp = checkAppraisalStatusforCards("not-started")
  console.log(TotalEmp, CompletedEmp, NotStartedEmp, "TotalEmp");
  useEffect(() => {
    if (TotalEmp == NotStartedEmp) {
      setOveralldashboard(false);
    } else {
      setOveralldashboard(true)
    }
  }, [calculatePercentageforCards])
  const StatusValues = [
    {
      title: "Not-Started",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("not-started")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("not-started"),
      // color:"linear-gradient(0deg, rgba(54,177,201,0.9472163865546218) 0%, rgba(50,191,194,1) 82%)"
      color: "linear-gradient(79deg, rgba(255,55,55,1) 39%, rgba(255,96,96,0.9136029411764706) 96%)"
    },
    {
      title: "In Progress",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("in-progress")+checkAppraisalStatusforCards("normalized")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("in-progress")+checkAppraisalStatusforCards("normalized"),
      // color:"linear-gradient(90deg, rgba(246,191,113,0.958420868347339) 27%, rgba(246,191,113,1) 100%, rgba(255,255,255,1) 100%)"
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)"
    },
    // {
    //   title: "Normalized",
    //   percentage: calculatePercentageforCards(
    //     checkAppraisalStatusforCards("normalized")
    //   ).toFixed(2),
    //   count: checkAppraisalStatusforCards("normalized"),
    //   // color:"linear-gradient(0deg, rgba(37,173,200,1) 98%, rgba(126,221,240,0.9948354341736695) 100%, rgba(251,254,255,1) 100%)"
    //   color: "linear-gradient(to left, #3BD7F6, #26B4D0)"
    // },
    {
      title: "Rejected",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("rejected")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("rejected"),
      // color:"linear-gradient(90deg, rgba(175,191,201,0.8939950980392157) 0%, rgba(148,161,168,1) 100%)"
      color: "linear-gradient(to left, #BECFD9, #89949A)"
    },
    {
      title: "Completed",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("completed")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("completed"),
      // color:"linear-gradient(158deg, rgba(158,232,220,1) 0%, rgba(10,166,141,1) 99%, rgba(35,191,165,1) 100%)"
      color: "linear-gradient(to left, #35CFB6, #079B82)"
    },
  ];
  // console.log(StatusValues, calculatePercentageforCards(
  //     checkAppraisalStatusforCards("completed")
  // ).toFixed(2), checkAppraisalStatusforCards("completed"), "parentStatusValues")
  //function for status cards
  //Top performers
  const topPerformerEmployees = () => {
    return employeeData1?.slice()?.sort((a: any, b: any) => b?.normalizer?.normalizer_rating - a?.normalizer?.normalizer_rating)?.slice(0, 5)
  }
  //console.log(topPerformerEmployees(), "topPerformerEmployees")
  const TopPerformersOfNormalizer = employeeData1?.slice()?.filter((f: any) => f?.overall_rating >= 4 && f?.appraisal?.status == "completed")
    ?.sort((a: any, b: any) => b?.overall_rating - a?.overall_rating)?.slice(0, 5)
  //console.log(TopPerformersOfNormalizer,"TopPerformersOfNormalizer")
  console.log(employeeData1, "employeeData1Check")

  //For changing my action's tab
  const handleOnClickCard = (e: any, title: any) => {
    //console.log(title,"clicked the card")
    setvalueOfCard(title)
    setValue(2);
  }
  //For changing my action's tab
  const [initial, setInitial] = React.useState<any>([""]);

  React.useEffect(() => {
    let DataforInitial: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
    // setindexBasedValue(DataforInitial)
    // console.log(DataforInitial,"DataforInitial")
    // console.log(low_3,low_4,low_5,"1stboxd")
    setInitial(DataforInitial)
  }, [high_3, high_4, high_5, moderate_3, moderate_4, moderate_5, low_3, low_4, low_5])

  const Role = "Normalizer"
  if ( isemployeeLoading) {
    return <div><Loader/>  </div>
}
  return (
    <>
   
      <div
        style={{
          background: "#F1F1F1",
          minHeight: "100px",
          overflow: "hidden",
           height: "auto",
        }}
      >
        { PAAdmin == true && 
    <PAMaster  />
          
        } 
         {calendarValDialog ? (
              <>
                <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
          <Typography
                style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                    cursor:"pointer"
                  }}
                  onClick={() => {
                    if (tabLocation === "Normalizer") {
                      navigate("/normalizer");
                     
                    }else if(tabLocation== "CEORole") {
                      navigate("/CeoRole")
                    }
                    else {
                      navigate("/PA_Dashboard");
                    }
                  }}
                >
              
              Overall Dashboard
          
            </Typography>
            <div
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
            >
              Dashboard
            </div>
          </Breadcrumbs>
          </Stack>
    <Box
        sx={{
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <div className={classes.container}>
        <Typography className={classes.text1}>
          There are no previous calendars available.
          </Typography>
         
       
        </div>
      </Box>              </>
            ) : 
        <>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          
          
          <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
          <Typography
                style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                    cursor:"pointer"
                  }}
                  onClick={() => {
                    if (tabLocation === "Normalizer") {
                      navigate("/normalizer");
                      // normalizer
                    } else {
                      navigate("/PA_Dashboard");
                    }
                  }}
                >
               {/* onClick={() => { navigate(-1) }} */}
              Overall Dashboard
            {/* </Link> */}
            </Typography>
            <Typography
          style={{
            fontSize: "18px",
            color: "#333333",
            fontFamily: "Arial",
          }}
          color="inherit"
          // to={`/`}
          // state={{
          //   from: 1,
          // }}
        >
         Previous PA
        </Typography>

          </Breadcrumbs>
        </Stack>
        {/* <TabPanel value={value} index={2}> */}
        
        <AppraiserDashboardContext>
          {/* {(RatingsExpandActive === false && TopperformersExpandActive === false && 
                    TeamtableExpandActive === false && NineboxExpand === false && solidperformersExpandActive === false) &&<div> */}
          <div>
            <ClosedCalendarfilter
              SectionFilter={SectionFilter}
              setSectionFilter={setSectionFilter}
              subSectionFilter={subSectionFilter}
              setSubSectionFilter={setSubSectionFilter}
              navigationFrom={navigationFrom}
              divisionFilter={divisionFilter}
              setDivisionFilter={setDivisionFilter}
              talentCategoreyFilter={talentCategoreyFilter}
              settalentCategoreyFilter={settalentCategoreyFilter}
              valueofTab={value}
              overallDashboard={overallDashboard}
              employeeData1={employeeData}
              setvalueOfActiveCalender={setvalueOfActiveCalender}
              valueOfActiveCalender={valueOfActiveCalender}
              calendarValDialog={calendarValDialog}
              setcalendarValDialog={setcalendarValDialog}
            />
            {/* {activeCalenderName != undefined &&
              <Timelinerevview activeCalenderName={activeCalenderName} />
            } */}
          </div>
          <div style={{ marginTop: "40px" }}>
            {Data2Value &&
            <PerformanceRatingandEmpRejectionofClosedcalendar
            navigationRole={navigationRole}
            valueOfActiveCalender={valueOfActiveCalender}
            checkAppraisalStatusC={checkAppraisalStatusC}
            checkAppraisalStatusIR={checkAppraisalStatusI}
            checkAppraisalStatusIM={checkAppraisalStatusIM}
            checklengthinRanges={checklengthinRanges}
              setstatusSort={setstatusSort}
              completedCount={checkAppraisalStatusCompleted("completed")}
              inprogressCount={checkAppraisalStatusInProgress("completed")}
              inMediaton={checkAppraisalinmediationStatus("completed")}
              range1={range1}
              range2={range2}
              range3={range3}
              range4={range4}
              TotalEmp={TotalEmp}
              CompletedEmp={CompletedEmp}
              navigationFrom={navigationFrom}
              // range5={range5}
              StatusValues={StatusValues}
              setValue={setValue}
              handleOnClickCard={handleOnClickCard}
              appCalId={appCalId}
            />
          }
          </div>
          {/* <div>
                        <PerformanceRatingandEmpRejectionofOverallDashboard
                            completedCount={checkAppraisalStatusCompletedMyteam("completed")}
                            inprogressCount={checkAppraisalStatusInProgressMyteam("in-progress")}
                            inMediaton={checkAppraisalinmediationStatusMyteam("rejected")}
                            range1={range1Myteam}
                            range2={range2Myteam}
                            range3={range3Myteam}
                            range4={range4Myteam}
                            TotalEmp={TotalEmpMyteam}
                            CompletedEmp={CompletedEmpMyteam}
                            navigationFrom={navigationFrom}
                            handleOnClickCard={handleOnClickCardMyteam}
                            StatusValues={StatusValuesMyteam}
                            setselectedRatingRange={setselectedRatingRange}
                            setRatingsExpandActive={setRatingsExpandActive}
                        />
                    </div> */}
          {/* <div style={{ marginTop: "25px" }}>
                        <LineManagersTeamTable
                            navigationFrom={navigationFrom}
                            SectionFilter={SectionFilter}
                            setSectionFilter={setSectionFilter}
                            subSectionFilter={subSectionFilter}
                            setSubSectionFilter={setSubSectionFilter}
                            employeeData1={talentCategoreyData}
                            valueOfCard={valueOfCardMyteam}
                            setTeamtableExpandActive={setTeamtableExpandActive}
                        />

                    </div> */}
          <div style={{ marginTop: "25px" }}>
            <NineboxandTopPerformanceofOverallDashboard
            valueOfActiveCalender={valueOfActiveCalender}
               high3Value={high3Value}
                     high4Value={high4Value}
                     high5Value={high5Value}
                     low3Value={low3Value}
                     low4Value={low4Value}
                     low5Value={low5Value}
                     moderate3Value={moderate3Value}
                     moderate4Value={moderate4Value}
                     moderate5Value={moderate5Value}
              NineBoxValues={NineBoxValues}
              topPerformerEmployees={TopPerformersOfNormalizer}
              ExcelData9Box={ExcelData9Box}
              navigationFrom={navigationFrom}
              DataforInitial={initial}
              appCalId={appCalId}
            />


          </div>
          <div style={{ marginTop: "25px",marginBottom:"25px" }}>
            <Closedcalendarteamtable
            NaviGationFrom={NaviGationFrom}
            valueOfActiveCalender={valueOfActiveCalender}
             statusSort={statusSort}
             navigationFrom={navigationFrom}
             SectionFilter={SectionFilter}
             setSectionFilter={setSectionFilter}
             subSectionFilter={subSectionFilter}
             setSubSectionFilter={setSubSectionFilter}
             divisionFilter={divisionFilter}
             setDivisionFilter={setDivisionFilter}
             employeeData1={employeeData1}
             valueOfCard={valueOfCard}
             Role={Role}
             appCalId={appCalId}
            />
            {/* <NormalizerTeamTable
              statusSort={statusSort}
              navigationFrom={navigationFrom}
              SectionFilter={SectionFilter}
              setSectionFilter={setSectionFilter}
              subSectionFilter={subSectionFilter}
              setSubSectionFilter={setSubSectionFilter}
              divisionFilter={divisionFilter}
              setDivisionFilter={setDivisionFilter}
              employeeData={employeeData1}
              valueOfCard={valueOfCard}
            /> */}
          </div>
          {/* </div> */}
          {/* } */}
          {/* {RatingsExpandActive && <div>
                        <FilteredtablemainofOverallDashboard
                            FinalData={talentCategoreyData}
                            selectedRatingRange={selectedRatingRange}
                            setselectedRatingRange={setselectedRatingRange}
                            setRatingsExpandActive={setRatingsExpandActive}
                        />
                    </div>}
                   {TopperformersExpandActive && <div>
                    <TopPerformersExpandofAppOverallDashboard
                     FinalData={talentCategoreyData}
                     setTopperformersExpandActive={setTopperformersExpandActive}
                    />
                    </div>}
                   {TeamtableExpandActive && <div>
                      <OverallDashboardExpandViewofTable
                        employeeData1={talentCategoreyData}
                        setTeamtableExpandActive={setTeamtableExpandActive}
                      />
                    </div>}
                   {NineboxExpand && <div>
                    <ExpandNineBoxandSolidtalentsofOverallDashboard
                    setNineboxExpand={setNineboxExpand}
                    setSolidperformersExpandActive={setSolidperformersExpandActive}
                    NineBoxData={NineBoxValues}
                    indexBasedTitle={indexBasedTitle}
                    setindexBasedTitle={setindexBasedTitle}
                    indexBasedValue={indexBasedValue}
                    setindexBasedValue={setindexBasedValue}
                    />
                    </div>}
                {solidperformersExpandActive && <div>
                        <FilteredTableofExpNineboxOD
                        indexBasedTitle={indexBasedTitle}
                        indexBasedValue={indexBasedValue}
                        NineBoxData={NineBoxValues}
                        employeeData1={talentCategoreyData}
                        />
                    </div>} */}

        </AppraiserDashboardContext>
         
        {/* </TabPanel> */}
          </>
        }
      </div>
      
    </>
  )
}

export default ClosedcalendarDashboardNormalizer