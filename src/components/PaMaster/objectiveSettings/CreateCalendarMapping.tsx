import * as React from "react";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { isAfter, isBefore, subDays } from "date-fns";
import {
  Box,
  Container,
  Paper,
  Grid,
  Menu,
  Toolbar,
  styled,
  InputAdornment,
  Typography,
  TextField,
  Stack,
  Tooltip,
  Alert,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../../assets/Images/Edit.svg";
import Leftarrow from "../../../assets/Images/Leftarrow.svg";
import white_edit from "../../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from '@mui/material/CircularProgress';
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  CREATE_MAPPING_NEW,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_FILTER,
  LINK_CALENDAR_OPEN,
  LINK_CALENDAR_SAVE,
  MAPPED_TEMPLATE_2,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
  VIEW_MAPPED_TEMPLATE,
} from "../../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Plus from "../../../assets/Images/Plus.svg";
import Closeiconred from "../../../assets/Images/Closeiconred.svg";
import Close from "../../../assets/Images/Close.svg";

import Tab from "@mui/material/Tab";
import {
  useAddCalendarMutation,
  useGetCalenderQuery,
  useGetTemplateQuery,
} from "../../../service";

import {
  useCreateAppraisalCalenderMutation,
  useDeleteAppraisalCalenderMutation,
  useGetAppraisalCalenderQuery,
  useGetCurrentAppraisalCalenderQuery,
  useGetRecentAppraisalCalenderQuery,
  useUpdateAppraisalCalenderMutation,
} from "../../../service/appraisalCalender/AppraisalCalender";

import Filtergroup from "../../../assets/Images/Filtergroup.svg";
import Searchicon from "../../../assets/Images/Searchicon.svg";
import { isError } from "lodash";
import PAMaster from "../../UI/PAMaster";
import AlertDialog from "../../UI/Dialog";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { wordBreak } from "html2canvas/dist/types/css/property-descriptors/word-break";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AlertDialogUnmap from "../../UI/DialogUnmap";
import AlertYesNo from "../../UI/DialogYesNo";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import AlertAcceptDialog from "../../UI/DialogAccept";

//prompt -------functions
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
});
export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  // marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "35px",
    width: "200px",
    borderRadius: "25px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#D5D5D5",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "12px",
    color: "#333333",
    opacity: "70%",
  },
});

const LinkCalendar = (props: any) => {
  const { loading } = props;
  const today = new Date();
  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  const CustomScrollbar = Scrollbar as any;

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions

  const [template, setTemplate] = useState<any>([]);
  console.log(template,"templatedata")
  const [yearArray, setYearArray] = useState<any>([]);
  const navigate = useNavigate();

  const { data, isLoading } = useGetTemplateQuery("");
  console.log(data, "data");
  const { data: calenderData } = useGetCalenderQuery("");
  console.log(calenderData,"calenderData")
  const [deleteAppraisalCalender, { error: deleteError,isLoading:deleteAppraisalCalenderLoading }] =
    useDeleteAppraisalCalenderMutation();
  // const [addCalendar] = useAddCalendarMutation()
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const [uncheck, setUncheck] = useState<any>(false);
  const [check, setcheck] = useState<any>(false);

  console.log(uncheck,"uncheck")
  const [checkedStatus, setCheckedStatus] = useState({});
  // const [showEdit, setShowEdit] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [
    createAppraisalCalender,
    { error: calendarError, isError: calendarIsError,isLoading:createAppraisalCalenderLoading },
  ] = useCreateAppraisalCalenderMutation();
  console.log(deleteAppraisalCalenderLoading,createAppraisalCalenderLoading,"Loaders")
  // const { data: recentAppraisalCalendars } = useGetRecentAppraisalCalenderQuery('');
  const { data: appraisalCalendarData, isLoading: isDataLoading } =
    useGetCurrentAppraisalCalenderQuery("");
  const [updateAppraisalCalendar] = useUpdateAppraisalCalenderMutation();
  // console.log("recentAppraisalCalendars", recentAppraisalCalendars);

  const [year, setYear] = useState("");
  console.log(year,"calYear")
  const [term, setTerm] = useState("");
  const [termEdit, setTermEdit] = useState("");
  const [searchName, setSearchName] = useState("");
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [mappedTemplates, setMappedTemplates] = useState<any>([]);
  console.log(mappedTemplates,"mappedTemplatesss")
  const [open1, setOpen1] = useState<any>(false);
  const [message, setMessage] = useState<any>("");

  // to open delete dialog box
  const [open, setOpen] = useState<any>(false);
  const [appCalendar, setAppCalendar] = useState<any>();
  const [appCalendarId, setAppCalendarId] = useState<any>();

  const [showemptyVal, setshowemptyVal] = useState(false);
  const [emptycalendar, setEmptycalendaar] = useState(false);
  //cancel button confirmation ALERT
  const [dialogActive, setdialogActive] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const handleDialogClose = () =>{
    handleCancel()
    setdialogActive(false)
    setDialogMsg("")
  }
  const handleAcceptChanges = () =>{
    setdialogActive(false)
    setDialogMsg("")
  }
