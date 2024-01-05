import * as React from "react";

import { useState } from "react";

import {
  Box,
  Container,
  Alert,
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
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Scrollbar, ScrollbarContext } from "react-scrollbars-custom";
import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_FILTER,
  MAPPED_TEMPLATE_2,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
  MAPPED_TEMPLATE_3,
  CREATE_MAPPING_NEW,
  MAPPED_TEMPLATE_EDIT,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Eye from "../../assets/Images/Eye.svg";
import Filtergroup from "../../assets/Images/Filtergroup.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PAMaster from "../UI/PAMaster";
import Searchicon from "../../assets/Images/Searchicon.svg";
import MappedTemplate2 from "./ViewLinkedCalendars";
import Position1 from "./Position1";
import {
  useGetSingleTemplateQuery,
  useGetTemplateQuery,
  useGetAppraisalCalenderQuery,
  useGetCalenderQuery
} from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import dayjs from "dayjs";
import AlertYesNo from "../UI/DialogYesNo";
import AlertDialogSuccess from "../UI/DialogSuccess";
import AlertAcceptDialog from "../UI/DialogAccept";
import { useGetDraftCalendarQuery } from "../../service/calender/Calender";
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
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
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
  "& .MuiTextField-root": {
    minWidth: "94%",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
});
const Searchfeild1 = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
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

