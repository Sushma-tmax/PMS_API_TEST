import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, FormControlLabel, MenuItem, IconButton, FormControl, Alert } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, Drawer, TextField } from "@mui/material";
import Expand from "../../assets/Images/Expand.svg";
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
import Searchlensreview from "../../reviewerMain/Reviewericons/Searchlensreview.svg";
import Newexcel from "../../reviewerMain/Reviewericons/Newexcel.svg";
import Updown from "../../Dashboard/Reviewericons/Updown.svg";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import Eye from "../Reviewericons/Eyeicon.svg";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import {
  useAcceptReviewerMutation,
  useGetEmployeeByFilterQuery,
  useGetEmployeeByManagerCodeQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useGetReviewerEmployeeByFilterQuery,
  useRejectReviewerAppraisalEmployeeMutation
} from "../../../service";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  APPRAISER_ACTION,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  VIEW_PAST_PA,
  REVIEWER_PAGE,
  REVIEWER_APPROVE
} from "../../../constants/routes/Routing";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import TablePagination from "@mui/material/TablePagination";
import { Link, useNavigate } from "react-router-dom";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import { Scrollbar } from "react-scrollbars-custom";
import { useAcceptReviewerRatingsMutation } from "../../../service/employee/appraisal/appraisal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const userDatas = [
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
  const { data: user } = useLoggedInUser();
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,
  position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,
  reviewerIsDisabled,first_name,service_reference_date,position_code,division,section,sub section,manager_code,manager_name,manager_position,work_location,grade_set,job_code,job_level,job_title`
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
    React.useEffect(() => {
        if (user?.calendar?._id !== undefined) {
            setappCalId(user?.calendar?._id)
        }

    }, [user])
    const { data: userData } = useGetEmployeeByFilterQuery(`?select=employee_code&employee_code=${user?.appraiser}`)
    const { data: employeeData } = useGetEmployeeByFilterQuery(
        `?manager_code=${userData?.data[0]?.employee_code}&calendar=${appCalId}&limit=600&select=${SELECT_FOR_DASHBOARD}`
    );
  //   const { data: employeeData } = useGetEmployeeByFilterQuery(
//     `?manager_code=${user?.employee_code}&limit=600&select=${SELECT_FOR_DASHBOARD}`
//   );
  const { data: employeeData1, refetch } = useGetEmployeeQuery("all");
  const listInnerRef = useRef<any>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [enteredName, setenteredName] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)
  const [myAppraisals, setMyAppraisals] = useState<any>([]);
  const [acceptReviewer] = useAcceptReviewerMutation();
  const [acceptReviewerRatings] = useAcceptReviewerRatingsMutation();
  const [rejectReviewer] = useRejectReviewerAppraisalEmployeeMutation();
  //Data for populating the table
  console.log(users,"users")
  console.log(myAppraisals,"usersm")
  // console.log( employeeData," employeeData")
  // console.log( employeeData1," employeeData1")
  useEffect(() => {
    // setUsers(employeeData?.data);
    let appraisals = employeeData1?.data?.filter(
        (emp: any) => emp.manager_code == user?.employee_code
      );
      let reviewer = appraisals?.map((i: any) => {
        return employeeData1?.data?.filter((j: any) =>
          j?.manager_code == i?.employee_code
        )
      }
      ).flat()
      //setUsers(employeeData?.data);
      setUsers(reviewer);
      setMyAppraisals(reviewer);
  }, [employeeData1]);

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
      return " Pending with Normalizer";
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
      return " Pending with Normalizer";
    else if (j?.normalizer?.normalizer_status == "accepted")
      return " Pending with Employee";
    else if (j?.normalizer?.normalizer_status === "draft")
      return " Pending with Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j?.reviewer?.rejection_count == 3 &&
      (j?.normalizer?.normalizer_status == "pending" || j?.normalizer?.normalizer_status == "draft")
    )
      return " Pending with Normalizer";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with Normalizer";
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

  useEffect(() => {
    settablecount(users?.length)
  }, [users]);

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
         maxWidth: 400,
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
   if (employeeCode === "None" || employeeCode === "") {
     setIcon(false);
   } else {
     setIcon(true);
   }
 }, [employeeCode])
 useEffect(() => {
   if (employeeName === "None" || employeeName === "") {
     setIcon1(false);
   } else {
     setIcon1(true);
   }
 }, [employeeName])
 useEffect(() => {
   if (positions === "None" || positions === "") {
     setIcon2(false);
   } else {
     setIcon2(true);
   }
 }, [positions])
 useEffect(() => {
   if (empgrades === "None" || empgrades === "") {
     setIcon3(false);
   } else {
     setIcon3(true);
   }
 }, [empgrades])
 React.useEffect(()=>{
  if (empdivisions === "None" || empdivisions === "") 
  {
    setIcon3(false);
} else {
  setIcon3(true);
}
},[empdivisions])
React.useEffect(()=>{
  if (empFullName === "None" || empFullName === "") 
  {
    setIcon4(false);
} else {
  setIcon4(true);
}
},[empFullName])
React.useEffect(()=>{
  if (empFirstName === "None" || empFirstName === "") 
  {
    setIcon5(false);
} else {
  setIcon5(true);
}
},[empFirstName])
React.useEffect(()=>{
  if (empFunction === "None" || empFunction === "") 
  {
    setIcon6(false);
} else {
  setIcon6(true);
}
},[empFunction])
React.useEffect(()=>{
  if (empPositionCode === "None" || empPositionCode === "") 
  {
    setIcon7(false);
} else {
  setIcon7(true);
}
},[empPositionCode])
React.useEffect(()=>{
  if (empService === "None" || empService === "") 
  {
    setIcon8(false);
} else {
  setIcon8(true);
}
},[empService])
React.useEffect(()=>{
  if (sNS === "None" || sNS === "") 
  {
    setIcon9(false);
} else {
  setIcon9(true);
}
},[sNS])
React.useEffect(()=>{
  if (empSubSection === "None" || empSubSection === "") 
  {
    setIcon10(false);
} else {
  setIcon10(true);
}
},[empSubSection])
React.useEffect(()=>{
  if (empGradeset === "None" || empGradeset === "") 
  {
    setIcon11(false);
} else {
  setIcon11(true);
}
},[empGradeset])
React.useEffect(()=>{
  if (empManagerCode === "None" || empManagerCode === "") 
  {
    setIcon12(false);
} else {
  setIcon12(true);
}
},[empManagerCode])
React.useEffect(()=>{
  if (empManagerName === "None" || empManagerName === "") 
  {
    setIcon13(false);
} else {
  setIcon13(true);
}
},[empManagerName])
React.useEffect(()=>{
  if (empjobtitle === "None" || empjobtitle === "") 
  {
    setIcon14(false);
} else {
  setIcon14(true);
}
},[empjobtitle])
React.useEffect(()=>{
  if (empJobcode === "None" || empJobcode === "") 
  {
    setIcon15(false);
} else {
  setIcon15(true);
}
},[empJobcode])
React.useEffect(()=>{
  if (empjoblevel === "None" || empjoblevel === "") 
  {
    setIcon16(false);
} else {
  setIcon16(true);
}
},[empjoblevel])
React.useEffect(()=>{
  if (empWorkLocation === "None" || empWorkLocation === "") 
  {
    setIcon17(false);
} else {
  setIcon17(true);
}
},[empWorkLocation])
React.useEffect(()=>{
  if (empManagerPosition === "None" || empManagerPosition === "") 
  {
    setIcon18(false);
} else {
  setIcon18(true);
}
},[empManagerPosition])
  //drawer functions
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };
  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setheadingSortAccept(false);
  };
  const handleOpenGrade = () => {
    setOpenGrade(true);
  };
  const [headingSortAccept, setheadingSortAccept] = React.useState(false);
  // console.log(heading1,headingSortAccept, "h1");
  const sNSvalues = [,"N-SP","S"];
 
  const [heading1Dis, setheading1Dis] = React.useState(true);
  const [heading2Dis, setheading2Dis] = React.useState(true);
  const [heading3Dis, setheading3Dis] = React.useState(true);
  const [heading1, setheading1] = React.useState(true);
  const [columnHeaders, setcolumnHeaders] = useState<any>({
    Ecode : true,
    Ename : true,
    Eposition : true,
    EGrade : true,
    Ependingaction : true,
    Apprating : true,
    Revrating : true,
    Normrating : true,
    Status : true,
    ViewPA : true,
    FirstName : true,
    SupervisoryRole : true,
    Function : true,
    ServiceReferenceDate : true,
    PositionCode : true,
    division : true,
    Section : true,
    SubSection : true,
    ManagerCode : true,
    ManagerName : true,
    ManagerPosition : true,
    WorkLocation : true,
    GradeSet : true,
    JobCode : true,
    JobTitle : true,
    JobLevel :true
    })
    const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
      Ecode : true,
      Ename : true,
      Eposition : true,
      EGrade : true,
      Ependingaction : true,
      Apprating : true,
      Revrating : true,
      Normrating : true,
      Status : true,
      ViewPA : true,
      FirstName : true,
      SupervisoryRole : true,
      Function : true,
      ServiceReferenceDate : true,
      PositionCode : true,
      division : true,
      Section : true,
      SubSection : true,
      ManagerCode : true,
      ManagerName : true,
      ManagerPosition : true,
      WorkLocation : true,
      GradeSet : true,
      JobCode : true,
      JobTitle : true,
      JobLevel :true
    })
   //console.log(columnHeaders,columnHeadersDisplay, "h1");
  const handleheadingSortAccept = () => {
    // setheadingSortAccept(true);
    // setheading1Dis(heading1)
    // setcolumnHeadersDisplay(columnHeaders);
    // setisDrawerOpen(false);
    let temp = {...columnHeaders}

    setcolumnHeadersDisplay(temp);

    setisDrawerOpen(false);
  };
  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setheading1(event.target.checked);
    let columnHeadersTemp = columnHeaders
 
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
   
  };
  const [heading2, setheading2] = React.useState(true);
  // console.log(heading2, "h2");
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading3, setheading3] = React.useState(true);
  // console.log(heading3, "h3");
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingSN, setheadingSN] = React.useState(true);
  // console.log(headingSN, "h1");
  const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingSN(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading4, setheading4] = React.useState(true);
  // console.log(heading4, "h4");
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
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
  //console.log(heading1,headingSortAccept,heading1Dis, "h,hsa,hd");
 //Alerts to dialogs
 const [openAlert, setOpenAlert] = React.useState(false);
 const [error, setError] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [reasonSelection, setreasonSelection] = React.useState(false);
  const [checkboxUser, setcheckboxUser] = React.useState<any>([]);
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const handleDialogOpen = () => {
    setOpendialog(true);
  };

  const handleDialogClose = () => {
    setOpendialog(false);
    setIsOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setApproved(false);
  };
 const handleCloseAlert = () => {
   setOpenAlert(false);
   setError(false);
   setzeroselectApprove(false);
   seterrorApprove(false);
   setzeroselect(false);
 };
 //Alerts to dialogs
 const checkboxHandler = (checkbox: any) => {
  if (checkbox) {
    const res = checkbox.filter((i: any) => {
      return i.reviewerIsChecked === true && !i.reviewerIsDisabled;
    });
    return res;
  }
};
 const checkboxIdHandler = (res: any) => {
  if (res) {
    const check = res?.map((i: any) => {
      return i?._id;
    });
    console.log(check, "check");
    return check;
  }
};
  //Approve dialog
 const [errorApprove, seterrorApprove] = React.useState(false);
 const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
 const handleApprove = () => {
   const rejectfilter = myAppraisals.filter((i: any) => {
     return i?.reviewerIsChecked === true && i?.reviewerIsDisabled === false;
   });
   if (rejectfilter?.length > 1) {
     seterrorApprove(true);
     setOpenAlert(true);
   } else if (rejectfilter?.length === 0) {
     setzeroselectApprove(true);
     setOpenAlert(true);
   } else {
     // return (
     //   acceptReviewer({
     //     id: checkboxIdHandler(checkboxHandler(users)),
     //   }),
     //   approvedSuccessfully()
     // );
     acceptReviewerRatings({ id: checkboxIdHandler(checkboxHandler(users)) }).then(() => {
       navigate(`${REVIEWER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)
     })


   }
 };
 //Approve dialog
 const approvedSuccessfully = () => {
  return setApproved(true)
};
 const bulkApproval = () => {
  console.log(users);
  // let myAppraisalsCode = myAppraisals?.map((item: any) => item?.employee_code);
  // // let myReviewalusers = users?.filter(
  // let myReviewalusers = users?.filter(
  //   (item: any) =>
  //     myAppraisalsCode.includes(item?.manager_code) && !item?.reviewerIsDisabled
  // );
  let myReviewalusers = myAppraisals.filter((item: any) => {
    return (!item.reviewerIsDisabled && !item.reviewerIsChecked && item.appraisal && item?.appraisal?.appraiser_status !== "appraiser-rejected")
  })
  let bulkUsers = myReviewalusers.map((user: any) => user?._id)
  const tempUser = myAppraisals?.map((j: any) => {
    //console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
    return bulkUsers.includes(j?._id) ? { ...j, reviewerIsChecked: true } : j;
  });
  setMyAppraisals(tempUser);
  console.log(myReviewalusers);
  console.log(checkboxIdHandler(myReviewalusers));
  acceptReviewer({ id: checkboxIdHandler(myReviewalusers) });
  approvedSuccessfully();
};
useEffect(() => {
  setcheckboxUser(userDatas);
}, []);
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
      reasons.reason === name ? { ...reasons, isChecked: checked } : reasons
    );
    setcheckboxUser(userReason);
  }
};

