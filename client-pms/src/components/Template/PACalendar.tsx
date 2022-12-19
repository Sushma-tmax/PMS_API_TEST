import React, { useEffect, useState, useRef } from "react";
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
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import EditDisable from "../../assets/Images/Editcopy.svg";
import Tooltip from "@mui/material/Tooltip";
import Pause from "../../assets/Images/Pause.svg";
import Copy from "../../assets/Images/Copy.svg";
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
import { isAfter, isBefore, subDays } from "date-fns";
import { parseISO } from "date-fns/esm/fp";
import { styled } from "@mui/material/styles";
import AlertDialogSuccess from "../UI/DialogSuccess";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
export default function CreateCalender(props: any) {
  const { data,isLoading, onDelete, start, onPause } = props;
  const today = new Date();
  const [year, setYear] = React.useState("");
  const [yearNumber, setYearNumber] = React.useState("");
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [activeStatus, setActiveStatus] = useState<any>(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [groupedCalendarData, setGroupedCalendarData] = useState<any>([]);
  const [pacalendars, setPacalendars] = useState<any>([]);
  console.log(pacalendars,isLoading, "pacalendars")
  const navigate = useNavigate();
  
  //empty data
  const [emptyData, setemptyData] = useState("");
  console.log(emptyData, "emptyData")
  useEffect(() => {
    if(isLoading === false){
    setTimeout(() => {
      setemptyData("There is no Appraisal Calendar created!");
    }, 2000);
  }
  }, [])



  const handleYear = (event: SelectChangeEvent) => {
    setFilterYear(event.target.value);
  };

  const handleTitle = (event: SelectChangeEvent) => {
    setFilterTitle(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewName(nameAlert);
    //console.log(newId)
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      console.log(newId);
    }
  };

  const launchAppraisal = (id: any) => {
    let PACalendars = data.data.filter(
      (item: any) => item.calendar && item.calendar._id == id
    );
    let temp = PACalendars.filter((item: any) => {
      return item.position != undefined && item.position.length == 0
    }
    )
    console.log(temp,"temp")

    if(temp.length == 0){
   PACalendars.forEach((cal: any) => {
    console.log("alertsuccess")
       start(cal._id);
    });
    }else{
    console.log("alertfail")
    setcannotLaunch(true);
    }
 
  };

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
    if (row.status !== "active") {
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
   //dialog

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
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          // boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          background: "#fff",
          padding: "25px",
        }}
        maxWidth="lg"
      >
        {data &&
          pacalendars?.length === 0 ? (
          <>
            {emptyData}
          </>
        ) : (
          ""
        )}
        <TableContainer >
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 230px)" }}>
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
                      width="35%"
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
                      width="15%"
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
                      width="15%"
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
                      width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    pacalendars
                      .filter((j: any) => {
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
                            {row?.calendar?.name}{" "}

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
                            {row.status === "active" && !dayjs(row?.calendar?.end_date).isBefore(dayjs()) ? (
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
                            ) : (dayjs(row?.calendar?.end_date).isBefore(dayjs()) ?
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
                            align="center"
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
                                onClick={() => {
                                  // start(row._id);
                                  launchAppraisal(row.calendar._id);
                                  setActiveStatus(true);
                                }}
                              >
                                <img src={Play} alt="icon" />
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
                                  row.status === "active" ||
                                  dayjs(row?.calendar?.start_date).isBefore(dayjs())
                                }

                              // onClick={() => navigate(`${MAPPED_TEMPLATE_EDIT}/${row.calendar._id}`)}
                              // onClick={() => editHandler(row)}
                              >
                                <Link
                                  // to={`${VIEW_MAPPED_TEMPLATE}/${row.calendar._id}`}
                                  to={`${EDIT_CALENDAR_MAPPING}/${row?.calendar?._id}`}
                                  state={{
                                    from: `${row?.calendar?._id}`,
                                    name: `${row?.calendar?.name}`,
                                  }}
                                >
                                  {/* <img src={Edit} alt="icon"/> */}
                                  {row.status === "active" ||
                                    dayjs(row?.calendar?.start_date).isBefore(
                                      dayjs()
                                    ) ? (
                                    <img src={EditDisable} alt="icon" />
                                  ) : (
                                    <img src={Edit} alt="icon" />
                                  )}
                                </Link>
                              </IconButton>
                              {/* </Link> */}
                            </Tooltip>
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
                                handleClickOpen(row?._id, row?.name)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleClickIdClose}
                              rowAlert={row}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
        </TableContainer>
        <AlertDialogSuccess
           isAlertOpen={cannotLaunch}
           handleAlertClose={handleClickLaunchClose}
        >
         This calendar cannot be launched as there are templates with no employees mapped to it.
        
        </AlertDialogSuccess>
      </Container>
    </>
  );
}
