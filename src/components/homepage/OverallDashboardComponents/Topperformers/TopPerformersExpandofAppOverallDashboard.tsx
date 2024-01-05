import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, TablePagination, Breadcrumbs, FormGroup, InputAdornment, TextField, FormControl, MenuItem, ListItemText, ListItemIcon, } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Drawer, FormControlLabel } from "@mui/material";
import Expand from "../../../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Newexcel from "../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { useGetEmployeeByFilterQuery } from "../../../../service";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useNavigate, Link } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Searchlens from "../../../../assets/Images/Searchlens.svg";
import * as XLSX from "xlsx";


const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
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
export default function TopPerformersExpandofAppOverallDashboard(props: any) {
  const { FinalData, setTopperformersExpandActive } = props;
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
  const [appCalId, setappCalId] = React.useState<any>(
    `636cb1a7960b1548b80ff785`
  );
  const SELECT_FOR_DASHBOARD = `appraisal.potential,overall_rating,service_reference_date,first_name,isSupervisor,email,function,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,manager_name,manager_position,work_location,section,division,sub_section,reviewerIsDisabled`;
  const CustomScrollbar = Scrollbar as any;

  React.useEffect(() => {
    if (user?.calendar?._id !== undefined) {
      setappCalId(user?.calendar?._id);
    }
  }, [user]);
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  const topPerformerEmployees = () => {
    return FinalData
      ?.slice()
      ?.sort(
        (a: any, b: any) =>
          b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating
      )
      ?.slice(0, 5);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [filData, setfilData] = React.useState<any>([]);
  //search Functionality
  const [enteredName, setenteredName] = useState("");
  //drawer functions
  // const [heading1, setheading1] = React.useState(true);
  // const [heading2, setheading2] = React.useState(true);
  // const [heading3, setheading3] = React.useState(true);
  // const [heading4, setheading4] = React.useState(true);
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  const [columnHeaders, setcolumnHeaders] = useState<any>({

    Ecode: true,
    Ename: true,
    Eposition: true,
    EGrade: true,
    Rating: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    WorkLocation: true,
    AppraiserName: true,
    Reviewername: true,
    Normalizername: true,
    Potentiallevel: true,
    TalentCategory: true,
    overallRating: true,
    PreviousRating: true,
    status:true,
    rejectionStatus:true,
    ServiceReferenceDate:true,
    Function:true,
    SupervisoryRole:true,
    EmailID:true
  })
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
    Ecode: true,
    Ename: true,
    Eposition: true,
    EGrade: true,
    Rating: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    WorkLocation: true,
    AppraiserName: true,
    Reviewername: true,
    Normalizername: true,
    Potentiallevel: true,
    TalentCategory: true,
    OverallRating: true,
    PreviousRating: true,
  })
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };
  const [headingecode, setheadingecode] = React.useState(true);

  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingecode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  // const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   //this state is used to re-render checkbox. Pls don't removes
  //   setheading1(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  //   //FiiteredExport1();
  // };
  // const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading2(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  //   //FiiteredExport1();
  // };
  // const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading3(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  //   //FiiteredExport1();
  // };
  // const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading4(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  //   //FiiteredExport1();
  // };
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
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const handleAppCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setappCodes(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setrevCodes(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnorCodes(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleEmployeeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfEcode(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
     
   };
    const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
      //this state is used to re-render checkbox. Pls don't removes
      setheading1(event.target.checked);
      let columnHeadersTemp = columnHeaders
      columnHeadersTemp[event.target.name] = event.target.checked;
      setcolumnHeaders(columnHeadersTemp)
     
    };
    const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
      setheading2(event.target.checked);
      let columnHeadersTemp = columnHeaders
      columnHeadersTemp[event.target.name] = event.target.checked;
      setcolumnHeaders(columnHeadersTemp)
      
    };
    const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
      setheading3(event.target.checked);
      let columnHeadersTemp = columnHeaders
      columnHeadersTemp[event.target.name] = event.target.checked;
      setcolumnHeaders(columnHeadersTemp)
     
    };
    const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
      setheading4(event.target.checked);
      let columnHeadersTemp = columnHeaders
      columnHeadersTemp[event.target.name] = event.target.checked;
      setcolumnHeaders(columnHeadersTemp)
     
    };
    const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfSection(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfPAStatus(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
     
   };
   const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfDivision(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
     
   };
   
   const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfSubSection(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfAppraiserName(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfReviewerName(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfNormalizerName(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfOverallRating(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfPreviousRating(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfPotentialLevel(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfTalentCategory(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfWorkLocation(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfManagerCode(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfManagerName(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
     setheadingOfManagerPosition(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
    
   };
   const handleemployeerating = (event: React.ChangeEvent<HTMLInputElement>) => {
     setemployeerating(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
   };
   const handleAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
     setAppraiserRating(event.target.checked)
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
   };
   const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
     setfirstName(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
   
   };
     const handleRejectionStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
       rejsetstatusValue(event.target.checked);
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
     };
     const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
       setServiceReferenceDateData(event.target.checked);
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
     };
     const handleFunctionData = (event: React.ChangeEvent<HTMLInputElement>) => {
       setFunctionData(event.target.checked);
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
     };
     const handleSupervisoryRoleData = (event: React.ChangeEvent<HTMLInputElement>) => {
       setSupervisoryRoleData(event.target.checked);
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
     };
     const handleEmailIDData = (event: React.ChangeEvent<HTMLInputElement>) => {
       setEmailIDData(event.target.checked);
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
     };
     const handleReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
       setReviewerRating(event.target.checked)
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
   
     };
     const handleNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
       setNormalizeRating(event.target.checked)
       let columnHeadersTemp = columnHeaders
       columnHeadersTemp[event.target.name] = event.target.checked;
       setcolumnHeaders(columnHeadersTemp)
   
     };
     const getRejectionstatus = (j:any) =>{
      if(j?.employee?.employee_agree === true) return "Re-normalization"
      else return "Mediation"
    }
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
      //---------------------------------new drawer function(need to replace)
  //drawer functions

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


  //Excel export Function
  const handleExport = () => {
    // console.log(users, "excel");
    // setfilData(topPerformerEmployees)
    const mapped = topPerformerEmployees()
      ?.filter((f: any) => f?.appraisal?.appraiser_rating >= 4)
      .sort(
        (a: any, b: any) =>
          b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating
      )
      ?.filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      ?.filter((item1: any) => {
        if (sectionFilter.includes("None") || sectionFilter.length === 0) {
          return item1;
        } else {
          return !!sectionFilter?.find((item2: any) => item1?.section === item2)
        }
      })?.filter((j: any) => {
        if (enteredName === "") {
          return j;
        } else if (

          (j?.legal_full_name !== undefined &&
            j?.legal_full_name
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
              (j?.grade !== undefined &&
                j?.grade
                  ?.toLocaleLowerCase()
                  ?.includes(
                    enteredName?.toLocaleLowerCase()
                  )) ||
                  (j?.appraisal?.potential !== undefined &&
                    j?.appraisal?.potential
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                  (j?.normalizer?.normalizer_rating !== undefined &&
                    j?.normalizer?.normalizer_rating
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
          (j?.section !== undefined &&
            j?.section
              ?.toLocaleLowerCase()
              ?.includes(
                enteredName?.toLocaleLowerCase()
              ))

        ) {
          return j;
        }
      })
      ?.map((j: any) => {
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
        if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = j?.employee?.employee_rating
        if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = j?.appraisal?.appraiser_rating
        if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = j?.reviewer?.reviewer_rating
        if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = j?.normalizer?.normalizer_rating
        if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = j?.normalizer?.normalizer_rating
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = j?.isGradeException == true || j?.appraisal?.potential == "" || j?.appraisal?.potential == undefined ? "na" : j?.appraisal?.potential
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.isGradeException == true || j?.talent_category == "" || j?.talent_category == undefined ? "na" : j?.talent_category   
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
        if (columnHeaders["status"] == true) exportData["Status"] = getStatus(j?.appraisal?.status)
       // if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = getRejectionstatus(j)
        return exportData
      });
      const a = [1]
      const Emptymapped = a.map((j: any) => {
        let exportData: any = {}
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
      });
    // console.log(mapped,"mapped")
    //Export Funcs
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(mapped == "" ? Emptymapped :mapped);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  //Functions for apply and cancel buttons
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

  };
  console.log(topPerformerEmployees(), "topPerformerEmployees()?");
  const handleheadingSortAccept = () => {

    // let temp = { ...columnHeaders }
    // setcolumnHeadersDisplay(temp);
    setisDrawerOpen(false);
    handleExport();
  };
  const handleCloseGrade = () => {

    setisDrawerOpen(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Eposition: true,
      EGrade: true,
      Rating: true,
      division: true,
      Section: true,
      SubSection: true,
      ManagerCode: true,
      ManagerName: true,
      ManagerPosition: true,
      WorkLocation: true,
      AppraiserName: true,
      Reviewername: true,
      Normalizername: true,
      Potentiallevel: true,
      TalentCategory: true,
      overallRating: true,
      PreviousRating: true,
    })

  };
  //Functions for apply and cancel buttons
  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [sectionFilter, setSectionFilter] = React.useState<string[]>([]);
  console.log(positionFilter, "positionFilter");
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
  const handleChangeSelectSection = (event: SelectChangeEvent<typeof sectionFilter>) => {
    const {
      target: { value },
    } = event;

    if (value.includes("None")) { setSectionFilter([]) } else {
      setSectionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
  };
  const handleOnclickBack = () => {

    setTopperformersExpandActive(false)
  }
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setenteredName(e.target.value);
      setPage(0);
    }
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="32px"
      >
        {/* <IconButton
        onClick={() => { navigate(`/reviewer`) }}
      >
        <img src={Headleft} alt="icon" />
      </IconButton> */}
        {/* <Link to={`/dashboardreview`}></Link> */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
            to={"/dashboardreview"}
          >
            My Team Dashboard
          </Link>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
            onClick={handleOnclickBack}
          >
            Overall Dashboard
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Top Performers
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          background: "#fff",
          padding: "15px",
          // marginTop: "50px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingBottom="20px"
        >

          <Typography style={{ fontSize: "20px", color: "333333", fontFamily: "Arial" }}>
            {/* All Employee Details */}
          </Typography>


          <div>
            <Stack direction="row" alignItems="flex-start" >
              <Searchfeild >
                <TextField
                  id="outlined-basic"
                  placeholder="Search Here..."
                  autoComplete="off"
                  inputProps={{ maxLength: 256 }}
                  onChange={handleSearchBar}
                 // onChange={(e) => setenteredName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Searchlens} alt="icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Searchfeild>
              <div>
                <img
                  src={Newexcel}
                  alt="icon"
                  style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
                  onClick={handleExportFunction}
                />
              </div>
              {/* <div>
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </div> */}
            </Stack>
          </div>
        </Stack>
        <div>
          {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          paddingBottom="10px"
        
        >
      
          
          <img
            src={Newexcel}
          
            alt="icon"
            style={{
              marginLeft: "80%",
              marginTop: "5px",
              float: "right",
              cursor: "pointer",
            }}
            onClick={handleExportFunction}
          />
        </Stack> */}
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
                }}
                variant="subtitle1"
                align="center"
              >
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
                              name="Status"
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
          <TableContainer>
            <Scroll>
              <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 270px)" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead
                    style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                  >
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      ></TableCell>
                      <TableCell
                      width="300px"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Employee Name
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
                      Position
                    </TableCell> */}
                      <TableCell align="center" width="250px">
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
                                value={positionFilter}
                                onChange={handleChangeSelectPosition}
                                renderValue={(selected) => selected.join(', ')}
                              >
                                <MenuItem

                                  key={0}
                                  value="None"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    padding: "0px",
                                    //paddingLeft: "37px",
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
                                    primary="Select All" />
                                </MenuItem>

                                {topPerformerEmployees()
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })
                                  ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
                                  ?.map((name: any, index: any) => (
                                    <MenuItem
                                      sx={{
                                        padding: "0px",
                                        fontSize: "12px"
                                      }}

                                      key={name?.position_long_description}
                                      value={name?.position_long_description}
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
                                        checked={positionFilter.indexOf(name?.position_long_description) > -1} />
                                        </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{  fontSize: "13px", fontFamily: "arial", color: "#333333",paddingRight:"10px" }}
                                        primary={name?.position_long_description} />
                                    </MenuItem>
                                  )
                                  )}
                              </Select>
                              {/* {icon3 && (
                                  <FilterAltTwoToneIcon />)} */}
                            </Stack>
                          </FormControl>

                        </div>
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
                      Grade
                    </TableCell> */}
                      <TableCell align="center" width="30px">
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
                              <span>Grade</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color:"#3e8cb5 !important"
                                  }, }}
                                disableUnderline
                                variant="standard"
                                MenuProps={MenuProps}
                                multiple
                                value={GradeFilter}
                                onChange={handleChangeSelectGrade}
                                renderValue={(selected) => selected.join(', ')}
                              >
                                <MenuItem

                                  key={0}
                                  value="None"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    padding: "0px",
                                    //paddingLeft: "37px",
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
                                    primary="Select All" />
                                </MenuItem>

                                {topPerformerEmployees()
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) { return a.grade.localeCompare(b.grade); })
                                  ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                                  ?.map((name: any, index: any) => (
                                    <MenuItem
                                      sx={{
                                        padding: "0px",
                                        fontSize: "12px"
                                      }}

                                      key={name?.grade}
                                      value={name?.grade}
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
                                        checked={GradeFilter.indexOf(name?.grade) > -1} />
                                     </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333",paddingRight:"10px" }}
                                        primary={name?.grade} />
                                    </MenuItem>
                                  )
                                  )}
                              </Select>
                              {/* {icon3 && (
                                  <FilterAltTwoToneIcon />)} */}
                            </Stack>
                          </FormControl>

                        </div>
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
                      Rating
                    </TableCell> */}
                      {/* <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Section
                    </TableCell> */}
                      <TableCell align="center" width="200px">
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
                              <span>Section</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                variant="standard"
                                MenuProps={MenuProps}
                                multiple
                                value={sectionFilter}
                                onChange={handleChangeSelectSection}
                                renderValue={(selected) => selected.join(', ')}
                              >
                                <MenuItem

                                  key={0}
                                  value="None"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    padding: "0px",
                                    //paddingLeft: "37px",
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
}}                                    primary="Select All" />
                                </MenuItem>

                                {topPerformerEmployees()
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) { return a.section.localeCompare(b.section); })
                                  ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.section }).indexOf(item.section) === index)
                                  ?.map((name: any, index: any) => (
                                    <MenuItem
                                      sx={{
                                        padding: "0px",
                                        fontSize: "12px"
                                      }}

                                      key={name?.section}
                                      value={name?.section}
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
                                        checked={sectionFilter.indexOf(name?.section) > -1} />
                                     </ListItemIcon>
                                     <ListItemText
                                          primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333",paddingRight:"10px" }}
                                          primary={name?.section} />
                                    </MenuItem>
                                  )
                                  )}
                              </Select>
                              {/* {icon3 && (
                                  <FilterAltTwoToneIcon />)} */}
                            </Stack>
                          </FormControl>

                        </div>
                      </TableCell>
                     
                      <TableCell
                      width="150px"
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
                      width="250px"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Talent Category
                      </TableCell>
                      <TableCell
                      width="70px"
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

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topPerformerEmployees()
                      ?.filter((f: any) => f?.appraisal?.appraiser_rating >= 4 && f?.appraisal?.status == "completed")
                      ?.sort(
                        (a: any, b: any) =>
                          b?.appraisal?.appraiser_rating -
                          a?.appraisal?.appraiser_rating
                      )?.filter((item1: any) => {
                        if (positionFilter.includes("None") || positionFilter.length === 0) {
                          return item1;
                        } else {
                          return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
                        }
                      })
                      ?.filter((item1: any) => {
                        if (GradeFilter.includes("None") || GradeFilter.length === 0) {
                          return item1;
                        } else {
                          return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
                        }
                      })
                      ?.filter((item1: any) => {
                        if (sectionFilter.includes("None") || sectionFilter.length === 0) {
                          return item1;
                        } else {
                          return !!sectionFilter?.find((item2: any) => item1?.section === item2)
                        }
                      })?.filter((j: any) => {
                        if (enteredName === "") {
                          return j;
                        } else if (

                          (j?.legal_full_name !== undefined &&
                            j?.legal_full_name
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
                              (j?.grade !== undefined &&
                                j?.grade
                                  ?.toLocaleLowerCase()
                                  ?.includes(
                                    enteredName?.toLocaleLowerCase()
                                  )) ||
                                  (j?.appraisal?.potential !== undefined &&
                                    j?.appraisal?.potential
                                      ?.toLocaleLowerCase()
                                      ?.includes(
                                        enteredName?.toLocaleLowerCase()
                                      )) ||
                                  (j?.normalizer?.normalizer_rating !== undefined &&
                                    j?.normalizer?.normalizer_rating
                                      ?.toLocaleLowerCase()
                                      ?.includes(
                                        enteredName?.toLocaleLowerCase()
                                      )) ||
                          (j?.section !== undefined &&
                            j?.section
                              ?.toLocaleLowerCase()
                              ?.includes(
                                enteredName?.toLocaleLowerCase()
                              ))

                        ) {
                          return j;
                        }
                      })?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((i: any) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "lightgrey",
                              },
                            }}
                          >
                            <TableCell width="0.5%" align="center">
                              <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                paddingLeft: "0px"
                              }}
                            >
                              {i?.legal_full_name}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                              }}
                            >
                              {i?.position_long_description}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                // textDecoration: "underline",
                              }}
                            >
                              {i?.grade}
                            </TableCell>
                            {/* <TableCell
                            width="10%"
                            align="center"
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "lightgrey",
                              fontSize: "14px",
                              color: "#52C8F8",
                              wordBreak: "break-word",
                              textDecoration: "underline",
                            }}
                          >
                            {i?.appraisal?.appraiser_rating}
                          </TableCell> */}
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                // textDecoration: "underline",
                              }}
                            >
                              {i?.section}
                            </TableCell>
                           
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                // textDecoration: "underline",
                              }}
                            >
                              {i?.appraisal?.potential}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                // textDecoration: "underline",
                              }}
                            >
                              {i?.talent_category}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                // textDecoration: "underline",
                              }}
                            >
                               {(i?.appraisal?.status === "completed" && i?.employee?.employee_status === "rejected") ? (
                                    <span style={{ color: "#1976d2" }}>{i?.appraisal?.pa_rating?.toFixed(2)}</span>
                                  ) : (i?.appraisal?.status === "completed") ? (<span>{i?.appraisal?.pa_rating?.toFixed(2)}</span>) :
                                    "-"
                                  }
                              {/* {i?.appraisal?.pa_rating?.toFixed(2)} */}
                            </TableCell>

                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CustomScrollbar>
            </Scroll>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            // count={users.length}
            count={topPerformerEmployees()?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* <div style={{display:"flex",justifyContent:"center"}}>
        <Pagination count={5} color="primary" />
        </div> */}
        </div>
      </Container>
    </>
  );
}