//tab navigationalert
const [tabNum, setTabNum] = useState('');
const [tabNav, setTabNav] = useState(false);
const [triggerTheNav, settriggerTheNav] = useState(false);
const [triggerTheNav1, settriggerTheNav1] = useState(false);
console.log(triggerTheNav,"triggerTheNav")
const handleAlertYes = () => {

setTabNav(false)

};
const handleAlertNo = () => {


settriggerTheNav(false)
settriggerTheNav1(false)
setTabNav(false)
setYear(tabNum);
// setValue(tabNum);

};
//tab navigationalert
// for emptycalendar
const [emptyData, setemptyData] = useState(false);

  useEffect(() => {
    const Calendar = calenderData &&
      activeAppId !== undefined &&
      calenderData?.data?.filter((j: any) => {
        return !activeAppId?.includes(j._id);
      })
      // .filter((j: any) => {
      //   return (dayjs(j?.start_date)?.isAfter(dayjs())
      //   )
      // })
      .filter((j: any) => {
        const today = dayjs().startOf('day');
        return (dayjs(j?.start_date)?.isAfter(dayjs()) || (dayjs(j.start_date).isSame(today, 'day')))
      })
      if(Calendar?.length === 0){
        setshowemptyVal(true)
      }else{
        setshowemptyVal(false)
      }
      if(appraisalCalendarData?.data?.length == 0 && calenderData?.length == 0){
        setemptyData(true)
      }
      else if(calenderData?.data?.length == 0 || calenderData?.data?.length == undefined){
        setemptyData(true)
      } else {
      setemptyData(false)
    }
    console.log(Calendar?.length, "newone")
  }, [calenderData, activeAppId])
  const handleClose1 = () => {
    setOpen1(false);
    setSuccess(false);
  };
  //  delete functions
  const handleClickOpen = (appCalendar: any, id: any) => {
    console.log(appCalendar,id,"appCalendaridii")
    if(appCalendar?.positionCount == 0){
      setOpen1(false)
      setMessage("")
    setOpen(true);
    setAppCalendar(appCalendar);
    setAppCalendarId(id);
    }else{
      console.log(appCalendar?.positionCount,"positionCount")
    setOpen1(true)
    setMessage("A template with mapped employees cannot be unmapped. Please unmap the employees.")
    }
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    console.log(appCalendar,appCalendarId,"appCalendarId")
    if (appCalendar && appCalendarId) {
      deleteAppraisalCalenderHandler(appCalendarId);
    }
    //----------------------------------------------------for preventing the checkbox being checked after unmapping
    setUncheck(true)
  };
  //------------------------------------------------------for hiding All select when there is no data
  const templatesAvailable = template
  ?.filter((item:any) => item.weightage !== "" && item.status_template === "Completed" && item.template_active_status)
  ?.filter((filteredName:any) => searchName === "" || filteredName.name.toLowerCase().includes(searchName.toLowerCase()))
  ?.filter((i:any) => !mappedTemplates?.map((item:any) => item?.template?._id).includes(i._id))

  const deleteAppraisalCalenderHandler = (id: string) => {
    setOpen(false);
    deleteAppraisalCalender(id);
    const tempUser = template?.map((other: any) => {
      return other._id === id ? { ...other, isChecked: false } : other;
    });
    setTemplate(tempUser);
  };

  useEffect(() => {
    setTemplate(data?.templates);
  }, [data, isLoading]);

  // clearing the localstorage
  useEffect(()=>{
    window.onbeforeunload = () => {
      localStorage.clear();
    }
     },[])
  let activeyear = localStorage.getItem("activeyear") ?? "";
  //  to display recently created calendar in the select field 
  useEffect(() => {
    const defValue = calenderData &&
    activeAppId !== undefined &&
    calenderData?.data?.filter((j: any) => {
        return !activeAppId?.includes(j?._id);
        //   let temp = activeAppId?.map((i:any)=>{

        //    return i
        //    })

        //  return (!temp.includes(j._id))
      })?.filter((j: any) => {
        const today = dayjs().startOf('day');
        if (dayjs(j?.start_date)?.isAfter(dayjs())  || (dayjs(j.start_date).isSame(today, 'day'))) {
        return j;
        }
        // dayjs(j?.start_date)?.isAfter(dayjs())
      })
      console.log(defValue,"defValue")
      if(activeyear != "" || activeyear != undefined){
        setYear(activeyear)
      }
      else{ 
        setYear(defValue[0]?._id)
      }
      //setYear(defValue[0]?._id)
      // setYear(calenderData?.data[0]?._id)
  }, [calenderData,appraisalCalendarData]);

  // for getting the calendar id that is not live
  useEffect(() => {
    if (appraisalCalendarData !== undefined) {
      let filteredData = appraisalCalendarData?.data?.filter((item: any) => {
        return item?.status === "active" && item?.calendar != undefined;
        // return item.calendar != undefined
      });
      let temp = filteredData?.map((i: any) => {
        return i?.calendar?._id;
      });
      if (year == "") {
        /* calendar which is only draft and which has start date as of today or after today. */
        let calendars = calenderData?.data?.filter((cal: any) => !temp?.includes(cal._id))?.filter(
          (j:any) =>{
            const today = dayjs()?.startOf('day');
            dayjs(j?.start_date).isAfter(dayjs()) || (dayjs(j.start_date).isSame(today, 'day'))
          }
        );
        const filteredData = calenderData?.data
        .filter((cal: any) => !temp.includes(cal._id))
        .filter((j: any) => {
          const startDate = new Date(j?.start_date);
          return startDate.toISOString().slice(0, 10) >= today.toISOString().slice(0, 10) && 
          (j.status === "draft" || j.status === "Draft");
        });
        console.log(filteredData,calendars,"bciubciubcicieciueciuwttttt")
        if (filteredData?.length > 0){
          console.log(filteredData,calendars,"bciubciubcicieciueciuw")
          setYear(filteredData[0]?._id)}
      }
      setActiveAppId(temp);
    }
  }, [appraisalCalendarData,calenderData]);
