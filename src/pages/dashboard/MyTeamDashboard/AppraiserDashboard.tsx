import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import Timelinerevview from '../../../components/reviewer/Dashboard/Timelinerevview';
import PerformanceRatingandEmpRejection from '../../../components/homepage/MyTeamDashboardComponents/PerformanceRatingandEmpRejection';
import NineboxandTopPerformance from '../../../components/homepage/MyTeamDashboardComponents/NineboxandTopPerformance';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import {
  useAppraisalCalenderFiltersQuery,
  useGetCalenderQuery,
  useGetEmployeeByFilterQuery,
  useGetlineManagerEmployeeQuery,
  useGetlineManagerPlusOneEmployeeQuery
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
import Teamreview from '../../../components/homepage/MyTeamDashboardComponents/MyTeamTable/Appraiser/TeamTableAppraisermain';
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import CalendarFilters from '../../../components/homepage/MyTeamDashboardComponents/calnderfilter';
import { useGetActiveCalenderQuery, useGetPACalendarQuery } from '../../../service/calender/Calender';
import NoliveCalendar from '../NoliveCalendar';
import Loader from '../../../components/Loader/Loader';
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
export default function AppraiserDashboard() {
  const calendarId = `636cb1a7960b1548b80ff775`

  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  let navigationFrom = "Appraiser";
  let navigateToClosedDashboard = "/ClosedcalendarDashboardAppraiser";
  //For gtting active cal 
  const { data } = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')
  const { data: calendarData } = useGetCalenderQuery('')
  const { data: PAdata } = useGetPACalendarQuery('')
  const [valueOfActiveCalender, setvalueOfActiveCalender] = React.useState<any>("");
  const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
  const [CalenderName, setCalenderName] = React.useState<any>("");
  //For filtered calendar data
  // useGetActiveCalenderQuery
  const { data: activecalendardata, isLoading: isTitleLoading } = useGetActiveCalenderQuery('')
  React.useEffect(() => {
    if (activeCalenderName?._id != undefined) {
      setappCalId(activeCalenderName?._id)
    }
  }, [activeCalenderName])

  console.log(appCalId, "appCalId")
  const [hide, setHide] = React.useState(false);
  const [hide1, setHide1] = React.useState(false);

  // calendar filter setting  latest calendar as a initial calendar
  React.useEffect(() => {
    const calendarName = activecalendardata?.data[0]?.name;
    const paLaunchSubstring = activecalendardata?.data[0]?.pa_launch?.substring(0, 4);
    setactiveCalenderName(activecalendardata?.data[0])
    setCalenderName(activecalendardata?.data[0]?.name);

    if (activecalendardata?.data[0] == "" || activecalendardata?.data[0] == undefined) {
      setHide(true)
    } else if (activecalendardata?.data[0] != "" || activecalendardata?.data[0] != undefined) {
      setHide1(true)
    }
  }, [activecalendardata])
  //For gtting active cal
  // Data2 used in My team dashboard ,Rating distribution
  const { data: data2, isLoading: isemployeeLoading } = useGetEmployeeByFilterQuery(`?select=
  employee_code,first_name,
  legal_full_name,appraiser_code,reviewer_code,normalizer_code,pa_status,
  employee.employee_rating,
  position_long_description,
  employee.employee_status,
  grade,
  employee.employee_agree,
  normalizer.normalized_overallRating,
  normalized_overallRating,
  service_reference_date,isSupervisor,email,function,
  section,
  talent_category,
  sub_section,
  appraisal.appraiser_rating,
  reviewer.reviewer_rating,
  normalizer.normalizer_rating,
  appraisal.status,
  appraisal.appraiser_status,
  appraisal.pa_status,
  appraisal.appraiser_rejected,appraisal.potential,reviewer.reviewer_status,normalizer.normalizer_status,normalizer.normalizer_rejected,reviewer.rejection_count,appraisal.objective_description,
  reviewerIsDisabled,appraiser_name,normalizer_name,reviewer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location,sub%20section,sub section,reviewer_previous_submission?.reviewer_rating,division,appraisal.appraiser_name,
  current_rating.overall_rating,pa_status,employee.employee_rejection,overall_rating,previous_rating,employee.employee_status,reviewer.reviewer_status,normalizer.normalizer_status,appraisal.appraiser_PA_accepted,appraisal.appraiser_PA_rejected,reviewer.reviewer_PA_accepted,reviewer.reviewer_PA_rejected,normalizer.normalizer_PA_accepted,normalizer.normalizer_PA_rejected,employee.employee_PA_rejected,&appraiser_code=${user?.employee_code}&employee_upload_flag=true&appraisal.status!=excepted&calendar=${appCalId}&limit=800`)
  const { data: data1, isLoading } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&limit=800&select=appraisal.appraiser_rating,section,sub_section`);
  const SELECT_FOR_DASHBOARD = `employee_code,
legal_full_name,
employee.employee_rating,
position_long_description,
employee.employee_status,first_name,
grade,
section,overall_rating,
talent_category,
service_reference_date,isSupervisor,email,function,
normalizer.normalized_overallRating,
normalized_overallRating,
sub_section,
appraisal.appraiser_rating,
reviewer.reviewer_rating,
normalizer.normalizer_rating,
appraisal.status,
appraisal.appraiser_status,
appraisal.pa_status,
appraisal.appraiser_rejected,
appraisal.potential,
reviewer.reviewer_status,
normalizer.normalizer_status,
normalizer.normalizer_rejected,
reviewer.rejection_count,
appraisal.objective_description,
employee.objective_description,
reviewerIsDisabled,
appraiser_name,
normalizer_name,
reviewer_name,
appraisal.potential,
manager_code,
manager_name,
manager_position,
work_location,
sub%20section,
division,
isGradeException,
appraisal.appraiser_name,
current_rating.overall_rating,
pa_status,
employee.employee_rejection,
reviewer_previous_submission?.reviewer_rating,
previous_rating,
employee.employee_status,
reviewer.reviewer_status,
appraisal.pa_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,
normalizer.normalizer_status,
appraisal.appraiser_PA_accepted,
appraisal.appraiser_PA_rejected,
reviewer.reviewer_PA_accepted,
reviewer.reviewer_PA_rejected,
normalizer.normalizer_PA_accepted,
normalizer.normalizer_PA_rejected,
employee.employee_PA_rejected,
`
  // employeedata is used in My Action tab
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?appraiser_code=${user?.employee_code}&employee_upload_flag=true&appraisal.status!=excepted&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  const { data: RangeValue } = useGetNineboxQuery("");
  const [overallDashboard, setOveralldashboard] = React.useState(false);
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
  //Query for lineManager Employee 
  const { data: lineManagerEmployee } = useGetlineManagerEmployeeQuery(user?.employee_code);
  const { data: lineManagerPlusOneEmployee } = useGetlineManagerPlusOneEmployeeQuery(user?.employee_code);
  const [lineManagerEmployeeData, setlineManagerEmployeeData] = React.useState<any>([]);
  const [lineManagerPlusOneEmployeeData, setlineManagerPlusOneEmployeeData] = React.useState<any>([]);
  const [DRandDRplus1, setDRandDRplus1] = React.useState<any>([]);
  useEffect(() => {
    setlineManagerEmployeeData(lineManagerPlusOneEmployee?.lineManager)
    setlineManagerPlusOneEmployeeData(lineManagerPlusOneEmployee?.lineManagerPlusOne)
    if (lineManagerEmployeeData?.length > 0) {
      let firstArray = lineManagerEmployeeData;
      let secondArray = lineManagerPlusOneEmployeeData;
      let combinedArray = [...firstArray, ...secondArray];
      setDRandDRplus1(combinedArray)
    }
  }, [lineManagerPlusOneEmployee])
  const { data: low_3 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,previous_rating,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,section,previous_rating,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_name,manager_position,manager_code,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );
  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
    reviewer.reviewer_rating,reviewer_name,employee.employee_rating,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraiser_code=${user?.employee_code}&calendar=${appCalId}&employee_upload_flag=true&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  //For changing my actions's tab
  const [valueOfCard, setvalueOfCard] = React.useState<any>("");
  //For changing my actions's tab
  //for hiding the tabs
  const [TabsActive, setTabsActive] = React.useState<any>(false);
  //mulitiselect
  const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
  const [talentCategoreyFilter, settalentCategoreyFilter] = React.useState<string[]>([]);
  const [talentCategoreyData, settalentCategoreyData] = React.useState<any>([]);
  const [employeeData1, setemployeeData1] = React.useState<any>([]);
  const [Data2Value, setData2Value] = React.useState<any>([]);
  const [Data1Value, setData1Value] = React.useState<any>([]);
  const [Temp1, setTemp1] = React.useState<any>([]);

  const [totalcount, settotalcount] = React.useState<any>("");
  const [completdcount, setcompletdcount] = React.useState<any>("");
  useEffect(() => {
    setTemp1(() =>
      data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
    )
  }, [data2, SectionFilter, subSectionFilter, GradeFilter])
  // 9box grid value based high,low,moderate
  const [low3Value, setLow3Value] = React.useState<any>([]);
  const [low4Value, setLow4Value] = React.useState<any>([]);
  const [low5Value, setLow5Value] = React.useState<any>([]);
  const [moderate3Value, setmoderate3Value] = React.useState<any>([]);
  const [moderate4Value, setmoderate4Value] = React.useState<any>([]);
  const [moderate5Value, setmoderate5Value] = React.useState<any>([]);
  const [high3Value, sethigh3Value] = React.useState<any>([]);
  const [high4Value, sethigh4Value] = React.useState<any>([]);
  const [high5Value, sethigh5Value] = React.useState<any>([]);
  useEffect(() => {
    setcompletdcount(checkAppraisalStatusforCards("completed"))
    settotalcount(checkAppraisalStatusforCards("not-started") + checkAppraisalStatusforCards("in-progress") +
      checkAppraisalStatusforCards("normalized") + checkAppraisalStatusforCards("rejected") + checkAppraisalStatusforCards("completed"))

    //@ts-ignore

    if (
      //@ts-ignore
      (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
      //@ts-ignore
      (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0) &&
      //@ts-ignore
      (GradeFilter === "" || GradeFilter.includes("None") || GradeFilter.length === 0)

    ) {
      setemployeeData1(employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
      setData2Value(data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
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
        })?.filter((item1: any) => {
          if (GradeFilter?.length === 0) {
            return item1
          } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
        })

      const Temp2 = data2?.data
        ?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item1: any) => {
          if (SectionFilter.length === 0) {
            return item1
          } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
        }).filter((item1: any) => {
          if (subSectionFilter.length === 0) {
            return item1
          } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
        })?.filter((item1: any) => {
          if (GradeFilter?.length === 0) {
            return item1
          } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
        })
      const TempLow3 = low_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempLow4 = low_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempLow5 = low_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempModerate3 = moderate_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else {
          return !!SectionFilter?.find(item2 => item1.section === item2)
        }

      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })

      const TempModerate4 = moderate_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempModerate5 = moderate_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })

      const TempHigh3 = high_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempHigh4 = high_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      const TempHigh5 = high_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      })
      setemployeeData1(Temp)
      setData2Value(Temp2)
      setLow3Value(() => {
        if (TempLow3?.count) {
          return TempLow3?.data
        } else {
          return {
            count: TempLow3?.length,
            data: TempLow3

          }
        }
      })
      setLow4Value(() => {
        if (TempLow4?.count) {
          return TempLow4
        } else {
          return {
            count: TempLow4?.length,
            data: TempLow4
          }
        }
      })
      setLow5Value(() => {
        if (TempLow5?.count) {
          return TempLow5
        } else {
          return {
            count: TempLow5?.length,
            data: TempLow5
          }
        }
      })
      setmoderate3Value(() => {
        if (TempModerate3?.count) {
          return TempModerate3
        } else {
          return {
            count: TempModerate3?.length,
            data: TempModerate3
          }
        }
      })
      setmoderate4Value(() => {
        if (TempModerate4?.count) {
          return TempModerate4
        } else {
          return {
            count: TempModerate4?.length,
            data: TempModerate4
          }
        }
      })
      setmoderate5Value(() => {
        if (TempModerate5?.count) {
          return TempModerate5
        } else {
          return {
            count: TempModerate5?.length,
            data: TempModerate5
          }
        }
      })
      sethigh3Value(() => {
        if (TempHigh3?.count) {
          return TempHigh3
        } else {
          return {
            count: TempHigh3?.length,
            data: TempHigh3
          }
        }
      })
      sethigh4Value(() => {
        if (TempHigh4?.count) {
          return TempHigh4
        } else {
          return {
            count: TempHigh4?.length,
            data: TempHigh4
          }
        }
      })
      sethigh5Value(() => {
        if (TempHigh5?.count) {
          return TempHigh5
        } else {
          return {
            count: TempHigh5?.length,
            data: TempHigh5
          }
        }
      })
    }

  }, [
    SectionFilter, subSectionFilter, GradeFilter, employeeData, data2, data1, low_3, low_4, low_5,
    moderate_3, moderate_4, moderate_5, high_3, high_4, high_5
  ])

  const [initial, setInitial] = React.useState<any>([""]);
  const NineBoxValues = [
    {
      title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
      count: high3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Potentialtalents} alt="image" />,

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
 // 9box grid value based high,low,moderate

  //function for Rating distribtion andemployee rejection
  const [range1, setrange1] = React.useState<any>(0);
  const [range2, setrange2] = React.useState<any>(0);
  const [range3, setrange3] = React.useState<any>(0);
  const [range4, setrange4] = React.useState<any>(0);
  const [range5, setrange5] = React.useState<any>(0);

  //for tabs
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
  const [value, setValue] = React.useState<any>(1);
  // Tabchange myteam ,myaction,previous dashboard
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setvalueOfCard("");
  };
  const [statusSort, setstatusSort] = useState<any>("");
  useEffect(() => {
    if (tabLocation == 1) {
      setValue(2);
    }
    else if (tabLocation !== undefined) {
      setValue(1);
    }
  }, [tabLocation]);
  useEffect(() => {
    if (value === 1) {
      setemployeeData1(employeeData?.data)
    }
  }, [value, employeeData]);
  //for tabs


  //functions for emp rej pie chart
  const checkAppraisalStatusInProgress = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
    }).length;
  };
  // expandableviews inprogress employee rejection chart
  const checkAppraisalStatusI = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
    });
  };
  // expandableviews of completed employees employee rejection chart
  const checkAppraisalStatusC = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          item?.employee?.employee_rejection === true);
    });
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.appraisal?.status === status &&
        (
          item?.employee?.employee_rejection === true);
    })?.length;
  };

  // expandableviews inmediation employee rejection chart
  const checkAppraisalStatusIM = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.employee?.employee_agree == false && item?.appraisal?.status === status;

    });
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")?.filter((item: any) => {
      return item?.employee?.employee_agree == false && item?.appraisal?.status === status;

    })?.length;
  };

  //function for doughnut chart rating distribution
  const checklengthinRange = (min: number, max: number) => {
    return (
      (Temp1?.filter((item: any) => {
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max
          && item?.appraisal?.status == "completed"
        );
      })?.length)
    );
  };
  // function for expandablle views in rating distribution
  const checklengthinRanges = (min: number, max: number) => {
    return (
      (Temp1?.filter((item: any) => {
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))
    );
  };

  useEffect(() => {
    setrange1(Math.round(checklengthinRange(1, 2.49)))
    setrange2(Math.round(checklengthinRange(2.5, 2.99)))
    setrange3(Math.round(checklengthinRange(3, 3.99)))
    setrange4(Math.round(checklengthinRange(4, 5)))
  }, [data2, Temp1])
  //function for doughnut chart rating distribution


  //function for status cards
  const checkAppraisalStatusforCards = (status: string) => {
    if (employeeData1 && employeeData) {
      return employeeData1?.filter((item: any) => {
        return item?.appraisal?.status === status;
      })?.length;
    }
    else {
      return employeeData?.data?.filter((item: any) => {
        return item?.appraisal?.status === status;
      })?.length || 0;
    }
  };

  console.log(employeeData?.length == checkAppraisalStatusforCards("not-started")?.length, "kkkkkk")

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
  useEffect(() => {

    let CompletedEmp = 0;
    let TotalEmp = 0;

    if (employeeData) {
      CompletedEmp = checkAppraisalStatusforCards("completed");
      TotalEmp = checkAppraisalStatusforCards("not-started") + checkAppraisalStatusforCards("in-progress") +
        checkAppraisalStatusforCards("normalized") + checkAppraisalStatusforCards("rejected") + checkAppraisalStatusforCards("completed")
    }
    setcompletdcount(CompletedEmp)
    settotalcount(TotalEmp)
    if (TotalEmp == NotStartedEmp) {
      setOveralldashboard(false);
    } else {
      setOveralldashboard(true)
    }
  }, [calculatePercentageforCards])
  let NotStartedEmp = checkAppraisalStatusforCards("not-started")

  const StatusValues = [
    {
      title: "Not-Started",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("not-started")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("not-started"),
      color: "linear-gradient(79deg, rgba(255,55,55,1) 39%, rgba(255,96,96,0.9136029411764706) 96%)"
    },
    {
      title: "In Progress",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("in-progress") + checkAppraisalStatusforCards("normalized")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("in-progress") + checkAppraisalStatusforCards("normalized"),
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)"
    },
    {
      title: "Rejected",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("rejected")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("rejected"),
      color: "linear-gradient(to left, #BECFD9, #89949A)"
    },
    {
      title: "Completed",
      percentage: calculatePercentageforCards(
        checkAppraisalStatusforCards("completed")
      ).toFixed(2),
      count: checkAppraisalStatusforCards("completed"),
      color: "linear-gradient(to left, #35CFB6, #079B82)"
    },
  ];


  // For Topperformer Employees Expand
  const TopPerformersOfAppraiser = employeeData1?.slice()?.filter((f: any) => f?.appraisal?.pa_rating >= 4 && f?.appraisal?.status == "completed")
    ?.sort((a: any, b: any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0, 5)


  const handleOnClickCard = (e: any, title: any) => {
    setvalueOfCard(title)
    setValue(2);
  }

  // initial  9box employees setting into expand views
  React.useEffect(() => {
    if (high_3 != undefined && high_4 != undefined && high_5 != undefined && low_3 != undefined && low_4 != undefined && low_5 != undefined && moderate_3 != undefined && moderate_4 != undefined && moderate_5 != undefined) {
      let DataforInitials: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
      setInitial(DataforInitials)
    }
  }, [high_3, high_4, high_5, moderate_3, moderate_4, moderate_5, low_3, low_4, low_5])
  // initial 9box employees setting into expand views

  //  loader
  if (isemployeeLoading) {
    return <div><Loader />  </div>
  }
  //  loadder
  return <>
    <div
      style={{
        background: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
        height: "auto",
      }}
    >
      {activecalendardata && activecalendardata?.data[0] == "" || activecalendardata?.data[0] == undefined ?
        <NoliveCalendar navigateToClosedDashboard={navigateToClosedDashboard}
          navigationFrom={navigationFrom} /> :

        <div>
          <Box>
            <div
              style={{
                paddingLeft: "25px",
                paddingBottom: "12px",
                paddingTop: "12px",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  borderBottom: 1, borderColor: "divider",
                  marginRight: "30px",
                  display: TabsActive === false ? "block" : "none"
                }}

              >

                <Link
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    opacity: "10",
                    textTransform: "capitalize",
                    fontSize: "20px",
                    fontFamily: "Arial",
                  }} to={`/ClosedcalendarDashboardAppraiser`}
                  state={{
                    from: "Appraiser"
                  }}>
                  <Tab
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "20px",
                      fontFamily: "Arial",
                      color: "rgba(0, 0, 0, 0.6)",
                      opacity: "10",
                    }}
                    label="Previous Dashboard"
                    {...a11yProps(0)}
                  />
                </Link>
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#3e8cb5",
                    },
                    textTransform: "capitalize",
                    fontSize: "20px",
                    fontFamily: "Arial",
                  }}
                  label=" My Team Dashboard"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#3e8cb5",
                    },
                    textTransform: "capitalize",
                    fontSize: "20px",
                    fontFamily: "Arial",
                  }}
                  label="My Actions"
                  {...a11yProps(2)}
                />

              </Tabs>
            </div>
          </Box>
          <TabPanel value={value} index={1}>
            <AppraiserDashboardContext>
              <div>
                <CalendarFilters
                  GradeFilter={GradeFilter}
                  setGradeFilter={setGradeFilter}
                  SectionFilter={SectionFilter}
                  setSectionFilter={setSectionFilter}
                  subSectionFilter={subSectionFilter}
                  setSubSectionFilter={setSubSectionFilter}
                  navigationFrom={navigationFrom}
                  talentCategoreyFilter={talentCategoreyFilter}
                  settalentCategoreyFilter={settalentCategoreyFilter}
                  valueofTab={value}
                  overallDashboard={overallDashboard}
                  employeeData1={employeeData}
                  setvalueOfActiveCalender={setvalueOfActiveCalender}
                  valueOfActiveCalender={valueOfActiveCalender}
                  navigateToClosedDashboard={navigateToClosedDashboard}
                  CalenderName={CalenderName}
                />

                {activeCalenderName != undefined &&
                  <Timelinerevview activeCalenderName={activeCalenderName} />
                }
              </div>
              <div>
                {Data2Value &&
                  <PerformanceRatingandEmpRejection
                    checkAppraisalStatusC={checkAppraisalStatusC}
                    checkAppraisalStatusIR={checkAppraisalStatusI}
                    checkAppraisalStatusIM={checkAppraisalStatusIM}
                    checklengthinRanges={checklengthinRanges}
                    setstatusSort={setstatusSort}
                    completedCount={checkAppraisalStatusCompleted("completed")}
                    inprogressCount={checkAppraisalStatusInProgress("rejected")}
                    inMediaton={checkAppraisalinmediationStatus("rejected")}
                    range1={range1}
                    range2={range2}
                    range3={range3}
                    range4={range4}
                    TotalEmp={totalcount}
                    CompletedEmp={completdcount}
                    navigationFrom={navigationFrom}
                    StatusValues={StatusValues}
                    setValue={setValue}
                    handleOnClickCard={handleOnClickCard}
                  />
                }
              </div>
              <div style={{ marginTop: "25px", paddingBottom: "25px" }}>
                <NineboxandTopPerformance
                  high3Value={high3Value}
                  high4Value={high4Value}
                  high5Value={high5Value}
                  low3Value={low3Value}
                  low4Value={low4Value}
                  low5Value={low5Value}
                  moderate3Value={moderate3Value}
                  moderate4Value={moderate4Value}
                  moderate5Value={moderate5Value}
                  activeCalenderName={activeCalenderName}
                  NineBoxValues={NineBoxValues}
                  topPerformerEmployees={TopPerformersOfAppraiser}
                  navigationFrom={navigationFrom}
                  DataforInitial={initial}
                />
              </div>
            </AppraiserDashboardContext>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <AppraiserDashboardContext>
              <div>
                <Teamreview
                  statusSort={statusSort}
                  navigationFrom={navigationFrom}
                  GradeFilter={GradeFilter}
                  setGradeFilter={setGradeFilter}
                  SectionFilter={SectionFilter}
                  setSectionFilter={setSectionFilter}
                  subSectionFilter={subSectionFilter}
                  setSubSectionFilter={setSubSectionFilter}
                  employeeData1={employeeData1}
                  valueOfCard={valueOfCard}
                  appCalId={appCalId}
                />
              </div>


            </AppraiserDashboardContext>
          </TabPanel>

        </div>
      }

    </div>
  </>
}
