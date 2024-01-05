import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import Timelinerevview from '../../../components/reviewer/Dashboard/Timelinerevview';
import PerformanceRatingandEmpRejection from '../../../components/homepage/MyTeamDashboardComponents/PerformanceRatingandEmpRejection';
import NineboxandTopPerformance from '../../../components/homepage/MyTeamDashboardComponents/NineboxandTopPerformance';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useGetEmployeeByFilterQuery } from "../../../service";
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
import { Link, useLocation } from "react-router-dom";
import CalendarFilters from '../../../components/homepage/MyTeamDashboardComponents/calnderfilter';
import NormalizerTeamTable from '../../../components/homepage/MyTeamDashboardComponents/MyTeamTable/Normalizer/TeamTableNormalizermain';
import OverallDashboardForNormalizer from '../OverAllDashboard/OverallDashboardForNormalizer';
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

// export default Dashboard
export default function NormalizerDashboard() {
  const calendarId = `636cb1a7960b1548b80ff775`
  const { data: user } = useLoggedInUser();
  let navigationFrom = "Normalizer";
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  let navigateToClosedDashboard = "/ClosedcalendarDashboardNormalizer";
  const [valueOfActiveCalender, setvalueOfActiveCalender] = React.useState<any>("");
  const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
  const [CalenderName, setCalenderName] = React.useState<any>("");

  const { data: activecalendardata, isLoading: isTitleLoading } = useGetActiveCalenderQuery('')
  console.log(activeCalenderName, "valueOfActiveCalender")


  //For filtered calendar data
  React.useEffect(() => {
    if (activeCalenderName?._id != undefined) {
      setappCalId(activeCalenderName?._id)
    }
  }, [activeCalenderName])
  console.log(appCalId, "appCalId")
  React.useEffect(() => {
    const calendarName = activecalendardata?.data[0]?.name;
    const paLaunchSubstring = activecalendardata?.data[0]?.pa_launch?.substring(0, 4);
    setactiveCalenderName(activecalendardata?.data[0])
    setCalenderName(activecalendardata?.data[0]?.name);
  }, [activecalendardata])
  //For gtting active cal
  // Data2 used in My team dashboard ,Rating distribution
  const { data: data2, isLoading: isemployeeLoading } = useGetEmployeeByFilterQuery(`?select=
  employee_code,
  legal_full_name,
  employee.employee_rating,
  position_long_description,
  employee.employee_status,
  grade,
  sub_section,normalizer.normalized_overallRating,
  isSupervisor,service_reference_date,email,function,
  section,
  appraisal.appraiser_rating,
  appraisal.appraiser_rejected,
  reviewer.reviewer_rating,
  normalizer.normalizer_rating,
  appraisal.status,
  appraiser_name,
  normalizer_name,
  reviewer_name,appraiser_code,reviewer_code,normalizer_code,pa_status,
  appraisal.potential,
  manager_code,
  manager_name,
  manager_position,
  work_location,
  division
  talent_category,
  appraisal.appraiser_name,
  appraisal.appraiser_status,
  reviewer.reviewer_status,
  normalizer.normalizer_status,
  normalizer.normalizer_rejected,
  reviewer.rejection_count,
  appraisal.objective_description,
  reviewerIsDisabled,
  employee.employee_agree,
  employee.employee_rejection,
  pa_status,
  previous_rating,
  current_rating.overall_rating,first_name,overall_rating,
  employee_rejection,
  appraisal.appraiser_PA_accepted,
appraisal.appraiser_PA_rejected,
reviewer.reviewer_PA_accepted,
reviewer.reviewer_PA_rejected,
normalizer.normalizer_PA_accepted,
normalizer.normalizer_PA_rejected,
employee.employee_PA_rejected,
calendar,
  appraisal.pa_status&normalizer_code=${user?.employee_code}&calendar=${appCalId}&limit=800&populate=calendar`)

  const SELECT_FOR_DASHBOARD = `employee_code,
  calendar,
legal_full_name,
employee.employee_rating,first_name,
position_long_description,
employee.employee_status,
grade,
division,
sub_section,overall_rating,normalizer.normalized_overallRating,
isSupervisor,service_reference_date,email,function,
section,
appraisal.appraiser_rating,
appraisal.appraiser_rejected,
reviewer.reviewer_rating,
isGradeException,
normalizer.normalizer_rating,
normalizer.normalizer_rejected,
appraisal.status,
appraiser_name,
normalizer_name,
reviewer_name,
talent_category,
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
employee.objective_description,
reviewerIsDisabled,
normalizerIsChecked,
normalizerIsDisabled,
pa_status,
previous_rating,
appraisal.pa_rating,
appraiser_code,
reviewer_code,
normalizer_code,
service_reference_date,
current_rating.overall_rating,
appraisal.pa_status,
appraisal.appraiser_PA_accepted,
appraisal.appraiser_PA_rejected,
reviewer.reviewer_PA_accepted,
reviewer.reviewer_PA_rejected,
normalizer.normalizer_PA_accepted,
normalizer.normalizer_PA_rejected,
employee.employee_PA_rejected,`
  //newly changed
  // myaction used data
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&limit=800&select=${SELECT_FOR_DASHBOARD}&populate=calendar`
  );
  const { data: RangeValue } = useGetNineboxQuery("");
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

  const { data: low_3 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeLowTo}`)

  const { data: moderate_3 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeLowTo}`)

  const { data: high_3 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeLowTo}`)

  const { data: low_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)

  const { data: moderate_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)

  const { data: high_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)

  const { data: low_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeHighTo}`)

  const { data: moderate_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeHighTo}`)

  const { data: high_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
  reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeHighTo}`)

  //For changing my actions's tab
  const [valueOfCard, setvalueOfCard] = React.useState<any>("");
  //For changing my actions's tab

  const [talentCategoreyFilter, settalentCategoreyFilter] = React.useState<string[]>([]);

  //for hiding the tabs
  const [TabsActive, setTabsActive] = React.useState<any>(false);

  //mulitiselect
  const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);

  const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
  const [divisionFilter, setDivisionFilter] = React.useState<string[]>([]);
  const [employeeData1, setemployeeData1] = React.useState<any>([]);
  const [Data2Value, setData2Value] = React.useState<any>([]);
  const [overallDashboard, setOveralldashboard] = React.useState(false);
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
  useEffect(() => {
    //@ts-ignore

    if (
      //@ts-ignore
      (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
      //@ts-ignore
      (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0) &&
      //@ts-ignore
      (divisionFilter === "" || divisionFilter.includes("None") || divisionFilter.length === 0) &&
      //@ts-ignore
      (GradeFilter === "" || GradeFilter.includes("None") || GradeFilter.length === 0)

    ) {
      setemployeeData1(employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
      setData2Value(data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
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
      const Temp = data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
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
        })?.filter((item1: any) => {
          if (GradeFilter?.length === 0) {
            return item1
          } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
        });
      const Temp2 = data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
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
        })?.filter((item1: any) => {
          if (GradeFilter?.length === 0) {
            return item1
          } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
        });
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
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
      })?.filter((item1: any) => {
        if (GradeFilter?.length === 0) {
          return item1
        } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
      });
      setemployeeData1(Temp)
      setData2Value(Temp2)
      setLow3Value(() => {
        if (TempLow3?.count) {
          return TempLow3
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
    SectionFilter, divisionFilter, GradeFilter, subSectionFilter, employeeData, data2, low_3, low_4, low_5,
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

  //function for nine box
  const [range1, setrange1] = React.useState<any>(0);
  const [range2, setrange2] = React.useState<any>(0);
  const [range3, setrange3] = React.useState<any>(0);
  const [range4, setrange4] = React.useState<any>(0);
  const [range5, setrange5] = React.useState<any>(0);
  //for tabs
  const location: any = useLocation();
  const tabLocation = location?.state?.from;
  const [value, setValue] = React.useState<any>(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setvalueOfCard("");
  };
  const [statusSort, setstatusSort] = useState<any>("");
  useEffect(() => {
    if (tabLocation !== undefined && tabLocation !== "AveragePerformers" && tabLocation == "toOverallDashboard") {
      setValue(1);
    } else if (tabLocation !== undefined && tabLocation !== "AveragePerformers" && (tabLocation == "My Team Dashboard" || tabLocation == "toMyTeamDashboard")) {
      setValue(2);
    } else if (tabLocation !== undefined && tabLocation !== "AveragePerformers") {
      setValue(3);
    }
  }, [tabLocation]);
  //for tabs
  //functions for emp rej pie chart
  // renormalization
  const checkAppraisalStatusInProgress = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
      }).length;
  };
  const checkAppraisalStatusCompleted = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.appraisal?.status === status &&
          (
            item?.employee?.employee_rejection === true);
      })?.length;
  };
  const checkAppraisalinmediationStatus = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.employee?.employee_agree == false && item?.appraisal?.status === status;
      })?.length;
  };



  // expandableviews completed employee rejection chart
  const checkAppraisalStatusC = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.appraisal?.status === status &&
          (
            item?.employee?.employee_rejection === true);
      });
  };
  // expandableviews inprogress employee rejection chart
  const checkAppraisalStatusI = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
      });
  };
  // expandableviews inmediation employee rejection chart
  const checkAppraisalStatusIM = (status: string) => {
    return Data2Value?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item: any) => {
        return item?.employee?.employee_agree == false && item?.appraisal?.status === status;
      });
  };
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
    })?.filter((item1: any) => {
      if (GradeFilter?.length === 0) {
        return item1
      } else { return !!GradeFilter?.find(item2 => item1?.grade === item2) }
    })
    ;
  const checklengthinRange = (min: number, max: number) => {
    return (
      (Temp?.filter((item: any) => {
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max &&
          item?.appraisal?.status == "completed"
        );
      })?.length)
    );
  };
  const checklengthinRanges = (min: number, max: number) => {
    return (
      (Temp?.filter((item: any) => {
        return (
          item?.normalizer?.normalizer_rating >= min &&
          item?.normalizer?.normalizer_rating <= max &&
          item?.appraisal?.status == "completed"
        );
      }))
    );
  };
  //function for doughnut chart
  useEffect(() => {
    setrange1(Math.round(checklengthinRange(1, 2.49)))
    setrange2(Math.round(checklengthinRange(2.5, 2.99)))
    setrange3(Math.round(checklengthinRange(3, 3.99)))
    setrange4(Math.round(checklengthinRange(4, 5)))
  }, [data2, Temp])
  //function for doughnut chart
  //function for status cards
  const checkAppraisalStatusforCards = (status: string) => {
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
  //function for status cards

  //Top performers of expand employees
  const TopPerformersOfNormalizer = employeeData1?.slice()?.filter((f: any) => f?.appraisal?.pa_rating >= 4 && f?.appraisal?.status == "completed")
    ?.sort((a: any, b: any) => b?.normalizer?.normalizer_rating - a?.normalizer?.normalizer_rating)?.slice(0, 5)

  //For changing my action's tab
  const handleOnClickCard = (e: any, title: any) => {
    setvalueOfCard(title)
    setValue(3);
  }
  const [RatingsExpandActive, setRatingsExpandActive] = React.useState<any>(false);
  const [NineboxExpand, setNineboxExpand] = React.useState<any>(false);
  const [TopperformersExpandActive, setTopperformersExpandActive] = React.useState<any>(false);
  const [selectedRatingRange, setselectedRatingRange] = React.useState<any>("");
  const [TeamtableExpandActive, setTeamtableExpandActive] = React.useState<any>(false);
  console.log(TeamtableExpandActive, "TeamtableExpandActive")
  const [solidperformersExpandActive, setSolidperformersExpandActive] = React.useState<any>(false);
  //For changing my action's tab
  const [initial, setInitial] = React.useState<any>([""]);
  // 9box initial data
  React.useEffect(() => {
    let DataforInitial: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
    setInitial(DataforInitial)
  }, [high_3, high_4, high_5, moderate_3, moderate_4, moderate_5, low_3, low_4, low_5])
  if (isemployeeLoading) {
    return <div><Loader />  </div>
  }
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
            {(RatingsExpandActive === false && TopperformersExpandActive === false &&
              TeamtableExpandActive === false && NineboxExpand === false && solidperformersExpandActive === false) &&
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
                  sx={{
                    borderBottom: 1, borderColor: "divider", marginRight: "30px",
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
                    }} to={`/ClosedcalendarDashboardNormalizer`}
                    state={{
                      from: "Normalizer"
                    }}
                  >
                    <Tab
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "20px",
                        fontFamily: "Arial",
                        color: "rgba(0, 0, 0, 0.6)",
                        opacity: "10",
                      }}
                      label="Previous Dashboard"
                      {...a11yProps(1)}
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
                    label=" Overall Dashboard"
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
            }
          </Box>
          {value === 2 &&
            <AppraiserDashboardContext>
              <div>
                <CalendarFilters
                  CalenderName={CalenderName}
                  SectionFilter={SectionFilter}
                  setSectionFilter={setSectionFilter}
                  GradeFilter={GradeFilter}
                  setGradeFilter={setGradeFilter}
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
                  navigateToClosedDashboard={navigateToClosedDashboard}
                />
                {activeCalenderName != undefined &&
                  <Timelinerevview activeCalenderName={activeCalenderName} />
                }
              </div>
              <div>

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
                  TotalEmp={TotalEmp}
                  CompletedEmp={CompletedEmp}
                  navigationFrom={navigationFrom}
                  StatusValues={StatusValues}
                  setValue={setValue}
                  handleOnClickCard={handleOnClickCard}
                />
              </div>
              <div style={{ marginTop: "25px", paddingBottom: "25px" }}>

                <NineboxandTopPerformance
                  appCalId={appCalId}
                  activeCalenderName={activeCalenderName}
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
                  navigationFrom={navigationFrom}
                  DataforInitial={initial}
                />
              </div>

            </AppraiserDashboardContext>}
          {value === 3 &&
            <AppraiserDashboardContext>
              <div
              >
                <NormalizerTeamTable
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
                />
              </div>
            </AppraiserDashboardContext>}
          {value === 1 &&
            <AppraiserDashboardContext>

              <OverallDashboardForNormalizer
                setRatingsExpandActive={setRatingsExpandActive}
                setNineboxExpand={setNineboxExpand}
                setTopperformersExpandActive={setTopperformersExpandActive}
                setselectedRatingRange={setselectedRatingRange}
                setTeamtableExpandActive={setTeamtableExpandActive}
                setSolidperformersExpandActive={setSolidperformersExpandActive}
                RatingsExpandActive={RatingsExpandActive}
                NineboxExpand={NineboxExpand}
                TopperformersExpandActive={TopperformersExpandActive}
                TeamtableExpandActive={TeamtableExpandActive}
                selectedRatingRange={selectedRatingRange}
                solidperformersExpandActive={solidperformersExpandActive}
                CalenderName={CalenderName}
                appCalId={appCalId}
                valueofTab={value}
                navigationFrom={navigationFrom}
                setTabsActive={setTabsActive}
                activeCalenderName={activeCalenderName}
                valueOfActiveCalender={valueOfActiveCalender}
                setvalueOfActiveCalender={setvalueOfActiveCalender}
              />

            </AppraiserDashboardContext>
          }
        </div>}


    </div>
  </>
}