const MappedTemplate3 = (props: any) => {
  const { loading } = props;
  const { data: appraisalCalData, refetch: fetchMapped, isFetching: appraisalCalendarLoading } = useGetAppraisalCalenderQuery("");
  // const { data: calenderData, isLoading: calenderDataLoading } = useGetCalenderQuery("");
  const { data: calenderData, isLoading: calenderDataLoading  } = useGetDraftCalendarQuery("");
  // console.log(calenderddata, "calenderddata");
  console.log(calenderData, "calenderData")
  const CustomScrollbar = Scrollbar as any;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);

  const navigate = useNavigate();
  //template - Hari
  const { id } = useParams();
  const { data: weightageData, isLoading, refetch } = useGetTemplateQuery("");
  const [checkboxData, setCheckboxData] = useState<any>([]);
  console.log(checkboxData, "checkboxData");
  const [searchName, setSearchName] = useState("");
  const [name, setname] = useState("");
  const [value, setValue] = React.useState<number>();
  //color
  const [activeTemplate, setActiveTemplate] = useState<any>("")
  const [selectedOption, setSelectedOption] = useState("None");
  const [templatename, settemplatename] = useState<any>(false)

  const [highlightTemplate, setHighlightTemplate] = useState<any>(false)
  const [changed, setChanged] = React.useState<any>(false);


  const colorHandler = (tempId: any) => {
    if (tempId) {
      setActiveTemplate(tempId);
      setHighlightTemplate(true)
    } else if (tempId != id) {
      setHighlightTemplate(false)
    }
  }
  //color
  //tab navigationalert
  const [tabNum, setTabNum] = useState(0);
  const [dataofclick, setDataofclick] = useState<any>([]);
  const [valueForPosition, setValueForPosition] = React.useState<number>();
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNum(newValue);
    // settabValues(0);
    setHighlightTemplate(newValue);
    // setValue(newValue);
    if (triggerTheNav1 === false) {
      setValue(newValue);
    } else {
      setTabNav(true)
      // setnavPrompt(false)
    }
  };


  const handleChangeWhenClick = (name: any) => {
    console.log(dataofclick?.template?._id,name?.template?._id,"template" )
    setDataofclick(name)
    if (triggerTheNav1 === false) {
      setname(name?.template?.name);
      colorHandler(name?.template?._id);
      navigate(`${MAPPED_TEMPLATE_3}/${name?._id}`);
    } else if(dataofclick?.template?._id != name?.template?._id && changed == true){
      setTabNav(true)
      // setnavPrompt(false)
    }
  };

  //tab navigationalert
  const [tabNav, setTabNav] = useState(false);
  const [triggerTheNav, settriggerTheNav] = useState(false);
  const [triggerTheNav1, settriggerTheNav1] = useState(false);
  const handleAlertYes = () => {

    setTabNav(false)

  };
  const handleAlertNo = () => {
    setIsChecked(true);
    settabValues(0);
    settriggerTheNav(false)
    settriggerTheNav1(false)
    setTabNav(false)
    setValue(tabNum);
    setname(dataofclick?.template?.name);
    colorHandler(dataofclick?.template?._id);
    navigate(`${MAPPED_TEMPLATE_3}/${dataofclick?._id}`);
  
  };
  //tab navigationalert
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (weightageData !== undefined) {
      if (weightageData.templates) {
        const result = weightageData?.templates
          // .slice()
          // .sort(function (a: any, b: any) {
          //   return a?.name?.localeCompare(b?.name);
          // })
          .filter((item: any) => {
            return item?.weightage != "" && item?.position?.length > 0;
          });
        setCheckboxData(result);
      }
    }
  }, [weightageData]);

  // useEffect(() => {
  //   if (checkboxData !== undefined) {
  //     if (id) {
  //       setValue(() => {
  //         // @ts-ignore
  //         let temp = checkboxData
  //           // .slice()
  //           // .sort(function (a: any, b: any) {
  //           //   return a.name.localeCompare(b.name);
  //           // })
  //           .filter((item: any) => {
  //             return item.weightage != "" && item.position.length > 0;
  //           });
  //         console.log(temp, "temp");

  //         return temp.findIndex((item: any) => item._id === id);
  //       });
  //     } else {
  //       console.log(checkboxData, "checkboxxx");

  //       if (
  //         checkboxData !== undefined &&
  //         checkboxData !== "" &&
  //         checkboxData.length > 0
  //       ) {
  //         // return navigate(`${MAPPED_TEMPLATE_3}/${weightageData.templates[0]._id}`);
  //         return navigate(`${MAPPED_TEMPLATE_3}/${checkboxData[0]?._id}`);
  //       }
  //     }
  //   }
  // }, [checkboxData, id, weightageData]);

  const handleCheckbox = (e: any) => {
    const { name, checked } = e.target;
    const tempCheckbox = checkboxData.map((item: any) => {
      return item._id === name ? { ...item, isChecked: checked } : item;
    });

    setCheckboxData(tempCheckbox);
  };

  const checkboxHandler = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
          isChecked: i.isChecked,
        };
      });
      return check;
    }
  };

  useEffect(() => {
    //@ts-ignore
    console.log(checkboxIdHandler(checkboxHandler(checkboxData)));
  }, [checkboxData]);
  //template

  //Appraisal calendar
  const [year, setYear] = useState("");
  console.log(year, "year");
  //Appraisal calendar data
  const [MappedTemplates, setMappedTemplates] = useState<any>([]);
  console.log(MappedTemplates, "MappedTemplates");
  //getting the templates mapped to  the selected calendar
  useEffect(() => {
    if (year && appraisalCalData) {
      let temp1 = appraisalCalData?.data?.filter((calendar: any) => {
        return calendar?.calendar?._id == year;
      });
      console.log(temp1, "yearrrrr");
      setMappedTemplates(temp1);
    }
  }, [year, appraisalCalData]);

  const [activeAppId, setActiveAppId] = useState<any>(null);
  useEffect(() => {
    if (appraisalCalData !== undefined) {
      let filteredData = appraisalCalData?.data.filter((item: any) => {
        return item.status === "active" && item.calendar != undefined;
      });

      setActiveAppId(() => {
        let temp = filteredData.map((i: any) => {
          return i.calendar._id;
        });
        return temp;
      });
    }
  }, [appraisalCalData]);

  //  to set the tab value based on the template selected in all employees tab
  useEffect(() => {
    if (MappedTemplates) {
      let temp: any = MappedTemplates.find((item: any) => item.template.name == name)
      let templateIndex = MappedTemplates.indexOf(temp)
      console.log(templateIndex, 'templateIndex')
      if (templateIndex >= 0) {
        setValue(templateIndex)
        colorHandler(temp?.template?._id);
        navigate(`${MAPPED_TEMPLATE_3}/${temp?._id}`);
      }
    }
  }, [name])

  //Appraisal calendar

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
      "align-items": "flex-start",
    };
  }

  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (name !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [name]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty
  );
  //prompt ------functions
  const ITEM_HEIGHT = 20;
  const ITEM_PADDING_TOP = 4;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
        fontSize: "14px !important",
        fontFamily: "arial",
        color: "#333333"
      },
    },
  };
  const [showemptyVal, setshowemptyVal] = useState(false);
  //console.log(calenderData, "calenderData")
  // useEffect(() => {
  //   const Calendar = calenderData &&
  //     activeAppId !== undefined &&
  //     calenderData.data
  //       .filter((j: any) => {
  //         return !activeAppId.includes(j._id);
  //       })
  //       .map((j: any) => {
  //         if (dayjs(j.end_date).isAfter(dayjs())) {
  //           if (j.name == undefined || j.name == null) {
  //             setShown(true)
  //           }
  //           console.log(j.name, "neeeeee")
  //           return (
  //             <>
  //               {j}
  //             </>
  //           );
  //         }
  //       }

  //       )

  //   console.log(Calendar, "newone")
  // }, [calenderData, appraisalCalData, year])


  useEffect(() => {
    const Calendar = calenderData &&
      activeAppId !== undefined &&
      calenderData?.data
        ?.filter((j: any) => {
          const startDate = dayjs(j?.start_date)?.startOf('day'); 
        const today = dayjs().startOf('day');
          return (
          //   (dayjs(j?.start_date)?.isAfter(dayjs()) || dayjs(j.start_date).isSame(dayjs()))
          //   // && j?.status == "draft"
          (startDate.isAfter(today) || startDate.isSame(today)) 
          // && j?.status == "draft"
          )
        })
    if (Calendar?.length == 0) {
      setshowemptyVal(true)
    } else {
      setshowemptyVal(false)
    }
    console.log(Calendar?.length, "newone")
  }, [calenderData,appraisalCalData, activeAppId])

  const [tabValues, settabValues] = React.useState(0);

