import React, { useEffect } from "react";
import { useState, useRef ,useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Statusbar from "../../reviewer/Dashboard/performanceratingchart/statusbar";
import OverallStatus from "../../reviewer/Dashboard/performanceratingchart/overallstatus";
import { Button, Dialog, InputLabel, Stack, styled } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  useGetEmployeeQuery,
  useGetCalenderQuery,
  useGetEmployeeByFilterQuery,
} from "../../../service";
import {
  useGetAppraisalCalenderQuery
} from  "../../../service/appraisalCalender/AppraisalCalender";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import StatusBar from "../StatusBar";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';
import { ListItemIcon } from '@mui/material';
import { set } from "lodash";
import dayjs from "dayjs";
import { useGetPACalendarQuery,useGetActiveCalenderQuery, useGetClosedCalenderQuery } from "../../../service/calender/Calender";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles((theme:any) => ({
  formControl: {
    // margin: theme?.spacing(1),
    width: 140,
  
      fontSize: "14px",
      color: "#333333",
      fontFamily: "Arial",
   
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
    fontSize: "13px !important" ,
    fontFamily: "Arial",
    color:"#333333",

    // ['@media (max-width:768px)']: {
    //   color:"red !important",
    // }
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    fontSize: "12px !important",
      color: "#333333",
      fontFamily: "Arial",
  },

  dropmenu: {
   
    ['@media (max-width:768px)']: {
         flexWrap:"wrap",
     }
  },
  dropmenunew: {
   
    ['@media (max-width:768px)']: {
         flexWrap:"wrap",
         direction:"column",
         gap:"23px",
         padding:"20px"
     }
  },
  
}));
const Timeline = styled("div")({
  fontSize: "20px",
  color: "#333333",
  paddingLeft: "20px",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});

