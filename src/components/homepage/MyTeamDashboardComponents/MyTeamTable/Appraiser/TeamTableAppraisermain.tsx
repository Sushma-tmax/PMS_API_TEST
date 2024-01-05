import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, Menu, FormGroup, FormControlLabel, ListItemIcon } from "@mui/material";
import { InputLabel, Stack, Tab, Tabs, Box, Typography, Drawer } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
// import Menu from "@mui/material";
// import {
//   Container,
//   TablePagination,
//   Drawer,
//   Box,
//   Typography,
//   Tooltip,
//   Menu,
// } from "@mui/material";
import {
  useGetActiveCalenderQuery,
  useGetEmployeeByFilterQuery,
  useGetEmployeeByManagerCodeQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useGetReviewerEmployeeByFilterQuery
} from "../../../../../service";
import { useEffect } from "react";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  EMPLOYEE_APPRAISER_SUBMISSION,
  APPRAISER_SUBMISSION,
  APPRAISER_VIEW_PA,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  VIEW_PAST_PA,
} from "../../../../../constants/routes/Routing";
import UpDown from "../../assets/Images/UpDown.svg";
import Opennew from "../../assets/Images/Opennew.svg";
import Application from "../../assets/Images/Application.svg";
import Searchlens from "../../assets/Images/Searchlens.svg";
// import Eye from "../Reviewericons/Eyeicon.svg";
import Eye from "../../../../reviewer/Reviewericons/Eyeicon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import  Searchlensreview from "../../../../reviewer/Dashboard/Reviewericons/Searchlensreview.svg";
// import Searchlensreview from "../../Dashboard/Reviewericons/Searchlensreview.svg";
import Expand from "../../../../reviewer/Dashboard/Reviewericons/Expand.svg";
import Newexcel from "../../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import Updown from "../../../../reviewer/Dashboard/Reviewericons/Updown.svg";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as XLSX from "xlsx";
import { useAppContext } from "../../../../../context/AppContext";
import { useLoggedInUser } from "../../../../../hooks/useLoggedInUser";
import Scrollbar from "react-scrollbars-custom";
import { makeStyles } from '@mui/styles';
import MyTeamTable from "./TeamTableUIAppraiser";

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
}));
const Mytable = styled("div")({
  background: "#FFFFFF",
  marginLeft: "25px",
  marginRight: "25px",
  position: "relative",
  marginBottom: "25px"
});
const Tabstyles = styled("div")({
  // marginLeft: "20px",
  // // marginTop: "15px",
  // marginRight: "20px",
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
  "& .MuiTableRow-head ": {
    background: "#eaeced",
  },
  // "& .MuiTableCell-head": {
  //   color: "#004C75",
  //   padding: "0px",
  //   height: "30px",
  //   borderBottom: "2px solid white",
  // },
  "& .MuiTableCell-root": {
    padding: "0px 10px",
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

//@ts-ignore
const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

const checkboxHandler = (event: any) => {
  console.log(event.target.value);
};


const MyTeam = (props: any) => {
  const classes = useStyles();
  const { startAppraisal, employeeData1, SectionFilter, setSectionFilter,
    subSectionFilter, setSubSectionFilter, valueOfCard, appCalId } = props;
  const [tabValue, setTabValue] = React.useState<any>(0);
  const { statusSort } = props;
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
    //clear search
    setenteredName("");
  };
  const CustomScrollbar = Scrollbar as any;
  const { data: activecalendardata} = useGetActiveCalenderQuery('')
let CalendarName =activecalendardata?.data[0]?.name
  const listInnerRef = useRef<any>();
  const [acceptButton, setacceptButton] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>();
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
  console.log(enteredName,"enteredName")
  const [approved, setApproved] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)
  console.log(tablecount, "tablecount");
  const [tablecount1, settablecount1] = React.useState<any>(0);
  // console.log(tablecount1, "tablecount1");
  const navigate = useNavigate();

  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  console.log(positionFilter?.length, "positionFilter");
  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) { setpositionFilter([]) } else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
    console.log(value?.length, "newwwww")
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
  console.log(valueOfCard, "statussort");
  useEffect(() => {
    if (valueOfCard === "") {
      return setTabValue(0);
    } else if (valueOfCard === "Not-Started") {
      return setTabValue(2);
    } else if (valueOfCard === "In Progress") {
      return setTabValue(3);
    } else if (valueOfCard === "Normalized") {
      return setTabValue(3);
    } else if (valueOfCard === "Rejected") {
      return setTabValue(4);
    } else if (valueOfCard === "Completed") {
      return setTabValue(5);
    }
  }, [valueOfCard]);
  // //sorting
  //headings-sort


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
  const [empEmployeeCode, setempEmployeeCode] = React.useState("");
  console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setempEmployeeCode(event.target.value);
  };
  const [empFullName, setempFullName] = React.useState("");
  console.log(empFullName, "position");
  const handleChangeFullName = (event: SelectChangeEvent) => {
    setempFullName(event.target.value);
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
  const [positions, setPositions] = React.useState("");
  console.log(positions, "position");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };
  const [empgrades, setempGrades] = React.useState("");
  console.log(empgrades, "position");
  const handleChangegrades = (event: SelectChangeEvent) => {
    setempGrades(event.target.value);
  };
  //filter
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };

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



  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: user } = useLoggedInUser();
  // console.log(user, "user");
  // console.log(users, "users");
  // console.log(statusSort, "statussort");
  // const {data: filtenrData,refetch } = useGetEmployeeByStatusQuery(filter);
  // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  const employee_code = user?.manager_code.toString();


  const PAGE_NUMBER = 5
  const SELECT_FOR_DASHBOARD = `employee_code,overall_rating,service_reference_date,isSupervisor,first_name,email,function,employee.employee_status,legal_full_name,position_long_description,section,sub_section,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,employee.employee_rating,reviewerIsDisabled`
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?appraiser_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  // const { data: reviewerData } = useGetReviewerEmployeeByFilterQuery(
  //   '62ac2037c1c19127416ab14c'
  // );
  console.log(employeeData1, 'employeeData1')

  // console.log(employeeData?.pagination?.next?.page,'employeeData')
  useEffect(() => {
    //setUsers(employeeData?.data);
    if (employeeData1 != undefined) {
      setUsers(employeeData1?.filter((j: any) => j?.appraisal?.status != "excepted"))
    }
    // else{
    //   setUsers(employeeData?.data?.filter((j: any) => j?.appraisal?.status != "excepted"))
    // }
  }, [employeeData1]);




  // console.log(employee, 'nwedata')

  // console.log(data2, 'check')

  // console.log(employeeData, "hi");

  // useEffect(() => {
  //   console.log("useeffect run");
  //   if (employeeData) {
  //     let temp = employeeData?.data?.filter(
  //       (data: any) => data.manager_code == `"${user?.manager_code}"`
  //     );
  //     setUsers(temp);
  //     // console.log(data2, "temp");
  //   }
  // }, [employeeData]);

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.reviewerIsChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res.map((i: any) => {
        return i._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users.map((j: any) => {
      console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
      return j._id === name ? { ...j, appraiserIsChecked: checked } : j;
    });
    setUsers(tempUser);
    console.log(tempUser, "temp");
  };

  const hideAlertHandler = () => {
    setTimeout(() => {
      setApproved(false);
    }, 1000);
  };

  const approvedSuccessfully = () => {
    return setApproved(true), hideAlertHandler();
  };

  // const approvePA = (j: any) => {
  //     let id = j._id;
  //     console.log(j);
  //     if (!j.reviewer.reviewer_acceptance)
  //     acceptReviewer(id);
  //   else if (!j.normalizer.normalizer_acceptance)
  //     acceptNormalizer(id);
  // };
  // const rejectPA = (j: any) => {
  //     let id = j._id;
  //     navigate("/reviewerrejection/employee/" + id, {replace: true});
  //     console.log(j);
  // };

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

  //  to get pending action status on Reviewer Dashboard

  const getPendingAction = (pa_status: any, status: any) => {
    if (status == "not-started") {
      if (pa_status == "Pending with Appraiser (Draft)")
        return "Pending with Appraiser (Draft)"
      else if (pa_status == "Pending with Appraiser")
        return "Pending with Appraiser"
    }
    else if (status == "completed") {
      return "-";
    }
    else return pa_status
  }

  // useEffect(()=>{
  //   if()
  // },[])
  const viewPAClickHandler = (j: any) => {
    // if (j.appraisal.appraiser_status == 'reviewer-rejected') {
    //     navigate(`/reviewerrejection/employee/${j._id}`)
    // } else if (j.appraisal.appraiser_status == 'normalizer-rejected') {
    //     navigate(`/appraiser/normalizer-rejection/employee/${j._id}`)
    // } else {
    //     navigate(`/midyearperformanceappraisal/midyear-pa-report/employee/${j._id}`)
    // }
    // if(j?.appraisal?.status === "not-started"){
    //         setDisable(true)
    //       }else{
    //         setDisable(false);
    //       }
    if (j?.appraisal?.status === "not-started") {


      //navigate(`${VIEW_PA}/employee/${j._id}`);
      window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`, '_blank')

      // window.open(`${VIEW_PA}/employee/${j._id}`,'_blank')
    } else {
      // setacceptButton(false);
      //navigate(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`);
      // window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`,'_blank')
      window.open(`${APPRAISER_VIEW_PA}/employee/${j._id}`, '_blank')
    }

  };

  const empNameClickHandler = (j: any) => {
    console.log(j, "empactsat");

    // if (j.appraisal.appraiser_status?.includes("employee-rejected")) {
    //   navigate(`${EMPLOYEE_APPRAISER_SUBMISSION}/employee/${j._id}`);
    // } else if (j.appraisal.appraiser_status?.includes("reviewer-rejected")) {
    //   navigate(`/reviewerrejection/employee/${j._id}`);
    // } else if (j.appraisal.appraiser_status?.includes("normalizer-rejected")) {
    //   navigate(`/appraiser/normalizer-rejection/employee/${j._id}`);
    // } else if (
    //   j.appraisal.appraiser_status == "draft" ||
    //   j.appraisal.appraiser_status == "pending"
    // ) {
    //   navigate(`${APPRAISER}/employee/${j._id}`);
    // }


    if (j?.appraisal?.pa_status?.includes("Pending with Appraiser") && j.reviewer.reviewer_status?.includes("rejected")) {
      // navigate(`/reviewerrejection/employee/${j._id}`);
      navigate(`${APPRAISER_SUBMISSION}/employee/${j._id}`);
    }
    else if (j?.appraisal?.pa_status?.includes("Pending with Appraiser") && j.appraisal?.status?.includes("rejected")) {
      navigate(`${EMPLOYEE_APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (j?.appraisal?.pa_status?.includes("Pending with Appraiser") && j.normalizer.normalizer_status?.includes("rejected")) {
      navigate(`${APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (
      j.appraisal.appraiser_status == "draft" ||
      j.appraisal.appraiser_status == "pending"
    ) {

      navigate(`${APPRAISER}/employee/${j._id}`);

    }
  };

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
    else if (j?.reviewer?.reviewer_status == "appraiser-rejected" || j?.reviewer?.reviewer_status == "draft") {
      return " Pending with Reviewer";
    } else if (
      // j.appraisal.appraiser_status === "submited" &&
      (j?.reviewer?.reviewer_status == "accepted") &&
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

  useEffect(() => {
    let temp = users?.filter((j: any) => {
      console.log(j?.appraisal?.status === "not-started", "newkkkk")
      // if(j?.appraisal?.status === "not-started"){
      //   // setacceptButton(true);
      // }else{
      //   setacceptButton(false);
      // }
    })
  }, [users])
  // useEffect(() => {
  //   settablecount(() => {
  //     if (tabValue === 0) {
  //       return users?.length
  //       // settablecount(users?.length);
  //     } else {
  //       let temp = users?.filter((j: any) => {
  //         if (tabValue === 1) {
  //           // return getPAStatus(j)?.includes("Pending with Appraiser");
  //           return j?.appraisal?.pa_status?.includes("Pending with Appraiser");
  //         } else if (tabValue === 2) {
  //           return j?.appraisal?.status === "not-started";
  //         } else if (tabValue === 3) {
  //           // return getPAStatus(j)
  //           return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
  //         } else if (tabValue === 4) {
  //           return j?.appraisal?.status === "rejected";
  //         } else if (tabValue === 5) {

  //           return j?.appraisal?.status === "completed";
  //         }
  //       });
  //       return temp?.length;
  //     }
  //   });
  // }, [users, tabValue]);


  // Badge
  const [All, setAll] = React.useState<any>(0);
  useEffect(() => {
    setAll(users?.length);
  }, [users, employeeData]);
  const [completedemp, setcompletedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    console.log(badge, "completed");
    setcompletedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [inProgressemp, setinProgressemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    console.log(badge, "inprogress");
    setinProgressemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [notStartedemp, setnotStartedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    console.log(badge, "notsatarted");
    setnotStartedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [emprejected, setemprejected] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    console.log(badge, "emprejected");
    setemprejected(badge?.length);
    return badge;
  }, [users, employeeData]);

  const [mypendingActions, setmypendingActions] = React.useState<any>(0);
  const [filData, setfilData] = React.useState<any>([]);
  //  Filter icon
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);

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
    if (GradesFilter?.length === 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])

  useEffect(() => {
    let badge = users?.filter((j: any) => {
      //return getPAStatus(j)?.includes("Pending with Appraiser");
      return j?.appraisal?.pa_status?.includes("Appraiser")
    });
    console.log(badge, "badge");
    setmypendingActions(badge?.length);
    return badge;
  }, [users, employeeData]);
  // Badge

  //drawer functions
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };
  //  const [openGrade, setOpenGrade] = React.useState(false);
  //  const handleCloseGrade = () => {
  //    // setOpenGrade(false);
  //    setisDrawerOpen(false);
  //    setheadingSortAccept(false);
  //  };
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

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
    const handleCodes = (event: React.ChangeEvent<HTMLInputElement>) => {   
  
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
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
    EmailID:true
  })
 // const [heading1, setheading1] = React.useState(true);

  // const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   setheading1(event.target.checked);
  //   let columnHeadersTemp = columnHeaders

  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)

  // };
  //const [heading2, setheading2] = React.useState(true);
  // console.log(heading2, "h2");
  // const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading2(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  //const [heading3, setheading3] = React.useState(true);
  // console.log(heading3, "h3");
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
  const [headingcalendar, setheadingcalendar] = React.useState(true);
  const handleheadingCalendar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingcalendar(event.target.checked);
    const { name, checked } = event.target;
      setcolumnHeaders((prevColumnHeaders:any) => ({
        ...prevColumnHeaders,
        [name]: checked,
      }));
  }

  const [headingAppraiser, setheadingAppraiser] = React.useState(true);
  const handleheadingAppraiser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingAppraiser(event.target.checked);
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
  // let columnHeadersTemp = columnHeaders
  // columnHeadersTemp[event.target.name] = event.target.checked;
  // setcolumnHeaders(columnHeadersTemp)
};
const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
  setrevCodes(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
  // let columnHeadersTemp = columnHeaders
  // columnHeadersTemp[event.target.name] = event.target.checked;
  // setcolumnHeaders(columnHeadersTemp)

};
const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
  setnorCodes(event.target.checked);
  // let columnHeadersTemp = columnHeaders
  // columnHeadersTemp[event.target.name] = event.target.checked;
  // setcolumnHeaders(columnHeadersTemp)
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
 const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
   setheadingOfPAStatus(event.target.checked);
   let columnHeadersTemp = columnHeaders
   columnHeadersTemp[event.target.name] = event.target.checked;
   setcolumnHeaders(columnHeadersTemp)
   
 };
 const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
   setheadingOfDivision(event.target.checked);
  //  let columnHeadersTemp = columnHeaders
  //  columnHeadersTemp[event.target.name] = event.target.checked;
  //  setcolumnHeaders(columnHeadersTemp)
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
 };
   const handleRejectionStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
     rejsetstatusValue(event.target.checked);
     let columnHeadersTemp = columnHeaders
     columnHeadersTemp[event.target.name] = event.target.checked;
     setcolumnHeaders(columnHeadersTemp)
   };
   const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
     setServiceReferenceDateData(event.target.checked);
    //  let columnHeadersTemp = columnHeaders
    //  columnHeadersTemp[event.target.name] = event.target.checked;
    //  setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
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
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
   };
   const getRejectionstatus = (j:any) =>{
    if(j?.employee?.employee_agree === true) return "Re-normalization"
    else return "Mediation"
  }
    //---------------------------------new drawer function(need to replace)
  const handleExport = () => {
    const mapped = EmployeeData
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
    if (columnHeaders["ESection"] == true) exportData["Section"] = ""//if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating   
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
    if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""   // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
    if (columnHeaders["status"] == true) exportData["Status"] = ""
    //if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = ""
      return exportData
    });
    // console.log(mapped, "mapped")
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
    //   ws = XLSX.utils.json_to_sheet(mapped);

    // XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    // XLSX.writeFile(wb, "MyExcel.xlsx");
  }
  // const handleExport = () => {
  //   // console.log(users, "excel");
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(filData);

  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };
  const [headingSortAccept, setheadingSortAccept] = React.useState(false);

  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
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
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setheadingSortAccept(false);
  };

  const handleheadingSortAccept = () => {
    setisDrawerOpen(false);
    handleExport();
  };
  const Appraiserdata = users?.map((j: any) => {
    return {
      ECode: j?.employee_code,
      EmployeeName: j?.legal_full_name,
      Position: j?.position_long_description,
      Grade: j?.grade,
      PendingAction: getPAStatus(j),
      AppraiserRating:
        j?.appraisal?.appraiser_rating == 0 ? (
          <p> - </p>
        ) : (
          j?.appraisal?.appraiser_rating
        ),
      ReviewerRating:
        j?.reviewerIsDisabled && j?.reviewer.reviewer_rating != 0 ? (
          j?.reviewer.reviewer_rating
        ) : (
          <p> - </p>
        ),
      NormalizerRating:
        j?.normalizerIsDisabled && j?.normalizer?.normalizer_rating != 0 ? (
          j?.normalizer?.normalizer_rating
        ) : (
          <p> - </p>
        ),

      Status: getStatus(j?.appraisal?.status),
      //  ? (
      //             <p style={{ textTransform: "capitalize" }}>{j?.appraisal?.status}</p>
      //             ) : (
      //             <p>Not Started </p>
      //             )
    };
  });
  console.log(Appraiserdata, "data")

  const [activeTemplate, setactiveTemplate] = useState<any>([]);
  console.log(activeTemplate, "activeTemplate")

  // useEffect(() => {
  //   const mapped = users &&
  //     users
  //       ?.filter((j: any, index: any) => {
  //         if (tabValue === 0) {
  //           return j;
  //         } else if (tabValue === 1) {
  //           return getPAStatus(j)?.includes(" Pending with Appraiser");
  //         } else if (tabValue === 2) {
  //           return j?.appraisal?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("not-started"?.toLocaleLowerCase());
  //         } else if (tabValue === 3) {

  //           return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
  //             j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

  //         } else if (tabValue === 4) {
  //           return j?.appraisal?.status
  //             ?.toLocaleLowerCase()
  //             .includes("rejected"?.toLocaleLowerCase());
  //         } else if (tabValue === 5) {

  //           return j?.appraisal?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("completed"?.toLocaleLowerCase());
  //         }
  //       })
  //       ?.filter((j: any) => {
  //         if (empFullName === "None" || empFullName === "") {
  //           return j;
  //         } else {
  //           return j?.legal_full_name
  //             ?.toLocaleLowerCase()
  //             .includes(empFullName?.toLocaleLowerCase());
  //         }
  //       })
  //       ?.filter((j: any) => {
  //         if (empEmployeeCode === "None" || empEmployeeCode === "") {
  //           return j;
  //         } else {
  //           return j?.employee_code
  //             .toLocaleLowerCase()
  //             .includes(empEmployeeCode.toLocaleLowerCase());
  //         }
  //       })

  //       ?.filter((j: any) => {
  //         if (positions === "None" || positions === "") {
  //           return j;
  //         } else {
  //           return j?.position_long_description
  //             .toLocaleLowerCase()
  //             .includes(positions.toLocaleLowerCase());
  //         }
  //       })
  //       ?.filter((j: any) => {
  //         if (empgrades === "None" || empgrades === "") {
  //           return j;
  //         } else {
  //           return j?.grade
  //             .toLocaleLowerCase()
  //             .includes(empgrades.toLocaleLowerCase());
  //         }
  //       })
  //       ?.map((j: any, emp: any, employee: any) => {
  //         // console.log(emp,"emp")
  //         // console.log(j,"j")
  //         console.log(j?.grade, "code")
  //         return {

  //           ECode: j.employee_code,
  //           EmployeeName: j.legal_full_name,

  //           // emp.manager_code ==  j.employee_code,
  //           Position: j.position_long_description,
  //           Grade: j.grade,
  //           PendingAction: getPAStatus(j),
  //           AppraiserRating:
  //             j.appraisal?.appraiser_rating == 0 ? (
  //               <p> - </p>
  //             ) : (
  //               j.appraisal?.appraiser_rating
  //             ),
  //           ReviewerRating:
  //             j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
  //               j.reviewer.reviewer_rating
  //             ) : (
  //               <p> - </p>
  //             ),
  //           NormalizerRating:
  //             j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
  //               j.normalizer.normalizer_rating
  //             ) : (
  //               <p> - </p>
  //             ),

  //           Status: getStatus(j?.appraisal?.status),

  //         };

  //       })
  //   // if (tabValue == 0) {
  //   setfilData(mapped)
  //   // }
  //   console.log(mapped, "mapped")
  // }, [users, empEmployeeCode, empFullName, empgrades, positions, enteredName, tabValue])
  console.log(tabValue, "tabValue");
  useEffect(() => {
    const Dashfilter = users &&
      users
        ?.filter((j: any) => j?.appraisal?.status !== "excepted")
        ?.filter((j: any, index: any) => {
          const status = j?.appraisal?.status?.toLowerCase();
          if (tabValue === 2) {
            return status === "not-started";
          }
          else if (tabValue === 0) {
            return j;
          } else if (tabValue === 1) {
            return j?.appraisal?.pa_status?.includes("appraiser") || j?.appraisal?.status?.includes("not-started");
          }
          // else if (tabValue === 2) {
          //   return j?.appraisal?.status?.includes("not-started");
          // }
          else if (tabValue === 3) {
            return j?.appraisal?.status?.includes("in-progress") || j?.appraisal?.status?.includes("normalized");
          } else if (tabValue === 4) {
            return j?.appraisal?.status?.includes("rejected");
          } else if (tabValue === 5) {
            return j?.appraisal?.status?.includes("completed");
          }
        })
        ?.filter((item1: any) => {
          if (SectionFilter?.includes("None") || SectionFilter?.length === 0) {
            return item1;
          } else {
            return !!SectionFilter?.find((item2: any) => item1?.section === item2)
          }
        })
        ?.filter((item1: any) => {
          if (subSectionFilter?.includes("None") || subSectionFilter?.length === 0) {
            return item1;
          } else {
            return !!subSectionFilter?.find((item2: any) => item1?.sub_section === item2)
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
          if (empgrades === "None" || empgrades === "") {
            return j;
          } else {
            return j?.grade
              ?.toLocaleLowerCase()
              ?.includes(empgrades?.toLocaleLowerCase());
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
    setactiveTemplate(Dashfilter)
    // settablecount(Dashfilter?.length)
    // console.log(activeTemplate, "activeTemplate")
  }, [users, tabValue])

  //For multislect options
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);

  useEffect(() => {
    //grades option
    let grades = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.map((i: any) => {
        return i?.grade;
      });
    //for filtering graades options
    if (positionsFilter.length > 0) {
      grades = activeTemplate
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
      grades = activeTemplate
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
            ) || enteredTerms.every(term =>
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
    let position = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      .map((i: any) => {
        return i?.position_long_description;
      });
    if (GradesFilter.length > 0) {
      position = activeTemplate
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
      position = activeTemplate
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
    const section = activeTemplate
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
  }, [activeTemplate, positionsFilter, GradesFilter, enteredName])
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
    const Paginate = activeTemplate
      ?.filter((j: any) => {
        if (tabValue === 0) {
          return j;
        } else if (tabValue === 1) {
          return j?.appraisal?.pa_status?.includes("Appraiser")
            || j?.appraisal?.status?.includes("not-started");
        } else if (tabValue === 2) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("not-started"?.toLocaleLowerCase());
        } else if (tabValue === 3) {

          return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
            j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

        } else if (tabValue === 4) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            .includes("rejected"?.toLocaleLowerCase());
        } else if (tabValue === 5) {

          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("completed"?.toLocaleLowerCase());
        }
      })
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
  }, [activeTemplate, enteredName, positionsFilter,tabValue, GradesFilter])
  // useEffect(() => {
  //   settablecount1(() => {
  //     if (tabValue === 0) {
  //       return Appraiserdata
  //       // settablecount1(Appraiserdata);
  //     } else {
  //       let temp = Appraiserdata?.filter((j: any) => {
  //         if (tabValue === 1) {

  //           return j?.PendingAction === "Pending with Appraiser";
  //         } else if (tabValue === 2) {

  //           return j?.Status === "Not-started";
  //         } else if (tabValue === 3) {
  //           return j?.Status === "In progress" || j?.Status === "Normalized";
  //         } else if (tabValue === 4) {
  //           return j?.Status === "Rejected";
  //         } else if (tabValue === 5) {
  //           return j?.Status === "Completed";
  //         }
  //       });
  //       return temp;
  //     }
  //   });
  // }, [users, tabValue]);
  const [show, setShow] = React.useState<any>(0);
  const [EmployeeData, setEmployeeData] = React.useState<any>([])

  console.log(show, "show");
  useEffect(() => {
    let PendingAction = users?.filter((j: any) => {
      return j?.appraisal?.pa_status?.includes("Appraiser")
      // || j?.appraisal?.status?.includes("not-started");
    });
    let Notstarted = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    let inprogress = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    let emprejected = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    let completed = users?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    if (tabValue === 0) {
      setEmployeeData(users)
    } else if (tabValue === 1) {
      setEmployeeData(PendingAction)
    } else if (tabValue === 2) {
      setEmployeeData(Notstarted)
    } else if (tabValue === 3) {
      setEmployeeData(inprogress)
    } else if (tabValue === 4) {
      setEmployeeData(emprejected)
    } else if (tabValue === 5) {
      setEmployeeData(completed)
    }
  }, [tabValue, users])
  console.log(EmployeeData, "EmployeeDataEmployeeData")
  useEffect(() => {
    const All = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j;
      }
    });
    console.log(All, "All")
    let Completed = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("completed"?.toLocaleLowerCase());
      }
    });
    console.log(Completed, "Condition");
    const inProgress = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("in-progress"?.toLocaleLowerCase());
      }
    });
    console.log(inProgress, "inProgress");
    const notStarted = Appraiserdata?.filter((j: any, index: number) => {
      {
        console.log(
          j?.Status?.toLocaleLowerCase()?.includes(
            "not-started"?.toLocaleLowerCase()
          ),
          "position"
        );
        return j?.Status?.toLocaleLowerCase()?.includes(
          "not-started"?.toLocaleLowerCase()
        );
      }
    });
    console.log(notStarted, "notStarted");
    const Rejected = Appraiserdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("rejected"?.toLocaleLowerCase());
      }
    });
    console.log(Rejected, "Rejected");
    // const PaActions =Appraiserdata?.filter((j: any,index:number) => {
    //   {
    //     return getPAStatus(j)?.includes("Pending with HR Normalizer");
    //   }
    // })
    // console.log(PaActions,"PaActions")

    if (tabValue === 0) {
      setShow(All);
    } else if (tabValue === 1) {
      setShow(Completed);
    } else if (tabValue === 2) {
      setShow(inProgress);
    } else if (tabValue === 3) {
      setShow(notStarted);
    } else if (tabValue === 4) {
      setShow(Rejected);
    } else if (tabValue === 5) {
      setShow(Appraiserdata);
    }
  }, [users, tabValue]);

  const onScroll = () => {
    console.log('running scroll')
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  console.log(users, 'userdata')

  // const handleSearchBar = (e: any) => {
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

  return (
    <Mytable>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="30px"
        paddingBottom="10px"
      >
        <Heading> My Team</Heading>
        {/* <Link to={`${VIEW_PAST_PA}`}>
          <Typography
            sx={{
              // marginTop: "28px",
              // paddingLeft: "19px",
              color: "#52C8F8",
              fontSize: "13px",
              fontFamily: "Arial",
            }}
          >
            <u>View Previous PA</u>
          </Typography>
        </Link>  */}
      </Stack>
      {approved && <Alert severity="success">Approved successfully!</Alert>}

      {/* <Tabstyles> */}
      <Stack
        marginLeft="24px"
        marginRight="24px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor: "#E3E3E3", }}

      >
        <Tabstyles>
          <Box sx={{ maxWidth: { xs: 490, md: 730, lg: 1000 } }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab
                label={
                  <StyledBadge badgeContent={All} color="primary" max={999}>
                    All
                  </StyledBadge>
                }
              />
              <Tab
                sx={{ width: "200px" }}
                label={

                  <StyledBadge
                    badgeContent={mypendingActions}
                    color="primary"
                    max={999}
                  >
                    My pending actions
                  </StyledBadge>
                }
              />
              <Tab
                sx={{ width: "155px" }}
                label={
                  <StyledBadge
                    badgeContent={notStartedemp}
                    color="primary"
                    max={999}
                  >
                    Not started
                  </StyledBadge>
                }
              />
              <Tab
                sx={{ width: "142px" }}
                label={

                  <StyledBadge
                    badgeContent={inProgressemp}
                    color="primary"
                    max={999}
                  >
                    In progress
                  </StyledBadge>
                }
              />
              <Tab
                sx={{ width: "190px" }}
                label={
                  <StyledBadge badgeContent={emprejected} color="primary" max={999}>
                    Employees rejection
                  </StyledBadge>
                }
              />
              <Tab
                sx={{ width: "125px" }}
                label={
                  <StyledBadge
                    badgeContent={completedemp}
                    color="primary"
                    max={999}
                  >
                    Completed
                  </StyledBadge>
                }
              />
            </Tabs>
          </Box>
        </Tabstyles>

        {/* <Tabs
          sx={{ borderBottom: 1, borderColor: "#E3E3E3", width: "100%" }}
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <Badge badgeContent={All} color="primary" max={999}>
                All
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={completedemp} color="primary" max={999}>
                Completed
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={inProgressemp} color="primary" max={999}>
                In Progress
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={notStartedemp} color="primary" max={999}>
                Not Started
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={emprejected} color="primary" max={999}>
                Employee Rejected
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={mypendingActions} color="primary" max={999}>
                My Pending Actions
              </Badge>
            }
          />
        </Tabs> */}

        {/* <Searchfeild> */}
        <div>
          <Stack direction="row" alignItems="flex-start" >
            <Searchfeild >
              <TextField
                id="outlined-basic"
                placeholder="Search Here..."
                autoComplete="off"
                inputProps={{ maxLength: 256 }}
                // onChange={(e) => setenteredName(e.target.value)}
                onChange={handleSearchBar}
                value={enteredName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Searchlensreview} alt="icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Searchfeild>
            <div>
              <img
                src={Newexcel}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px",cursor:"pointer" }}
                onClick={handleExportFunction}
              />
            </div>
            {/* <Link to="/myteamtableexpandview" >
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </Link> */}
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
        <TabPanel value={tabValue} index={0} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
          setPage={setPage}
            tabValue={tabValue}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />

        </TabPanel>
        <TabPanel value={tabValue} index={1} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
          setPage={setPage}
            tabValue={tabValue}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
            tabValue={tabValue}
            setPage={setPage}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
            tabValue={tabValue}
            setPage={setPage}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={4} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
            tabValue={tabValue}
            setPage={setPage}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={5} >
          <MyTeamTable users={EmployeeData}
          positionsFilter={positionsFilter}
          setpositionsFilter={setpositionsFilter}
          GradesFilter={GradesFilter}
          setGradesFilter={setGradesFilter}
            tabValue={tabValue}
            setPage={setPage}
            getPAStatus={getPAStatus}
            empNameClickHandler={empNameClickHandler}
            rowsPerPage={rowsPerPage}
            page={page}
            enteredName={enteredName}
            listInnerRef={listInnerRef}
            onScroll={onScroll}
            gradesArray={gradesArray}
            tablecount={tablecount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TabPanel>

      </TableHeadings> 
      {/* );
        })} */}
    </Mytable>
  );
};
export default MyTeam;