console.log(year,"yearyear")
  console.log(appraisalCalendarData, "activeAppId");
  useEffect(() => {
    if (year && appraisalCalendarData) {
      let temp1 = appraisalCalendarData?.data?.filter((calendar: any) => {
        return calendar?.calendar?._id == year;
      })
      console.log(temp1, "yearrrrr");
      setMappedTemplates(temp1);
      let temp2 = temp1?.map((i: any) => {
        console.log(i, "iiiiiiii");
      });
    }
  }, [year, appraisalCalendarData]);

  if (isDataLoading) {
    return <div>Loading...</div>;
  }
  
  
  if (calenderData && yearArray.length === 0) {
    let temp = calenderData?.data?.map((item: any) =>
      dayjs(item?.start_date)?.format("YYYY")
    );
    let years = [...new Set(temp)];
    setYearArray(years);
  }

 

  // const handleClickClose = () => {
  //     setOpen(false);
  //     setSelectedCalendar(null);
  // };
  // const handleClickOpen = (calendar: any) => {
  //     setOpen(true);
  //     setSelectedCalendar(calendar)
  // };

  // const handleClickIdClose = () => {
  //     if (selectedCalendar) {
  //         deleteAppraisalCalenderHandler(selectedCalendar._id)
  //     }
  // };

  // const deleteAppraisalCalenderHandler = (id: string) => {
  //     console.log('clicked')
  //     setOpen(false);
  //     deleteAppraisalCalender(
  //         id
  //     )
  //     setSelectedCalendar(null);
  //     // .then(() => refetch())
  // }
 
  const handleOnCheck = (e: any) => {
  
    setnavPrompt(true);
    settriggerTheNav(true);
    setUncheck(false);
    const { name, checked } = e.target;
const checccck = e.target.name
setcheck(checccck)

const dataOfTemplate = template
?.filter((item: any) => {                      
  return item?.weightage != "" && item?.status_template == "Completed" && item?.template_active_status == true;
})
?.filter((filteredName: any) => {
  if (searchName === "") {
    return filteredName;
  } else if (
    filteredName?.name
      ?.toLocaleLowerCase()
      ?.includes(searchName?.toLocaleLowerCase())
  ) {
    return filteredName;
  }
})
.filter((i: any) => {
  return !mappedTemplates
    ?.map((item: any) => item?.template?._id)
    ?.includes(i._id);
})?.map((j: any) => j._id);
// console.log(dataOfTemplate,template,"datadata")

    if (name === "allSelect") {
      const tempUser = template.map((employee: any) => {
        return dataOfTemplate.includes(employee._id)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      console.log(dataOfTemplate,template,tempUser,"datadata")
      // const tempUser = template
      // ?.filter((item:any) => item?.weightage !== "" && item?.status_template === "Completed" && item?.template_active_status)
      // ?.filter((filteredName:any) => searchName === "" || filteredName.name.toLowerCase().includes(searchName.toLowerCase()))
      // ?.filter((i:any) => !mappedTemplates?.map((item:any) => item?.template?._id).includes(i._id))
      // ?.map((other: any) => {
      //   return { ...other, isChecked: checked };
      // });
      setTemplate(tempUser);
       
    } else {
      console.log(template, "isLoading");
      // const tempUser = template?.filter((other: any) => {
      //   return other._id === name 
      // }).map((emp:any)=>{
      //   return  emp._id 
      //     ? { ...emp, isChecked: checked }
      //     : emp;
      // })
      const tempUser = template.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setTemplate(tempUser);
      console.log(tempUser,name, "temptemp");
      console.log(dataOfTemplate,template,tempUser,"datadata")
    }
  };
  console.log(template, "isLoading");
  //for mapped all select
  // const handleOnCheckMapped = (e: any) => {
  //   setnavPrompt(true);
  //   settriggerTheNav(true);
  //   setUncheck(false);
  //   const { name, checked } = e.target;
  //   console.log( mappedTemplates,"handleOnCheckMapped")
  //   console.log( name, checked,"handleOnCheckMapped")
  //    const checccck = e.target.name
  //    setcheck(checccck)
  //   if (name === "allSelect") {
  //          const tempUser = mappedTemplates.map((i: any) => {
  //           const updatedTemplate = { ...i.template, isChecked: checked };
  //           return { ...i, template: updatedTemplate };
  //         });
  //     console.log(tempUser, "handleOnCheckMapped");
  //     setMappedTemplates(tempUser);

  //   } else {
  //     console.log(template, "isLoading");
  //     const tempUser = mappedTemplates?.map((other: any) => {
  //       console.log(other, "handleOnCheckMapped");
  //       return other.template._id === name ? { 
  //         ...other, 
  //         template: {
  //           ...other.template,
  //           isChecked: checked
  //         }
  //       } : other;
  //     });
  //     setMappedTemplates(tempUser);
  //     console.log(tempUser, "handleOnCheckMapped");
  //   }

  // };

// const checkedCounts = mappedTemplates.reduce((acc:any, i:any) => {
//   if (i.template.isChecked === true) {
//     return acc + 1;
//   }
//   return acc;
// }, 0);
// console.log(checkedCounts,"handleOnCheckMappedCount");



  // const handleEdit = (pacalendar: any) => {
  //     setSelectedCalendar(pacalendar);
  //     setShowEdit(true)
  // }
  // useEffect(() => {
  //   if(uncheck == true){
  //     const tempUser = template.map((other: any) => {
  //       return other._id === name ? { ...other, isChecked: false } : other;
  //     });
  //     setTemplate(tempUser);
  //   }
  // },[uncheck])
  const handleCancelButton = () =>{
    if (checkboxHandler(checkboxHandler(template))?.length > 0) {
    setdialogActive(true)
    setDialogMsg("Are you sure you wish to cancel the changes?")
    }else{
      setdialogActive(false)
    }
  }
  const handleCancel = () => {
    setSelectedCalendar(null);
    settriggerTheNav(false);
    setnavPrompt(false);
    setUncheck(true);
    // if(uncheck == true){
          const tempUser = template?.map((other: any) => {
            // return other._id === check ? { ...other, isChecked: false } : other;
            return { ...other, isChecked: false };
          });
          setTemplate(tempUser);
        // }
    // setShowEdit(false)
  };
  const hideAlertHandler = () => {
    setTimeout(() => {
      setError(false);
      setSuccess(false);
    }, 5000);
  };
  const saveHandler = (pacalendar: any) => {
    console.log(termEdit);
    updateAppraisalCalendar({
      template: pacalendar.template._id,
      calendar: termEdit,
      id: pacalendar._id,
    }).then((datat: any) => {
      console.log(datat, "datat");
      if (datat.error) {
        setErrorMessage(
          datat.error.data.message + " for template " + pacalendar.template.name
        );
        setError(true);
        setSuccess(false);
        hideAlertHandler();
      } else if (datat.data) {
        if (datat.data.success) {
          setSuccess(true);
          setError(false);
          setMessage("")
        }
        hideAlertHandler();
      }
      setSelectedCalendar(null);
      // setShowEdit(false)
    });
  };
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      return res.map((i: any) => {
        return { id: i._id, name: i.name };
      });
    }
  };
