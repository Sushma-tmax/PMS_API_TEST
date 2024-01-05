import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Cancel from "@mui/icons-material/Cancel";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PAMaster from "../../components/UI/PAMaster";
import { AlertDialog } from "..";
import ListItemText from '@mui/material/ListItemText';

import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import {
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
  MAPPED_TEMPLATE_2,
  LINK_CALENDAR_OPEN,
  LINK_CALENDAR,
  VIEW_MAPPED_TEMPLATE,
  VIEW_MAPPED_EMPLOYEE,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  useCreatePositionTemplateMutation,
  useGetEmployeeQuery,
  useGetEmployeeByFilterQuery,
  useGetSingleTemplateQuery,
  useGetAppraisalCalenderQuery,
  useGetEmployeeUnmappedQuery,
  useGetCalenderQuery,
  useAddEmpolyeAppraisalCalenderMutation,

} from "../../service/";
import { Alert, ListItemIcon, TablePagination } from "@mui/material";
import { useParams } from "react-router-dom";
import _ from "lodash";
import Searchicon from "../../assets/Images/Searchicon.svg";
import {
  Box,
  Container,
  Paper,
  Grid,
  Menu,
  Toolbar,
  Typography,
  TextField,
  Stack,
  styled,
  InputAdornment,
  Tooltip,
  Checkbox,
  Button,
  Tab,
  Tabs,
  Drawer, FormControlLabel, FormGroup,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import Closeicon from "../../assets/Images/Closeicon.svg";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import * as XLSX from 'xlsx';
import Newexcel from "./icons/Newexcel.svg"
import { makeStyles } from '@mui/styles';

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C7C7C7 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },

});
const Searchfeild1 = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "0px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
    borderRadius: "25px",
    background: "#F2F6F8",
    marginTop: "3px",
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

