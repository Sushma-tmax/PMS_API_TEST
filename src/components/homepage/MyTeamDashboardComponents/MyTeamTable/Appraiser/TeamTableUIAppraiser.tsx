import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, ListItemText, ListItemIcon, Select } from "@mui/material";
import { Stack, Tab, Tabs, Box, Typography } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Searchlensreview from "../../../../reviewer/Dashboard/Reviewericons/Searchlensreview.svg";
import Expand from "../../../../reviewer/Dashboard/Reviewericons/Expand.svg";
import Newexcel from "../../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import Updown from "../../../../reviewer/Dashboard/Reviewericons/Updown.svg";
import Avatar from "@mui/material/Avatar";
import { Scrollbar } from "react-scrollbars-custom";
import Eye from "../../../../reviewer/Dashboard/Reviewericons/Eyeicon.svg";
import { makeStyles } from '@mui/styles';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import TablePagination from "@mui/material/TablePagination";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  EMPLOYEE_APPRAISER_SUBMISSION,
  APPRAISER_VIEW_PA,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  VIEW_PAST_PA,
} from "../../../../../constants/routes/Routing";
import { useLoggedInUser } from "../../../../../hooks/useLoggedInUser";
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Mytable = styled("div")({
  background: "#FFFFFF",
  // marginLeft: "25px",
  // marginRight: "25px",
  // position: "relative",
});
const Tabstyles = styled("div")({
  marginLeft: "20px",
  // marginTop: "15px",
  marginRight: "20px",
  "& .MuiButtonBase-root": {
    color: "#999999",
    textTransform: "none",
    fontWeight: 400,
  },
  "& .Mui-selected": {
    color: "#004C75",
  },
  "&.MuiTabs-indicator": {
    backgroundColor: "#004C75",
  },
  display: "flex",
  // justifyContent: 'space-between'
});
const Heading = styled("div")({
  fontSize: "18px",
  color: "#3e8cb5",
  fontFamily: "Arial",
  // paddingTop: "25px",
  // marginLeft: "20px",
});
const Searchfeild = styled("div")({
  // position: "absolute",
  // marginLeft: "78%",
  //marginRight: '8px',
  // marginTop: "10px",
  "& .MuiOutlinedInput-root": {
    height: "28px",
    width: "144px",
    borderRadius: "15px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    color: "#306D8F",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "13px",
    color: "#306D8F",
  },
});
const TableHeadings = styled("div")({
  "& .MuiTableRow-head ": {
    background: "#eaeced",
  },
  "& .MuiTableCell-head": {
    color: "#004C75",
    padding: "0px",
    height: "30px",
    borderBottom: "2px solid white",
  },
  "& .MuiTableCell-root": {
    padding: "0px",
  },
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -17,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Names = styled("div")({
  // marginLeft: "20px",
  // marginTop: "10px",
  color: "#333333",
  //cursor :"pointer"
});
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

  tableRow: {

    ['@media (max-width:768px)']: {
      whiteSpace: "nowrap",
      "& .MuiTableCell-root": {
        padding: "4px",
      },
    }
  },

  tableRowhead: {

    ['@media (max-width:768px)']: {
      whiteSpace: "nowrap",
      "& .MuiTableCell-root": {
        padding: "10px",
      },
    },
    ['@media (max-width:1024px)']: {
      whiteSpace: "nowrap",
      "& .MuiTableCell-root": {
        padding: "6px",
      },
    }
  },
}));

