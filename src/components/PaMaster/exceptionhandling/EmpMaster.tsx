import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import * as XLSX from "xlsx";
import Newexcel from "../../../assets/Images/Newexcel.svg";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import {
  Container,
  TablePagination,
  Drawer,
  Box,
  Typography,
  Tooltip,
  Menu,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/system";
import Searchicon from "../../../assets/Images/Searchicon.svg";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import {
  useGetEmployeeQuery,
  useGetEmployeeByFilterQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptEmployeeRoleExceptionsMutation,
  useAcceptEmployeeRoleExceptionsDraftMutation,
  useAcceptEmployeeCEORoleMutation,
  useAcceptEmployeeExcludedMutation,
  useAcceptEmployeeLeaversMutation,
  useAcceptEmployeeLeaversDraftMutation,
  useAcceptEmployeeNamesChangeMutation,
  useAcceptEmployeeGradeExceptionMutation,
  useGetConfirmValidationQuery,
  useUpdateConfirmValidationMutation,
  useGetActiveCalenderQuery,
  useGetEmployeeMappedQuery,
} from "../../../service";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Scrollbar from "react-scrollbars-custom";
// import FilterAltIcon from "@mui/icons-material/TableCellFilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import {
  ADD_EMPLOYEE,
  UNMAPPED_EMPLOYEES,
} from "../../../constants/routes/Routing";
import Switch from "@mui/material/Switch";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import AlertYesNo from "../../UI/DialogYesNo";
import { TextField, InputAdornment } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useUpdateClearEmployeeMutation } from "../../../service/employee/bulkUpload";
import DisplayingErrors from "../../employeeupload/DisplayingErrors";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  React.useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width: "6px !important",
    top: "60px !important",
    right: "4px !important",
    height: "calc(100% - 72px) !important",
  },
  "& .ScrollbarsCustom-TrackX": {
    height: "6px !important",
  },
});
const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  // marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
    borderRadius: "25px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#D5D5D5",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "12px",
    color: "#333333",
    opacity: "70%",
  },
  "& .MuiTextField-root": {
    minWidth: "100%",
    //   paddingLeft: "10px",
    //   paddingRight: "10px"
  },
});
const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: "15px",
  fontFamily: "Arial",
  borderColor: "#3E8CB5",
  color: "#3E8CB5",
  background: "transparent",
  width: "210px",
  height: "35px",
  // "&:hover": {
  //     borderColor: "#004C75",
  // },
  "&:disabled": {
    color: "#a9a4a4",
    borderColor: "#a9a4a4",
  },
  "&:active": {},
  "&:focus": {},
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

  button: {
    ["@media (max-width:1024px)"]: {
      fontSize: "12px !important",
      width: "175px !important",
    },
    ["@media (max-width:768px)"]: {
      fontSize: "10px !important",
      width: "100px !important",
    },
  },
}));

