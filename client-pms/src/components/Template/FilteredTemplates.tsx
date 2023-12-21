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
  FILTERED_TEMPLATES,
  CREATE_MAPPING_NEW,
  MAPPED_TEMPLATE_EDIT,
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
import Filteredpositions from "./Filteredpositions";
import {
  useGetSingleTemplateQuery,
  useGetTemplateQuery,
  useGetAppraisalCalenderQuery,
} from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
//prompt -------functions

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

const FilteredTemplates = (props: any) => {
  const { loading } = props;
  const { data: appraisalCalendarData } = useGetAppraisalCalenderQuery("");

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
  const { data: weightageData, isLoading } = useGetTemplateQuery("");
  const [checkboxData, setCheckboxData] = useState<any>([]);
  console.log(checkboxData, "checkboxData");
  const [searchName, setSearchName] = useState("");
  const [name, setname] = useState("");
  const [activeId,setActiveId] = useState("")
  const [value, setValue] = React.useState(0);
  const [colorBlue, setColorBlue] = useState(false)

  //filtering templates
  //  const location: any = useLocation();
  //  const { from, names } = location.state;
  const [filteredTemp, setfilteredTemp] = useState([]);
  const [employeeResult, setemployeeResult] = useState([]);
  useEffect(() => {
    const result = appraisalCalendarData?.data?.filter((item: any) => {
      console.log(item?.calendar, "itemsss");
      return item?.calendar?._id == id;
    });
    setfilteredTemp(result);
    setemployeeResult(result?.map((j: any) => j?.position));
    console.log(
      result?.map((j: any) => j?.position[0]?.name.first_name),
      "yyyyyyyy"
    );

    console.log(result, "result");
    // console.log(filterpos,'filterpos')
    //console.log(selectedCalendar,'selectedCalendar')
    //console.log(selectedCalendar,'selectedCalendar1')
    console.log(appraisalCalendarData, "appraisalCalendarDataD");
  }, []);
  console.log(filteredTemp, "filteredTemp1");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // setTabValue(0);
  };
  useEffect(() => {
    if (weightageData !== undefined) {
      if (weightageData.templates) {
        const result = weightageData.templates
          .slice()
          .sort(function (a: any, b: any) {
            return a.name.localeCompare(b.name);
          })
          .filter((item: any) => {
            return item.weightage != "" && item.position.length > 0;
          });
        setCheckboxData(result);
      }
    }
  }, [weightageData]);

  useEffect(() => {
    if (checkboxData !== undefined) {
      if (id) {
        setValue(() => {
          // @ts-ignore
          let temp = checkboxData
            .slice()
            .sort(function (a: any, b: any) {
              return a.name.localeCompare(b.name);
            })
            .filter((item: any) => {
              return item.weightage != "" && item.position.length > 0;
            });
          console.log(temp, "temp");

          return temp.findIndex((item: any) => item._id === id);
        });
      } else {
        console.log(checkboxData, "checkboxxx");

        if (
          checkboxData !== undefined &&
          checkboxData !== "" &&
          checkboxData.length > 0
        ) {
          // return navigate(`${MAPPED_TEMPLATE_3}/${weightageData.templates[0]._id}`);
          return navigate(`${FILTERED_TEMPLATES}/${checkboxData[0]?._id}`);
        }
      }
    }
  }, [checkboxData, id]);

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

  const colorHandler = () => {
    setColorBlue(true)
   }
    

  return (
    <>
      {" "}
      <PAMaster
        name={"View Employee Mapping"}
        // nav = {`${MAPPED_TEMPLATE_EDIT}`}
        // nav={`${CREATE_CALENDER}`}
      />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 160px)",
          backgroundColor: "#fff",
          paddingTop: "18px",
        }}
      >
       
        <Grid container style={{ paddingTop: "16px" }} spacing={2}>
          <Grid item xs={3} sx={{ marginTop: "10px" }}>
            {/* <span
              style={{
                fontSize: "22px",
                color: "#004C75",
              }}
            >
              Mapped Templates
            </span> */}

            <Paper  elevation={3} sx={{ paddingTop: "10px", height: "calc(100vh - 260px)" }}>
              <div
                style={{
                  paddingLeft: "20px",
                  // paddingRight: "20px",
                }}
              >
               
                <p>
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
                </p>
                <div style={{ overflowY: 'scroll', height: '285px' }}>
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
                    {filteredTemp?.map((i: any, index: number) => {
                      console.log(i, "iiiiiiiiiiiiiii");
                      return (
                        <Tab
                          style={{
                            textTransform: "none",
                            alignItems: "start",
                            fontSize: "14px",
                            fontFamily: "Arial",
                            //@ts-ignore
                            // color: colorBlue && activeId == i._id && ("#3E8CB5"),
                            color: "#333333",
                            textAlign:"left",
                            wordBreak: "break-word",
                          }}
                          onClick={() => {
                            navigate(`${FILTERED_TEMPLATES}/${i._id}`);
                            setname(i.template.name);
                            setActiveId(i._id);
                            colorHandler()
                            
                            // handleChange();
                          }}
                          label={i.template.name}
                          {...a11yProps(index)}
                        />
                      );
                    })}
                  </Tabs>
                  {console.log(value, "value")}
                </div>
               
              </div>
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <Filteredpositions
              checkedTemplatesID={checkboxIdHandler(
                checkboxHandler(checkboxData)
              )}
              name={name}
              setnavPrompt={setnavPrompt}
              filteredTemp={filteredTemp}
              employeeResult={employeeResult}
            />
          </Grid>
        </Grid>
     
      </Container>
    </>
  );
};

export default FilteredTemplates;
