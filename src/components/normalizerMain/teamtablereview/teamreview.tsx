import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, ListItemIcon, Tooltip, Popover } from "@mui/material";
import { Stack, Tab, Tabs, Box, Typography, Menu } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import {
  useAcceptNormalizerMutation, useGetEmployeeByFilterQuery,
  useGetEmployeeByStatusQuery,
  useGetEmployeeQuery,
  useRejectNormalizerAppraisalEmployeeMutation,
} from "./../../../service";
import { useEffect } from "react";
import {
  CREATE_APPRAISAL,
  EMPLOYEE_DOWNLOAD,
  NORMALIZER_ACTION,
  NORMALIZER_APPROVE,
  NORMALIZER_PAGE,
  NORMALIZER_REJECTION,
  REVIEWER_PAGE,
  VIEW_PA,
  VIEW_PREVIOUS_PAA,
} from "./../../../constants/routes/Routing";
import UpDown from "../../assets/Images/UpDown.svg";
import Opennew from "../../assets/Imaages/Opennew.svg";
import Application from "../../assets/Images/Application.svg";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Eye from "../Reviewericons/Eyeicon.svg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import Expand from "../../reviewerMain/Reviewericons/Expand.svg";
import Newexcel from "../../reviewerMain/Reviewericons/Newexcel.svg";
import Searchlensreview from "../../reviewerMain/Reviewericons/Searchlensreview.svg";
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
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { getRequestStatusFlags } from "@reduxjs/toolkit/dist/query/core/apiState";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme:any) => ({
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
    fontSize: "13px !important" ,
    fontFamily: "Arial",
    color:"#333333",

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

const MyTeam = (props: any) => {
  const [bulkupdate, setbulkupdate] = React.useState<HTMLElement | null>(null);
  const classes = useStyles();
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { startAppraisal, employeeData, statusSort, SectionFilter, setSectionFilter, subSectionFilter, setSubSectionFilter, divisionFilter } = props;
  const navigate = useNavigate();
  //const{employee_id} = useParams()

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
  const [acceptNormalizer] = useAcceptNormalizerMutation();
  const [rejectNormalizer] = useRejectNormalizerAppraisalEmployeeMutation();
  const [tabValue, setTabValue] = React.useState<any>(0);
  const [message, setMessage] = useState("")
  const [openAlertOk, setOpenAlertOk] = useState<any>(false)

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
  //const [tablecount1, settablecount1] = React.useState<any>(0);
  // console.log(tablecount1, "tablecount1");

  // console.log(tablecount, "tablecount");

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


  useEffect(() => {
    settablecount(() => {
      if (tabValue === 0) {
        settablecount(users?.length);
      } else {
        let temp = users?.filter((j: any) => {
          if (tabValue === 1) {
            return getPAStatus(j)?.includes("Pending with HR Normalizer");

          } else if (tabValue === 2) {
            return j?.appraisal?.status === "not-started";

          } else if (tabValue === 3) {
            return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
          } else if (tabValue === 4) {
            return j?.appraisal?.status === "rejected";
          } else if (tabValue === 5) {
            return j?.appraisal?.status === "completed";
          }
        });
        return temp?.length;
      }
    });
  }, [users, tabValue]);

  //not required
  // useEffect(() => {
  //   settablecount1(() => {
  //     if (tabValue === 0) {
  //       settablecount1(Normalizerdata);
  //     } else {
  //       let temp = Normalizerdata?.filter((j: any) => {
  //         if (tabValue === 1) {
  //           return j?.Status === "completed";
  //         } else if (tabValue === 2) {
  //           return j?.Status === "not-started";
  //         } else if (tabValue === 3) {
  //           // return getPAStatus()
  //           return j?.Status === "in-progress" || j?.Status === "normalized";
  //         } else if (tabValue === 4) {
  //           return j.Status === "rejected";
  //         } else if (tabValue === 5) {
  //           return j?.PendingAction === " Pending with HR Normalizer" || " Pending with HR Normalizer(Draft)";
  //         }
  //       });
  //       return temp;
  //     }
  //   });
  // }, [users, tabValue]);

  // useEffect(() => {

  // }, [tabValue])

  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData?.data);
      //setCount(employeeData?.data?.length);
    }
  }, [employeeData]);

   //For multislect options