console.log(checkboxHandler(checkboxHandler(template))?.length,"checkboxHandler")
  const onSubmit = () => {
    const Calendar = calenderData &&
      activeAppId !== undefined &&
      calenderData?.data?.filter((j: any) => {
        return !activeAppId?.includes(j._id);
      }).filter((j: any) => {
        const today = dayjs().startOf('day');
        return (dayjs(j?.start_date)?.isAfter(dayjs()) || (dayjs(j.start_date).isSame(today, 'day')))
      })
    if (checkboxHandler(checkboxHandler(template))?.length == 0) {
      setOpen1(true);
      setMessage("Please select a Template.");
    }
    else if(Calendar?.length === 0){
      setOpen1(true);
      setnavPrompt(false);
      setMessage("No calendar has been created.");
    }
  else  if (navPrompt === true && year !== "") {
    localStorage.setItem("activeyear", year);
    const tempUser = template.map((other: any) => {
      return { ...other, isChecked: false };
    });
    setTemplate(tempUser);
      checkboxIdHandler(checkboxHandler(template))?.forEach((element: any) => {
        createAppraisalCalender({
          template: element.id,
          calendar: year,
        }).then((datat: any) => {
          console.log(datat, "datat");
          setMessage("")
          setOpen1(true);
          setSuccess(true);
          setError(false);
          // hideAlertHandler();
          setnavPrompt(false);
          settriggerTheNav(false);

          // if (datat.error) {
          //   setErrorMessage(
          //     datat.error.data.message + " for template " + element.name
          //   );
          //   setError(true);
          //   setSuccess(false);
          //   hideAlertHandler();
          // } else if (datat.data) {
          //   if (datat.data.success) setSuccess(true);
          //   setError(false);
          //   hideAlertHandler();
          //   setnavPrompt(false);
          // }
        });
      });
    } else {
      if (year === "") {
        setOpen1(true);
        setMessage("Please select a Calendar.");
      } 
      // else {
      //   if (checkboxHandler(checkboxHandler(template))?.length == 0) {
      //     setOpen1(true);
      //     setMessage("Please select a Template.");
      //   }
      // }
    }
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 200,
        fontSize: "14px !important",
        fontFamily: "Arial",
        color: "#333333",
      },
    },
  };
//for all select functionality
const allTemplatesData = template
?.filter((item: any) => {                      
  return item?.weightage != "" && item?.status_template == "Completed" && item?.template_active_status == true;
})
.filter((filteredName: any) => {
 if (searchName === "") {
    return filteredName;
  } else if (
    filteredName?.name
      ?.toLocaleLowerCase()
      ?.includes(searchName?.toLocaleLowerCase())
  ) {
    return filteredName;
  }
})
.filter((i: any) => {
  return !mappedTemplates
    ?.map((item: any) => item?.template?._id)
    ?.includes(i._id);
})
const allTemplates = allTemplatesData?.length
const templatesChecked = allTemplatesData?.filter((i:any)=>{
  return i?.isChecked == true;
})?.length
console.log(allTemplates,"allsel",templatesChecked)
//alternate 
// const filteredData = calenderData.data.filter((j: any) => {
//   const startDate = new Date(j.start_date);
//   return startDate.toISOString().slice(0, 10) >= today.toISOString().slice(0, 10) && 
//   (j.status === "draft" || j.status === "Draft");
// });
const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setSearchName(e.target.value);
     
    }