const handleSubmit = (e: any) => {
  const checkedfilter = checkboxUser
    ?.filter((i: any) => {
      console.log(i?.isChecked, "hhhhhhhhhhhhhhhhhhhhhhhh");
      return i?.isChecked === true || i?.isChecked === false;
    })
    ?.map((j: any) => {
      return {
        value: j?.value,
        isChecked: j?.isChecked,
      };
    });

  //console.log(checkedfilter, "ids");
  if (checkedfilter?.filter((k: any) => k?.isChecked === true)?.length === 0) {
    setreasonSelection(true);
  } else if (checkedfilter?.length > 0) {
    return (
      setreasonSelection(false),
      handleDialogClose(),
      rejectReviewer({ value: checkedfilter, id: checkedEmployeeid[0] }),
      navigate(`${REVIEWER_PAGE}/employee/${checkedEmployeeid[0]}`)
    );
  }
};
const handleOnCheck = (e: any) => {
  const { name, checked } = e.target;
  console.log(name, checked, "checked");
  const tempUser = myAppraisals?.map((j: any) => {
    //console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
    return j?._id === name ? { ...j, reviewerIsChecked: checked } : j;
  });
  setMyAppraisals(tempUser);
  console.log(tempUser, "temp");
};

const handleReject = () => {
  let userReason = checkboxUser?.map((reasons: any) => {
    return { ...reasons, isChecked: true };
  });
  setcheckboxUser(userReason);
  const checkedfilter = checkboxUser
    ?.filter((i: any) => {
      console.log(i.isChecked, "hhhhhhhhhhhhhhhhhhhhhhhh");
      return i?.isChecked === true || i?.isChecked === false;
    })
    ?.map((j: any) => {
      return {
        value: j?.value,
        isChecked: true,
      };
    });
  const rejectfilter = myAppraisals?.filter((i: any) => {
    return i?.reviewerIsChecked === true && i?.reviewerIsDisabled === false;
  });
  let checkedEmp = rejectfilter?.map((j: any) => j._id);
  if (rejectfilter?.length > 1) {
    setError(true);
    setOpenAlert(true);
  } else if (rejectfilter?.length === 0) {
    setzeroselect(true);
    setOpenAlert(true);
  } else {
    if (rejectfilter?.length > 0) {
      if (rejectfilter[0]?.reviewer?.reviewer_rating == "0") {
        rejectReviewer({ value: checkedfilter, id: checkedEmp[0] }).then(
          (data: any) => {
            navigate(`${REVIEWER_PAGE}/employee/${checkedEmp[0]}`);
          }
        );
      } else {
        navigate(`${REVIEWER_PAGE}/employee/${checkedEmp[0]}`);
      }
    }

  }
};

  return (
    <>
      
      <Box
        style={{
          marginLeft: "25px",
          marginRight: "25px",
          background: "#ffffff",
          padding: "20px",
          height: "650px",
          marginTop: "30px",
        }}
      >
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
              My Team
            </Typography>
            <div 
            // style={{ width: "50%" }}
            >
          {approved && (
            <Dialog
              open={open1}
              onClose={handleClose1}
              aria-labelledby="responsive-dialog-title"
              BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
            >
              <DialogContent>
                <DialogContentText
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
                >The performance appraisal has been submitted to the normalizer successfully.</DialogContentText>
              </DialogContent>
              <div style={{ alignItems: "center" }}>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleClose1}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
          )}

          <Dialog
            open={openAlert}
            onClose={handleCloseAlert}
            aria-labelledby="responsive-dialog-title"
            BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
          >
            <DialogContent>
              <DialogContentText
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
                    {/* Multiple employees cannot be rejected - select one employee. */}

                    Multiple employees cannot be rejected. Please select only one employee.
                  </div>
                  // </Alert>
                )}
                {zeroselect && (
                  // <Alert severity="error">
                  <div>

                    Please select atleast one employee.
                  </div>

                  // </Alert>
                )}
                {errorApprove && (
                  <div>
                    You cannot use the approval option. Please use Bulk Actions option.
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    marginRight: "10px",
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
            aria-labelledby="responsive-dialog-title"
            BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
          >
            <DialogContent>
              <DialogContentText
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
            <div style={{ alignItems: "center" }}>
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
                    marginRight: "10px",
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
            </div>
          </Dialog>
          <Dialog
        style={{
          marginTop: "110px",
          height: "calc(100vh - 250px)",
        }}
        BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
        fullWidth
        maxWidth="md"
        open={opendialog}
        // onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            fontFamily: "regular",
            backgroundColor: "#EBF1F5",
            color: "#004C75",
            fontSize: "18px",
            padding: "0px 20px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
          }}
          id="alert-dialog-title"
        >
          {"Rejection"}
          <p
            style={{
              display: "flex",
              float: "right",
              alignItems: "center",
            }}
          >
            <img
              width={18}
              height={18}
              src={Closeicon}
              onClick={handleDialogClose}
            />
          </p>
        </DialogTitle>
        {reasonSelection && (
          <Alert severity="error">
            Atleast one employees should be selected - select one employee!
          </Alert>
        )}
        <DialogContent style={{ marginTop: "30px" }}>
          <DialogContentText
            style={{
              // marginTop: "100px",
              // marginLeft: "270px",
              fontSize: "14px",
              color: "#333333",
              fontFamily: "regular",
              textAlign: "center",
            }}
            id="alert-dialog-description"
          >
            Please select rejection reason(s)
            <div style={{ textAlign: "center", marginLeft: "37%" }}>
              <Stack sx={{ textAlign: "left", marginTop: "15px" }} spacing={1}>
                <div>
                  <input
                    type="checkbox"
                    name="allselect"
                    onChange={handlecheckbox}
                    // checked={
                    //   checkboxUser?.filter(
                    //     (reasons: any) => reasons?.isChecked !== true
                    //   )?.length < 1
                    // }
                  />
                  <label style={{ color: "#1976d2" }}>Select all</label>
                </div>
                {/* {checkboxUser?.map((reasons: any) => (
                  <div>
                    <input
                      type="checkbox"
                      name={reasons.reason}
                      checked={reasons?.isChecked || false}
                      onChange={handlecheckbox}
                    />
                    <label>{reasons.reason}</label>
                  </div>
                ))} */}
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
              width: "92px",
              height: "35px",
              textTransform: "none",
              backgroundColor: "#004D77",
              fontSize: "15px",
              padding: "4px 22px",
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
        
        </DialogActions>
      </Dialog>
        </div>
            <div>
              <Stack direction="row" spacing={2} alignItems="center">
              <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
             // marginRight: "20px",
              background: "transparent",
              height: "35px",
              width: "150px",
              color: "#3e8cb5"
            }}
            variant="outlined"
           onClick={handleClickOpen}
          >
            Bulk Acceptance
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
            onClick={() => {
              handleApprove();
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
          </Button>
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
                      onChange={(e) => setenteredName(e.target.value)}
                    />
                    {/* <img
                      src={Updown}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                    /> */}
                    <img
                      src={Newexcel}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px" }}
                    />
                  </div>
                </Searchfeild>
                <Button
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
                </Button>
              </Stack>
            </div>
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => {
                setisDrawerOpen(false);
              }}
            >
              <Box sx={{ paddingLeft: "10px"}}>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  variant="subtitle1"
                  align="center"
                >
                  Choose Fields
                </Typography>
                <Stack direction="column" width="250px">
                <Scroll>
                <Scrollbar 
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
                      <Checkbox checked={heading1} name="Ecode" onChange={handleheadingEcode} />
                    }
                    label="ECode"
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
                      <Checkbox checked={heading2} name="Ename" onChange={handleheading2} />
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
                      <Checkbox checked={heading3} name="Eposition" onChange={handleheading3} />
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
                        checked={headingSN}
                        name="EGrade"
                        onChange={handleheadingSN}
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
                        checked={heading19}
                        name="Ependingaction"
                        onChange={handleheading19}
                      />
                    }
                    label="Pending Action"
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
                      <Checkbox checked={heading4} name="Apprating" onChange={handleheading4} />
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
                      <Checkbox checked={heading5} name="Revrating" onChange={handleheading5} />
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
                      <Checkbox checked={heading6} name="Normrating" onChange={handleheading6} />
                    }
                    label="Normalizer Rating"
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
                      <Checkbox checked={heading7} name="Status" onChange={handleheading7} />
                    }
                    label="Status"
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
                      <Checkbox checked={heading8} name="ViewPA" onChange={handleheading8} />
                    }
                    label="View PA"
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
                      <Checkbox checked={firstNameVal} name="FirstName" onChange={handlefirstNameVal} />
                    }
                    label="First Name"
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
                        checked={SupRoleVal}
                        name="SupervisoryRole"
                        onChange={handleSupRoleVal}
                      />
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
                        checked={funcVal}
                        name="Function"
                        onChange={handlefuncVal}
                      />
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
                      checked={ServiceRefVal} 
                      name="ServiceReferenceDate"
                      onChange={handleServiceRefVal} />
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
                      checked={positionCodeVal} 
                      name="PositionCode"
                      onChange={handlepositionCodeVal} />
                    }
                    label="Position Code"
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
                      <Checkbox  name="division" checked={divisionVal} onChange={handledivisionVal } />
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
                      <Checkbox name="Section" checked={sectionVal} onChange={handlesectionVal} />
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
                        checked={heading10}
                        name="SubSection"
                        onChange={handleheading10}
                      />
                    }
                    label="Sub Section"
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
                        checked={heading11}
                        name="ManagerCode"
                        onChange={handleheading11}
                      />
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
                        checked={heading12}
                        name="ManagerName"
                        onChange={handleheading12}
                      />
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
                        checked={heading13}
                        name="ManagerPosition"
                        onChange={handleheading13}
                      />
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
                        checked={heading14}
                        name="WorkLocation"
                        onChange={handleheading14}
                      />
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
                        checked={heading15}
                        name="GradeSet"
                        onChange={handleheading15}
                      />
                    }
                    label="Grade Set"
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
                        checked={heading16}
                        name="Job Code"
                        onChange={handleheading16}
                      />
                    }
                    label="Job Code"
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
                        checked={heading17}
                        name="JobTitle"
                        onChange={handleheading17}
                      />
                    }
                    label="Job Title"
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
                        checked={heading18}
                        name="JobLevel"
                        onChange={handleheading18}
                      />
                    }
                    label="Job Level"
                  />
                </FormGroup>
                </div>
                </Scrollbar>
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
                  <TableCell align="center" width="5%"></TableCell>
                  {columnHeadersDisplay?.Ecode && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        maxWidth:"60px"
                      }}
                    >
                       <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                          </FormControl>
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
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                            </FormControl>
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
                       <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Position</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={positions}
                                  onChange={handleChangeposition}
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
                                   ?.sort(function (a:any, b:any) {return a.position_long_description.localeCompare(b.position_long_description);})
                                   ?.filter((item:any,index:any,array:any) => array.map((data:any)=>{return data.position_long_description}).indexOf(item.position_long_description) === index)
                                   ?.map((name: any) => (
                                      <MenuItem
                                        style={{ fontSize: "12px" }}
                                        key={name?.position_long_description}
                                        value={name?.position_long_description}
                                      >
                                        {name?.position_long_description}
                                      </MenuItem>
                                    )
                                    )}
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
                        maxWidth:"60px"
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span> Grade</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empgrades}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangegrades}
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
                                   ?.slice()?.sort(function (a:any, b:any) {   
                                    return a.grade - b.grade;   
                                  })?.filter((item:any,index:any,array:any) => array?.map((data:any)=>{return data.grade}).indexOf(item.grade) === index)    
                                  ?.map((j: any) => (
                                      <MenuItem
                                        style={{ fontSize: "12px" }}
                                        key={j?.grade}
                                        value={j?.grade}
                                      >
                                        {j?.grade}
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                                {icon3 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.Ependingaction &&
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
                      Normalizer Rating
                    </TableCell>}
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
                      Status
                    </TableCell>}
                    {columnHeadersDisplay?.ViewPA &&
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
                    </TableCell>}
                   {columnHeadersDisplay?.FirstName && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span>First Name </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                        value={empFirstName}
                            // value={personName}
                            // onChange={handleChanges}
                        onChange={handleChangeFirstName}
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
                            {/* {FirstName.map((name) => (
                            <MenuItem
                              // style={{ fontSize: "12px" }}
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))} */}
                            {users?.slice()
                            ?.sort(function (a: any, b: any) {
                              return a?.first_name?.localeCompare(b?.first_name);
                            }).filter((item:any,index:any,array:any) => array?.map(
                                (data:any)=>{
                                return data.first_name}).indexOf(item.first_name) === index)
                            .map((emp: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={emp.first_name}
                                value={emp.first_name}
                              >
                                {emp.first_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* {icon5 && (
                        <FilterAltTwoToneIcon />
                          )} */}
                        </Stack>
                      </FormControl>
                    </TableCell>}
                   {columnHeadersDisplay?.SupervisoryRole && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{  height: "0" }}>
                        <Stack direction="row">
                          <span
                          style={{
                            whiteSpace:"pre-line"
                          }}
                          > Supervisory Role</span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                        value={sNS}
                            // value={personName}
                            // onChange={handleChanges}
                        onChange={handleChangesNS}
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
                            {sNSvalues
                             ?.slice()
                             ?.sort(function (a: any, b: any) {
                               return a?.isSupervisor?.localeCompare(b?.isSupervisor);
                                      })
                            ?.filter((item:any,index:any,array:any) => array?.map(
                                        (data:any)=>{
                                        return data?.isSupervisor}).indexOf(item?.isSupervisor) === index)
                            .map((name) => (
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
                          {/* {icon9 && (
   <FilterAltTwoToneIcon />
    )} */}
                        
                        </Stack>
                      </FormControl>
                    </TableCell>}
                   {columnHeadersDisplay?.Function &&  <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row">
                          <span>Function </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                      value={empFunction}
                            // value={personName}
                            // onChange={handleChanges}
                       onChange={handleChangeFunction}
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
                            {/* 
                                {Sections.map((name) => (
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                           </Select>
                          {/* {icon6 && (
   <FilterAltTwoToneIcon />
    )}  */}
                        </Stack>
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.ServiceReferenceDate && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <FormControl sx={{width: 160, height: "0" }}>
                        <Stack direction="row">
                          <span  style={{
                            whiteSpace:"pre-line"
                          }}>Service Reference Date</span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empService}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeService}
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
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon8 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.PositionCode && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span> Position Code </span>
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            value={empPositionCode}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangePositionCode}
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
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon7 && (
   <FilterAltTwoToneIcon />
    )}
                        </Stack>
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.division && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row">
                          <span> Section </span>
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangesections}
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

                            {sectionArray?.map((name: any) => (
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
                        </Stack>
                      </FormControl>
                    </TableCell>}
                   {columnHeadersDisplay?.SubSection && <TableCell
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
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empSubSection}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeSubSection}
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
                    </TableCell>}
                    {columnHeadersDisplay?.ManagerCode &&<TableCell
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
                          <span>Manager Code </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                   {columnHeadersDisplay?. ManagerName && <TableCell
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
                          <span>Manager Name </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                  {columnHeadersDisplay?.ManagerPosition && <TableCell
                    align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row">
                          <span>Manager Position </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.WorkLocation && <TableCell
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
                          <span>Work Location </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.GradeSet && <TableCell
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
                          <span>Grade set </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.JobCode && <TableCell
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
                          <span>Job Code </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.JobTitle && <TableCell
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
                          <span>Job Title </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                    {columnHeadersDisplay?.JobLevel && <TableCell
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
                          <span>Job Level </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
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
                      </FormControl>
                    </TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody
                 ref={listInnerRef}
                 onScroll={onScroll}
                >
                  {myAppraisals?.filter((j: any) => {
                    if (employeeName === "None" || employeeName === "") {
                      return j;
                    } else {
                      return j?.legal_full_name
                        ?.toLocaleLowerCase()
                        .includes(employeeName?.toLocaleLowerCase());
                    }
                  })
                  ?.filter((j: any) => {
                    if (employeeCode === "None" || employeeCode === "") {
                      return j;
                    } else {
                      return j?.employee_code
                        .toLocaleLowerCase()
                        .includes(employeeCode.toLocaleLowerCase());
                    }
                  })
                  ?.filter((j: any) => {
                    if (positions === "None" || positions === "") {
                      return j;
                    } else {
                      return j?.position_long_description
                        ?.toLocaleLowerCase()
                        ?.includes(positions?.toLocaleLowerCase());
                    }
                  })
                  ?.filter((j: any) => {
                    if (empgrades === "None" || empgrades === "") {
                      return j;
                    } else {
                      return j?.grade
                        ?.toLocaleLowerCase()
                        ?.includes(empgrades?.toLocaleLowerCase());
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
                                         (j?. ManagerName !== undefined &&
                                            j?. ManagerName
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
                  )?.map((j:any)=> {
                return (
                 <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "lightgrey",
                      },
                      whiteSpace:"nowrap"
                    }}
                  >
                      <TableCell
                      padding="checkbox">
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
                      }}
                    >
                     {j.grade}
                    </TableCell>}
                    {columnHeadersDisplay?.Ependingaction &&<TableCell
                      align="left"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                     {getPAStatus(j)}
                    </TableCell>}
                   { columnHeadersDisplay?.Apprating && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                    {j.appraisal?.appraiser_rating == 0 ? (
                                  <span> - </span>
                                ) : (
                                  j.appraisal?.appraiser_rating
                                )}
                    </TableCell>}
                   {columnHeadersDisplay?.Revrating && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                       {
                                  // j.reviewerIsDisabled &&
                                  (j.reviewer.reviewer_rating == 0 || j.reviewer.reviewer_status == "draft") ? (
                                    <span> - </span>
                                  ) : (
                                    j.reviewer.reviewer_rating
                                  )}
                    </TableCell>}
                   { columnHeadersDisplay?.Normrating && <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      {(
                                  j?.normalizer?.normalizer_rating == 0 || j.normalizer.normalizer_status == "draft") ? (
                                  <span> - </span>
                                ) : (
                                  j?.normalizer?.normalizer_rating
                                )}
                    </TableCell>}
                   {columnHeadersDisplay?.Status && <TableCell
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
                    </TableCell>}
                    {columnHeadersDisplay?.ViewPA &&<TableCell
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
                    </TableCell>}
                   { columnHeadersDisplay?.FirstName &&<TableCell
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
                    </TableCell>}
                   {columnHeadersDisplay?.SupervisoryRole &&<TableCell
                          align="center"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.isSupervisor != undefined ? "SP" : "N-SP"}
                          </TableCell>}
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
                          </TableCell>}
                        {columnHeadersDisplay?.ServiceReferenceDate &&  <TableCell
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
                          </TableCell>}
                         {columnHeadersDisplay?.Section && <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j?.section}
                          </TableCell>}
                          {columnHeadersDisplay?.SubSection &&<TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {j["sub section"]}
                          </TableCell>}
                          {columnHeadersDisplay?.ManagerCode &&<TableCell
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
                          </TableCell>}
                  </TableRow>
                   )})}
                </TableBody>
              </Table>
            </Scroll>
          </TableContainer>
          </TableHeadings>
          <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  // count={users.length}
                  count={tablecount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </div>
      </Box>
    </>
  );
}
