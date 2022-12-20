import * as React from "react";

import { useState } from "react";

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
import {
  CREATE_CALENDER,
  LINK_CALENDAR,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  
  LINK_CALENDAR_FILTER,
  MAPPED_TEMPLATE_2,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
  MAPPED_TEMPLATE_3,
  CREATE_MAPPING_NEW,
  MAPPED_TEMPLATE_EDIT,
  VIEW_MAPPED_TEMPLATE,
  EDIT_CALENDAR_MAPPING
} from "../../constants/routes/Routing";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useGetAppraisalCalenderQuery, useGetCalenderQuery, useGetSingleTemplateQuery, useGetTemplateQuery } from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import dayjs from "dayjs";
import AlertYesNo from "../../components/UI/DialogYesNo";
import AlertDialogSuccess from "../UI/DialogSuccess";

//prompt -------functions
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C7C7C7 !important",
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
    paddingRight: "10px",
    paddingLeft: "10px",
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

const ViewTemplateFromCalendar = (props: any) => {
  const { loading } = props;

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
  const location: any = useLocation();
  // const { from, tempName } = location?.state;
  const templateID = location?.state?.from
  const breadCrumID = location?.state?.forBCrums
  console.log("fromfrom", templateID,breadCrumID);
  //template - Hari
  const { id } = useParams();
  const { data: weightageData, isLoading } = useGetTemplateQuery("");
  const { data: appraisalCalendarData, isLoading: appraisalCalendarLoading, refetch:fetchMapped } = useGetAppraisalCalenderQuery('')
  const { data: calenderData } = useGetCalenderQuery("");
  const [checkboxData, setCheckboxData] = useState<any>([]);
  console.log(checkboxData, "checkboxData");
  const [searchName, setSearchName] = useState("");
  const [name, setname] = useState("");
  const [value, setValue] = React.useState<number>();
  const [editAppraisal, setEditAppraisal] = useState([]);
  const [highlightTemplate, setHighlightTemplate] = useState<any>(false)
  const [activeTemplate, setActiveTemplate] = useState<any>("")
  const [year, setYear] = useState("");
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [MappedTemplates, setMappedTemplates] = useState<any>([]);
  const [showemptyVal, setshowemptyVal] = useState(false);
  console.log(MappedTemplates, "MappedTemplates");
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   // setTabValue(0);
  // };
//tab navigationalert
const [tabNum, setTabNum] = useState(0);
const [dataofclick, setDataofclick] = useState<any>([]);
const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setTabNum(newValue);
 // setValue(newValue);
  if(triggerTheNav1 === false){
    setValue(newValue);
  }else{
    setTabNav(true)
  }
 
  
};
const handleChangeWhenClick = ( name: any) => {
  setDataofclick(name)
 if(triggerTheNav1 === false){
  setname(name?.template?.name);
  colorHandler(name?.template?._id);
  navigate(`${VIEW_MAPPED_TEMPLATE}/${name?._id}`);
  }else{
    setTabNav(true)
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


settriggerTheNav(false)
settriggerTheNav1(false)
setTabNav(false)
setValue(tabNum);
setname(dataofclick?.template?.name);
colorHandler(dataofclick?.template?._id);
navigate(`${MAPPED_TEMPLATE_3}/${dataofclick?._id}`);

};
//tab navigationalert
  

  useEffect(() => {
    if (appraisalCalendarData && templateID) {
      let pa = appraisalCalendarData?.data?.filter((item: any) => item.calendar && item?.calendar?._id == templateID);
      setEditAppraisal(pa);

    }
  }, [appraisalCalendarData])

  console.log(editAppraisal, 'editAppraisal')

  useEffect(() => {
    if (id) {            
      setValue(() => {
        return editAppraisal.findIndex((item: any) => {
          console.log(item.template._id,id,'iddddddddddddddddddd')
         return item._id === id;
        })
       
      });
    }
  })
  // useEffect(() => {
  //   if (id) {            
  //     setValue(() => {
  //       return editAppraisal.findIndex((item: any) => {
  //         console.log(item.template._id,id,'iddddddddddddddddddd')
  //        return item.template._id === id;
  //       })
       
  //     });
  //   }
  // })

  useEffect(() => {
    if (templateID) {
      console.log(id,'iddddddd')
      // let pa = appraisalCalendarData.data.filter((item: any) => item.calendar && item.calendar._id ==id );
      setYear(templateID)
      // setEditAppraisal(pa);
    }
  }, [calenderData])

  // useEffect(() => {
  //   if (year && editAppraisal) {
  //     let temp1 = editAppraisal?.filter((calendar: any) => {
  //       return calendar?.calendar?._id == year;
  //     });
  //     console.log(temp1, "yearrrrr");
  //     setMappedTemplates(temp1);
  //   }
  // }, [year,editAppraisal]);

  useEffect(() => {
    if (year && appraisalCalendarData) {
      let temp1 = appraisalCalendarData?.data?.filter((calendar: any) => {
        return calendar?.calendar?._id == year;
      });
      console.log(temp1, "yearrrrr");
      setMappedTemplates(temp1);
    }
  }, [year, appraisalCalendarData]);


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

  const colorHandler = (tempId: any) => {
    if (tempId) {
      setActiveTemplate(tempId);
      setHighlightTemplate(true)
    } else if (tempId != id) {
      setHighlightTemplate(false)
    }
  }

  // useEffect(() => {
  //   if (weightageData !== undefined) {
  //     if (weightageData.templates) {
  //       const result = weightageData?.templates
  //         .slice()
  //         .sort(function (a: any, b: any) {
  //           return a?.name?.localeCompare(b?.name);
  //         })
  //         .filter((item: any) => {
  //           return item?.weightage != "" && item?.position?.length > 0;
  //         });
  //       setCheckboxData(result);
  //     }
  //   }
  // }, [weightageData]);

  // useEffect(() => {
  //   if (checkboxData !== undefined) {
  //     if (id) {
  //       setValue(() => {
  //         // @ts-ignore
  //         let temp = checkboxData
  //           .slice()
  //           .sort(function (a: any, b: any) {
  //             return a.name.localeCompare(b.name);
  //           })
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
  //         return navigate(`${VIEW_MAPPED_TEMPLATE}/${checkboxData[0]?._id}`);
  //       }
  //     }
  //   }
  // }, [checkboxData, id]);

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
    "Please save the changes before you leave the page.",
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

  useEffect(() => {
    const Calendar = calenderData &&
      activeAppId !== undefined &&
      calenderData?.data?.filter((j: any) => {
        return !activeAppId?.includes(j._id);
      }).filter((j: any) => {
        return (dayjs(j?.end_date)?.isAfter(dayjs())
        )
      })
      if(Calendar?.length === 0){
        setshowemptyVal(true)
      }else{
        setshowemptyVal(false)
      }
    //console.log(Calendar?.length, "newone")
  }, [calenderData, activeAppId])

  return (
    <>
      {" "}
      <PAMaster
        name={"View Employee Mapping"}
        nav={`${LINK_CALENDAR}`}
        secondName={"Create Calendar Mapping"}
        nav2={`${EDIT_CALENDAR_MAPPING}/${templateID}`}
       
        thirdName={"View Calendar Mapping"}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          paddingTop: "20px",
        }}
      >
        <Grid container spacing={2} style={{ paddingTop: "10px" }}>
          {/* <Grid item xs={2.5} sx={{ marginTop: "10px" }}> */}
          <Grid item xs={3}>
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

              <FormControl fullWidth size="small">
                {/* <InputLabel style={{}} id="demo-simple-select-autowidth-label">
                  Appraisal Calendar
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
                  onChange={(e: { target: { value: any } }) => {
                    setYear(e.target.value);
                    // setShowCalendarError(false)
                    //setnavPrompt(true);
                  }}
                >
                  {calenderData &&
                    activeAppId !== undefined &&
                    calenderData.data
                      .filter((j: any) => {
                        return !activeAppId.includes(j._id);
                      //   //   let temp = activeAppId?.map((i:any)=>{

                      //   //    return i
                      //   //    })

                      //   //  return (!temp.includes(j._id))
                     })

                      .map((j: any) => {
                        if (dayjs(j.start_date).isAfter(dayjs())) {
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
                height: "calc(100vh - 375px)",
              }}
            >
              <div
                // style={{
                //   paddingLeft: "20px",
                //   // paddingRight: "20px",
                // }}
              >
                {/* <p> */}
                  <Searchfeild>
                    <TextField
                      id="outlined-basic"
                      autoComplete="off"
                      placeholder="Search Here..."
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
                {/* </p> */}
                <div style={{ paddingTop: "10px" }}>
                  {/* style={{ overflowY: "scroll", height: "285px" }} */}
                  <Scroll>
                    <Scrollbar style={{ height: "calc(100vh - 425px)" }}>
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
                        {/* {editAppraisal?.filter((calendarFilter: any) => {
                          return calendarFilter.calendar !== undefined && calendarFilter.template != null && calendarFilter.calendar !== null
                        }) */}
                        {MappedTemplates &&
                          MappedTemplates?.filter((calendarFilter: any) => {
                          return calendarFilter.calendar !== undefined && calendarFilter.template != null && calendarFilter.calendar !== null
                        })
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
                                  // @ts-ignore
                                  color: highlightTemplate && activeTemplate == i.template._id && "#3e8cb5",
                                  alignItems: "start",
                                  textAlign: "left",
                                  wordBreak: "break-word",
                                }}
                                onClick={() => {
                                  // if(triggerTheNav1 === false){
                                  // navigate(`${VIEW_MAPPED_TEMPLATE}/${i?._id}`);
                                  // setname(i?.template?.name);
                                  // colorHandler(i.template._id)
                                  // }
                                  handleChangeWhenClick(i);
                                  // handleChange();
                                }}
                                label={i?.template?.name}
                                {...a11yProps(index)}
                              />
                            );
                          })}
                      </Tabs>
                      {console.log(value, "value")}

                    </Scrollbar >
                  </Scroll>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Position1
              checkedTemplatesID={checkboxIdHandler(
                checkboxHandler(checkboxData)
              )}
              name={name}
              setnavPrompt={setnavPrompt}
              MappedTemplates={MappedTemplates}
              fetchMapped={fetchMapped}
              year={year}
              setshowemptyVal={setshowemptyVal}
              settriggerTheNav1={settriggerTheNav1}
              triggerTheNav={triggerTheNav}
              settriggerTheNav={settriggerTheNav}
            />
          </Grid>
        </Grid>
        <AlertDialogSuccess
            isAlertOpen={tabNav}
            handleAlertClose={handleAlertNo}
            handleAlertYes={handleAlertYes}>
            Please save the changes before you leave the page.
          </AlertDialogSuccess>
      </Container>
    </>
  );
};

export default ViewTemplateFromCalendar;
