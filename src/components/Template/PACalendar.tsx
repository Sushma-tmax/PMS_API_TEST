import React, { useEffect, useState, useRef, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { Alert, Container, Icon, IconButton, TextField } from "@mui/material";
import { PAMaster } from "../index";
import { AlertDialog } from "..";
import dayjs from "dayjs";
import Edit from "../../assets/Images/Edit.svg";
import EditDisable from "../../assets/Images/Editcopy.svg";
import Tooltip from "@mui/material/Tooltip";
import Pause from "../../assets/Images/Pause.svg";
import Copy from "../../assets/Images/Copy.svg";
import Close from "../../assets/Images/Close.svg";
import Closenew from "../../assets/Images/Closenew.svg";
import Play from "../../assets/Images/Play.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Rectangle834 from "../../assets/Images/Rectangle834.svg";
import Eye from "../../assets/Images/Eye.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CREATE_MAPPING,
  MAPPED_TEMPLATE_EDIT,
  FILTERED_TEMPLATES,
  VIEW_MAPPED_TEMPLATE,
  VIEW_CALENDAR_MAPPING,
  EDIT_CALENDAR_MAPPING,
} from "../../constants/routes/Routing";
import _, { Dictionary } from "lodash";
import { Link } from "react-router-dom";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { parseISO } from "date-fns/esm/fp";
import { styled } from "@mui/material/styles";
import AlertDialogSuccess from "../UI/DialogSuccess";
import {
  useGetEmployeeUnmappedQuery,
  useGetEmployeeUnmappedLengthMutation,
  useGetActiveCalenderQuery,
  useGetCalenderQuery,
  useGetConfirmValidationQuery,
  useGetEmployeeByFilterQuery,
  useAppraisalCalendarCloseMutation,
  useGetRatingScaleQuery,
  useGetEmployeeEmailsQuery,
  useGetReminderActiveValueQuery,
  useUpdateReminderActiveValueMutation,
} from "../../service/";
import { useGetNineboxQuery } from "../../service/ninebox/ninebox";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../service/email/emailNotification";
import { At_Launch } from "../../constants/AppraisalEmailContents/NotificationForAction/At_Launch";
import { useGetAllPAEmployeesQuery, useAddEmployeestoPrevioisAppraisalMutation } from "../../service/employee/employee";
import { useAddEmployeestoPreviousAppraisalMutation } from "../../service/employee/previousAppraisal";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width: "6px !important"
  },

});
export default function CreateCalender(props: any) {
  const { data, isLoading, calendarData, onDelete, start, onPause, updateCalenderValidation, updateCalendar, onView } = props;
  const { data: ActiveCData } = useGetActiveCalenderQuery('');
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [closeAppraisalCalendar] = useAppraisalCalendarCloseMutation()
  const { data: nineBoxData } = useGetNineboxQuery("");
  const CustomScrollbar = Scrollbar as any;
  const { data: ratingsData } = useGetRatingScaleQuery('')
  const { data: confVal } = useGetConfirmValidationQuery('');
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff100`);
  const [idForEmployeeEmailIds, setidForEmployeeEmailIds] = React.useState<any>(null);
  console.log(idForEmployeeEmailIds, "newid")
  console.log(confVal?.data[0]?.confirmEmployeeMaster, "confVal")
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,
  division,appraiser_name,reviewer_name,overall_rating,normalizer_name,appraisal.potential,manager_code,manager_name,manager_position,work_location
  section,sub_section,appraisal.appraiser_rating,reviewer.reviewer_rating,
  normalizer.normalizer_rating,appraisal.status,appraisal.area_of_improvement,appraisal.objective_type,appraisal.objective_group,apraisal.other_recommendation,
  appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,
  appraisal.objective_description,reviewerIsDisabled,pa_status,employee.employee_rating,appraisal_template.objective_description,isCEORole,isExcluded,isGradeException,isLeavers,isRoleException`

  const { data: reminderStatus } = useGetReminderActiveValueQuery("");
  console.log(reminderStatus, "reminderStatus");
  const [reminderStatusUpdate] = useUpdateReminderActiveValueMutation();
  const [selectedCalendar, setSelectedCalendar] = useState("");
  const { data: employeeData, refetch: refetch, isFetching: GettingAllPAEmp } = useGetAllPAEmployeesQuery(`${appCalId}`)
  //console.log(data,"dataofCals")
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const { data: employeeEmails } = useGetEmployeeEmailsQuery(`${idForEmployeeEmailIds}`)
  console.log(appCalId,employeeData, employeeEmails, "employeeData")
  //console.log(calendarData,emailData, "calendarrrrData")
  const [trigger, settrigger] = React.useState(false);
  // mutation`
  const [addtoPrevious] = useAddEmployeestoPreviousAppraisalMutation();
  const [year, setYear] = React.useState("");
  const [unmappedEmployeeLength, { isLoading: isUploading, data: countsofUnmapp }] = useGetEmployeeUnmappedLengthMutation();
  const today = new Date();
  console.log(countsofUnmapp?.data, isUploading, "Launching1")
  const [activateLaunch, setactivateLaunch] = useState<any>(false);
  console.log(activateLaunch, "Launching")
  const [yearNumber, setYearNumber] = React.useState("");
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [activeStatus, setActiveStatus] = useState<any>(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [groupedCalendarData, setGroupedCalendarData] = useState<any>([]);
  const [pacalendars, setPacalendars] = useState<any>([]);
  console.log(selectedCalendar, "selectedCalendar")
  console.log(pacalendars, isLoading, "pacalendars")
  const navigate = useNavigate();

  //empty data
  const [emptyData, setemptyData] = useState(false);
  console.log(emptyData, "emptyData")
  let AppraiserCalendar = data &&
    // pacalendars
    calendarData?.data
      ?.filter((j: any) => {
        if (filterYear === "None" || filterYear === "") {
          return j;
        } else {
          return dayjs(j.updatedAt)
            .format("DD/MM/YYYY")
            .toLocaleLowerCase()
            .includes(
              dayjs(filterYear).format("YYYY").toLocaleLowerCase()
            );
        }
      })
      .filter((j: any) => {
        if (filterTitle === "None" || filterTitle === "") {
          return j;
        } else {
          return j.name
            .toLocaleLowerCase()
            .includes(filterTitle.toLocaleLowerCase());
        }
      })?.map((j: any) => {
        return j?.name
      })
  useEffect(() => {

    console.log(AppraiserCalendar?.length > 0, "PACalendarsPACalendars")
    // if (isLoading === false) {
    //   setTimeout(() => {
    //     setemptyData("There is no Appraisal Calendar created!");
    //   }, 2000);
    // }
    if (AppraiserCalendar?.length == 0 && isLoading == false) {
      setemptyData(true)
    } else {
      setemptyData(false)
    }
  }, [data])



  const handleYear = (event: SelectChangeEvent) => {
    setFilterYear(event.target.value);
  };

  const handleTitle = (event: SelectChangeEvent) => {
    setFilterTitle(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    //setYear(event.target.value as string);
  };
  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewName(nameAlert);
    //console.log(newId)
  };
  useEffect(() => {
    if (employeeData?.data?.length > 0) {
      setOpen(true);
    }
  }, [employeeData])

  const handleOpenCloseCalendarValidation = (id: string) => {
    console.log("mvenvibvurebviubvi")
    // setOpen(true);
    setSelectedCalendar(id);
    setappCalId(id)

  }
  const handleClickClose = () => {
    setOpen(false);
    settrigger(false);
    setappCalId(`636cb1a7960b1548b80ff100`)
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      console.log(newId);
    }
  };
  const handleCloseCalendarValidation = () => {
    if (selectedCalendar) {
      settrigger(true)
      closeAppraisal(selectedCalendar);
      setOpen(false);
      // window.location.reload();
    }
  }

  const [LaunchValDialog, setLaunchValDialog] = useState(false);
  const [LaunchValDialogMSG, setLaunchValDialogMSG] = useState("");
  const handleLaunchValDialog = () => {
    setLaunchValDialog(false);
    setLaunchValDialogMSG("")
  };

  const launchAppraisal = (id: any) => {
    //setYear(id)
    let PACalendars = data?.data?.filter(
      (item: any) => item?.calendar && item?.calendar?._id == id
    );
    //check for appraisal calendars
    if (PACalendars?.length == 0) {
      //alert msg
      setLaunchValDialogMSG("Please map templates to the calendar")
      setLaunchValDialog(true)
      console.log("Launching1")
    } else {
      //check for unmapped employees
      unmappedEmployeeLength(id).then((res: any) => {
        console.log("Launching", res)
        if (res.error) {

          console.log("Error fetching data");
        } else {
          // if (res.data && res.data.data != 0) {
          //   setLaunchValDialogMSG("Calendar cannot be launched. Please map all the employees1")
          //   setLaunchValDialog(true)
          // } else {
          console.log("Data fetched successfully");
          if (res != undefined) {
            Launching(id, res?.data?.data)
          }
          // }
        }
      });
    }
  };



  const formatDate = (date : any) => {
    const day = date ? parseInt(date[2]) : null;
    const month = date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date)) : null;
    const year = date ? parseInt(date[0]) : null;
    return date ? `${day} ${month} ${year}` : ''
  }

  // Create a Date object representing the current date and time
  const currentDate = new Date();
  // Set the time to midnight (0 hours, 0 minutes, 0 seconds, 0 milliseconds)
  currentDate.setHours(0, 0, 0, 0);
  // Format the date as a string (e.g., "YYYY-MM-DD")
  const formattedDate = currentDate.toISOString()
  console.log(formattedDate,"currentDate")
  const closeAppraisal = (id: any) => {
    closeAppraisalCalendar({
      id: id,
      isActive: false,
      status: "Closed",
     calendar_closing_date:formattedDate
    }).then((res: any) => {
      if (res.error) {
        console.log("Error fetching data");
      } else {
        setLaunchValDialogMSG("Calendar is now closed")
        setLaunchValDialog(true)
        //toggle off reminder notification
        reminderStatusUpdate({
          reminderStatus: false,
          id: reminderStatus?.data[0]?._id,
        });
      }
    })
    //then
    //setLaunchValDialogMSG
    //setLaunchValDialog
  }

  // const identi = () =>{
  useEffect(() => {

    let temp = ActiveCData?.data?.filter((i: any) => {
      return i?.isActive === true
    })
    console.log(temp?.length, "Launching")
  }, [ActiveCData])

  //}
  //Initial launch validations
  const Launching = (id: any, unmappedLength: any) => {
    console.log("Launching")
    //setappCalId(id);
    //get appraisal calendars belonging to the selected calendar
    let PACalendars = data?.data?.filter(
      (item: any) => item?.calendar && item?.calendar?._id == id
    );

    let temp = PACalendars?.filter((item: any) => {
      return item?.position != undefined && item?.position?.length == 0
    })
    console.log(temp, "Launchingctemp")
    //for date check
    // let dateCheck = PACalendars[0]?.calendar?.start_date
    //check ifcalendar start date is greater than or is same as today
    let dateCheck = PACalendars?.map((item: any) => {
      return dayjs(item?.calendar?.start_date).isSame(dayjs(), 'day')
        || dayjs(item?.calendar?.start_date).isAfter(dayjs())
    })
    console.log(PACalendars, "Launchingc")
    console.log(dayjs(), dateCheck, "Launchingc")
    //for position check  
    let checkPositions = PACalendars?.map((item: any) => {
      return item?.position?.length == 0
    })
    console.log(checkPositions, "Launchingc")
    //to check active
    let activeCal = ActiveCData?.data?.filter((i: any) => {
      return i?.isActive === true
    })
    let CalendarCheck = PACalendars?.map((item: any) => {
      return dayjs(item?.calendar?.pa_launch)
    })
    const dayOfMonth = CalendarCheck[0].$d;

    // const today1 = dayjs().startOf('day');
    //     const today1 = dayjs().startOf('day');
    // let todaysdate =today1.format('DD-MM-YYYY')

    // const launchDate = dayjs(CalendarCheck[0].$d).format('DD-MM-YYYY');
    // const isAfter = dayjs(todaysdate).isAfter(dayjs(launchDate));
    const today = dayjs().startOf('day');
    console.log(today.format('DD-MM-YYYY'), "neeeeeeeeeee");

    const launchDate = dayjs(CalendarCheck[0])?.startOf('day');
    console.log(launchDate, "launchdate");

    const isAfter = today.isAfter(launchDate, 'date');
    const IsBefore = today.isBefore(launchDate, 'date')
    const isSame = today.isSame(launchDate, 'date');
    console.log(isSame, IsBefore, "dateeee");
    // if (isAfter) {
    //   setLaunchValDialogMSG("You cannot launch the calendar before the initiation date.");
    //   setLaunchValDialog(true);
    // }
    // console.log(todaysdate,launchDate,"heeeeeeeeeee")
    console.log(isAfter, isSame, "isAfterisAfter")
    //ActiveCData.length----1more
    //validation for calendar start date
    if (dateCheck?.includes(false)) {
      //alert msg
      setLaunchValDialogMSG("The calender period is over.")
      setLaunchValDialog(true)
      console.log("Launching1")
    }
    //validation for PA Initiation date
    else if (isSame == false && IsBefore == true) {
      setLaunchValDialogMSG("You cannot launch the calendar before the initiation date.")
      setLaunchValDialog(true)
    }

    // validation for checking employees master confirmation
    else if (confVal?.data[0]?.confirmEmployeeMaster !== true) {
      setLaunchValDialogMSG("The calendar cannot be initiated. Please confirm all the employees for performance appraisal in the exception handling.")
      setLaunchValDialog(true)
    }
    // validation for checking templates with no employees mapped
    else if (checkPositions?.includes(true)) {
      //alert msg
      //  Please review template mapping. There are templates that are not mapped to employees. 
      // setLaunchValDialogMSG("Please review the employee mapping. There are templates that have no employee mapping")
      setLaunchValDialogMSG("Please review template mapping. There are templates that are not mapped to employees.")
      setLaunchValDialog(true)
      console.log("Launching2")
    } else if (unmappedLength > 0) {
      //validation for unmapped employees
      setLaunchValDialogMSG("The calendar cannot be initiated. Please ensure to map all employees.")
      setLaunchValDialog(true)
      console.log("Launching3")
    }
    else if (activeCal?.length !== 0) {
      //validation for any other active calendar
      let calendar = PACalendars[0]?.calendar?.name
      setLaunchValDialogMSG(calendar + " cannot Go Live. Current live calendar must be closed.")
      setLaunchValDialog(true)
    } else {
      if (temp.length == 0) {
        setLaunchValDialogMSG("The calendar is now LIVE. The performance appraisal was initiated.")
        setLaunchValDialog(true)
        PACalendars.forEach((cal: any) => {
          console.log("Launching4")
          console.log("alertsuccess")
          start(cal._id);
        });
        updateCalendar({
          id: id,
          isActive: true,
          status: "Live"
        })

        let activeCalendar = calendarData?.data?.find((item: any) => item._id == id)
        let calendarName = activeCalendar?.calendar_type;
        let calendarYear = activeCalendar.start_date?.slice(0, 4)
       let Appraiser_Due_Date = activeCalendar ? (activeCalendar.end_date_appraiser || '').slice(0, 10).split('-') : ''; 
       let PA_ClosingDate = activeCalendar ? (activeCalendar.end_date || '').slice(0, 10).split('-') : ''; 
       let PA_InitiationDate = activeCalendar ? (activeCalendar.pa_launch || '').slice(0, 10).split('-') : ''; 


        let formatted_Appraiser_Due_Date = formatDate(Appraiser_Due_Date); // Concatenate the parts in the desired format
        let formatted_PA_InitiationDate = formatDate(PA_InitiationDate); // Concatenate the parts in the desired format
        let formatted_PA_ClosingDate = formatDate(PA_ClosingDate);

        let tempSubject = At_Launch?.subject;
        tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
        tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);

        let tempHtml = At_Launch?.html;
        tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
        tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
        tempHtml = tempHtml?.replace("[initiation date]", `${formatted_PA_InitiationDate}`);
        tempHtml = tempHtml?.replace("[closing date]", `${formatted_PA_ClosingDate}`);
        // tempHtml = tempHtml?.replace("[dd/mm/yy]", `${formatted_PA_InitiationDate}`);
        tempHtml = tempHtml?.replace("[dd/mm/yy]", `${formatted_Appraiser_Due_Date}`);
        let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email
        let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email

        // const recipientEmails = [`${reviewerEmail}`, `${normalizerEmail}`]
        const recipientEmails: any = employeeEmails?.data ? employeeEmails?.data?.filter((item: any) => {
          return item?.email != "" && item?.email != undefined && item.isLeavers !== true
        })?.map((item: any) =>{
          return item?.email
        }) : [];
        sendEmailNotification(
          {
            to: recipientEmails,
            cc: At_Launch?.to,
            subject: tempSubject,
            html: tempHtml
          }
        )


      } else {
        console.log("alertfail")
        console.log("Launching5")
        setcannotLaunch(true);
      }
      setactivateLaunch(false);
    }
  }