export default function ViewMappedPositions(props: any) {
  const classes = useStyles();
  const { ViewTemplateData, onDelete,showemptyVal,setshowemptyVal, checkedTemplatesID, name,setname, setnavPrompt, refetch, MappedTemplates, calendarId, templateId,setTemplateId, year, displayEdit,colorHandler,settabValues,tabValues,hideUnmapped } =
    props;
    const navigate = useNavigate();
    const CustomScrollbar = Scrollbar as any;
  console.log(showemptyVal, "showemptyVal");
  // const { data, isLoading, error } = useGetEmployeeQuery("all");
  const SELECT_FOR_DASHBOARD = `employee_code,
legal_full_name,
isCEORole,
isLeavers,
isExcluded,overall_rating,
employee.employee_rating,
position_long_description,
employee.employee_status,service_reference_date,first_name,
grade,email,
section,
talent_category,
sub_section,
appraisal.appraiser_rating,
reviewer.reviewer_rating,
normalizer.normalizer_rating,
appraisal.status,
appraisal.appraiser_status,
appraisal.pa_status,
appraisal.appraiser_rejected,
appraisal.potential,
reviewer.reviewer_status,
normalizer.normalizer_status,
normalizer.normalizer_rejected,
reviewer.rejection_count,
appraisal.objective_description,
reviewerIsDisabled,
appraiser_name,
normalizer_name,
reviewer_name,
appraisal.potential,
manager_code,
manager_name,
sub_Section,
appraiser_code,
reviewer_code,
normalizer_code,
manager_position,
work_location,
sub%20section,
division,
probation_status,
function,
appraisal.appraiser_name,
current_rating.overall_rating,
pa_status,
employee.employee_rejection,
previous_rating,
employee.employee_status,
reviewer.reviewer_status,
normalizer.normalizer_status`
  const { data } = useGetEmployeeByFilterQuery(
    `?employee_upload_flag=true&limit=800&select=${SELECT_FOR_DASHBOARD}`
  );
  const { data: appraisalCalData } = useGetAppraisalCalenderQuery("");
  const { data: unmappedCalData } = useGetEmployeeUnmappedQuery(year)

  console.log(appraisalCalData, 'appraisalCalData')
  console.log(unmappedCalData, 'unmappedCalData')
  const { data: calData } = useGetCalenderQuery("");
  console.log(data, checkedTemplatesID, "dataaaaaa");
  const { id } = useParams();
  // const { data:mapped } = useGetSiAppraisalCalenderQuery(id)
  // console.log(mapped,"mappedST");
  const [users, setUsers] = useState<any>([]);
  const [unMappedEmployees, setunMappedEmployees] = useState<any>(false);
  const [templateData, setTemplateData] = useState<any>([]);
  const [employee, setEmployee] = React.useState("");
  const [name1, setName1] = useState<any>("");
  const [searchName, setSearchName] = useState("");
  const [searchName2, setSearchName2] = useState("");
  const [searchNameAll, setSearchNameAll] = useState("");
  const [filteredPosition, setFilteredPosition] = useState([])
  console.log(searchName, "searchName");
  const { data: singleTemplateData, isLoading: load } =
    useGetSingleTemplateQuery(id);
  const [createPosition, { isSuccess: isSuccessPosition }] =
    useCreatePositionTemplateMutation();
  const [createMappedPositions, { isSuccess: isSuccessMappedPosition }] =
    useAddEmpolyeAppraisalCalenderMutation();
  const [save1, setSave1] = useState(isSuccessPosition);
  const [errors, setErrors] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [positionsHide, setpositionsHide] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [mappedChecked, setMappedChecked] = React.useState<any>(true);
  console.log(name, "name");
  console.log(users.length, "checked user");
  useEffect(() => {
    if (id !== undefined) {
      setpositionsHide(true);
    } else {
      setpositionsHide(false);
    }
  }, [id]);

//-----------------------------------------------------------------export functionalities
const [columnHeaders, setcolumnHeaders] = React.useState<any>({
  Ecode: true,
  Ename: true,
  Firstname:true,
  Eposition: true,
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
  OverAllRating: true,
  PreviousRating: true,
  AppraiserCode: true,
  ReviewerCode: true,
  NormalizerCode: true,
  ProbationStatus: true,
  Employeeemail: true,
  position:true,
  SelectAll: true,
})
const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
console.log(isDrawerOpen, "position");
//-----------------------------------------------------------------export functionalities
  //Appraisal calendar


  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [activeTemplate, setactiveTemplate] = useState<any>([]);
  const [unmappedEmpDatum, setunmappedEmpDatum] = useState<any>([]);
  const [allEmployees, setAllEmployees] = useState<any>([])
  const [allEmployeesforclosed, setallEmployeesforclosed] = useState<any>([])
  console.log(unmappedEmpDatum,"unmappedEmpDatumConsole")
  console.log("allemp",allEmployees)

  useEffect(() => {
    if (appraisalCalData !== undefined) {
      let filteredData = appraisalCalData?.data.filter((item: any) => {
        return item.status === "active" && item.calendar != undefined;
      });

      setActiveAppId(() => {
        let temp = filteredData.map((i: any) => {
          return i.calendar._id;
        });
        return temp;
      });
    }

  }, [appraisalCalData]);

  useEffect(() => {

    let employeesMapp = MappedTemplates
    // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
    // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
    // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.division }).indexOf(item.division) === index)
    // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data.section }).indexOf(item.section) === index)
    ?.filter((i: any) => {
      return (
        i?._id === id

      )
    })
    console.log(employeesMapp[0]?.position, 'MappedTemplates1')
    let employees2 = employeesMapp[0]?.position?.map((i: any) => {
      //console.log(i,'iiiii')
      return {
        isChecked: i.isChecked,
        name: i.name
      }

    })
    console.log(employees2, 'MappedTemplates1')
    setactiveTemplate(employees2)
  }, [MappedTemplates, appraisalCalData, id]);

  const handleOnCheck11 = (e: any) => {
    const { name, checked } = e.target;
    setChanged(true);
    let filteredUsersID = activeTemplate
    ?.filter((j: any) => {
      return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
    }).filter((j: any) => {
        if (employeeName === "None" || employeeName === "") {
          return j;
        } else {
          return j?.name?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeName?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j?.name?.employee_code
            .toLocaleLowerCase()
            .includes(employeeCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j?.name?.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j?.name?.isSupervisor != true;
        }
      })
      .filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j?.name?.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.name?.grade
            .toLocaleLowerCase()
            .includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j?.name?.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName === "") {
          return j;
        } else if (
          (j?.name?.employee_code !== undefined &&
            j?.name?.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j?.name?.legal_full_name !== undefined &&
            j?.name?.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j?.name?.section !== undefined &&
            j?.name?.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j?.name?.position_long_description !== undefined &&
            j?.name?.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j?.name?.grade !== undefined &&
            j?.name?.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName !== ""){
          if (searchName == "SP") {
            return j?.name?.isSupervisor == true;
          }else if (searchName == "N-SP") {
              return j?.name?.isSupervisor != true;
            }
        }
      })
      .map((j: any) => j?.name?.employee_code);
    setnavPrompt(true);
    if (name === "allSelect") {
      const tempUser = activeTemplate.map((employee: any) => {
        console.log(checked, 'checkedValue1')
        return filteredUsersID.includes(employee?.name?.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setactiveTemplate(tempUser);
    } else {
      const tempUser = activeTemplate.map((employee: any) => {
        console.log(checked, 'checkedValue2')
        return employee?.name?._id === name
          // return filteredUsersID.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setactiveTemplate(tempUser);
      // console.log(tempUser, "temp");
    }
  };
//----------------------------------------------------------------------export
const [firstname, setfirstname] = React.useState(true);
const handlefirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
  setfirstname(event.target.checked);
  //let columnHeadersTemp = columnHeaders
//  columnHeadersTemp[event.target.name] = event.target.checked;
//  setcolumnHeaders(columnHeadersTemp)
const { name, checked } = event.target;
setcolumnHeaders((prevColumnHeaders:any) => ({
  ...prevColumnHeaders,
  [name]: checked,
}));
};
const [heading1, setheading1] = React.useState(true);
// console.log(heading1, "h1");
const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheading1(event.target.checked);
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
 const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
};
const [headingPrevious, setheadingPrevious] = React.useState(true);
const handleheadingPrevious = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingPrevious(event.target.checked);
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
const [overall, setoverAll] = React.useState(true);
const handleoverAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  setoverAll(event.target.checked);
 const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
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
// const [ProbationStatus, setProbationStatus] = React.useState(true);
// const handleProbationStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setProbationStatus(event.target.checked);
//   let columnHeadersTemp = columnHeaders
//   columnHeadersTemp[event.target.name] = event.target.checked;
//   setcolumnHeaders(columnHeadersTemp)
// };
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
const [Role, setRole] = React.useState(true);
const handleSupervisoryRole = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRole(event.target.checked);
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
  //let columnHeadersTemp = columnHeaders
//  columnHeadersTemp[event.target.name] = event.target.checked;
//  setcolumnHeaders(columnHeadersTemp)
};
const [emailData, setemailData] = React.useState(true);
  const handleEmailData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemailData(event.target.checked);
    // let columnHeadersTemp = columnHeaders
    // columnHeadersTemp[event.target.name] = event.target.checked;
    // setcolumnHeaders(columnHeadersTemp)
    const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
  };
//----------------------------------------------------------------------export
  const handleOnCheckDataUnmapped = (e: any) => {
    // setnavPrompt(true);
    const { name, checked } = e.target;
    console.log(name, checked, 'name, checked,un')
    //setOpen(true);
    // setcheckname(name);
    // setisitchecked(checked);
    // setunMappedEmployees(true);
    setChanged(true);
    //handleAgree(e);



    let filteredUsersID = unmappedEmpDatum
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      .filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j.isSupervisor != true;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
      .map((j: any) => j.employee_code);

    if (name === "allSelect") {
      const tempUser = unmappedEmpDatum.map((employee: any) => {
        return filteredUsersID.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setunmappedEmpDatum(tempUser);

    } else {
      const tempUser = unmappedEmpDatum.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      console.log(tempUser, 'tempUserUN')
      setunmappedEmpDatum(tempUser);

    }
  };

  //Appraisal calendar
  console.log(activeTemplate, 'MappedTemplates2')
  useEffect(() => {
    if (singleTemplateData) {
      setName1(singleTemplateData.template.name);
      setTemplateData(() => {
        return singleTemplateData.template.position.map((item: any) => {
          return {
            ...item.name,
            isChecked: item.isChecked,
          };
        });
      });
    }
  }, [data, singleTemplateData]);

  useEffect(() => {
    console.log("useeffect run");

    if (data) {
      setUsers((prev: any) => {
        const newArr = [...templateData, ...data.data];
        const newA = _.uniqBy(newArr, "_id");
        //console.log(singleTemplateData.template.position, "new");
        return newA;
      });
    }
  }, [data, templateData]);

  useEffect(() => {
    console.log("useeffect run");
    if (data) {
      setUsers(data.data);
    }
    if (unmappedCalData) {
      setunmappedEmpDatum(unmappedCalData.data);
    }
  }, [data, unmappedCalData]);

  const handleOnCheck = (e: any) => {
    setnavPrompt(true);
    const { name, checked } = e.target;
    console.log(name, checked, "namechecked");
    setChanged(true);
    //setOpen1(true);
    setMappedName(name);
    setMappedChecked(checked);
    //refetch();
    if (checked == false) {
      if (name === "allSelect") {
        const tempUser = users.map((employee: any) => {
          return { ...employee, isChecked: false };
        });
        setUsers(tempUser);
        const mappDataUser = mappData.map((employee: any) => {
          return employee._id === checkname
            ? { ...employee, isChecked: isitchecked }
            : employee;
        });
        setmappData(mappDataUser);
      } else {
        const tempUser = users.map((employee: any) => {
          return employee._id === name
            ? { ...employee, isChecked: checked }
            : employee;
        });
        setUsers(tempUser);
        console.log(tempUser, "temp");
      }
    } else if (checked == true) {
      if (data && templateData) {
        setUsers((prev: any) => {
          const newArr = [...templateData, ...data?.data];
          const newA = _.uniqBy(newArr, "_id");
          //console.log(singleTemplateData.template.position, "new");
          return newA;
        });

        setmappData((prev: any) => {
          const newArr = [...templateData, ...mappData];
          const newA = _.uniqBy(newArr, "_id");
          //console.log(singleTemplateData.template.position, "new");
          return newA;
        });
      }
    }
    //handleAgree1(e);
    // if (name === "allSelect") {
    //   const tempUser = users.map((employee: any) => {
    //     return { ...employee, isChecked: checked };
    //   });
    //   setUsers(tempUser);
    // } else {
    //   const tempUser = users.map((employee: any) => {
    //     return employee._id === name
    //       ? { ...employee, isChecked: checked }
    //       : employee;
    //   });
    //   setUsers(tempUser);
    //   console.log(tempUser, "temp");
    // }
  };

  const handleAgree1 = (e: any) => {
    setOpen1(false);
    // refetch();
    if (mappedChecked == false) {
      if (mappedName === "allSelect") {
        const tempUser = users.map((employee: any) => {
          return { ...employee, isChecked: false };
        });
        setUsers(tempUser);
      } else {
        const tempUser = users.map((employee: any) => {
          return employee._id === mappedName
            ? { ...employee, isChecked: mappedChecked }
            : employee;
        });
        setUsers(tempUser);
        console.log(tempUser, "temp");
      }
    } else if (mappedChecked == true) {
      if (data && templateData) {
        setUsers((prev: any) => {
          const newArr = [...templateData, ...data?.data];
          const newA = _.uniqBy(newArr, "_id");
          //console.log(singleTemplateData.template.position, "new");
          return newA;
        });
      }
    }
  };

  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //pagination

  //dialog box - Hari
  const [open, setOpen] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [checkname, setcheckname] = React.useState("");
  const [mappedName, setMappedName] = React.useState("");
  const [isitchecked, setisitchecked] = React.useState<any>(true);
  console.log(agree, "agree");
  const [changed, setChanged] = React.useState<any>(false);
  const [changedAlert, setChangedAlert] = React.useState<any>(false);
  //multiselect
  // const [multiselectDialogOpen, setmultiselectDialogOpen] = React.useState(false);
  // const [blockDialogOpen, setblockDialogOpen] = React.useState(false);
  // const [passname, setpassname] = React.useState('');
  // const [passchecked, setpasschecked] = React.useState<any>(true);
  // const [userinfo, setUserInfo] = useState<any>({
  //   languages: [],
  //   response: [],
  // });
  // console.log(userinfo,'userinfo')
  // const handleopen = () => {
  //   setmultiselectDialogOpen(true)
  // }
  // const handleMultiCheckbox = (e: any) => {
  //   const { name, checked } = e.target;
  //   console.log(name, checked, 'vallllll')
  //   //new
  //   const { languages } = userinfo;
  //   console.log(`${name} is ${checked}`,'valu');
  //   if (checked) {
  //     setUserInfo({
  //       languages:[...languages, name],
  //       response: [...languages, checked],
  //     });
  //   }
  //   else {
  //     setUserInfo({
  //       languages: languages.filter((e:any) => e !== name),
  //       response: languages.filter((e:any) => e !== checked),
  //     });
  //   }
  //   //new
  //   setpassname(name)
  //   setpasschecked(checked)
  //   setnavPrompt(true);
  //   setChanged(true)
  // };

  //multiselect
  // console.log(checkname,isitchecked, "state");
  //multiselect
  // const acceptSave = (e: any) => {
  //   const tempUser = users.map((employee: any) => {
  //     console.log(passname,passchecked,'vallll')
  //       return employee._id === passname
  //         ? { ...employee, isChecked: passchecked }
  //         : employee;
  //     });
  //     setUsers(tempUser);
  //     console.log(tempUser, "temp");
  //     setpassname('');
  //     setpasschecked('');
  //     setmultiselectDialogOpen(false);
  // };
  // console.log(passname,passchecked,'vallll')
  // const handlemultiselectDialogClose = () => {
  //   setmultiselectDialogOpen(false);
  //   // setAgree(false);
  // };
  //multiselect
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAgree = (e: any) => {
    setAgree(true);

    console.log(checkname, isitchecked, "state");

    let filteredUsersID = users
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    }).filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j.isSupervisor != true;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
      .map((j: any) => j.employee_code);
    if (unMappedEmployees) {
      if (checkname === "allSelect") {
        const tempUser = users.map((employee: any) => {
          return filteredUsersID.includes(employee.employee_code)
            ? { ...employee, isChecked: isitchecked }
            : employee;
        });
        setUsers(tempUser);
      } else {
        const tempUser = users.map((employee: any) => {
          return employee._id === checkname
            ? { ...employee, isChecked: isitchecked }
            : employee;
        });
        setUsers(tempUser);
        console.log(tempUser, "temp");
        const unmappDataUser = unmappData.map((employee: any) => {
          return employee._id === checkname
            ? { ...employee, isChecked: isitchecked }
            : employee;
        });
        setunmappData(unmappDataUser);
      }
      handleClose();
    } else if (checkname === "allSelect") {
      const tempUser = users.map((employee: any) => {
        return { ...employee, isChecked: isitchecked };
      });
      setUsers(tempUser);
      handleClose();
    } else {
      const tempUser = users.map((employee: any) => {
        return employee._id === checkname
          ? { ...employee, isChecked: isitchecked }
          : employee;
      });
      setUsers(tempUser);
      const mappDataUser = mappData.map((employee: any) => {
        return employee._id === checkname
          ? { ...employee, isChecked: isitchecked }
          : employee;
      });
      setmappData(mappDataUser);
      console.log(tempUser, "temp");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAgree(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOnCheckselectedData = (e: any) => {
    setnavPrompt(true);
    const { name, checked } = e.target;
    console.log(name, checked, 'name, checked')
    //setOpen(true);
    setcheckname(name);
    setisitchecked(checked);
    setChanged(true);

    let filteredUsersMapp = mappData?.filter((j: any) => {
      if (employeeName === "None" || employeeName === "") {
        return j;
      } else {
        return j.legal_full_name
          .toLocaleLowerCase()
          .includes(employeeName.toLocaleLowerCase());
      }
    })
      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
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
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j.isSupervisor != true;
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
        // console.log(j["sub section"], "employeesection");
        if (
          empsubSections === "None" ||
          empsubSections === ""
        ) {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase()
            .includes(empsubSections.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (managerCode === "None" || managerCode === "") {
          return j;
        } else {
          return j.manager_code
            .toLocaleLowerCase()
            .includes(managerCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (managerName === "None" || managerName === "") {
          // console.log(j.manager_name, "name");
          return j;
        } else {
          return j.manager_name
            .toLocaleLowerCase()
            .includes(managerName.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (workLocation === "None" || workLocation === "") {
          return j;
        } else {
          return j.work_location
            .toLocaleLowerCase()
            .includes(workLocation.toLocaleLowerCase());
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
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName !== ""){
          if (searchName == "SP") {
            return j?.name?.isSupervisor == true;
          }else if (searchName == "N-SP") {
              return j?.name?.isSupervisor != true;
            }
        }
      })

    let filteredusers = users?.filter((j: any) => {
      if (employeeName === "None" || employeeName === "") {
        return j;
      } else {
        return j.legal_full_name
          .toLocaleLowerCase()
          .includes(employeeName.toLocaleLowerCase());
      }
    })
      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (positions === "None" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
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
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "SP") {
          return j.isSupervisor === true;
        } else if (sNS === "N-SP") {
          return j.isSupervisor != true;
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
        // console.log(j["sub section"], "employeesection");
        if (
          empsubSections === "None" ||
          empsubSections === ""
        ) {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase()
            .includes(empsubSections.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (managerCode === "None" || managerCode === "") {
          return j;
        } else {
          return j.manager_code
            .toLocaleLowerCase()
            .includes(managerCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (managerName === "None" || managerName === "") {
          // console.log(j.manager_name, "name");
          return j;
        } else {
          return j.manager_name
            .toLocaleLowerCase()
            .includes(managerName.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (workLocation === "None" || workLocation === "") {
          return j;
        } else {
          return j.work_location
            .toLocaleLowerCase()
            .includes(workLocation.toLocaleLowerCase());
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
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName !== ""){
          if (searchName == "SP") {
            return j?.name?.isSupervisor == true;
          }else if (searchName == "N-SP") {
              return j?.name?.isSupervisor != true;
            }
        }
      })
    console.log(name, checked, 'alllselect')
    if (name === "allSelect") {
      // const tempUser = users.map((employee: any) => {
      //   return filteredusers.includes(employee.employee_code)
      //     ? { ...employee, isChecked: checked }
      //     : employee;
      // });
      // setUsers(tempUser);
      // const mappDataUser = mappData.map((employee: any) => {
      //   return filteredUsersMapp.includes(employee.employee_code)
      //     ? { ...employee, isChecked: checked }
      //     : employee;
      // });
      // setmappData(mappDataUser);
      refetch();
      const tempUser = users.map((employee: any) => {
        return { ...employee, isChecked: checked };
      });
      setUsers(tempUser);
      const mappDataUser = mappData.map((employee: any) => {
        return { ...employee, isChecked: checked };
      });
      setmappData(mappDataUser);
    } else {
      const tempUser = users.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      console.log(tempUser, 'tempUser')
      setUsers(tempUser);
      const mappDataUser = mappData.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setmappData(mappDataUser);
      //handleAgree(e);
    }
  };
  //state for all employees options to filter
  const [functionArrayAll, setfunctionArrayAll] = React.useState<any>([]);
  const [appraiserArrayAll, setappraiserArrayAll] = React.useState<any>([]);
  const [reviewerArrayAll, setreviewerArrayAll] = React.useState<any>([]);
  const [normalizerArrayAll, setnormalizerArrayAll] = React.useState<any>([]);
  const [sectionArrayAll, setsectionArrayAll] = React.useState<any>([]);
  const [probationStatusArrayAll, setprobationStatusArrayAll] = React.useState<any>([]);

  const [GradeFilterAll, setGradeFilterAll] = React.useState<string[]>([]);
  const [gradesArrayAll, setgradesArrayAll] = React.useState<any>([]);
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);

  const [positionsFilterAll, setpositionsFilterAll] = React.useState<string[]>([]);
  const [positionArrayAll, setpositionArrayAll] = React.useState<any>([]);
  const [gradesArrayU, setgradesArrayU] = React.useState<any>([]);
  const [positionArrayU, setpositionArrayU] = React.useState<any>([]);
  const [positionsFilterU, setpositionsFilterU] = React.useState<string[]>([]);
  const [GradesFilterU, setGradesFilterU] = React.useState<string[]>([]);
  const isAllGradesFilterU =
  gradesArrayU?.length > 0 && GradesFilterU?.length === gradesArrayU?.length;
const newsectionU = gradesArrayU?.length == GradesFilterU?.length
const handleChangeSelectGradesU = (event: any) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    console.log((GradesFilterU?.length === gradesArrayU?.length ? [] : "select all"), "newwwwww")
    setGradesFilterU(GradesFilterU?.length === gradesArrayU?.length ? [] : gradesArray);
    return;
  }
  setGradesFilterU(value);
  setPage(0);
};
const isAllpositionsFilterU =
  positionArrayU?.length > 0 && positionsFilterU?.length === positionArrayU?.length;


  const handleChangeSelectPositionsU = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      console.log((positionsFilterU?.length === positionArrayU?.length ? [] : "select all"), "newwwwww")

      setpositionsFilterU(positionsFilterU?.length === positionArrayU?.length ? [] : positionArrayU);
      return;
    }
    setpositionsFilterU(value);
    setPage(0);
  };

  const isAllpositionsFilterAll =
  positionArrayAll?.length > 0 && positionsFilterAll?.length === positionArrayAll?.length;

const handleChangeSelectPositionsAll = (event: any) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    // console.log((positionsFilterAll?.length === positionArray?.length ? [] : "select all"),"newwwwww")

    setpositionsFilterAll(positionsFilterAll?.length === positionArrayAll?.length ? [] : positionArrayAll);
    return;
  }
  setpositionsFilterAll(value);
  setPage(0);
};

const isAllGradesFilterAll =
    gradesArrayAll?.length > 0 && GradeFilterAll?.length === gradesArrayAll?.length;
  const newsectionAll = gradesArrayAll?.length == GradeFilterAll?.length
  const handleChangeSelectGradesAll = (event: any) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      // console.log((GradeFilterAll?.length === gradesArray?.length ? [] : "select all"),"newwwwww") 
      setGradeFilterAll(GradeFilterAll?.length === gradesArrayAll?.length ? [] : gradesArrayAll);
      return;
    }
    setGradeFilterAll(value);
    setPage(0);
  };



  useEffect(()=>{
    let grades = allEmployees

    ?.slice()
    ?.sort(function (a: any, b: any) {

      return a?.grade - b?.grade;

    })
    // .filter((item: any) => {
    //   return item?.isChecked === true;
    // })
    .map((i: any) => {
      return i?.grade;
    });
    if (positionsFilterAll.length > 0) {
      grades = allEmployees
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade - b?.grade;
        })
        ?.filter((i: any) => {
          return !!positionsFilterAll?.find(item2 => i?.position_long_description === item2)
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
      // search functionality based on grade
      else if (searchNameAll?.length > 0) {
        grades = allEmployees
          .slice()
          ?.sort(function (a: any, b: any) {
            return a?.grade?.localeCompare(
              b?.grade
            );
          })
          ?.filter((i: any) => {
            if (searchNameAll.length > 0) {
              const searchTerms = searchNameAll.toLowerCase().split(" ");
              return searchTerms.every(term =>
                i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || searchTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.legal_full_name?.toLowerCase().includes(term)
            )
            || searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.probation_status?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.function?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.appraiser_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.reviewer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.normalizer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
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
    const gradeContents = grades.filter((c: any, index: any) => {
      return grades?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArrayAll(gradeContents);
    let positionAll = allEmployees
    .slice()
    ?.sort(function (a: any, b: any) {
      return a?.position_long_description?.localeCompare(b?.position_long_description);
    })
    .map((i: any) => {
      return i?.position_long_description;
    });
// GradeFilterAll
// GradeFilter
if (GradeFilterAll?.length > 0) {
positionAll = allEmployees
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.position_long_description - b?.position_long_description;
  })
  ?.filter((i: any) => {
    return !!GradeFilterAll?.find(item2 => i?.grade === item2)
  })
  ?.map((i: any) => {
    return i?.position_long_description;
  });
}

 // search functionality based on position or all employees
 else if (searchNameAll?.length > 0) {
  positionAll = allEmployees
    .slice()
    ?.sort(function (a: any, b: any) {
      return a?.position_long_description?.localeCompare(
        b?.position_long_description
      );
    })
    ?.filter((i: any) => {
      if (searchNameAll.length > 0) {
        const searchTerms = searchNameAll.toLowerCase().split(" ");
        return searchTerms.every(term =>
          i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || searchTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.legal_full_name?.toLowerCase().includes(term)
            )
            || searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.probation_status?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.function?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.appraiser_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.reviewer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.normalizer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
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
const positionContents = positionAll.filter((c: any, index: any) => {
  return positionAll.indexOf(c) === index && c != null && c != undefined;
});
// searchNameAll
setpositionArrayAll(positionContents);


//Function
let functionDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.function?.localeCompare(b?.function);
})
.map((i: any) => {
  return i?.function;
});

 if (searchNameAll?.length > 0) {
  functionDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.function?.localeCompare(
    b?.function
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.function;
});
}
const functionDataAllContents = functionDataAll.filter((c: any, index: any) => {
return functionDataAll.indexOf(c) === index && c != null && c != undefined;
});
setfunctionArrayAll(functionDataAllContents)
//Appraiser Name
let appraiserNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.appraiser_name?.localeCompare(b?.appraiser_name);
})
.map((i: any) => {
  return i?.appraiser_name;
});

 if (searchNameAll?.length > 0) {
  appraiserNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.appraiser_name?.localeCompare(
    b?.appraiser_name
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.appraiser_name;
});
}
const appraiserNameDataAllContents = appraiserNameDataAll.filter((c: any, index: any) => {
return appraiserNameDataAll.indexOf(c) === index && c != null && c != undefined;
});
setappraiserArrayAll(appraiserNameDataAllContents)
//reviewer name
let reviewerNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.reviewer_name?.localeCompare(b?.reviewer_name);
})
.map((i: any) => {
  return i?.reviewer_name;
});

 if (searchNameAll?.length > 0) {
  reviewerNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.reviewer_name?.localeCompare(
    b?.reviewer_name
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.reviewer_name;
});
}
const reviewerNameDataAllContents = reviewerNameDataAll.filter((c: any, index: any) => {
return reviewerNameDataAll.indexOf(c) === index && c != null && c != undefined;
});
setreviewerArrayAll(reviewerNameDataAllContents)
//normalizer name
let normalizerNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.normalizer_name?.localeCompare(b?.normalizer_name);
})
.map((i: any) => {
  return i?.normalizer_name;
});

 if (searchNameAll?.length > 0) {
  normalizerNameDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.normalizer_name?.localeCompare(
    b?.normalizer_name
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.normalizer_name;
});
}
const normalizerNameDataAllContents = normalizerNameDataAll.filter((c: any, index: any) => {
return normalizerNameDataAll.indexOf(c) === index && c != null && c != undefined;
});
setnormalizerArrayAll(normalizerNameDataAllContents)
//section
let sectionDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.section?.localeCompare(b?.section);
})
.map((i: any) => {
  return i?.section;
});

 if (searchNameAll?.length > 0) {
  sectionDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.section?.localeCompare(
    b?.section
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.section;
});
}
const sectionDataAllContents = sectionDataAll.filter((c: any, index: any) => {
return sectionDataAll.indexOf(c) === index && c != null && c != undefined;
});
setsectionArrayAll(sectionDataAllContents)
//probation status
let probationStatusDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.probation_status?.localeCompare(b?.probation_status);
})
.map((i: any) => {
  return i?.probation_status;
});

 if (searchNameAll?.length > 0) {
  probationStatusDataAll = allEmployees
.slice()
?.sort(function (a: any, b: any) {
  return a?.probation_status?.localeCompare(
    b?.probation_status
  );
})
?.filter((i: any) => {
  if (searchNameAll.length > 0) {
    const searchTerms = searchNameAll.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.position_long_description
            ?.toLowerCase()
            .includes(term)
        ) || searchTerms.every(term =>
          i?.grade?.toLowerCase().includes(term)
        ) || searchTerms.every(term =>
          i?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
        || searchTerms.every(term =>
          i?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.normalizer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.legal_full_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
})
?.map((i: any) => {
  return i?.probation_status;
});
}
const probationStatusDataAllContents = probationStatusDataAll.filter((c: any, index: any) => {
return probationStatusDataAll.indexOf(c) === index && c != null && c != undefined;
});
setprobationStatusArrayAll(probationStatusDataAllContents)
  },[allEmployees,positionsFilterAll,GradeFilterAll,searchNameAll])
  const [AppName, setAppName] = React.useState("");
  const [anchorElnewserviceAppName, setAnchorElnewserviceAppName] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceAppName = Boolean(anchorElnewserviceAppName);
  const handleClickserviceAppName = (event: React.MouseEvent<HTMLElement>) => {
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
  const [AppName1, setAppName1] = React.useState("");
  const [anchorElnewserviceAppName1, setAnchorElnewserviceAppName1] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceAppName1 = Boolean(anchorElnewserviceAppName1);
  const handleClickserviceAppName1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceAppName1(event.currentTarget);
  };
  const handleCloseserviceAppName1 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceAppName1(null);
  };
  const handleTargetserviceAppName1 = (event: any) => {

    setAppName1(event?.target?.getAttribute("value"));


    setAnchorElnewserviceAppName1(null);
    setPage(0);
  };
  const [AppName2, setAppName2] = React.useState("");
  const [anchorElnewserviceAppName2, setAnchorElnewserviceAppName2] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceAppName2 = Boolean(anchorElnewserviceAppName2);
  const handleClickserviceAppName2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceAppName2(event.currentTarget);
  };
  const handleCloseserviceAppName2 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceAppName2(null);
  };
  const handleTargetserviceAppName2 = (event: any) => {

    setAppName2(event?.target?.getAttribute("value"));


    setAnchorElnewserviceAppName2(null);
    setPage(0);
  };
  //appraiser Filter
  //reviewer Filter
  const [RevName, setRevName] = React.useState("");
  const [anchorElnewserviceRevName, setAnchorElnewserviceRevName] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceRevName = Boolean(anchorElnewserviceRevName);
  const handleClickserviceRevName = (event: React.MouseEvent<HTMLElement>) => {
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
  const [RevName1, setRevName1] = React.useState("");
  const [anchorElnewserviceRevName1, setAnchorElnewserviceRevName1] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceRevName1 = Boolean(anchorElnewserviceRevName1);
  const handleClickserviceRevName1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRevName1(event.currentTarget);
  };
  const handleCloseserviceRevName1 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceRevName1(null);
  };
  const handleTargetserviceRevName1 = (event: any) => {

    setRevName1(event?.target?.getAttribute("value"));


    setAnchorElnewserviceRevName1(null);
    setPage(0);
  };
  const [RevName2, setRevName2] = React.useState("");
  const [anchorElnewserviceRevName2, setAnchorElnewserviceRevName2] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceRevName2 = Boolean(anchorElnewserviceRevName2);
  const handleClickserviceRevName2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceRevName2(event.currentTarget);
  };
  const handleCloseserviceRevName2 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceRevName2(null);
  };
  const handleTargetserviceRevName2 = (event: any) => {

    setRevName2(event?.target?.getAttribute("value"));


    setAnchorElnewserviceRevName2(null);
    setPage(0);
  };
  //reviewer Filter
  //Normalizer filter
  const [norName, setNorName] = React.useState("");
  const [anchorElnewserviceNorName, setAnchorElnewserviceNorName] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceNorName = Boolean(anchorElnewserviceNorName);
  const handleClickserviceNorName = (event: React.MouseEvent<HTMLElement>) => {
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
  const [norName1, setNorName1] = React.useState("");
  const [anchorElnewserviceNorName1, setAnchorElnewserviceNorName1] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceNorName1 = Boolean(anchorElnewserviceNorName1);
  const handleClickserviceNorName1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceNorName1(event.currentTarget);
  };
  const handleCloseserviceNorName1 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceNorName1(null);
  };
  const handleTargetserviceNorName1 = (event: any) => {

    setNorName1(event?.target?.getAttribute("value"));


    setAnchorElnewserviceNorName1(null);
    setPage(0);
  };
  const [norName2, setNorName2] = React.useState("");
  const [anchorElnewserviceNorName2, setAnchorElnewserviceNorName2] = React.useState<null | HTMLElement>(
    null
  );
  const openserviceNorName2 = Boolean(anchorElnewserviceNorName2);
  const handleClickserviceNorName2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewserviceNorName2(event.currentTarget);
  };
  const handleCloseserviceNorName2 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewserviceNorName2(null);
  };
  const handleTargetserviceNorName2 = (event: any) => {

    setNorName2(event?.target?.getAttribute("value"));


    setAnchorElnewserviceNorName2(null);
    setPage(0);
  };
  const handleOnCheckselectedDataUnmapped = (e: any) => {
    setnavPrompt(true);
    const { name, checked } = e.target;
    console.log(name, checked, 'name, checked,un')
    //setOpen(true);
    setcheckname(name);
    setisitchecked(checked);
    setunMappedEmployees(true);
    setChanged(true);
    //handleAgree(e);


    
    let filteredUsersIDunmapp = unmappData
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      .filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j.isSupervisor != true;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
        }
      })
      .filter((item1: any) => {
        if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
          return item1;
        } else {
          return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
          return item1;
        } else {
          return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
      .map((j: any) => j.employee_code);

    let filteredUsersID = users
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      .filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j.isSupervisor != true;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
        }
      })
      .filter((item1: any) => {
        if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
          return item1;
        } else {
          return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
          return item1;
        } else {
          return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
      .map((j: any) => j.employee_code);

    if (name === "allSelect") {
      const tempUser = users.map((employee: any) => {
        return filteredUsersID.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setUsers(tempUser);
      const unmappDataUser = unmappData.map((employee: any) => {
        return filteredUsersIDunmapp.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setunmappData(unmappDataUser);
    } else {
      const tempUser = users.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      console.log(tempUser, 'tempUserUN')
      setUsers(tempUser);
      const unmappDataUser = unmappData.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setunmappData(unmappDataUser);
    }
    handleClose();

    // const tempUser = users.map((employee: any) => {
    //   return employee._id === name
    //     ? { ...employee, isChecked: checked }
    //     : employee;
    // });
    // console.log(tempUser,'tempUserUN')
    // setUsers(tempUser);
    // const unmappDataUser = unmappData.map((employee: any) => {
    //   return employee._id === name
    //     ? { ...employee, isChecked: checked }
    //     : employee;
    // });
    // setunmappData(unmappDataUser);
  };
  // const onSubmitP = (data: any) => {
  //   checkedTemplatesID.forEach((element: any) => {
  //     createPosition(
  //       {
  //         position: data.position,
  //         id: element.name
  //       }
  //     ).then((data: any) => console.log(data, 'ctdata'))
  //   });
  // }
  const onSubmitP = (data: any) => {
    // createPosition({
    //   position: data.position,
    //   id: id,
    // }).then((data: any) => console.log(data, "ctdata"));
    createMappedPositions({
      employee: data.position,
      id: id,
    })
  };
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
  const [ProbationStatus1, setProbationStatus1] = React.useState("");
  const [ProbationStatusVal1, setProbationStatusVal1] = React.useState<null | HTMLElement>(
    null
  );
  const openProbationStatusVal1 = Boolean(ProbationStatusVal1);
  const handleClickProbationStatus1 = (event: React.MouseEvent<HTMLElement>) => {
    setProbationStatusVal1(event.currentTarget);
  };
  const handleCloseProbationStatus1 = (event: React.MouseEvent<HTMLElement>) => {

    setProbationStatusVal1(null);
  };
  const handleTargetProbationStatus1 = (event: any) => {

    setProbationStatus1(event?.target?.getAttribute("value"));


    setProbationStatusVal1(null);
    setPage(0);
  };
  const [ProbationStatus2, setProbationStatus2] = React.useState("");
  const [ProbationStatusVal2, setProbationStatusVal2] = React.useState<null | HTMLElement>(
    null
  );
  const openProbationStatusVal2 = Boolean(ProbationStatusVal2);
  const handleClickProbationStatus2 = (event: React.MouseEvent<HTMLElement>) => {
    setProbationStatusVal2(event.currentTarget);
  };
  const handleCloseProbationStatus2 = (event: React.MouseEvent<HTMLElement>) => {

    setProbationStatusVal2(null);
  };
  const handleTargetProbationStatus2 = (event: any) => {

    setProbationStatus2(event?.target?.getAttribute("value"));


    setProbationStatusVal2(null);
    setPage(0);
  };
  React.useEffect(() => {
    if (ProbationStatus === "None" || ProbationStatus === "") {
      setIcon51(false);
    } else {
      setIcon51(true);
    }
    if (ProbationStatus1 === "None" || ProbationStatus1 === "") {
      setIcon52(false);
    } else {
      setIcon52(true);
    }
    if (ProbationStatus2 === "None" || ProbationStatus2 === "") {
      setIcon53(false);
    } else {
      setIcon53(true);
    }
  }, [ProbationStatus,ProbationStatus1,ProbationStatus2]);
  //Probation status 
  const [icon51, setIcon51] = React.useState<any>([]);
  const [icon52, setIcon52] = React.useState<any>([]);
  const [icon53, setIcon53] = React.useState<any>([]);

    const [icon21, setIcon21] = React.useState<any>([]);
    const [icon31, setIcon31] = React.useState<any>([]);
    const [icon41, setIcon41] = React.useState<any>([]);
    const [icon22, setIcon22] = React.useState<any>([]);
    const [icon32, setIcon32] = React.useState<any>([]);
    const [icon42, setIcon42] = React.useState<any>([]);
    const [icon23, setIcon23] = React.useState<any>([]);
    const [icon33, setIcon33] = React.useState<any>([]);
    const [icon43, setIcon43] = React.useState<any>([]);
  React.useEffect(() => {
    if (AppName === "None" || AppName === "") {
      setIcon21(false);
    } else {
      setIcon21(true);
    }
    if (AppName1 === "None" || AppName1 === "") {
      setIcon22(false);
    } else {
      setIcon22(true);
    }
    if (AppName2 === "None" || AppName2 === "") {
      setIcon23(false);
    } else {
      setIcon23(true);
    }
  }, [AppName,AppName1,AppName2]);
  React.useEffect(() => {
    if (RevName === "None" || RevName === "") {
      setIcon31(false);
    } else {
      setIcon31(true);
    }
    if (RevName1 === "None" || RevName1 === "") {
      setIcon32(false);
    } else {
      setIcon32(true);
    }
     if (RevName2 === "None" || RevName2 === "") {
      setIcon33(false);
    } else {
      setIcon33(true);
    }
  }, [RevName,RevName1,RevName2]);
    React.useEffect(() => {
    if (norName === "None" || norName === "") {
      setIcon41(false);
    } else {
      setIcon41(true);
    }
    if (norName1 === "None" || norName1 === "") {
      setIcon42(false);
    } else {
      setIcon42(true);
    }
    if (norName2 === "None" || norName2 === "") {
      setIcon43(false);
    } else {
      setIcon43(true);
    }
  }, [norName,norName2,norName1]);
  const hideAlertHandler = () => {
    if (changed === true) {
      setHideAlert(true);

      setTimeout(() => {
        setHideAlert(false);
      }, 3000);
    } else if (changed === false) {
      setChangedAlert(true);
      setTimeout(() => {
        setChangedAlert(false);
      }, 3000);
    }
  };

  const selectOneError = (i: any) => {
    setSave1(true);
    hideAlertHandler();
    setChanged(false);
    setnavPrompt(false);
    // if (i && i.length === 0) {
    //   setErrors(true)
    //   setSave1(false)

    // } else if (i && i.length > 0) {
    //   setErrors(false);
    //   setSave1(true)
    //   setHideAlert(true)
    //   hideAlertHandler()
    //   // setTabs(tab + 1);
    //   console.log(error, 'save')
    // }
    // else {
    //   setSave1(false)

    // }
    console.log(i, "setSelectedUser");
  };
  console.log(employee, "temp");
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
          isChecked: i.isChecked,
        };
      });
      return check;
    }
  };

  //states for filtering
  const [employeeName, setemployeeName] = React.useState("");
  //console.log(employeeName, "position");
  const handleChangeemployeeName = (event: SelectChangeEvent) => {
    setemployeeName(event.target.value);
  };
  const [employeeNameAll, setemployeeNameAll] = React.useState("");
  //console.log(employeeName, "position");
  const handleChangeemployeeNameAll = (event: SelectChangeEvent) => {
    setemployeeNameAll(event.target.value);
  };
  const [employeeNameOther, setemployeeNameOther] = React.useState("");
  //console.log(employeeNameOther, "employeeNameOther");
  const handleChangeemployeeNameOther = (event: SelectChangeEvent) => {
    setemployeeNameOther(event.target.value);
  };
  const [employeeCode, setemployeeCode] = React.useState("");
  // console.log(employeeCode, "employeeCode");
  const handleChangeemployeeCode = (event: SelectChangeEvent) => {
    setemployeeCode(event.target.value);
  };
  const [employeeCodeOther, setemployeeCodeOther] = React.useState("");
  //console.log(employeeCodeOther, "employeeCodeOther");
  const handleChangeemployeeCodeOther = (event: SelectChangeEvent) => {
    setemployeeCodeOther(event.target.value);
  };
  const [employeeCodeAll, setemployeeCodeAll] = React.useState("");
  //console.log(employeeCodeOther, "employeeCodeOther");
  const handleChangeemployeeCodeAll = (event: SelectChangeEvent) => {
    setemployeeCodeAll(event.target.value);
  };
  const [templateAll, setTemplateAll] = React.useState("");
  //console.log(employeeCodeOther, "employeeCodeOther");
  const handleChangeTemplateAll = (event: SelectChangeEvent) => {
    setTemplateAll(event.target.value);
  };
  const [positions, setPositions] = React.useState("");
  //console.log(positions, "position");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };

  const [positionsother, setPositionsother] = React.useState("");
  // console.log(positionsother, "position");
  const handleChangepositionother = (event: SelectChangeEvent) => {
    setPositionsother(event.target.value);
  };
  const [positionsAll, setPositionsAll] = React.useState("");
  // console.log(positionsother, "position");
  const handleChangepositionAll = (event: SelectChangeEvent) => {
    setPositionsAll(event.target.value);
  };

  const [empgrades, setempGrades] = React.useState("");
  //console.log(empgrades, "position");
  const handleChangegrades = (event: SelectChangeEvent) => {
    setempGrades(event.target.value);
  };
  const [empgradesother, setempGradesother] = React.useState("");
  //console.log(empgradesother, "position");
  const handleChangegradesother = (event: SelectChangeEvent) => {
    setempGradesother(event.target.value);
  };
  const [empgradesAll, setempGradesAll] = React.useState("");
  //console.log(empgradesother, "position");
  const handleChangegradesAll = (event: SelectChangeEvent) => {
    setempGradesAll(event.target.value);
  };
  const [empdivisions, setempdivisions] = React.useState("");
  //console.log(empdivisions, "division");
  const handleChangedivisions = (event: SelectChangeEvent) => {
    setempdivisions(event.target.value);
  };
  const [empdivisionsOther, setempdivisionsOther] = React.useState("");
  //console.log(empdivisionsOther, "divisionOther");
  const handleChangedivisionsOther = (event: SelectChangeEvent) => {
    setempdivisionsOther(event.target.value);
  };
  const [empdivisionsAll, setempdivisionsAll] = React.useState("");
  //console.log(empdivisionsOther, "divisionOther");
  const handleChangedivisionsAll = (event: SelectChangeEvent) => {
    setempdivisionsAll(event.target.value);
  };
  const [empsections, setempsections] = React.useState("");
  //console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
  };
  const [empsectionsother, setempsectionsother] = React.useState("");
  //console.log(empsectionsother, "position");
  const handleChangesectionsother = (event: SelectChangeEvent) => {
    setempsectionsother(event.target.value);
  };
  const [empsectionsAll, setempsectionsAll] = React.useState("");
  //console.log(empsectionsother, "position");
  const handleChangesectionsAll = (event: SelectChangeEvent) => {
    setempsectionsAll(event.target.value);
  };
  const [empSubSection, setempSubSection] = React.useState("");
  // console.log(empSubSection, "position");
  const handleChangeSubSection = (event: SelectChangeEvent) => {
    setempSubSection(event.target.value);
  };
  const [empFunction, setempFunction] = React.useState("");
  // console.log(empFunction, "position");
  const handleChangeFunction = (event: SelectChangeEvent) => {
    setempFunction(event.target.value);
  };
  const [empFunctionother, setempFunctionother] = React.useState("");
  // console.log(empFunction, "position");
  const handleChangeFunctionother = (event: SelectChangeEvent) => {
    setempFunctionother(event.target.value);
  };
  const [empFunctionAll, setempFunctionAll] = React.useState("");
  // console.log(empFunction, "position");
  const handleChangeFunctionAll = (event: SelectChangeEvent) => {
    setempFunctionAll(event.target.value);
  };
  const [sNS, setsNS] = React.useState("");
  //console.log(sNS, "sNS");
  const handleChangesNS = (event: SelectChangeEvent) => {
    setsNS(event.target.value);
  };
  const [sNSOther, setsNSOther] = React.useState("");
  console.log(sNSOther, "sNSOther");
  const handleChangesNSOther = (event: SelectChangeEvent) => {
    setsNSOther(event.target.value);
  };
  const [sNSAll, setsNSAll] = React.useState("");
  console.log(sNSAll, "sNSAll");
  const handleChangesNSAll = (event: SelectChangeEvent) => {
    setsNSAll(event.target.value);
  };
  const [empsubSections, setempsubSections] = React.useState("");
  //console.log(empsubSections, "empsubSections");
  const handleChangeempsubSections = (event: SelectChangeEvent) => {
    setempsubSections(event.target.value);
  };
  const [empsubSectionsOther, setempsubSectionsOther] = React.useState("");
  //console.log(empsubSectionsOther, "empsubSectionsOther");
  const handleChangeempsubSectionsOther = (event: SelectChangeEvent) => {
    setempsubSectionsOther(event.target.value);
  };
  const [empsubSectionsAll, setempsubSectionsAll] = React.useState("");
  //console.log(empsubSectionsOther, "empsubSectionsOther");
  const handleChangeempsubSectionsAll = (event: SelectChangeEvent) => {
    setempsubSectionsAll(event.target.value);
  };
  const [managerName, setmanagerName] = React.useState("");
  //console.log(managerName, "managerName");
  const handleChangemanagerName = (event: SelectChangeEvent) => {
    setmanagerName(event.target.value);
  };
  const [managerNameOther, setmanagerNameOther] = React.useState("");
  //console.log(managerNameOther, "managerNameOther");
  const handleChangemanagerNameOther = (event: SelectChangeEvent) => {
    setmanagerNameOther(event.target.value);
  };
  const [managerNameAll, setmanagerNameAll] = React.useState("");
  //console.log(managerNameOther, "managerNameOther");
  const handleChangemanagerNameAll = (event: SelectChangeEvent) => {
    setmanagerNameAll(event.target.value);
  };
  const [managerCode, setmanagerCode] = React.useState("");
  //console.log(managerCode, "managerCode");
  const handleChangemanagerCode = (event: SelectChangeEvent) => {
    setmanagerCode(event.target.value);
  };
  const [managerCodeOther, setmanagerCodeOther] = React.useState("");
  //console.log(managerCodeOther, "managerCodeOther");
  const handleChangemanagerCodeOther = (event: SelectChangeEvent) => {
    setmanagerCodeOther(event.target.value);
  };
  const [managerCodeAll, setmanagerCodeAll] = React.useState("");
  //console.log(managerCodeOther, "managerCodeOther");
  const handleChangemanagerCodeAll = (event: SelectChangeEvent) => {
    setmanagerCodeAll(event.target.value);
  };
  const [functionData, setfunctionData] = React.useState("");
  //console.log(functionData, "functionData");
  const handleChangefunctionData = (event: SelectChangeEvent) => {
    setfunctionData(event.target.value);
  };
  const [functionDataAll, setfunctionDataAll] = React.useState("");
  //console.log(functionData, "functionData");
  const handleChangefunctionDataAll = (event: SelectChangeEvent) => {
    setfunctionDataAll(event.target.value);
  };
  const [roleCategory, setRoleCategory] = React.useState("");
  const handleChangeRoleCategory = (event: SelectChangeEvent) => {
    setRoleCategory(event.target.value);
  };
  const [roleCategoryOther, setRoleCategoryOther] = React.useState("");
  const handleChangeRoleCategoryOther = (event: SelectChangeEvent) => {
    setRoleCategoryOther(event.target.value);
  };
  const [roleCategoryAll, setRoleCategoryAll] = React.useState("");
  const handleChangeRoleCategoryAll = (event: SelectChangeEvent) => {
    setRoleCategoryAll(event.target.value);
  };
  const [functionDataOther, setfunctionDataOther] = React.useState("");
  //console.log(functionDataOther, "functionDataOther");
  const handleChangefunctionDataOther = (event: SelectChangeEvent) => {
    setfunctionDataOther(event.target.value);
  };
  const [lineManager, setlineManager] = React.useState("");
  //console.log(lineManager, "lineManager");
  const handleChangelineManager = (event: SelectChangeEvent) => {
    setlineManager(event.target.value);
  };
  const [lineManagerOther, setlineManagerOther] = React.useState("");
  //console.log(lineManagerOther, "lineManagerOther");
  const handleChangelineManagerOther = (event: SelectChangeEvent) => {
    setlineManagerOther(event.target.value);
  };
  const [lineManager2, setlineManager2] = React.useState("");
  // console.log(lineManager2, "lineManager2");
  const handleChangelineManager2 = (event: SelectChangeEvent) => {
    setlineManager2(event.target.value);
  };
  const [lineManagerOther2, setlineManagerOther2] = React.useState("");
  //console.log(lineManagerOther2, "lineManagerOther2");
  const handleChangelineManagerOther2 = (event: SelectChangeEvent) => {
    setlineManagerOther2(event.target.value);
  };
  const [workLocation, setworkLocation] = React.useState("");
  //console.log(workLocation, "workLocation");
  const handleChangeworkLocation = (event: SelectChangeEvent) => {
    setworkLocation(event.target.value);
  };
  const [workLocationOther, setworkLocationOther] = React.useState("");
  // console.log(workLocationOther, "workLocationOther");
  const handleChangeworkLocationOther = (event: SelectChangeEvent) => {
    setworkLocationOther(event.target.value);
  };
  const [workLocationAll, setworkLocationAll] = React.useState("");
  // console.log(workLocationOther, "workLocationOther");
  const handleChangeworkLocationAll = (event: SelectChangeEvent) => {
    setworkLocationAll(event.target.value);
  };
  //states for filtering
  const ITEM_HEIGHT = 35;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // maxWidth: 200,
        fontSize: "14px !important",
        fontFamily: "Arial",
        color: "#333333",
      },
    },
  };

  const empnames = [
    "Ahmed J. S. Abdaljawad",
    "Haytham M. M. Alkurdi",
    "Lydiane Kemzeu Dongmo",
    "Yousef Said Sharabati",
  ];
  const empcodes = ["1001", "1002", "1003", "1005", "1006", "1007", "1008"];

  const names = [
    "Accountant I",
    "Accountant II",
    "Administrative Assistant - Sales Support (Retd)",
    "Administration Supervisor I",
    "Administration Officer I",
    "Asst Sales Manager - Export",
    "Application Engineer I",
    "Application & Design Engineer",
    "Application Engineer II",
    "Area Sales Manager - PD & SMEs",
    "Asst. Storekeeper",
    "Area Sales Manager - Projects",
    "Assistant Manager - Product OS",
    "Asst. Technician/Driver - Service",
    "Asst. Manager - Application and Design",
    "Associate",
    "Business Development Manager II",
    "Business Analysis & Sales Planning Manager",
    "Chief Sales Officer II",
    "Collections Officer I",
    "Coordinator - Service",
    "Chief Accountant",
    "Coordinator - Sales Operations",
    "Coordinator - Admin",
    "CSR",
    "Chief Investment Officer",
    "Chief Operating Officer - Marketing & Overseas II",
    "Clearance and Store Coordinator",
    "Coordinator - Service & Installation",
    "Chief Operating Officer - UAE",
    "Coordinator - Parts",
    "Clerk - Sales Operations",
    "Cook",
    "Coordinator - Installation",
    "Continuous Improvement Engineer I",
    "Credit Controller",
    "Call Centre Operator",
    "Collections Officer II",
    "Coordinator - Government Sales",
    "Continuous Improvement Specialist I",
    "Caretaker",
    "Controls Engineer II",
    "Chief People and Capability Officer II",
    "Collection Specialist II",
    "Chief Finance Officer II",
    "Coordinator - Sales Operations (Retd)",
    "Driver - Service",
    "Driver - Warehouse",
    "Draftsman - SO",
    "Driver - Installation",
    "Driver - HGV",
    "Driver - Driver HGV",
    "Director - Morocco Ops",
    "Digital Solutions Business Partner II",
    "Driver - House Staff",
    "Draftsman - Projects",
    "Director - Operations OS",
    "Employee Shared Services Supervisor",
    "ERP Specialist II",
    "ERP Manager",
    "Executive Assistant II",
    "E-commerce and Marketing Manager",
    "Forklift Operator",
    "Foreman - Service",
    "Foreman - Projects",
    "Foreman - Installation",
    "Facilities Technician II",
    "Foreman - Service & Installation",
    "Finance Planning and Analysis Manager I",
    "Government Relations Officer II",
    "Guard - Admin",
    "Head of Finance and Treasury",
    "Head of Business Development II",
    "House Supervisor & Driver",
    "IT Support Engineer I",
    "Logistics Manager",
    "Labourer - Installation",
    "Labourer - Warehouse",
    "Labourer - Parts",
    "Labourer - Service",
    "Logistics Specialist I",
    "Labourer - Service",
    "Labourer - Parts",
    "Logistics Officer - Iraq",
    "Messenger - Admin",
    "Office Boy",
    "Office Girl",
    "Operations Planne",
    "Office Manager - Private Office",
    "Office Manager - HQ",
    "Operations Manager",
    "Product Manager - Applied",
    "Project Operations Manager - UAE",
    "Parts Centre Manager",
    "Product Engineer II",
    "Product Engineer I",
    "Product Engineer I/Trainer",
    "Project Ops Engineer I",
    "Project Operations Administrator",
    "Payroll Controller",
    "Sales Operations Officer II",
    "Senior Sales Executive I - SMEs",
    "Supervisor - House Staff",
    "Storekeeper",
    "Senior Technician  - Service",
    "Senior Sales Engineer II - SMEs",
    "Sales Manager - SMEs",
    "Sr. Sales Engineer I - SMEs",
    "Sales Executive I - IR",
    "Service Centre Manager - UAE",
    "Senior Accountant II",
    "Storekeeper - Parts",
    "Service Centre Supervisor I - DXB/NE",
    "Service Centre Supervisor I - ALN",
    "Service Centre Supervisor I - AUH/BDZ",
    "Sales Engineer II - Government",
    "Sales Executive II - SMEs",
    "Sales Executive II - Goverrnment",
    "Sr. Project Ops Engineer II",
    "Senior Warehouse Manager - UAE",
    "Senior Coordinator - Product",
    "Sr. Coordinator - Fleet Services",
    "Sales Manager - Projects",
    "Senior Team Leader - Service",
    "Senior Manager - Product",
    "Sales Manager - Retail",
    "Sr. Storekeeper - Parts",
    "Sales Director - Iraq",
    "Sales Director - Distribution",
    "Sr. Product Engineer - Applied",
    "Senior Portfolio Manager",
    "Sr. Project Ops Engineer I",
    "Sales Operations Officer I",
    "Senior Team Leader - Sales Operations",
    "Sr. Payroll Officer",
    "Senior Accountant I",
    "Sales Operations Supervisor",
    "Senior Foreman",
    "Senior Sales Engineer I - Projects",
    "Stakeholder Relationship Director",
    "Sales Operations Engineer I",
    "Sales Executive II - IR",
    "Senior Sales Executive I - IR",
    "Sales Director - Projects and SMEs",
    "Service Engineer II - VRF",
    "Senior Team Leader - Call Centre",
    "Senior Showroom Representative",
    "Senior Director - CI, IT & BA",
    "Sr. Specialist  - Business Reporting",
    "Showroom Representative",
    "Sales Engineer II - SMEs",
    "Senior Sales Manager - SMEs",
    "Senior Technician/Driver - VRF",
    "Technical Enterprise Architec",
    "Sr. Employee Relations Specialist",
    "Technician I /Driver - Service",
    "Treasury Officer II",
    "Technician - Installation",
    "Technician/Driver - Installation",
    "Technician I - Service",
    "Technician I - VRF",
    "Technician II - Service",
    "Technician II/Driver - Service",
    "Technician II - VRF",
    "Warehouse Supervisor I",
    "Warehouse Manager I",
    "Technician - Electronics",
    "Application & Design Manager",
    "HR Specialist I",
    "House Maid",
    "Senior Collections Controller",
    "Head of Information Technology II",
    "Business Development Manager I",
    "Personal Assistant - HS",
    "Merchandiser - OR",
    "Market Intelligence Engineer I",
    "Sales Engineer I - SMEs",
    "Jr. Showroom Representative",
    "Merchandiser - IR",
    "Technical Support Manager - CAC",
    "Logistics Supervisor",
    "Visual Merchandisingr Executive II",
    "Sr. Marketing Executive I",
    "Sales Operations Assistant",
    "Junior Sales Operations Engineer",
    "Kitchen Helper",
    "Trainee - Engineering",
    "Senior Sales Engineer II - Gov",
    "Retail Supervisor",
    "Projects and Facilities Supervisor I",
    "Projects Manager - Iraq",
    "Wholesale Manager",
    "Massage & BeautyTherapist",
    "Sales Manager II - Applied",
    "Managing Director",
    "Sales Manager",
    "Senior Sales Manager - Government",
    "Senior Director - Engineering",
    "Stock Controller",
    "Technical Support Specialist II - VRF",
    "Branch Manager - Jordan",
    "Sales Operations and Projects Manager",
    "Sr. Application & Design Engineer I",
    "Senior Sales Executive II - SMEs",
    "Sr. Draftsman - Appl & Design",
    "Senior Director - Operations",
    "Talent Manager I",
    "Stock Coordinator",
    "Senior Technician - VRF",
    "Sr. ERP Specialist",
    "IT Support Supervisor",
    "Logistics Officer I",
    "Sales Manager - Government",
    "Sales Engineer II - Projects",
    "Senior Manager - Human Resources",
    "Senior Manager - Administration",
    "Showroom Rep (Mobile)",
    "Sales Operations Engineer II",
    "Head of Finance and Treasury",
    "Sales Operations Engineer II",
  ];

  const Grades = [
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "15",
    "16",
    "17",
    "23",
    "9_HS",
  ];

  const Divisions = [
    "Corporate Support",
    "Engineering",
    "Finance",
    "Iraq",
    "Jordan",
    "Morocco",
    "Operations - UAE",
    "Operations - OS",
    "Personal",
    "Private Office",
    "Sales",
    "Sudan",
    "Trainees",
  ];

  const Sections = [
    "Corp Support - Admin",
    "Corp Support - HR",
    "Corp Support - CI, IT  &  BA",
    "Eng - Application & Design",
    "Fin - Accounting",
    "Ops UAE - Warehouse",
    "Ops UAE - Service Centre",
    "Ops UAE - Parts Centre",
    "Ops UAE - Sales Operations",
    "Ops UAE - Project Operations",
    "Personal - House Staff",
    "Sales - ExCom",
    "Sales - Projects & SMEs",
  ];
  const Subsections = ["Installation", "SMEs", "Service"];
  const sNSvalues = [{name : "SP", value : true}, {name : "N-SP", value : false}];
  const managercodes = ["918", "1080", "1113", "1119", "1650"];
  const managernames = [
    "Bassam Walid Moussa",
    "John Jerick Aguila",
    "Nasser Hussein Darwish Al-Derbashi",
    "Yaseen Mohammed Mohsen",
  ];
  const worklocations = ["ALN WH", "AJM WS", "GHD"];

  //sorting

  //Tab functions - Hari

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  // const [tabValues, settabValues] = React.useState(0);
  console.log(tabValues, "values of tab");
  const handleCloseSlider = () =>{
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname:true,
      Eposition: true,
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
      OverAllRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      ProbationStatus: true,
      Employeeemail: true,
      position:true,
      SelectAll: true,
    })
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    settabValues(newValue);
    handleCloseSlider();
  };

  // const [selected, setselected] = React.useState<any>('');
  // console.log(selected, 'selected')
  // useEffect(() => {
  //   let selectededEmployee = users.filter((item: any) => {

  //     console.log(item, 'itemeff')
  //     console.log(item.isChecked, 'ischeckeff')
  //     return (
  //       item.isChecked === true
  //     )
  //   })
  //   setselected(selectededEmployee)
  //   console.log(selectededEmployee, 'selectededEmployee')
  // }, [users]);

  // const [unselected, setunselected] = React.useState<any>('');
  // console.log(unselected, 'unselected')
  // useEffect(() => {
  //   let unselectededEmployee = users.filter((item: any) => {
  //     console.log(users, 'U1')
  //     console.log(item, 'itemeff')
  //     console.log(item.isChecked, 'ischeckeff')
  //     return (
  //       item.isChecked !== true
  //     )
  //   })
  //   setunselected(unselectededEmployee)
  //   console.log(unselectededEmployee, 'unselectededEmployee')
  // }, [users]);

  //Tab functions
  //search
  useEffect(() => {
    console.log(tabValues, "useeffect");
    if (tabValues !== 1) {
      setSearchName2("");
    }
    if (tabValues !== 0) {
      setSearchName("");
    }
  }, [tabValues]);
  useEffect(() => {
    setPage(0);
  }, [tabValues]);

  useEffect(() => {
    setPage(0);
  }, [searchName2]);

  //search
  const [tablecount, settablecount] = React.useState(0);
  useEffect(() => {
    if (users.length !== undefined) {
      settablecount(users.length);
    }
  }, [users]);

  //populating filter dropdown
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [AppraiserNameArray, setAppraiserNameArray] = React.useState<any>([]);
  const [ReviewerNameArray, setReviewerNameArray] = React.useState<any>([]);
  const [NormalizerNameArray, setNormalizerNameArray] = React.useState<any>([]);
  const [sectionArrays, setsectionArrays] = React.useState<any>([]);
  const [probationstatusArrays, setprobationstatusArrays] = React.useState<any>([]);

  const [divisionArray, setdivisionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [subSectionArray, setsubSectionArray] = React.useState<any>([]);
  const [managerCodeArray, setmanagerCodeArray] = React.useState<any>([]);
  const [managerNameArray, setmanagerNameArray] = React.useState<any>([]);
  const [workLocationArray, setworkLocationArray] = React.useState<any>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);

  const sectionArrayMappedForMapped = activeTemplate
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.name?.section?.localeCompare(b?.name?.section);
  })
  ?.filter((j: any) => {
    return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
  })
  ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.section }).indexOf(item?.name?.section) === index)
  ?.filter((i: any) => {
    if (searchName.length > 0) {
      const searchTerms = searchName.toLowerCase().split(" ");
      return searchTerms.every(term =>
        i?.name?.position_long_description
          ?.toLowerCase()
          .includes(term)
      )|| searchTerms.every(term =>
        i?.name?.grade?.toLowerCase().includes(term)
      ) || searchTerms.every(term =>
        i?.name?.position_long_description?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.section?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.legal_full_name?.toLowerCase().includes(term)
      )
      || searchTerms.every(term =>
        i?.name?.section?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.employee_code?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.probation_status?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.function?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.appraiser_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.reviewer_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.normalizer_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.legal_full_name?.toLowerCase().includes(term)
      )
    } else {
      return true;
    }
  }) ?.map((i: any) => {
    return i?.name?.section;
  });