let templatelength =MappedTemplates &&MappedTemplates
  ?.filter((filteredName: any) => {

    if (searchName === "") {
      return filteredName;
    } else if (
      filteredName?.template?.name
        ?.toLocaleLowerCase()
        ?.includes(searchName?.toLocaleLowerCase())
    ) {
      return filteredName;
    }
  })
  console.log(templatelength?.length,"templatelength")
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setSearchName(e.target.value);
    
    }

  return (
    <>
      {" "}
      <PAMaster
        name={"Create Employee Mapping"}
      // nav = {`${CREATE_MAPPING_NEW}`}
      />
      <div style={{ background: "#F1F1F1", height: "auto" }}>

        <Box
          sx={{
            // maxWidth: "95% !important",
            // width: "100%",
            height: "auto",
            backgroundColor: "#fff",
            padding: "20px",
            position: "relative",
            marginLeft: "25px",
            marginRight: '25px'
          }}
        >
          {/* <div
          style={{
            position: "absolute",
            width:"95%",
            height:"30px"
          }}
        >
          {checkboxData?.length === 0 ? (
            <Alert severity="error">
              There is no position mapped for template!
            </Alert>
          ) : (
            ""
          )}
        </div> */}
          <Grid container spacing={2} style={{ paddingTop: "10px" }}>
            <Grid item xs={12} md={3}>
              {/* <span
              style={{
                fontSize: "22px",
                color: "#004C75",
              }}
            >
              Mapped Templates
            </span> */}
              <div>
                <Typography
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial",
                    color: "#3e8cb5",
                    paddingBottom: "12px",
                    paddingTop: "6px",
                  }}
                >
                  Select Calendar
                </Typography>

                {/* <p style={{
                  marginLeft: "40px"
                }}>No Calendars were Mapped</p> */}


                <FormControl fullWidth size="small">
                  {/* <InputLabel style={{}} id="demo-simple-select-autowidth-label">
                 Select
                </InputLabel> */}

                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        // color: "rgb(62 140 181 / 28%)",
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    MenuProps={MenuProps}
                    variant="outlined"
                    displayEmpty
                    value={year}
                    renderValue={
                      year !== ""
                        ? undefined
                        : () => <div style={{ color: "#aaa" }}>Select</div>
                    }
                    // variant="standard"
                    // MenuProps={MenuProps}
                    onChange={(e: { target: { value: any } }) => {
                      setYear(e.target.value);
                      // setShowCalendarError(false)
                      //setnavPrompt(true);
                    }}
                  >
                    {calenderData &&
                      activeAppId !== null &&
                      calenderData.data
                        .filter((j: any) => {
                          return !activeAppId.includes(j._id);
                          //   let temp = activeAppId?.map((i:any)=>{

                          //    return i
                          //    })

                          //  return (!temp.includes(j._id))
                        })

                        .map((j: any) => {
                          const startDate = dayjs(j?.start_date)?.startOf('day'); 
                          const today = dayjs().startOf('day');
                          if (startDate.isAfter(today) || startDate.isSame(today)) { 
                          // if (dayjs(j.start_date).isAfter(dayjs()) || dayjs(j.start_date).isSame(dayjs(), 'day')) {
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
                          }
                        })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ paddingBottom: "10px", paddingTop: "50px" }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial",
                    color: "#3e8cb5",
                  }}
                >
                  Templates
                </span>
              </div>
              <Paper
                elevation={3}
                sx={{
                  paddingTop: "10px",
                  // width: 250,
                  height: "calc(100vh - 365px)",
                }}
              >
                <div
                // style={{
                //   paddingLeft: "20px",
                //   // paddingRight: "20px",
                // }}
                >
                  <Searchfeild>
                    <TextField
                      id="outlined-basic"
                      autoComplete="off"
                      placeholder="Search Here..."
                      onChange={handleSearchBar}
                      //onChange={(e) => setSearchName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={Searchicon} alt="icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Searchfeild>
                  <div style={{ paddingTop: "10px" }}>
                    {/* style={{ overflowY: "scroll", height: "285px" }} */}
                    <Scroll>
                      <CustomScrollbar style={{ height: "calc(100vh - 425px)" }}>
                        {templatelength?.length > 0 ?
                        <Tabs
                          orientation="vertical"
                          variant="scrollable"
                          value={value}
                          onChange={handleChange}
                          style={{ color: "#676666" }}
                          TabIndicatorProps={{
                            style: {
                              left: 0,
                              borderColor: "divider",
                              alignItems: "start",
                            },
                          }}
                        >
                          {MappedTemplates &&
                            MappedTemplates
                              ?.filter((filteredName: any) => {

                                if (searchName === "") {
                                  return filteredName;
                                } else if (
                                  filteredName?.template?.name
                                    ?.toLocaleLowerCase()
                                    ?.includes(searchName?.toLocaleLowerCase())
                                ) {
                                  return filteredName;
                                }
                              })
                              ?.map((name: any, index: number) => {
                                return (
                                  <Tab
                                    style={{
                                      textTransform: "none",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      alignItems: "start",
                                      textAlign: "left",
                                      wordBreak: "break-all",
                                      // @ts-ignore
                                      color: highlightTemplate && activeTemplate == name.template._id && "#3e8cb5"
                                    }}
                                    onClick={() => {
                                      // if(triggerTheNav1 === false){
                                      // setname(name?.template?.name);
                                      // colorHandler(name?.template?._id);
                                      // //navigate(`${MAPPED_TEMPLATE_3}/${name?.template?._id}`);
                                      // navigate(`${MAPPED_TEMPLATE_3}/${name?._id}`);
                                      // }
                                      // handleChange();

                                      setSelectedOption("None")
                                      handleChangeWhenClick(name);
                                      //to reset the filters on tab change
                                      settemplatename(true);
                                      //to reset the checkbox selection
                                      
                                      setnavPrompt(false);
                                    }}
                                    label={name?.template?.name}
                                    {...a11yProps(index)}
                                  />
                                  // <Stack paddingLeft="20px" paddingTop="20px" spacing={2}>
                                  //   <Typography sx={{
                                  //     fontFamily: "arial",
                                  //     fontSize: "16px",
                                  //     color: "#333333",
                                  //     }}
                                  //     >
                                  //       {name?.template?.name}
                                  //       </Typography>
                                  //       </Stack>
                                );
                              })}
                          {/* {checkboxData &&
                          checkboxData
                            .filter((filteredName: any) => {
                              //  Sushma 6/27
                              // to implement search for templates
                              // console.log(filteredName, 'filteredName')
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
                            .map((i: any, index: number) => {
                              console.log(i, "iiiiiiiiiiiiiii");
                              return (
                                <Tab
                                  style={{
                                    textTransform: "none",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    alignItems: "start",
                                    textAlign: "left",
                                    wordBreak: "break-all",
                                  }}
                                  onClick={() => {
                                    navigate(`${MAPPED_TEMPLATE_3}/${i._id}`);
                                    setname(i.name);
                                    // handleChange();
                                  }}
                                  label={i.name}
                                  {...a11yProps(index)}
                                />
                              );
                            })} */}
                        </Tabs>
                        :
                        <span
                        style={{
                          marginLeft: "20px"
                        }}
                        >
                          No Template to display
                          </span>
              }
                        {console.log(value, "value")}
                      </CustomScrollbar>
                    </Scroll>
                  </div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Position1
                setIsChecked={setIsChecked}
                isChecked={isChecked}
                templatename={templatename}
                settemplatename={settemplatename}
                checkedTemplatesID={checkboxIdHandler(
                  checkboxHandler(checkboxData)
                )}
                changed={changed}
                setChanged={setChanged}
                setTabNav={setTabNav}
                tabNav={tabNav}
                name={name}
                setname={setname}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                refetch={refetch}
                MappedTemplates={MappedTemplates}
                fetchMapped={fetchMapped}
                year={year}
                showemptyVal={showemptyVal}
                setshowemptyVal={setshowemptyVal}
                settriggerTheNav1={settriggerTheNav1}
                triggerTheNav={triggerTheNav}
                settriggerTheNav={settriggerTheNav}
                appraisalCalendarLoading={appraisalCalendarLoading}
                calenderDataLoading={calenderDataLoading}
                highlightTemplate={highlightTemplate}
                tabValues={tabValues}
                settabValues={settabValues}
              />
            </Grid>
          </Grid>

          {/* <AlertAcceptDialog
            isAlertOpen={tabNav}
            handleAlertClose={handleAlertYes}
            handleAlertIdClose={handleAlertNo}
          >
            If you leave the page, your changes will be discarded.
          </AlertAcceptDialog> */}
          <Dialog
      open={tabNav}
      // onClose={handleAlertClose}
      // BackdropProps={{ style: { background: "#333333 !important",opacity:"1%" } }}
      PaperProps={{
        style: {
          
          boxShadow: "none",
          borderRadius: "6px",
          maxWidth: "0px",
          minWidth: "26%",
          margin:"0px",
          padding:"30px",
          
        },
      }}
      // aria-labelledby="alert-dialog-title"
      // aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            color: "#333333",
            fontSize: "14px",
            fontFamily:"Arial",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            wordBreak: "break-word",
            // height: "100px",
            alignItems: "center",
            overflowY:"hidden",
          }}
        >Any changes you have made will not be saved if you leave the page.
        </DialogContentText>
      </DialogContent>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background:"transparent",
              height:"35px",
              width:"70px"
            }}
            variant="outlined"
            onClick={handleAlertNo}
          >
            Ok
          </Button>
        </DialogActions>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background:"transparent",
              height:"35px",
              width:"70px"

            }}
            variant="outlined"
            onClick={handleAlertYes}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
          {/* <AlertDialogSuccess
          isAlertOpen={tabNav}
          handleAlertClose={handleAlertNo}
          handleAlertYes={handleAlertYes}>
          //  Please save the changes before you leave the page. 
          If you leave the page, your changes will be discarded.
        </AlertDialogSuccess> */}

        </Box>
      </div>
    </>
  );
};

export default MappedTemplate3;