export default function EmpMaster(props: any) {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);
  const navigate = useNavigate();
  const CustomScrollbar = Scrollbar as any;
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions
  const classes = useStyles();
  const {
    searchName,
    setSearchName,
    values,
    checkedSwitch,
    setCheckedSwitch,
    employeeNamesAndCodes,
  } = props;
  console.log(searchName, "searchName");
  const [count, setCount] = React.useState(650);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,
  grade,service_reference_date,isSupervisor,grade_set,first_name,position_code,division,function,
  launchcalendarvalidations.confirmEmployeeMaster,overall_rating,confirmTemplate,appraiser_code,reviewer_code,normalizer_code,
  section,sub section,sub_section,manager_code,manager_name,manager_position,work_location,job_code,job_title,job_level,probation_status,
  appraiser_name,master_appraiser_code,master_appraiser_name,normalizer_name,
  isRoleExceptionDraft,isLeaversDraft,appraiser_code_Draft,appraiser_name_Draft,reviewer_code_Draft,reviewer_name_Draft,normalizer_code_Draft,normalizer_name_Draft,email,reviewer_name,isCEORole,isLeavers,isExcluded,isGradeException,isRoleException,employee_upload_flag,isSelected`;
  const { data, isLoading, isFetching, refetch } = useGetEmployeeByFilterQuery(
    `?limit=700&select=${SELECT_FOR_DASHBOARD}&employee_upload_flag=true`
  );
  console.log(isLoading, isFetching, "isFetching");

  //main data
  const [users, setUsers] = React.useState<any>([]);
  console.log(users, "usersALL");
  //main data

  const checkingData = data?.data?.filter((i: any) => {
    return i?.isRoleException == true && i?.isRoleExceptionDraft == true;
  });
  const roleExceptiondraftData = users?.filter((i: any) => {
    return i?.isRoleExceptionDraft == true;
  });
  // .map((i: any) => {
  // return i?._id
  // })
  // const leaversdraftDataCheck = users?.filter((i:any)=>{
  //   return i?.employee_code == "1644"
  // })
  //console.log(leaversdraftDatacheck,"leaversdraftDatacheck")
  console.log(
    checkingData,
    "checkingData",
    employeeNamesAndCodes,
    roleExceptiondraftData
  );
  console.log(
    employeeNamesAndCodes?.allIds,
    employeeNamesAndCodes?.employeeCodeVal,
    "checkingData"
  );
  // id: employeeNamesAndCodes.allIds,
  // "appraiser_code": employeeNamesAndCodes.employeeCodeVal,
  // "appraiser_name":  employeeNamesAndCodes.appraiserNameVal,
  // "reviewer_name": employeeNamesAndCodes.reviewerNameVal,
  // "reviewer_code": employeeNamesAndCodes.employeeCodeValRev,
  // "normalizer_name": employeeNamesAndCodes.normalizerNameVal,
  // "normalizer_code": employeeNamesAndCodes.employeeCodeValNor,
  // "activeCheckbox": employeeNamesAndCodes.handleChangeCheckboxValue,

  const { data: ActiveCData } = useGetActiveCalenderQuery("");
  const { data: mappedEmpData } = useGetEmployeeMappedQuery("");
  console.log(ActiveCData, "ActiveCData");
  console.log(mappedEmpData, "mappedEmpData");
  const [employeeUpdateRoleException] =
    useAcceptEmployeeRoleExceptionsMutation();
  const [employeeUpdateRoleExceptionDraft] =
    useAcceptEmployeeRoleExceptionsDraftMutation();
  const [employeeUpdateCEO] = useAcceptEmployeeCEORoleMutation();
  const [employeeUpdateExclusion] = useAcceptEmployeeExcludedMutation();
  const [employeeUpdateLeavers] = useAcceptEmployeeLeaversMutation();
  const [employeeUpdateLeaversDraft] = useAcceptEmployeeLeaversDraftMutation();
  const [employeeUpdateGradeException] =
    useAcceptEmployeeGradeExceptionMutation();
  const [employeeUpdateNames] = useAcceptEmployeeNamesChangeMutation();
  console.log(data, "ghg");
  //const {id} = useParams()
  const { data: confVal } = useGetConfirmValidationQuery("");
  const [updateConfirmValidation, { error: errorInConfirming }] =
    useUpdateConfirmValidationMutation();
  const [clearEmployee] = useUpdateClearEmployeeMutation();
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [clearedEmployeeAlert, setClearedEmployeeAlert] = useState(false);

  console.log(confVal, message, "ghg");
  // if (data != undefined)
  // setCount(data.data.length)
  //states for error component
  const [hideErrors, setHideErrors] = useState<any>(false);
  const [errorsList, setErrorsList] = useState<any>([]);
  //for alert
  const [LaunchValDialog, setLaunchValDialog] = useState(false);
  const [LaunchValDialogYes, setLaunchValDialogYes] = useState(false);
  const [LaunchValDialogMSG, setLaunchValDialogMSG] = useState("");
  const [LaunchValData, setLaunchValData] = React.useState<any>([]);
  const [confirmEmployeeMasDialog, setConfirmEmployeeMasDialog] =
    useState(false);
  const [confirmEmployeeMasDialogActive, setconfirmEmployeeMasDialogActive] =
    useState(false);
  console.log(
    confirmEmployeeMasDialog,
    confirmEmployeeMasDialogActive,
    "confirmEmployeeMasDialogActive"
  );
  //for clearing employee master
  const [clearingEmpDialogYes, setclearingEmpDialogYes] = useState(false);
  //for export to excel
  const [columnHeaders, setcolumnHeaders] = useState<any>({
    Ecode: true,
    Ename: true,
    Firstname: true,
    position: true,
    Grade: true,
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
    ReviewerName: true,
    NormalizerName: true,
    Potentiallevel: true,
    TalentCategory: true,
    overallRating: true,
    PreviousRating: true,
    AppraiserCode: true,
    ReviewerCode: true,
    NormalizerCode: true,
    EmployeeMappedStatus: true,
    ProbationStatus: true,
    Employeeemail: true,
    SelectAll: true,
  });

  const handleLaunchValYesorNoDialog = () => {
    setLaunchValDialogYes(false);
    setLaunchValDialogMSG("");
  };
  const handleLaunchValSelectYesDialog = () => {
    const Ids = LaunchValData?.position?.map((i: any) => {
      return i?.name;
    });
    console.log(Ids, "submit1");
    employeeUpdateExclusion({
      id: Ids,
    }).then((res: any) => {
      if (res.error) {
      } else {
        if (navPrompt) {
          setLaunchValDialog(true);
          setLaunchValDialogMSG("Employees were moved to Exclusions");
          setnavPrompt(false);
        } else {
          setLaunchValDialog(true);
          setLaunchValDialogMSG("No employees were selected");
        }
      }
    });
    setLaunchValDialogYes(false);
    setLaunchValDialogMSG("");
    //again save
  };
  const handleLaunchValDialog = () => {
    // let activeCal = ActiveCData?.data?.filter((i: any) => {
    //   return i?.status === "Live"
    // })
    // console.log(activeCal,"activeCal")
    setLaunchValDialog(false);
    setLaunchValDialogMSG("");
    if (confirmEmployeeMasDialogActive) {
      setConfirmEmployeeMasDialog(true);
    }
  };
  const confirmationAlertDialogClose = () => {
    setconfirmEmployeeMasDialogActive(false);
    setConfirmEmployeeMasDialog(false);
  };
  const handleConfirmAlert = () => {
    setConfirmAlert(false);
    setMessage("");
  };

  const handleClearEmployeeAlert = () => {
    setClearedEmployeeAlert(false);
    setMessage("");
    refetch();
  };
  //foralert
  const [page, setPage] = React.useState(0);
  console.log(page, "pagepage");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(newPage, "pagepage");
    setPage(newPage);
  };
  //Toogle switch
  //confVal.data[0].confirmEmployeeMaster
  //const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [checkedSwitch1, setCheckedSwitch1] = useState(false);
  const [checkedSwitch2, setCheckedSwitch2] = useState(false);
  const [checkedSwitch2Msg, setcheckedSwitch2Msg] = useState<string>("");
  const [checkedSwitch1Msg, setcheckedSwitch1Msg] = useState<string>("");
  const [checkedID, setcheckedID] = useState<string>("");
  console.log(checkedSwitch, checkedSwitch1, checkedSwitch2, "checkedSwitch");
  const TriggercheckedSwitch = useMemo(() => {
    //@ts-ignore
    setCheckedSwitch(confVal?.data[0]?.confirmEmployeeMaster);
    //@ts-ignore
    setcheckedID(confVal?.data[0]?._id);
  }, [confVal, checkedSwitch, checkedID]);
  //confVal?.data[0]?.confirmEmployeeMaster
  let activeCal = ActiveCData?.data?.filter((i: any) => {
    return i?.isActive === true;
  });
  console.log(activeCal, "ActiveCData");
  useEffect(() => {
    //for active cal
    let activeCal = ActiveCData?.data?.filter((i: any) => {
      return i?.isActive === true;
    });
    if (checkedSwitch === false) {
      if (activeCal?.length > 0) {
        setCheckedSwitch1(true);
        setcheckedSwitch1Msg("Calendar is live");
      } else if (activeCal?.length === 0) {
        setCheckedSwitch2(false);
        setCheckedSwitch1(false);
      }
    } else if (checkedSwitch === true) {
      setCheckedSwitch2(true);
      setCheckedSwitch1(true);
      setcheckedSwitch2Msg(" Please toggle off to add an employee.");
      setcheckedSwitch1Msg(" Please toggle off to add an employee.");
    }
    // if(checkedSwitch === false && activeCal?.length !== 0){
    //   setCheckedSwitch1(true)
    //   setcheckedSwitch1Msg("Calendar is live")
    // }else if(checkedSwitch === false && activeCal?.length === 0){
    //    setCheckedSwitch2(false)
    //    setCheckedSwitch1(false)
    // }else if(checkedSwitch === true){
    //   setCheckedSwitch2(true)
    //   setCheckedSwitch1(true)
    //   setcheckedSwitch2Msg(" Please toggle off to add an employee.")
    //   setcheckedSwitch1Msg(" Please toggle off to add an employee.")
    // }
  }, [checkedSwitch, ActiveCData]);
  //testing available data
  const leaversdraftData = users
    ?.filter((i: any) => {
      return i.isLeaversDraft == true;
    })
    .map((i: any) => {
      return i?._id;
    });
  console.log(leaversdraftData, "leaversdraftData");
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //probation status
    let checkingProbationStatus = users
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      ?.filter((i: any) => {
        return i?.probation_status?.toLowerCase()?.includes("probation");
      }).length;
    //for active cal
    let activeCal = ActiveCData?.data?.filter((i: any) => {
      return i?.isActive === true;
    });
    console.log(activeCal, "ActiveCData");
    console.log(event.target.checked, "checkedValue1");
    //for active cal
    // if (activeCal?.length !== 0) {
    //   setCheckedSwitch1(event.target.checked)
    // } else if (activeCal?.length === 0) {
    //   setCheckedSwitch2(event.target.checked)
    //   setCheckedSwitch1(event.target.checked)
    // }
    // if(event.target.checked === false && activeCal?.length !== 0){
    //   setCheckedSwitch1(true)
    // }else if(event.target.checked === false && activeCal?.length === 0){
    //   setCheckedSwitch2(false)
    //   setCheckedSwitch1(false)
    // }else if(event.target.checked === true){
    //   setCheckedSwitch2(true)
    //   setCheckedSwitch1(true)
    // }
    if (checkingProbationStatus > 0 && checkedSwitch === false) {
      setLaunchValDialogMSG(
        " There are employees on probation period. You cannot confirm employee list for performance appraisal."
      );
      setLaunchValDialog(true);
    } else {
      updateConfirmValidation({
        confirmEmployeeMaster: event.target.checked,
        id: checkedID,
      }).then((res: any) => {
        console.log(res, "resssssssssssss");
        if (res.error) {
          //setConfirmAlert(true);
          setHideErrors(true);
          setErrorsList(res?.error);
          //setMessage("The employee data contains some errors. Please review the data and upload the correct information.")
        } else {
          setConfirmAlert(false);
          setMessage("");
          console.log(event.target.checked, "checkedValue");
          // if (event.target.checked === true) {
          if (res?.data?.data?.confirmEmployeeMaster == true) {
            console.log("checkedSwitch1");
            setLaunchValDialogMSG(
              "The employee list for the performance appraisal was confirmed."
            );
            setLaunchValDialog(true);
            setCheckedSwitch2(true);
            setCheckedSwitch1(true);
            setcheckedSwitch2Msg(" Please toggle off to add an employee.");
            setcheckedSwitch1Msg(" Please toggle off to add an employee.");
            //saving draft values
            const leaversdraftData = users
              ?.filter((i: any) => {
                return i.isLeaversDraft == true;
              })
              .map((i: any) => {
                return i?._id;
              });
            console.log(leaversdraftData, "leaversdraftData");
            if (leaversdraftData.length > 0) {
              employeeUpdateLeavers({
                id: leaversdraftData,
              });
            }
            const roleExceptiondraftData = users
              ?.filter((i: any) => {
                return i.isRoleExceptionDraft == true;
              })
              .map((i: any) => {
                return i?._id;
              });
            //need to map the respective data
            if (roleExceptiondraftData?.length > 0) {
              employeeUpdateRoleException({
                id: roleExceptiondraftData,
              });

              //employeeNamesAndCodes---------all data needed
              //for names and codes
              const allIds = employeeNamesAndCodes?.EmpCode.map((i: any) => {
                return i?._id;
              });
              employeeUpdateNames({
                id: allIds,
                appraiser_code: employeeNamesAndCodes.employeeCodeValApp,
                appraiser_name: employeeNamesAndCodes.appraiserName,
                reviewer_name: employeeNamesAndCodes.reviewerName,
                reviewer_code: employeeNamesAndCodes.employeeCodeValRev,
                normalizer_name: employeeNamesAndCodes.normalizerName,
                normalizer_code: employeeNamesAndCodes.employeeCodeValNor,
                activeCheckbox: employeeNamesAndCodes.handleChangeCheckboxValue,
              });
            }
          } else {
            console.log("checkedSwitch2");
            setLaunchValDialogMSG(
              "The employee list for the performance appraisal was not confirmed."
            );
            setLaunchValDialog(true);
            if (activeCal?.length === 0) {
              console.log("checkedSwitch3");
              setCheckedSwitch2(false);
              setCheckedSwitch1(false);
              setcheckedSwitch2Msg("");
              setcheckedSwitch1Msg("");
            }
            if (activeCal?.length !== 0) {
              console.log("checkedSwitch4");
              setCheckedSwitch1(true);
              setCheckedSwitch2(false);
              setcheckedSwitch2Msg("");
              setcheckedSwitch1Msg(" Please toggle off to add an employee.");
            }
          }
        }
        //   navigate(`${UNMAPPED_EMPLOYEES}`, { state: { unmappedEmployeesData: res.error?.data?.data } })
      });
    }
  };
  // const ClearingSearch =React.useMemo(() => {
  //   //setsearchNameForTabs('');
  //   //data is cleared but textfeild is not clearing.
  //   setSearchName('')
  // },[values])
  // const TriggercheckedSwitch = useMemo(() => {

  //   //@ts-ignore
  //   setCheckedSwitch(confVal?.data[0]?.confirmEmployeeMaster)
  //   //@ts-ignore
  //   setcheckedID(confVal?.data[0]?._id)
  // }, [confVal])
  // const TriggerMappedorunmapped = useMemo(() => {
  //   const temp = ActiveCData?.data?.filter((i: any) => {
  //     return i?.status === "draft"
  //   })
  //   console.log(temp, "temptemp")
  // }, [ActiveCData])
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  console.log(positionFilter, "positionFilter");
  const handleChangeSelectPosition = (
    event: SelectChangeEvent<typeof positionFilter>
  ) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) {
      setpositionFilter([]);
    } else {
      setpositionFilter(typeof value === "string" ? value.split(",") : value);
    }
  };
  const handleChangeSelectGrade = (
    event: SelectChangeEvent<typeof GradeFilter>
  ) => {
    const {
      target: { value },
    } = event;

    if (value.includes("None")) {
      setGradeFilter([]);
    } else {
      setGradeFilter(typeof value === "string" ? value.split(",") : value);
    }
  };

  // React.useEffect(() => {
  //   if (data != undefined) {
  //     setCount(data.data.length)
  //   }
  // }, [data])

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
  console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setempEmployeeCode(event.target.value);
  };

  const [empsections, setempsections] = React.useState("");
  // console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
  };
  const [empFullName, setempFullName] = React.useState("");
  console.log(empFullName, "position");
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
  //console.log(empjoblevel, "position");
  const handleChangeempjoblevel = (event: SelectChangeEvent) => {
    setempjoblevel(event.target.value);
  };

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    // anchorOrigin: { vertical: "bottom", horizontal: "center" },
    // transformOrigin: { vertical: "top", horizontal: "right" },
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //maxWidth: 200,
        fontSize: "14px !important",
        fontFamily: "Arial",
        color: "#333333",
        // top:"250px !important",
        // left:"62px !important"
      },
    },
  };

  const sNSvalues = [
    { name: "SP", value: true },
    { name: "N-SP", value: false },
  ];

  //sorting
  //headings-sort
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };

  const [heading1, setheading1] = React.useState(true);
  // console.log(heading1, "h1");
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const [firstname, setfirstname] = React.useState(true);
  const handlefirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfirstname(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading2, setheading2] = React.useState(true);
  // console.log(heading2, "h2");
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading3, setheading3] = React.useState(true);
  // console.log(heading3, "h3");
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [headingSN, setheadingSN] = React.useState(true);
  // console.log(headingSN, "h1");
  const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingSN(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading4, setheading4] = React.useState(true);
  // console.log(heading4, "h4");
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading5, setheading5] = React.useState(true);
  // console.log(heading5, "h5");
  const handleheading5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading5(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading6, setheading6] = React.useState(true);
  // console.log(heading6, "h6");
  const handleheading6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading6(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading7, setheading7] = React.useState(true);
  // console.log(heading7, "h7");
  const handleheading7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading7(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading8, setheading8] = React.useState(true);

  const handleheading8 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading8(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading9, setheading9] = React.useState(true);

  const handleheading9 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading9(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading10, setheading10] = React.useState(true);
  const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading10(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading11, setheading11] = React.useState(true);
  const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading11(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading12, setheading12] = React.useState(true);
  const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading12(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading13, setheading13] = React.useState(true);
  const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading13(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading14, setheading14] = React.useState(true);
  const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading14(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading15, setheading15] = React.useState(true);
  const handleheading15 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading15(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading16, setheading16] = React.useState(true);
  const handleheading16 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading16(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading17, setheading17] = React.useState(true);
  const handleheading17 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading17(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading18, setheading18] = React.useState(true);
  const handleheading18 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading18(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [heading19, setheading19] = React.useState(true);
  const handleheading19 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading19(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleSelectAll = (selectAll:any) => {
    const updatedColumnHeaders = { ...columnHeaders };
    Object.keys(updatedColumnHeaders).forEach((key) => {
      updatedColumnHeaders[key] = selectAll;
    });
    setcolumnHeaders(updatedColumnHeaders);
  };
  const [emailData, setemailData] = React.useState(true);
  const handleEmailData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemailData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [managerCodeChecked, setmanagerCodeChecked] = React.useState(true);
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmanagerCodeChecked(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [managerNameChecked, setmanagerNameChecked] = React.useState(true);
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmanagerNameChecked(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders: any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  //headings-sort

  //Grade Select Filter
  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname: true,
      position: true,
      Grade: true,
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
      ReviewerName: true,
      NormalizerName: true,
      Potentiallevel: true,
      TalentCategory: true,
      overallRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      EmployeeMappedStatus: true,
      ProbationStatus: true,
      Employeeemail: true,
      SelectAll: true,
    });
  };
  const handleOpenGrade = () => {
    setOpenGrade(true);
  };

  //Supervisor NonSupervisor logic
  // const [supervisorIDs, setSupervisorIDs] = React.useState<any[]>([]);

  // React.useEffect(() => {
  //const found = data?.data?.map((k: any) => k._id);
  // const found = data?.data?.filter((r:any) => dataCode.includes(r.employee_code)).map((k:any) => k._id)

  // console.log(found, "check");
  //}, [data]);

  // React.useEffect(() => {
  //   if (data != undefined) {
  //     let ids: any[] = [];
  //     let EmployeeMasterData = data.data;
  //     data.data.forEach((emp: any) => {
  //       if (
  //         EmployeeMasterData.find(
  //           (item: any) => item.manager_code == emp.employee_code
  //         )
  //       )
  //         ids.push(emp._id);
  //     });
  //     setSupervisorIDs(ids);
  //     console.log(ids, "ids");
  //   }
  // }, [data])

  // React.useEffect(() => {
  //   let reviewers:any = []
  //   data?.data?.forEach((employee: any) => {
  //     let appraisals = data?.data?.filter(
  //         (emp: any) => emp.manager_code == employee.employee_code
  //     );
  //     let reviewals = [];
  //     let isReviewer = false;
  //     appraisals?.forEach((appraiser:any)=>{
  //       reviewals = data?.data?.filter(
  //           (emp: any) => emp.manager_code == appraiser.employee_code
  //       );
  //       if(reviewals.length > 0 )  isReviewer = true
  //     })
  //     if(isReviewer) reviewers.push(employee._id)
  //   })
  //
  //   console.log(reviewers,'reviewers')
  //
  // },[data])

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
    // setempEmployeeCode(event?.target?.value?.toString());
    setempEmployeeCode(event?.target?.getAttribute("value"));

    // console.log(event?.target.name.toString(),"handleTarget")
    setAnchorElnew(null);
    setPage(0);
    // handleClosenew(event);
  };

  //Legal Full Name
  const [anchorElnewFullName, setAnchorElnewFullName] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Legal Full Name

  //function
  const [anchorElnewFunction, setAnchorElnewFunction] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //function

  //FirstName
  const [anchorElnewFirstName, setAnchorElnewFirstName] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //FirstName

  //Supervisory Role
  const [anchorElnewSupervisoryRole, setAnchorElnewSupervisoryRole] =
    React.useState<null | HTMLElement>(null);
  const openSupervisoryRole = Boolean(anchorElnewSupervisoryRole);
  const handleClickSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSupervisoryRole(event.currentTarget);
  };
  const handleCloseSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSupervisoryRole(null);
  };
  const handleTargetSupervisoryRole = (event: any) => {
    setsNS(event?.target?.getAttribute("value"));

    handleCloseSupervisoryRole(event);
    setPage(0);
  };
  //Supervisory Role
  //serviceRefDate
  const [anchorElnewserviceRefDate, setAnchorElnewserviceRefDate] =
    React.useState<null | HTMLElement>(null);
  const openserviceRefDate = Boolean(anchorElnewserviceRefDate);
  const handleClickserviceRefDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRefDate(event.currentTarget);
  };
  const handleCloseserviceRefDate = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRefDate(null);
  };
  const handleTargetserviceRefDate = (event: any) => {
    setempService(event?.target?.getAttribute("value"));

    setAnchorElnewserviceRefDate(null);
    setPage(0);
  };
  //serviceRefDate
  //Grade
  const [anchorElnewserviceGrade, setAnchorElnewserviceGrade] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Grade
  //Position
  const [anchorElnewservicePosition, setAnchorElnewservicePosition] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Position
  //Position Code
  const [anchorElnewPositionCode, setAnchorElnewPositionCode] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewDivision, setAnchorElnewDivision] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewSection, setAnchorElnewSection] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewSubSection, setAnchorElnewSubSection] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewManagerCode, setAnchorElnewManagerCode] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Manager Code
  //Manager Name
  const [anchorElnewManagerName, setAnchorElnewManagerName] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Manager Name
  //Probation status
  const [ProbationStatus, setProbationStatus] = React.useState("");
  const [ProbationStatusVal, setProbationStatusVal] =
    React.useState<null | HTMLElement>(null);
  const openProbationStatusVal = Boolean(ProbationStatusVal);
  const handleClickProbationStatus = (event: React.MouseEvent<HTMLElement>) => {
    setProbationStatusVal(event.currentTarget);
  };
  const handleCloseProbationStatus = (event: React.MouseEvent<HTMLElement>) => {
    setProbationStatusVal(null);
  };
  const handleTargetProbationStatus = (event: any) => {
    setProbationStatus(event?.target?.getAttribute("value"));

    setProbationStatusVal(null);
    setPage(0);
    // allselectReset();
  };
  //Probation status
  //mapped status
  const [mappedStatus, setmappedStatus] = React.useState("");
  const [mappedStatusVal, setmappedStatusVal] =
    React.useState<null | HTMLElement>(null);
  console.log(mappedStatus, "mappedStatus");
  const openMappedStatusVal = Boolean(mappedStatusVal);
  const handleClickmappedStatus = (event: React.MouseEvent<HTMLElement>) => {
    setmappedStatusVal(event.currentTarget);
  };
  const handleClosemappedStatus = (event: React.MouseEvent<HTMLElement>) => {
    setmappedStatusVal(null);
  };
  const handleTargetmappedStatus = (event: any) => {
    setmappedStatus(event?.target?.getAttribute("value"));

    setmappedStatusVal(null);
    setPage(0);
  };
  //mapped status
  //Manager Position
  const [anchorElnewManagerPosition, setAnchorElnewManagerPosition] =
    React.useState<null | HTMLElement>(null);
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
    setPage(0);
  };
  //Manager Position
  //Work Location
  const [anchorElnewWorkLocation, setAnchorElnewWorkLocation] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewGradeSet, setAnchorElnewGradeSet] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewJobCode, setAnchorElnewJobCode] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewJobTitle, setAnchorElnewJobTitle] =
    React.useState<null | HTMLElement>(null);
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
  const [anchorElnewJobLevel, setAnchorElnewJobLevel] =
    React.useState<null | HTMLElement>(null);
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

  const [usersSelected, setUsersSelected] = React.useState<any>(0);
  const [usersDup, setUsersDup] = React.useState<any>([]);
  // console.log(usersSelected,page1, "usersSelected")
  //console.log(users,values,"userssss")
  React.useEffect(() => {
    console.log("useeffect run");
    let newemp = data?.data?.map((employee: any) => {
      return {
        ...employee,
        isMapped: mappedEmpData?.getEmployeefromAppraisalCalendar?.includes(
          employee._id
        ),
      };
    });
    console.log(newemp, "useeffect run");
    if (data) {
      setUsers(newemp);
      setUsersDup(data?.data);
    }
  }, [data, values]);
  //populating filter dropdown
  const [ecodeArray, setecodeArray] = React.useState<any>([]);
  const [enameArray, setenameArray] = React.useState<any>([]);
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
  //console.log(ecodeArray,enameArray,"enameArray")
  const probationStatusArray = ["Confirmed", "In probation"];
  const superVisoryRoleArray = ["SP", "N-SP"];
  const functionArray = ["SP", "N-SP"];
  const employeeMappedStatusArray = ["Mapped", "Unmapped"];

  //All select section
  // const [eCodeFilter, seteCodeFilter] = React.useState<string[]>([]);
  // const isAlleCodeFilter =
  // gradesArray?.length > 0 && eCodeFilter?.length === gradesArray?.length;

  // const newsection = gradesArray?.length == eCodeFilter?.length
  // const handleChangeSelecteCodeFilter = (event: any) => {
  // const value = event.target.value;
  // if (value[value.length - 1] === "all") {
  //   console.log((eCodeFilter?.length === gradesArray?.length ? [] : "select all"),"newwwwww")
  //   seteCodeFilter(eCodeFilter?.length === gradesArray?.length ? [] : gradesArray);
  //   return;
  // }
  // seteCodeFilter(value);
  // };

  const [GradesFilter, setSectionFilter] = React.useState<string[]>([]);
  const isAllGradesFilter =
    gradesArray?.length > 0 && GradesFilter?.length === gradesArray?.length;

  const newsection = gradesArray?.length == GradesFilter?.length;
  const handleChangeSelectSection = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        GradesFilter?.length === gradesArray?.length ? [] : "select all",
        "newwwwww"
      );
      setSectionFilter(
        GradesFilter?.length === gradesArray?.length ? [] : gradesArray
      );
      return;
    }
    setSectionFilter(value);
    setPage(0);
    //allselectReset();
  };

  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
  const isAllpositionsFilter =
    positionArray?.length > 0 &&
    positionsFilter?.length === positionArray?.length;
  const handleChangeSelectPositions = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        positionsFilter?.length === positionArray?.length ? [] : "select all",
        "newwwwww"
      );
      setpositionsFilter(
        positionsFilter?.length === positionArray?.length ? [] : positionArray
      );
      return;
    }
    setpositionsFilter(value);
    setPage(0);
  };
  //create six more
  const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
  const isAllsectionFilter =
    sectionArray?.length > 0 && sectionsFilter?.length === sectionArray?.length;
  const handleChangeSelectsections = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        sectionsFilter?.length === sectionsFilter?.length ? [] : "select all",
        "newwwwww"
      );
      setsectionsFilter(
        sectionsFilter?.length === sectionArray?.length ? [] : sectionArray
      );
      return;
    }
    setsectionsFilter(value);
    setPage(0);
  };

  const [appNameFilter, setappNameFilter] = React.useState<string[]>([]);
  const isAllappNameFilter =
    managerCodeArray?.length > 0 &&
    appNameFilter?.length === managerCodeArray?.length;
  const handleChangeappNameFilter = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        appNameFilter?.length === managerCodeArray?.length ? [] : "select all",
        "newwwwww"
      );
      setappNameFilter(
        appNameFilter?.length === managerCodeArray?.length
          ? []
          : managerCodeArray
      );
      return;
    }
    setappNameFilter(value);
  };

  const [revNameFilter, setrevNameFilter] = React.useState<string[]>([]);
  const isAllrevNameFilter =
    managerNameArray?.length > 0 &&
    revNameFilter?.length === managerNameArray?.length;
  const handleChangerevNameFilter = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        revNameFilter?.length === managerNameArray?.length ? [] : "select all",
        "newwwwww"
      );
      setrevNameFilter(
        revNameFilter?.length === managerNameArray?.length
          ? []
          : managerNameArray
      );
      return;
    }
    setrevNameFilter(value);
  };

  const [norNameFilter, setnorNameFilter] = React.useState<string[]>([]);
  const isAllnorNameFilter =
    managerPositionArray?.length > 0 &&
    norNameFilter?.length === managerPositionArray?.length;
  const handleChangenorNameFilter = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log(
        norNameFilter?.length === managerPositionArray?.length
          ? []
          : "select all",
        "newwwwww"
      );
      setnorNameFilter(
        norNameFilter?.length === managerPositionArray?.length
          ? []
          : managerPositionArray
      );
      return;
    }
    setnorNameFilter(value);
  };

  React.useEffect(() => {
    //code data
    const ecode = users
      .slice()
      .sort(function (a: any, b: any) {
        return a?.employee_code - b?.employee_code;
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.employee_code;
      });
    const codeContents = ecode.filter((c: any, index: any) => {
      return ecode.indexOf(c) === index && c != null && c != undefined;
    });
    setecodeArray(codeContents);

    //ename data
    const ename = users
      .slice()
      .sort(function (a: any, b: any) {
        return a?.legal_full_name - b?.legal_full_name;
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.legal_full_name;
      });
    const nameContents = ename.filter((c: any, index: any) => {
      return ename.indexOf(c) === index && c != null && c != undefined;
    });
    setenameArray(nameContents);

    const serviceRefDate = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.service_reference_date?.localeCompare(
          b?.service_reference_date
        );
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.service_reference_date;
      });
    // console.log(users,"users")
    // console.log(serviceRefDate,"serviceRefDate")
    const serviceRefDateContents = serviceRefDate.filter(
      (c: any, index: any) => {
        return (
          serviceRefDate.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setserviceRef(serviceRefDateContents);
    console.log(serviceRef, "serviceRef");
    let grades = users
      .slice()
      .sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.grade;
      });
    if (positionsFilter.length > 0) {
      grades = users
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade - b?.grade;
        })
        ?.filter((j: any) => {
          return (
            j?.isCEORole === false &&
            j?.isExcluded === false &&
            j?.isLeavers === false
          );
        })
        ?.filter((i: any) => {
          return !!positionsFilter?.find(
            (item2) => i?.position_long_description === item2
          );
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    // search functionality based on grade
    else if (searchName?.length > 0) {
      grades = users
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade?.localeCompare(b?.grade);
        })
        ?.filter((j: any) => {
          return (
            j?.isCEORole === false &&
            j?.isExcluded === false &&
            j?.isLeavers === false
          );
        })
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return (
              searchTerms.every((term: any) =>
                i?.grade?.toLowerCase().includes(term)
              ) ||
              searchTerms.every((term: any) =>
                i?.position_long_description?.toLowerCase().includes(term)
              )
            );
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    const gradeContents = grades.filter((c: any, index: any) => {
      return grades.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    console.log(grades, gradeContents, gradesArray, "gradeContents");
    let position = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(
          b?.position_long_description
        );
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.position_long_description;
      });
    // GradeFilter
    if (GradesFilter.length > 0) {
      position = users
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description - b?.position_long_description;
        })
        ?.filter((j: any) => {
          return (
            j?.isCEORole === false &&
            j?.isExcluded === false &&
            j?.isLeavers === false
          );
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find((item2) => i?.grade === item2);
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
    // console.log(GradesFilter,"GradesFilter")
    // search functionality based on position
    else if (searchName?.length > 0) {
      position = users
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description?.localeCompare(
            b?.position_long_description
          );
        })
        ?.filter((j: any) => {
          return (
            j?.isCEORole === false &&
            j?.isExcluded === false &&
            j?.isLeavers === false
          );
        })
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return (
              searchTerms.every((term: any) =>
                i?.position_long_description?.toLowerCase().includes(term)
              ) ||
              searchTerms.every((term: any) =>
                i?.grade?.toLowerCase().includes(term)
              )
            );
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
    const positionContents = position.filter((c: any, index: any) => {
      return position.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArray(positionContents);
    console.log(positionContents, "contents");

    const positionCode = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_code?.localeCompare(b?.position_code);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.position_code;
      });
    const positionCodeContents = positionCode.filter((c: any, index: any) => {
      return positionCode.indexOf(c) === index && c != null && c != undefined;
    });
    setpositioncodeArray(positionCodeContents);
    console.log(positionContents, "contents");

    const division = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.division;
      });
    const divisionContents = division.filter((c: any, index: any) => {
      return division.indexOf(c) === index && c != null && c != undefined;
    });
    setdivisionArray(divisionContents);
    console.log(divisionContents, "contents");

    const section = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.section;
      });
    const sectionContents = section.filter((c: any, index: any) => {
      return section.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
    console.log(sectionContents, "contents");

    const subSection = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.["sub section"]?.localeCompare(b?.["sub section"]);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i["sub section"];
      });
    const subSectionContents = subSection.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArray(subSectionContents);
    console.log(subSectionContents, "contents");

    const managerCode = users
      .slice()
      .sort(function (a: any, b: any) {
        return a.appraiser_name - b.appraiser_name;
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.appraiser_name;
      });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    console.log(managerCodeContents, "contents");

    const managerName = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.reviewer_name?.localeCompare(b?.reviewer_name);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.reviewer_name;
      });
    const managerNameContents = managerName.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    console.log(managerNameContents, "contents");

    const managerPosition = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.normalizer_name?.localeCompare(b?.normalizer_name);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.normalizer_name;
      });
    const managerPositionContents = managerPosition.filter(
      (c: any, index: any) => {
        return (
          managerPosition.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setmanagerPositionArray(managerPositionContents);
    console.log(managerPositionContents, "contents");

    const workLocation = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.work_location?.localeCompare(b?.work_location);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.work_location;
      });
    const workLocationContents = workLocation.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    console.log(workLocationContents, "contents");

    const gradeSet = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade_set?.localeCompare(b?.grade_set);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.grade_set;
      });
    const gradeSetContents = gradeSet.filter((c: any, index: any) => {
      return gradeSet.indexOf(c) === index && c != null && c != undefined;
    });
    setgradeSetArray(gradeSetContents);
    console.log(workLocationContents, "contents");

    const jobCode = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_code?.localeCompare(b?.job_code);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.job_code;
      });
    const jobCodeContents = jobCode.filter((c: any, index: any) => {
      return jobCode.indexOf(c) === index && c != null && c != undefined;
    });
    setjobCodeArray(jobCodeContents);
    console.log(jobCodeContents, "contents");

    const jobTitle = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_title?.localeCompare(b?.job_title);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.job_title;
      });
    const jobTitleContents = jobTitle.filter((c: any, index: any) => {
      return jobTitle.indexOf(c) === index && c != null && c != undefined;
    });
    setjobTitleArray(jobTitleContents);
    console.log(jobTitleContents, "contents");

    const jobLevel = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_level?.localeCompare(b?.job_level);
      })
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      .map((i: any) => {
        return i.job_level;
      });
    const jobLevelContents = jobLevel.filter((c: any, index: any) => {
      return jobLevel.indexOf(c) === index && c != null && c != undefined;
    });
    setjobLevelArray(jobLevelContents);
    console.log(jobLevelContents, "contents");
  }, [users, positionsFilter, GradesFilter, searchName]);
  //populating filter dropdown
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
  const [icon19, setIcon19] = React.useState<any>([]);
  const [icon20, setIcon20] = React.useState<any>([]);

  const handleExport = () => {
    // setShow(0);
    // console.log(users, 'excel')
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(excel);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  React.useEffect(() => {
    if (
      empEmployeeCode === "None" ||
      empEmployeeCode === "" ||
      empEmployeeCode === "0"
    ) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [empEmployeeCode]);
  React.useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [positionsFilter]);
  React.useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [empgrades]);
  React.useEffect(() => {
    if (GradesFilter?.length == 0) {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [GradesFilter]);
  React.useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon4(false);
    } else {
      setIcon4(true);
    }
  }, [empFullName]);
  React.useEffect(() => {
    if (empFirstName === "None" || empFirstName === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }
  }, [empFirstName]);
  React.useEffect(() => {
    if (empFunction === "None" || empFunction === "") {
      setIcon6(false);
    } else {
      setIcon6(true);
    }
  }, [empFunction]);
  React.useEffect(() => {
    if (empPositionCode === "None" || empPositionCode === "") {
      setIcon7(false);
    } else {
      setIcon7(true);
    }
  }, [empPositionCode]);
  React.useEffect(() => {
    if (empService === "None" || empService === "") {
      setIcon8(false);
    } else {
      setIcon8(true);
    }
  }, [empService]);
  React.useEffect(() => {
    if (sNS === "None" || sNS === "") {
      setIcon9(false);
    } else {
      setIcon9(true);
    }
  }, [sNS]);
  React.useEffect(() => {
    if (ProbationStatus === "None" || ProbationStatus === "") {
      setIcon20(false);
    } else {
      setIcon20(true);
    }
  }, [ProbationStatus]);
  React.useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon10(false);
    } else {
      setIcon10(true);
    }
  }, [sectionsFilter]);
  React.useEffect(() => {
    if (empGradeset === "None" || empGradeset === "") {
      setIcon11(false);
    } else {
      setIcon11(true);
    }
  }, [empGradeset]);
  React.useEffect(() => {
    if (empManagerCode === "None" || empManagerCode === "") {
      setIcon12(false);
    } else {
      setIcon12(true);
    }
  }, [empManagerCode]);
  React.useEffect(() => {
    if (empManagerName === "None" || empManagerName === "") {
      setIcon13(false);
    } else {
      setIcon13(true);
    }
  }, [empManagerName]);
  React.useEffect(() => {
    if (empjobtitle === "None" || empjobtitle === "") {
      setIcon14(false);
    } else {
      setIcon14(true);
    }
  }, [empjobtitle]);
  React.useEffect(() => {
    if (empJobcode === "None" || empJobcode === "") {
      setIcon15(false);
    } else {
      setIcon15(true);
    }
  }, [empJobcode]);
  React.useEffect(() => {
    if (mappedStatus === "None" || mappedStatus === "") {
      setIcon16(false);
    } else {
      setIcon16(true);
    }
  }, [mappedStatus]);
  React.useEffect(() => {
    if (empWorkLocation === "None" || empWorkLocation === "") {
      setIcon17(false);
    } else {
      setIcon17(true);
    }
  }, [empWorkLocation]);
  React.useEffect(() => {
    if (empManagerPosition === "None" || empManagerPosition === "") {
      setIcon18(false);
    } else {
      setIcon18(true);
    }
  }, [empManagerPosition]);
  React.useEffect(() => {
    const Normalizerdata = users
      //change users to dup
      ?.filter((j: any) => {
        return (
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      ?.filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
          // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
        }
      })
      .filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (GradesFilter.includes("None") || GradesFilter.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (positionsFilter.includes("None") || positionsFilter.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find(
            (item2: any) => item1?.section === item2
          );
        }
      })
      .filter((item1: any) => {
        if (appNameFilter.includes("None") || appNameFilter.length === 0) {
          return item1;
        } else {
          return !!appNameFilter?.find(
            (item2: any) => item1?.appraiser_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (revNameFilter.includes("None") || revNameFilter.length === 0) {
          return item1;
        } else {
          return !!revNameFilter?.find(
            (item2: any) => item1?.reviewer_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (norNameFilter.includes("None") || norNameFilter.length === 0) {
          return item1;
        } else {
          return !!norNameFilter?.find(
            (item2: any) => item1?.normalizer_name === item2
          );
        }
      })
      .filter((j: any) => {
        if (empEmployeeCode === "None" || empEmployeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(empEmployeeCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return j.division
            .toLocaleLowerCase()
            .includes(empdivisions.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase()
            ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empFunction === "None" || empFunction === "") {
          return j;
        } else {
          return (
            j.function.toLocaleLowerCase() === empFunction?.toLocaleLowerCase()
          );
        }
      })
      .filter((j: any) => {
        if (empPositionCode === "None" || empPositionCode === "") {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase()
            ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            .toLocaleLowerCase()
            .includes(empService.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j.isSupervisor !== true;
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
      // .filter((j: any) => {
      //   if (empManagerCode === "None" || empManagerCode === "") {
      //     return j;
      //   } else {
      //     return j?.manager_code
      //       ?.toLocaleLowerCase()
      //       ?.includes(empManagerCode?.toLocaleLowerCase());
      //   }
      // })
      // .filter((j: any) => {
      //   if (empManagerPosition === "None" || empManagerPosition === "") {
      //     return j;
      //   } else {
      //     return j?.manager_position
      //       ?.toLocaleLowerCase()
      //       ?.includes(empManagerPosition?.toLocaleLowerCase());
      //   }
      // })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return (
            j?.appraiser_name?.toLocaleLowerCase() ===
            empManagerCode?.toLocaleLowerCase()
          );
          //?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerPosition === "None" || empManagerPosition === "") {
          return j;
        } else {
          return (
            j?.normalizer_name?.toLocaleLowerCase() ===
            empManagerPosition?.toLocaleLowerCase()
          );
          //?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return (
            j?.reviewer_name?.toLocaleLowerCase() ===
            empManagerName?.toLocaleLowerCase()
          );
          //?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (empManagerName === "None" || empManagerName === "") {
      //     return j;
      //   } else {
      //     return j?.manager_name
      //       ?.toLocaleLowerCase()
      //       ?.includes(empManagerName?.toLocaleLowerCase());
      //   }
      // })
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
      ?.filter((j: any) => {
        if (ProbationStatus === "None" || ProbationStatus === "") {
          return j;
        } else {
          return (
            j?.probation_status?.toLocaleLowerCase() ===
            ProbationStatus?.toLocaleLowerCase()
          );
        }
      })
      .filter((j: any) => {
        if (empWorkLocation === "None" || empWorkLocation === "") {
          return j;
        } else {
          return j?.work_location
            ?.toLocaleLowerCase()
            ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (mappedStatus === "None" || mappedStatus === "") {
          return j;
        } else {
          return (
            (j.isMapped ? "Mapped" : "Unmapped").toLocaleLowerCase() ===
            mappedStatus?.toLocaleLowerCase()
          );
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
      .filter((j: any) => {
        if (searchName === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.first_name !== undefined &&
            j.first_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.appraiser_name !== undefined &&
            j.appraiser_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.probation_status !== undefined &&
            j.probation_status
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.reviewer_name !== undefined &&
            j.reviewer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.function !== undefined &&
            j.function
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.normalizer_name !== undefined &&
            j.normalizer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        } else if (searchName !== "") {
          if (searchName == "SP") {
            return j?.isSupervisor == true;
          } else if (searchName == "N-SP") {
            return j?.isSupervisor != true;
          }
        }
      })
      .map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")
        // if (j?.service_reference_date) {
        // let inputDate = j?.service_reference_date
        // const dateParts = inputDate?.split("-");
        // console.log(inputDate,dateParts,"inputDate")
        // let date = new Date(inputDate);
        // const year = date?.getFullYear();
        // const month = date?.toLocaleString("default", { month: "short" });
        // const day = date?.getDate();
        // const formattedDate = `${day}-${month}-${year}`;}
        let exportData: any = {};
        if (columnHeaders["Ecode"] == true)
          exportData["Ecode"] = j?.employee_code;
        if (columnHeaders["Ename"] == true)
          exportData["Employee Name"] = j?.legal_full_name;
        if (columnHeaders["Firstname"] == true)
          exportData["Known As"] = j?.first_name;
        if (j?.service_reference_date) {
          let inputDate = j?.service_reference_date;
          const dateParts = inputDate?.split("-");
          console.log(inputDate, dateParts, "inputDate");
          let date = new Date(inputDate);
          const year = date?.getFullYear();
          const month = date?.toLocaleString("default", { month: "short" });
          const day = date?.getDate();
          const formattedDate = `${day}-${month}-${year}`;
          if (columnHeaders["ServiceReferenceDate"] == true)
            exportData["Service Reference Date "] = formattedDate;
        } else {
          if (columnHeaders["ServiceReferenceDate"] == true)
            exportData["Service Reference Date "] = "";
        }
        if (columnHeaders["position"] == true)
          exportData["Position"] = j?.position_long_description;
        if (columnHeaders["Grade"] == true) exportData["Grade"] = j?.grade;
        if (columnHeaders["Function"] == true)
          exportData["Function"] = j?.function;
        if (columnHeaders["SupervisoryRole"] == true)
          exportData["Supervisory Role"] =
            j?.isSupervisor != true ? "N-SP" : "SP";
        if (columnHeaders["ProbationStatus"] == true)
          exportData["Probation Status"] = j?.probation_status;
        if (columnHeaders["Employeeemail"] == true)
          exportData["Email ID"] = j?.email;
        if (columnHeaders["division"] == true)
          exportData["Division"] = j?.division;
        if (columnHeaders["Section"] == true)
          exportData["Section"] = j?.section;
        if (columnHeaders["SubSection"] == true)
          exportData["Sub-section"] = j.sub_section;
        if (columnHeaders["WorkLocation"] == true)
          exportData["Work Location"] = j?.work_location;
        if (columnHeaders["AppraiserCode"] == true)
          exportData["Appraiser Code"] = j?.appraiser_code;
        if (columnHeaders["AppraiserName"] == true)
          exportData["Appraiser Name"] = j?.appraiser_name;
        if (columnHeaders["ReviewerCode"] == true)
          exportData["Reviewer Code"] = j?.reviewer_code;
        if (columnHeaders["ReviewerName"] == true)
          exportData["Reviewer Name"] = j?.reviewer_name;
        if (columnHeaders["NormalizerCode"] == true)
          exportData["HR Normalizer Code"] = j?.normalizer_code;
        if (columnHeaders["NormalizerName"] == true)
          exportData["HR Normalizer Name"] = j?.normalizer_name;
        if (columnHeaders["ManagerCode"] == true)
          exportData["Manager Code"] = j?.manager_code;
        if (columnHeaders["ManagerName"] == true)
          exportData["Manager Name"] = j?.manager_name;
        if (columnHeaders["ManagerPosition"] == true)
          exportData["Manager Position"] = j?.manager_position;
        return exportData;
        // return {
        //   Ecode: j.employee_code,
        //   EmployeeName: j.legal_full_name,
        //   Position: j.position_long_description,
        //   Grade: j.grade,
        //   SupervisoryRole: j.isSupervisor,
        //   Function: j?.function,
        //   AppraiserName: j?.appraiser_name,
        //   ReviewerName: j?.reviewer_name,
        //   NormalizerName: j?.normalizer_name,
        //   Section: j.section,
        //   ServiceReferenceDate: j.service_reference_date,
        //   SubSection: j["sub section"],
        //   Division: j.division,
        //   ManagerPosition: j?.manager_position,
        //   WorkLocation: j?.work_location,
        //   AppraiserCode: j?.appraiser_code,
        //   ReviewerCode: j?.reviewer_code,
        //   NormalizerCode: j?.normalizer_code
        //   // FirstName: j?.first_name,
        //   // PositionCode: j?.position_code,
        //   // ManagerCode: j?.manager_code,
        //   // ManagerName: j?.manager_name,
        //   // GradeSet: j?.grade_set,
        //   // JobCode: j?.job_code,
        //   // JobTitle: j?.job_title,
        //   // JobLevel: j?.job_level,
        //   // RoleCategory : j?.feedback_questionnaire,

        //   // PendingAction : getPAStatus(j),
        //   //
        // };
      });
    console.log(Normalizerdata, "Normalizerdata");
    if (Normalizerdata == null) {
      setExcel(users);
      setPage1(users);
    } else {
      setExcel(Normalizerdata);
      setPage1(Normalizerdata?.length);
    }
    console.log(Normalizerdata?.length, "ggggg");
    // // setPage1(Normalizerdata?.length)
    // // console.log(page1,"page1")
    console.log(excel, "excellll");
    // setExcel(Normalizerdata)
    // return Normalizerdata;
  }, [
    users,
    positions,
    empFullName,
    empFirstName,
    empEmployeeCode,
    ProbationStatus,
    empgrades,
    empdivisions,
    sNS,
    empsections,
    empSubSection,
    empFunction,
    empPositionCode,
    empService,
    empGradeset,
    empManagerCode,
    empManagerPosition,
    empManagerName,
    empjobtitle,
    empJobcode,
    empjoblevel,
    empWorkLocation,
    empsections,
    searchName,
    positionFilter,
    GradeFilter,
    GradesFilter,
    positionsFilter,
    sectionsFilter,
    appNameFilter,
    revNameFilter,
    norNameFilter,
    columnHeaders,
    heading1,
    heading2,
    heading5,
    heading6,
    heading8,
    heading9,
    heading4,
    heading19,
    heading10,
    heading7,
    heading11,
    heading12,
    heading13,
    heading14,
    heading15,
    heading16,
    heading17,
    mappedStatus,
  ]);

  //also used for all select
  useEffect(() => {
    const thedata = users
      ?.filter((j: any) => {
        console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjj");
        return (
          j.employee_upload_flag &&
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      ?.filter((j: any) => {
        if (ProbationStatus === "None" || ProbationStatus === "") {
          return j;
        } else {
          return (
            j?.probation_status?.toLocaleLowerCase() ===
            ProbationStatus?.toLocaleLowerCase()
          );
          //.includes(positions.toLocaleLowerCase());
          // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
        }
      })
      // ProbationStatus
      .filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (GradesFilter.includes("None") || GradesFilter.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (positionsFilter.includes("None") || positionsFilter.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find(
            (item2: any) => item1?.section === item2
          );
        }
      })
      .filter((item1: any) => {
        if (appNameFilter.includes("None") || appNameFilter.length === 0) {
          return item1;
        } else {
          return !!appNameFilter?.find(
            (item2: any) => item1?.appraiser_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (revNameFilter.includes("None") || revNameFilter.length === 0) {
          return item1;
        } else {
          return !!revNameFilter?.find(
            (item2: any) => item1?.reviewer_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (norNameFilter.includes("None") || norNameFilter.length === 0) {
          return item1;
        } else {
          return !!norNameFilter?.find(
            (item2: any) => item1?.normalizer_name === item2
          );
        }
      })
      ?.filter((j: any) => {
        if (
          empEmployeeCode === "None" ||
          empEmployeeCode === "" ||
          empEmployeeCode === "0"
        ) {
          return j;
        } else {
          return (
            j?.employee_code?.toLocaleLowerCase() ===
            empEmployeeCode?.toLocaleLowerCase()
          );

          // .includes(empEmployeeCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return (
            j?.grade?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase()
          );
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return (
            j?.division?.toLocaleLowerCase() ===
            empdivisions?.toLocaleLowerCase()
          );
          //.includes(empdivisions.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return (
            j?.legal_full_name?.toLocaleLowerCase() ===
            empFullName?.toLocaleLowerCase()
          );
          //?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return (
            j?.first_name?.toLocaleLowerCase() ===
            empFirstName?.toLocaleLowerCase()
          );
          //?.includes(empFirstName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empFunction === "None" || empFunction === "") {
          return j;
        } else {
          return (
            j.function.toLocaleLowerCase() === empFunction?.toLocaleLowerCase()
          );
        }
      })
      ?.filter((j: any) => {
        if (empPositionCode === "None" || empPositionCode === "") {
          return j;
        } else {
          return (
            j?.position_code?.toLocaleLowerCase() ===
            empPositionCode?.toLocaleLowerCase()
          );
          //?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return (
            j?.service_reference_date?.toLocaleLowerCase() ===
            empService?.toLocaleLowerCase()
          );
          //.includes(empService.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (empSubSection === "None" || empSubSection === "") {
      //     return j;
      //   } else {
      //     return j.Service
      //       .toLocaleLowerCase()
      //       .includes(empSubSection.toLocaleLowerCase());
      //   }
      // })
      ?.filter((j: any) => {
        //console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j?.isSupervisor === true;
        } else if (sNS === "N-SP") {
          // return j?.isSupervisor === undefined;
          return j?.isSupervisor !== true;
        }
      })
      ?.filter((j: any) => {
        if (empSubSection === "None" || empSubSection === "") {
          return j;
        } else {
          return (
            j["sub section"]?.toLocaleLowerCase() ===
            empSubSection?.toLocaleLowerCase()
          );
          //.includes(empSubSection.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return (
            j?.grade_set?.toLocaleLowerCase() ===
            empGradeset?.toLocaleLowerCase()
          );
          //?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return (
            j?.appraiser_name?.toLocaleLowerCase() ===
            empManagerCode?.toLocaleLowerCase()
          );
          //?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerPosition === "None" || empManagerPosition === "") {
          return j;
        } else {
          return (
            j?.normalizer_name?.toLocaleLowerCase() ===
            empManagerPosition?.toLocaleLowerCase()
          );
          //?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return (
            j?.reviewer_name?.toLocaleLowerCase() ===
            empManagerName?.toLocaleLowerCase()
          );
          //?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return (
            j?.job_title?.toLocaleLowerCase() ===
            empjobtitle?.toLocaleLowerCase()
          );
          //?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return (
            j?.job_code?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase()
          );
          //?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return (
            j?.job_level?.toLocaleLowerCase() ===
            empjoblevel?.toLocaleLowerCase()
          );
          //?.includes(empjoblevel?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empWorkLocation === "None" || empWorkLocation === "") {
          return j;
        } else {
          return (
            j?.work_location?.toLocaleLowerCase() ===
            empWorkLocation?.toLocaleLowerCase()
          );
          //?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return (
            j.section.toLocaleLowerCase() === empsections?.toLocaleLowerCase()
          );
          //.includes(empsections.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (mappedStatus === "None" || mappedStatus === "") {
      //     return j;
      //   } else {
      //     return j.isMapped ? "Mapped" : "Unmapped"
      //       .toLocaleLowerCase() === mappedStatus?.toLocaleLowerCase();
      //     //.includes(empsections.toLocaleLowerCase());

      //   }
      // })
      .filter((j: any) => {
        if (mappedStatus === "None" || mappedStatus === "") {
          return j;
        } else {
          return (
            (j.isMapped ? "Mapped" : "Unmapped").toLocaleLowerCase() ===
            mappedStatus?.toLocaleLowerCase()
          );
        }
      })
      .filter((j: any) => {
        if (searchName === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.first_name !== undefined &&
            j.first_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.appraiser_name !== undefined &&
            j.appraiser_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.probation_status !== undefined &&
            j.probation_status
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.reviewer_name !== undefined &&
            j.reviewer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.function !== undefined &&
            j.function
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.normalizer_name !== undefined &&
            j.normalizer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        } else if (searchName !== "") {
          if (searchName == "SP") {
            return j?.isSupervisor == true;
          } else if (searchName == "N-SP") {
            return j?.isSupervisor != true;
          }
        }
      })
      ?.filter((j: any) => {
        return j?.isSelected === true;
      });
    console.log(thedata?.length, "thedata");
    setUsersSelected(thedata?.length);
    if (thedata?.length != 0) {
      setnavPrompt(true);
    } else {
      setnavPrompt(false);
    }
  });

  // const allselectReset = ()=>{
  //   const tempUser = users.map((employee: any) => {
  //     return filteredUsersID.includes(employee?.employee_code)
  //       ? { ...employee, isSelected: checkedStatus }
  //       : employee;
  //   });
  //   setUsers(tempUser);
  // }
  const handleOnCheck = (e: any) => {
    // setnavPrompt(true)
    const { name, checked } = e.target;
    setCheckedStatus(checked);
    console.log(name, checked, "handleChange");
    let filteredUsersID = users
      ?.filter((j: any) => {
        console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjj");
        return (
          j.employee_upload_flag &&
          j?.isCEORole === false &&
          j?.isExcluded === false &&
          j?.isLeavers === false
        );
      })
      ?.filter((j: any) => {
        if (ProbationStatus === "None" || ProbationStatus === "") {
          return j;
        } else {
          return (
            j?.probation_status?.toLocaleLowerCase() ===
            ProbationStatus?.toLocaleLowerCase()
          );
          //.includes(positions.toLocaleLowerCase());
          // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
        }
      })
      // ProbationStatus
      .filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (GradesFilter.includes("None") || GradesFilter.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2);
        }
      })
      .filter((item1: any) => {
        if (positionsFilter.includes("None") || positionsFilter.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find(
            (item2: any) => item1?.position_long_description === item2
          );
        }
      })
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find(
            (item2: any) => item1?.section === item2
          );
        }
      })
      .filter((item1: any) => {
        if (appNameFilter.includes("None") || appNameFilter.length === 0) {
          return item1;
        } else {
          return !!appNameFilter?.find(
            (item2: any) => item1?.appraiser_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (revNameFilter.includes("None") || revNameFilter.length === 0) {
          return item1;
        } else {
          return !!revNameFilter?.find(
            (item2: any) => item1?.reviewer_name === item2
          );
        }
      })
      .filter((item1: any) => {
        if (norNameFilter.includes("None") || norNameFilter.length === 0) {
          return item1;
        } else {
          return !!norNameFilter?.find(
            (item2: any) => item1?.normalizer_name === item2
          );
        }
      })
      ?.filter((j: any) => {
        if (
          empEmployeeCode === "None" ||
          empEmployeeCode === "" ||
          empEmployeeCode === "0"
        ) {
          return j;
        } else {
          return (
            j?.employee_code?.toLocaleLowerCase() ===
            empEmployeeCode?.toLocaleLowerCase()
          );

          // .includes(empEmployeeCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return (
            j?.grade?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase()
          );
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return (
            j?.division?.toLocaleLowerCase() ===
            empdivisions?.toLocaleLowerCase()
          );
          //.includes(empdivisions.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return (
            j?.legal_full_name?.toLocaleLowerCase() ===
            empFullName?.toLocaleLowerCase()
          );
          //?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return (
            j?.first_name?.toLocaleLowerCase() ===
            empFirstName?.toLocaleLowerCase()
          );
          //?.includes(empFirstName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empFunction === "None" || empFunction === "") {
          return j;
        } else {
          return (
            j.function.toLocaleLowerCase() === empFunction?.toLocaleLowerCase()
          );
        }
      })
      ?.filter((j: any) => {
        if (empPositionCode === "None" || empPositionCode === "") {
          return j;
        } else {
          return (
            j?.position_code?.toLocaleLowerCase() ===
            empPositionCode?.toLocaleLowerCase()
          );
          //?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return (
            j?.service_reference_date?.toLocaleLowerCase() ===
            empService?.toLocaleLowerCase()
          );
          //.includes(empService.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (empSubSection === "None" || empSubSection === "") {
      //     return j;
      //   } else {
      //     return j.Service
      //       .toLocaleLowerCase()
      //       .includes(empSubSection.toLocaleLowerCase());
      //   }
      // })
      ?.filter((j: any) => {
        //console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j?.isSupervisor === true;
        } else if (sNS === "N-SP") {
          // return j?.isSupervisor === undefined;
          return j?.isSupervisor !== true;
        }
      })
      ?.filter((j: any) => {
        if (empSubSection === "None" || empSubSection === "") {
          return j;
        } else {
          return (
            j["sub section"]?.toLocaleLowerCase() ===
            empSubSection?.toLocaleLowerCase()
          );
          //.includes(empSubSection.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return (
            j?.grade_set?.toLocaleLowerCase() ===
            empGradeset?.toLocaleLowerCase()
          );
          //?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return (
            j?.appraiser_name?.toLocaleLowerCase() ===
            empManagerCode?.toLocaleLowerCase()
          );
          //?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerPosition === "None" || empManagerPosition === "") {
          return j;
        } else {
          return (
            j?.normalizer_name?.toLocaleLowerCase() ===
            empManagerPosition?.toLocaleLowerCase()
          );
          //?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return (
            j?.reviewer_name?.toLocaleLowerCase() ===
            empManagerName?.toLocaleLowerCase()
          );
          //?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return (
            j?.job_title?.toLocaleLowerCase() ===
            empjobtitle?.toLocaleLowerCase()
          );
          //?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return (
            j?.job_code?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase()
          );
          //?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return (
            j?.job_level?.toLocaleLowerCase() ===
            empjoblevel?.toLocaleLowerCase()
          );
          //?.includes(empjoblevel?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empWorkLocation === "None" || empWorkLocation === "") {
          return j;
        } else {
          return (
            j?.work_location?.toLocaleLowerCase() ===
            empWorkLocation?.toLocaleLowerCase()
          );
          //?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return (
            j.section.toLocaleLowerCase() === empsections?.toLocaleLowerCase()
          );
          //.includes(empsections.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (mappedStatus === "None" || mappedStatus === "") {
      //     return j;
      //   } else {
      //     return j.isMapped ? "Mapped" : "Unmapped"
      //       .toLocaleLowerCase() === mappedStatus?.toLocaleLowerCase();
      //     //.includes(empsections.toLocaleLowerCase());

      //   }
      // })
      .filter((j: any) => {
        if (mappedStatus === "None" || mappedStatus === "") {
          return j;
        } else {
          return (
            (j.isMapped ? "Mapped" : "Unmapped").toLocaleLowerCase() ===
            mappedStatus?.toLocaleLowerCase()
          );
        }
      })
      .filter((j: any) => {
        if (searchName === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.first_name !== undefined &&
            j.first_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.appraiser_name !== undefined &&
            j.appraiser_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.probation_status !== undefined &&
            j.probation_status
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.reviewer_name !== undefined &&
            j.reviewer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.function !== undefined &&
            j.function
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.normalizer_name !== undefined &&
            j.normalizer_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        } else if (searchName !== "") {
          if (searchName == "SP") {
            return j?.isSupervisor == true;
          } else if (searchName == "N-SP") {
            return j?.isSupervisor != true;
          }
        }
      })
      .map((j: any) => j.employee_code);
    console.log(filteredUsersID, "filteredUsersID");
    console.log(filteredUsersID, "filteredUsersID");
    // setnavPrompt(true);
    if (name === "allSelect") {
      const tempUser = users
        ?.filter((j: any) => {
          console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjj");
          return (
            j.employee_upload_flag &&
            j?.isCEORole === false &&
            j?.isExcluded === false &&
            j?.isLeavers === false
          );
        })
        .map((employee: any) => {
          console.log(employee, "filteredUsersID");
          return filteredUsersID.includes(employee?.employee_code)
            ? {
                ...employee,
                isSelected: checked,
              }
            : employee;
        });
      const tempUserDup = usersDup.map((employee: any) => {
        console.log(employee, "filteredUsersID");
        return filteredUsersID.includes(employee?.employee_code)
          ? { ...employee, isSelected: checked }
          : employee;
      });
      console.log(tempUser, "tempUserAllSelect");
      setUsers(tempUser);
      setUsersDup(tempUserDup);
    } else {
      console.log("kkkkkkkkkkk");
      const tempUser = users?.map((employee: any) => {
        return employee._id === name
          ? // return filteredUsersID.includes(employee.employee_code)
            {
              ...employee,
              isSelected: checked,
              // isRoleException: checked ,
              // isGradeException: checked,isCEORole: checked,isLeavers: checked,isExcluded:checked
            }
          : employee;
      });
      const tempUserDup = users?.map((employee: any) => {
        return employee._id === name
          ? // return filteredUsersID.includes(employee.employee_code)
            { ...employee, isSelected: checked }
          : employee;
      });

      setUsers(tempUser);
      setUsersDup(tempUserDup);
    }
  };
  const checkboxHandler = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i?.isSelected === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    console.log(res);
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i?._id,
          isRoleException: i?.isSelected,
          probationStatus: i?.probation_status,
          code: i?.employee_code,
          // master_appraiser_code:i?.appraiser_code,
          // master_appraiser_name:i?.appraiser_name,
          // master_reviewer_code: i?.reviewer_code,
          // master_reviewer_name: i?.reviewer_name,
          // master_normalizer_code: i?.normalizer_code,
          // master_normalizer_name: i?.normalizer_name,
        };
      });
      return check;
    }
  };
  const checkboxHandlerGrade = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i?.isSelected === true;
      });
      return res;
    }
  };

  const checkboxIdHandlerGrade = (res: any[]) => {
    console.log(res);
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i?._id,
          code: i?.employee_code,
          isGradeException: i?.isSelected,
          EmployeeName: i?.legal_full_name,
          probationStatus: i?.probation_status,
        };
      });
      return check;
    }
  };
  const checkboxHandlerCEO = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i?.isSelected === true;
      });
      return res;
    }
  };

  const checkboxIdHandlerCEO = (res: any[]) => {
    console.log(res);
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i?._id,
          isCEORole: i?.isSelected,
          probationStatus: i?.probation_status,
          code: i?.employee_code,
          isRoleException: i?.isRoleException,
          isGradeException: i?.isGradeException,
        };
      });
      return check;
    }
  };
  const checkboxHandlerExcluded = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i?.isSelected === true;
      });
      return res;
    }
  };

  const checkboxIdHandlerExcluded = (res: any[]) => {
    console.log(res);
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i?._id,
          isExcluded: i?.isSelected,
          probationStatus: i?.probation_status,
        };
      });
      return check;
    }
  };
  const checkboxHandlerLeavers = (checkbox: any) => {
    console.log(checkbox, "checkbox");
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i?.isSelected === true;
      });
      return res;
    }
  };

  const checkboxIdHandlerLeavers = (res: any[]) => {
    console.log(res);
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i?._id,
          isLeavers: i?.isSelected,
          isRoleException: i?.isRoleException,
          isGradeException: i?.isGradeException,
        };
      });
      return check;
    }
  };
  const onSubmitRoleExceptions = (details: any) => {
    console.log(details, "submit1");
    const Ids = details?.position?.map((i: any) => {
      return i?.name;
    });
    const probationdetails = details?.position?.filter((i: any) => {
      return i?.probationStatus?.toLowerCase()?.includes("probation");
    });
    console.log(probationdetails, "submit1");
    const ids = probationdetails.map((i: any) => {
      return i?.code;
    });
    // const appCodes = data?.position?.map((i:any) =>{
    //   return i?.appraiser_code
    // })
    // const appNames = data?.position?.map((i:any) =>{
    //   return i?.appraiser_name
    // })
    console.log(Ids, "submit1");
    if (probationdetails?.length > 0) {
      setLaunchValDialog(true);
      // setLaunchValDialogMSG("")
      // setLaunchValDialogYes(true);
      setLaunchValDialogMSG(
        `Employee code ${ids.join(
          ", "
        )} is on the probation period and can only be mapped to Exclusions or Leavers.`
      );
    } else {
      employeeUpdateRoleExceptionDraft({
        //isRoleException: data?.position?.isRoleException,
        //id: data?.position[0]?.name,
        id: Ids,
        // masterAppraiserCode:appCodes,
        //masterAppraiserName:appNames
        //app code
        //app name
      }).then((res: any) => {
        //   res.error ? <> </> :
        //   if(navPrompt){
        //     setLaunchValDialog(true);
        //   setLaunchValDialogMSG("Employees were moved to Role Exceptions")
        // }
        if (res.error) {
        } else {
          if (navPrompt) {
            if (ActiveCData?.data?.length > 0) {
              setconfirmEmployeeMasDialogActive(true);
            }
            setLaunchValDialog(true);
            setLaunchValDialogMSG("Employees were moved to the Role Exception");
          } else {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("No employees were selected");
          }
        }
      });
    }
    //.then((data: any) => console.log(data, "ctdata"));
    // setsavingEmpData(true);
    // createMappedPositions({
    //   employee: data.position,
    //   id: id,
    // }).then((res: any) => {
    //   res.error ? <> </> :
    //   //fetchUNMapped();
    //   setsaveTrigger(true);
    //   setsavingEmpData(false);
    //   })
  };

  const onSubmitExclusion = (data: any) => {
    console.log(data, "submit1");
    setLaunchValData(data);
    const probationdetails = data?.position?.filter((i: any) => {
      return i?.probationStatus === "Confirmed";
    });
    console.log(probationdetails, "submit1");
    // if(data?.position[0]?.isRoleException){
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were moved to roleExceptions")
    // }else if(data?.position[0]?.isGradeException){
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were moved to gradeExceptions")
    // }
    if (probationdetails.length > 0) {
      setLaunchValDialogYes(true);
      setLaunchValDialogMSG(
        "Selected employees are not on the probation period. Are you sure you wish to add these employees to the Exclusions?"
      );
    } else {
      const Ids = data?.position?.map((i: any) => {
        return i?.name;
      });
      console.log(Ids, "submit1");
      employeeUpdateExclusion({
        id: Ids,
      }).then((res: any) => {
        // res.error ? <> </> :
        //   setLaunchValDialog(true);
        // setLaunchValDialogMSG("Employees were moved to Exclusions")
        if (res.error) {
        } else {
          if (navPrompt) {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("Employees were moved to Exclusion");
            setnavPrompt(false);
          } else {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("No employees were selected");
          }
        }
      });
    }
  };
  const onSubmitGradeException = (details: any) => {
    console.log(details, "submit1");
    const probationdetails = details?.position?.filter((i: any) => {
      return i?.probationStatus?.toLowerCase()?.includes("probation");
    });
    console.log(probationdetails, "submit1");
    const ids = probationdetails.map((i: any) => {
      return i?.code;
    });
    console.log(ids, "submit1");
    // if(data?.position[0]?.isRoleException){
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were moved to roleExceptions")

    // }else if(data?.position[0]?.isGradeException){
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were moved to gradeExceptions")
    // }else{
    // }
    if (probationdetails?.length > 0) {
      setLaunchValDialog(true);
      setLaunchValDialogMSG(
        `Employee code ${ids.join(
          ", "
        )} is on the probation period and can only be mapped to Exclusions or Leavers.`
      );
    } else {
      const Ids = details?.position?.map((i: any) => {
        return i?.name;
      });
      console.log(Ids, "submit1");
      employeeUpdateGradeException({
        id: Ids,
      }).then((res: any) => {
        // res.error ? <> </> :
        //   setLaunchValDialog(true);
        // setLaunchValDialogMSG("Employees were moved to Grade Exception")
        if (res.error) {
        } else {
          if (navPrompt) {
            setLaunchValDialog(true);
            // setLaunchValDialogMSG("Employees were moved to Grade Exception")
            setLaunchValDialogMSG("Employees were moved to Grade Exception");
            setnavPrompt(false);
          } else {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("No employees were selected");
          }
        }
      });
    }
    // }
  };
  const onSubmitCEORole = (details: any) => {
    console.log(details, "submit1");
    const probationdetails = details?.position?.filter((i: any) => {
      return i?.probationStatus?.toLowerCase()?.includes("probation");
    });
    console.log(probationdetails, "submit1");
    const ids = probationdetails.map((i: any) => {
      return i?.code;
    });
    if (probationdetails?.length > 0) {
      setLaunchValDialog(true);
      setLaunchValDialogMSG(
        `Employee ID ${ids.join(
          ", "
        )} is on the probation period and can only be mapped to Exclusions or Leavers.`
      );
    } else if (details?.position[0]?.isRoleException) {
      setLaunchValDialog(true);
      setLaunchValDialogMSG(
        "Employees were already moved to the Role Exception"
      );
    } else if (details?.position[0]?.isGradeException) {
      setLaunchValDialog(true);
      setLaunchValDialogMSG("Employees were already moved to grade Exception");
    } else {
      //change data
      const Ids = details?.position?.map((i: any) => {
        return i?.name;
      });
      console.log(Ids, "submit1");
      employeeUpdateCEO({
        id: Ids,
      }).then((res: any) => {
        // res.error ? <> </> :
        //   setLaunchValDialog(true);
        // setLaunchValDialogMSG("Employees were moved to CEO Role")
        if (res.error) {
        } else {
          if (navPrompt) {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("Employees were moved to C-Level");
            setnavPrompt(false);
          } else {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("No employees were selected");
          }
        }
      });
    }
  };
  const onSubmitLeavers = (data: any) => {
    console.log(data, "submit1");
    // if (data?.position[0]?.isRoleException) {
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were already moved to the Role Exception")
    //   setnavPrompt(false)
    // } else if (data?.position[0]?.isGradeException) {
    //   setLaunchValDialog(true);
    //   setLaunchValDialogMSG("Employees were already moved to the Grade Exception")
    // } else {

    //saving as draft
    const Ids = data?.position?.map((i: any) => {
      return i?.name;
    });
    console.log(Ids, "submit1");
    //if it is not live and eployees not confirmed
    if (ActiveCData.length !== 1) {
      employeeUpdateLeavers({
        id: Ids
      }).then((res: any) => {
        if (res.error) {
          console.log("errorLeaversupdate")
        } else {
          console.log("errorLeavers")
          if (navPrompt) {
            if(ActiveCData?.data?.length > 0){
              setconfirmEmployeeMasDialogActive(true)}
            setLaunchValDialog(true)
            setLaunchValDialogMSG("Employees were moved to Leavers")
            setnavPrompt(false)
          } else {
            setLaunchValDialog(true)
            setLaunchValDialogMSG("No employees were selected")
          }
        }
      });
    } else if (ActiveCData) {
      //if calendar is live
      employeeUpdateLeaversDraft({
        id: Ids,
      }).then((res: any) => {
        // res.error ? <> </> :
        //   setLaunchValDialog(true);
        // setLaunchValDialogMSG("Employees were moved to Leavers")
        if (res.error) {
          console.log("errorLeaversupdate");
        } else {
          console.log("errorLeavers");
          if (navPrompt) {
            if (ActiveCData?.data?.length > 0) {
              setconfirmEmployeeMasDialogActive(true);
            }
            setLaunchValDialog(true);
            setLaunchValDialogMSG("Employees were moved to Leavers");
            setnavPrompt(false);
          } else {
            setLaunchValDialog(true);
            setLaunchValDialogMSG("No employees were selected");
          }
        }
      });
      //};
    }
  };

  // const handleSearchBar = (e: any) => {
  //   setSearchName(e.target.value);
  //   setPage(0);
  // }
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setSearchName(e.target.value);
    setPage(0);
  };
  //for showing no data available
  const tableDataLength = users?.filter((j: any) => {
    return (
      j?.isCEORole === false &&
      j?.isExcluded === false &&
      j?.isLeavers === false
    );
  });
  const tableDataFilterdLength = users
    ?.filter((j: any) => {
      return (
        j?.isCEORole === false &&
        j?.isExcluded === false &&
        j?.isLeavers === false
      );
    })
    ?.filter((j: any) => {
      if (ProbationStatus === "None" || ProbationStatus === "") {
        return j;
      } else {
        return (
          j?.probation_status?.toLocaleLowerCase() ===
          ProbationStatus?.toLocaleLowerCase()
        );
        //.includes(positions.toLocaleLowerCase());
        // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
      }
    })
    // ProbationStatus
    .filter((item1: any) => {
      if (positionFilter.includes("None") || positionFilter.length === 0) {
        return item1;
      } else {
        return !!positionFilter?.find(
          (item2: any) => item1?.position_long_description === item2
        );
      }
    })
    .filter((item1: any) => {
      if (GradeFilter.includes("None") || GradeFilter.length === 0) {
        return item1;
      } else {
        return !!GradeFilter?.find((item2: any) => item1?.grade === item2);
      }
    })
    .filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2);
      }
    })
    .filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find(
          (item2: any) => item1?.position_long_description === item2
        );
      }
    })
    .filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2);
      }
    })
    .filter((item1: any) => {
      if (appNameFilter.includes("None") || appNameFilter.length === 0) {
        return item1;
      } else {
        return !!appNameFilter?.find(
          (item2: any) => item1?.appraiser_name === item2
        );
      }
    })
    .filter((item1: any) => {
      if (revNameFilter.includes("None") || revNameFilter.length === 0) {
        return item1;
      } else {
        return !!revNameFilter?.find(
          (item2: any) => item1?.reviewer_name === item2
        );
      }
    })
    .filter((item1: any) => {
      if (norNameFilter.includes("None") || norNameFilter.length === 0) {
        return item1;
      } else {
        return !!norNameFilter?.find(
          (item2: any) => item1?.normalizer_name === item2
        );
      }
    })
    ?.filter((j: any) => {
      if (
        empEmployeeCode === "None" ||
        empEmployeeCode === "" ||
        empEmployeeCode === "0"
      ) {
        return j;
      } else {
        return (
          j?.employee_code?.toLocaleLowerCase() ===
          empEmployeeCode?.toLocaleLowerCase()
        );

        // .includes(empEmployeeCode?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.grade?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empdivisions === "None" || empdivisions === "") {
        return j;
      } else {
        return (
          j?.division?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase()
        );
        //.includes(empdivisions.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return (
          j?.legal_full_name?.toLocaleLowerCase() ===
          empFullName?.toLocaleLowerCase()
        );
        //?.includes(empFullName?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empFirstName === "None" || empFirstName === "") {
        return j;
      } else {
        return (
          j?.first_name?.toLocaleLowerCase() ===
          empFirstName?.toLocaleLowerCase()
        );
        //?.includes(empFirstName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empFunction === "None" || empFunction === "") {
        return j;
      } else {
        return (
          j.function.toLocaleLowerCase() === empFunction?.toLocaleLowerCase()
        );
      }
    })
    ?.filter((j: any) => {
      if (empPositionCode === "None" || empPositionCode === "") {
        return j;
      } else {
        return (
          j?.position_code?.toLocaleLowerCase() ===
          empPositionCode?.toLocaleLowerCase()
        );
        //?.includes(empPositionCode?.toLocaleLowerCase());
      }
    })

    ?.filter((j: any) => {
      if (empService === "None" || empService === "") {
        return j;
      } else {
        return (
          j?.service_reference_date?.toLocaleLowerCase() ===
          empService?.toLocaleLowerCase()
        );
        //.includes(empService.toLocaleLowerCase());
      }
    })
    // .filter((j: any) => {
    //   if (empSubSection === "None" || empSubSection === "") {
    //     return j;
    //   } else {
    //     return j.Service
    //       .toLocaleLowerCase()
    //       .includes(empSubSection.toLocaleLowerCase());
    //   }
    // })
    ?.filter((j: any) => {
      //console.log(j.isSupervisor, "superv");
      if (sNS === "None" || sNS === "") {
        return j;
      }
      if (sNS === "SP") {
        return j?.isSupervisor === true;
      } else if (sNS === "N-SP") {
        // return j?.isSupervisor === undefined;
        return j?.isSupervisor !== true;
      }
    })
    ?.filter((j: any) => {
      if (empSubSection === "None" || empSubSection === "") {
        return j;
      } else {
        return (
          j["sub section"]?.toLocaleLowerCase() ===
          empSubSection?.toLocaleLowerCase()
        );
        //.includes(empSubSection.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empGradeset === "None" || empGradeset === "") {
        return j;
      } else {
        return (
          j?.grade_set?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase()
        );
        //?.includes(empGradeset?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empManagerCode === "None" || empManagerCode === "") {
        return j;
      } else {
        return (
          j?.appraiser_name?.toLocaleLowerCase() ===
          empManagerCode?.toLocaleLowerCase()
        );
        //?.includes(empManagerCode?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empManagerPosition === "None" || empManagerPosition === "") {
        return j;
      } else {
        return (
          j?.normalizer_name?.toLocaleLowerCase() ===
          empManagerPosition?.toLocaleLowerCase()
        );
        //?.includes(empManagerPosition?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empManagerName === "None" || empManagerName === "") {
        return j;
      } else {
        return (
          j?.reviewer_name?.toLocaleLowerCase() ===
          empManagerName?.toLocaleLowerCase()
        );
        //?.includes(empManagerName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empjobtitle === "None" || empjobtitle === "") {
        return j;
      } else {
        return (
          j?.job_title?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase()
        );
        //?.includes(empjobtitle?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empJobcode === "None" || empJobcode === "") {
        return j;
      } else {
        return (
          j?.job_code?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase()
        );
        //?.includes(empJobcode?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empjoblevel === "None" || empjoblevel === "") {
        return j;
      } else {
        return (
          j?.job_level?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase()
        );
        //?.includes(empjoblevel?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empWorkLocation === "None" || empWorkLocation === "") {
        return j;
      } else {
        return (
          j?.work_location?.toLocaleLowerCase() ===
          empWorkLocation?.toLocaleLowerCase()
        );
        //?.includes(empWorkLocation?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empsections === "None" || empsections === "") {
        return j;
      } else {
        return (
          j.section.toLocaleLowerCase() === empsections?.toLocaleLowerCase()
        );
        //.includes(empsections.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (searchName === "") {
        return j;
      } else if (
        (j.employee_code !== undefined &&
          j.employee_code
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.legal_full_name !== undefined &&
          j.legal_full_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.first_name !== undefined &&
          j.first_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.section !== undefined &&
          j.section
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.position_long_description !== undefined &&
          j.position_long_description
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.appraiser_name !== undefined &&
          j.appraiser_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.probation_status !== undefined &&
          j.probation_status
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.reviewer_name !== undefined &&
          j.reviewer_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.function !== undefined &&
          j.function
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.normalizer_name !== undefined &&
          j.normalizer_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j.grade !== undefined &&
          j.grade.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))
      ) {
        return j;
      } else if (searchName !== "") {
        if (searchName == "SP") {
          return j?.isSupervisor == true;
        } else if (searchName == "N-SP") {
          return j?.isSupervisor != true;
        }
      }
    });
  console.log(tableDataFilterdLength, "tableDataFilterdLength");
  //export with choice
  const handleheadingSortAccept = () => {
    setisDrawerOpen(false);
    handleExport();
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname: true,
      position: true,
      Grade: true,
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
      ReviewerName: true,
      NormalizerName: true,
      Potentiallevel: true,
      TalentCategory: true,
      overallRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      EmployeeMappedStatus: true,
      ProbationStatus: true,
      Employeeemail: true,
      SelectAll: true,
    });
  };
  const handleExportFunction = () => {
    setisDrawerOpen(true);
  };
  const confirmClearemployeeMaster = () => {
    setclearingEmpDialogYes(true);
  };
  console.log(usersSelected, page1, "usersSelected");
  const handleClearEmployeeMaster = () => {
    setclearingEmpDialogYes(false);
    if (data) {
      let clearedEmployeeMasterData = data?.data?.map((item: any) => {
        return {
          employee_code: item.employee_code,
          employee_upload_flag: false,
          isGradeException: false,
          isRoleException: false,
          isCEORole: false,
          isExcluded: false,
          "roles.appraiser": false,
          "roles.reviewer": false,
          "roles.normalizer": false,
          "roles.employee": true,
          default_role: "employee",
        };
      });

      clearEmployee({ data: clearedEmployeeMasterData }).then((res: any) => {
        if (!res.error) {
          setClearedEmployeeAlert(true);
          setMessage("Employee data has been cleared from employee master.");
          updateConfirmValidation({
            confirmEmployeeMaster: false,
            id: checkedID,
          });
        }
      });
    }
  };
  //for error lists
  // const handleRetry = () => {
  //   setHideErrors(false)
  //   setErrorsList("")
  // }
  // const handleBack = () => {
  //   setHideErrors(false)
  //   setErrorsList("")
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {hideErrors === false && (
        <>
          <Box>
            <div style={{ paddingLeft: "10px", paddingRight: "15px" }}>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => {
                  handleCloseGrade();
                }}
              >
                <Box sx={{ padding: "10px" }}>
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
                          checked={columnHeaders?.Ecode}
                          name="Ecode"
                          onChange={handleheading1}
                        />
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
                          checked={columnHeaders?.Ename}
                          name="Ename"
                          onChange={handleheading2}
                        />
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
                          checked={columnHeaders?.Firstname}
                          name="Firstname"
                          onChange={handlefirstname}
                        />
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
                          checked={columnHeaders?.ServiceReferenceDate}
                          name="ServiceReferenceDate"
                          onChange={handleheading4}
                        />
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
                          checked={columnHeaders?.position}
                          name="position"
                          onChange={handleheading6}
                        />
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
                          checked={columnHeaders?.Grade}
                          name="Grade"
                          onChange={handleheading5}
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
                          checked={columnHeaders?.Function}
                          name="Function"
                          onChange={handleheading19}
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
                          checked={columnHeaders?.SupervisoryRole}
                          name="SupervisoryRole"
                          onChange={handleheadingSN}
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
                          checked={columnHeaders?.ProbationStatus}
                          name="ProbationStatus"
                          onChange={handleheading3}
                        />
                      }
                      label="Probation Status"
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
                          checked={columnHeaders?.Employeeemail}
                          name="Employeeemail"
                          onChange={handleEmailData}
                        />
                      }
                      label="Email ID "
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
                          checked={columnHeaders?.division}
                          name="division"
                          onChange={handleheading8}
                        />
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
                          checked={columnHeaders?.Section}
                          name="Section"
                          onChange={handleheading9}
                        />
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
                          checked={columnHeaders?.SubSection}
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
                          checked={columnHeaders?.WorkLocation}
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
                          checked={columnHeaders?.AppraiserCode}
                          name="AppraiserCode"
                          onChange={handleheading15}
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
                          checked={columnHeaders?.AppraiserName}
                          name="AppraiserName"
                          onChange={handleheading7}
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
                          checked={columnHeaders?.ReviewerCode}
                          name="ReviewerCode"
                          onChange={handleheading16}
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
                          checked={columnHeaders?.ReviewerName}
                          name="ReviewerName"
                          onChange={handleheading11}
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
                          checked={columnHeaders?.NormalizerCode}
                          name="NormalizerCode"
                          onChange={handleheading17}
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
                          checked={columnHeaders?.NormalizerName}
                          name="NormalizerName"
                          onChange={handleheading12}
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
                          checked={columnHeaders?.ManagerCode}
                          onChange={handleManagerCode}
                          name="ManagerCode"
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
                          checked={columnHeaders?.ManagerName}
                          onChange={handleManagerName}
                          name="ManagerName"
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
                          checked={columnHeaders?.ManagerPosition}
                          onChange={handleheading13}
                          name="ManagerPosition"
                        />
                      }
                      label="Manager Position"
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
                        checked={heading18}
                        name="EmployeeMappedStatus"
                        onChange={handleheading18}
                      />
                    }
                    label="Employee Mapped Status"
                  /> */}
                  </FormGroup>
                  <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    paddingTop="10px"
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
                </Box>
              </Drawer>
            </div>
          </Box>
          {/* {tableDataLength?.length > 0 &&  */}
          <Stack
            marginTop="10px"
            marginBottom="10px"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      checked={checkedSwitch}
                      onChange={handleSwitch}
                    />
                  }
                  label="Confirm Employee List"
                />
              </FormGroup>
            </div>
            {tableDataLength?.length > 0 && (
              <Stack
                direction="row"
                display="flex"
                alignItems="center"
                spacing={2}
              >
                <div>
                  <img
                    src={Newexcel}
                    alt="icon"
                    style={{ marginTop: "5px" }}
                    onClick={handleExportFunction}
                  />
                </div>
                <Searchfeild>
                  <TextField
                    id="outlined-basic"
                    autoComplete="off"
                    placeholder="Search Here..."
                    value={searchName}
                    onChange={handleSearchBar}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={Searchicon} alt="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Searchfeild>

                {/* if any calendar is in live then hide 'clear employee master' button . */}

                {/* {activeCal?.length == 0 && ( */}
                <StyledButton
                  variant="outlined"
                  disabled={checkedSwitch || ActiveCData?.data?.length > 0}
                  onClick={confirmClearemployeeMaster}
                >
                  Clear Employee Master
                </StyledButton>
                {/* )} */}
              </Stack>
            )}
          </Stack>
          {/* } */}
          {tableDataLength?.length > 0 && (
            <Scroll>
              <CustomScrollbar
                style={{ minWidth: 650, height: "calc(100vh - 375px)" }}
              >
                <Table size="small" aria-label="simple table" stickyHeader>
                  <TableHead>
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
                      {checkedSwitch === false && (
                        <TableCell width="0.5%" align="center">
                          <input
                            type="checkbox"
                            name="allSelect"
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
                            // checked={
                            //   usersDup?.filter(
                            //     (employee: any) => employee?.isSelected !== true
                            //   ).length < 1
                            // }
                            checked={usersSelected === page1 && page1 != 0}
                            onChange={handleOnCheck}
                          />
                        </TableCell>
                      )}
                      {/* {heading1 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          // bgcolor: "#ebf2f4",
                        }}
                      >
                        Ecode
                        {/* <Stack direction="row" alignItems="center" >
                        <div
                          aria-controls={opennew ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew ? "true" : undefined}
                          onClick={handleClicknew}
                        >
                          <Stack direction="row" alignItems="center">
                            Ecode
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                          >Clear Filter
                          </MenuItem>

                          {users
                            .slice()
                            .sort(function (a: any, b: any) {
                              return a.employee_code - b.employee_code;
                            })
                            ?.filter((j: any) => {
                              return j?.isCEORole === false && j?.isExcluded === false && j?.isLeavers === false 
                            })
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                  justifyContent: "center"
                                  //height:"200px"
                                }}
                                key={name.employee_code}
                                value={name.employee_code}
                                onClick={handleTarget}
                              >
                                {name.employee_code}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon && <FilterAltTwoToneIcon />}
                      </Stack> */}
                      </TableCell>
                      {/* )} */}
                      {/* {heading2 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 280 }}
                      >
                        Employee Name
                        {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFullName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFullName ? "true" : undefined}
                          onClick={handleClickFullName}
                        >
                          <Stack direction="row" alignItems="center">
                            Employee Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            width: "260px"
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
                          >Clear Filter
                          </MenuItem>

                          {users
                            .slice()
                            .sort(function (a: any, b: any) {
                              return a.legal_full_name - b.legal_full_name;
                            })
                            ?.filter((j: any) => {
                              return j?.isCEORole === false && j?.isExcluded === false && j?.isLeavers === false 
                            })
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                  justifyContent: "left"
                                  //height:"200px"
                                }}
                                key={name.legal_full_name}
                                value={name.legal_full_name}
                                //name={name.legal_full_name}
                                onClick={handleTargetFullName}
                              >
                                {name.legal_full_name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon4 && <FilterAltTwoToneIcon />}
                      </Stack> */}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 150 }}
                      >
                        Known As
                      </TableCell>
                      {/* )} */}
                      {/* {heading3 && (
                    <TableCell
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
                          aria-controls={openFirstName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFirstName ? "true" : undefined}
                          onClick={handleClickFirstName}
                        >
                          <Stack direction="row" alignItems="center">
                          First Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                           
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFirstName}
                           >None
                           </MenuItem>
                         
                          {users
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.first_name - b.first_name;
                              })
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                    justifyContent:"left"
                                   
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
                   
                    </TableCell>
                  )} */}

                      {/* {heading6 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                      >
                        <div>
                          {/* <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openservicePosition  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openservicePosition  ? "true" : undefined}
                          onClick={handleClickservicePosition}
                        >
                          <Stack direction="row" alignItems="center">
                          Position
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"240px"
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
                            paddingLeft: "16px",

                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetservicePosition}
                           >None
                           </MenuItem>
                         
                           {positionArray?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                    paddingLeft: "16px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetservicePosition}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon1 && <FilterAltTwoToneIcon />}
                        </Stack> */}

                          {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Position</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
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
                                    sx={{
                                      padding: "0px",
                                      fontSize: "12px",
                                      paddingLeft: "37px"
                                    }}
                                  >
                                  
                                    <ListItemText
                                      primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                      primary="None" />
                                  </MenuItem>

                                  {positionArray?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px"
                                        }}
                                      
                                        key={name}
                                        value={name}
                                      >
                                        <Checkbox
                                          style={{ padding: "3px", paddingLeft: "14px" }}
                                          size="small"
                                          checked={positionFilter.indexOf(name) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}
                                          primary={name} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                                {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl> */}
                          <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                            <Stack direction="row">
                              <span>Position</span>
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                size="small"
                                sx={{
                                  width: "25px",
                                  fontSize: "0rem",
                                  "& .MuiSvgIcon-root": {
                                    color: "#3e8cb5 !important",
                                  },
                                }}
                                disableUnderline
                                variant="standard"
                                MenuProps={MenuProps}
                                multiple
                                value={positionsFilter}
                                onChange={handleChangeSelectPositions}
                                renderValue={(selected) => selected.join(", ")}
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
                                    root: isAllpositionsFilter
                                      ? classes.selectedAll
                                      : "",
                                  }}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: "14px !important",
                                        },
                                      }}
                                      size="small"
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "14px",
                                        height: "0px",
                                      }}
                                      classes={{
                                        indeterminate:
                                          classes.indeterminateColor,
                                      }}
                                      checked={isAllpositionsFilter}
                                      indeterminate={
                                        positionsFilter?.length > 0 &&
                                        positionsFilter?.length <
                                          positionArray?.length
                                      }
                                      // sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "13px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        paddingRight: "10px",
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
                                        size="small"
                                        style={{
                                          padding: "0px",
                                          paddingLeft: "14px",
                                          height: "0px",
                                        }}
                                        checked={
                                          positionsFilter.indexOf(option) > -1
                                        }
                                      />
                                    </ListItemIcon>

                                    <ListItemText
                                      sx={{
                                        "& .MuiTypography-root": {
                                          fontSize: "13px",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                          paddingRight: "10px",
                                        },
                                      }}
                                      primary={option}
                                    />
                                  </MenuItem>
                                ))}
                              </Select>
                              {icon2 && <FilterAltTwoToneIcon />}
                            </Stack>
                          </FormControl>
                        </div>
                      </TableCell>
                      {/* )} */}
                      {/* {heading5 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {/* <Stack direction="row" alignItems="center" >
                        <div
                          aria-controls={openserviceGrade ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceGrade ? "true" : undefined}
                          onClick={handleClickserviceGrade}
                        >
                          <Stack direction="row" alignItems="center">
                            Grade
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                          anchorEl={anchorElnewserviceGrade}
                          open={openserviceGrade}
                          onClose={handleCloseserviceGrade}

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
                            onClick={handleTargetserviceGrade}
                          >None
                          </MenuItem>

                          {gradesArray.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceGrade}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon2 && <FilterAltTwoToneIcon />}
                      </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Grade</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
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
                                    sx={{
                                      padding: "0px",
                                      fontSize: "14px",
                                      paddingLeft: "37px",
                                      fontFamily: "Arial",
                                      color: "#333333"
                                    }}
                                  >
                                  
                                    <ListItemText
                                      primaryTypographyProps={{ fontSize: "14px", fontFamily: "Arial", color: "#333333" }}
                                      primary="None" />
                                  </MenuItem>

                                  {gradesArray?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: "#333333"
                                        }}
                                     
                                        key={name}
                                        value={name}
                                      >
                                        <Checkbox
                                          style={{ padding: "3px", paddingLeft: "12px" }}

                                          size="small"
                                          checked={GradeFilter.indexOf(name) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px", fontFamily: "Arial", color: "#333333" }}
                                          primary={name} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                                {icon3 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl> */}
                        <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                          <Stack direction="row">
                            <span>Grade</span>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              size="small"
                              sx={{
                                width: "25px",
                                fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color: "#3e8cb5 !important",
                                },
                              }}
                              disableUnderline
                              variant="standard"
                              MenuProps={MenuProps}
                              multiple
                              value={GradesFilter}
                              onChange={handleChangeSelectSection}
                              renderValue={(selected) => selected.join(", ")}
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
                                  root: isAllGradesFilter
                                    ? classes.selectedAll
                                    : "",
                                }}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    size="small"
                                    style={{
                                      padding: "0px",
                                      paddingLeft: "14px",
                                      height: "0px",
                                    }}
                                    classes={{
                                      indeterminate: classes.indeterminateColor,
                                    }}
                                    checked={isAllGradesFilter}
                                    indeterminate={
                                      GradesFilter?.length > 0 &&
                                      GradesFilter?.length < gradesArray?.length
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "14px !important",
                                      },
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{
                                    "& .MuiTypography-root": {
                                      fontSize: "13px",
                                      fontFamily: "Arial",
                                      color: "#333333",
                                      paddingRight: "10px",
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
                                      size="small"
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "14px",
                                        height: "0px",
                                      }}
                                      checked={
                                        GradesFilter.indexOf(option) > -1
                                      }
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: "14px !important",
                                        },
                                      }}
                                    />
                                  </ListItemIcon>

                                  <ListItemText
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "13px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        paddingRight: "10px",
                                      },
                                    }}
                                    primary={option}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                            {icon3 && <FilterAltTwoToneIcon />}
                          </Stack>
                        </FormControl>
                      </TableCell>
                      {/* )} */}

                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openProbationStatusVal ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openProbationStatusVal ? "true" : undefined
                            }
                            onClick={handleClickProbationStatus}
                          >
                            <Stack direction="row" alignItems="center">
                              Probation<br></br> Status
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            sx={{
                              height: "200px",
                              // width: "290px"
                            }}
                            anchorEl={ProbationStatusVal}
                            open={openProbationStatusVal}
                            onClose={handleCloseProbationStatus}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "5px 15px 0px 15px",
                                //padding: "0px 10px 2px 17px", 
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetProbationStatus}
                            >
                              Clear Filter
                            </MenuItem>
                            {users
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.probation_status - b.probation_status;
                              })
                              ?.filter((j: any) => {
                                return (
                                  j?.isCEORole === false &&
                                  j?.isExcluded === false &&
                                  j?.isLeavers === false
                                );
                              })
                              ?.filter(
                                (item: any, index: any, array: any) =>
                                  array
                                    ?.map((data: any) => {
                                      return data?.probation_status;
                                    })
                                    .indexOf(item?.probation_status) === index
                              )

                              ?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    padding: "5px 15px 0px 15px",
                                    //padding: "0px 10px 2px 17px",
                                    justifyContent: "left",
                                    backgroundColor:
                                      ProbationStatus === name?.probation_status
                                        ? "#EAECED"
                                        : "",

                                    //height:"200px"
                                  }}
                                  key={name?.probation_status}
                                  value={name?.probation_status}
                                  //name={name.legal_full_name}
                                  onClick={handleTargetProbationStatus}
                                >
                                  {name?.probation_status}
                                </MenuItem>
                              ))}
                            {/* probation_status */}
                            {/* <MenuItem
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",                              
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="Confirmed"
                          value="Confirmed"
                          onClick={handleTargetProbationStatus}
                        >
                          Confirmed
                        </MenuItem>
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",                             
                             //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="In probation"
                          value="In probation"
                          onClick={handleTargetProbationStatus}
                        >In probation
                        </MenuItem> */}
                          </Menu>
                          {icon20 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </TableCell>
                      {/* {headingSN && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack direction="row" alignItems="center">
                          <div
                            aria-controls={
                              openSupervisoryRole ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openSupervisoryRole ? "true" : undefined
                            }
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
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
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
                            anchorEl={anchorElnewSupervisoryRole}
                            open={openSupervisoryRole}
                            onClose={handleCloseSupervisoryRole}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                // justifyContent: "left",
                                // width: "100px"
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetSupervisoryRole}
                            >
                              Clear Filter
                            </MenuItem>

                            {sNSvalues.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  // paddingLeft: "15px",
                                  // justifyContent: "left",
                                  // width: "100px"
                                  //height:"200px"
                                  backgroundColor:
                                    sNS === name?.name ? "#EAECED" : "",
                                }}
                                key={name?.name}
                                value={name?.name}
                                onClick={handleTargetSupervisoryRole}
                              >
                                {name?.name}
                              </MenuItem>
                            ))}
                          </Menu>
                          {icon9 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </TableCell>
                      {/* )} */}
                      {/* {heading19 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openSupervisoryRole ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openSupervisoryRole ? "true" : undefined
                            }
                            onClick={handleClickFunction}
                          >
                            <Stack direction="row" alignItems="center">
                              Function
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            sx={{
                              height: "200px",
                              // width: "160px"
                            }}
                            anchorEl={anchorElnewFunction}
                            open={openFunction}
                            onClose={handleCloseFunction}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                // justifyContent: "left",
                                // width: "110px"
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetFunction}
                            >
                              Clear Filter
                            </MenuItem>
                            {users
                              ?.slice()
                              ?.sort(function (a: any, b: any) {
                                return a?.function - b?.function;
                              })
                              ?.filter((j: any) => {
                                return (
                                  j?.isCEORole === false &&
                                  j?.isExcluded === false &&
                                  j?.isLeavers === false
                                );
                              })
                              ?.filter(
                                (item: any, index: any, array: any) =>
                                  array
                                    ?.map((data: any) => {
                                      return data?.function;
                                    })
                                    .indexOf(item?.function) === index
                              )
                              ?.map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    padding: "0px 10px 2px 17px",
                                    backgroundColor:
                                      empFunction === name?.function
                                        ? "#EAECED"
                                        : "",

                                    //height:"200px"
                                  }}
                                  key={name?.function}
                                  value={name?.function}
                                  //name={name.legal_full_name}
                                  onClick={handleTargetFunction}
                                >
                                  {name?.function}
                                </MenuItem>
                              ))}
                          </Menu>
                          {icon6 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </TableCell>
                      {/* )} */}
                      {/* {heading4 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}
                    >
                       <Stack direction="row" alignItems="center" >
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
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                                    justifyContent:"left"
                                    //height:"200px"
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
                   
                    </TableCell>
                  )}
                  */}

                      {/* {heading7 && (
                    <TableCell
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
                          aria-controls={openPositionCode  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openPositionCode  ? "true" : undefined}
                          onClick={handleClickPositionCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Position Code
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                    
                    </TableCell>
                  )} */}
                      {/* {heading8 && (
                    <TableCell
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
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                         
                           {divisionArray.map((name: any) => (
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
                        </Stack>
                  
                    </TableCell>
                  )} */}
                      {/* {heading9 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >

                    </TableCell>
                  )} */}
                      {/* {heading10 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {/* <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Section </span>
                       
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
                            {subSectionArray.map((name: any) => (
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
                          {icon10 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                        <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                          <Stack direction="row">
                            <span>Section</span>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              size="small"
                              sx={{
                                width: "25px",
                                fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color: "#3e8cb5 !important",
                                },
                              }}
                              disableUnderline
                              variant="standard"
                              MenuProps={MenuProps}
                              multiple
                              value={sectionsFilter}
                              onChange={handleChangeSelectsections}
                              renderValue={(selected) => selected.join(", ")}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  padding: "0px", //paddingLeft: "37px",
                                }}
                                key="all"
                                value="all"
                                classes={{
                                  root: isAllsectionFilter
                                    ? classes.selectedAll
                                    : "",
                                }}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    size="small"
                                    style={{
                                      padding: "0px",
                                      paddingLeft: "14px",
                                      height: "0px",
                                    }}
                                    classes={{
                                      indeterminate: classes.indeterminateColor,
                                    }}
                                    checked={isAllsectionFilter}
                                    indeterminate={
                                      sectionsFilter?.length > 0 &&
                                      sectionsFilter?.length <
                                        sectionArray?.length
                                    }
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "14px !important",
                                      },
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{
                                    "& .MuiTypography-root": {
                                      fontSize: "13px",
                                      fontFamily: "Arial",
                                      color: "#333333",
                                      paddingRight: "10px",
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
                                    fontSize: "13px",
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
                                      style={{
                                        padding: "0px",
                                        paddingLeft: "14px",
                                        height: "0px",
                                      }}
                                      checked={
                                        sectionsFilter.indexOf(option) > -1
                                      }
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: "14px !important",
                                        },
                                      }}
                                    />
                                  </ListItemIcon>

                                  <ListItemText
                                    sx={{
                                      "& .MuiTypography-root": {
                                        fontSize: "13px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        paddingRight: "10px",
                                      },
                                    }}
                                    primary={option}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                            {icon10 && <FilterAltTwoToneIcon />}
                          </Stack>
                        </FormControl>
                      </TableCell>
                      {/* )} */}
                      {/* {heading11 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openSubManagerCode ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openSubManagerCode ? "true" : undefined
                            }
                            onClick={handleClickManagerCode}
                          >
                            <Stack direction="row" alignItems="center">
                              Apprasier Name
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
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
                            anchorEl={anchorElnewManagerCode}
                            open={openSubManagerCode}
                            onClose={handleClosManagerCode}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                // justifyContent: "left",
                                // width: "100px"
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetManagerCode}
                            >
                              Clear Filter
                            </MenuItem>

                            {managerCodeArray
                            ?.slice()
                            ?.sort(function (a: any, b: any) {
                              return a?.appraiser_name?.localeCompare(
                                b?.appraiser_name
                              );
                            }).map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor:
                                    empManagerCode === name ? "#EAECED" : "",
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
                        </Stack>
                      </TableCell>
                      {/* )} */}
                      {/* {heading12 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openSubManagerName ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openSubManagerName ? "true" : undefined
                            }
                            onClick={handleClickManagerName}
                          >
                            <Stack direction="row" alignItems="center">
                              Reviewer Name
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            sx={{
                              height: "200px",
                              // width: "290px"
                            }}
                            anchorEl={anchorElnewManagerName}
                            open={openSubManagerName}
                            onClose={handleClosManagerName}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetManagerName}
                            >
                              Clear Filter
                            </MenuItem>

                            {managerNameArray
                            ?.slice()
                            ?.sort(function (a: any, b: any) {
                              return a?.reviewer_name?.localeCompare(
                                b?.reviewer_name
                              );
                            }).map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor:
                                    empManagerName === name ? "#EAECED" : "",
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
                        </Stack>
                      </TableCell>
                      {/* )} */}
                      {/* {heading13 && ( */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openSubManagerPosition ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openSubManagerPosition ? "true" : undefined
                            }
                            onClick={handleClickManagerPosition}
                          >
                            <Stack direction="row" alignItems="center">
                              HR Normalizer Name
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            sx={{
                              height: "200px",
                              // width: "240px"
                            }}
                            anchorEl={anchorElnewManagerPosition}
                            open={openSubManagerPosition}
                            onClose={handleClosManagerPosition}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetManagerPosition}
                            >
                              Clear Filter
                            </MenuItem>

                            {managerPositionArray
                            ?.slice()
                          ?.sort(function (a: any, b: any) {
                            return a?.normalizer_name?.localeCompare(
                              b?.normalizer_name
                            );
                          }).map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor:
                                    empManagerPosition === name
                                      ? "#EAECED"
                                      : "",
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
                        </Stack>
                      </TableCell>
                      {/* )} */}
                      {/* <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <div
                            aria-controls={
                              openMappedStatusVal ? "fade-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openMappedStatusVal ? "true" : undefined
                            }
                            onClick={handleClickmappedStatus}
                          >
                            <Stack direction="row" alignItems="center">
                              Employee Mapped<br></br> Status
                              <ArrowDropDownOutlinedIcon
                                style={{ cursor: "pointer" }}
                              />
                            </Stack>
                          </div>
                          <Menu
                            MenuListProps={{
                              "aria-labelledby": "fade-button",
                            }}
                            sx={{
                              height: "200px",
                              // width: "490px"
                            }}
                            anchorEl={mappedStatusVal}
                            open={openMappedStatusVal}
                            onClose={handleClosemappedStatus}
                          >
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="None"
                              value="None"
                              onClick={handleTargetmappedStatus}
                            >
                              Clear Filter
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="mapped"
                              value="mapped"
                              onClick={handleTargetmappedStatus}
                            >
                              Mapped
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", //paddingLeft: "15px",
                                //height:"200px"
                              }}
                              key="unmapped"
                              value="unmapped"
                              onClick={handleTargetmappedStatus}
                            >
                              Unmapped
                            </MenuItem>
                          </Menu>
                          {icon16 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </TableCell> */}
                    </TableRow>
                  </TableHead>

                  {tableDataFilterdLength?.length > 0 ? (
                    <TableBody>
                      {data != undefined &&
                        // (rowsPerPage > 0
                        //   ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        //   : data.data
                        // )
                        users
                          ?.filter((j: any) => {
                            console.log(j, "jjjjjjjjjjjjjjjjjjjjjjjj");
                            return (
                              j.employee_upload_flag &&
                              j?.isCEORole === false &&
                              j?.isExcluded === false &&
                              j?.isLeavers === false
                            );
                          })
                          ?.filter((j: any) => {
                            if (
                              ProbationStatus === "None" ||
                              ProbationStatus === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.probation_status?.toLocaleLowerCase() ===
                                ProbationStatus?.toLocaleLowerCase()
                              );
                              //.includes(positions.toLocaleLowerCase());
                              // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
                            }
                          })
                          // ProbationStatus
                          .filter((item1: any) => {
                            if (
                              positionFilter.includes("None") ||
                              positionFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!positionFilter?.find(
                                (item2: any) =>
                                  item1?.position_long_description === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              GradeFilter.includes("None") ||
                              GradeFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!GradeFilter?.find(
                                (item2: any) => item1?.grade === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              GradesFilter.includes("None") ||
                              GradesFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!GradesFilter?.find(
                                (item2: any) => item1?.grade === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              positionsFilter.includes("None") ||
                              positionsFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!positionsFilter?.find(
                                (item2: any) =>
                                  item1?.position_long_description === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              sectionsFilter.includes("None") ||
                              sectionsFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!sectionsFilter?.find(
                                (item2: any) => item1?.section === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              appNameFilter.includes("None") ||
                              appNameFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!appNameFilter?.find(
                                (item2: any) => item1?.appraiser_name === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              revNameFilter.includes("None") ||
                              revNameFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!revNameFilter?.find(
                                (item2: any) => item1?.reviewer_name === item2
                              );
                            }
                          })
                          .filter((item1: any) => {
                            if (
                              norNameFilter.includes("None") ||
                              norNameFilter.length === 0
                            ) {
                              return item1;
                            } else {
                              return !!norNameFilter?.find(
                                (item2: any) => item1?.normalizer_name === item2
                              );
                            }
                          })
                          ?.filter((j: any) => {
                            if (
                              empEmployeeCode === "None" ||
                              empEmployeeCode === "" ||
                              empEmployeeCode === "0"
                            ) {
                              return j;
                            } else {
                              return (
                                j?.employee_code?.toLocaleLowerCase() ===
                                empEmployeeCode?.toLocaleLowerCase()
                              );

                              // .includes(empEmployeeCode?.toLocaleLowerCase());
                            }
                          })
                          ?.filter((j: any) => {
                            if (empgrades === "None" || empgrades === "") {
                              return j;
                            } else {
                              return (
                                j?.grade?.toLocaleLowerCase() ===
                                empgrades?.toLocaleLowerCase()
                              );
                              //.includes(empgrades.toLocaleLowerCase());
                            }
                          })
                          ?.filter((j: any) => {
                            if (
                              empdivisions === "None" ||
                              empdivisions === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.division?.toLocaleLowerCase() ===
                                empdivisions?.toLocaleLowerCase()
                              );
                              //.includes(empdivisions.toLocaleLowerCase());
                            }
                          })
                          ?.filter((j: any) => {
                            if (empFullName === "None" || empFullName === "") {
                              return j;
                            } else {
                              return (
                                j?.legal_full_name?.toLocaleLowerCase() ===
                                empFullName?.toLocaleLowerCase()
                              );
                              //?.includes(empFullName?.toLocaleLowerCase());
                            }
                          })
                          ?.filter((j: any) => {
                            if (
                              empFirstName === "None" ||
                              empFirstName === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.first_name?.toLocaleLowerCase() ===
                                empFirstName?.toLocaleLowerCase()
                              );
                              //?.includes(empFirstName?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empFunction === "None" || empFunction === "") {
                              return j;
                            } else {
                              return (
                                j.function.toLocaleLowerCase() ===
                                empFunction?.toLocaleLowerCase()
                              );
                            }
                          })
                          ?.filter((j: any) => {
                            if (
                              empPositionCode === "None" ||
                              empPositionCode === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.position_code?.toLocaleLowerCase() ===
                                empPositionCode?.toLocaleLowerCase()
                              );
                              //?.includes(empPositionCode?.toLocaleLowerCase());
                            }
                          })

                          ?.filter((j: any) => {
                            if (empService === "None" || empService === "") {
                              return j;
                            } else {
                              return (
                                j?.service_reference_date?.toLocaleLowerCase() ===
                                empService?.toLocaleLowerCase()
                              );
                              //.includes(empService.toLocaleLowerCase());
                            }
                          })
                          // .filter((j: any) => {
                          //   if (empSubSection === "None" || empSubSection === "") {
                          //     return j;
                          //   } else {
                          //     return j.Service
                          //       .toLocaleLowerCase()
                          //       .includes(empSubSection.toLocaleLowerCase());
                          //   }
                          // })
                          ?.filter((j: any) => {
                            //console.log(j.isSupervisor, "superv");
                            if (sNS === "None" || sNS === "") {
                              return j;
                            }
                            if (sNS === "SP") {
                              return j?.isSupervisor === true;
                            } else if (sNS === "N-SP") {
                              // return j?.isSupervisor === undefined;
                              return j?.isSupervisor !== true;
                            }
                            // {emp.isSupervisor == true ? "SP" : "N-SP"}
                          })
                          ?.filter((j: any) => {
                            if (
                              empSubSection === "None" ||
                              empSubSection === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j["sub section"]?.toLocaleLowerCase() ===
                                empSubSection?.toLocaleLowerCase()
                              );
                              //.includes(empSubSection.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empGradeset === "None" || empGradeset === "") {
                              return j;
                            } else {
                              return (
                                j?.grade_set?.toLocaleLowerCase() ===
                                empGradeset?.toLocaleLowerCase()
                              );
                              //?.includes(empGradeset?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empManagerCode === "None" ||
                              empManagerCode === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.appraiser_name?.toLocaleLowerCase() ===
                                empManagerCode?.toLocaleLowerCase()
                              );
                              //?.includes(empManagerCode?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empManagerPosition === "None" ||
                              empManagerPosition === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.normalizer_name?.toLocaleLowerCase() ===
                                empManagerPosition?.toLocaleLowerCase()
                              );
                              //?.includes(empManagerPosition?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empManagerName === "None" ||
                              empManagerName === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.reviewer_name?.toLocaleLowerCase() ===
                                empManagerName?.toLocaleLowerCase()
                              );
                              //?.includes(empManagerName?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empjobtitle === "None" || empjobtitle === "") {
                              return j;
                            } else {
                              return (
                                j?.job_title?.toLocaleLowerCase() ===
                                empjobtitle?.toLocaleLowerCase()
                              );
                              //?.includes(empjobtitle?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empJobcode === "None" || empJobcode === "") {
                              return j;
                            } else {
                              return (
                                j?.job_code?.toLocaleLowerCase() ===
                                empJobcode?.toLocaleLowerCase()
                              );
                              //?.includes(empJobcode?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empjoblevel === "None" || empjoblevel === "") {
                              return j;
                            } else {
                              return (
                                j?.job_level?.toLocaleLowerCase() ===
                                empjoblevel?.toLocaleLowerCase()
                              );
                              //?.includes(empjoblevel?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empWorkLocation === "None" ||
                              empWorkLocation === ""
                            ) {
                              return j;
                            } else {
                              return (
                                j?.work_location?.toLocaleLowerCase() ===
                                empWorkLocation?.toLocaleLowerCase()
                              );
                              //?.includes(empWorkLocation?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empsections === "None" || empsections === "") {
                              return j;
                            } else {
                              return (
                                j.section.toLocaleLowerCase() ===
                                empsections?.toLocaleLowerCase()
                              );
                              //.includes(empsections.toLocaleLowerCase());
                            }
                          })
                          // .filter((j: any) => {
                          //   if (mappedStatus === "None" || mappedStatus === "") {
                          //     return j;
                          //   } else {
                          //     return j.isMapped ? "Mapped" : "Unmapped"
                          //       .toLocaleLowerCase() === mappedStatus?.toLocaleLowerCase();
                          //     //.includes(empsections.toLocaleLowerCase());

                          //   }
                          // })
                          .filter((j: any) => {
                            if (
                              mappedStatus === "None" ||
                              mappedStatus === ""
                            ) {
                              return j;
                            } else {
                              return (
                                (j.isMapped
                                  ? "Mapped"
                                  : "Unmapped"
                                ).toLocaleLowerCase() ===
                                mappedStatus?.toLocaleLowerCase()
                              );
                            }
                          })
                          .filter((j: any) => {
                            if (searchName === "") {
                              return j;
                            } else if (
                              (j.employee_code !== undefined &&
                                j.employee_code
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.legal_full_name !== undefined &&
                                j.legal_full_name
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.first_name !== undefined &&
                                j.first_name
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.section !== undefined &&
                                j.section
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.position_long_description !== undefined &&
                                j.position_long_description
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.appraiser_name !== undefined &&
                                j.appraiser_name
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.probation_status !== undefined &&
                                j.probation_status
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.reviewer_name !== undefined &&
                                j.reviewer_name
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.function !== undefined &&
                                j.function
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.normalizer_name !== undefined &&
                                j.normalizer_name
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                              (j.grade !== undefined &&
                                j.grade
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase()))
                            ) {
                              return j;
                            } else if (searchName !== "") {
                              if (searchName == "SP") {
                                return j?.isSupervisor == true;
                              } else if (searchName == "N-SP") {
                                return j?.isSupervisor != true;
                              }
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          //  (rowsPerPage > 0
                          //    ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          //    : data.data
                          //  )
                          .map((emp: any, index: number) => (
                            <TableRow
                              key={index}
                              sx={{
                                "& td, & th": {
                                  // whiteSpace: "nowrap",
                                  // border: 1,
                                  // borderColor: "#e0e0e0",
                                },
                              }}
                            >
                              {checkedSwitch === false && (
                                <TableCell width="0.5%" align="center">
                                  <input
                                    name={emp._id}
                                    type="checkbox"
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                    }}
                                    checked={emp?.isSelected}
                                    onChange={handleOnCheck}
                                    //optdivision?.length > 0 && divisionFilter?.length === users?.length;
                                  />
                                </TableCell>
                              )}

                              <TableCell
                                align="center"
                                // width={250}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  // paddingRight: "40px"
                                }}
                              >
                                {emp.employee_code}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={250}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                style={{ minWidth: 280 }}
                              >
                                {emp.legal_full_name}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={250}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                // style={{ minWidth: 280 }}
                              >
                                {emp.first_name}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={200}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                style={{ minWidth: 250 }}
                              >
                                {emp.position_long_description}
                              </TableCell>

                              <TableCell
                                align="center"
                                // width={150}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                  paddingRight: "50px",
                                }}
                              >
                                {emp.grade}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={150}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                  paddingRight: "40px",
                                }}
                              >
                                {emp?.probation_status}
                              </TableCell>

                              <TableCell
                                align="center"
                                // width={250}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                  paddingRight: "40px",
                                }}
                              >
                                {emp.isSupervisor == true ? "SP" : "N-SP"}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={250}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                }}
                              >
                                {emp?.function}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={200}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                }}
                              >
                                {emp.section}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={130}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                  paddingRight: "30px",
                                }}
                              >
                                {emp.appraiser_name}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={130}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                }}
                              >
                                {emp.reviewer_name}
                              </TableCell>

                              <TableCell
                                align="left"
                                // width={150}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                }}
                              >
                                {emp.normalizer_name}
                              </TableCell>

                              {/* <TableCell
                                align="center"
                                // width={150}
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  whiteSpace: "nowrap",
                                  fontFamily: "Arial",
                                  paddingRight: "40px",
                                }}
                              >                                
                                {emp?.isMapped ? "Mapped" : "Unmapped"}
                              </TableCell> */}
                            </TableRow>
                          ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          align="center"
                          style={{
                            fontWeight: "bold",
                            border: "none",
                            color: "#808080",
                            fontSize: "18px",
                            fontFamily: "arial",
                            display: "flex",
                            width: "max-content",
                          }}
                        >
                          No data to display
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </CustomScrollbar>
            </Scroll>
          )}
          {tableDataLength?.length > 0 &&
            tableDataFilterdLength?.length > 0 && (
              <TablePagination
                sx={{
                  "& .MuiTablePagination-selectLabel": {
                    fontFamily: "Arial",
                    fontSize: "14px",
                    color: "#333333",
                  },
                }}
                rowsPerPageOptions={[5, 10, 20, 50]}
                component="div"
                count={page1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          {tableDataLength?.length === 0 && (
            <div
              style={{
                fontFamily: "Arial",
                fontSize: "18px",
                fontWeight: "500",
                color: "#808080",
                // display: "flex",
                // justifyContent: "center",
                 paddingTop: "30px"
              }}
            >
              No data to display
            </div>
          )}
          {tableDataLength?.length > 0 &&
            tableDataFilterdLength?.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Tooltip title={checkedSwitch1Msg} arrow placement="bottom">
                  <div>
                    <StyledButton
                      className={classes.button}
                      disabled={checkedSwitch1}
                      variant="outlined"
                      onClick={() => {
                        onSubmitExclusion({
                          position: checkboxIdHandlerExcluded(
                            checkboxHandlerExcluded(tableDataFilterdLength)
                          ),
                        });
                      }}
                    >
                      Add to Exclusions
                    </StyledButton>
                  </div>
                </Tooltip>
                <Tooltip title={checkedSwitch2Msg} arrow placement="bottom">
                  <div>
                    <StyledButton
                      className={classes.button}
                      disabled={checkedSwitch2}
                      variant="outlined"
                      onClick={() => {
                        onSubmitRoleExceptions({
                          position: checkboxIdHandler(
                            checkboxHandler(tableDataFilterdLength)
                          ),
                        });
                      }}
                    >
                      Add to Role Exceptions
                    </StyledButton>
                  </div>
                </Tooltip>
                <Tooltip title={checkedSwitch1Msg} arrow placement="bottom">
                  <div>
                    <StyledButton
                      className={classes.button}
                      disabled={checkedSwitch1}
                      variant="outlined"
                      onClick={() => {
                        onSubmitGradeException({
                          position: checkboxIdHandlerGrade(
                            checkboxHandlerGrade(tableDataFilterdLength)
                          ),
                        });
                      }}
                    >
                      Add to Grade Exceptions
                    </StyledButton>
                  </div>
                </Tooltip>
                <Tooltip title={checkedSwitch1Msg} arrow placement="bottom">
                  <div>
                    <StyledButton
                      className={classes.button}
                      disabled={checkedSwitch1}
                      variant="outlined"
                      onClick={() => {
                        onSubmitCEORole({
                          position: checkboxIdHandlerCEO(
                            checkboxHandlerCEO(tableDataFilterdLength)
                          ),
                        });
                      }}
                    >
                      Add to C-Level
                    </StyledButton>
                  </div>
                </Tooltip>
                <Tooltip title={checkedSwitch2Msg} arrow placement="bottom">
                  <div>
                    <StyledButton
                      className={classes.button}
                      disabled={checkedSwitch2}
                      variant="outlined"
                      onClick={() => {
                        onSubmitLeavers({
                          position: checkboxIdHandlerLeavers(
                            checkboxHandlerLeavers(tableDataFilterdLength)
                          ),
                        });
                      }}
                    >
                      Add to Leavers
                    </StyledButton>
                  </div>
                </Tooltip>
              </Stack>
            )}
        </>
      )}
      <AlertDialogSuccess
        isAlertOpen={LaunchValDialog}
        handleAlertClose={handleLaunchValDialog}
      >
        {LaunchValDialogMSG}
      </AlertDialogSuccess>
      <AlertDialogSuccess
        isAlertOpen={confirmEmployeeMasDialog}
        handleAlertClose={confirmationAlertDialogClose}
      >
        Please confirm the employee list to initiate the change.
      </AlertDialogSuccess>
      {/* to show alert when clicked on confirm employee master */}
      <AlertDialogSuccess
        isAlertOpen={confirmAlert}
        handleAlertClose={handleConfirmAlert}
      >
        {message}
      </AlertDialogSuccess>

      {/* to show alert when clicked on clear employee master */}

      <AlertDialogSuccess
        isAlertOpen={clearedEmployeeAlert}
        handleAlertClose={handleClearEmployeeAlert}
      >
        {message}
      </AlertDialogSuccess>

      {/* AlertYesNo */}
      <AlertYesNo
        isAlertOpen={LaunchValDialogYes}
        handleAlertYes={handleLaunchValSelectYesDialog}
        handleAlertClose={handleLaunchValYesorNoDialog}
      >
        {LaunchValDialogMSG}
      </AlertYesNo>
      <AlertYesNo
        isAlertOpen={clearingEmpDialogYes}
        handleAlertYes={handleClearEmployeeMaster}
        handleAlertClose={() => {
          setclearingEmpDialogYes(false);
        }}
      >
        Are you sure wish to clear employee master?
      </AlertYesNo>
      {hideErrors && (
        <DisplayingErrors
          from="employeeMasterConfirmation"
          setHideErrors={setHideErrors}
          errorsList={errorsList}
          setErrorsList={setErrorsList}
        />
      )}
    </>
  );
}
