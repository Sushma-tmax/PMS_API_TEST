import React, { useEffect } from "react";
import { useState, useRef, useMemo } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Button, InputLabel, Stack, Typography, styled } from "@mui/material";
import {
  useGetCalenderQuery,
  useGetEmployeeByFilterQuery,
} from "../../../service";
import {
  useGetAppraisalCalenderQuery
} from "../../../service/appraisalCalender/AppraisalCalender";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { ListItemIcon } from '@mui/material';
import dayjs from "dayjs";
import { useGetPACalendarQuery, useGetActiveCalenderQuery } from "../../../service/calender/Calender";





const useStyles = makeStyles((theme: any) => ({
  formControl: {
    // margin: theme?.spacing(1),
    width: 140,

    fontSize: "14px",
    color: "#333333",
    fontFamily: "Arial",

  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
    fontSize: "13px !important",
    fontFamily: "Arial",
    color: "#333333",

    // ['@media (max-width:768px)']: {
    //   color:"red !important",
    // }
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    fontSize: "12px !important",
    color: "#333333",
    fontFamily: "Arial",
  },



}));

const Timeline = styled("div")({
  fontSize: "20px",
  // color: "#333333",
  padding: "20px",
  // color: "#3e8cb5",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});
const LinkStyling = styled("div")({
  fontSize: "12px",
  paddingTop: "25px",
  color: "#3e8cb5",
  padding: "20px",
  fontFamily: "Arial",
});



function CalendarFilters(props: any) {
  const classes = useStyles();
  const { data: user } = useLoggedInUser();
  const {
    SectionFilter,
    setSectionFilter,
    subSectionFilter,
    setSubSectionFilter,
    navigationFrom,
    divisionFilter,
    setDivisionFilter,
    talentCategoreyFilter,
    settalentCategoreyFilter,
    valueofTab,
    employeeData1,
    setvalueOfActiveCalender,
    valueOfActiveCalender,
    Role,
    navigateToClosedDashboard,
    CalenderName,
    setGradeFilter,
    GradeFilter,
    setPage,
    page
  } = props;
  console.log(navigateToClosedDashboard, "navigationFrom")
  const SELECT_FOR_DASHBOARD = `section,division,sub_section `;
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  console.log(user, "newcalendar")
  const { data: calenderData } = useGetCalenderQuery("");
  const { data: PAdata, isLoading } = useGetPACalendarQuery('')
  const { data: activecalendardata } = useGetActiveCalenderQuery('')


  const { data: appraisalCalendarData, isLoading: isDataLoading } =
    useGetAppraisalCalenderQuery("");
  console.log(employeeData1, employeeData, "employeeDataForfilter");
  //const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
  //console.log(SectionFilter, "SectionFilter");

  // const handleChangeSection = (event: SelectChangeEvent) => {
  //   setSectionFilter(event.target.value);
  // };
  //functions for mapping


  let opt = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.section?.localeCompare(b?.section);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.section;
          })
          .indexOf(item?.section) === index
    )
    .map((i: any) => {
      return i?.section;
    });
  if (divisionFilter?.length > 0) {
    opt = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!divisionFilter?.find(item2 => i?.division === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.section;
            })
            .indexOf(item?.section) === index
      )
      .map((i: any) => {
        return i?.section;
      });
  } else if (GradeFilter?.length > 0) {
    opt = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!GradeFilter?.find(item2 => i?.grade === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.section;
            })
            .indexOf(item?.section) === index
      )
      .map((i: any) => {
        return i?.section;
      });
  }
  let optSebSection = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.sub_section?.localeCompare(b?.sub_section);
    })
    ?.filter((i: any) => {
      return i?.sub_section != undefined
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.sub_section;
          })
          ?.indexOf(item?.sub_section) === index
    )
    ?.map((i: any) => {
      return i?.sub_section;
    });
  if (SectionFilter.length > 0) {
    optSebSection = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.sub_section?.localeCompare(b?.sub_section);
      })
      ?.filter((i: any) => {
        return i?.sub_section != undefined
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!SectionFilter?.find(item2 => i?.section === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.sub_section;
            })
            ?.indexOf(item?.sub_section) === index
      )
      ?.map((i: any) => {
        return i?.sub_section;
      });
  }
  else if (GradeFilter?.length > 0) {
    optSebSection = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.sub_section?.localeCompare(b?.sub_section);
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!GradeFilter?.find(item2 => i?.grade === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.sub_section;
            })
            .indexOf(item?.sub_section) === index
      )
      .map((i: any) => {
        return i?.sub_section;
      });
  }
  if (employeeData1?.data === undefined) {
    opt = employeeData1
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.section;
            })
            ?.indexOf(item?.section) === index
      )
      .map((i: any) => {
        return i?.section;
      });
    optSebSection = employeeData1
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.sub_section?.localeCompare(b?.sub_section);
      })
      ?.filter((i: any) => {
        return i?.sub_section != undefined
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.sub_section;
            })
            .indexOf(item?.sub_section) === index
      )
      .map((i: any) => {
        return i?.sub_section;
      });
    if (SectionFilter.length > 0) {
      optSebSection = employeeData1
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.sub_section?.localeCompare(b?.sub_section);
        })
        ?.filter((i: any) => {
          return i?.sub_section != undefined
        })
        ?.filter((i: any) => {
          //@ts-ignore
          return !!SectionFilter?.find(item2 => i?.section === item2)
        })
        ?.filter(
          (item: any, index: any, array: any) =>
            array
              ?.map((data: any) => {
                return data?.sub_section;
              })
              ?.indexOf(item?.sub_section) === index
        )
        ?.map((i: any) => {
          return i?.sub_section;
        });
    }
  }

  let optgrade = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.grade?.localeCompare(b?.grade);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.grade;
          })
          .indexOf(item?.grade) === index
    )
    .map((i: any) => {
      return i?.grade;
    });
  if (SectionFilter.length > 0) {
    optSebSection = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.sub_section?.localeCompare(b?.sub_section);
      })
      ?.filter((i: any) => {
        return i?.sub_section != undefined
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!SectionFilter?.find(item2 => i?.section === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.sub_section;
            })
            ?.indexOf(item?.sub_section) === index
      )
      ?.map((i: any) => {
        return i?.sub_section;
      });
  }
  console.log(opt, optSebSection, "optSebSection")
  console.log(SectionFilter, "Arraydata");
  let optdivision = employeeData1?.data
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.division?.localeCompare(b?.division);
    })
    ?.filter(
      (item: any, index: any, array: any) =>
        array
          ?.map((data: any) => {
            return data?.division;
          })
          .indexOf(item?.division) === index
    )
    .map((i: any) => {
      return i?.division;
    });
  if (GradeFilter?.length > 0) {
    optdivision = employeeData1?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      ?.filter((i: any) => {
        //@ts-ignore
        return !!GradeFilter?.find(item2 => i?.grade === item2)
      })
      ?.filter(
        (item: any, index: any, array: any) =>
          array
            ?.map((data: any) => {
              return data?.division;
            })
            .indexOf(item?.division) === index
      )
      .map((i: any) => {
        return i?.division;
      });
  }
  const categorynames = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
  ];

  // old filter
  // const optSebSection = employeeData?.data
  // ?.slice()
  // ?.sort(function (a: any, b: any) {
  //   return a?.sub_section?.localeCompare(b?.sub_section);
  // })
  // ?.filter(
  //   (item: any, index: any, array: any) =>
  //     array
  //       ?.map((data: any) => {
  //         return data?.sub_section;
  //       })
  //       .indexOf(item?.sub_section) === index
  // )
  // .map((i: any) => {
  //   return i?.sub_section;
  // });
  //functions for mapping
  const isAllSelecteddivision =
    optdivision?.length > 0 && divisionFilter?.length === optdivision?.length;
  console.log(isAllSelecteddivision, "isAllSelecteddivision")
  const isAllSelectedTalentCat =
    categorynames?.length > 0 && talentCategoreyFilter?.length === categorynames?.length;

  const [selected, setSelected] = useState<any>([]);
  console.log(selected, "Arraydata");
  const isAllSelected = opt?.length > 0 && selected.length === opt?.length;

  const handleChange1 = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected?.length === opt?.length ? [] : opt);
      return;
    }
    setSelected(value);
  };

  const [hide1, setHide1] = useState(true);
  //multiselect
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [year, setYear] = useState<any>([]);
  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [active, setActive] = useState("");

  const [disableButton, setdisableButton] = React.useState(false);
  const [disablesectionButton, setdisablesectionButton] = React.useState(false);
  const [disabledivisionButton, setdisabledivisionButton] = React.useState(false);
  // const [page, setPage] = React.useState(0);

  const [hide, setHide] = React.useState(false);

  const handleChangeforCal = (event: SelectChangeEvent) => {
    setvalueOfActiveCalender(event.target.value as string);
  };

  const isAllSelectedSection =
    opt?.length > 0 && SectionFilter?.length === opt?.length;
  // console.log(SectionFilter?.length,opt?.length ,"isAllSelectedSection")
  const newsection = opt?.length == SectionFilter?.length
  const handleChangeSelectSection = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((SectionFilter?.length === opt?.length ? [] : "select all"), "newwwwww")
      setSectionFilter(SectionFilter?.length === opt?.length ? [] : opt);
      return;
    }

    setSectionFilter(value);
    setPage(0);
  };


  // gradefilter
  const isAllSelectedGrade =
    optgrade?.length > 0 && GradeFilter?.length === optgrade?.length;
  // console.log(SectionFilter?.length,opt?.length ,"isAllSelectedSection")
  const newGrade = optgrade?.length == GradeFilter?.length
  const handleChangeSelectGrade = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((GradeFilter?.length === optgrade?.length ? [] : "select all"), "newwwwww")
      setGradeFilter(GradeFilter?.length === optgrade?.length ? [] : optgrade);
      return;
    }

    setGradeFilter(value);
    setPage(0);
  };
  // gradefilter
  const isAllSelectedSubSection =
    optSebSection?.length > 0 && subSectionFilter?.length === optSebSection?.length;
  const handleChangeSelectSubSection1 = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSubSectionFilter(
        subSectionFilter?.length === optSebSection?.length ? [] : optSebSection
      );
      return;
    }
    setSubSectionFilter(value);
    setPage(0);
  };

  useEffect(() => {
    const Temp = optSebSection?.filter(function (j: any) {
      return j !== undefined;
    });
    console.log(Temp?.length, "optSebSection")

    if (Temp?.length == null || Temp?.length == "" || Temp?.length == undefined) {
      setdisableButton(true)
    } else {
      setdisableButton(false)
    }
    const Temp2 = opt?.filter(function (j: any) {
      return j !== undefined;
    });
    console.log(Temp2?.length, "optSection")
    if (Temp2?.length == null || Temp2?.length == "" || Temp2?.length == undefined) {
      setdisablesectionButton(true)
    } else {
      setdisablesectionButton(false)
    }
    const Temp3 = optdivision?.filter(function (j: any) {
      return j !== undefined;
    });
    if (Temp3?.length == null || Temp3?.length == "" || Temp3?.length == undefined) {
      setdisabledivisionButton(true)
    } else {
      setdisabledivisionButton(false)
    }
  }, [optSebSection, opt])

  const handleChangedivision = (event: any) => {
    const value = event.target.value;
    if (value[value?.length - 1] === "all") {
      setDivisionFilter(
        divisionFilter?.length === optdivision?.length ? [] : optdivision
      );
      return;
    }
    setDivisionFilter(value);
    setPage(0);
  };

  const handleChangeTalentCategoreyFilter = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      settalentCategoreyFilter(
        talentCategoreyFilter?.length === categorynames?.length ? [] : categorynames
      );
      return;
    }
    settalentCategoreyFilter(value);
  };

  console.log((new Date().getFullYear()), "hhhhhhhhh")
  const handleChangeSelectSubSection = (
    event: SelectChangeEvent<typeof subSectionFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value.includes("None")) {
      setSubSectionFilter([]);
    } else {
      setSubSectionFilter(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleChangeSelectdivision = (
    event: SelectChangeEvent<typeof divisionFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value?.includes("None")) {
      setDivisionFilter([]);
    } else {
      setDivisionFilter(typeof value === "string" ? value?.split(",") : value);
    }
  };

  const handleChangeSelecttalentCategory = (
    event: SelectChangeEvent<typeof talentCategoreyFilter>
  ) => {
    const {
      target: { value },
    } = event;
    //console.log(value, subSectionFilter,"handleChangeSelectSubSection")

    if (value.includes("None")) {
      settalentCategoreyFilter([]);
    } else {
      settalentCategoreyFilter(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //  maxWidth: 140,
      },
    },
  };
  useEffect(() => {
    const acivecalendar = calenderData &&
      calenderData?.data
        // ?.filter((j: any) => {
        //   console.log(j,"newjjjj")
        //   return j?.isActive === true;
        // })
        ?.map((j: any) => {
          if (dayjs(j.start_date).isAfter(dayjs())) {

            return (
              <>
                {j?.calendar_type}
              </>
            );
          }
        });

    // setActive(calenderData?.data[0]?.calendar_type)
    console.log(acivecalendar, "currentcalendar")
    setYear((new Date().getFullYear()))
    console.log(year, "currentyear")
  }, [calenderData])
  console.log(appraisalCalendarData, "active")
  //multiselect

  // loading PAcalendar query
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div style={{ marginTop: "0px", position: "relative" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            // bgcolor: "#d16c08",
            // bgcolor:"aquamarine",
            // height: "calc(100vh - 320px)",
            // width: "96%",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            // height="50px"
            // paddingBottom="30px"
            alignItems="center"
          >

            <Timeline>
              <span style={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}>
                Timeline
              </span> - {CalenderName} </Timeline>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
              paddingRight="15px"
            >

              <div>
                <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Grade
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={GradeFilter}
                    onChange={handleChangeSelectGrade}
                    input={<OutlinedInput label="Grade" />}
                    renderValue={(selected) => {
                      if (selected?.length === optgrade?.length) {
                        return "Selected All";
                      }
                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedGrade ? classes.selectedAll : "",
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}

                          size="small"
                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedGrade}
                          indeterminate={
                            GradeFilter?.length > 0 &&
                            GradeFilter?.length < optgrade?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            paddingRight: "10px"
                          },
                        }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>

                    {optgrade
                      ?.filter((option: any) => option !== undefined)
                      ?.map((option: any) => (


                        <MenuItem
                          style={{
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={option}
                          value={option}
                        >

                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "13px !important",
                                },
                              }}
                              size="small"
                              style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                              checked={GradeFilter?.indexOf(option) > -1}
                            />
                          </ListItemIcon>

                          <ListItemText sx={{
                            "& .MuiTypography-root": {
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingRight: "10px"
                            },
                          }} primary={option} />
                        </MenuItem>

                      ))}
                  </Select>
                </FormControl>
              </div>
              {navigationFrom === "Normalizer" && (
                <div>
                  <FormControl size="small" sx={{ width: 140 }}>
                    <InputLabel
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px !important",
                          fontFamily: "Arial !important",
                          color: "#333333 !important",
                        },
                      }}
                      id="demo-multiple-checkbox-label"
                    >
                      Division
                    </InputLabel>
                    <Select
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                        },
                      }}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      disabled={disabledivisionButton}
                      value={divisionFilter || []}
                      onChange={handleChangedivision}
                      input={<OutlinedInput label="Division" />}
                      renderValue={(selected) => {
                        if (selected?.length === optdivision?.length) {
                          return "Selected All";
                        }
                        return selected.join(", ");
                      }}
                      MenuProps={MenuProps}
                      size="small"
                    >
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                          //paddingLeft: "37px",
                        }}
                        key="all"
                        value="all"
                        classes={{
                          root: isAllSelecteddivision
                            ? classes?.selectedAll
                            : "",
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "13px !important",
                              },
                            }}
                            size="small"
                            style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                            classes={{
                              indeterminate: classes?.indeterminateColor,
                            }}
                            checked={isAllSelecteddivision}
                            indeterminate={
                              divisionFilter?.length > 0 &&
                              divisionFilter?.length < optdivision?.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                            },
                          }}
                          classes={{ primary: classes?.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {optdivision
                        ?.filter((i: any) => {
                          return i != undefined
                        })
                        ?.map((option: any) => (
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              color: "#333333",
                              fontFamily: "Arial",
                              padding: "0px",
                            }}
                            key={option}
                            value={option}
                          >
                            <ListItemIcon>
                              <Checkbox
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "13px !important",
                                  },
                                }}
                                size="small"
                                style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                checked={divisionFilter?.indexOf(option) > -1}
                              />
                            </ListItemIcon>
                            <ListItemText sx={{
                              "& .MuiTypography-root": {
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingRight: "10px"
                              },
                            }} primary={option} />
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              <div>

                <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Section
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    disabled={disablesectionButton}
                    value={SectionFilter}
                    onChange={handleChangeSelectSection}
                    input={<OutlinedInput label="Section" />}
                    renderValue={(selected) => {
                      if (selected?.length === opt?.length) {
                        return "Selected All";
                      }
                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        //paddingLeft: "37px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedSection ? classes.selectedAll : "",
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}

                          size="small"
                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedSection}
                          indeterminate={
                            SectionFilter?.length > 0 &&
                            SectionFilter?.length < opt?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            paddingRight: "10px"
                          },
                        }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>

                    {opt
                      ?.filter((i: any) => {
                        return i != undefined
                      })
                      ?.map((option: any) => (


                        <MenuItem
                          style={{
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={option}
                          value={option}
                        >
                          {hide1 && (
                            <ListItemIcon>
                              <Checkbox
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "13px !important",
                                  },
                                }}
                                size="small"
                                style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                checked={SectionFilter.indexOf(option) > -1}
                              />
                            </ListItemIcon>
                          )}
                          <ListItemText sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingRight: "10px"
                            },
                          }} primary={option} />
                        </MenuItem>

                      ))}
                  </Select>
                </FormControl>
              </div>
              <div>

                <FormControl size="small" sx={{ width: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-multiple-checkbox-label"
                  >
                    Sub section
                  </InputLabel>
                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    disabled={disableButton}
                    value={subSectionFilter}
                    onChange={handleChangeSelectSubSection1}
                    input={<OutlinedInput label="Sub section" />}
                    // renderValue={
                    //   (selected) => selected.join(", ")
                    // }
                    renderValue={(selected) => {
                      if (selected?.length === optSebSection?.length) {
                        return "Selected All";
                      }
                      return selected.join(", ");
                    }}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    <MenuItem
                      style={{
                        fontSize: "13px",
                        color: "#333333",
                        fontFamily: "Arial",
                        padding: "0px",
                        //paddingLeft: "37px",
                      }}
                      key="all"
                      value="all"
                      classes={{
                        root: isAllSelectedSubSection
                          ? classes.selectedAll
                          : "",
                      }}
                    >

                      <ListItemIcon>
                        <Checkbox
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "13px !important",
                            },
                          }}
                          size="small"
                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllSelectedSubSection}
                          indeterminate={
                            subSectionFilter?.length > 0 &&
                            subSectionFilter?.length < optSebSection?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            paddingRight: "10px"
                          },
                        }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                    </MenuItem>
                    {optSebSection
                      ?.filter((i: any) => {
                        return i != undefined
                      })
                      ?.filter((i: any) => {
                        return i != ""
                      })
                      ?.map((option: any) => (
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={option}
                          value={option}
                        >
                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "13px !important",
                                },
                              }}
                              size="small"
                              style={{ padding: "3px", paddingLeft: "14px", height: "0px" }}
                              checked={subSectionFilter.indexOf(option) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingRight: "10px"
                            },
                          }} primary={option} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              {(valueofTab === 1 && navigationFrom === "Reviewer") && (
                <div>
                  <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "14px !important",
                          fontFamily: "Arial !important",
                          color: "#333333 !important",
                        },
                      }}
                      id="demo-multiple-checkbox-label"
                    >
                      Direct Reports
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      size="small"
                      MenuProps={MenuProps}
                      input={<OutlinedInput label="Line Manager" />}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                        },
                      }}
                      multiple
                      value={talentCategoreyFilter}
                      onChange={handleChangeTalentCategoreyFilter}
                      renderValue={(selected) => {
                        if (selected?.length === categorynames?.length) {
                          return "Selected All";
                        }
                        return selected.join(", ");
                      }}

                    >
                      <MenuItem
                        style={{
                          fontSize: "13px",
                          color: "#333333",
                          fontFamily: "Arial",
                          padding: "0px",
                          //paddingLeft: "37px",
                        }}
                        key="all"
                        value="all"
                        classes={{
                          root: isAllSelectedTalentCat ? classes.selectedAll : "",
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: "13px !important",
                              },
                            }}
                            size="small"
                            style={{
                              padding: "0px",
                              paddingLeft: "14px",
                              height: "0px"
                            }}
                            classes={{
                              indeterminate: classes.indeterminateColor,
                            }}
                            checked={isAllSelectedTalentCat}
                            indeterminate={
                              talentCategoreyFilter?.length > 0 &&
                              talentCategoreyFilter?.length < categorynames?.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                            },
                          }}
                          classes={{ primary: classes.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {categorynames?.map((option: any) => (
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key={option}
                          value={option}
                        >
                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "13px !important",
                                },
                              }}
                              size="small"
                              style={{
                                padding: "0px", paddingLeft: "14px",
                                height: "0px"
                              }}
                              checked={talentCategoreyFilter.indexOf(option) > -1}
                            />
                          </ListItemIcon>
                          <ListItemText sx={{
                            "& .MuiTypography-root": {
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingRight: "10px"
                            },
                          }} primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default CalendarFilters;

