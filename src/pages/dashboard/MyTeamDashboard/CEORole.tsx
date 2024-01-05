import React from 'react'
import { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useAppraisalCalenderFiltersQuery, useGetCalenderQuery, useGetEmployeeByFilterQuery } from "../../../service";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import { Link, useLocation, useParams } from "react-router-dom";
import OverallDashboardForPAadmin from '../OverAllDashboard/OverallDashboardforPAadmin';
import { useGetActiveCalenderQuery, useGetPACalendarQuery } from '../../../service/calender/Calender';
import NoliveCalendar from '../NoliveCalendar';
import Loader from '../../../components/Loader/Loader';
import {style } from '@mui/system';

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

export default function CEORole() {
  const calendarId = `636cb1a7960b1548b80ff775`
const { data: user } = useLoggedInUser();
let navigationFrom = "CEORole";
const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
//For gtting active cal 
const { data } = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')
const { data: calendarData } = useGetCalenderQuery('')
const {data : PAdata} = useGetPACalendarQuery('')
const [valueOfActiveCalender, setvalueOfActiveCalender] = React.useState<any>("");
const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
console.log(activeCalenderName, "valueOfActiveCalender")
const {data:activecalendardata} =useGetActiveCalenderQuery('')
const [CalenderName, setCalenderName] = React.useState<any>("");


//For filtered calendar data
React.useEffect(()=>{
if(activeCalenderName?._id != undefined){
  setappCalId(activeCalenderName?._id)
}
},[activeCalenderName])

console.log(appCalId,"appCalId")
  // calendar filter setting  latest calendar as a initial calendar

React.useEffect(() => {
const calendarName = activecalendardata?.data[0]?.name;
const paLaunchSubstring = activecalendardata?.data[0]?.pa_launch?.substring(0, 4);
  setCalenderName( activecalendardata?.data[0]?.name);
  setactiveCalenderName(activecalendardata?.data[0])
}, [activecalendardata])
  // calendar filter setting  latest calendar as a initial calendar

//For gtting active cal
const { data: data2 ,isLoading : isemployeeLoading} = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree,division,sub_section,section,employee.employee_status,isGradeException,employee.employee_rejection&employee_upload_flag=true&calendar=${appCalId}&limit=800`)
const { data: data1, isLoading } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&employee_upload_flag=true&calendar=${appCalId}&limit=600&select=appraisal.appraiser_rating`);
const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,employee.employee_rating,previous_rating,position_long_description,appraiser_code,reviewer_code,normalizer_code,pa_status,grade,division,sub_section,section,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
appraisal.objective_description,isSupervisor,overall_rating,normalizer.normalized_overallRating,service_reference_date,first_name,email,function,reviewerIsDisabled,normalizerIsChecked,isGradeException,normalizerIsDisabled,pa_status`
const { data: employeeData ,isLoading :isemployeesLoading} = useGetEmployeeByFilterQuery(
  `?limit=800&employee_upload_flag=true&select=${SELECT_FOR_DASHBOARD}`
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
reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&employee_upload_flag=true&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeLowTo}`)
const { data: moderate_3 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&employee_upload_flag=true&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeLowTo}`)
const { data: high_3 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&employee_upload_flag=true&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeLowTo}`)
const { data: low_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&employee_upload_flag=true&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)
const { data: moderate_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer.reviewer_rating,employee.employee_rating,reviewer_name,first_name,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&employee_upload_flag=true&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)
const { data: high_4 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer_name,first_name,employee.employee_rating,service_reference_date,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&employee_upload_flag=true&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeMediumTo}`)
const { data: low_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,reviewer_name,employee.employee_status,appraisal.appraiser_PA_accepted,
first_name,service_reference_date,employee.employee_rating,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&employee_upload_flag=true&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeHighTo}`)
const { data: moderate_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,reviewer_name,employee.employee_status,appraisal.appraiser_PA_accepted,
first_name,service_reference_date,employee.employee_rating,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&employee_upload_flag=true&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeHighTo}`)
const { data: high_5 } = useGetEmployeeByFilterQuery(`?select=appraiser_name,overall_rating,work_location,reviewer.reviewer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,
reviewer_name,first_name,service_reference_date,employee.employee_rating,isSupervisor,email,function,normalizer_name,appraisal.appraiser_rating,appraiser_code,reviewer_code,normalizer_code,pa_status,appraisal.potential,normalizer.normalizer_rating,manager_code,manager_name,manager_position,employee_code,legal_full_name,grade,previous_rating,section,sub_section,division,position_long_description,appraisal.status,talent_category&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&employee_upload_flag=true&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeHighTo}`)
const [TabsActive, setTabsActive] = React.useState<any>(false);
const [valueOfCard, setvalueOfCard] = React.useState<any>("");
//mulitiselect
const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
const [divisionFilter, setDivisionFilter] = React.useState<string[]>([]);
const [employeeData1, setemployeeData1] = React.useState<any>([]);
const [Data2Value, setData2Value] = React.useState<any>([]);
const [Data1Value, setData1Value] = React.useState<any>([]);

// 9box Expand
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
    (divisionFilter === "" || divisionFilter.includes("None") || divisionFilter.length === 0)
  ) {
    setemployeeData1(employeeData?.data)
    setData2Value(data2?.data)
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
    const Temp = employeeData?.data?.filter((item1: any) => {
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
    const Temp2 = data2?.data?.filter((item1: any) => {
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
    setLow3Value(TempLow3)
    setLow4Value(TempLow4)
    setLow5Value(TempLow5)
    setmoderate3Value(TempModerate3)
    setmoderate4Value(TempModerate4)
    setmoderate5Value(TempModerate5)
    sethigh3Value(TempHigh3)
    sethigh4Value(TempHigh4)
    sethigh5Value(TempHigh5)
  }

}, [
  SectionFilter, divisionFilter, subSectionFilter, employeeData, data2, low_3, low_4, low_5,
  moderate_3, moderate_4, moderate_5, high_3, high_4, high_5
])



//function for nine box
const [range1, setrange1] = React.useState<any>(0);
const [range2, setrange2] = React.useState<any>(0);
const [range3, setrange3] = React.useState<any>(0);
const [range4, setrange4] = React.useState<any>(0);
const [range5, setrange5] = React.useState<any>(0);
const [overallDashboard, setOveralldashboard] = React.useState(false);
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
  if (tabLocation !== undefined) {
    setValue(1);
  }
}, [tabLocation]);


//function for doughnut chart
const Temp = employeeData?.data?.filter((item1: any) => {
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
useEffect(() => {
  setrange1(Math.round(checklengthinRange(1, 2.49)))
  setrange2(Math.round(checklengthinRange(2.5, 2.99)))
  setrange3(Math.round(checklengthinRange(3, 3.99)))
  setrange4(Math.round(checklengthinRange(4, 5)))
}, [employeeData, Temp])
//function for doughnut chart

//function for status cards
const checkAppraisalStatusforCards = (status: string) => {
  if (employeeData)
    return employeeData1?.filter((item: any) => {
      return item?.appraisal?.status === status;
    })?.length;
  else return 0;
};

const calculatePercentageforCards = (num: number) => {
  if (employeeData && employeeData?.data && employeeData1?.length != 0)
    return (num * 100) / employeeData1?.length;
  else {
    return 0
  }
};
const [RatingsExpandActive, setRatingsExpandActive] = React.useState<any>(false);
const [TopperformersExpandActive, setTopperformersExpandActive] = React.useState<any>(false);
const [TeamtableExpandActive, setTeamtableExpandActive] = React.useState<any>(false);
const [NineboxExpand, setNineboxExpand] = React.useState<any>(false);
const [solidperformersExpandActive, setSolidperformersExpandActive] = React.useState<any>(false);

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
      checkAppraisalStatusforCards("in-progress")+checkAppraisalStatusforCards("normalized")
    ).toFixed(2),
    count: checkAppraisalStatusforCards("in-progress")+checkAppraisalStatusforCards("normalized"),
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


let CompletedEmp = checkAppraisalStatusforCards("completed");
let TotalEmp = checkAppraisalStatusforCards("not-started")+checkAppraisalStatusforCards("in-progress")+
checkAppraisalStatusforCards("normalized")+checkAppraisalStatusforCards("rejected")+checkAppraisalStatusforCards("completed")
let NotStartedEmp = checkAppraisalStatusforCards("not-started")
console.log(TotalEmp,CompletedEmp,"TotalEmp");
useEffect(()=>{
  if(TotalEmp == NotStartedEmp ){
     setOveralldashboard(false);
   }else{
     setOveralldashboard(true)
   }
  },[calculatePercentageforCards])


let navigateToClosedDashboard = "/ClosedcalendarDashboardNormalizer";

// skeleton
if (isemployeeLoading || isemployeesLoading) {
return <div><Loader />  </div>
}
//For changing my action's tab

  return <>
      <div
          style={{
              background: "#F1F1F1",
              height: "auto",
          }}
      >
        {activecalendardata && activecalendardata?.data[0] == "" || activecalendardata?.data[0] == undefined ?
      <NoliveCalendar navigateToClosedDashboard={navigateToClosedDashboard}
      navigationFrom ={navigationFrom} /> :


      <div>

      {(RatingsExpandActive === false && TopperformersExpandActive === false && 
                  TeamtableExpandActive === false && NineboxExpand === false && solidperformersExpandActive === false) &&
          <Box>
              <div
                  style={{
                      paddingLeft: "25px",
                      paddingBottom: "12px",
                      paddingTop: "20px",
                      paddingRight:"25px",
                      borderBottom: 1,
                      borderColor: "divider",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"space-between"
                  }}
              >
                  <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      sx={{ borderBottom: 1, borderColor: "divider", marginRight: "30px",
                      display: TabsActive === false ? "block" : "none" }}
                      
                  >
<Link 
              style={{
                  color: "rgba(0, 0, 0, 0.6)",
                  opacity:"10",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontFamily: "Arial",
                }}  to={`/ClosedcalendarDashboardNormalizer`}
                state={{
                  from: "CEORole"
                }}>
                      <Tab
                          sx={{
                              textTransform: "capitalize",
                              fontSize: "20px",
                              fontFamily: "Arial",
                              color: "rgba(0, 0, 0, 0.6)",
                  opacity:"10",
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
                        
                  </Tabs>
                 
              </div>
          </Box>
}
          {value === 1 &&
              <AppraiserDashboardContext>
                 
              <OverallDashboardForPAadmin
              CalenderName={CalenderName}
          valueofTab={value}
          setTabsActive={setTabsActive}
          activeCalenderName={activeCalenderName}
          setvalueOfActiveCalender={setvalueOfActiveCalender}
          valueOfActiveCalender={valueOfActiveCalender}
          appCalId={appCalId}
          RatingsExpandActive={RatingsExpandActive}
          setRatingsExpandActive={setRatingsExpandActive}
          TopperformersExpandActive={TopperformersExpandActive}
          setTopperformersExpandActive={setTopperformersExpandActive}
          TeamtableExpandActive={TeamtableExpandActive}
          setTeamtableExpandActive={setTeamtableExpandActive}
          NineboxExpand={NineboxExpand}
          setNineboxExpand={setNineboxExpand}
          solidperformersExpandActive={solidperformersExpandActive}
          setSolidperformersExpandActive={setSolidperformersExpandActive}
         />
              </AppraiserDashboardContext>
       }
         
          </div>} 
      </div>

  </>
}