//Launching Calendar
useEffect(() => {
  if(idForEmployeeEmailIds !== null){
  if(employeeEmails?.data?.length >= 0){
  launchAppraisal(idForEmployeeEmailIds) 
    }
    setidForEmployeeEmailIds(null)
}
}, [employeeEmails])

  React.useEffect(() => {
    console.log(data);
    if (data) {
      let temp = data.data.filter((item: any) => item.calendar != undefined);
      var result = _.groupBy(temp, function (b) {
        return b.calendar._id;
      });
      setGroupedCalendarData(result);
      //get unique calendars from Appraisal calendars
      let cal = [
        ...new Map(temp.map((item: any) => [item.calendar._id, item])).values(),
      ];
      setPacalendars(cal);
    }
  }, [data]);

  const editHandler = (row: any) => {
    if (row.status !== "Live") {
      navigate(`${MAPPED_TEMPLATE_EDIT}/${row.calendar._id}`);
    }
  };

  //dialog
  const [cannotLaunch, setcannotLaunch] = useState(false);
  //  const [triggerLaunch, settriggerLaunch] = useState(false);
  //  const [calLaunchId, setcalLaunchId] = useState('');
  const handleClickLaunchClose = () => {
    setcannotLaunch(false);

  };

  /* to get rating and rating scale by taking ratingId */
  const getRatingValue: any = (rating: any) => {
    let getRating = (ratingItem: any) => {
      return ratingsData?.data?.find((item: any) => item._id == ratingItem.name)
    }
    let ratingArray = ratingsData && rating?.map((item: any) => {
      getRating(item)
      return {
        rating: getRating(item).rating,
        rating_scale: getRating(item).rating_scale
      }
    })
    return ratingArray
  }

  //dialog
  // save the closed calendar employee details
  useEffect(() => {


    if (trigger == true) {

      let previousappraisal = employeeData?.data
        ?.filter((i: any) => {
          return i?.employee_upload_flag == true && i?.appraisal?.status == "completed"
        })
        ?.map((emp: any) => {
          return {
            "employee_code": emp?.employee_code,
            "legal_full_name": emp?.legal_full_name,
            "first_name" :emp?.first_name,
            "position_long_description": emp?.position_long_description,
            "grade": emp?.grade,
            "division": emp?.division,
            "appraiser_name": emp?.appraiser_name,
            "appraiser_code": emp?.appraiser_code,
            "reviewer_name": emp?.reviewer_name,
            "reviewer_code": emp?.reviewer_code,
            "normalizer_name": emp?.normalizer_name,
            "normalizer_code": emp?.normalizer_code,
            "potential": emp?.appraisal?.potential,
            "manager_code": emp?.manager_code,
            "manager_name": emp?.manager_name,
            "manager_position": emp?.manager_position,
            "work_location": emp?.work_location,
            "probation_status": emp?.probation_status,
            "service_reference_date": emp?.service_reference_date,
            "sub_section": emp?.sub_section,
            "section": emp?.section,
            "isCEORole": emp?.isCEORole,
            "isExcluded": emp?.isExcluded,
            "function" : emp?.function,
            "email" :emp?.email,
            "previous_rating" : emp?.previous_rating,
            "normalizer_rating" : emp?.normalizer?.normalizer_rating,
            "isGradeException": emp?.isGradeException,
            "isLeavers": emp?.isLeavers,
            "isRoleException": emp?.isRoleException,
            "talent_category": emp?.talent_category,
            "reviewer_rating":emp?.reviewer?.reviewer_rating,
            "appraiser_rating":emp?.appraisal?.appraiser_rating,
            "employee_rating" :emp?.employee?.employee_rating,
            "normalized_overallRating" :emp?.normalizer?.normalized_overallRating,
            "employee_status":emp?.employee?.employee_status,
            "status" : emp?.appraisal?.status,
            "appraiser_PA_accepted" : emp?.appraisal?.appraiser_PA_accepted,
            "appraiser_PA_rejected" : emp?.appraisal?.appraiser_PA_rejected,
            "reviewer_PA_rejected" : emp?.reviewer?.reviewer_PA_rejected,
            "reviewer_PA_accepted" : emp?.reviewer?.reviewer_PA_accepted,
            "normalizer_PA_accepted" : emp?.normalizer?.normalizer_PA_accepted,
            "normalizer_PA_rejected" : emp?.normalizer?.normalizer_PA_rejected,
            "high" : nineBoxData.data[0].potential_definitions.high,
            "moderate" : nineBoxData.data[0].potential_definitions.moderate,
            "low" : nineBoxData.data[0].potential_definitions.low,
            calendar: emp?.calendar,
            "objective_description": emp?.appraisal?.objective_description.map((j: any) => {
              let objectiveTemplate = emp?.appraisal_template?.objective_description?.find((item: any) => item?.name?._id == j?.name?._id);
              let normalizerRating = emp?.normalizer?.objective_description?.filter((i: any) =>
                i.name === j?.name?._id).map((k: any) => ratingsData?.data?.find((item: any) => k.ratings == item._id)?.rating)[0]

              return {
                comments: j?.comments,
                rejection_reason: j?.rejection_reason,
                objectiveTitle: j?.name?.objectiveTitle,
                description: j?.name?.description,
                rating: normalizerRating,
                objective_type:j?.name?.objective_type,
                value: j?.value,
                _id:j?._id,
                level_1: objectiveTemplate?.name?.level_1,
                level_2: objectiveTemplate?.name?.level_2,
                level_3: objectiveTemplate?.name?.level_3,
                level_4: objectiveTemplate?.name?.level_4,
                level_1_isChecked: j?.level_1_isChecked,
                level_2_isChecked: j?.level_2_isChecked,
                level_3_isChecked: j?.level_3_isChecked,
                level_4_isChecked: j?.level_4_isChecked
                // levels
              }
            }),
            "objective_group": emp?.appraisal?.objective_group.map((j: any) => {
              return {
                objective_group: j?.name?.name,
                value: j?.value
              }
            }),
            "objective_type": emp?.appraisal?.objective_type.map((j: any) => {
              return {
                objective_type: j?.name?.name,
                value: j?.value,
                _id :j?.name?._id
              }
            }),
            "overall_rating": emp?.appraisal?.pa_rating,
            "appraisal": emp?.appraisal,
            "employee": emp?.employee,
            "other_recommendation": emp?.appraisal?.other_recommendation.map((j: any) => {
              return {
                name: j?.name?.name,
                sort_value: j?.name?.sort_value,
                isChecked: j?.isChecked,
              }
            }),
            "training_recommendation": emp?.appraisal?.training_recommendation.map((j: any) => {
              return {
                title: j?.name?.title,
                definition: j?.name?.definition,
                training_name: j?.training_name,
                justification: j?.justification
              }
            }),
            "feedback_questions": emp?.appraisal?.feedback_questions.map((j: any) => {
              return {
                name: j?.name?.name,
                value: j?.value
              }
            }),
            "area_of_improvement": emp?.appraisal?.area_of_improvement.map((j: any) => {
              return {
                specific_area: j?.value,
                specific_actions: j?.specific_actions[0]?.value
              }
            }),
            "rating_scale": getRatingValue(emp?.appraisal_template?.rating)
          }

        })
      addtoPrevious({
        "data": previousappraisal
      })
      console.log(previousappraisal, "previousappraisal")
    }

  }, [trigger, employeeData])
  console.log(trigger, "trigger")
  return (
    <>
      <PAMaster name={"Calendar List"} />
      {/* <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                <InputLabel
                    variant="standard"
                    id="demo-multiple-name-label"
                >
                    <div>Year </div>
                </InputLabel>
                <Select
                    sx={{ width: "80px" }}
                    value={dayjs(filterYear).format("YYYY")}
                    onChange={handleYear}
                    variant="standard"

                >
                    <MenuItem key="None" value="None">
                        None
                    </MenuItem>

                    {data && data.data.map((row: any) => (
                        <MenuItem key ={dayjs(row.updatedAt).format("YYYY")} value={dayjs(row.updatedAt).format("YYYY")}>
                            {dayjs(row.updatedAt).format("YYYY")}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                <InputLabel
                    variant="standard"
                    id="demo-multiple-name-label"
                >
                    <div>Title</div>
                </InputLabel>
                <Select
                    sx={{ width: "80px" }}
                    value={filterTitle}
                    onChange={handleTitle}
                    variant="standard"
                    
                >
                    <MenuItem key="None" value="None">
                        None
                    </MenuItem>

                    {data && data.data.map((row:any) => {
                  
                     return (
                        <MenuItem key= {row.name} value={row.name}>
                            {row.name}
                        </MenuItem>
                    )})}
                </Select>
            </FormControl> */}
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          // boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px"

        }}
      // maxWidth="lg"
      >
        {emptyData ? (
          <>
            {"There is no Appraisal Calendar created!"}
          </>
        ) : (
          ""
        )}
        <TableContainer >
          <Scroll>
            <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 180px)" }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <TableRow sx={{
                    "& td, & th": {
                      bgcolor: "#eaeced",
                    },
                  }}>
                    {/* <TableCell
                                        align="center"
                                        sx={{
                                            fontFamily: "regular",
                                            borderColor: "#F7F9FB",
                                            color: "#004C75",
                                            fontSize: "14px",
                                        }}
                                    >
                                        #
                                    </TableCell> */}
                    <TableCell
                      align="center"
                      width="300px"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      Calendar Name
                    </TableCell>
                    <TableCell
                      width="15px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      width="15px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Last Modified Date
                    </TableCell>
                    <TableCell
                      width="10px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {/* Action */}
                      {/* <div style={{ display: "flex", justifyContent: "space-evenly" }} > */}
                      {/* {isUploading && (
                              <CircularProgress size={15} thickness={7} />
                            )} */}
                      Action
                      <div style={{ marginTop: "2px" }} >
                        {(isUploading || GettingAllPAEmp) && <CircularProgress size={15} thickness={7} />}
                      </div>
                      {/* </div> */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    // pacalendars
                    calendarData?.data
                      ?.filter((j: any) => {
                        if (filterYear === "None" || filterYear === "") {
                          return j;
                        } else {
                          return dayjs(j.updatedAt)
                            .format("DD/MM/YYYY")
                            .toLocaleLowerCase()
                            .includes(
                              dayjs(filterYear).format("YYYY").toLocaleLowerCase()
                            );
                        }
                      })
                      .filter((j: any) => {
                        if (filterTitle === "None" || filterTitle === "") {
                          return j;
                        } else {
                          return j.name
                            .toLocaleLowerCase()
                            .includes(filterTitle.toLocaleLowerCase());
                        }
                      })

                      .map((row: any, index: number) => (

                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              borderColor: "lightgrey",
                            },
                          }}
                        >
                          {/* <TableCell
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#333333",
                                                    opacity: "100%",
                                                }}
                                                component="th"
                                                scope="row"
                                                align="center"
                                            >
                                                {index + 1}
                                            </TableCell> */}
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {/* {row?.calendar?.name}{" "} */}
                            {row?.name}{" "}

                            {/* <Button
                          style={{
                            borderRadius: "12px",
                            textTransform: "none",
                            backgroundColor: "#004D77",
                            fontSize: "10px",
                            padding: "0.3px 2px",
                          }}
                          variant="contained"
                         
                        >
                          Live
                        </Button> */}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>
                            {row.status === "Live" ? (
                              // <Button
                              //   size="small"
                              //   variant="outlined"
                              //   style={{
                              //     backgroundColor: "#008E97",
                              //     borderRadius: "12px",
                              //     paddingLeft: "8px",
                              //     padding: "0.1px 16.3px",
                              //     color: "#fff",
                              //     textTransform: "none",
                              //   }}
                              // >
                              //   Live
                              // </Button>
                              <span style={{ color: "#008E97", fontWeight: "600", }}>Live</span>
                              //  removing the condition for end date validation and showing only calendar status as it is
                              // || dayjs(row?.end_date).isBefore(dayjs())
                            ) : (row?.status === "Closed" ?
                              <span style={{ fontWeight: "600", }}>Closed</span>
                              : <span style={{ fontWeight: "600", }}>Draft</span>
                            )}

                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {/* {row.updatedAt} */}
                            {dayjs(row?.updatedAt).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: "12px",
                              color: "#717171",
                              fontFamily: "Arial",
                            }}
                          >
                            {/* <Tooltip title="Copy">
                                                    <IconButton aria-label="Copy">
                                                        <img src={Copy} alt="icon" />
                                                    </IconButton>
                                                </Tooltip> */}

                            <Tooltip title="Launch">
                              <IconButton
                                disabled={
                                  row.status === "Live" ||
                                  row.status === "Closed" ||
                                  // (dayjs(row?.start_date).isSame(dayjs())) ||
                                  dayjs(row?.end_date).isBefore(dayjs())
                                  //  ||
                                  // dayjs(row?.start_date).isBefore(dayjs())
                                }
                                onClick={() => {                                
                                  //launchAppraisal(row._id);
                                  // launchAppraisal(row.calendar._id);
                                  setActiveStatus(true);
                                  setidForEmployeeEmailIds(row._id)
                                  //launccch(row._id)
                                }}
                              >

                                {row.status === "Live" || row.status === "Closed"
                                  ||
                                  (dayjs(row?.start_date).isSame(dayjs()))
                                  ||
                                  dayjs(row?.end_date).isBefore(dayjs())
                                  ? (
                                    <img src={Play} style={{ opacity: "0.5" }} alt="icon" />
                                  ) : (
                                    <img src={Play} alt="Edit" />
                                  )}
                              </IconButton>
                            </Tooltip>

                            {/* <Tooltip title="Pause">
                                                    <IconButton aria-label="Pause" onClick={() => onPause(row._id)}>
                                                        <img src={Pause} alt="icon" />
                                                    </IconButton>
                                                </Tooltip> */}

                            <Tooltip title="Edit">
                              {/* <Link to={`${MAPPED_TEMPLATE_EDIT}/${row.calendar._id}`} state={{ from: `${row.calendar._id}`, name:`${row.calendar.name}` }}> */}
                              <IconButton
                                aria-label="EditIcon"
                                disabled={
                                  row.status === "Live" || row.status === "Closed"
                                  || (!dayjs(row?.start_date).isSame(dayjs(), 'day') && dayjs(row?.start_date).isBefore(dayjs()))
                                  // dayjs(row?.start_date).isBefore(dayjs())
                                }

                              // onClick={() => navigate(`${MAPPED_TEMPLATE_EDIT}/${row.calendar._id}`)}
                              // onClick={() => editHandler(row)}
                              >
                                <Link
                                  // to={`${VIEW_MAPPED_TEMPLATE}/${row.calendar._id}`}
                                  to={`${EDIT_CALENDAR_MAPPING}/${row?._id}`}
                                  state={{
                                    from: `${row?.calendar?._id}`,
                                    name: `${row?.calendar?.name}`,
                                  }}
                                >
                                  {/* <img src={Edit} alt="icon"/> */}
                                  {row.status === "Live" || row.status === "Closed" ||
                                    (!dayjs(row?.start_date).isSame(dayjs(), 'day') && dayjs(row?.start_date).isBefore(dayjs()))
                                    ? (
                                      <img src={EditDisable} style={{ cursor: "no-drop" }} alt="icon" />
                                    ) : (
                                      <img src={Edit} alt="icon" />
                                    )}
                                </Link>
                              </IconButton>
                              {/* </Link> */}
                            </Tooltip>
                            {row.status === "Live" &&
                              <Tooltip title="Close">
                                <IconButton
                                  onClick={() => {
                                    // start(row._id);
                                    // closeAppraisal(row._id);
                                    // setActiveStatus(false);
                                    // setOpen(true)
                                    handleOpenCloseCalendarValidation(row?._id)
                                  }}
                                >
                                  {/* <img src={Close} alt="icon" /> */}
                                  <img src={Closenew} alt="icon" />
                                </IconButton>
                              </Tooltip>
                            }
                            {(row.status === "Closed" || dayjs(row?.end_date).isBefore(dayjs())) &&
                              <Tooltip title="View">
                                <IconButton
                                  onClick={() => onView(row._id)}
                                >
                                  {/* <img src={Close} alt="icon" /> */}
                                  <img src={Eye} alt="icon" />
                                </IconButton>
                              </Tooltip>
                            }
                            {/* <Tooltip title="View Employee Mapping">
                            <IconButton
                              aria-label="EditIcon"
                              // disabled={(row.status === 'active') || (dayjs(row.calendar.start_date).isBefore(dayjs()))}
                            >
                              <Link
                                to={`${FILTERED_TEMPLATES}/${row.calendar._id}`}
                                state={{
                                  from: `${row.calendar._id}`,
                                  name: `${row.calendar.name}`,
                                }}
                              >
                                <img src={Eye} alt="icon" />
                              </Link>
                            </IconButton>
                          </Tooltip> */}

                            {/* <Tooltip title="Delete">
                                                    <IconButton
                                                        disabled={row.status === "active"}
                                                        aria-label="CancelOutlinedIcon "
                                                        onClick={() => handleClickOpen(row._id, row.name)}
                                                    >
                                                        <img src={Close} alt="icon" />
                                                    </IconButton>
                                                </Tooltip> */}
                            <AlertDialog
                              isAlertOpen={open}
                              handleAlertOpen={() =>
                                // handleClickOpen(row?._id, row?.name)
                                handleOpenCloseCalendarValidation(row?._id)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleCloseCalendarValidation}
                              rowAlert={row}
                            >
                              Are you sure you wish to close this calendar?
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </CustomScrollbar>
          </Scroll>
        </TableContainer>
        <AlertDialogSuccess
          isAlertOpen={cannotLaunch}
          handleAlertClose={handleClickLaunchClose}
        >
          {/* This calendar cannot be launched as there are templates with no employees mapped to it. */}
          {/* Please review the employee mapping. There are templates that have no employee mapping. */}
          Please review template mapping. There are templates that are not mapped to employees.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={LaunchValDialog}
          handleAlertClose={handleLaunchValDialog}
        >
          {LaunchValDialogMSG}

        </AlertDialogSuccess>
      </Box>
    </>
  );
}
