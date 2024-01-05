import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, FormControlLabel, MenuItem, IconButton, FormControl, Menu, ListItemText, Breadcrumbs, ListItemIcon } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Drawer, TextField } from "@mui/material";
import Expand from "../../../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import Searchlensreview from "../../../reviewer/Dashboard/Reviewericons/Searchlensreview.svg";
import Updown from "../../../reviewer/Dashboard/Reviewericons/Updown.svg";
import Leftarrow from "../../../reviewer/Dashboard/Reviewericons/Leftarrow.svg";
import Newexcel from "../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import Eye from "../../reviewer/Dashboard/Reviewericons/Eyeicon.svg";
import * as XLSX from "xlsx";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import { 
    useGetEmployeeByFilterQuery,
    useGetEmployeeByManagerCodeQuery,
    useGetEmployeeByStatusQuery,
    useGetEmployeeQuery,
    useGetReviewerEmployeeByFilterQuery } from "../../../../service";
import { useGetPreviousAppraisalEmployeeByFilterQuery } from '../../../../service/employee/previousAppraisal';
import { APPRAISAL_NOT_STARTED,
    APPRAISER,
    EMPLOYEE_APPRAISER_SUBMISSION,
    CREATE_APPRAISAL,
    EMPLOYEE_DOWNLOAD,
    VIEW_PA,
    VIEW_PAST_PA, } from "../../../../constants/routes/Routing";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import TablePagination from "@mui/material/TablePagination";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import { Scrollbar } from "react-scrollbars-custom";
import { makeStyles } from '@mui/styles';

const Searchfeild = styled("div")({
  // position: "absolute",
  // marginLeft: "78%",
  // //marginRight: '8px',
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
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-Track": {

    //width:"10px !important"
  },
});
const Names = styled("div")({

  color: "#333333",

});
const TableHeadings = styled("div")({
  // "& .MuiTableRow-head ": {
  //   background: "#eaeced",
  // },
  // "& .MuiTableCell-head": {
  //   color: "#004C75",
  //   padding: "0px",
  //   height: "30px",
  //   borderBottom: "2px solid white",
  // },
  // "& .MuiTableCell-root": {
  //   padding: "8px 15px 8px 15px",

  // },
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

}));
export default function ExpandteamtableClosed(props: any) {
  const { data: user } = useLoggedInUser();
  const classes = useStyles();

  // const location = useLocation();
  const { state }: { state: any } = useLocation();
  console.log(state, "select")
  const SELECT_FOR_DASHBOARD = `employee_code,
  legal_full_name,
  employee.employee_rating,
  position_long_description,
  employee.employee_status,first_name,
  grade,
  division, service_reference_date,isSupervisor,email,function,
  sub_section,
  talent_category,
  previous_rating,
  section,
  service_reference_date,
function,
email,
appraiser_code,
reviewer_code,
normalizer_code,
employee_rating,
previous_rating,
  appraiser_rating,
  appraisal.appraiser_rejected,
  reviewer_rating,
  employee.isGradeException,
  normalizer_rating,
  normalizer.normalizer_rejected,
  appraisal.status,
  appraiser_name,
  normalizer_name,
  reviewer_name,
  appraisal.potential,
  manager_code,
  manager_name,
  manager_position,
  work_location,
  division,
  appraisal.appraiser_name,
  appraisal.appraiser_status,
  reviewer.reviewer_status,
  normalizer.normalizer_status,
  reviewer.rejection_count,
  appraisal.objective_description,
  reviewerIsDisabled,
  normalizerIsChecked,
  normalizerIsDisabled,
  employee.employee_rejection,
  employee.employee_agree,
  pa_status,
  overall_rating,
  appraisal.status,
  employee.employee_status,
  appraisal.pa_status`
  // const { data: employeeData } = useGetEmployeeByFilterQuery(
  //   `?appraiser_code=${user?.employee_code}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  // );
  const { data: employeeData } = useGetPreviousAppraisalEmployeeByFilterQuery(`?select=${SELECT_FOR_DASHBOARD}&calendar=${state?.appCalId}&limit=800`)

  const listInnerRef = useRef<any>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [enteredName, setenteredName] = useState("");
  const [approved, setApproved] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)
  const CustomScrollbar = Scrollbar as any;

  //Data for populating the table
// valueOfActiveCalender
const CalendarName =state?.valueOfActiveCalender
  console.log(users,employeeData, "users")
