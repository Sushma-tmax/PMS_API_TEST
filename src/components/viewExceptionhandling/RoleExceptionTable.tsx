import React, { useEffect, useState, useRef, useMemo,useCallback, useContext } from "react";
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
// import Newexcel from "../../../assets/Images/Newexcel.svg"
import Newexcel from "../../assets/Images/Newexcel.svg"
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import {TextField,InputAdornment} from "@mui/material";
import Searchicon from "../../assets/Images/Searchicon.svg";
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
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/system";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
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
  useAcceptEmployeeNamesChangeMutation,
  useUpdateEmployeeAppraisalMutation,
  useRemovesMultipleEmployeeFromRoleExceptionMutation
 } from "../../service";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Scrollbar from "react-scrollbars-custom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import { ADD_EMPLOYEE } from "../../constants/routes/Routing";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AlertDialogSuccess from "../UI/DialogSuccess";
import ListItemText from '@mui/material/ListItemText';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

const Searchfeild = styled("div")({
  
  marginTop: "8px",
  marginBottom:"8px",
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

 //prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
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
});

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
export default function RoleExceptionTable(props:any) {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);
  const [navPromptTrigger, setnavPromptTrigger] = React.useState(false);
  console.log(navPrompt,navPromptTrigger, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.", 
  formIsDirty);
  //prompt ------functions
  const classes = useStyles();
  const {values,checkedSwitch, setCheckedSwitch, employeeList} = props;
  const [count, setCount] = React.useState(650);
  const [searchNameForTabs, setsearchNameForTabs] = React.useState("");
  const navigate = useNavigate();
  const CustomScrollbar = Scrollbar as any;

  const [employeeUpdate] = useUpdateEmployeeAppraisalMutation();
  //const { data } = useGetEmployeeQuery("all");
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,first_name,
  appraiser_name,section,normalizer_name,reviewer_name,isRoleException,master_appraiser_code,probation_status,
  master_appraiser_name,master_reviewer_code,master_reviewer_name,master_normalizer_code,master_normalizer_name,
  isSupervisor,section,sub section,overall_rating,isSelected,division,manager_position,work_location,appraiser_code,reviewer_code,normalizer_code`
  const { data } = useGetEmployeeByFilterQuery(
    `?limit=700&select=${SELECT_FOR_DASHBOARD}`
  );
  const[removeFromRoleexception] = useRemovesMultipleEmployeeFromRoleExceptionMutation();
 console.log(data, "ghg");
  // if (data != undefined)
  // setCount(data.data.length)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //for clearing search & mapping again
  const [users, setUsers] = React.useState<any>([]);
  const [usersSelected, setUsersSelected] = React.useState<any>(0);
  const ClearingSearch =React.useMemo(() => {
    setsearchNameForTabs('');
    if (employeeList) {
      setUsers(employeeList?.employees);
    }
  },[employeeList])
 // for clearing search & mapping again

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



  //for appraiser ,reiewer and normalizer name options
  const appraiserNames = Array.from(new Set(data?.data?.filter((j: any) => {
    return  j?.isRoleException === true
  })?.map((i:any) => i?.appraiser_name )))
  .sort((a: any, b: any) => a?.localeCompare(b))
  .filter((i:any) =>{
    return i != undefined
  })
  const ReviewerNames =  Array.from(new Set(data?.data?.filter((j: any) => {
    return  j?.isRoleException === true
  })?.map((i:any) => i?.reviewer_name)))
 ?.sort((a: any, b: any) => a?.localeCompare(b))
 ?.filter((i:any) =>{
  return i != undefined
})
const NormalizerNames =  Array.from(new Set(data?.data?.filter((j: any) => {
  return  j?.isRoleException === true
})?.map((i:any) => i?.normalizer_name)))
?.sort((a: any, b: any) => a?.localeCompare(b))
?.filter((i:any) =>{
  return i != undefined
})
console.log(appraiserNames,ReviewerNames,NormalizerNames,"NormalizerNames")
//appraiser Filter
const [AppName, setAppName] = React.useState("");
const [anchorElnewserviceAppName, setAnchorElnewserviceAppName] = React.useState<null | HTMLElement>(
  null
);
const openserviceAppName = Boolean(anchorElnewserviceAppName);
const handleClickserviceAppName= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewserviceAppName(event.currentTarget);
};
const handleCloseserviceAppName = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewserviceAppName(null);
};
const handleTargetserviceAppName = (event: any) => {
 
  setAppName(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewserviceAppName(null);
  setPage(0);
};
//appraiser Filter

//Probation status 
 const [ProbationStatus, setProbationStatus] = React.useState("");
 const [ProbationStatusVal, setProbationStatusVal] = React.useState<null | HTMLElement>(
  null
);
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
};
//Probation status 
//reviewer Filter
const [RevName, setRevName] = React.useState("");
const [anchorElnewserviceRevName, setAnchorElnewserviceRevName] = React.useState<null | HTMLElement>(
  null
);
const openserviceRevName = Boolean(anchorElnewserviceRevName);
const handleClickserviceRevName= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewserviceRevName(event.currentTarget);
};
const handleCloseserviceRevName = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewserviceRevName(null);
};
const handleTargetserviceRevName = (event: any) => {
 
  setRevName(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewserviceRevName(null);
  setPage(0);
};
//reviewer Filter
//Normalizer filter
const [norName, setNorName] = React.useState("");
const [anchorElnewserviceNorName, setAnchorElnewserviceNorName] = React.useState<null | HTMLElement>(
  null
);
const openserviceNorName = Boolean(anchorElnewserviceNorName);
const handleClickserviceNorName= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewserviceNorName(event.currentTarget);
};
const handleCloseserviceNorName = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewserviceNorName(null);
};
const handleTargetserviceNorName = (event: any) => {
 
  setNorName(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewserviceNorName(null);
  setPage(0);
};
//Normalizer filter
//for appraiser ,reiewer and normalizer name options
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

  const sNSvalues = ["SP", "N-SP"];

  const [columnHeaders, setcolumnHeaders] = useState<any>({
    Ecode: true,
    Ename: true,
    Firstname:true,
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
    AppraiserCode:true,
    ReviewerCode:true,
    NormalizerCode:true,
    EmployeeMappedStatus:true,
    ProbationStatus:true,
    Employeeemail:true,
    SelectAll: true,
  })

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
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
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
  const [emailData, setemailData] = React.useState(true);
  const handleEmailData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemailData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [managerCodeChecked, setmanagerCodeChecked] = React.useState(true);
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmanagerCodeChecked(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [managerNameChecked, setmanagerNameChecked] = React.useState(true);
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setmanagerNameChecked(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
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
      Firstname:true,
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
      AppraiserCode:true,
      ReviewerCode:true,
      NormalizerCode:true,
      EmployeeMappedStatus:true,
      ProbationStatus:true,
      Employeeemail:true,
      SelectAll: true,
    })
  };
  const handleOpenGrade = () => {
    setOpenGrade(true);
  };

  //Supervisor NonSupervisor logic
  const [supervisorIDs, setSupervisorIDs] = React.useState<any[]>([]);


  React.useEffect(() => {
    const found = data?.data?.map((k: any) => k._id);
    // const found = data?.data?.filter((r:any) => dataCode.includes(r.employee_code)).map((k:any) => k._id)

    // console.log(found, "check");
  }, [data]);

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
    // handleClosenew(event);
    setPage(0);
  };

  //Legal Full Name
  const [anchorElnewFullName, setAnchorElnewFullName] = React.useState<null | HTMLElement>(
    null
  );
  const openFullName = Boolean(anchorElnewFullName);
  const handleClickFullName= (event: React.MouseEvent<HTMLElement>) => {
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
  const [anchorElnewFunction, setAnchorElnewFunction] = React.useState<null | HTMLElement>(
    null
  );
  const openFunction = Boolean(anchorElnewFunction);
  const handleClickFunction= (event: React.MouseEvent<HTMLElement>) => {
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
  const [anchorElnewFirstName, setAnchorElnewFirstName] = React.useState<null | HTMLElement>(
    null
  );
  const openFirstName = Boolean(anchorElnewFirstName);
  const handleClickFirstName= (event: React.MouseEvent<HTMLElement>) => {
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
  const [anchorElnewSupervisoryRole, setAnchorElnewSupervisoryRole] = React.useState<null | HTMLElement>(
    null
  );
  const openSupervisoryRole = Boolean(anchorElnewSupervisoryRole);
  const handleClickSupervisoryRole= (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewSupervisoryRole(event.currentTarget);
  };
  const handleCloseSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {
   
    setAnchorElnewSupervisoryRole(null);
  };
  const handleTargetSupervisoryRole = (event: any) => {
   
  
    setsNS(event?.target?.getAttribute("value"))
   
    handleCloseSupervisoryRole(event);
    setPage(0);
  };
  //Supervisory Role
   //serviceRefDate
   const [anchorElnewserviceRefDate, setAnchorElnewserviceRefDate] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceRefDate = Boolean(anchorElnewserviceRefDate);
  const handleClickserviceRefDate= (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRefDate(event.currentTarget);
  };
  const handleCloseserviceRefDate = (event: React.MouseEvent<HTMLElement>) => {
   
    setAnchorElnewserviceRefDate(null);
  };
  const handleTargetserviceRefDate = (event: any) => {
   
    setempService(event?.target?.getAttribute("value"));
   
   
    setAnchorElnewserviceRefDate(null);
  };
  //serviceRefDate


  
    //Grade
    const [anchorElnewserviceGrade, setAnchorElnewserviceGrade] = React.useState<null | HTMLElement>(
      null
    );
    const openserviceGrade = Boolean(anchorElnewserviceGrade);
    const handleClickserviceGrade= (event: React.MouseEvent<HTMLElement>) => {
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
    //Position
   const [anchorElnewservicePosition, setAnchorElnewservicePosition] = React.useState<null | HTMLElement>(
    null
  );
  const openservicePosition = Boolean(anchorElnewservicePosition);
  const handleClickservicePosition= (event: React.MouseEvent<HTMLElement>) => {
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
    //Position Code
    const [anchorElnewPositionCode, setAnchorElnewPositionCode] = React.useState<null | HTMLElement>(
      null
    );
    const openPositionCode = Boolean(anchorElnewPositionCode);
    const handleClickPositionCode= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickDivision= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickSection= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickSubSection= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickManagerCode= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickManagerName= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickManagerPosition= (event: React.MouseEvent<HTMLElement>) => {
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
    const handleClickWorkLocation= (event: React.MouseEvent<HTMLElement>) => {
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
      const handleClickGradeSet= (event: React.MouseEvent<HTMLElement>) => {
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
      const handleClickJobCode= (event: React.MouseEvent<HTMLElement>) => {
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
      const handleClickJobTitle= (event: React.MouseEvent<HTMLElement>) => {
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
      const handleClickJobLevel= (event: React.MouseEvent<HTMLElement>) => {
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
  // const [users, setUsers] = React.useState<any>([]);
  // React.useEffect(() => {
  //   console.log("useeffect run");
  //   if (data) {
  //     setUsers(data.data);
  //   }
  // }, [data]);
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

 //for alert
 const [LaunchValDialog, setLaunchValDialog] = useState(false);
 const [LaunchValDialogMSG, setLaunchValDialogMSG] = useState("");
 const handleLaunchValDialog = () => {
   setLaunchValDialog(false);
   setLaunchValDialogMSG("")
  };
  //foralert

   //All select section
const [GradesFilter, setSectionFilter] = React.useState<string[]>([]);
const isAllGradesFilter =
gradesArray?.length > 0 && GradesFilter?.length === gradesArray?.length;

const newsection = gradesArray?.length == GradesFilter?.length
const handleChangeSelectSection = (event: any) => {
const value = event.target.value;
if (value[value?.length - 1] === "all") {
  console.log((GradesFilter?.length === gradesArray?.length ? [] : "select all"),"newwwwww")
 
  setSectionFilter(GradesFilter?.length === gradesArray?.length ? [] : gradesArray);
  return;
 
}

setSectionFilter(value);
};

const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
const isAllpositionsFilter =
positionArray?.length > 0 && positionsFilter?.length === positionArray?.length;

//const newsection = positionArray?.length == positionsFilter?.length
const handleChangeSelectPositions = (event: any) => {
const value = event.target.value;
if (value[value?.length - 1] === "all") {
  console.log((positionsFilter?.length === positionArray?.length ? [] : "select all"),"newwwwww")
 
  setpositionsFilter(positionsFilter?.length === positionArray?.length ? [] : positionArray);
  return;
}
setpositionsFilter(value);
};

//for section filtr
const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
const isAllsectionFilter =
sectionArray?.length > 0 && sectionsFilter?.length === sectionArray?.length;
const handleChangeSelectsections = (event: any) => {
const value = event.target.value;
if (value[value?.length - 1] === "all") {
  console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"),"newwwwww")
  setsectionsFilter(sectionsFilter?.length === sectionArray?.length ? [] : sectionArray);
  return;
}
setsectionsFilter(value);
};

  React.useEffect(() => {
    const serviceRefDate = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.service_reference_date?.localeCompare(
          b?.service_reference_date
        );
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.service_reference_date;
      });
       console.log(users,"users")
      // console.log(serviceRefDate,"serviceRefDate")
    const serviceRefDateContents = serviceRefDate?.filter(
      (c: any, index: any) => {
        return (
          serviceRefDate.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setserviceRef(serviceRefDateContents);
    console.log(serviceRef,"serviceRef")
    let grades = users
      ?.slice()
      .sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.grade;
      });
      if (positionsFilter?.length > 0) {
        grades = users
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.grade - b?.grade;
          })
          ?.filter((j: any) => {
            return  j?.isRoleException === true
          })
          ?.filter((i: any) => {
            return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
          })
          ?.map((i: any) => {
            return i?.grade;
          });
      }
    const gradeContents = grades?.filter((c: any, index: any) => {
      return grades.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    console.log(gradeContents, "contents");
    const position = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(
          b?.position_long_description
        );
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.position_long_description;
      });
    const positionContents = position?.filter((c: any, index: any) => {
      return position.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArray(positionContents);
    console.log(positionContents, "contents");

    const positionCode = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_code?.localeCompare(b?.position_code);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.position_code;
      });
    const positionCodeContents = positionCode?.filter((c: any, index: any) => {
      return positionCode.indexOf(c) === index && c != null && c != undefined;
    });
    setpositioncodeArray(positionCodeContents);
    console.log(positionContents, "contents");

    const division = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.division;
      });
    const divisionContents = division?.filter((c: any, index: any) => {
      return division.indexOf(c) === index && c != null && c != undefined;
    });
    setdivisionArray(divisionContents);
    console.log(divisionContents, "contents");

    const section = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.section;
      });
    const sectionContents = section?.filter((c: any, index: any) => {
      return section.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
    console.log(sectionContents, "contents");

    const subSection = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.["sub section"]?.localeCompare(b?.["sub section"]);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i["sub section"];
      });
    const subSectionContents = subSection?.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArray(subSectionContents);
    console.log(subSectionContents, "contents");

    const managerCode = users
      ?.slice()
      .sort(function (a: any, b: any) {
        return a.manager_code - b.manager_code;
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode?.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    console.log(managerCodeContents, "contents");

    const managerName = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_name?.localeCompare(b?.manager_name);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.manager_name;
      });
    const managerNameContents = managerName?.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    console.log(managerNameContents, "contents");

    const managerPosition = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_position?.localeCompare(b?.manager_position);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.manager_position;
      });
    const managerPositionContents = managerPosition?.filter(
      (c: any, index: any) => {
        return (
          managerPosition.indexOf(c) === index && c != null && c != undefined
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
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.work_location;
      });
    const workLocationContents = workLocation?.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    console.log(workLocationContents, "contents");

    const gradeSet = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade_set?.localeCompare(b?.grade_set);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.grade_set;
      });
    const gradeSetContents = gradeSet?.filter((c: any, index: any) => {
      return gradeSet.indexOf(c) === index && c != null && c != undefined;
    });
    setgradeSetArray(gradeSetContents);
    console.log(workLocationContents, "contents");

    const jobCode = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_code?.localeCompare(b?.job_code);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.job_code;
      });
    const jobCodeContents = jobCode?.filter((c: any, index: any) => {
      return jobCode.indexOf(c) === index && c != null && c != undefined;
    });
    setjobCodeArray(jobCodeContents);
    console.log(jobCodeContents, "contents");

    const jobTitle = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_title?.localeCompare(b?.job_title);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.job_title;
      });
    const jobTitleContents = jobTitle?.filter((c: any, index: any) => {
      return jobTitle.indexOf(c) === index && c != null && c != undefined;
    });
    setjobTitleArray(jobTitleContents);
    console.log(jobTitleContents, "contents");

    const jobLevel = users
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_level?.localeCompare(b?.job_level);
      })
      ?.filter((j: any) => {
        return  j?.isRoleException === true
      })
      ?.map((i: any) => {
        return i.job_level;
      });
    const jobLevelContents = jobLevel?.filter((c: any, index: any) => {
      return jobLevel.indexOf(c) === index && c != null && c != undefined;
    });
    setjobLevelArray(jobLevelContents);
    console.log(jobLevelContents, "contents");
  }, [users,positionsFilter]);
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
    const mapped = users
    ?.filter((j: any) => {
      return  j?.isRoleException === true 
    })?.filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
          // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
        }
      })
      ?.filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter?.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter?.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradesFilter.includes("None") || GradesFilter?.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      ?.filter((item1: any) => {
        if (positionsFilter.includes("None") || positionsFilter?.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter?.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
        }
      })
      ?.filter((j: any) => {
        if (empEmployeeCode === "None" || empEmployeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(empEmployeeCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (AppName === "None" || AppName === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(AppName.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (RevName === "None" || RevName === "") {
          return j;
        } else {
          return j?.reviewer_name
            ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
            //.includes(empgrades.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (norName === "None" || norName === "") {
          return j;
        } else {
          return j?.normalizer_name
            ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
            //.includes(empgrades.toLocaleLowerCase());
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
      })
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase()
            ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (empFunction === "None" || empFunction === "") {
      //     return j;
      //   } else {
      //     return j.Function.toLocaleLowerCase().includes(
      //       empFunction.toLocaleLowerCase()
      //     );
      //   }
      // })
      ?.filter((j: any) => {
        if (empPositionCode === "None" || empPositionCode === "") {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase()
            ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            .toLocaleLowerCase()
            .includes(empService.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j.isSupervisor === undefined;
        }
      })
      ?.filter((j: any) => {
        if (empSubSection === "None" || empSubSection === "") {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase()
            .includes(empSubSection.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return j?.grade_set
            ?.toLocaleLowerCase()
            ?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return j?.manager_code
            ?.toLocaleLowerCase()
            ?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerPosition === "None" || empManagerPosition === "") {
          return j;
        } else {
          return j?.manager_position
            ?.toLocaleLowerCase()
            ?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return j?.manager_name
            ?.toLocaleLowerCase()
            ?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return j?.job_title
            ?.toLocaleLowerCase()
            ?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return j?.job_code
            ?.toLocaleLowerCase()
            ?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return j?.job_level
            ?.toLocaleLowerCase()
            ?.includes(empjoblevel?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empWorkLocation === "None" || empWorkLocation === "") {
          return j;
        } else {
          return j?.work_location
            ?.toLocaleLowerCase()
            ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (searchNameForTabs === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
              (j.first_name !== undefined &&
                j.first_name
                  .toLocaleLowerCase()
                  .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase()))
        ) {
          return j;
        }
      })?.map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")
        let inputDate = j?.service_reference_date
        const dateParts = inputDate.split("-");
        const year = dateParts[0];
        const month = new Date(inputDate).toLocaleString("default", { month: "short" });
        const day = dateParts[2]?.slice(0, 2)
        const formattedDate = `${day}-${month}-${year}`;
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = formattedDate
        if (columnHeaders["position"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["Grade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = j?.isSupervisor != true ? "N-SP" : "SP"
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = j?.probation_status
        if (columnHeaders["Employeeemail"] == true) exportData["Email ID"] = j?.email
        if (columnHeaders["division"] == true) exportData["Division"] = j?.division
        if (columnHeaders["Section"] == true) exportData["Section"] = j?.section  
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = j.sub_section   
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code_Draft
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name_Draft
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code_Draft
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name_Draft
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code_Draft
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name_Draft
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        return exportData
       
      });
      const a = [1]
      const Emptymapped = a.map((j: any) => {
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
        if (columnHeaders["Firstname"] == true) exportData["Known As"] =""
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""
        if (columnHeaders["position"] == true) exportData["Position"] = ""
        if (columnHeaders["Grade"] == true) exportData["Grade"] = ""
        if (columnHeaders["Function"] == true) exportData["Function"] = ""
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = ""
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = ""
        if (columnHeaders["Employeeemail"] == true) exportData["Email ID"] = ""
        if (columnHeaders["division"] == true) exportData["Division"] = ""
        if (columnHeaders["Section"] == true) exportData["Section"] = ""  
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""   
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = ""
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = ""
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = ""
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] =""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        return exportData
      });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped?.length == 0 ? Emptymapped : mapped);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  React.useEffect(() => {
    if (empEmployeeCode === "None" || empEmployeeCode === "" || empEmployeeCode === "0") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [empEmployeeCode]);
  React.useEffect(() => {
    if (positionsFilter?.length == 0) {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [positionsFilter]);
  React.useEffect(() => {
    if (AppName === "None" || AppName === "") {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [AppName]);
  React.useEffect(() => {
    if (RevName === "None" || RevName === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [RevName]);
  React.useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon4(false);
    } else {
      setIcon4(true);
    }
  }, [empFullName]);
  React.useEffect(() => {
    if (norName === "None" || norName === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }
  }, [norName]);
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
    if (empsections === "None" || empsections === "") {
      setIcon20(false);
    } else {
      setIcon20(true);
    }
  }, [empsections]);
  React.useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon10(false);
    } else {
      setIcon10(true);
    }
  }, [sectionsFilter]);
  React.useEffect(() => {
    if (GradesFilter?.length == 0) {
      setIcon11(false);
    } else {
      setIcon11(true);
    }
  }, [GradesFilter]);
  React.useEffect(() => {
    if (empManagerCode === "None" || empManagerCode === "") {
      setIcon12(false);
    } else {
      setIcon12(true);
    }
  }, [empManagerCode]);
  React.useEffect(() => {
    if (ProbationStatus === "None" || ProbationStatus === "") {
      setIcon13(false);
    } else {
      setIcon13(true);
    }
  }, [ProbationStatus]);
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
    if (empjoblevel === "None" || empjoblevel === "") {
      setIcon16(false);
    } else {
      setIcon16(true);
    }
  }, [empjoblevel]);
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
    const thedata = users
    ?.filter((j: any) => {
      return  j?.isRoleException === true 
    })?.filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
          // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
        }
      })
      ?.filter((item1: any) => {
        if (positionFilter.includes("None") || positionFilter?.length === 0) {
          return item1;
        } else {
          return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradeFilter.includes("None") || GradeFilter?.length === 0) {
          return item1;
        } else {
          return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      ?.filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter?.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
        }
      })
      ?.filter((item1: any) => {
        if (GradesFilter.includes("None") || GradesFilter?.length === 0) {
          return item1;
        } else {
          return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
        }
      })
      ?.filter((item1: any) => {
        if (positionsFilter.includes("None") || positionsFilter?.length === 0) {
          return item1;
        } else {
          return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      ?.filter((j: any) => {
        if (empEmployeeCode === "None" || empEmployeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(empEmployeeCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (AppName === "None" || AppName === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(AppName.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (RevName === "None" || RevName === "") {
          return j;
        } else {
          return j?.reviewer_name
            ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
            //.includes(empgrades.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (norName === "None" || norName === "") {
          return j;
        } else {
          return j?.normalizer_name
            ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
            //.includes(empgrades.toLocaleLowerCase());
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
      })
      ?.filter((j: any) => {
        if (empFullName === "None" || empFullName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(empFullName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empFirstName === "None" || empFirstName === "") {
          return j;
        } else {
          return j?.first_name
            ?.toLocaleLowerCase()
            ?.includes(empFirstName?.toLocaleLowerCase());
        }
      })
      // .filter((j: any) => {
      //   if (empFunction === "None" || empFunction === "") {
      //     return j;
      //   } else {
      //     return j.Function.toLocaleLowerCase().includes(
      //       empFunction.toLocaleLowerCase()
      //     );
      //   }
      // })
      ?.filter((j: any) => {
        if (empPositionCode === "None" || empPositionCode === "") {
          return j;
        } else {
          return j?.position_code
            ?.toLocaleLowerCase()
            ?.includes(empPositionCode?.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        if (empService === "None" || empService === "") {
          return j;
        } else {
          return j.service_reference_date
            .toLocaleLowerCase()
            .includes(empService.toLocaleLowerCase());
        }
      })

      ?.filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j.isSupervisor === undefined;
        }
      })
      ?.filter((j: any) => {
        if (empSubSection === "None" || empSubSection === "") {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase()
            .includes(empSubSection.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empGradeset === "None" || empGradeset === "") {
          return j;
        } else {
          return j?.grade_set
            ?.toLocaleLowerCase()
            ?.includes(empGradeset?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerCode === "None" || empManagerCode === "") {
          return j;
        } else {
          return j?.manager_code
            ?.toLocaleLowerCase()
            ?.includes(empManagerCode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerPosition === "None" || empManagerPosition === "") {
          return j;
        } else {
          return j?.manager_position
            ?.toLocaleLowerCase()
            ?.includes(empManagerPosition?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empManagerName === "None" || empManagerName === "") {
          return j;
        } else {
          return j?.manager_name
            ?.toLocaleLowerCase()
            ?.includes(empManagerName?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empjobtitle === "None" || empjobtitle === "") {
          return j;
        } else {
          return j?.job_title
            ?.toLocaleLowerCase()
            ?.includes(empjobtitle?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empJobcode === "None" || empJobcode === "") {
          return j;
        } else {
          return j?.job_code
            ?.toLocaleLowerCase()
            ?.includes(empJobcode?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empjoblevel === "None" || empjoblevel === "") {
          return j;
        } else {
          return j?.job_level
            ?.toLocaleLowerCase()
            ?.includes(empjoblevel?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empWorkLocation === "None" || empWorkLocation === "") {
          return j;
        } else {
          return j?.work_location
            ?.toLocaleLowerCase()
            ?.includes(empWorkLocation?.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
      })?.filter((j: any) => {
        if (searchNameForTabs === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
              (j.first_name !== undefined &&
                j.first_name
                  .toLocaleLowerCase()
                  .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchNameForTabs.toLocaleLowerCase()))
        ) {
          return j;
        }
      })?.filter((j: any) => {
        return j?.isSelected === true
      })?.map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")

        return {
          ECode: j.employee_code,
          EmployeeName: j.legal_full_name,
          Position: j.position_long_description,
          Grade: j.grade,
          SupervisoryRole: j.isSupervisor != undefined ? "SP" : "N-SP",
          Function: j?.attachmen,
          AppraiserName: j?.appraiser_name,
          ReviewerName: j?.reviewer_name,
          NormalizerName: j?.normalizer_name,
          Section: j.section,
          ServiceReferenceDate: j.service_reference_date,
          SubSection: j["sub section"],
          Division: j.division,
          ManagerPosition: j?.manager_position,
          WorkLocation: j?.work_location,
          AppraiserCode: j?.appraiser_code,
          ReviewerCode: j?.reviewer_code,
          NormalizerCode: j?.normalizer_code
        };
      });
      setUsersSelected(thedata?.length)
      if(thedata?.length !=0){
        setnavPrompt(true)
      }else{
        setnavPrompt(false)
      }
    
  }, [users]);
  
//Edit Button function
const handleEdit = (code:any) =>{
navigate("/roleexception",{ state: {selectCode :code}})
}
const handleRemove = (code:any) =>{
  console.log(code,"code")
  employeeUpdate({
    id: code?._id,
    isRoleException:false,
appraiser_code: code?.master_appraiser_code,
appraiser_name: code?.master_appraiser_name,
reviewer_code: code?.master_reviewer_code,
reviewer_name: code?.master_reviewer_name,
normalizer_code: code?.master_normalizer_code,
normalizer_name: code?.master_normalizer_name,
  }).then((res: any) => {
    res.error ? <> </> : 
    setLaunchValDialog(true);
    setLaunchValDialogMSG("Employee has been removed from Role exception")
});
}
//for editing and deleting multiple employee
const handleMultiDelete = () =>{
  console.log("clicked edit")
  let data = users?.filter((i:any)=>{
    return i?.isSelected === true
  })?.map((i:any)=>{
    return i?._id
  })
  if(data?.length > 0){
    removeFromRoleexception({
      id:data,
      exception:"RoleException"
    }).then((res: any) => {
      res.error ? <> </> : 
      setLaunchValDialog(true);
      setLaunchValDialogMSG("The selected employees were removed from Role Exceptions")
  });
    
  }else{
    setLaunchValDialog(true);
    setLaunchValDialogMSG("No employees were selected")
}
  }
  //nav disabling prompt
  // const disablingPrompt =React.useMemo(() => {
  //   if(navPromptTrigger === true){
  //     let data = users.filter((i:any)=>{
  //       return i?.isSelected === true
  //     })
   
  //     if(data.length > 0){
  //     navigate("/RoleExceptionWithMultipleEmp",{ state: {selectCode :data}})
  //     }else{
  //       setLaunchValDialog(true);
  //      setLaunchValDialogMSG("No employees have been selected")
  //     }
  //   }
  
  // },[navPromptTrigger])
  useEffect(() => {
    if(navPromptTrigger === true){
      let data = users?.filter((i:any)=>{
        return i?.isSelected === true
      })
   
      if(data?.length > 0){
      navigate("/RoleExceptionWithMultipleEmp",{ state: {selectCode :data}})
      }else{
        setLaunchValDialog(true);
       setLaunchValDialogMSG("No employees have been selected")
      }
      setnavPromptTrigger(false)
    }
  }, [navPromptTrigger])
  
//for editing and deleting multiple employee
const handleMultiEdit = () =>{
  console.log("clicked edit")
  // let data = users.filter((i:any)=>{
  //   return i?.isSelected === true
  // })
  setnavPrompt(false)
  setnavPromptTrigger(true)
  // if(data.length > 0){
  // navigate("/RoleExceptionWithMultipleEmp",{ state: {selectCode :data}})
  // }else{
  //   setLaunchValDialog(true);
  //  setLaunchValDialogMSG("No employees have been selected")
  // }
  }
const handleOnCheck = (e: any) => {
  // setnavPrompt(true)
  const { name, checked } = e.target;

  console.log(name, checked, "handleChange")
  // const tempUser = users?.map((employee: any) => {       
  //   return employee._id === name
  //   // return filteredUsersID.includes(employee.employee_code)
  //     ? { ...employee, isRoleException: checked ,
  //       isGradeException: checked,isCEORole: checked,isLeavers: checked,isExcluded:checked}
  //     : employee;
  // });
  // setUsers(tempUser);

  let filteredUsersID = users

    ?.filter((j: any) => {
      console.log(j.isSupervisor, "superv");
      if (sNS === "None" || sNS === "") {
        return j;
      }
      if (sNS === "SP") {
        return j.isSupervisor === true;
      } else if (sNS === "N-SP") {
        return j.isSupervisor === undefined;
      }
    })
    ?.filter((j: any) => {
      if (positions === "None" || positions === "") {
        return j;
      } else {
        return j.position_long_description
          .toLocaleLowerCase()
          .includes(positions.toLocaleLowerCase());
      }
    })
    ?.filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter?.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter?.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    ?.filter((item1: any) => {
      if (positionFilter.includes("None") || positionFilter?.length === 0) {
        return item1;
      } else {
        return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    ?.filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter?.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    ?.filter((item1: any) => {
      if (GradeFilter.includes("None") || GradeFilter?.length === 0) {
        return item1;
      } else {
        return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j.grade
          .toLocaleLowerCase()
          .includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empsections === "None" || empsections === "") {
        return j;
      } else {
        return j.section
          .toLocaleLowerCase()
          .includes(empsections.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (searchNameForTabs === "") {
        return j;
      } else if (
        (j.employee_code !== undefined &&
          j.employee_code
            .toLocaleLowerCase()
            .includes(searchNameForTabs.toLocaleLowerCase())) ||
        (j.legal_full_name !== undefined &&
          j.legal_full_name
            .toLocaleLowerCase()
            .includes(searchNameForTabs.toLocaleLowerCase())) ||
        (j.section !== undefined &&
          j.section
            .toLocaleLowerCase()
            .includes(searchNameForTabs.toLocaleLowerCase())) ||
        (j.position_long_description !== undefined &&
          j.position_long_description
            .toLocaleLowerCase()
            .includes(searchNameForTabs.toLocaleLowerCase())) ||
        (j.grade !== undefined &&
          j.grade
            .toLocaleLowerCase()
            .includes(searchNameForTabs.toLocaleLowerCase()))
      ) {
        return j;
      }
    })
    ?.map((j: any) => j?.employee_code);
  console.log(filteredUsersID, "filteredUsersID")
  // setnavPrompt(true);
  if (name === "allSelect") {
    const tempUser = users?.map((employee: any) => {
      console.log(employee, "filteredUsersID")
      return filteredUsersID.includes(employee?.employee_code)
        ? {
          ...employee, isSelected: checked
          // isRoleException: checked ,
          // isGradeException: checked,isCEORole: checked,isLeavers: checked,isExcluded:checked
        }
        : employee;
    });
    
    
    setUsers(tempUser);
   
  } else {
    const tempUser = users?.map((employee: any) => {
      return employee._id === name
        // return filteredUsersID.includes(employee.employee_code)
        ? {
          ...employee, isSelected: checked,
          // isRoleException: checked ,
          // isGradeException: checked,isCEORole: checked,isLeavers: checked,isExcluded:checked
        }
        : employee;
    });
   
    setUsers(tempUser);
    
  }
};
// const handleSearchBar = (e:any) =>{
//   setsearchNameForTabs(e.target.value);
//   setPage(0);
// }
const maxLengthForSearch = 30;
const handleSearchBar = (e: any) => {
  if (e.target.value.length > maxLengthForSearch) {
    e.target.value = e.target.value.slice(0, maxLengthForSearch);
  }
  setsearchNameForTabs(e.target.value);
  setPage(0);
}
const handleheadingSortAccept = () => {
 
  setisDrawerOpen(false);
  handleExport();
  setcolumnHeaders({
    Ecode: true,
    Ename: true,
    Firstname:true,
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
    AppraiserCode:true,
    ReviewerCode:true,
    NormalizerCode:true,
    EmployeeMappedStatus:true,
    ProbationStatus:true,
    Employeeemail:true,
    SelectAll: true,
  })
};
const handleExportFunction = () => {
  setisDrawerOpen(true);
 
};
  return (
    <>
      <Box >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* <span
            style={{
              color: "#3e8cb5",
              fontSize: "18px",
              fontFamily: "Arial",
            }}
          >
            Employee List
          </span> */}
          <div style={{ paddingLeft: "10px", paddingRight: "15px" }}>
            {/* <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
              }}
              variant="outlined"
              onClick={() => {
                setisDrawerOpen(true);
              }}
            >
              Choose Fields
            </Button>
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
              onClick={handleExport}
            /> */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => {
                setisDrawerOpen(false);
              }}
            >
               <Box sx={{ padding: "10px",  }}>
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
                      <Checkbox checked={columnHeaders?.Ecode} name="Ecode" onChange={handleheading1} />
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
                      <Checkbox checked={columnHeaders?.Ename}
                        name="Ename" onChange={handleheading2} />
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
                      <Checkbox checked={columnHeaders?.Firstname}
                        name="Firstname" onChange={handlefirstname } />
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
                      <Checkbox checked={columnHeaders?.ServiceReferenceDate}
                        name="ServiceReferenceDate"
                        onChange={handleheading4} />
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
                      <Checkbox checked={columnHeaders?.position}
                        name="position"
                        onChange={handleheading6} />
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
                      <Checkbox checked={columnHeaders?.Grade}
                        name="Grade"
                        onChange={handleheading5} />
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
                      <Checkbox checked={columnHeaders?.division}
                        name="division"
                        onChange={handleheading8} />
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
                      <Checkbox checked={columnHeaders?.Section}
                        name="Section"
                        onChange={handleheading9} />
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
                      <Checkbox checked={columnHeaders?.AppraiserName}
                        name="AppraiserName"
                        onChange={handleheading7} />
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
                    Close
                  </Button>
                </Stack>
              </Box>
            </Drawer>
          </div>
        </Stack>
      </Box>
     
        <div
         style={{
          display:'flex',
          width: "100%",
          justifyContent:"end",
          // marginTop: "8px",
          // marginBottom:"8px",
        }}
          >
              {/* <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"                             
                               onClick={(e) => {handleMultiEdit()}}
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
               </Tooltip>
               <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                onClick={(e) => {handleMultiDelete()}}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
              </Tooltip> */}
          <img
              //sx={{paddingRight:"10px"}}
              src={Newexcel}
              alt="icon"
              style={{cursor:"pointer",  marginLeft: "15px", marginTop: "5px",marginRight: "15px" }}
              onClick={handleExportFunction}
            />
      <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
          value={searchNameForTabs}
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
      </div>
      <TableContainer component={Paper} sx={{ marginTop: 0 }}>
        <Scroll>
          <CustomScrollbar style={{ minWidth: 650, height: "calc(100vh - 300px)" }}>
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
                    {/* {checkedSwitch === false && <TableCell width="0.5%" align="center">
                      <input
                        type="checkbox"
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        name="allSelect"
                        checked={
                          usersSelected === page1
                        }
                        onChange={handleOnCheck}
                      />
                    </TableCell>} */}
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
                      <Stack direction="row" alignItems="center" >
                        <div
                          aria-controls={opennew ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew ? "true" : undefined}
                          onClick={handleClicknew}
                        >
                          <Stack direction="row" alignItems="center">
                            Ecode
                            {/* <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/> */}
                          </Stack>
                         </div>
                        {/*<Menu
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
                           >Clear Filter
                           </MenuItem>
                         
                          {users
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.employee_code - b.employee_code;
                              })
                              ?.filter((j: any) => {
                                return  j?.isRoleException === true
                              })
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                    justifyContent:"center"
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
                        {icon && <FilterAltTwoToneIcon />} */}
                        </Stack>
                      {/* <FormControl sx={{ height: "0" }}>
                        <Stack direction="row" alignItems="center" position="relative" >
                          <span
                          style={{
                            position:"absolute",
                            //left:"25px"
                          }}
                          > ECode </span>

                         
                          <Select
                            size="small"
                            sx={{ width: "70px", fontSize: "0rem",paddingTop:"14px" }}
                            disableUnderline
                          
                            value={empEmployeeCode}
                            
                            onChange={handleChangeEmployeeCode}
                           
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
                           
                            {users
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.employee_code - b.employee_code;
                              })
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                  }}
                                  key={name.employee_code}
                                  value={name.employee_code}
                                  
                                >
                                  {name.employee_code}
                                </MenuItem>
                              ))}
                          </Select>
                          {icon && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
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
                       <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFullName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFullName ? "true" : undefined}
                          onClick={handleClickFullName}
                        >
                          <Stack direction="row" alignItems="center">
                          Employee Name
                            {/* <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/> */}
                          </Stack>
                        </div>
                        {/* <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"260px"
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
                           >Clear Filter
                           </MenuItem>
                         
                          {users
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.legal_full_name - b.legal_full_name;
                              })
                              ?.filter((j: any) => {
                                return  j?.isRoleException === true
                              })
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                    justifyContent:"left"
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
                        {icon4 && <FilterAltTwoToneIcon />} */}
                        </Stack>
                      {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Full Name </span>
                        
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empFullName}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeFullName}
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
                         
                            {users
                              .slice()
                              ?.sort(function (a: any, b: any) {
                                return a?.legal_full_name?.localeCompare(
                                  b?.legal_full_name
                                );
                              })
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",
                                  }}
                                  key={name.legal_full_name}
                                  value={name.legal_full_name}
                                >
                                  {name.legal_full_name}
                                </MenuItem>
                              ))}
                          </Select>
                          {icon4 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
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
                                  sx={{ width: "25px", fontSize: "0rem",
                                  "& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    },  }}
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
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllpositionsFilter}
                          indeterminate={
                            positionsFilter?.length > 0 &&
                            positionsFilter?.length < positionArray?.length
                          }
                          sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
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
                            size="small"
                            style={{ padding: "0px", paddingLeft: "14px" , height: "0px"}}
                            checked={positionsFilter.indexOf(option) > -1}
                            sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
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
                
                <TableCell
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
                                <span>Grade</span>
                                <Select
                                   labelId="demo-multiple-checkbox-label"
                                   id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" ,
                                  "& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    },}}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={GradesFilter}
                                  onChange={handleChangeSelectSection}
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
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllGradesFilter}
                          indeterminate={
                            GradesFilter?.length > 0 &&
                            GradesFilter?.length < gradesArray?.length
                          }
                          sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
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
                            style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                            checked={GradesFilter.indexOf(option) > -1}
                            sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
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
                                {icon11 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                   
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
                      <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openProbationStatusVal ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openProbationStatusVal ? "true" : undefined}
                          onClick={handleClickProbationStatus}
                        >
                          <Stack direction="row" alignItems="center">
                          Probation<br></br> Status
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",
                              //paddingLeft: "15px",
                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetProbationStatus}
                          >Clear Filter
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
                            key="probation"
                            value="probation"
                            onClick={handleTargetProbationStatus}
                          >In probation
                          </MenuItem>
                        
                        </Menu>
                        {icon13 && <FilterAltTwoToneIcon />}
                      </Stack>
                    
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
                      <Stack direction="row" alignItems="center" >
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
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            width: "300px"
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
                              justifyContent: "left",
                              width: "100px"
                           
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetSupervisoryRole}
                          >Clear Filter
                          </MenuItem>

                          {sNSvalues
                            .slice()
                            ?.sort(function (a: any, b: any) {
                              return a?.isSupervisor?.localeCompare(
                                b?.isSupervisor
                              );
                            })
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                  justifyContent: "left",
                                  width: "100px"
                                 
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
                      <Stack direction="row" alignItems="center" justifyContent="center"  >
                        <div
                          aria-controls={openSupervisoryRole ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSupervisoryRole ? "true" : undefined}
                          onClick={handleClickFunction}
                        >
                          <Stack direction="row" alignItems="center">
                            Function
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            width: "160px"
                          }}
                          anchorEl={anchorElnewFunction}
                          open={openFunction}
                          onClose={handleCloseFunction}

                        >
                          <MenuItem
                            style={{
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                              justifyContent: "left",
                              width: "110px"
                            
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetFunction}
                          >Clear Filter
                          </MenuItem>
                          <MenuItem
                            style={{
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingLeft: "15px",
                              justifyContent: "left",
                              width: "110px"
                             
                            }}
                            key="Sales"
                            value="Sales"
                            onClick={handleTargetFunction}
                          >
                            Sales
                          </MenuItem>
                          <MenuItem
                            style={{
                              fontSize: "14px",
                              fontFamily: "Arial",
                              color: "#333333",
                              paddingLeft: "15px",
                              justifyContent: "left",
                              width: "100px"
                              
                            }}
                            key="Non-Sales"
                            value="Non-Sales"
                            onClick={handleTargetFunction}
                          >
                            Non-Sales
                          </MenuItem>



                        </Menu>
                        {icon6 && <FilterAltTwoToneIcon />}
                      </Stack>
                    
                    </TableCell> */}
                  {/* {heading9 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    > */}
                      {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSection ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSection ? "true" : undefined}
                          onClick={handleClickSection}
                        >
                          <Stack direction="row" alignItems="center">
                          Section
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                          anchorEl={anchorElnewSection}
                          open={openSection}
                          onClose={handleCloseSection }
                          
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
                           onClick={handleTargetSection}
                           >None
                           </MenuItem>
                         
                           {sectionArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetSection}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon20 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Section</span>
                                <Select
                                   labelId="demo-multiple-checkbox-label"
                                   id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
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
                                   
                                  }}
                                  key="all"
                                  value="all"
                                  classes={{
                                    root: isAllsectionFilter ? classes.selectedAll : "",
                                  }}
                                  >
                                   <ListItemIcon>
                        <Checkbox
                          size="small"
                          style={{ padding: "3px", paddingLeft: "14px",height:"0px"}}
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllsectionFilter}
                          indeterminate={
                            sectionsFilter?.length > 0 &&
                            sectionsFilter?.length < sectionArray?.length
                          }
                          sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
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
                            style={{ padding: "3px", paddingLeft: "14px" }}
                            checked={sectionsFilter.indexOf(option) > -1}
                            sx={{ "& .MuiSvgIcon-root": {fontSize: "14px !important"}}}
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
                                {icon10 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl> */}
                    {/* </TableCell>
                  
                  )} */}
                 
                 <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceAppName  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceAppName  ? "true" : undefined}
                          onClick={handleClickserviceAppName}
                        >
                          <Stack direction="row" alignItems="center">
                          Appraiser Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceAppName}
                          open={openserviceAppName }
                          onClose={handleCloseserviceAppName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",

                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceAppName}
                           >Clear Filter
                           </MenuItem>
                         
                           {appraiserNames?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetserviceAppName}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon2 && <FilterAltTwoToneIcon />}
                        </Stack>
                       
                      </div>
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
                      <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRevName  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRevName  ? "true" : undefined}
                          onClick={handleClickserviceRevName}
                        >
                          <Stack direction="row" alignItems="center">
                          Reviewer Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                           
                          }}
                          anchorEl={anchorElnewserviceRevName}
                          open={openserviceRevName }
                          onClose={handleCloseserviceRevName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",

                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceRevName}
                           >Clear Filter
                           </MenuItem>
                         
                           {ReviewerNames?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetserviceRevName}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon3 && <FilterAltTwoToneIcon />}
                        </Stack>
                       
                      </div>
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
                      <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceNorName  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceNorName  ? "true" : undefined}
                          onClick={handleClickserviceNorName}
                        >
                          <Stack direction="row" alignItems="center">
                          HR Normalizer Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                           
                          }}
                          anchorEl={anchorElnewserviceNorName}
                          open={openserviceNorName}
                          onClose={handleCloseserviceNorName}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",

                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceNorName}
                           >Clear Filter
                           </MenuItem>
                         
                           {NormalizerNames?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetserviceNorName}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon5 && <FilterAltTwoToneIcon />}
                        </Stack>
                       
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
                    Action
                    </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {data != undefined &&
                  // (rowsPerPage > 0
                  //   ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  //   : data.data
                  // )
                  users
                  ?.filter((j: any) => {
                    return  j?.isRoleException === true
                  })
                    ?.filter((j: any) => {
                      if (positions === "None" || positions === "") {
                        return j;
                      } else {
                        return j?.position_long_description
                          ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
                          //.includes(positions.toLocaleLowerCase());
                        // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
                      }
                    })
                    ?.filter((item1: any) => {
                      if (positionFilter.includes("None") || positionFilter?.length === 0) {
                        return item1;
                      } else {
                        return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
                      }
                    })
                    ?.filter((item1: any) => {
                      if (GradeFilter.includes("None") || GradeFilter?.length === 0) {
                        return item1;
                      } else {
                        return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
                      }
                    })
                    ?.filter((item1: any) => {
                      if (GradesFilter.includes("None") || GradesFilter?.length === 0) {
                        return item1;
                      } else {
                        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
                      }
                    })
                    ?.filter((item1: any) => {
                      if (positionsFilter.includes("None") || positionsFilter?.length === 0) {
                        return item1;
                      } else {
                        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                      }
                    })
                    ?.filter((item1: any) => {
                      if (sectionsFilter.includes("None") || sectionsFilter?.length === 0) {
                        return item1;
                      } else {
                        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
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
                        return j?.employee_code ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
                         
                          // .includes(empEmployeeCode?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (AppName === "None" || AppName === "") {
                        return j;
                      } else {
                        return j?.appraiser_name
                          ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (RevName === "None" || RevName === "") {
                        return j;
                      } else {
                        return j?.reviewer_name
                          ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (norName === "None" || norName === "") {
                        return j;
                      } else {
                        return j?.normalizer_name
                          ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empdivisions === "None" || empdivisions === "") {
                        return j;
                      } else {
                        return j?.division
                          ?.toLocaleLowerCase()=== empdivisions?.toLocaleLowerCase();
                          //.includes(empdivisions.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empFullName === "None" || empFullName === "") {
                        return j;
                      } else {
                        return j?.legal_full_name
                          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
                          //?.includes(empFullName?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empFirstName === "None" || empFirstName === "") {
                        return j;
                      } else {
                        return j?.first_name
                          ?.toLocaleLowerCase()=== empFirstName?.toLocaleLowerCase();
                          //?.includes(empFirstName?.toLocaleLowerCase());
                      }
                    })
                    // .filter((j: any) => {
                    //   if (empFunction === "None" || empFunction === "") {
                    //     return j;
                    //   } else {
                    //     return j.Function.toLocaleLowerCase().includes(
                    //       empFunction.toLocaleLowerCase()
                    //     );
                    //   }
                    // })
                    ?.filter((j: any) => {
                      if (
                        empPositionCode === "None" ||
                        empPositionCode === ""
                      ) {
                        return j;
                      } else {
                        return j?.position_code
                          ?.toLocaleLowerCase()=== empPositionCode?.toLocaleLowerCase();
                          //?.includes(empPositionCode?.toLocaleLowerCase());
                      }
                    })

                    ?.filter((j: any) => {
                      if (empService === "None" || empService === "") {
                        return j;
                      } else {
                        return j?.service_reference_date
                          ?.toLocaleLowerCase()=== empService?.toLocaleLowerCase();
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
                        return j?.isSupervisor === undefined;
                      }
                    })
                    ?.filter((j: any) => {
                      if (empSubSection === "None" || empSubSection === "") {
                        return j;
                      } else {
                        return j["sub section"]
                          ?.toLocaleLowerCase()=== empSubSection?.toLocaleLowerCase();
                          //.includes(empSubSection.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empGradeset === "None" || empGradeset === "") {
                        return j;
                      } else {
                        return j?.grade_set
                          ?.toLocaleLowerCase()=== empGradeset?.toLocaleLowerCase();
                          //?.includes(empGradeset?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empManagerCode === "None" || empManagerCode === "") {
                        return j;
                      } else {
                        return j?.manager_code
                          ?.toLocaleLowerCase()=== empManagerCode?.toLocaleLowerCase();
                          //?.includes(empManagerCode?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (
                        empManagerPosition === "None" ||
                        empManagerPosition === ""
                      ) {
                        return j;
                      } else {
                        return j?.manager_position
                          ?.toLocaleLowerCase()=== empManagerPosition?.toLocaleLowerCase();
                          //?.includes(empManagerPosition?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empManagerName === "None" || empManagerName === "") {
                        return j;
                      } else {
                        return j?.manager_name
                          ?.toLocaleLowerCase()=== empManagerName?.toLocaleLowerCase();
                          //?.includes(empManagerName?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empjobtitle === "None" || empjobtitle === "") {
                        return j;
                      } else {
                        return j?.job_title
                          ?.toLocaleLowerCase()=== empjobtitle?.toLocaleLowerCase();
                          //?.includes(empjobtitle?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empJobcode === "None" || empJobcode === "") {
                        return j;
                      } else {
                        return j?.job_code
                          ?.toLocaleLowerCase()=== empJobcode?.toLocaleLowerCase();
                          //?.includes(empJobcode?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empjoblevel === "None" || empjoblevel === "") {
                        return j;
                      } else {
                        return j?.job_level
                          ?.toLocaleLowerCase()=== empjoblevel?.toLocaleLowerCase();
                          //?.includes(empjoblevel?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (
                        empWorkLocation === "None" ||
                        empWorkLocation === ""
                      ) {
                        return j;
                      } else {
                        return j?.work_location
                          ?.toLocaleLowerCase()=== empWorkLocation?.toLocaleLowerCase();
                          //?.includes(empWorkLocation?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empsections === "None" || empsections === "") {
                        return j;
                      } else {
                        return j.section
                          .toLocaleLowerCase()=== empsections?.toLocaleLowerCase();
                          //.includes(empsections.toLocaleLowerCase());
                      }
                    })?.filter((j: any) => {
                      if (searchNameForTabs === "") {
                        return j;
                      } else if (
                        (j.employee_code !== undefined &&
                          j.employee_code
                            .toLocaleLowerCase()
                            .includes(searchNameForTabs.toLocaleLowerCase())) ||
                        (j.legal_full_name !== undefined &&
                          j.legal_full_name
                            .toLocaleLowerCase()
                            .includes(searchNameForTabs.toLocaleLowerCase())) ||
                            (j.first_name !== undefined &&
                              j.first_name
                                .toLocaleLowerCase()
                                .includes(searchNameForTabs.toLocaleLowerCase())) ||
                        (j.section !== undefined &&
                          j.section
                            .toLocaleLowerCase()
                            .includes(searchNameForTabs.toLocaleLowerCase())) ||
                        (j.position_long_description !== undefined &&
                          j.position_long_description
                            .toLocaleLowerCase()
                            .includes(searchNameForTabs.toLocaleLowerCase())) ||
                        (j.grade !== undefined &&
                          j.grade
                            .toLocaleLowerCase()
                            .includes(searchNameForTabs.toLocaleLowerCase()))
                      ) {
                        return j;
                      }
                    })
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //  (rowsPerPage > 0
                    //    ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //    : data.data
                    //  )
                    ?.map((emp: any, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "& td, & th": {
                            whiteSpace: "nowrap",
                            // border: 1,
                            // borderColor: "#e0e0e0",
                          },
                        }}
                      >
                       {/* {checkedSwitch === false && <TableCell width="0.5%" align="center">
                      <input
                        type="checkbox"
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                        name={emp._id}
                        checked={
                          emp?.isSelected
                        }
                        onChange={handleOnCheck}
                      />
                    </TableCell>} */}
                          <TableCell
                            align="center"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight:"40px"
                            }}
                          >
                            {emp?.employee_code}
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
                            {emp?.legal_full_name}
                          </TableCell>
                        
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp?.position_long_description}
                          </TableCell>
                      
                      <TableCell
                            align="center"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight: "50px"

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
                              paddingRight: "40px"

                            }}
                          >
                            
                            {emp?.probation_status}
                          </TableCell>
                          
                    <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            { emp?.appraiser_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                             {emp?.reviewer_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            { emp?.normalizer_name}
                          </TableCell>
                          {/* <TableCell
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                     <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"                             
                                onClick={(e) => {handleEdit(emp?.employee_code)}}
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                onClick={(e) => {handleRemove(emp)}}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                    </TableCell> */}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CustomScrollbar>
        </Scroll>
      </TableContainer>
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
         <AlertDialogSuccess
           isAlertOpen={LaunchValDialog}
           handleAlertClose={handleLaunchValDialog}
        >
         {LaunchValDialogMSG}
        
        </AlertDialogSuccess>
    </>
  );
}
