import React, { SyntheticEvent, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Stack from "@mui/material/Stack";
import { Container, FormControl, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { fontSize, textAlign } from "@mui/system";
import Typography from "@mui/material/Typography";
import { CALENDER_VIEWPAGE, CREATE_CALENDER, MASTER_NAV } from "../../../constants/routes/Routing";
import { Link,useLocation } from "react-router-dom";
import PAMaster from "../../UI/PAMaster";
import { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import Downarrowicon from "../../../assets/Images/Downarrowicon.svg";
import Uparrowicon from "../../../assets/Images/Uparrowicon.svg";
import Deleteredicon from "../../../assets/Images/Deleteredicon.svg";
import Addmore from "../../../assets/Images/Addmore.svg";
import Tooltip from "@mui/material/Tooltip";
// import DatePicker from "react-datepicker";
// import { DatePicker } from "./extendCalendar";
import { Scrollbar } from "react-scrollbars-custom";
import { Alert } from "@mui/material";
import { AnyArray } from "immer/dist/internal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Co2Sharp, FormatListNumberedRtlTwoTone } from "@mui/icons-material";
import { stubFalse } from "lodash";
import { AlertDialog } from "../..";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import { addDays, eachDayOfInterval } from "date-fns";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { parseISO } from "date-fns/esm/fp";
import { isAfter, isBefore, subDays } from "date-fns";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { useBlocker, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
// import { Blocker } from "history";

const Textfld = styled("div")({
  "& .MuiInputBase-input": {
    maxHeight: "0px",
    minHeight: "10px",
    width: "225px",
    fontSize: "14px",
    fontFamily: "arial"
  },

});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
//prompt -------functions
/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */

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
    const unblock = navigator?.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}
/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
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

const Text = styled("div")({
  "& .MuiOutlinedInput-root": {
    height: "30px",
  },
});

const AddButton = styled(Button)({
  textTransform: "none",
  // color: "#ffffff",
  color: "#004C75",
  borderColor: "#004C75",
  borderRadius: 8,
  padding: "6px 25px",
  fontFamily: "regular",
  //backgroundColor: " rgb(1, 77, 118)",
  "&:hover": {
    borderColor: "#004C75",
  },
  "&:active": {},
  "&:focus": {},
});

const CalendarView = (props: any) => {

  const { onSubmit, defaultValue, error1, error2, openSuccess, handleClickCloseSuccess, from } = props;
  console.log(defaultValue, "error2");
  const [startDateAppraiser, setStartDateAppraiser] = useState<any>("");
  // const [editerror, setEditerror] = useState<any>(error2);
  // const [editerror1, setEditerror1] = useState<any>(false);
const location =useLocation();
console.log(location?.state,"location")
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [dupError, setDupError] = useState<any>(error1);
  const [dupErrorEdit, setDupErrorEdit] = useState<any>(error2);
  const [emptyError, setEmptyError] = useState<any>(false);
  const [textFieldError, setTextFieldError] = useState<any>("");
  const [hideAlert, setHideAlert] = useState(false);

  const [show, setShow] = useState<any>(false);
  const [showAdd, setShowAdd] = useState<any>(false);
  const [data1, setData1] = useState([]);
  const [error, setError] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState<any>("");
  const [dateError, setDateError] = useState<any>("");
  const [dateErrorMessage, setDateErrorMessage] = useState<any>("");
  const [index1, setIndex1] = useState<any>("");
  console.log(index1, "index");
  const [activeIndex, setActiveIndex] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorallEl, setAnchorallEl] = React.useState<null | HTMLElement>(
    null
  );
  const [open1, setOpen1] = useState(false);
  const [name, setName] = useState("");
  console.log(name, "navPrompt");
  const [newIndex, setNewIndex] = useState("");
  const [newName, setNewName] = useState("");
  const [showAddAlert, setShowAddAlert] = useState(false)

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose4 = () => {
    setOpen3(false);
  };
  const handleClose3 = () => {
    setOpen2(false);
  };
  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (name !== "") {
  //     setnavPrompt(true);
  //   } else {
  //     setnavPrompt(false);
  //   }
  // }, [name, index1]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions

  useEffect(() => {
    if (defaultValue) {
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
  }, [defaultValue]);

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 5000);
  };

  const handleClickOpen = (e: any, index: any, nameAlert: any) => {

    setOpen1(true);
    setNewIndex(index);
    setNewName(nameAlert);

  };


  const handleClickClose = () => {
    setOpen1(false);
  };

  const handleClickIdClose = (index: any) => {
    //     if (newId) {
    // //onDelete(newId)
    //       setOpen1(false);
    //       console.log(newId)
    //     }
    if (newIndex) {
      handleClose(newIndex);
      setOpen1(false);
    }
  };

  const open = Boolean(anchorEl);

  const [dateList, setDateList] = useState<any>([
    {
      name: "",
      pa_launch: "",
      start_date: "",
      end_date: "",
      start_date_appraiser: "",
      end_date_appraiser: "",
      start_date_reviewer: "",
      end_date_reviewer: "",
      start_date_normalizer: "",
      end_date_normalizer: "",
      // start_date_F2FMeeting: "",
      // end_date_F2FMeeting: "",
      start_date_employee_acknowledgement: "",
      end_date_employee_acknowledgement: "",
      // start_date_mediation: "",
      // end_date_mediation: "",
      start_date_re_normalization: "",
      end_date_re_normalization: "",
      start_date_closing: "",
      end_date_closing: "",
      isOpen: false,
    },
  ]);

  const scrollToLast = () => {
    console.log("scrolled");
  };


  //empty name validation
  const [addDisable, setaddDisable] = useState<any>(false);
  useEffect(() => {
    console.log(dateList, dateList.length, "dateList");
    if (dateList !== undefined) {
      const D = dateList
        .filter((j: any) => {
          console.log(j.name, 'nameeee')
          return j.name === "";
        })
        .map((i: any) => {
          return i.name;
        });
      console.log(D.length, "ddddddddd");
      if (D.length === 0) {
        setaddDisable(false);
      } else {
        setaddDisable(true);
      }
    }
  }, [dateList]);
  //empty name validation

  const addDate = () => {
    if (addDisable === false) {
      setShowAddAlert(false)
      setScrollDown(true);
      setTimeout(() => {
        setScrollDown(false);
      }, 2000);
      if (name === "") {
        setTextFieldError("Enter Calendar text field");
      } else {
        setDateList([
          ...dateList,
          {
            name: "",
            pa_launch: "",
            start_date: "",
            end_date: "",
            start_date_appraiser: "",
            end_date_appraiser: "",
            start_date_reviewer: "",
            end_date_reviewer: "",
            start_date_normalizer: "",
            end_date_normalizer: "",
            // start_date_F2FMeeting: "",
            // end_date_F2FMeeting: "",
            start_date_employee_acknowledgement: "",
            end_date_employee_acknowledgement: "",
            // start_date_mediation: "",
            // end_date_mediation: "",
            start_date_re_normalization: "",
            end_date_re_normalization: "",
            start_date_closing: "",
            end_date_closing: "",
            isOpen: false,
          },
        ]);
      }
    }
    else {

      setShowAddAlert(true)
      setOpen2(true)

    }


  };
  console.log(dateList.name, dateList.length, "dateList");



  //scroll to end
  const scrollEnd = useRef<null | HTMLDivElement>(null);
  const [scrollDown, setScrollDown] = useState<any>(false);
  useEffect(() => {
    if (scrollDown === true) {
      console.log("useEffect triggered");
      scrollEnd.current?.scrollIntoView();
    }
  }, [scrollDown]);
  //scroll to end

  // const today = dateList[0].start_date;
  // const aWeekFromNow = dateList[0].end_date;
  // const thisWeek = eachDayOfInterval(
  //   { start: today, end: aWeekFromNow },
  // );
  // //let thisWeek = dateList[0].start_date;

  // console.log(thisWeek, 'dddddddd');

  const [validate, setValidate] = useState<any>(true);
  useEffect(() => {
    if (dateList.length === 0) {
      return noData();
    }
  }, []);

  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    setUsers(dateList);
  });
  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const allopen = Boolean(anchorallEl);
  const handleallClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorallEl(event.currentTarget);
    //removeDate(i);
  };

  const handleClose = (index: any) => {
    console.log(index, "index");
    //setAnchorEl(null);  
    const newDateList = [...dateList];
    newDateList.splice(index, 1);
    setDateList(newDateList);

  };

  const removeDate = (i: any) => {
    const newDateList = [...dateList];
    newDateList.splice(i);
    setDateList(newDateList);

    // setAnchorallEl(null);
    // if(DateList.length===0){
    //   return 'Add calender';
    // }
  };
  const noData = () => {
    "data req";
  };
  useEffect(() => {
    if (dateList.length === 0) {
      return noData();
    }
  }, [dateList]);

  const handleDateChange = (i: any, e: any) => {
    setActiveIndex(i);
    setnavPrompt(true);
    const newDateList = [...dateList];
    //@ts-ignore
    newDateList[i][e.target.name] = e.target.value;

    setDateList(newDateList);

    //
  };

  const handlePALaunchDateChange = (i: any, e: any) => {
    setActiveIndex(i);
    const newDateList = [...dateList];
    //@ts-ignore
    newDateList[i][e.target.name] = e.target.value;
    newDateList[i]["start_date_appraiser"] = e.target.value;

    setDateList(newDateList);

    //
  };

  useEffect(() => {
    if (error1 === true) {
      setDupError(true);
      setOpen2(true)
      setHideAlert(true);
      // hideAlertHandler();
    }

  }, [error1]);
  console.log(error1, "error1")
  useEffect(() => {
    if (error1 === false) {
      setDupError(false);
    }
  }, [error1]);

  useEffect(() => {
    if (error2 === true) {
      setDupErrorEdit(true);
      setOpen2(true)
      setHideAlert(true);
      // hideAlertHandler();
    }
  }, [error2]);

  useEffect(() => {
    if (error2 === false) {
      setDupErrorEdit(false);
    }
  }, [error2]);

  useEffect(() => {
    if (textFieldError != "") {
      setDupError(false);
      setDupErrorEdit(false);
    }
  }, [textFieldError]);

  console.log(name, "name");

  useEffect(() => {
    if (name === "") {
      setDupError(false);
    }
  }, [name]);

  // useEffect(() => {
  //   console.log(defaultValue.name,'dddddddddd')
  //   if (defaultValue && defaultValue.data.name === "") {
  //     setDupErrorEdit(false)
  //   }
  // },[defaultValue])

  // useEffect(()=> {
  //   const res = dateList.map((i:any)=> {
  //     if (i.name === "") {
  //       setDupError(false)
  //     }

  //   })
  // },[dateList,onSubmit])

  const checkD = (startDate: any, endDate: any) => {
    return isAfter(parseISO(startDate), parseISO(endDate));
  };

  useEffect(() => {
    const checkData = dateList.map((j: any) => {
      // console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      let status = false;
      if (isAfter(parseISO(j.start_date), parseISO(j.end_date))) {
        setErrorMessage("Appraisal Calendar start date should be before Appraisal Calendar end date. ");
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(parseISO(j.start_date_reviewer), parseISO(j.end_date_reviewer))
      ) {
        setErrorMessage(
          "Reviewer start date should be before Reviewer end date. "
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.start_date_appraiser),
          parseISO(j.end_date_appraiser)
        )
      ) {
        setErrorMessage(
          "Appraiser start date should be before Appraiser end date. "
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.start_date_normalizer),
          parseISO(j.end_date_normalizer)
        )
      ) {
        setErrorMessage(
          "HR Normalizer start date should be before HR Normalizer End Date. "
        );
        setOpen2(true);
        status = true;
      }
      // if (
      //   isAfter(
      //     parseISO(j.start_date_F2FMeeting),
      //     parseISO(j.end_date_F2FMeeting)
      //   )
      // ) {
      //   setErrorMessage(
      //     "F2F Meeting start Date should be before F2F Meeting end date. "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      if (
        isAfter(
          parseISO(j.start_date_employee_acknowledgement),
          parseISO(j.end_date_employee_acknowledgement)
        )
      ) {
        setErrorMessage(
          "F2F Meeting & Employee Acceptance start date should be before F2F Meeting & Employee Acceptance end date."
        );
        setOpen2(true);
        status = true;
      }
      // if (
      //   isAfter(
      //     parseISO(j.start_date_mediation),
      //     parseISO(j.end_date_mediation)
      //   )
      // ) {
      //   setErrorMessage(
      //     "Mediation start date should be before Mediation end date. "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      if (
        isAfter(
          parseISO(j.start_date_re_normalization),
          parseISO(j.end_date_re_normalization)
        )
      ) {
        setErrorMessage(
          "Re_Normalization start date should be before Re_Normalization end date."
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(parseISO(j.start_date_closing), parseISO(j.end_date_closing))
      ) {
        setErrorMessage(
          "PA Closing start date should be before PA Closing end date."
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.end_date_closing),
          parseISO(j.end_date)
        )
      ) {
        setErrorMessage(
          "PA Closing end date should be same as appraisal calendar end date."
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_appraiser)
        )
      ) {
        setErrorMessage(
          "Appraiser start date should be within appraisal calendar period. "
        );
        setOpen2(true);
        status = true;
      }

      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_reviewer)
        )
      ) {
        setErrorMessage(
          "Reviewer start date should be within appraisal calendar period."
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_normalizer)
        )
      ) {
        setErrorMessage(
          "HR Normalizer start date should be within appraisal calendar period."
        );
        setOpen2(true);
        status = true;
      }
      // if (
      //   isAfter(
      //     parseISO(j.start_date),
      //     parseISO(j.start_date_F2FMeeting)
      //   )
      // ) {
      //   setErrorMessage(
      //     "F2F Meeting start date should be within appraisal calendar period."
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_employee_acknowledgement)
        )
      ) {
        setErrorMessage(
          "F2F Meeting & Employee Acceptance start date should be within appraisal calendar period."
        );
        setOpen2(true);
        status = true;
      }
      // if (
      //   isAfter(
      //     parseISO(j.start_date),
      //     parseISO(j.start_date_mediation)
      //   )
      // ) {
      //   setErrorMessage(
      //     "Mediation start date should be within appraisal calendar period."
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_re_normalization)
        )
      ) {
        setErrorMessage(
          "Re-normalization start date should be within appraisal calendar period."
        );
        setOpen2(true);
        status = true;
      }
      if (
        isAfter(
          parseISO(j.start_date),
          parseISO(j.start_date_closing)
        )
      ) {
        setErrorMessage(
          "PA Closing start date should be within appraisal calendar period."
        );
        setOpen2(true);
        status = true;
      }
      if (j.end_date != "") {
        if (j.start_date == j.end_date) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      if (j.end_date_appraiser != "") {
        if (j.start_date_appraiser == j.end_date_appraiser) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      if (j.end_date_reviewer != "") {
        if (j.start_date_reviewer == j.end_date_reviewer) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      if (j.end_date_normalizer != "") {
        if (j.start_date_normalizer == j.end_date_normalizer) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      // if(j.end_date_F2FMeeting != ""){
      //   if(j.start_date_F2FMeeting ==j.end_date_F2FMeeting){
      //     setErrorMessage(
      //           "The end date cannot be the same as start date."
      //         );
      //         setOpen2(true);
      //         status = true;
      //   }
      // }
      if (j.end_date_employee_acknowledgement != "") {
        if (j.start_date_employee_acknowledgement == j.end_date_employee_acknowledgement) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      // if(j.end_date_mediation != ""){
      //   if(j.start_date_mediation ==j.end_date_mediation){
      //     setErrorMessage(
      //           "The end date cannot be the same as start date."
      //         );
      //         setOpen2(true);
      //         status = true;
      //   }
      // }
      if (j.end_date_re_normalization != "") {
        if (j.start_date_re_normalization == j.end_date_re_normalization) {
          setErrorMessage(
            "The end date cannot be the same as start date."
          );
          setOpen2(true);
          status = true;
        }
      }
      console.log(j.start_date_appraiser, "start")
      console.log(j.end_date_appraiser, "start1")

      return status;
    });

    // return (
    //     // console.log()
    //     // isAfter(parseISO(j.start_date), parseISO(j.end_date)),
    //     //     isAfter(parseISO(j.start_date_appraiser), parseISO(j.end_date_appraiser)),
    // console.log(checkD(parseISO(j.start_date_reviewer), parseISO(j.end_date_reviewer))),
    //     isAfter(parseISO(j.start_date_reviewer), parseISO(j.end_date_reviewer))
    //         // isAfter(parseISO(j.start_date_normalizer), parseISO(j.end_date_normalizer))
    //         // isAfter(parseISO(j.start_date_F2FMeeting), parseISO(j.end_date_F2FMeeting)),
    //         // isAfter(parseISO(j.start_date_employee_acknowledgement), parseISO(j.end_date_employee_acknowledgement)),
    //         // isAfter(parseISO(j.start_date_mediation), parseISO(j.end_date_mediation)),
    //         // isAfter(parseISO(j.start_date_re_normalization), parseISO(j.end_date_re_normalization)),
    //         // isAfter(parseISO(j.start_date_closing), parseISO(j.end_date_closing))
    // )

    console.log(checkData, "checkData");

    if (checkData.find((k: any) => k === true)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [dateList]);

  useEffect(() => {
    const checkData1 = dateList.map((j: any) => {
      // console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

      let status = false;

      // if (
      //   (isAfter(parseISO(j.start_date), parseISO(j.start_date_appraiser))) ||
      //   (isBefore(parseISO(j.start_date), parseISO(j.start_date_appraiser)))
      // ) {
      //   setDateErrorMessage(
      //     "Calendar Start Date and Appraiser Start Date must be same ! "
      //   );
      //   status = true;
      // }
      // if (
      //   isAfter(parseISO(j.end_date_appraiser), parseISO(j.start_date_reviewer))
      // ) {
      //   setDateErrorMessage(
      //     "Reviewer Start Date must be greater than the Appraiser End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_reviewer),
      //     parseISO(j.start_date_normalizer)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "Normalizer Start Date must be greater than the Reviewer End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_normalizer),
      //     parseISO(j.start_date_F2FMeeting)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "F2FMeeting Start Date must be greater than the Normalizer End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_F2FMeeting),
      //     parseISO(j.start_date_employee_acknowledgement)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "Employee Acknowledgement Start Date must be greater than the F2FMeeting End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_employee_acknowledgement),
      //     parseISO(j.start_date_mediation)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "Date Mediation Start Date must be greater than the Employee Acknowledgement End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_mediation),
      //     parseISO(j.start_date_re_normalization)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "Re_Normalization Start Date must be greater than the Date Mediation End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      // if (
      //   isAfter(
      //     parseISO(j.end_date_re_normalization),
      //     parseISO(j.start_date_closing)
      //   )
      // ) {
      //   setDateErrorMessage(
      //     "Closing Start Date must be greater than the Re_Normalization End Date! "
      //   );
      //   setOpen2(true);
      //   status = true;
      // }
      return status;

      // isAfter(parseISO(j.start_date_normalizer), parseISO(j.end_date_normalizer))
    });

    console.log(checkData1, "checkData");

    if (checkData1.find((k: any) => k === true)) {
      setDateError("Date smaller");
    } else {
      setDateError(false);
    }
  }, [dateList]);

  // const handleMultipleDatee = (sd: any, ed: any) => {
  //   // console.log(Date.parse(sd), "sd",Date.parse(ed), "ed");
  //   console.log(isAfter(parseISO(sd), parseISO(ed)), "sd");

  //   console.log(isBefore(parseISO(sd), parseISO(ed)), "ed");

  //   console.log(sd > ed);

  //   if (sd && ed && isAfter(parseISO(sd), parseISO(ed))) {
  //     return false

  //     // setError(true);
  //     // console.log(error, "errrrrr");
  //   } else if (isBefore(parseISO(sd), parseISO(ed))) {
  //     // setError(false);
  //     return true

  //   }
  // };

  const sliceHandler = (i: any) => {
    const result = i?.slice(0, 10);
    return result;
  };

  useEffect(() => {
    if (defaultValue) {
      setDateList([
        {
          name: defaultValue.data.name,
          // start_date:defaultValue.data.start_date ,
          start_date: sliceHandler(defaultValue.data.start_date),
          end_date: sliceHandler(defaultValue.data.end_date),
          pa_launch: sliceHandler(defaultValue.data.pa_launch),
          start_date_appraiser: sliceHandler(
            defaultValue.data.start_date_appraiser
          ),
          end_date_appraiser: sliceHandler(
            defaultValue.data.end_date_appraiser
          ),
          start_date_reviewer: sliceHandler(
            defaultValue.data.start_date_reviewer
          ),
          end_date_reviewer: sliceHandler(defaultValue.data.end_date_reviewer),
          start_date_normalizer: sliceHandler(
            defaultValue.data.start_date_normalizer
          ),
          end_date_normalizer: sliceHandler(
            defaultValue.data.end_date_normalizer
          ),
          // start_date_F2FMeeting: sliceHandler(
          //   defaultValue.data.start_date_F2FMeeting
          // ),
          // end_date_F2FMeeting: sliceHandler(
          //   defaultValue.data.end_date_F2FMeeting
          // ),
          start_date_employee_acknowledgement: sliceHandler(
            defaultValue.data.start_date_employee_acknowledgement
          ),
          end_date_employee_acknowledgement: sliceHandler(
            defaultValue.data.end_date_employee_acknowledgement
          ),
          // start_date_mediation: sliceHandler(
          //   defaultValue.data.start_date_mediation
          // ),
          // end_date_mediation: sliceHandler(
          //   defaultValue.data.end_date_mediation
          // ),
          calendar_type :sliceHandler(
            defaultValue?.data?.calendar_type
          ),
          start_date_re_normalization: sliceHandler(
            defaultValue.data.start_date_re_normalization
          ),
          end_date_re_normalization: sliceHandler(
            defaultValue.data.end_date_re_normalization
          ),
          start_date_closing: sliceHandler(
            defaultValue.data.start_date_closing
          ),
          end_date_closing: sliceHandler(defaultValue.data.end_date_closing),
          isOpen: false,
        },
      ]);
    }
  }, [defaultValue]);

  // console.log(dateList, "Datetetetetete");
  // console.log(editerror, "error2222");
  const handleOpen = (index: any, openData: any) => {
    setDateList(
      dateList.map((previousState: any, ix: any) => {
        if (ix === index) {
          return {
            ...previousState,
            isOpen: !previousState.isOpen,
          };
        }

        // if (ix !== index) {
        //   return {
        //     ...previousState,
        //     isOpen: false,
        //   };
        // }
        return previousState;
      })
    );
  };
  // const editerrorHandler = (singleDate: any) => {
  //   if (singleDate.name === "") {
  //     setEditerror(false);
  //   } else {
  //     setEditerror(true);
  //   }
  // };
  // const errorHandler = () => {
  //   if (editerror === true) {
  //     onSubmit(dateList);
  //     //setEditerror1(true)
  //   } else {
  //     setEditerror(false);
  //     setEditerror1(false);
  //   }
  // };
  const [newshow, setNewshow] = useState<any>(false);

  const errorTextField = () => {
    console.log(dateList, "dateeeeeeeeee");
    if (name === "") {
      setTextFieldError("Enter text field");
    } else {
      setTextFieldError("");
    }
  };

  const calenderEmpty = () => {
    const res = dateList.map((i: any) => {
      if (
        // name != ""  ||
        i.start_date === "" ||
        i.end_date === ""
      ) {
        setOpen3(true)
        console.log(dateList, "checkList1");
        setNewshow(true)
      }
      else if (
        i.name === "" ||
        i.start_date === "" ||
        i.end_date === "" ||
        i.pa_launch === "" ||
        i.start_date_appraiser === "" ||
        i.end_date_appraiser === "" ||
        i.start_date_reviewer === "" ||
        i.end_date_reviewer === "" ||
        i.start_date_normalizer === "" ||
        i.end_date_normalizer === "" ||
        i.start_date_employee_acknowledgement === "" ||
        i.end_date_employee_acknowledgement === "" ||
        // i.start_date_mediation === "" ||
        // i.end_date_mediation === "" ||
        i.start_date_re_normalization === "" ||
        i.end_date_re_normalization === "" ||
        // i.start_date_F2FMeeting === "" ||
        // i.end_date_F2FMeeting === "" ||
        i.start_date_closing === "" ||
        i.end_date_closing === ""
      ) {
        console.log(dateList, "checkList1");
        setEmptyError(true);
        // setOpen2(true)
        setHideAlert(true);

        // hideAlertHandler();
      }

      else if (
        i.name != "" ||
        i.start_date != "" ||
        i.end_date != "" ||
        i.pa_launch != "" ||
        i.start_date_appraiser != "" ||
        i.end_date_appraiser != "" ||
        i.start_date_reviewer != "" ||
        i.end_date_reviewer != "" ||
        i.start_date_normalizer != "" ||
        i.end_date_normalizer != "" ||
        i.start_date_employee_acknowledgement != "" ||
        i.end_date_employee_acknowledgement != "" ||
        // i.start_date_mediation != "" ||
        // i.end_date_mediation != "" ||
        i.start_date_re_normalization != "" ||
        i.end_date_re_normalization != "" ||
        // i.start_date_F2FMeeting != "" ||
        // i.end_date_F2FMeeting != "" ||
        i.start_date_closing != "" ||
        i.end_date_closing != ""
      ) {
        i.name = i.name.trim();
        setnavPrompt(false);
        setEmptyError(false);
        console.log(dateList, "checkList2");
        onSubmit(dateList);
      }

    });
  };

  useEffect(() => {
    if (name != "") {
      setTextFieldError("");
      setShowAddAlert(false)
    }
  }, [name]);

  useEffect(() => {
    if (textFieldError != "") {
      setEmptyError(false);
    }
  }, [textFieldError]);
  //added for double validation bug -dupError was true along with emptyerroe- Hari
  useEffect(() => {
    if (emptyError === true) {
      setDupError(false);
    } else if (error1 === true) {
      setDupError(true);
      setOpen2(true)
    }
    console.log(emptyError, dupError, error1, "emptyError,dupError, error1");
  }, [emptyError, error1, dupError]);
  //added for double validation bug -dupError was true along with emptyerroe- Hari
  return (
    <>
      <PAMaster name={"View" + " Calendar"} nav={`${CALENDER_VIEWPAGE}`} secondName={"Calendar Setting"} />

      <Box
        sx={{
          height: "calc(100vh - 180px)",
          background: "#fff",
          position: "relative",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",

        }}
      >

        <Dialog
          open={open3}
          //  onClose={handleClose2} 
          // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          PaperProps={{
            style: {

              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",

            },
          }}
          // aria-labelledby="alert-dialog-title"
          // aria-describedby="alert-dialog-description"
        >

          <DialogContent><DialogContentText
            id="alert-dialog-description"
            style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "Arial",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",

              alignItems: "center",
            }}
          >
            <div style={{ width: "92%" }}>
              {newshow && (
                <div>
                  Enter all Calendar text fields.
                </div>
              )
              }
            </div>
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
                color: "#3E8CB5",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleClose4}
            >
              Ok
            </Button>
          </DialogActions>

        </Dialog>
        {/* </div> */}

        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            //  onClose={handleClose2} 
            // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleClose3}  >
                <img src={Closeicon} alt="icon" />
              </IconButton>
            </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                //  width :"300px",
                alignItems: "center",
                // overflowY:"hidden",
              }}
            >
              <div style={{ width: "92%" }}>
                {hideAlert && dupError && (
                  <div style={{
                    fontFamily: "Arial",
                  }} >Entered Calendar already exists.</div>
                )}

                {hideAlert && dupErrorEdit && (
                  <div style={{
                    fontFamily: "Arial",
                  }}  >Entered Calendar already exists.</div>
                )}

                {/* {hideAlert && emptyError && (
                  <div style={{
                    fontFamily: "Arial",
                  }} >Enter all Calendar text fields!</div>
                )} */}

                {showAddAlert && (
                  <div style={{
                    fontFamily: "Arial",
                  }}  >Calendar name is mandatory.</div>
                )}
                {/* {newshow && (
                  <div> 
                    Enter all Calendar text fields!
                  </div>
                )

                } */}
                {error && <div style={{
                  fontFamily: "Arial",
                }}>{errorMessage}

                </div>}
                {dateError && <div style={{
                  fontFamily: "Arial",
                }}>{dateErrorMessage}</div>
                }
              </div>
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
                  color: "#3E8CB5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleClose3}
              >
                Ok
              </Button>
            </DialogActions>

          </Dialog>
        </div>
        {/* <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={2}
          paddingTop="70px"
        > */}
        {/* <h2
              style={{
                color: "#004C75",
                fontSize: "18px",
                fontWeight: "500",
                position: "absolute",
                left: "43%",
              }}
            >
              Add Calendar
            </h2> */}

        {/* <div
              style={{ position: "absolute", left: "82%", marginTop: "10px" }}
            > */}
        {/* <Stack
            direction="row"
            spacing={2}
            sx={{ verticalAlign: "middle" }}
          > */}
        {/* {showAdd || (
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                    }}
                    // disabled={addDisable}
                    variant="outlined"
                    onClick={() => addDate()}
                  >
                    Add
                  </Button>
                )} */}

        {/* <Link to={`${CALENDER_VIEWPAGE}`}>
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                    }}
                    variant="outlined"
                  >
                    View
                  </Button>
                </Link> */}
        {/* </Stack> */}
        {/* </div> */}
        {/* </Stack> */}
        {/* {error && <Alert severity="error">{errorMessage}</Alert>} */}
        {/* {dateError && <Alert severity="error">{dateErrorMessage}</Alert>} */}



        {/* <TableContainer sx={{ height: "calc(100vh - 360px)" }}> */}
        <Scroll>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 220px)" }}>
            <Table size="small">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ padding: "2px", backgroundColor: "#ffffff" }}>
                  <TableCell></TableCell>
                  {/* <TableCell
                  align="left"
                  sx={{
                    color: "#005477",
                    fontSize: "15px",
                  }}
                >
                  #
                </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Calendar Name{" "}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Start Date
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    End Date
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              {dateList &&
                dateList.map((singleDate: any, index: number) => {
                  console.log(singleDate, "singleDate")
                  return (
                    <>
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: "#F7F9FA",
                            border: "1px solid #EDF9FE",
                            boxShadow: "1px 1px 5px 1px rgba(0, 0, 0, 0.1)",
                            borderRadius: "5px",
                          }}
                        >
                          <TableCell
                            sx={{
                              color: "#005477",
                              fontSize: "13px",
                            }}
                          >
                            <div>

                              {index > 0 && (<Tooltip title="Remove">
                                <IconButton
                                  //onClick={() => handleClose(index)}
                                  onClick={(e: any) =>
                                    handleClickOpen(e, index, singleDate.name)
                                  }
                                >
                                  <img src={Deleteredicon} alt="" />
                                </IconButton>
                              </Tooltip>)}
                            </div>
                            <AlertDialog
                              isAlertOpen={open1}
                              handleAlertOpen={(e: any, index: any, name: any) =>
                                handleClickOpen(e, index, singleDate.name)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={(index: any) => {
                                handleClickIdClose(index);
                              }}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </TableCell>
                          {/* <TableCell
                          align="left"
                          sx={{
                            color: "#005477",
                            fontSize: "13px",
                          }}
                        >
                          <Typography>
                            <p style={{ fontSize: "20px" }}>{index + 1}</p>
                          </Typography>
                        </TableCell> */}
                          <TableCell
                            align="left"
                            sx={{
                              color: "#333333",
                              fontSize: "14px",
                            }}
                          >
                            <TextField
                              sx={{
                                // "& .MuiOutlinedInput-root": {
                                //   "& > fieldset": {
                                //     border: "none"
                                //   },
                                // },
                                '& .MuiOutlinedInput-root': {
                                  // '& fieldset': {
                                  //   borderColor: 'none',
                                  // },
                                  "& > fieldset": {

                                  },
                                  '&:hover fieldset': {
                                    borderColor: '#c6c6c6',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                  },
                                },
                              }}
                              size="small"
                              type="text"
                              // disabled
                              InputProps={{ readOnly: true, }}
                              // multiline
                              // rows={2}
                              placeholder="Calendar Name"
                              autoComplete="off"
                              // size="small"
                              // id="outlined-basic"
                              // label="Appraisal Calendar"
                              name="name"
                              helperText={
                                name === singleDate.name && textFieldError
                              }
                              error={name === singleDate.name && textFieldError}
                              value={singleDate.name}
                              onChange={(e) => {
                                handleDateChange(index, e);
                                // editerrorHandler(singleDate);
                                setName(singleDate.name);
                                // setnavPrompt(true);
                              }}
                              onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                  errorTextField();
                                  calenderEmpty();
                                  console.log("Enter Button has been clicked");
                                }
                              }}
                              // variant="outlined"
                              style={{
                                width: "250px",
                                color: "#7b7b7b",
                                height: "37px",
                                // border: "1px solid #c6c6c6",
                                // borderRadius: "3px",
                                background: "none",
                              }}
                            ></TextField>
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              color: "#005477",
                              fontSize: "13px",
                            }}
                          >
                            <input
                              type="date"
                              name="start_date"
                              style={{
                                width: "250px",
                                color: "#7b7b7b",
                                height: "37px",
                                border: "1px solid #c6c6c6",
                                borderRadius: "3px",
                                background: "none",

                              }}
                              readOnly
                              // min={singleDate.end_date}
                              max={singleDate.end_date}
                              value={singleDate.start_date}
                              // value={ moment(singleDate.start_date).format("DD-MMM-YYYY") }
                              data-date=""
                              data-date-format="DD MMMM YYYY"
                              onKeyDown={(e) => {
                                if (e.code !== "Tab") {
                                  e.preventDefault();
                                }

                              }}
                              onChange={(e) => {
                                handleDateChange(index, e);
                                // handleMultipleDate(
                                //   singleDate.start_date,
                                //   singleDate.end_date,
                                //   e
                                // );
                                setIndex1(index);
                                // setnavPrompt(true);
                              }}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              color: "#005477",
                              fontSize: "13px",
                            }}
                          >
                            <input
                              type="date"
                              name="end_date"
                              style={{
                                width: "250px",
                                color: "#7b7b7b",
                                height: "37px",
                                border: "1px solid #c6c6c6",
                                borderRadius: "3px",
                                background: "none",
                              }}
                              // readonly
                              readOnly

                              // disabled
                              // min={minValue}
                              // max={maxValue}
                              min={singleDate.start_date}
                              // min={singleDate.start_date}
                              value={singleDate.end_date}
                              onKeyDown={(e) => {
                                if (e.code !== "Tab") {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                handleDateChange(index, e);
                                // handleMultipleDate(
                                //   singleDate.start_date,
                                //   singleDate.end_date,
                                //   e
                                // );
                                setIndex1(index);
                                // setnavPrompt(true);
                              }}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              color: "#005477",
                              fontSize: "13px",
                            }}
                          >
                            <div style={{ margin: "25px" }}>
                              <img
                                src={show ? Uparrowicon : Downarrowicon}
                                onClick={() => {
                                  handleOpen(index, singleDate);
                                  setShow(!show);
                                }}
                              />
                              {/* setShow(!show) */}
                            </div>
                          </TableCell>
                          {/* <div ref={scrollEnd}></div> */}
                        </TableRow>
                      </TableHead>
                      <br />
                      {singleDate.isOpen && (
                        <>
                          <TableBody>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                  Calendar Type
                                </Typography>
                              </TableCell>
                              <TableCell align="left">

                                <FormControl size="small">
                                  <Textfld>
                                    <TextField
                                      sx={{
                                        '& .MuiOutlinedInput-root': {
                                          // '& fieldset': {
                                          //   borderColor: 'none',
                                          // },
                                          "& > fieldset": {

                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#c6c6c6',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                          },
                                        },
                                      }}
                                      disabled
                                      id="outlined-size-small"
                                      size="small"
                                      value={singleDate.calendar_type}
                                      autoComplete="off"
                                    />
                                  </Textfld>
                                  {/* <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name="calendar_type"
                                  value={singleDate.calendar_type}
                                  // label="Calendar"
                                  displayEmpty
                                  size="small"
                                  // onChange={handleCalendarChange}
                                  onChange={(e) => {
                                    handleDateChange(index, e);
                                    // handleMultipleDate(
                                    //   singleDate.start_date_reviewer,
                                    //   singleDate.end_date_reviewer,
                                    //   e
                                    // );
                                    setIndex1(index);
                                    setnavPrompt(true);
                                  }}
                                >
                                  <MenuItem value={"Mid Year"}>Mid Year</MenuItem>
                                  <MenuItem value={"Year End"}>Year End</MenuItem>
                                </Select> */}
                                </FormControl>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                  PA Initiation
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="pa_launch"
                                    min={singleDate.start_date}
                                    max={singleDate.end_date}
                                    value={singleDate.pa_launch}
                                    // value={startDateAppraiser}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      // setStartDateAppraiser(
                                      //   singleDate.start_date_appraiser
                                      // );
                                      handlePALaunchDateChange(index, e);
                                      // setnavPrompt(true);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_appraiser,
                                      //   singleDate.end_date_appraiser,
                                      //   e
                                      // );
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                I
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                  Appraiser
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_appraiser"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={singleDate.start_date_appraiser}
                                    // value={startDateAppraiser}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      setStartDateAppraiser(
                                        singleDate.start_date_appraiser
                                      );
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_appraiser,
                                      //   singleDate.end_date_appraiser,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                      // if (singleDate.start_date_appraiser === "") {
                                      //   setStartDateAppraiser(singleDate.start_date_appraiser);
                                      //   return;
                                      // }

                                      // const startDateAppraiser = singleDate.start_date_appraiser;
                                      // console.log(e, 'eeeeeee')
                                      // console.log(startDateAppraiser, 'rrrrrrr')
                                      // // var result = isAfter( singleDate.start_date_appraiser, singleDate.end_date_appraiser)
                                      // // console.log(result,'result')

                                      // if (startDateAppraiser > singleDate.end_date_appraiser) {
                                      //   // setStartDateAppraiser(singleDate.end_date_appraiser);
                                      //   // const result = subDays(parseISO(singleDate.end_date_appraiser), 1)
                                      //   setStartDateAppraiser(singleDate.end_date_appraiser);

                                      // } else {
                                      //   setStartDateAppraiser(startDateAppraiser);
                                      // }
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_appraiser"
                                    min={singleDate.start_date_appraiser}
                                    max={singleDate.end_date}
                                    value={singleDate.end_date_appraiser}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_appraiser,
                                      //   singleDate.end_date_appraiser,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                II
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                  Reviewer
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_reviewer"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={singleDate.start_date_reviewer}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_reviewer,
                                      //   singleDate.end_date_reviewer,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_reviewer"
                                    min={singleDate.start_date_reviewer}
                                    max={singleDate.end_date}
                                    value={singleDate.end_date_reviewer}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_reviewer,
                                      //   singleDate.end_date_reviewer,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                III
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                 HR Normalizer
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_normalizer"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={singleDate.start_date_normalizer}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_normalizer,
                                      //   singleDate.end_date_normalizer,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_normalizer"
                                    min={singleDate.start_date_normalizer}
                                    max={singleDate.end_date}
                                    value={singleDate.end_date_normalizer}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_normalizer,
                                      //   singleDate.end_date_normalizer,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            {/* <TableRow>
                            <TableCell></TableCell>
                           
                            <TableCell align="left">
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial"
                                }}
                              >
                                F2F Meeting
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <label>
                                <input
                                  style={{
                                    width: "250px",
                                    color: "#7b7b7b",
                                    height: "25px",
                                    border: "1px solid #c6c6c6",
                                    borderRadius: "5px",
                                    background: "none",
                                  }}
                                  type="date"
                                  name="start_date_F2FMeeting"
                                  min={singleDate.pa_launch}
                                  max={singleDate.end_date}
                                  value={singleDate.start_date_F2FMeeting}
                                  onKeyDown={(e) => {
                                    if (e.code !== "Tab") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => {
                                    handleDateChange(index, e);
                                    setIndex1(index);
                                    setnavPrompt(true);
                                  }}
                                />
                              </label>
                            </TableCell>
                            <TableCell align="left">
                              <label>
                                <input
                                  style={{
                                    width: "250px",
                                    color: "#7b7b7b",
                                    height: "25px",
                                    border: "1px solid #c6c6c6",
                                    borderRadius: "5px",
                                    background: "none",
                                  }}
                                  type="date"
                                  name="end_date_F2FMeeting"
                                  min={singleDate.start_date_F2FMeeting}
                                  max={singleDate.end_date}
                                  value={singleDate.end_date_F2FMeeting}
                                  onKeyDown={(e) => {
                                    if (e.code !== "Tab") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => {
                                    handleDateChange(index, e);
                                    setIndex1(index);
                                    setnavPrompt(true);
                                  }}
                                />
                              </label>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow> */}
                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                V
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial"
                                  }}
                                >
                                  F2F Meeting & Employee Acceptance
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_employee_acknowledgement"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={
                                      singleDate.start_date_employee_acknowledgement
                                    }
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_employee_acknowledgement,
                                      //   singleDate.end_date_employee_acknowledgement,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_employee_acknowledgement"
                                    min={singleDate.start_date_employee_acknowledgement}
                                    max={singleDate.end_date}
                                    value={
                                      singleDate.end_date_employee_acknowledgement
                                    }
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_employee_acknowledgement,
                                      //   singleDate.end_date_employee_acknowledgement,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              {/* <TableCell></TableCell> */}
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                VI
                              </p>
                            </Typography>
                          </TableCell> */}
                              {/* <TableCell align="left">
                              <Typography
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial"
                                }}
                              >
                                Mediation
                              </Typography>
                            </TableCell> */}
                              {/* <TableCell align="left">
                              <label>
                                <input
                                  style={{
                                    width: "250px",
                                    color: "#7b7b7b",
                                    height: "25px",
                                    border: "1px solid #c6c6c6",
                                    borderRadius: "5px",
                                    background: "none",
                                  }}
                                  readOnly
                                  type="date"
                                  name="start_date_mediation"
                                  min={singleDate.pa_launch}
                                  max={singleDate.end_date}
                                  value={singleDate.start_date_mediation}
                                  onKeyDown={(e) => {
                                    if (e.code !== "Tab") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => {
                                    handleDateChange(index, e);
                                    // handleMultipleDate(
                                    //   singleDate.start_date_mediation,
                                    //   singleDate.end_date_mediation,
                                    //   e
                                    // );
                                    setIndex1(index);
                                    // setnavPrompt(true);
                                  }}
                                />
                              </label>
                            </TableCell>
                            <TableCell align="left">
                              <label>
                                <input
                                  style={{
                                    width: "250px",
                                    color: "#7b7b7b",
                                    height: "25px",
                                    border: "1px solid #c6c6c6",
                                    borderRadius: "5px",
                                    background: "none",
                                  }}
                                  readOnly
                                  type="date"
                                  name="end_date_mediation"
                                  min={singleDate.start_date_mediation}
                                  max={singleDate.end_date}
                                  value={singleDate.end_date_mediation}
                                  onKeyDown={(e) => {
                                    if (e.code !== "Tab") {
                                      e.preventDefault();
                                    }
                                  }}
                                  onChange={(e) => {
                                    handleDateChange(index, e);
                                    // handleMultipleDate(
                                    //   singleDate.start_date_mediation,
                                    //   singleDate.end_date_mediation,
                                    //   e
                                    // );
                                    setIndex1(index);
                                    // setnavPrompt(true);
                                  }}
                                />
                              </label>
                            </TableCell>
                            <TableCell></TableCell> */}
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                VII
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                  }}
                                >
                                  Mediation & Re-normalization
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_re_normalization"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={singleDate.start_date_re_normalization}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_re_normalization,
                                      //   singleDate.end_date_re_normalization,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_re_normalization"
                                    min={singleDate.start_date_re_normalization}
                                    max={singleDate.end_date}
                                    value={singleDate.end_date_re_normalization}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_re_normalization,
                                      //   singleDate.end_date_re_normalization,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell></TableCell>
                              {/* <TableCell align="left">
                            <Typography>
                              <p
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                VIII
                              </p>
                            </Typography>
                          </TableCell> */}
                              <TableCell align="left">
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                  }}
                                >
                                  PA Closing
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      color: "#7b7b7b",
                                      height: "25px",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="start_date_closing"
                                    min={singleDate.pa_launch}
                                    max={singleDate.end_date}
                                    value={singleDate.start_date_closing}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_closing,
                                      //   singleDate.end_date_closing,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell align="left">
                                <label>
                                  <input
                                    style={{
                                      width: "250px",
                                      height: "25px",
                                      color: "#7b7b7b",
                                      border: "1px solid #c6c6c6",
                                      borderRadius: "5px",
                                      background: "none",
                                    }}
                                    readOnly
                                    type="date"
                                    name="end_date_closing"
                                    // min={singleDate.start_date_closing}
                                    min={singleDate.end_date}
                                    max={singleDate.end_date}
                                    value={singleDate.end_date_closing}
                                    onKeyDown={(e) => {
                                      if (e.code !== "Tab") {
                                        e.preventDefault();
                                      }
                                    }}
                                    onChange={(e) => {
                                      handleDateChange(index, e);
                                      // handleMultipleDate(
                                      //   singleDate.start_date_closing,
                                      //   singleDate.end_date_closing,
                                      //   e
                                      // );
                                      setIndex1(index);
                                      // setnavPrompt(true);
                                    }}
                                  />
                                </label>
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                          <br />
                        </>
                      )}
                    </>
                  );
                })}
            </Table>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ paddingTop: "15px" }}
            >
              {/* <Link to={`${CALENDER_VIEWPAGE}`}> */}
              {/* <Button
            disabled={error || dateError || textFieldError}
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background: "transparent",
              width:"70px",
              height:"35px"
            }}
            variant="outlined"
            onClick={() => {
              // errorHandler();
              errorTextField();
              calenderEmpty();
            }}
            onKeyPress={(event) => {
              var key = event.keyCode || event.which;
              if (key === 13) {
                errorTextField();
                calenderEmpty();
                console.log("Enter Button has been clicked");
              }
            }}
          >
            Save
          </Button> */}
              {/* </Link> */}
              {location?.state == "calendarview" ? 
              <Link to={`${CREATE_CALENDER}`}>
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
              >
                Back
              </Button>
            </Link>
              :
              <Link to={`${CALENDER_VIEWPAGE}`}>
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
                >
                  Back
                </Button>
              </Link>
}
            </Stack>
          </Scrollbar>
        </Scroll>
        <div ref={scrollEnd}></div>
        {/* </TableContainer> */}


        <AlertDialogSuccess
          isAlertOpen={openSuccess}
          handleAlertClose={handleClickCloseSuccess}
        >
          Changes were successfully saved.
        </AlertDialogSuccess>
      </Box>
    </>
  );
};


export default CalendarView;