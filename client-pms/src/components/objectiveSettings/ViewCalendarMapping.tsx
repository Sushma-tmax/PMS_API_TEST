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
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../assets/Images/Edit.svg";
import Eye from "../../assets/Images/Eye.svg";
import EditDisable from "../../assets/Images/Editcopy.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
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
  EDIT_CALENDAR_MAPPING,
  VIEW_MAPPED_EMPLOYEE,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";

import Tab from "@mui/material/Tab";
import {
  useAddCalendarMutation,
  useGetCalenderQuery,
  useGetTemplateQuery,
} from "../../service";

import {
  useCreateAppraisalCalenderMutation,
  useDeleteAppraisalCalenderMutation,
  useGetAppraisalCalenderQuery,
  useGetCurrentAppraisalCalenderQuery,
  useGetRecentAppraisalCalenderQuery,
  useUpdateAppraisalCalenderMutation,
} from "../../service/appraisalCalender/AppraisalCalender";

import Filtergroup from "../../assets/Images/Filtergroup.svg";
import Searchicon from "../../assets/Images/Searchicon.svg";
import { isError } from "lodash";
import PAMaster from "../UI/PAMaster";
import AlertDialog from "../UI/Dialog";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { wordBreak } from "html2canvas/dist/types/css/property-descriptors/word-break";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
//prompt -------functions
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
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

