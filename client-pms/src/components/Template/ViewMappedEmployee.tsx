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
import { Link, useLocation, useParams } from "react-router-dom";
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
  VIEW_MAPPED_EMPLOYEE,
  VIEW_CALENDAR_MAPPING
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
  useGetCalenderQuery,
} from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import dayjs from "dayjs";
import ViewMappedPositions from "./ViewMappedPositions";
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
  // marginTop: "8px",
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

const ViewMappedEmployee = (props: any) => {
  const { loading } = props;
  const { data: appraisalCalData } = useGetAppraisalCalenderQuery("");
  const { data: calenderData } = useGetCalenderQuery("");
  console.log(appraisalCalData, "appraisalCalData");
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
  const location: any = useLocation();
  const templateID = location?.state?.from 
  const { data: weightageData, isLoading, refetch } = useGetTemplateQuery("");
  const [checkboxData, setCheckboxData] = useState<any>([]);
  console.log(checkboxData, "checkboxData");
  const [searchName, setSearchName] = useState("");
  const [name, setname] = useState("");
  const [templateId,setTemplateId] = useState<any>()
  const [calendarId,setCalendarId] = useState<any>() 
  const [value, setValue] = React.useState<number>();
  const [activeTemplate, setActiveTemplate] = useState<any>("")
  const [highlightTemplate, setHighlightTemplate] = useState<any>(false)
  const [displayEdit,setDisplayEdit] = useState<any>(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // setTabValue(0);
  };
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const colorHandler = (tempId: any) => {
    if (tempId) {
      setActiveTemplate(tempId);
      setHighlightTemplate(true)
    } else if (tempId != id) {
      setHighlightTemplate(false)
    }
  }

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
  //         return navigate(`${VIEW_MAPPED_EMPLOYEE}/${checkboxData[0]?._id}`);
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

  const [MappedTemplates, setMappedTemplates] = useState<any>([]);
  console.log(MappedTemplates, "MappedTemplates");
  useEffect(() => {
    if (year && appraisalCalData) {
      let temp1 = appraisalCalData?.data?.filter((calendar: any) => {
        return calendar?.calendar?._id == year;
      });
      console.log(temp1, "yearrrrr");
      setMappedTemplates(temp1);
      let temp2 = temp1.map((i: any) => {
        if (i?.status == "active" || dayjs(
          i?.calendar?.end_date
        ).isBefore(dayjs())){
          return false
        }else{
          return true
        }
      });
      setDisplayEdit(!temp2.includes(false))
    }
  }, [year, appraisalCalData]);

  const [activeAppId, setActiveAppId] = useState<any>([]);
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

  useEffect(() => {
    if (templateID) {
      console.log(id,'iddddddd')
      // let pa = appraisalCalendarData.data.filter((item: any) => item.calendar && item.calendar._id ==id );
      setYear(templateID)
      // setTemplateId(template)
      // setEditAppraisal(pa);
    }
  }, [appraisalCalData])
  

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
        fontSize:"14px !important",
        fontFamily:"arial",
        color:"#333333"
      },
    },
  };
  return (
    <>
      {" "}
      <PAMaster
        name={"View Employee Mapping"}
        // nav = {`${CREATE_MAPPING_NEW}`}
        nav={`${ VIEW_CALENDAR_MAPPING}`}
        secondName={"View Calendar Mapping"}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          paddingTop: "20px",
          position: "relative",
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
                  // variant="standard"
                  // MenuProps={MenuProps}
                  renderValue={
                    year !== ""
                      ? undefined
                      : () => <div style={{ color: "#aaa" }}>Select</div>
                  }
                  onChange={(e: { target: { value: any } }) => {
                    setYear(e.target.value);
                    // setShowCalendarError(false)
                    // setnavPrompt(true);  
                    setCalendarId(year)                  
                  }}
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
                                 // @ts-ignore
                                 color: highlightTemplate && activeTemplate == name.template._id && "#3e8cb5",
                                  alignItems: "start",
                                  textAlign: "left",
                                  wordBreak: "break-all",
                                }}
                                onClick={() => {
                                  setname(name?.template?.name);
                                  setTemplateId(name?._id);
                                  setCalendarId(name?.calendar?._id);           

                                  navigate(
                                    `${VIEW_MAPPED_EMPLOYEE}/${name?._id}`
                                  );
                                  colorHandler(name?.template?._id)
                                  // handleChange();
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
                      {console.log(value, "value")}
                    </Scrollbar>
                  </Scroll>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            {/* <Position1
              checkedTemplatesID={checkboxIdHandler(
                checkboxHandler(checkboxData)
              )}
              name={name}
              setnavPrompt={setnavPrompt}
              refetch={refetch}
              MappedTemplates={MappedTemplates}
            /> */}
            <ViewMappedPositions
              checkedTemplatesID={checkboxIdHandler(
                checkboxHandler(checkboxData)
              )}
              name={name}
              setnavPrompt={setnavPrompt}
              refetch={refetch}
              MappedTemplates={MappedTemplates}
              templateId = {templateId}
              calendarId = {calendarId}
              year={year}
              displayEdit = {displayEdit}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ViewMappedEmployee;
