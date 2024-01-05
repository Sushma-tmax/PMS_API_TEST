import * as React from "react";
import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Badge, FormControl, Grid, MenuItem, BadgeProps, Stack, FormControlLabel, FormGroup ,Tooltip, Popover} from "@mui/material";
import { Tab, Tabs, Box, Typography, Drawer } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { TextField } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Scrollbar from "react-scrollbars-custom";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import {
     useAcceptReviewerMutation,
     useGetEmployeeQuery,
     useRejectReviewerAppraisalEmployeeMutation,
     useUpdateEmployeeAppraisalMutation,
     useGetEmployeeByFilterQuery
} from "./../../../service";
import { useEffect } from "react";
import {
     CREATE_APPRAISAL,
     EMPLOYEE_DOWNLOAD,
     REVIEWER_PAGE,
     REVIEWER_APPROVE,
     VIEW_PA,
     VIEW_PREVIOUS_PA,
     REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION,
     REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION,
     REVIEWER_REJECT_APPRAISER_NORMALIZER_REJECTION,
     REVIEWER_VIEW_PA,
     REVIEWER_ACCEPT_APPRAISER_NORMALIZER_REJECTION,
     REVIEWER_REJECTION,
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
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import * as XLSX from "xlsx";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useAcceptReviewerRatingsMutation } from "../../../service/employee/appraisal/appraisal";
import AlertDialogSuccess from "../../UI/DialogSuccess";
const Mytable = styled("div")({
     background: "#FFFFFF",
     marginLeft: "25px",
     marginRight: "25px",
     position: "relative",
});
const Scroll = styled("div")({
     "& .ScrollbarsCustom-Thumb": {
          background: "#C2C1C1 !important",
     },
     "& .ScrollbarsCustom-Track": {

          //width:"10px !important"
     },
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
     // // paddingTop: "15px",
     // marginLeft: "20px",
});
const Searchfeild = styled("div")({
     // position: "absolute",
     // marginLeft: "80%",
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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
     "& .MuiBadge-badge": {
          right: -17,
          top: 8,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: "0 4px",
     },
}));

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
const Names = styled("div")({
     // marginLeft: "20px",
     // marginTop: "10px",
     color: "#333333",
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
                         {/* <TableCell padding="checkbox" /> */}
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
     pastatus: any;
     status: any;
     grade: any;
     name: any;
     protein: any;
     Appraiser_Rating: any;
     Reviewer_Rating: any;
     Normalizer_Rating: any;
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
          label: "Pending Action",
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

const MyAction = (props: any) => {
     const [bulkupdate, setbulkupdate] = React.useState<HTMLElement | null>(null);
     const [opendialog, setOpendialog] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
     const { statusSort, SectionFilter, setSectionFilter,
          subSectionFilter, setSubSectionFilter, valueOfCard } = props;
     const { data: employeeData } = useGetEmployeeQuery("all");
     console.log(employeeData, "employeeData")
     const navigate = useNavigate();
     const CustomScrollbar = Scrollbar as any;

     const handleDialogOpen = () => {
          setOpendialog(true);
     };

     const handleDialogClose = () => {
          setOpendialog(false);
          setIsOpen(false);
     };

     const handleDialogNo = () => {
          setOpendialog(false);
          setIsOpen(true);
     };

     const [order, setOrder] = React.useState<Order>("asc");
     const [orderBy, setOrderBy] = React.useState<keyof Data>("position");
     const [selected, setSelected] = React.useState<readonly string[]>([]);
     const [bulkOpen, setBulkOpen] = useState(false);
     const [message, setMessage] = useState("");

     const handleRequestSort = (
          event: React.MouseEvent<unknown>,
          property: keyof Data
     ) => {
          const isAsc = orderBy === property && order === "asc";
          setOrder(isAsc ? "desc" : "asc");
          setOrderBy(property);
     };

     const { startAppraisal, empData } = props;
     const [acceptReviewer] = useAcceptReviewerMutation();
     const [acceptReviewerRatings] = useAcceptReviewerRatingsMutation();
     const [rejectReviewer] = useRejectReviewerAppraisalEmployeeMutation();
     const [tabValue, setTabValue] = React.useState<any>(0);

     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
          console.log("handle change run");
          console.log(newValue, "index check");
          setTabValue(newValue);
     };
     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (
          event: React.ChangeEvent<HTMLInputElement>
     ) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
     };
     const [checkboxUser, setcheckboxUser] = React.useState<any>([]);
     const [error, setError] = React.useState(false);
     const [zeroselect, setzeroselect] = React.useState(false);
     const [reasonSelection, setreasonSelection] = React.useState(false);
     const [value, setValue] = React.useState(0);
     const [users, setUsers] = useState<any>([]);
     const [myAppraisals, setMyAppraisals] = useState<any>([]);
     const [myReviewals, setMyReviewals] = useState<any>([]);
     const [filter, setFilter] = React.useState("");
     const [employee, setEmployee] = React.useState([]);
     const [enteredName, setenteredName] = useState("");
     const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
     const [approved, setApproved] = React.useState(false);
     const [page, setPage] = React.useState(0);
     const [rowsPerPage, setRowsPerPage] = React.useState(10);
     console.log(users, "users");
     console.log(checkedEmployeeid, "checkedempid");
     // const {data: filterData,refetch } = useGetEmployeeByStatusQuery(filter);

     // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
     //const [tablecount, settablecount] = React.useState<any>(0);


     // console.log(user?._id, 'useLoggedInUser')
     // console.log(tablecount, "tablecount");
     // const { data: reviewerData } = useGetReviewerEmployeeByFilterQuery(
     //   '62ac2037c1c19127416ab14c'
     // );
     // const [myreviewerData, setMyreviewerData] = useState<any>([]);
     // useEffect(() => {
     //   if (reviewerData !== undefined) {
     //     setMyreviewerData(reviewerData?.reviewerData)
     //   }
     //
     // }, [reviewerData])
     // const [tablecount1, settablecount1] = React.useState<any>(0);
     // console.log(tablecount1, "tablecount1");

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


     const filterTodos = (data: any, tabValue: any) => {
          return data?.filter((j: any) => {
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
     }
     const visibleTodos = React.useMemo(
          () => filterTodos(employeeData?.data, tabValue),
          [employeeData, tabValue]
        );

     useEffect(() => {
          setMyAppraisals(employeeData?.data)
          setUsers(employeeData?.data)

     }, [employeeData])

     //Not required
     // useEffect(() => {
     //   settablecount(() => {
     //     if (tabValue === 0) {
     //       settablecount(myAppraisals?.length);
     //     } else {
     //       let temp = myAppraisals?.filter((j: any) => {
     //         if (tabValue === 1) {

     //           return getPAStatus(j)?.includes("Pending with Reviewer");
     //         } else if (tabValue === 2) {

     //           return j?.appraisal?.status === "not-started";
     //         } else if (tabValue === 3) {
     //           return j?.appraisal?.status === "in-progress";
     //         } else if (tabValue === 4) {
     //           return j?.appraisal?.status === "rejected";
     //         } else if (tabValue === 5) {
     //           return j?.appraisal?.status === "completed";
     //         }
     //       });
     //       return temp?.length;
     //     }
     //   });
     // }, [myAppraisals, tabValue]);

     //Not required
     // useEffect(() => {
     //   settablecount1(() => {
     //     if (tabValue === 0) {
     //       settablecount1(Normalizerdata);
     //     } else {
     //       let temp = Normalizerdata?.filter((j: any) => {
     //         if (tabValue === 1) {

     //           return j?.PendingAction === " Pending with Reviewer";
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
     // }, [myAppraisals, tabValue]);
     // console.log(employeeData, "hi");



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
     console.log(empgrades, "position22222222");
     const handleChangegrades = (event: SelectChangeEvent) => {
          setempGrades(event.target.value);
     };
     const [pendingaction, setPendingAction] = React.useState("");
     console.log(pendingaction, "position22222222");
     const handleChangependingaction = (event: SelectChangeEvent) => {
          // setPendingAction(event.target.value);
     };

     //populating filter dropdown
     const [anchorElnew, setAnchorElnew] = React.useState<null | HTMLElement>(
          null
     );
     const opennew = Boolean(anchorElnew);
     const handleClicknew = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorElnew(event.currentTarget);
          empCodeOptions();
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
          //setAnchorElnew(null);
          handleClosenew(event);
          // setAnchorElnew(null);
     };
     //Legal Full Name
     const [anchorElnewFullName, setAnchorElnewFullName] = React.useState<null | HTMLElement>(
          null
     );
     const openFullName = Boolean(anchorElnewFullName);
     const handleClickFullName = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorElnewFullName(event.currentTarget);
          empNameOptions()
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




     // console.log("myappraisals", "appraisals");


     console.log(valueOfCard, "valueOfCard");
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

     const rejectHandler = () => {
          const rejectfilter = users?.filter((i: any) => {
               return i?.reviewerIsChecked === true && i?.reviewerIsDisabled === false;
          });

          const reviewerValue = rejectfilter?.map(
               (j: any) => j?.reviewer?.reviewer_status
          )[0];

          console.log(rejectfilter, "filter2222");
          console.log(
               reviewerValue === "pending" || reviewerValue === "draft",
               "11111111111"
          );
          if (rejectfilter?.length > 1) {
               setError(true);
               setOpenAlert(true);
          } else if (
               (rejectfilter?.length === 1 && reviewerValue === "pending") ||
               reviewerValue === "draft"
          ) {
               return (
                    setError(false),
                    setOpenAlert(false),
                    setzeroselect(false),
                    handleDialogOpen(),
                    setcheckedEmployeeid(() => {
                         return rejectfilter.map((j: any) => j._id);
                    })
               );
          } else if (rejectfilter?.length === 0) {
               setzeroselect(true);
               setOpenAlert(true);
          }
          // else {
          //   //return{ rejectfilter};
          //   handleDialogOpen();
          // }
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

          console.log(checkedfilter, "ids");
          if (checkedfilter?.filter((k: any) => k?.isChecked === true)?.length === 0) {
               setreasonSelection(true);
          } else if (checkedfilter?.length > 0) {
               return (
                    setreasonSelection(false),
                    handleDialogClose(),
                    rejectReviewer({ value: checkedfilter, id: checkedEmployeeid[0] }),
                    navigate(`${REVIEWER_REJECTION}/employee/${checkedEmployeeid[0]}`)
               );
          }
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
     const [activeTemplate, setactiveTemplate] = useState<any>([]);
     const [filterOptions, setfilterOptions] = useState<any>([]);
     console.log(filterOptions, "filterOptions")
     // console.log(activeTemplate,"activeTemplate")

     //to show table data
     const empCodeOptions = () => {
          const Dashfilter = myAppraisals?.filter((j: any) => {
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
          const Dashfilter = myAppraisals?.filter((j: any) => {
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
          const Dashfilter = myAppraisals?.filter((j: any) => {
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
          const Dashfilter = myAppraisals?.filter((j: any) => {
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
     const ShowTableData = () => {
          const Dashfilter = myAppraisals

          // ?.filter((j: any) => {
          //   if (tabValue === 0) {
          //     return j;
          //   } else if (tabValue === 1) {
          //     return getPAStatus(j)?.includes(
          //       "Pending with Reviewer"
          //     );
          //   } else if (tabValue === 2) {

          //     return (
          //       j?.appraisal?.status ==
          //       "not-started"
          //     );
          //   } else if (tabValue === 3) {

          //     return (
          //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
          //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized"?.toLocaleLowerCase())

          //     );
          //   } else if (tabValue === 4) {
          //     return (
          //       j?.appraisal?.status ===
          //       "rejected"
          //     );
          //   } else if (tabValue === 5) {
          //     return (
          //       j?.appraisal?.status === "completed"
          //     );
          //   }
          // })
          // ?.filter((item1: any) => {
          //   if (SectionFilter.includes("None") || SectionFilter.length === 0) {
          //     return item1;
          //   } else {
          //     return !!SectionFilter?.find((item2: any) => item1?.section === item2)
          //   }
          // })
          // ?.filter((item1: any) => {
          //   if (subSectionFilter.includes("None") || SectionFilter.length === 0) {
          //     return item1;
          //   } else {
          //     return !!subSectionFilter?.find((item2: any) => item1?.sub_section === item2)
          //   }
          // })
          // ?.filter((j: any) => {
          //   if (enteredName === "") {
          //     return j;
          //   } else if (
          //     (j.employee_code !==
          //       undefined &&
          //       j.employee_code
          //         ?.toLocaleLowerCase()
          //         ?.includes(
          //           enteredName.toLocaleLowerCase()
          //         )) ||
          //     (j.legal_full_name !==
          //       undefined &&
          //       j.legal_full_name
          //         ?.toLocaleLowerCase()
          //         ?.includes(
          //           enteredName?.toLocaleLowerCase()
          //         )) ||
          //     (j.grade !== undefined &&
          //       j.grade
          //         ?.toLocaleLowerCase()
          //         ?.includes(
          //           enteredName?.toLocaleLowerCase()
          //         )) ||
          //     (j.position_long_description !==
          //       undefined &&
          //       j.position_long_description
          //         ?.toLocaleLowerCase()
          //         .includes(
          //           enteredName.toLocaleLowerCase()
          //         )) ||
          //     (j?.appraisal?.status !==
          //       undefined &&

          //       j?.appraisal.status
          //         ?.toLocaleLowerCase()
          //         ?.includes(
          //           enteredName?.toLocaleLowerCase()

          //         ))
          //   ) {
          //     return j;
          //   }
          // })

          // ?.filter((j: any) => {
          //   if (empFullName === "None" || empFullName === "") {
          //     return j;
          //   } else {
          //     return j?.legal_full_name
          //       ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
          //     // .includes(employeeName?.toLocaleLowerCase());
          //   }
          // })
          // ?.filter((j: any) => {
          //   if (empEmployeeCode === "None" || empEmployeeCode === "") {
          //     return j;
          //   } else {
          //     return j?.employee_code
          //       .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
          //     // .includes(employeeCode.toLocaleLowerCase());
          //   }
          // })
          // ?.filter((j: any) => {
          //   if (
          //     positions === "None" ||
          //     positions === ""
          //   ) {
          //     return j;
          //   } else {
          //     return j?.position_long_description?.toLocaleLowerCase()?.includes(
          //       positions?.toLocaleLowerCase()
          //     );
          //   }
          // })
          // ?.filter((j: any) => {
          //   if (
          //     empgrades === "None" ||
          //     empgrades === ""
          //   ) {
          //     return j;
          //   } else {
          //     return j?.grade
          //       ?.toLocaleLowerCase()
          //       ?.includes(
          //         empgrades?.toLocaleLowerCase()
          //       );
          //   }
          // })
          // setactiveTemplate(Dashfilter)
          // console.log(activeTemplate, "activeTemplate")
          return Dashfilter;
     }


     // useEffect(() => {
     // const Dashfilter = myAppraisals

     // ?.filter((j: any) => {
     //   if (tabValue === 0) {
     //     return j;
     //   } else if (tabValue === 1) {
     //     return getPAStatus(j)?.includes(
     //       "Pending with Reviewer"
     //     );
     //   } else if (tabValue === 2) {
     //     // console.log(j?.appraisal?.status?.length, '')
     //     return (
     //       j?.appraisal?.status ==
     //       "not-started"
     //     );
     //   } else if (tabValue === 3) {

     //     return (
     //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
     //       j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized"?.toLocaleLowerCase())

     //     );
     //   } else if (tabValue === 4) {
     //     return (
     //       j?.appraisal?.status ===
     //       "rejected"
     //     );
     //   } else if (tabValue === 5) {
     //     return (
     //       j?.appraisal?.status === "completed"
     //     );
     //   }
     // })
     // ?.filter((item1: any) => {
     //   if (SectionFilter.includes("None") || SectionFilter.length === 0) {
     //     return item1;
     //   } else {
     //     return !!SectionFilter?.find((item2: any) => item1?.section === item2)
     //   }
     // })
     // ?.filter((item1: any) => {
     //   if (subSectionFilter.includes("None") || SectionFilter.length === 0) {
     //     return item1;
     //   } else {
     //     return !!subSectionFilter?.find((item2: any) => item1?.sub_section === item2)
     //   }
     // })
     // ?.filter((j: any) => {
     //   if (enteredName === "") {
     //     return j;
     //   } else if (
     //     (j.employee_code !==
     //       undefined &&
     //       j.employee_code
     //         ?.toLocaleLowerCase()
     //         ?.includes(
     //           enteredName.toLocaleLowerCase()
     //         )) ||
     //     (j.legal_full_name !==
     //       undefined &&
     //       j.legal_full_name
     //         ?.toLocaleLowerCase()
     //         ?.includes(
     //           enteredName?.toLocaleLowerCase()
     //         )) ||
     //     (j.grade !== undefined &&
     //       j.grade
     //         ?.toLocaleLowerCase()
     //         ?.includes(
     //           enteredName?.toLocaleLowerCase()
     //         )) ||
     //     (j.position_long_description !==
     //       undefined &&
     //       j.position_long_description
     //         ?.toLocaleLowerCase()
     //         .includes(
     //           enteredName.toLocaleLowerCase()
     //         )) ||
     //     (j?.appraisal?.status !==
     //       undefined &&

     //       j?.appraisal.status
     //         ?.toLocaleLowerCase()
     //         ?.includes(
     //           enteredName?.toLocaleLowerCase()

     //         ))
     //   ) {
     //     return j;
     //   }
     // })

     //     ?.filter((j: any) => {
     //       if (empFullName === "None" || empFullName === "") {
     //         return j;
     //       } else {
     //         return j?.legal_full_name
     //           ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
     //         // .includes(employeeName?.toLocaleLowerCase());
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (empEmployeeCode === "None" || empEmployeeCode === "") {
     //         return j;
     //       } else {
     //         return j?.employee_code
     //           .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
     //         // .includes(employeeCode.toLocaleLowerCase());
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (
     //         positions === "None" ||
     //         positions === ""
     //       ) {
     //         return j;
     //       } else {
     //         return j?.position_long_description?.toLocaleLowerCase()?.includes(
     //           positions?.toLocaleLowerCase()
     //         );
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (
     //         empgrades === "None" ||
     //         empgrades === ""
     //       ) {
     //         return j;
     //       } else {
     //         return j?.grade
     //           ?.toLocaleLowerCase()
     //           ?.includes(
     //             empgrades?.toLocaleLowerCase()
     //           );
     //       }
     //     })
     //   setactiveTemplate(Dashfilter)

     // }, [])

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
                                   navigate(`${REVIEWER_REJECTION}/employee/${checkedEmp[0]}`);
                              }
                         );
                    } else {
                         if (rejectfilter[0] && (rejectfilter[0]?.normalizer?.normalizer_status == "rejected")) {
                              navigate(`${REVIEWER_REJECT_APPRAISER_NORMALIZER_REJECTION}/employee/${checkedEmp[0]}`)
                         }
                         else if (rejectfilter[0] && (rejectfilter[0]?.appraisal?.appraiser_status == "appraiser-accepted-employee") &&
                              (rejectfilter[0]?.appraisal?.status == "rejected")) {
                              navigate(`${REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION}/employee/${checkedEmp[0]}`)
                         }
                         else {
                              navigate(`${REVIEWER_REJECTION}/employee/${checkedEmp[0]}`);
                         }
                    }
               }

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
               if (rejectfilter && checkboxIdHandler(checkboxHandler(myAppraisals))?.length > 0) {
                    let currentUser = rejectfilter[0];
                    if (currentUser && (currentUser?.appraisal?.appraiser_status == "submitted")) {
                         acceptReviewerRatings({ id: checkboxIdHandler(checkboxHandler(myAppraisals)) }).then(() => {
                              navigate(`${REVIEWER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)
                         })
                    }
                    else if (currentUser && (currentUser?.normalizer?.normalizer_status == "rejected")) {
                         navigate(`${REVIEWER_ACCEPT_APPRAISER_NORMALIZER_REJECTION}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)

                         // acceptReviewerRatings({ id: checkboxIdHandler(checkboxHandler(myAppraisals)) }).then(() => {
                         //   navigate(`${REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)
                         // })
                    }
                    else if (currentUser && (currentUser?.appraisal?.appraiser_status == "appraiser-accepted-employee") &&
                         (currentUser?.appraisal?.status == "rejected")) {
                         navigate(`${REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)

                         // acceptReviewerRatings({ id: checkboxIdHandler(checkboxHandler(myAppraisals)) }).then(() => {
                         //   navigate(`${REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)
                         // })
                    } else {
                         navigate(`${REVIEWER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)

                         // acceptReviewerRatings({ id: checkboxIdHandler(checkboxHandler(myAppraisals)) }).then(() => {
                         //   navigate(`${REVIEWER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(myAppraisals))}`)
                         // })
                    }
               }




          }
     };
     //Approve dialog
     useEffect(() => {
          setcheckboxUser(userData);
     }, []);
     //console.log(checkboxUser, "ccccccccccccc");
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

     const checkboxHandler = (checkbox: any) => {
          if (checkbox) {
               const res = checkbox.filter((i: any) => {
                    return i.reviewerIsChecked === true && !i.reviewerIsDisabled;
               });
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
     const hideAlertHandler = () => {
          setTimeout(() => {
               setApproved(false);
          }, 1000);
     };

     const approvedSuccessfully = () => {
          return setApproved(true)
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

     const bulkApproval = () => {
          console.log(users);
          // let myAppraisalsCode = myAppraisals?.map((item: any) => item?.employee_code);
          // // let myReviewalusers = users?.filter(
          // let myReviewalusers = users?.filter(
          //   (item: any) =>
          //     myAppraisalsCode.includes(item?.manager_code) && !item?.reviewerIsDisabled
          // );
          // let myReviewalusers = myAppraisals.filter((item: any) => {
          //   return (!item.reviewerIsDisabled && !item.reviewerIsChecked && item.appraisal && item?.appraisal?.appraiser_status !== "appraiser-rejected")
          // })
          // let bulkUsers = myReviewalusers.map((user: any) => user?._id)
          // const tempUser = myAppraisals?.map((j: any) => {
          //   //console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
          //   return bulkUsers.includes(j?._id) ? { ...j, reviewerIsChecked: true } : j;
          // });
          // setMyAppraisals(tempUser);
          let myReviewalusers = myAppraisals.filter((item: any) => item.reviewerIsChecked == true && item?.reviewerIsDisabled == false)
          console.log(myReviewalusers);
          console.log(checkboxIdHandler(myReviewalusers));
          acceptReviewer({ id: checkboxIdHandler(myReviewalusers) });
          approvedSuccessfully();
     };

     // const handleOnCheck = (e: any) => {
     //   const { name, checked } = e.target;
     //   console.log(name, checked, "checked");
     //   const tempUser = users.map((j: any) => {
     //     console.log(j.reviewerIsChecked, "jjjjjjjjjjj");
     //     return j._id === name ? { ...j, reviewerIsChecked: checked } : j;
     //   });
     //   setUsers(tempUser);
     //   console.log(tempUser, "temp");
     // };
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

     // const filterEmployee = (filterBy: any) => {
     //     return employeeData.filter((i: any) => {
     //         i.appraisal.status === filterBy
     //     })
     // }
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
          AppraiserName: true,
          Reviewername: true,
          Normalizername: true,
          Potentiallevel: true,
          TalentCategory: true,
          overallRating: true,
          PreviousRating: true,
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
     })
     const [heading1, setheading1] = React.useState(true);

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

     const handleExport = () => {
          const mapped = users &&
               users
                    ?.map((j: any, emp: any, employee: any) => {
                         let exportData: any = {}
                         if (columnHeaders["Ecode"] == true) exportData["Emploee Code"] = j?.employee_code
                         if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
                         if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
                         if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
                         if (columnHeaders["division"] == true) exportData["division"] = j?.division
                         if (columnHeaders["Section"] == true) exportData["Section"] = j?.section
                         if (columnHeaders["SubSection"] == true) exportData["SubSection"] = j?.sub_section
                         if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
                         if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = j?.reviewer_name
                         if (columnHeaders["Normalizername"] == true) exportData["Normalizer Name"] = j?.normalizer_name
                         if (columnHeaders["OverallRating"] == true) exportData["OverAllRating"] = j?.reviewer.reviewer_rating
                         if (columnHeaders["PreviousRating"] == true) exportData["PreviousRating"] = j?.reviewer_previous_submission?.reviewer_rating
                         if (columnHeaders["Potentiallevel"] == true) exportData["PotentialLevel"] = j?.appraisal?.potential
                         if (columnHeaders["TalentCategory"] == true) exportData["TalentCategory"] = ""
                         if (columnHeaders["WorkLocation"] == true) exportData["WorkLocation"] = j?.work_location
                         if (columnHeaders["ManagerCode"] == true) exportData["ManagerCode"] = j?.manager_code
                         if (columnHeaders["ManagerName"] == true) exportData["ManagerName"] = j?.manager_name
                         if (columnHeaders["ManagerPosition"] == true) exportData["ManagerPosition"] = j?.manager_position


                         return exportData
                    });
          // console.log(mapped, "mapped")
          var wb = XLSX.utils.book_new(),
               ws = XLSX.utils.json_to_sheet(mapped);

          XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

          XLSX.writeFile(wb, "MyExcel.xlsx");
     }
     // const handleExport = () => {
     //   console.log(users, "excel");
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
     };
     //badge count
     const [allActions, setallActions] = React.useState<any>(0);
     const [completedEmp, setcompletedEmp] = React.useState<any>(0);
     const [inprogressEmp, setinprogressEmp] = React.useState<any>(0);
     const [notstartedEmp, setnotstartedEmp] = React.useState<any>(0);
     const [employeeRej, setemployeeRej] = React.useState<any>(0);
     const [mypendingActions, setmypendingActions] = React.useState<any>(0);

     //Not required
     // useEffect(() => {

     //   let myAppraisalsCodes = myAppraisals?.map(
     //     (item: any) => item?.employee_code
     //   );
     //   let badge =
     //     users &&
     //     users?.filter((emp: any) => {
     //       console.log(emp, "counts1");
     //       return emp?.manager_code == myAppraisals;
     //     });
     //   const counts =
     //     users &&
     //     users?.filter((emp: any) => {
     //       console.log(emp, "empemp");
     //       return emp?.manager_code == myAppraisals;
     //     });
     //   console.log(myAppraisals, "counts");
     //   console.log(counts?.length > 0, "counts");
     //   console.log(badge?.length, "badge");
     //   // setmypendingActions(badge.length)
     //   return badge;
     // }, [users]);


     //For the badges
     useEffect(() => {
          let length = 0;
          let completedBadge = 0;
          let Inprogress = 0;
          let Notstarted = 0;
          let Emprejected = 0;
          let PendingwithReviewer = 0;
          if (myAppraisals) {


               let temp = myAppraisals;
               length += temp?.length;
               console.log(temp, "lengthlength");
               let temp2 = temp?.filter(
                    (emp: any) => emp.appraisal.status === "completed"
               );
               completedBadge += temp2?.length;
               console.log(temp2, "temp2");
               let temp3 = temp?.filter(
                    (emp: any) => emp.appraisal.status === "in-progress" || emp.appraisal.status === "normalized"
               );
               Inprogress += temp3?.length;
               console.log(temp3, "temp3");
               let temp4 = temp?.filter(
                    (emp: any) => emp.appraisal.status === "not-started"
               );
               Notstarted += temp4?.length;
               console.log(temp4, "temp4");
               let temp5 = temp?.filter(
                    (emp: any) => emp.appraisal.status === "rejected"
               );
               Emprejected += temp5?.length;
               console.log(temp5, "temp5");
               let temp6 = temp?.filter((emp: any) =>
                    getPAStatus(emp)?.includes("Pending with Reviewer")
               );
               console.log(temp6, "temp6");
               PendingwithReviewer += temp6?.length;
               console.log(temp6, "temp6");
               if (tabValue === 0) {
                    setShow(temp);
               } else if (tabValue === 1) {
                    setShow(temp2);
               } else if (tabValue === 2) {
                    setShow(temp3);
               } else if (tabValue === 3) {
                    setShow(temp4);
               } else if (tabValue === 4) {
                    setShow(temp5);
               } else if (tabValue === 5) {
                    setShow(temp6);
               }
          };
          setallActions(length);
          setcompletedEmp(completedBadge);
          setinprogressEmp(Inprogress);
          setnotstartedEmp(Notstarted);
          setemployeeRej(Emprejected);
          setmypendingActions(PendingwithReviewer);
     }, [myAppraisals]);

     //badge count
     //pagecount
     const [mypagecount, setmypagecount] = React.useState<any>(0);
     console.log(mypagecount, "mypagecount");

     useEffect(() => {
          if (tabValue === 0) {
               return setmypagecount(allActions);
          } else if (tabValue === 1) {
               return setmypagecount(mypendingActions);
          } else if (tabValue === 2) {
               return setmypagecount(notstartedEmp);
          } else if (tabValue === 3) {
               return setmypagecount(inprogressEmp);
          } else if (tabValue === 4) {
               return setmypagecount(employeeRej);
          } else if (tabValue === 5) {
               return setmypagecount(completedEmp);
          }
     });
     //pagecount
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

     //filter

     const [open, setOpen] = React.useState(false);

     const handleClose = () => {
          setOpen(false);
     };

     const handleClickOpen = () => {
          let checkedLength = myAppraisals?.filter((item: any) => item?.reviewerIsChecked == true && item?.reviewerIsDisabled == false)
          if (checkedLength?.length > 0) {
               let myReviewalusers = checkedLength && checkedLength?.filter((rejectedItem: any) => rejectedItem?.appraisal?.appraiser_status === "appraiser-rejected" ||
                    rejectedItem?.appraisal?.status == "rejected"
               )
               // .filter(
               //   (item: any) => !item?.reviewerIsDisabled && !item.reviewerIsChecked

               // )


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


     const handleCloseBulk = () => {
          setBulkOpen(false);
          setMessage("");
     }

     const [open1, setOpen1] = React.useState(false);

     const handleClose1 = () => {
          setOpen1(false);
          setApproved(false);
     };

     const handleClickOpen1 = () => {
          setOpen1(true);
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

     const [filData, setfilData] = React.useState<any>([]);
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

     //Augstya commented
     // useEffect(() => {
     //   const mapped = myAppraisals
     //     ?.filter((j: any) => {
     //       if (tabValue === 0) {
     //         return j;
     //       } else if (tabValue === 1) {
     //         return getPAStatus(j)?.includes(
     //           "Pending with Reviewer"
     //         );
     //       } else if (tabValue === 2) {
     //         // console.log(j?.appraisal?.status?.length, '')
     //         return (
     //           j?.appraisal?.status ==
     //           "not-started"
     //         );
     //       } else if (tabValue === 3) {
     //
     //         return (
     //           j?.appraisal?.status?.toLocaleLowerCase()?.includes("in-progress".toLocaleLowerCase()) ||
     //           j?.appraisal?.status?.toLocaleLowerCase()?.includes("normalized"?.toLocaleLowerCase())
     //
     //         );
     //       } else if (tabValue === 4) {
     //         return (
     //           j?.appraisal?.status ===
     //           "rejected"
     //         );
     //       } else if (tabValue === 5) {
     //         return (
     //           j?.appraisal?.status === "completed"
     //         );
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (empFullName === "None" || empFullName === "") {
     //         return j;
     //       } else {
     //         return j?.legal_full_name
     //         ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
     //         // .includes(employeeName?.toLocaleLowerCase());
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (empEmployeeCode === "None" || empEmployeeCode === "") {
     //         return j;
     //       } else {
     //         return j?.employee_code
     //         .toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
     //         // .includes(employeeCode.toLocaleLowerCase());
     //       }
     //     })
     //
     //     ?.filter((j: any) => {
     //       if (positions === "None" || positions === "") {
     //         return j;
     //       } else {
     //         return j?.position_long_description
     //           .toLocaleLowerCase()
     //           .includes(positions.toLocaleLowerCase());
     //       }
     //     })
     //     ?.filter((j: any) => {
     //       if (empgrades === "None" || empgrades === "") {
     //         return j;
     //       } else {
     //         return j?.grade
     //           .toLocaleLowerCase()
     //           .includes(empgrades.toLocaleLowerCase());
     //       }
     //     })
     //     ?.map((j: any, emp: any, employee: any) => {
     //       // console.log(emp,"emp")
     //       // console.log(j,"j")
     //       console.log(j?.grade, "code")
     //       return {
     //
     //         ECode: j.employee_code,
     //         EmployeeName: j.legal_full_name,
     //
     //         // emp.manager_code ==  j.employee_code,
     //         Position: j.position_long_description,
     //         Grade: j.grade,
     //         PendingAction: getPAStatus(j),
     //         AppraiserRating:
     //           j.appraisal?.appraiser_rating == 0 ? (
     //             <p> - </p>
     //           ) : (
     //             j.appraisal?.appraiser_rating
     //           ),
     //         ReviewerRating:
     //           j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
     //             j.reviewer.reviewer_rating
     //           ) : (
     //             <p> - </p>
     //           ),
     //         NormalizerRating:
     //           j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
     //             j.normalizer.normalizer_rating
     //           ) : (
     //             <p> - </p>
     //           ),
     //
     //         Status: getStatus(j?.appraisal?.status),
     //
     //       };
     //
     //     })
     //   // if (tabValue == 0) {
     //   setfilData(mapped)
     //   // }
     //   console.log(mapped, "mapped")
     // }, [myAppraisals, empEmployeeCode, empFullName, empgrades, positions, enteredName, tabValue])
     // const Normalizerdata = myAppraisals
     //      ?.map((j: any, emp: any) => {
     //           //console.log(emp, "emp");
     //           //console.log(j, "j");
     //           return {

     //                ECode: j.employee_code,
     //                EmployeeName: j.legal_full_name,

     //                // emp.manager_code ==  j.employee_code,
     //                Position: j.position_long_description,
     //                Grade: j.grade,
     //                PendingAction: getPAStatus(j),
     //                AppraiserRating:
     //                     j.appraisal?.appraiser_rating == 0 ? (
     //                          <p> - </p>
     //                     ) : (
     //                          j.appraisal?.appraiser_rating
     //                     ),
     //                ReviewerRating:
     //                     j.reviewerIsDisabled && j.reviewer.reviewer_rating != 0 ? (
     //                          j.reviewer.reviewer_rating
     //                     ) : (
     //                          <p> - </p>
     //                     ),
     //                NormalizerRating:
     //                     j.normalizerIsDisabled && j.normalizer.normalizer_rating != 0 ? (
     //                          j.normalizer.normalizer_rating
     //                     ) : (
     //                          <p> - </p>
     //                     ),

     //                Status: getStatus(j?.appraisal?.status),
     //                //  ? (
     //                //             <p style={{ textTransform: "capitalize" }}>{j?.appraisal?.status}</p>
     //                //             ) : (
     //                //             <p>Not Started </p>
     //                //             )
     //           };
     //      });
     // console.log(Normalizerdata, "data");

     const [show, setShow] = React.useState<any>(0);
     // console.log(show, "show");

     //Commented for now - export to excel
     // useEffect(() => {
     //   const All = Normalizerdata?.filter((j: any, index: number) => {
     //     {
     //       return j;
     //     }
     //   });
     //   console.log(All, "All");
     //   let Completed = Normalizerdata?.filter((j: any, index: number) => {
     //     {
     //       return j?.status
     //         ?.toLocaleLowerCase()
     //         ?.includes("completed"?.toLocaleLowerCase());
     //     }
     //   });
     //   console.log(Completed, "Condition");
     //   const inProgress = Normalizerdata?.filter((j: any, index: number) => {
     //     {
     //       return j?.status
     //         ?.toLocaleLowerCase()
     //         ?.includes("inprogress"?.toLocaleLowerCase());
     //     }
     //   });
     //   console.log(inProgress, "inProgress");
     //   const notStarted = Normalizerdata?.filter((j: any, index: number) => {
     //     {
     //       console.log(
     //         j.Status?.toLocaleLowerCase()?.includes(
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
     //   const Rejected = Normalizerdata?.filter((j: any, index: number) => {
     //     {
     //       return j?.status
     //         ?.toLocaleLowerCase()
     //         ?.includes("rejected"?.toLocaleLowerCase());
     //     }
     //   });
     //   console.log(Rejected, "Rejected");
     //   const PaActions = myAppraisals?.filter((j: any, index: number) => {
     //     {
     //       return getPAStatus(j)?.includes(" Pending with HR Normalizer");
     //     }
     //   });
     //   console.log(PaActions, "PaActions");

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
     //     setShow(Normalizerdata);
     //   }
     // }, [myAppraisals, tabValue]);
     //Alerts to dialogs
     const [openAlert, setOpenAlert] = React.useState(false);
     const handleCloseAlert = () => {
          setOpenAlert(false);
          setError(false);
          setzeroselectApprove(false);
          seterrorApprove(false);
          setzeroselect(false);
     };
     //Alerts to dialogs

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

               // paddingBottom="14px"
               // sx={{ position: 'absolute', marginLeft: '64%' }}
               >
                    <Heading> My Team</Heading>

                    <div style={{ width: "50%" }}>
                         {approved && (
                              <Dialog
                                   open={open1}
                                   onClose={handleClose1}
                                   aria-labelledby="responsive-dialog-title"
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
                                        >The performance appraisal was submitted to the HR Normalizer successfully.</DialogContentText>
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
                    </div>

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
                                   // width:"130px",
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
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: {
            // marginTop:"10px",
            backgroundColor: "#696969",
            boxShadow: "none",
            maxWidth: "130px",
            borderRadius: "5px",
          },
        }}
        sx={{
          pointerEvents: 'none',
          "& .MuiPopover-paper": {
            
            // border: "1px solid #3e8cb5",
            backgroundColor: "#36454F",
            opacity:'0.5'
            // width: "30%",
          },
        }}
      >
        <Typography 
        style={{
                        padding: "3px",
                        fontSize: "9px",
                        color: "#ffffff",
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
                                        Are you sure you wish to accept selected performance appraisal?
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
                                   //navigate(`${REVIEWER_APPROVE}/employee/${checkboxIdHandler(checkboxHandler(users))}`)
                                   handleApprove();
                                   // return (
                                   //   acceptReviewer({
                                   //     id: checkboxIdHandler(checkboxHandler(users)),
                                   //   }),
                                   //   approvedSuccessfully()
                                   // );
                              }}

                         >
                              {/* <Link to={`/reviewerMain/Approve/ReviewerApprove`}> */}
                              Accept
                              {/* </Link> */}
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

                    </div>
                    {/* <Link to={`${VIEW_PREVIOUS_PA}`}>
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
                                        <StyledBadge badgeContent={allActions} color="primary" max={999}>
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
                                             badgeContent={notstartedEmp}
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
                                             badgeContent={inprogressEmp}
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
                                        <StyledBadge badgeContent={employeeRej} color="primary" max={999}>
                                             Employees rejection
                                        </StyledBadge>
                                   }
                              />
                              <Tab
                                   sx={{ width: "125px" }}
                                   label={

                                        <StyledBadge
                                             badgeContent={completedEmp}
                                             color="primary"
                                             max={999}
                                        >
                                             Completed
                                        </StyledBadge>
                                   }
                              />
                         </Tabs>
                    </Tabstyles>

                    {/* <Tabs
          sx={{ borderBottom: 1, borderColor: "#E3E3E3", width: "100%" }}
          value={tabValue}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label={<Badge badgeContent={allActions} color="primary">All</Badge>} />
          <Tab label={<Badge badgeContent={completedEmp} color="primary">Completed</Badge>}/>
          <Tab label={<Badge badgeContent={inprogressEmp} color="primary">In Progress</Badge>}/>
          <Tab label={<Badge badgeContent={notstartedEmp} color="primary">Not Started</Badge>}/>
          <Tab label={<Badge badgeContent={employeeRej} color="primary">Employee Rejected</Badge>}/>
          <Tab label={<Badge badgeContent={mypendingActions} color="primary">My Pending Actions</Badge>} />
          {/* <Tab label="My Pending Actions" />
        </Tabs> */}
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
                              {/* <img src={UpDown} alt='icon' style={{ marginLeft: '15px', marginTop: '5px' }} /> */}
                              {/* <div>
              <img
                src={Newexcel}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
                onClick={handleExportFunction}
              />
            </div> */}
                              <Link to="/myteamtableexpandviewofReviewer" >
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
                                                                           <Checkbox checked={heading1} name="Ecode" onChange={handleheadingEcode} />
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
                                                                           <Checkbox name="division" checked={divisionVal} onChange={handledivisionVal} />
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
                                                                                checked={headingAppraiser}
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
                                                                                checked={headingReviewer}
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
                                                                                checked={headingNormalizer}
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
                                                                                checked={overall}
                                                                                name="OverallRating"
                                                                                onChange={handleoverAll}
                                                                           />
                                                                      }
                                                                      label=" Overall Rating"
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
                                                                                checked={headingPrevious}
                                                                                name="PreviousRating"
                                                                                onChange={handleheadingPrevious}
                                                                           />
                                                                      }
                                                                      label="Previous Rating"
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
                                                                                checked={headingPotential}
                                                                                name="Potentiallevel"
                                                                                onChange={handleheadingPotential}
                                                                           />
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
                                                                                checked={talentcategory}
                                                                                name="TalentCategory"
                                                                                onChange={handletalentcategory}
                                                                           />
                                                                      }
                                                                      label=" Talent Category"
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

               {myAppraisals &&
                    myAppraisals.map((objDesc: any, index: number) => {
                         // console.log(index, tabValue, "index");

                         return (
                              <TableHeadings>
                                   <TabPanel value={tabValue} index={index}>
                                        <TableContainer
                                        //style={{ cursor: "pointer" }}
                                        >
                                             <Table
                                                  // sx={{ minWidth: 750 }}
                                                  size="small"
                                                  aria-label="simple table"
                                             >
                                                  {/* <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      // onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                    /> */}
                                                  <TableHead>
                                                       <TableRow>
                                                            {tabValue === 1 && <TableCell align="center" width="2.5%" ></TableCell>}
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
                                {filterOptions
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
                                                            {/* <TableCell align="center" width="5%">

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
                          </FormControl>

                        </TableCell> */}
                                                            <TableCell align="center" width="20%"
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
                                {filterOptions
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
                              {icon1 && <FilterAltTwoToneIcon />}
                            </Stack> */}
                                                                      {/* <TableCell align="center" width="15%">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontFamily: "Arial",
                              fontWeight: "600",
                              border: "none",
                              background: "none",
                              //textAlign: "left",
                              // margin:"-5px"
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

                                  {activeTemplate
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
                                                                 </div>
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
                                                                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                                                                           <Stack direction="row">
                                                                                <span> Position</span>
                                                                                <Select
                                                                                     size="small"
                                                                                     sx={{ width: "25px", fontSize: "0rem" }}
                                                                                     disableUnderline
                                                                                     // value={positions}
                                                                                     // onChange={handleChangeposition}
                                                                                     // input={<OutlinedInput label="Name" />}
                                                                                     variant="standard"
                                                                                     MenuProps={MenuProps}
                                                                                     multiple
                                                                                     value={positionFilter}
                                                                                     //onClick={empPositionOptions}
                                                                                     onChange={handleChangeSelectPosition}
                                                                                     //input={<OutlinedInput label="Position" />}
                                                                                     renderValue={(selected) => selected.join(', ')}
                                                                                >
                                                                                     <MenuItem
                                                                                          // style={{ fontSize: "12px" }}
                                                                                          key={0}
                                                                                          value="None"
                                                                                          sx={{
                                                                                               padding: "0px",
                                                                                               fontSize: "12px",
                                                                                               paddingLeft: "42px"
                                                                                          }}
                                                                                     >
                                                                                          {/* <Checkbox checked={positionFilter.indexOf("None") > -1} /> */}
                                                                                          <ListItemText
                                                                                               primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                                                                               primary="None" />

                                                                                     </MenuItem>

                                                                                     {myAppraisals
                                                                                          ?.slice()
                                                                                          ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })
                                                                                          ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
                                                                                          ?.map((name: any, index: any) => (
                                                                                               <MenuItem
                                                                                                    sx={{
                                                                                                         padding: "0px",
                                                                                                         fontSize: "12px"
                                                                                                    }}
                                                                                                    // style={{ fontSize: "12px" }}
                                                                                                    key={name?.position_long_description}
                                                                                                    value={name?.position_long_description}
                                                                                               >
                                                                                                    <Checkbox
                                                                                                         style={{ padding: "3px", paddingLeft: "14px" }}
                                                                                                         checked={positionFilter.indexOf(name?.position_long_description) > -1} />
                                                                                                    <ListItemText
                                                                                                         primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                                                                                         primary={name?.position_long_description} />

                                                                                               </MenuItem>
                                                                                          )
                                                                                          )}
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
                                                                      {/* 
                        <TableCell align="center" width="15%">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontFamily: "Arial",
                              fontWeight: "600",
                              border: "none",
                              background: "none",
                              //textAlign: "left",
                              // margin:"-5px"
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
                                                                                     size="small"
                                                                                     sx={{ width: "25px", fontSize: "0rem" }}
                                                                                     disableUnderline
                                                                                     // value={positions}
                                                                                     // onChange={handleChangeposition}
                                                                                     // input={<OutlinedInput label="Name" />}
                                                                                     variant="standard"
                                                                                     MenuProps={MenuProps}
                                                                                     multiple
                                                                                     value={GradeFilter}
                                                                                     //onClick={empGradeOptions}
                                                                                     onChange={handleChangeSelectGrade}
                                                                                     //input={<OutlinedInput label="Position" />}
                                                                                     renderValue={(selected) => selected.join(', ')}
                                                                                >
                                                                                     <MenuItem
                                                                                          // style={{ fontSize: "12px" }}
                                                                                          key={0}
                                                                                          value="None"
                                                                                          sx={{
                                                                                               padding: "0px",
                                                                                               fontSize: "12px",
                                                                                               paddingLeft: "42px"
                                                                                          }}
                                                                                     >
                                                                                          {/* <Checkbox checked={positionFilter.indexOf("None") > -1} /> */}
                                                                                          <ListItemText
                                                                                               primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                                                                               primary="None" />
                                                                                     </MenuItem>

                                                                                     {myAppraisals
                                                                                          ?.slice()
                                                                                          ?.sort(function (a: any, b: any) { return a.grade.localeCompare(b.grade); })
                                                                                          ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                                                                                          ?.map((name: any, index: any) => (
                                                                                               <MenuItem
                                                                                                    sx={{
                                                                                                         padding: "0px",
                                                                                                         fontSize: "12px"
                                                                                                    }}
                                                                                                    // style={{ fontSize: "12px" }}
                                                                                                    key={name?.grade}
                                                                                                    value={name?.grade}
                                                                                               >
                                                                                                    <Checkbox style={{ padding: "3px", paddingLeft: "14px" }} checked={GradeFilter.indexOf(name?.grade) > -1} />
                                                                                                    <ListItemText
                                                                                                         primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                                                                                         primary={name?.grade} />

                                                                                               </MenuItem>
                                                                                          )
                                                                                          )}
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
                                                                      {/* <TableCell align="center" width="5%">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontFamily: "Arial",
                              fontWeight: "600",
                              border: "none",
                              background: "none",
                              // textAlign: "left",
                              // margin:"-5px"
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
                                                            {tabValue != 5 && (
                                                                 <TableCell align="center" width="12%">
                                                                      <div
                                                                           style={{
                                                                                color: "#3e8cb5",
                                                                                fontSize: "14px",
                                                                                fontFamily: "Arial",
                                                                                fontWeight: "600",
                                                                                border: "none",
                                                                                background: "none",
                                                                                // margin:"-5px"
                                                                           }}
                                                                      >
                                                                           Pending Action
                                                                      </div>
                                                                 </TableCell>
                                                            )}
                                                            {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                                                                 <TableCell
                                                                      align="center"
                                                                      width="8%"
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
                                                                           Overall<br></br> Rating
                                                                      </div>
                                                                 </TableCell>
                                                            )}
                                                            {tabValue == 4 && (
                                                                 <>
                                                                      <TableCell
                                                                           align="center"
                                                                           width="8%"
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
                                                                      width="8%"
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
                                                                                // maxWidth: "100px",
                                                                                wordWrap: "break-word",
                                                                                // margin:"-5px"
                                                                           }}
                                                                      >
                                                                           Appraiser<br></br> Rating
                                                                      </div>
                                                                 </TableCell>
                                                            )}
                                                            {tabValue != 0 && tabValue != 5 && (
                                                                 <TableCell
                                                                      align="center"
                                                                      width="8%"
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
                                                                                // maxWidth: "100px",
                                                                                wordWrap: "break-word",
                                                                                // margin:"-5px"
                                                                           }}
                                                                      >
                                                                           Reviewer<br></br> Rating
                                                                      </div>
                                                                 </TableCell>
                                                            )}
                                                            {tabValue != 0 && tabValue != 5 && (
                                                                 <TableCell
                                                                      align="center"
                                                                      width="8%"
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
                                                                                // maxWidth: "100px",
                                                                                wordWrap: "break-word",
                                                                                // margin:"-5px"
                                                                           }}
                                                                      >
                                                                           Normalizer<br></br> Rating
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
                                                                           fontFamily: "Arial",
                                                                           fontWeight: "600",
                                                                           border: "none",
                                                                           background: "none",
                                                                           // margin:"-5px"
                                                                      }}
                                                                 >
                                                                      Status
                                                                 </div>
                                                            </TableCell>

                                                            <TableCell
                                                                 align="center"
                                                                 width="6%"
                                                                 style={{
                                                                      color: "#3e8cb5",
                                                                      fontSize: "14px",
                                                                      fontFamily: "Arial",
                                                                      fontWeight: "600",
                                                                      whiteSpace: "nowrap",
                                                                      // paddingRight: "10px"
                                                                 }}
                                                            >
                                                                 View <br></br>PA
                                                            </TableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  {/* <TableBody> */}
                                                  {employeeData && employeeData?.data &&
                                                       // stableSort(
                                                       //   rowsPerPage > 0
                                                       //     ? myAppraisals.slice(
                                                       //       page * rowsPerPage,
                                                       //       page * rowsPerPage + rowsPerPage
                                                       //     )
                                                       //     : myAppraisals,
                                                       //   getComparator(order, orderBy)
                                                       // )
                                                       // .filter((j: any) => {
                                                       //   if (index === 0) {
                                                       //     return j;
                                                       //   } else if (index === 1) {
                                                       //     return j?.appraisal?.status
                                                       //       .toLocaleLowerCase()
                                                       //       .includes("completed".toLocaleLowerCase());
                                                       //     return j;
                                                       //   } else if (index === 2) {
                                                       //     return j?.appraisal?.status
                                                       //       .toLocaleLowerCase()
                                                       //       .includes("in-progress".toLocaleLowerCase());
                                                       //     return j;
                                                       //   } else if (index === 3) {
                                                       //     return j?.appraisal?.status
                                                       //       .toLocaleLowerCase()
                                                       //       .includes("not-started".toLocaleLowerCase());
                                                       //     return j;
                                                       //   }
                                                       //   // else if (index === 4) {
                                                       //   //   return j?.appraisal?.status
                                                       //   //     .toLocaleLowerCase()
                                                       //   //     .includes("Self Rating".toLocaleLowerCase());
                                                       //   // }
                                                       //   else if (index === 4) {
                                                       //     return j?.appraisal?.appraiser_status
                                                       //       .toLocaleLowerCase()
                                                       //       .includes("employee".toLocaleLowerCase());
                                                       //     return j;
                                                       //   } else if (index === 5) {
                                                       //     return getPAStatus(j)?.includes(" Pending with Reviewer");
                                                       //     return j;
                                                       //   }
                                                       // })
                                                       // .filter((j: any) => {
                                                       //   if (enteredName === "") {
                                                       //     return j;
                                                       //   } else if (
                                                       //     (j.legal_full_name !== undefined &&
                                                       //       j.legal_full_name
                                                       //         .toLocaleLowerCase()
                                                       //         .includes(enteredName.toLocaleLowerCase())) ||
                                                       //     (j.grade !== undefined &&
                                                       //       j.grade
                                                       //         .toLocaleLowerCase()
                                                       //         .includes(enteredName.toLocaleLowerCase())) ||
                                                       //     (j.position_long_description !== undefined &&
                                                       //       j.position_long_description
                                                       //         .toLocaleLowerCase()
                                                       //         .includes(enteredName.toLocaleLowerCase())) ||
                                                       //     (j?.appraisal?.status !== undefined &&
                                                       //       j?.appraisal?.status
                                                       //         .toLocaleLowerCase()
                                                       //         .includes(enteredName.toLocaleLowerCase()))
                                                       //   ) {
                                                       //     return j;
                                                       //   }
                                                       // })
                                                       // .map((j: any) => {
                                                       //   console.log(j?.appraisal?.status, "index");
                                                       // if ( tabValue === 1){
                                                       //      return j
                                                       // }
                                                       // {
                                                       // }

                                                       // {
                                                       //   console.log(
                                                       //     users.filter((emp: any) => {
                                                       //       // console.log(emp,'empemp')

                                                       //       return emp.manager_code == j.employee_code;
                                                       //     }).length,
                                                       //     "lengthhh"
                                                       //   );
                                                       // }
                                                       // // setallActions(users
                                                       // //   .filter(
                                                       // //     (emp: any) => {
                                                       // //       // console.log(emp,'empemp')

                                                       // //       return (
                                                       // //         emp.manager_code ==
                                                       // //         j.employee_code

                                                       // //       )
                                                       // //     }
                                                       // //   ).length)
                                                       // {
                                                       //   console.log(
                                                       //     users
                                                       //       .filter((emp: any) => {
                                                       //         // console.log(emp,'empemp')

                                                       //         return emp.manager_code == j.employee_code;
                                                       //       })
                                                       //       .filter((j: any) => {
                                                       //         return j?.appraisal?.status === "completed";
                                                       //       }).length,
                                                       //     "lengthhh1"
                                                       //   );
                                                       // }
                                                       // return (
                                                       // users &&
                                                       // users.filter((emp: any) => {
                                                       //   // console.log(emp,'empemp')

                                                       //   return emp.manager_code == j.employee_code;
                                                       // }).length > 0 && (
                                                       // <TableCell colSpan={7} size="small">
                                                       <TableBody>
                                                            {/* {myAppraisals &&
                          stableSort(
                            rowsPerPage > 0
                              ? myAppraisals?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              : myAppraisals,
                            getComparator(order, orderBy)
                          )? */}
                                                            {
                                                                 // myAppraisals      
                                                                 visibleTodos
                                                                      // ?.filter((item1: any) => {
                                                                      //   if (SectionFilter.includes("None") || SectionFilter.length === 0) {
                                                                      //     return item1;
                                                                      //   } else {
                                                                      //     return !!SectionFilter?.find((item2: any) => item1?.section === item2)
                                                                      //   }
                                                                      // })
                                                                      // ?.filter((item1: any) => {
                                                                      //   if (subSectionFilter.includes("None") || SectionFilter.length === 0) {
                                                                      //     return item1;
                                                                      //   } else {
                                                                      //     return !!subSectionFilter?.find((item2: any) => item1?.sub_section === item2)
                                                                      //   }
                                                                      // })
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
                                                                                // .includes(empEmployeeCode.toLocaleLowerCase());
                                                                           }
                                                                      })
                                                                      .filter((j: any) => {
                                                                           if (
                                                                                positions === "None" ||
                                                                                positions === ""
                                                                           ) {
                                                                                return j;
                                                                           } else {
                                                                                return j?.position_long_description?.toLocaleLowerCase()?.includes(
                                                                                     positions?.toLocaleLowerCase()
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
                                                                      .filter((j: any) => {
                                                                           if (
                                                                                empgrades === "None" ||
                                                                                empgrades === ""
                                                                           ) {
                                                                                return j;
                                                                           } else {
                                                                                return j?.grade
                                                                                     ?.toLocaleLowerCase()
                                                                                     ?.includes(
                                                                                          empgrades?.toLocaleLowerCase()
                                                                                     );
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
                                                                           // console.log(j, 'jjjjjjjjjjjjjjjjjjjj')
                                                                           return (
                                                                                <TableRow
                                                                                     key={j.name}
                                                                                     sx={{ border: 0 }}
                                                                                >
                                                                                     {/* <TableCell sx={{width:"10%"}}/> */}
                                                                                     {/* <Link to={`${CREATE_APPRAISAL}/employee/${j._id}`}>
                                                                                               <TableCell component="th" scope="row">{j.name}</TableCell>
                                                                                                </Link> */}
                                                                                     {tabValue === 1 &&
                                                                                          <TableCell
                                                                                               padding="checkbox"
                                                                                               align="center"
                                                                                          // width="2.5%"
                                                                                          >
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
                                                                                                    //checked={j.reviewerIsChecked === true ? true: false}
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
                                                                                               // value={[j._id, j.name]}
                                                                                               />
                                                                                          </TableCell>
                                                                                     }
                                                                                     {/* <TableCell
                                            width="2.25%"
                                            align="left"
                                          ></TableCell> */}
                                                                                     <TableCell
                                                                                          style={{
                                                                                               cursor: "pointer",
                                                                                               // paddingRight: "45px"
                                                                                          }}
                                                                                          // width="5%"
                                                                                          align="center"
                                                                                     >
                                                                                          {j?.employee_code}
                                                                                     </TableCell>
                                                                                     {/* <TableCell component="th" scope="row" sx={{ width: '358px' }}> */}
                                                                                     <TableCell
                                                                                          component="th"
                                                                                          scope="row"
                                                                                          // width="23%"
                                                                                          align="left"
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
                                                                                               {/* <Avatar>
                                                      {j.legal_full_name[0]}
                                                    </Avatar> */}
                                                                                               <Names>
                                                                                                    <p
                                                                                                         style={{ cursor: "pointer" }}
                                                                                                         onClick={() =>
                                                                                                              j.reviewer
                                                                                                                   .reviewer_status ==
                                                                                                              "draft" ||
                                                                                                              (j.reviewer
                                                                                                                   .reviewer_status ==
                                                                                                                   "appraiser-rejected" &&
                                                                                                                   navigate(
                                                                                                                        `${REVIEWER_REJECTION}/employee/${j._id}`
                                                                                                                   ))
                                                                                                         }
                                                                                                    >
                                                                                                         {j.legal_full_name}
                                                                                                    </p>
                                                                                               </Names>
                                                                                          </Stack>
                                                                                          {/* </Link> */}
                                                                                     </TableCell>
                                                                                     {/* <TableCell sx={{ width: '330px' }} align="left">{j.position}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.grade}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.appraisal.appraiser_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.reviewer.reviewer_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="center">{j.normalizer.normalizer_rating}</TableCell>
                                                                                            <TableCell sx={{ width: '250px' }} align="left">
                                                                                                {j?.appraisal?.status ? (
                                                                                                    <p>{j?.appraisal?.status}</p>
                                                                                                ) : (
                                                                                                    <p>Not Started </p>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell sx={{ width: '165px' }} align="center">
                                                                                                <img src={Eye} alt="icon" />
                                                                                            </TableCell> */}

                                                                                     <TableCell
                                                                                          // width="15%"
                                                                                          align="left"
                                                                                     >
                                                                                          {
                                                                                               j?.position_long_description
                                                                                          }
                                                                                     </TableCell>
                                                                                     <TableCell
                                                                                          // width="5%"
                                                                                          // align="left"
                                                                                          style={{ textAlign: "center", paddingRight: "30px" }}
                                                                                     >
                                                                                          {j?.grade}
                                                                                     </TableCell>
                                                                                     {tabValue != 5 && (
                                                                                          <TableCell
                                                                                               align="left"
                                                                                          // width="10%"
                                                                                          >
                                                                                               {getPendingAction(j.appraisal?.pa_status, j.appraisal?.status)}
                                                                                          </TableCell>
                                                                                     )}
                                                                                     {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (

                                                                                          <TableCell align="center">
                                                                                               {/* {getStatus(j?.appraisal?.status)} */}
                                                                                               {/* {overallRating(j?.appraisal?.status)} */}
                                                                                               {(j?.appraisal?.status == "completed") ? (j?.normalizer?.normalizer_rating) : "-"}
                                                                                          </TableCell>

                                                                                     )}
                                                                                     {tabValue == 4 && (
                                                                                          <TableCell align="center"
                                                                                               sx={{
                                                                                                    color:
                                                                                                         j.employee.employee_status == "rejected"
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
                                                                                     {tabValue != 0 && tabValue != 5 && (
                                                                                          <TableCell
                                                                                               // width="8%"
                                                                                               sx={{
                                                                                                    color:
                                                                                                         j.appraisal.appraiser_rejected == true
                                                                                                              ? "red"
                                                                                                              : "#333333",
                                                                                               }}
                                                                                               align="center"
                                                                                          >
                                                                                               {(j.appraisal
                                                                                                    ?.appraiser_rating == 0 || j.appraisal.appraiser_status == "draft") ? (
                                                                                                    <span> - </span>
                                                                                               ) : (
                                                                                                    j.appraisal
                                                                                                         ?.appraiser_rating
                                                                                               )}
                                                                                          </TableCell>
                                                                                     )}
                                                                                     {tabValue != 0 && tabValue != 5 && (
                                                                                          <TableCell
                                                                                               // width="8%"
                                                                                               sx={{
                                                                                                    color:
                                                                                                         (j.reviewer.reviewer_status ===
                                                                                                              "rejected" || j.reviewer.reviewer_status === "appraiser-rejected")
                                                                                                              ? "red"
                                                                                                              : "#333333",
                                                                                               }}
                                                                                               align="center"
                                                                                          >
                                                                                               {(j?.appraisal?.appraiser_status == "submitted" && j?.reviewer?.reviewer_status == "pending") ?
                                                                                                    <span> - </span> :
                                                                                                    (j.reviewer
                                                                                                         .reviewer_rating != 0) ? (
                                                                                                         j.reviewer.reviewer_rating
                                                                                                    ) : (
                                                                                                         <span> - </span>
                                                                                                    )}
                                                                                          </TableCell>
                                                                                     )}
                                                                                     {tabValue != 0 && tabValue != 5 && (
                                                                                          <TableCell
                                                                                               // width="9%"
                                                                                               sx={{
                                                                                                    color:
                                                                                                         (j?.normalizer?.normalizer_rejected === true)
                                                                                                              ? "red"
                                                                                                              : "#333333",
                                                                                                    marginLeft: "10px",
                                                                                               }}
                                                                                               align="center"
                                                                                          >
                                                                                               {
                                                                                                    (j.normalizer
                                                                                                         .normalizer_rating == 0 || j.normalizer.normalizer_status == "draft")
                                                                                                         ? (
                                                                                                              <span> - </span>
                                                                                                         ) : (
                                                                                                              j.normalizer
                                                                                                                   .normalizer_rating
                                                                                                         )}{" "}
                                                                                          </TableCell>
                                                                                     )}
                                                                                     {tabValue != 1 && tabValue != 2 && tabValue != 3 && tabValue != 4 && (
                                                                                          <TableCell align="center">
                                                                                               {"5"}

                                                                                          </TableCell>
                                                                                     )}
                                                                                     <TableCell
                                                                                          // width="10%"
                                                                                          align="center"
                                                                                     >
                                                                                          {getStatus(j?.appraisal?.status)}
                                                                                     </TableCell>
                                                                                     {/* {j?.appraisal?.status != "not-started" &&( */}
                                                                                     <TableCell
                                                                                          width="6%"
                                                                                          align="center"
                                                                                     >
                                                                                          {j?.appraisal?.status != "not-started" && (

                                                                                               <Link
                                                                                                    to={`${REVIEWER_VIEW_PA}/employee/${j._id}`}
                                                                                                    target="_blank"
                                                                                               >

                                                                                                    <img
                                                                                                         src={Eye}
                                                                                                         alt="icon"
                                                                                                    />{" "}
                                                                                               </Link>
                                                                                          )}
                                                                                     </TableCell>
                                                                                     {/* )} */}

                                                                                     {/* <TableCell  align="left">{j.position}</TableCell>
                                                                                            <TableCell   align="center">{j.grade}</TableCell>
                                                                                            <TableCell   align="center">{j.appraisal.appraiser_rating}</TableCell>
                                                                                            <TableCell   align="center">{j.reviewer.reviewer_rating}</TableCell>
                                                                                            <TableCell  align="center">{j.normalizer.normalizer_rating}</TableCell>
                                                                                            <TableCell   align="left">
                                                                                                {j?.appraisal?.status ? (
                                                                                                    <p>{j?.appraisal?.status}</p>
                                                                                                ) : (
                                                                                                    <p>Not Started </p>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell align="center" >
                                                                                                <img src={Eye} alt="icon" />
                                                                                            </TableCell> */}
                                                                                </TableRow>
                                                                           );
                                                                      })}
                                                       </TableBody>
                                                       //  </TableCell>
                                                       // )
                                                       // ;
                                                       // })
                                                  }
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
                                   </TabPanel>
                              </TableHeadings>
                         );
                    })}
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
                         {/*<Button*/}
                         {/*    style={{*/}
                         {/*        width: "92px",*/}
                         {/*        height: "35px",*/}
                         {/*        textTransform: "none",*/}
                         {/*        fontSize: "15px",*/}
                         {/*        fontFamily: "regular",*/}
                         {/*        color: "#1976d2",*/}
                         {/*        opacity: "80%",*/}
                         {/*        padding: "4px 22px",*/}
                         {/*        border: "1px solid #1976d2",*/}
                         {/*        borderRadius: "5px",*/}
                         {/*    }}*/}
                         {/*    onClick={handleDialogNo}*/}
                         {/*>*/}
                         {/*    Cancel*/}
                         {/*</Button>*/}
                    </DialogActions>
               </Dialog>
          </Mytable >
     );
};
export default MyAction;