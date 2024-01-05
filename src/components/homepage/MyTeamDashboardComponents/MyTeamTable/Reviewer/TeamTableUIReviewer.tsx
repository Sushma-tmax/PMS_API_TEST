import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, ListItemText, ListItemIcon, Select, TablePagination } from "@mui/material";
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
import Searchlensreview from "../../../../Reviewericons/Searchlensreview.svg";
import Expand from "../../../../Reviewericons/Expand.svg";
import Newexcel from "../../../../Reviewericons/Newexcel.svg";
import Updown from "../../../../Reviewericons/Updown.svg";
import Avatar from "@mui/material/Avatar";
import { Scrollbar } from "react-scrollbars-custom";
// import Eye from "../../../../Reviewericons/Eyeicon.svg";
import Eye from "../../../../reviewerMain/Reviewericons/Eyeicon.svg";
import { REVIEWER_PAGE, REVIEWER_VIEW_PA } from "../../../../../constants/routes/Routing";
import { makeStyles } from '@mui/styles';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
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
  const { tabValue, setPage, page, handleOnCheck, myAppraisals, setMyAppraisals, enteredName, rowsPerPage, handleChangeRowsPerPage, handleChangePage
    , positionFilter, setpositionFilter, GradeFilter, setGradeFilter } = props;
  const classes = useStyles();
  const { data: user } = useLoggedInUser();

  const navigate = useNavigate();

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


  const getPAStatus = (j: any) => {
    if (
      j.appraisal.objective_description &&
      j.appraisal.objective_description?.length === 0
    )
      return " PA Not Started";
    else if (j?.appraisal?.status == "completed") return " -";
    else if (j?.appraisal?.appraiser_status === "pending" || j?.appraisal?.appraiser_status === "draft")
      return " Pending with Appraiser";
    else if (j?.appraisal?.status === "normalized")
      return " Pending with Employee";
    else if (j?.reviewer?.reviewer_status === "draft") return "Pending with Reviewer (Draft)";
    else if (j?.normalizer?.normalizer_status === "draft")
      return " Pending with HR Normalizer";
    else if (
      (j?.appraisal?.appraiser_status === "submitted" || j?.appraisal?.appraiser_status === "accepted") &&
      (j?.reviewer?.reviewer_status == "pending" || j.reviewer.reviewer_status == "appraiser-accepted" ||
        j.reviewer.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected" && j?.reviewer?.reviewer_status == "accepted")
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected" && j?.reviewer?.reviewer_status == "rejected")
      return " Pending with Appraiser";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected")
      return " Pending with Reviewer";
    else if (
      // j?.appraisal?.appraiser_status === "submited" &&
      (j?.reviewer?.reviewer_status == "accepted") &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status === "reviewer-rejected")
      return " Pending with Appraiser";
    else if (j?.appraisal?.appraiser_status === "normalizer-rejected")
      return " Pending with Appraiser";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected-employee")
      return " Pending with Employee";
    else if (
      j?.reviewer?.reviewer_status == "accepted" &&
      j?.normalizer?.normalizer_status == "employee-rejected"
    )
      return " Pending with HR Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "accepted" &&
      j?.normalizer?.normalizer_status == "normalized"
    )
      return " Pending with Employee";
    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j.reviewer.rejection_count == 3 &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status == "normalizer-rejected")
      return " Pending with Appraiser";
    else if (
      j?.reviewer?.reviewer_status == "appraiser-rejected"
      // &&
      // j?.reviewer?.reviewer_status == "normalizer-rejected"
    )
      return " Pending with Reviewer";
    // 5
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser";
    // 2
    else if (
      j?.reviewer?.reviewer_status == "normalizer-rejected" &&
      j?.reviewer?.reviewer_status == "appraiser-rejected"
    )
      return "Pending with reviewer";
    // 1
    else if (
      j?.appraisal?.appraiser_status == "normalizer-rejected" &&
      j?.appraisal?.appraiser_status == "accepted"
    )
      return "Pending with reviewer";
    // 3
    else if (j?.reviewer?.reviewer_status === "accepted")
      return "Pending with Apprasier";
    //4
    else if (j?.normalizer?.normalizer_status === "accepted")
      return "Pending with Reviewer";
    else {
      return "-"
    }
  };

  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  // const [page, setPage] = React.useState(0);

  // const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  // const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  console.log(positionFilter, "positionFilter");
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  const [mypagecount, setmypagecount] = React.useState<any>(0);
  //pagination
  useEffect(() => {
    const Paginate = myAppraisals
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
      ?.filter((j: any) => {
        if (enteredName === "") {
          return j;
        } else if (
          (j.employee_code !==
            undefined &&
            j.employee_code
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName.toLocaleLowerCase()
              )) ||
          (j.legal_full_name !==
            undefined &&
            j.legal_full_name
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j.grade !== undefined &&
            j.grade
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j.position_long_description !==
            undefined &&
            j.position_long_description
              ?.toLocaleLowerCase()
              .includes(
                enteredName.toLocaleLowerCase()
              )) ||
          (j?.appraisal?.status !==
            undefined &&

            j?.appraisal.status
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()

              ))
        ) {
          return j;
        }
      })
    setmypagecount(Paginate?.length)
    setPage(0);
    console.log(Paginate?.length, "Paginate")
  }, [myAppraisals, enteredName, positionsFilter, GradesFilter, tabValue])


  useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positionsFilter])
  useEffect(() => {
    if (GradesFilter.includes("None") || GradesFilter.length === 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])
  useEffect(() => {
    let grades = myAppraisals
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.map((i: any) => {
        return i?.grade;
      });
    //for filtering graades options
    if (positionsFilter.length > 0) {
      grades = myAppraisals
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade - b?.grade;
        })
        ?.filter((i: any) => {
          return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    // search functionality based on grade
    else if (enteredName?.length > 0) {
      grades = myAppraisals
        .slice()
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
    let position = myAppraisals
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {
        return i?.position_long_description;
      });
    if (GradesFilter.length > 0) {
      position = myAppraisals
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description - b?.position_long_description;
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
    // search functionality based on position
    else if (enteredName?.length > 0) {
      position = myAppraisals
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
    const section = myAppraisals
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.map((i: any) => {
        return i?.section;
      });
    const sectionContents = section?.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
  }, [myAppraisals, positionsFilter, GradesFilter, enteredName])
  //for section multiselect
  const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
  const isAllsectionFilter =
    sectionArray?.length > 0 && sectionsFilter?.length === sectionArray?.length;
  const handleChangeSelectsections = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"), "newwwwww")
      setsectionsFilter(sectionsFilter?.length === sectionArray?.length ? [] : sectionArray);
      return;
    }
    setsectionsFilter(value);
  };

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
    setPage(0);
  };
  // clearing the localstorage
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.clear();
    }
  }, [])
  const handleOpen = () => {
    localStorage.setItem("currentRole", user?.current_role);
    localStorage.setItem("Name", user?.legal_full_name);
  }

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
    setPage(0);
  };

  const tableDataFilterdLength = myAppraisals?.filter((j: any) => j?.appraisal?.status != "excepted")
    ?.filter((j: any) => {
      if (tabValue === 0) {
        return j;
      } else if (tabValue === 1) {


        return j?.appraisal?.pa_status?.includes(
          "Pending with Reviewer"
        );
      } else if (tabValue === 2) {
        return (
          j?.appraisal?.status ==
          "not-started"
        );
      } else if (tabValue === 3) {

        return (
          j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
          j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized"?.toLocaleLowerCase())

        );
      } else if (tabValue === 4) {
        return (
          j?.appraisal?.status ===
          "rejected"
        );
      } else if (tabValue === 5) {
        return (
          j?.appraisal?.status === "completed"
        );
      }
    })
    .filter((item1: any) => {
      if (positionFilter.includes("None") || positionFilter.length === 0) {
        return item1;
      } else {
        return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    .filter((item1: any) => {
      if (GradeFilter.includes("None") || GradeFilter.length === 0) {
        return item1;
      } else {
        return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    .filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    .filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    .filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    .filter((j: any) => {
      if (enteredName === "") {
        return j;
      } else if (
        (j.employee_code !==
          undefined &&
          j.employee_code
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName.toLocaleLowerCase()
            )) ||
        (j.legal_full_name !==
          undefined &&
          j.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j.grade !== undefined &&
          j.grade
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j.position_long_description !==
          undefined &&
          j.position_long_description
            ?.toLocaleLowerCase()
            .includes(
              enteredName.toLocaleLowerCase()
            )) ||
        (j?.appraisal?.status !==
          undefined &&

          j?.appraisal.status
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()

            ))
      ) {
        return j;
      }
    })
  console.log(tableDataFilterdLength, "tableDataFilterdLength")

  return (
    // <Mytable>
    //   <Stack direction="row" alignItems="center" justifyContent="space-between">
    //     <Typography
    //       style={{
    //         fontSize: "18px",
    //         fontFamily: "Arial",
    //         color: "#333333",
    //       }}
    //     >
    //       2020 - Mid Year
    //     </Typography>
    //     <Searchfeild>
    //       <div>
    //         <TextField
    //           id="outlined-basic"
    //           placeholder="Search Here..."
    //           autoComplete="off"
    //           inputProps={{ maxLength: 256 }}
    //           InputProps={{
    //             startAdornment: (
    //               <InputAdornment position="start">
    //                 <img src={Searchlensreview} alt="icon" />
    //               </InputAdornment>
    //             ),
    //           }}
    //         />

    //         <img
    //           src={Newexcel}
    //           alt="icon"
    //           style={{ marginLeft: "15px", marginTop: "5px" }}
    //         />
    //         <img
    //           src={Expand}
    //           alt="icon"
    //           style={{ marginLeft: "15px", marginTop: "5px" }}
    //         />
    //       </div>
    //     </Searchfeild>
    //   </Stack>

    //   <TableContainer
    //     style={{
    //       paddingTop: "20px",
    //     }}
    //   >
    //     <Scroll>
    //       <Scrollbar style={{ width: "100%", height: "calc(100vh - 259px)" }}>
    //         <Table  style={{cursor:"pointer"}} size="small" aria-label="simple table">
    //           <TableHead
    //             style={{ position: "sticky", zIndex: "1000", top: "0px" }}
    //           >
    //             <TableRow sx={{ bgcolor: "#eaeced" }}>
    //               <TableCell align="left">
    //                 <input
    //                   type="checkbox"
    //                   style={{
    //                     height: "18px",
    //                     width: "18px",
    //                   }}
    //                 />
    //               </TableCell>
    //               <TableCell
    //                align="center"
    //                 sx={{
    //                   fontFamily: "Arial",
    //                   color: "#3E8CB5",
    //                   fontSize: "14px",
    //                   fontWeight: "600",
    //                 }}
    //               >
    //                 Employee Name
    //               </TableCell>
    //               <TableCell
    //               align="center"
    //                 sx={{
    //                   fontFamily: "Arial",
    //                   color: "#3E8CB5",
    //                   fontSize: "14px",
    //                   fontWeight: "600",
    //                 }}
    //               >
    //                 Position
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontFamily: "Arial",
    //                   color: "#3E8CB5",
    //                   fontSize: "14px",
    //                   fontWeight: "600",
    //                 }}
    //               >
    //                 Grade
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontFamily: "Arial",
    //                   color: "#3E8CB5",
    //                   fontSize: "14px",
    //                   fontWeight: "600",
    //                 }}
    //               >
    //                 Final Rating
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontFamily: "Arial",
    //                   color: "#3E8CB5",
    //                   fontSize: "14px",
    //                   fontWeight: "600",
    //                 }}
    //               >
    //                 View PA
    //               </TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             <TableRow
    //               sx={{
    //                 "&:last-child td, &:last-child th": {
    //                   borderColor: "lightgrey",
    //                 },
    //               }}
    //             >
    //               <TableCell
    //                 align="left"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                 <Avatar
    //                   alt="Haytham M. M. Alkurdi"
    //                   src="/static/images/avatar/1.jpg"
    //                   sx={{ width: 35, height: 35 }}
    //                 />
    //               </TableCell>
    //               <TableCell
    //                 align="left"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                 Haytham M. M. Alkurdi
    //               </TableCell>
    //               <TableCell
    //                 align="left"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                 Messenger - Admin
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                 15
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                 15
    //               </TableCell>
    //               <TableCell
    //                 align="center"
    //                 sx={{
    //                   fontSize: "14px",
    //                   color: "#333333",
    //                   fontFamily: "Arial",
    //                 }}
    //               >
    //                  <img src={Eye} alt="icon" />
    //               </TableCell>
    //             </TableRow>
    //           </TableBody>
    //         </Table>
    //       </Scrollbar>
    //     </Scroll>
    //   </TableContainer>
    // </Mytable>
    <>
      <TableContainer
      >
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow
              className={classes.tableRowhead}
            >
              {tabValue === 1 && <TableCell align="center" width="2.5%" ></TableCell>}
              <TableCell align="center"
                sx={{
                  fontFamily: "Arial",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
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
                    // margin:"-5px"
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
                    fontFamily: "Arial",
                    fontWeight: "600",
                    border: "none",
                    background: "none",
                  }}
                >
                  Status
                </div>
              </TableCell>}
              {tabValue != 5 && (
                <TableCell align="center" style={{
                  width: "225px", color: "#3e8cb5",
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
                  width="70px"
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
                    Overall<br></br> Rating
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
                      fontFamily: "Arial",
                      fontWeight: "600",
                      border: "none",
                      background: "none",
                      wordWrap: "break-word",
                    }}
                  >
                    Appraiser<br></br> Rating
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
                      fontFamily: "Arial",
                      fontWeight: "600",
                      border: "none",
                      background: "none",
                      wordWrap: "break-word",
                    }}
                  >
                    Reviewer<br></br> Rating
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
                      fontFamily: "Arial",
                      fontWeight: "600",
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
                align="center"
                width="70px"
                style={{
                  color: "#3e8cb5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                View <br></br>PA
              </TableCell>
            </TableRow>
          </TableHead>
          {/* { myAppraisals && */}
          {myAppraisals && tableDataFilterdLength.length > 0 ? (
            <TableBody>
              {myAppraisals
                ?.filter((j: any) => j?.appraisal?.status != "excepted")
                ?.filter((j: any) => {
                  if (tabValue === 0) {
                    return j;
                  } else if (tabValue === 1) {


                    return j?.appraisal?.pa_status?.includes(
                      "Pending with Reviewer"
                    );
                  } else if (tabValue === 2) {
                    return (
                      j?.appraisal?.status ==
                      "not-started"
                    );
                  } else if (tabValue === 3) {

                    return (
                      j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
                      j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized"?.toLocaleLowerCase())

                    );
                  } else if (tabValue === 4) {
                    return (
                      j?.appraisal?.status ===
                      "rejected"
                    );
                  } else if (tabValue === 5) {
                    return (
                      j?.appraisal?.status === "completed"
                    );
                  }
                })
                .filter((item1: any) => {
                  if (positionFilter.includes("None") || positionFilter.length === 0) {
                    return item1;
                  } else {
                    return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
                  }
                })
                .filter((item1: any) => {
                  if (GradeFilter.includes("None") || GradeFilter.length === 0) {
                    return item1;
                  } else {
                    return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
                  }
                })
                .filter((item1: any) => {
                  if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
                    return item1;
                  } else {
                    return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
                  }
                })
                .filter((item1: any) => {
                  if (positionsFilter.includes("None") || positionsFilter.length === 0) {
                    return item1;
                  } else {
                    return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                  }
                })
                .filter((item1: any) => {
                  if (GradesFilter.includes("None") || GradesFilter.length === 0) {
                    return item1;
                  } else {
                    return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
                  }
                })
                .filter((j: any) => {
                  if (enteredName === "") {
                    return j;
                  } else if (
                    (j.employee_code !==
                      undefined &&
                      j.employee_code
                        ?.toLocaleLowerCase()
                        ?.includes(
                          enteredName.toLocaleLowerCase()
                        )) ||
                    (j.legal_full_name !==
                      undefined &&
                      j.legal_full_name
                        ?.toLocaleLowerCase()
                        ?.includes(
                          enteredName?.toLocaleLowerCase()
                        )) ||
                    (j.grade !== undefined &&
                      j.grade
                        ?.toLocaleLowerCase()
                        ?.includes(
                          enteredName?.toLocaleLowerCase()
                        )) ||
                    (j.position_long_description !==
                      undefined &&
                      j.position_long_description
                        ?.toLocaleLowerCase()
                        .includes(
                          enteredName.toLocaleLowerCase()
                        )) ||
                    (j?.appraisal?.status !==
                      undefined &&

                      j?.appraisal.status
                        ?.toLocaleLowerCase()
                        ?.includes(
                          enteredName?.toLocaleLowerCase()

                        ))
                  ) {
                    return j;
                  }
                })
                ?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((j: any) => {
                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={j.name}
                      sx={{ border: 0 }}
                    >
                      {tabValue === 1 &&
                        <TableCell
                          padding="checkbox"
                          align="center"
                        >

                          <input
                            name={j._id}
                            checked={
                              j.reviewerIsChecked
                            }
                            onChange={handleOnCheck}
                            type="checkbox"
                            style={{
                              height: "18px",
                              width: "18px",
                              borderColor: "#D5D5D5",
                              cursor: "pointer"
                            }}
                            disabled={
                              j.reviewerIsDisabled
                            }
                          />
                        </TableCell>
                      }
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",

                        }}
                        // style={{
                        //   cursor: "pointer",
                        // }}
                        align="center"
                      >
                        {j?.employee_code}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",

                        }}
                        component="th"
                        scope="row"
                        align="left"
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <Names>
                            <p
                            // style={{ cursor: "pointer" }}
                            // onClick={() =>
                            //   j.reviewer
                            //     .reviewer_status ==
                            //   "draft" ||
                            //   (j.reviewer
                            //     .reviewer_status ==
                            //     "appraiser-rejected" &&
                            //     navigate(
                            //       `${REVIEWER_PAGE}/employee/${j._id}`
                            //     ))
                            // }
                            >
                              {j.legal_full_name}
                            </p>
                          </Names>
                        </Stack>
                      </TableCell>

                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",

                        }}
                        align="left"
                      >
                        {
                          j?.position_long_description
                        }
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center", paddingRight: "30px", fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",
                        }}
                      >
                        {j?.grade}
                      </TableCell>
                      {tabValue === 0 && <TableCell
                        align="center"
                        style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",
                        }}
                      >
                        {getStatus(j?.appraisal?.status)}
                      </TableCell>}
                      {tabValue != 5 && (
                        <TableCell
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                          }}
                          align="left"
                        >
                          {j.appraisal?.status == "not-started" ? "Pending with Appraiser" :
                            j.appraisal?.status == "completed" ? ("-") : j.appraisal.pa_status}
                        </TableCell>
                      )}
                      {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                        <TableCell align="center" style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          // color: "#333333", 
                        }}>
                          {/******************** If overall rating is changed with respect to the normalized rating then 
                      * rating will be in blue else black***************************/}
                          {(j?.appraisal?.status === "completed" && j?.employee?.employee_status === "rejected" && (
                            j?.normalizer?.normalizer_rating !== j.normalizer?.normalized_overallRating)) ? (
                            <span style={{ color: "#1976d2" }}>{j?.normalizer?.normalizer_rating?.toFixed(2)}</span>
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
                            // color: "#333333", 
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
                            // color: "#333333", 
                          }}
                          // width="8%"
                          sx={{
                            /******************Appraiser rating should be red if appraiser rejected : should be blue only if there
             * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                            color:
                              j.appraisal.appraiser_PA_rejected == true ? "red" :
                                (j.appraisal.status == "rejected" && j.appraisal.appraiser_PA_accepted == true && (
                                  j.appraisal.appraiser_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                          }}
                          align="center"
                        >
                          {(j.appraisal
                            ?.appraiser_rating == 0) ? (
                            <span> - </span>
                          ) : (
                            j.appraisal
                              ?.appraiser_rating?.toFixed(2)
                          )}
                        </TableCell>
                      )}
                      {tabValue != 0 && tabValue != 5 && (
                        <TableCell
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            // color: "#333333", 
                          }}
                          sx={{

                             /******************Reviewer rating should be red if Reviewer rejected : should be blue only if there
                       * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                            color:
                              (j?.reviewer?.reviewer_PA_rejected === true) ? "red" :
                                (j.appraisal.status == "rejected" && j?.reviewer?.reviewer_PA_accepted == true &&
                                (j.reviewer.reviewer_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                          }}
                          align="center"
                        >
                          {/* changes as per date 4/28/2023 */}
                          {
                            (j.reviewer.reviewer_rating != 0) ?
                              (j.reviewer.reviewer_rating?.toFixed(2)) :
                              <span> - </span>
                          }

                        </TableCell>
                      )}
                      {tabValue != 0 && tabValue != 5 && (
                        <TableCell
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            // color: "#333333", 
                          }}
                          sx={{
                             /******************Normalizer rating should be red if Normalizer rejected : should be blue only if there
                          * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                            color:
                              (j?.normalizer?.normalizer_PA_rejected === true) ? "red" :
                                (j.appraisal.status == "completed" && j?.normalizer.normalizer_status == "re-normalized" &&
                                (j?.normalizer?.normalizer_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333",
                            marginLeft: "10px",
                          }}
                          align="center"
                        >
                          {
                            (j.normalizer
                              .normalizer_rating == 0)
                              ? (
                                <span> - </span>
                              ) : (
                                j.normalizer
                                  .normalizer_rating?.toFixed(2)
                              )}{" "}
                        </TableCell>
                      )}
                      {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (
                        <TableCell align="center" style={{
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",
                        }}>
                          {j.previous_rating ? j.previous_rating?.toFixed(2) : '-'}

                        </TableCell>
                      )}

                      <TableCell
                        align="center"
                      >
                        {j?.appraisal?.status != "not-started" && (
                          <Link
                            to={`${REVIEWER_VIEW_PA}/employee/${j._id}`}
                            // target="_blank"
                            onClick={handleOpen}
                          >

                            <img
                              src={Eye}
                              alt="icon"
                            />{" "}
                          </Link>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
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
            </TableBody>)}
          {/* } */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={mypagecount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default MyTeamTable;