function ClosedCalendarfilter(props: any){
const classes = useStyles();
  const { data: user } = useLoggedInUser();
const navigate =useNavigate();
  const {
    SectionFilter,
    setSectionFilter,
    subSectionFilter,
    setSubSectionFilter,
    navigationFrom,
    divisionFilter,
    setDivisionFilter,
    talentCategoreyFilter,
    settalentCategoreyFilter,
    valueofTab,
    employeeData1,
    setvalueOfActiveCalender,
    valueOfActiveCalender,
    Role,
    appCalId,
    setcalendarValDialog,
    calendarValDialog
  } = props;


  
  // const SELECT_FOR_DASHBOARD = `section,division,sub_section `;
  // const { data: employeeData } = useGetEmployeeByFilterQuery(
  //   `?limit=800&select=${SELECT_FOR_DASHBOARD}`
  // );
  // console.log(user,"newcalendar")
  // const { data: calenderData } = useGetCalenderQuery("");
  const {data :closedCalendar, isLoading: isTitleLoading} = useGetClosedCalenderQuery('')

  // const {data:activecalendardata} =useGetActiveCalenderQuery('')


  // const { data: appraisalCalendarData, isLoading: isDataLoading } =
  // useGetAppraisalCalenderQuery("");
  // console.log(employeeData1,employeeData, "employeeDataForfilter");
  
console.log(closedCalendar?.data?.map((j:any)=>{
  return j?.pa_launch?.substring(0, 4)
}),"initialYear")


var Calender = closedCalendar?.data?.map((j:any)=>{
  return { PAlaunch :j?.pa_launch?.substring(0, 4),
    // calendartype :j?.calendar_type
  } 
}) .filter((value:any, index:any, self:any) => {
    return self.indexOf(value) === index;
  });

const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
// const [calendar, setCalendar] = useState([Calender])
// console.log(calendar,Calender,"setcalendar")


//  setting the year based on palaunch date
const initialYear =closedCalendar?.data?.map((j:any)=>{
  return j?.pa_launch?.substring(0, 4)
})?.filter((item: any, index: any, array: any) =>
array?.map((data: any) => { return data?.pa_launch }).indexOf(item?.pa_launch) === index)

// initial year setting based on selected year
const filteredCalendar = closedCalendar?.data?.filter((item:any) => {
  console.log(item
  //   .map((j:any)=>{
  //   return j?.pa_launch
  // })
  ,"itemmmmmm")
  const year = item.pa_launch?.substring(0, 4);
  if (selectedYear == null  || selectedYear == undefined ){
    setSelectedYear(initialYear[0])
  }
  console.log(year,"electyear")
  return year === selectedYear;
  
});

console.log(filteredCalendar,selectedYear,"selectedYear")

const handleYearChange = (event:any) => {
  setSelectedYear(event.target.value);
};

// const handleCalendarChange = (event:any) => {
//   setSelectedCalendar(event.target.value);
// };



  let opt = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.section?.localeCompare(b?.section);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.section;
          })
          .indexOf(item?.section) === index
    )
    .map((i: any) => {
      return i?.section;
    });
    if(divisionFilter?.length > 0){
      opt = employeeData1?.data
     ?.slice()
     ?.sort(function (a: any, b: any) {
       return a?.section?.localeCompare(b?.section);
     })
     ?.filter((i:any) => {
       //@ts-ignore
       return !!divisionFilter?.find(item2 => i?.division === item2)
      })
     ?.filter(
       (item: any, index: any, array: any) =>
         array
           ?.map((data: any) => {
             return data?.section;
           })
           .indexOf(item?.section) === index
     )
     .map((i: any) => {
       return i?.section;
     });
   }
  let optSebSection = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.sub_section?.localeCompare(b?.sub_section);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.sub_section;
          })
          .indexOf(item?.sub_section) === index
    )
    .map((i: any) => {
      return i?.sub_section;
    });
  console.log(SectionFilter, "Arraydata");
  if(SectionFilter.length > 0){
    optSebSection = employeeData1?.data
   ?.slice()
   ?.sort(function (a: any, b: any) {
     return a?.sub_section?.localeCompare(b?.sub_section);
   })
   ?.filter((i:any) => {
    //@ts-ignore
    return !!SectionFilter?.find(item2 => i?.section === item2)
   })
   ?.filter(
     (item: any, index: any, array: any) =>
       array
         ?.map((data: any) => {
           return data?.sub_section;
         })
         ?.indexOf(item?.sub_section) === index
   )
   ?.map((i: any) => {
     return i?.sub_section;
   });
 }

  if(employeeData1?.data === undefined){
    opt = employeeData1
   ?.slice()
   ?.sort(function (a: any, b: any) {
     return a?.section?.localeCompare(b?.section);
   })
   ?.filter(
     (item: any, index: any, array: any) =>
       array
         ?.map((data: any) => {
           return data?.section;
         })
         .indexOf(item?.section) === index
   )
   .map((i: any) => {
     return i?.section;
   });
  optSebSection = employeeData1
   ?.slice()
   ?.sort(function (a: any, b: any) {
     return a?.sub_section?.localeCompare(b?.sub_section);
   })
   ?.filter(
     (item: any, index: any, array: any) =>
       array
         ?.map((data: any) => {
           return data?.sub_section;
         })
         .indexOf(item?.sub_section) === index
   )
   .map((i: any) => {
     return i?.sub_section;
   });
   if(SectionFilter.length > 0){
    optSebSection = employeeData1?.data
   ?.slice()
   ?.sort(function (a: any, b: any) {
     return a?.sub_section?.localeCompare(b?.sub_section);
   })
   ?.filter((i:any) => {
    //@ts-ignore
    return !!SectionFilter?.find(item2 => i?.section === item2)
   })
   ?.filter(
     (item: any, index: any, array: any) =>
       array
         ?.map((data: any) => {
           return data?.sub_section;
         })
         ?.indexOf(item?.sub_section) === index
   )
   ?.map((i: any) => {
     return i?.sub_section;
   });
 }
 }

  const optdivision = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.division?.localeCompare(b?.division);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.division;
          })
          .indexOf(item?.division) === index
    )
    .map((i: any) => {
      return i?.division;
    });
    const categorynames = [
      "Level 1",
      "Level 2",
    ];

    // old filter
    // const optSebSection = employeeData?.data
    // ?.slice()
    // ?.sort(function (a: any, b: any) {
    //   return a?.sub_section?.localeCompare(b?.sub_section);
    // })
    // ?.filter(
    //   (item: any, index: any, array: any) =>
    //     array
    //       ?.map((data: any) => {
    //         return data?.sub_section;
    //       })
    //       .indexOf(item?.sub_section) === index
    // )
    // .map((i: any) => {
    //   return i?.sub_section;
    // });
  //functions for mapping
  const isAllSelecteddivision =
    optdivision?.length > 0 && divisionFilter?.length === optdivision?.length;
    console.log(isAllSelecteddivision,"isAllSelecteddivision")
    const isAllSelectedTalentCat =
    categorynames?.length > 0 && talentCategoreyFilter?.length === categorynames?.length;
   
  const [selected, setSelected] = useState<any>([]);
  console.log(selected, "Arraydata");
  const isAllSelected = opt?.length > 0 && selected.length === opt?.length;

  const handleChange1 = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected?.length === opt?.length ? [] : opt);
      return;
    }
    setSelected(value);
  };

  const [hide1, setHide1] = useState(true);
  const [calendarValDialoghide, setcalendarValDialoghide] = useState(false);


  const handleClickCloseCalendar = () =>{
    setcalendarValDialog(false);
    navigate(-1)
    // setcalendarValDialoghide(false);

  }
  // console.log(hide1,"hide1")
  // console.log(SectionFilter?.length,"hide11")
  // console.log(optSebSection?.length,"hide111")

  // if(SectionFilter?.length > 0){
  //   if(optSebSection?.length == SectionFilter?.length ){
  //     setHide1(false)
  //   }else{
  //     setHide1(true)
  //   }
  // }
  //multiselect
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [year, setYear] = useState<any>([]);
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [active, setActive] =  useState<string>("");
  // const [year, setYear] = useState("");
  const [page, setPage] = React.useState(0);

  const [disableButton, setdisableButton] = React.useState(false);
  const [disablesectionButton, setdisablesectionButton] = React.useState(false);
  const [disabledivisionButton, setdisabledivisionButton] = React.useState(false);

  const [hide, setHide] = React.useState(false);

  // clearing the localstorage
  useEffect(()=>{
    window.onbeforeunload = () => {
      localStorage.clear();
    }
     },[])

    //  onchange for calendar
  const handleChangeforCal = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setvalueOfActiveCalender(newValue);
    // setActive(newValue);

    // Store the value in localStorage
    localStorage.setItem("active", newValue);
    console.log(newValue,"newValue")
  };

  console.log(valueOfActiveCalender,"neeeevalueOfActiveCalender")
  let Localstorage = localStorage.getItem("active") ?? "";
  console.log(Localstorage,"Localstorage")



  const isAllSelectedSection =
    opt?.length > 0 && SectionFilter?.length === opt?.length;
    // console.log(SectionFilter?.length,opt?.length ,"isAllSelectedSection")
    const newsection = opt?.length == SectionFilter?.length
  const handleChangeSelectSection = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((SectionFilter?.length === opt?.length ? [] : "select all"),"newwwwww")
      // if(SectionFilter?.length == opt?.length){
      //   setSectionFilter("select")
      //   return;
      // }else{
      setSectionFilter(SectionFilter?.length === opt?.length ? [] : opt);
      
      return;
      // }
    }
   
    setSectionFilter(value);
    setPage(0);
  };
  const isAllSelectedSubSection =
    opt?.length > 0 && subSectionFilter?.length === optSebSection?.length;
  const handleChangeSelectSubSection1 = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSubSectionFilter(
        subSectionFilter?.length === optSebSection?.length ? [] : optSebSection
      );
      return;
    }
    setSubSectionFilter(value);
    setPage(0);
  };
 
  useEffect(()=>{
    const Temp =optSebSection?.filter(function(j:any) {
      return j !== undefined;
  })?.filter(function(j:any) {
    return j !== "";
});
  console.log(optSebSection,opt,"optSebSection")

      if(Temp?.length == null || Temp?.length == "" || Temp?.length == undefined){
        setdisableButton(true)
      }else{
        setdisableButton(false)
      }
      const Temp2 =opt?.filter(function(j:any) {
      return j !== undefined;
    });
    console.log(Temp2?.length,"optSection")
    if(Temp2?.length == null || Temp2?.length == "" || Temp2?.length == undefined){
      setdisablesectionButton(true)
    }else{
      setdisablesectionButton(false)
    }
    const Temp3 =optdivision?.filter(function(j:any) {
      return j !== undefined;
  });
  if(Temp3?.length == null || Temp3?.length == "" || Temp3?.length == undefined){
    setdisabledivisionButton(true)
  }else{
    setdisabledivisionButton(false)
  }
    // setdisablesectionButton
    //  if(Temp?.length > 10000){
    //   setHide(true)
    //  }else {
    //   setHide(false)
    //  }
    // setdisabledivisionButton
  },[optSebSection,opt])

  const handleChangedivision = (event: any) => {
    const value = event.target.value;
    if (value[value?.length - 1] === "all") {
      setDivisionFilter(
        divisionFilter?.length === optdivision?.length ? [] : optdivision
      );
      return;
    }
    setDivisionFilter(value);
  };

  const handleChangeTalentCategoreyFilter = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      settalentCategoreyFilter(
        talentCategoreyFilter?.length === categorynames?.length ? [] : categorynames
      );
      return;
    }
    settalentCategoreyFilter(value);
  };


  // const handleChangeSelectSection = (event: SelectChangeEvent<typeof SectionFilter>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   if (value.includes("None")) { setSectionFilter([]) } else {
  //     setSectionFilter(

  //       typeof value === 'string' ? value.split(',') : value,
  //     );
  //   }
  // };