const [gradesArray, setgradesArray] = React.useState<any>([]);
const [positionArray, setpositionArray] = React.useState<any>([]);
const [sectionArray, setsectionArray] = React.useState<any>([]);
useEffect(() => {
  const grades = users
  .slice()
  .sort(function (a: any, b: any) {
    return a?.grade - b?.grade;
  })
  .map((i: any) => {
    return i.grade;
  });
const gradeContents = grades

  .filter((c: any, index: any) => {
    return grades.indexOf(c) === index && c != null && c != undefined;
  });
setgradesArray(gradeContents);
  const position = users
  .slice()
  ?.sort(function (a: any, b: any) {
    return a?.position_long_description?.localeCompare(b?.position_long_description);
  })
  .map((i: any) => {
    return i.position_long_description;
  });
const positionContents = position.filter((c: any, index: any) => {
  return position.indexOf(c) === index && c != null && c != undefined;
});
setpositionArray(positionContents);
  const section = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      .map((i: any) => {
        return i.section;
      });
    const sectionContents = section.filter((c: any, index: any) => {
      return section.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
}, [users])
//for section multiselect
const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
const isAllsectionFilter =
sectionArray?.length > 0 && sectionsFilter?.length === sectionArray?.length;
const handleChangeSelectsections = (event: any) => {
const value = event.target.value;
if (value[value.length - 1] === "all") {
  console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"),"newwwwww")
  setsectionsFilter(sectionsFilter?.length === sectionArray?.length ? [] : sectionArray);
  return;
}
setsectionsFilter(value);
};
  
const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
const isAllGradesFilter =
gradesArray?.length > 0 && GradesFilter?.length === gradesArray?.length;
const newsection = gradesArray?.length == GradesFilter?.length
const handleChangeSelectGrades = (event: any) => {
const value = event.target.value;
if (value[value.length - 1] === "all") {
  console.log((GradesFilter?.length === gradesArray?.length ? [] : "select all"),"newwwwww") 
  setGradesFilter(GradesFilter?.length === gradesArray?.length ? [] : gradesArray);
  return;
}
setGradesFilter(value);
};
 
const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
const isAllpositionsFilter =
positionArray?.length > 0 && positionsFilter?.length === positionArray?.length;

const handleChangeSelectPositions = (event: any) => {
const value = event.target.value;
if (value[value.length - 1] === "all") {
  console.log((positionsFilter?.length === positionArray?.length ? [] : "select all"),"newwwwww")
 
  setpositionsFilter(positionsFilter?.length === positionArray?.length ? [] : positionArray);
  return;
}
setpositionsFilter(value);
};
//For multislect options


  //not rerquired
  // useEffect(() => {
  //   if (statusSort === "") {
  //     return setTabValue(0);
  //   } else if (statusSort === "completed") {
  //     return setTabValue(1);
  //   } else if (statusSort === "In Progress") {
  //     return setTabValue(2);
  //   } else if (statusSort === "Not Started") {
  //     return setTabValue(3);
  //   } else if (statusSort === "employee rejected") {
  //     return setTabValue(4);
  //   }
  // }, [statusSort]);

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
    setUsers(tempUser);
    console.log(tempUser, "temp");
  };

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
    let myReviewalusers = users.filter((item: any) => item.normalizerIsChecked == true)
    // setUsers(tempUser);
    console.log(myReviewalusers);
    console.log(checkboxIdHandler(myReviewalusers));
    acceptNormalizer({ id: checkboxIdHandler(myReviewalusers) });
    approvedSuccessfully();
    handleClickOpen1();
  };

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
  const handleExport = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  //badge count
  // Badge
  const [All, setAll] = React.useState<any>(0);
  useEffect(() => {
    setAll(users?.length);
  }, [users]);
  const [completedemp, setcompletedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "completed";
    });
    console.log(badge?.length, "badge");
    setcompletedemp(badge?.length);
    return badge;
  }, [users]);
  const [inProgressemp, setinProgressemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "in-progress" || j?.appraisal?.status === "normalized";
    });
    console.log(badge?.length, "badge");
    setinProgressemp(badge?.length);
    return badge;
  }, [users]);
  const [notStartedemp, setnotStartedemp] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "not-started";
    });
    console.log(badge?.length, "badge");
    setnotStartedemp(badge?.length);
    return badge;
  }, [users]);
  const [emprejected, setemprejected] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      return j?.appraisal?.status === "rejected";
    });
    console.log(badge?.length, "badge");
    setemprejected(badge?.length);
    return badge;
  }, [users]);

  const [mypendingActions, setmypendingActions] = React.useState<any>(0);
  useEffect(() => {
    let badge = users?.filter((j: any) => {
      console.log(getPAStatus(j), "mmmmmmm")
      return getPAStatus(j)?.includes("Pending with HR Normalizer");
    });

    console.log(badge?.length, "badge");
    setmypendingActions(badge?.length);
    return badge;
  }, [users]);
  //filter
  // const names = [
  //   "Senior Sales Executive I - SMEs",
  //   "Supervisor - House Staff",
  //   "Storekeeper",
  //   "Messenger - Admin",
  //   "Forklift Operator",
  //   "Senior Sales Engineer II - SMEs",
  //   "Driver - Service",
  //   "Labourer - Installation",
  //   "Technician I /Driver - Service",
  //   "Labourer - Warehouse",
  //   "Driver - Warehouse",
  //   "Technician - Installation",
  //   "Technician/Driver - Installation",
  //   "Application & Design Engineer",
  //   "Labourer - Parts",
  //   "Draftsman - SO",
  //   "Senior Technician  - Service",
  //   "Technician I - Service",
  //   "Foreman - Service",
  //   "Coordinator - Service",
  //   "Labourer - Service",
  //   "Asst. Storekeeper",
  //   "Sales Manager - SMEs",
  //   "Employee Shared Services Supervisor",
  //   "Application Engineer II",
  //   "Technician I - VRF",
  //   "Sr. Sales Engineer I - SMEs",
  //   "Chief Sales Officer II",
  //   "Accountant I",
  //   "ERP Specialist II",
  //   "Sales Executive I - IR",
  //   "Administration Officer I",
  //   "Service Centre Manager - UAE",
  //   "Storekeeper - Parts",
  //   "Foreman - Installation",
  //   "Warehouse Supervisor I",
  //   "Driver - Installation",
  //   "Collections Officer I",
  //   "Service Centre Supervisor I - DXB/NE",
  //   "Technician II - Service",
  //   "Driver - HGV",
  //   "Service Centre Supervisor I - ALN",
  //   "Government Relations Officer II",
  //   "Chief Accountant",
  //   "Coordinator - Sales Operations",
  //   "Area Sales Manager - PD & SMEs",
  //   "Senior Accountant II",
  //   "Product Manager - Applied",
  //   "Guard - Admin",
  //   "Administrative Assistant - Sales Support (Retd)",
  //   "Project Operations Manager - UAE",
  //   "Parts Centre Manager",
  //   "Service Centre Supervisor I - AUH/BDZ",
  //   "Logistics Manager",
  //   "Coordinator - Admin",
  //   "Foreman - Projects",
  //   "CSR",
  //   "Administration Supervisor I",
  //   "Sales Engineer II - Government",
  //   "Sales Executive II - SMEs",
  //   "Senior Warehouse Manager - UAE",
  //   "Chief Operating Officer - Marketing & Overseas II",
  //   "Senior Coordinator - Product",
  //   "Office Boy",
  //   "Payroll Controller",
  //   "Sr. Coordinator - Fleet Services",
  //   "Sales Manager - Projects",
  //   "Senior Team Leader - Service",
  //   "Warehouse Manager I",
  //   "Sales Executive II - Goverrnment",
  //   "Asst. Technician/Driver - Service",
  //   "Sr. Project Ops Engineer II",
  //   "Logistics Specialist I",
  //   "Senior Manager - Product",
  //   "Driver - Driver HGV",
  //   "ERP Manager",
  //   "Coordinator - Service & Installation",
  //   "Chief Operating Officer - UAE",
  //   "Office Manager - HQ",
  //   "Director - Morocco Ops",
  //   "Sales Manager - Retail",
  //   "Sr. Storekeeper - Parts",
  //   "Sales Director - Iraq",
  //   "Logistics Officer - Iraq",
  //   "Cook",
  //   "Senior Technician/Driver - VRF",
  //   "Sr. Employee Relations Specialist",
  //   "Technician II/Driver - Service",
  //   "Technician II - VRF",
  //   "Chief Investment Officer",
  //   "Sales Operations Officer II",
  //   "Clearance and Store Coordinator",
  //   "Head of Business Development II",
  //   "Associate",
  //   "Sales Director - Distribution",
  //   "Sr. Product Engineer - Applied",
  //   "Coordinator - Parts",
  //   "Technical Enterprise Architect",
  //   "Senior Portfolio Manager",
  //   "Sr. Project Ops Engineer I",
  //   "Application Engineer I",
  //   "Sr. Specialist  - Business Reporting",
  //   "Showroom Representative",
  //   "Sales Engineer II - SMEs",
  //   "Operations Manager",
  //   "Senior Sales Manager - SMEs",
  //   "Assistant Manager - Product OS",
  //   "Finance Planning and Analysis Manager I",
  //   "Project Operations Administrator",
  //   "Area Sales Manager - Projects",
  //   "Office Girl",
  //   "Sales Operations Officer I",
  //   "Clerk - Sales Operations",
  //   "Senior Team Leader - Sales Operations",
  //   "Technician - Electronics",
  //   "Sr. Payroll Officer",
  //   "Senior Accountant I",
  //   "Office Manager - Private Office",
  //   "Sales Operations Supervisor",
  //   "Senior Foreman",
  //   "Coordinator - Installation",
  //   "Senior Sales Engineer I - Projects",
  //   "Stakeholder Relationship Director",
  //   "Sales Operations Engineer I",
  //   "Sales Executive II - IR",
  //   "Product Engineer II",
  //   "Senior Sales Executive I - IR",
  //   "Product Engineer I",
  //   "Continuous Improvement Engineer I",
  //   "Business Analysis & Sales Planning Manager",
  //   "Sales Director - Projects and SMEs",
  //   "Service Engineer II - VRF",
  //   "Senior Team Leader - Call Centre",
  //   "Project Ops Engineer I",
  //   "Senior Showroom Representative",
  //   "Senior Director - CI, IT & BA",
  //   "Digital Solutions Business Partner II",
  //   "Call Centre Operator",
  //   "Business Development Manager II",
  //   "House Supervisor & Driver",
  //   "IT Support Engineer I",
  //   "Operations Planner",
  //   "Executive Assistant II",
  //   "Treasury Officer II",
  //   "Product Engineer I/Trainer",
  //   "Driver - House Staff",
  //   "Credit Controller",
  //   "Draftsman - Projects",
  //   "Application & Design Manager",
  //   "HR Specialist I",
  //   "Continuous Improvement Specialist I",
  //   "House Maid",
  //   "Senior Collections Controller",
  //   "Head of Information Technology II",
  //   "Business Development Manager I",
  //   "E-commerce and Marketing Manager",
  //   "Personal Assistant - HS",
  //   "Merchandiser - OR",
  //   "Market Intelligence Engineer I",
  //   "Sales Engineer I - SMEs",
  //   "Jr. Showroom Representative",
  //   "Merchandiser - IR",
  //   "Facilities Technician II",
  //   "Technical Support Manager - CAC",
  //   "Logistics Supervisor",
  //   "Visual Merchandisingr Executive II",
  //   "Sr. Marketing Executive I",
  //   "Accountant II",
  //   "Sales Operations Assistant",
  //   "Collections Officer II",
  //   "Coordinator - Government Sales",
  //   "Junior Sales Operations Engineer",
  //   "Caretaker",
  //   "Asst. Manager - Application and Design",
  //   "Controls Engineer II",
  //   "Kitchen Helper",
  //   "Trainee - Engineering",
  //   "Senior Sales Engineer II - Gov",
  //   "Retail Supervisor",
  //   "Projects and Facilities Supervisor I",
  //   "Projects Manager - Iraq",
  //   "Wholesale Manager",
  //   "Massage & BeautyTherapist",
  //   "Sales Manager II - Applied",
  //   "Managing Director",
  //   "Sales Manager",
  //   "Senior Sales Manager - Government",
  //   "Senior Director - Engineering",
  //   "Stock Controller",
  //   "Foreman - Service & Installation",
  //   "Technical Support Specialist II - VRF",
  //   "Branch Manager - Jordan",
  //   "Coordinator - Sales Operations (Retd)",
  //   "Director - Operations OS",
  //   "Sales Operations and Projects Manager",
  //   "Sr. Application & Design Engineer I",
  //   "Senior Sales Executive II - SMEs",
  //   "Sr. Draftsman - Appl & Design",
  //   "Senior Director - Operations",
  //   "Talent Manager I",
  //   "Stock Coordinator",
  //   "Senior Technician - VRF",
  //   "Chief People and Capability Officer II",
  //   "Sr. ERP Specialist",
  //   "IT Support Supervisor",
  //   "Logistics Officer I",
  //   "Collection Specialist II",
  //   "Sales Manager - Government",
  //   "Sales Engineer II - Projects",
  //   "Senior Manager - Human Resources",
  //   "Senior Manager - Administration",
  //   "Asst Sales Manager - Export",
  //   "Showroom Rep (Mobile)",
  //   "Chief Finance Officer II",
  //   "Head of Finance and Treasury",
  //   "Sales Operations Engineer II",
  // ];
  // const Grades = [
  //   "15",
  //   "9_HS",
  //   "11",
  //   "8",
  //   "7",
  //   "16",
  //   "6",
  //   "9",
  //   "14",
  //   "10",
  //   "12",
  //   "17",
  //   "23",
  // ];
  const [activeTemplate, setactiveTemplate] = useState<any>([]);


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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen1(false);
  };

  const handleClickOpen = () => {
    let checkedLength = users?.filter((item: any) => item?.normalizerIsChecked == true && item?.reviewerIsDisabled == false)
    if (checkedLength?.length > 0) {
      let myReviewalusers = checkedLength && checkedLength?.filter((rejectedItem: any) => rejectedItem?.appraisal?.status == "rejected"
        || rejectedItem?.reviewer?.reviewer_status == "rejected"
      )

      if (myReviewalusers && myReviewalusers.length > 0) {
        setBulkOpen(true);
        setMessage("Rejected performance appraisal cannot be accepted in bulk.")
      } else {
        setOpen(true);
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
  const Normalizerdata = users?.map((j: any) => {
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
        j?.reviewerIsDisabled && j?.reviewer?.reviewer_rating != 0 ? (
          j?.reviewer?.reviewer_rating
        ) : (
          <p> - </p>
        ),
      NormalizerRating:
        j?.normalizerIsDisabled && j?.normalizer?.normalizer_rating != 0 ? (
          j?.normalizer?.normalizer_rating
        ) : (
          <p> - </p>
        ),

      Status: j?.appraisal?.status
      //  ? (
      //             <p style={{ textTransform: "capitalize" }}>{j?.appraisal?.status}</p>
      //             ) : (
      //             <p>Not Started </p>
      //             )
    };
  });
  console.log(Normalizerdata, "data");

  const [show, setShow] = React.useState<any>(0);
  console.log(show, "show");

  useEffect(() => {
    const All = Normalizerdata?.filter((j: any, index: number) => {
      if (tabValue === 0) {
        return j;
      }
    });
    //console.log(All, "All");
    let Completed = Normalizerdata?.filter((j: any, index: number) => {
      {
        console.log(
          j.Status?.toLocaleLowerCase()?.includes(
            "not-started"?.toLocaleLowerCase()
          ),
          "position"
        );
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("completed"?.toLocaleLowerCase());
      }
    });
    //console.log(Completed, "Condition");
    const inProgress = Normalizerdata?.filter((j: any, index: number) => {
      {
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("in-progress"?.toLocaleLowerCase()) ||
          j?.status
            ?.toLocaleLowerCase()
            ?.includes("normalized"?.toLocaleLowerCase())

      }
    });
    //console.log(inProgress, "inProgress");

    const notStarted = Normalizerdata?.filter((j: any, index: number) => {
      {
        console.log(j?.status?.includes("not-started"), "start");
        return j?.Status?.toLocaleLowerCase()?.includes(
          "not-started"?.toLocaleLowerCase()
        );
      }
    });
    //console.log(notStarted, "notStarted");
    const Rejected = Normalizerdata?.filter((j: any, index: number) => {
      {
        console.log(
          j?.status
            ?.toLocaleLowerCase()
            ?.includes("rejected"?.toLocaleLowerCase()),
          "empty"
        );
        return j?.status
          ?.toLocaleLowerCase()
          ?.includes("rejected"?.toLocaleLowerCase());
      }
    });
    //console.log(Rejected, "Rejected");
    // const PaActions =Normalizerdata?.filter((j: any,index:number) => {
    //   {
    //     return getPAStatus(j)?.includes("Pending with HR Normalizer");
    //   }
    // })
    // console.log(PaActions,"PaActions")

    if (tabValue === 0) {
      setShow(All);
    } else if (tabValue === 1) {
      setShow(users);
    } else if (tabValue === 2) {

      setShow(notStarted);
    } else if (tabValue === 3) {
      setShow(inProgress);
    } else if (tabValue === 4) {
      setShow(Rejected);
    } else if (tabValue === 5) {

      setShow(Completed);
    }
  }, [users, tabValue]);

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

 // BULK ACCEPT BUTTON HOVER FUCNTION
 const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
  setbulkupdate(event.currentTarget);
};

const handlePopoverClose = () => {
  setbulkupdate(null);
};

const openBulkHover = Boolean(bulkupdate);

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

  // useEffect(() => {
  //   const mapped = employeeData &&
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
  //       ?.filter((j: any) => {
  //         if (empEmployeeCode === "None" || empEmployeeCode === "") {
  //           return j;
  //         } else {
  //           return j?.employee_code
  //           .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
  //           // .includes(employeeCode.toLocaleLowerCase());
  //         }
  //       })
  //
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
  //
  //           ECode: j.employee_code,
  //           EmployeeName: j.legal_full_name,
  //
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
  //
  //           Status: getStatus(j?.appraisal?.status),
  //
  //         };
  //
  //       })
  //   // if (tabValue == 0) {
  //   setfilData(mapped)
  //   // }
  //   console.log(mapped, "mapped")
  // }, [employeeData, users, empEmployeeCode, empFullName, empgrades, positions, enteredName, tabValue])
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
            marginTop:"5px",
          },
        }}
      >
        <Typography 
        style={{
                        padding: "3px",
                        fontSize: "9px",
                        color: "#333333",
                        fontFamily: "Arial",
                        textAlign:"justify"
                      }}>Bulk accept is used for the PA rating acceptance without reviewing the PA details.</Typography>
      </Popover>

          <AlertDialogSuccess
            isAlertOpen={bulkOpen}
            handleAlertClose={handleCloseBulk}>
            {message}
          </AlertDialogSuccess>
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
                Are you sure you wish to accept the selected performance appraisal?
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
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              marginRight: "20px",
              background: "transparent",
              height: "35px",
              width: "70px",
              color: "#3e8cb5"
            }}
            variant="outlined"
            onClick={() => {
              acceptHandler()
            }}
          // onClick={() => {
          //   acceptNormalizer({ id: checkboxIdHandler(checkboxHandler(users)) });
          // }}
          // onClick={() => {
          //   handleApprove();
          // if(checkboxHandler(users)[0]?.appraisal?.status === 'in-progress') {
          //   console.log('`````````````````````````````````````')
          //   return (
          //     acceptNormalizer({
          //       id: checkboxIdHandler(checkboxHandler(users)),
          //     }),
          //     approvedSuccessfully()
          //   );

          // } else if (checkboxHandler(users)[0]?.appraisal?.status === 'rejected') {

          //   // console.log(checkboxHandler(users)[0]?.appraisal?.status)
          //   // console.log(checkboxHandler(users), 'check33')
          //   //
          //   // checkboxIdHandler(checkboxHandler(users))
          //   navigate(`${NORMALIZER_ACTION}/employee/${checkboxIdHandler(checkboxHandler(users))}`)
          // }
          // }}
          >

            Accept

          </Button>
          {/* </Link> */}
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
          </Link> */}
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
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
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
        </Tabstyles>
        <div>
          <Stack direction="row" alignItems="flex-start" >
            <Searchfeild>
              <TextField
                id="outlined-basic"
                placeholder="Search Here..."
                autoComplete="off"
                //onChange={(e) => setenteredName(e.target.value)}
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
                onClick={handleExport}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer"  }}
              />
            </div>
            <Link to="/myteamtableexpandviewofNormalizer" >
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </Link>
          </Stack>
        </div>
      </Stack>



      {users &&
        users.map((objDesc: any, index: number) => {
          console.log(index, tabValue, "index");

          return (
            <TableHeadings>
              <TabPanel value={tabValue} index={index}>
                <TableContainer>
                  <Table
                    //style={{cursor:"pointer"}} 
                    aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" width="2.5%"></TableCell>
                        <TableCell align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                            // bgcolor: "#ebf2f4",
                          }}
                          width="7%">
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
                                  height: "200px",
                                  width: "90px"
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
                                    justifyContent: "center"
                                    //paddingLeft: "15px",
                                    //height:"200px"
                                  }}
                                  key="None"
                                  value="None"
                                  onClick={handleTarget}
                                >None
                                </MenuItem>
                                {activeTemplate
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.employee_code - b?.employee_code;
                                  })
                                  .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                  ?.map((j: any) => (
                                    <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        justifyContent: "left",
                                        width: "100px",
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
                            </Stack> */}
                          </div>
                        </TableCell>
                        {/* <TableCell
                          align="center"
                          width="5%"

                        > */}

                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span style={{
                                color: "#3e8cb5",
                                fontSize: "14px",
                                fontWeight: "600",
                                fontFamily: "Arial",
                                border: "none",
                                background: "none",
                                maxWidth: "90px",
                                wordWrap: "break-word",
                                // margin:"-5px"
                                textAlign: "center"
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

                                {activeTemplate
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

                        {/* </TableCell> */}
                        <TableCell align="center" width="20%">
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
                            <Stack direction="row" alignItems="center" justifyContent="center" >
                              <div
                                aria-controls={openFullName ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={openFullName ? "true" : undefined}
                                onClick={handleClickFullName}
                              >
                                Employee Name
                                {/* <Stack direction="row" alignItems="center">
                                  Employee Name
                                  <ArrowDropDownOutlinedIcon />
                                </Stack> */}
                              </div>
                              {/* <Menu
                                MenuListProps={{
                                  "aria-labelledby": "fade-button",

                                }}
                                sx={{
                                  height: "200px",
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
                                    justifyContent: "left"
                                    //paddingLeft: "15px",
                                    //height:"200px"
                                  }}
                                  key="None"
                                  value="None"
                                  //name="None"
                                  onClick={handleTargetFullName}
                                >None
                                </MenuItem>
                                {activeTemplate
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                  })
                                  .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                  ?.map((name: any) => (
                                    <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        justifyContent: "left",
                                        width: "200px",
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
                              {icon1 && <FilterAltTwoToneIcon />} */}
                            </Stack>
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

                                  {activeTemplate
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) {
                                      return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                    })
                                    // .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
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
                          </div>
                        </TableCell>
                        <TableCell align="center" width="15%">
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
                                  sx={{ width: "25px", fontSize: "0rem" }}
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
                          size="small"
                          style={{ padding: "3px", paddingLeft: "14px" }}
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
                          fontSize: "14px",
                          fontFamily: "Arial",
                          color: "#333333",
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
                            size="small"
                            style={{ padding: "3px", paddingLeft: "14px" }}
                            checked={positionsFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                            {/* <Stack direction="row" alignItems="center" >
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
                            paddingLeft: "5px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetservicePosition}
                           >None
                           </MenuItem>
                           {activeTemplate
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
                                        paddingLeft: "5px",
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
                            {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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

                                  {activeTemplate
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
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
                            </FormControl> */}
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
                                  sx={{ width: "25px", fontSize: "0rem" }}
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
                          size="small"
                          style={{ padding: "3px", paddingLeft: "14px" }}
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
                            size="small"
                            style={{ padding: "3px", paddingLeft: "14px" }}
                            checked={GradesFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
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
                                    ?.slice()?.sort(function (a: any, b: any) {
                                      return a.grade - b.grade;
                                    })?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
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
                        <TableCell align="center" width="15%">
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
                        </TableCell>
                        {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                          <TableCell>
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
                              Overall Rating
                            </div>
                          </TableCell>
                        )}
                        {tabValue == 4 && (
                          <>
                            <TableCell
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
                                  // maxWidth: "100px",
                                  wordWrap: "break-word",
                                  // margin:"-5px"
                                  // whiteSpace: "pre-line",
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
                                // maxWidth: "100px",
                                wordWrap: "break-word",
                                // margin:"-5px"
                              }}
                            >
                              Appraiser <br></br> Rating
                            </div>
                          </TableCell>
                        )}
                        {tabValue != 0 && tabValue != 5 && (
                          <TableCell
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
                                // maxWidth: "100px",
                                wordWrap: "break-word",
                                // margin:"-5px"
                              }}
                            >
                              Reviewer <br></br>Rating
                            </div>
                          </TableCell>
                        )}
                        {tabValue != 0 && tabValue != 5 && (
                          <TableCell
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
                                // maxWidth: "100px",
                                wordWrap: "break-word",
                                // margin:"-5px"
                              }}
                            >
                              HR Normalizer <br></br> Rating
                            </div>
                          </TableCell>
                        )}
                        {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (
                          <TableCell align="center" width="6%">
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
                              Previous<br></br> Rating
                            </div>
                          </TableCell>
                        )}
                        <TableCell align="center" width="6%">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              border: "none",
                              background: "none",
                              // textAlign: "center",
                              //  marginRight:"5px"
                              maxWidth: "80px",
                            }}
                          >
                            Status
                          </div>
                        </TableCell>
                        <TableCell
                          style={{
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                            textAlign: "center",
                          }}
                          align="left"
                          width="6%"
                        >
                          View PA
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      // onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                    /> */}
                    <TableBody>
                      {employeeData &&
                        users
                          .filter((j: any) => {

                            if (tabValue === 0) {
                              return j;
                            } else if (index === 1) {
                              return getPAStatus(j)?.includes(
                                "Pending with HR Normalizer"
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
                          .filter((j: any) => {
                            if (empEmployeeCode === "None" || empEmployeeCode === "") {
                              return j;
                            } else {
                              return j?.employee_code
                                .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
                              // .includes(employeeCode.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (positions === "None" || positions === "") {
                              return j;
                            } else {
                              return j?.position_long_description
                                ?.toLocaleLowerCase()
                                ?.includes(positions?.toLocaleLowerCase());
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
                          ?.filter((item1: any) => {
                            if (divisionFilter?.includes("None") || divisionFilter?.length === 0) {
                              return item1;
                            } else {
                              return !!divisionFilter?.find((item2: any) => item1?.division === item2)
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
                                ?.toLocaleLowerCase()
                                ?.includes(empgrades?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          // stableSort(
                          //   (rowsPerPage > 0
                          //     ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          //     : users
                          //   ),
                          //   getComparator(order, orderBy))
                          .map((j: any) => {
                            console.log(j?.appraisal?.status, "index");
                            // if ( tabValue === 1){
                            //      return j
                            // }
                            return (
                              <TableRow
                                key={j.employee_code}
                                sx={{ border: 0 }}
                              >
                                <TableCell align="center" padding="checkbox">
                                  {/* <Checkbox
                                                                                     color="default"
                                                                                     // checked={isItemSelected}
                                                                                     // inputProps={{
                                                                                     //   'aria-labelledby': labelId,
                                                                                     // }}
                                                                                  /> */}

                                  <input
                                    // onChange={checkboxHandler}
                                    name={j._id}
                                    //checked={j?.isChecked || false}
                                    //checked={j.normalizerIsChecked === true ? true: false}
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
                                  // value={[j._id, j.name]}
                                  />
                                </TableCell>
                                <TableCell
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "333333",
                                    cursor: "pointer",
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
                                    color: "333333",
                                  }}
                                  component="th"
                                  scope="row"
                                  width="20%"
                                >
                                  {/* <Link
                                                                                    to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                                                                                // onClick={() => startAppraisal(j._id)}
                                                                                > */}
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1.5}
                                  >
                                    {/* <Avatar> {j.legal_full_name[0]}</Avatar> */}
                                    <Names>
                                      <p
                                        onClick={() =>
                                          j.normalizer.normalizer_status ==
                                          "draft" &&
                                          navigate(
                                            `${NORMALIZER_REJECTION}/employee/${j._id} `
                                          )
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        {j?.legal_full_name}
                                      </p>
                                    </Names>
                                  </Stack>
                                  {/* </Link> */}
                                </TableCell>

                                <TableCell align="left">
                                  {j?.position_long_description}
                                </TableCell>
                                <TableCell width="5%"
                                  // align="left"
                                  style={{ textAlign: "center", paddingRight: "30px" }}>{j.grade}</TableCell>
                                <TableCell align="left" sx={{ width: "15%" }}>
                                  {getPAStatus(j)}
                                  {/* {getPAStatus(j)} */}
                                </TableCell>
                                {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                                  <TableCell align="left">
                                    {/* {getStatus(j?.appraisal?.status)} */}
                                    {(j?.appraisal?.status == "completed") ? (j?.normalizer?.normalizer_rating) : "-"}
                                  </TableCell>

                                )}
                                {tabValue == 4 && (
                                  <TableCell align="center"
                                 sx={{
                                    color:
                                      j.employee.employee_status ==  "rejected"
                                        ? "red"
                                        : "#333333",
                                  }}
                                  >
                                    <>
                                      {j.employee?.employee_rating == 0 ? (
                                        <span> - </span>
                                      ) : (
                                        j.employee?.employee_rating
                                      )}
                                    </>
                                  </TableCell>
                                )}
                                 {tabValue != 0 &&  tabValue != 5 &&(
                                <TableCell align="center"
                                  sx={{
                                    color:
                                      j?.appraisal?.appraiser_status ===
                                        "appraiser-rejected"
                                        ? "red"
                                        : "#333333",
                                  }} >
                                  {(j?.appraisal?.appraiser_rating == 0 || j.appraisal.appraiser_status == "draft") ? (
                                    <span> - </span>
                                  ) : (
                                    j?.appraisal?.appraiser_rating
                                  )}
                                </TableCell>
                                 )}
                                  {tabValue != 0 &&  tabValue != 5 &&(
                                <TableCell
                                  sx={{
                                    color:
                                      j?.reviewer?.reviewer_status ===
                                        "rejected"
                                        ? "red"
                                        : "#333333",
                                  }}
                                  align="center"
                                >
                                  {
                                    // j?.reviewerIsDisabled &&
                                    (j?.reviewer?.reviewer_rating == 0 || j?.reviewer?.reviewer_status == "draft") ? (
                                      <span> - </span>
                                    ) : (
                                      j?.reviewer?.reviewer_rating
                                    )}{" "}
                                </TableCell>
                                  )}
                                   {tabValue != 0 &&  tabValue != 5 &&(
                                <TableCell
                                  sx={{
                                    color:
                                      j?.normalizer?.normalizer_status ===
                                        "rejected"
                                        ? "red"
                                        : "#333333",
                                  }}
                                  align="center">
                                  {
                                    // j?.normalizerIsDisabled &&
                                    j?.normalizer?.normalizer_rating != 0 ? (
                                      j?.normalizer?.normalizer_rating
                                    ) : (
                                      <span> - </span>
                                    )}
                                </TableCell>
                                   )}
                             {tabValue != 1 && tabValue != 2 &&  tabValue != 3 && tabValue != 4 &&(
                                  <TableCell
                                    align="center">
                                    {j?.previous_rating}
                                  </TableCell>
                                )}
                                <TableCell
                                  align="center">
                                  {/* {j?.appraisal?.status ? (
                                    <p style={{ textTransform: "capitalize" }}>
                                      {j?.appraisal?.status}
                                    </p>
                                  ) : (
                                    <p>Not Started </p>
                                  )} */}
                                  {getStatus(j?.appraisal?.status)}
                                </TableCell>

                                <TableCell width="6%"
                                  align="center">

                                  <Link
                                    to={`${VIEW_PA}/employee/${j._id}`}
                                    target="_blank"
                                  >
                                    <img src={Eye} alt="icon" />
                                  </Link>
                                </TableCell>
                              </TableRow>
                              // <ExpandableTableRow
                              //   key={j.name}
                              //   expandComponent={
                              //     <TableCell colSpan={9}>
                              //       <TableBody>
                              //         {users &&
                              //           users.map((j: any) => {
                              //             console.log(
                              //               j?.appraisal?.status,
                              //               "index"
                              //             );

                              //             return (
                              //               <TableRow
                              //                 key={j.name}
                              //                 sx={{ border: 0 }}
                              //               >
                              //                 {/* <Link to={`${CREATE_APPRAISAL}/employee/${j._id}`}>
                              //                                                                  <TableCell component="th" scope="row">{j.name}</TableCell>
                              //                                                                   </Link> */}
                              //                 <TableCell padding="checkbox">
                              //                   {/* <Checkbox
                              //                                                                        color="default"
                              //                                                                        // checked={isItemSelected}
                              //                                                                        // inputProps={{
                              //                                                                        //   'aria-labelledby': labelId,
                              //                                                                        // }}
                              //                                                                     /> */}

                              //                   <input
                              //                     // onChange={checkboxHandler}
                              //                     name={j._id}
                              //                     //checked={j?.isChecked || false}
                              //                     //checked={j.normalizerIsChecked === true ? true: false}
                              //                     checked={
                              //                       j.normalizerIsChecked
                              //                     }
                              //                     onChange={handleOnCheck}
                              //                     type="checkbox"
                              //                     style={{
                              //                       height: "18px",
                              //                       width: "18px",
                              //                       borderColor: "#D5D5D5",
                              //                     }}
                              //                     disabled={
                              //                       j.normalizerIsDisabled
                              //                     }
                              //                   // value={[j._id, j.name]}
                              //                   />
                              //                 </TableCell>
                              //                 <TableCell
                              //                   component="th"
                              //                   scope="row"
                              //                   sx={{ width: "20%" }}
                              //                 >
                              //                   {/* <Link
                              //                                                                       to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                              //                                                                   // onClick={() => startAppraisal(j._id)}
                              //                                                                   > */}
                              //                   <Stack direction="row" alignItems="baseline">
                              //                     <Avatar>i</Avatar>
                              //                     <Names>
                              //                       <p
                              //                         onClick={() =>
                              //                           j.normalizer
                              //                             .normalizer_status ==
                              //                           "draft" &&
                              //                           navigate(
                              //                             `${NORMALIZER_PAGE}/employee/${j._id} `
                              //                           )
                              //                         }
                              //                       >
                              //                         {j.name}
                              //                       </p>
                              //                     </Names>
                              //                     {j.normalizer
                              //                       .normalizer_status ===
                              //                       "pending" && (
                              //                         <p style={{ paddingLeft: "5px" }}> (Pending) </p>
                              //                       )}
                              //                     {j.normalizer
                              //                       .normalizer_status ===
                              //                       "draft" && <p style={{ paddingLeft: "5px" }}> (Draft) </p>}
                              //                     {j.normalizer
                              //                       .normalizer_status ===
                              //                       "accepted" && (
                              //                         <p style={{ paddingLeft: "5px" }}> (Accepted) </p>
                              //                       )}
                              //                     {j.normalizer
                              //                       .normalizer_status ===
                              //                       "rejected" && (
                              //                         <p style={{ paddingLeft: "5px" }}> (Rejected) </p>
                              //                       )}
                              //                   </Stack>
                              //                   {/* </Link> */}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "170px" }}
                              //                   align="left"
                              //                 >
                              //                   {j.position}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "90px" }}
                              //                   align="center"
                              //                 >
                              //                   {j.grade}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "160px" }}
                              //                   align="center"
                              //                 >
                              //                   {j.appraisal.appraiser_rating}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "160px" }}
                              //                   align="center"
                              //                 >
                              //                   {j.reviewerIsDisabled ? (
                              //                     j.reviewer.reviewer_rating
                              //                   ) : (
                              //                     <p> - </p>
                              //                   )}{" "}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "182px" }}
                              //                   align="center"
                              //                 >
                              //                   {j.normalizerIsDisabled ? (
                              //                     j.normalizer.normalizer_rating
                              //                   ) : (
                              //                     <p> - </p>
                              //                   )}
                              //                 </TableCell>
                              //                 <TableCell
                              //                   sx={{ width: "90px" }}
                              //                   align="left"
                              //                 >
                              //                   {j?.appraisal?.status ? (
                              //                     <p>{j?.appraisal?.status}</p>
                              //                   ) : (
                              //                     <p>Not Started </p>
                              //                   )}
                              //                 </TableCell>
                              //                 <Link to={`/appraiser/employee/${j._id}`}>
                              //                   <TableCell
                              //                     sx={{ width: "90px" }}
                              //                     align="center"
                              //                   >
                              //                     <img src={Eye} alt="icon" />
                              //                   </TableCell>
                              //                 </Link>
                              //               </TableRow>
                              //             );
                              //           })}
                              //       </TableBody>
                              //     </TableCell>
                              //   }
                              // >
                              //   <TableCell style={{ width: "23%" }} component="th" scope="row">
                              //     {/* <Link
                              //                                           to={`${CREATE_APPRAISAL}/employee/${j._id}`}
                              //                                       // onClick={() => startAppraisal(j._id)}
                              //                                       > */}
                              //     <Stack direction="row">
                              //       <Avatar>H</Avatar>
                              //       <Names> {j.name}</Names>
                              //     </Stack>
                              //     {/* </Link> */}
                              //   </TableCell>
                              //   <TableCell align="left">{j.position}</TableCell>
                              //   <TableCell align="center">{j.grade}</TableCell>
                              //   <TableCell align="center">
                              //     {j.appraisal.appraiser_rating}
                              //   </TableCell>
                              //   <TableCell align="center">
                              //     {j.reviewerIsDisabled ? (
                              //       j.reviewer.reviewer_rating
                              //     ) : (
                              //       <p> - </p>
                              //     )}{" "}
                              //   </TableCell>
                              //   <TableCell align="center">
                              //     {j.normalizerIsDisabled ? (
                              //       j.normalizer.normalizer_rating
                              //     ) : (
                              //       <p> - </p>
                              //     )}
                              //   </TableCell>
                              //   <TableCell align="left">
                              //     {j?.appraisal?.status ? (
                              //       <p>{j?.appraisal?.status}</p>
                              //     ) : (
                              //       <p>Not Started </p>
                              //     )}
                              //   </TableCell>
                              //   <TableCell align="center">
                              //     <img src={Eye} alt="icon" />
                              //   </TableCell>
                              // </ExpandableTableRow>
                            );
                          })}
                    </TableBody>
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
              </TabPanel>
            </TableHeadings>
          );
        })}
      <Dialog
        // style={{
        //   marginTop: "110px",
        //   height: "calc(100vh - 250px)",
        // }}
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
        {/* <DialogTitle
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
        </DialogTitle> */}
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
    </Mytable>
  );
};
export default MyTeam;