console.log(sectionArrayMappedForMapped,"sectionArrayMappedForMapped")
  
  useEffect(() => {
    let grades = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.grade - b?.name?.grade;
      })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      .map((i: any) => {
        return i?.name?.grade;
      });
      if (positionsFilter.length > 0) {
        grades = activeTemplate
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.name?.grade - b?.name?.grade;
          })
          ?.filter((j: any) => {
            return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
          })
          ?.filter((i: any) => {
            return !!positionsFilter?.find(item2 => i?.name?.position_long_description === item2)
          })
          ?.map((i: any) => {
            return i?.name?.grade;
          });
      }
      // search functionality based on grade
      else if (searchName?.length > 0) {
        grades = activeTemplate
          // .slice()
          ?.sort(function (a: any, b: any) {
            return a?.name?.grade?.localeCompare(
              b?.name?.grade
            );
          })
          ?.filter((j: any) => {
            return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
          })
          ?.filter((i: any) => {
            if (searchName.length > 0) {
              const searchTerms = searchName.toLowerCase().split(" ");
              return searchTerms.every(term =>
                i?.name?.grade
                  ?.toLowerCase()
                  .includes(term)
              )|| searchTerms.every(term =>
                i?.name?.position_long_description?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.legal_full_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.position_long_description?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.section?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.employee_code?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.probation_status?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.function?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.appraiser_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.reviewer_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.name?.normalizer_name?.toLowerCase().includes(term)
              ) 
            } else {
              return true;
            }
          })
          ?.map((i: any) => {
            return i?.name?.grade;
          });
      }
    const gradeContents = grades?.filter((c: any, index: any) => {
      return grades?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    //console.log(gradeContents, "contents");
    let position = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.position_long_description?.localeCompare(b?.name?.position_long_description);
      })
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      .map((i: any) => {
        return i?.name?.position_long_description;
      });
       // GradeFilter
    if (GradesFilter?.length > 0) {
      position = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.name?.position_long_description - b?.name?.position_long_description;
        })
        ?.filter((j: any) => {
          return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.name?.position_long_description;
        });
    }
       // search functionality based on position
     else if (searchName?.length > 0) {
      position = activeTemplate
        // .slice()
        ?.sort(function (a: any, b: any) {
          return a?.name?.position_long_description?.localeCompare(
            b?.name?.position_long_description
          );
        })
        ?.filter((j: any) => {
          return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
        })
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            )|| searchTerms.every(term =>
              i?.name?.grade?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.legal_full_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.employee_code?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.probation_status?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.function?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.appraiser_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.reviewer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.normalizer_name?.toLowerCase().includes(term)
            )
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.name?.position_long_description;
        });
    }
    const positionContents = position?.filter((c: any, index: any) => {
      return position?.indexOf(c) === index && c != null && c != undefined;
    });
    // searchName
    setpositionArray(positionContents);
    let probationstatus = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.probation_status?.localeCompare(b?.name?.probation_status);
      })
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
      .map((i: any) => {
        return i?.name?.probation_status;
      });
       // GradeFilter
    if (GradesFilter?.length > 0) {
      probationstatus = activeTemplate
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.name?.probation_status - b?.name?.probation_status;
        })
        ?.filter((j: any) => {
          return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.name?.probation_status;
        });
    }
       // search functionality based on position
     else if (searchName?.length > 0) {
      probationstatus = activeTemplate
        // .slice()
        ?.sort(function (a: any, b: any) {
          return a?.name?.probation_status?.localeCompare(
            b?.name?.probation_status
          );
        })
        ?.filter((j: any) => {
          return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
        })
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.probation_status
                ?.toLowerCase()
                .includes(term)
            )|| searchTerms.every(term =>
              i?.name?.grade?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.legal_full_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.employee_code?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.probation_status?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.function?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.appraiser_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.reviewer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.name?.normalizer_name?.toLowerCase().includes(term)
            )
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.name?.probation_status;
        });
    }
    const probationstatuscontents = probationstatus?.filter((c: any, index: any) => {
      return probationstatus?.indexOf(c) === index && c != null && c != undefined;
    });
    // searchName
    setprobationstatusArrays(probationstatuscontents);
    // setprobationstatusArrays
    //console.log(positionContents, "contents");
    let sections = activeTemplate
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.name?.section?.localeCompare(b?.name?.section);
    })
    // .filter((item: any) => {
    //   return item.isChecked === true;
    // })
    .map((i: any) => {
      return i?.name?.section;
    });
     // GradeFilter
  if (GradesFilter?.length > 0) {
    sections = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.section - b?.name?.section;
      })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      ?.filter((i: any) => {
        return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
      })
      ?.map((i: any) => {
        return i?.name?.section;
      });
  }
     // search functionality based on position
   else if (searchName?.length > 0) {
    sections = activeTemplate
      // .slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.section?.localeCompare(
          b?.name?.section
        );
      })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      ?.filter((i: any) => {
        if (searchName.length > 0) {
          const searchTerms = searchName.toLowerCase().split(" ");
          return searchTerms.every(term =>
            i?.section
              ?.toLowerCase()
              .includes(term)
          )|| searchTerms.every(term =>
            i?.name?.grade?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.legal_full_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.position_long_description?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.section?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.employee_code?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.probation_status?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.function?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.appraiser_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.reviewer_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.normalizer_name?.toLowerCase().includes(term)
          )
        } else {
          return true;
        }
      })
      ?.map((i: any) => {
        return i?.name?.section;
      });
  }
  const sectioncomponent = sections?.filter((c: any, index: any) => {
    return sections?.indexOf(c) === index && c != null && c != undefined;
  });
  // searchName
  setsectionArrays(sectioncomponent);
    let AppraiserName = activeTemplate
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.name?.appraiser_name?.localeCompare(b?.name?.appraiser_name);
    })
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    })
    // .filter((item: any) => {
    //   return item.isChecked === true;
    // })
    .map((i: any) => {
      return i?.name?.appraiser_name;
    });
     // GradeFilter
  if (GradesFilter?.length > 0) {
    AppraiserName = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.appraiser_name - b?.name?.appraiser_name;
      })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      ?.filter((i: any) => {
        return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
      })
      ?.map((i: any) => {
        return i?.name?.appraiser_name;
      });
  }
     // search functionality based on position
   else if (searchName?.length > 0) {
    AppraiserName = activeTemplate
      // .slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.appraiser_name?.localeCompare(
          b?.name?.appraiser_name
        );
      })
      ?.filter((j: any) => {
        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
      })
      ?.filter((i: any) => {
        if (searchName.length > 0) {
          const searchTerms = searchName.toLowerCase().split(" ");
          return searchTerms.every(term =>
            i?.name?.appraiser_name
              ?.toLowerCase()
              .includes(term)
          )|| searchTerms.every(term =>
            i?.name?.grade?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.legal_full_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.position_long_description?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.section?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.employee_code?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.probation_status?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.function?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.appraiser_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.reviewer_name?.toLowerCase().includes(term)
          )|| searchTerms.every(term =>
            i?.name?.normalizer_name?.toLowerCase().includes(term)
          )
        } else {
          return true;
        }
      })
      ?.map((i: any) => {
        return i?.name?.appraiser_name;
      });
  }
  const AppraiserNameContents = AppraiserName?.filter((c: any, index: any) => {
    return AppraiserName?.indexOf(c) === index && c != null && c != undefined;
  });
  setAppraiserNameArray(AppraiserNameContents)
  let ReviewerName = activeTemplate
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.name?.reviewer_name?.localeCompare(b?.name?.reviewer_name);
  })
  ?.filter((j: any) => {
    return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
  })
  .map((i: any) => {
    return i?.name?.reviewer_name;
  });
   // GradeFilter
if (GradesFilter?.length > 0) {
  ReviewerName = activeTemplate
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.name?.reviewer_name - b?.name?.reviewer_name;
    })
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    })
    ?.filter((i: any) => {
      return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
    })
    ?.map((i: any) => {
      return i?.name?.reviewer_name;
    });
}
   // search functionality based on position
 else if (searchName?.length > 0) {
  ReviewerName = activeTemplate
    ?.slice()
    ?.sort(function (a: any, b: any) {
      return a?.name?.reviewer_name?.localeCompare(
        b?.name?.reviewer_name
      );
    })
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    })
    ?.filter((i: any) => {
      if (searchName.length > 0) {
        const searchTerms = searchName.toLowerCase().split(" ");
        return searchTerms.every(term =>
          i?.name?.reviewer_name
            ?.toLowerCase()
            .includes(term)
        )|| searchTerms.every(term =>
          i?.name?.grade?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.legal_full_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.position_long_description?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.section?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.employee_code?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.probation_status?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.function?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.appraiser_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.reviewer_name?.toLowerCase().includes(term)
        )|| searchTerms.every(term =>
          i?.name?.normalizer_name?.toLowerCase().includes(term)
        )
      } else {
        return true;
      }
    })
    ?.map((i: any) => {
      return i?.name?.reviewer_name;
    });
}
const ReviewerNameContents = ReviewerName?.filter((c: any, index: any) => {
  return ReviewerName?.indexOf(c) === index && c != null && c != undefined;
});
setReviewerNameArray(ReviewerNameContents)
let NormalizerName = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.normalizer_name?.localeCompare(b?.name?.normalizer_name);
})
?.filter((j: any) => {
  return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
})
.map((i: any) => {
  return i?.name?.normalizer_name;
});
 // GradeFilter
if (GradesFilter?.length > 0) {
  NormalizerName = activeTemplate
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.name?.normalizer_name - b?.name?.normalizer_name;
  })
  ?.filter((j: any) => {
    return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
  })
  ?.filter((i: any) => {
    return !!GradesFilter?.find(item2 => i?.name?.grade === item2)
  })
  ?.map((i: any) => {
    return i?.name?.normalizer_name;
  });
}
 // search functionality based on position
else if (searchName?.length > 0) {
  NormalizerName = activeTemplate
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.name?.normalizer_name?.localeCompare(
      b?.name?.normalizer_name
    );
  })
  ?.filter((j: any) => {
    return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
  })
  ?.filter((i: any) => {
    if (searchName.length > 0) {
      const searchTerms = searchName.toLowerCase().split(" ");
      return searchTerms.every(term =>
        i?.name?.normalizer_name
          ?.toLowerCase()
          .includes(term)
      )|| searchTerms.every(term =>
        i?.name?.grade?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.legal_full_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.position_long_description?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.section?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.employee_code?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.probation_status?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.function?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.appraiser_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.reviewer_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.name?.normalizer_name?.toLowerCase().includes(term)
      )
    } else {
      return true;
    }
  })
  ?.map((i: any) => {
    return i?.name?.normalizer_name;
  });
}
const NormalizerNameContents = NormalizerName?.filter((c: any, index: any) => {
return NormalizerName?.indexOf(c) === index && c != null && c != undefined;
});
setNormalizerNameArray(NormalizerNameContents)


    const division = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.division?.localeCompare(b?.name?.division);
      })
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i?.name?.division;
      });
    const divisionContents = division?.filter((c: any, index: any) => {
      return division?.indexOf(c) === index && c != null && c != undefined;
    });
    setdivisionArray(divisionContents);
    //console.log(divisionContents, "contents");

    const section = activeTemplate
       ?.slice()
       ?.sort(function (a: any, b: any) {
         return a?.name?.section?.localeCompare(b?.name?.section);
       })
       .filter((item: any) => {
       return item.isChecked === true;
       })
       .map((i: any) => {
         return i?.name?.section;
       });
    const sectionContents = sectionArrayMappedForMapped?.filter((c: any, index: any) => {
      return section.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
    //console.log(sectionContents, "contents");

    const subSection = activeTemplate
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.name?.["sub section"]?.localeCompare(b?.name?.["sub section"]);
      })
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i?.name?.["sub section"];
      });
    const subSectionContents = subSection?.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArray(subSectionContents);
    //console.log(subSectionContents, "contents");

    const managerCode = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_code?.localeCompare(b?.manager_code);
      })
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    //console.log(managerCodeContents, "contents");

    const managerName = users
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i.manager_name;
      });
    const managerNameContents = managerName.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    //console.log(managerNameContents, "contents");

    const workLocation = users
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i.work_location;
      });
    const workLocationContents = workLocation.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    //console.log(workLocationContents, "contents");
  }, [users,activeTemplate,GradesFilter,searchName,positionsFilter]);
  //populating filter dropdown
  const [empEmployeeCode, setempEmployeeCode] = React.useState("");
  // console.log(empEmployeeCode, "position");
  const handleChangeEmployeeCode = (event: SelectChangeEvent) => {
    setempEmployeeCode(event.target.value);
  };
  const [empFullName, setempFullName] = React.useState("");
  // console.log(empFullName, "position");
  const handleChangeFullName = (event: SelectChangeEvent) => {
    setempFullName(event.target.value);
  };
  //populating filter dropdown-UNMAPPED EMP
 
  const [divisionArrayU, setdivisionArrayU] = React.useState<any>([]);
  const [sectionArrayU, setsectionArrayU] = React.useState<any>([]);
  const [subSectionArrayU, setsubSectionArrayU] = React.useState<any>([]);
  const [managerCodeArrayU, setmanagerCodeArrayU] = React.useState<any>([]);
  const [managerNameArrayU, setmanagerNameArrayU] = React.useState<any>([]);
  const [workLocationArrayU, setworkLocationArrayU] = React.useState<any>([]);


  // multiselecet 
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [positionFilterother, setpositionFilterother] = React.useState<string[]>([]);

  const [GradeFilterother, setGradeFilterother] = React.useState<string[]>([]);
  const [positionFilterAll, setpositionFilterAll] = React.useState<string[]>([]);
  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) {setpositionFilter([])} else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
   
  };
  const handleChangeSelectPositionother = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) {setpositionFilterother([])} else {
      setpositionFilterother(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
   
  };
  const handleSelectAll = (selectAll:any) => {
    const updatedColumnHeaders = { ...columnHeaders };
    // Set all checkbox values to the selectAll value (true or false)
    Object.keys(updatedColumnHeaders).forEach((key) => {
      updatedColumnHeaders[key] = selectAll;
    });
    setcolumnHeaders(updatedColumnHeaders);
  };
  const handleChangeSelectPositionAll = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) {setpositionFilterAll([])} else {
      setpositionFilterAll(

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
  const handleChangeSelectGradeother = (event: SelectChangeEvent<typeof GradeFilter>) => {
    const {
      target: { value },
    } = event;
   
    if (value.includes("None")) { setGradeFilterother([]) } else {
      setGradeFilterother(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
  };
  const handleChangeSelectGradeAll = (event: SelectChangeEvent<typeof GradeFilter>) => {
    const {
      target: { value },
    } = event;
   
    if (value.includes("None")) { setGradeFilterAll([]) } else {
      setGradeFilterAll(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
  };
  // Template
   const [anchorTemplate, setanchorTemplate] = React.useState<null | HTMLElement>(
    null
  );
  const openTemplate = Boolean(anchorTemplate);
  const handleClickTemplate = (event: React.MouseEvent<HTMLElement>) => {
    setanchorTemplate(event.currentTarget);
  };
  const handleCloseTemplate = (event: React.MouseEvent<HTMLElement>) => {

    setanchorTemplate(null);
  };
  const handleTargetTemplate = (event: any) => {

    setTemplateAll(event?.target?.getAttribute("value"));


    setanchorTemplate(null);
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
  // Legal fullname 1
  const [anchorElnewFullName1, setAnchorElnewFullName1] = React.useState<null | HTMLElement>(
    null
  );
  const openFullName1 = Boolean(anchorElnewFullName1);
  const handleClickFullName1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFullName1(event.currentTarget);
  };
  const handleCloseFullName1 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFullName1(null);
  };
  const handleTargetFullName1 = (event: any) => {

    setemployeeNameOther(event?.target?.getAttribute("value"));


    setAnchorElnewFullName1(null);
  };
  const [anchorElnewFullName2, setAnchorElnewFullName2] = React.useState<null | HTMLElement>(
    null
  );
  const openFullName2 = Boolean(anchorElnewFullName2);
  const handleClickFullName2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnewFullName2(event.currentTarget);
  };
  const handleCloseFullName2 = (event: React.MouseEvent<HTMLElement>) => {

    setAnchorElnewFullName2(null);
  };
  const handleTargetFullName2 = (event: any) => {

    setemployeeNameAll(event?.target?.getAttribute("value"));


    setAnchorElnewFullName2(null);
  };
   //Legal Full Name 2
   //Legal Full Name
  // ecode 
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
  // ecode 1
  const [anchorElnew1, setAnchorElnew1] = React.useState<null | HTMLElement>(
    null
  );
  const opennew1 = Boolean(anchorElnew1);
  const handleClicknew1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnew1(event.currentTarget);
  };
  const handleClosenew1 = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event?.target.value)
    setAnchorElnew1(null);
  };
  const handleTarget1 = (event: any) => {
    // console.log(event?.target.value)
    setemployeeCodeOther(event?.target?.getAttribute("value"))
    // setempEmployeeCode(event?.target?.value?.toString());
    // console.log(event?.target.name.toString(),"handleTarget")
    setAnchorElnew1(null);
    // handleClosenew(event);
  };
  // ecode 2
  const [anchorElnew2, setAnchorElnew2] = React.useState<null | HTMLElement>(
    null
  );
  const opennew2 = Boolean(anchorElnew2);
  const handleClicknew2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElnew2(event.currentTarget);
  };
  const handleClosenew2 = (event: React.MouseEvent<HTMLElement>) => {
    // console.log(event?.target.value)
    setAnchorElnew2(null);
  };
  const handleTarget2 = (event: any) => {
    // console.log(event?.target.value)
    setemployeeCodeAll(event?.target?.getAttribute("value"))
    // setempEmployeeCode(event?.target?.value?.toString());
    // console.log(event?.target.name.toString(),"handleTarget")
    setAnchorElnew2(null);
    // handleClosenew2(event);
  };
 
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
// const handleTargetservicePosition = (event: any) => {
 
//   setPositions(event?.target?.getAttribute("value"));
 
 
//   setAnchorElnewservicePosition(null);
// };
const handleTargetservicePosition = (event: SelectChangeEvent<typeof positionFilter>) => {
 
  const {
    target: { value },
  } = event;
  if (value.includes("None")) {setpositionFilter([])} else {
    setpositionFilter(

      typeof value === 'string' ? value.split(',') : value,
    );
  }
};

// position1
const [anchorElnewservicePosition1, setAnchorElnewservicePosition1] = React.useState<null | HTMLElement>(
  null
);
const openservicePosition1 = Boolean(anchorElnewservicePosition1);
const handleClickservicePosition1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewservicePosition1(event.currentTarget);
};
const handleCloseservicePosition1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewservicePosition1(null);
};
const handleTargetservicePosition1 = (event: any) => {
 
  setPositionsother(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewservicePosition1(null);
};
// position 2
const [anchorElnewservicePosition2, setAnchorElnewservicePosition2] = React.useState<null | HTMLElement>(
  null
);
const openservicePosition2 = Boolean(anchorElnewservicePosition2);
const handleClickservicePosition2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewservicePosition2(event.currentTarget);
};
const handleCloseservicePosition2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewservicePosition2(null);
};
const handleTargetservicePosition2 = (event: any) => {
 
  setPositionsAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewservicePosition2(null);
};
//Position
// Grade
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
// grade1
const [anchorElnewserviceGrade1, setAnchorElnewserviceGrade1] = React.useState<null | HTMLElement>(
  null
);
const openserviceGrade1 = Boolean(anchorElnewserviceGrade1);
const handleClickserviceGrade1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewserviceGrade1(event.currentTarget);
};
const handleCloseserviceGrade1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewserviceGrade1(null);
};
const handleTargetserviceGrade1 = (event: any) => {
 
  setempGradesother(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewserviceGrade1(null);
};
// grade2
const [anchorElnewserviceGrade2, setAnchorElnewserviceGrade2] = React.useState<null | HTMLElement>(
  null
);
const openserviceGrade2 = Boolean(anchorElnewserviceGrade2);
const handleClickserviceGrade2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewserviceGrade2(event.currentTarget);
};
const handleCloseserviceGrade2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewserviceGrade2(null);
};
const handleTargetserviceGrade2 = (event: any) => {
 
  setempGradesAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewserviceGrade2(null);
};
//Grade
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
};
//Supervisory Role 1
const [anchorElnewSupervisoryRole1, setAnchorElnewSupervisoryRole1] = React.useState<null | HTMLElement>(
  null
);
const openSupervisoryRole1 = Boolean(anchorElnewSupervisoryRole1);
const handleClickSupervisoryRole1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSupervisoryRole1(event.currentTarget);
};
const handleCloseSupervisoryRole1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSupervisoryRole1(null);
};
const handleTargetSupervisoryRole1 = (event: any) => {
 

  setsNSOther(event?.target?.getAttribute("value"))
 
  handleCloseSupervisoryRole1(event);
};
// supervisory role 2
const [anchorElnewSupervisoryRole2, setAnchorElnewSupervisoryRole2] = React.useState<null | HTMLElement>(
  null
);
const openSupervisoryRole2 = Boolean(anchorElnewSupervisoryRole2);
const handleClickSupervisoryRole2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSupervisoryRole2(event.currentTarget);
};
const handleCloseSupervisoryRole2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSupervisoryRole2(null);
};
const handleTargetSupervisoryRole2 = (event: any) => {
 

  setsNSAll(event?.target?.getAttribute("value"))
 
  handleCloseSupervisoryRole2(event);
};
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
};
// function 1
const [anchorElnewFunction1, setAnchorElnewFunction1] = React.useState<null | HTMLElement>(
  null
);
const openFunction1 = Boolean(anchorElnewFunction1);
const handleClickFunction1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewFunction1(event.currentTarget);
};
const handleCloseFunction1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewFunction1(null);
};
const handleTargetFunction1 = (event: any) => {
 
  setempFunctionother(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewFunction1(null);
};
//function 2
const [anchorElnewFunction2, setAnchorElnewFunction2] = React.useState<null | HTMLElement>(
  null
);
const openFunction2 = Boolean(anchorElnewFunction2);
const handleClickFunction2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewFunction2(event.currentTarget);
};
const handleCloseFunction2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewFunction2(null);
};
const handleTargetFunction2 = (event: any) => {
 
  setempFunctionAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewFunction2(null);
};
// RoleCategory
const [anchorElnewRole, setAnchorElnewRole] = React.useState<null | HTMLElement>(
  null
);
const openRole = Boolean(anchorElnewRole);
const handleClickRole= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewRole(event.currentTarget);
};
const handleCloseRole = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewRole(null);
};
const handleTargetRole = (event: any) => {
 
  setRoleCategory(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewRole(null);
};
//  RoleCategory 1
const [anchorElnewRole1, setAnchorElnewRole1] = React.useState<null | HTMLElement>(
  null
);
const openRole1 = Boolean(anchorElnewRole1);
const handleClickRole1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewRole1(event.currentTarget);
};
const handleCloseRole1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewRole1(null);
};
const handleTargetRole1 = (event: any) => {
 
  setRoleCategoryOther(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewRole1(null);
};
//   RoleCategory 2
const [anchorElnewRole2, setAnchorElnewRole2] = React.useState<null | HTMLElement>(
  null
);
const openRole2 = Boolean(anchorElnewRole2);
const handleClickRole2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewRole2(event.currentTarget);
};
const handleCloseRole2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewRole2(null);
};
const handleTargetRole2 = (event: any) => {
 
  setRoleCategoryAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewRole2(null);
};
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
// Division 1
const [anchorElnewDivision1, setAnchorElnewDivision1] = React.useState<null | HTMLElement>(
  null
);
const openDivision1 = Boolean(anchorElnewDivision1);
const handleClickDivision1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewDivision1(event.currentTarget);
};
const handleCloseDivision1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewDivision1(null);
};
const handleTargetDivision1 = (event: any) => {
 
  setempdivisionsOther(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewDivision1(null);
};
//Division 2
const [anchorElnewDivision2, setAnchorElnewDivision2] = React.useState<null | HTMLElement>(
  null
);
const openDivision2 = Boolean(anchorElnewDivision2);
const handleClickDivision2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewDivision2(event.currentTarget);
};
const handleCloseDivision2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewDivision2(null);
};
const handleTargetDivision2 = (event: any) => {
 
  setempdivisionsAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewDivision2(null);
};
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
// section 1
const [anchorElnewSection1, setAnchorElnewSection1] = React.useState<null | HTMLElement>(
  null
);
const openSection1 = Boolean(anchorElnewSection1);
const handleClickSection1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSection1(event.currentTarget);
};
const handleCloseSection1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSection1(null);
};
const handleTargetSection1 = (event: any) => {
 
  setempsectionsother(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewSection1(null);
};
//Section 2
const [anchorElnewSection2, setAnchorElnewSection2] = React.useState<null | HTMLElement>(
  null
);
const openSection2 = Boolean(anchorElnewSection2);
const handleClickSection2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSection2(event.currentTarget);
};
const handleCloseSection2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSection2(null);
};
const handleTargetSection2 = (event: any) => {
 
  setempsectionsAll(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewSection2(null);
};
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
// subsection 1
const [anchorElnewSubSection1, setAnchorElnewSubSection1] = React.useState<null | HTMLElement>(
  null
);
const openSubSection1 = Boolean(anchorElnewSubSection1);
const handleClickSubSection1= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSubSection1(event.currentTarget);
};
const handleCloseSubSection1 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSubSection1(null);
};
const handleTargetSubSection1 = (event: any) => {
 
  setempsubSectionsOther(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewSubSection1(null);
};
// subsection 2
const [anchorElnewSubSection2, setAnchorElnewSubSection2] = React.useState<null | HTMLElement>(
  null
);
const openSubSection2 = Boolean(anchorElnewSubSection2);
const handleClickSubSection2= (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElnewSubSection2(event.currentTarget);
};
const handleCloseSubSection2 = (event: React.MouseEvent<HTMLElement>) => {
 
  setAnchorElnewSubSection2(null);
};
const handleTargetSubSection2 = (event: any) => {
 
  setempsubSectionsOther(event?.target?.getAttribute("value"));
 
 
  setAnchorElnewSubSection2(null);
};
//SubSection 
  useEffect(() => {
    let grades = unmappedEmpDatum
      .slice()
      .sort(function (a: any, b: any) {
        return a.grade - b.grade;
      })
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.grade;
      });
      if (positionsFilterU.length > 0) {
        grades = unmappedEmpDatum
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.grade - b?.grade;
          })
          .filter((item: any) => {
            return item?.isChecked !== true;
          })
          ?.filter((i: any) => {
            return !!positionsFilterU?.find(item2 => i?.position_long_description === item2)
          })
          ?.map((i: any) => {
            return i?.grade;
          });
      }
       // search functionality based on grade
       else if (searchName2?.length > 0) {
        grades = unmappedEmpDatum
          .slice()
          ?.sort(function (a: any, b: any) {
            return a?.grade?.localeCompare(
              b?.grade
            );
          })
          .filter((item: any) => {
            return item?.isChecked !== true;
          })
          ?.filter((i: any) => {
            if (searchName2.length > 0) {
              const searchTerms = searchName2.toLowerCase().split(" ");
              return searchTerms.every(term =>
                i?.grade
                  ?.toLowerCase()
                  .includes(term)
              ) || searchTerms.every(term =>
                i?.grade?.toLowerCase().includes(term)
              ) || searchTerms.every(term =>
                i?.position_long_description?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.section?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.legal_full_name?.toLowerCase().includes(term)
              )
              || searchTerms.every(term =>
                i?.section?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.employee_code?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.probation_status?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.function?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.appraiser_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.reviewer_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.normalizer_name?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
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
      // .slice()
      // .sort(function (a: any, b: any) {
      //   return a.grade - b.grade;
      // })
      .filter((c: any, index: any) => {
        return grades.indexOf(c) === index && c != null && c != undefined;
      });
    setgradesArrayU(gradeContents);
    //console.log(gradeContents, "contents");
    let position = unmappedEmpDatum
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.position_long_description;
      });
          // GradeFilter
    if (GradesFilterU.length > 0) {
      position = unmappedEmpDatum
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description - b?.position_long_description;
        })
        .filter((item: any) => {
          return item.isChecked !== true;
        })
        ?.filter((i: any) => {
          return !!GradesFilterU?.find(item2 => i?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.position_long_description;
        });
    }
     // search functionality based on position
     else if (searchName2?.length > 0) {
      position = unmappedEmpDatum
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.position_long_description?.localeCompare(
            b?.position_long_description
          );
        })
        .filter((item: any) => {
          return item.isChecked !== true;
        })
        ?.filter((i: any) => {
          if (searchName2.length > 0) {
            const searchTerms = searchName2.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || searchTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.legal_full_name?.toLowerCase().includes(term)
            )
            || searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.probation_status?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.function?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.appraiser_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.reviewer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.normalizer_name?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
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
      return position.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArrayU(positionContents);
    //console.log(positionContents, "contents");

    const division = unmappedEmpDatum
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.division;
      });
    const divisionContents = division.filter((c: any, index: any) => {
      return division.indexOf(c) === index && c != null && c != undefined;
    });
    setdivisionArrayU(divisionContents);
    //console.log(divisionContents, "contents");

    const section = unmappedEmpDatum
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.section;
      });
    const sectionContents = section.filter((c: any, index: any) => {
      return section.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArrayU(sectionContents);
    setsectionArrayUnmappedData(sectionContents)
    //console.log(sectionContents, "contents");
    const sectionAll = allEmployees
    .slice()
    ?.sort(function (a: any, b: any) {
      return a?.section?.localeCompare(b?.section);
    })
    .filter((item: any) => {
      return item.isChecked !== true;
    })
    .map((i: any) => {
      return i.section;
    });
  const sectionContentsAll = sectionAll.filter((c: any, index: any) => {
    return section.indexOf(c) === index && c != null && c != undefined;
  });
  setsectionArrayAllData(sectionContentsAll);
    const subSection = unmappedEmpDatum
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.["sub section"]?.localeCompare(b?.["sub section"]);
      })
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i["sub section"];
      });
    const subSectionContents = subSection.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArrayU(subSectionContents);
    //console.log(subSectionContents, "contents");

    const managerCode = users
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArrayU(managerCodeContents);
    //console.log(managerCodeContents, "contents");

    const managerName = users
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.manager_name;
      });
    const managerNameContents = managerName.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArrayU(managerNameContents);
    //console.log(managerNameContents, "contents");

    const workLocation = users
      .filter((item: any) => {
        return item.isChecked !== true;
      })
      .map((i: any) => {
        return i.work_location;
      });
    const workLocationContents = workLocation.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArrayU(workLocationContents);
    // console.log(workLocationContents, "contents");
  }, [users,searchName2,positionsFilterU,unmappedEmpDatum,GradesFilterU]);
  //populating filter dropdown
  // filter-reset
  const filterReset = () => {
    setemployeeNameOther("None")
    setemployeeCodeOther("None")
    setPositionsother("None")
    setempGradesother("None")
    setempdivisionsOther("None")
    setempsectionsother("None")
    setsNSOther("None")
    setempsubSectionsOther("None")
    setmanagerNameOther("None")
    setmanagerCodeOther("None")
    setfunctionDataOther("None")
    setlineManagerOther("None")
    setlineManagerOther2("None")
    setworkLocationOther("None")
    setRoleCategoryOther("None")
  }
  // filter-reset
  //checkbox selection
  const [stateTrigger, setStateTrigger] = useState(false);
  const [saveTrigger, setsaveTrigger] = useState(false);
  console.log(stateTrigger, 'stateTrigger')
  const [mappData, setmappData] = React.useState<any>([]);
  const [unmappData, setunmappData] = React.useState<any>([]);
  console.log(users, 'newdataU')
  //  console.log(mappData,'newdataM')
  //  console.log(unmappData,'newdataUM')
  //  useEffect(() => {
  //   setStateTrigger(true)
  //  }, [])
  //  useEffect(() => {
  //   if(users !== '' && users !== undefined){
  //     setStateTrigger(true)
  //   }
  //   }, [users,data])

  useEffect(() => {

    console.log('newdata1')
    const mappedEmployeesData = users.filter((item: any) => {

      return item.isChecked === true;
    })
    setmappData(mappedEmployeesData);
    console.log(mappedEmployeesData, 'newdata')
    const unmappedEmployeesData = users.filter((item: any) => {
      // console.log(item, "itemeff");
      // console.log(item.isChecked, "ischeckeff");
      return item.isChecked !== true;
    })
    setunmappData(unmappedEmployeesData);
    console.log(unmappedEmployeesData, 'newdata1')
    setsaveTrigger(false)
  }, [stateTrigger, saveTrigger])
  //this should run only during save.
  //checkbox selection
  //save button handler
  const saveHandler = () => {
    setOpen(true);

  }
  //Filter-icon

  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  const [icon4, setIcon4] = React.useState<any>([]);
  const [icon5, setIcon5] = React.useState<any>([]);
  const [icon6, setIcon6] = React.useState<any>([]);
  const [icon7, setIcon7] = React.useState<any>([]);
  const [icon8, setIcon8] = React.useState<any>([]);

  const [iconUN, setIconUN] = React.useState<any>([]);
  const [icon1UN, setIcon1UN] = React.useState<any>([]);
  const [icon2UN, setIcon2UN] = React.useState<any>([]);
  const [icon3UN, setIcon3UN] = React.useState<any>([]);
  const [icon4UN, setIcon4UN] = React.useState<any>([]);
  const [icon5UN, setIcon5UN] = React.useState<any>([]);
  const [icon6UN, setIcon6UN] = React.useState<any>([]);
  const [icon7UN, setIcon7UN] = React.useState<any>([]);
  const [icon8UN, setIcon8UN] = React.useState<any>([]);


  const [iconAll, setIconAll] = React.useState<any>([]);
  const [icon1All, setIcon1All] = React.useState<any>([]);
  const [icon2All, setIcon2All] = React.useState<any>([]);
  const [icon3All, setIcon3All] = React.useState<any>([]);
  const [icon4All, setIcon4All] = React.useState<any>([]);
  const [icon5All, setIcon5All] = React.useState<any>([]);
  const [icon6All, setIcon6All] = React.useState<any>([]);
  const [icon7All, setIcon7All] = React.useState<any>([]);
  const [icon8All, setIcon8All] = React.useState<any>([]);
  const [icon9All, setIcon9All] = React.useState<any>([]);


  useEffect(() => {
    if (empEmployeeCode === "None" || empEmployeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }

    if (employeeCodeOther === "None" || employeeCodeOther === "") {
      setIconUN(false);
    } else {
      setIconUN(true);
    }

    if (employeeCodeAll === "None" || employeeCodeAll === "") {
      setIconAll(false);
    } else {
      setIconAll(true);
    }
  }, [empEmployeeCode, employeeCodeOther, employeeCodeAll])

  useEffect(() => {
    if (empFullName === "None" || empFullName === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }

    if (employeeNameOther === "None" || employeeNameOther === "") {
      setIcon1UN(false);
    } else {
      setIcon1UN(true);
    }

    if (employeeNameAll === "None" || employeeNameAll === "") {
      setIcon1All(false);
    } else {
      setIcon1All(true);
    }
  }, [empFullName, employeeNameOther, employeeNameAll])


  useEffect(() => {
    {
      // if (positions === "None" || positions === "Grade" || positions === "") {
      //   setIcon2(false);
      // } else {
      //   setIcon2(true);
      // }
    }

    // if (positionsother === "None" || positionsother === "") {
    //   setIcon2UN(false);
    // } else {
    //   setIcon2UN(true);
    // }

    if (positionsAll === "None" || positionsAll === "") {
      setIcon2All(false);
    } else {
      setIcon2All(true);
    }
    if (positionsFilter?.length == 0){
      setIcon2(false);
    }else{
      setIcon2(true);
    }
    if (positionsFilterU?.length == 0){
      setIcon2UN(false);
    } else {
      setIcon2UN(true);
    }
    if (positionsFilterAll?.length == 0){
      setIcon2All(false);
    } else {
      setIcon2All(true);
    }
  }, [positions, positionsother, positionsAll,positionsFilter,positionsFilterU,positionsFilterAll])

  useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }

    if (GradeFilterAll?.length == 0) {
      setIcon3All(false);
    } else {
      setIcon3All(true);
    }

    if (GradesFilterU ?.length == 0) {
      setIcon3UN(false);
    } else {
      setIcon3UN(true);
    }
    if (GradesFilter?.length == 0){
      setIcon3(false);
    }else{
      setIcon3(true);
    }
    if (GradeFilterother?.length == 0){
      // setIcon3(false);
    }else{
      setIcon3(true);
    }
    // if (GradeFilterAll?.length == 0){
    //   setIcon3(false);
    // }else{
    //   setIcon3(true);
    // }

  }, [empgrades, GradesFilterU, empgradesAll,GradesFilter,GradeFilterAll,GradeFilterother])

  useEffect(() => {
    if (empdivisions === "None" || empdivisions === "") {
      setIcon4(false);
    } else {
      setIcon4(true);
    }


    if (empdivisionsOther === "None" || empdivisionsOther === "") {
      setIcon4UN(false);
    } else {
      setIcon4UN(true);
    }

    if (empdivisionsAll === "None" || empdivisionsAll === "") {
      setIcon4All(false);
    } else {
      setIcon4All(true);
    }

  }, [empdivisions, empdivisionsOther, empdivisionsAll])


  useEffect(() => {
    if (sNS === "None" || sNS === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }

    if (sNSOther === "None" || sNSOther === "") {
      setIcon5UN(false);
    } else {
      setIcon5UN(true);
    }

    if (sNSAll === "None" || sNSAll === "") {
      setIcon5All(false);
    } else {
      setIcon5All(true);
    }

  }, [sNS, sNSOther, sNSAll])

  const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);

  useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon6(false);
    } else {
      setIcon6(true);
    }

    if (empsectionsother === "None" || empsectionsother === "") {
      setIcon6UN(false);
    } else {
      setIcon6UN(true);
    }

    if (empsectionsAll === "None" || empsectionsAll === "") {
      setIcon6All(false);
    } else {
      setIcon6All(true);
    }

  }, [empsections, empsectionsother, empsectionsAll,sectionsFilter])

  useEffect(() => {
    if (empsubSections === "None" || empsubSections === "") {
      setIcon7(false);
    } else {
      setIcon7(true);
    }

    if (empsubSectionsOther === "None" || empsubSectionsOther === "") {
      setIcon7UN(false);
    } else {
      setIcon7UN(true);
    }

    if (empsubSectionsAll === "None" || empsubSectionsAll === "") {
      setIcon7All(false);
    } else {
      setIcon7All(true);
    }

  }, [empsubSections, empsubSectionsOther, empsubSectionsAll])

  useEffect(() => {
    if (empFunction === "None" || empFunction === "") {
      setIcon8(false);
    } else {
      setIcon8(true);
    }

    if (empFunctionother === "None" || empFunctionother === "") {
      setIcon8UN(false);
    } else {
      setIcon8UN(true);
    }

    if (empFunctionAll === "None" || empFunctionAll === "") {
      setIcon8All(false);
    } else {
      setIcon8All(true);
    }

  }, [functionData,empFunctionother,empFunctionAll,empFunction, functionDataAll])

  useEffect(() => {
    if (templateAll === "None" || templateAll === "") {
      setIcon9All(false);
    } else {
      setIcon9All(true);
    }

  }, [templateAll])