const employees =state?.users
  useEffect(() => {
    // if()
    // setUsers(employeeData?.data);
    setUsers(employees)

  }, [employeeData]);


  const getPAStatus = (j: any) => {
    if (
      j.appraisal?.objective_description &&
      j.appraisal?.objective_description.length === 0
    )
      return " PA Not Started";
    else if (j?.appraisal?.status == "completed") return "-";
    else if (j?.appraisal?.appraiser_status === "pending")
      return " Pending with Appraiser";
    else if (j?.appraisal?.status === "normalized")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status?.includes("draft")) return " Pending with Appraiser (Draft)";
    else if (
      j?.appraisal?.appraiser_status === "submitted" &&
      (j?.reviewer?.reviewer_status == "pending" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (
      j?.appraisal?.appraiser_status === "accepted" &&
      (j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "appraiser-accepted" ||
        j?.reviewer?.reviewer_status == "draft")
    )
      return " Pending with Reviewer";
    else if (j?.reviewer?.reviewer_status == "appraiser-rejected") {
      return " Pending with Reviewer";
    } else if (
      // j.appraisal.appraiser_status === "submited" &&
      j?.reviewer?.reviewer_status == "accepted" &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.appraisal?.appraiser_status === "reviewer-rejected")
      return " Pending with Appraiser (Reviewer Rejection)";
    else if (j?.appraisal?.appraiser_status === "normalizer-rejected")
      return " Pending with Appraiser (Normalizer Rejection)";
    else if (j?.appraisal?.appraiser_status === "appraiser-rejected-employee")
      return " Pending with Employee";
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser (Employee Rejection)";
    else if (
      j?.reviewer?.reviewer_status == "accepted" &&
      j?.normalizer.normalizer_status == "employee-rejected"
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "accepted")
      return " Pending with Employee";
    else if (j?.normalizer?.normalizer_status === "draft")
      return " Pending with HR Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j?.reviewer?.rejection_count == 3 &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with HR Normalizer";
    // 5
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser";
    // 2
    else if (
      j?.reviewer?.reviewer_status == "normalizer-rejected" &&
      j?.reviewer?.reviewer_status == "appraiser-rejected"
    )
      return "Pending with Reviewer";
    // 1
    else if (
      j?.appraisal?.appraiser_status == "normalizer-rejected" &&
      j?.appraisal?.appraiser_status == "accepted"
    )
      return "Pending with Reviewer";
    else return "-";
  };

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
  const [empsections, setempsections] = React.useState("");
  // console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
  };
 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //Data for populating the table
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

  const [employeeCode, setemployeeCode] = React.useState("");
  // console.log(employeeCode, "employeeCode");
  const handleChangeemployeeCode = (event: SelectChangeEvent) => {
    setemployeeCode(event.target.value);
  };
  const [employeeName, setemployeeName] = React.useState("");
  //console.log(employeeName, "position");
  const handleChangeemployeeName = (event: SelectChangeEvent) => {
    setemployeeName(event.target.value);
  };

  const onScroll = () => {
    console.log('running scroll')
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPageNumber(pageNumber + 1);
      }
    }
  };
  //sorting

  // const [positions, setPositions] = React.useState<any>([]);
  const [positions, setPositions] = React.useState("");
  // console.log(positions, "position1");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };
  const [empgrades, setempGrades] = React.useState("");
  // console.log(empgrades, "position");
  const handleChangegrades = (event: SelectChangeEvent) => {
    setempGrades(event.target.value);
  };
  const [empdivisions, setempdivisions] = React.useState("");
  // console.log(empdivisions, "position");
  const handleChangedivisions = (event: SelectChangeEvent) => {
    setempdivisions(event.target.value);
  };

  const [empEmployeeCode, setempEmployeeCode] = React.useState("");
  // console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setempEmployeeCode(event.target.value);
  };


  const [empFullName, setempFullName] = React.useState("");
  // console.log(empFullName, "position");
  const handleChangeFullName = (event: SelectChangeEvent) => {
    setempFullName(event.target.value);
  };
  const [empFirstName, setempFirstName] = React.useState("");
  // console.log(empFirstName, "position");
  const handleChangeFirstName = (event: SelectChangeEvent) => {
    setempFirstName(event.target.value);
  };
  const [sNS, setsNS] = React.useState("");
  // console.log(sNS, "sNS");
  const handleChangesNS = (event: SelectChangeEvent) => {
    setsNS(event.target.value);
  };
  const [empPositionCode, setempPositionCode] = React.useState("");
  // console.log(empPositionCode, "position");
  const handleChangePositionCode = (event: SelectChangeEvent) => {
    setempPositionCode(event.target.value);
  };
  const [empService, setempService] = React.useState("");
  // console.log(empService, "position");
  const handleChangeService = (event: SelectChangeEvent) => {
    setempService(event.target.value);
  };
  const [empFunction, setempFunction] = React.useState("");
  // console.log(empFunction, "position");
  const handleChangeFunction = (event: SelectChangeEvent) => {
    setempFunction(event.target.value);
  };
  const [empSubSection, setempSubSection] = React.useState("");
  // console.log(empSubSection, "position");
  const handleChangeSubSection = (event: SelectChangeEvent) => {
    setempSubSection(event.target.value);
  };
  const [empManagerCode, setempManagerCode] = React.useState("");
  // console.log(empManagerCode, "position");
  const handleChangeManagerCode = (event: SelectChangeEvent) => {
    setempManagerCode(event.target.value);
  };
  const [empManagerName, setempManagerName] = React.useState("");
  // console.log(empManagerName, "position");
  const handleChangeManagerName = (event: SelectChangeEvent) => {
    setempManagerName(event.target.value);
  };
  //ff
  const [empManagerPosition, setempManagerPosition] = React.useState("");
  // console.log(empManagerPosition, "position");
  const handleChangeManagerPosition = (event: SelectChangeEvent) => {
    setempManagerPosition(event.target.value);
  };
  const [empGradeset, setempGradeset] = React.useState("");
  // console.log(empGradeset, "position");
  const handleChangeGradeset = (event: SelectChangeEvent) => {
    setempGradeset(event.target.value);
  };
  const [empJobcode, setempJobcode] = React.useState("");
  // console.log(empJobcode, "position");
  const handleChangeJobcode = (event: SelectChangeEvent) => {
    setempJobcode(event.target.value);
  };
  const [empWorkLocation, setempWorkLocation] = React.useState("");
  // console.log(empWorkLocation, "position");
  const handleChangeWorkLocation = (event: SelectChangeEvent) => {
    setempWorkLocation(event.target.value);
  };
  const [empjobtitle, setempjobtitle] = React.useState("");
  // console.log(empjobtitle, "position");
  const handleChangeempjobtitle = (event: SelectChangeEvent) => {
    setempjobtitle(event.target.value);
  };
  const [empjoblevel, setempjoblevel] = React.useState("");
  console.log(empjoblevel, "position");
  const handleChangeempjoblevel = (event: SelectChangeEvent) => {
    setempjoblevel(event.target.value);
  };
  //populating filter dropdown
  const [serviceRef, setserviceRef] = React.useState<any>([]);
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [positioncodeArray, setpositioncodeArray] = React.useState<any>([]);
  const [divisionArray, setdivisionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [subSectionArray, setsubSectionArray] = React.useState<any>([]);
  const [managerCodeArray, setmanagerCodeArray] = React.useState<any>([]);
  const [managerNameArray, setmanagerNameArray] = React.useState<any>([]);
  const [managerPositionArray, setmanagerPositionArray] = React.useState<any>(
    []
  );
  const [workLocationArray, setworkLocationArray] = React.useState<any>([]);
  const [gradeSetArray, setgradeSetArray] = React.useState<any>([]);
  const [jobCodeArray, setjobCodeArray] = React.useState<any>([]);
  const [jobTitleArray, setjobTitleArray] = React.useState<any>([]);
  const [jobLevelArray, setjobLevelArray] = React.useState<any>([]);

  const [excel, setExcel] = React.useState<any>([]);
  const [page1, setPage1] = React.useState<any>([]);
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
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
    setPage(0);
  };

  React.useEffect(() => {
    const serviceRefDate = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.service_reference_date?.localeCompare(b?.service_reference_date);
      })
      ?.map((i: any) => {
        return i.service_reference_date;
      });
    const serviceRefDateContents = serviceRefDate?.filter(
      (c: any, index: any) => {
        return (
          serviceRefDate?.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setserviceRef(serviceRefDateContents);
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
          return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    // search functionality based on grade
    else if (enteredName?.length > 0) {
      grades = users
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade?.localeCompare(
            b?.grade
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const enteredTerms = enteredName.toLowerCase().split(" ");
            return enteredTerms.every(term =>
              i?.grade
                ?.toLowerCase()
                .includes(term)
            )|| enteredTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || enteredTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.legal_full_name?.toLowerCase().includes(term)
            )
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    const gradeContents = grades?.filter((c: any, index: any) => {
      return grades?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    console.log(gradeContents, "contents");
    let position = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {
        return i?.position_long_description;
      });
      // GradesFilter
    if (GradesFilter?.length > 0) {
      position = users
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
            return enteredTerms.every(term =>
              i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || enteredTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || enteredTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
            )|| enteredTerms.every(term =>
              i?.legal_full_name?.toLowerCase().includes(term)
            )
            
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
    console.log(positionContents, "contents");

    const positionCode = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_code?.localeCompare(b?.position_code);
      })
      .map((i: any) => {
        return i?.position_code;
      });
    const positionCodeContents = positionCode?.filter((c: any, index: any) => {
      return positionCode?.indexOf(c) === index && c != null && c != undefined;
    });
    setpositioncodeArray(positionCodeContents);
    console.log(positionContents, "contents");

    const division = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      ?.map((i: any) => {
        return i.division;
      });
    const divisionContents = division

      ?.filter((c: any, index: any) => {
        return division?.indexOf(c) === index && c != null && c != undefined;
      });
    setdivisionArray(divisionContents);
    console.log(divisionContents, "contents");

    let section = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.map((i: any) => {
        return i.section;
      });
      if (GradesFilter?.length > 0) {
        section = users
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.section - b?.section;
          })
          ?.filter((i: any) => {
            return !!GradesFilter?.find(item2 => i?.grade === item2)
          })
          ?.map((i: any) => {
            return i?.section;
          });
      }
    else  if (positionsFilter.length > 0) {
      section = users
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.section - b?.section;
          })
          ?.filter((i: any) => {
            return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
          })
          ?.map((i: any) => {
            return i?.section;
          });
      }
      else if (enteredName?.length > 0) {
        section = users
          .slice()
          ?.sort(function (a: any, b: any) {
            return a?.section?.localeCompare(
              b?.section
            );
          })
          ?.filter((i: any) => {
            if (enteredName.length > 0) {
              const enteredTerms = enteredName.toLowerCase().split(" ");
              return enteredTerms.every(term =>
                i?.section
                  ?.toLowerCase()
                  .includes(term)
              ) || enteredTerms.every(term =>
                i?.grade?.toLowerCase().includes(term)
              ) || enteredTerms.every(term =>
                i?.position_long_description?.toLowerCase().includes(term)
              )|| enteredTerms.every(term =>
                i?.section?.toLowerCase().includes(term)
              )|| enteredTerms.every(term =>
                i?.employee_code?.toLowerCase().includes(term)
              )|| enteredTerms.every(term =>
                i?.legal_full_name?.toLowerCase().includes(term)
              )
            } else {
              return true;
            }
          })
          ?.map((i: any) => {
            return i?.section;
          });
      }
    const sectionContents = section?.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
    console.log(sectionContents, "contents");

    const subSection = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.["sub section"]?.localeCompare(b?.["sub section"]);
      })
      ?.map((i: any) => {
        return i["sub section"];
      });
    const subSectionContents = subSection?.filter((c: any, index: any) => {
      return subSection?.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArray(subSectionContents);
    console.log(subSectionContents, "contents");

    const managerCode = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a.manager_code - b.manager_code;
      })
      ?.map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode?.filter((c: any, index: any) => {
      return managerCode?.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    console.log(managerCodeContents, "contents");

    const managerName = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_name?.localeCompare(b?.manager_name);
      })
      ?.map((i: any) => {
        return i.manager_name;
      });
    const managerNameContents = managerName?.filter((c: any, index: any) => {
      return managerName?.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    console.log(managerNameContents, "contents");

    const managerPosition = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_position?.localeCompare(b?.manager_position);
      })
      ?.map((i: any) => {
        return i.manager_position;
      });
    const managerPositionContents = managerPosition?.filter(
      (c: any, index: any) => {
        return (
          managerPosition?.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setmanagerPositionArray(managerPositionContents);
    console.log(managerPositionContents, "contents");

    const workLocation = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.work_location?.localeCompare(b?.work_location);
      })
      ?.map((i: any) => {
        return i?.work_location;
      });
    const workLocationContents = workLocation?.filter((c: any, index: any) => {
      return workLocation?.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    console.log(workLocationContents, "contents");

    const gradeSet = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade_set?.localeCompare(b?.grade_set);
      })
      ?.map((i: any) => {
        return i.grade_set;
      });
    const gradeSetContents = gradeSet?.filter((c: any, index: any) => {
      return gradeSet?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradeSetArray(gradeSetContents);
    console.log(workLocationContents, "contents");

    const jobCode = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_code?.localeCompare(b?.job_code);
      })
      ?.map((i: any) => {
        return i.job_code;
      });
    const jobCodeContents = jobCode?.filter((c: any, index: any) => {
      return jobCode?.indexOf(c) === index && c != null && c != undefined;
    });
    setjobCodeArray(jobCodeContents);
    console.log(jobCodeContents, "contents");

    const jobTitle = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_title?.localeCompare(b?.job_title);
      })
      ?.map((i: any) => {
        return i.job_title;
      });
    const jobTitleContents = jobTitle?.filter((c: any, index: any) => {
      return jobTitle?.indexOf(c) === index && c != null && c != undefined;
    });
    setjobTitleArray(jobTitleContents);
    console.log(jobTitleContents, "contents");

    const jobLevel = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_level?.localeCompare(b?.job_level);
      })
      ?.map((i: any) => {
        return i.job_level;
      });
    const jobLevelContents = jobLevel?.filter((c: any, index: any) => {
      return jobLevel?.indexOf(c) === index && c != null && c != undefined;
    });
    setjobLevelArray(jobLevelContents);
    console.log(jobLevelContents, "contents");
  }, [users,positionsFilter,GradesFilter,enteredName]);
  //populating filter dropdown
  const [anchorElnew, setAnchorElnew] = React.useState<null | HTMLElement>(
    null
  );
  const opennew = Boolean(anchorElnew);
  const handleClicknew = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnew(event.currentTarget);
  };
  const handleClosenew = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event?.target.value)
    setAnchorElnew(null);
  };
  const handleTarget = (event: any) => {
    // console.log(event?.target.value)
    setempEmployeeCode(event?.target?.getAttribute("value"))
    // setempEmployeeCode(event?.target?.value?.toString());
    console.log(event?.target.name.toString(), "handleTarget")
    // setAnchorElnew(null);
    handleClosenew(event);
  };
  //Legal Full Name
  const [anchorElnewFullName, setAnchorElnewFullName] = React.useState<null | HTMLElement>(
    null
  );
  const openFullName = Boolean(anchorElnewFullName);
  const handleClickFullName = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFullName(event.currentTarget);
  };
  const handleCloseFullName = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFullName(null);
  };
  const handleTargetFullName = (event: any) => {

    setempFullName(event?.target?.getAttribute("value"));


    setAnchorElnewFullName(null);
  };
  //Legal Full Name
  //function
  const [anchorElnewFunction, setAnchorElnewFunction] = React.useState<null | HTMLElement>(
    null
  );
  const openFunction = Boolean(anchorElnewFunction);
  const handleClickFunction = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFunction(event.currentTarget);
  };
  const handleCloseFunction = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFunction(null);
  };
  const handleTargetFunction = (event: any) => {

    setempFunction(event?.target?.getAttribute("value"));


    setAnchorElnewFunction(null);
  };
  //function

  //FirstName
  const [anchorElnewFirstName, setAnchorElnewFirstName] = React.useState<null | HTMLElement>(
    null
  );
  const openFirstName = Boolean(anchorElnewFirstName);
  const handleClickFirstName = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFirstName(event.currentTarget);
  };
  const handleCloseFirstName = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFirstName(null);
  };
  const handleTargetFirstName = (event: any) => {

    setempFirstName(event?.target?.getAttribute("value"));


    setAnchorElnewFirstName(null);
  };
  //FirstName

  //Supervisory Role
  const [anchorElnewSupervisoryRole, setAnchorElnewSupervisoryRole] = React.useState<null | HTMLElement>(
    null
  );
  const openSupervisoryRole = Boolean(anchorElnewSupervisoryRole);
  const handleClickSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSupervisoryRole(event.currentTarget);
  };
  const handleCloseSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewSupervisoryRole(null);
  };
  const handleTargetSupervisoryRole = (event: any) => {


    setsNS(event?.target?.getAttribute("value"))

    handleCloseSupervisoryRole(event);
  };
  //Supervisory Role
  //serviceRefDate
  const [anchorElnewserviceRefDate, setAnchorElnewserviceRefDate] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceRefDate = Boolean(anchorElnewserviceRefDate);
  const handleClickserviceRefDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRefDate(event.currentTarget);
  };
  const handleCloseserviceRefDate = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceRefDate(null);
  };
  const handleTargetserviceRefDate = (event: any) => {

    setserviceRef(event?.target?.getAttribute("value"));


    setAnchorElnewserviceRefDate(null);
  };
  //serviceRefDate
  //Position
  const [anchorElnewservicePosition, setAnchorElnewservicePosition] = React.useState<null | HTMLElement>(
    null
  );
  const openservicePosition = Boolean(anchorElnewservicePosition);
  const handleClickservicePosition = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewservicePosition(event.currentTarget);
  };
  const handleCloseservicePosition = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewservicePosition(null);
  };
  const handleTargetservicePosition = (event: any) => {

    setPositions(event?.target?.getAttribute("value"));


    setAnchorElnewservicePosition(null);
  };
  //Position
  const [anchorElnewserviceGrade, setAnchorElnewserviceGrade] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceGrade = Boolean(anchorElnewserviceGrade);
  const handleClickserviceGrade = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceGrade(event.currentTarget);
  };
  const handleCloseserviceGrade = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceGrade(null);
  };
  const handleTargetserviceGrade = (event: any) => {

    setempGrades(event?.target?.getAttribute("value"));


    setAnchorElnewserviceGrade(null);
  };
  //Grade
  //Position Code
  const [anchorElnewPositionCode, setAnchorElnewPositionCode] = React.useState<null | HTMLElement>(
    null
  );
  const openPositionCode = Boolean(anchorElnewPositionCode);
  const handleClickPositionCode = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewPositionCode(event.currentTarget);
  };
  const handleClosePositionCode = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewPositionCode(null);
  };
  const handleTargetPositionCode = (event: any) => {

    setempPositionCode(event?.target?.getAttribute("value"));


    setAnchorElnewPositionCode(null);
  };
  //Position Code
  //Division
  const [anchorElnewDivision, setAnchorElnewDivision] = React.useState<null | HTMLElement>(
    null
  );
  const openDivision = Boolean(anchorElnewDivision);
  const handleClickDivision = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewDivision(event.currentTarget);
  };
  const handleCloseDivision = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewDivision(null);
  };
  const handleTargetDivision = (event: any) => {

    setempdivisions(event?.target?.getAttribute("value"));


    setAnchorElnewDivision(null);
  };
  //Division
  //Section
  const [anchorElnewSection, setAnchorElnewSection] = React.useState<null | HTMLElement>(
    null
  );
  const openSection = Boolean(anchorElnewSection);
  const handleClickSection = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSection(event.currentTarget);
  };
  const handleCloseSection = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewSection(null);
  };
  const handleTargetSection = (event: any) => {

    setempsections(event?.target?.getAttribute("value"));


    setAnchorElnewSection(null);
  };
  //Section
  //SubSection
  const [anchorElnewSubSection, setAnchorElnewSubSection] = React.useState<null | HTMLElement>(
    null
  );
  const openSubSection = Boolean(anchorElnewSubSection);
  const handleClickSubSection = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSubSection(event.currentTarget);
  };
  const handleCloseSubSection = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewSubSection(null);
  };
  const handleTargetSubSection = (event: any) => {

    setempSubSection(event?.target?.getAttribute("value"));


    setAnchorElnewSubSection(null);
  };
  //SubSection
  //Manager Code
  const [anchorElnewManagerCode, setAnchorElnewManagerCode] = React.useState<null | HTMLElement>(
    null
  );
  const openSubManagerCode = Boolean(anchorElnewManagerCode);
  const handleClickManagerCode = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewManagerCode(event.currentTarget);
  };
  const handleClosManagerCode = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewManagerCode(null);
  };
  const handleTargetManagerCode = (event: any) => {

    setempManagerCode(event?.target?.getAttribute("value"));


    setAnchorElnewManagerCode(null);
  };
  //Manager Code
  //Manager Name
  const [anchorElnewManagerName, setAnchorElnewManagerName] = React.useState<null | HTMLElement>(
    null
  );
  const openSubManagerName = Boolean(anchorElnewManagerName);
  const handleClickManagerName = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewManagerName(event.currentTarget);
  };
  const handleClosManagerName = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewManagerName(null);
  };
  const handleTargetManagerName = (event: any) => {

    setempManagerName(event?.target?.getAttribute("value"));


    setAnchorElnewManagerName(null);
  };
  //Manager Name
  //Manager Position
  const [anchorElnewManagerPosition, setAnchorElnewManagerPosition] = React.useState<null | HTMLElement>(
    null
  );
  const openSubManagerPosition = Boolean(anchorElnewManagerPosition);
  const handleClickManagerPosition = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewManagerPosition(event.currentTarget);
  };
  const handleClosManagerPosition = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewManagerPosition(null);
  };
  const handleTargetManagerPosition = (event: any) => {

    setempManagerPosition(event?.target?.getAttribute("value"));


    setAnchorElnewManagerPosition(null);
  };
  //Manager Position
  //Work Location
  const [anchorElnewWorkLocation, setAnchorElnewWorkLocation] = React.useState<null | HTMLElement>(
    null
  );
  const openSubWorkLocation = Boolean(anchorElnewWorkLocation);
  const handleClickWorkLocation = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewWorkLocation(event.currentTarget);
  };
  const handleClosWorkLocation = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewWorkLocation(null);
  };
  const handleTargetWorkLocation = (event: any) => {

    setempWorkLocation(event?.target?.getAttribute("value"));


    setAnchorElnewWorkLocation(null);
  };
  //Work Location
  //Grade set
  const [anchorElnewGradeSet, setAnchorElnewGradeSet] = React.useState<null | HTMLElement>(
    null
  );
  const openSubGradeSet = Boolean(anchorElnewGradeSet);
  const handleClickGradeSet = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewGradeSet(event.currentTarget);
  };
  const handleClosGradeSet = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewGradeSet(null);
  };
  const handleTargetGradeSet = (event: any) => {

    setempGradeset(event?.target?.getAttribute("value"));


    setAnchorElnewGradeSet(null);
  };
  //Grade set
  //Job Code
  const [anchorElnewJobCode, setAnchorElnewJobCode] = React.useState<null | HTMLElement>(
    null
  );
  const openSubJobCode = Boolean(anchorElnewJobCode);
  const handleClickJobCode = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewJobCode(event.currentTarget);
  };
  const handleClosJobCode = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewJobCode(null);
  };
  const handleTargetJobCode = (event: any) => {

    setempJobcode(event?.target?.getAttribute("value"));


    setAnchorElnewJobCode(null);
  };
  //Job Code
  //Job Title
  const [anchorElnewJobTitle, setAnchorElnewJobTitle] = React.useState<null | HTMLElement>(
    null
  );
  const openSubJobTitle = Boolean(anchorElnewJobTitle);
  const handleClickJobTitle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewJobTitle(event.currentTarget);
  };
  const handleClosJobTitle = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewJobTitle(null);
  };
  const handleTargetJobTitle = (event: any) => {

    setempjobtitle(event?.target?.getAttribute("value"));


    setAnchorElnewJobTitle(null);
  };
  //Job Title
  //Job Level
  const [anchorElnewJobLevel, setAnchorElnewJobLevel] = React.useState<null | HTMLElement>(
    null
  );
  const openSubJobLevel = Boolean(anchorElnewJobLevel);
  const handleClickJobLevel = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewJobLevel(event.currentTarget);
  };
  const handleClosJobLevel = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewJobLevel(null);
  };
  const handleTargetJobLevel = (event: any) => {

    setempjoblevel(event?.target?.getAttribute("value"));


    setAnchorElnewJobLevel(null);
  };
  //Job level

  // multiselect for position and grade
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) { setpositionFilter([]) } else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
    setPage(0);
  };
  const handleChangeSelectGrade = (event: SelectChangeEvent<typeof GradeFilter>) => {
    const {
      target: { value },
    } = event;

    if (value.includes("None")) { setGradeFilter([]) } else {
      setGradeFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
    setPage(0);
  };
  //  Filter icon
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  const [icon4, setIcon4] = React.useState<any>([]);
  const [icon5, setIcon5] = React.useState<any>([]);
  const [icon6, setIcon6] = React.useState<any>([]);
  const [icon7, setIcon7] = React.useState<any>([]);
  const [icon8, setIcon8] = React.useState<any>([]);
  const [icon9, setIcon9] = React.useState<any>([]);
  const [icon10, setIcon10] = React.useState<any>([]);
  const [icon11, setIcon11] = React.useState<any>([]);
  const [icon12, setIcon12] = React.useState<any>([]);
  const [icon13, setIcon13] = React.useState<any>([]);
  const [icon14, setIcon14] = React.useState<any>([]);
  const [icon15, setIcon15] = React.useState<any>([]);
  const [icon16, setIcon16] = React.useState<any>([]);
  const [icon17, setIcon17] = React.useState<any>([]);
  const [icon18, setIcon18] = React.useState<any>([]);

  useEffect(() => {
    if (empEmployeeCode === "None" || empEmployeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [empEmployeeCode])
  useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [empFullName])


  useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positionsFilter])
  useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empgrades])
  React.useEffect(() => {
    if (GradesFilter?.length == 0 ) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])
  React.useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon4(false);
    } else {
      setIcon4(true);
    }
  }, [empFullName])
  React.useEffect(() => {
    if (empFirstName === "None" || empFirstName === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }
  }, [empFirstName])
  React.useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon6(false);
    } else {
      setIcon6(true);
    }
  }, [sectionsFilter])
  React.useEffect(() => {
    if (empPositionCode === "None" || empPositionCode === "") {
      setIcon7(false);
    } else {
      setIcon7(true);
    }
  }, [empPositionCode])
  React.useEffect(() => {
    if (empService === "None" || empService === "") {
      setIcon8(false);
    } else {
      setIcon8(true);
    }
  }, [empService])
  React.useEffect(() => {
    if (sNS === "None" || sNS === "") {
      setIcon9(false);
    } else {
      setIcon9(true);
    }
  }, [sNS])
  React.useEffect(() => {
    if (empSubSection === "None" || empSubSection === "") {
      setIcon10(false);
    } else {
      setIcon10(true);
    }
  }, [empSubSection])
  React.useEffect(() => {
    if (empGradeset === "None" || empGradeset === "") {
      setIcon11(false);
    } else {
      setIcon11(true);
    }
  }, [empGradeset])
  React.useEffect(() => {
    if (empManagerCode === "None" || empManagerCode === "") {
      setIcon12(false);
    } else {
      setIcon12(true);
    }
  }, [empManagerCode])
  React.useEffect(() => {
    if (empManagerName === "None" || empManagerName === "") {
      setIcon13(false);
    } else {
      setIcon13(true);
    }
  }, [empManagerName])
  React.useEffect(() => {
    if (empjobtitle === "None" || empjobtitle === "") {
      setIcon14(false);
    } else {
      setIcon14(true);
    }
  }, [empjobtitle])
  React.useEffect(() => {
    if (empJobcode === "None" || empJobcode === "") {
      setIcon15(false);
    } else {
      setIcon15(true);
    }
  }, [empJobcode])
  React.useEffect(() => {
    if (empjoblevel === "None" || empjoblevel === "") {
      setIcon16(false);
    } else {
      setIcon16(true);
    }
  }, [empjoblevel])
  React.useEffect(() => {
    if (empWorkLocation === "None" || empWorkLocation === "") {
      setIcon17(false);
    } else {
      setIcon17(true);
    }
  }, [empWorkLocation])
  React.useEffect(() => {
    if (empManagerPosition === "None" || empManagerPosition === "") {
      setIcon18(false);
    } else {
      setIcon18(true);
    }
  }, [empManagerPosition])


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
  };
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
  //drawer functions
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };
  const [columnHeaders, setcolumnHeaders] = useState<any>({
    Ecode: true,
    Ename: true,
    Eposition: true,
    Firstname:true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    employeerating : true,
    appraiserRating: true,
    reviewerRating:true,
    normalizerRating:true,
    PreviousRating: true,
    PotentialLevel: true,
    TalentCategory: true,
    WorkLocation: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    Rating: true,
    PAStatus: true,
    pendingAction: true,
    appraiserCode:true,
    reviewerCode:true,
    normalizerCode:true,
    status:true,
    email:true,
    rejectionStatus:true,
    ServiceReferenceDate:true,
    Function:true,
    SupervisoryRole:true,
    EmailID:true,
    CalendarName:true,
    SelectAll: true,
  })
  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setheadingSortAccept(false);
    setcolumnHeaders({
      Ecode: true,
    Ename: true,
    Eposition: true,
    Firstname:true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    employeerating : true,
    appraiserRating: true,
    reviewerRating:true,
    normalizerRating:true,
    PreviousRating: true,
    PotentialLevel: true,
    TalentCategory: true,
    WorkLocation: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    Rating: true,
    PAStatus: true,
    pendingAction: true,
    appraiserCode:true,
    reviewerCode:true,
    normalizerCode:true,
    status:true,
    email:true,
    rejectionStatus:true,
    ServiceReferenceDate:true,
    Function:true,
    SupervisoryRole:true,
    EmailID:true,
    SelectAll: true,
    })
  };
  const handleOpenGrade = () => {
    setOpenGrade(true);
  };
  const [headingSortAccept, setheadingSortAccept] = React.useState(false);
  // console.log(heading1,headingSortAccept, "h1");
  const sNSvalues = [, "N-SP", "S"];

  const [heading1Dis, setheading1Dis] = React.useState(true);
  const [heading2Dis, setheading2Dis] = React.useState(true);
  const [heading3Dis, setheading3Dis] = React.useState(true);
  const [heading1, setheading1] = React.useState(true);
  
   const [appCodes, setappCodes] = React.useState(true);
  const [revCodes, setrevCodes] = React.useState(true);
  const [norCodes, setnorCodes] = React.useState(true);
  const [statusValue, setstatusValue] = React.useState(true);
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatusValue(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleAppCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setappCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setrevCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnorCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleCodes = (event: React.ChangeEvent<HTMLInputElement>) => {   
  
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
    Ecode: true,
    Ename: true,
    Eposition: true,
    EGrade: true,
    Ependingaction: true,
    Apprating: true,
    Revrating: true,
    Normrating: true,
    Status: true,
    ViewPA: true,
    FirstName: true,
    SupervisoryRole: true,
    Function: true,
    ServiceReferenceDate: true,
    PositionCode: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    WorkLocation: true,
    GradeSet: true,
    JobCode: true,
    JobTitle: true,
    JobLevel: true,
    TalentCategory: true,
    overallRating: true,
    SelectAll: true,
  })
  const handleExport = () => {
    const mapped = users &&
      users?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
          // ?.toLocaleLowerCase()
          // .includes(employeeName?.toLocaleLowerCase());
        }
      })
        ?.filter((j: any) => {
          if (empEmployeeCode === "None" || empEmployeeCode === "") {
            return j;
          } else {
            return j?.employee_code
              ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
            // .includes(employeeCode.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (positions === "None" || positions === "") {
            return j;
          } else {
            return j?.position_long_description
              ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
            // ?.includes(positions?.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (empgrades === "None" || empgrades === "") {
            return j;
          } else {
            return j?.grade
              ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
            // ?.includes(empgrades?.toLocaleLowerCase());
          }
        })
        ?.filter((j: any) => {
          if (empdivisions === "None" || empdivisions === "") {
            return j;
          } else {
            return j.division
              // .toLocaleLowerCase()
              ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
          }
        })?.filter((j: any) => {
          if (empFirstName === "None" || empFirstName === "") {
            return j;
          } else {
            return j?.first_name
              ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
            // ?.includes(empFirstName?.toLocaleLowerCase());
          }
        })?.filter((j: any) => {
          if (
            empPositionCode === "None" ||
            empPositionCode === ""
          ) {
            return j;
          } else {
            return j?.position_code
              ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
            // ?.includes(empPositionCode?.toLocaleLowerCase());
          }
        })?.filter((j: any) => {
          if (empService === "None" || empService === "") {
            return j;
          } else {
            return j.service_reference_date
              ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
            // .includes(empService.toLocaleLowerCase());
          }
        })?.filter((j: any) => {
          console.log(j.isSupervisor, "superv");
          if (sNS === "None" || sNS === "") {
            return j;
          }
          if (sNS === "S") {
            return j.isSupervisor === true;
          } else if (sNS === "NS") {
            return j.isSupervisor === undefined;
          }
        })
        .filter((j: any) => {
          if (empSubSection === "None" || empSubSection === "") {
            return j;
          } else {
            return j["sub section"]
              ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
            // .includes(empSubSection.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empGradeset === "None" || empGradeset === "") {
            return j;
          } else {
            return j?.grade_set
              ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
            // ?.includes(empGradeset?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empManagerCode === "None" || empManagerCode === "") {
            return j;
          } else {
            return j?.manager_code
              ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
            // ?.includes(empManagerCode?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (
            empManagerPosition === "None" ||
            empManagerPosition === ""
          ) {
            return j;
          } else {
            return j?.manager_position
              ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
            // ?.includes(empManagerPosition?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empManagerName === "None" || empManagerName === "") {
            return j;
          } else {
            return j?.manager_name
              ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
            // ?.includes(empManagerName?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empjobtitle === "None" || empjobtitle === "") {
            return j;
          } else {
            return j?.job_title
              ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
            // ?.includes(empjobtitle?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empJobcode === "None" || empJobcode === "") {
            return j;
          } else {
            return j?.job_code
              ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
            // ?.includes(empJobcode?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empjoblevel === "None" || empjoblevel === "") {
            return j;
          } else {
            return j?.job_level
              ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
            // ?.includes(empjoblevel?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (
            empWorkLocation === "None" ||
            empWorkLocation === ""
          ) {
            return j;
          } else {
            return j?.work_location
              ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
            // ?.includes(empWorkLocation?.toLocaleLowerCase());
          }
        })
        .filter((j: any) => {
          if (empsections === "None" || empsections === "") {
            return j;
          } else {
            return j?.section
              ?.toLocaleLowerCase() === empsections?.toLocaleLowerCase();
            // .includes(empsections.toLocaleLowerCase());
          }
        })
        .filter((item1: any) => {
          // console.log(item1,"item1")
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
        .filter((item1: any) => {
          if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
            return item1;
          } else {
            return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
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
            (j?.grade !== undefined &&
              j?.grade
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.position_long_description !== undefined &&
              j?.position_long_description
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.first_name !== undefined &&
              j?.first_name
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.service_reference_date !== undefined &&
              j?.service_reference_date
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.position_code !== undefined &&
              j?.position_code
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.division !== undefined &&
              j?.division
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.section !== undefined &&
              j?.section
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.ManagerCode !== undefined &&
              j?.ManagerCode
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.ManagerName !== undefined &&
              j?.ManagerName
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.ManagerPosition !== undefined &&
              j?.ManagerPosition
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.WorkLocation !== undefined &&
              j?.WorkLocation
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.grade_set !== undefined &&
              j?.grade_set
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.job_code !== undefined &&
              j?.job_code
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.job_title !== undefined &&
              j?.job_title
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
            (j?.job_level !== undefined &&
              j?.job_level
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                ))
          ) {
            return j;
          }
        })
        ?.map((j: any, emp: any, employee: any) => {
          let inputDate = j?.service_reference_date
          const dateParts = inputDate?.split("-");
          console.log(inputDate,dateParts,"inputDate")
          let date = new Date(inputDate);
          const year = date?.getFullYear();
          const month = date?.toLocaleString("default", { month: "short" });
          const day = date?.getDate();
          //const day = dateParts[2]?.slice(0, 2)
          const formattedDate = `${day}-${month}-${year}`;
          let exportData: any = {}
          if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = CalendarName
          if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = formattedDate
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = j?.isSupervisor != true ? "N-SP" : "SP"
        if (columnHeaders["EmailID"] == true) exportData["Email Id"] = j?.email
        if (columnHeaders["EDivision"] == true) exportData["Division"] = j?.division
        if (columnHeaders["ESection"] == true) exportData["Section"] = j?.section       
        if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = j.sub_section   
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["appraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["reviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["normalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name      
        if (columnHeaders["employeerating"] === true) {const employeeRating = parseFloat(j?.employee_rating);
          exportData["Employee Rating"] = isNaN(employeeRating) ? '' : employeeRating.toFixed(2);
        }
        if (columnHeaders["appraiserRating"] === true) {const appraiserRating = parseFloat(j?.appraiser_rating);
          exportData["Appraiser Rating"] = isNaN(appraiserRating) ? '' : appraiserRating.toFixed(2);
        }
        if (columnHeaders["reviewerRating"] === true) {const reviewerRating = parseFloat(j?.reviewer_rating);
          exportData["Reviewer Rating"] = isNaN(reviewerRating) ? '' : reviewerRating.toFixed(2);
        }
        if (columnHeaders["normalizerRating"] === true) {const normalizerRating = parseFloat(j?.normalizer_rating);
          exportData["HR Normalizer Rating"] = isNaN(normalizerRating) ? '' : normalizerRating.toFixed(2);
        }
        if (columnHeaders["OverallRating"] === true) {const OverallRating = parseFloat(j?.overall_rating);
          exportData["Overall Rating"] = isNaN(OverallRating) ? '' : OverallRating.toFixed(2);
        }
        if (columnHeaders["PreviousRating"] === true) {const PreviousRating = parseFloat(j?.previous_rating);
          exportData["Previous Period Rating"] = isNaN(PreviousRating) ? '' : PreviousRating.toFixed(2);
        }
        // if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = j?.employee_rating?.toFixed(2)
        // if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = j?.appraiser_rating?.toFixed(2)
        // if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = j?.reviewer_rating?.toFixed(2)
        // if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = j?.normalizer_rating?.toFixed(2)
        // if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = j?.overall_rating?.toFixed(2)
        // if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating?.toFixed(2)
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = j?.appraisal?.potential
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.talent_category
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
                  if (columnHeaders["status"] == true) exportData["Status"] = getStatus(j?.appraisal?.status)
        return exportData
        });
        const a = [1]
        const Emptymapped = a.map((j: any) => {
          let exportData: any = {}
          if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = ""
          if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = ""
        if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
        if (columnHeaders["Function"] == true) exportData["Function"] = ""
        if (columnHeaders["SupervisoryRolee"] == true) exportData["Supervisory Role"] = ""
        if (columnHeaders["EmailId"] == true) exportData["Email Id"] = ""
        if (columnHeaders["division"] == true) exportData["Division"] = ""
        if (columnHeaders["Section"] == true) exportData["Section"] = ""       
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""  
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = ""
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
        if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = ""
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = ""
        if (columnHeaders["Normalizername"] == true) exportData["HR Normalizer Name"] = ""      
        if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = ""
        if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = ""
        if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = ""
        if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = ""
        if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = ""
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = ""
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = ""
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        if (columnHeaders["status"] == true) exportData["Status"] = ""
        return exportData
        })
    console.log(mapped[0], "mapped")
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped?.length === 0 ? Emptymapped :mapped);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  }
  console.log(columnHeaders, columnHeadersDisplay, "h1");
  const handleheadingSortAccept = () => {
    // setheadingSortAccept(true);
    // setheading1Dis(heading1)
    // let columnHeadersTemp = columnHeaders
    // setcolumnHeadersDisplay(columnHeadersTemp);
    // setisDrawerOpen(false);
    // setheadingSortAccept(true);
    // setheading1Dis(heading1)
    // let temp = { ...columnHeaders }
    // setcolumnHeadersDisplay(temp);
    setisDrawerOpen(false);
    handleExport();
    setcolumnHeaders({
      Ecode: true,
    Ename: true,
    Eposition: true,
    Firstname:true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    employeerating : true,
    appraiserRating: true,
    reviewerRating:true,
    normalizerRating:true,
    PreviousRating: true,
    PotentialLevel: true,
    TalentCategory: true,
    WorkLocation: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    Rating: true,
    PAStatus: true,
    pendingAction: true,
    appraiserCode:true,
    reviewerCode:true,
    normalizerCode:true,
    status:true,
    email:true,
    rejectionStatus:true,
    ServiceReferenceDate:true,
    Function:true,
    SupervisoryRole:true,
    EmailID:true,
    CalendarName:true,
    SelectAll: true,
    })
    
  };
 
  const [employeerating, setemployeerating] = React.useState(true);
  const [headingOfOverallRating, setheadingOfOverallRating] = React.useState(true);
  const [headingOfAppraiserName, setheadingOfAppraiserName] = React.useState(true);
  const [headingOfReviewerName, setheadingOfReviewerName] = React.useState(true);
  const [headingOfNormalizerName, setheadingOfNormalizerName] = React.useState(true);
  const [headingOfDivision, setheadingOfDivision] = React.useState(true);
  const [headingOfSection, setheadingOfSection] = React.useState(true);
  const [headingOfTalentCategory, setheadingOfTalentCategory] = React.useState(true);
  const [headingOfWorkLocation, setheadingOfWorkLocation] = React.useState(true);
  const [headingOfSubSection, setheadingOfSubSection] = React.useState(true);
  const [firstName, setfirstName] = React.useState(true);
  const [headingOfManagerPosition, setheadingOfManagerPosition] = React.useState(true);
  const [ServiceReferenceDateData, setServiceReferenceDateData] = React.useState(true);
  const [FunctionData, setFunctionData] = React.useState(true);
  const [SupervisoryRoleData, setSupervisoryRoleData] = React.useState(true);
  const [EmailIDData, setEmailIDData] = React.useState(true);
  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

    setheading1(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const [headingcalendar, setheadingcalendar] = React.useState(true);
  const handleheadingCalendar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingcalendar(event.target.checked);
    const { name, checked } = event.target;
      setcolumnHeaders((prevColumnHeaders:any) => ({
        ...prevColumnHeaders,
        [name]: checked,
      }));
  }
  const [headingOfEcode, setheadingOfEcode] = React.useState(true);
  const handleEmployeeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfEcode(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //this state is used to re-render checkbox. Pls don't removes
    setheading1(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleemployeerating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemployeerating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  // setemployeerating
  const handleAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
   
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfOverallRating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const [firstname, setfirstname] = React.useState(true);
  const handlefirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstname(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading2, setheading2] = React.useState(true);
  // console.log(heading2, "h2");
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading3, setheading3] = React.useState(true);
  // console.log(heading3, "h3");
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingSN, setheadingSN] = React.useState(true);
  // console.log(headingSN, "h1");
  const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingSN(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingAppraiser, setheadingAppraiser] = React.useState(true);
  const handleheadingAppraiser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingAppraiser(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingReviewer, setheadingReviewer] = React.useState(true);
  const handleheadingReviewer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingReviewer(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingNormalizer, setheadingNormalizer] = React.useState(true);
  const handleheadingNormalizer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingNormalizer(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingPotential, setheadingPotential] = React.useState(true);
  const handleheadingPotential = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPotential(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingPrevious, setheadingPrevious] = React.useState(true);
  const handleheadingPrevious = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPrevious(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading4, setheading4] = React.useState(true);
  // console.log(heading4, "h4");
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading5, setheading5] = React.useState(true);
  // console.log(heading5, "h5");
  const handleheading5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading5(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading6, setheading6] = React.useState(true);
  // console.log(heading6, "h6");
  const handleheading6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading6(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleSupervisoryRoleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisoryRoleData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  
const handleEmailIDData = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEmailIDData(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
};
const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfSection(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfDivision(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfWorkLocation(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfSubSection(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleSelectAll = (selectAll:any) => {
  const updatedColumnHeaders = { ...columnHeaders };
  // Set all checkbox values to the selectAll value (true or false)
  Object.keys(updatedColumnHeaders).forEach((key) => {
    updatedColumnHeaders[key] = selectAll;
  });
  setcolumnHeaders(updatedColumnHeaders);
};
const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfAppraiserName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfReviewerName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfNormalizerName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfTalentCategory(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfManagerPosition(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
  const [heading7, setheading7] = React.useState(true);
  // console.log(heading7, "h7");
  const handleheading7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading7(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleFunctionData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading8, setheading8] = React.useState(true);

  const handleheading8 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading8(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading9, setheading9] = React.useState(true);

  const handleheading9 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading9(event.target.checked);
  };
  const [heading10, setheading10] = React.useState(true);
  const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading10(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading11, setheading11] = React.useState(true);
  const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading11(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDateData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading12, setheading12] = React.useState(true);
  const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading12(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading13, setheading13] = React.useState(true);
  const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading13(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading14, setheading14] = React.useState(true);
  const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading14(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingOfPotentialLevel, setheadingOfPotentialLevel] = React.useState(true);
  const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPotentialLevel(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const [headingOfPreviousRating, setheadingOfPreviousRating] = React.useState(true);
  const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPreviousRating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const [overall, setoverAll] = React.useState(true);
  const handleoverAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setoverAll(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [talentcategory, setTalentcategory] = React.useState(true);
  const handletalentcategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTalentcategory(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [AppraiserCode, setAppraiserCode] = React.useState(true);
  const handleAppraiserCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [ReviewerCode, setReviewerCode] = React.useState(true);
  const handleReviewerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [NormalizerCode, setNormalizerCode] = React.useState(true);
  const handleNormalizerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizerCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [emailId, setEmailId] = React.useState(true);
  const handleEmailId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [managerCode, setManagerCode] = React.useState(true);
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManagerCode(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [managerName, setManagerName] = React.useState(true);
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManagerName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [ProbationStatus, setProbationStatus] = React.useState(true);
  const handleProbationStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProbationStatus(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [ServiceReferenceDate, setServiceReferenceDate] = React.useState(true);
  const handleServiceReferenceDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDate(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [Function, setFunction] = React.useState(true);
  const handleFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunction(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [sRole, setsRole] = React.useState(true);
  const handleSupervisoryRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsRole(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading15, setheading15] = React.useState(true);
  const handleheading15 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading15(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading16, setheading16] = React.useState(true);
  const handleheading16 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading16(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading17, setheading17] = React.useState(true);
  const handleheading17 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading17(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading18, setheading18] = React.useState(true);
  const handleheading18 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading18(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading19, setheading19] = React.useState(true);
  const handleheading19 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading19(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [funcVal, setfuncVal] = React.useState(true);
  const handlefuncVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfuncVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [firstNameVal, setfirstNameVal] = React.useState(true);
  const handlefirstNameVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstNameVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [SupRoleVal, setSupRoleVal] = React.useState(true);
  const handleSupRoleVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupRoleVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [ServiceRefVal, setServiceRefVal] = React.useState(true);
  const handleServiceRefVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceRefVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [positionCodeVal, setpositionCodeVal] = React.useState(true);
  const handlepositionCodeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpositionCodeVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [divisionVal, setdivisionVal] = React.useState(true);
  const handledivisionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdivisionVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [sectionVal, setsectionVal] = React.useState(true);
  const handlesectionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsectionVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  }
  //console.log(heading1,headingSortAccept,heading1Dis, "h,hsa,hd");
  const [filData, setfilData] = React.useState<any>([]);

  
  // const handleSearchBar = (e:any) =>{
  //   setenteredName(e.target.value);
  //   setPage(0);
  // }
   const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setenteredName(e.target.value);
      setPage(0);
    }
  useEffect(() => {
    
    const Paginate =users?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.legal_full_name
          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
        // ?.toLocaleLowerCase()
        // .includes(employeeName?.toLocaleLowerCase());
      }
    })
      ?.filter((j: any) => {
        if (empEmployeeCode === "None" || empEmployeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
          // .includes(employeeCode.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j?.position_long_description
            ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
          // ?.includes(positions?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.grade
            ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
          // ?.includes(empgrades?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return j.division
            // .toLocaleLowerCase()
            ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
        }
      })?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
          // ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (
          empPositionCode === "None" ||
          empPositionCode === ""
        ) {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
          // ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
          // .includes(empService.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "S") {
          return j.isSupervisor === true;
        } else if (sNS === "NS") {
          return j.isSupervisor === undefined;
        }
      })
      .filter((j: any) => {
        if (empSubSection === "None" || empSubSection === "") {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
          // .includes(empSubSection.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return j?.grade_set
            ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
          // ?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return j?.manager_code
            ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
          // ?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (
          empManagerPosition === "None" ||
          empManagerPosition === ""
        ) {
          return j;
        } else {
          return j?.manager_position
            ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
          // ?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return j?.manager_name
            ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
          // ?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return j?.job_title
            ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
          // ?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return j?.job_code
            ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
          // ?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return j?.job_level
            ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
          // ?.includes(empjoblevel?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (
          empWorkLocation === "None" ||
          empWorkLocation === ""
        ) {
          return j;
        } else {
          return j?.work_location
            ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
          // ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
          // .includes(empsections.toLocaleLowerCase());
        }
      })
      .filter((item1: any) => {
        // console.log(item1,"item1")
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
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
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
          (j?.grade !== undefined &&
            j?.grade
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.position_long_description !== undefined &&
            j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.first_name !== undefined &&
            j?.first_name
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.service_reference_date !== undefined &&
            j?.service_reference_date
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.position_code !== undefined &&
            j?.position_code
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.division !== undefined &&
            j?.division
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.section !== undefined &&
            j?.section
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.ManagerCode !== undefined &&
            j?.ManagerCode
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.ManagerName !== undefined &&
            j?.ManagerName
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.ManagerPosition !== undefined &&
            j?.ManagerPosition
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.WorkLocation !== undefined &&
            j?.WorkLocation
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.grade_set !== undefined &&
            j?.grade_set
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.job_code !== undefined &&
            j?.job_code
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.job_title !== undefined &&
            j?.job_title
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              )) ||
          (j?.job_level !== undefined &&
            j?.job_level
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              ))
        ) {
          return j;
        }
      })
      settablecount(Paginate?.length)
      console.log(Paginate,"Paginate")
  }, [users,GradesFilter,sectionsFilter,enteredName,empsections,positionsFilter]);

const tableDataFilterdLength =  users?.filter((j: any) => {
  if (empFullName === "None" || empFullName === "") {
    return j;
  } else {
    return j?.legal_full_name
      ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
    // ?.toLocaleLowerCase()
    // .includes(employeeName?.toLocaleLowerCase());
  }
})
  ?.filter((j: any) => {
    if (empEmployeeCode === "None" || empEmployeeCode === "") {
      return j;
    } else {
      return j?.employee_code
        ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
      // .includes(employeeCode.toLocaleLowerCase());
    }
  })
  ?.filter((j: any) => {
    if (positions === "None" || positions === "") {
      return j;
    } else {
      return j?.position_long_description
        ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
      // ?.includes(positions?.toLocaleLowerCase());
    }
  })
  ?.filter((j: any) => {
    if (empgrades === "None" || empgrades === "") {
      return j;
    } else {
      return j?.grade
        ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
      // ?.includes(empgrades?.toLocaleLowerCase());
    }
  })
  ?.filter((j: any) => {
    if (empdivisions === "None" || empdivisions === "") {
      return j;
    } else {
      return j.division
        // .toLocaleLowerCase()
        ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
    }
  })?.filter((j: any) => {
    if (empFirstName === "None" || empFirstName === "") {
      return j;
    } else {
      return j?.first_name
        ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
      // ?.includes(empFirstName?.toLocaleLowerCase());
    }
  })?.filter((j: any) => {
    if (
      empPositionCode === "None" ||
      empPositionCode === ""
    ) {
      return j;
    } else {
      return j?.position_code
        ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
      // ?.includes(empPositionCode?.toLocaleLowerCase());
    }
  })?.filter((j: any) => {
    if (empService === "None" || empService === "") {
      return j;
    } else {
      return j.service_reference_date
        ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
      // .includes(empService.toLocaleLowerCase());
    }
  })?.filter((j: any) => {
    console.log(j.isSupervisor, "superv");
    if (sNS === "None" || sNS === "") {
      return j;
    }
    if (sNS === "S") {
      return j.isSupervisor === true;
    } else if (sNS === "NS") {
      return j.isSupervisor === undefined;
    }
  })
  .filter((j: any) => {
    if (empSubSection === "None" || empSubSection === "") {
      return j;
    } else {
      return j["sub section"]
        ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
      // .includes(empSubSection.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empGradeset === "None" || empGradeset === "") {
      return j;
    } else {
      return j?.grade_set
        ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
      // ?.includes(empGradeset?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empManagerCode === "None" || empManagerCode === "") {
      return j;
    } else {
      return j?.manager_code
        ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
      // ?.includes(empManagerCode?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empManagerPosition === "None" ||
      empManagerPosition === ""
    ) {
      return j;
    } else {
      return j?.manager_position
        ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
      // ?.includes(empManagerPosition?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empManagerName === "None" || empManagerName === "") {
      return j;
    } else {
      return j?.manager_name
        ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
      // ?.includes(empManagerName?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empjobtitle === "None" || empjobtitle === "") {
      return j;
    } else {
      return j?.job_title
        ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
      // ?.includes(empjobtitle?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empJobcode === "None" || empJobcode === "") {
      return j;
    } else {
      return j?.job_code
        ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
      // ?.includes(empJobcode?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empjoblevel === "None" || empjoblevel === "") {
      return j;
    } else {
      return j?.job_level
        ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
      // ?.includes(empjoblevel?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empWorkLocation === "None" ||
      empWorkLocation === ""
    ) {
      return j;
    } else {
      return j?.work_location
        ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
      // ?.includes(empWorkLocation?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (empsections === "None" || empsections === "") {
      return j;
    } else {
      return j?.section
        ?.toLocaleLowerCase() === empsections?.toLocaleLowerCase();
      // .includes(empsections.toLocaleLowerCase());
    }
  })
  .filter((item1: any) => {
    // console.log(item1,"item1")
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
  .filter((item1: any) => {
    if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
      return item1;
    } else {
      return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
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
      (j?.grade !== undefined &&
        j?.grade
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.position_long_description !== undefined &&
        j?.position_long_description
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.first_name !== undefined &&
        j?.first_name
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.service_reference_date !== undefined &&
        j?.service_reference_date
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.position_code !== undefined &&
        j?.position_code
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.division !== undefined &&
        j?.division
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.section !== undefined &&
        j?.section
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.ManagerCode !== undefined &&
        j?.ManagerCode
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.ManagerName !== undefined &&
        j?.ManagerName
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.ManagerPosition !== undefined &&
        j?.ManagerPosition
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.WorkLocation !== undefined &&
        j?.WorkLocation
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.grade_set !== undefined &&
        j?.grade_set
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.job_code !== undefined &&
        j?.job_code
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.job_title !== undefined &&
        j?.job_title
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          )) ||
      (j?.job_level !== undefined &&
        j?.job_level
          ?.toLocaleLowerCase()
          ?.includes(
            enteredName?.toLocaleLowerCase()
          ))
    ) {
      return j;
    }
  })

  return (
    <>
<div 
style={{
  background:"#f1f1f1",
  minHeight: "100px",
          overflow: "hidden",
           height: "auto",}}>
            <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="25px"
      >
            <Breadcrumbs aria-label="breadcrumb">
    <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
              cursor:"pointer"
            }}
            color="text.primary"
            onClick={() => {
              navigate(-1)
            }}
            >
            Previous PA
          </Typography>
      <Typography
        style={{
          fontSize: "18px",
          color: "#333333",
          fontFamily: "Arial",
        }}
        color="text.primary"
      >
     My Team
      </Typography>
    </Breadcrumbs>
    </Stack>
      <Box
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          background: "#ffffff",
          padding: "20px",
          minHeight:"75vh",
          //height: "calc(100vh - 20px)",
          // marginTop:"50px",
         // marginBottom:"25px"
          // marginTop: "30px",
        }}
      >
        <div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            paddingBottom="10px"
          >
             
            {/* <Typography
              gutterBottom
              component="div"
              sx={{ fontSize: "20px", fontFamily: "Arial", color: "#333333" }}
            >
              My Team
            </Typography> */}
            <div>
              <Stack direction="row" spacing={2} alignItems="center">
                <Searchfeild>
                  <div>
                    <TextField
                      id="outlined-basic"
                      placeholder="Search Here..."
                      autoComplete="off"
                      inputProps={{ maxLength: 256 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={Searchlensreview} alt="icon" />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleSearchBar}
                      // onChange={(e) => setenteredName(e.target.value)}
                    />

                    {/* <img
                      src={Updown}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                    /> */}

                    <img
                      src={Newexcel}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
                      onClick={handleExportFunction}
                    />
                  </div>
                </Searchfeild>
                {/* <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    borderRadius: "25px",
                  }}
                  variant="outlined"
                  onClick={() => {
                    setisDrawerOpen(true);
                  }}
                >
                  Choose Fields
                </Button> */}
              </Stack>
            </div>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => {
                setisDrawerOpen(false);
              }}
            >
              <Box sx={{ paddingLeft: "10px" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#333333",
                    fontFamily: "Arial",
                    marginLeft :"-10px"
                  }}
                  variant="subtitle1"
                  // align="center"
                >
                   <Checkbox
                      checked={columnHeaders.SelectAll}
                        onChange={(event) => handleSelectAll(event.target.checked)}
                      />
                  Choose Fields
                </Typography>
                <Stack direction="column" width="250px">
                  <Scroll>
                    <CustomScrollbar
                      style={{
                        height: "calc(100vh - 100px)",
                        // "& .ScrollbarsCustom-Track": {
                        //     width:"5px"
                        //   },
                      }}>
                      <div>
                      <FormGroup>
                      <FormControlLabel
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              },
                            }}
                            control={
                              <Checkbox
                                checked={columnHeaders.CalendarName}
                                name="CalendarName"
                                onChange={handleheadingCalendar} />
                            }
                            label="Calendar Name"
                          />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.Ecode}
                              name="Ecode"
                              onChange={handleEmployeeCode} />
                          }
                          label="Ecode"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.Ename}
                              name="Ename"
                              onChange={handleheading1} />
                          }
                          label="Employee Name"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.Firstname}
                              name="Firstname"
                              onChange={handlefirstName} />
                          }
                          label="Known As"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ServiceReferenceDate}
                              name="ServiceReferenceDate"
                              onChange={handleServiceReferenceDateData} />
                          }
                          label="Service Reference Date"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.Eposition}
                              name="Eposition"
                              onChange={handleheading2} />
                          }
                          label="Position"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.EGrade}
                              name="EGrade"
                              onChange={handleheading3}
                            />
                          }
                          label="Grade"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.Function}
                              name="Function"
                              onChange={handleFunctionData} />
                          }
                          label="Function"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.SupervisoryRole}
                              name="SupervisoryRole"
                              onChange={handleSupervisoryRoleData} />
                          }
                          label="Supervisory Role"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.EmailID}
                              name="EmailID"
                              onChange={handleEmailIDData} />
                          }
                          label="Email ID"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.EDivision}
                              name="EDivision"
                              onChange={handleDivision} />
                          }
                          label="Division"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ESection}
                              name="ESection"
                              onChange={handleSection} />
                          }
                          label="Section"
                        />
                       

                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ESubSection}
                              name="ESubSection"
                              onChange={handleSubSection} />
                          }
                          label="Sub-section"
                        />
 <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.WorkLocation}
                              name="WorkLocation"
                              onChange={handleWorkLocation} />
                          }
                          label="Work Location"
                        />                     
                           <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.appraiserCode}
                            name="appraiserCode"
                              onChange={handleAppCodes} />
                          }
                          label="Appraiser Code"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.AppraiserName}
                              name="AppraiserName"
                              onChange={handleAppraiserName} />
                          }
                          label="Appraiser Name"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.reviewerCode}
                              name="reviewerCode"
                              onChange={handleRevCodes}  />
                          }
                          label="Reviewer Code"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ReviewerName}
                              name="ReviewerName"
                              onChange={handleReviewerName} />
                          }
                          label="Reviewer Name"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.normalizerCode}
                             name="normalizerCode"
                              onChange={handleNorCodes}  />
                          }
                          label="HR Normalizer Code"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.NormalizerName}
                              name="NormalizerName"
                              onChange={handleNormalizerName} />
                          }
                          label="HR Normalizer Name"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.employeerating}
                              name="employeerating"
                              onChange={handleemployeerating} />
                          }
                          label="Employee Rating "
                        />
                        {/* handleemployeerating */}
                     
                           <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.appraiserRating}
                              name="appraiserRating"
                              onChange={handleAppraiserRating} />
                          }
                          label="Appraiser Rating"
                        />
                        
                           <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.reviewerRating}
                              name="reviewerRating"
                              onChange={handleReviewerRating} />
                          }
                          label="Reviewer Rating"
                        />
                          
                           <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.normalizerRating}
                              name="normalizerRating"
                              onChange={handleNormalizerRating} />
                          }
                          label="HR Normalizer Rating"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.OverallRating}
                              name="OverallRating"
                              onChange={handleOverallRating} />
                          }
                          label="Overall Rating"
                        />
                          {/* <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.normalizerRating}
                              name="pendingAction"
                              onChange={handlependingAction} />
                          }
                          label="Pending Action"
                        /> */}
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.PreviousRating}
                              name="PreviousRating"
                              onChange={handlePreviousRating} />
                          }
                          label="Previous Period Rating"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.PotentialLevel}
                              name="PotentialLevel"
                              onChange={handlePotentialLevel} />
                          }
                          label="Potential Level"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.TalentCategory}
                              name="TalentCategory"
                              onChange={handleTalentCategory} />
                          }
                          label="Talent Category"
                        />
                       
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ManagerCode}
                              name="ManagerCode"
                              onChange={handleManagerCode} />
                          }
                          label="Manager Code"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ManagerName}
                              name="ManagerName"
                              onChange={handleManagerName} />
                          }
                          label="Manager Name"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.ManagerPosition}
                              name="ManagerPosition"
                              onChange={handleManagerPosition} />
                          }
                          label="Manager Position"
                        />
                         <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.status}
                              name="status"
                              onChange={handleStatus} />
                          }
                          label="Status"
                        />
                         {/* <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox
                              checked={columnHeaders.rejectionStatus}
                              name="rejectionStatus"
                              onChange={handleRejectionStatus} />
                          }
                          label="Rejection Status"
                        /> */}
                      </FormGroup>
                      </div>
                    </CustomScrollbar>
                  </Scroll>
                  <Stack
                    direction="row"
                    spacing={2}
                    paddingBottom="10px"
                    paddingTop="20px"
                    justifyContent="center"
                  >
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                        width: "70px",
                        height: "35px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        handleheadingSortAccept();
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                        width: "70px",
                        height: "35px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        handleCloseGrade();
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Drawer>
          </Stack>
          <TableHeadings>
            <TableContainer>
              <Scroll>
                {/* <Scrollbar style={{ width: "100%", height: "calc(100vh - 292px)" }}> */}
                <Table size="small" aria-label="simple table">
                  <TableHead
                    style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                  >
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      {columnHeadersDisplay?.Ecode && <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          maxWidth: "60px"
                        }}
                      >
                        Ecode
                      
                      </TableCell>}
                      {columnHeadersDisplay?.Ename && <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Employee Name
                     
                      </TableCell>}
                      {columnHeadersDisplay?.Eposition && <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                          <div
                            aria-controls={openservicePosition ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openservicePosition ? "true" : undefined}
                            onClick={handleClickservicePosition}
                          >
                            <Stack direction="row" alignItems="center">
                              Position
                              <ArrowDropDownOutlinedIcon />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",

                            }}
                            sx={{
                              height: "200px",
                              // width: "300px"
                            }}
                            anchorEl={anchorElnewservicePosition}
                            open={openservicePosition}
                            onClose={handleCloseservicePosition}

                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                justifyContent: "left",
                                padding: "0px 10px 2px 17px",
                                // width: "100px",
                                // paddingLeft: "5px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetservicePosition}
                            >Clear Filter
                            </MenuItem>
                            {users
                              ?.slice()
                              ?.sort(function (a: any, b: any) { return a?.position_long_description?.localeCompare(b?.position_long_description); })
                              ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.position_long_description })?.indexOf(item?.position_long_description) === index)
                              ?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    justifyContent: "left",
                                    // width: "160px",
                                    padding: "0px 10px 2px 17px",
                                    //  paddingLeft: "5px",
                                    //height:"200px"
                                  }}
                                  key={name?.position_long_description}
                                  value={name?.position_long_description}
                                  onClick={handleTargetservicePosition}
                                >
                                  {name?.position_long_description}
                                </MenuItem>
                              )
                              )}

                          </Menu>
                          {icon2 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                            <Stack direction="row">
                              <span>Position</span>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color:"#3e8cb5 !important"
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
                                    //paddingLeft: "37px",
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
                                    style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
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
                                        paddingRight:"10px"
                                      },
                                    }}
                                    classes={{ primary: classes.selectAllText }}
                                    primary="Select All"
                                  />
                                </MenuItem>
                                {/* gradesArray */}
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
                                      style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                                        size="small"
                                        checked={positionsFilter.indexOf(option) > -1}
                                      />
                                    </ListItemIcon>

                                    <ListItemText sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "13px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        paddingRight:"10px"
                                      },
                                    }} primary={option} />
                                  </MenuItem>

                                ))}
                              </Select>
                              {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                   
                      </TableCell>}
                      {columnHeadersDisplay?.EGrade &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                            maxWidth: "60px"
                          }}
                        >
                         
                         <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Grade</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem",
                                  "& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    },
                                }}
                                  disableUnderline
                                  // value={positions}
                                  // onChange={handleChangeposition}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={GradesFilter}
                                  onChange={handleChangeSelectGrades}
                                  //input={<OutlinedInput label="Position" />}
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
                                      style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
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
                                        paddingRight:"10px"
                                      },
                                    }}
                                    classes={{ primary: classes.selectAllText }}
                                    primary="Select All"
                                  />
                                  </MenuItem>
                                    {/* gradesArray */}
                                  {/* {users
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a?.grade?.localeCompare(b.grade); })
                                    ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.grade }).indexOf(item?.grade) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: "#333333"
                                        }}
                                        // style={{ fontSize: "12px" }}
                                        key={name?.grade}
                                        value={name?.grade}
                                      >
                                        <Checkbox
                                          style={{ padding: "3px", paddingLeft: "12px" }}

                                          size="small"
                                          checked={GradeFilter?.indexOf(name?.grade) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px", fontFamily: "Arial", color: "#333333" }}
                                          primary={name?.grade} />
                                      </MenuItem>
                                    )
                                    )} */}
                                   {gradesArray
                                    // ?.slice()
                                    // ?.sort(function (a: any, b: any) { return a?.grade?.localeCompare(b.grade); })
                                    // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.grade }).indexOf(item?.grade) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: "#333333"
                                        }}
                                        // style={{ fontSize: "12px" }}
                                        key={name}
                                        value={name}
                                      >
                                        <ListItemIcon>
                                        <Checkbox
                                          sx={{

                                            "& .MuiSvgIcon-root": {
                                              fontSize: "14px !important",
                                            },
                                          }}
                                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}

                                          size="small"
                                          checked={GradesFilter?.indexOf(name) > -1} />
                                          </ListItemIcon>
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "13px", fontFamily: "Arial", color: "#333333",paddingRight:"10px" }}
                                          primary={name} />
                                      </MenuItem>
                                    )
                                    )} 
                                </Select>
                                {icon3 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                        </TableCell>}
 {columnHeadersDisplay?.Section && <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                            <Stack direction="row">
                              <span>Section</span>
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
                                value={sectionsFilter}
                                onChange={handleChangeSelectsections}
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
                                    root: isAllsectionFilter ? classes.selectedAll : "",
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
                                      classes={{
                                        indeterminate: classes.indeterminateColor,
                                      }}
                                      checked={isAllsectionFilter}
                                      indeterminate={
                                        sectionsFilter?.length > 0 &&
                                        sectionsFilter?.length < sectionArray?.length
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
                                {/* gradesArray */}
                                {sectionArray?.map((option: any) => (


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
                                        checked={sectionsFilter.indexOf(option) > -1}
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
                              {icon6 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        {/* <Stack direction="row" alignItems="center" justifyContent="center">
                          <div
                            aria-controls={openSection ? "fade-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={openSection ? "true" : undefined}
                            onClick={handleClickSection}
                          >
                            <Stack direction="row" alignItems="center">
                              Section
                              <ArrowDropDownOutlinedIcon  style={{ cursor: "pointer" }}/>
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",

                            }}
                            sx={{
                              height: "200px",
                              // width: "200px"
                            }}
                            anchorEl={anchorElnewSection}
                            open={openSection}
                            onClose={handleCloseSection}

                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              
                              key="None"
                              value="None"
                              onClick={handleTargetSection}
                            >Clear Filter
                            </MenuItem>

                            {sectionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetSection}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Menu>
                          {icon6 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      
                      </TableCell>}
                      {columnHeadersDisplay?.Apprating &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                         PA Status
                        </TableCell>}
                      {columnHeadersDisplay?.Apprating &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Overall Rating
                        </TableCell>}
                    </TableRow>
                  </TableHead>
                  {tableDataFilterdLength?.length > 0 ? (
                  <TableBody
                    ref={listInnerRef}
                    onScroll={onScroll}
                  >
                    {users
                    ?.sort(
                        (a: any, b: any) =>
                          b?.overall_rating - a?.overall_rating // Sort by pa_rating in descending order
                      )
                    ?.filter((j: any) => {
                      if (empFullName === "None" || empFullName === "") {
                        return j;
                      } else {
                        return j?.legal_full_name
                          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
                      }
                    })
                      ?.filter((j: any) => {
                        if (empEmployeeCode === "None" || empEmployeeCode === "") {
                          return j;
                        } else {
                          return j?.employee_code
                            ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
                          // .includes(employeeCode.toLocaleLowerCase());
                        }
                      })
                      ?.filter((j: any) => {
                        if (positions === "None" || positions === "") {
                          return j;
                        } else {
                          return j?.position_long_description
                            ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
                          // ?.includes(positions?.toLocaleLowerCase());
                        }
                      })
                      ?.filter((j: any) => {
                        if (empgrades === "None" || empgrades === "") {
                          return j;
                        } else {
                          return j?.grade
                            ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
                          // ?.includes(empgrades?.toLocaleLowerCase());
                        }
                      })
                      ?.filter((j: any) => {
                        if (empdivisions === "None" || empdivisions === "") {
                          return j;
                        } else {
                          return j.division
                            // .toLocaleLowerCase()
                            ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
                        }
                      })?.filter((j: any) => {
                        if (empFirstName === "None" || empFirstName === "") {
                          return j;
                        } else {
                          return j?.first_name
                            ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
                          // ?.includes(empFirstName?.toLocaleLowerCase());
                        }
                      })?.filter((j: any) => {
                        if (
                          empPositionCode === "None" ||
                          empPositionCode === ""
                        ) {
                          return j;
                        } else {
                          return j?.position_code
                            ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
                          // ?.includes(empPositionCode?.toLocaleLowerCase());
                        }
                      })?.filter((j: any) => {
                        if (empService === "None" || empService === "") {
                          return j;
                        } else {
                          return j.service_reference_date
                            ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
                          // .includes(empService.toLocaleLowerCase());
                        }
                      })?.filter((j: any) => {
                        console.log(j.isSupervisor, "superv");
                        if (sNS === "None" || sNS === "") {
                          return j;
                        }
                        if (sNS === "S") {
                          return j.isSupervisor === true;
                        } else if (sNS === "NS") {
                          return j.isSupervisor === undefined;
                        }
                      })
                      .filter((j: any) => {
                        if (empSubSection === "None" || empSubSection === "") {
                          return j;
                        } else {
                          return j["sub section"]
                            ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
                          // .includes(empSubSection.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empGradeset === "None" || empGradeset === "") {
                          return j;
                        } else {
                          return j?.grade_set
                            ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
                          // ?.includes(empGradeset?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empManagerCode === "None" || empManagerCode === "") {
                          return j;
                        } else {
                          return j?.manager_code
                            ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
                          // ?.includes(empManagerCode?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empManagerPosition === "None" ||
                          empManagerPosition === ""
                        ) {
                          return j;
                        } else {
                          return j?.manager_position
                            ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
                          // ?.includes(empManagerPosition?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empManagerName === "None" || empManagerName === "") {
                          return j;
                        } else {
                          return j?.manager_name
                            ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
                          // ?.includes(empManagerName?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empjobtitle === "None" || empjobtitle === "") {
                          return j;
                        } else {
                          return j?.job_title
                            ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
                          // ?.includes(empjobtitle?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empJobcode === "None" || empJobcode === "") {
                          return j;
                        } else {
                          return j?.job_code
                            ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
                          // ?.includes(empJobcode?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empjoblevel === "None" || empjoblevel === "") {
                          return j;
                        } else {
                          return j?.job_level
                            ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
                          // ?.includes(empjoblevel?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empWorkLocation === "None" ||
                          empWorkLocation === ""
                        ) {
                          return j;
                        } else {
                          return j?.work_location
                            ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
                          // ?.includes(empWorkLocation?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empsections === "None" || empsections === "") {
                          return j;
                        } else {
                          return j?.section
                            ?.toLocaleLowerCase() === empsections?.toLocaleLowerCase();
                          // .includes(empsections.toLocaleLowerCase());
                        }
                      })
                      .filter((item1: any) => {
                        // console.log(item1,"item1")
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
                      .filter((item1: any) => {
                        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
                          return item1;
                        } else {
                          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
                        }
                      })
                      // sectionsFilter
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
                          (j?.grade !== undefined &&
                            j?.grade
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.position_long_description !== undefined &&
                            j?.position_long_description
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.first_name !== undefined &&
                            j?.first_name
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.service_reference_date !== undefined &&
                            j?.service_reference_date
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.position_code !== undefined &&
                            j?.position_code
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.division !== undefined &&
                            j?.division
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.section !== undefined &&
                            j?.section
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.ManagerCode !== undefined &&
                            j?.ManagerCode
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.ManagerName !== undefined &&
                            j?.ManagerName
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.ManagerPosition !== undefined &&
                            j?.ManagerPosition
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.WorkLocation !== undefined &&
                            j?.WorkLocation
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.grade_set !== undefined &&
                            j?.grade_set
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.job_code !== undefined &&
                            j?.job_code
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.job_title !== undefined &&
                            j?.job_title
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              )) ||
                          (j?.job_level !== undefined &&
                            j?.job_level
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
                      )?.map((j: any) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "lightgrey",
                              },
                              whiteSpace: "nowrap"
                            }}
                          >
                            {columnHeadersDisplay?.Ecode && <TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                              align="center"
                            >
                              {j.employee_code}
                            </TableCell>}
                            {columnHeadersDisplay?.Ename && <TableCell
                              align="justify"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                              <Names
                                sx={{
                                  color:
                                    (!getPAStatus(j)?.includes("PA Not Started")) && (
                                      j.appraisal.appraiser_status ==
                                      "draft" ||
                                      j.appraisal.appraiser_status ==
                                      "pending")
                                      ? "#0099FF"
                                      : getPAStatus(j)?.includes(
                                        "Pending with Appraiser"
                                      ) &&
                                        (j?.appraisal?.status ==
                                          "in-progress" ||
                                          j.appraisal.appraiser_status ==
                                          "employee-rejected")
                                        ? "#0099FF"
                                        : "#333333",
                                  cursor:
                                    (!getPAStatus(j)?.includes("PA Not Started")) && (
                                      j.appraisal.appraiser_status ==
                                      "draft" ||
                                      j.appraisal.appraiser_status ==
                                      "pending")
                                      ? "pointer" : getPAStatus(j)?.includes(
                                        "Pending with Appraiser"
                                      ) &&
                                        j?.appraisal?.status != "not-started"
                                        ? "pointer"
                                        : "default",
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {j.legal_full_name}
                              </Names>
                            </TableCell>}
                            {columnHeadersDisplay?.Eposition && <TableCell
                              align="justify"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                              {j.position_long_description}
                            </TableCell>}
                            {columnHeadersDisplay?.EGrade && <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                paddingRight: "40px"
                              }}
                            >
                              {j.grade}
                            </TableCell>}
                            {columnHeadersDisplay?.Section && <TableCell
                              align="center"
                              // width={200}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.section}
                            </TableCell>}
                            {columnHeadersDisplay?.Ependingaction && <TableCell
                              align="left"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                              {getStatus(j?.appraisal?.status)}
                            </TableCell>}
                            {columnHeadersDisplay?.overallRating && <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                               {(j?.appraisal?.status === "completed" && j?.employee?.employee_status === "rejected") ? (
                              <span style={{ color: "#0099FF" }}>{j?.overall_rating?.toFixed(2)}</span>
                            ) : (j?.appraisal?.status === "completed") ? (<span>{j?.overall_rating?.toFixed(2)}</span>) :
                              "-"
                            }
                              {/* {j.overall_rating == 0 ? (
                                <span> - </span>
                              ) : (
                                j.overall_rating?.toFixed(2)
                              )} */}
                            </TableCell>}
                          
                            {/* {columnHeadersDisplay?.Status && <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                              {getStatus(j?.appraisal?.status)}
                            </TableCell>} */}
                          
                         
                           
                          </TableRow>
                        )
                      })}
                  </TableBody>):(
    <TableBody>
    <TableRow>
      <TableCell 
      colSpan={6}
      align="left" 
                          style={{ fontWeight: '500',border:"none",color:"#808080",fontSize:"18px",fontFamily:"arial",paddingTop:"10px"  }}
      >
        No data to display
      </TableCell>
    </TableRow>
  </TableBody>
 )} 
                </Table>
              </Scroll>
            </TableContainer>
          </TableHeadings>
          {tableDataFilterdLength?.length > 0 && <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            // count={users.length}
            count={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        </div>
      </Box>
      </div>
    </>
  );
}