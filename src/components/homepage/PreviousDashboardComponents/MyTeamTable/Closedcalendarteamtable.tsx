import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, Menu, Drawer, FormGroup, FormControlLabel } from "@mui/material";
import { InputLabel, Stack, Tab, Tabs, Box, Typography } from "@mui/material";
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
import { ListItemIcon } from '@mui/material';
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
  useGetEmployeeByFilterQuery,
  useGetEmployeeByManagerCodeQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useGetReviewerEmployeeByFilterQuery
} from "../../../../service";
import { useEffect } from "react";
import {
  APPRAISAL_NOT_STARTED,
  APPRAISER,
  EMPLOYEE_APPRAISER_SUBMISSION,
  PREVIOUSAPPRAISAL_VIEWPA,
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  VIEW_PA,
  VIEW_PAST_PA,
  APPRAISER_SUBMISSION,
} from "../../../../constants/routes/Routing";
import UpDown from "../../../../assets/Images/UpDown.svg";
import Opennew from "../../../../assets/Images/Opennew.svg";
import Application from "../../../../assets/Images/Application.svg";
import Searchlens from "../../../../assets/Images/Searchlens.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Searchlensreview from "../../../../assets/Images/Searchlens.svg";
import Expand from "../../../../assets/Images/Expand.svg";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Updown from "../../Dashboard/Reviewericons/Updown.svg";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as XLSX from "xlsx";
import { useAppContext } from "../../../../context/AppContext";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import Scrollbar from "react-scrollbars-custom";
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

