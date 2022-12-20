import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Menu,
  Toolbar,
  Typography,
  TextField,
  Stack,
  styled,
  InputAdornment,
  Tooltip,
  Checkbox,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_FILTER,
  MAPPED_TEMPLATE_2,
  MAPPED_TEMPLATE_3,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
  MAPPED_TEMPLATE_EDIT,
  FILTERED_TEMPLATES_SINGLE,
  VIEW_MAPPED_TEMPLATE,
} from "../../constants/routes/Routing";
import { useNavigate, useLocation } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Eye from "../../assets/Images/Eye.svg";
import Filtergroup from "../../assets/Images/Filtergroup.svg";
import Close from "../../assets/Images/Close.svg";

import Tab from "@mui/material/Tab";
import PAMaster from "../UI/PAMaster";
import Searchicon from "../../assets/Images/Searchicon.svg";
import Scrollbar from "react-scrollbars-custom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useGetAppraisalCalenderQuery, useGetCalenderQuery } from "../../service";
import { useUpdateAppraisalCalenderMutation, useDeleteAppraisalCalenderMutation } from "../../service/appraisalCalender/AppraisalCalender";
import AlertDialog from "../UI/Dialog";


const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});

const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "120%",
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

const MappedTemplateEdit = (props: any) => {
  const { loading } = props;
  const { data: appraisalCalendarData, isLoading } = useGetAppraisalCalenderQuery('')
  const { data: calenderData } = useGetCalenderQuery('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [yearArray, setYearArray] = useState<any>([]);
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [searchName, setSearchName] = useState('')
  const [activeId, setActiveId] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [year, setYear] = useState('')
  const [term, setTerm] = useState('')
  const [open1, setOpen1] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<any>();
  const [selectedCalendarId, setSelectedCalendarId] = useState<any>();
  const [deleteAppraisalCalender, { error: deleteError }] = useDeleteAppraisalCalenderMutation();
  const [editAppraisal, setEditAppraisal] = useState([]);
  const [activeAppId, setActiveAppId] = useState<any>([]);

  const location: any = useLocation();
  const { from, name } = location.state;
  console.log("from", from);
  const navigate = useNavigate();
  const { id } = useParams()
  console.log(appraisalCalendarData, 'CalendarAppraisalData')

  useEffect(() => {
    if (appraisalCalendarData) {
      let pa = appraisalCalendarData.data.filter((item: any) => item.calendar && item.calendar._id == from);
      setEditAppraisal(pa);
    }
  }, [appraisalCalendarData])

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

  const editHandler = (calendar: any) => {
    // console.log(activeId, 'ist', id, 'iddddddddd')
    // if (calendarid !== "" && calendarid === id) {
    //   setShowEdit(true)
    // } else if (calendarid !== id) {
    //   setShowEdit(false)
    // }
    setShowEdit(true);
    setTerm(calendar.calendar._id);
    setYear(dayjs(calendar?.calendar?.start_date).format("YYYY"))
  }
  const handleCancel = () => {
    // setSelectedCalendar(null);
    setShowEdit(false)
  }

  if (calenderData && yearArray.length == 0) {
    let temp = calenderData.data.map((item: any) => dayjs(item.start_date).format("YYYY"))
    let years = [...new Set(temp)]
    setYearArray(years);
  }

  const [updateAppraisalCalendar] = useUpdateAppraisalCalenderMutation()
  const saveHandler = (calendar: any) => {
    console.log(calendar, 'calendarrrrrr')
    updateAppraisalCalendar({
      template: calendar.template._id,
      calendar: term,
      id: calendar._id
    });
    setShowEdit(false)
  }

  const handleClickClose = () => {
    setOpen1(false);
  };
  const handleClickOpen = (calendar: any, id: any) => {
    console.log('openn')
    setOpen1(true);
    setSelectedCalendar(calendar);
    setSelectedCalendarId(id)
  };

  const handleClickIdClose = () => {
    if (selectedCalendar && selectedCalendarId) {
      deleteAppraisalCalenderHandler(selectedCalendar._id)
    }
  };

  const deleteAppraisalCalenderHandler = (id: string) => {
    console.log('clicked')
    setOpen1(false);
    deleteAppraisalCalender(
      id
    )
    // .then(() => refetch())
  }

  return (
    <>
      {" "}
      <PAMaster name={"View Employee Mapping"} 
      // nav={`${CREATE_CALENDER}`} 
      />

      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
        }}
      >
        <Stack
          style={{ paddingTop: "10px" }}
          direction="row"
          justifyContent="space-between"
        >
          <span
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily:"Arial"
            }}
          >
            {name}
          </span>

          {/* <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "right" }}
            spacing={2}
          >


            <Link to={LINK_CALENDAR}>
              <Button
                style={{
                  textTransform: "none",
                  backgroundColor: "#014D76",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  padding: "4px 19px",
                }}
                variant="contained"
              >
                Link Calendar
              </Button>
            </Link>
          </Stack> */}
        </Stack>
        <p>
          <Searchfeild>
            <TextField
              id="outlined-basic"
              placeholder="Search Here..."
              value={searchName}
              onChange={(e) => { setSearchName(e.target.value) }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={Searchicon} alt="icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Searchfeild>
        </p>


        <TableContainer>
          <Scroll>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 280px)" }}>
            <Table size="small" aria-label="simple table">
              <TableHead  style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                <TableRow  sx={{ bgcolor: "#eaeced" }}>
                  <TableCell
                 
                    sx={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      width:"40%"
                    }}
                    align="left"
                  >
                    Template Name
                  </TableCell>
                  {/* <TableCell
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
                  </TableCell> */}
                  <TableCell
                    sx={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      width:"30%"
                    }}
                    align="left"
                  >
                    Calendar Name <ArrowDropDownIcon sx={{
                      verticalAlign: "middle"
                    }} />
                  </TableCell>
                  <TableCell
                   sx={{
                    fontFamily: "Arial",
                    borderColor: "#F7F9FB",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    width:"20%"
                  }}
                  align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {editAppraisal.filter((calendarFilter: any) => {
                return calendarFilter.calendar !== undefined && calendarFilter.template != null && calendarFilter.calendar !== null
              }).filter((search: any) => {
                if (searchName === "") {
                  return search;
                } else if (
                  search.template?.name !== undefined && search.template.name
                    .toLocaleLowerCase()
                    .includes(searchName.toLocaleLowerCase()) ||
                  dayjs(search?.calendar?.start_date).format("YYYY") !== undefined && dayjs(search?.calendar?.start_date).format("YYYY")
                    .toLocaleLowerCase()
                    .includes(searchName.toLocaleLowerCase()) ||
                  search.calendar?.name !== undefined && search.calendar?.name
                    .toLocaleLowerCase()
                    .includes(searchName.toLocaleLowerCase())
                ) {
                  return search
                }
              })
                .map((calendar: any) => {
                  return (
                    <TableBody key={calendar._id} >
                      {(!showEdit || (id !== calendar._id)) && (<TableRow
                       sx={{
                        "&:last-child td, &:last-child th": {
                          borderColor: "#lightgrey",
                        },
                      }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            
                          }}
                          align="left"
                        >
                          {calendar?.template?.name}
                        </TableCell>
                        {/* <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#33333",
                            opacity: "80%",
                            fontFamily: "regular",
                          }}
                          align="left"
                        >
                          {dayjs(calendar?.calendar?.start_date).format("YYYY")}
                        </TableCell> */}
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          {calendar?.calendar?.name}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "14px", color: "#7A7A7A" }}
                        align="center"
                        >

                          <Tooltip title="Edit">
                            {/* <Link to={`${MAPPED_TEMPLATE_EDIT}/${calendar._id}`} state={{ from: `${calendar.calendar._id}`, name: `${calendar.calendar.name}` }}> */}
                            {/* <Link to={`${MAPPED_TEMPLATE_3}/${calendar.template._id}`} */}
                            <Link to={`${VIEW_MAPPED_TEMPLATE}/${calendar.template._id}`}
                           state={{
                            from: `${from}`,
                            tempName: `${name}`,
                          }}>
                              <IconButton aria-label="EditIcon">
                                <img src={Edit} alt="icon"
                                  // onClick={() => {
                                  //   // setActiveId(calendar._id);
                                  //   editHandler(calendar);
                                  // }}
                                />
                              </IconButton>
                            </Link>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton aria-label="CancelOutlinedIcon "
                              disabled={calendar.status === "active"}
                              onClick={() => handleClickOpen(calendar, calendar._id)}>
                              <img src={Close} alt="icon" />
                            </IconButton>
                          </Tooltip>
                          <AlertDialog
                            isAlertOpen={open1}
                            handleAlertOpen={() =>
                              handleClickOpen(calendar, calendar._id)
                            }
                            handleAlertClose={handleClickClose}
                            handleAlertIdClose={handleClickIdClose}
                            rowAlert={calendar._id}
                          >
                            Are you sure you wish to delete this item?
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
                      </TableRow>)}

                      {/* {(showEdit === true) && (id === calendar._id) && (<TableRow */}
                      {(showEdit === true) && (id === calendar._id) && (
                      <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          borderColor: "#lightgrey",
                        },
                      }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          {calendar?.template?.name}
                        </TableCell>
                        {/* <TableCell
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

                        </TableCell> */}
                        <TableCell
                           sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          <TextField 
                          sx={{ width: "60%", "& .MuiInputBase-input": {
                                  // color: "rgb(62 140 181 / 28%)",
                                  fontSize: "14px",
                                  textTransform: "none",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                },}}
                            select size="small"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}>
                            {calenderData &&
                             activeAppId !== undefined &&
                              calenderData.data
                              .filter((j: any) => {  
                                     
                                return !activeAppId.includes(j._id);
                                
                              })
                                .filter((item: any) => {
                                  const dates = dayjs(item.start_date).format("YYYY")
                                  console.log(dates, 'dates')
                                  return (
                                    year != "" ? dates === year : true
                                  )
                                })
                                .map((i: any) => {
                                  console.log(i, 'iiii')
                                  if (dayjs(i.start_date).isAfter(dayjs())) {
                                    return (
                                      <MenuItem key={i._id} sx={{ height: "16px",fontSize:"14px",fontFamily:"Arial",color:"#333333" }} value={i._id}>
                                        <div>{i.name}</div>
                                      </MenuItem>
                                    )
                                  }
                                })}

                          </TextField>
                        </TableCell>
                        <TableCell
                         
                          align="right"
                        >
                          <Stack
                            alignItems="right"
                            direction="row"
                            justifyContent="right"
                            spacing={2}
                          >
                            <Button
                              style={{
                                textTransform: "none",
                                fontSize: "15px",
                                fontFamily: "Arial",
                                borderColor: "#3e8cb5",
                                color: "#3e8cb5",
                              }}
                              variant="outlined"
                              onClick={() => saveHandler(calendar)}
                            >
                              Save
                            </Button>

                            <Button
                              style={{
                                textTransform: "none",
                                fontSize: "15px",
                                fontFamily: "Arial",
                                borderColor: "#3e8cb5",
                                color: "#3e8cb5",
                              }}
                              variant="outlined"
                              onClick={() => handleCancel()}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>)}
                    </TableBody>
                  )
                })}
            </Table>
          </Scrollbar>
          </Scroll>
        </TableContainer>
        
      </Container>
    </>
  );
};

export default MappedTemplateEdit;