const templateDataCount = template
?.filter((item: any) => {                      
  return item?.weightage != "" && item?.status_template == "Completed" && item?.template_active_status == true;
})
?.filter((filteredName: any) => {
  if (searchName === "") {
    return filteredName;
  } else if (
    filteredName?.name
      ?.toLocaleLowerCase()
      ?.includes(searchName?.toLocaleLowerCase())
  ) {
    return filteredName;
  }
})
?.filter((i: any) => {
  return !mappedTemplates
    ?.map((item: any) => item?.template?._id)
    ?.includes(i._id);
})?.length
console.log(templateDataCount,"templateDataCount")
  return (
    <>
      {" "}
      <PAMaster name={"Create Calendar Mapping"} />
      <div style={{ background: "#F1F1F1", height: "auto" }}>
      <Box
         sx={{
        //   maxWidth: "95% !important",
        //   width: "100%",
          height: "auto",
          backgroundColor: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px",
          marginBottom:"25px"
          // marginTop: "2px",
        }}
      >
        {emptyData ? (
          <>
            {"There is no Appraisal Calendar created!"}
          </>
        ) :
        // : (
        //   ""
        // )}
        <>
        {/* <div style={{ paddingTop: "15px",padding:"0px"}} >No calendar has been created!</div> */}
        <div style={{ paddingTop: "15px", position: "absolute", width: "91%" }}>
          {/* {error && <Alert severity="error">{errorMessage}</Alert>} */}

          {template?.length === 0 ? (
            <Alert severity="error">There is no template created !</Alert>
          ) : (
            ""
          )}
          <div style={{ width: "50%" }}>
            <Dialog
              open={open1}
              onClose={handleClose1}
              // BackdropProps={{
              //   style: { background: "#333333 !important", opacity: "10%" },
              // }}
              PaperProps={{
                style: {
                  // borderColor:'blue',
                  //border:'1px solid',
                  boxShadow: "none",
                  borderRadius: "6px",
                  //marginTop: "155px",
                  maxWidth: "0px",
                  minWidth: "26%",
                  margin: "0px",
                  padding: "30px",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
            >
              {/* <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                id="alert-dialog-title"
              >
                <IconButton onClick={handleClose1}>
                  <img src={Closeicon} alt="icon" />
                </IconButton>
              </DialogTitle> */}
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    wordBreak: "break-word",
                    // height: "100px",
                    //width: "300px",
                    alignItems: "center",
                    overflowY:"hidden",
                  }}
                >
                  {success && (
                    <div>
                      Templates are successfully mapped to a calendar.
                    </div>
                  )}
                  {message && (
                    <div>
                      {message}
                    </div>
                  )}
                  {template?.length === 0 ? (
                    <div >There is no template created.</div>
                  ) : (
                    ""
                  )}
                </DialogContentText></DialogContent>

              <DialogActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    // marginRight: "10px",
                    background:"transparent",
                          width: "70px",
                        height: "35px",
                        color:"#3e8cb5"
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={handleClose1}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div style={{ paddingTop: "10px" }}>
          {/* <Stack
          style={{ paddingTop: "10px" }}
          direction="row"
          justifyContent="end"
        >
          {/* <span
                        style={{
                            fontSize: "22px",
                            fontWeight: "400",

                            color: "#004C75",
                        }}
                    >
                        Mapped Templates
                    </span> */}
          {/* {success && (
            <Box style={{ backgroundColor: "#eff8ef" }}>
              <p
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  color: "#7ec580",
                }}
              >
                Templates are successfully linked to a calendar
              </p>
            </Box>
          )}
          {error && <Alert severity="error">{errorMessage}</Alert>}
          <Stack
            direction="row"
            justifyContent="end"
            sx={{ display: "flex", justifyContent: "end" }}
          >
            {template && checkboxHandler(template).length == 0 && (
              <Box style={{ paddingTop: "6px", backgroundColor: " #fdf9f2" }}>
                {/* <span
                                    style={{
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        color: "#585858",
                                    }}
                                >
                                    Select at least one template to link calendar
                                </span> */}
          {/* </Box>
            )} */}
          {/*
            <Link to={MAPPED_TEMPLATE_2}>
                            <Button
                                style={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    fontFamily: "sans-serif",
                                    padding: "2px 9px",
                      
                                    borderColor: "#004C75",
                                    color: "#004C75",
                                  }}
                                  variant="outlined"
                            >
                                View Calendar
                            </Button>
                        </Link> */}
          {/* </Stack> 
        </Stack>  */}
          {showemptyVal === true && <div>No calendar has been created.</div>}
          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <div>
              <FormControl
                fullWidth
                size="small"
                  
                >
              {/* <InputLabel  id="demo-simple-select-autowidth-label">
                  Select
                </InputLabel> */}
                <Select
                  
                  sx={{
                    width: "90%",
                    "& .MuiInputBase-input": {
                      // color: "rgb(62 140 181 / 28%)",
                      fontSize: "14px",
                      textTransform: "none",
                      fontFamily: "Arial",
                      color: "#333333",
                    },
                  }}
                  // labelId="demo-select-small"
                  // id="demo-select-small"
                  // label="Select"
                  displayEmpty
                  variant="outlined"
                  size="small"
                  value={year}
                  // variant="standard"
                   MenuProps={MenuProps}
                   renderValue={
                    year !== ""
                      ? undefined
                      : () => <div style={{ color: "#aaa" }}>Select</div>
                  }
                  onChange={(e: { target: { value: any } }) => {
                    if(triggerTheNav === false){ 
                      setYear(e.target.value);
                    }else{
                      setTabNav(true);
                      setTabNum(e.target.value)
                    }
                   
                    // setShowCalendarError(false)
                    //setnavPrompt(true);
                  }}
                // error={!year && textfeildError}
                // helperText={!year && textfeildError ? "*Name required." : " "}
                >
                  {calenderData &&
                    activeAppId !== undefined &&
                    calenderData?.data
                      .filter((j: any) => {
                        return !activeAppId?.includes(j._id);
                        //   let temp = activeAppId?.map((i:any)=>{

                        //    return i
                        //    })

                        //  return (!temp.includes(j._id))
                      })
                      ?.filter((j:any) => {
                        // return j?.isActive === false                       
                        return j?.status === "draft" || j?.status === "Draft"
                      })
                      ?.map((j: any) => {
                        const today = dayjs()?.startOf('day');
                        if (dayjs(j.start_date)?.isAfter(dayjs()) || (dayjs(j?.start_date).isSame(today, 'day')))
                         {
                          return (
                            <MenuItem
                              key={j?._id}
                              sx={{
                                height: "30px",
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                              }}
                              value={j?._id}
                            >
                              <div>{j?.name}</div>
                            </MenuItem>
                          );
                        }
                      })}
                </Select>
                </FormControl>
              </div>
              {/* <div style={{ paddingTop: "50px", paddingLeft: "15px" }}>
                <Typography
                  sx={{
                    fontFamily: "arial",
                    fontSize: "18px",
                    color: "#333333",
                    fontWeight: "600",
                  }}
                >
                  Mapped Templates
                </Typography>
              </div>

              {mappedTemplates && mappedTemplates.map((name: any) => {
                return (
                  <Stack paddingLeft="20px" paddingTop="20px" spacing={2}>
                    <Typography
                      sx={{
                        fontFamily: "arial",
                        fontSize: "16px",
                        color: "#333333",
                      }}
                    >
                      {name?.template?.name}
                    </Typography>

                  </Stack>
                )
              })} */}
              {mappedTemplates &&
                <div style={{ paddingTop: "57px", paddingLeft: "3px" }}>
                   <div
                style={{
                  display:"flex"
                }}
                >
                   {/* <input
                                 name="allSelect"
                                checked={
                                  checkedCounts === mappedTemplates?.length
                                }
                                onChange={(e: any) => handleOnCheckMapped(e)}
                                type="checkbox"
                                style={{
                                  height: "17px",
                                  width: "17px",
                                  borderColor: "#D5D5D5",
                                }}
                              /> */}
                  <Typography
                    sx={{
                      color: "#333333",
                      fontFamily: "Arial",
                      fontSize: "14px",
                      fontWeight: "600",
                      
                      // bgcolor: "#eaeced"
                      // width: "40%",
                    }}
                  >
                    Mapped Templates
                  </Typography>
                  <div
                style={{
                  paddingTop:"3px",
                  paddingLeft:"5px"
                }}
                >
                {deleteAppraisalCalenderLoading && <CircularProgress size={15} thickness={7} />}
                </div>
                </div>
                  <TableContainer>
                    <Scroll>
                      <CustomScrollbar
                        style={{ width: "100%", height: "calc(100vh - 320px)" }}
                      >
                        <Table size="small" aria-label="simple table">
                          {/* <TableHead
                            style={{
                              position: "sticky",
                              zIndex: "1000",
                              top: "0px",
                            }}
                          >
                            <TableRow sx={{ bgcolor: "#ffffff" }}>
                              <TableCell
                                sx={{
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  width: "40%",
                                }}
                                align="left"
                              >
                                Mapped Templates
                              </TableCell>

                              <TableCell
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "#F7F9FB",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  width: "20%",
                                }}
                                align="center"
                              >
                                Action
                              </TableCell>
                            </TableRow>
                          </TableHead> */}
                          {mappedTemplates &&
                            mappedTemplates?.map((appCalendar: any) => {
                              console.log(appCalendar,"appCalendar")
                              return (
                                <TableBody key={appCalendar?.template?._id}>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        borderColor: "#lightgrey",
                                      },
                                    }}
                                  >
                                    {/* <TableCell
                                     width="15%"
                                    >
                                    <input
                                 name={appCalendar?.template?._id}
                                 checked={appCalendar?.template?.isChecked}
                                onChange={(e: any) => handleOnCheckMapped(e)}
                                type="checkbox"
                                style={{
                                  height: "17px",
                                  width: "17px",
                                  borderColor: "#D5D5D5",
                                }}
                              />
                                    </TableCell> */}
                                    <TableCell
                                      width="40%"
                                      style={{
                                        fontSize: "14px",
                                        // color: "#333333",
                                        color :appCalendar?.positionCount == "" ? "#3e8cb5" : "#333333",
                                        fontFamily: "Arial",
                                      }}
                                      align="left"
                                    >
                                      {appCalendar?.template?.name}
                                    </TableCell>

                                    <TableCell
                                      width="20%"
                                      sx={{ fontSize: "14px", color: "#333333" }}
                                      align="center"
                                    >
                                      <Tooltip title="Edit">
                                        {/* <Link to={`${MAPPED_TEMPLATE_EDIT}/${calendar._id}`} state={{ from: `${calendar.calendar._id}`, name: `${calendar.calendar.name}` }}> */}
                                        {/* <Link to={`${MAPPED_TEMPLATE_3}/${calendar.template._id}`} */}
                                        <Link
                                          to={`${VIEW_MAPPED_TEMPLATE}/${appCalendar?._id}`}
                                          state={{
                                            from: `${appCalendar?.calendar?._id}`,
                                            tempName: `${appCalendar?.template?.name}`,
                                            component:"createTemplate"
                                          }}
                                        >
                                          <IconButton aria-label="EditIcon">
                                            <img src={Edit} alt="icon" />
                                          </IconButton>
                                        </Link>
                                      </Tooltip>

                                      <Tooltip title="Unmap Template">
                                        <Button
                                          aria-label="CancelOutlinedIcon "
                                          // disabled={calendar.status === "active"}
                                          style={{
                                            textTransform: "none",
                                            fontSize: "13px",
                                            fontFamily: "Arial",
                                            borderColor: "#3E8CB5",
                                            color: "#3E8CB5",
                                            background: "transparent",
                                            width: "70px",
                                            height: "35px"

                                          }}
                                          onClick={() =>
                                            {handleClickOpen(
                                              appCalendar,
                                              appCalendar._id
                                            )
                                            localStorage.setItem("activeyear", year);
                                          }
                                          }
                                        >
                                          Unmap
                                          {/* <img src={Close} alt="icon" /> */}
                                        </Button>
                                      </Tooltip>
                                      <AlertDialogUnmap

                                        isAlertOpen={open}
                                        handleAlertOpen={() =>
                                          handleClickOpen(
                                            appCalendar,
                                            appCalendar._id
                                          )
                                        }
                                        handleAlertClose={handleClickClose}
                                        handleAlertIdClose={handleClickIdClose}
                                        rowAlert={appCalendar?._id}
                                      >
                                        Are you sure you wish to unmap this template?
                                      </AlertDialogUnmap>
                                      {/* <Tooltip title="View Employee Mapping"> */}
                                      {/* <Link to={`${MAPPED_TEMPLATE_3}/${calendar.template._id}`}> */}
                                      {/* <Link to={`${FILTERED_TEMPLATES_SINGLE}/${calendar.template._id}`}  state={{
                                  from: `${calendar.template._id}`,
                                  name: `${calendar.calendar.name}`,
                                }}> */}
                                      {/* <IconButton aria-label="EditIcon">
                                <img src={Eye} alt="icon" />
                              </IconButton> */}
                                      {/* </Link> */}

                                      {/* </Tooltip> */}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              );
                            })}
                        </Table>
                      </CustomScrollbar>
                    </Scroll>
                  </TableContainer>
                </div>
              }
              {/* <p style={{ paddingTop: "10px" }}>Recently Added</p>
                        <TableContainer>
                            <Scrollbar style={{ width: "100%", height: "calc(100vh - 510px)" }}>
                                <Table size="small" aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                                            <TableCell
                                                sx={{
                                                    fontFamily: "regular",
                                                    borderColor: "#F7F9FB",
                                                    color: "#004C75",
                                                    fontSize: "14px",
                                                }}
                                                align="left"
                                            >
                                                Template Name
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily: "regular",
                                                    borderColor: "#F7F9FB",
                                                    color: "#004C75",
                                                    fontSize: "14px",
                                                }}
                                                align="left"
                                            >
                                                Year <ArrowDropDownIcon sx={{
                                                    verticalAlign: "middle"
                                                }} />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily: "regular",
                                                    borderColor: "#F7F9FB",
                                                    color: "#004C75",
                                                    fontSize: "14px",
                                                }}
                                                align="left"
                                            >
                                                Term <ArrowDropDownIcon sx={{
                                                    verticalAlign: "middle"
                                                }} />
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontFamily: "regular",
                                                    borderColor: "#F7F9FB",
                                                    color: "#004C75",
                                                    fontSize: "14px",
                                                }}
                                                align="right"
                                            >
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentAppraisalCalendars && recentAppraisalCalendars.data.filter((pacalendar: any) => pacalendar.calendar != null && pacalendar.template != null).map((pacalendar: any) => {
                                            return (
                                                <>
                                                    {(!showEdit || (selectedCalendar && selectedCalendar._id !== pacalendar._id)) &&
                                                        < TableRow
                                                            key={pacalendar._id}
                                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                        >
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    color: "#33333",
                                                                    opacity: "80%",
                                                                    fontFamily: "regular",
                                                                }}
                                                                align="left"
                                                            >
                                                                {pacalendar.template.name}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    color: "#33333",
                                                                    opacity: "80%",
                                                                    fontFamily: "regular",
                                                                }}
                                                                align="left"
                                                            >
                                                                {pacalendar.calendar.start_date ? new Date(pacalendar.calendar.start_date).getFullYear() : new Date().getFullYear()}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    color: "#33333",
                                                                    opacity: "80%",
                                                                    fontFamily: "regular",
                                                                }}
                                                                align="left"
                                                            >
                                                                {pacalendar?.calendar?.name}
                                                            </TableCell>
                                                            <TableCell
                                                                sx={{ fontSize: "14px", color: "#7A7A7A" }}
                                                                align="right"
                                                            >
                                                                <Tooltip title="Edit">
                                                                    <IconButton aria-label="EditIcon"
                                                                        disabled={pacalendar.status === "active"}
                                                                        onClick={() => handleEdit(pacalendar)}
                                                                    >
                                                                        <img src={Edit} alt="icon" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="CancelOutlinedIcon "
                                                                        disabled={pacalendar.status === "active"}
                                                                        onClick={() => handleClickOpen(pacalendar)}
                                                                    >
                                                                        <img src={Close} alt="icon" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <AlertDialog
                                                                    isAlertOpen={open}
                                                                    handleAlertOpen={() =>
                                                                        handleClickOpen(pacalendar)
                                                                    }
                                                                    handleAlertClose={handleClickClose}
                                                                    handleAlertIdClose={handleClickIdClose}
                                                                    rowAlert={pacalendar}
                                                                >
                                                                    Are you sure you wish to delete this item?
                                                                </AlertDialog>
                                                            </TableCell>
                                                        </TableRow>}
                                                    {(showEdit === true) && (selectedCalendar && selectedCalendar._id === pacalendar._id) && (<TableRow
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell
                                                            sx={{
                                                                fontSize: "14px",
                                                                color: "#33333",
                                                                opacity: "80%",
                                                                fontFamily: "regular",
                                                            }}
                                                            align="left"
                                                        >
                                                            {pacalendar?.template && `${pacalendar?.template.name}`}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                fontSize: "14px",
                                                                color: "#33333",
                                                                opacity: "80%",
                                                                fontFamily: "regular",
                                                            }}
                                                            align="left"
                                                        >
                                                            <TextField
                                                                style={{ width: "50%" }}
                                                                placeholder="Select"
                                                                select size="small"
                                                                value={year}
                                                                onChange={(e) => setYear(e.target.value)}
                                                            >
                                                                {yearArray.map((i: any, index: any) => {
                                                                    return (
                                                                        <MenuItem key={index} value={i}>
                                                                            {i}
                                                                        </MenuItem>
                                                                    )
                                                                })}
                                                            </TextField>

                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                fontSize: "14px",
                                                                color: "#33333",
                                                                opacity: "80%",
                                                                fontFamily: "regular",
                                                            }}
                                                            align="left"
                                                        >
                                                            <TextField style={{ width: "60%" }}
                                                                select size="small"
                                                                placeholder="Select"
                                                                value={term}
                                                                onChange={(e) => setTermEdit(e.target.value)}>
                                                                {calenderData &&
                                                                    calenderData.data.map((i: any) => {
                                                                        return (
                                                                            <MenuItem key={i._id} sx={{ height: "16px" }} value={i._id}>
                                                                                <div>{i.name}</div>
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </TextField>
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{ fontSize: "14px", color: "#7A7A7A" }}
                                                            align="right"
                                                        >
                                                            <Stack
                                                                alignItems="right"
                                                                direction="row"
                                                                justifyContent="right"
                                                                spacing={0}

                                                            >

                                                                <Button
                                                                    style={{
                                                                        borderRadius: "4px",
                                                                        textTransform: "none",
                                                                        backgroundColor: "#004D77",
                                                                        fontSize: "14px",
                                                                        fontFamily: "sans-serif",
                                                                        padding: "2px 5px",
                                                                    }}
                                                                    variant="contained"
                                                                    onClick={() => saveHandler(pacalendar)}
                                                                >
                                                                    Save
                                                                </Button>

                                                                <Button
                                                                    style={{
                                                                        textTransform: "none",
                                                                        fontSize: "12px",
                                                                        fontFamily: "sans-serif",
                                                                        padding: "2px 5px",
                                                                    }}
                                                                    onClick={() => handleCancel()}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>)}
                                                </>)


                                        })}


                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </TableContainer> */}
              {/* <div style={{ display: "flex", justifyContent: "center" }}>
                            <Link to={CREATE_CALENDER}>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        backgroundColor: "#014D76",

                                    }}
                                    variant="contained"
                                    size="small"
                                >
                                    View PA Calendar
                                </Button>
                            </Link>
                        </div> */}
            </Grid>
            <Grid sx={{ paddingTop: "5px !important" }} item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  // paddingTop: "10px",
                  height: "calc(100vh - 190px)",
                  // boxShadow: "0px 0px 4px 2px #8080802e",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  height="40px"
                  paddingTop="10px"
                  paddingBottom="20px"
                >
                  <Typography style={{ paddingLeft: "20px" }}>
                    <Searchfeild>
                      <TextField
                        id="outlined-basic"
                        placeholder="Search Here..."
                        autoComplete="off"
                        onChange={handleSearchBar}
                       // onChange={(e) => setSearchName(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <img src={Searchicon} alt="icon" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Searchfeild>
                  </Typography>

                  <div
                    style={{
                      paddingRight: "20px",
                    }}
                  >
                    <Stack
                      alignItems="left"
                      direction="row"
                      justifyContent="left"
                      spacing={2}
                    >
                      <Button
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          width: "70px",
                          height: "35px"

                        }}
                        variant="outlined"

                        onClick={() => onSubmit()}
                      >
                        Save
                      </Button>

                      <Button
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          width: "70px",
                          height: "35px"

                        }}
                        variant="outlined"

                        onClick={() => handleCancelButton()}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </div>
                </Stack>
                {/* <div
                style={{
                  display:"flex"
                }}
                >
                <Typography
                  sx={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    paddingLeft: "20px",
                    paddingBottom: "15px",
                    paddingTop: "37px",
                    // fontWeight: "600",
                  }}
                >
                  <b>Unmapped Templates</b>
                </Typography>
                <div
                style={{
                  paddingTop:"40px",
                  paddingLeft:"5px"
                }}
                >
                {createAppraisalCalenderLoading && <CircularProgress size={15} thickness={7} />}
                </div>
                </div> */}
                <Scroll>
                  <CustomScrollbar style={{ height: "calc(100vh - 275px)" }}>
                  {templatesAvailable?.length > 0 && 
                  <div style={{
                      display:"flex",
                      paddingLeft:"40px",
                      paddingBottom:"14px",
                      paddingTop: "37px",
                    }}>
                  <input
                                name="allSelect"
                                checked={
                                  allTemplates !== 0 && allTemplates === templatesChecked
                                 }
                                 onChange={(e: any) => handleOnCheck(e)}
                                type="checkbox"
                                style={{
                                  height: "17px",
                                  width: "17px",
                                  borderColor: "#D5D5D5",
                                }}
                              />
                            
                          
                <Typography
                  sx={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    paddingLeft: "10px",
                    paddingTop: "2px",
                  }}
                >
                  <b>Unmapped Templates</b>
                </Typography>
                <div
                style={{
                  paddingTop:"4px",
                  paddingLeft:"10px"
                }}
                >
                {createAppraisalCalenderLoading && 
                <CircularProgress size={15} thickness={7} />
                }
                </div>
              
                             
                              </div>}
                               {templatesAvailable?.length == 0
                               && 
                                <div
                                 style={{ fontWeight: 'bold',border:"none", paddingLeft: "22px",
                                 color:"#808080",fontSize:"14px",fontFamily:"arial",display:"flex",width:"max-content"}}
                                >
                                "No data available"</div>
                                 } 
                    {template
                      ?.filter((item: any) => {                      
                        return item?.weightage != "" && item?.status_template == "Completed" && item?.template_active_status == true;
                      })
                      ?.filter((filteredName: any) => {
                        //  Sushma 6/27
                        // to implement search for templates

                        if (searchName === "") {
                          return filteredName;
                        } else if (
                          filteredName?.name
                            ?.toLocaleLowerCase()
                            ?.includes(searchName?.toLocaleLowerCase())
                        ) {
                          return filteredName;
                        }
                      })
                      .filter((i: any) => {
                        return !mappedTemplates
                          ?.map((item: any) => item?.template?._id)
                          ?.includes(i._id);
                      })
                      ?.map((j: any, index: any) => {
                        console.log(j, "jjj");

                        return (
                          <>
                            <div
                              key={index}
                              style={{
                                // borderBottom: "1px solid lightgray",
                                paddingLeft: "40px",
                                paddingBottom: "15px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                             
                              <input
                                name={j?._id}
                                checked={
                                  uncheck === true
                                    ? false
                                    : j?.isChecked || false
                                }
                                onChange={(e: any) => handleOnCheck(e)}
                                type="checkbox"
                                style={{
                                  height: "17px",
                                  width: "17px",
                                  borderColor: "#D5D5D5",
                                }}
                              />
                              <div
                                style={{
                                  fontSize: "14px",
                                  paddingLeft: "2px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  maxWidth: "90%",
                                  wordBreak: "break-all",
                                }}
                              >
                                {j?.name}
                              </div>
                            </div>{" "}
                          </>
                        );
                      })}
                  </CustomScrollbar>
                </Scroll>
              </Paper>
            </Grid>
          </Grid>
        </div>
        </>
}
        <AlertDialogSuccess
            isAlertOpen={tabNav}
            handleAlertClose={handleAlertNo}
            handleAlertYes={handleAlertYes}>
            Please save the changes before you leave the page.
            {/* If you leave the page, your changes will be discarded. */}
          </AlertDialogSuccess>
          {/* <AlertDialogSuccess
            isAlertOpen={dialogActive}
            handleAlertClose={handleDialogClose}
           
            >
         
          {dialogMsg}
          </AlertDialogSuccess> */}
          <AlertAcceptDialog
            isAlertOpen={dialogActive}
            handleAlertClose={handleAcceptChanges}
            handleAlertIdClose={handleDialogClose}
          >
            {dialogMsg}
          </AlertAcceptDialog>
      </Box>
      </div>
    </>
  );
};

export default LinkCalendar;