const Mytable = styled("div")({
  background: "#FFFFFF",
  marginLeft: "25px",
  marginRight: "25px",
  position: "relative",
  paddingBottom:"40px",
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
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-Track": {

    //width:"10px !important"
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
const TableHeadings = styled("div")({
  marginLeft:"24px",
        marginRight:"24px",
        marginTop:"10px",
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


const Closedcalendarteamtable = (props: any) => {
  const classes = useStyles();
  const { startAppraisal, employeeData1, SectionFilter, setSectionFilter, subSectionFilter,
    setSubSectionFilter,NaviGationFrom, setTeamtableExpandActive, valueOfActiveCalender,Role, Rolee, appCalId } = props;
  console.log(Role, "Role")
  const [tabValue, setTabValue] = React.useState<any>(0);
  const { statusSort } = props;
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };
  console.log(employeeData1, "usersusers");
  const listInnerRef = useRef<any>();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>();
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
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
  // console.log(statusSort, "statussort");
  // useEffect(() => {
  //   if (valueOfCard === "") {
  //     return setTabValue(0);
  //   } else if (valueOfCard === "Not-Started") {
  //     return setTabValue(2);
  //   } else if (valueOfCard === "In Progress") {
  //     return setTabValue(3);
  //   } else if (valueOfCard === "Normalized") {
  //     return setTabValue(3);
  //   } else if (valueOfCard === "Rejected") {
  //     return setTabValue(4);
  //   } else if (valueOfCard === "Completed") {
  //     return setTabValue(5);
  //   }
  // }, [valueOfCard]);
  // //sorting
  //headings-sort


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
  const MenuPropsGrade = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 70,
      },
    },
  };
  const [status, setStatus] = React.useState("");
  // console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
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

  //populating filter for status  dropdown
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
    setStatus(event?.target?.getAttribute("value"))
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
  //const employee_code = user?.manager_code?.toString();


  const PAGE_NUMBER = 5
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,overall_rating,first_name,position_long_description,section,sub_section,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  // const { data: reviewerData } = useGetReviewerEmployeeByFilterQuery(
  //   '62ac2037c1c19127416ab14c'
  // );
  // console.log(reviewerData,'reviewerData')

  // console.log(employeeData?.pagination?.next?.page,'employeeData')
  useEffect(() => {
    //setUsers(employeeData?.data);
    setUsers(employeeData1)
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
  const getStatus1 = (status: any) => {
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
    // if (j.appraisal.appraiser_status == 'reviewer-rejected') {
    //     navigate(`/reviewerrejection/employee/${j._id}`)
    // } else if (j.appraisal.appraiser_status == 'normalizer-rejected') {
    //     navigate(`/appraiser/normalizer-rejection/employee/${j._id}`)
    // } else {
    //     navigate(`/midyearperformanceappraisal/midyear-pa-report/employee/${j._id}`)
    // }
    // if (j?.appraisal?.status === "not-started") {
    //   //navigate(`${VIEW_PA}/employee/${j._id}`);
    //   window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`, '_blank')

    //   // window.open(`${VIEW_PA}/employee/${j._id}`,'_blank')
    // } else {
    //   //navigate(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`);
    //   // window.open(`${APPRAISAL_NOT_STARTED}/employee/${j._id}`,'_blank')
    //   window.open(`${VIEW_PA}/employee/${j._id}`, '_blank')
    // }

    window.open(`${PREVIOUSAPPRAISAL_VIEWPA}/employee/${j._id}`, '_blank')
  };

  const empNameClickHandler = (j: any) => {
    console.log(j, "empactsat");

    if (j.appraisal.appraiser_status?.includes("employee-rejected")) {
      navigate(`${EMPLOYEE_APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (j.appraisal.appraiser_status?.includes("reviewer-rejected")) {
      navigate(`${APPRAISER_SUBMISSION}/employee/${j._id}`);
    } else if (j.appraisal.appraiser_status?.includes("normalizer-rejected")) {
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

  // useEffect(() => {
  //   settablecount(() => {
  //     if (tabValue === 0) {
  //       return users?.length
  //       // settablecount(users?.length);
  //     } else {
  //       let temp = users?.filter((j: any) => {
  //         if (tabValue === 1) {
  //           return getPAStatus(j)?.includes("Pending with Appraiser");
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
    // console.log(badge.length, "badge");
    setcompletedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [inProgressemp, setinProgressemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    // console.log(badge.length, "badge");
    setinProgressemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [notStartedemp, setnotStartedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    // console.log(badge.length, "badge");
    setnotStartedemp(badge?.length);
    return badge;
  }, [users, employeeData]);
  const [emprejected, setemprejected] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    // console.log(badge.length, "badge");
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
  const [statusFilter, setstatusFilter] = React.useState<string[]>([]);

  useEffect(() => {
    if (statusFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [statusFilter])
  useEffect(() => {
    if (status === "None" || status === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [status])
  useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [positionsFilter])
  useEffect(() => {
    if (positions === "None" || positions === "") {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positions])
  useEffect(() => {
    if (GradesFilter?.length === 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])

  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return getPAStatus(j)?.includes("Pending with Appraiser");
    });
    // console.log(badge.length, "badge");
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
  const [columnHeaders, setcolumnHeaders] = React.useState<any>({
    Ecode: true,
    Ename: true,
    Firstname: true,
    Eposition: true,
    EGrade: true,
    Ependingaction: true,
    Apprating: true,
    Revrating: true,
    Normrating: true,
    Status: true,
    ViewPA: true,
    FirstName: true,
    SupervisoryRolee: true,
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
    AppraiserName: true,
    Reviewername: true,
    Normalizername: true,
    PotentialLevel: true,
    TalentCategory: true,
    employeerating: true,
    appraiserRating: true,
    reviewerRating: true,
    normalizerRating: true,
    OverallRating: true,
    PreviousRating: true,
    AppraiserCode: true,
    ReviewerCode: true,
    NormalizerCode: true,
    ProbationStatus: true,
    EmailId: true,
    CalendarName:true,
    SelectAll: true,
  })
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
  const [heading1, setheading1] = React.useState(true);
  const [employeerating, setemployeerating] = React.useState(true);
  const [headingOfOverallRating, setheadingOfOverallRating] = React.useState(true);

  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

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
   const [statusValue, setstatusValue] = React.useState(true);
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatusValue(event.target.checked);
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
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
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
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [talentcategory, setTalentcategory] = React.useState(true);
  const handletalentcategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTalentcategory(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [AppraiserCode, setAppraiserCode] = React.useState(true);
  const handleAppraiserCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserCode(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [ReviewerCode, setReviewerCode] = React.useState(true);
  const handleReviewerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerCode(event.target.checked);
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
  const [NormalizerCode, setNormalizerCode] = React.useState(true);
  const handleNormalizerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizerCode(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [emailId, setEmailId] = React.useState(true);
  const handleEmailId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailId(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
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
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [ServiceReferenceDate, setServiceReferenceDate] = React.useState(true);
  const handleServiceReferenceDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDate(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [Function, setFunction] = React.useState(true);
  const handleFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunction(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [sRole, setsRole] = React.useState(true);
  const handleSupervisoryRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsRole(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading15, setheading15] = React.useState(true);
  const handleheading15 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading15(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading16, setheading16] = React.useState(true);
  const handleheading16 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading16(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading17, setheading17] = React.useState(true);
  const handleheading17 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading17(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading18, setheading18] = React.useState(true);
  const handleheading18 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading18(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading19, setheading19] = React.useState(true);
  const handleheading19 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading19(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [funcVal, setfuncVal] = React.useState(true);
  const handlefuncVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfuncVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [firstNameVal, setfirstNameVal] = React.useState(true);
  const handlefirstNameVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstNameVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [SupRoleVal, setSupRoleVal] = React.useState(true);
  const handleSupRoleVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupRoleVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [ServiceRefVal, setServiceRefVal] = React.useState(true);
  const handleServiceRefVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceRefVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [positionCodeVal, setpositionCodeVal] = React.useState(true);
  const handlepositionCodeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpositionCodeVal(event.target.checked);
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
  const [divisionVal, setdivisionVal] = React.useState(true);
  const handledivisionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdivisionVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [sectionVal, setsectionVal] = React.useState(true);
  const handlesectionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsectionVal(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };

  const handleExport = () => {
    let mapped =
      activeTemplate
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
          //?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      .filter((item1: any) => {
        if (statusFilter.includes("None") || statusFilter.length === 0) {
          return item1;
        } else {
          return !!statusFilter?.find((item2: any) => item1?.appraisal?.status === item2)
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
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.grade
            ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
          // ?.includes(empgrades?.toLocaleLowerCase());
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
           if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = valueOfActiveCalender
          if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
          if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
          if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
          if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = formattedDate
          if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
          if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
          if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
          if (columnHeaders["SupervisoryRolee"] == true) exportData["Supervisory Role"] = j?.isSupervisor != true ? "N-SP" : "SP"
          if (columnHeaders["EmailId"] == true) exportData["Email Id"] = j?.email
          if (columnHeaders["division"] == true) exportData["Division"] = j?.division
          if (columnHeaders["Section"] == true) exportData["Section"] = j?.section
          if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = j.sub_section
          if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
          if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
          if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
          if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
          if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = j?.reviewer_name
          if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
          if (columnHeaders["Normalizername"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name
          if (columnHeaders["employeerating"] === true) {const employeeRating = parseFloat(j?.employee_rating);
            exportData["Employee Rating"] = isNaN(employeeRating) ? '' : employeeRating.toFixed(2);
          }
         
          if (columnHeaders["appraiserRating"] === true) {
            const appraiserRating = parseFloat(
              j?.normalized_overallRating == 0 ?
                (parseFloat(j?.appraiser_rating)) : // Use appraiser_rating if normalized_overallRating is 0, otherwise use normalized_overallRating
                j?.normalized_overallRating
            );
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
          if (columnHeaders["Status"] == true) exportData["Status"] = getStatus(j?.appraisal?.status)

          return exportData
        });
    const a = [1]
    const Emptymapped = a.map((j: any) => {
      let exportData: any = {}
      if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = ""
      if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
      if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
      if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
      if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
      if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
      if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = ""
      if (columnHeaders["SupervisoryRolee"] == true) exportData["Supervisory Role"] = ""
      if (columnHeaders["Function"] == true) exportData["Function "] = ""
      if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Date"] = ""
      if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = ""
      if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
      if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
      if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = ""
      if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = ""
      if (columnHeaders["Normalizername"] == true) exportData["HR Normalizer Name"] = ""
      if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
      if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
      if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
      if (columnHeaders["division"] == true) exportData["Division"] = ""
      if (columnHeaders["Section"] == true) exportData["Section"] = ""
      if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""
      if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
      if (columnHeaders["EmailId"] == true) exportData["Email Id"] = ""
      if (columnHeaders["Status"] == true) exportData["Status"] = ""
      return exportData
    });
    console.log(mapped, "mapped")
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped = "" ? Emptymapped : mapped);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
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
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setheadingSortAccept(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname: true,
      Eposition: true,
      EGrade: true,
      Ependingaction: true,
      Apprating: true,
      Revrating: true,
      Normrating: true,
      Status: true,
      ViewPA: true,
      FirstName: true,
      SupervisoryRolee: true,
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
      AppraiserName: true,
      Reviewername: true,
      Normalizername: true,
      PotentialLevel: true,
      TalentCategory: true,
      employeerating: true,
      appraiserRating: true,
      reviewerRating: true,
      normalizerRating: true,
      OverallRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      ProbationStatus: true,
      EmailId: true,
      CalendarName:true,
      SelectAll: true,
      // status: true,
    })
  };

  const handleheadingSortAccept = () => {
    setisDrawerOpen(false);
    handleExport();
  };
  // const handleExport = () => {
  //   // console.log(users, "excel");
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(filData);

  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };
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
  //For multislect options
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  // setstatusArray
  const [statusArray, setstatusArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);

  useEffect(() => {
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
    else if (statusFilter?.length > 0) {
      grades = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.appraisal?.status - b?.appraisal?.status;
        })
        ?.filter((i: any) => {
          return !!statusFilter?.find(item2 => i?.appraisal?.status === item2)
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
    const gradeContents = grades
      ?.filter((c: any, index: any) => {
        return grades?.indexOf(c) === index && c != null && c != undefined;

      });
    setgradesArray(gradeContents);
    let position = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {

        return i?.position_long_description;
      });
    // GradesFilter
    if (GradesFilter?.length > 0) {
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
   else if (statusFilter?.length > 0) {
      position = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description - b?.position_long_description;
        })
        ?.filter((i: any) => {
          return !!statusFilter?.find(item2 => i?.appraisal?.status === item2)
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
          return i?.position_long_description;
        });
    }
    const positionContents = position?.filter((c: any, index: any) => {
      return position?.indexOf(c) === index && c != null && c != undefined;

    });
    setpositionArray(positionContents);
    // status filter
    let status = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.appraisal?.status?.localeCompare(b?.appraisal?.status);
      })
      ?.map((i: any) => {

        return i?.appraisal?.status;
      });
      if (positionsFilter.length > 0) {
      status = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.appraisal?.status - b?.appraisal?.status;
        })
        ?.filter((i: any) => {
          return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
        })
        ?.map((i: any) => {
          return i?.appraisal?.status;
        });
    }
    // GradesFilter
   else if (GradesFilter?.length > 0) {
      status = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.appraisal?.status - b?.appraisal?.status;
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.appraisal?.status;
        });
    }
     
    else if (enteredName?.length > 0) {
      status = activeTemplate
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.appraisal?.status?.localeCompare(
            b?.appraisal?.status
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const enteredTerms = enteredName.toLowerCase().split(" ");
            return enteredTerms.every(term =>
              i?.appraisal?.status
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
          }
          else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.appraisal?.status;
        });
    }
    const statusContents = status?.filter((c: any, index: any) => {
      return status?.indexOf(c) === index && c != null && c != undefined;

    });
    setstatusArray(statusContents);
    const section = activeTemplate
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
    console.log(statusArray,"statusArray")
  }, [activeTemplate, GradesFilter,statusFilter, positionsFilter, enteredName])
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

  const isAllstatusFilter =
  statusArray?.length > 0 && sectionsFilter?.length === statusArray?.length;
const handleChangeSelectstatus = (event: any) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    console.log((statusFilter?.length === statusFilter?.length ? [] : "select all"), "newwwwww")
    setstatusFilter(statusFilter?.length === statusArray?.length ? [] : statusArray);
    return;
  }
  setstatusFilter(value);
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
    const mapped = users &&
      users
        // ?.filter((j: any, index: any) => {
        //   if (tabValue === 0) {
        //     return j;
        //   } else if (tabValue === 1) {
        //     return getPAStatus(j)?.includes(" Pending with Appraiser");
        //   } else if (tabValue === 2) {
        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       ?.includes("not-started"?.toLocaleLowerCase());
        //   } else if (tabValue === 3) {

        //     return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
        //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

        //   } else if (tabValue === 4) {
        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       .includes("rejected"?.toLocaleLowerCase());
        //   } else if (tabValue === 5) {

        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       ?.includes("completed"?.toLocaleLowerCase());
        //   }
        // })
        ?.filter((j: any) => {
          if (empFullName === "None" || empFullName === "") {
            return j;
          } else {
            return j?.legal_full_name
              ?.toLocaleLowerCase()
              .includes(empFullName?.toLocaleLowerCase());
          }
        })
        // ?.filter((j: any) => {
        //   if (empEmployeeCode === "None" || empEmployeeCode === "") {
        //     return j;
        //   } else {
        //     return j?.employee_code
        //       .toLocaleLowerCase()
        //       .includes(empEmployeeCode.toLocaleLowerCase());
        //   }
        // })

        ?.filter((j: any) => {
          if (positions === "None" || positions === "") {
            return j;
          } else {
            return j?.position_long_description
              .toLocaleLowerCase()
              .includes(positions.toLocaleLowerCase());
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
          if (empgrades === "None" || empgrades === "") {
            return j;
          } else {
            return j?.grade
              .toLocaleLowerCase()
              .includes(empgrades.toLocaleLowerCase());
          }
        })
        ?.map((j: any, emp: any, employee: any) => {
          // console.log(emp,"emp")
          // console.log(j,"j")
          console.log(j?.grade, "code")
          return {

            ECode: j.employee_code,
            EmployeeName: j.legal_full_name,

            // emp.manager_code ==  j.employee_code,
            Position: j.position_long_description,
            Grade: j.grade,
            PendingAction: getPAStatus(j),
            AppraiserRating:
              j.appraisal?.appraiser_rating == 0 ? (
                <p> - </p>
              ) : (
                j.appraisal?.appraiser_rating
              ),
            ReviewerRating:
              j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
                j.reviewer.reviewer_rating
              ) : (
                <p> - </p>
              ),
            NormalizerRating:
              j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
                j.normalizer.normalizer_rating
              ) : (
                <p> - </p>
              ),

            Status: getStatus(j?.appraisal?.status),

          };

        })
    // if (tabValue == 0) {
    setfilData(mapped)
    // }
    console.log(mapped, "mapped")
  }, [users, sectionsFilter, positionsFilter, GradesFilter, empFullName, empgrades, positions, enteredName, tabValue])

  useEffect(() => {
    const paginate = activeTemplate
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
          //?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (status === "None" || status === "") {
          return j;
        } else {
          return j?.appraisal?.status
            .toLocaleLowerCase() === status?.toLocaleLowerCase();
          // .includes(status.toLocaleLowerCase());
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
        if (statusFilter.includes("None") || statusFilter.length === 0) {
          return item1;
        } else {
          return !!statusFilter?.find((item2: any) => item1?.appraisal?.status === item2)
        }
      })
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.grade
            ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
          // ?.includes(empgrades?.toLocaleLowerCase());
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
    console.log(paginate?.length, "paginate")
    settablecount(paginate?.length)
  }, [tabValue, statusFilter,activeTemplate, GradesFilter, enteredName, positionsFilter, status])
  useEffect(() => {
    const Dashfilter = users &&
      users
        // ?.filter((j: any, index: any) => {
        //   if (tabValue === 0) {
        //     return j;
        //   } else if (tabValue === 1) {
        //     return getPAStatus(j)?.includes("Appraiser");
        //   } else if (tabValue === 2) {
        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       ?.includes("not-started"?.toLocaleLowerCase());
        //   } else if (tabValue === 3) {

        //     return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
        //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

        //   } else if (tabValue === 4) {
        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       .includes("rejected"?.toLocaleLowerCase());
        //   } else if (tabValue === 5) {

        //     return j?.appraisal?.status
        //       ?.toLocaleLowerCase()
        //       ?.includes("completed"?.toLocaleLowerCase());
        //   }
        // })
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
    //console.log(activeTemplate, "activeTemplate")
  }, [users, positions, empgrades, tabValue])


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
  console.log(show, "show");
  // useEffect(() => {
  //   const All = Appraiserdata?.filter((j: any, index: number) => {
  //     {
  //       return j;
  //     }
  //   });
  //   // console.log(All,"All")
  //   let Completed = Appraiserdata?.filter((j: any, index: number) => {
  //     {
  //       return j?.status
  //         ?.toLocaleLowerCase()
  //         ?.includes("completed"?.toLocaleLowerCase());
  //     }
  //   });
  //   console.log(Completed, "Condition");
  //   const inProgress = Appraiserdata?.filter((j: any, index: number) => {
  //     {
  //       return j?.status
  //         ?.toLocaleLowerCase()
  //         ?.includes("in-progress"?.toLocaleLowerCase());
  //     }
  //   });
  //   console.log(inProgress, "inProgress");
  //   const notStarted = Appraiserdata?.filter((j: any, index: number) => {
  //     {
  //       console.log(
  //         j?.Status?.toLocaleLowerCase()?.includes(
  //           "not-started"?.toLocaleLowerCase()
  //         ),
  //         "position"
  //       );
  //       return j?.Status?.toLocaleLowerCase()?.includes(
  //         "not-started"?.toLocaleLowerCase()
  //       );
  //     }
  //   });
  //   console.log(notStarted, "notStarted");
  //   const Rejected = Appraiserdata?.filter((j: any, index: number) => {
  //     {
  //       return j?.status
  //         ?.toLocaleLowerCase()
  //         ?.includes("rejected"?.toLocaleLowerCase());
  //     }
  //   });
  //   console.log(Rejected, "Rejected");
  //   // const PaActions =Appraiserdata?.filter((j: any,index:number) => {
  //   //   {
  //   //     return getPAStatus(j)?.includes("Pending with HR Normalizer");
  //   //   }
  //   // })
  //   // console.log(PaActions,"PaActions")

  //   if (tabValue === 0) {
  //     setShow(All);
  //   } else if (tabValue === 1) {
  //     setShow(Completed);
  //   } else if (tabValue === 2) {
  //     setShow(inProgress);
  //   } else if (tabValue === 3) {
  //     setShow(notStarted);
  //   } else if (tabValue === 4) {
  //     setShow(Rejected);
  //   } else if (tabValue === 5) {
  //     setShow(Appraiserdata);
  //   }
  // }, [users, tabValue]);

  const onScroll = () => {
    console.log('running scroll')
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  console.log(users, employeeData?.data, 'userdata')

  const tableDataFilterdLength = activeTemplate
    // ?.filter((j: any) => {
    //   if (tabValue === 0) {
    //     return j;
    //   } else if (tabValue === 1) {
    //     return getPAStatus(j)?.includes("Appraiser");
    //   } else if (tabValue === 2) {
    //     return j?.appraisal?.status
    //       ?.toLocaleLowerCase()
    //       ?.includes("not-started"?.toLocaleLowerCase());
    //   } else if (tabValue === 3) {

    //     return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
    //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

    //   } else if (tabValue === 4) {
    //     return j?.appraisal?.status
    //       ?.toLocaleLowerCase()
    //       .includes("rejected"?.toLocaleLowerCase());
    //   } else if (tabValue === 5) {

    //     return j?.appraisal?.status
    //       ?.toLocaleLowerCase()
    //       ?.includes("completed"?.toLocaleLowerCase());
    //   }
    // })
    ?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.legal_full_name
          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
        //?.includes(empFullName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (status === "None" || status === "") {
        return j;
      } else {
        return j?.appraisal?.status
          .toLocaleLowerCase() === status?.toLocaleLowerCase();
        // .includes(status.toLocaleLowerCase());
      }
    })
    .filter((item1: any) => {
      if (statusFilter.includes("None") || statusFilter.length === 0) {
        return item1;
      } else {
        return !!statusFilter?.find((item2: any) => item1?.appraisal?.status === item2)
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
    .filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.grade
          ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
        // ?.includes(empgrades?.toLocaleLowerCase());
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


      </Stack>
      {approved && <Alert severity="success">Approved successfully!</Alert>}

      {/* <Tabstyles> */}
      <Stack
        marginLeft="24px"
        marginRight="24px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"

      >
        <Heading>My Team</Heading>
        <div>
          <Stack direction="row" alignItems="center" gap="12px" >
          {NaviGationFrom == "PAAdmin" && (

            <Link to={`/viewExceptionhandling`}
             state={{ calendarId: appCalId, role: "paadmin" }}
             >
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    // width: "100px",
                    height: "35px",
                  }}
                  variant="outlined"
                >Employee Master</Button>
                </Link>
          )}

            <Searchfeild >
              <TextField
                id="outlined-basic"
                placeholder="Search Here..."
                autoComplete="off"
                inputProps={{ maxLength: 256 }}
                // onChange={(e) => {
                //   setenteredName(e.target.value)
                //   setPage(0)
                // }}
                onChange={handleSearchBar}
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
                style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
                onClick={handleExportFunction}
              />
            </div>
            {/* <Link to="/myteamtableexpandview" > */}
            {Role === "Normalizer" && (

              <img
                src={Expand}
                alt="icon"
                style={{ cursor: "pointer" }}
                // onClick={() => {setTeamtableExpandActive(true)}}
                onClick={() => {
                  navigate('/myteamtableexpandviewclosedappraiser', { state: { appCalId: appCalId,users:users,valueOfActiveCalender:valueOfActiveCalender } })
                }}
              />
            )}
            {/* </Link> */}
          </Stack>
        </div>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => {
            setisDrawerOpen(false);
          }}
        >
          <Box sx={{ padding: "10px", }}>
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
                  <Checkbox checked={columnHeaders.Ecode} name="Ecode" onChange={handleheadingEcode} />
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
                  <Checkbox checked={columnHeaders.Ename} name="Ename" onChange={handleheading2} />
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
                  <Checkbox checked={columnHeaders.Firstname}
                    name="Firstname" onChange={handlefirstname} />
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
                  <Checkbox checked={columnHeaders.ServiceReferenceDate}
                    name="ServiceReferenceDate" onChange={handleServiceReferenceDate} />
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
                  <Checkbox checked={columnHeaders.Eposition} name="Eposition" onChange={handleheading3} />
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
                  <Checkbox checked={columnHeaders.EGrade} name="EGrade" onChange={handleheadingSN} />
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
                    onChange={handleFunction}
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
                    checked={columnHeaders.SupervisoryRolee}
                    name="SupervisoryRolee"
                    onChange={handleSupervisoryRole}
                  />
                }
                label="Supervisory Role"
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
                      <Checkbox checked={ProbationStatus}
                        name="ProbationStatus"
                        onChange={handleProbationStatus} />
                    }
                    label="Probation Status"
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
                    checked={columnHeaders.EmailId}
                    name="EmailId"
                    onChange={handleEmailId}
                  />
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
                  <Checkbox checked={columnHeaders.division}
                    name="division" onChange={handledivisionVal} />
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
                  <Checkbox checked={columnHeaders.Section} name="Section" onChange={handlesectionVal} />
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
                    checked={columnHeaders.SubSection}
                    name="SubSection"
                    onChange={handleheading10}
                  />
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
                    checked={columnHeaders.AppraiserCode}
                    name="AppraiserCode"
                    onChange={handleAppraiserCode}
                  />
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
                    onChange={handleheadingAppraiser}
                  />
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
                    checked={columnHeaders.ReviewerCode}
                    name="ReviewerCode"
                    onChange={handleReviewerCode}
                  />
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
                    checked={columnHeaders.Reviewername}
                    name="Reviewername"
                    onChange={handleheadingReviewer}
                  />
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
                    checked={columnHeaders.NormalizerCode}
                    name="NormalizerCode"
                    onChange={handleNormalizerCode}
                  />
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
                  // Normalizername
                    checked={columnHeaders.Normalizername}
                    name="Normalizername"
                    onChange={handleheadingNormalizer}
                  />
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
                    onChange={handletalentcategory} />
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
                    onChange={handleManagerCode}
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
                    checked={columnHeaders.ManagerName}
                    name="ManagerName"
                    onChange={handleManagerName}
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
                    checked={columnHeaders.ManagerPosition}
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
                            checked={columnHeaders.Status}
                            name="Status"
                            onChange={handleStatus} />
                        }
                        label="Status"
                      />





            </FormGroup>
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center" paddingTop="10px">
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
          </Box>
        </Drawer>
      </Stack>
      {/* </Searchfeild> */}
      {/* </Tabstyles> */}

            <TableHeadings>
                <TableContainer
                >
                  <Table size="small" aria-label="simple table" stickyHeader >
                    <TableHead
                      style={{ height: "30px" }}>
                      <TableRow
                        sx={{
                          "& td, & th": {
                            whiteSpace: "nowrap",
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
                          width="6%">
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


                        <TableCell align="center" width="20%"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >

                          Employee Name


                        </TableCell>
                        <TableCell align="center" width="15%"
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
                                {icon1 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>

                          </div>
                        </TableCell>

                        <TableCell align="center" width="5%">
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
                            {/* <Stack direction="row" alignItems="center" >
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
                            width:"90px"
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
                         
                           {activeTemplate
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
                                        paddingLeft: "5px",
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
                            {/* <FormControl sx={{ m: 0, width: 80, height: "0" }}>
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

                                  {activeTemplate
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
                            </FormControl> */}
                          </div>
                        </TableCell>
                        {/* <TableCell align="center" width="15%">
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
                            Pending Action
                          </div>
                        </TableCell> */}
                        {/* <TableCell
                          align="center"
                          width="7%"
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
                        </TableCell> */}
                        {/* <TableCell
                          align="center"
                          width="7%"
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
                        </TableCell> */}
                        {/* <TableCell
                          align="center"
                          width="7%"
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
                            Normalizer<br></br> Rating
                          </div>
                        </TableCell> */}
                        <TableCell
                          align="center"
                          width="7%"
                          text-align="-webkit-center"
                        ><div
                          style={{
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            border: "none",
                            background: "none",
                            wordWrap: "break-word",
                          }}
                        >Overall<br></br> Rating</div></TableCell>
                        <TableCell align="center" text-align="-webkit-center" width="6%">
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
                                <span>Status</span>
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
                                  value={statusFilter}
                                  onChange={handleChangeSelectstatus}
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
                                      root: isAllstatusFilter ? classes.selectedAll : "",
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
                                        checked={isAllstatusFilter}
                                        indeterminate={
                                          statusFilter?.length > 0 &&
                                          statusFilter?.length < statusArray?.length
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
                                  {statusArray?.map((option: any) => (
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
                                          checked={statusFilter.indexOf(option) > -1}
                                        />
                                      </ListItemIcon>

                                      <ListItemText sx={{
                                        "& .MuiTypography-root": {
                                          fontSize: "13px",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                          paddingRight: "10px"
                                        },
                                      }} primary={getStatus(option)} />
                                    </MenuItem>

                                  ))}
                                </Select>
                                {icon2 && <FilterAltTwoToneIcon />}
                              </Stack>
                            </FormControl>
                            {/* <Stack direction="row" alignItems="center" justifyContent="center">
                              <div
                                aria-controls={opennew ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={opennew ? "true" : undefined}
                                onClick={handleClicknew}
                              >
                                <Stack direction="row" alignItems="center">
                                  Status
                                  <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                                </Stack>
                              </div>
                              <Menu
                                MenuListProps={{
                                  "aria-labelledby": "fade-button",

                                }}
                                sx={{
                                  height: "200px",
                                }}
                                anchorEl={anchorElnew}
                                open={opennew}
                                onClose={handleClosenew}

                              >
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    padding: "0px 10px 2px 17px",
                                  }}
                                  key="None"
                                  value="None"
                                  onClick={handleTarget}
                                >Clear Filter
                                </MenuItem>
                                {statusArray?.map((option: any) => (


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
                                        checked={status.indexOf(option) > -1}
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
                               
                              </Menu>
                              {icon && <FilterAltTwoToneIcon />}
                            </Stack> */}
                          </div>
                        </TableCell>
                        {/*<TableCell align="left" width="5%">*/}
                        {/*    Action*/}
                        {/*</TableCell>*/}
                        <TableCell
                          width="6%"
                          style={{
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            textAlign: "center",
                            //maxWidth:"100px"
                          }}
                        // align="left"
                        // width="6%"
                        >
                          View<br></br> PA
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {tableDataFilterdLength?.length > 0 ? (
                      <TableBody
                        ref={listInnerRef}
                        onScroll={onScroll}
                      >
                        {activeTemplate
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
                          .filter((item1: any) => {
                            if (statusFilter.includes("None") || statusFilter.length === 0) {
                              return item1;
                            } else {
                              return !!statusFilter?.find((item2: any) => item1?.appraisal?.status === item2)
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
                          .filter((j: any) => {
                            if (empgrades === "None" || empgrades === "") {
                              return j;
                            } else {
                              return j?.grade
                                ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
                              // ?.includes(empgrades?.toLocaleLowerCase());
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
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          ?.map((j: any) => {
                            console.log(j, 'checkViewPA')
                            return (
                              <TableRow>
                                <TableCell
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    // paddingRight: "45px"
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
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={1.5}
                                    >
                                      {/* <Avatar>{j.legal_full_name[0]}</Avatar> */}

                                      <Names
                                      //   sx={{
                                      //     color:
                                      //       (!getPAStatus(j)?.includes("PA Not Started")) && (
                                      //         j.appraisal.appraiser_status ==
                                      //         "draft" ||
                                      //         j.appraisal.appraiser_status ==
                                      //         "pending")
                                      //         ? "#52C8F8"
                                      //         : getPAStatus(j)?.includes(
                                      //           "Pending with Appraiser"
                                      //         ) &&
                                      //           (j?.appraisal?.status ==
                                      //             "in-progress" ||
                                      //             j.appraisal.appraiser_status ==
                                      //             "employee-rejected")
                                      //           ? "#52C8F8"
                                      //           : "#333333",
                                      //     cursor:
                                      //       (!getPAStatus(j)?.includes("PA Not Started")) && (
                                      //         j.appraisal.appraiser_status ==
                                      //         "draft" ||
                                      //         j.appraisal.appraiser_status ==
                                      //         "pending")
                                      //         ? "pointer" : getPAStatus(j)?.includes(
                                      //           "Pending with Appraiser"
                                      //         ) &&
                                      //           j?.appraisal?.status != "not-started"
                                      //           ? "pointer"
                                      //           : "default",
                                      //   }}
                                      //   style={{ cursor: "pointer" }}
                                      >
                                        {j.legal_full_name}
                                      </Names>
                                    </Stack>
                                  </p>
                                </TableCell>

                                <TableCell
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                  }} align="left">
                                  {j.position_long_description}
                                </TableCell>

                                <TableCell style={{
                                  textAlign: "center", paddingRight: "30px", fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                }} >{j.grade}</TableCell>
                                {/* <TableCell align="left">
                                {getPAStatus(j)}
                               
                              </TableCell> */}
                                {/* <TableCell
                                align="center"
                                sx={{
                                  color:
                                    j?.appraisal?.appraiser_status ===
                                      "appraiser-rejected" || j?.appraisal?.appraiser_status === "appraiser-rejected-employee"
                                      ? "red"
                                      : "#333333",
                                }}
                              >
                                {j?.appraisal?.appraiser_rating == 0 ? (
                                  <span> - </span>
                                ) : (
                                  j?.appraisal?.appraiser_rating
                                )}
                              </TableCell> */}
                                {/* <TableCell
                                align="center"
                                sx={{
                                  color:
                                    j?.reviewer?.reviewer_status ===
                                      "rejected"
                                      ? "red"
                                      : "#333333",
                                }}
                              >
                                {
                                  (j?.reviewer?.reviewer_rating == 0 || j?.reviewer?.reviewer_status == "draft") ? (
                                    <span> - </span>
                                  ) : (
                                    j?.reviewer?.reviewer_rating
                                  )}
                              </TableCell> */}
                                {/* <TableCell
                                align="center"
                                sx={{
                                  color:
                                    j?.normalizer?.normalizer_status ===
                                      "rejected"
                                      ? "red"
                                      : "#333333",
                                }}
                              >
                                {(
                                  j?.normalizer?.normalizer_rating == 0 || j?.normalizer?.normalizer_status == "draft") ? (
                                    <span> - </span>
                                ) : (
                                  j?.normalizer?.normalizer_rating
                                )}
                              </TableCell> */}
                                <TableCell style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: (j?.appraisal?.status == "completed" && j?.employee?.employee_status == "rejected") ? "#0099FF" : "#333333",
                                }} align="center">{j?.overall_rating?.toFixed(2)}</TableCell>
                                <TableCell style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                }} align="center">
                                  {getStatus(j?.appraisal?.status)}
                                </TableCell>
                                {/*<TableCell>*/}
                                {/*    <button onClick={approvePA.bind(this, j)}>*/}
                                {/*        Approve*/}
                                {/*    </button>*/}
                                {/*    <button onClick={rejectPA.bind(this, j)}>*/}
                                {/*        Reject*/}
                                {/*    </button>*/}
                                {/*</TableCell>*/}
                                <TableCell style={{
                                  textAlign: "center", fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                }}>
                                  {j.appraisal?.status === "completed" && (
                                    <IconButton
                                      onClick={() => viewPAClickHandler(j)}
                                    >
                                      <img src={Eye} alt="icon" />
                                    </IconButton>
                                  )}
                                </TableCell>
                              </TableRow>
                              // </ExpandableTableRow>
                            );
                          })}
                      </TableBody>) : (
                      <TableBody>
                        <TableRow>
                          <TableCell
                            colSpan={6}
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
                {tableDataFilterdLength?.length > 0 && <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  component="div"
                  // count={users.length}
                  count={tablecount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                }
            </TableHeadings>
    </Mytable>
  );
};
export default Closedcalendarteamtable;