console.log((new Date().getFullYear()),"hhhhhhhhh")
  const handleChangeSelectSubSection = (
    event: SelectChangeEvent<typeof subSectionFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value.includes("None")) {
      setSubSectionFilter([]);
    } else {
      setSubSectionFilter(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleChangeSelectdivision = (
    event: SelectChangeEvent<typeof divisionFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value?.includes("None")) {
      setDivisionFilter([]);
    } else {
      setDivisionFilter(typeof value === "string" ? value?.split(",") : value);
    }
  };
  
  const handleChangeSelecttalentCategory = (
    event: SelectChangeEvent<typeof talentCategoreyFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value.includes("None")) {
      settalentCategoreyFilter([]);
    } else {
      settalentCategoreyFilter(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //  maxWidth: 140,
      },
    },
  };
 
  useEffect(()=>{
    if(filteredCalendar == "" || filteredCalendar == undefined || filteredCalendar == 0  && isTitleLoading ){
      setcalendarValDialog(true)
      // setcalendarValDialoghide(true)
    }
    // // when comeback from expandable views
  else  if (Localstorage == null  && filteredCalendar != undefined || Localstorage == "" && filteredCalendar != undefined){
      // setvalueOfActiveCalender(Localstorage)
      setvalueOfActiveCalender(filteredCalendar[0]?.name)
    }
    // initially loads the page setting initial calendar
   else {
    setvalueOfActiveCalender(Localstorage)
    setcalendarValDialog(false);
    setcalendarValDialoghide(false)
    }
    console.log(active,valueOfActiveCalender,"nnnnnnnnnnnnnnn")
  },[valueOfActiveCalender,closedCalendar,active,filteredCalendar,isTitleLoading])