const ViewCalendarMapping = (props: any) => {
  const { loading } = props;

  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const [template, setTemplate] = useState<any>([]);
  const [yearArray, setYearArray] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetTemplateQuery("");
  console.log(data, "data");
  const { data: calenderData } = useGetCalenderQuery("");
  const [deleteAppraisalCalender, { error: deleteError }] =
    useDeleteAppraisalCalenderMutation();
  // const [addCalendar] = useAddCalendarMutation()
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const [uncheck, setUncheck] = useState<any>(false);
  // const [showEdit, setShowEdit] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [
    createAppraisalCalender,
    { error: calendarError, isError: calendarIsError },
  ] = useCreateAppraisalCalenderMutation();
  // const { data: recentAppraisalCalendars } = useGetRecentAppraisalCalenderQuery('');
  // const { data: appraisalCalendarData, isLoading: isDataLoading } =
  //   useGetAppraisalCalenderQuery(""); 
  const { data: appraisalCalendarData, isLoading: isDataLoading } =
  useGetCurrentAppraisalCalenderQuery("");
  const [updateAppraisalCalendar] = useUpdateAppraisalCalenderMutation();
  // console.log("recentAppraisalCalendars", recentAppraisalCalendars);

  const [year, setYear] = useState<any>("");
  const [edit, setEdit] = useState<any>("");
  console.log(edit,"edit")
  console.log( calenderData,"edit")
  const [termEdit, setTermEdit] = useState("");
  const [searchName, setSearchName] = useState("");
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [mappedTemplates, setMappedTemplates] = useState<any>([]);
  const [open1, setOpen1] = useState<any>(false);

  // to open delete dialog box
  const [open, setOpen] = useState<any>(false);
  const [appCalendar, setAppCalendar] = useState<any>();
  const [appCalendarId, setAppCalendarId] = useState<any>();

  const handleClose1 = () => {
    setOpen1(false);
  };
  //  delete functions
  const handleClickOpen = (appCalendar: any, id: any) => {
    setOpen(true);
    setAppCalendar(appCalendar);
    setAppCalendarId(id);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (appCalendar && appCalendarId) {
      deleteAppraisalCalenderHandler(appCalendarId);
    }
  };

  const deleteAppraisalCalenderHandler = (id: string) => {
    setOpen(false);
    deleteAppraisalCalender(id);
  };

  useEffect(() => {
    // if (id) {
    //   // let pa = appraisalCalendarData.data.filter((item: any) => item.calendar && item.calendar._id ==id );
    //   setYear(id);
    //   // setEditAppraisal(pa);
    // }
    if (year == "" && calenderData) setYear(calenderData?.data[0]?._id);
  }, [calenderData]);

  useEffect(() => {
    setTemplate(data?.templates);
  }, [data, isLoading]);

  // for getting the calendar id that is not live
  useEffect(() => {
    if (appraisalCalendarData !== undefined) {
      let filteredData = appraisalCalendarData?.data.filter((item: any) => {
        return item.status === "active" && item.calendar != undefined;
      });

      setActiveAppId(() => {
        let temp = filteredData.map((i: any) => {
          return i.calendar._id;
        });
        return temp;
      });
    }
  }, [appraisalCalendarData]);

  console.log(activeAppId, "activeAppId");
  console.log(appraisalCalendarData,'appraisalCalendarDataappraisalCalendarData')
  useEffect(() => {
    if (year && appraisalCalendarData) {
      let temp1 = appraisalCalendarData?.data?.filter((calendar: any) => {
        console.log(calendar,year,"calendarCheck")
        return calendar?.calendar?._id == year;
      });
      console.log(temp1, "yearrrrr");
      setMappedTemplates(temp1);
      let calendarObj = calenderData?.data?.filter((calendar: any) => {
        console.log(calendar,year,"calendarCheck")
        return calendar?._id == year;
      });
      console.log(calendarObj[0]?.start_date,temp1,"calendarObj")
    //  let calendarObj = calendardata(id==year)
     if( dayjs(calendarObj[0]?.start_date).isBefore(dayjs())){
      setEdit(false);
     } else{
      let temp2 = temp1.map((i: any) => {
        console.log(i,'dateeeeeeeeeeeeeeeee')
        if (
          i?.status == "active" ||
          dayjs(i?.calendar?.start_date).isBefore(dayjs())
        ) {
          setEdit(false);
          //return false;
         
        } else {
         setEdit(true);
          //return true;
         
        }
      });
      // setEdit(!temp2.includes(false));
     }
    
    }
  }, [year, appraisalCalendarData]);

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  if (calenderData && yearArray.length === 0) {
    let temp = calenderData.data.map((item: any) =>
      dayjs(item.start_date).format("YYYY")
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
    setUncheck(false);
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const tempUser = template.map((other: any) => {
        return { ...other, isChecked: checked };
      });
      setTemplate(tempUser);
    } else {
      console.log(template, "isLoading");
      const tempUser = template.map((other: any) => {
        return other._id === name ? { ...other, isChecked: checked } : other;
      });
      setTemplate(tempUser);
      console.log(tempUser, "temp");
    }
  };

  // const handleEdit = (pacalendar: any) => {
  //     setSelectedCalendar(pacalendar);
  //     setShowEdit(true)
  // }

  const handleEdit = () => {
    navigate(`${EDIT_CALENDAR_MAPPING}/${year}`);
    setSelectedCalendar(null);
    setUncheck(true);
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
        // hideAlertHandler();
      } else if (datat.data) {
        if (datat.data.success) setSuccess(true);
        setError(false);
        // hideAlertHandler();
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

  const onSubmit = () => {
    checkboxIdHandler(checkboxHandler(template))?.forEach((element: any) => {
      createAppraisalCalender({
        template: element.id,
        calendar: year,
      }).then((datat: any) => {
        console.log(datat, "datat");
        if (navPrompt === true) {
          setOpen1(true);
          setSuccess(true);
          setError(false);
          // hideAlertHandler();
          setnavPrompt(false);
        }

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
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };
  return (
    <>
      {" "}
      <PAMaster 
      name={"View Calendar Mapping"} 
      nav={`${CREATE_CALENDER}`} 
      secondName={"Calendar List"}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          // marginTop: "2px",
        }}
      >
        <div style={{ paddingTop: "15px", position: "absolute", width: "91%" }}>
          {/* {error && <Alert severity="error">{errorMessage}</Alert>} */}

          {/* {template?.length === 0 ? (
            <Alert severity="error">There is no template created .</Alert>
          ) : (
            ""

          )} */}
          <div style={{ width: "50%" }}>
            <Dialog
              open={open1}
              onClose={handleClose1}
              BackdropProps={{
                style: { background: "#333333", opacity: "10%" },
              }}
            >
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",

                    // display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    // wordBreak: "break-all",
                    height: "100px",
                    width: "300px",
                    alignItems: "center",
                  }}
                >
                  {success && (
                    <div>Templates are successfully mapped to a calendar.</div>
                  )}
                  {template?.length === 0 ? (
                    <div>There is no template created.</div>
                  ) : (
                    ""
                  )}
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
                        background: "transparent",
                        color:"#3e8cb5",
                        width: "70px",
                      height: "35px",
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleClose1}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div style={{ paddingTop: "70px" }}>
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>
                <FormControl
                fullWidth
                size="small"
                  
                >
                  {/* <InputLabel style={{}} id="demo-simple-select-autowidth-label">
                  Select
                </InputLabel> */}
                  <Select
                    sx={{
                      width: "90%",
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                  //   labelId="demo-select-small"
                  // id="demo-select-small"
                  // label="Select"
                  displayEmpty
                    value={year}
                    MenuProps={MenuProps}
                    renderValue={
                      year !== ""
                        ? undefined
                        : () => <div style={{ color: "#aaa" }}>Select</div>
                    }
                    onChange={(e: { target: { value: any } }) => {
                      setYear(e.target.value);
                      // setShowCalendarError(false)
                      //setnavPrompt(true);
                    }}
                    // error={!year && textfeildError}
                    // helperText={!year && textfeildError ? "*Name required." : " "}
                  >
                    {calenderData &&
                      activeAppId !== undefined &&
                      calenderData.data
                        // .filter((j: any) => {
                        //   return !activeAppId.includes(j._id);
                        //   //   let temp = activeAppId?.map((i:any)=>{
  
                        //   //    return i
                        //   //    })
  
                        //   //  return (!temp.includes(j._id))
                        // })
  
                        .map((j: any) => {
                          // if (dayjs(j.start_date).isAfter(dayjs())) {
                          return (
                            <MenuItem
                              key={j._id}
                              sx={{
                                height: "30px",
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                              }}
                              value={j._id}
                            >
                              <div>{j.name}</div>
                            </MenuItem>
                          );
                          // }
                        })}
                  </Select>
                </FormControl>

                {/* <TextField
                  select
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
                  label="Select Calendar"
                  id="demo-simple-select-label"
                  variant="outlined"
                  size="small"
                  value={year}
                  // variant="standard"
                  // MenuProps={MenuProps}
                  onChange={(e: { target: { value: any } }) => {
                    setYear(e.target.value);
                    // setShowCalendarError(false)
                    setnavPrompt(true);
                  }}
                  // error={!year && textfeildError}
                  // helperText={!year && textfeildError ? "*Name required." : " "}
                >
                  {calenderData &&
                    activeAppId !== undefined &&
                    calenderData.data
                      // .filter((j: any) => {
                      //   return !activeAppId.includes(j._id);
                      //   //   let temp = activeAppId?.map((i:any)=>{

                      //   //    return i
                      //   //    })

                      //   //  return (!temp.includes(j._id))
                      // })

                      .map((j: any) => {
                        // if (dayjs(j.start_date).isAfter(dayjs())) {
                        return (
                          <MenuItem
                            key={j._id}
                            sx={{
                              height: "30px",
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                            }}
                            value={j._id}
                          >
                            <div>{j.name}</div>
                          </MenuItem>
                        );
                        // }
                      })}
                </TextField> */}
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

              <div style={{ paddingTop: "57px", paddingLeft: "3px" }}>
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
                <TableContainer>
                  <Scroll>
                    <Scrollbar
                      style={{ width: "100%", height: "calc(100vh - 370px)" }}
                    >
                      <Table size="small" aria-label="simple table">
                        {/* <TableHead
                          style={{
                            position: "sticky",
                            zIndex: "1000",
                            top: "0px",
                          }}
                        >
                          <TableRow 
                          // sx={{ bgcolor: "#eaeced" }}
                          sx={{bgcolor:"#ffffff"}}
                          >
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
                          mappedTemplates.map((appCalendar: any) => {
                            return (
                              <TableBody key={appCalendar?.template?._id}>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      borderColor: "#lightgrey",
                                    },
                                  }}
                                >
                                  <TableCell
                                    width="40%"
                                    sx={{
                                      fontSize: "14px",
                                      color: "#333333",
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
                                    <Tooltip title="View">
                                      {/* <Link to={`${MAPPED_TEMPLATE_EDIT}/${calendar._id}`} state={{ from: `${calendar.calendar._id}`, name: `${calendar.calendar.name}` }}> */}
                                      {/* <Link to={`${MAPPED_TEMPLATE_3}/${calendar.template._id}`} */}
                                      <Link
                                        to={`${VIEW_MAPPED_EMPLOYEE}/${appCalendar._id}`}
                                        state={{
                                          from: `${appCalendar.calendar._id}`,
                                          tempName: `${appCalendar.template.name}`,
                                        }}
                                      >
                                        <IconButton
                                          aria-label="EditIcon"
                                          disabled={
                                            appCalendar?.status === "active" ||
                                            dayjs(
                                              appCalendar?.calendar?.start_date
                                            ).isBefore(dayjs())
                                          }
                                        >
                                          {appCalendar?.status === "active" ||
                                          dayjs(
                                            appCalendar?.calendar?.start_date
                                          ).isBefore(dayjs()) ? (
                                            <img src={Eye} alt="icon" />
                                          ) : (
                                            <img src={Eye} alt="icon" />
                                          )}
                                        </IconButton>
                                      </Link>
                                    </Tooltip>

                                    {/* <Tooltip title="Unmap">
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
                                          height: "35px",
                                        }}
                                        // disabled={calendar.status === "active"}
                                        onClick={() =>
                                          handleClickOpen(
                                            appCalendar,
                                            appCalendar._id
                                          )
                                        }
                                      >
                                        Unmap
                                     
                                      </Button>
                                    </Tooltip> */}
                                    <AlertDialog
                                      isAlertOpen={open}
                                      handleAlertOpen={() =>
                                        handleClickOpen(
                                          appCalendar,
                                          appCalendar._id
                                        )
                                      }
                                      handleAlertClose={handleClickClose}
                                      handleAlertIdClose={handleClickIdClose}
                                      rowAlert={appCalendar._id}
                                    >
                                      Are you sure you wish to unmap this
                                      template?
                                    </AlertDialog>
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
                    </Scrollbar>
                  </Scroll>
                </TableContainer>
              </div>

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
            <Grid sx={{ paddingTop: "5px !important" }} item xs={6}>
              <Paper
                elevation={3}
                sx={{
                  // paddingTop: "10px",
                  height: "calc(100vh - 240px)",
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
                        onChange={(e) => setSearchName(e.target.value)}
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
                      {/* <Button
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          width: "70px",
                          height: "35px",
                        }}
                        variant="outlined"
                        onClick={() => onSubmit()}
                      >
                        Save
                      </Button> */}
                      {edit && (
                        <Button
                          style={{
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            borderColor: "#3E8CB5",
                            color: "#3E8CB5",
                            background: "transparent",
                            width: "70px",
                            height: "35px",
                          }}
                          variant="outlined"
                          onClick={() => handleEdit()}
                        >
                          Edit
                        </Button>
                      )}
                    </Stack>
                  </div>
                </Stack>
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
                <Scroll>
                  <Scrollbar style={{ height: "calc(100vh - 395px)" }}>
                    {/* <Typography
                      sx={{
                        color: "#3E8CB5",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        paddingLeft: "20px",
                        paddingBottom: "15px",
                      }}
                    >
                      Unmapped Templates
                    </Typography> */}
                    {/* <br /> */}
                    {
                    // year &&
                    //   appraisalCalendarData &&
                      template
                        ?.filter((item: any) => {
                          return (
                            item.weightage != "" &&
                            item.status_template == "Completed"
                          );
                        })
                        .filter((filteredName: any) => {
                          //  Sushma 6/27
                          // to implement search for templates

                          if (searchName === "") {
                            return filteredName;
                          } else if (
                            filteredName.name
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())
                          ) {
                            return filteredName;
                          }
                        })
                        .filter((i: any) => {
                          return !mappedTemplates
                            ?.map((item: any) => item?.template?._id)
                            .includes(i._id);
                        })
                        .map((j: any, index: any) => {
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
                                {/* <input
                                  name={j._id}
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
                                /> */}
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
                                  {j.name}
                                </div>
                              </div>{" "}
                            </>
                          );
                        })}
                  </Scrollbar>
                </Scroll>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default ViewCalendarMapping;