const MyTeamTable = (props: any) => {
  const { data: user } = useLoggedInUser();
  //filter
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // maxWidth: 400,

      },
    },
  };
  const MenuPropsGrade = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 70,
      },
    },
  };
  const classes = useStyles();
  const { users, tabValue, getPAStatus, empNameClickHandler, rowsPerPage, page, enteredName
    , listInnerRef, onScroll, handleChangePage, setPage, handleChangeRowsPerPage,
    positionsFilter,
    setpositionsFilter,
    GradesFilter,
    setGradesFilter } = props;

  console.log(users, "usersusers")
  //  Filter icon
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  // const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  // const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
  // const [page, setPage] = React.useState(0);
  //For multislect options
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  //for pagination
  const [tablecount, settablecount] = React.useState<any>(0);
  useEffect(() => {
    const Paginate = users
      ?.filter((item1: any) => {
        if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradesFilter?.includes("None") || GradesFilter?.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (enteredName === "") {
          return j;
        } else if (
          (j?.employee_code !== undefined &&
            j?.employee_code
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.legal_full_name !== undefined &&
            j?.legal_full_name
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j.grade !== undefined &&
            j?.grade
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j.position_long_description !== undefined &&
            j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.appraisal?.status !== undefined &&
            j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (getPAStatus(j) !== undefined &&
            getPAStatus(j)
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase()))
        ) {
          return j;
        }
      })
    console.log(Paginate?.length, "Paginate")
    settablecount(Paginate?.length)
    setPage(0);
  }, [users, enteredName, positionsFilter, tabValue, GradesFilter])

  useEffect(() => {
    //grades option
    let grades = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.map((i: any) => {
        return i?.grade;
      });
    //for filtering graades options
    if (positionsFilter.length > 0) {
      grades = users
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade - b?.grade;
        })
        ?.filter((i: any) => {
          return !!positionsFilter?.find((item2: any) => i?.position_long_description === item2)
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    // search functionality based on grade
    else if (enteredName?.length > 0) {
      grades = users
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade?.localeCompare(
            b?.grade
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const enteredTerms = enteredName.toLowerCase().split(" ");
            return enteredTerms.every((term: any) =>
              i?.grade
                ?.toLowerCase()
                .includes(term)
            ) || enteredTerms.every((term: any) =>
              i?.position_long_description?.toLowerCase().includes(term)
            );
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }

    const gradeContents = grades
      ?.filter((c: any, index: any) => {
        return grades?.indexOf(c) === index && c != null && c != undefined;
      });
    setgradesArray(gradeContents);
    console.log(grades, gradeContents, gradesArray, "gradeContents")
    //grades option
    let position = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      .map((i: any) => {
        return i?.position_long_description;
      });
    if (GradesFilter.length > 0) {
      position = users
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description - b?.position_long_description;
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find((item2: any) => i?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
    else if (enteredName?.length > 0) {
      position = users
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description?.localeCompare(
            b?.position_long_description
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const enteredTerms = enteredName.toLowerCase().split(" ");
            return enteredTerms.every((term: any) =>
              i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || enteredTerms.every((term: any) =>
              i?.grade?.toLowerCase().includes(term)
            );
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
    const positionContents = position?.filter((c: any, index: any) => {
      return position?.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArray(positionContents);
    const section = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.map((i: any) => {
        return i.section;
      });
    const sectionContents = section?.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
  }, [users, positionsFilter, GradesFilter, enteredName])
  const isAllGradesFilter =
    gradesArray?.length > 0 && GradesFilter?.length === gradesArray?.length;
  const newsection = gradesArray?.length == GradesFilter?.length
  const handleChangeSelectGrades = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((GradesFilter?.length === gradesArray?.length ? [] : "select all"), "newwwwww")
      setGradesFilter(GradesFilter?.length === gradesArray?.length ? [] : gradesArray);
      return;
    }
    setGradesFilter(value);
    // setPage(0);
  };


  // clearing the localstorage
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.clear();
    }
  }, [])

  const isAllpositionsFilter =
    positionArray?.length > 0 && positionsFilter?.length === positionArray?.length;

  const handleChangeSelectPositions = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((positionsFilter?.length === positionArray?.length ? [] : "select all"), "newwwwww")

      setpositionsFilter(positionsFilter?.length === positionArray?.length ? [] : positionArray);
      return;
    }
    setpositionsFilter(value);
    // setPage(0);
  };

  useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positionsFilter])
  React.useEffect(() => {
    if (GradesFilter?.length === 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])
  //For multislect options
  const getStatus = (status: any) => {
    if (status == "in-progress") {
      return "In progress"
    } else if (status == "not-started") {
      return "Not started"
    } else if (status == "normalized") {
      return "Normalized"
    } else if (status == "rejected") {
      return "Rejected "
    } else if (status == "completed") {
      return "Completed "
    }
  }
  const viewPAClickHandler = (j: any) => {
    localStorage.setItem("currentRole", user?.current_role);
    localStorage.setItem("Name", user?.legal_full_name);
    if (j?.appraisal?.status === "not-started") {
      window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`, '_blank')
    } else {
      window.open(`${APPRAISER_VIEW_PA}/employee/${j._id}`, '_blank')
    }

  };
  const tableDataFilterdLength = users?.filter((item1: any) => {
    if (positionsFilter.includes("None") || positionsFilter.length === 0) {
      return item1;
    } else {
      return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
    }
  })
    ?.filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((j: any) => {
      if (enteredName === "") {
        return j;
      } else if (
        (j?.employee_code !== undefined &&
          j?.employee_code
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j?.legal_full_name !== undefined &&
          j?.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j.grade !== undefined &&
          j?.grade
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j.position_long_description !== undefined &&
          j?.position_long_description
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j?.appraisal?.status !== undefined &&
          j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (getPAStatus(j) !== undefined &&
          getPAStatus(j)
            ?.toLocaleLowerCase()
            ?.includes(enteredName?.toLocaleLowerCase()))
      ) {
        return j;
      }
    })
  return (
    <>
      <TableContainer
      // style={{ cursor: "pointer" }}
      >
        <Table size="small" aria-label="simple table" stickyHeader >
          <TableHead
            style={{ height: "30px" }}>
            <TableRow
              className={classes.tableRowhead}
              sx={{
                "& td, & th": {
                  // whiteSpace: "nowrap",
                  bgcolor: "#eaeced",
                  // border: 1,
                  // borderColor: "#e0e0e0",
                },
              }}
            >
              <TableCell align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                  // bgcolor: "#ebf2f4",
                }}
                width="80px">
                <div
                  style={{
                    color: "#3e8cb5",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    border: "none",
                    background: "none",
                  }}
                >
                  Ecode
                </div>
              </TableCell>


              <TableCell align="center" width="250px"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <div
                  style={{
                    color: "#3e8cb5",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    border: "none",
                    background: "none",
                  }}
                >
                  Employee Name
                </div>
              </TableCell>
              <TableCell align="center" width="200px"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <div
                  style={{
                    color: "#3e8cb5",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    border: "none",
                    background: "none",
                  }}
                >

                  <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                    <Stack direction="row">
                      <span>Position</span>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        size="small"
                        sx={{
                          width: "25px", fontSize: "0rem",
                          "& .MuiSvgIcon-root": {
                            color: "#3e8cb5 !important"
                          },
                        }}
                        disableUnderline
                        variant="standard"
                        MenuProps={MenuProps}
                        multiple
                        value={positionsFilter}
                        onChange={handleChangeSelectPositions}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        <MenuItem
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                          }}
                          key="all"
                          value="all"
                          classes={{
                            root: isAllpositionsFilter ? classes.selectedAll : "",
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "14px !important",
                                },
                              }}
                              style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                              size="small"
                              classes={{
                                indeterminate: classes.indeterminateColor,
                              }}
                              checked={isAllpositionsFilter}
                              indeterminate={
                                positionsFilter?.length > 0 &&
                                positionsFilter?.length < positionArray?.length
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
                        {positionArray?.map((option: any) => (
                          <MenuItem
                            style={{
                              fontSize: "14px",
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
                                    fontSize: "14px !important",
                                  },
                                }}
                                style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                size="small"
                                checked={positionsFilter.indexOf(option) > -1}
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
                      {icon2 && (
                        <FilterAltTwoToneIcon />)}
                    </Stack>
                  </FormControl>

                </div>
              </TableCell>

              <TableCell align="center" width="45px">
                <div
                  style={{
                    color: "#3e8cb5",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    border: "none",
                    background: "none",
                  }}
                >
                  <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                    <Stack direction="row">
                      <span>Grade</span>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        size="small"
                        sx={{
                          width: "25px", fontSize: "0rem",
                          "& .MuiSvgIcon-root": {
                            color: "#3e8cb5 !important"
                          },
                        }}
                        disableUnderline
                        variant="standard"
                        MenuProps={MenuProps}
                        multiple
                        value={GradesFilter}
                        onChange={handleChangeSelectGrades}
                        renderValue={(selected) => selected.join(', ')}
                      >
                        <MenuItem
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            padding: "0px",
                            //paddingLeft: "37px",
                          }}
                          key="all"
                          value="all"
                          classes={{
                            root: isAllGradesFilter ? classes.selectedAll : "",
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "14px !important",
                                },
                              }}
                              style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                              size="small"
                              classes={{
                                indeterminate: classes.indeterminateColor,
                              }}
                              checked={isAllGradesFilter}
                              indeterminate={
                                GradesFilter?.length > 0 &&
                                GradesFilter?.length < gradesArray?.length
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
                        {gradesArray?.map((option: any) => (


                          <MenuItem
                            style={{
                              fontSize: "14px",
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
                                    fontSize: "14px !important",
                                  },
                                }}
                                style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                size="small"
                                checked={GradesFilter.indexOf(option) > -1}
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
                      {icon3 && (
                        <FilterAltTwoToneIcon />)}
                    </Stack>
                  </FormControl>

                </div>
              </TableCell>
              {tabValue === 0 && <TableCell align="center" width="100px">
                <div
                  style={{
                    color: "#3e8cb5",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Arial",
                    border: "none",
                    background: "none",
                  }}
                >
                  Status
                </div>
              </TableCell>}
              {tabValue != 5 && (
                <TableCell align="center" style={{
                  width: "225px", 
                  color: "#3e8cb5",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Arial",
                }}>

                  Pending Action

                </TableCell>
              )}
              {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                <TableCell
                  align="center"
                  width="70px">
                  <div
                    style={{
                      color: "#3e8cb5",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      border: "none",
                      background: "none",
                    }}
                  >
                    Overall <br></br> Rating
                  </div>
                </TableCell>
              )}
              {tabValue == 4 && (
                <>
                  <TableCell
                    align="center"
                    width="70px"
                    text-align="-webkit-center"
                  >
                    <div
                      style={{
                        color: "#3e8cb5",
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Arial",
                        border: "none",
                        background: "none",
                        wordWrap: "break-word",
                      }}
                    >
                      Employee <br></br> Rating
                    </div>
                  </TableCell>
                </>
              )}
              {tabValue != 0 && tabValue != 5 && (
                <TableCell
                  align="center"
                  width="70px"
                  text-align="-webkit-center"
                >
                  <div
                    style={{
                      color: "#3e8cb5",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      border: "none",
                      background: "none",
                      wordWrap: "break-word",
                    }}
                  >
                    Appraiser <br></br> Rating
                  </div>
                </TableCell>
              )}
              {tabValue != 0 && tabValue != 5 && (
                <TableCell
                  align="center"
                  width="70px"
                  text-align="-webkit-center"
                >
                  <div
                    style={{
                      color: "#3e8cb5",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      border: "none",
                      background: "none",
                      wordWrap: "break-word",
                    }}
                  >
                    Reviewer <br></br> Rating
                  </div>
                </TableCell>
              )}
              {tabValue != 0 && tabValue != 5 && (
                <TableCell
                  align="center"
                  width="70px"
                  text-align="-webkit-center"
                >
                  <div
                    style={{
                      color: "#3e8cb5",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      border: "none",
                      background: "none",
                      wordWrap: "break-word",
                    }}
                  >
                    HR Normalizer<br></br> Rating
                  </div>
                </TableCell>
              )}
              {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (
                <TableCell align="center" width="70px">
                  <div
                    style={{
                      color: "#3e8cb5",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Arial",
                      border: "none",
                      background: "none",
                    }}
                  >
                    Previous Period<br></br> Rating
                  </div>
                </TableCell>
              )}

              <TableCell
                width="70px"
                style={{
                  color: "#3e8cb5",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                View<br></br> PA
              </TableCell>
            </TableRow>
          </TableHead>


          {tableDataFilterdLength.length > 0 ? (<TableBody
            ref={listInnerRef}
            onScroll={onScroll}
          >
            {/* <TableCell>
          {users}
          </TableCell> */}
            {/* <TableCell>
          {users?.map((j:any)=>{
            return j?.employee_code
          })}
        </TableCell> */}
            {users

              ?.filter((item1: any) => {
                if (positionsFilter.includes("None") || positionsFilter.length === 0) {
                  return item1;
                } else {
                  return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                }
              })
              ?.filter((item1: any) => {
                if (GradesFilter.includes("None") || GradesFilter.length === 0) {
                  return item1;
                } else {
                  return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
                }
              })
              ?.filter((j: any) => {
                if (enteredName === "") {
                  return j;
                } else if (
                  (j?.employee_code !== undefined &&
                    j?.employee_code
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (j?.legal_full_name !== undefined &&
                    j?.legal_full_name
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (j.grade !== undefined &&
                    j?.grade
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (j.position_long_description !== undefined &&
                    j?.position_long_description
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (j?.appraisal?.status !== undefined &&
                    j?.appraisal?.status
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (getPAStatus(j) !== undefined &&
                    getPAStatus(j)
                      ?.toLocaleLowerCase()
                      ?.includes(enteredName?.toLocaleLowerCase()))
                ) {
                  return j;
                }
              })
              ?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              ?.map((j: any) => {
                console.log(j, "jjjjjjj")
                return <><TableRow
                  className={classes.tableRow}
                >
                  {console.log(j, tabValue, "jjjjjj")}
                  <TableCell
                    style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      color: "333333",
                    }}
                    align="center"
                  >
                    {j.employee_code}
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      color: "#333333",
                    }}
                    component="th"
                    scope="row"
                  >
                    <p
                      onClick={() => empNameClickHandler(j)}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1.5}
                      >

                        <Names
                          sx={{
                            color:
                              (!getPAStatus(j)?.includes("PA Not Started")) && (
                                // j.appraisal.appraiser_status ==
                                // "draft" ||
                                // j.appraisal.appraiser_status ==
                                // "pending" ||
                                // j.appraisal.appraiser_status ==
                                // "reviewer-rejected" ||
                                // j.appraisal.appraiser_status ==
                                // "employee-rejected" ||
                                // j.appraisal.appraiser_status ==
                                // "reviewer-rejected-employee"
                                j.appraisal.pa_status.includes(
                                  "Pending with Appraiser"
                                ))
                                ? "#0099FF" : "#333333",
                            // : getPAStatus(j)?.includes(
                            //   "Pending with Appraiser"
                            // ) &&
                            //   (j?.appraisal?.status ==
                            //     "in-progress" ||
                            //     j.appraisal.appraiser_status ==
                            //     "employee-rejected")
                            //   ? "#0099FF"
                            //   : "#333333",
                            cursor:
                              // (!getPAStatus(j)?.includes("PA Not Started")) && (
                              //   j.appraisal.appraiser_status ==
                              //   "draft" ||
                              //   j.appraisal.appraiser_status ==
                              //   "pending")
                              //   ? "pointer" : getPAStatus(j)?.includes(
                              //     "Pending with Appraiser"
                              //   ) &&
                              //     j?.appraisal?.status != "not-started"
                              //     ? "pointer"
                              //     : "default",
                              (!getPAStatus(j)?.includes("PA Not Started")) && (
                                j.appraisal.pa_status.includes(
                                  "Pending with Appraiser"
                                ))
                                ? "pointer" : "default",
                          }}
                        // style={{ cursor: "pointer" }}
                        >
                          {j.legal_full_name}
                        </Names>
                      </Stack>
                    </p>
                  </TableCell>

                  <TableCell align="left" style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "333333",
                  }}>
                    {j.position_long_description}
                  </TableCell>

                  <TableCell style={{
                    textAlign: "center", paddingRight: "30px", fontSize: "14px",
                    fontFamily: "Arial",
                    color: "333333",
                  }} >{j.grade}</TableCell>
                  {tabValue === 0 && <TableCell style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "333333",
                  }} align="center">
                    {getStatus(j?.appraisal?.status)}
                  </TableCell>}

                  {tabValue != 5 && (
                    <TableCell align="left" style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      color: "333333",
                      whiteSpace:"break-spaces"

                    }}>
                      {j.appraisal?.status == "not-started" ? "Pending with Appraiser" :
                        j.appraisal?.status == "completed" ? ("-") : j.appraisal.pa_status}
                    </TableCell>
                  )}
                  {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                    <TableCell align="center" style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      // color: "333333",
                    }}>
                      {/******************** If overall rating is changed with respect to the normalized rating then 
                      * rating will be in blue else black***************************/}
                      {(j?.appraisal?.status === "completed" && j?.employee?.employee_status === "rejected" &&
                        (j?.normalizer?.normalizer_rating !== j.normalizer?.normalized_overallRating)) ? (
                        <span style={{ color: "#0099FF" }}>{j?.normalizer?.normalizer_rating?.toFixed(2)}</span>
                      ) : (j?.appraisal?.status === "completed") ? (<span>{j?.normalizer?.normalizer_rating?.toFixed(2)}</span>) :
                        "-"
                      }
                    </TableCell>

                  )}

                  {tabValue == 4 && (

                    <TableCell align="center"
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // color: "333333",
                      }}
                      sx={{
                        color: (j?.appraisal?.status == "rejected" || j.employee.employee_status === "rejected") ? "red" : "#333333",
                      }}
                    >
                      <>
                        {j.employee?.employee_rating == 0 ? (
                          <span> - </span>
                        ) : (
                          j.employee?.employee_rating?.toFixed(2)
                        )}
                      </>
                    </TableCell>

                  )}
                  {tabValue != 0 && tabValue != 5 && (
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // color: "333333",
                      }}
                      align="center"
                      sx={{
                        // color:
                        //     j.appraisal.appraiser_rejected == true ? "red" :
                        //    (j.employee.employee_status == "rejected" && j.appraisal.objective_description.filter((item : any) => item.rating_resubmitted)?.length > 0 ) ? "#1976d2" : "#333333"                          
                        //   }}
                        /******************Appraiser rating should be red if appraiser rejected : should be blue only if there
                         * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                        color:
                          j.appraisal.appraiser_PA_rejected == true ? "red" :
                            (j.appraisal.status == "rejected" && j.appraisal.appraiser_PA_accepted == true &&
                              (j.appraisal.appraiser_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                      }}
                    >
                      {
                        (j.appraisal.appraiser_rating != 0) ?
                          (j.appraisal.appraiser_rating?.toFixed(2)) :
                          <span> - </span>
                      }
                    </TableCell>
                  )}
                  {tabValue != 0 && tabValue != 5 && (
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // color: "333333",
                      }}
                      align="center"
                      sx={{
                        // color:
                        //       (j?.reviewer?.reviewer_status ===
                        //         "rejected" || j.reviewer.reviewer_status === "appraiser-rejected")  ? "red" : 
                        //         (j.employee.employee_status == "rejected" && j.reviewer.reviewer_status == 'accepted-employee') ? "#1976d2" : "#333333" 
                        //   }}

                        /******************Reviewer rating should be red if Reviewer rejected : should be blue only if there
                       * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                        color:
                          (j?.reviewer?.reviewer_PA_rejected === true) ? "red" :
                            (j.appraisal.status == "rejected" && j?.reviewer?.reviewer_PA_accepted == true &&
                              (j.reviewer.reviewer_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                      }}
                    >
                      {
                        (j.reviewer.reviewer_rating == 0) ? (
                          <span> - </span>
                        ) : (
                          j.reviewer.reviewer_rating?.toFixed(2)
                        )}
                    </TableCell>
                  )}
                  {tabValue != 0 && tabValue != 5 && (
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        // color: "333333",
                      }}
                      align="center"
                      sx={{
                        // color:
                        //   (j?.normalizer?.normalizer_rejected === true) ? "red" : 
                        //   (j.employee.employee_status == "rejected" && j.normalizer.normalizer_status == "re-normalized") ? "#1976d2" : "#333333" 
                        /******************Normalizer rating should be red if Normalizer rejected : should be blue only if there
                          * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                        color:
                          (j?.normalizer?.normalizer_PA_rejected === true) ? "red" :
                            (j.appraisal.status == "completed" && j?.normalizer.normalizer_status == "re-normalized" &&
                              (j?.normalizer?.normalizer_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                      }}
                    >
                      {(
                        j?.normalizer?.normalizer_rating == 0) ? (
                        <span> - </span>
                      ) : (
                        j?.normalizer?.normalizer_rating?.toFixed(2)
                      )}
                    </TableCell>
                  )}
                  {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (
                    <TableCell align="center"
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        color: "333333",
                      }}>
                      {j.previous_rating ? j.previous_rating?.toFixed(2) : '-'}
                    </TableCell>
                  )}

                  <TableCell style={{
                    textAlign: "center", fontSize: "14px",
                    fontFamily: "Arial",
                    color: "333333",
                  }}>
                    {j?.appraisal?.status != "not-started" && (
                      <IconButton
                        onClick={() => viewPAClickHandler(j)}
                      >
                        <img src={Eye} alt="icon" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow> </>

              })
            }
          </TableBody>) : (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={9}
                  align="left"
                  style={{ fontWeight: '500', border: "none", color: "#808080", fontSize: "18px", fontFamily: "arial", paddingTop: "10px" }}
                >
                  No data to display
                </TableCell>
              </TableRow>
            </TableBody>
          )}


        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        // count={users.length}
        count={tablecount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default MyTeamTable;