// console.log(appraisalCalendarData,"active")
  //multiselect

  // loading PAcalendar query
//   if (isLoading) {
//     return <div>Loading...</div>
// }
  return (
    <>
      <div style={{ marginTop: "0px", position: "relative" }}>
        <Box
       
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            // bgcolor: "#d16c08",
            // bgcolor:"aquamarine",
            // height: "calc(100vh - 320px)",
            // width: "96%",
            marginLeft: "25px",
            marginRight: "25px",
            paddingTop:"20px",
            paddingBottom:"20px"
          }}
        >
          {/* <Grid style={{ paddingLeft: "0px", paddingTop: "0px" }} item xs={4}>
              <Typography
                style={{
                  fontSize: "20px",
                  fontFamily: "Arial",
                  // padding: "20px",
                }}
              >
              Ratings Distribution
              </Typography>
             
            </Grid> */}

          {/* <Grid item xs={1.5}>
            <FormControl variant="standard" sx={{ minWidth: 100 }}>
              <Select sx={{ border: "none" }} defaultValue={10} label="Age">
                <MenuItem value={10}>All Division</MenuItem>
                <MenuItem value={20}>Corporate Support</MenuItem>
                <MenuItem value={30}>Financial And Logistics</MenuItem>
                <MenuItem value={40}>Operations UAE</MenuItem>
                <MenuItem value={50}>Engineering</MenuItem>
                <MenuItem value={60}>Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid> 

            <Grid item xs={1.5}>
            <FormControl variant="standard" sx={{ minWidth: 150 }}>
              <Select
                sx={{ border: "none", marginright: 5 }}
                defaultValue={10}
                label="Age"
              >
                <MenuItem value={10}>All Sections</MenuItem>
                <MenuItem value={20}>Administration</MenuItem>
                <MenuItem value={30}>Human Resources</MenuItem>
                <MenuItem value={40}>Information Technologies</MenuItem>
                <MenuItem value={50}>Continuous Improvement</MenuItem>
                <MenuItem value={60}>Business</MenuItem>
              </Select>
            </FormControl>
          </Grid>  */}
          <Stack
           className={classes.dropmenu}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Timeline>
              {/* Timeline */}
              {valueOfActiveCalender}
              </Timeline>
            <Stack
             className={classes.dropmenunew}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              paddingRight="20px"
            >
              {/* <div>
      <FormControl 
      size="small" 
      sx={{ width: 140 }} 
      className={classes.formControl}>
      <InputLabel 
      sx={{
        "& .MuiFormLabel-root": {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#333333",
          },
      }} 
      id="demo-multiple-checkbox-label"
      >
        Section
      </InputLabel>
      <Select
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "14px",
          textTransform: "none",
          fontFamily: "Arial",
          color: "#333333",
        },
        
      }}
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange1}
        input={<OutlinedInput label="Section" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        size="small"
      >
        <MenuItem
          style={{
            fontSize: "14px",
            color: "#333333",
            fontFamily: "Arial",
            padding: "0px",
            //paddingLeft: "37px"
          }}
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : ""
          }}
        >
          <ListItemIcon>
            <Checkbox
               size="small"
               style={{padding:"3px",paddingLeft:"14px"}}
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {opt?.map((option:any) => (
          <MenuItem 
          style={{
            fontSize: "14px",
            color: "#333333",
            fontFamily: "Arial",
            padding: "0px"
          }}
          key={option} 
          value={option}>
            <ListItemIcon>
              <Checkbox 
              size="small"
              style={{padding:"3px",paddingLeft:"14px"}}
              checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
              </div> */}
              
              {/* <div>
              <label htmlFor="year">Select a year:</label>
      <select name="year" id="year" value={selectedYear} onChange={handleYearChange}>
        <option value="">--Select a year--</option>
        {calendarOptions
          ?.reduce((unique:any, option:any) => {
            return option && !unique?.some((obj:any) => obj?.value === option?.value)
              ? [...unique, option]
              : unique;
          }, [])
          ?.map((option:any) => {
            console.log(option,"option")
            return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
            )
})}
      </select>
      <br />
      <label htmlFor="calendar">Select a calendar:</label>
      <select
        name="calendar"
        id="calendar"
        value={selectedCalendar}
        onChange={handleCalendarChange}
        disabled={!selectedYear}
      >
        <option value="">--Select a calendar--</option>
        {filteredCalendar.map((item, index) => (
          <option key={index} value={item.pa_launch}>
            {item.name}
          </option>
        ))}
      </select>
              </div> */}
               
              <div>
              
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Calendar
                  </InputLabel>
                 
                          
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="Calendar" />}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    value={valueOfActiveCalender}
                    onChange={handleChangeforCal}
                  >
                    
                    {/* <MenuItem 
                    sx={{display : "none",
                  }}
                     value={active}>
                      {active}
                    </MenuItem>   */}
                   
                     {
                    //  closedCalendar &&
                    //   closedCalendar?.data
                    filteredCalendar
                        ?.map((j: any) => {
                          console.log(j,"jjjj")

                          return (
                            <MenuItem 
                            sx={{
                              padding: "0px",
                              paddingLeft: "12px",
                              fontSize: "13px",
                              color: "#333333",
                              fontFamily: "Arial",
                              
                            }}
                             value={j?.name}
                          >
                            {j?.calendar_type}
                            </MenuItem>
                          
                         );
                       
                        })}  
                  </Select>
                
                 
                </FormControl>
                 
              </div>
              <div>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiFormLabel-root": {
                        fontSize: "14px",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Year
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    MenuProps={MenuProps}
                    defaultValue={20}
                    input={<OutlinedInput label="Year" />}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    value={selectedYear}
                     onChange={handleYearChange}
                  >

                    {Calender?.filter((item: any, index: any, array: any) =>
                     array?.map((data: any) => { return data?.PAlaunch }).indexOf(item?.PAlaunch) === index)
                        ?.map((j: any) => {
                          console.log(j,"yearrrrrrr")

                          return (
                            <MenuItem 
                            sx={{
                              padding: "0px",
                              paddingLeft: "12px",
                              fontSize: "13px",
                              color: "#333333",
                              fontFamily: "Arial",
                              
                            }}
                             value={j?.PAlaunch}
                          >
                            {j?.PAlaunch}
                            </MenuItem>
                          
                         );
                       
                        })}  
                     {/* <MenuItem 
                    sx={{display : "none",
                  }}
                     value={30}
                     >
                      {year}
                    </MenuItem> 
                     <MenuItem
                       sx={{
                        padding: "0px",
                        paddingLeft: "12px",
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        
                      }}
                      value={10}
                    >
                      2022
                    </MenuItem>
                    <MenuItem
                       sx={{
                        padding: "0px",
                        paddingLeft: "12px",
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        
                      }}
                      value={20}
                    >
                      2023
                    </MenuItem>
                   */}
                  </Select> 
                </FormControl>
              </div>
              {navigationFrom === "Normalizer" && (
                <div>
                  {/* <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Division
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Corporate Support
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Engineering
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  Operations OS
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  Operations Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Sales
                </MenuItem>
              </Select>
            </FormControl> */}
                  {/* <FormControl size="small" sx={{ width: 140 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Division</InputLabel>
                    <Select
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                          maxHeight: "0px",
                          minHeight: "28px",
                          padding: "6px 12px",
                        },
                        "& .MuiOutlinedInput-root": {
                          maxHeight: "0px",
                          minHeight: "28px",
                        },
                      }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={divisionFilter}
                      onChange={handleChangeSelectdivision}
                      input={<OutlinedInput label="Division" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                          paddingLeft: "37px"
                        }}
                        key="None"
                        value="None">
                       

                        Clear all
                      </MenuItem>
                      {employeeData?.data
                        ?.slice()
                        ?.sort(function (a: any, b: any) { return a?.division.localeCompare(b?.division); })
                        ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.division }).indexOf(item?.division) === index)
                        .map((name: any) => (
                          <MenuItem
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              padding: "0px"
                            }}
                            key={name?.division}
                            value={name?.division}>
                            <Checkbox  style={{padding:"3px",paddingLeft:"14px"}}
 size="small" checked={divisionFilter.indexOf(name?.division) > -1} />
                         
                            {name?.division}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl> */}
                  <FormControl size="small" sx={{ width: 140 }}>
                    <InputLabel
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px !important",
                          fontFamily: "Arial !important",
                          color: "#333333 !important",
                        },
                      }}
                      id="demo-multiple-checkbox-label"
                    >
                      Division
                    </InputLabel>
                    <Select
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                        },
                      }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      disabled={disabledivisionButton}
                      value={divisionFilter || []}
                      // value={divisionFilter}
                      onChange={handleChangedivision}
                      input={<OutlinedInput label="Division" />}
                      //renderValue={(selected) => selected?.join(", ")}
                      renderValue={(selected) => {
                        if (selected?.length === optdivision?.length) {
                          return "Select All";
                        }
                        return selected.join(", ");
                      }}
                      MenuProps={MenuProps}
                      size="small"
                    >
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                          //paddingLeft: "37px",
                        }}
                        key="all"
                        value="all"
                        classes={{
                          root: isAllSelecteddivision
                            ? classes?.selectedAll
                            : "",
                        }}
                      >
                        {/* <Checkbox size="small" checked={SectionFilter.indexOf("None") > -1} /> */}
                        {/* <ListItemText  primary="None" /> */}
                        <ListItemIcon>
                          <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}
                            size="small"
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            classes={{
                              indeterminate: classes?.indeterminateColor,
                            }}
                            checked={isAllSelecteddivision}
                            indeterminate={
                              divisionFilter?.length > 0 &&
                              divisionFilter?.length < optdivision?.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            paddingRight:"10px"
                          },
                        }}
                        classes={{ primary: classes?.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {optdivision
                      ?.filter((i:any)=>{
                        return i != undefined
                       })
                      ?.map((option: any) => (
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={option}
                          value={option}
                        >
                          <ListItemIcon>
                            <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "13px !important",
                              },
                            }}
                              size="small"
                              style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                              checked={divisionFilter?.indexOf(option) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText   sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }}primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
              <div>
                {/* <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                    padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                //defaultValue="Section"
                //multiple
                value={SectionFilter}
                onChange={handleChangeSection}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="None"
                >
                  None
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops UAE - Warehouse"
                >
                  Ops UAE - Warehouse
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops UAE - Service Centre"
                >
                  Ops UAE - Service Centre
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Eng - Application and Design"
                >
                  Eng - Application and Design
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Eng Ex-Com"
                >
                  Eng Ex-Com
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value="Ops OS - ExCom"
                >
                  Ops OS - ExCom
                </MenuItem>
              </Select>
            </FormControl> */}
                <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Section
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    disabled={disablesectionButton}
                    value={SectionFilter}
                    onChange={handleChangeSelectSection}
                    input={<OutlinedInput label="Section" />}
                    //renderValue={(selected) => selected.join(", ")}
                    renderValue={(selected) => {
                      if (selected?.length === opt?.length) {
                        return "Select All";
                      }
                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        //paddingLeft: "37px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedSection ? classes.selectedAll : "",
                      }}
                    >
                      {/* <Checkbox size="small" checked={SectionFilter.indexOf("None") > -1} /> */}
                      {/* <ListItemText  primary="None" /> */}
                      <ListItemIcon>
                        <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "13px !important",
                          },
                        }}
                       
                          size="small"
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedSection}
                          indeterminate={
                            SectionFilter?.length > 0 &&
                            SectionFilter?.length < opt?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    
                    {opt
                    ?.filter((i:any)=>{
                      return i != undefined
                     })
                     ?.filter((i:any)=>{
                      return i != ""
                     })
                    ?.map((option: any) => (
                      
                       
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                        }}
                        key={option}
                        value={option}
                      >
                        {hide1 && (
                        <ListItemIcon>
                          <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}
                            size="small"
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            checked={SectionFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                          )}
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                {/* <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
                // value={SectionFilter}
                // onChange={handleChangeSection}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Sub-section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Installation
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Service
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  SME's
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  CAC
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  IT
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Projects
                </MenuItem>
              </Select>
            </FormControl> */}
                {/* <FormControl size="small" sx={{  width: 140 }}>
        <InputLabel id="demo-multiple-checkbox-label">Sub section</InputLabel>
        <Select
           sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px",
              textTransform: "none",
              fontFamily: "Arial",
              color: "#333333",
              maxHeight: "0px",
              minHeight: "28px",
              padding: "6px 12px",
            },
            "& .MuiOutlinedInput-root": {
              maxHeight: "0px",
              minHeight: "28px",
            },
          }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Sub section" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem 
            style={{
              fontSize: "14px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            key={name} 
            value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
                {/* <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel sx={{
                      "& .MuiFormLabel-root": {
                        fontSize: "14px",
                        fontFamily: "Arial",
                        color: "#333333",
                        
                      },}} 
                      id="demo-multiple-checkbox-label">
                        Sub Section
                        </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                        maxHeight: "0px",
                        minHeight: "28px",
                        padding: "6px 12px",
                      },
                      "& .MuiOutlinedInput-root": {
                        maxHeight: "0px",
                        minHeight: "28px",
                      },
                    }}
                    
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={subSectionFilter}
                    onChange={handleChangeSelectSubSection}
                    input={<OutlinedInput label="Sub Section" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >

                    <MenuItem
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        paddingLeft: "37px"
                      }}
                      key="None"
                      value="None"

                    >
                    
                      <span
                    
                      >
                        Clear all
                      </span>
                    </MenuItem>
                   
                    {employeeData?.data
                      ?.slice()
                      ?.sort(function (a: any, b: any) { return a?.sub_section?.localeCompare(b?.sub_section); })
                      ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.sub_section }).indexOf(item?.sub_section) === index && item?.sub_section != undefined)
                      .map((name: any) => (
                        <MenuItem
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px"
                          }}
                          key={name?.sub_section}
                          value={name?.sub_section}>
                          <Checkbox 
                           style={{padding:"3px",paddingLeft:"14px"}}

                          size="small" checked={subSectionFilter.indexOf(name?.sub_section) > -1} />
                        
                          {name?.sub_section}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl> */}
                <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel
                   sx={{
                    "& .MuiInputLabel-root": {
                      fontSize: "14px !important",
                      fontFamily: "Arial !important",
                      color: "#333333 !important",
                    },
                  }}
                    id="demo-multiple-checkbox-label"
                  >
                    Sub section
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    disabled={disableButton}
                    value={subSectionFilter}
                    onChange={handleChangeSelectSubSection1}
                    input={<OutlinedInput label="Sub section" />}
                    // renderValue={(selected) => selected.join(", ")}
                    renderValue={(selected) => {
                      if (selected?.length === optSebSection?.length) {
                        return "Select All";
                      }
                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        //paddingLeft: "37px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedSubSection
                          ? classes.selectedAll
                          : "",
                      }}
                    >
                      {/* <Checkbox size="small" checked={SectionFilter.indexOf("None") > -1} /> */}
                      {/* <ListItemText  primary="None" /> */}
                      <ListItemIcon>
                        <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "13px !important",
                          },
                        }}
                          size="small"
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedSection}
                          indeterminate={
                            subSectionFilter?.length > 0 &&
                            subSectionFilter?.length < opt?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    {optSebSection
                    ?.filter((i:any)=>{
                      return i != undefined
                     })
                     ?.filter((i:any)=>{
                      return i != ""
                     })
                    ?.map((option: any) => (
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                        }}
                        key={option}
                        value={option}
                      >
                        <ListItemIcon>
                          <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}
                            size="small"
                            style={{ padding: "3px", paddingLeft: "14px",height:"0px" }}
                            checked={subSectionFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* //handleChangeSelecttalentCategory */}
              {(valueofTab === 0 && navigationFrom === "Reviewer") && (
                <div>
                  <FormControl size="small" sx={{ minWidth: 145 }}>
                    <InputLabel
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px !important",
                          fontFamily: "Arial !important",
                          color: "#333333 !important",
                        },
                      }}
                      id="demo-multiple-checkbox-label"
                    >
                      Direct Reports
                    </InputLabel>
                    <Select
                       labelId="demo-multiple-checkbox-label"
                       id="demo-multiple-checkbox"
                       size="small"
                      MenuProps={MenuProps}
                      input={<OutlinedInput label="Line Manager" />}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                        },
                      }}
                      multiple
                      value={talentCategoreyFilter}
                      onChange={handleChangeTalentCategoreyFilter}
                     // renderValue={(selected) => selected.join(", ")}
                      renderValue={(selected) => {
                        if (selected?.length === categorynames?.length) {
                          return "Select All";
                        }
                        return selected.join(", ");
                      }}

                      //defaultValue={10}
                    >
                       <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        //paddingLeft: "37px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedTalentCat ? classes.selectedAll : "",
                      }}
                    >
                      {/* <Checkbox size="small" checked={SectionFilter.indexOf("None") > -1} /> */}
                      {/* <ListItemText  primary="None" /> */}
                      <ListItemIcon>
                        <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "13px !important",
                          },
                        }}
                          size="small"
                          style={{ 
                            padding: "0px",
                             paddingLeft: "14px" ,
                             height:"0px"
                            }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedTalentCat}
                          indeterminate={
                            talentCategoreyFilter?.length > 0 &&
                            talentCategoreyFilter?.length < categorynames?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    {categorynames?.map((option: any) => (
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                        }}
                        key={option}
                        value={option}
                      >
                        <ListItemIcon>
                          <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}
                            size="small"
                            style={{ padding: "0px", paddingLeft: "14px",
                            height:"0px" }}
                            checked={talentCategoreyFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        <ListItemText  sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }} primary={option} />
                      </MenuItem>
                    ))}
                      {/* {categorynames.map((name) => (
                        <MenuItem
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={name}
                          value={name}
                        >
                          <Checkbox
                            style={{ padding: "6px", paddingLeft: "12px" }}
                            size="small"
                            checked={talentCategoreyFilter.indexOf(name) > -1}
                          />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Stack>
            {/* <span
          style={{
            color: "#3e8cb5",
            padding:"8px",
            height:"18px",
            border:"1px solid#3e8cb5",
            fontSize:"14px",
            fontFamily:"Arial",
            borderRadius:"8px"
          }}
        >{`${dayjs().format("DD-MMM-YYYY")}`}</span> */}
          </Stack>
          {/* <AlertDialogSuccess
          isAlertOpen={calendarValDialog}
          handleAlertClose={handleClickCloseCalendar}
        >
         There are no previous calendars available.
        </AlertDialogSuccess> */}
        </Box>
      </div>
    </>
  );
}

export default ClosedCalendarfilter