import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, Drawer, FormGroup, FormControlLabel, Tooltip, Popover } from "@mui/material";
import { Stack, Tab, Tabs, Box, Typography, Menu } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Scrollbar from "react-scrollbars-custom";
import Collapse from "@mui/material/Collapse";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import {
  useAcceptNormalizerMutation, useGetActiveCalenderQuery, useGetEmployeeByFilterQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useRejectNormalizerAppraisalEmployeeMutation,
} from "../../../../../service";
import { useEffect } from "react";
import {
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  NORMALIZER_ACTION,
  NORMALIZER_APPROVE,
  NORMALIZER_PAGE,
  NORMALIZER_REJECTION,
  NORMALIZER_VIEW_PA,
  REVIEWER_PAGE,
  VIEW_PA,
  VIEW_PREVIOUS_PAA,
} from "../../../../../constants/routes/Routing";
import UpDown from "../../../../../assets/Images/UpDown.svg";
import Opennew from "../../../../../assets/Imaages/Opennew.svg";
import Application from "../../../../../assets/Images/Application.svg";
import Closeicon from "../../../../../../assets/Images/Closeicon.svg";
// import Eye from "../Reviewericons/Eyeicon.svg";
import Eye from "../../../../reviewer/Dashboard/Reviewericons/Eyeicon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Expand from "../../../../reviewerMain/Reviewericons/Expand.svg";
// import Expand from "../../reviewerMain/Reviewericons/Expand.svg";
import Newexcel from "../../../../reviewerMain/Reviewericons/Newexcel.svg";
import Searchlensreview from "../../../../reviewerMain/Reviewericons/Searchlensreview.svg";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import TablePagination from "@mui/material/TablePagination";
import * as XLSX from "xlsx";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AlertDialogSuccess from "../../../../UI/DialogSuccess";
import { getRequestStatusFlags } from "@reduxjs/toolkit/dist/query/core/apiState";
import { useAcceptNormalizerGradeExceptionBulkMutation, useAcceptNormalizerGradeExceptionMutation } from "../../../../../service/employee/appraisal/appraisal";
import { ListItemIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MyTeamTable from "./TeamTableUINormalizer";
import { useGetEmailIdsBulkMutation, useSendEmailNotificationMutation } from "../../../../../service/email/emailNotification";
import { useLoggedInUser } from "../../../../../hooks/useLoggedInUser";
import { NORMALIZER_ACCEPTS_PA_INFO, NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION } from "../../../../../constants/AppraisalEmailContents/NotificationForInfo/Normalizer";
import { NORMALIZER_ACCEPTS_PA } from "../../../../../constants/AppraisalEmailContents/NotificationForAction/Normalizer";
import { useCheckRoleLogsMutation } from "../../../../../service/employee/employee";

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
const Names = styled("div")({
  // marginLeft: "20px",
  // marginTop: "10px",
  color: "#333333",
});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-Track": {

    //width:"10px !important"
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

interface Data {
  empty: any;
  position: any;
  status: any;
  grade: any;
  pastatus: any;
  name: any;
  protein: any;
  Appraiser_Rating: any;
  Reviewer_Rating: any;
  Normalizer_Rating: any;
}

function createData(
  name: string,
  position: string,
  grade: any,
  status: any,
  pastatus: any,
  protein: any,
  empty: any,
  Appraiser_Rating: any,
  Reviewer_Rating: any,
  Normalizer_Rating: any
): Data {
  return {
    empty,
    name,
    position,
    grade,
    pastatus,
    status,
    protein,
    Appraiser_Rating,
    Reviewer_Rating,
    Normalizer_Rating,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "empty",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Employee",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Grade",
  },
  {
    id: "pastatus",
    numeric: false,
    disablePadding: false,
    label: "Pending Action ",
  },
  {
    id: "Appraiser_Rating",
    numeric: true,
    disablePadding: false,
    label: "Appraiser Rating",
  },
  {
    id: "Reviewer_Rating",
    numeric: true,
    disablePadding: false,
    label: "Reviewer Rating",
  },
  {
    id: "Normalizer_Rating",
    numeric: true,
    disablePadding: false,
    label: "Normalizer Rating",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Overall Status",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "View PA",
  },
];

function EnhancedTableHead(props: any) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };



  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ paddingLeft: "30px" }}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              active={false}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const NormalizerTeamTable = (props: any) => {
  const [bulkupdate, setbulkupdate] = React.useState<HTMLElement | null>(null);
  const classes = useStyles();
  const { data: activecalendardata } = useGetActiveCalenderQuery('')
  let CalendarName = activecalendardata?.data[0]?.name
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { startAppraisal, employeeData, statusSort, SectionFilter, setSectionFilter, subSectionFilter, setSubSectionFilter, divisionFilter, valueOfCard } = props;
  const navigate = useNavigate();
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  //const{employee_id} = useParams()
  const CustomScrollbar = Scrollbar as any;

  console.log(employeeData, "emplpoyeeeeee")
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDialogOpen = () => {
    setOpendialog(true);
  };

  const handleDialogClose = () => {
    setOpendialog(false);
    setIsOpen(false);
  };

  const handleCloseBulk = () => {
    setBulkOpen(false);
    setMessage("");
  }

  const handleDialogNo = () => {
    setOpendialog(false);
    setIsOpen(true);
  };

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("position");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const { startAppraisal,employeeData } = props;
  const { data: user } = useLoggedInUser();
  const [acceptNormalizer] = useAcceptNormalizerMutation()
  const [acceptNormalizerGradeExceptionBulk] = useAcceptNormalizerGradeExceptionBulkMutation()
  const [rejectNormalizer] = useRejectNormalizerAppraisalEmployeeMutation();
  const [tabValue, setTabValue] = React.useState<any>(0);
  const [message, setMessage] = useState("")
  const [openAlertOk, setOpenAlertOk] = useState<any>(false)

  const [getEmailIds] = useGetEmailIdsBulkMutation();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [emailIdsForEmployees, setEmailIdsForEmployees] = useState<any>({})

  const handleAlertClose = () => {
    setOpenAlertOk(false);
    setMessage("")
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };
  const [checkboxUser, setcheckboxUser] = React.useState<any>([]);
  const [error, setError] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [reasonSelection, setreasonSelection] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = React.useState("");
  const [employee, setEmployee] = React.useState([]);
  const [enteredName, setenteredName] = useState("");
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const [approved, setApproved] = React.useState(false);
  const [count, setCount] = React.useState<any>(100);
  const [showReNormalize, setShowReNormalize] = useState(false)
  console.log(users, "users");
  console.log(checkedEmployeeid, "checkedempid");
  // const {data: filterData,refetch } = useGetEmployeeByStatusQuery(filter);
  // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  // const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled,normalizerIsChecked,normalizerIsDisabled`
  //
  // const { data: employeeData } = useGetEmployeeByFilterQuery(
  //   `?limit=800&select=${SELECT_FOR_DASHBOARD}`
  // ); console.log(employeeData, "hi");
  const [tablecount, settablecount] = React.useState<any>(0);
  const [tablecount1, settablecount1] = React.useState<any>(0);
  console.log(tablecount1?.length, "tablecount1");

  // console.log(tablecount, "tablecount");

  //multiselect
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [acceptButton, setacceptButton] = React.useState(false);
  const [rejectButton, setrejectButton] = React.useState(false);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  console.log(positionFilter, "positionFilter");
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);


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
    let position = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {
        return i?.position_long_description;
      });
    if (GradesFilter.length > 0) {
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
    // search functionality based on position
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
    //grades option
  }, [positionsFilter, GradesFilter, enteredName])


  //commented now
  // useEffect(() => {
  //   settablecount(() => {
  //     if (tabValue === 0) {
  //       //settablecount(users?.length);
  //       let temp = users
  //       return temp?.length;
  //     } else {
  //       let temp = users?.filter((j: any) => {
  //         if (tabValue === 1) {
  //           return getPAStatus(j)?.includes("Pending with HR Normalizer");
  //           // return j?.appraisal?.pa_status?.includes("Pending with HR Normalizer")
  //         } else if (tabValue === 2) {
  //           return j?.appraisal?.status === "not-started";

  //         } else if (tabValue === 3) {
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

  //pagination
  useEffect(() => {
    const Paginate = users
      ?.filter((j: any) => {

        if (tabValue === 0) {
          return j;
        } else if (tabValue === 1) {
          return getPAStatus(j)?.includes(
            " Pending with HR Normalizer"
          );

        } else if (tabValue === 2) {
          return j?.appraisal?.status === "not-started"

        } else if (tabValue === 3) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("in-progress"?.toLocaleLowerCase()) ||
            j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase());
        } else if (tabValue === 4) {
          return j?.appraisal?.status
            ?.toLocaleLowerCase()
            ?.includes("rejected"?.toLocaleLowerCase());
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
      ?.filter((j: any) => {
        if (enteredName === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.legal_full_name !== undefined &&
            j?.legal_full_name
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.grade !== undefined &&
            j?.grade
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.position_long_description !== undefined &&
            j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.appraisal?.status !== undefined &&
            j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (getPAStatus(j) !== undefined &&
            getPAStatus(j)
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase()))
        ) {
          return j;
        }
      })


    settablecount(Paginate?.length)
    console.log(Paginate?.length, "Paginate")
  }, [users, tabValue, enteredName, positionsFilter, GradesFilter]);

  // useEffect(() => {

  // }, [tabValue])

  // useEffect(() => {
  //   console.log("useeffect run");
  //   if (employeeData) {
  //     setUsers(employeeData?.data);
  //     //setCount(employeeData?.data?.length);
  //   }
  // }, [employeeData]);
  const sum = React.useMemo(() => {
    // if(users.length ===0){
    setUsers(employeeData?.filter((j: any) => j?.appraisal?.status != "excepted"));
    // };
  }, [employeeData]);

  //sorting
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

  const acceptHandler = () => {
    const approvefilter = users?.filter((i: any) => {
      return i?.normalizerIsChecked === true && i?.normalizerIsDisabled === false;
    });
    // if (checkboxIdHandler(checkboxHandler(users))?.length > 0) {
    //   if (approvefilter && approvefilter.length > 0) {
    //     let currentUser = approvefilter[0];
    //     if (currentUser?.appraisal?.status == "rejected") {
    //       navigate(`${NORMALIZER_ACTION}/employee/${checkboxIdHandler(checkboxHandler(users))}`);
    //     } else {
    //       navigate(`${NORMALIZER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(users))}`)
    //     }

    //   }

    // } 
    /**********************If no employee is selected****************/
    if (approvefilter?.length == 0) {
      setOpenAlertOk(true);
      setMessage("Please select atleast one employee.")
    }
    /*************If more than one employee is selected************/
    else if (approvefilter?.length > 1) {
      setOpenAlertOk(true);
      setMessage("Please use the Bulk Accept option to accept the rating of selected employees.")
    } else {
      let currentUser = approvefilter[0];
      if (currentUser?.appraisal?.status == "rejected") {
        navigate(`${NORMALIZER_ACTION}/employee/${checkboxIdHandler(checkboxHandler(users))}`);
      } else {
        navigate(`${NORMALIZER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(users))}`)
      }
    }
  }

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
        // rejectNormalizer({
        //   value: checkedfilter,
        //   id: checkedEmp[0],
        // }).then((data: any) => {
        //   navigate(`${NORMALIZER_ACTION}/employee/` + id);
        // });
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

  const rejectHandler = () => {
    const rejectfilter = users?.filter((i: any) => {
      console.log(i?.normalizerIsChecked, "filter");
      return i?.normalizerIsChecked === true && i?.normalizerIsDisabled === false;
    });

    const normalizerValue = rejectfilter?.map(
      (j: any) => j?.normalizer?.normalizer_status
    )[0];

    if (rejectfilter?.length > 1) {
      setError(true);
    } else if (normalizerValue == "employee-rejected") {
      let id = rejectfilter[0]._id;
      navigate("/appraisal/employee-normalizer/employee/" + id);
    } else if (
      (rejectfilter?.length === 1 && normalizerValue === "pending") ||
      normalizerValue === "draft"
    ) {
      return (
        setError(false),
        setzeroselect(false),
        handleDialogOpen(),
        setcheckedEmployeeid(() => {
          return rejectfilter?.map((j: any) => j._id);
        })
      );
    } else if (rejectfilter?.length === 0) {
      setzeroselect(true);
    }
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


  //  to get pending action status on Reviewer Dashboard

  const getPendingAction = (pa_status: any, status: any) => {
    if (status == "not-started") {
      if (pa_status == "Pending with Appraiser (Draft)" || pa_status == "Pending with Appraiser")
        return "Pending with Appraiser"
    }
    else if (status == "completed") {
      return "-"
    }
    else return pa_status
  }


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
        handleDialogClose(),
        rejectNormalizer({
          value: checkedfilter,
          id: checkedEmployeeid[0],
        }),
        navigate(`${NORMALIZER_REJECTION}/employee/${checkedEmployeeid[0]}`)
      );
    }

    //{`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}
  };
  // const handleSubmithelper = (e: any) => {
  //     const { name, checked } = e.target;
  //     console.log(checked, 'checkedddd ssubmit')
  //     // if (checked === false) {
  //     //     setreasonSelection(true)
  //     // }else{
  //     //     setreasonSelection(false)
  //     // }
  // }

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

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox?.filter((i: any) => {
        return i?.normalizerIsChecked === true && !i?.normalizerIsDisabled;
      });
      console.log(res, "check22");
      return res;
    }
  };

  /*
    Disable checkbox  if employee apraisal was approved and saved
    Filter all the emoloyee who were appraoved 
    Create a state and stote the value of appraoved employees
    Then disable checkbox for the employee in the state

    */

  const checkboxIdHandler = (res: any) => {
    if (res) {
      const check = res?.map((i: any) => {
        return i?._id;
      });
      console.log(check, "check");
      return check;
    }
  };
  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;
    console.log(name, checked, "checked");
    const tempUser = users?.map((j: any) => {
      console.log(j?.normalizerIsChecked, "jjjjjjjjjjj");
      return j?._id === name ? { ...j, normalizerIsChecked: checked } : j;
    });

    let tempChecked = tempUser.filter((item: any) => item.normalizerIsChecked == true && item.normalizerIsDisabled == false)
    // let newchecked =(tempChecked.length > 1)
    if (tempChecked.length > 1) {
      setacceptButton(true);
      setrejectButton(true);
    } else {
      setacceptButton(false);
      setrejectButton(false);
    }
    console.log(tempChecked?.length, "newlength")
    console.log(tempChecked, "tempChecked")
    let tempRejectedLength = (tempChecked.length == 1) && tempChecked.filter((item: any) => item.appraisal.status == "rejected").length
    if (tempRejectedLength == 1) {
      setUsers(tempUser);
      setShowReNormalize(true)
    } else {
      setUsers(tempUser);
      setShowReNormalize(false)
    }
    // ststus check for rejected and inprogres  employee vaidation for bulk accept
    let Checkemployee = tempChecked?.map((j: any) => {
      return j?.appraisal?.status
    })
    if (Checkemployee?.includes("rejected") && Checkemployee?.includes("in-progress")) {
      setBulkOpen(true);
      setMessage("Please deselect performance appraisal for re-normalization to proceed further.")
    }

    // ststus check for one or more rejected employee vaidation for renormalize
    const filteredStatus = Checkemployee.filter((status: any) => status === "rejected");

    if (filteredStatus.length === 2) {
      setBulkOpen(true);
      setMessage("Please select only one rejected employee for re-normalization to proceed further.")
    }
    // console.log(Checkemployee,filteredStatus, "Checkemployee");
  };
  // 
  // const filterEmployee = (filterBy: any) => {
  //     return employeeData.filter((i: any) => {
  //         i.appraisal.status === filterBy
  //     })
  // }
  const hideAlertHandler = () => {
    setTimeout(() => {
      setApproved(false);
    }, 1000);
  };

  const approvedSuccessfully = () => {
    return setApproved(true);
  };

  const formatDate = (date: any) => {
    const day = date ? parseInt(date[2]) : null;
    const month = date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date)) : null;
    const year = date ? parseInt(date[0]) : null;
    return date ? `${day} ${month} ${year}` : ''
  }

  //Function to send email notification for each employee selected in bulk accept
  const sendEmailNotificationOnBulkAccept = (employee: any) => {

    //variables for email notification
    let appraiserName = employee?.appraiser_name;
    let normalizerName = employee?.normalizer_name;
    let employeeName = employee?.first_name;
    let calendarName = employee?.calendar?.calendar_type;
    let calendarYear = employee?.calendar?.start_date?.slice(0, 4);
    let Employee_Due_Date = employee?.calendar?.end_date_employee_acknowledgement?.slice(0, 10).split("-");// Split the date into an array [year, month, day]
    let formatted_Employee_Due_Date = formatDate(Employee_Due_Date); // Concatenate the parts in the desired format
    let employeeCode = employee?.employee_code
    let employeeFirstName = employee?.first_name;

    // Notification action to Employee after Normalizer accepts PA (for Employee)
    let tempSubject = NORMALIZER_ACCEPTS_PA?.subject;
    tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
    tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);

    let tempHtml = NORMALIZER_ACCEPTS_PA?.html;
    tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
    tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
    tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
    tempHtml = tempHtml?.replace("[dd/mm/yy]", `${formatted_Employee_Due_Date}`);
    tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
    tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

    let employeeEmail = NORMALIZER_ACCEPTS_PA?.to
    let email = employee?.email
    email = email?.replace("[email]", `${employeeEmail}`);

    sendEmailNotification(
      {
        to: email,
        subject: tempSubject,
        html: tempHtml
      }
    )

    // Notification info after Normalizer accepts PA (for Appraiser / Reviewer)

    let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO?.subject;
    tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

    let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO?.html;
    tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

    // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

    let appraiserEmail = emailIdsForEmployees?.employeeData?.find((item: any) => item.employee_code === employee?.appraiser_code)?.email
    let reviewerEmail = emailIdsForEmployees?.employeeData?.find((item: any) => item.employee_code === employee?.reviewer_code)?.email
    let emailInfo = NORMALIZER_ACCEPTS_PA_INFO?.to;
    // const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
    emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
    const ccemail = [`${reviewerEmail}`]
    sendEmailNotification(
      {
        to: emailInfo,
        cc: ccemail,
        subject: tempSubjectInfo,
        html: tempHtmlInfo
      }
    )

  }
  const sendEmailNotificationOnBulkAcceptGradeException = (employee: any) => {

    //variables for email notification
    let appraiserName = employee?.appraiser_name;
    let normalizerName = employee?.normalizer_name;
    let employeeName = employee?.legal_full_name;
    let calendarName = employee?.calendar?.calendar_type;
    let calendarYear = employee?.calendar?.start_date?.slice(0, 4);
    let Employee_Due_Date = employee?.calendar?.end_date_employee_acknowledgement?.slice(0, 10).split("-");// Split the date into an array [year, month, day]
    let formatted_Employee_Due_Date = `${Employee_Due_Date[2]}/${Employee_Due_Date[1]}/${Employee_Due_Date[0]}`; // Concatenate the parts in the desired format
    let employeeCode = employee?.employee_code
    let employeeFirstName = employee?.first_name;

    // Normalizer accepts Reviewer PA (for Appraiser/Reviewer) for Grade 6 to 10

    let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.subject;
    tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

    let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.html;
    tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

    // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

    let appraiserEmail = emailIdsForEmployees?.employeeData?.find((item: any) => item.employee_code === employee?.appraiser_code)?.email
    let reviewerEmail = emailIdsForEmployees?.employeeData?.find((item: any) => item.employee_code === employee?.reviewer_code)?.email
    let emailInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.to;
    // const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
    emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
    const ccemail = [`${reviewerEmail}`]
    sendEmailNotification(
      {
        to: emailInfo,
        cc: ccemail,
        subject: tempSubjectInfo,
        html: tempHtmlInfo
      }
    )

  }
  const bulkApproval = () => {
    console.log(users, 'userssssssssssssss');
    // let myAppraisalsCode = myAppraisals.map((item: any) => item.employee_code)
    // let myReviewalusers = users?.filter(
    //   (item: any) => !item?.normalizerIsDisabled && !item.normalizerIsChecked
    //     && item.appraisal.status !== "rejected" && item.reviewer.reviewer_status !== "rejected"
    // );
    // let bulkUsers = myReviewalusers.map((user: any) => user?._id)
    // const tempUser = users?.map((j: any) => {
    //   //console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
    //   return bulkUsers.includes(j?._id) ? { ...j, normalizerIsChecked: true } : j;
    // });

    let date: any = new Date()
    const normalized_Date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    let myReviewalusers = users.filter((employee: any) => employee?.normalizerIsChecked == true && employee?.normalizerIsDisabled == false)


    myReviewalusers && myReviewalusers.forEach((employee: any) => {
      let reviewerObjectiveDescription = employeeData?.data?.reviewer?.objective_description
        .map((employee: any) => {
          return {
            ...employee,
            rejection_reason: ""
          }
        })
      if (employee.isGradeException == true) {
        acceptNormalizerGradeExceptionBulk({
          // talentCategory: talentCategory?.data,
          potential: employee?.appraisal?.potential,
          // current_overallRating: employee?.current_rating?.overall_rating,
          current_overallRating: employee?.current_rating?.overall_rating,
          normalized_overallRating: employee?.current_rating?.overall_rating,
          id: employee._id,
        }).then((res: any) => {
          if (!res?.error) {
            updateLoggedRole({
              pa_action_by: `Normalizer (Bulk Accepted - Grade Exception) : ${new Date()}`,
              id: user?._id
            });
          sendEmailNotificationOnBulkAcceptGradeException(employee)         
          } else {
            updateLoggedRole({
              pa_action_by: `Normalizer (Bulk Accepted - Grade Exception) : ${res?.error} ${new Date()}`,
              id: user?._id
            });
          }
        });
      }
      else {
        let reviewerObjectiveDescription = employeeData?.data?.reviewer?.objective_description
          .map((employee: any) => {
            return {
              ...employee,
              rejection_reason: ""
            }
          })

        console.log(reviewerObjectiveDescription, "reviewerObjectiveDescription")
        acceptNormalizer({
          current_overallRating: employee?.current_rating?.overall_rating,
          reviewerObjectiveDescription: reviewerObjectiveDescription,
          normalized_Date: normalized_Date,
          // current_previous_submission: employee?.current_rating?.objective_description,
          current_previous_submission: reviewerObjectiveDescription,
          normalized_overallRating: employee?.current_rating?.overall_rating,
          id: employee?._id,
        }).then((res: any) => {
          if (!res?.error) {
            updateLoggedRole({
              pa_action_by: `Normalizer (Bulk Accepted) : ${new Date()}`,
              id: user?._id
            });
          sendEmailNotificationOnBulkAccept(employee)
          } else {
            updateLoggedRole({
              pa_action_by: `Normalizer (Bulk Accepted) : ${res?.error} : ${new Date()}`,
              id: user?._id
            });
          }
         
        });
      }
      // setUsers(tempUser);
      // console.log(myReviewalusers);
      // console.log(checkboxIdHandler(myReviewalusers));
      // acceptNormalizer({ id: checkboxIdHandler(myReviewalusers) });

    })
    setMessage("The performance appraisal was normalized.")
    approvedSuccessfully();
  }

  const getPAStatus = (j: any) => {
    // {
    //   j.normalizer
    //   .normalizer_status ===
    //   "pending" && (
    //     <p style={{ paddingLeft: "5px" }}> (Pending) </p>
    //   )
    // }
    // {
    //   j.normalizer
    //   .normalizer_status ===
    //   "draft" && <p style={{ paddingLeft: "5px" }}> (Draft) </p>
    // }
    // {
    //   j.normalizer
    //   .normalizer_status ===
    //   "accepted" && (
    //     <p style={{ paddingLeft: "5px" }}> (Accepted) </p>
    //   )
    // }
    // {
    //   j.normalizer
    //   .normalizer_status ===
    //   "rejected" && (
    //     <p style={{ paddingLeft: "5px" }}> (Rejected) </p>
    //   )
    // }
    if (
      j?.appraisal?.objective_description &&
      j?.appraisal?.objective_description?.length === 0
    )
      return " PA Not Started";
    else if (j?.appraisal?.status == "completed") return " -";
    else if (j?.appraisal?.appraiser_status === "pending" || j?.appraisal?.appraiser_status === "draft")
      return " Pending with Appraiser";

    else if (j?.appraisal?.status === "normalized")
      return " Pending with Employee";
    else if ((j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "draft"))
      return " Pending with Reviewer";
    // else if (
    //   j?.appraisal?.appraiser_status === "submitted" &&
    //   (j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "draft")
    // )
    //   return " Pending with Reviewer";
    // else if (
    //   j?.appraisal?.appraiser_status === "accepted" &&
    //   (j?.reviewer?.reviewer_status == "pending" || j?.reviewer?.reviewer_status == "appraiser-accepted" ||
    //     j?.reviewer?.reviewer_status == "draft")
    // )
    //   return " Pending with Reviewer";
    else if (
      // j.appraisal.appraiser_status === "submitted" &&
      j?.reviewer?.reviewer_status == "accepted" &&
      j?.normalizer?.normalizer_status == "pending"
    )
      return " Pending with HR Normalizer";
    else if (
      // j.appraisal.appraiser_status === "submitted" &&
      j?.reviewer?.reviewer_status == "accepted-employee" &&
      j?.normalizer?.normalizer_status == "pending"
    )
      return " Pending with HR Normalizer";
    else if (
      j?.reviewer?.reviewer_status == "accepted" &&
      j?.normalizer?.normalizer_status == "employee-rejected"
    )
      return " Pending with HR Normalizer";
    else if (j?.normalizer?.normalizer_status?.includes("draft")) return " Pending with HR Normalizer(Draft)";

    else if (j?.normalizer?.normalizer_status === "rejected")
      return " Pending with Appraiser";

    else if (
      j?.reviewer?.reviewer_status == "rejected" &&
      j?.reviewer?.rejection_count == 3 &&
      j?.normalizer?.normalizer_status == "pending"
    )
      return " Pending with HR Normalizer (Reviewer Rejected)";
    else if (j?.normalizer?.normalizer_status == "employee-rejected")
      return " Pending with HR Normalizer";
    // 5
    else if (j?.appraisal?.appraiser_status === "reviewer-rejected")
      return " Pending with Appraiser";
    else if (j?.appraisal?.appraiser_status === "normalizer-rejected")
      return " Pending with Appraiser";
    else if (j?.appraisal?.appraiser_status === "employee-rejected")
      return " Pending with Appraiser";
    // 2
    else if (
      j?.reviewer?.reviewer_status == "normalizer-rejected" ||
      j?.reviewer?.reviewer_status == "appraiser-rejected"
    )
      return "Pending with Reviewer";
    // 1
    else if (
      j?.appraisal?.appraiser_status == "normalizer-rejected" &&
      j?.appraisal?.appraiser_status == "accepted"
    )
      return "Pending with Reviewer";
    else {
      return "-"
    }

  };
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
  // const [appCodes, setappCodes] = React.useState(true);
  // const [revCodes, setrevCodes] = React.useState(true);
  // const [norCodes, setnorCodes] = React.useState(true);
  // const [statusValue, setstatusValue] = React.useState(true);
  // const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setstatusValue(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const handleAppCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
  //   setappCodes(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
  //   setrevCodes(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)

  // };
  // const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setnorCodes(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)

  // };
  const handleCodes = (event: React.ChangeEvent<HTMLInputElement>) => {

    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  //const [heading1, setheading1] = React.useState(true);

  // const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

  //   setheading1(event.target.checked);
  //   let columnHeadersTemp = columnHeaders

  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)

  // };
  // const [heading2, setheading2] = React.useState(true);
  // // console.log(heading2, "h2");
  // const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading2(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
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
  const [headingcalendar, setheadingcalendar] = React.useState(true);
  const handleheadingCalendar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingcalendar(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  }
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
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //this state is used to re-render checkbox. Pls don't removes
    setheading1(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSection(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPAStatus(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfDivision(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };

  const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSubSection(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfAppraiserName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfReviewerName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfNormalizerName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfOverallRating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPreviousRating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPotentialLevel(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfTalentCategory(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfWorkLocation(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerCode(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerPosition(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleemployeerating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemployeerating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
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
  const handleAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserRating(event.target.checked)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstName(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleRejectionStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    rejsetstatusValue(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDateData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleFunctionData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleSupervisoryRoleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisoryRoleData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleEmailIDData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIDData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerRating(event.target.checked)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizeRating(event.target.checked)
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
      ?.filter((j: any) => {
        if (enteredName === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.legal_full_name !== undefined &&
            j?.legal_full_name
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.grade !== undefined &&
            j?.grade
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.position_long_description !== undefined &&
            j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
          (j?.appraisal?.status !== undefined &&
            j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes(enteredName?.toLocaleLowerCase())) ||
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
      //if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = ""
      return exportData
    });
    //  console.log(mapped, "mapped")
    // var wb = XLSX.utils.book_new(),
    //   ws = XLSX.utils.json_to_sheet(mapped == "" ? Emptymapped : mapped);

    // XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    // XLSX.writeFile(wb, "MyExcel.xlsx");
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
      SelectAll: true,
    })
  };

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
      SelectAll: true,
    })
  };
  // const handleExport = () => {
  //   var wb = XLSX.utils.book_new(),
  //     ws = XLSX.utils.json_to_sheet(filData);

  //   XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  //   XLSX.writeFile(wb, "MyExcel.xlsx");
  // };
  //badge count
  //   useEffect(() => {
  //     let length = 0;
  //     let completedBadge = 0;
  //     let Inprogress = 0;
  //     let Notstarted = 0;
  //     let Emprejected = 0;
  //     let PendingwithReviewer = 0;
  //     if (myAppraisals) {


  //       let temp = myAppraisals;
  //       length += temp?.length;
  //       console.log(temp, "lengthlength");
  //       let temp2 = temp?.filter(
  //         (emp: any) => emp.appraisal.status === "completed"
  //       );
  //       completedBadge += temp2?.length;
  //       console.log(temp2, "temp2");
  //       let temp3 = temp?.filter(
  //         (emp: any) => emp.appraisal.status === "in-progress" || emp.appraisal.status === "normalized"
  //       );
  //       Inprogress += temp3?.length;
  //       console.log(temp3, "temp3");
  //       let temp4 = temp?.filter(
  //         (emp: any) => emp.appraisal.status === "not-started"
  //       );
  //       Notstarted += temp4?.length;
  //       console.log(temp4, "temp4");
  //       let temp5 = temp?.filter(
  //         (emp: any) => emp.appraisal.status === "rejected"
  //       );
  //       Emprejected += temp5?.length;
  //       console.log(temp5, "temp5");
  //       let temp6 = temp?.filter((emp: any) =>
  //         getPAStatus(emp)?.includes("Pending with Reviewer")
  //       );
  //       console.log(temp6, "temp6");
  //       PendingwithReviewer += temp6?.length;
  //       console.log(temp6, "temp6");
  //       if (tabValue === 0) {
  //         setShow(temp);
  //       } else if (tabValue === 1) {
  //         setShow(temp2);
  //       } else if (tabValue === 2) {
  //         setShow(temp3);
  //       } else if (tabValue === 3) {
  //         setShow(temp4);
  //       } else if (tabValue === 4) {
  //         setShow(temp5);
  //       } else if (tabValue === 5) {
  //         setShow(temp6);
  //       }
  //     };
  //     setallActions(length);
  //     setcompletedEmp(completedBadge);
  //     setinprogressEmp(Inprogress);
  //     setnotstartedEmp(Notstarted);
  //     setemployeeRej(Emprejected);
  //     setmypendingActions(PendingwithReviewer);
  //   }, [myAppraisals]);
  // Badge
  const [All, setAll] = React.useState<any>(0);
  const [completedemp, setcompletedemp] = React.useState<any>(0);
  const [inProgressemp, setinProgressemp] = React.useState<any>(0);
  const [notStartedemp, setnotStartedemp] = React.useState<any>(0);
  const [emprejected, setemprejected] = React.useState<any>(0);
  const [mypendingActions, setmypendingActions] = React.useState<any>(0);
  const [EmployeeData, setEmployeeData] = React.useState<any>([])

  useEffect(() => {
    setAll(users?.length);
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    setcompletedemp(badge?.length);
    let badge2 = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    setinProgressemp(badge2?.length);
    let badge3 = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started"
    });
    let Notstarted = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started"
    });
    // console.log(Notstarted,"Notstarted")
    setnotStartedemp(badge3?.length);
    let badge4 = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });

    setemprejected(badge4?.length);
    let badge5 = users?.filter((j: any) => {

      return getPAStatus(j)?.includes(" Pending with HR Normalizer");
      //return j?.appraisal?.pa_status?.includes(" Normalizer") 
    });


    setmypendingActions(badge5?.length);

    if (tabValue === 0) {
      setEmployeeData(users)
    } else if (tabValue === 1) {
      setEmployeeData(badge5)
    } else if (tabValue === 2) {
      setEmployeeData(Notstarted)
    } else if (tabValue === 3) {
      setEmployeeData(badge2)
    } else if (tabValue === 4) {
      setEmployeeData(badge4)
    } else if (tabValue === 5) {
      setEmployeeData(badge)
    }

  }, [users, tabValue]);


  const [activeTemplate, setactiveTemplate] = useState<any>([]);


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


  const [filData, setfilData] = React.useState<any>([]);
  //  Filter icon
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  //commented for now
  //   useEffect(() => {
  //     if (empEmployeeCode === "None" || empEmployeeCode === "") {
  //       setIcon(false);
  //     } else {
  //       setIcon(true);
  //     }
  //   }, [empEmployeeCode])
  //   useEffect(() => {
  //     if (empFullName === "None" || empFullName === "") {
  //       setIcon1(false);
  //     } else {
  //       setIcon1(true);
  //     }
  //   }, [empFullName])
  useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positionsFilter])
  useEffect(() => {
    if (GradesFilter?.length == 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter])
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen1(false);
    setMessage("")
  };

  const handleClickOpen = () => {
    let checkedLength: any = users?.filter((item: any) => item?.normalizerIsChecked == true && item?.normalizerIsDisabled == false)
    if (checkedLength?.length > 0) {
      let myReviewalusers = checkedLength && checkedLength?.filter((rejectedItem: any) => rejectedItem?.appraisal?.status == "rejected"
        || rejectedItem?.normalizer?.normalizer_PA_rejected == true
      )
      let employeecodes = checkedLength.map((data: any) => {
        return [data?.employee_code, data?.appraiser_code, data?.reviewer_code, data?.normalizer_code]
      })
      let OverallRating = checkedLength.map((item: any) => {
        return item?.current_rating?.overall_rating
      })
      console.log(OverallRating, "OverallRating")
      let hasInvalidRating = false;
      employeecodes = employeecodes?.flat()?.filter((value: any, index: any, self: any) => self.indexOf(value) === index);

      for (const rating of OverallRating) {
        console.log(rating < 3 || rating >= 4, "trueee");
        if (rating < 3 || rating >= 4) {
          hasInvalidRating = true;
          break;
        }
      }

      console.log(checkedLength, myReviewalusers, 'checkReviewerrating')
      if (myReviewalusers && myReviewalusers.length > 0) {
        setBulkOpen(true);
        setMessage("Rejected performance appraisal cannot be accepted in bulk.")
      }
      else if (hasInvalidRating) {
        setBulkOpen(true);
        setMessage("You cannot include employees with overall ratings below 3 and 4 and above in Bulk Accept. Please exclude them from the list to proceed further.");
      }
      else {
        getEmailIds({ "ecodes": employeecodes }).then((res: any) => {
          console.log(res, "EmailMutationresponse")
          //open dialog to confirm bulk accept
          setEmailIdsForEmployees(res?.data)
          setOpen(true);
        })
      }
    }
    else {
      setBulkOpen(true);
      setMessage("Please select atleast one employee.")
    }
  };


  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const reNormalizeHandler = () => {
    navigate(
      `${NORMALIZER_ACTION}/employee/${checkboxIdHandler(
        checkboxHandler(users)
      )}`
    );
  }

  // show(){

  // }
  // useEffect(()=>{
  //        const EmployeeCode =users.filter((j: any) => {
  //           j.employee_code
  //         })
  //         const EmployeeName =users.filter((j: any) => {
  //           j.legal_full_name
  //         })
  //       },[users])
  // useEffect(()=>{
  //   const initState = {
  //     Employeecode: users.filter((j: any) => {
  //       j.employee_code
  //     })
  //   }
  // })
  //  Employee:
  //   j.employee_code

  // { Position: 3 }
  // {Grade :4}
  // { PendingAction :4}
  // {AppraiserRating: 5}
  // {ReviewerRating: 6}
  // {NormalizerRating: 7}
  // const initState =[
  //    "property1":"value1",
  //      "property2":"value2",
  // ]

  //commented now
  //   const Normalizerdata = users?.map((j: any) => {
  //     return {
  //       ECode: j?.employee_code,

  //       EmployeeName: j?.legal_full_name,
  //       Position: j?.position_long_description,
  //       Grade: j?.grade,
  //       PendingAction: getPAStatus(j),
  //       AppraiserRating:
  //         j?.appraisal?.appraiser_rating == 0 ? (
  //           <p> - </p>
  //         ) : (
  //           j?.appraisal?.appraiser_rating
  //         ),
  //       ReviewerRating:
  //         j?.reviewerIsDisabled && j?.reviewer?.reviewer_rating != 0 ? (
  //           j?.reviewer?.reviewer_rating
  //         ) : (
  //           <p> - </p>
  //         ),
  //       NormalizerRating:
  //         j?.normalizerIsDisabled && j?.normalizer?.normalizer_rating != 0 ? (
  //           j?.normalizer?.normalizer_rating
  //         ) : (
  //           <p> - </p>
  //         ),

  //       Status: j?.appraisal?.status
  //       //  ? (
  //       //             <p style={{ textTransform: "capitalize" }}>{j?.appraisal?.status}</p>
  //       //             ) : (
  //       //             <p>Not Started </p>
  //       //             )
  //     };
  //   });
  //commented now
  //console.log(Normalizerdata, "data");

  const [show, setShow] = React.useState<any>(0);
  //console.log(show, "show");
  //commented now
  //   useEffect(() => {
  //     const All = Normalizerdata?.filter((j: any, index: number) => {
  //       if (tabValue === 0) {
  //         return j;
  //       }
  //     });

  //     let Completed = Normalizerdata?.filter((j: any, index: number) => {
  //       {

  //         return j?.status
  //           ?.toLocaleLowerCase()
  //           ?.includes("completed"?.toLocaleLowerCase());
  //       }
  //     });

  //     const inProgress = Normalizerdata?.filter((j: any, index: number) => {
  //       {
  //         return j?.status
  //           ?.toLocaleLowerCase()
  //           ?.includes("in-progress"?.toLocaleLowerCase()) ||
  //           j?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("normalized"?.toLocaleLowerCase())

  //       }
  //     });

  //     const notStarted = Normalizerdata?.filter((j: any, index: number) => {
  //       {
  //         console.log(j?.status?.includes("not-started"), "start");
  //         return j?.Status?.toLocaleLowerCase()?.includes(
  //           "not-started"?.toLocaleLowerCase()
  //         );
  //       }
  //     });

  //     const Rejected = Normalizerdata?.filter((j: any, index: number) => {
  //       {
  //         console.log(
  //           j?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("rejected"?.toLocaleLowerCase()),
  //           "empty"
  //         );
  //         return j?.status
  //           ?.toLocaleLowerCase()
  //           ?.includes("rejected"?.toLocaleLowerCase());
  //       }
  //     });


  //     if (tabValue === 0) {
  //       setShow(All);
  //     } else if (tabValue === 1) {
  //       setShow(users);
  //     } else if (tabValue === 2) {

  //       setShow(notStarted);
  //     } else if (tabValue === 3) {
  //       setShow(inProgress);
  //     } else if (tabValue === 4) {
  //       setShow(Rejected);
  //     } else if (tabValue === 5) {

  //       setShow(Completed);
  //     }
  //   }, [users, tabValue]);
  //commented now

  //Approve dialog
  const [errorApprove, seterrorApprove] = React.useState(false);
  const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
  const handleApprove = () => {
    const rejectfilter = users.filter((i: any) => {
      console.log(i.normalizerIsChecked, "filter");
      return i.normalizerIsChecked === true && i.normalizerIsDisabled === false;
    });
    if (rejectfilter?.length > 1) {
      seterrorApprove(true);
      setOpenAlert(true);
    } else if (rejectfilter?.length === 0) {
      setzeroselectApprove(true);
      setOpenAlert(true);
    } else {
      if (checkboxHandler(users)[0]?.appraisal?.status === "in-progress") {
        console.log("`````````````````````````````````````");
        return (
          acceptNormalizer({
            id: checkboxIdHandler(checkboxHandler(users)),
          }),
          approvedSuccessfully()
        );
      } else if (checkboxHandler(users)[0]?.appraisal?.status === "rejected") {
        // console.log(checkboxHandler(users)[0]?.appraisal?.status)
        // console.log(checkboxHandler(users), 'check33')
        //
        // checkboxIdHandler(checkboxHandler(users))
        navigate(
          `${NORMALIZER_ACTION}/employee/${checkboxIdHandler(
            checkboxHandler(users)
          )}`
        );
      }
    }
  };
  //Approve dialog
  //Alerts to dialogs
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };

  const [filterOptions, setfilterOptions] = useState<any>([]);
  const empCodeOptions = () => {
    const Dashfilter = users?.filter((j: any) => {
      if (empEmployeeCode === "None" || empEmployeeCode === "") {
        return j;
      } else {
        return j?.employee_code
          ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
        // .includes(employeeCode.toLocaleLowerCase());
      }
    })
    setfilterOptions(Dashfilter)
    //return Dashfilter;
  }
  const empNameOptions = () => {
    const Dashfilter = users?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.legal_full_name
          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
        // .includes(employeeCode.toLocaleLowerCase());
      }
    })
    setfilterOptions(Dashfilter)
    //return Dashfilter;
  }
  const empPositionOptions = () => {
    const Dashfilter = users?.filter((j: any) => {
      if (positions === "None" || positions === "") {
        return j;
      } else {
        return j?.position_long_description
          ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
        // .includes(employeeCode.toLocaleLowerCase());
      }
    })
    setfilterOptions(Dashfilter)
    //return Dashfilter;
  }
  const empGradeOptions = () => {
    const Dashfilter = users?.filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.grade
          ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
        // .includes(employeeCode.toLocaleLowerCase());
      }
    })
    setfilterOptions(Dashfilter)
    //return Dashfilter;
  }
  //Alerts to dialogs
  //commented now
  // useEffect(() => {
  //   const Dashfilter = employeeData &&
  //     users
  //       .filter((j: any) => {
  //         if (tabValue === 0) {
  //           return j;
  //         } else if (tabValue === 1) {
  //           return getPAStatus(j)?.includes(
  //             " Pending with HR Normalizer"
  //           );
  //
  //         } else if (tabValue === 2) {
  //           return j?.appraisal?.status === "not-started"
  //           // return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress"?.toLocaleLowerCase()) ||
  //           //   j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())
  //
  //         } else if (tabValue === 3) {
  //           return j?.appraisal?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("in-progress"?.toLocaleLowerCase()) ||
  //             j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase());
  //         } else if (tabValue === 4) {
  //           return j?.appraisal?.status
  //             ?.toLocaleLowerCase()
  //             ?.includes("rejected"?.toLocaleLowerCase());
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
  //           ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
  //           // .includes(employeeName?.toLocaleLowerCase());
  //         }
  //       })
  //       .filter((j: any) => {
  //         if (empEmployeeCode === "None" || empEmployeeCode === "") {
  //           return j;
  //         } else {
  //           return j?.employee_code
  //           .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
  //           // .includes(employeeCode.toLocaleLowerCase());
  //         }
  //       })
  //       .filter((j: any) => {
  //         if (positions === "None" || positions === "") {
  //           return j;
  //         } else {
  //           return j?.position_long_description
  //             ?.toLocaleLowerCase()
  //             ?.includes(positions?.toLocaleLowerCase());
  //         }
  //       })
  //       .filter((j: any) => {
  //         if (empgrades === "None" || empgrades === "") {
  //           return j;
  //         } else {
  //           return j?.grade
  //             ?.toLocaleLowerCase()
  //             ?.includes(empgrades?.toLocaleLowerCase());
  //         }
  //       })
  //       .filter((j: any) => {
  //         if (enteredName === "") {
  //           return j;
  //         } else if (
  //           (j.employee_code !== undefined &&
  //             j.employee_code
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase())) ||
  //           (j?.legal_full_name !== undefined &&
  //             j?.legal_full_name
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase())) ||
  //           (j?.grade !== undefined &&
  //             j?.grade
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase())) ||
  //           (j?.position_long_description !== undefined &&
  //             j?.position_long_description
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase())) ||
  //           (j?.appraisal?.status !== undefined &&
  //             j?.appraisal?.status
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase())) ||
  //           (getPAStatus(j) !== undefined &&
  //             getPAStatus(j)
  //               ?.toLocaleLowerCase()
  //               ?.includes(enteredName?.toLocaleLowerCase()))
  //         ) {
  //           return j;
  //         }
  //       })
  //   setactiveTemplate(Dashfilter)
  //   console.log(activeTemplate, "activeTemplate")
  // }, [users, positions, empgrades, tabValue])

  useEffect(() => {
    const mapped = employeeData &&
      users
        .filter((j: any) => {
          if (tabValue === 0) {
            return j;
          } else if (tabValue === 1) {
            return getPAStatus(j)?.includes(
              " Pending with HR Normalizer"
            );

          } else if (tabValue === 2) {
            return j?.appraisal?.status === "not-started"
            // return j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress"?.toLocaleLowerCase()) ||
            //   j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase())

          } else if (tabValue === 3) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("in-progress"?.toLocaleLowerCase()) ||
              j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized".toLocaleLowerCase());
          } else if (tabValue === 4) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("rejected"?.toLocaleLowerCase());
          } else if (tabValue === 5) {
            return j?.appraisal?.status
              ?.toLocaleLowerCase()
              ?.includes("completed"?.toLocaleLowerCase());
          }
        })
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
              .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
            // .includes(employeeCode.toLocaleLowerCase());
          }
        })

        ?.filter((j: any) => {
          if (positions === "None" || positions === "") {
            return j;
          } else {
            return j?.position_long_description
              .toLocaleLowerCase()
              .includes(positions.toLocaleLowerCase());
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
  }, [employeeData, users, empEmployeeCode, empFullName, empgrades, positions, enteredName, tabValue])

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
  // BULK ACCEPT BUTTON HOVER FUCNTION
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setbulkupdate(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setbulkupdate(null);
  };

  const openBulkHover = Boolean(bulkupdate);
  return (
    <Mytable>
      <Stack
        spacing={2}
        direction="row"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="30px"
        paddingBottom="10px"
      //paddingLeft="340px"

      // paddingBottom="14px"
      // sx={{ position: 'absolute', marginLeft: '64%' }}
      >
        <Heading> My Team</Heading>
        {/* <Heading>Employees on PA</Heading> */}
        {/* <div style={{ width: "43%" }}> */}

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
              // >The performance appraisal has been normalized.</DialogContentText>
              >{message}</DialogContentText>
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
        {/* {error && (
            <Alert severity="error">
              Multiple employees cannot be rejected - select one employee.
            </Alert>
          )}
          {zeroselect && (
            <Alert severity="error">
              Atleast one employees should be selected - select one employee.
            </Alert>
          )} */}
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
        {/* </div> */}

        <div>
          {showReNormalize && (
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                marginRight: "20px",
                background: "transparent",
                height: "35px",
                // width: "150px",
                color: "#3e8cb5"
              }}
              variant="outlined"
              onClick={() => {
                reNormalizeHandler()
              }}
            >
              Re-Normalize
            </Button>
          )}

          {!showReNormalize && tabValue != 0 && tabValue != 2 && tabValue != 3 && tabValue != 5 && (
            <>

              <Button
                aria-owns={openBulkHover ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "20px",
                  background: "transparent",
                  height: "35px",
                  // width: "150px",
                  color: "#3e8cb5"
                }}
                variant="outlined"
                onClick={handleClickOpen}
              >
                Bulk Accept
              </Button>
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

              <Button
                // disabled={acceptButton}
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "20px",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                  color: "#3e8cb5",
                  // opacity: acceptButton ? "0.5" : "1"
                }}
                variant="outlined"
                onClick={() => {
                  acceptHandler()
                }}
              >

                Accept

              </Button>

              <Button
                // disabled={rejectButton}
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "20px",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                  color: "#3e8cb5",
                  // opacity: rejectButton ? "0.5" : "1"

                }}
                variant="outlined"
                // onClick={rejectHandler}
                onClick={handleReject}
              >
                Reject
              </Button>
            </>
          )}

          <AlertDialogSuccess
            isAlertOpen={bulkOpen}
            handleAlertClose={handleCloseBulk}>
            {message}
          </AlertDialogSuccess>
          <Dialog
            // fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
          // aria-labelledby="alert-dialog-title"
          // aria-describedby="alert-dialog-description"
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
                Are you sure you wish to accept selected performance appraisal?
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
          {/* <Link to={`${NORMALIZER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(users))}`}> */}

        </div>
        {/* <Link to={`${VIEW_PREVIOUS_PAA}`}>
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
        {/*<Button*/}
        {/*    style={{*/}
        {/*        textTransform: "none",*/}

        {/*        fontSize: "16px",*/}
        {/*        fontFamily: "regular",*/}
        {/*        padding: "6px 30px",*/}
        {/*        borderRadius: "7px",*/}
        {/*        color: "#3C8BB5",*/}
        {/*    }}*/}

        {/*    variant="outlined">Cancel</Button>*/}
      </Stack>
      <Stack
        marginLeft="24px"
        marginRight="24px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor: "#E3E3E3", }}
      >
        <Tabstyles>
          <Box sx={{ maxWidth: { xs: 460, md: 730, lg: 1000 } }}>
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
                sx={{ width: "142px" }}
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
                sx={{ width: "155px" }}
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
        <div>
          <Stack direction="row" alignItems="flex-start" >
            <Searchfeild>
              <TextField
                id="outlined-basic"
                placeholder="Search Here..."
                autoComplete="off"
                // onChange={(e) => setenteredName(e.target.value)}
                onChange={handleSearchBar}
                inputProps={{ maxLength: 256 }}
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
                onClick={handleExportFunction}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
              />
            </div>
            <Link to="/myteamtableexpandviewofNormalizer"
              state={{
                // from: "Low Performers",
                tab: tabValue,
                range: { users },
              }} >
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </Link>
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
        </div>
      </Stack>




      <TableHeadings>
        <TabPanel value={tabValue} index={0}>
          <MyTeamTable
            users={EmployeeData}
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <MyTeamTable
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            users={EmployeeData}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <MyTeamTable
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            users={EmployeeData}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <MyTeamTable
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            users={EmployeeData}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <MyTeamTable
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            users={EmployeeData}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <MyTeamTable
            GradesFilter={GradesFilter}
            setGradesFilter={setGradesFilter}
            positionsFilter={positionsFilter}
            setpositionsFilter={setpositionsFilter}
            users={EmployeeData}
            tabValue={tabValue}
            tablecount={tablecount}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            handleOnCheck={handleOnCheck}
            enteredName={enteredName}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            getPAStatus={getPAStatus}
          />
        </TabPanel>
      </TableHeadings>

      <Dialog
        fullWidth
        maxWidth="md"
        open={opendialog}
        BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            boxShadow: "none",
            borderRadius: "6px",
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
              textTransform: "none",
              backgroundColor: "#004D77",
              fontSize: "15px",
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
    </Mytable>
  );
};
export default NormalizerTeamTable;