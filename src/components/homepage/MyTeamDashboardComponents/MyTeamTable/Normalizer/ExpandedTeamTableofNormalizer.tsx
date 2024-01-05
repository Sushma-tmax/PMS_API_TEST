import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, FormControlLabel, MenuItem, IconButton, FormControl, Dialog, DialogContent, DialogContentText, DialogActions, Alert, Menu, ListItemText, ListItemIcon, Tooltip, Popover } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Drawer, TextField } from "@mui/material";
import Expand from "../../../../../assets/Images/Expand.svg";
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
import Searchlensreview from "../../../../reviewerMain/Reviewericons/Searchlensreview.svg";
// import Newexcel from "../../reviewerMain/Reviewericons/Newexcel.svg"
import Newexcel from "../../../../reviewerMain/Reviewericons/Newexcel.svg";
import Updown from "../../Dashboard/Reviewericons/Updown.svg";
import Leftarrow from "../../../../../assets/Images/Leftarrow.svg";
import Eye from "../Reviewericons/Eyeicon.svg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import * as XLSX from "xlsx";

import {
  useGetEmployeeByFilterQuery,
  useAcceptNormalizerMutation,
  useRejectNormalizerAppraisalEmployeeMutation,
  useGetEmployeeByManagerCodeQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useGetReviewerEmployeeByFilterQuery,
  useGetActiveCalenderQuery
} from "../../../../../service";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  EMPLOYEE_APPRAISER_SUBMISSION,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  NORMALIZER_ACTION,
  NORMALIZER_APPROVE,
  NORMALIZER_PAGE,
  VIEW_PAST_PA,
  NORMALIZER_REJECTION,
} from "../../../../../constants/routes/Routing";
import { useLoggedInUser } from "../../../../../hooks/useLoggedInUser";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import { Scrollbar } from "react-scrollbars-custom";
import AlertDialogSuccess from "../../../../UI/DialogSuccess";
import { makeStyles } from '@mui/styles';

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
  "& .MuiTableCell-root": {
    padding: "8px 15px 8px 15px",

  },
});
const userData = [
  { id: 0, reason: "rating", isChecked: false, value: "rating" },
  {
    id: 1,
    reason: "Feedback questionnaire",
    isChecked: false,
    value: "Feedback_questionnaire",
  },
  {
    id: 2,
    reason: "area of improvement",
    isChecked: false,
    value: "area_of_improvement",
  },
  {
    id: 3,
    reason: "Training recommendation(s)",
    isChecked: false,
    value: "training_recommendation(s)",
  },
  {
    id: 4,
    reason: "Other recommendation(s)",
    isChecked: false,
    value: "other_recommendation(s)",
  },
];
export default function ExpandedTeamTableofReviewer(props: any) {
  const [bulkupdate, setbulkupdate] = React.useState<HTMLElement | null>(null);
  const { expandEmployees, setbreadCrumbName, tabLocation } = props;
  const classes = useStyles();
  const CustomScrollbar = Scrollbar as any;
  const { data: activecalendardata } = useGetActiveCalenderQuery('')
  let CalendarName = activecalendardata?.data[0]?.name
  const { data: user } = useLoggedInUser();
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,appraiser_name,reviewer_name,normalizer_name,appraisal.potential,
  position_long_description,grade,service_reference_date,overall_rating,isSupervisor,email,function,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,employee.employee_rating,employee.employee_status,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,
  reviewerIsDisabled,,normalizerIsChecked,normalizerIsDisabled,first_name,service_reference_date,position_code,division,section,sub section,manager_code,manager_name,manager_position,work_location,grade_set,job_code,job_level,appraiser_code,reviewer_code,normalizer_code,job_title,reviewer_previous_submission?.reviewer_rating`
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  React.useEffect(() => {
    if (user?.calendar?._id !== undefined) {
      setappCalId(user?.calendar?._id)
    }
    if (tabLocation === 0) {
      setbreadCrumbName("All")
    } else if (tabLocation === 1) {
      setbreadCrumbName("My pending actions")
    } else if (tabLocation === 2) {
      setbreadCrumbName("Not started")
    } else if (tabLocation === 3) {
      setbreadCrumbName("In progress")
    } else if (tabLocation === 4) {
      setbreadCrumbName("Employee rejection")
    } else if (tabLocation === 5) {
      setbreadCrumbName("Completed")
    }
  }, [user])


  const [acceptNormalizer] = useAcceptNormalizerMutation();
  const [rejectNormalizer] = useRejectNormalizerAppraisalEmployeeMutation();
  const listInnerRef = useRef<any>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [enteredName, setenteredName] = useState("");
  //const [approved, setApproved] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)

  //Data for populating the table
  //   console.log(users,"users")


  useEffect(() => {
    const expandEmployeesData = expandEmployees
      ?.filter((j: any) => {
        if (tabLocation === 0) {
          return j;
        } else if (tabLocation === 1) {
          return j?.appraisal?.pa_status?.includes(
            "Pending with HR Normalizer"
          );
        } else if (tabLocation === 2) {
          return j?.appraisal?.status === "not-started"
        } else if (tabLocation === 3) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("in-progress"?.toLocaleLowerCase()) ||
            j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase());
        } else if (tabLocation === 4) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("rejected"?.toLocaleLowerCase());
        } else if (tabLocation === 5) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("completed"?.toLocaleLowerCase());
        }
      })
    setUsers(expandEmployeesData);

  }, [expandEmployees]);

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
      j?.reviewer.reviewer_status == "accepted" &&
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



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
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

  const [empsections, setempsections] = React.useState("");
  // console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
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
  //For multislect options

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

  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
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

  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
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
  //For multislect options

  useEffect(() => {

    let New = users?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.legal_full_name
          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
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
            .toLocaleLowerCase()
            .includes(empdivisions.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase()
            ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (
          empPositionCode === "None" ||
          empPositionCode === ""
        ) {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase()
            ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            .toLocaleLowerCase()
            .includes(empService.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            .includes(empSubSection.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return j?.grade_set
            ?.toLocaleLowerCase()
            ?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return j?.manager_code
            ?.toLocaleLowerCase()
            ?.includes(empManagerCode?.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            ?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return j?.manager_name
            ?.toLocaleLowerCase()
            ?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return j?.job_title
            ?.toLocaleLowerCase()
            ?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return j?.job_code
            ?.toLocaleLowerCase()
            ?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return j?.job_level
            ?.toLocaleLowerCase()
            ?.includes(empjoblevel?.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (sectionsFilter === "None" || sectionsFilter === "") {
      //     return j;
      //   } else {
      //     return j.section
      //       .toLocaleLowerCase()
      //       .includes(sectionsFilter.toLocaleLowerCase());
      //   }
      // })
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
        }
      })
      // sectionsFilter
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
    settablecount(New?.length)
    // if(empsections == ""){
    //   settablecount(users?.length)
    // }else if(New != ""){
    //   settablecount(New?.length)
    // }
    console.log(empsections, "New2")
    console.log(New?.length, "New")
    console.log(tablecount, "New1")
  }, [users, empsections, enteredName, positionsFilter, GradesFilter, sectionsFilter]);

  // multiselect for Position and grade
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);

  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) { setpositionFilter([]) } else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
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
  };

  // multiselect

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
    const grades = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.map((i: any) => {
        return i?.grade;
      });
    const gradeContents = grades?.filter((c: any, index: any) => {
      return grades?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    console.log(gradeContents, "contents");
    const position = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {
        return i?.position_long_description;
      });
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
  }, [users]);
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
    // console.log(event?.target.name.toString(),"handleTarget")
    setAnchorElnew(null);
    // handleClosenew(event);
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
  }, [positions, positionsFilter])
  useEffect(() => {
    if (GradesFilter?.length == 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empgrades, GradesFilter])
  React.useEffect(() => {
    if (empdivisions === "None" || empdivisions === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empdivisions])
  React.useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon4(false);
    } else {
      setIcon4(true);
    }
  }, [sectionsFilter])
  React.useEffect(() => {
    if (empFirstName === "None" || empFirstName === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }
  }, [empFirstName])
  React.useEffect(() => {
    if (empFunction === "None" || empFunction === "") {
      setIcon6(false);
    } else {
      setIcon6(true);
    }
  }, [empFunction])
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
    Firstname: true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    employeerating: true,
    appraiserRating: true,
    reviewerRating: true,
    normalizerRating: true,
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
    appraiserCode: true,
    reviewerCode: true,
    normalizerCode: true,
    status: true,
    email: true,
    rejectionStatus: true,
    ServiceReferenceDate: true,
    Function: true,
    SupervisoryRole: true,
    EmailID: true,
    CalendarName: true,
    SelectAll: true,
  })
  const [openGrade, setOpenGrade] = React.useState(false);
  console.log(columnHeaders, "columnHeaders")

  const handleOpenGrade = () => {
    setOpenGrade(true);
  };
  const [headingSortAccept, setheadingSortAccept] = React.useState(false);
  // console.log(heading1,headingSortAccept, "h1");
  const sNSvalues = [, "N-SP", "S"];

  const [heading1Dis, setheading1Dis] = React.useState(true);
  const [heading2Dis, setheading2Dis] = React.useState(true);
  const [heading3Dis, setheading3Dis] = React.useState(true);
  // const [heading1, setheading1] = React.useState(true);

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
    OverAllRating: true
  })
  console.log(columnHeaders, columnHeadersDisplay, "h1");

  const handleheadingOverAllRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };

  const [overall, setoverAll] = React.useState(true);
  const handleoverAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setoverAll(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [talentcategory, setTalentcategory] = React.useState(true);
  const handletalentcategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTalentcategory(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

    setheading1(event.target.checked);
    let columnHeadersTemp = columnHeaders

    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  // const [heading2, setheading2] = React.useState(true);
  // // console.log(heading2, "h2");
  // const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading2(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  const [headingcalendar, setheadingcalendar] = React.useState(true);
  const handleheadingCalendar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingcalendar(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  }
  // const [heading3, setheading3] = React.useState(true);
  // // console.log(heading3, "h3");
  // const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading3(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  const [headingSN, setheadingSN] = React.useState(true);
  // console.log(headingSN, "h1");
  const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingSN(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const handleSelectAll = (selectAll:any) => {
    const updatedColumnHeaders = { ...columnHeaders };
    // Set all checkbox values to the selectAll value (true or false)
    Object.keys(updatedColumnHeaders).forEach((key) => {
      updatedColumnHeaders[key] = selectAll;
    });
    setcolumnHeaders(updatedColumnHeaders);
  };
  const [headingAppraiser, setheadingAppraiser] = React.useState(true);
  const handleheadingAppraiser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingAppraiser(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingReviewer, setheadingReviewer] = React.useState(true);
  const handleheadingReviewer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingReviewer(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingNormalizer, setheadingNormalizer] = React.useState(true);
  const handleheadingNormalizer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingNormalizer(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingPotential, setheadingPotential] = React.useState(true);
  const handleheadingPotential = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPotential(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingPrevious, setheadingPrevious] = React.useState(true);
  const handleheadingPrevious = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPrevious(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [AppraiserCode, setAppraiserCode] = React.useState(true);
  const handleheadingAppraiserCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [ReviewerCode, setReviewerCode] = React.useState(true);
  const handleheadingReviewerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [NormalizerCode, setNormalizerCode] = React.useState(true);
  const handleheadingNormalizerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizerCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  // const [AppraiserRating, setAppraiserRating] = React.useState(true);
  // const handleheadingAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAppraiserRating(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [ReviewerRating, setReviewerRating] = React.useState(true);
  // const handleheadingReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setReviewerRating(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  const [NormalizerRating, setNormalizerRating] = React.useState(true);
  const handleheadingNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizerRating(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [EmployeeRating, setEmployeeRating] = React.useState(true);
  const handleheadingEmployeeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeRating(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [PAstatus, setPAstatus] = React.useState(true);
  const handleheadingPAstatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPAstatus(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  // const [heading4, setheading4] = React.useState(true);
  // // console.log(heading4, "h4");
  // const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading4(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  const [heading5, setheading5] = React.useState(true);
  // console.log(heading5, "h5");
  const handleheading5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading5(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading6, setheading6] = React.useState(true);
  // console.log(heading6, "h6");
  const handleheading6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading6(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading7, setheading7] = React.useState(true);
  // console.log(heading7, "h7");
  const handleheading7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading7(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading8, setheading8] = React.useState(true);

  const handleheading8 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading8(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading9, setheading9] = React.useState(true);

  const handleheading9 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading9(event.target.checked);
  };
  const [heading10, setheading10] = React.useState(true);
  const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading10(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  // const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   //this state is used to re-render checkbox. Pls don't removes
  //   setheading1(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  //   //FiiteredExport1();
  // };
  const [heading11, setheading11] = React.useState(true);
  const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading11(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading12, setheading12] = React.useState(true);
  const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading12(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading13, setheading13] = React.useState(true);
  const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading13(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading14, setheading14] = React.useState(true);
  const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading14(event.target.checked);
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
  };
  //---------------------------------new drawer function(need to replace)
  const [ServiceReferenceDateData, setServiceReferenceDateData] = React.useState(true);
  const [FunctionData, setFunctionData] = React.useState(true);
  const [SupervisoryRoleData, setSupervisoryRoleData] = React.useState(true);
  const [EmailIDData, setEmailIDData] = React.useState(true);
  const [rejstatusValue, rejsetstatusValue] = React.useState(true);
  const [firstName, setfirstName] = React.useState(true);
  const [heading1, setheading1] = React.useState(true);
  const [heading2, setheading2] = React.useState(true);
  const [heading3, setheading3] = React.useState(true);
  const [heading4, setheading4] = React.useState(true);
  const [appraiserRating, setAppraiserRating] = React.useState(true);
  const [reviewerRating, setReviewerRating] = React.useState(true);
  const [normalizeRating, setNormalizeRating] = React.useState(true);
  const [employeerating, setemployeerating] = React.useState(true);
  const [headingOfEcode, setheadingOfEcode] = React.useState(true);
  const [headingOfSection, setheadingOfSection] = React.useState(true);
  const [headingOfPAStatus, setheadingOfPAStatus] = React.useState(true);
  const [headingOfDivision, setheadingOfDivision] = React.useState(true);
  const [headingOfSubSection, setheadingOfSubSection] = React.useState(true);
  const [headingOfAppraiserName, setheadingOfAppraiserName] = React.useState(true);
  const [headingOfReviewerName, setheadingOfReviewerName] = React.useState(true);
  const [headingOfNormalizerName, setheadingOfNormalizerName] = React.useState(true);
  const [headingOfOverallRating, setheadingOfOverallRating] = React.useState(true);
  const [headingOfPreviousRating, setheadingOfPreviousRating] = React.useState(true);
  const [headingOfPotentialLevel, setheadingOfPotentialLevel] = React.useState(true);
  const [headingOfTalentCategory, setheadingOfTalentCategory] = React.useState(true);
  const [headingOfWorkLocation, setheadingOfWorkLocation] = React.useState(true);
  const [headingOfManagerCode, setheadingOfManagerCode] = React.useState(true);
  const [headingOfManagerName, setheadingOfManagerName] = React.useState(true);
  const [headingOfManagerPosition, setheadingOfManagerPosition] = React.useState(true);
  const [appCodes, setappCodes] = React.useState(true);
  const [revCodes, setrevCodes] = React.useState(true);
  const [norCodes, setnorCodes] = React.useState(true);
  const [statusValue, setstatusValue] = React.useState(true);
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatusValue(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleAppCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setappCodes(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setrevCodes(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnorCodes(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleEmployeeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfEcode(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //this state is used to re-render checkbox. Pls don't removes
    setheading1(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSection(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPAStatus(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfDivision(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };

  const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSubSection(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfAppraiserName(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfReviewerName(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfNormalizerName(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfOverallRating(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPreviousRating(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPotentialLevel(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfTalentCategory(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfWorkLocation(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerCode(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerName(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerPosition(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleemployeerating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemployeerating(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserRating(event.target.checked)
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstName(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleRejectionStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    rejsetstatusValue(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDateData(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleFunctionData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionData(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleSupervisoryRoleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisoryRoleData(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleEmailIDData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIDData(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerRating(event.target.checked)
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizeRating(event.target.checked)
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const getRejectionstatus = (j: any) => {
    if (j?.employee?.employee_agree === true) return "Re-normalization"
    else return "Mediation"
  }
  //---------------------------------new drawer function(need to replace)
  //console.log(heading1,headingSortAccept,heading1Dis, "h,hsa,hd");

  //Button functionalities
  const [message, setMessage] = useState("")
  const [openAlertOk, setOpenAlertOk] = useState<any>(false)
  const [approved, setApproved] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [checkboxUser, setcheckboxUser] = React.useState<any>([]);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [errorApprove, seterrorApprove] = React.useState(false);
  const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [reasonSelection, setreasonSelection] = React.useState(false);
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };
  const handleClose2 = () => {
    setOpen1(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleAlertClose = () => {
    setOpenAlertOk(false);
    setMessage("")
  }
  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res?.map((i: any) => {
        return i?._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox?.filter((i: any) => {
        return i?.normalizerIsChecked === true && !i?.normalizerIsDisabled;
      });
      console.log(res, "check22");
      return res;
    }
  };
  const acceptHandler = () => {
    const approvefilter = users?.filter((i: any) => {
      return i?.normalizerIsChecked === true && i?.normalizerIsDisabled === false;
    });
    if (checkboxIdHandler(checkboxHandler(users))?.length > 0) {
      if (approvefilter && approvefilter.length > 0) {
        let currentUser = approvefilter[0];
        if (currentUser?.appraisal?.status == "rejected") {
          navigate(`${NORMALIZER_ACTION}/employee/${checkboxIdHandler(checkboxHandler(users))}`);
        } else {
          navigate(`${NORMALIZER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(users))}`)
        }

      }

    } else {
      setOpenAlertOk(true);
      setMessage("Please select atleast one employee.")
    }
  }
  const approvedSuccessfully = () => {
    return setApproved(true);
  };
  const handleReject = () => {
    const checkedfilter = checkboxUser
      .filter((i: any) => {
        console.log(i.isChecked, "hhhhhhhhhhhhhhhhhhhhhhhh");
        return i.isChecked === true || i.isChecked === false;
      })
      .map((j: any) => {
        return {
          value: j.value,
          isChecked: true,
        };
      });
    const rejectfilter = users?.filter((i: any) => {
      console.log(i?.normalizerIsChecked, "filter");
      return i?.normalizerIsChecked === true && i?.normalizerIsDisabled === false;
    });
    const normalizerValue = rejectfilter?.map(
      (j: any) => j?.appraisal?.status
    )[0];
    if (rejectfilter?.length > 1) {
      setError(true);
      setOpenAlert(true);
    } else if (rejectfilter?.length === 0) {
      setzeroselect(true);
      setOpenAlert(true);
    } else {
      let checkedEmp = rejectfilter?.map((j: any) => j._id);
      if (normalizerValue == ("rejected")) {
        let id = rejectfilter[0]._id;
        navigate(`${NORMALIZER_ACTION}/employee/` + id);
      } else {
        rejectNormalizer({
          value: checkedfilter,
          id: checkedEmp[0],
        }).then((data: any) => {
          navigate(`${NORMALIZER_REJECTION}/employee/${checkedEmp[0]}`);
        });
      }
    }
  };
  const bulkApproval = () => {
    console.log(users, 'userssssssssssssss');
    // let myAppraisalsCode = myAppraisals.map((item: any) => item.employee_code)
    let myReviewalusers = users?.filter(
      (item: any) => !item?.normalizerIsDisabled && !item.normalizerIsChecked
        && item.appraisal.status !== "rejected" && item.reviewer.reviewer_status !== "rejected"
    );
    let bulkUsers = myReviewalusers.map((user: any) => user?._id)
    const tempUser = users?.map((j: any) => {
      //console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
      return bulkUsers.includes(j?._id) ? { ...j, normalizerIsChecked: true } : j;
    });
    setUsers(tempUser);
    //console.log(myReviewalusers);
    //console.log(checkboxIdHandler(myReviewalusers));
    acceptNormalizer({ id: checkboxIdHandler(myReviewalusers) });
    approvedSuccessfully();
  };
  useEffect(() => {
    setcheckboxUser(userData);
  }, []);
  console.log(checkboxUser, "ccccccccccccc");
  const handlecheckbox = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, " values");
    if (name === "allselect") {
      let userReason = checkboxUser.map((reasons: any) => {
        return { ...reasons, isChecked: checked };
      });
      setcheckboxUser(userReason);
    } else {
      let userReason = checkboxUser.map((reasons: any) =>
        reasons?.reason === name ? { ...reasons, isChecked: checked } : reasons
      );
      setcheckboxUser(userReason);
    }
  };
  const handleDialogClose = () => {
    setOpendialog(false);
    //setIsOpen(false);
  };
  const handleSubmit = (e: any) => {
    const checkedfilter = checkboxUser
      .filter((i: any) => {
        console.log(i?.isChecked, "hhhhhhhhhhhhhhhhhhhhhhhh");
        return i?.isChecked === true || i?.isChecked === false;
      })
      .map((j: any) => {
        return {
          value: j?.value,
          isChecked: j?.isChecked,
        };
      });

    console.log(checkedfilter, "ids");
    if (checkedfilter.filter((k: any) => k?.isChecked === true)?.length === 0) {
      setreasonSelection(true);
    } else if (checkedfilter?.length > 0) {
      return (
        setreasonSelection(false),
        // handleDialogClose(),
        rejectNormalizer({
          value: checkedfilter,
          id: checkedEmployeeid[0],
        }),
        navigate(`${NORMALIZER_REJECTION}/employee/${checkedEmployeeid[0]}`)
      );
    }
  }
  const handleDialogNo = () => {
    setOpendialog(false);
    // setIsOpen(true);
  };
  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users?.map((j: any) => {
      console.log(j?.normalizerIsChecked, "jjjjjjjjjjj");
      return j?._id === name ? { ...j, normalizerIsChecked: checked } : j;
    });
    setUsers(tempUser);
    console.log(tempUser, "temp");
  };
  const tableDataFilterdLength = users?.filter((j: any) => {
    if (empFullName === "None" || empFullName === "") {
      return j;
    } else {
      return j?.legal_full_name
        ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
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
          .toLocaleLowerCase()
          .includes(empdivisions.toLocaleLowerCase());
      }
    })?.filter((j: any) => {
      if (empFirstName === "None" || empFirstName === "") {
        return j;
      } else {
        return j?.first_name
          ?.toLocaleLowerCase()
          ?.includes(empFirstName?.toLocaleLowerCase());
      }
    })?.filter((j: any) => {
      if (
        empPositionCode === "None" ||
        empPositionCode === ""
      ) {
        return j;
      } else {
        return j?.position_code
          ?.toLocaleLowerCase()
          ?.includes(empPositionCode?.toLocaleLowerCase());
      }
    })?.filter((j: any) => {
      if (empService === "None" || empService === "") {
        return j;
      } else {
        return j.service_reference_date
          .toLocaleLowerCase()
          .includes(empService.toLocaleLowerCase());
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
          ?.toLocaleLowerCase()
          .includes(empSubSection.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empGradeset === "None" || empGradeset === "") {
        return j;
      } else {
        return j?.grade_set
          ?.toLocaleLowerCase()
          ?.includes(empGradeset?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empManagerCode === "None" || empManagerCode === "") {
        return j;
      } else {
        return j?.manager_code
          ?.toLocaleLowerCase()
          ?.includes(empManagerCode?.toLocaleLowerCase());
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
          ?.toLocaleLowerCase()
          ?.includes(empManagerPosition?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empManagerName === "None" || empManagerName === "") {
        return j;
      } else {
        return j?.manager_name
          ?.toLocaleLowerCase()
          ?.includes(empManagerName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empjobtitle === "None" || empjobtitle === "") {
        return j;
      } else {
        return j?.job_title
          ?.toLocaleLowerCase()
          ?.includes(empjobtitle?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empJobcode === "None" || empJobcode === "") {
        return j;
      } else {
        return j?.job_code
          ?.toLocaleLowerCase()
          ?.includes(empJobcode?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empjoblevel === "None" || empjoblevel === "") {
        return j;
      } else {
        return j?.job_level
          ?.toLocaleLowerCase()
          ?.includes(empjoblevel?.toLocaleLowerCase());
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
          ?.toLocaleLowerCase()
          ?.includes(empWorkLocation?.toLocaleLowerCase());
      }
    })
    // .filter((j: any) => {
    //   if (sectionsFilter === "None" || sectionsFilter === "") {
    //     return j;
    //   } else {
    //     return j.section
    //       .toLocaleLowerCase()
    //       .includes(sectionsFilter.toLocaleLowerCase());
    //   }
    // })
    .filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    // sectionsFilter
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
  const handleExport = () => {
    const mapped = users?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.legal_full_name
          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
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
            .toLocaleLowerCase()
            .includes(empdivisions.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase()
            ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (
          empPositionCode === "None" ||
          empPositionCode === ""
        ) {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase()
            ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            .toLocaleLowerCase()
            .includes(empService.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            .includes(empSubSection.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return j?.grade_set
            ?.toLocaleLowerCase()
            ?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return j?.manager_code
            ?.toLocaleLowerCase()
            ?.includes(empManagerCode?.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            ?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return j?.manager_name
            ?.toLocaleLowerCase()
            ?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return j?.job_title
            ?.toLocaleLowerCase()
            ?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return j?.job_code
            ?.toLocaleLowerCase()
            ?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return j?.job_level
            ?.toLocaleLowerCase()
            ?.includes(empjoblevel?.toLocaleLowerCase());
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
            ?.toLocaleLowerCase()
            ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
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
      ?.map((j: any) => {
        console.log(j, "jjjj")
        let inputDate = j?.service_reference_date
        const dateParts = inputDate?.split("-");
        console.log(inputDate, dateParts, "inputDate")
        let date = new Date(inputDate);
        const year = date?.getFullYear();
        const month = date?.toLocaleString("default", { month: "short" });
        const day = date?.getDate();
        //const day = dateParts[2]?.slice(0, 2)
        const formattedDate = `${day}-${month}-${year}`;
        let exportData: any = {}
        // CalendarName
        if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = CalendarName
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = formattedDate
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = j?.isSupervisor != undefined ? "SP" : "N-SP"
        if (columnHeaders["EmailID"] == true) exportData["Email ID"] = j?.email
        if (columnHeaders["EDivision"] == true) exportData["Division"] = j?.division
        if (columnHeaders["ESection"] == true) exportData["Section"] = j?.section
        //if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating   
        if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = j?.sub_section
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["appraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["reviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["normalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = j?.employee?.employee_rating?.toFixed(2)
        if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = j?.appraisal?.appraiser_rating?.toFixed(2)
        if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = j?.reviewer?.reviewer_rating?.toFixed(2)
        if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = j?.normalizer?.normalizer_rating?.toFixed(2)
        if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = (j?.current_rating?.overall_rating == 0 || j?.appraisal?.status !== "completed") ? "-" : j?.current_rating?.overall_rating?.toFixed(2)
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating?.toFixed(2)
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = j?.appraisal?.potential
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.talent_category
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
        if (columnHeaders["status"] == true) exportData["Status"] = getStatus(j?.appraisal?.status)
        //if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = getRejectionstatus(j)
        return exportData
      });
    const a = [1]
    const Emptymapped = a.map((j: any) => {
      let exportData: any = {}
      if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = ""
      if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
      if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
      if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
      if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""
      if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
      if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
      if (columnHeaders["Function"] == true) exportData["Function"] = ""
      if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = ""
      if (columnHeaders["EmailID"] == true) exportData["Email ID"] = ""
      if (columnHeaders["EDivision"] == true) exportData["Division"] = ""
      if (columnHeaders["ESection"] == true) exportData["Section"] = ""
      //if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating   
      if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = ""
      if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
      if (columnHeaders["appraiserCode"] == true) exportData["Appraiser Code"] = ""
      if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
      if (columnHeaders["reviewerCode"] == true) exportData["Reviewer Code"] = ""
      if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = ""
      if (columnHeaders["normalizerCode"] == true) exportData["HR Normalizer Code"] = ""
      if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = ""
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
      // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
      if (columnHeaders["status"] == true) exportData["Status"] = ""
      // if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = ""
      return exportData
    })
    console.log(mapped, "mapped")
    if (mapped.length === 0) {
      // Use Emptymapped when the filtered data is empty
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(Emptymapped);
    } else {
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(mapped);
    }

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
    // var wb = XLSX.utils.book_new(),
    //   ws = XLSX.utils.json_to_sheet(mapped?.length == 0 ? Emptymapped : mapped);

    // XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    // XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  const handleheadingSortAccept = () => {
    // setheadingSortAccept(true);
    // setheading1Dis(heading1)
    // let temp = {...columnHeaders}
    // setcolumnHeadersDisplay(temp);
    setisDrawerOpen(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Eposition: true,
      Firstname: true,
      ESection: true,
      EGrade: true,
      EDivision: true,
      ESubSection: true,
      AppraiserName: true,
      ReviewerName: true,
      NormalizerName: true,
      OverallRating: true,
      employeerating: true,
      appraiserRating: true,
      reviewerRating: true,
      normalizerRating: true,
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
      appraiserCode: true,
      reviewerCode: true,
      normalizerCode: true,
      status: true,
      email: true,
      rejectionStatus: true,
      ServiceReferenceDate: true,
      Function: true,
      SupervisoryRole: true,
      EmailID: true,
      CalendarName: true,
      SelectAll: true,
    })
    handleExport();
  };
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

  };
  const handleCloseGrade = () => {
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Eposition: true,
      Firstname: true,
      ESection: true,
      EGrade: true,
      EDivision: true,
      ESubSection: true,
      AppraiserName: true,
      ReviewerName: true,
      NormalizerName: true,
      OverallRating: true,
      employeerating: true,
      appraiserRating: true,
      reviewerRating: true,
      normalizerRating: true,
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
      appraiserCode: true,
      reviewerCode: true,
      normalizerCode: true,
      status: true,
      email: true,
      rejectionStatus: true,
      ServiceReferenceDate: true,
      Function: true,
      SupervisoryRole: true,
      EmailID: true,
      CalendarName: true,
      SelectAll: true,
    })
    setisDrawerOpen(false);
  };

  // BULK ACCEPT BUTTON HOVER FUCNTION
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setbulkupdate(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setbulkupdate(null);
  };

  const openBulkHover = Boolean(bulkupdate);
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setenteredName(e.target.value);
    setPage(0)
  }
  const getpaStatus = (status: any) => {
    if (status == "Completed" || status == "excepted") {
      return "-"
    }else{
      return status
    }
  }
  return (
    <>

      <Box
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          background: "#ffffff",
          padding: "20px",
          height: "auto",
          marginBottom: "25px"
          // marginTop: "30px",
        }}
      >

        <AlertDialogSuccess
          isAlertOpen={openAlertOk}
          handleAlertClose={handleAlertClose}>
          {message}
        </AlertDialogSuccess>
        {approved && (
          <Dialog
            open={open1}
            onClose={handleClose2}
            BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            PaperProps={{
              style: {
                // borderColor:'blue',
                //border:'1px solid',
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin: "0px",
                padding: "30px",
                // maxHeight:"30%"
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
              },
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  // paddingBottom: "12px",
                  // paddingRight: "10px",
                  // paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordBreak: "break-word",
                  // height: "100px",
                  alignItems: "center",
                  overflowY: "hidden",
                }}
              >The performance appraisal was accepted successfully.</DialogContentText>
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "70px"
                }}
                variant="outlined"
                onClick={handleClose2}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Dialog
          open={openAlert}
          onClose={handleCloseAlert}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
              // maxHeight:"30%"
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              {error && (
                // <Alert severity="error">
                <div>
                  Multiple employee cannot be rejected - select one employee.
                </div>
                // </Alert>
              )}
              {zeroselect && (
                // <Alert severity="error">
                <div>
                  {" "}
                  Please select atleast one employee.
                </div>

                // </Alert>
              )}
              {errorApprove && (
                <div>
                  Multiple employee cannot be rejected - select one employee.
                </div>
              )}
              {zeroselectApprove && (
                <div>
                  {" "}
                  Please select atleast one employee.
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <div style={{ alignItems: "center" }}>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "70px"
                }}
                variant="outlined"
                autoFocus
                onClick={handleCloseAlert}
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          // fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
              // maxHeight:"30%"
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              Are you sure you want to accept all the pending actions?
            </DialogContentText>
          </DialogContent>
          {/* <div style={{ alignItems: "center" }}> */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
          // paddingBottom="30px"
          >
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  // textTransform: "none",
                  // backgroundColor: "#FFA801",
                  // fontSize: "12px",
                  // fontFamily: "sans-serif",
                  // padding: "2px 10px",
                  // marginRight: "10px",
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                  color: "#3e8cb5"
                }}
                variant="outlined"
                autoFocus
                // onClick={bulkApproval}

                onClick={() => {
                  bulkApproval();
                  handleClose();
                  handleClickOpen1();
                }}
              >
                Yes
              </Button>
              <Button
                style={{
                  // textTransform: "none",
                  // fontSize: "12px",
                  // fontFamily: "sans-serif",
                  // marginRight: "10px",
                  // color: "#010101",
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "10px",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                  color: "#3e8cb5"
                }}
                variant="outlined"
                onClick={handleClose}
              // autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Stack>
          {/* </div> */}
        </Dialog>
        <div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingBottom="10px"
          >
            <Typography
              gutterBottom
              component="div"
              sx={{ fontSize: "20px", fontFamily: "Arial", color: "#333333" }}
            >
              {/* My Team */}
            </Typography>

            <div>
              <Stack direction="row" spacing={2} alignItems="center">

                {/* <Button
 aria-owns={openBulkHover ? 'mouse-over-popover' : undefined}
 aria-haspopup="true"
 onMouseEnter={handlePopoverOpen}
 onMouseLeave={handlePopoverClose}

                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    //marginRight: "20px",
                    background: "transparent",
                    height: "35px",
                    // width: "150px",
                    color: "#3e8cb5"
                  }}
                  variant="outlined"
                  onClick={handleClickOpen}
                >
                  Bulk Accept
                </Button> */}
                <Popover
                  // style={{marginBottom:"20px",}}
                  id="mouse-over-popover"
                  open={openBulkHover}
                  anchorEl={bulkupdate}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                  PaperProps={{
                    style: {
                      // marginTop:"10px",
                      backgroundColor: "#696969",
                      boxShadow: "none",
                      maxWidth: "125px",
                      borderRadius: "5px",
                    },
                  }}
                  sx={{
                    pointerEvents: 'none',
                    "& .MuiPopover-paper": {
                      border: "1px solid #3e8cb5",
                      backgroundColor: "#ffffff",
                      marginTop: "5px",
                    },
                  }}
                >
                  <Typography
                    style={{
                      padding: "3px",
                      fontSize: "9px",
                      color: "#333333",
                      fontFamily: "Arial",
                      textAlign: "justify"
                    }}>Bulk accept is used for the PA rating acceptance without reviewing the PA details.</Typography>
                </Popover>

                {/* <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    //marginRight: "20px",
                    background: "transparent",
                    height: "35px",
                    width: "70px",
                    color: "#3e8cb5"
                  }}
                  variant="outlined"
                  onClick={() => {
                    acceptHandler()
                  }}

                >

                  Accept

                </Button>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    // marginRight: "20px",
                    background: "transparent",
                    height: "35px",
                    width: "70px",
                    color: "#3e8cb5"
                  }}
                  variant="outlined"
                  // onClick={rejectHandler}
                  onClick={handleReject}
                >
                  Reject
                </Button> */}
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
                    //  onChange={(e) => {setenteredName(e.target.value)
                    // setPage(0)}}
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
                                onChange={handleRevCodes} />
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
                                onChange={handleNorCodes} />
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
                      {/* <TableCell align="center" width="2.5%"></TableCell> */}
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
                        {/* <Stack direction="row" >
                        <div
                          aria-controls={opennew ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew ? "true" : undefined}
                          onClick={handleClicknew}
                        >
                          <Stack direction="row" alignItems="center">
                           Ecode
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"90px"
                          }}
                          anchorEl={anchorElnew}
                          open={opennew}
                          onClose={handleClosenew}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"center"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTarget}
                           >None
                           </MenuItem>
                                 {users
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.employee_code - b?.employee_code;
                                })
                                ?.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                  ?.map((j: any) => (
                                    <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      color: "#333333",
                                      justifyContent:"left",
                                      width:"100px",
                                      paddingLeft: "5px",
                                      //height:"200px"
                                    }}
                                      key={j?.employee_code}
                                      value={j?.employee_code}
                                      onClick={handleTarget}
                                    >
                                      {j?.employee_code}
                                    </MenuItem>
                                  ))}
                        </Menu>
                        {icon && <FilterAltTwoToneIcon />}
                        </Stack>  */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span style={{
                                color: "#3e8cb5",
                                fontSize: "14px",
                                fontFamily: "Arial",
                                fontWeight: "600",
                                border: "none",
                                background: "none",
                                //textAlign: "left",
                                // margin:"-5px"
                              }}> Ecode</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={employeeCode}
                                onChange={handleChangeemployeeCode}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                                <MenuItem
                                  style={{ fontSize: "12px" }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {users
                                 ?.slice()
                                 ?.sort(function (a: any, b: any) {
                                   return a?.employee_code - b?.employee_code;
                                 })
                                 .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                 ?.map((j: any) => (
                                    <MenuItem
                                      style={{ fontSize: "12px" }}
                                      key={j?.employee_code}
                                      value={j?.employee_code}
                                    >
                                      {j?.employee_code}
                                    </MenuItem>
                                  ))}
                              </Select>
                              {icon && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl> */}
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
                        {/* <Stack direction="row" alignItems="center" >
                        <div
                          aria-controls={openFullName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFullName ? "true" : undefined}
                          onClick={handleClickFullName}
                        >
                          <Stack direction="row" alignItems="center">
                          Employee Name
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"400px"
                          }}
                          anchorEl={anchorElnewFullName}
                          open={openFullName}
                          onClose={handleCloseFullName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                          //name="None"
                           onClick={handleTargetFullName}
                           >None
                           </MenuItem>
                           {users
                                     ?.slice()
                                     ?.sort(function (a: any, b: any) {
                                       return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                     })
                                     ?.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                    ?.map((name: any) => (
                                      <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        justifyContent:"left",
                                        width:"200px",
                                        paddingLeft: "5px",
                                        //height:"200px"
                                      }}
                                        key={name?.legal_full_name}
                                        value={name?.legal_full_name}
                                        onClick={handleTargetFullName}
                                      >
                                        {name?.legal_full_name}
                                      </MenuItem>
                                    ))}
                          
                        </Menu>
                        {icon1 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Employee Name</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={employeeName}
                                  onChange={handleChangeemployeeName}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                    style={{ fontSize: "12px" }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {users
                                   ?.slice()
                                   ?.sort(function (a: any, b: any) {
                                     return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                   })
                                   .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                   ?.map((name: any) => (
                                      <MenuItem
                                        style={{ fontSize: "12px" }}
                                        key={name?.legal_full_name}
                                        value={name?.legal_full_name}
                                      >
                                        {name?.legal_full_name}
                                      </MenuItem>
                                    ))}
                                </Select>
                                {icon1 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl> */}
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
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}

                                    size="small"
                                    style={{ padding: "3px", paddingLeft: "14px", height: "0px" }} classes={{
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
                                      fontSize: "14px",
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
                                      sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                      size="small"
                                      style={{ padding: "3px", paddingLeft: "14px", height: "0px" }}
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
                        {/* <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openservicePosition  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openservicePosition  ? "true" : undefined}
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
                            height:"200px",
                            width:"300px"
                          }}
                          anchorEl={anchorElnewservicePosition}
                          open={openservicePosition }
                          onClose={handleCloseservicePosition}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"100px",
                            // paddingLeft: "5px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetservicePosition}
                           >None
                           </MenuItem>
                           {users
                                  ?.slice()
                                  ?.sort(function (a:any, b:any) {return a.position_long_description.localeCompare(b.position_long_description);})
                                  ?.filter((item:any,index:any,array:any) => array.map((data:any)=>{return data.position_long_description}).indexOf(item.position_long_description) === index)
                                    ?.map((name: any) => (
                                      <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        justifyContent:"left",
                                        width:"160px",
                                        // paddingLeft: "5px",
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
                          {/* <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceGrade ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceGrade ? "true" : undefined}
                          onClick={handleClickserviceGrade}
                        >
                          <Stack direction="row" alignItems="center">
                           Grade
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"100px"
                          }}
                          anchorEl={anchorElnewserviceGrade}
                          open={openserviceGrade}
                          onClose={handleCloseserviceGrade}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceGrade}
                           >None
                           </MenuItem>
                         
                           {users
                               ?.slice()?.sort(function (a:any, b:any) {   
                                return a.grade - b.grade;   
                              })?.filter((item:any,index:any,array:any) => array?.map((data:any)=>{return data.grade}).indexOf(item.grade) === index)                                  
                                 ?.map((j: any) => (
                                      <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        justifyContent:"left",
                                        width:"90px",
                                        // paddingLeft: "5px",
                                        //height:"200px"
                                      }}
                                        key={j?.grade}
                                        value={j?.grade}
                                        onClick={handleTargetserviceGrade}

                                      >
                                        {j?.grade}
                                      </MenuItem>
                                    )
                                    )}
                        </Menu>
                        {icon3 && <FilterAltTwoToneIcon />}
                        </Stack> */}
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
                                      sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                      size="small"
                                      style={{ padding: "3px", paddingLeft: "14px", height: "0px" }}
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
                                        fontSize: "14px",
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
                                        sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                        size="small"
                                        style={{ padding: "3px", paddingLeft: "14px", height: "0px" }}
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
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                    size="small"
                                    style={{ padding: "3px", paddingLeft: "14px", height: "0px" }}
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
                                      fontSize: "14px",
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
                                      size="small"
                                      style={{ padding: "3px", paddingLeft: "14px", height: "0px" }} checked={sectionsFilter.indexOf(option) > -1}
                                      sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
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
                            {icon4 && <FilterAltTwoToneIcon />}
                          </Stack>
                        </FormControl>
                      </TableCell>}
                      <TableCell align="center" width="6%">
                        <div
                          style={{
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            border: "none",
                            background: "none",
                            maxWidth: "80px",
                          }}
                        >
                          Status
                        </div>
                      </TableCell>
                      {columnHeadersDisplay?.Status &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Pending Action
                        </TableCell>}

                      {/* {columnHeadersDisplay?.Ependingaction &&
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Pending Action
                    </TableCell>} */}

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
                          Appraiser Rating
                        </TableCell>}
                      {columnHeadersDisplay?.Revrating &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Reviewer Rating
                        </TableCell>}
                      {columnHeadersDisplay?.Normrating &&
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          HR Normalizer Rating
                        </TableCell>}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Employee Rating
                      </TableCell>
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
                      </TableCell>
                      {/* <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Previous PA Rating
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Potential Level
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Talent Category
                      </TableCell> */}
                      {/* {columnHeadersDisplay?.ViewPA &&
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      View PA
                    </TableCell>} */}
                      {/* {columnHeadersDisplay?.FirstName && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openFirstName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFirstName ? "true" : undefined}
                          onClick={handleClickFirstName}
                        >
                          <Stack direction="row" alignItems="center">
                          First Name
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"170px"
                          }}
                          anchorEl={anchorElnewFirstName}
                          open={openFirstName}
                          onClose={handleCloseFirstName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFirstName}
                           >None
                           </MenuItem>
                         
                          {users
                              ?.slice()
                              ?.sort(function (a: any, b: any) {
                                return a.first_name - b.first_name;
                              })
                              ?.filter((item: any, index: any, array: any) => array?.map(
                                (data: any) => {
                                  return data.first_name
                                }).indexOf(item.first_name) === index)
                              ?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                    justifyContent:"left"
                                    //height:"200px"
                                  }}
                                  key={name.first_name}
                                  value={name.first_name}
                                  onClick={handleTargetFirstName}
                                >
                                  {name.first_name}
                                </MenuItem>
                              ))}
                        </Menu>
                        {icon5 && <FilterAltTwoToneIcon />}
                        </Stack> 
                      
                    </TableCell>}*/}
                      {/* {columnHeadersDisplay?.SupervisoryRole && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSupervisoryRole ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSupervisoryRole ? "true" : undefined}
                          onClick={handleClickSupervisoryRole}
                        >
                          <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              
                            }}
                          >
                           
                            Supervisory Role
                          </span>
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"300px"
                          }}
                          anchorEl={anchorElnewSupervisoryRole}
                          open={openSupervisoryRole}
                          onClose={handleCloseSupervisoryRole}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"100px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSupervisoryRole}
                           >None
                           </MenuItem>
                         
                          {sNSvalues
                             ?.slice()
                             ?.sort(function (a: any, b: any) {
                               return a?.isSupervisor?.localeCompare(
                                 b?.isSupervisor
                               );
                             })
                             ?.filter((item: any, index: any, array: any) => array?.map(
                              (data: any) => {
                                return data?.isSupervisor
                              }).indexOf(item?.isSupervisor) === index)
                              ?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                    justifyContent:"left",
                                    width:"100px"
                                    //height:"200px"
                                  }}
                                  key={name}
                                  value={name}
                                  onClick={handleTargetSupervisoryRole}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                        </Menu>
                        {icon9 && <FilterAltTwoToneIcon />}
                        </Stack>
                      
                    </TableCell>} */}
                      {/* <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >Appraiser Name</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >Reviewer Name</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >HR Normalizer Name</TableCell> */}
                      {/* {columnHeadersDisplay?.Function && <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <FormControl sx={{ width: 120, height: "0" }}>
                          <Stack direction="row" alignItems="center" justifyContent="center">
                            <span>Function </span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={empFunction}
                              onChange={handleChangeFunction}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key="Sales"
                                value="Sales"
                              >
                                Sales
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key="Non-Sales"
                                value="Non-Sales"
                              >
                                Non-Sales
                              </MenuItem>

                            </Select>
                          </Stack>
                        </FormControl>
                      </TableCell>} */}
                      {/* {columnHeadersDisplay?.ServiceReferenceDate && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}
                    >
                       <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRefDate ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRefDate ? "true" : undefined}
                          onClick={handleClickserviceRefDate}
                        >
                          <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                            minWidth:"105px"
                            }}
                          >
                          Service Reference Date
                          </span>
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"190px"
                          }}
                          anchorEl={anchorElnewserviceRefDate}
                          open={openserviceRefDate}
                          onClose={handleCloseserviceRefDate }
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"110px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceRefDate}
                           >None
                           </MenuItem>
                           {serviceRef?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetserviceRefDate}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon8 && <FilterAltTwoToneIcon />}
                        </Stack> 
                      
                    </TableCell>} */}
                      {/* {columnHeadersDisplay?.PositionCode && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openPositionCode  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openPositionCode  ? "true" : undefined}
                          onClick={handleClickPositionCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Position Code
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"140px"
                          }}
                          anchorEl={anchorElnewPositionCode}
                          open={openPositionCode}
                          onClose={handleClosePositionCode}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetPositionCode}
                           >None
                           </MenuItem>
                         
                           {positioncodeArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetPositionCode}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon7 && <FilterAltTwoToneIcon />}
                        </Stack>
                      
                    </TableCell>} */}
                      {/* {columnHeadersDisplay?.division && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openDivision ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openDivision ? "true" : undefined}
                          onClick={handleClickDivision}
                        >
                          <Stack direction="row" alignItems="center">
                           Division
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"150px"
                          }}
                          anchorEl={anchorElnewDivision}
                          open={openDivision}
                          onClose={handleCloseDivision}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetDivision}
                           >None
                           </MenuItem>
                         
                           {divisionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetDivision}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon3 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span> Division </span>
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            value={empdivisions}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangedivisions}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>

                            {divisionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon3 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}

                      {/* {columnHeadersDisplay?.SubSection && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Sub Section </span>
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            value={empSubSection}
                            onChange={handleChangeSubSection}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {subSectionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon10 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl>
                    </TableCell>} */}
                      {/* {columnHeadersDisplay?.ManagerCode &&<TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubManagerCode ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerCode ? "true" : undefined}
                          onClick={handleClickManagerCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Code
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"200px"
                          }}
                          anchorEl={anchorElnewManagerCode}
                          open={openSubManagerCode}
                          onClose={handleClosManagerCode}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"100px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetManagerCode}
                           >None
                           </MenuItem>
                         
                           {managerCodeArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetManagerCode}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon12 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Manager Code </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empManagerCode}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeManagerCode}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {managerCodeArray
                            
                            ?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon12 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?. ManagerName && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSubManagerName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerName ? "true" : undefined}
                          onClick={handleClickManagerName}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Name
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"290px"
                          }}
                          anchorEl={anchorElnewManagerName}
                          open={openSubManagerName}
                          onClose={handleClosManagerName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetManagerName}
                           >None
                           </MenuItem>
                         
                           {managerNameArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetManagerName}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon13 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Manager Name </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empManagerName}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeManagerName}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {managerNameArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon13 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.ManagerPosition && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                       <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubManagerPosition ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerPosition ? "true" : undefined}
                          onClick={handleClickManagerPosition}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Position
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"270px"
                          }}
                          anchorEl={anchorElnewManagerPosition}
                          open={openSubManagerPosition}
                          onClose={handleClosManagerPosition}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetManagerPosition}
                           >None
                           </MenuItem>
                         
                           {managerPositionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetManagerPosition}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon18 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row">
                          <span>Manager Position </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empManagerPosition}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeManagerPosition}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {managerPositionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon18 && (
   <FilterAltTwoToneIcon />
    )} 
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.WorkLocation && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubWorkLocation ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubWorkLocation ? "true" : undefined}
                          onClick={handleClickWorkLocation}
                        >
                          <Stack direction="row" alignItems="center">
                          Work Location
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"200px"
                          }}
                          anchorEl={anchorElnewWorkLocation}
                          open={openSubWorkLocation}
                          onClose={handleClosWorkLocation}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"105px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetWorkLocation}
                           >None
                           </MenuItem>
                         
                           {workLocationArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetWorkLocation}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon17 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Work Location </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empWorkLocation}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeWorkLocation}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {workLocationArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon17 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.GradeSet && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                       <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubGradeSet ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubGradeSet ? "true" : undefined}
                          onClick={handleClickGradeSet}
                        >
                       <Stack direction="row" alignItems="center">
                          Grade set
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"190px"
                          }}
                          anchorEl={anchorElnewGradeSet}
                          open={openSubGradeSet}
                          onClose={handleClosGradeSet}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetGradeSet}
                           >None
                           </MenuItem>
                         
                           {gradeSetArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetGradeSet}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon11 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Grade set </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empGradeset}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeGradeset}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {gradeSetArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon11 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.JobCode && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubJobCode ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobCode ? "true" : undefined}
                          onClick={handleClickJobCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Code
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"130px"
                          }}
                          anchorEl={anchorElnewJobCode}
                          open={openSubJobCode}
                          onClose={handleClosJobCode}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetJobCode}
                           >None
                           </MenuItem>
                         
                           {jobCodeArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetJobCode}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon15 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Job Code </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empJobcode}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeJobcode}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {jobCodeArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon15 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.JobTitle && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                       <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubJobTitle ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobTitle ? "true" : undefined}
                          onClick={handleClickJobTitle}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Title
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"140px"
                          }}
                          anchorEl={anchorElnewJobTitle}
                          open={openSubJobTitle}
                          onClose={handleClosJobTitle}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetJobTitle}
                           >None
                           </MenuItem>
                         
                           {jobTitleArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetJobTitle}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon14 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Job Title </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empjobtitle}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeempjobtitle}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {jobTitleArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon14 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
                      {/* {columnHeadersDisplay?.JobLevel && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubJobLevel ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobLevel ? "true" : undefined}
                          onClick={handleClickJobLevel}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Level
                            <ArrowDropDownOutlinedIcon />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"165px"
                          }}
                          anchorEl={anchorElnewJobLevel}
                          open={openSubJobLevel}
                          onClose={handleClosJobLevel}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetJobLevel}
                           >None
                           </MenuItem>
                            {jobLevelArray?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                  }}
                                  key={name}
                                  value={name}
                                  onClick={handleTargetJobLevel}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                        </Menu>
                        {icon16 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>Job Level </span> */}
                      {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                      {/* <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empjoblevel}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeempjoblevel}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                          >
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="None"
                              value="None"
                            >
                              None
                            </MenuItem>
                            {jobLevelArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon16 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl> */}
                      {/* </TableCell>} */}
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
                          b?.current_rating?.overall_rating - a?.current_rating?.overall_rating // Sort by pa_rating in descending order
                      )
                      ?.filter((j: any) => {
                        if (empFullName === "None" || empFullName === "") {
                          return j;
                        } else {
                          return j?.legal_full_name
                            ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
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
                              .toLocaleLowerCase()
                              .includes(empdivisions.toLocaleLowerCase());
                          }
                        })?.filter((j: any) => {
                          if (empFirstName === "None" || empFirstName === "") {
                            return j;
                          } else {
                            return j?.first_name
                              ?.toLocaleLowerCase()
                              ?.includes(empFirstName?.toLocaleLowerCase());
                          }
                        })?.filter((j: any) => {
                          if (
                            empPositionCode === "None" ||
                            empPositionCode === ""
                          ) {
                            return j;
                          } else {
                            return j?.position_code
                              ?.toLocaleLowerCase()
                              ?.includes(empPositionCode?.toLocaleLowerCase());
                          }
                        })?.filter((j: any) => {
                          if (empService === "None" || empService === "") {
                            return j;
                          } else {
                            return j.service_reference_date
                              .toLocaleLowerCase()
                              .includes(empService.toLocaleLowerCase());
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
                              ?.toLocaleLowerCase()
                              .includes(empSubSection.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empGradeset === "None" || empGradeset === "") {
                            return j;
                          } else {
                            return j?.grade_set
                              ?.toLocaleLowerCase()
                              ?.includes(empGradeset?.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empManagerCode === "None" || empManagerCode === "") {
                            return j;
                          } else {
                            return j?.manager_code
                              ?.toLocaleLowerCase()
                              ?.includes(empManagerCode?.toLocaleLowerCase());
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
                              ?.toLocaleLowerCase()
                              ?.includes(empManagerPosition?.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empManagerName === "None" || empManagerName === "") {
                            return j;
                          } else {
                            return j?.manager_name
                              ?.toLocaleLowerCase()
                              ?.includes(empManagerName?.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empjobtitle === "None" || empjobtitle === "") {
                            return j;
                          } else {
                            return j?.job_title
                              ?.toLocaleLowerCase()
                              ?.includes(empjobtitle?.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empJobcode === "None" || empJobcode === "") {
                            return j;
                          } else {
                            return j?.job_code
                              ?.toLocaleLowerCase()
                              ?.includes(empJobcode?.toLocaleLowerCase());
                          }
                        })
                        .filter((j: any) => {
                          if (empjoblevel === "None" || empjoblevel === "") {
                            return j;
                          } else {
                            return j?.job_level
                              ?.toLocaleLowerCase()
                              ?.includes(empjoblevel?.toLocaleLowerCase());
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
                              ?.toLocaleLowerCase()
                              ?.includes(empWorkLocation?.toLocaleLowerCase());
                          }
                        })
                        // .filter((j: any) => {
                        //   if (sectionsFilter === "None" || sectionsFilter === "") {
                        //     return j;
                        //   } else {
                        //     return j.section
                        //       .toLocaleLowerCase()
                        //       .includes(sectionsFilter.toLocaleLowerCase());
                        //   }
                        // })
                        .filter((item1: any) => {
                          if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
                            return item1;
                          } else {
                            return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
                          }
                        })
                        // sectionsFilter
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
                              {/* <TableCell padding="checkbox">

                              <input

                                name={j._id}

                                checked={j.normalizerIsChecked}
                                onChange={handleOnCheck}
                                type="checkbox"
                                style={{
                                  height: "18px",
                                  width: "18px",
                                  borderColor: "#D5D5D5",
                                  cursor: "pointer"
                                }}
                                disabled={j.normalizerIsDisabled}

                              />
                            </TableCell> */}
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
                                {j.legal_full_name}
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
                                  paddingRight: "38px"
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
                              <TableCell
                                align="center">

                                {getStatus(j?.appraisal?.status)}
                              </TableCell>
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
                                {/* {getPAStatus(j)} */}
                                {getpaStatus(j.appraisal.pa_status) }
                                {/* {j.appraisal.pa_status} */}
                              </TableCell>}


                              {columnHeadersDisplay?.Apprating && <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  wordBreak: "break-word",
                                  /******************Appraiser rating should be red if appraiser rejected : should be blue only if there
                           * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                                  color:
                                    j.appraisal.appraiser_PA_rejected == true ? "red" :
                                      (j.appraisal.status == "rejected" && j.appraisal.appraiser_PA_accepted == true &&
                                        (j.appraisal.appraiser_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                                }}
                              >
                                {j.appraisal?.appraiser_rating == 0 ? (
                                  <span> - </span>
                                ) : (
                                  j.appraisal?.appraiser_rating?.toFixed(2)
                                )}
                              </TableCell>}
                              {columnHeadersDisplay?.Revrating && <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  wordBreak: "break-word",
                                  /******************Reviewer rating should be red if Reviewer rejected : should be blue only if there
                         * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
                                  color:
                                    (j?.reviewer?.reviewer_PA_rejected === true) ? "red" :
                                      (j.appraisal.status == "rejected" && j?.reviewer?.reviewer_PA_accepted == true &&
                                        (j.reviewer.reviewer_rating !== j.normalizer?.normalized_overallRating)) ? "#1976d2" : "#333333"
                                }}
                              >
                                {
                                  // j.reviewerIsDisabled &&
                                  (j.reviewer.reviewer_rating == 0) ? (
                                    <span> - </span>
                                  ) : (
                                    j.reviewer.reviewer_rating?.toFixed(2)
                                  )}
                              </TableCell>}
                              {columnHeadersDisplay?.Normrating && <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  // color: "#333333",
                                  wordBreak: "break-word",
                                  color:
                                    /******************Normalizer rating should be red if Normalizer rejected : should be blue only if there
                             * is change in the rating that is ,if it is different from the normalized rating else it should be black*******************/
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
                              </TableCell>}
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: (j?.appraisal?.status == "rejected" || j.employee.employee_status === "rejected") ? "red" : "#333333",
                                  wordBreak: "break-word",
                                }}
                              >
                                {
                                  // j.reviewerIsDisabled &&
                                  (j?.employee?.employee_rating == 0) ? (
                                    <span> - </span>
                                  ) : (
                                    j?.employee?.employee_rating?.toFixed(2)
                                  )}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  wordBreak: "break-word",
                                }}
                              >
                                {/******************** If overall rating is changed with respect to the normalized rating then 
                      * rating will be in blue else black***************************/}
                                {(j?.appraisal?.status === "completed" && j?.employee?.employee_status === "rejected" &&
                                  (j?.normalizer?.normalizer_rating !== j.normalizer?.normalized_overallRating)) ? (
                                  <span style={{ color: "#1976d2" }}>{j?.current_rating?.overall_rating?.toFixed(2)}</span>
                                ) : (j?.appraisal?.status === "completed") ? (<span>{j?.current_rating?.overall_rating?.toFixed(2)}</span>) :
                                  "-"
                                }

                              </TableCell>

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
                              {/* {columnHeadersDisplay?.ViewPA &&<TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                        padding:"0px"
                      }}
                    >
                         <Link
                                    to={`${VIEW_PA}/employee/${j._id}`}
                                    target="_blank"
                                  >
                      <img src={Eye} alt="icon" />
                      </Link>
                    </TableCell>} */}
                              {/* { columnHeadersDisplay?.FirstName &&<TableCell
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      {j?.first_name}
                    </TableCell>} */}
                              {/* {columnHeadersDisplay?.SupervisoryRole &&<TableCell
                          align="center"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.isSupervisor != undefined ? "SP" : "N-SP"}
                          </TableCell>} */}
                              {/* <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.reviewer_previous_submission?.reviewer_rating}
                            </TableCell>
                            <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.appraisal?.potential}
                            </TableCell>
                            <TableCell
                              align="center"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.talent_category}
                            </TableCell>
                            <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.appraiser_name}
                            </TableCell>
                            <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.reviewer_name}
                            </TableCell>
                            <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {j?.normalizer_name}
                            </TableCell>
                            {columnHeadersDisplay?.Function && <TableCell
                              align="left"
                              // width={250}
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              Sales/Non-Sales
                            </TableCell>} */}
                              {/* {columnHeadersDisplay?.ServiceReferenceDate &&  <TableCell
                            align="center"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.service_reference_date}
                          </TableCell>}
                          {columnHeadersDisplay?.PositionCode &&<TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.position_code}
                          </TableCell>}
                         {columnHeadersDisplay?.division && <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.division}
                          </TableCell>} */}

                              {/* {columnHeadersDisplay?.SubSection &&<TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j["sub section"]}
                          </TableCell>} */}
                              {/* {columnHeadersDisplay?.ManagerCode &&<TableCell
                            align="center"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.manager_code}
                          </TableCell>}
                         {columnHeadersDisplay?. ManagerName && <TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.manager_name}
                          </TableCell>}
                         {columnHeadersDisplay?.ManagerPosition && <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.manager_position}
                          </TableCell>}
                         {columnHeadersDisplay?.WorkLocation &&  <TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.work_location}
                          </TableCell>}
                         {columnHeadersDisplay?.GradeSet &&  <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.grade_set}
                          </TableCell>}
                         {columnHeadersDisplay?.JobCode &&  <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.job_code}
                          </TableCell>}
                          {columnHeadersDisplay?.JobTitle && <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                           {j?.job_title}
                          </TableCell>}
                         {columnHeadersDisplay?.JobLevel &&  <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.job_level}
                          </TableCell>} */}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  ) : (
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
              </Scroll>
            </TableContainer>
          </TableHeadings>
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
        </div>
        <Dialog
          fullWidth
          maxWidth="md"
          open={opendialog}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",

            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          {reasonSelection && (
            <Alert severity="error">
              Please select atleast one employee.
            </Alert>
          )}
          <DialogContent style={{ marginTop: "30px" }}>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              Please select rejection reason(s)
              <div style={{ textAlign: "center", marginLeft: "37%" }}>
                <Stack sx={{ textAlign: "left", marginTop: "15px" }} spacing={1}>
                  <div>
                    <input
                      type="checkbox"
                      name="allselect"
                      onChange={handlecheckbox}
                      checked={
                        checkboxUser.filter(
                          (reasons: any) => reasons?.isChecked !== true
                        )?.length < 1
                      }
                    />
                    <label style={{ color: "#1976d2" }}>Select all</label>
                  </div>
                  {checkboxUser.map((reasons: any) => (
                    <div>
                      <input
                        type="checkbox"
                        name={reasons.reason}
                        checked={reasons?.isChecked || false}
                        onChange={handlecheckbox}
                      />
                      <label>{reasons.reason}</label>
                    </div>
                  ))}
                </Stack>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              paddingBottom: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                // width: "92px",
                // height: "35px",
                textTransform: "none",
                backgroundColor: "#004D77",
                fontSize: "15px",
                // padding: "4px 22px",
                color: "#FFFFFF",
                fontFamily: "regular",
                borderRadius: "5px",
              }}
              onClick={(e) => {
                handleSubmit(e);
              }}
              autoFocus
            >
              Submit
            </Button>
            <Button
              style={{
                width: "92px",
                height: "35px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "regular",
                color: "#1976d2",
                opacity: "80%",
                padding: "4px 22px",
                border: "1px solid #1976d2",
                borderRadius: "5px",
              }}
              onClick={handleDialogNo}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