//for section multiselect
const isAllsectionFilter =
sectionArrays?.length > 0 && sectionsFilter?.length === sectionArrays?.length;
const handleChangeSelectsections = (event: any) => {
const value = event.target.value;
if (value[value.length - 1] === "all") {
  console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"),"newwwwww")
  setsectionsFilter(sectionsFilter?.length === sectionArrays?.length ? [] : sectionArrays);
  return;
}
setsectionsFilter(value);
setPage(0);
};
//for section multiselect UNMAPPED
const [sectionsFilterUnmappedData, setsectionsFilterUnmappedData] = React.useState<string[]>([]);
const [sectionArrayUnmappedData, setsectionArrayUnmappedData] = React.useState<any>([]);

const isAllsectionFilterUnmapped =
sectionArrayUnmappedData?.length > 0 && sectionsFilterUnmappedData?.length === sectionArrayUnmappedData?.length;
const handleChangeSelectsectionsUnmappedData = (event: any) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    // console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"),"newwwwww")
    setsectionsFilterUnmappedData(sectionsFilterUnmappedData?.length === sectionArrayUnmappedData?.length ? [] : sectionArrayUnmappedData);
    return;
  }
  setsectionsFilterUnmappedData(value);
  setPage(0);
};
 //for section multiselect All
 const [sectionsFilterAllData, setsectionsFilterAllData] = React.useState<string[]>([]);
 const [sectionArrayAllData, setsectionArrayAllData] = React.useState<any>([])
 const isAllsectionFilterAll =
 sectionArrayAllData?.length > 0 && sectionsFilterAllData?.length === sectionArrayAllData?.length;
 const handleChangeSelectsectionsmappedData = (event: any) => {
   const value = event.target.value;
   if (value[value.length - 1] === "all") {
     // console.log((sectionsFilter?.length === sectionsFilter?.length ? [] : "select all"),"newwwwww")
     setsectionsFilterAllData(sectionsFilterAllData?.length === sectionArrayAllData?.length ? [] : sectionArrayAllData);
     return;
   }
   setsectionsFilterAllData(value);
   setPage(0);
 };
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


  //pagination
  const [filCount, setfilCount] = React.useState<any>([]);
  const [allCount, setAllCount] = React.useState<any>([]);
  const [mappedCount, setMappedCount] = useState(0);
  const [filData, setfilData] = React.useState<any>([]);

  useEffect(() => {
    let filteredPagination = activeTemplate?.filter((item: any) => {

      return item?.isChecked === true;
    })
      .filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.name?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j?.name?.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
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
        console.log(j?.name?.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j?.name?.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j?.name?.isSupervisor != true;
        }
      })
      // .filter((j: any) => {
      //   if (positionsother === "None" || positionsother === "") {
      //     return j;
      //   } else {
      //     return j?.name?.position_long_description
      //       .toLocaleLowerCase()
      //       .includes(positionsother.toLocaleLowerCase());
      //   }
      // })
      .filter((item1: any) => {
        if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
          return item1;
        } else {
          return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
          return item1;
        } else {
          return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j?.name?.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j?.name?.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j?.name?.employee_code !== undefined &&
            j?.name?.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j?.name?.legal_full_name !== undefined &&
            j?.name?.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j?.name?.section !== undefined &&
            j?.name?.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j?.name?.position_long_description !== undefined &&
            j?.name?.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j?.name?.grade !== undefined &&
            j?.name?.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })

    let filteredPaginationAll = allEmployees
      // .filter((item: any) => {

      //   return item.isChecked !== true;
      // })
      ?.filter((j: any) => {
        return j?.isCEORole === false && j?.isLeavers === false && j?.isExcluded === false
      })
      .filter((j: any) => {
        if (
          templateAll === "None" ||
          templateAll === ""
        ) {
          return j;
        } else {
          return getTemplateName(j)
            ?.toLocaleLowerCase()
            .includes(templateAll?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j, 'jjjjjjjjjjjjjjjjjj')
        if (employeeNameAll === "None" || employeeNameAll === "") {
          return j;
        } else {
          return j?.legal_full_name?.toLocaleLowerCase()
            .includes(employeeNameAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeAll === "None" || employeeCodeAll === "") {
          return j;
        } else {
          return j?.employee_code?.toLocaleLowerCase()
            .includes(employeeCodeAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNSAll === "None" || sNSAll === "") {
          return j;
        }
        if (sNSAll === "SP") {
          return j?.isSupervisor === true;
        } else if (sNSAll === "N-SP") {
          return j?.isSupervisor != true 
          // || j?.name?.isSupervisor === undefined;
        }
      })
      .filter((j: any) => {
        if (positionsAll === "None" || positionsAll === "") {
          return j;
        } else {
          return j?.position_long_description
            .toLocaleLowerCase()
            .includes(positionsAll.toLocaleLowerCase());
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
        if (positionsFilterAll.includes("None") || positionsFilterAll.length === 0) {
          return item1;
        } else {
          return !!positionsFilterAll?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
          return item1;
        } else {
          return !!GradeFilterAll?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (empgradesAll === "None" || empgradesAll === "") {
          return j;
        } else {
          return j?.grade?.toLocaleLowerCase()
            .includes(empgradesAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsAll === "None" || empsectionsAll === "") {
          return j;
        } else {
          return j?.section
            .toLocaleLowerCase()
            .includes(empsectionsAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (ProbationStatus2 === "None" || ProbationStatus2 === "") {
          return j;
        } else {
          return j?.probation_status
            .toLocaleLowerCase()
            .includes(ProbationStatus2.toLocaleLowerCase());
        }
      }) .filter((j: any) => {
        if (AppName2 === "None" || AppName2 === "") {
          return j;
        } else {
          return j.appraiser_name
            .toLocaleLowerCase()
            .includes(AppName2.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (RevName2 === "None" || RevName2 === "") {
          return j;
        } else {
          return j?.reviewer_name
            ?.toLocaleLowerCase() === RevName2?.toLocaleLowerCase();
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (norName2 === "None" || norName2 === "") {
          return j;
        } else {
          return j?.normalizer_name
            ?.toLocaleLowerCase() === norName2?.toLocaleLowerCase();
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchNameAll === "") {
          return j;
        }  else if (
          (j?.employee_code !== undefined &&
            j?.employee_code
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase())) ||
              (j?.probation_status !== undefined &&
                j?.probation_status
                  .toLocaleLowerCase()
                  .includes(searchNameAll.toLocaleLowerCase())) ||
                  (j?.function !== undefined &&
                    j?.function
                      .toLocaleLowerCase()
                      .includes(searchNameAll.toLocaleLowerCase())) ||
                      (j?.appraiser_name !== undefined &&
                        j?.appraiser_name
                          .toLocaleLowerCase()
                          .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.reviewer_name !== undefined &&
                            j?.reviewer_name
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                              (j?.normalizer_name !== undefined &&
                                j?.normalizer_name
                                  .toLocaleLowerCase()
                               .includes(searchNameAll.toLocaleLowerCase())) ||
          (j?.grade !== undefined &&
            j?.grade
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchNameAll !== ""){
          if (searchNameAll == "SP") {
            return j?.isSupervisor == true;
          }else if (searchNameAll == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
    // setfilCount(filteredPagination.length);
    // setfilData(filteredPagination)

    //   if (tabValues === 0 && filteredPagination == null ) {
    //     setMappedCount(0);
    //   } else {
    //   setMappedCount(filteredPagination?.length);
    // }

    setAllCount(filteredPaginationAll?.length);

    let filteredPaginationUnmapped = unmappedEmpDatum
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    }).filter((item: any) => {

        return item.isChecked !== true;
      })
      .filter((j: any) => {
        if (employeeNameOther === "None" || employeeNameOther === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeOther === "None" || employeeCodeOther === "") {
          return j;
        } else {
          return j.employee_code
            .toLocaleLowerCase()
            .includes(employeeCodeOther.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "SP") {
          return j.isSupervisor === true;
        } else if (sNSOther === "N-SP") {
          return j.isSupervisor != true 
          // j.isSupervisor === false;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
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
        if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
          return item1;
        } else {
          return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
          return item1;
        } else {
          return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((j: any) => {
        if (empgradesother === "None" || empgradesother === "") {
          return j;
        } else {
          return j.grade
            .toLocaleLowerCase()
            .includes(empgradesother.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empsectionsother === "None" || empsectionsother === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsectionsother.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (
          ProbationStatus1 === "None" ||
          ProbationStatus1 === ""
        ) {
          return j;
        } else {
          return j?.probation_status
            ?.toLocaleLowerCase() === ProbationStatus1?.toLocaleLowerCase();
          // .includes(employeeNameOther?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (AppName1 === "None" || AppName1 === "") {
          return j;
        } else {
          return j.appraiser_name
            .toLocaleLowerCase()
            .includes(AppName1.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (RevName1 === "None" || RevName1 === "") {
          return j;
        } else {
          return j?.reviewer_name
            ?.toLocaleLowerCase() === RevName1?.toLocaleLowerCase();
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (norName1 === "None" || norName1 === "") {
          return j;
        } else {
          return j?.normalizer_name
            ?.toLocaleLowerCase() === norName1?.toLocaleLowerCase();
          //.includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName2 === "") {
          return j;
        } else if (
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
              (j.probation_status !== undefined &&
                j.probation_status
                  .toLocaleLowerCase()
                  .includes(searchName2.toLocaleLowerCase())) ||
                  (j.function !== undefined &&
                    j.function
                      .toLocaleLowerCase()
                      .includes(searchName2.toLocaleLowerCase())) ||
                      (j.appraiser_name !== undefined &&
                        j.appraiser_name
                          .toLocaleLowerCase()
                          .includes(searchName2.toLocaleLowerCase())) ||
                          (j.reviewer_name !== undefined &&
                            j.reviewer_name
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
                              (j.normalizer_name !== undefined &&
                                j.normalizer_name
                                  .toLocaleLowerCase()
                                  .includes(searchName2.toLocaleLowerCase())) ||
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchName2 !== ""){
          if (searchName2 == "SP") {
            return j?.isSupervisor == true;
          }else if (searchName2 == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
    // setfilCount(filteredPagination.length);
    // setfilData(filteredPagination)

    //   if (tabValues === 0 && filteredPagination == null ) {
    //     setMappedCount(0);
    //   } else {
    //   setMappedCount(filteredPagination?.length);
    // }

    setfilCount(filteredPaginationUnmapped?.length);
console.log(filteredPaginationUnmapped?.length,"filteredPaginationUnmapped")
  }, [users,templateAll,sectionsFilter,positionsFilterAll,norName2,RevName2,AppName2,norName1,RevName1,AppName1,ProbationStatus1,positionsFilter,ProbationStatus2,GradesFilter,GradeFilterAll, tabValues, employeeCodeOther, empsectionsother, employeeNameOther, empgradesother, positionsother, sNSOther, searchName2, employeeCodeAll, empsectionsAll, employeeNameAll, empgradesAll, positionsAll, sNSAll, searchNameAll,positionsFilterU,GradesFilterU])
  console.log(filCount, filData, 'filfil')

  useEffect(() => {
    let pagination = activeTemplate
    ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
    ?.filter((j: any) => {
      return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
    })
    ?.filter((j: any) => {
      if (empFullName === "None" || empFullName === "") {
        return j;
      } else {
        return j?.name?.legal_full_name
        ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
        // ?.includes(employeeName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empEmployeeCode === "None" || empEmployeeCode === "") {
        return j;
      } else {
        return j?.name?.employee_code
        ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
        // .includes(employeeCode?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (positions === "None" || positions === "") {
        return j;
      } else {
        return j?.name?.position_long_description
        .toLocaleLowerCase() === positions?.toLocaleLowerCase();
          // .includes(positions.toLocaleLowerCase());
      }
    })
    .filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.name?.position_long_description === item2)
      }
    })
    .filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.name?.grade === item2)
      }
    })
    .filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.name?.grade
        .toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
          // .includes(empgrades.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (empsections === "None" || empsections === "") {
        return j;
      } else {
        return j?.name?.section
        .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
          // .includes(empsections.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      // console.log(j.isSupervisor, "superv");
      if (sNS === "None" || sNS === "") {
        return j;
      }
      if (sNS === "SP") {
        return j?.name?.isSupervisor === true;
      } else if (sNS === "N-SP") {
        return j?.name?.isSupervisor != true;
      }
    })
    .filter((j: any) => {
      if (empdivisions === "None" || empdivisions === "") {
        return j;
      } else {
        return j?.name?.division
        .toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
          // .includes(empdivisions.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      // console.log(j["sub section"], "employeesection");
      if (
        empsubSections === "None" ||
        empsubSections === ""
      ) {
        return j;
      } else {
        return j?.name["sub section"]
        .toLocaleLowerCase() === empsubSections?.toLocaleLowerCase();
          // .includes(empsubSections.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (managerCode === "None" || managerCode === "") {
        return j;
      } else {
        return j?.name?.manager_code
          .toLocaleLowerCase()
          .includes(managerCode.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (managerName === "None" || managerName === "") {
        // console.log(j.manager_name, "name");
        return j;
      } else {
        return j?.name?.manager_name
          .toLocaleLowerCase()
          .includes(managerName.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (workLocation === "None" || workLocation === "") {
        return j;
      } else {
        return j?.name?.work_location
          .toLocaleLowerCase()
          .includes(workLocation.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (ProbationStatus === "None" || ProbationStatus === "") {
        return j;
      } else {
        return j?.name?.probation_status
          .toLocaleLowerCase() === ProbationStatus?.toLocaleLowerCase();
        // .includes(employeeCode?.toLocaleLowerCase());
      }
    })?.filter((j: any) => {
      if (AppName === "None" || AppName === "") {
        return j;
      } else {
        return j?.name?.appraiser_name
          ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (RevName === "None" || RevName === "") {
        return j;
      } else {
        return j?.name?.reviewer_name
          ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (norName === "None" || norName === "") {
        return j;
      } else {
        return j?.name?.normalizer_name
          ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (searchName === "") {
        return j;
      } else if (
        (j?.name?.employee_code !== undefined &&
          j?.name?.employee_code
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.name?.legal_full_name !== undefined &&
          j?.name?.legal_full_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.name?.section !== undefined &&
          j?.name?.section
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.name?.position_long_description !== undefined &&
          j?.name?.position_long_description
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
            (j?.name?.probation_status !== undefined &&
              j?.name?.probation_status
                .toLocaleLowerCase()
                .includes(searchName.toLocaleLowerCase())) ||
                (j?.name?.function !== undefined &&
                  j?.name?.function
                    .toLocaleLowerCase()
                    .includes(searchName.toLocaleLowerCase())) ||
                    (j?.name?.appraiser_name !== undefined &&
                      j?.name?.appraiser_name
                        .toLocaleLowerCase()
                        .includes(searchName.toLocaleLowerCase())) ||
                        (j?.name?.reviewer_name !== undefined &&
                          j?.name?.reviewer_name
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase())) ||
                            (j?.name?.normalizer_name !== undefined &&
                              j?.name?.normalizer_name
                                .toLocaleLowerCase()
                                .includes(searchName.toLocaleLowerCase())) ||
        (j?.name?.grade !== undefined &&
          j?.name?.grade
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase()))
      ) {
        return j;
      }else if(searchName !== ""){
        if (searchName == "SP") {
          return j?.name?.isSupervisor == true;
        }else if (searchName == "N-SP") {
            return j?.name?.isSupervisor != true;
          }
      }
    })
    console.log(pagination?.length, "length")
    if (tabValues === 0 && pagination == null) {
      setMappedCount(0);
    } else {
      setMappedCount(pagination?.length)
    }
  }, [tabValues,sectionsFilter,norName,RevName,AppName,positionsFilter,ProbationStatus,GradesFilter,activeTemplate, searchName, empEmployeeCode, empFullName, empsections, empgrades, searchName2, positions, sNS,positionFilter,GradeFilter])

  
  useEffect(() => {
    console.log(tabValues, "useeffect");
    if (tabValues !== 1) {
      // setSearchName2("");
      setSearchName("");
      setSearchNameAll('')
    }
    if (tabValues !== 0) {
      // setSearchName("");
      setSearchName2("");
      setSearchNameAll('')
    }
    if (tabValues !== 2){
      setSearchName("");
      setSearchName2("");
      // setSearchNameAll('')
    }
  }, [tabValues]);
  useEffect(() => {
    if (filCount > 0) {
      setStateTrigger(true)
    }
  }, [filCount])

  //Export to excel
  const handleExport = () => {
    const unmapped = unmappedEmpDatum
    ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
    ?.filter((j: any) => {
      return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
    })
    ?.filter((j: any) => {
      if (
        employeeNameOther === "None" ||
        employeeNameOther === ""
      ) {
        return j;
      } else {
        return j?.legal_full_name
        ?.toLocaleLowerCase() === employeeNameOther?.toLocaleLowerCase();
        // .includes(employeeNameOther?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (
        employeeCodeOther === "None" ||
        employeeCodeOther === ""
      ) {
        return j;
      } else {
        return j.employee_code
        .toLocaleLowerCase() === employeeCodeOther?.toLocaleLowerCase();
          // .includes(employeeCodeOther.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      console.log(j, "superv");
      if (sNSOther === "None" || sNSOther === "") {
        return j;
      }
      if (sNSOther === "N-SP") {
        return j.isSupervisor != true;
      } else if (sNSOther === "SP") {
        return j.isSupervisor === true
        //  ||
        //  j.isSupervisor === false;
       
      }
    })
    .filter((j: any) => {
      if (
        positionsother === "None" ||
        positionsother === ""
      ) {
        return j;
      } else {
        return j.position_long_description
        .toLocaleLowerCase() === positionsother?.toLocaleLowerCase();
          // .includes(positionsother.toLocaleLowerCase());
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
      if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
        return item1;
      } else {
        return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    .filter((item1: any) => {
      if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
        return item1;
      } else {
        return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
      }
    })
    .filter((j: any) => {
      if (
        empFunctionother === "None" ||
        empFunctionother === ""
      ) {
        return j;
      } else {
        return j.function
        ?.toLocaleLowerCase() === empFunctionother?.toLocaleLowerCase();
          // .includes(empgradesother.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (
        empsectionsother === "None" ||
        empsectionsother === ""
      ) {
        return j;
      } else {
        return j.section
        .toLocaleLowerCase() === empsectionsother?.toLocaleLowerCase();
          // .includes(empsectionsother.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (
        empdivisionsOther === "None" ||
        empdivisionsOther === ""
      ) {
        return j;
      } else {
        return j.division
        .toLocaleLowerCase() === empdivisionsOther?.toLocaleLowerCase();
          // .includes(empdivisionsOther.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      // console.log(j["sub section"], "employeesection");
      if (
        empsubSectionsOther === "None" ||
        empsubSectionsOther === ""
      ) {
        return j;
      } else {
        return j["sub section"]
        .toLocaleLowerCase() === empsubSectionsOther?.toLocaleLowerCase();
          // .includes(
          //   empsubSectionsOther.toLocaleLowerCase()
          // );
      }
    })
    .filter((j: any) => {
      if (
        managerCodeOther === "None" ||
        managerCodeOther === ""
      ) {
        return j;
      } else {
        return j.manager_code
          .toLocaleLowerCase()
          .includes(managerCodeOther.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (
        managerNameOther === "None" ||
        managerNameOther === ""
      ) {
        return j;
      } else {
        return j.manager_name
          .toLocaleLowerCase()
          .includes(managerNameOther.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (
        workLocationOther === "None" ||
        workLocationOther === ""
      ) {
        return j;
      } else {
        return j.work_location
          .toLocaleLowerCase()
          .includes(workLocationOther.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (searchName2 === "") {
        return j;
      } else if (
        (j.employee_code !== undefined &&
          j.employee_code
            .toLocaleLowerCase()
            .includes(searchName2.toLocaleLowerCase())) ||
        (j.legal_full_name !== undefined &&
          j.legal_full_name
            .toLocaleLowerCase()
            .includes(searchName2.toLocaleLowerCase())) ||
        (j.section !== undefined &&
          j.section
            .toLocaleLowerCase()
            .includes(searchName2.toLocaleLowerCase())) ||
        (j.position_long_description !== undefined &&
          j.position_long_description
            .toLocaleLowerCase()
            .includes(searchName2.toLocaleLowerCase())) ||
            (j.probation_status !== undefined &&
              j.probation_status
                .toLocaleLowerCase()
                .includes(searchName2.toLocaleLowerCase())) ||
                (j.function !== undefined &&
                  j.function
                    .toLocaleLowerCase()
                    .includes(searchName2.toLocaleLowerCase())) ||
                    (j.appraiser_name !== undefined &&
                      j.appraiser_name
                        .toLocaleLowerCase()
                        .includes(searchName2.toLocaleLowerCase())) ||
                        (j.reviewer_name !== undefined &&
                          j.reviewer_name
                            .toLocaleLowerCase()
                            .includes(searchName2.toLocaleLowerCase())) ||
                            (j.normalizer_name !== undefined &&
                              j.normalizer_name
                                .toLocaleLowerCase()
                                .includes(searchName2.toLocaleLowerCase())) ||
        (j.grade !== undefined &&
          j.grade
            .toLocaleLowerCase()
            .includes(searchName2.toLocaleLowerCase()))
      ) {
        return j;
      }else if(searchName2 !== ""){
        if (searchName2 == "SP") {
          return j?.isSupervisor == true;
        }else if (searchName2 == "N-SP") {
            return j?.isSupervisor != true;
          }
      } 
    })
      .map((j: any, emp: any) => {
        // console.log(emp,"emp")
        console.log(j,"j")
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
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        return exportData 
      })
      const a = [1]
      const EmptymappedUnmappedData = a.map((j: any) => {
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
        if (columnHeaders["Firstname"] == true) exportData["Known As"] =""
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""
        if (columnHeaders["position"] == true) exportData["Position"] = ""
        if (columnHeaders["Grade"] == true) exportData["Grade"] = ""
        if (columnHeaders["Function"] == true) exportData["Function"] =""
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = ""
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] =""
        if (columnHeaders["Employeeemail"] == true) exportData["Email ID"] = ""
        if (columnHeaders["division"] == true) exportData["Division"] =""
        if (columnHeaders["Section"] == true) exportData["Section"] = ""
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = ""
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] =""
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = ""
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] =""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        return exportData
      })
    const mapped = activeTemplate
    ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                      ?.filter((j: any) => {
                        return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
                      })
                      ?.filter((j: any) => {
                        if (empFullName === "None" || empFullName === "") {
                          return j;
                        } else {
                          return j?.name?.legal_full_name
                          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
                          // ?.includes(employeeName?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empEmployeeCode === "None" || empEmployeeCode === "") {
                          return j;
                        } else {
                          return j?.name?.employee_code
                          ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
                          // .includes(employeeCode?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (positions === "None" || positions === "") {
                          return j;
                        } else {
                          return j?.name?.position_long_description
                          .toLocaleLowerCase() === positions?.toLocaleLowerCase();
                            // .includes(positions.toLocaleLowerCase());
                        }
                      })
                      .filter((item1: any) => {
                        if (positionsFilter.includes("None") || positionsFilter.length === 0) {
                          return item1;
                        } else {
                          return !!positionsFilter?.find((item2: any) => item1?.name?.position_long_description === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (GradesFilter.includes("None") || GradesFilter.length === 0) {
                          return item1;
                        } else {
                          return !!GradesFilter?.find((item2: any) => item1?.name?.grade === item2)
                        }
                      })
                      .filter((j: any) => {
                        if (empFunction === "None" || empFunction === "") {
                          return j;
                        } else {
                          return j?.name?.function
                          .toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
                            // .includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empsections === "None" || empsections === "") {
                          return j;
                        } else {
                          return j?.name?.section
                          .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
                            // .includes(empsections.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j.isSupervisor, "superv");
                        if (sNS === "None" || sNS === "") {
                          return j;
                        }
                        if (sNS === "SP") {
                          return j?.name?.isSupervisor === true;
                        } else if (sNS === "N-SP") {
                          return j?.name?.isSupervisor !=true;
                        }
                      })
                      .filter((j: any) => {
                        if (empdivisions === "None" || empdivisions === "") {
                          return j;
                        } else {
                          return j?.name?.division
                          .toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
                            // .includes(empdivisions.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j["sub section"], "employeesection");
                        if (
                          empsubSections === "None" ||
                          empsubSections === ""
                        ) {
                          return j;
                        } else {
                          return j?.name["sub section"]
                          .toLocaleLowerCase() === empsubSections?.toLocaleLowerCase();
                            // .includes(empsubSections.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (managerCode === "None" || managerCode === "") {
                          return j;
                        } else {
                          return j?.name?.manager_code
                            .toLocaleLowerCase()
                            .includes(managerCode.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (managerName === "None" || managerName === "") {
                          // console.log(j.manager_name, "name");
                          return j;
                        } else {
                          return j?.name?.manager_name
                            .toLocaleLowerCase()
                            .includes(managerName.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (workLocation === "None" || workLocation === "") {
                          return j;
                        } else {
                          return j?.name?.work_location
                            .toLocaleLowerCase()
                            .includes(workLocation.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (searchName === "") {
                          return j;
                        } else if (
                          (j?.name?.employee_code !== undefined &&
                            j?.name?.employee_code
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.legal_full_name !== undefined &&
                            j?.name?.legal_full_name
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.section !== undefined &&
                            j?.name?.section
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.position_long_description !== undefined &&
                            j?.name?.position_long_description
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                              (j?.name?.probation_status !== undefined &&
                                j?.name?.probation_status
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                                  (j?.name?.function !== undefined &&
                                    j?.name?.function
                                      .toLocaleLowerCase()
                                      .includes(searchName.toLocaleLowerCase())) ||
                                      (j?.name?.appraiser_name !== undefined &&
                                        j?.name?.appraiser_name
                                          .toLocaleLowerCase()
                                          .includes(searchName.toLocaleLowerCase())) ||
                                          (j?.name?.reviewer_name !== undefined &&
                                            j?.name?.reviewer_name
                                              .toLocaleLowerCase()
                                              .includes(searchName.toLocaleLowerCase())) ||
                                              (j?.name?.normalizer_name !== undefined &&
                                                j?.name?.normalizer_name
                                                  .toLocaleLowerCase()
                                                  .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.grade !== undefined &&
                            j?.name?.grade
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase()))
                        ) {
                          return j;
                        }else if(searchName !== ""){
                          if (searchName == "SP") {
                            return j?.name?.isSupervisor == true;
                          }else if (searchName == "N-SP") {
                              return j?.name?.isSupervisor != true;
                            }
                        }
                      })
      .map((j: any, emp: any, employee: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")
       // console.log(j?.name?.grade, "code")
        let inputDate = j?.name?.service_reference_date
        const dateParts = inputDate?.split("-");
        console.log(inputDate,dateParts,"inputDate")
        let date = new Date(inputDate);
        const year = date?.getFullYear();
        const month = date?.toLocaleString("default", { month: "short" });
        const day = date?.getDate();
        //const day = dateParts[2]?.slice(0, 2)
        const formattedDate = `${day}-${month}-${year}`;
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.name?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.name?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.name?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = formattedDate
        if (columnHeaders["position"] == true) exportData["Position"] = j?.name?.position_long_description
        if (columnHeaders["Grade"] == true) exportData["Grade"] = j?.name?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.name?.function
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = j?.name?.isSupervisor != true ? "N-SP" : "SP"
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = j?.name?.probation_status
        if (columnHeaders["Employeeemail"] == true) exportData["Email ID"] = j?.name?.email
        if (columnHeaders["division"] == true) exportData["Division"] = j?.name?.division
        if (columnHeaders["Section"] == true) exportData["Section"] = j?.name?.section  
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = j.name?.sub_section   
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.name?.work_location
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = j?.name?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.name?.appraiser_name
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = j?.name?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.name?.reviewer_name
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = j?.name?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.name?.normalizer_name
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.name?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.name?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.name?.manager_position
        return exportData

      })
      const aMapped = [1]
      const EmptymappedData = aMapped.map((j: any) => {
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
          if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
          if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
          if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""
          if (columnHeaders["position"] == true) exportData["Position"] = ""
          if (columnHeaders["Grade"] == true) exportData["Grade"] =""
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
          if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
          if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
          return exportData
      })
    const tempAll = allEmployees
    ?.filter((j: any) => {
      return j?.isCEORole === false && j?.isLeavers === false && j?.isExcluded === false
    })
      .filter((j: any) => {
        if (
          templateAll === "None" ||
          templateAll === ""
        ) {
          return j;
        } else {
          return getTemplateName(j)
            ?.toLocaleLowerCase()
            .includes(templateAll?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        console.log(j, 'jjjjjjjjjjjjjjjjjj')
        if (employeeNameAll === "None" || employeeNameAll === "") {
          return j;
        } else {
          return j?.legal_full_name?.toLocaleLowerCase()
            .includes(employeeNameAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (employeeCodeAll === "None" || employeeCodeAll === "") {
          return j;
        } else {
          return j?.employee_code?.toLocaleLowerCase()
            .includes(employeeCodeAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNSAll === "None" || sNSAll === "") {
          return j;
        }
        if (sNSAll === "SP") {
          return j?.isSupervisor === true;
        } else if (sNSAll === "N-SP") {
          return j?.isSupervisor != true ;
          // || j?.name?.isSupervisor === undefined;
        }
      })
      // .filter((j: any) => {
      //   if (positionsAll === "None" || positionsAll === "") {
      //     return j;
      //   } else {
      //     return j.name.position_long_description
      //       .toLocaleLowerCase()
      //       .includes(positionsAll.toLocaleLowerCase());
      //   }
      // })
      // .filter((j: any) => {
      //   if (empgradesAll === "None" || empgradesAll === "") {
      //     return j;
      //   } else {
      //     return j?.name.grade?.toLocaleLowerCase()
      //       .includes(empgradesAll.toLocaleLowerCase());
      //   }
      // })
      .filter((item1: any) => {
        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
          return item1;
        } else {
          return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
        }
      })
      .filter((item1: any) => {
        if (positionsFilterAll.includes("None") || positionsFilterAll.length === 0) {
          return item1;
        } else {
          return !!positionsFilterAll?.find((item2: any) => item1?.position_long_description === item2)
        }
      })
      .filter((item1: any) => {
        if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
          return item1;
        } else {
          return !!GradeFilterAll?.find((item2: any) => item1?.grade === item2)
        }
      })
      .filter((item1: any) => {
        if (positionFilterAll.includes("None") || positionFilterAll.length === 0) {
          return item1;
        } else {
          return !!positionFilterAll?.find((item2: any) => item1?.position_long_description === item2)
        }
      })

      .filter((j: any) => {
        if (empsectionsAll === "None" || empsectionsAll === "") {
          return j;
        } else {
          return j?.section
            .toLocaleLowerCase()
            .includes(empsectionsAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (
          empFunctionAll === "None" ||
          empFunctionAll === ""
        ) {
          return j;
        } else {
          return j?.function
          ?.toLocaleLowerCase() === empFunctionAll?.toLocaleLowerCase();
            // .includes(empgradesAll.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchNameAll === "") {
          return j;
        } else if (
          (j?.employee_code !== undefined &&
            j?.employee_code
              ?.toLocaleLowerCase()
              ?.includes(searchNameAll?.toLocaleLowerCase())) ||
          (j?.legal_full_name !== undefined &&
            j?.legal_full_name
              ?.toLocaleLowerCase()
              ?.includes(searchNameAll?.toLocaleLowerCase())) ||
          (j?.section !== undefined &&
            j?.section
              ?.toLocaleLowerCase()
              ?.includes(searchNameAll?.toLocaleLowerCase())) ||
          (j?.position_long_description !== undefined &&
            j?.position_long_description
              ?.toLocaleLowerCase()
              ?.includes(searchNameAll?.toLocaleLowerCase())) ||
          (j?.grade !== undefined &&
            j?.grade
              ?.toLocaleLowerCase()
              ?.includes(searchNameAll?.toLocaleLowerCase()))
        ) {
          return j;
        }else if(searchNameAll !== ""){
          if (searchNameAll == "SP") {
            return j?.isSupervisor == true;
          }else if (searchNameAll == "N-SP") {
              return j?.isSupervisor != true;
            }
        }
      })
      .map((j: any, emp: any, employee: any) => {
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
         exportData["Template"] = getTemplateName(j)
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
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        return exportData

      })
      const aAll = [1]
      const EmptymappedAll = aAll.map((j: any) => {
        let exportData: any = {}
        exportData["Template"] = ""
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
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] =""
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = ""
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] =""
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        return exportData
      })
    // setShow(0);
    let excelExportData: any = {};
    if(tabValues == 0){
      excelExportData =  mapped?.length == 0 ? EmptymappedAll :mapped
    }
    if(tabValues == 1){
      excelExportData =  unmapped?.length == 0 ? EmptymappedAll :unmapped
    }
    if(tabValues == 2){
      excelExportData =  tempAll?.length == 0 ? EmptymappedAll :tempAll
    }
    console.log(users, 'excel')
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(excelExportData);



    XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');



    XLSX.writeFile(wb, 'MyExcel.xlsx');
  }

  useEffect(() => {
  // Ananth 5/25/23 ==> closed calendar mapped employees are to be All employees
    let Alemployeesclosed =MappedTemplates?.map((j:any)=>{
      return j?.position
          })
          console.log(Alemployeesclosed,"Alemployeesclosed")
          let Alemployeesclosed2 = Alemployeesclosed
          ?.map((arr:any) => {
            if (arr) {
              return arr.map((j:any) => {
                return j?.name;
              });
            }
          });
          let concatenatedArray = [].concat(...Alemployeesclosed2);
          console.log(concatenatedArray,"concatenatedArray")
          console.log(Alemployeesclosed2,"Alemployeesclosed2")
          const calenderIfClosed = MappedTemplates?.map((i:any)=>{
            return i?.calendar?.status
          })
          console.log(calenderIfClosed,"Alemployeesclosed2")
    if(calenderIfClosed.includes("Closed")){
      console.log(calenderIfClosed.includes("Closed"),"Alemployeesclosed2")
    setAllEmployees(concatenatedArray)
  
    }
    else if (users) {
      console.log(users, 'userssssssssssss')
      let tempAllEmp: any = users
      ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.employee_code }).indexOf(item.employee_code) === index)

      ?.map((item: any) => {
        return {
          name: item
        }
      });
      console.log(tempAllEmp,'tempAllEmp')
      if (tempAllEmp.length > 0) {
        setAllEmployees(tempAllEmp.map((j:any)=>{
          return j?.name
        }))
      }
    
console.log("filteredPosition",filteredPosition)
    }
    let tempTemplates = appraisalCalData?.data?.filter((i: any) => i?.calendar?._id == year);
    console.log(tempTemplates,"tempTemplates")
    let filterPosition = tempTemplates && tempTemplates.filter((i: any) => i.position.length > 0);
    if (filterPosition && filterPosition?.length > 0) {
      setFilteredPosition(filterPosition)
    }
  }, [activeTemplate, unmappedEmpDatum,MappedTemplates])

 
  const getTemplateName = (employee: any) => {
    console.log(employee,"alemployealemploye")
    console.log(filteredPosition,"alemployealemploye")
    if (filteredPosition) {
      let templateItem: any = filteredPosition.find((template: any) => {
        let positions = template?.position
        return positions?.find((item: any) => item?.name?._id == employee?._id)
      });
      let alemploye =filteredPosition?.map((j:any)=>{
        return j?.position
      })
//       const totalConcatenatedValue = alemploye.reduce((acc: any, value: any) => acc + value.name, "");
// console.log(totalConcatenatedValue,"totalConcatenatedValue");
      // setallEmployeesforclosed
      //      let DataforInitial: any[] = high3Value?.data?.concat(high4Value?.data, high5Value?.data, moderate3Value?.data, moderate4Value?.data, moderate5Value?.data, low3Value?.data, low4Value?.data, low5Value?.data)

      console.log(alemploye,"alemployealemploye")
      console.log(templateItem,"templateItem")
      if (templateItem && templateItem !== "") {
        // settabValues(0);
        
      }
      if (templateItem && templateItem !== "") {
        // settabValues(0);
        return templateItem?.template?.name + ""
      } else {
        return "-"
      }
      
    }  }
    const getTemplatecode = (employee: any) => {
      if (filteredPosition) {
        let templateItem: any = filteredPosition.find((template: any) => {
          let positions = template?.position
          return positions?.find((item: any) => item?.name?._id == employee?.name?._id)
        });
        if (templateItem && templateItem !== "") {
          settabValues(0);
        }
      }
    }

//  to navigate to the template based on the template selected
    const templateNavigateHandler = (employee:any) => {
      console.log(employee,"lllllll")
      setname(() =>  getTemplateName(employee)
      ); 
      getTemplatecode(employee)
    }
  //export functionalities

const handleDrawer = (event: SelectChangeEvent) => {
  setisDrawerOpen(false);
};
const handleheadingSortAccept = () => {
  setisDrawerOpen(false);
  handleExport();
};
const handleExportFunction = () => {
  setisDrawerOpen(true);
  //FiiteredExport1();

};
const handleCloseGrade = () => {
  setisDrawerOpen(false);
  setcolumnHeaders({
    Ecode: true,
  Ename: true,
  Firstname:true,
  Eposition: true,
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
  OverAllRating: true,
  PreviousRating: true,
  AppraiserCode: true,
  ReviewerCode: true,
  NormalizerCode: true,
  ProbationStatus: true,
  Employeeemail: true,
  position:true,
  SelectAll: true,
  })
};
const mappedemployeeLength = activeTemplate
?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((j: any) => {
  if (empFullName === "None" || empFullName === "") {
    return j;
  } else {
    return j?.name?.legal_full_name
    ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
    // ?.includes(employeeName?.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (empEmployeeCode === "None" || empEmployeeCode === "") {
    return j;
  } else {
    return j?.name?.employee_code
    ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
    // .includes(employeeCode?.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (positions === "None" || positions === "") {
    return j;
  } else {
    return j?.name?.position_long_description
    .toLocaleLowerCase() === positions?.toLocaleLowerCase();
      // .includes(positions.toLocaleLowerCase());
  }
})
.filter((item1: any) => {
  if (positionsFilter.includes("None") || positionsFilter.length === 0) {
    return item1;
  } else {
    return !!positionsFilter?.find((item2: any) => item1?.name?.position_long_description === item2)
  }
})
.filter((item1: any) => {
  if (GradesFilter.includes("None") || GradesFilter.length === 0) {
    return item1;
  } else {
    return !!GradesFilter?.find((item2: any) => item1?.name?.grade === item2)
  }
})
.filter((j: any) => {
  if (empFunction === "None" || empFunction === "") {
    return j;
  } else {
    return j?.name?.function
    .toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
      // .includes(empgrades.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (empsections === "None" || empsections === "") {
    return j;
  } else {
    return j?.name?.section
    .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
      // .includes(empsections.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  // console.log(j.isSupervisor, "superv");
  if (sNS === "None" || sNS === "") {
    return j;
  }
  if (sNS === "SP") {
    return j?.name?.isSupervisor === true;
  } else if (sNS === "N-SP") {
    return j?.name?.isSupervisor !=true;
  }
})
.filter((j: any) => {
  if (empdivisions === "None" || empdivisions === "") {
    return j;
  } else {
    return j?.name?.division
    .toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
      // .includes(empdivisions.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  // console.log(j["sub section"], "employeesection");
  if (
    empsubSections === "None" ||
    empsubSections === ""
  ) {
    return j;
  } else {
    return j?.name["sub section"]
    .toLocaleLowerCase() === empsubSections?.toLocaleLowerCase();
      // .includes(empsubSections.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (managerCode === "None" || managerCode === "") {
    return j;
  } else {
    return j?.name?.manager_code
      .toLocaleLowerCase()
      .includes(managerCode.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (managerName === "None" || managerName === "") {
    // console.log(j.manager_name, "name");
    return j;
  } else {
    return j?.name?.manager_name
      .toLocaleLowerCase()
      .includes(managerName.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (workLocation === "None" || workLocation === "") {
    return j;
  } else {
    return j?.name?.work_location
      .toLocaleLowerCase()
      .includes(workLocation.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (searchName === "") {
    return j;
  } else if (
    (j?.name?.employee_code !== undefined &&
      j?.name?.employee_code
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.name?.legal_full_name !== undefined &&
      j?.name?.legal_full_name
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.name?.section !== undefined &&
      j?.name?.section
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.name?.position_long_description !== undefined &&
      j?.name?.position_long_description
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
        (j?.name?.probation_status !== undefined &&
          j?.name?.probation_status
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
            (j?.name?.function !== undefined &&
              j?.name?.function
                .toLocaleLowerCase()
                .includes(searchName.toLocaleLowerCase())) ||
                (j?.name?.appraiser_name !== undefined &&
                  j?.name?.appraiser_name
                    .toLocaleLowerCase()
                    .includes(searchName.toLocaleLowerCase())) ||
                    (j?.name?.reviewer_name !== undefined &&
                      j?.name?.reviewer_name
                        .toLocaleLowerCase()
                        .includes(searchName.toLocaleLowerCase())) ||
                        (j?.name?.normalizer_name !== undefined &&
                          j?.name?.normalizer_name
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase())) ||
    (j?.name?.grade !== undefined &&
      j?.name?.grade
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase()))
  ) {
    return j;
  }else if(searchName !== ""){
    if (searchName == "SP") {
      return j?.name?.isSupervisor == true;
    }else if (searchName == "N-SP") {
        return j?.name?.isSupervisor != true;
      }
  }
})?.length
  const unMappedEmployeeLength = unmappedEmpDatum
  ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
  ?.filter((j: any) => {
    return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
  })
  ?.filter((j: any) => {
    if (
      employeeNameOther === "None" ||
      employeeNameOther === ""
    ) {
      return j;
    } else {
      return j?.legal_full_name
      ?.toLocaleLowerCase() === employeeNameOther?.toLocaleLowerCase();
      // .includes(employeeNameOther?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      employeeCodeOther === "None" ||
      employeeCodeOther === ""
    ) {
      return j;
    } else {
      return j.employee_code
      .toLocaleLowerCase() === employeeCodeOther?.toLocaleLowerCase();
        // .includes(employeeCodeOther.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    console.log(j, "superv");
    if (sNSOther === "None" || sNSOther === "") {
      return j;
    }
    if (sNSOther === "N-SP") {
      return j.isSupervisor != true;
    } else if (sNSOther === "SP") {
      return j.isSupervisor === true
      //  ||
      //  j.isSupervisor === false;
     
    }
  })
  .filter((j: any) => {
    if (
      positionsother === "None" ||
      positionsother === ""
    ) {
      return j;
    } else {
      return j.position_long_description
      .toLocaleLowerCase() === positionsother?.toLocaleLowerCase();
        // .includes(positionsother.toLocaleLowerCase());
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
    if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
      return item1;
    } else {
      return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
    }
  })
  .filter((item1: any) => {
    if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
      return item1;
    } else {
      return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
    }
  })
  .filter((j: any) => {
    if (
      empFunctionother === "None" ||
      empFunctionother === ""
    ) {
      return j;
    } else {
      return j.function
      ?.toLocaleLowerCase() === empFunctionother?.toLocaleLowerCase();
        // .includes(empgradesother.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empsectionsother === "None" ||
      empsectionsother === ""
    ) {
      return j;
    } else {
      return j.section
      .toLocaleLowerCase() === empsectionsother?.toLocaleLowerCase();
        // .includes(empsectionsother.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empdivisionsOther === "None" ||
      empdivisionsOther === ""
    ) {
      return j;
    } else {
      return j.division
      .toLocaleLowerCase() === empdivisionsOther?.toLocaleLowerCase();
        // .includes(empdivisionsOther.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    // console.log(j["sub section"], "employeesection");
    if (
      empsubSectionsOther === "None" ||
      empsubSectionsOther === ""
    ) {
      return j;
    } else {
      return j["sub section"]
      .toLocaleLowerCase() === empsubSectionsOther?.toLocaleLowerCase();
        // .includes(
        //   empsubSectionsOther.toLocaleLowerCase()
        // );
    }
  })
  .filter((j: any) => {
    if (
      managerCodeOther === "None" ||
      managerCodeOther === ""
    ) {
      return j;
    } else {
      return j.manager_code
        .toLocaleLowerCase()
        .includes(managerCodeOther.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      managerNameOther === "None" ||
      managerNameOther === ""
    ) {
      return j;
    } else {
      return j.manager_name
        .toLocaleLowerCase()
        .includes(managerNameOther.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      workLocationOther === "None" ||
      workLocationOther === ""
    ) {
      return j;
    } else {
      return j.work_location
        .toLocaleLowerCase()
        .includes(workLocationOther.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (searchName2 === "") {
      return j;
    }else if (
      (j.employee_code !== undefined &&
        j.employee_code
          .toLocaleLowerCase()
          .includes(searchName2.toLocaleLowerCase())) ||
      (j.legal_full_name !== undefined &&
        j.legal_full_name
          .toLocaleLowerCase()
          .includes(searchName2.toLocaleLowerCase())) ||
      (j.section !== undefined &&
        j.section
          .toLocaleLowerCase()
          .includes(searchName2.toLocaleLowerCase())) ||
      (j.position_long_description !== undefined &&
        j.position_long_description
          .toLocaleLowerCase()
          .includes(searchName2.toLocaleLowerCase())) ||
          (j.probation_status !== undefined &&
            j.probation_status
              .toLocaleLowerCase()
              .includes(searchName2.toLocaleLowerCase())) ||
              (j.function !== undefined &&
                j.function
                  .toLocaleLowerCase()
                  .includes(searchName2.toLocaleLowerCase())) ||
                  (j.appraiser_name !== undefined &&
                    j.appraiser_name
                      .toLocaleLowerCase()
                      .includes(searchName2.toLocaleLowerCase())) ||
                      (j.reviewer_name !== undefined &&
                        j.reviewer_name
                          .toLocaleLowerCase()
                          .includes(searchName2.toLocaleLowerCase())) ||
                          (j.normalizer_name !== undefined &&
                            j.normalizer_name
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
      (j.grade !== undefined &&
        j.grade
          .toLocaleLowerCase()
          .includes(searchName2.toLocaleLowerCase()))
    ) {
      return j;
    }else if(searchName2 !== ""){
      if (searchName2 == "SP") {
        return j?.isSupervisor == true;
      }else if (searchName2 == "N-SP") {
          return j?.isSupervisor != true;
        }
    } 
  })?.length

  const allEmployeeLength = allEmployees
  ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
  ?.filter((j: any) => {
    return j?.isCEORole === false && j?.isLeavers === false && j?.isExcluded === false
  })
  ?.filter((j: any) => {
    console.log(j, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    if (
      templateAll === "None" ||
      templateAll === ""
    ) {
      return j;
    } else {
      return getTemplateName(j)
        ?.toLocaleLowerCase()
        .includes(templateAll?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (AppName2 === "None" || AppName2 === "") {
      return j;
    } else {
      return j.appraiser_name
        .toLocaleLowerCase()
        .includes(AppName2.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (RevName2 === "None" || RevName2 === "") {
      return j;
    } else {
      return j?.reviewer_name
        ?.toLocaleLowerCase() === RevName2?.toLocaleLowerCase();
      //.includes(empgrades.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (norName2 === "None" || norName2 === "") {
      return j;
    } else {
      return j?.normalizer_name
        ?.toLocaleLowerCase() === norName2?.toLocaleLowerCase();
      //.includes(empgrades.toLocaleLowerCase());
    }
  })
  ?.filter((j: any) => {
    console.log(j, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    if (
      employeeNameAll === "None" ||
      employeeNameAll === ""
    ) {
      return j;
    } else {
      return j?.legal_full_name
      ?.toLocaleLowerCase() === employeeNameAll?.toLocaleLowerCase();
        // .includes(employeeNameAll?.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      employeeCodeAll === "None" ||
      employeeCodeAll === ""
    ) {
      return j;
    } else {
      return j?.employee_code
      ?.toLocaleLowerCase() === employeeCodeAll?.toLocaleLowerCase();
        // .includes(employeeCodeAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    // console.log(j.isSupervisor, "superv");
    if (sNSAll === "None" || sNSAll === "") {
      return j;
    }
    if (sNSAll === "SP") {
      return j?.isSupervisor === true;
    } else if (sNSAll === "N-SP") {
      return j?.isSupervisor != true 
      // || j?.name?.isSupervisor === undefined;
    }
  })
  .filter((j: any) => {
    if (
      positionsAll === "None" ||
      positionsAll === ""
    ) {
      return j;
    } else {
      return j?.position_long_description
      ?.toLocaleLowerCase() === positionsAll?.toLocaleLowerCase();
        // .includes(positionsAll.toLocaleLowerCase());
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
    if (positionsFilterAll.includes("None") || positionsFilterAll.length === 0) {
      return item1;
    } else {
      return !!positionsFilterAll?.find((item2: any) => item1?.position_long_description === item2)
    }
  })
  .filter((item1: any) => {
    if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
      return item1;
    } else {
      return !!GradeFilterAll?.find((item2: any) => item1?.grade === item2)
    }
  })
  .filter((item1: any) => {
    if (positionFilterAll.includes("None") || positionFilterAll.length === 0) {
      return item1;
    } else {
      return !!positionFilterAll?.find((item2: any) => item1?.position_long_description === item2)
    }
  })
  // .filter((item1: any) => {
  //   if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
  //     return item1;
  //   } else {
  //     return !!GradeFilterAll?.find((item2: any) => item1?.name?.grade === item2)
  //   }
  // })
  .filter((j: any) => {
    if (
      empFunctionAll === "None" ||
      empFunctionAll === ""
    ) {
      return j;
    } else {
      return j?.function
      ?.toLocaleLowerCase() === empFunctionAll?.toLocaleLowerCase();
        // .includes(empgradesAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empsectionsAll === "None" ||
      empsectionsAll === ""
    ) {
      return j;
    } else {
      return j?.section
      ?.toLocaleLowerCase() === empsectionsAll?.toLocaleLowerCase();
        // .includes(empsectionsAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (ProbationStatus2 === "None" || ProbationStatus2 === "") {
      return j;
    } else {
      return j?.probation_status
        .toLocaleLowerCase()
        .includes(ProbationStatus2.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      empdivisionsAll === "None" ||
      empdivisionsAll === ""
    ) {
      return j;
    } else {
      return j?.division
      ?.toLocaleLowerCase() === empdivisionsAll?.toLocaleLowerCase();
        // .includes(empdivisionsAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    // console.log(j["sub section"], "employeesection");
    if (
      empsubSectionsAll === "None" ||
      empsubSectionsAll === ""
    ) {
      return j;
    } else {
      return j["sub section"]
      ?.toLocaleLowerCase() === empsubSectionsAll?.toLocaleLowerCase();
        // .includes(
        //   empsubSectionsAll.toLocaleLowerCase()
        // );
    }
  })
  .filter((j: any) => {
    if (
      managerCodeAll === "None" ||
      managerCodeAll === ""
    ) {
      return j;
    } else {
      return j?.manager_code
        .toLocaleLowerCase()
        .includes(managerCodeAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      managerNameAll === "None" ||
      managerNameAll === ""
    ) {
      return j;
    } else {
      return j?.manager_name
        .toLocaleLowerCase()
        .includes(managerNameAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (
      workLocationAll === "None" ||
      workLocationAll === ""
    ) {
      return j;
    } else {
      return j?.work_location
        .toLocaleLowerCase()
        .includes(workLocationAll.toLocaleLowerCase());
    }
  })
  .filter((j: any) => {
    if (searchNameAll === "") {
      return j;
    }else if (
      (getTemplateName(j) !== undefined &&    
        // @ts-ignore
        getTemplateName(j)
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase())) ||
      (j?.employee_code !== undefined &&
        j?.employee_code
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase())) ||
      (j?.legal_full_name !== undefined &&
        j?.legal_full_name
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase())) ||
      (j?.section !== undefined &&
        j?.section
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase())) ||
      (j?.position_long_description !== undefined &&
        j?.position_long_description
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase())) ||
          (j?.probation_status !== undefined &&
            j?.probation_status
              .toLocaleLowerCase()
              .includes(searchNameAll.toLocaleLowerCase())) ||
              (j?.function !== undefined &&
                j?.function
                  .toLocaleLowerCase()
                  .includes(searchNameAll.toLocaleLowerCase())) ||
                  (j?.appraiser_name !== undefined &&
                    j?.appraiser_name
                      .toLocaleLowerCase()
                      .includes(searchNameAll.toLocaleLowerCase())) ||
                      (j?.reviewer_name !== undefined &&
                        j?.reviewer_name
                          .toLocaleLowerCase()
                          .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.normalizer_name !== undefined &&
                            j?.normalizer_name
                              .toLocaleLowerCase()
                           .includes(searchNameAll.toLocaleLowerCase())) ||
      (j?.grade !== undefined &&
        j?.grade
          .toLocaleLowerCase()
          .includes(searchNameAll.toLocaleLowerCase()))
    ) {
      return j;
    }else if(searchNameAll !== ""){
      if (searchNameAll == "SP") {
        return j?.isSupervisor == true;
      }else if (searchNameAll == "N-SP") {
          return j?.isSupervisor != true;
        }
    }
  })?.length
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setSearchName(e.target.value)
    setPage(0)
   
  }
  const handleSearchBar2 = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    
    setSearchName2(e.target.value)
    setPage(0)
  }
  const handleSearchBarAll = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setSearchNameAll(e.target.value);
    setPage(0)
  }
  //filter options for mapped
const probationStatusForMapped = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a.name?.probation_status - b.name?.probation_status;
})
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.name?.probation_status }).indexOf(item?.name?.probation_status) === index)
?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 

const functionArrayForMapped = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.function?.localeCompare(b?.name?.function);
})
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.function }).indexOf(item?.name?.function) === index)
?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 

const appraiserArrayForMapped = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.appraiser_name?.localeCompare(b?.name?.appraiser_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.appraiser_name }).indexOf(item?.name?.appraiser_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
const reviewerArrayForMapped = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.reviewer_name?.localeCompare(b?.name?.reviewer_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.reviewer_name }).indexOf(item?.name?.reviewer_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
const normalizerArrayForMapped = activeTemplate
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.normalizer_name?.localeCompare(b?.name?.normalizer_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.normalizer_name }).indexOf(item?.name?.normalizer_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 

  //filter options for unmapped
const probationStatus = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a.name?.probation_status - b.name?.probation_status;
})
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.name?.probation_status }).indexOf(item?.name?.probation_status) === index)
?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 

const functionArray = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.function?.localeCompare(b?.name?.function);
})
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.function }).indexOf(item?.name?.function) === index)
?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 

const appraiserArray = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.appraiser_name?.localeCompare(b?.name?.appraiser_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.appraiser_name }).indexOf(item?.name?.appraiser_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
const reviewerArray = allEmployees
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.reviewer_name?.localeCompare(b?.name?.reviewer_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.reviewer_name }).indexOf(item?.name?.reviewer_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
const normalizerArray = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.function?.localeCompare(b?.name?.normalizer_name);
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.normalizer_name }).indexOf(item?.name?.normalizer_name) === index)
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
const sectionArrayUNMapped = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.name?.section?.localeCompare(b?.name?.section);
})
?.filter((j: any) => {
  return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
})
?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.section }).indexOf(item?.name?.section) === index)
?.filter((i: any) => {
  if (searchName.length > 0) {
    const searchTerms = searchName.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.name?.position_long_description
        ?.toLowerCase()
        .includes(term)
    )|| searchTerms.every(term =>
      i?.name?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.name?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
    || searchTerms.every(term =>
      i?.name?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.name?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
}) 
//filter option for unmapped 
const probationStatusUnmapped = unmappedEmpDatum
.slice()
                            ?.sort(function (a: any, b: any) {
                              return a.probation_status - b.probation_status;
                            })
                            ?.filter((j: any) => {
                              return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
                            })
                            ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.probation_status }).indexOf(item?.probation_status) === index)
?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
const functionArrayUnmapped = unmappedEmpDatum
.slice()
                            ?.sort(function (a: any, b: any) {
                              return a.function - b.function;
                            })
                            ?.filter((j: any) => {
                              return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
                            })
                            ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.function }).indexOf(item?.function) === index)
?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
// const functionArrayUnmapped = Array.from(
//   new Set(
//     unmappedEmpDatum
//       ?.filter((j:any) => !j.isCEORole && !j.isLeavers && !j.isExcluded)
//       ?.filter((i:any) => {
//         if (searchName2.length > 0) {
//           const searchTerms = searchName2.toLowerCase().split(" ");
//           return searchTerms.some((term) =>
//             [
//               i.grade,
//               i.position_long_description,
//               i.section,
//               i.legal_full_name,
//               i.section,
//               i.employee_code,
//               i.probation_status,
//               i.function,
//               i.appraiser_name,
//               i.reviewer_name,
//               i.normalizer_name,
//               i.legal_full_name,
//             ].some((field) => field.toLowerCase().includes(term))
//           );
//         } else {
//           return true;
//         }
//       })
//      ?.map((item:any) => item.function)
//   )
// );
// const appraiserArrayUnmapped = Array.from(
//   new Set(
//     unmappedEmpDatum
//       ?.filter((j:any) => !j.isCEORole && !j.isLeavers && !j.isExcluded)
//       ?.filter((i:any) => {
//         if (searchName2.length > 0) {
//           const searchTerms = searchName2.toLowerCase().split(" ");
//           return searchTerms.some((term) =>
//             [
//               i.grade,
//               i.position_long_description,
//               i.section,
//               i.legal_full_name,
//               i.section,
//               i.employee_code,
//               i.probation_status,
//               i.function,
//               i.appraiser_name,
//               i.reviewer_name,
//               i.normalizer_name,
//               i.legal_full_name,
//             ].some((field) => field.toLowerCase().includes(term))
//           );
//         } else {
//           return true;
//         }
//       })
//      ?.map((item:any) => item.appraiser_name)
//   )
// )
const appraiserArrayUnmapped = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.appraiser_name?.localeCompare(b?.appraiser_name);
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.appraiser_name }).indexOf(item?.appraiser_name) === index)
?.filter((j: any) => {
  return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
})?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
const reviewerArrayUnmapped = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.reviewer_name?.localeCompare(b?.reviewer_name);
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.reviewer_name }).indexOf(item?.reviewer_name) === index)
?.filter((j: any) => {
  return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
})?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
const normalizerArrayUnmapped = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.normalizer_name?.localeCompare(b?.normalizer_name);
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.normalizer_name }).indexOf(item?.normalizer_name) === index)
?.filter((j: any) => {
  return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
})?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
const sectionArrayUnmapped = unmappedEmpDatum
?.slice()
?.sort(function (a: any, b: any) {
  return a?.section?.localeCompare(b?.section);
})
?.filter((j: any) => {
  return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
})
?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data.section }).indexOf(item.section) === index)
?.filter((i: any) => {
  if (searchName2.length > 0) {
    const searchTerms = searchName2.toLowerCase().split(" ");
    return searchTerms.every(term =>
      i?.grade?.toLowerCase().includes(term)
    ) || searchTerms.every(term =>
      i?.position_long_description?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.section?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.employee_code?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.probation_status?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.function?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.appraiser_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.reviewer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.normalizer_name?.toLowerCase().includes(term)
    )|| searchTerms.every(term =>
      i?.legal_full_name?.toLowerCase().includes(term)
    )
  } else {
    return true;
  }
})
console.log(functionArrayUnmapped,appraiserArrayUnmapped,normalizerArrayUnmapped,reviewerArrayUnmapped,sectionArrayUnmapped,"sectionArrayUnmappedsectionArrayUnmapped")
//filter option for all employee
const probationStatusAllEmp = Array.from(
  new Set(
    allEmployees
      ?.filter((j:any) => !j.isCEORole && !j?.isLeavers && !j?.isExcluded)
      ?.filter((i:any) => {
        if (searchNameAll?.length > 0) {
          const searchTerms = searchNameAll?.toLowerCase()?.split(" ");
          return searchTerms?.some((term) =>
            [
              i?.section,
              i?.position_long_description,
              i?.grade,
              i?.legal_full_name,
              i?.section,
              i?.employee_code,
              i?.probation_status,
              i?.function,
              i?.appraiser_name,
              i?.reviewer_name,
              i?.normalizer_name,
              i?.legal_full_name,
            ]?.some((field) => field?.toLowerCase()?.includes(term))
          );
        } else {
          return true;
        }
      })
     ?.map((item:any) => item?.probation_status)
  )
);
const functionArrayAllEmp = Array.from(
  new Set(
    allEmployees
      ?.filter((j:any) => !j.name?.isCEORole && !j?.name?.isLeavers && !j?.name?.isExcluded)
      ?.filter((i:any) => {
        if (searchNameAll?.length > 0) {
          const searchTerms = searchNameAll?.toLowerCase()?.split(" ");
          return searchTerms?.some((term) =>
            [
              i?.name?.grade,
              i?.name?.position_long_description,
              i?.name?.section,
              i?.name?.legal_full_name,
              i?.name?.section,
              i?.name?.employee_code,
              i?.name?.probation_status,
              i?.name?.function,
              i?.name?.appraiser_name,
              i?.name?.reviewer_name,
              i?.name?.normalizer_name,
              i?.name?.legal_full_name,
            ]?.some((field) => field?.toLowerCase()?.includes(term))
          );
        } else {
          return true;
        }
      })
     ?.map((item:any) => item?.name?.function)
  )
);
const appraiserArrayAllEmp = Array.from(
  new Set(
    allEmployees
      ?.filter((j:any) => !j.name?.isCEORole && !j?.name?.isLeavers && !j?.name?.isExcluded)
      ?.filter((i:any) => {
        if (searchNameAll?.length > 0) {
          const searchTerms = searchNameAll?.toLowerCase()?.split(" ");
          return searchTerms?.some((term) =>
            [
              i?.name?.grade,
              i?.name?.position_long_description,
              i?.name?.section,
              i?.name?.legal_full_name,
              i?.name?.section,
              i?.name?.employee_code,
              i?.name?.probation_status,
              i?.name?.function,
              i?.name?.appraiser_name,
              i?.name?.reviewer_name,
              i?.name?.normalizer_name,
              i?.name?.legal_full_name,
            ].some((field) => field?.toLowerCase()?.includes(term))
          );
        } else {
          return true;
        }
      })
     ?.map((item:any) => item?.name?.appraiser_name)
  )
);

  const reviewerArrayAllEmp = 
  allEmployees
  ?.slice()
  ?.sort(function (a: any, b: any) {
   return a?.reviewer_name?.localeCompare(b?.reviewer_name);
  })
  ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.reviewer_name }).indexOf(item?.reviewer_name) === index)
  ?.filter((i: any) => {
    if (searchName2.length > 0) {
      const searchTerms = searchName2.toLowerCase().split(" ");
      return searchTerms.every(term =>
        i?.grade?.toLowerCase().includes(term)
      ) || searchTerms.every(term =>
        i?.position_long_description?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.section?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.legal_full_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.section?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.employee_code?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.probation_status?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.function?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.appraiser_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.reviewer_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.normalizer_name?.toLowerCase().includes(term)
      )|| searchTerms.every(term =>
        i?.legal_full_name?.toLowerCase().includes(term)
      )
    } else {
      return true;
    }
  })



const normalizerArrayAllEmp = Array.from(
  new Set(
    allEmployees
      ?.filter((j:any) => !j.name?.isCEORole && !j?.name?.isLeavers && !j?.name?.isExcluded)
      ?.filter((i:any) => {
        if (searchNameAll?.length > 0) {
          const searchTerms = searchNameAll?.toLowerCase()?.split(" ");
          return searchTerms?.some((term) =>
            [
              i?.name?.grade,
              i?.name?.position_long_description,
              i?.name?.section,
              i?.name?.legal_full_name,
              i?.name?.section,
              i?.name?.employee_code,
              i?.name?.probation_status,
              i?.name?.function,
              i?.name?.appraiser_name,
              i?.name?.reviewer_name,
              i?.name?.normalizer_name,
              i?.name?.legal_full_name,
            ]?.some((field) => field?.toLowerCase()?.includes(term))
          );
        } else {
          return true;
        }
      })
     ?.map((item:any) => item?.name?.normalizer_name)
  )
);
const sectionArrayMappedAllEmp = Array.from(
  new Set(
    allEmployees
      ?.filter((j:any) => !j?.name?.isCEORole && !j?.name?.isLeavers && !j?.name?.isExcluded)
      ?.filter((i:any) => {
        if (searchNameAll?.length > 0) {
          const searchTerms = searchNameAll?.toLowerCase()?.split(" ");
          return searchTerms?.some((term) =>
            [
              i?.name?.grade,
              i?.name?.position_long_description,
              i?.name?.section,
              i?.name?.legal_full_name,
              i?.name?.section,
              i?.name?.employee_code,
              i?.name?.probation_status,
              i?.name?.function,
              i?.name?.appraiser_name,
              i?.name?.reviewer_name,
              i?.name?.normalizer_name,
              i?.name?.legal_full_name,
            ]?.some((field) => field?.toLowerCase()?.includes(term))
          );
        } else {
          return true;
        }
      })
     ?.map((item:any) => item?.name?.section)
  )
);
  return (
    <div>
       {showemptyVal == true && <div>No calendar has been created!</div>}
      {positionsHide && (
        <>
        
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height="40px"
          >
            <div
              style={{
                float: "left",
                fontSize: "18px",
                fontFamily: "Arial",
                color: "#3e8cb5",
              }}
            >
              {/* Positions of {name1 ? name1 : name} */}
              Employee List
            </div>
            {hideAlert && (
              <Box
                style={{
                  backgroundColor: "#eff8ef",
                  width: "360px",
                  height: "35px",
                  padding: "1px",
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ paddingLeft: "10px", color: "#7ec580" }}>
                  Employees mapped to template successfully!
                </p>
              </Box>
            )}
            {changedAlert && (
              <Alert severity="error">No changes were made to save!</Alert>
            )}
            <Stack direction="row" sx={{ justifyContent: "right" }} spacing={2}>
              {tabValues == 0 && (
                <Searchfeild1>
                  <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Search Here..."
                    //onChange={(e) => setSearchName(e.target.value)}
                     onChange={handleSearchBar}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={Searchicon} alt="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Searchfeild1>
              )}

              {tabValues === 1 && (
                <Searchfeild1>
                  <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Search Here..."
                    onChange={handleSearchBar2}
                    //onChange={(e) => setSearchName2(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={Searchicon} alt="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Searchfeild1>
              )}

              {tabValues === 2 && (
                <Searchfeild1>
                  <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Search Here..."
                    onChange={handleSearchBarAll}
                    // onChange={(e) => {
                    //   setSearchNameAll(e.target.value)
                    //   setPage(0)
                    // }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src={Searchicon} alt="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Searchfeild1>
              )}

              {/* <Link to={MAPPED_TEMPLATE_2}>
                <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#014D76",
                    height: '36px'
                  }}
                  variant="contained"
                  size="small"
                >
                  View Mapped templates
                </Button>
              </Link>
              <Link to={LINK_CALENDAR}>
                <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#014D76",
                    height: '36px'
                  }}
                  variant="contained"
                  size="small"
                >
                  Link Calendar
                </Button>
              </Link> */}

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
                size="small"
                onClick={() => {
                  // selectOneError(checkboxIdHandler(checkboxHandler(users)));
                  // onSubmitP({
                  //   position: checkboxIdHandler(checkboxHandler(users)),
                  // });
                  // filterReset();
                  saveHandler();
                }}
                // onClick={handleopen}
              >
                Save
              </Button> */}
              {calendarId && templateId && displayEdit && (
                <Link to={`${VIEW_MAPPED_TEMPLATE}/${templateId}`}
                  state={{
                    from: `${calendarId}`,

                  }}>
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                    }}
                    variant="outlined"
                    size="small"

                  >
                    Edit
                  </Button>
                </Link>
              )}

              <img
                src={Newexcel}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
                onClick={handleExportFunction}
              />
            </Stack>
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
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValues}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Arial",
                    fontSize: "14px",
                  }}
                  label="Mapped Employees"
                />
                <Tab
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Arial",
                    fontSize: "14px",
                  }}
                  label="Unmapped Employees"
                />
                <Tab
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Arial",
                    fontSize: "14px",
                  }}
                  label="All Employees"
                />
              </Tabs>
            </Box>
            {/* <TabPanel value={tabValues} index={0}> */}
             {tabValues == 0 && (
              <>
              <TableContainer style={{ marginTop: "10px", }}>
                 <Scroll>
                <CustomScrollbar
                  style={{ width: "100%", height: "calc(100vh - 330px)" }}
                > 
                <Table size="small" aria-label="simple table" stickyHeader>
                  <TableHead
                    sx={{
                      whiteSpace: "nowrap",
                      bgcolor: "#eaeced",
                      position: "sticky",
                    }}
                  >
                    <TableRow
                      sx={{
                        "& td, & th": {
                          bgcolor: "#eaeced",
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {/* <TableCell   align="center" sx={{ bgcolor: "#ebf2f4" }}>
                          <input
                            name="allSelect"
                            checked={
                              
                              activeTemplate &&
                             
                              activeTemplate?.filter(
                                (employee: any) => employee?.isChecked !== true
                              ).length < 1
                            }
                            //onChange={handleOnCheck}
                            //onChange={handleOnCheckselectedData}
                            onChange={handleOnCheck11}
                            type="checkbox"
                            style={{
                              height: "18px",
                              width: "18px",
                            }}
                          />
                        </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >Ecode
                        {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={opennew ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew ? "true" : undefined}
                          onClick={handleClicknew}
                        >
                          <Stack direction="row" alignItems="center">
                           Ecode
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"90px"
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
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTarget}
                           >Clear Filter
                           </MenuItem>
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.employee_code - b?.name?.employee_code;
                                })

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: empEmployeeCode === name?.name?.employee_code  ? "#EAECED" : "",

                                    }}
                                    key={name?.name?.employee_code}
                                    value={name?.name?.employee_code}
                                    onClick={handleTarget}
                                  >
                                    {name?.name?.employee_code}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon && <FilterAltTwoToneIcon />}
                        </Stack>  */}
                        {/* <FormControl sx={{ m: 0, height: "0" }}>
                          <Stack direction="row">
                            <span> ECode</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeCode}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeemployeeCode}
                              // onChange={handleChangeemployeeName}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.employee_code - b?.name?.employee_code;
                                })

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.employee_code}
                                    value={name?.name?.employee_code}
                                  >
                                    {name?.name?.employee_code}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon && (
                              <FilterAltTwoToneIcon />)}

                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      > Employee Name
                        {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                              <div
                                aria-controls={openFullName ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={openFullName ? "true" : undefined}
                                onClick={handleClickFullName}
                              >
          <Stack direction="row" alignItems="center" style={{ cursor: "pointer" }}>
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
                                >Clear Filter
                                </MenuItem>
                                {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.legal_full_name?.localeCompare(b?.name?.legal_full_name);
                                })
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: empFullName === name?.name?.legal_full_name  ? "#EAECED" : "",

                                    }}
                                    key={name?.name?.legal_full_name}
                                    value={name?.name?.legal_full_name}
                                    onClick={handleTargetFullName}
                                  >
                                    {name?.name?.legal_full_name}
                                  </MenuItem>
                                ))}

                              </Menu>
                              {icon1 && <FilterAltTwoToneIcon />}
                            </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 110, height: "0" }}>
                          <Stack direction="row">
                            <span> Employee Name</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeName}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeemployeeName}
                              // onChange={handleChangeemployeeCode}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                             
                              {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.legal_full_name?.localeCompare(b?.name?.legal_full_name);
                                })
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.legal_full_name}
                                    value={name?.name?.legal_full_name}
                                  >
                                    {name?.name?.legal_full_name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon1 && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      >
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
                                      paddingLeft: "10px"
                                    }}
                                  >
                                    <ListItemText 
                                     primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                                  </MenuItem>

                                  {activeTemplate
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.name.position_long_description.localeCompare(b.name.position_long_description); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.position_long_description }).indexOf(item?.name?.position_long_description) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "12px"
                                        }}
                                        // style={{ fontSize: "12px" }}
                                        key={name?.name?.position_long_description}
                                        value={name?.name?.position_long_description}
                                      >
                                        <Checkbox 
                                        size="small"
                                        checked={positionFilter.indexOf(name?.name?.position_long_description) > -1} />
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        primary={name?.name?.position_long_description} />
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
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
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
                                    fontSize: "13px",
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
                        style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
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
                          paddingRight:"10px"
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
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={positionsFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openserviceGrade ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceGrade ? "true" : undefined}
                          onClick={handleClickserviceGrade}
                        >
                          <Stack direction="row" alignItems="center">
                           Grade
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}} />
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
                            width:"180px",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetserviceGrade}
                           >
                           
                            <ListItemText primary="None" />
                           </MenuItem>
                         
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.grade - b?.name?.grade;
                                })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.grade}
                                    
                                    value={name?.name?.grade}
                                    onClick={handleTargetserviceGrade}
                                  >
                                    <Checkbox checked={GradeFilter.indexOf(name?.grade) > -1} />
                                        <ListItemText primary={name?.grade} />
                                  
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon3 && <FilterAltTwoToneIcon />}
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
                                      fontSize: "12px",
                                      paddingLeft: "10px"
                                    }}
                                  >
                                   
                                    <ListItemText  primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                                  </MenuItem>

                                  {activeTemplate
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.name.grade.localeCompare(b.name.grade); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.grade }).indexOf(item?.name?.grade) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "12px"
                                        }}
                                        // style={{ fontSize: "12px" }}
                                        key={name?.name?.grade}
                                        value={name?.name?.grade}
                                      >
                                        <Checkbox 
                                        size="small"
                                        checked={GradeFilter.indexOf(name?.name?.grade) > -1} />
                                        <ListItemText
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                         primary={name?.name?.grade} />
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
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
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
                                    fontSize: "13px",
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
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px !important",
                            },
                          }}
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
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
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px" 
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
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={GradesFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon3 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > */}

                        {/* Position{" "}
                      <ArrowDropDownIcon
                        sx={{
                          verticalAlign: "middle",
                        }}
                      /> */}
                       {/* <Stack direction="row" alignItems="center" justifyContent="center" >
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
                            width:"300px"
                          }}
                          anchorEl={anchorElnewservicePosition}
                          open={openservicePosition }
                          onClose={handleCloseservicePosition}
                          
                          
                        >
                           <MenuItem
                                   
                                    key={0}
                                    value="None"
                                    sx={{
                                      padding: "0px",
                                      fontSize: "12px",
                                      paddingLeft: "10px"
                                    }}
                                  >
                                    <ListItemText primary="None" />
                                  </MenuItem>
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.position_long_description?.localeCompare(b?.name?.position_long_description);
                                })

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.position_long_description}
                                    value={name?.name?.position_long_description}

                                  > 
                                  <Checkbox checked={positionFilter.indexOf(name?.position_long_description) > -1} />
                                        <ListItemText primary={name?.position_long_description} />
                                  </MenuItem>
                                ))} 
                          
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
                                      paddingLeft: "10px"
                                    }}
                                  >
                                    <ListItemText 
                                     primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                                  </MenuItem>

                                  {activeTemplate
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.name.position_long_description.localeCompare(b.name.position_long_description); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.position_long_description }).indexOf(item?.name?.position_long_description) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "12px"
                                        }}
                                        // style={{ fontSize: "12px" }}
                                        key={name?.name?.position_long_description}
                                        value={name?.name?.position_long_description}
                                      >
                                        <Checkbox 
                                        size="small"
                                        checked={positionFilter.indexOf(name?.name?.position_long_description) > -1} />
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        primary={name?.name?.position_long_description} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                                {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                      </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <Stack direction="row" alignItems="center" justifyContent="center" >
                      <div
                        aria-controls={openProbationStatusVal ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProbationStatusVal ? "true" : undefined}
                        onClick={handleClickProbationStatus}
                      >
                        <Stack direction="row" alignItems="center">
                          Probation <br></br>Status
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
                            fontSize: "13px",
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
                        {probationstatusArrays
                          // ?.slice()
                          // ?.sort(function (a: any, b: any) {
                          //   return a.name?.probation_status - b.name?.probation_status;
                          // })
                          // ?.filter((j: any) => {
                          //   return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
                          // })
                          // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.name?.probation_status }).indexOf(item?.name?.probation_status) === index)
                          ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                justifyContent: "left",
                                backgroundColor: ProbationStatus === name ? "#EAECED" : "",
                                //height:"200px"
                              }}
                              key={name}
                              value={name}
                              //name={name.legal_full_name}
                              onClick={handleTargetProbationStatus}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        

                      </Menu>
                      {icon51 && <FilterAltTwoToneIcon />}
                    </Stack></TableCell>
                           <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <Stack direction="row" alignItems="center" justifyContent="center" >
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
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"300px"
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
                            justifyContent:"left",
                            // width:"100px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSupervisoryRole}
                           >Clear Filter
                           </MenuItem>
                         
                          {mappedemployeeLength > 0 && sNSvalues
                             
                              .map((name: any) => (
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    padding: "0px 10px 2px 17px",
                                    backgroundColor: sNS === name?.name  ? "#EAECED" : "",

                                    // paddingLeft: "15px",
                                    // justifyContent:"left",
                                    // width:"100px"
                                    //height:"200px"
                                  }}
                                  key={name?.name}
                                  value={name?.name}
                                  onClick={handleTargetSupervisoryRole}
                                >
                                  {name?.name}
                                </MenuItem>
                              ))}
                        </Menu>
                        {icon5 && <FilterAltTwoToneIcon />}
                        </Stack>
                        </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFunction ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFunction ? "true" : undefined}
                          onClick={handleClickFunction}
                        >
                          <Stack direction="row" alignItems="center">
                          Function
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"160px"
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
                            justifyContent:"left",
                            // width:"110px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFunction}
                           >Clear Filter
                           </MenuItem>
                           {/* <MenuItem
                               style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetFunction}
                            >
                              Sales
                            </MenuItem>
                            <MenuItem
                               style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //height:"200px"
                              }}
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetFunction}
                            >
                              Non-Sales
                            </MenuItem> */}
                            {functionArrayForMapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.name?.function?.localeCompare(b?.name?.function);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.function }).indexOf(item?.name?.function) === index)

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      backgroundColor: empFunction === name?.name?.function  ? "#EAECED" : "",

                                    }}
                                    key={name?.name?.function}
                                    value={name?.name?.function}
                                    onClick={handleTargetFunction}
                                  >
                                    {name?.name?.function}
                                  </MenuItem>
                                ))}
                       
                           
                             
                        </Menu>
                        {icon8 && <FilterAltTwoToneIcon />}
                        </Stack>
                       
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openRole ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openRole ? "true" : undefined}
                          onClick={handleClickRole}
                        >
                          <Stack direction="row" alignItems="center">
                          Role Category
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"160px"
                          }}
                          anchorEl={anchorElnewRole}
                          open={openRole}
                          onClose={handleCloseRole}
                          
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
                           onClick={handleTargetRole}
                           >None
                           </MenuItem>
                           <MenuItem
                               style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                                justifyContent:"left",
                                width:"110px"
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetRole}
                            >
                                Sales-support
                            </MenuItem>
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
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetRole}
                            >
                              Bsiness-support
                            </MenuItem>
                       
                           
                             
                        </Menu>
                        {icon8 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                       
                      {/* </TableCell> */}
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <Stack direction="row" alignItems="center" justifyContent="center" >
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
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                        {icon5 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                      
                      {/* </TableCell> */}

                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
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
                         
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.division?.localeCompare(b?.name?.division);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.division }).indexOf(item?.name?.division) === index)

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.division}
                                    value={name?.name?.division}
                                    onClick={handleTargetDivision}
                                  >
                                    {name?.name?.division}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon4 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span> Division</span>
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.division?.localeCompare(b?.name?.division);
                                })
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.division}
                                    value={name?.name?.division}
                                  >
                                    {name?.name?.division}
                                  </MenuItem>
                                ))}
                             
                            </Select>
                            {icon4 && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      {/* </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceAppName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceAppName ? "true" : undefined}
                          onClick={handleClickserviceAppName}
                        >
                          <Stack direction="row" alignItems="center">
                            Appraiser Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                          anchorEl={anchorElnewserviceAppName}
                          open={openserviceAppName}
                          onClose={handleCloseserviceAppName}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              // justifyContent:"left",
                              // width:"100px",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceAppName}
                          >Clear Filter
                          </MenuItem>

                          {AppraiserNameArray
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.name?.appraiser_name?.localeCompare(b?.name?.appraiser_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.appraiser_name }).indexOf(item?.name?.appraiser_name) === index)

                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: AppName === name? "#EAECED" : "",

                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceAppName}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon21 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRevName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRevName ? "true" : undefined}
                          onClick={handleClickserviceRevName}
                        >
                          <Stack direction="row" alignItems="center">
                            Reviewer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceRevName}
                          open={openserviceRevName}
                          onClose={handleCloseserviceRevName}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceRevName}
                          >Clear Filter
                          </MenuItem>

                          {ReviewerNameArray
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.name?.reviewer_name?.localeCompare(b?.name?.reviewer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.reviewer_name }).indexOf(item?.name?.reviewer_name) === index)

                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                backgroundColor: RevName === name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceRevName}
                            >
                              {name}
                            </MenuItem>
                          ))} 
                        </Menu>
                        {icon31 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      ><div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceNorName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceNorName ? "true" : undefined}
                          onClick={handleClickserviceNorName}
                        >
                          <Stack direction="row" alignItems="center">
                          HR Normalizer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
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
                              // width: "100px"
                              // justifyContent:"left",
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceNorName}
                          >Clear Filter
                          </MenuItem>

                          {NormalizerNameArray
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.name?.function?.localeCompare(b?.name?.normalizer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.normalizer_name }).indexOf(item?.name?.normalizer_name) === index)

                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: norName === name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceNorName}
                            >
                              {name}
                            </MenuItem>
                          ))} 
                        </Menu>
                        {icon41 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
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
                           
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSection}
                           >None
                           </MenuItem>
                         
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.section?.localeCompare(b?.name?.section);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.section }).indexOf(item?.name?.section) === index)
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.section}
                                    value={name?.name?.section}
                                    onClick={handleTargetSection}
                                  >
                                    {name?.name?.section}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon6 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Section</span>
                                <Select
                                   labelId="demo-multiple-checkbox-label"
                                   id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
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
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "14px !important",
                          },
                        }}
                       
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          size="small"
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllsectionFilter}
                          indeterminate={
                            sectionsFilter?.length > 0 &&
                            sectionsFilter?.length < sectionArrays?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  {/* gradesArray */}
                {sectionArrays?.map((option: any) => (
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
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px !important",
                            },
                          }}
                         
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={sectionsFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon6 && <FilterAltTwoToneIcon />}
                              </Stack>
                            </FormControl>
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSubSection ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubSection ? "true" : undefined}
                          onClick={handleClickSubSection}
                        >
                          <Stack direction="row" alignItems="center">
                          Sub Section
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
                          anchorEl={anchorElnewSubSection}
                          open={openSubSection}
                          onClose={handleCloseSubSection }
                          
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
                           onClick={handleTargetSubSection}
                           >None
                           </MenuItem>
                           {activeTemplate
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.["sub section"]?.localeCompare(b?.name?.["sub section"]);
                                })
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.["sub section"]}
                                    value={name?.name?.["sub section"]}
                                    onClick={handleTargetSubSection}
                                  >
                                    {name?.name?.["sub section"]}
                                  </MenuItem>
                                ))}
                           
                        </Menu>
                        {icon7 && <FilterAltTwoToneIcon />}
                        </Stack>
                        
                      </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Code</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerCode}
                                
                                onChange={handleChangemanagerCode}
                                
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerCodeArray.map((name: any) => (
                                  <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Name</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerName}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangemanagerName}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerNameArray.map((name: any) => (
                                  <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span> Work Location</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={workLocation}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangeworkLocation}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                               style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {workLocationArray.map((name: any) => (
                                  <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                    </TableRow>
                  </TableHead>

                  {mappedemployeeLength > 0 ? ( <TableBody>
                   
                    {activeTemplate
                      ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                      ?.filter((j: any) => {
                        return j?.name?.isCEORole === false && j?.name?.isLeavers === false && j?.name?.isExcluded === false
                      })
                      ?.filter((j: any) => {
                        if (empFullName === "None" || empFullName === "") {
                          return j;
                        } else {
                          return j?.name?.legal_full_name
                          ?.toLocaleLowerCase() === empFullName?.toLocaleLowerCase();
                          // ?.includes(employeeName?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empEmployeeCode === "None" || empEmployeeCode === "") {
                          return j;
                        } else {
                          return j?.name?.employee_code
                          ?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();
                          // .includes(employeeCode?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (positions === "None" || positions === "") {
                          return j;
                        } else {
                          return j?.name?.position_long_description
                          .toLocaleLowerCase() === positions?.toLocaleLowerCase();
                            // .includes(positions.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (AppName === "None" || AppName === "") {
                          return j;
                        } else {
                          return j?.name?.appraiser_name
                            ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (RevName === "None" || RevName === "") {
                          return j;
                        } else {
                          return j?.name?.reviewer_name
                            ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (norName === "None" || norName === "") {
                          return j;
                        } else {
                          return j?.name?.normalizer_name
                            ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((item1: any) => {
                        if (positionsFilter.includes("None") || positionsFilter.length === 0) {
                          return item1;
                        } else {
                          return !!positionsFilter?.find((item2: any) => item1?.name?.position_long_description === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (GradesFilter.includes("None") || GradesFilter.length === 0) {
                          return item1;
                        } else {
                          return !!GradesFilter?.find((item2: any) => item1?.name?.grade === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
                          return item1;
                        } else {
                          return !!sectionsFilter?.find((item2: any) => item1?.name?.section === item2)
                        }
                      })
                      .filter((j: any) => {
                        if (empFunction === "None" || empFunction === "") {
                          return j;
                        } else {
                          return j?.name?.function
                          .toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
                            // .includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (empsections === "None" || empsections === "") {
                          return j;
                        } else {
                          return j?.name?.section
                          .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
                            // .includes(empsections.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j.isSupervisor, "superv");
                        if (sNS === "None" || sNS === "") {
                          return j;
                        }
                        if (sNS === "SP") {
                          return j?.name?.isSupervisor === true;
                        } else if (sNS === "N-SP") {
                          return j?.name?.isSupervisor !=true;
                        }
                      })
                      .filter((j: any) => {
                        if (empdivisions === "None" || empdivisions === "") {
                          return j;
                        } else {
                          return j?.name?.division
                          .toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
                            // .includes(empdivisions.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j["sub section"], "employeesection");
                        if (
                          empsubSections === "None" ||
                          empsubSections === ""
                        ) {
                          return j;
                        } else {
                          return j?.name["sub section"]
                          .toLocaleLowerCase() === empsubSections?.toLocaleLowerCase();
                            // .includes(empsubSections.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (managerCode === "None" || managerCode === "") {
                          return j;
                        } else {
                          return j?.name?.manager_code
                            .toLocaleLowerCase()
                            .includes(managerCode.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (ProbationStatus === "None" || ProbationStatus === "") {
                          return j;
                        } else {
                          return j?.name?.probation_status
                            .toLocaleLowerCase() === ProbationStatus?.toLocaleLowerCase();
                          // .includes(employeeCode?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (managerName === "None" || managerName === "") {
                          // console.log(j.manager_name, "name");
                          return j;
                        } else {
                          return j?.name?.manager_name
                            .toLocaleLowerCase()
                            .includes(managerName.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (workLocation === "None" || workLocation === "") {
                          return j;
                        } else {
                          return j?.name?.work_location
                            .toLocaleLowerCase()
                            .includes(workLocation.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (searchName === "") {
                          return j;
                        }else if (
                          (j?.name?.employee_code !== undefined &&
                            j?.name?.employee_code
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.legal_full_name !== undefined &&
                            j?.name?.legal_full_name
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.section !== undefined &&
                            j?.name?.section
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.position_long_description !== undefined &&
                            j?.name?.position_long_description
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                              (j?.name?.probation_status !== undefined &&
                                j?.name?.probation_status
                                  .toLocaleLowerCase()
                                  .includes(searchName.toLocaleLowerCase())) ||
                                  (j?.name?.function !== undefined &&
                                    j?.name?.function
                                      .toLocaleLowerCase()
                                      .includes(searchName.toLocaleLowerCase())) ||
                                      (j?.name?.appraiser_name !== undefined &&
                                        j?.name?.appraiser_name
                                          .toLocaleLowerCase()
                                          .includes(searchName.toLocaleLowerCase())) ||
                                          (j?.name?.reviewer_name !== undefined &&
                                            j?.name?.reviewer_name
                                              .toLocaleLowerCase()
                                              .includes(searchName.toLocaleLowerCase())) ||
                                              (j?.name?.normalizer_name !== undefined &&
                                                j?.name?.normalizer_name
                                                  .toLocaleLowerCase()
                                                  .includes(searchName.toLocaleLowerCase())) ||
                          (j?.name?.grade !== undefined &&
                            j?.name?.grade
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase()))
                        ) {
                          return j;
                        }else if(searchName !== ""){
                          if (searchName == "SP") {
                            return j?.name?.isSupervisor == true;
                          }else if (searchName == "N-SP") {
                              return j?.name?.isSupervisor != true;
                            }
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((employee: any) => {
                        // console.log(employee, "employee");
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={employee?.name?.employee_code}
                          // sx={{
                          //   "&:last-child td, &:last-child th": {
                          //     border: 0,
                          //   },
                          //   whiteSpace: "nowrap",
                          // }}
                          >

                            {/* <TableCell
                                align="left"
                                style={{ color: "#368DC5" }}
                                padding="checkbox"
                              >
                                <input
                                  name={employee?.name?._id}
                                  checked={employee?.isChecked || false}
                                  //onChange={handleOnCheckselectedData}
                                  onChange={handleOnCheck11}
                                  type="checkbox"
                                  style={{
                                    height: "18px",
                                    width: "18px",
                                    borderColor: "#D5D5D5",
                                  }}
                                />
                              </TableCell> */}
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                padding: "14px",
                                paddingRight:"36px"
                              }}
                              align="center"
                            >
                              {employee?.name?.employee_code}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee?.name?.legal_full_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee?.name?.position_long_description}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"50px"

                              }}
                              align="center"
                            >
                              {employee?.name?.grade}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"

                              }}
                              align="center"
                            >
                              {employee?.name?.probation_status}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"

                              }}
                              align="center"
                            >
                              {employee?.name?.isSupervisor != true
                                ? "N-SP"
                                : "SP"}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace:"nowrap"
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.function}
                            </TableCell>
                            
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace:"nowrap"
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              Sales/sales-support
                            </TableCell> */}
                           
                           <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.appraiser_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.reviewer_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.normalizer_name}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.division}
                            </TableCell> */}
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.section}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name["sub section"]}
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="left"
                              >
                                {employee.manager_code}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="left"
                              >
                                {employee.manager_name}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="left"
                              >
                                {employee.work_location}
                              </TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>):(
                <TableBody>
                <TableRow>
                  <TableCell 
                  colSpan={8}
                  align="center" 
                  style={{ fontWeight: 'bold',border:"none",
                  color:"#808080",fontSize:"18px",fontFamily:"arial",display:"flex",width:"max-content" }}
                  >
                    No data to display
                  </TableCell>
                </TableRow>
              </TableBody>
              )}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                // count={tablecount}
                count={mappedCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </>
              )}
            {/* </TabPanel> */}
            {/* <TabPanel value={tabValues} index={1}> */}
            {tabValues == 1 && (
              <>
              <TableContainer style={{ marginTop: "10px", }}>
                 <Scroll>
                <CustomScrollbar
                  style={{ width: "100%", height: "calc(100vh - 330px)" }}
                > 
                <Table size="small" aria-label="simple table" stickyHeader>
                  <TableHead
                    sx={{
                      whiteSpace: "nowrap",
                      bgcolor: "#eaeced",
                      position: "sticky",
                    }}
                  >
                    <TableRow
                      sx={{
                        "& td, & th": {
                          bgcolor: "#eaeced",
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {/* <TableCell align="center" sx={{ bgcolor: "#ebf2f4" }}>
                          <input
                            name="allSelect"
                            checked={
                              unmappedEmpDatum &&
                              unmappedEmpDatum?.filter(
                                (employee: any) => employee.isChecked !== true
                              ).length < 1
                            }
                            //onChange={handleOnCheckselectedDataUnmapped}
                            onChange={handleOnCheckDataUnmapped}
                            type="checkbox"
                            style={{ height: "18px", width: "18px" }}
                          />
                        </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >Ecode
                         {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={opennew1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew1 ? "true" : undefined}
                          onClick={handleClicknew1}
                        >
                          <Stack direction="row" alignItems="center">
                            Ecode
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"90px"
                          }}
                          anchorEl={anchorElnew1}
                          open={opennew1}
                          onClose={handleClosenew1}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTarget1}
                           >Clear Filter
                           </MenuItem>
                         
                           {unmappedEmpDatum
                                .slice()
                                .sort(function (a: any, b: any) {
                                  return a.employee_code - b.employee_code;
                                })
                                .filter((item: any) => {
                                  // console.log(item, "itemeff");
                                  // console.log(item.isChecked, "ischeckeff");
                                  return item.isChecked !== true;
                                })
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                        backgroundColor: employeeCodeOther === name?.employee_code  ? "#EAECED" : "",

                                    }}
                                    key={name.employee_code}
                                    value={name.employee_code}
                                    onClick={handleTarget1}
                                  >
                                    {name.employee_code}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {iconUN && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, height: "0" }}>
                          <Stack direction="row">
                            <span> ECode</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeCodeOther}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeemployeeCodeOther}
                              // onChange={handleChangeemployeeNameOther}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>


                              {unmappedEmpDatum
                                .slice()
                                .sort(function (a: any, b: any) {
                                  return a.employee_code - b.employee_code;
                                })
                                .filter((item: any) => {
                                  // console.log(item, "itemeff");
                                  // console.log(item.isChecked, "ischeckeff");
                                  return item.isChecked !== true;
                                })
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.employee_code}
                                    value={name.employee_code}
                                  >
                                    {name.employee_code}
                                  </MenuItem>
                                ))}
                            </Select>
                            {iconUN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      >Employee Name
                         {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFullName1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFullName1 ? "true" : undefined}
                          onClick={handleClickFullName1}
                        >
                          <Stack direction="row" alignItems="center">
                          Employee Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"260px"
                          }}
                          anchorEl={anchorElnewFullName1}
                          open={openFullName1}
                          onClose={handleCloseFullName1}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                          //name="None"
                           onClick={handleTargetFullName1}
                           >Clear Filter
                           </MenuItem>
                           {unmappedEmpDatum
                                .slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                })
                                .filter((item: any) => {
                                  // console.log(item, "itemeff");
                                  // console.log(item.isChecked, "ischeckeff");
                                  return item.isChecked !== true;
                                })
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: employeeNameOther === name?.legal_full_name  ? "#EAECED" : "",

                                    }}
                                    key={name.legal_full_name}
                                    value={name.legal_full_name}
                                    onClick={handleTargetFullName1}
                                  >
                                    {name.legal_full_name}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon1UN && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 110, height: "0" }}>
                          <Stack direction="row">
                            <span>Employee Name</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeNameOther}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeemployeeNameOther}
                              // onChange={handleChangeemployeeCodeOther}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              {unmappedEmpDatum
                                .slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                })
                                .filter((item: any) => {
                                  // console.log(item, "itemeff");
                                  // console.log(item.isChecked, "ischeckeff");
                                  return item.isChecked !== true;
                                })
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.legal_full_name}
                                    value={name.legal_full_name}
                                  >
                                    {name.legal_full_name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon1UN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Position</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  // value={positions}
                                  // onChange={handleChangeposition}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={positionsFilterU}
                                  onChange={handleChangeSelectPositionsU}
                                  //input={<OutlinedInput label="Position" />}
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
                                    root: isAllpositionsFilterU ? classes.selectedAll : "",
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
                                      checked={isAllpositionsFilterU}
                                      indeterminate={
                                        positionsFilterU?.length > 0 &&
                                        positionsFilterU?.length < positionArrayU?.length
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
                            {positionArrayU
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.position_long_description?.localeCompare(b?.position_long_description);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)

                                ?.map((name: any, index: any) => (
                                  <MenuItem
                                  sx={{
                                    padding: "0px",
                                    fontSize: "12px"
                                  }}
                                    key={name}
                                    value={name}
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
                                        checked={positionsFilterU.indexOf(name) > -1} />
                                        </ListItemIcon>
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333",paddingRight:"10px" }}
                                        primary={name} />
                                  </MenuItem>
                                ))}
                              {/* {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.position_long_description?.localeCompare(b?.position_long_description);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)

                                ?.map((name: any, index: any) => (
                                  <MenuItem
                                  sx={{
                                    padding: "0px",
                                    fontSize: "12px"
                                  }}
                                    key={name.position_long_description}
                                    value={name.position_long_description}
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
                                        checked={positionsFilterU.indexOf(name?.position_long_description) > -1} />
                                        </ListItemIcon>
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333",paddingRight:"10px" }}
                                        primary={name?.position_long_description} />
                                  </MenuItem>
                                ))} */}
                            </Select>
                            {icon2UN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl>

                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                       
                         <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Grade</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  // value={positions}
                                  // onChange={handleChangeposition}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={GradesFilterU}
                                  onChange={handleChangeSelectGradesU}
                                  //input={<OutlinedInput label="Position" />}
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
                                    root: isAllGradesFilterU ? classes.selectedAll : "",
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
                                      checked={isAllGradesFilterU}
                                      indeterminate={
                                        GradesFilterU?.length > 0 &&
                                        GradesFilterU?.length < gradesArrayU?.length
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
                                {gradesArrayU
                                // .slice()
                                // .sort(function (a: any, b: any) {
                                //   return a?.grade - b?.grade;
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                                ?.map((name: any,index:any) => (
                                  <MenuItem
                                  sx={{
                                    padding: "0px",
                                    fontSize: "12px"
                                  }}
                                    key={name}
                                    value={name}
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
                                        checked={GradesFilterU.indexOf(name) > -1} />
                                       </ListItemIcon>
                                        <ListItemText
                                         primaryTypographyProps={{ fontSize: "13px", fontFamily: "Arial", color: "#333333",paddingRight:"10px"  }}
                                         primary={name} />
                                    
                                  </MenuItem>
                                )
                                )}
                                    {/* gradesArrayU */}
                              {/* {unmappedEmpDatum
                                .slice()
                                .sort(function (a: any, b: any) {
                                  return a?.grade - b?.grade;
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                                ?.map((name: any,index:any) => (
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
                                        checked={GradesFilterU.indexOf(name?.grade) > -1} />
                                       </ListItemIcon>
                                        <ListItemText
                                         primaryTypographyProps={{ fontSize: "13px", fontFamily: "Arial", color: "#333333",paddingRight:"10px"  }}
                                         primary={name?.grade} />
                                    
                                  </MenuItem>
                                )
                                )} */}
                            </Select>
                            {icon3UN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      ><Stack direction="row" alignItems="center" justifyContent="center" >
                      <div
                        aria-controls={openProbationStatusVal1 ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProbationStatusVal1 ? "true" : undefined}
                        onClick={handleClickProbationStatus1}
                      >
                        <Stack direction="row" alignItems="center">
                          Probation <br></br>Status
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
                        anchorEl={ProbationStatusVal1}
                        open={openProbationStatusVal1}
                        onClose={handleCloseProbationStatus1}

                      >
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                          onClick={handleTargetProbationStatus1}
                        >Clear Filter
                        </MenuItem>
                        {probationStatusUnmapped
                          // .slice()
                          // .sort(function (a: any, b: any) {
                          //   return a.probation_status - b.probation_status;
                          // })
                          // ?.filter((j: any) => {
                          //   return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
                          // })
                          // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.probation_status }).indexOf(item?.probation_status) === index)
                          ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                justifyContent: "left",
                                backgroundColor: ProbationStatus1 === name?.probation_status ? "#EAECED" : "",
                                //height:"200px"
                              }}
                              key={name?.probation_status}
                              value={name?.probation_status}
                              //name={name.legal_full_name}
                              onClick={handleTargetProbationStatus1}
                            >
                              {name?.probation_status}
                            </MenuItem>
                          ))}
                        

                      </Menu>
                      {icon52 && <FilterAltTwoToneIcon />}
                    </Stack></TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > */}

                        {/* Position{" "}
                      <ArrowDropDownIcon
                        sx={{
                          verticalAlign: "middle",
                        }}
                      /> */}
                      {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openservicePosition1  ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openservicePosition1  ? "true" : undefined}
                          onClick={handleClickservicePosition1}
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
                          anchorEl={anchorElnewservicePosition1}
                          open={openservicePosition1 }
                          onClose={handleCloseservicePosition1}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            // width:"100px",
                            // paddingLeft: "5px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetservicePosition1}
                           >None
                           </MenuItem>
                         
                           {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.position_long_description?.localeCompare(b?.position_long_description);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.position_long_description}
                                    value={name.position_long_description}
                                    onClick={handleTargetservicePosition1}
                                  >
                                    {name.position_long_description}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon2UN && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                                  value={positionFilterother}
                                  onChange={handleChangeSelectPositionother}
                                  //input={<OutlinedInput label="Position" />}
                                  renderValue={(selected) => selected.join(', ')}
                                >
                              <MenuItem
                                key={0}
                                value="None"
                                sx={{
                                  padding: "0px",
                                  fontSize: "12px",
                                  paddingLeft: "10px"
                                }}
                              >
                                <ListItemText 
                                     primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                              </MenuItem>


                              {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.position_long_description?.localeCompare(b?.position_long_description);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)

                                ?.map((name: any, index: any) => (
                                  <MenuItem
                                  sx={{
                                    padding: "0px",
                                    fontSize: "12px"
                                  }}
                                    key={name.position_long_description}
                                    value={name.position_long_description}
                                  >
                                    <Checkbox 
                                        size="small"
                                        checked={positionFilterother.indexOf(name?.position_long_description) > -1} />
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        primary={name?.position_long_description} />
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon2UN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl>

                      </TableCell> */}
                        <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSupervisoryRole1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSupervisoryRole1 ? "true" : undefined}
                          onClick={handleClickSupervisoryRole1}
                        >
                         <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              
                            }}
                          >
                           
                            Supervisory Role
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
                            // width:"300px"
                          }}
                          anchorEl={anchorElnewSupervisoryRole1}
                          open={openSupervisoryRole1}
                          onClose={handleCloseSupervisoryRole1}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            // width:"100px"
                            // //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSupervisoryRole1}
                           >Clear Filter
                           </MenuItem>
                         
                           {unMappedEmployeeLength > 0 && sNSvalues
                                
                                .map((name) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: sNSOther === name?.name  ? "#EAECED" : "",

                                    }}
                                    key={name?.name}
                                    value={name?.name}
                                    onClick={handleTargetSupervisoryRole1}
                                  >
                                    {name?.name}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon5UN && <FilterAltTwoToneIcon />}
                        </Stack>
                        
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                          <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFunction1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFunction1 ? "true" : undefined}
                          onClick={handleClickFunction1}
                        >
                          <Stack direction="row" alignItems="center">
                          Function
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"160px"
                          }}
                          anchorEl={anchorElnewFunction1}
                          open={openFunction1}
                          onClose={handleCloseFunction1}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            // width:"110px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFunction1}
                           >Clear Filter
                           </MenuItem>
                           {/* <MenuItem
                               style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                // paddingLeft: "15px",
                                justifyContent:"left",
                                // width:"110px"
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetFunction1}
                            >
                              Sales
                            </MenuItem>
                            <MenuItem
                               style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                // paddingLeft: "15px",
                                justifyContent:"left",
                                // width:"100px"
                                //height:"200px"
                              }}
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetFunction1}
                            >
                              Non-Sales
                            </MenuItem> */}
                       
                           {functionArrayUnmapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.function?.localeCompare(b?.function);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.function }).indexOf(item?.function) === index)

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      backgroundColor: empFunctionother === name?.function  ? "#EAECED" : "",

                                    }}
                                    key={name?.function}
                                    value={name?.function}
                                    onClick={handleTargetFunction1}
                                  >
                                    {name?.function}
                                  </MenuItem>
                                ))}
                             
                        </Menu>
                        {icon8UN && <FilterAltTwoToneIcon />}
                        </Stack>
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span>Function</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={functionDataOther}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangefunctionDataOther}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                Sales
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                Non-Sales
                              </MenuItem> */}
                             
                            {/* </Select>
                            {icon8UN && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                          <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openRole1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openRole1 ? "true" : undefined}
                          onClick={handleClickRole1}
                        >
                          <Stack direction="row" alignItems="center">
                          Role Category
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"160px"
                          }}
                          anchorEl={anchorElnewRole1}
                          open={openRole1}
                          onClose={handleCloseRole1}
                          
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
                           onClick={handleTargetRole1}
                           >None
                           </MenuItem>
                           <MenuItem
                               style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                                justifyContent:"left",
                                width:"110px"
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetRole1}
                            >
                                Sales-support
                            </MenuItem>
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
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetRole1}
                            >
                              Bsiness-support
                            </MenuItem>
                       
                           
                             
                        </Menu>
                        {icon8UN && <FilterAltTwoToneIcon />}
                        </Stack>
                       
                      </TableCell> */}
                    

                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openDivision1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openDivision1 ? "true" : undefined}
                          onClick={handleClickDivision1}
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
                          anchorEl={anchorElnewDivision1}
                          open={openDivision1}
                          onClose={handleCloseDivision1}
                          
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
                           onClick={handleTargetDivision1}
                           >None
                           </MenuItem>
                         
                           {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.division?.localeCompare(b?.division);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.division }).indexOf(item.division) === index)

                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.division}
                                    value={name?.division}
                                    onClick={handleTargetDivision1}
                                  >
                                    {name?.division}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon4UN && <FilterAltTwoToneIcon />}
                        </Stack>
                        
                      </TableCell> */}
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceAppName1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceAppName1 ? "true" : undefined}
                          onClick={handleClickserviceAppName1}
                        >
                          <Stack direction="row" alignItems="center">
                            Appraiser Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                          anchorEl={anchorElnewserviceAppName1}
                          open={openserviceAppName1}
                          onClose={handleCloseserviceAppName1}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              // justifyContent:"left",
                              // width:"100px",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceAppName1}
                          >Clear Filter
                          </MenuItem>

                          {appraiserArrayUnmapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.appraiser_name?.localeCompare(b?.appraiser_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.appraiser_name }).indexOf(item?.appraiser_name) === index)

                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: AppName1 === name?.appraiser_name ? "#EAECED" : "",

                                // width: "100px"
                              }}
                              key={name?.appraiser_name}
                              value={name?.appraiser_name}
                              onClick={handleTargetserviceAppName1}
                            >
                              {name?.appraiser_name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon22 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRevName1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRevName1 ? "true" : undefined}
                          onClick={handleClickserviceRevName1}
                        >
                          <Stack direction="row" alignItems="center">
                            Reviewer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceRevName1}
                          open={openserviceRevName1}
                          onClose={handleCloseserviceRevName1}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceRevName1}
                          >Clear Filter
                          </MenuItem>

                          {reviewerArrayUnmapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.reviewer_name?.localeCompare(b?.reviewer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.reviewer_name }).indexOf(item?.reviewer_name) === index)

                                .map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                backgroundColor: RevName1 === name?.reviewer_name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name?.reviewer_name}
                              value={name?.reviewer_name}
                              onClick={handleTargetserviceRevName1}
                            >
                              {name?.reviewer_name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon32 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >  <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceNorName1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceNorName1 ? "true" : undefined}
                          onClick={handleClickserviceNorName1}
                        >
                          <Stack direction="row" alignItems="center">
                          HR Normalizer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceNorName1}
                          open={openserviceNorName1}
                          onClose={handleCloseserviceNorName1}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",
                              // width: "100px"
                              // justifyContent:"left",
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceNorName1}
                          >Clear Filter
                          </MenuItem>

                          {normalizerArrayUnmapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.normalizer_name?.localeCompare(b?.normalizer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.normalizer_name }).indexOf(item?.normalizer_name) === index)

                                .map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: norName1 === name?.normalizer_name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name?.normalizer_name}
                              value={name?.normalizer_name}
                              onClick={handleTargetserviceNorName1}
                            >
                              {name?.normalizer_name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon42 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSection1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSection1 ? "true" : undefined}
                          onClick={handleClickSection1}
                        >
                          {/* <Stack direction="row" alignItems="center">
                          Section
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack> */}
                            <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Section</span>
                                <Select
                                   labelId="demo-multiple-checkbox-label"
                                   id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={sectionsFilterUnmappedData}
                                  onChange={handleChangeSelectsectionsUnmappedData}
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
                                    root: isAllsectionFilterUnmapped ? classes.selectedAll : "",
                                  }}
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
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllsectionFilterUnmapped}
                          indeterminate={
                            sectionsFilterUnmappedData?.length > 0 &&
                            sectionsFilterUnmappedData?.length < sectionArrayUnmappedData?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  {/* gradesArray */}
                {sectionArrayUnmappedData?.map((option: any) => (
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
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px !important",
                            },
                          }}
                         
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={sectionsFilterUnmappedData.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon6 && <FilterAltTwoToneIcon />}
                              </Stack>
                            </FormControl>
                        </div>
                        {/* <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"200px"
                          }}
                          anchorEl={anchorElnewSection1}
                          open={openSection1}
                          onClose={handleCloseSection1 }
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            paddingRight:"10px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSection1}
                           >Clear Filter
                           </MenuItem>
                         
                           {sectionArrayUnmapped
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.section?.localeCompare(b?.section);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.section }).indexOf(item?.section) === index)
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: empsectionsother === name?.section  ? "#EAECED" : "",

                                    }}
                                    key={name?.section}
                                    value={name?.section}
                                    onClick={handleTargetSection1}
                                  >
                                    {name?.section}
                                  </MenuItem>
                                ))}
                        </Menu> */}
                        {icon6UN && <FilterAltTwoToneIcon />}
                        </Stack>
                        
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSubSection1 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubSection1 ? "true" : undefined}
                          onClick={handleClickSubSection1}
                        >
                          <Stack direction="row" alignItems="center">
                          Sub Section
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
                          anchorEl={anchorElnewSubSection1}
                          open={openSubSection1}
                          onClose={handleCloseSubSection1 }
                          
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
                           onClick={handleTargetSubSection1}
                           >None
                           </MenuItem>
                           {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.["sub section"]?.localeCompare(b?.name?.["sub section"]);
                                })

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.["sub section"]}
                                    value={name?.["sub section"]}
                                    onClick={handleTargetSection1}
                                  >
                                    {name?.["sub section"]}
                                  </MenuItem>
                                ))}
                           
                        </Menu>
                        {icon7UN && <FilterAltTwoToneIcon />}
                        </Stack>
                        
                      </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Code</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerCodeOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangemanagerCodeOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerCodeArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 120, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Name</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerNameOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangemanagerNameOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerNameArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span> Work Location</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={workLocationOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangeworkLocationOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                             
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {workLocationArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                    </TableRow>
                  </TableHead>
                  {unMappedEmployeeLength > 0 ? (<TableBody>

                    {/* {unmappData?.filter((j: any) => { */}
                    {/* {users
                        .filter((item: any) => {
                          // console.log(item, "itemeff");
                          // console.log(item.isChecked, "ischeckeff");
                          return item.isChecked !== true;
                        }) */}
                    {/* // unMappedEmployees */}
                    {
                    //hideUnmapped &&
                     unmappedEmpDatum
                      ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                      ?.filter((j: any) => {
                        return j?.isCEORole !== true && j?.isLeavers !== true && j?.isExcluded !== true
                      })
                      ?.filter((j: any) => {
                        if (
                          employeeNameOther === "None" ||
                          employeeNameOther === ""
                        ) {
                          return j;
                        } else {
                          return j?.legal_full_name
                          ?.toLocaleLowerCase() === employeeNameOther?.toLocaleLowerCase();
                          // .includes(employeeNameOther?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (AppName1 === "None" || AppName1 === "") {
                          return j;
                        } else {
                          return j.appraiser_name
                            .toLocaleLowerCase()
                            .includes(AppName1.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (RevName1 === "None" || RevName1 === "") {
                          return j;
                        } else {
                          return j?.reviewer_name
                            ?.toLocaleLowerCase() === RevName1?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (norName1 === "None" || norName1 === "") {
                          return j;
                        } else {
                          return j?.normalizer_name
                            ?.toLocaleLowerCase() === norName1?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          employeeCodeOther === "None" ||
                          employeeCodeOther === ""
                        ) {
                          return j;
                        } else {
                          return j.employee_code
                          .toLocaleLowerCase() === employeeCodeOther?.toLocaleLowerCase();
                            // .includes(employeeCodeOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        console.log(j, "superv");
                        if (sNSOther === "None" || sNSOther === "") {
                          return j;
                        }
                        if (sNSOther === "N-SP") {
                          return j.isSupervisor != true;
                        } else if (sNSOther === "SP") {
                          return j.isSupervisor === true
                          //  ||
                          //  j.isSupervisor === false;
                         
                        }
                      })
                      .filter((j: any) => {
                        if (
                          positionsother === "None" ||
                          positionsother === ""
                        ) {
                          return j;
                        } else {
                          return j.position_long_description
                          .toLocaleLowerCase() === positionsother?.toLocaleLowerCase();
                            // .includes(positionsother.toLocaleLowerCase());
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
                        if (positionsFilterU.includes("None") || positionsFilterU.length === 0) {
                          return item1;
                        } else {
                          return !!positionsFilterU?.find((item2: any) => item1?.position_long_description === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (GradesFilterU.includes("None") || GradesFilterU.length === 0) {
                          return item1;
                        } else {
                          return !!GradesFilterU?.find((item2: any) => item1?.grade === item2)
                        }
                      })
                      ?.filter((j: any) => {
                        if (
                          ProbationStatus1 === "None" ||
                          ProbationStatus1 === ""
                        ) {
                          return j;
                        } else {
                          return j?.probation_status
                            ?.toLocaleLowerCase() === ProbationStatus1?.toLocaleLowerCase();
                          // .includes(employeeNameOther?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empFunctionother === "None" ||
                          empFunctionother === ""
                        ) {
                          return j;
                        } else {
                          return j.function
                          ?.toLocaleLowerCase() === empFunctionother?.toLocaleLowerCase();
                            // .includes(empgradesother.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empsectionsother === "None" ||
                          empsectionsother === ""
                        ) {
                          return j;
                        } else {
                          return j.section
                          .toLocaleLowerCase() === empsectionsother?.toLocaleLowerCase();
                            // .includes(empsectionsother.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empdivisionsOther === "None" ||
                          empdivisionsOther === ""
                        ) {
                          return j;
                        } else {
                          return j.division
                          .toLocaleLowerCase() === empdivisionsOther?.toLocaleLowerCase();
                            // .includes(empdivisionsOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j["sub section"], "employeesection");
                        if (
                          empsubSectionsOther === "None" ||
                          empsubSectionsOther === ""
                        ) {
                          return j;
                        } else {
                          return j["sub section"]
                          .toLocaleLowerCase() === empsubSectionsOther?.toLocaleLowerCase();
                            // .includes(
                            //   empsubSectionsOther.toLocaleLowerCase()
                            // );
                        }
                      })
                      .filter((j: any) => {
                        if (
                          managerCodeOther === "None" ||
                          managerCodeOther === ""
                        ) {
                          return j;
                        } else {
                          return j.manager_code
                            .toLocaleLowerCase()
                            .includes(managerCodeOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          managerNameOther === "None" ||
                          managerNameOther === ""
                        ) {
                          return j;
                        } else {
                          return j.manager_name
                            .toLocaleLowerCase()
                            .includes(managerNameOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          workLocationOther === "None" ||
                          workLocationOther === ""
                        ) {
                          return j;
                        } else {
                          return j.work_location
                            .toLocaleLowerCase()
                            .includes(workLocationOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (searchName2 === "") {
                          return j;
                        }  else if (
                          (j.employee_code !== undefined &&
                            j.employee_code
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
                          (j.legal_full_name !== undefined &&
                            j.legal_full_name
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
                          (j.section !== undefined &&
                            j.section
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
                          (j.position_long_description !== undefined &&
                            j.position_long_description
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase())) ||
                              (j.probation_status !== undefined &&
                                j.probation_status
                                  .toLocaleLowerCase()
                                  .includes(searchName2.toLocaleLowerCase())) ||
                                  (j.function !== undefined &&
                                    j.function
                                      .toLocaleLowerCase()
                                      .includes(searchName2.toLocaleLowerCase())) ||
                                      (j.appraiser_name !== undefined &&
                                        j.appraiser_name
                                          .toLocaleLowerCase()
                                          .includes(searchName2.toLocaleLowerCase())) ||
                                          (j.reviewer_name !== undefined &&
                                            j.reviewer_name
                                              .toLocaleLowerCase()
                                              .includes(searchName2.toLocaleLowerCase())) ||
                                              (j.normalizer_name !== undefined &&
                                                j.normalizer_name
                                                  .toLocaleLowerCase()
                                                  .includes(searchName2.toLocaleLowerCase())) ||
                          (j.grade !== undefined &&
                            j.grade
                              .toLocaleLowerCase()
                              .includes(searchName2.toLocaleLowerCase()))
                        ) {
                          return j;
                        }else if(searchName2 !== ""){
                          if (searchName2 == "SP") {
                            return j?.isSupervisor == true;
                          }else if (searchName2 == "N-SP") {
                              return j?.isSupervisor != true;
                            }
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((employee: any) => {
                        // console.log(employee, "employee");
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                          // sx={{
                          //   "&:last-child td, &:last-child th": {
                          //     border: 0,
                          //   },
                          //   whiteSpace: "nowrap",
                          // }}
                          >
                            {/* <TableCell align="left">
                               
                                <input
                                  name={employee._id}
                                  checked={employee?.isChecked || false}
                                  //onChange={handleOnCheckselectedDataUnmapped}
                                  onChange={handleOnCheckDataUnmapped}
                                  type="checkbox"
                                  style={{
                                    height: "18px",
                                    width: "18px",
                                    borderColor: "#D5D5D5",
                                  }}
                                />
                              </TableCell> */}
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"
                              }}
                              align="center"
                            >
                              {employee.employee_code}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                                padding: "14px",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee.legal_full_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee.position_long_description}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"50px"

                              }}
                              align="center"
                            >
                              {employee.grade}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.probation_status}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"

                              }}
                              align="center"
                            >
                              {employee.isSupervisor != true
                                ? "N-SP"
                                : "SP"}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.function}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              sales-support/ Business-sales
                            </TableCell> */}
                            

                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee.division}
                            </TableCell> */}
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.appraiser_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.reviewer_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee.normalizer_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee.section}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee["sub section"]}
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.manager_code}
                              </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.manager_name}
                              </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.work_location}
                              </TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>):(
                <TableBody>
                <TableRow>
                  <TableCell 
                  colSpan={8}
                  align="center" 
                  style={{ fontWeight: 'bold',border:"none",
                  color:"#808080",fontSize:"18px",fontFamily:"arial",display:"flex",width:"max-content" }}
                  >
                    No data to display
                  </TableCell>
                </TableRow>
              </TableBody>
              )}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                //count={tablecount}
                count={filCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </>
            )}
            {/* </TabPanel> */}
            {/* <TabPanel value={tabValues} index={2}> */}
            {tabValues == 2 && (
              <>
              <TableContainer style={{ marginTop: "10px",}}>
               <Scroll>
                <CustomScrollbar
                  style={{ width: "100%", height: "calc(100vh - 330px)" }}
                > 
                <Table size="small" aria-label="simple table" stickyHeader>
                  <TableHead
                    sx={{
                      whiteSpace: "nowrap",
                      bgcolor: "#eaeced",
                      position: "sticky",
                    }}
                  >
                    <TableRow
                      sx={{
                        "& td, & th": {
                          bgcolor: "#eaeced",
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {/* <TableCell align="center" sx={{ bgcolor: "#ebf2f4" }}>
                          <input
                            name="allSelect"
                            checked={
                              unmappedEmpDatum &&
                              unmappedEmpDatum?.filter(
                                (employee: any) => employee.isChecked !== true
                              ).length < 1
                            }
                            //onChange={handleOnCheckselectedDataUnmapped}
                            onChange={handleOnCheckDataUnmapped}
                            type="checkbox"
                            style={{ height: "18px", width: "18px" }}
                          />
                        </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openTemplate ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openTemplate ? "true" : undefined}
                          onClick={handleClickTemplate}
                        >
                          <Stack direction="row" alignItems="center">
                           Template
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"170px"
                          }}
                          anchorEl={anchorTemplate}
                          open={openTemplate}
                          onClose={handleCloseTemplate}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetTemplate}
                           >Clear Filter
                           </MenuItem>
                           {filteredPosition
                                ?.map((item: any) => item?.template?.name)
                                ?.sort(function (a: any, b: any) {
                                  return a.localeCompare(b);
                                })
                                // .slice()                                

                                .map((name: any, index: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                    }}
                                    key={index}
                                    value={name}
                                    onClick={handleTargetTemplate}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon9All && <FilterAltTwoToneIcon />}
                        </Stack>
                        {/* <FormControl sx={{ m: 0, height: "0" }}>
                          <Stack direction="row">
                            <span> Template</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={templateAll}
                              onChange={handleChangeTemplateAll}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>


                              {filteredPosition
                                ?.map((item: any) => item?.template?.name)
                                ?.sort(function (a: any, b: any) {
                                  return a.localeCompare(b);
                                })
                                // .slice()                                

                                .map((name: any, index: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={index}
                                    value={name}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon9All && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >Ecode
                         {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={opennew2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={opennew2 ? "true" : undefined}
                          onClick={handleClicknew2}
                        >
                          <Stack direction="row" alignItems="center">
                           Ecode
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"90px"
                          }}
                          anchorEl={anchorElnew2}
                          open={opennew2}
                          onClose={handleClosenew2}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTarget2}
                           >Clear Filter
                           </MenuItem>
                           {activeTemplate && unmappedEmpDatum &&
                                allEmployees
                                  .slice()
                                  .sort(function (a: any, b: any) {
                                    return a?.employee_code - b?.employee_code;
                                  })
                                 
                                  .map((name: any) => (
                                    <MenuItem
                                      style={{
                                        fontSize: "13px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        padding: "0px 10px 2px 17px",
                                         backgroundColor: employeeCodeAll === name?.employee_code  ? "#EAECED" : "",

                                      }}
                                      key={name?.employee_code}
                                      value={name?.employee_code}
                                      onClick={handleTarget2}
                                    >
                                      {name?.employee_code}
                                    </MenuItem>
                                  ))}
                        </Menu>
                        {iconAll && <FilterAltTwoToneIcon />}
                        </Stack>  */}
                        {/* <FormControl sx={{ m: 0, height: "0" }}>
                          <Stack direction="row">
                            <span> ECode</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeCodeAll}
                              onChange={handleChangeemployeeCodeAll}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>


                              {activeTemplate && unmappedEmpDatum &&
                                allEmployees
                                  .slice()
                                  .sort(function (a: any, b: any) {
                                    return a.name?.employee_code - b.name?.employee_code;
                                  })
                                 
                                  .map((name: any) => (
                                    <MenuItem
                                      style={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                      key={name.name.employee_code}
                                      value={name.name.employee_code}
                                    >
                                      {name.name.employee_code}
                                    </MenuItem>
                                  ))}
                            </Select>
                            {iconAll && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      > Employee Name
                          {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                              <div
                                aria-controls={openFullName2 ? "fade-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={openFullName2 ? "true" : undefined}
                                onClick={handleClickFullName2}
                              >
          <Stack direction="row" alignItems="center" style={{ cursor: "pointer" }}>
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
                                  // width:"200px"
                                }}
                                anchorEl={anchorElnewFullName2}
                                open={openFullName2}
                                onClose={handleCloseFullName2}

                              >
                                <MenuItem
                                  style={{
                                    fontSize: "13px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    justifyContent: "left"
                                    //paddingLeft: "15px",
                                    //height:"200px"
                                  }}
                                  key="None"
                                  value="None"
                                  //name="None"
                                  onClick={handleTargetFullName2}
                                >Clear Filter
                                </MenuItem>
                                {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.legal_full_name?.localeCompare(b?.legal_full_name);
                                })
                               
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: employeeNameAll === name?.legal_full_name  ? "#EAECED" : "",

                                    }}
                                    key={name?._id}
                                    value={name?.legal_full_name}
                                    onClick={handleTargetFullName2}
                                  >
                                    {name?.legal_full_name}
                                  </MenuItem>
                                ))}
                              </Menu>
                              {icon1All && <FilterAltTwoToneIcon />}
                            </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 110, height: "0" }}>
                          <Stack direction="row">
                            <span>Employee Name</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={employeeNameAll}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeemployeeNameAll}
                              // onChange={handleChangeemployeeCodeOther}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.legal_full_name?.localeCompare(b?.name?.legal_full_name);
                                })
                               
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?._id}
                                    value={name?.name?.legal_full_name}
                                  >
                                    {name?.name?.legal_full_name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon1All && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        style={{ minWidth: 250 }}
                        align="center"
                      >
                       
                       
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span> Position</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={positionFilterAll}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeSelectPositionAll}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              multiple
                              MenuProps={MenuProps}
                              renderValue={(selected) => selected.join(', ')}
                            >
                              <MenuItem
                                key={0}
                                value="None"
                                sx={{
                                  padding: "0px",
                                  fontSize: "12px",
                                  paddingLeft: "10px"
                                }}
                              >
                              <ListItemText 
                                     primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                              </MenuItem>


                              {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name.position_long_description?.localeCompare(b?.name.position_long_description);
                                })
                                ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.position_long_description }).indexOf(item?.name?.position_long_description) === index)
                                .map((name: any,index:any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "12px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      paddingLeft: "10px"
                                    }}
                                    key={name.name.position_long_description}
                                    value={name.name.position_long_description}
                                  >
                                   <Checkbox 
                                        size="small"
                                        checked={positionFilterAll.indexOf(name?.name?.position_long_description) > -1} />
                                        <ListItemText 
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                        primary={name?.name?.position_long_description} />
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon2All && (
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
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={positionsFilterAll}
                                  onChange={handleChangeSelectPositionsAll}
                                 renderValue={(selected) => selected.join(', ')}
                                >
                                  <MenuItem
                                   style={{
                                    fontSize: "13px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    padding: "0px",
                                    //paddingLeft: "37px",
                                  }}
                                  key="all"
                                  value="all"
                                  classes={{
                                    root: isAllpositionsFilterAll ? classes.selectedAll : "",
                                  }}
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
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllpositionsFilterAll}
                          indeterminate={
                            positionsFilterAll?.length > 0 &&
                            positionsFilterAll?.length < positionArrayAll?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  {/* gradesArray */}
                {positionArrayAll?.map((option: any) => (
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
                                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                                                 
                            size="small"
                            checked={positionsFilterAll.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon2All && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         {/* <Stack direction="row" alignItems="center" >
                        <div
                          aria-controls={openserviceGrade2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceGrade2 ? "true" : undefined}
                          onClick={handleClickserviceGrade2}
                        >
                          <Stack direction="row" alignItems="center" justifyContent="center">
                           Grade
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
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
                          anchorEl={anchorElnewserviceGrade2}
                          open={openserviceGrade2}
                          onClose={handleCloseserviceGrade2}
                          
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
                           onClick={handleTargetserviceGrade2}
                           >None
                           </MenuItem>
                           {allEmployees
                                .slice()
                                ?.map((item: any) => item?.name?.grade)
                                ?.sort()
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                                .map((grade: any, index: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={index}
                                    value={grade}
                                    onClick={handleTargetserviceGrade2}
                                  >
                                    {grade}
                                  </MenuItem>
                                ))}
                        </Menu>
                        {icon3All && <FilterAltTwoToneIcon />}
                        </Stack> */}
                        {/* <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                          <Stack direction="row">
                            <span> Grade</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={GradeFilterAll}
                              // value={personName}
                              // onChange={handleChanges}
                              multiple
                              onChange={handleChangeSelectGradeAll}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                              renderValue={(selected) => selected.join(', ')}

                            >
                              <MenuItem
                               key={0}
                               value="None"
                               sx={{
                                 padding: "0px",
                                 fontSize: "12px",
                                 paddingLeft: "10px"
                               }}
                              >
                                  <ListItemText  primaryTypographyProps={{ fontSize: '0.9rem' }}
                                    primary="None" />
                              </MenuItem>

                              {allEmployees
                                .slice()
                                ?.map((item: any) => item?.name?.grade)
                                .sort(function (a: any, b: any) {
                                  return a.grade - b.grade;
                                })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.grade }).indexOf(item?.name?.grade) === index)
                                .map((grade: any, index: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "12px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      paddingLeft: "10px"
                                    }}
                                    key={index}
                                    value={grade}
                                  >
                                   <Checkbox 
                                        size="small"
                                        checked={GradeFilterAll.indexOf(grade) > -1} />
                                        <ListItemText
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                         primary={grade} />
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon3All && (
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
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={GradeFilterAll}
                                  onChange={handleChangeSelectGradesAll}
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
                                    root: isAllGradesFilterAll ? classes.selectedAll : "",
                                  }}
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
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllGradesFilterAll}
                          indeterminate={
                            GradeFilterAll?.length > 0 &&
                            GradeFilterAll?.length < gradesArrayAll?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  {/* gradesArray */}
                                  {gradesArrayAll?.map((option: any) => (
                      
                       
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
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={GradeFilterAll.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px" 
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                                  {/* {allEmployees
                                .slice()
                                ?.map((item: any) => item?.name?.grade)
                                .sort(function (a: any, b: any) {
                                  return a.grade - b.grade;
                                })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.name?.grade }).indexOf(item?.name?.grade) === index)
                                .map((grade: any, index: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "12px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      paddingLeft: "10px"
                                    }}
                                    key={index}
                                    value={grade}
                                  >
                                   <Checkbox 
                                        size="small"
                                        checked={GradeFilterAll.indexOf(grade) > -1} />
                                        <ListItemText
                                         primaryTypographyProps={{ fontSize: '0.9rem' }}
                                         primary={grade} />
                                  </MenuItem>
                                ))} */}
                                </Select>
                                {icon3All && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      ><Stack direction="row" alignItems="center" justifyContent="center" >
                      <div
                        aria-controls={openProbationStatusVal2 ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProbationStatusVal2 ? "true" : undefined}
                        onClick={handleClickProbationStatus2}
                      >
                        <Stack direction="row" alignItems="center">
                          Probation <br></br>Status
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
                        anchorEl={ProbationStatusVal2}
                        open={openProbationStatusVal2}
                        onClose={handleCloseProbationStatus2}

                      >
                        <MenuItem
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            padding: "0px 10px 2px 17px",
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                          onClick={handleTargetProbationStatus2}
                        >Clear Filter
                        </MenuItem>
                        {probationStatusArrayAll
                          // .slice()
                          // .sort(function (a: any, b: any) {
                          //   return a.name?.probation_status - b.name?.probation_status;
                          // })
                          // ?.filter((j: any) => {
                          //   return j?.name?.isCEORole !== true && j?.name?.isLeavers !== true && j?.name?.isExcluded !== true
                          // })
                          // ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.probation_status }).indexOf(item?.probation_status) === index)
                          ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                justifyContent: "left",
                                backgroundColor: ProbationStatus2 === name ? "#EAECED" : "",
                                //height:"200px"
                              }}
                              key={name}
                              value={name}
                              //name={name.legal_full_name}
                              onClick={handleTargetProbationStatus2}
                            >
                              {name}
                            </MenuItem>
                          ))}
                       

                      </Menu>
                      {icon53 && <FilterAltTwoToneIcon />}
                    </Stack></TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                       <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openSupervisoryRole2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSupervisoryRole2 ? "true" : undefined}
                          onClick={handleClickSupervisoryRole2}
                        >
                         <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              
                            }}
                          >
                           
                            Supervisory Role
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
                            // width:"300px"
                          }}
                          anchorEl={anchorElnewSupervisoryRole2}
                          open={openSupervisoryRole2}
                          onClose={handleCloseSupervisoryRole2}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            // width:"100px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSupervisoryRole2}
                           >Clear Filter
                           </MenuItem>
                           {allEmployees?.length > 0 && sNSvalues
                                .slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.localeCompare(b?.name);
                                })
                                .map((name) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: sNSAll === name?.name  ? "#EAECED" : "",

                                    }}
                                    key={name?.name}
                                    value={name?.name}
                                    onClick={handleTargetSupervisoryRole2}
                                  >
                                    {name?.name}
                                  </MenuItem>
                                ))}
                          
                        </Menu>
                        {icon5All && <FilterAltTwoToneIcon />}
                        </Stack>
                        </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                           <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openFunction2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFunction2 ? "true" : undefined}
                          onClick={handleClickFunction2}
                        >
                          <Stack direction="row" alignItems="center">
                          Function
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            // width:"160px"
                          }}
                          anchorEl={anchorElnewFunction2}
                          open={openFunction2}
                          onClose={handleCloseFunction2}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            // width:"110px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFunction2}
                           >Clear Filter
                           </MenuItem>
                           {/* <MenuItem
                               style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetFunction2}
                            >
                              Sales
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                //height:"200px"
                              }}
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetFunction2}
                            >
                              Non-Sales
                            </MenuItem> */}
                             {functionArrayAll
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.function?.localeCompare(b?.function);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.function }).indexOf(item?.function) === index)
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      backgroundColor: empFunctionAll === name ? "#EAECED" : "",

                                    }}
                                    key={name}
                                    value={name}
                                    onClick={handleTargetFunction2}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                       
                           
                             
                        </Menu>
                        {icon8All && <FilterAltTwoToneIcon />}
                        </Stack>
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span>Function</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={functionDataAll}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangefunctionDataAll}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                Sales
                              </MenuItem>
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                Non-Sales
                              </MenuItem> */}
                              {/* 
                                {Sections.map((name) => (
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                            {/* </Select>
                            {icon8All && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                                                  <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openRole2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openRole2 ? "true" : undefined}
                          onClick={handleClickRole2}
                        >
                          <Stack direction="row" alignItems="center">
                          Role Category
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"160px"
                          }}
                          anchorEl={anchorElnewRole2}
                          open={openRole2}
                          onClose={handleCloseRole2}
                          
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
                           onClick={handleTargetRole2}
                           >None
                           </MenuItem>
                           <MenuItem
                               style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                                justifyContent:"left",
                                width:"110px"
                                //height:"200px"
                              }}
                              key="Sales"
                              value="Sales"
                              onClick={handleTargetRole2}
                            >
                                Sales-support
                            </MenuItem>
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
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetRole2}
                            >
                              Bsiness-support
                            </MenuItem>
                       
                           
                             
                        </Menu>
                        {icon8All && <FilterAltTwoToneIcon />}
                        </Stack> 
                        
                      </TableCell>*/}
                     
                       
                      {/* </TableCell> */}

                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openDivision2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openDivision2 ? "true" : undefined}
                          onClick={handleClickDivision2}
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
                          anchorEl={anchorElnewDivision2}
                          open={openDivision2}
                          onClose={handleCloseDivision2}
                          
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
                           onClick={handleTargetDivision2}
                           >None
                           </MenuItem>
                           {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name.division?.localeCompare(b?.name.division);
                                })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.division }).indexOf(item.division) === index)
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.name.division}
                                    value={name.name.division}
                                    onClick={handleTargetDivision2}
                                  >
                                    {name.name.division}
                                  </MenuItem>
                                ))}
                          
                        </Menu>
                        {icon4All && <FilterAltTwoToneIcon />}
                        </Stack> */}
                       
                      
                      {/* </TableCell> */}
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceAppName2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceAppName2 ? "true" : undefined}
                          onClick={handleClickserviceAppName2}
                        >
                          <Stack direction="row" alignItems="center">
                            Appraiser Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                          anchorEl={anchorElnewserviceAppName2}
                          open={openserviceAppName2}
                          onClose={handleCloseserviceAppName2}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              // justifyContent:"left",
                              // width:"100px",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceAppName2}
                          >Clear Filter
                          </MenuItem>

                          {appraiserArrayAll
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.appraiser_name?.localeCompare(b?.appraiser_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.appraiser_name }).indexOf(item?.appraiser_name) === index)
                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: AppName2 === name ? "#EAECED" : "",

                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceAppName2}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon23 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      > <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRevName2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRevName2 ? "true" : undefined}
                          onClick={handleClickserviceRevName2}
                        >
                          <Stack direction="row" alignItems="center">
                            Reviewer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceRevName2}
                          open={openserviceRevName2}
                          onClose={handleCloseserviceRevName2}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",                                  // width: "100px"
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceRevName2}
                          >Clear Filter
                          </MenuItem>

                          {reviewerArrayAll
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.reviewer_name?.localeCompare(b?.reviewer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.reviewer_name }).indexOf(item?.reviewer_name) === index)
                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px",
                                backgroundColor: RevName2 === name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceRevName2}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon33 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                       <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      ><div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceNorName2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceNorName2 ? "true" : undefined}
                          onClick={handleClickserviceNorName2}
                        >
                          <Stack direction="row" alignItems="center">
                          HR Normalizer Name
                            <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height: "200px",
                            // width:"240px"
                          }}
                          anchorEl={anchorElnewserviceNorName2}
                          open={openserviceNorName2}
                          onClose={handleCloseserviceNorName2}

                        >
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",
                              // width: "100px"
                              // justifyContent:"left",
                              // width:"100px",
                              // paddingLeft: "16px",

                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetserviceNorName2}
                          >Clear Filter
                          </MenuItem>

                          {normalizerArrayAll
                                // ?.slice()
                                // ?.sort(function (a: any, b: any) {
                                //   return a?.normalizer_name?.localeCompare(b?.normalizer_name);
                                // })
                                // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.normalizer_name }).indexOf(item?.normalizer_name) === index)
                                ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: norName2 === name ? "#EAECED" : "",
                                // width: "100px"
                              }}
                              key={name}
                              value={name}
                              onClick={handleTargetserviceNorName2}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Menu>
                        {icon43 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div></TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                         {/* <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSection2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSection2 ? "true" : undefined}
                          onClick={handleClickSection2}
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
                            // width:"200px"
                          }}
                          anchorEl={anchorElnewSection2}
                          open={openSection2}
                          onClose={handleCloseSection2 }
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "13px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            paddingRight:"10px"
                          
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetSection2}
                           >Clear Filter
                           </MenuItem>
                           {allEmployees
                                ?.slice()allEmployees
                                ?.sort(function (a: any, b: any) {
                                  return a?.section?.localeCompare(b?.section);
                                })
                                ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.section }).indexOf(item?.section) === index)
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px 10px 2px 17px",
                                      backgroundColor: empsectionsAll === name?.section  ? "#EAECED" : "",

                                    }}
                                    key={name?.section}
                                    value={name?.section}
                           onClick={handleTargetSection2}

                                  >
                                    {name?.section}
                                  </MenuItem>
                                ))}
                           
                        </Menu>
                        {icon6All && <FilterAltTwoToneIcon />}
                        </Stack> */}
                          <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                              <Stack direction="row">
                                <span>Section</span>
                                <Select
                                   labelId="demo-multiple-checkbox-label"
                                   id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem","& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    }, }}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={sectionsFilterAllData}
                                  onChange={handleChangeSelectsectionsmappedData}
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
                                    root: isAllsectionFilterAll ? classes.selectedAll : "",
                                  }}
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
                          classes={{
                            indeterminate: classes.indeterminateColor,
                          }}
                          checked={isAllsectionFilterAll}
                          indeterminate={
                            sectionsFilterAllData?.length > 0 &&
                            sectionsFilterAllData?.length < sectionArrayAllData?.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                       sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  {/* gradesArray */}
                {sectionArrayAll?.map((option: any) => (
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
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px !important",
                            },
                          }}
                         
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={sectionsFilterAllData.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon6 && <FilterAltTwoToneIcon />}
                              </Stack>
                            </FormControl>
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
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "14px !important",
                          },
                        }}
                       
                          style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                          size="small"
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
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          paddingRight:"10px"
                        },
                      }}
                        classes={{ primary: classes.selectAllText }}
                        primary="Select All"
                      />
                                  </MenuItem>
                                  
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
                           sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: "14px !important",
                            },
                          }}
                         
                            style={{ padding: "0px", paddingLeft: "14px",height:"0px" }}
                            size="small"
                            checked={sectionsFilter.indexOf(option) > -1}
                          />
                        </ListItemIcon>
                        
                        <ListItemText  sx={{
                                "& .MuiTypography-root": {
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingRight:"10px"
                                },
                              }} primary={option} />
                      </MenuItem>
                    
                    ))}
                                </Select>
                                {icon6All && <FilterAltTwoToneIcon />}
                              </Stack>
                            </FormControl> */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span> Section</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={empsectionsAll}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangesectionsAll}
                              // input={<OutlinedInput label="Name" />}
                              variant="standard"
                              MenuProps={MenuProps}
                            >
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>

                              {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name.section?.localeCompare(b?.name.section);
                                })

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.name.section}
                                    value={name.name.section}
                                  >
                                    {name.name.section}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon6All && (
                              <FilterAltTwoToneIcon />)}
                          </Stack>
                        </FormControl> */}
                      </TableCell>
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <Stack direction="row" alignItems="center" justifyContent="center" >
                        <div
                          aria-controls={openSubSection2 ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubSection2 ? "true" : undefined}
                          onClick={handleClickSubSection2}
                        >
                          <Stack direction="row" alignItems="center">
                          Sub Section
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
                          anchorEl={anchorElnewSubSection2}
                          open={openSubSection2}
                          onClose={handleCloseSubSection2 }
                          
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
                           onClick={handleTargetSubSection2}
                           >None
                           </MenuItem>
                           {allEmployees
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name["sub section"]?.localeCompare(b?.name["sub section"]);
                                })

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name["sub section"]}
                                    value={name["sub section"]}
                                    onClick={handleTargetSubSection2}

                                  >
                                    {name["sub section"]}
                                  </MenuItem>
                                ))}
                           
                        </Menu>
                        {icon7All && <FilterAltTwoToneIcon />}
                        </Stack>
                       
                      </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Code</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerCodeOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangemanagerCodeOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerCodeArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 120, height: "0" }}>
                            <Stack direction="row">
                              <span>Manager Name</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={managerNameOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangemanagerNameOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                               
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {managerNameArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                      {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span> Work Location</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={workLocationOther}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangeworkLocationOther}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                              >
                             
                                <MenuItem
                                   style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {workLocationArrayU.map((name: any) => (
                                  <MenuItem
                                     style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                        </TableCell> */}
                    </TableRow>
                  </TableHead>
                  {allEmployeeLength > 0 ? ( <TableBody>

                    {/* {unmappData?.filter((j: any) => { */}
                    {/* {users
                        .filter((item: any) => {
                          // console.log(item, "itemeff");
                          // console.log(item.isChecked, "ischeckeff");
                          return item.isChecked !== true;
                        }) */}
                    {/* // unMappedEmployees */}
                    {allEmployees
                      ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                      ?.filter((j: any) => {
                        return j?.isCEORole === false && j?.isLeavers === false && j?.isExcluded === false
                      })
                      ?.filter((j: any) => {
                        console.log(j, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                        if (
                          templateAll === "None" ||
                          templateAll === ""
                        ) {
                          return j;
                        } else {
                          return getTemplateName(j)
                            ?.toLocaleLowerCase()
                            .includes(templateAll?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (AppName2 === "None" || AppName2 === "") {
                          return j;
                        } else {
                          return j.appraiser_name
                            .toLocaleLowerCase()
                            .includes(AppName2.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (RevName2 === "None" || RevName2 === "") {
                          return j;
                        } else {
                          return j?.reviewer_name
                            ?.toLocaleLowerCase() === RevName2?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (norName2 === "None" || norName2 === "") {
                          return j;
                        } else {
                          return j?.normalizer_name
                            ?.toLocaleLowerCase() === norName2?.toLocaleLowerCase();
                          //.includes(empgrades.toLocaleLowerCase());
                        }
                      })
                      ?.filter((j: any) => {
                        console.log(j, 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                        if (
                          employeeNameAll === "None" ||
                          employeeNameAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.legal_full_name
                          ?.toLocaleLowerCase() === employeeNameAll?.toLocaleLowerCase();
                            // .includes(employeeNameAll?.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          employeeCodeAll === "None" ||
                          employeeCodeAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.employee_code
                          ?.toLocaleLowerCase() === employeeCodeAll?.toLocaleLowerCase();
                            // .includes(employeeCodeAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j.isSupervisor, "superv");
                        if (sNSAll === "None" || sNSAll === "") {
                          return j;
                        }
                        if (sNSAll === "SP") {
                          return j?.isSupervisor === true;
                        } else if (sNSAll === "N-SP") {
                          return j?.isSupervisor != true 
                          // || j?.name?.isSupervisor === undefined;
                        }
                      })
                      .filter((j: any) => {
                        if (
                          positionsAll === "None" ||
                          positionsAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.position_long_description
                          ?.toLocaleLowerCase() === positionsAll?.toLocaleLowerCase();
                            // .includes(positionsAll.toLocaleLowerCase());
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
                        if (positionsFilterAll.includes("None") || positionsFilterAll.length === 0) {
                          return item1;
                        } else {
                          return !!positionsFilterAll?.find((item2: any) => item1?.position_long_description === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
                          return item1;
                        } else {
                          return !!GradeFilterAll?.find((item2: any) => item1?.grade === item2)
                        }
                      })
                      .filter((item1: any) => {
                        if (positionFilterAll.includes("None") || positionFilterAll.length === 0) {
                          return item1;
                        } else {
                          return !!positionFilterAll?.find((item2: any) => item1?.position_long_description === item2)
                        }
                      })
                      // .filter((item1: any) => {
                      //   if (GradeFilterAll.includes("None") || GradeFilterAll.length === 0) {
                      //     return item1;
                      //   } else {
                      //     return !!GradeFilterAll?.find((item2: any) => item1?.name?.grade === item2)
                      //   }
                      // })
                      .filter((j: any) => {
                        if (
                          empFunctionAll === "None" ||
                          empFunctionAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.function
                          ?.toLocaleLowerCase() === empFunctionAll?.toLocaleLowerCase();
                            // .includes(empgradesAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empsectionsAll === "None" ||
                          empsectionsAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.section
                          ?.toLocaleLowerCase() === empsectionsAll?.toLocaleLowerCase();
                            // .includes(empsectionsAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (ProbationStatus2 === "None" || ProbationStatus2 === "") {
                          return j;
                        } else {
                          return j?.probation_status
                            .toLocaleLowerCase()
                            .includes(ProbationStatus2.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          empdivisionsAll === "None" ||
                          empdivisionsAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.division
                          ?.toLocaleLowerCase() === empdivisionsAll?.toLocaleLowerCase();
                            // .includes(empdivisionsAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j["sub section"], "employeesection");
                        if (
                          empsubSectionsAll === "None" ||
                          empsubSectionsAll === ""
                        ) {
                          return j;
                        } else {
                          return j["sub section"]
                          ?.toLocaleLowerCase() === empsubSectionsAll?.toLocaleLowerCase();
                            // .includes(
                            //   empsubSectionsAll.toLocaleLowerCase()
                            // );
                        }
                      })
                      .filter((j: any) => {
                        if (
                          managerCodeAll === "None" ||
                          managerCodeAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.manager_code
                            .toLocaleLowerCase()
                            .includes(managerCodeAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          managerNameAll === "None" ||
                          managerNameAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.manager_name
                            .toLocaleLowerCase()
                            .includes(managerNameAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (
                          workLocationAll === "None" ||
                          workLocationAll === ""
                        ) {
                          return j;
                        } else {
                          return j?.work_location
                            .toLocaleLowerCase()
                            .includes(workLocationAll.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        if (searchNameAll === "") {
                          return j;
                        }else if (
                          (getTemplateName(j) !== undefined &&    
                            // @ts-ignore
                            getTemplateName(j)
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.employee_code !== undefined &&
                            j?.employee_code
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.legal_full_name !== undefined &&
                            j?.legal_full_name
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.section !== undefined &&
                            j?.section
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.position_long_description !== undefined &&
                            j?.position_long_description
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase())) ||
                              (j?.probation_status !== undefined &&
                                j?.probation_status
                                  .toLocaleLowerCase()
                                  .includes(searchNameAll.toLocaleLowerCase())) ||
                                  (j?.function !== undefined &&
                                    j?.function
                                      .toLocaleLowerCase()
                                      .includes(searchNameAll.toLocaleLowerCase())) ||
                                      (j?.appraiser_name !== undefined &&
                                        j?.appraiser_name
                                          .toLocaleLowerCase()
                                          .includes(searchNameAll.toLocaleLowerCase())) ||
                                          (j?.reviewer_name !== undefined &&
                                            j?.reviewer_name
                                              .toLocaleLowerCase()
                                              .includes(searchNameAll.toLocaleLowerCase())) ||
                                              (j?.normalizer_name !== undefined &&
                                                j?.normalizer_name
                                                  .toLocaleLowerCase()
                                               .includes(searchNameAll.toLocaleLowerCase())) ||
                          (j?.grade !== undefined &&
                            j?.grade
                              .toLocaleLowerCase()
                              .includes(searchNameAll.toLocaleLowerCase()))
                        ) {
                          return j;
                        }else if(searchNameAll !== ""){
                          if (searchNameAll == "SP") {
                            return j?.isSupervisor == true;
                          }else if (searchNameAll == "N-SP") {
                              return j?.isSupervisor != true;
                            }
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((employee: any) => {
                        console.log(employee, "employee");
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                          // sx={{
                          //   "&:last-child td, &:last-child th": {
                          //     border: 0,
                          //   },
                          //   whiteSpace: "nowrap",
                          // }}
                          >
                            {/* <TableCell align="left">
                               
                                <input
                                  name={employee._id}
                                  checked={employee?.isChecked || false}
                                  //onChange={handleOnCheckselectedDataUnmapped}
                                  onChange={handleOnCheckDataUnmapped}
                                  type="checkbox"
                                  style={{
                                    height: "18px",
                                    width: "18px",
                                    borderColor: "#D5D5D5",
                                  }}
                                />
                              </TableCell> */}
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                cursor:"pointer"
                              }}
                              align="left"
                              onClick = {() => {
                                templateNavigateHandler(employee)
                              }}
                            >
                              {employee && getTemplateName(employee)}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"
                              }}
                              align="center"
                            >
                              {employee?.employee_code}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                                padding: "14px",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee?.legal_full_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // whiteSpace: "nowrap",
                              }}
                              style={{ minWidth: 250 }}
                              align="left"
                            >
                              {employee?.position_long_description}
                            </TableCell>

                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"50px"

                              }}
                              align="center"
                            >
                              {employee?.grade}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"

                              }}
                              align="center"
                            >
                              {employee?.probation_status}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                                paddingRight:"36px"

                              }}
                              align="center"
                            >
                              {employee.isSupervisor != true
                                ? "N-SP"
                                : "SP"}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.function}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              sales-support/ Business-sales
                            </TableCell> */}
                          

                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name?.division}
                            </TableCell> */}
                             <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.appraiser_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.reviewer_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.normalizer_name}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.section}
                            </TableCell>
                            {/* <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              {employee?.name["sub section"]}
                            </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.manager_code}
                              </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.manager_name}
                              </TableCell> */}
                            {/* <TableCell
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  whiteSpace: "nowrap",
                                }}
                                align="right"
                              >
                                {employee.work_location}
                              </TableCell> */}
                          </TableRow>
                        );
                      })}
                  </TableBody>):(
                  <TableBody>
                <TableRow>
                  <TableCell 
                  colSpan={8}
                  align="center" 
                  style={{ fontWeight: 'bold',border:"none",
                  color:"#808080",fontSize:"18px",fontFamily:"arial",display:"flex",width:"max-content" }}
                  >
                    No data to display
                  </TableCell>
                </TableRow>
              </TableBody>)}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                //count={tablecount}
                count={allCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            {/* </TabPanel> */}
            </>
            )}

          </Box>
          <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
            {/* <Dialog
              open={multiselectDialogOpen}
              onClose={handlemultiselectDialogClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to make changes ? "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                "Would you like to save the change?"
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handlemultiselectDialogClose}>No</Button>
                <Button onClick={(e) => { acceptSave(e) }} >
                  Yes
                </Button>
              </DialogActions>
            </Dialog> */}
            <Dialog
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
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
              open={open1}
              onClose={handleClose1}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              {/* <DialogTitle id="alert-dialog-title">
                {"Do you want to make changes ? "}
              </DialogTitle> */}
              {/* <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                id="alert-dialog-title"
              >
                <IconButton >
                  <img src={Closeicon} alt="icon" />
                </IconButton>
              </DialogTitle> */}
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
                  id="alert-dialog-description"
                >
                  Would you like to confirm the changes?
                </DialogContentText>
              </DialogContent>
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
                    // paddingBottom: "30px"
                  }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: "#3e8cb5",
                      fontFamily: "Arial",
                      borderColor: "#3e8cb5",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    onClick={(e) => {
                      handleAgree1(e);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: "#3e8cb5",
                      fontFamily: "Arial",
                      borderColor: "#3e8cb5",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    onClick={handleClose1}
                  >
                    No
                  </Button>
                </DialogActions>
              </Stack>
            </Dialog>
            <Dialog
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
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
              open={open}
              onClose={handleClose}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              {/* <DialogTitle id="alert-dialog-title">
                {"Do you want to make changes ? "}
              </DialogTitle> */}
              {/* <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                id="alert-dialog-title"
              >
                <IconButton >
                  <img src={Closeicon} alt="icon" />
                </IconButton>
              </DialogTitle> */}
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
                  id="alert-dialog-description"
                >
                  Would you like to confirm the changes?
                </DialogContentText>
              </DialogContent>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              // paddingBottom="30px"
              >
                <DialogActions
                  style={{
                    justifyContent: "center",
                    paddingBottom: "30px"
                  }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: "#3e8cb5",
                      fontFamily: "Arial",
                      borderColor: "#3e8cb5",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    onClick={(e) => {
                      //handleAgree(e);

                      filterReset();
                      setOpen(false);
                      selectOneError(checkboxIdHandler(checkboxHandler(unmappedEmpDatum)));
                      onSubmitP({
                        position: checkboxIdHandler(checkboxHandler(unmappedEmpDatum)),
                      });
                      setsaveTrigger(true);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      color: "#3e8cb5",
                      fontFamily: "Arial",
                      borderColor: "#3e8cb5",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    No
                  </Button>
                </DialogActions>
              </Stack>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}