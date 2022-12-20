import React, { useState, useRef, useEffect } from "react";
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
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import { Scrollbar } from "react-scrollbars-custom";

import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  CREATE_MAPPING_NEW,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
  MAPPED_TEMPLATE_3,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PAMaster from "../UI/PAMaster";
import Position from "./Position";
import Searchicon from "../../assets/Images/Searchicon.svg";
import { useFilterTemplateQuery, useGetAppraisalCalenderQuery, useGetCalenderQuery, useGetTemplateQuery } from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { Appraisal } from "..";

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
    minWidth: "94%"
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

const CreateMappingNew = (props: any) => {
  const { loading } = props;

  // sushma 6/27
  // templates search in mapping
  const [searchName, setSearchName] = useState("");

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
  const [value, setValue] = React.useState(0);
  const [checkboxData, setCheckboxData] = useState<any>([]);
  const [checkboxData1, setCheckboxData1] = useState<any>([]);
  console.log(checkboxData, "checkboxDatacheckboxData");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: templateData, isLoading } = useGetTemplateQuery("");
  const { data: filterWeightage } = useFilterTemplateQuery("");
  const { data: appraisalCalendarData, isLoading: isDataLoading } =
    useGetAppraisalCalenderQuery("");
  const { data: calenderData } = useGetCalenderQuery("");
  const [year, setYear] = useState("");
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [mappedTemplates, setMappedTemplates] = useState<any>([])
  const [template, setTemplate] = useState<any>([]);
  const [displayEdit,setDisplayEdit] = useState<any>(false)


  console.log(filterWeightage, "filterWeightage");

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  //Appraisal calendar

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   // setTabValue(0);
  // };

  // useEffect(() => {
  //   if (weightageData) {
  //     if (id) {
  //       setValue(() => {
  //         // @ts-ignore
  //         let temp = weightageData.templates.slice().sort(function (a: any, b: any) {
  //           return (a.name.localeCompare(b.name));
  //         })
  //         return temp.findIndex((item: any) => item._id === id);
  //       });
  //     } else {
  //       return navigate(`${CREATE_MAPPING_NEW}/${weightageData.templates[0]._id}`);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (appraisalCalendarData !== undefined) {
      // setCheckboxData(appraisalCalendarData?.data);
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

  useEffect(() => {
    if (year && appraisalCalendarData) {

      let temp1 = appraisalCalendarData?.data?.filter((calendar: any) => {

        return calendar?.calendar?._id == year
      })
      console.log(temp1, 'yearrrrr')
      setCheckboxData(temp1);
      
    }


  }, [year, appraisalCalendarData])


  const handleCheckbox = (e: any) => {
    setnavPrompt(true);
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
    console.log(
      checkboxIdHandler(checkboxHandler(checkboxData)),
      "hhhhhhhhhhhhhhhh"
    );
  }, [checkboxData]);

  // useEffect(() => {
  //   if ((checkboxIdHandler(checkboxHandler(checkboxData)))?.length === 0) {
  //     navigate(`${CREATE_MAPPING_NEW}`);
  //   }
  // },[checkboxData])

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

  //Appraisal calendar 
  const [name, setname] = useState("");





  //  useEffect(() => {
  //   if (appraisalCalendarData !== undefined) {
  //     let temp1 = appraisalCalendarData.data.filter((item:any) => {
  //       let weightageDataAdded = [];
  //           weightageDataAdded = item?.template.weightage?.objective_description?.filter(
  //             (element: any) => {
  //               return element?.value == undefined;
  //             }
  //           );
  //           if (weightageDataAdded.length > 0) return false;
  //           else return true;
  //     })
  //     setCheckboxData(temp1);

  //   }
  //  },[appraisalCalendarData])

  //  useEffect(() => {
  //   if (templateData !== undefined) {
  //     if (templateData.templates) {
  //       const result = templateData?.templates
  //         .slice()
  //         .sort(function (a: any, b: any) {
  //           return a?.name?.localeCompare(b?.name);
  //         })
  //         .filter((item: any) => {
  //           let weightageDataAdded = [];
  //           weightageDataAdded = item?.weightage?.objective_description?.filter(
  //             (element: any) => {
  //               return element?.value == undefined;
  //             }
  //           );
  //           if (weightageDataAdded.length > 0) return false;
  //           else return true;
  //           // return (
  //           //   item.weightage.objective_description.filter((element: any) => {
  //           //     return (element.value !== undefined)
  //           //   })
  //           // )
  //         })
  //         .filter((status: any) => {
  //           return status.status_template === "Completed";
  //         });
  //       console.log(result, "result");
  //       setCheckboxData(result);
  //     }
  //   }
  // }, [templateData]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <PAMaster name={"Create Employee Mapping"} />
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
          <Grid item xs={3}>
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
                <InputLabel style={{}} id="demo-simple-select-autowidth-label">
                  Select
                </InputLabel>

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
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Select"
                  value={year}
                  onChange={(e: { target: { value: any } }) => {
                    setYear(e.target.value);
                    setnavPrompt(true);
                  }}
                >
                  {calenderData &&
                    activeAppId !== undefined &&
                    calenderData.data
                      .filter((j: any) => {
                        return !activeAppId.includes(j._id);
                        //   let temp = activeAppId?.map((i:any)=>{

                        //    return i
                        //    })

                        //  return (!temp.includes(j._id))
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
                height: "calc(100vh - 370px)",
                // boxShadow: "0px 0px 4px 2px #8080802e",
              }}
            >
              <div style={{ paddingLeft: "20px" }}>

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

                <div>
                  {/* style={{ overflowY: 'scroll', height: '270px' }} */}
                  <Scroll>
                    <Scrollbar style={{ height: "calc(100vh - 425px)" }}>
                      {/* {checkboxData &&
                        checkboxData */}
                      {checkboxData && checkboxData
                        //  .filter((i:any) => {
                        //   return mappedTemplates?.map((item:any) => item?.template?._id).includes(i.template._id)
                        // })
                      
                        // to display only if template is not having position
                        .filter((i: any) => {
                          return i.position.length === 0
                        })
                        .filter((filteredName: any) => {
                          console.log(filteredName, 'filteredName')
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
                        .map((i: any, index: number) => {
                          return (

                            <div
                              style={{
                                paddingTop: "15px",
                                paddingRight: "10px",
                                // paddingBottom: "15px",
                                display: "flex",
                                alignItems: "center",
                                // gap: "8px",
                              }}
                              // onClick={() => {
                              //   navigate(`${CREATE_MAPPING_NEW}/${i._id}`);
                              // }}
                              onClick={() => {
                                navigate(`${CREATE_MAPPING_NEW}/${i?._id}`);
                              }}
                            >
                              <input
                                type="checkbox"
                                name={i._id}
                                checked={i?.isChecked || false}
                                onChange={handleCheckbox}
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
                                {/* {i.name} */}
                                {i?.template?.name}
                              </div>
                            </div>

                          );
                        })}
                    </Scrollbar>
                  </Scroll>
                </div>
                {/* <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    style={{ color: "#676666" }}
                    TabIndicatorProps={{
                      style: {
                        left: 0,
                        borderColor: "divider",
                      },
                    }}
                  >
                    {checkboxData && checkboxData
                    .filter((filteredName: any) => {
                      //  Sushma 6/27
                      // to implement search for templates
                      // console.log(filteredName, 'filteredName')
                      if (searchName === "") {
                        return filteredName
                      }
                      else if (filteredName.name.toLocaleLowerCase().includes(
                        searchName.toLocaleLowerCase()
                      )) {
                        return filteredName
                      }
                    }).map((i: any, index: number) => {
                      console.log(i, 'iiiiiiiiiiiiiii')
                      return (
                        <div  >
                          <Tab
                            style={{ textTransform: "none" }}

                            onClick={() => {
                              navigate(`${CREATE_MAPPING_NEW}/${i._id}`);

                            }}
                            label={i.name}
                            {...a11yProps(index)}
                          />

                        </div>
                      );
                    })}
                  </Tabs> */}

                {/* <Scrollbar
                  style={{ width: 380, height: "calc(100vh - 255px)" }}
                > */}
                {/* <Scrollbar
                  style={{ width: 197, height: "calc(100vh - 255px)" }}
                >
               
                </Scrollbar> */}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Position
              checkedTemplatesID={checkboxIdHandler(
                checkboxHandler(checkboxData)
              )}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreateMappingNew;
