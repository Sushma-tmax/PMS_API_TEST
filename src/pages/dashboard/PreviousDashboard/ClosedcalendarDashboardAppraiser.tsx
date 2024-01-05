import React from 'react'
import { useState, useEffect, useMemo } from 'react';

import { Box, Breadcrumbs, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useGetPreviousAppraisalEmployeeByFilterQuery } from '../../../service/employee/previousAppraisal';
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
import Closedcalendarteamtable from '../../../components/homepage/PreviousDashboardComponents/MyTeamTable/Closedcalendarteamtable';
import ClosedCalendarfilter from '../../../components/homepage/PreviousDashboardComponents/closedcalendarfilter';
import { useGetClosedCalenderQuery, useGetPACalendarQuery } from '../../../service/calender/Calender';
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
const ClosedcalendarDashboardAppraiser = (props: any) => {
  const location: any = useLocation();

  const [Expandableviews, setExpandableviews] = React.useState({});
  // React.useEffect(() => {
  //   // if (!location.state) {
  //   //   setExpandableviews({});
  //   // }
  //   if (!location.state) {
  //     location.state = {};
  //   }
  //   setExpandableviews(location.state.from || {});
  // }, []);
  //   //  else {
  //     setExpandableviews({});
  //   // }
  // },[]);
  
  console.log(Expandableviews,"Expandableviews")
    const { data: user } = useLoggedInUser();
    const navigate = useNavigate();
    const classes = useStyles();

// appcalid is used for calendar changes
    const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
    console.log(appCalId,"appCalId")
    // calendar fiter value sets
    const [valueOfActiveCalender, setvalueOfActiveCalender] = React.useState<any>("");
    // calendar id setting
    const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
// role
  // NaviGationFrom it is used for Employee master button showing Only on Paadmin
let NaviGationFrom =location?.state?.from
    let navigationFrom = "Appraiser";
    let navigationRole = "PreviousDashboard";

    let  Role ="Appraiser"

//    Query for getting closed calendars
    const {data :closedCalendar, isLoading: isTitleLoading} = useGetClosedCalenderQuery('')

    const SELECT_FOR_DASHBOARD = `employee_code,
legal_full_name,
employee_rating,
position_long_description,
employee.employee_status,
grade, service_reference_date,isSupervisor,email,function,
appraiser_code,first_name,
section,
talent_category,
previous_rating,
sub_section,
appraisal.status,
appraisal.potential,
appraiser_name,
normalizer_name,
reviewer_name,
manager_code,
manager_name,
manager_position,
work_location,
sub%20section,
division,
service_reference_date,
function,
email,
appraiser_code,
reviewer_PA_rejected,
reviewer_PA_accepted,
appraiser_PA_accepted,
reviewer_code,
normalizer_code,
employee.employee_rating,
appraiser_rating,
reviewer_rating,
normalizer_rating,
overall_rating,
employee_rating,
employee_status,
normalized_overallRating,
isGradeException,
appraisal.pa_status,
previous_rating,
employee.employee_rejection,
employee.employee_agree,
pa_status`
// Query for getting previous appraisal Employee 
const { data: data2 ,isLoading : isemployeeLoading} = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=${SELECT_FOR_DASHBOARD}&appraiser_code=${user?.employee_code}&calendar=${appCalId}&limit=800`)

// Query for getting Ninebox
const { data: RangeValue } = useGetNineboxQuery("");


// setting calendar _id 
 React.useEffect(()=>{
    if(activeCalenderName?._id != undefined){
      setappCalId(activeCalenderName?._id)
    }
  },[activeCalenderName])
// setting calendar filter value to the calendar _id
React.useEffect(() => {
    const ccc = closedCalendar?.data?.find((item2: any) => item2?.name === valueOfActiveCalender)
    console.log(ccc,"ccc")
    if(ccc != undefined){
      setactiveCalenderName(ccc);
    }else{
      setactiveCalenderName(closedCalendar?.data[0])
    }
    // setactiveCalenderName(ccc);

    console.log(closedCalendar?.data[0],"NewCalendarff")
  }, [ valueOfActiveCalender,closedCalendar])

  
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
//   query for 9box applied employee

  const { data: low_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating, service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code,
    current_rating.overall_rating,normalized_overallRating,employee.employee_status,employee_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeLowTo}&limit=800`
  );
  const { data: moderate_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating, employee.employee_status,service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeLowTo}&limit=800`
  );
  const { data: high_3 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating,employee.employee_status, service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeLowFrom}&appraisal.potential=High&overall_rating[lte]=${RangeLowTo}&limit=800`
  );

  const { data: low_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating, employee.employee_status,service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeMediumTo}&limit=800`
  );
  const { data: moderate_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating, employee.employee_status,service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeMediumTo}&limit=800`
  );
  console.log(data2, "dataaaaa")
  const { data: high_4 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating,employee.employee_status, service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating,reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&overall_rating[lte]=${RangeMediumTo}&limit=800`
  );

  const { data: low_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating,employee.employee_status, service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&overall_rating[lte]=${RangeHighTo}&limit=800`
  );
  const { data: moderate_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating,employee.employee_status, service_reference_date,first_name,isSupervisor,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&overall_rating[lte]=${RangeHighTo}&limit=800`
  );
  const { data: high_5 } = useGetPreviousAppraisalEmployeeByFilterQuery(
    `?select=overall_rating,normalized_overallRating,employee_rating, employee.employee_status,service_reference_date,isSupervisor,first_name,email,reviewer_code,normalizer_code, current_rating.overall_rating, reviewer_rating,normalizer_rating,appraiser_code,function,talent_category,previous_rating,sub_section,work_location,appraiser_name,reviewer_name,normalizer_name,manager_name,manager_position,appraiser_rating,appraisal.potential,manager_code,employee_code,legal_full_name,grade,section,sub_section,division,position_long_description,appraisal.status&appraiser_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&overall_rating[gte]=${RangeHighFrom}&appraisal.potential=High&overall_rating[lte]=${RangeHighTo}&limit=800`
  );
console.log(data2,low_3,moderate_3,high_3,low_4,moderate_4,high_4,low_5,moderate_5,high_5,"useGetPreviousAppraisalEmployeeByFilterQuery")
   //mulitiselect for sectionfilter
   const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
     //mulitiselect for subsectionfilter
   const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
   const [talentCategoreyFilter, settalentCategoreyFilter] = React.useState<string[]>([]);

   const [employeeData1, setemployeeData1] = React.useState<any>([]);
  const [Data2Value, setData2Value] = React.useState<any>([]);

//   
  const [Temp1, setTemp1] = React.useState<any>([]);
  useEffect(()=>{
    setTemp1(()=>
    data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
    ?.filter((item1: any) => {
      if (SectionFilter.length === 0) {
        return item1
      } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
    }).filter((item1: any) => {
      if (subSectionFilter.length === 0) {
        return item1
      } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
    })
    )
  },[data2,SectionFilter,subSectionFilter])


  const [low3Value, setLow3Value] = React.useState<any>([]);
  const [low4Value, setLow4Value] = React.useState<any>([]);
  const [low5Value, setLow5Value] = React.useState<any>([]);
  const [moderate3Value, setmoderate3Value] = React.useState<any>([]);
  const [moderate4Value, setmoderate4Value] = React.useState<any>([]);
  const [moderate5Value, setmoderate5Value] = React.useState<any>([]);
  const [high3Value, sethigh3Value] = React.useState<any>([]);
  const [high4Value, sethigh4Value] = React.useState<any>([]);
  const [high5Value, sethigh5Value] = React.useState<any>([]);
  const [calendarValDialog, setcalendarValDialog] = useState(false);

  useEffect(() => {
    //@ts-ignore

    if (
      //@ts-ignore
      (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
      //@ts-ignore
      (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0)
    ) {
      setemployeeData1(data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
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
      const Temp = data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
      ?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
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
      });

      const TempLow3 = low_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      const TempLow4 = low_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      const TempLow5 = low_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });

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
      });

      const TempModerate4 = moderate_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      const TempModerate5 = moderate_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });

      const TempHigh3 = high_3?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      const TempHigh4 = high_4?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      const TempHigh5 = high_5?.data?.filter((item1: any) => {
        if (SectionFilter.length === 0) {
          return item1
        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
      }).filter((item1: any) => {
        if (subSectionFilter.length === 0) {
          return item1
        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
      });
      setemployeeData1(Temp)
      setData2Value(Temp2)
      //setData1Value(Temp1)
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
    SectionFilter, subSectionFilter, data2, low_3, low_4, low_5,
    moderate_3, moderate_4, moderate_5, high_3, high_4, high_5
  ])
console.log(high4Value,high_4,"high4Value")
//   9box intial data
const [initial, setInitial] = React.useState<any>([""]);

React.useEffect(() => {
    if (high_3 != undefined && high_4 != undefined && high_5 != undefined && low_3 != undefined && low_4 != undefined && low_5 != undefined && moderate_3 != undefined && moderate_4 != undefined && moderate_5 != undefined) {
      let DataforInitials: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
      // setindexBasedValue(DataforInitial)
      // console.log(DataforInitial,"DataforInitial")
      // console.log(low_3,low_4,low_5,"1stboxd")
      setInitial(DataforInitials)
    }
  }, [high_3, high_4, high_5, moderate_3, moderate_4, moderate_5, low_3, low_4, low_5])


//   9boxvalues
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

   //function for nine box
   const [range1, setrange1] = React.useState<any>(0);
   const [range2, setrange2] = React.useState<any>(0);
   const [range3, setrange3] = React.useState<any>(0);
   const [range4, setrange4] = React.useState<any>(0);
   const [range5, setrange5] = React.useState<any>(0);

   const [statusSort, setstatusSort] = useState<any>("");

    //functions for emp rej pie chart

  //console.log()

  const checkAppraisalStatusInProgress = (status: string) => {
    return Data2Value?.filter((item: any) => {
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal?.status == status ;
      return item?.employee?.employee_agree == "true" && item?.appraisal?.status === status;
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
      // console.log(item,"item")
      // console.log(item?.normalizer?.normalizer_status == "employee-rejected" && item?.appraisal?.status === status  ?.length,"inmediation")
      return item?.employee?.employee_agree == "false" && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;

    })?.length;
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
  //  expandableviews inprogress employee rejection chart
 const checkAppraisalStatusI = (status: string) => {
    return Data2Value?.filter((item: any) => {
      // return item?.employee?.employee_status == "employee-rejected" && item?.appraisal?.status == status ;
      return item?.employee?.employee_agree == "true" && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;
    });
  };
// expandableviews inmediation employee rejection chart
  const checkAppraisalStatusIM = (status: string) => {
    return Data2Value?.filter((item: any) => {
      // console.log(item,"item")
      // console.log(item?.normalizer?.normalizer_status == "employee-rejected" && item?.appraisal?.status === status  ?.length,"inmediation")
      return item?.employee?.employee_agree == "false" && item?.employee?.employee_rejection === "true" && item?.appraisal?.status === status;

    });
  };


  // console.log(Data2Value,"Data2Value")
  // console.log(checkAppraisalStatusCompleted("completed"),checkAppraisalinmediationStatus("rejected") ,checkAppraisalStatusInProgress("rejected"),"newcheckAppraisalStatus")
  //functions for emp rej pie chart
  //function for doughnut chart
  const checklengthinRange = (min: number, max: number) => {
    return (
      (Temp1?.filter((item: any) => {
        // console.log(item?.appraisal?.appraiser_rating, "appraisal_rating3");
        return (
          item?.overall_rating >= min &&
          item?.overall_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))?.length
      // *
      //   100) /
      // data1?.data?.length
    );
  };
 
  // function for expandablle views in rating distribution

  const checklengthinRanges = (min: number, max: number) => {
    return (
      (Temp1?.filter((item: any) => {
        // console.log(item?.appraisal?.appraiser_rating, "appraisal_rating3");
        return (
          item?.overall_rating >= min &&
          item?.overall_rating <= max
          && item?.appraisal?.status == "completed"
        );
      }))
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
  }, [data2, Temp1])

  
  //function for doughnut chart
  //function for status cards
  const checkAppraisalStatusforCards = (status: string) => {
    console.log(data2?.data?.filter((j: any) => j?.appraisal?.status != "excepted")
    ?.filter((item: any) => {
      // console.log(item, status, 'hari')
      // console.log(RangeValue, "RangeValuess")
      return item?.appraisal?.status === status;
    })?.length, "countfuncton")
    if (data2)
      return employeeData1?.filter((item: any) => {
        return item?.appraisal?.status === status;
      })?.length;
    else return 0;
  };
  console.log(data2?.length == checkAppraisalStatusforCards("not-started")?.length, "kkkkkk")

  const calculatePercentageforCards = (num: number) => {
    if (employeeData1 != undefined && data2 != undefined) {
      if (data2 && data2?.data && employeeData1?.length != 0)
        return (num * 100) / employeeData1?.length;
      else return 0
    }
    else {
      return 0
    }
  };
  console.log(calculatePercentageforCards(
    checkAppraisalStatusforCards("not-started")
  ).toFixed(2), "checkAppraisalStatusforCards")
//   useEffect(() => {
//     if (TotalEmp == NotStartedEmp) {
//       setOveralldashboard(false);
//     } else {
//       setOveralldashboard(true)
//     }
//   }, [calculatePercentageforCards])

  let CompletedEmp = checkAppraisalStatusforCards("completed");
  let TotalEmp = checkAppraisalStatusforCards("not-started") + checkAppraisalStatusforCards("in-progress") +
    checkAppraisalStatusforCards("normalized") + checkAppraisalStatusforCards("rejected") + checkAppraisalStatusforCards("completed")

  let NotStartedEmp = checkAppraisalStatusforCards("not-started")
  console.log(TotalEmp, CompletedEmp, NotStartedEmp, "TotalEmp");
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
  //function for status cards
  console.log(StatusValues.map((item => item.percentage)), "StatusValues")

//   Topperformerrs
  const TopPerformersOfAppraiser = employeeData1?.slice()?.filter((f: any) => f?.overall_rating >= 4 && f?.appraisal?.status == "completed")
  ?.sort((a: any, b: any) => b?.overall_rating - a?.overall_rating)?.slice(0, 5)
//console.log(employeeData, "topPerformerEmployees")
//For changing my action's tab
// const handleOnClickCard = (e: any, title: any) => {
//   //console.log(title,"clicked the card")
//   setvalueOfCard(title)
//   setValue(1);
// }
console.log(employeeData1,"employeeData1")
if ( isemployeeLoading) {
  return <div><Loader />  </div>
}
return (
    <>
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
          <Link
          style={{
            fontSize: "18px",
            color: "#3e8cb5",
            fontFamily: "Arial",
          }}
          color="inherit"
          to={`/dashboardreview`}
        >
          My Team Dashboard
        </Link>
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
      </Box>
              </>
            ) :
        <div

            style={{
                background: "#F1F1F1",
                minHeight: "100px",
          overflow: "hidden",
           height: "auto",
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
       <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
        <Link
          style={{
            fontSize: "18px",
            color: "#3e8cb5",
            fontFamily: "Arial",
          }}
          color="inherit"
          to={`/dashboardreview`}
        >
          My Team Dashboard
        </Link>
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
                    Expandableviews={Expandableviews}
                    appCalId={appCalId}
                        SectionFilter={SectionFilter}
                        setSectionFilter={setSectionFilter}
                        subSectionFilter={subSectionFilter}
                        setSubSectionFilter={setSubSectionFilter}
                        navigationFrom={navigationFrom}
                        talentCategoreyFilter={talentCategoreyFilter}
                        settalentCategoreyFilter={settalentCategoreyFilter}
                        // valueofTab={valueofTab}
                        setvalueOfActiveCalender={setvalueOfActiveCalender}
                        valueOfActiveCalender={valueOfActiveCalender}
                        employeeData1={data2}
                        calendarValDialog={calendarValDialog}
                        setcalendarValDialog={setcalendarValDialog}
                    />
                     {/* {activeCalenderName != undefined &&
                    <Timelinerevview  activeCalenderName={activeCalenderName}/>
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
                appCalId={appCalId}  
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
                    //    setValue={setValue}
                    //    handleOnClickCard={handleOnClickCard}
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
                    {/* <NineboxandTopPerformanceofOverallDashboard
                        NineBoxValues={NineBoxValues}
                        NineBoxData={NineBoxValues}
                        topPerformerEmployees={TopPerformersOfAppraiserMyteam}
                        ExcelData9Box={ExcelData9Box}
                        navigationFrom={navigationFrom}
                        setTopperformersExpandActive={setTopperformersExpandActive}
                        setNineboxExpand={setNineboxExpand}
                        indexBasedValue={indexBasedValue}
                        setindexBasedValue={setindexBasedValue}
                        indexBasedTitle={indexBasedTitle}
                        setindexBasedTitle={setindexBasedTitle}
                    /> */}
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
          topPerformerEmployees={TopPerformersOfAppraiser}
          // ExcelData9Box={ExcelData9Box}
          navigationFrom={navigationFrom}
          DataforInitial={initial}
          appCalId={appCalId}
        />

                </div>
                <div  style={{ marginTop: "25px",marginBottom:"25px" }}>
                    <Closedcalendarteamtable 
                    NaviGationFrom={NaviGationFrom}
                    valueOfActiveCalender={valueOfActiveCalender}
                     statusSort={statusSort}
                     navigationFrom={navigationFrom}
                     SectionFilter={SectionFilter}
                     setSectionFilter={setSectionFilter}
                     subSectionFilter={subSectionFilter}
                     setSubSectionFilter={setSubSectionFilter}
                     employeeData1={employeeData1}
                    //  valueOfCard={valueOfCard}
                    />
                </div>
                {/* </div>} */}
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

        </div>
        }
    </>
)
}

export default ClosedcalendarDashboardAppraiser