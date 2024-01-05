import * as React from "react";
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
import Newexcel from "./icons/Newexcel.svg";
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
  ListItemText,
  TextField,
  InputAdornment,
  OutlinedInput,
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
import { useGetActiveCalenderQuery, useGetEmployeeAppraisalQuery,
   useGetEmployeeByFilterQuery, useGetEmployeeQuery,useGetConfirmValidationQuery } from "../../../service";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Scrollbar from "react-scrollbars-custom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import { ADD_EMPLOYEE } from "../../../constants/routes/Routing";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateEmployeeAppraisalMutation } from "../../../service";
import { makeStyles } from '@mui/styles';
import Edit from "../../../assets/Images/Edit.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important",
    top:"60px !important",
    right:"4px !important",
    height:"calc(100% - 72px) !important"
    },
    "& .ScrollbarsCustom-TrackX": {
      height:"6px !important"
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
export default function Employeelisttable() {
  const classes = useStyles();
  const navigate = useNavigate();
  const CustomScrollbar = Scrollbar as any;

  const [count, setCount] = React.useState(650);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,
  grade,service_reference_date,isSupervisor,grade_set,first_name,position_code,division,function,
  launchcalendarvalidations.confirmEmployeeMaster,confirmTemplate,appraiser_code,reviewer_code,normalizer_code,
  section,sub section,sub_section,manager_code,overall_rating,manager_name,manager_position,work_location,job_code,job_title,job_level,probation_status,
  appraiser_name,master_appraiser_code,master_appraiser_name,normalizer_name,reviewer_name,isCEORole,isLeavers,isExcluded,isGradeException,isRoleException,employee_upload_flag,isSelected,roles,email`
  const { data, isLoading, isFetching, refetch } = useGetEmployeeByFilterQuery(
    `?limit=700&select=${SELECT_FOR_DASHBOARD}&employee_upload_flag=true`
  );
  const { data: activeCalendarData } = useGetActiveCalenderQuery('');
  // const { data,isLoading:isLoading } = useGetEmployeeQuery("all");
  //mapping functionalities
  const { employee_id } = useParams();
  //  const { data: employeeData, isLoading } =useGetEmployeeAppraisalQuery(employee_id);
  //-------------------------------------------for add validation
  const [message, setMessage] = useState("")
  const [clearAlert, setClearAlert] = useState(false)
  const { data: confVal } = useGetConfirmValidationQuery('');
  console.log(confVal?.data[0]?.confirmEmployeeMaster, "ghg");
  //-------------------------------------------for add validation
  useEffect(() => {
    //for refetching after uploading the data
    refetch()
  }, [])
  console.log(employee_id, "employee_id")
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
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

  // React.useEffect(() => {
  //   if (data != undefined) {
  //     setCount(data.data.length)
  //   }
  // }, [data])

  //sorting
  // const [positions, setPositions] = React.useState<any>([]);
  const [searchName, setSearchName] = useState("")
  const [positions, setPositions] = React.useState("");
  console.log(searchName, "searchName");
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

  const ITEM_HEIGHT = 35;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    // anchorOrigin: { vertical: "bottom", horizontal: "center" },
    // transformOrigin: { vertical: "top", horizontal: "right" },
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // maxWidth: 200,
        fontSize: "14px !important",
        fontFamily: "Arial",
        color: "#333333",
        // top:"250px !important",
        // left:"62px !important"
      },
    },
  };

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
  ];
  const FullName = [
    "Ahmed J. S. Abdaljawad",
    "Ghulam Raza",
    "Haytham M. M. Alkurdi",
    "Kokab Hussain Khan",
    "Lydiane Kemzeu Dongmo",
    "	Liaqat Mahmood Sahib Ali",
    "Mohamed Riyaz Sulthan Mohideen",
    "Naik Muhammad Khan",
    "Qasim Malik Hawaldar Khan",
    "Yousef Said Sharabati",
  ];
  const FirstName = [
    "Ahmed J. S.",
    "Ghulam",
    "Haytham",
    "Kokab Hussain",
    "Lydiane",
    "Liaqat",
    "Mohamed Riyaz",
    "	Naik Muhammad",
    "Qasim",
    "Yousef (Moh'd Jehad)	",
  ];
  // const Function = ["Sales/Non-Sales", "Sales/Non-Sales"];
  const sNSvalues = ["SP", "N-SP"];
  const sNSvaluess = [{ name: "SP", value: true }, { name: "N-SP", value: false }];
  const Service = [
    "18-Jan-15",
    "15-Apr-12",
    "	06-Apr-13",
    "17-May-14",
    "	01-May-16",
    "15-May-16",
    "	22-May-16",
    "02-Jul-12",
    "	04-Jul-04",
  ];
  const EmployeeCode = ["1001", "1002", "1003", "1005", "1006", "1007", "1008"];
  const PositionCode = [
    "Driver - Service",
    "Forklift Operator",
    "Labourer - Installation",
    "Messenger - Admin",
    "	Senior Sales Executive I - SMEs",
    "Supervisor - House Staff",
    "Storekeeper",
    "Senior Sales Engineer II - SMEs",
    "Technician I /Driver - Service",
  ];
  // const SubSection = ["Installation", "SMEs", "Service"];
  const ManagerCode = ["918", "1080", "1119", "1113", "1650"];
  const ManagerName = [
    "Bassam Walid Moussa",
    "John Jerick Aguila",
    "Nasser Hussein Darwish Al-Derbashi",
    "Yaseen Mohammed Mohsen",
  ];
  const ManagerPosition = [
    "Administration Supervisor I",
    "Foreman - Installation",
    "Foreman - Service",
    "Managing Director",
    "Service Centre Supervisor I - DXB/NE",
    "Storekeeper",
    "	Senior Sales Manager - SMEs",
    "Warehouse Manager I",
    "Warehouse Supervisor I",
  ];
  const WorkLocation = [
    "ALN",
    "AJM WS",
    "AJM WH",
    "AJM Port",
    "GHD",
    "JDF WS",
    "KZD",
    "TAGEH",
  ];
  const Gradeset = [
    "	Individual Contributor",
    "Management",
    "Management",
    "	Support - HS",
    "Support",
  ];
  const Jobcode = [
    "DRVR",
    "LABRER",
    "LABRER",
    "MSSENGER",
    "SR_EXEC",
    "SUPRVSR_HS",
    "STRKEEPER",
    "SR_ENGR_II",
    "TECH_I",
    "xjbs2",
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
    "Operations - OS",
    "Operations - UAE",
    "Sales",
    "Sudan",
    "Personal",
    "Private Office",
    "Trainees",
  ];

  const Sections = [
    "Corp Support - CI, IT  &  BA",
    "Corp Support - Admin",
    "Corp Support - HR",
    "Eng - Application & Design",
    "Fin - Accounting",
    "Ops UAE - Warehouse",
    "Ops UAE - Service Centre",
    "Ops UAE - Parts Centre",
    "Ops UAE - Sales Operations",
    "Ops UAE - Project Operations",
    "Personal - House Staff",
    "Sales - Projects & SMEs",
    "Sales - ExCom",
  ];
  const jobtitle = [
    "Driver",
    "	Forklift Operator",
    "Labourer",
    "Labourer",
    "Messenger",
    "Sr. Executive I",
    "Supervisor - HS",
    "Storekeeper",
    "Sr. Engineer II",
    "Technician I",
  ];

  const joblevel = [
    "Supervisor I",
    "Semi-Skilled III - HS",
    "Skilled II",
    "Semi-Skilled II",
    "Semi-Skilled I",
    "Supervisor II",
    "Semi-Skilled I",
    "Unskilled",
    "	Semi-Skilled III",
    "Unskilled",
  ];

  const [columnHeaders, setcolumnHeaders] = React.useState<any>({
    Ecode: true,
    Ename: true,
    Firstname:true,
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
    Potentiallevel: true,
    TalentCategory: true,
    OverAllRating: true,
    PreviousRating: true,
    AppraiserCode: true,
    ReviewerCode: true,
    NormalizerCode: true,
    ProbationStatus: true,
    EmailId: true,
    SelectAll: true,
  })
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = React.useState<any>({
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
    SupervisoryRolee: true,
    Function: true,
    ServiceReferenceDate: true,
    PositionCode: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    Reviewername: true,
    ManagerName: true,
    ManagerPosition: true,
    AppraiserName: true,
    WorkLocation: true,
    GradeSet: true,
    JobCode: true,
    JobTitle: true,
    JobLevel: true,
    OverAllRating: true,
    Normalizername: true,
    Potentiallevel: true,
    TalentCategory: true,
    PreviousRating: true,
    AppraiserCode: true,
    ReviewerCode: true,
    NormalizerCode: true,
    ProbationStatus: true
  })

  console.log(columnHeaders, columnHeadersDisplay, "h1");
  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [sectionFilter, setSectionFilter] = React.useState<string[]>([]);
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [rolesFilter, setrolesFilter] = React.useState<string[]>([]);
  console.log(rolesFilter.length,"rolesFilter")
  //const [rolesArray, setrolesArray] = React.useState<any>([]);
  //Probation status 
  const [ProbationStatus1, setProbationStatus1] = React.useState("");
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

    setProbationStatus1(event?.target?.getAttribute("value"));


    setProbationStatusVal(null);
    setPage(0);
  };
console.log(ProbationStatus1,"ProbationStatus1")
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
 let rolesArray = ["Appraiser", "Reviewer", "HR Normalizer"];
  const isAllroles =
  rolesArray?.length > 0 && rolesFilter?.length === rolesArray?.length;

const handleChangeroles = (event: any) => {
  const value = event.target.value;
  if (value[value.length - 1] === "all") {
    console.log((rolesFilter?.length === rolesArray?.length ? [] : "select all"), "newwwwww")

    setrolesFilter(rolesFilter?.length === rolesArray?.length ? [] : rolesArray);
    return;
  }
  setrolesFilter(value);
  setPage(0);
};

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
    setPage(0);
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
    setPage(0)
  };
  // console.log(positionFilter, "positionFilter");
  const handleChangeSelectPosition = (event: SelectChangeEvent<typeof positionFilter>) => {
    const {
      target: { value },
    } = event;
    if (value.includes("None")) { setpositionFilter([]) } else {
      setpositionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
    setPage(0)
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
    setPage(0)
  };
  //sorting
  //headings-sort
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  // console.log(isDrawerOpen, "position");
  const handleDrawer = (event: SelectChangeEvent) => {
    setisDrawerOpen(false);
  };

  const [heading1, setheading1] = React.useState(true);
  // console.log(heading1, "h1");
  // const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  // const [headingSN, setheadingSN] = React.useState(true);
  // // console.log(headingSN, "h1");
  // const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheadingSN(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading4, setheading4] = React.useState(true);
  // // console.log(heading4, "h4");
  // const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading4(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading5, setheading5] = React.useState(true);
  // // console.log(heading5, "h5");
  // const handleheading5 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading5(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading6, setheading6] = React.useState(true);
  // // console.log(heading6, "h6");
  // const handleheading6 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading6(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading7, setheading7] = React.useState(true);
  // // console.log(heading7, "h7");
  // const handleheading7 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading7(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading8, setheading8] = React.useState(true);

  // const handleheading8 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading8(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading9, setheading9] = React.useState(true);

  // const handleheading9 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading9(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading10, setheading10] = React.useState(true);
  // const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading10(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading11, setheading11] = React.useState(true);
  // const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading11(event.target.checked);
  // };
  // const [heading12, setheading12] = React.useState(true);
  // const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading12(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading13, setheading13] = React.useState(true);
  // const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading13(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading14, setheading14] = React.useState(true);
  // const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading14(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading15, setheading15] = React.useState(true);
  // const handleheading15 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading15(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading16, setheading16] = React.useState(true);
  // const handleheading16 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading16(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading17, setheading17] = React.useState(true);
  // const handleheading17 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading17(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading18, setheading18] = React.useState(true);
  // const handleheading18 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading18(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
  // const [heading19, setheading19] = React.useState(true);
  // const handleheading19 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setheading19(event.target.checked);
  //   let columnHeadersTemp = columnHeaders
  //   columnHeadersTemp[event.target.name] = event.target.checked;
  //   setcolumnHeaders(columnHeadersTemp)
  // };
   //appraiser Filter
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
//Normalizer filter

//for appraiser ,reiewer and normalizer name options
const appraiserNames = Array.from(new Set(data?.data?.map((i: any) => i?.appraiser_name)))
    .sort((a: any, b: any) => a?.localeCompare(b))
    .filter((i: any) => {
      return i != undefined
    })
  const ReviewerNames = Array.from(new Set(data?.data?.map((i: any) => i?.reviewer_name)))
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
  const NormalizerNames = Array.from(new Set(data?.data?.map((i: any) => i?.normalizer_name)))
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
  //headings-sort
  // Define a function to handle selecting/deselecting all checkboxes
const handleSelectAll = (selectAll:any) => {
  const updatedColumnHeaders = { ...columnHeaders };
  // Set all checkbox values to the selectAll value (true or false)
  Object.keys(updatedColumnHeaders).forEach((key) => {
    updatedColumnHeaders[key] = selectAll;
  });
  setcolumnHeaders(updatedColumnHeaders);
};

  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {

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
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  //Grade Select Filter
  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
    // setOpenGrade(false);
    setisDrawerOpen(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname:true,
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
      Potentiallevel: true,
      TalentCategory: true,
      OverAllRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      ProbationStatus: true,
      EmailId: true,
      SelectAll: true,
    })
  
  };
  const handleOpenGrade = () => {
    setOpenGrade(true);
  };

  //Supervisor NonSupervisor logic
  const [supervisorIDs, setSupervisorIDs] = React.useState<any[]>([]);

  const dataCode = [
    "1001",
    "1007",
    "1009",
    "1054",
    "1058",
    "1080",
    "1087",
    "1089",
    "1090",
    "1100",
    "1103",
    "1105",
    "1106",
    "1123",
    "1126",
    "1161",
    "1162",
    "1164",
    "1165",
    "1167",
    "1169",
    "1170",
    "1194",
    "12",
    "1202",
    "1217",
    "1220",
    "1223",
    "1227",
    "1231",
    "1232",
    "1234",
    "1235",
    "1237",
    "1250",
    "1264",
    "1272",
    "1287",
    "13",
    "1310",
    "1320",
    "1342",
    "1349",
    "1351",
    "1364",
    "1386",
    "1393",
    "1419",
    "1422",
    "1448",
    "1451",
    "1458",
    "1462",
    "1468",
    "1471",
    "1476",
    "1482",
    "1483",
    "1500",
    "1502",
    "1503",
    "1520",
    "1526",
    "1532",
    "1536",
    "1537",
    "1546",
    "1552",
    "1559",
    "1561",
    "1562",
    "1563",
    "1568",
    "1572",
    "1576",
    "1579",
    "1594",
    "1605",
    "1606",
    "1616",
    "1626",
    "1633",
    "1644",
    "1646",
    "1652",
    "1654",
    "1656",
    "1688",
    "1697",
    "1699",
    "1706",
    "1707",
    "1710",
    "1714",
    "1717",
    "1720",
    "1721",
    "1722",
    "1723",
    "1727",
    "1731",
    "1732",
    "1737",
    "1738",
    "1749",
    "1752",
    "1755",
    "1756",
    "1757",
    "1759",
    "1760",
    "1766",
    "1767",
    "1771",
    "1780",
    "1781",
    "1782",
    "1783",
    "1786",
    "1788",
    "1790",
    "1799",
    "1805",
    "1806",
    "1807",
    "1808",
    "1809",
    "1822",
    "1825",
    "1828",
    "1840",
    "1842",
    "1846",
    "1859",
    "32",
    "473",
    "524",
    "765",
    "893",
    "904",
    "918",
    "919",
    "934",
    "935",
    "936",
    "939",
    "941",
    "942",
    "943",
    "944",
    "947",
    "948",
    "952",
    "955",
    "956",
    "957",
    "979",
    "980",
    "981",
    "984",
    "985",
    "991",
    "997",
    "998",
  ];

  const dtt = dataCode.map((j: any) => `${j}`);
  // console.log(dtt, 'check')
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
  const [anchorElnewFunction, setAnchorElnewFunction] = React.useState<null | HTMLElement>(
    null
  );
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
  console.log(empFunction, "empfunction")
  //function

  //FirstName
  const [anchorElnewFirstName, setAnchorElnewFirstName] = React.useState<null | HTMLElement>(
    null
  );
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
  };
  //FirstName

  //Supervisory Role
  const [anchorElnewSupervisoryRole, setAnchorElnewSupervisoryRole] = React.useState<null | HTMLElement>(
    null
  );
  const openSupervisoryRole = Boolean(anchorElnewSupervisoryRole);
  const handleClickSupervisoryRole = (event: React.MouseEvent<HTMLElement>) => {
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
  console.log(sNS, "snsssss")
  //Supervisory Role
  //serviceRefDate
  const [anchorElnewserviceRefDate, setAnchorElnewserviceRefDate] = React.useState<null | HTMLElement>(
    null
  );
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
  };
  //serviceRefDate
  //Grade
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
  //Position Code
  const [anchorElnewPositionCode, setAnchorElnewPositionCode] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewDivision, setAnchorElnewDivision] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewSection, setAnchorElnewSection] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewSubSection, setAnchorElnewSubSection] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewManagerCode, setAnchorElnewManagerCode] = React.useState<null | HTMLElement>(
    null
  );
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
  };
  //Manager Code
  //Manager Name
  const [anchorElnewManagerName, setAnchorElnewManagerName] = React.useState<null | HTMLElement>(
    null
  );
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
  };
  //Manager Name
  //Manager Position
  const [anchorElnewManagerPosition, setAnchorElnewManagerPosition] = React.useState<null | HTMLElement>(
    null
  );
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
  };
  //Manager Position
  //Work Location
  const [anchorElnewWorkLocation, setAnchorElnewWorkLocation] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewGradeSet, setAnchorElnewGradeSet] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewJobCode, setAnchorElnewJobCode] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewJobTitle, setAnchorElnewJobTitle] = React.useState<null | HTMLElement>(
    null
  );
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
  const [anchorElnewJobLevel, setAnchorElnewJobLevel] = React.useState<null | HTMLElement>(
    null
  );
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
  const [users, setUsers] = React.useState<any>([]);
  React.useEffect(() => {
    console.log("useeffect run");
    if (data) {
      setUsers(data.data);
    }
  }, [data]);
  //populating filter dropdown
  const [serviceRef, setserviceRef] = React.useState<any>([]);

  const [positioncodeArray, setpositioncodeArray] = React.useState<any>([]);
  const [divisionArray, setdivisionArray] = React.useState<any>([]);

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
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.service_reference_date?.localeCompare(
          b?.service_reference_date
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
    // console.log(serviceRef, "serviceRef")
    let grades = users
      .slice()
      .sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
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
        ?.filter((i: any) => {
          return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
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
          return a?.grade?.localeCompare(
            b?.grade
          );
        })
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.grade
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
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
    const gradeContents = grades.filter((c: any, index: any) => {
      return grades.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    // console.log(gradeContents, "contents");
    let position = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(
          b?.position_long_description
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
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.grade === item2)
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
        ?.filter((i: any) => {
          if (searchName.length > 0) {
            const searchTerms = searchName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.position_long_description
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
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
    console.log(position, "positionhhhhhhhhhh")

    const positionContents = position.filter((c: any, index: any) => {
      return position.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArray(positionContents);
    // console.log(positionContents, "contents");

    const positionCode = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_code?.localeCompare(b?.position_code);
      })
      .map((i: any) => {
        return i.position_code;
      });
    const positionCodeContents = positionCode.filter((c: any, index: any) => {
      return positionCode.indexOf(c) === index && c != null && c != undefined;
    });
    setpositioncodeArray(positionCodeContents);
    // console.log(positionContents, "contents");

    const division = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.division?.localeCompare(b?.division);
      })
      .map((i: any) => {
        return i.division;
      });
    const divisionContents = division.filter((c: any, index: any) => {
      return division.indexOf(c) === index && c != null && c != undefined;
    });
    setdivisionArray(divisionContents);
    // console.log(divisionContents, "contents");

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
    // console.log(sectionContents, "contents");

    const subSection = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.["sub_section"]?.localeCompare(b?.["sub_section"]);
      })
      .map((i: any) => {
        return i["sub_section"];
      });
    const subSectionContents = subSection.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    console.log(subSection, "subSection")
    setsubSectionArray(subSectionContents);
    // console.log(subSectionContents, "contents");

    const managerCode = users
      .slice()
      .sort(function (a: any, b: any) {
        return a.manager_code - b.manager_code;
      })
      .map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    // console.log(managerCodeContents, "contents");

    const managerName = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_name?.localeCompare(b?.manager_name);
      })
      .map((i: any) => {
        return i.manager_name;
      });
    const managerNameContents = managerName.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    // console.log(managerNameContents, "contents");

    const managerPosition = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.manager_position?.localeCompare(b?.manager_position);
      })
      .map((i: any) => {
        return i.manager_position;
      });
    const managerPositionContents = managerPosition.filter(
      (c: any, index: any) => {
        return (
          managerPosition.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setmanagerPositionArray(managerPositionContents);
    // console.log(managerPositionContents, "contents");

    const workLocation = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.work_location?.localeCompare(b?.work_location);
      })
      .map((i: any) => {
        return i.work_location;
      });
    const workLocationContents = workLocation.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    // console.log(workLocationContents, "contents");

    const gradeSet = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade_set?.localeCompare(b?.grade_set);
      })
      .map((i: any) => {
        return i.grade_set;
      });
    const gradeSetContents = gradeSet.filter((c: any, index: any) => {
      return gradeSet.indexOf(c) === index && c != null && c != undefined;
    });
    setgradeSetArray(gradeSetContents);
    // console.log(workLocationContents, "contents");

    const jobCode = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_code?.localeCompare(b?.job_code);
      })
      .map((i: any) => {
        return i.job_code;
      });
    const jobCodeContents = jobCode.filter((c: any, index: any) => {
      return jobCode.indexOf(c) === index && c != null && c != undefined;
    });
    setjobCodeArray(jobCodeContents);
    // console.log(jobCodeContents, "contents");

    const jobTitle = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_title?.localeCompare(b?.job_title);
      })
      .map((i: any) => {
        return i.job_title;
      });
    const jobTitleContents = jobTitle.filter((c: any, index: any) => {
      return jobTitle.indexOf(c) === index && c != null && c != undefined;
    });
    setjobTitleArray(jobTitleContents);
    // console.log(jobTitleContents, "contents");

    const jobLevel = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.job_level?.localeCompare(b?.job_level);
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

  const [roleid, setroleid] = React.useState(false);
  const [appriserrole, setappriserrole] = React.useState(false);
  const [reviewerrole, setreviewerrole] = React.useState(false);
  const [normalizerrole, setnormalizerrole] = React.useState(false);


  const [rolechecked, setrolechecked] = React.useState<any>([]);
  const handleOnCheck12 = (e: any) => {
    const { name, checked } = e.target;

    const tempUser1 = rolechecked?.map((employee: any) => {
      console.log(employee?._id, name, checked);
      return (
        // employee?._id === name
        //   ? 
        { ...employee, appraiserIsChecked: checked }
      )
      // : employee;
    });
    setUsers(tempUser1)
    if (users?.map((j: any) => {
      return j?.appraiserIsChecked == true
    })) {
      setappriserrole(true)
    }
    // const setid = rolechecked?.map((j:any)=>{
    //   return j?._id
    // })
    // setroleid(setid)


  }
  console.log(users, "handleOnCheck13")
  // passing the role id to save mutation
  React.useEffect(() => {
    const setid = rolechecked?.map((j: any) => {
      return j?._id
    })
    setroleid(setid)
  }, [rolechecked])
  const handleOnCheck13 = (e: any) => {
    const { name, checked } = e.target;

    const tempUser1 = rolechecked?.map((employee: any) => {
      return (
        // employee?._id === name
        //   ? 
        { ...employee, reviewerIsChecked: checked }
      )
    });
    setUsers(tempUser1)
    if (users?.map((j: any) => {
      return j?.reviewerIsChecked == true
    })) {
      setreviewerrole(true)
    }
    // const setid = rolechecked?.map((j:any)=>{
    //   return j?._id
    // })
    // setroleid(setid)
    console.log(reviewerrole, normalizerrole, "reviewerrole")

  }
  const handleOnCheck14 = (e: any) => {
    const { name, checked } = e.target;

    const tempUser1 = rolechecked?.map((employee: any) => {
      // console.log(employee?._id, name, checked);
      return (
        // employee?._id === name
        //   ? 
        { ...employee, normalizerIsChecked: checked }
      )
      // : employee;
    });
    setUsers(tempUser1)
    if (users?.map((j: any) => {
      return j?.normalizerIsChecked == true
    })) {
      setnormalizerrole(true)
    }
    // const setid = rolechecked?.map((j:any)=>{
    //   return j?._id
    // })
    // setroleid(setid)
  }
  const handleOnCheck11 = (e: any) => {
    const { name, checked } = e.target;
    const tempUser = users.map((employee: any) => {
      console.log(name, "checkbox✅")
      return employee?._id === name
        // return filteredUsersID?.includes(employee?.employee_code)
        ? { ...employee, isChecked: checked }
        : employee;
    });
    setUsers(tempUser)
    // const setid = rolechecked?.map((j:any)=>{
    //   return j?._id
    // })
    // setroleid(setid)
  }
  console.log(users, "users")
  React.useEffect(() => {
    const temp = users?.filter((item: any) => {
      return item?.isChecked == true
    })?.map((j: any) => {
      return j
    })
    console.log(temp, "nwewwww")
    setrolechecked(temp)

  }, [users])
  console.log(rolechecked, "rolechecked")
  const handleExport = () => {
    // setShow(0);
    // console.log(users, 'excel')
   
    let mapped =  users
    ?.filter((i: any) => i.employee_upload_flag)
    ?.filter((j: any, index: any) => {
      if (positions === "None" || positions === "") {
        return j;
      } else {
        return j?.position_long_description
          ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
        //.includes(positions.toLocaleLowerCase());
        // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
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
        return j?.employee_code?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();

        // .includes(empEmployeeCode?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.grade
          ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empdivisions === "None" || empdivisions === "") {
        return j;
      } else {
        return j?.division
          ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
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
          ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
        //?.includes(empFirstName?.toLocaleLowerCase());
      }
    })
    ?.filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    // ?.filter((item1: any) => {
    //   if (rolesFilter.length === 0) {
    //     return item1;
    //   } else {
    //     return !!rolesFilter?.find((item2: any) => item1?.roles)
    //   }
    // })
    .filter((item1: any) => {
      const filteredRoles = item1?.roles;
      if (rolesFilter.length === 0) {
        return item1;
      } else {
        return (
          rolesFilter.every((item2: string) => filteredRoles?.[item2]) &&
          Object.keys(filteredRoles).some((key: string) => rolesFilter.includes(key))
        );
      }
    })
    ?.filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    ?.filter((j: any) => {
      if (empFunction === "None" || empFunction === "") {
        return j;
      } else {
        return j?.function
          ?.toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
        //?.includes(empFirstName?.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (AppName === "None" || AppName === "") {
        return j;
      } else {
        return j?.appraiser_name
          ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (RevName === "None" || RevName === "") {
        return j;
      } else {
        return j?.reviewer_name
          ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (norName === "None" || norName === "") {
        return j;
      } else {
        return j?.normalizer_name
          ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    // empFunction
    // ?.filter((j: any) => {
    //   if (empFunction === "None" || empFunction === "") {
    //     return j;
    //   } else {
    //     return j?.function?.toLocaleLowerCase()?.includes(
    //       empFunction?.toLocaleLowerCase()
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
          ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
        //?.includes(empPositionCode?.toLocaleLowerCase());
      }
    })

    ?.filter((j: any) => {
      if (empService === "None" || empService === "") {
        return j;
      } else {
        return j?.service_reference_date
          ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
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
      if (empSubSection === "None" || empSubSection === "") {
        return j;
      } else {
        return j["sub section"]
          ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
        //.includes(empSubSection.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empGradeset === "None" || empGradeset === "") {
        return j;
      } else {
        return j?.grade_set
          ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
        //?.includes(empGradeset?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empManagerCode === "None" || empManagerCode === "") {
        return j;
      } else {
        return j?.manager_code
          ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
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
          ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
        //?.includes(empManagerPosition?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empManagerName === "None" || empManagerName === "") {
        return j;
      } else {
        return j?.manager_name
          ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
        //?.includes(empManagerName?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empjobtitle === "None" || empjobtitle === "") {
        return j;
      } else {
        return j?.job_title
          ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
        //?.includes(empjobtitle?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empJobcode === "None" || empJobcode === "") {
        return j;
      } else {
        return j?.job_code
          ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
        //?.includes(empJobcode?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empjoblevel === "None" || empjoblevel === "") {
        return j;
      } else {
        return j?.job_level
          ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
        //?.includes(empjoblevel?.toLocaleLowerCase());
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
        //?.includes(empWorkLocation?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empsections === "None" || empsections === "") {
        return j;
      } else {
        return j.section
          .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
        //.includes(empsections.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      console.log(sNS, "superv");
      if (sNS === "None" || sNS === "") {
        return j;
      }
      if (sNS === "SP") {
        return j?.isSupervisor === true;
      } else if (sNS === "N-SP") {
        return j?.isSupervisor != true;
      }
    })
    
     
      // else if (searchName == "N-SP") {
      //   return j?.isSupervisor != true;
      // } 
      //   if (searchName == "N-SP") {
      //   if(j?.isSupervisor == false){
      //     console.log("true")
      //     return j
      //   }else{
      //     console.log("false")
      //   }
      //   // return j?.isSupervisor == false;
      // }else if(searchName === "None" || searchName === "") {
      //   return j;
      // }
    ?.filter((j: any) => {
      if (searchName === "") {
        return j;
      }else if (
        (j?.employee_code !== undefined &&
          j?.employee_code
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.legal_full_name !== undefined &&
          j?.legal_full_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.section !== undefined &&
          j?.section
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.position_long_description !== undefined &&
          j?.position_long_description
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
        (j?.grade !== undefined &&
          j?.grade
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase()))
      )
       {
        return j;
      }
      else if(searchName !== ""){
        if (searchName == "N-SP") {
          return j?.isSupervisor != true;
        }
       else if (searchName == "SP") {
            return j?.isSupervisor === true;
          }
      }
    })
      ?.map((j: any) => {
        let inputDate = j?.service_reference_date
        const dateParts = inputDate.split("-");
        const year = dateParts[0];
        const month = new Date(inputDate).toLocaleString("default", { month: "short" });
        const day = dateParts[2]?.slice(0, 2)
        const formattedDate = `${day}-${month}-${year}`;

        console.log(j, "jjjj")
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = formattedDate
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
        if (columnHeaders["SupervisoryRolee"] == true) exportData["Supervisory Role"] = j?.isSupervisor != true ? "N-SP" : "SP"
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = j?.probation_status
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
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""
        if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
        if (columnHeaders["Function"] == true) exportData["Function"] = ""
        if (columnHeaders["SupervisoryRolee"] == true) exportData["Supervisory Role"] =""
        if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = ""
        if (columnHeaders["EmailId"] == true) exportData["Email Id"] = ""
        if (columnHeaders["division"] == true) exportData["Division"] = ""
        if (columnHeaders["Section"] == true) exportData["Section"] = ""  
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""   
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
        if (columnHeaders["AppraiserCode"] == true) exportData["Appraiser Code"] = ""
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
        if (columnHeaders["ReviewerCode"] == true) exportData["Reviewer Code"] = ""
        if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = ""
        if (columnHeaders["NormalizerCode"] == true) exportData["HR Normalizer Code"] = ""
        if (columnHeaders["Normalizername"] == true) exportData["HR Normalizer Name"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        return exportData
    });
    console.log(mapped, "mapped")
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped = "" ? Emptymapped : mapped);

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
    if (GradesFilter?.length == 0) {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [GradesFilter]);
   React.useEffect(() => {
    if (sectionsFilter?.length == 0) {
      setIcon17(false);
    } else {
      setIcon17(true);
    }
  }, [sectionsFilter]);
  // sectionsFilter
  React.useEffect(() => {
    if (empdivisions === "None" || empdivisions === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empdivisions]);
  React.useEffect(() => {
    if (AppName === "None" || AppName === "") {
      setIcon14(false);
    } else {
      setIcon14(true);
    }
    if (RevName === "None" || RevName === "") {
      setIcon15(false);
    } else {
      setIcon15(true);
    }
    if (norName === "None" || norName === "") {
      setIcon16(false);
    } else {
      setIcon16(true);
    }
  }, [AppName,RevName,norName]);
  // RevName
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
    if (sectionsFilter?.length == 0) {
      setIcon20(false);
    } else {
      setIcon20(true);
    }
  }, [sectionsFilter]);
  React.useEffect(() => {
    if (empSubSection === "None" || empSubSection === "") {
      setIcon10(false);
    } else {
      setIcon10(true);
    }
  }, [empSubSection]);
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
    if (ProbationStatus1 === "None" || ProbationStatus1 === "") {
      setIcon13(false);
    } else {
      setIcon13(true);
    }
  }, [ProbationStatus1]);
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
  const handleheadingSortAccept = () => {
    // setheadingSortAccept(true);
    // setheading1Dis(heading1)
    // let temp = {...columnHeaders}
    // setcolumnHeadersDisplay(temp);
    setisDrawerOpen(false);
    handleExport();
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
      Firstname:true,
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
      Potentiallevel: true,
      TalentCategory: true,
      OverAllRating: true,
      PreviousRating: true,
      AppraiserCode: true,
      ReviewerCode: true,
      NormalizerCode: true,
      ProbationStatus: true,
      EmailId: true,
      SelectAll: true,
    })
  };
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

  };
  React.useEffect(() => {
    const Normalizerdata = users
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
      // .filter((j: any) => {
      //   if (empFunction === "None" || empFunction === "") {
      //     return j;
      //   } else {
      //     return j.Function.toLocaleLowerCase().includes(
      //       empFunction.toLocaleLowerCase()
      //     );
      //   }
      // })
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
        if (sNS === "N-SP") {
          return j?.isSupervisor != true;
        } else if (sNS === "SP") {
          return j?.isSupervisor === true
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
        if (empManagerPosition === "None" || empManagerPosition === "") {
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
        if (empWorkLocation === "None" || empWorkLocation === "") {
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
      .map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")

        return {
          Ecode: j.employee_code,
          EmployeeName: j.legal_full_name,
          FirstName: j?.first_name,
          SupervisoryRole: j.isSupervisor != true ? "N-SP" : "SP",
          Function: j?.function,
          ServiceReferenceDate: j.service_reference_date,
          Grade: j.grade,
          Position: j.position_long_description,
          PositionCode: j?.position_code,
          Division: j.division,
          Section: j.section,
          SubSection: j["sub section"],
          ManagerCode: j?.manager_code,
          ManagerName: j?.manager_name,
          ManagerPosition: j?.manager_position,
          WorkLocation: j?.work_location,
          GradeSet: j?.grade_set,
          JobCode: j?.job_code,
          JobTitle: j?.job_title,
          JobLevel: j?.job_level,
          // RoleCategory : j?.feedback_questionnaire,

          // PendingAction : getPAStatus(j),
          //
        };
      });
    console.log(Normalizerdata, "Normalizerdata");
    if (Normalizerdata == null) {
      setExcel(users);
      // setPage1(users);
    } else {
      setExcel(Normalizerdata);
      // setPage1(Normalizerdata?.length);
    }
    console.log(Normalizerdata?.length, "ggggg");
  // setPage1(Normalizerdata?.length)
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
  ]);
  //  React.useEffect(()=>{
  //   if(Normalizerdata){
  //     setExcel(Normalizerdata)
  //   }else{
  //     setExcel(users)
  //   }
  //  })

  React.useEffect(() => {
    const f = users
    ?.filter((i: any) => i.employee_upload_flag)
    ?.filter((j: any, index: any) => {
      if (positions === "None" || positions === "") {
        return j;
      } else {
        return j?.position_long_description
          ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
        //.includes(positions.toLocaleLowerCase());
        // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
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
        return j?.employee_code?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();

        // .includes(empEmployeeCode?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empgrades === "None" || empgrades === "") {
        return j;
      } else {
        return j?.grade
          ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empdivisions === "None" || empdivisions === "") {
        return j;
      } else {
        return j?.division
          ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
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
          ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
        //?.includes(empFirstName?.toLocaleLowerCase());
      }
    })
    ?.filter((item1: any) => {
      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    // ?.filter((item1: any) => {
    //   if (rolesFilter.length === 0) {
    //     return item1;
    //   } else {
    //     return !!rolesFilter?.find((item2: any) => item1?.roles)
    //   }
    // })
    .filter((item1: any) => {
      const filteredRoles = item1?.roles;
      if (rolesFilter.length === 0) {
        return item1;
      } else {
        return (
          rolesFilter.every((item2: string) => filteredRoles?.[item2]) &&
          Object.keys(filteredRoles).some((key: string) => rolesFilter.includes(key))
        );
      }
    })
    ?.filter((item1: any) => {
      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((item1: any) => {
      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    .filter((j: any) => {
      if (AppName === "None" || AppName === "") {
        return j;
      } else {
        return j?.appraiser_name
          ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (RevName === "None" || RevName === "") {
        return j;
      } else {
        return j?.reviewer_name
          ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    .filter((j: any) => {
      if (norName === "None" || norName === "") {
        return j;
      } else {
        return j?.normalizer_name
          ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
        //.includes(empgrades.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empFunction === "None" || empFunction === "") {
        return j;
      } else {
        return j?.function
          ?.toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
        //?.includes(empFirstName?.toLocaleLowerCase());
      }
    })
    // empFunction
    // ?.filter((j: any) => {
    //   if (empFunction === "None" || empFunction === "") {
    //     return j;
    //   } else {
    //     return j?.function?.toLocaleLowerCase()?.includes(
    //       empFunction?.toLocaleLowerCase()
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
          ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
        //?.includes(empPositionCode?.toLocaleLowerCase());
      }
    })

    ?.filter((j: any) => {
      if (empService === "None" || empService === "") {
        return j;
      } else {
        return j?.service_reference_date
          ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
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
      console.log(sNS, "superv");
      if (sNS === "None" || sNS === "") {
        return j;
      }
      if (sNS === "SP") {
        return j?.isSupervisor === true;
      } else if (sNS === "N-SP") {
        return j?.isSupervisor != true;
      }
    })
    ?.filter((j: any) => {
      if (empSubSection === "None" || empSubSection === "") {
        return j;
      } else {
        return j["sub section"]
          ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
        //.includes(empSubSection.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empGradeset === "None" || empGradeset === "") {
        return j;
      } else {
        return j?.grade_set
          ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
        //?.includes(empGradeset?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empManagerCode === "None" || empManagerCode === "") {
        return j;
      } else {
        return j?.manager_code
          ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
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
          ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
        //?.includes(empManagerPosition?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empManagerName === "None" || empManagerName === "") {
        return j;
      } else {
        return j?.manager_name
          ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
        //?.includes(empManagerName?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empjobtitle === "None" || empjobtitle === "") {
        return j;
      } else {
        return j?.job_title
          ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
        //?.includes(empjobtitle?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empJobcode === "None" || empJobcode === "") {
        return j;
      } else {
        return j?.job_code
          ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
        //?.includes(empJobcode?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empjoblevel === "None" || empjoblevel === "") {
        return j;
      } else {
        return j?.job_level
          ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
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
          ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
        //?.includes(empWorkLocation?.toLocaleLowerCase());
      }
    })
    ?.filter((j: any) => {
      if (empsections === "None" || empsections === "") {
        return j;
      } else {
        return j.section
          .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
        //.includes(empsections.toLocaleLowerCase());
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
        //?.includes(empWorkLocation?.toLocaleLowerCase());
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
    // ?.filter((j: any) => {
    //   if (searchName === "None" || searchName === "") {
    //     return j;
    //   }
    //   else if(searchName !== ""){
    //     if (searchName == "SP") {
    //       return j?.isSupervisor == true;
    //     }
    //    else if (searchName == "N-SP") {
    //         return j?.isSupervisor == false;
    //       }
    //   }
    // })
    ?.filter((j: any) => {
      if (searchName === "") {
        return j;
      }
      // else if(searchName !== ""){
      //   if (searchName == "SP") {
      //     return j?.isSupervisor == true;
      //   }
      //  else if (searchName == "N-SP") {
      //       return j?.isSupervisor == false;
      //     }
      // } 
      else if (
        (j?.employee_code !== undefined &&
          j?.employee_code
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.legal_full_name !== undefined &&
          j?.legal_full_name
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.section !== undefined &&
          j?.section
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase())) ||
        (j?.position_long_description !== undefined &&
          j?.position_long_description
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
        (j?.grade !== undefined &&
          j?.grade
            .toLocaleLowerCase()
            .includes(searchName.toLocaleLowerCase()))
      )
       {
        return j;
      }
      else if(searchName !== ""){
        if (searchName == "N-SP") {
          return j?.isSupervisor != true;
        }
       else if (searchName == "SP") {
            return j?.isSupervisor === true;
          }
      }
    })

    console.log(f, "fffff");
    setPage1(f?.length)
    console.log(page1, "page1");
    // console.log(f,"excel")
    // setExcel(f)
    return f;
  }, [
    users,
    sectionsFilter,
    GradesFilter,
    positionsFilter,
    empEmployeeCode,
    empFirstName,
    empjoblevel,
    empJobcode,
    empjobtitle,
    empManagerName,
    empManagerPosition,
    empManagerCode,
    empGradeset,
    empSubSection,
    sNS,
    empdivisions,
    empFullName,
    empFunction,
    searchName,
    ProbationStatus1,
    AppName,
    RevName,
    norName
  ]);

  const handleNavigationForAddingEmployee = (name: any) => {
  if(!confVal?.data[0]?.confirmEmployeeMaster){
    navigate("/employeeupload", { state: { nav: "Employee " } })
   }else{
    setMessage("Unconfirm employee list to add new employees");
    setClearAlert(true);
  }
  }
  const handleNavigationForRolemaster = (name: any) => {
    navigate("/RolesUpdate")
  }
  console.log(users?.roles, "newwwrole")
  const getRoles1 = (emp: any) => {
    if (emp?.roles?.appraiser == true && emp?.roles?.employee == true && emp?.roles?.normalizer == true) {
      return "Appraiser,Normalizer,Employee"
    }
    else if (emp?.roles?.appraiser == true && emp?.roles?.reviewer == true && emp?.roles?.employee == true) {
      return "Appraiser,reviewer,employee"
    }
    else if (emp?.roles?.appraiser == true && emp?.roles?.reviewer == true) {
      return "Appraiser,reviewer"
    }

    else if (emp?.roles?.appraiser == true && emp?.roles?.employee == true) {
      return "Appraiser,Employee"
    } else if (emp?.roles?.appraiser == true) {
      return "Appraiser"
    } else if (emp?.roles?.employee == true) {
      return "Employee"
    }


  }
  const getRoles = (emp: any) => {
    console.log(emp,"roleNames")
    const { roles } = emp;
    if (roles) {
      const roleNames = [];
      if (roles.appraiser) roleNames.push('Appraiser');
      if (roles.normalizer) roleNames.push('HR Normalizer');
      if (roles.reviewer) roleNames.push('Reviewer');
      // if (roles.employee) roleNames.push('Employee');
      return roleNames.join(', ');
    }
    return '';
  };
  // const getRoles = (emp:any) => {
  //   console.log(emp,"roleNames")
  //   const { roles } = emp;
  //   if (roles) {
  //     const roleNames = [];
  //     if (rolesFilter.includes('Appraiser') && roles.appraiser) {
  //       roleNames.push('Appraiser');
  //     }
  //     if (rolesFilter.includes('Normalizer') && roles.normalizer) {
  //       roleNames.push('Normalizer');
  //     }
  //     if (rolesFilter.includes('Reviewer') && roles.reviewer) {
  //       roleNames.push('Reviewer');
  //     }
  //     if(rolesFilter.length === 0){
  //      if (roles.appraiser) roleNames.push('Appraiser');
  //     if (roles.normalizer) roleNames.push('Normalizer');
  //     if (roles.reviewer) roleNames.push('Reviewer');
  //     }
  //     return roleNames.join(', ');
  //   }
  //   return '';
  // };
 
  
  const handleSave = (id: any) => {
    updateEmployee({
      "roles": {
        appraiser: appriserrole,
        //  reviewer :reviewerrole,
        // normalizer :normalizerrole
      },
      id: id,

    })
    console.log(id, "jjjjjjjjj")
  }
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setSearchName(e.target.value);
    setPage(0);
  }
  console.log(searchName,"searchName")
  if (isLoading) {
    <p>Loading...</p>
  }

  const editingPage = (e: any) => {
    console.log(e, "EditEmployeeDetails")
    //navigates with all the data required for the edit employee page
    navigate("/EditEmployeeDetails", {
      state: {
        selectCode: e,
        subSectionArray: subSectionArray,
        sectionArray: sectionArray,
        divisionArray: divisionArray
      }
    })
  }

  /* To check if there is any calendar with status "Live" */
  const activeCalendar = activeCalendarData?.data?.filter((i: any) => {
    return i?.isActive === true
  })

  const handleClearAlert = () => {
    setClearAlert(false);
    setMessage("");
  }
   //for showing no data available
  const tableDataLength = users?.filter((j: any) => {
    return j?.employee_upload_flag
  })
const tableDataFilterdLength =   users
?.filter((i: any) => i.employee_upload_flag)
?.filter((j: any, index: any) => {
  if (positions === "None" || positions === "") {
    return j;
  } else {
    return j?.position_long_description
      ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
    //.includes(positions.toLocaleLowerCase());
    // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
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
    return j?.employee_code?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();

    // .includes(empEmployeeCode?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empgrades === "None" || empgrades === "") {
    return j;
  } else {
    return j?.grade
      ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
    //.includes(empgrades.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empdivisions === "None" || empdivisions === "") {
    return j;
  } else {
    return j?.division
      ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
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
      ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
    //?.includes(empFirstName?.toLocaleLowerCase());
  }
})
?.filter((item1: any) => {
  if (positionsFilter.includes("None") || positionsFilter.length === 0) {
    return item1;
  } else {
    return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
  }
})
// ?.filter((item1: any) => {
//   if (rolesFilter.length === 0) {
//     return item1;
//   } else {
//     return !!rolesFilter?.find((item2: any) => item1?.roles)
//   }
// })
.filter((item1: any) => {
  const filteredRoles = item1?.roles;
  if (rolesFilter.length === 0) {
    return item1;
  } else {
    return (
      rolesFilter.every((item2: string) => filteredRoles?.[item2]) &&
      Object.keys(filteredRoles).some((key: string) => rolesFilter.includes(key))
    );
  }
})
?.filter((item1: any) => {
  if (GradesFilter.includes("None") || GradesFilter.length === 0) {
    return item1;
  } else {
    return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
  }
})
?.filter((item1: any) => {
  if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
    return item1;
  } else {
    return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
  }
})
.filter((j: any) => {
  if (AppName === "None" || AppName === "") {
    return j;
  } else {
    return j?.appraiser_name
      ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
    //.includes(empgrades.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (RevName === "None" || RevName === "") {
    return j;
  } else {
    return j?.reviewer_name
      ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
    //.includes(empgrades.toLocaleLowerCase());
  }
})
.filter((j: any) => {
  if (norName === "None" || norName === "") {
    return j;
  } else {
    return j?.normalizer_name
      ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
    //.includes(empgrades.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empFunction === "None" || empFunction === "") {
    return j;
  } else {
    return j?.function
      ?.toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
    //?.includes(empFirstName?.toLocaleLowerCase());
  }
})
// empFunction
// ?.filter((j: any) => {
//   if (empFunction === "None" || empFunction === "") {
//     return j;
//   } else {
//     return j?.function?.toLocaleLowerCase()?.includes(
//       empFunction?.toLocaleLowerCase()
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
      ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
    //?.includes(empPositionCode?.toLocaleLowerCase());
  }
})

?.filter((j: any) => {
  if (empService === "None" || empService === "") {
    return j;
  } else {
    return j?.service_reference_date
      ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
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
  console.log(sNS, "superv");
  if (sNS === "None" || sNS === "") {
    return j;
  }
  if (sNS === "SP") {
    return j?.isSupervisor === true;
  } else if (sNS === "N-SP") {
    return j?.isSupervisor != true;
  }
})
?.filter((j: any) => {
  if (empSubSection === "None" || empSubSection === "") {
    return j;
  } else {
    return j["sub section"]
      ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
    //.includes(empSubSection.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empGradeset === "None" || empGradeset === "") {
    return j;
  } else {
    return j?.grade_set
      ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
    //?.includes(empGradeset?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empManagerCode === "None" || empManagerCode === "") {
    return j;
  } else {
    return j?.manager_code
      ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
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
      ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
    //?.includes(empManagerPosition?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empManagerName === "None" || empManagerName === "") {
    return j;
  } else {
    return j?.manager_name
      ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
    //?.includes(empManagerName?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empjobtitle === "None" || empjobtitle === "") {
    return j;
  } else {
    return j?.job_title
      ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
    //?.includes(empjobtitle?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empJobcode === "None" || empJobcode === "") {
    return j;
  } else {
    return j?.job_code
      ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
    //?.includes(empJobcode?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empjoblevel === "None" || empjoblevel === "") {
    return j;
  } else {
    return j?.job_level
      ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
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
      ?.toLocaleLowerCase() === empWorkLocation?.toLocaleLowerCase();
    //?.includes(empWorkLocation?.toLocaleLowerCase());
  }
})
?.filter((j: any) => {
  if (empsections === "None" || empsections === "") {
    return j;
  } else {
    return j.section
      .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
    //.includes(empsections.toLocaleLowerCase());
  }
})
// ?.filter((j: any) => {
//   console.log(sNS, "superv");
//   if (sNS === "None" || sNS === "") {
//     return j;
//   }
//   if (sNS === "SP") {
//     return j?.isSupervisor === true;
//   } else if (sNS === "N-SP") {
//     return j?.isSupervisor != true;
//   }
// })
?.filter((j: any) => {
  if (searchName === "") {
    return j;
  } else if (
    (j?.employee_code !== undefined &&
      j?.employee_code
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.legal_full_name !== undefined &&
      j?.legal_full_name
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.section !== undefined &&
      j?.section
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())) ||
    (j?.position_long_description !== undefined &&
      j?.position_long_description
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
    (j?.grade !== undefined &&
      j?.grade
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase()))
  ) {
    return j;
  }
  else if(searchName !== ""){
    if (searchName == "SP") {
      return j?.isSupervisor == true;
    }
   else if (searchName == "N-SP") {
        return j?.isSupervisor == false;
      }
  }
})
console.log(tableDataFilterdLength,"tableDataFilterdLength")
  return (
    <>
      <Box style={{ paddingBottom: "20px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span
            style={{
              color: "#3e8cb5",
              fontSize: "18px",
              fontFamily: "Arial",
            }}
          >
            {/* Employee List */}
            <div>
              <Stack direction="row"
                spacing={2}>

                {/* <FormControl size="small" sx={{ minWidth: 140 }}>
                  <InputLabel
                    sx={{
                      "& .MuiInputLabel-root": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                    id="demo-simple-select-label"
                  >
                    Select Roles
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-select-small"
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="Calendar" />}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                  >
                    <MenuItem 
                     >
                       <input
                                  name={rolechecked?._id}
                                  checked={rolechecked?.appraiserIsChecked}
                                  // onChange={handleOnCheck12}
                                  type="checkbox"
                                  style={{
                                    // height: "18px",
                                    // width: "18px",
                                     fontSize: "15px",
                                    fontFamily: "Arial",
                                    borderColor: "#D5D5D5",
                                    cursor: "pointer",
                                  }}
                                />
                     Appraiser
                    </MenuItem>
                    <MenuItem 
                  //   sx={{display : "none",
                  // }}
                     >
                       <input
                                  // name={rolechecked?._id}
                                  // checked={rolechecked?.reviewerIsChecked}
                                  // onChange={handleOnCheck13}
                                  type="checkbox"
                                  style={{
                                    // height: "18px",
                                    // width: "18px",
                                    fontSize: "15px",
                                    fontFamily: "Arial",
                                    borderColor: "#D5D5D5",
                                    cursor: "pointer",
                                  }}
                                />
                     Reviewer
                    </MenuItem>
                    <MenuItem 
                  //   sx={{display : "none",
                  // }}
                     >
                       <input
                                  // name={rolechecked?._id}
                                  // checked={rolechecked?.normalizerIsChecked}
                                  // onChange={handleOnCheck14}
                                  type="checkbox"
                                  style={{
                                    // height: "18px",
                                    // width: "18px",
                                    fontSize: "15px",
                                    fontFamily: "Arial",
                                    borderColor: "#D5D5D5",
                                    cursor: "pointer",
                                  }}
                                />
                     Normalizer
                    </MenuItem>
                 
                  </Select>
                
                 
                </FormControl> */}

                {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height:"39px",
                  width:"70px"
                }}
                variant="outlined"
                // onClick={handleSave}
                onClick={(e) => {handleSave(roleid)}}
              >
                Save
              </Button> */}
              </Stack>
            </div>
          </span>
          <div style={{ paddingLeft: "10px", paddingRight: "15px" }}>
            <Stack direction="row"
              justifyContent="space-between"
              alignItems="center" spacing={3}>

              <Searchfeild1>
                <TextField
                  autoComplete="off"
                  id="outlined-basic"
                  placeholder="Search Here..."
                  // onChange={(e) => setSearchName(e.target.value)}
                  onChange={handleSearchBar}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Searchicon} alt="icon" />
                      </InputAdornment>
                    ),
                   // inputProps:  {maxLengthForSearch}
                  }}
                />
              </Searchfeild1>

              {activeCalendar?.length == 0 && (
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

                  onClick={handleNavigationForAddingEmployee}
                >
                  Add
                </Button>
              )}

              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "130px"
                }}
                variant="outlined"
                onClick={handleNavigationForRolemaster}
              >
                Roles Master
              </Button>
              <img
                src={Newexcel}
                alt="icon"
                // style={{ marginLeft: "15px", marginTop: "5px" }}
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
                      checked={columnHeaders.SelectAll}
                        onChange={(event) => handleSelectAll(event.target.checked)}
                      />
                    }
                    label="Select All"
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
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                    control={
                      <Checkbox checked={columnHeaders.ProbationStatus}
                        name="ProbationStatus"
                        onChange={handleProbationStatus} />
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
                        checked={columnHeaders.Normalizername}
                        name="Normalizername"
                        onChange={handleheadingNormalizer}
                      />
                    }
                    label="HR Normalizer Name"
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
                  /> */}
                 
                 
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
                        checked={overall}
                        name="OverAllRating"
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
                        checked={talentcategory}
                        name="TalentCategory"
                        onChange={handletalentcategory}
                      />
                    }
                    label=" Talent Category"
                  /> */}
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
                        checked={heading15}
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
                        onChange={handleheading18}
                      />
                    }
                    label="Job Level"
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
                    Cancel
                  </Button>
                </Stack>
              </Box>
            </Drawer>
          </div>
        </Stack>
      </Box>

     {/* <TableContainer component={Paper} sx={{ marginTop: 0 }}>  */}
        <Scroll>
          <CustomScrollbar style={{ height: "calc(100vh - 270px)" }}>
            <Table size="small" aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow
                  sx={{
                    "& td, & th": {
                      // whiteSpace: "nowrap",
                      bgcolor: "#eaeced",
                      // border: 1,
                      // borderColor: "#e0e0e0",
                    },
                  }}
                >
                  <TableCell
                    align="left"
                    style={{ color: "#368DC5", }}
                    padding="checkbox"
                  ></TableCell>

                  {columnHeadersDisplay?.Ecode && (
                    <TableCell
                      align="center"
                      width="10px"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        // bgcolor: "#ebf2f4",
                      }}
                    >Ecode
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
                            // width: "90px"
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
                              justifyContent: "left"
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
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor: empEmployeeCode === name.employee_code ? "#EAECED" : "",
                                  // paddingLeft: "15px",
                                  // justifyContent: "center"
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
                  )}
                  {columnHeadersDisplay?.Ename && (
                    <TableCell
                      align="center"
                      // width="500px"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      style={{ minWidth: 290 }}
                    >Employee Name
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
                            // width: "260px"
                          }}
                          anchorEl={anchorElnewFullName}
                          open={openFullName}
                          onClose={handleCloseFullName}

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
                            // style={selectedOption === "None" ? { backgroundColor: '' } : {}}
                            onClick={handleTargetFullName}
                          >Clear Filter
                          </MenuItem>

                          {users
                            .slice()
                            .sort(function (a: any, b: any) {
                              return a.legal_full_name - b.legal_full_name;
                            })
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor: empFullName === name.legal_full_name ? "#EAECED" : "",

                                  //height:"200px"
                                }}
                                key={name.legal_full_name}
                                value={name.legal_full_name}
                                // style={selectedOption === name?.legal_full_name ? { backgroundColor: 'yellow' } : {}}
                                //name={name.legal_full_name}
                                onClick={handleTargetFullName}
                              >
                                {name.legal_full_name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon4 && <FilterAltTwoToneIcon />}
                      </Stack> */}
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
                  )}
                  {/* {columnHeadersDisplay?.FirstName && (
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
                            //paddingLeft: "15px",
                            //height:"200px"
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
                                    //height:"200px"
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
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>First Name </span>
                        
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
                           
                            {users
                              .slice()
                              ?.sort(function (a: any, b: any) {
                                return a?.first_name?.localeCompare(
                                  b?.first_name
                                );
                              })
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
                          {icon5 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}

                  {/* {columnHeadersDisplay?.Function && (
                    <TableCell
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
                            width:"110px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetFunction}
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
                                justifyContent:"left",
                                width:"100px"
                                //height:"200px"
                              }}
                              key="Non-Sales"
                              value="Non-Sales"
                              onClick={handleTargetFunction}
                            >
                              Non-Sales
                            </MenuItem>
                       
                           
                             
                        </Menu>
                        {icon6 && <FilterAltTwoToneIcon />}
                        </Stack> */}

                  {/* {columnHeadersDisplay?.ServiceReferenceDate &&  (
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
                        </Stack> */}
                  {/* <FormControl sx={{ width: 160, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                            }}
                          >
                            Service Reference Date
                          </span>
                         
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
                            {serviceRef.map((name: any) => (
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
                          {icon8 && <FilterAltTwoToneIcon />}
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
                      style={{ minWidth: 150 }}
                    >Known As </TableCell>
                  {columnHeadersDisplay?.Eposition && (
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
                        <Stack direction="row" alignItems="center" justifyContent="center">
                          {/* <div
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
                         */}
                          {/* {icon1 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                          <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row">
                              <span> Position</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color:"#3e8cb5 !important"
                                  }, }}
                                disableUnderline
                                // value={positions}
                                // onChange={handleChangeposition}
                                // input={<OutlinedInput label="Name" />}
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

                                {positionArray
                                  // ?.slice()
                                  // ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })
                                  // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
                                  ?.map((name: any, index: any) => (
                                    <MenuItem
                                      sx={{
                                        padding: "0px",
                                        fontSize: "14px"
                                      }}
                                      // style={{ fontSize: "12px" }}
                                      key={name}
                                      value={name}
                                    >
                                      <ListItemIcon>
                                        <Checkbox
                                          // style={{ padding: "3px", paddingLeft: "14px" }}
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: "14px !important",
                                            },
                                          }}

                                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                          size="small"
                                          checked={positionsFilter.indexOf(name) > -1} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333", paddingRight: "10px" }}
                                        primary={name} />
                                    </MenuItem>
                                  )
                                  )}
                              </Select>
                              {icon1 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </Stack>
                      </div>
                    </TableCell>
                  )}
                  {columnHeadersDisplay?.EGrade && (
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
                            // value={positions}
                            // onChange={handleChangeposition}
                            // input={<OutlinedInput label="Name" />}
                            variant="standard"
                            MenuProps={MenuProps}
                            multiple
                            value={GradesFilter}
                            onChange={handleChangeSelectGrades}
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

                            {gradesArray
                              // ?.slice()
                              // ?.sort(function (a: any, b: any) { return a.grade.localeCompare(b.grade); })
                              // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.grade }).indexOf(item.grade) === index)
                              ?.map((name: any, index: any) => (
                                <MenuItem
                                  sx={{
                                    padding: "0px",
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333"
                                  }}
                                  // style={{ fontSize: "12px" }}
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

                                      style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}

                                      size="small"
                                      checked={GradesFilter.indexOf(name) > -1} />
                                  </ListItemIcon>
                                  <ListItemText
                                    primaryTypographyProps={{ fontSize: "13px", fontFamily: "Arial", color: "#333333", paddingRight: "10px" }}
                                    primary={name} />
                                </MenuItem>
                              )
                              )}
                          </Select>
                          {icon2 && (
                            <FilterAltTwoToneIcon />)}
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    padding="checkbox"
                  >
                     Roles 
                    {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                              <span> Roles</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem",
                                "& .MuiSvgIcon-root": {
                                  color:"#3e8cb5 !important"
                                  }, }}
                                disableUnderline
                                // value={positions}
                                // onChange={handleChangeposition}
                                // input={<OutlinedInput label="Name" />}
                                variant="standard"
                                MenuProps={MenuProps}
                                multiple
                                value={rolesFilter}
                                onChange={handleChangeroles}
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
                                    root: isAllroles ? classes.selectedAll : "",
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
                                      checked={isAllroles}
                                      indeterminate={
                                        rolesFilter?.length > 0 &&
                                        rolesFilter?.length < rolesArray?.length
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

                                {rolesArray
                                  // ?.slice()
                                  // ?.sort(function (a: any, b: any) { return a.position_long_description.localeCompare(b.position_long_description); })
                                  // ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.position_long_description }).indexOf(item.position_long_description) === index)
                                  ?.map((name: any, index: any) => (
                                    <MenuItem
                                      sx={{
                                        padding: "0px",
                                        fontSize: "14px"
                                      }}
                                      // style={{ fontSize: "12px" }}
                                      key={name}
                                      value={name}
                                    >
                                      <ListItemIcon>
                                        <Checkbox
                                          // style={{ padding: "3px", paddingLeft: "14px" }}
                                          sx={{
                                            "& .MuiSvgIcon-root": {
                                              fontSize: "14px !important",
                                            },
                                          }}

                                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                          size="small"
                                          checked={rolesFilter.indexOf(name) > -1} />
                                      </ListItemIcon>
                                      <ListItemText
                                        primaryTypographyProps={{ fontSize: "13px", fontFamily: "arial", color: "#333333", paddingRight: "10px" }}
                                        primary={name} />
                                    </MenuItem>
                                  )
                                  )}
                              </Select>
                              {/* {icon1 && (
                                <FilterAltTwoToneIcon />)} */}
                            {/*</Stack>
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
                    {/* Probation<br></br> Status */}
                    <Stack direction="row" alignItems="center" justifyContent="center" >
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
                            //padding: "0px",
                            padding: "5px 15px 0px 15px",
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                          onClick={handleTargetProbationStatus}
                        >Clear Filter
                        </MenuItem>
                        {users
                          .slice()
                          .sort(function (a: any, b: any) {
                            return a.probation_status - b.probation_status;
                          })
                          ?.filter((i: any) => i?.employee_upload_flag)
                          ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.probation_status }).indexOf(item?.probation_status) === index)
                          ?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "5px 15px 0px 15px",
                                // padding: "0px",
                                // paddingLeft: "15px",
                                justifyContent: "left",
                                backgroundColor: ProbationStatus1 === name?.probation_status ? "#EAECED" : "",
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
                            key="probation"
                            value="probation"
                            onClick={handleTargetProbationStatus}
                          >In probation
                          </MenuItem> */}

                      </Menu>
                       {icon13 && <FilterAltTwoToneIcon />} 
                    </Stack>
                  </TableCell>
                  {columnHeadersDisplay?.SupervisoryRolee && (
                    <TableCell
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
                              // backgroundColor: sNS !="None"  ? "#EAECED" : "",
                              // width: "100px"
                              //paddingLeft: "15px",
                              //height:"200px"
                            }}
                            key="None"
                            value="None"
                            onClick={handleTargetSupervisoryRole}
                          >Clear Filter
                          </MenuItem>

                          {sNSvaluess
                            // .slice()
                            // ?.sort(function (a: any, b: any) {
                            //   return a?.isSupervisor?.localeCompare(
                            //     b?.isSupervisor
                            //   );
                            // })
                            .map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  // justifyContent: "left",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor: sNS === name?.name ? "#EAECED" : "",
                                  // width: "100px"
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
                        {icon9 && <FilterAltTwoToneIcon />}
                      </Stack>
                      {/* <FormControl sx={{ height: "0" }}>
                        <Stack direction="row" alignItems="center" position="relative" >
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              position:"absolute"
                            }}
                          >
                           
                            Supervisory Role
                          </span>
                        
                          <Select
                            size="small"
                            sx={{  width: "100px", fontSize: "0rem",paddingTop:"14px" }}
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
                              .slice()
                              ?.sort(function (a: any, b: any) {
                                return a?.isSupervisor?.localeCompare(
                                  b?.isSupervisor
                                );
                              })
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
                          {icon9 && <FilterAltTwoToneIcon />}
                        
                        </Stack>
                      </FormControl> */}
                    </TableCell>
                  )}
                  {columnHeadersDisplay?.Function && (
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
                          aria-controls={openFunction ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openFunction ? "true" : undefined}
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
                            // width: "260px"
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
                              justifyContent: "left",
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
                            ?.filter((i: any) => i?.employee_upload_flag)
                            ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.function }).indexOf(item?.function) === index)

                            ?.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "13px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  padding: "0px 10px 2px 17px",
                                  backgroundColor: empFunction === name?.function ? "#EAECED" : "",
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
                          {/* </Menu> */}

                        </Menu>
                        {icon6 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {/* Appraiser<br></br> Name */}
                    <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceAppName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceAppName ? "true" : undefined}
                          onClick={handleClickserviceAppName}
                          style={{ whiteSpace: "nowrap" }}
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

                          {appraiserNames?.map((name: any) => (
                            <MenuItem
                              style={{
                                fontSize: "13px",
                                fontFamily: "Arial",
                                color: "#333333",
                                padding: "0px 10px 2px 17px", 
                                backgroundColor: AppName === name ? "#EAECED" : "",

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
                        {icon14 && <FilterAltTwoToneIcon />}
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
                    {/* Reviewer<br></br> Name */}
                    <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceRevName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceRevName ? "true" : undefined}
                          onClick={handleClickserviceRevName}
                          style={{ whiteSpace: "nowrap" }}
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

                          {ReviewerNames?.map((name: any) => (
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
                        {icon15 && <FilterAltTwoToneIcon />}
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
                   {/* HR Normalizer<br></br> Name */}
                   <div>
                      <Stack direction="row" alignItems="center" justifyContent="center">
                        <div
                          aria-controls={openserviceNorName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openserviceNorName ? "true" : undefined}
                          onClick={handleClickserviceNorName}
                          style={{ whiteSpace: "nowrap" }}
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

                          {NormalizerNames?.map((name: any) => (
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
                        {icon16 && <FilterAltTwoToneIcon />}
                      </Stack>

                    </div>
                  </TableCell>

                  {/* {columnHeadersDisplay?.PositionCode &&(
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
                        </Stack> */}
                  {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
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

                            {positioncodeArray.map((name: any) => (
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
                          {icon7 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.division &&  (
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
                        </Stack> */}
                  {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
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
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon3 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {columnHeadersDisplay?.Section && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
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
                      <FormControl sx={{ m: 0, width: 80, height: "0" }}>
                        <Stack direction="row">
                          <span>Section</span>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem",
                            "& .MuiSvgIcon-root": {
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
                                fontSize: "13px",
                                color: "#333333",
                                fontFamily: "Arial",
                                padding: "0px",                                   //paddingLeft: "37px",
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
                                  style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                  classes={{
                                    indeterminate: classes.indeterminateColor,
                                  }}
                                  checked={isAllsectionFilter}
                                  indeterminate={
                                    sectionsFilter?.length > 0 &&
                                    sectionsFilter?.length < sectionArray?.length
                                  }
                                  sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
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
                                    style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                    checked={sectionsFilter.indexOf(option) > -1}
                                    sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
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
                          {icon17 && (
                            <FilterAltTwoToneIcon />)}
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  {/* {columnHeadersDisplay?.SubSection && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Sub Section </span>
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
                      </FormControl>
                    </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.ManagerCode && (
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
                          aria-controls={openSubManagerCode ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerCode ? "true" : undefined}
                          onClick={handleClickManagerCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Code
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
                          anchorEl={anchorElnewManagerCode}
                          open={openSubManagerCode}
                          onClose={handleClosManagerCode}
                          
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
                           onClick={handleTargetManagerCode}
                           >None
                           </MenuItem>
                         
                           {managerCodeArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
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
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Manager Code </span>
                         
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
                            {managerCodeArray.map((name: any) => (
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
                          {icon12 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?. ManagerName && (
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
                          aria-controls={openSubManagerName ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerName ? "true" : undefined}
                          onClick={handleClickManagerName}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Name
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"290px"
                          }}
                          anchorEl={anchorElnewManagerName}
                          open={openSubManagerName}
                          onClose={handleClosManagerName}
                          
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
                           onClick={handleTargetManagerName}
                           >None
                           </MenuItem>
                         
                           {managerNameArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
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
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Manager Name </span>
                          
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
                            {managerNameArray.map((name: any) => (
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
                          {icon13 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.ManagerPosition &&  (
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
                          aria-controls={openSubManagerPosition ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubManagerPosition ? "true" : undefined}
                          onClick={handleClickManagerPosition}
                        >
                          <Stack direction="row" alignItems="center">
                          Manager Position
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
                          anchorEl={anchorElnewManagerPosition}
                          open={openSubManagerPosition}
                          onClose={handleClosManagerPosition}
                          
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
                           onClick={handleTargetManagerPosition}
                           >None
                           </MenuItem>
                         
                           {managerPositionArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
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
                        </Stack> */}
                  {/* <FormControl sx={{ width: 120, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Manager Position </span>
                         
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
                            {managerPositionArray.map((name: any) => (
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
                          {icon18 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.WorkLocation &&  (
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
                          aria-controls={openSubWorkLocation ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubWorkLocation ? "true" : undefined}
                          onClick={handleClickWorkLocation}
                        >
                          <Stack direction="row" alignItems="center">
                          Work Location
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
                          anchorEl={anchorElnewWorkLocation}
                          open={openSubWorkLocation}
                          onClose={handleClosWorkLocation}
                          
                        >
                           <MenuItem 
                          style={{
                            fontSize: "14px",
                            fontFamily: "Arial",
                            color: "#333333",
                            justifyContent:"left",
                            width:"105px"
                            //paddingLeft: "15px",
                            //height:"200px"
                          }}
                          key="None"
                          value="None"
                           onClick={handleTargetWorkLocation}
                           >None
                           </MenuItem>
                         
                           {workLocationArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetWorkLocation}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon17 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Work Location </span>
                         
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
                            {workLocationArray.map((name: any) => (
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
                          {icon17 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.GradeSet &&  (
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
                          aria-controls={openSubGradeSet ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubGradeSet ? "true" : undefined}
                          onClick={handleClickGradeSet}
                        >
                          <Stack direction="row" alignItems="center">
                          Grade Set
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
                          anchorEl={anchorElnewGradeSet}
                          open={openSubGradeSet}
                          onClose={handleClosGradeSet}
                          
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
                           onClick={handleTargetGradeSet}
                           >None
                           </MenuItem>
                         
                           {gradeSetArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetGradeSet}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon11 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Grade set </span>
                         
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
                            {gradeSetArray.map((name: any) => (
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
                          {icon11 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.JobCode &&  (
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
                          aria-controls={openSubJobCode ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobCode ? "true" : undefined}
                          onClick={handleClickJobCode}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Code
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
                          anchorEl={anchorElnewJobCode}
                          open={openSubJobCode}
                          onClose={handleClosJobCode}
                          
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
                           onClick={handleTargetJobCode}
                           >None
                           </MenuItem>
                         
                           {jobCodeArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetJobCode}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon15 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Code </span>
                         
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
                            {jobCodeArray.map((name: any) => (
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
                          {icon15 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.JobTitle && (
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
                          aria-controls={openSubJobTitle ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobTitle ? "true" : undefined}
                          onClick={handleClickJobTitle}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Title
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
                          anchorEl={anchorElnewJobTitle}
                          open={openSubJobTitle}
                          onClose={handleClosJobTitle}
                          
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
                           onClick={handleTargetJobTitle}
                           >None
                           </MenuItem>
                         
                           {jobTitleArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetJobTitle}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon14 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Title </span>
                        
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
                            {jobTitleArray.map((name: any) => (
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
                          {icon14 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                  {/* {columnHeadersDisplay?.JobLevel && (
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
                          aria-controls={openSubJobLevel ? "fade-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openSubJobLevel ? "true" : undefined}
                          onClick={handleClickJobLevel}
                        >
                          <Stack direction="row" alignItems="center">
                          Job Level
                            <ArrowDropDownOutlinedIcon style={{cursor: "pointer"}}/>
                          </Stack>
                        </div>
                        <Menu
                          MenuListProps={{
                            "aria-labelledby": "fade-button",

                          }}
                          sx={{
                            height:"200px",
                            width:"155px"
                          }}
                          anchorEl={anchorElnewJobLevel}
                          open={openSubJobLevel}
                          onClose={handleClosJobLevel}
                          
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
                           onClick={handleTargetJobLevel}
                           >None
                           </MenuItem>
                         
                           {jobLevelArray.map((name: any) => (
                              <MenuItem
                                style={{
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  color: "#333333",
                                  paddingLeft: "15px",
                                }}
                                key={name}
                                value={name}
                                onClick={handleTargetJobLevel}
                              >
                                {name}
                              </MenuItem>
                            ))}
                        </Menu>
                        {icon16 && <FilterAltTwoToneIcon />}
                        </Stack> */}
                  {/* <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Level </span>
                       
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
                            {jobLevelArray.map((name: any) => (
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
                          {icon16 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl> */}
                  {/* </TableCell>
                  )} */}
                </TableRow>
              </TableHead>
              {tableDataFilterdLength?.length > 0 && 
              <TableBody>
                {data != undefined &&
                  // (rowsPerPage > 0
                  //   ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  //   : data.data
                  // )
                  users
                    ?.filter((i: any) => i.employee_upload_flag)
                    ?.filter((j: any, index: any) => {
                      if (positions === "None" || positions === "") {
                        return j;
                      } else {
                        return j?.position_long_description
                          ?.toLocaleLowerCase() === positions?.toLocaleLowerCase();
                        //.includes(positions.toLocaleLowerCase());
                        // return positions.toLocaleLowerCase().include(j.position_long_description.toLocaleLowerCase())
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
                        return j?.employee_code?.toLocaleLowerCase() === empEmployeeCode?.toLocaleLowerCase();

                        // .includes(empEmployeeCode?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empgrades === "None" || empgrades === "") {
                        return j;
                      } else {
                        return j?.grade
                          ?.toLocaleLowerCase() === empgrades?.toLocaleLowerCase();
                        //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empdivisions === "None" || empdivisions === "") {
                        return j;
                      } else {
                        return j?.division
                          ?.toLocaleLowerCase() === empdivisions?.toLocaleLowerCase();
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
                          ?.toLocaleLowerCase() === empFirstName?.toLocaleLowerCase();
                        //?.includes(empFirstName?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((item1: any) => {
                      if (positionsFilter.includes("None") || positionsFilter.length === 0) {
                        return item1;
                      } else {
                        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                      }
                    })
                    // ?.filter((item1: any) => {
                    //   if (rolesFilter.length === 0) {
                    //     return item1;
                    //   } else {
                    //     return !!rolesFilter?.find((item2: any) => item1?.roles)
                    //   }
                    // })
                    .filter((item1: any) => {
                      const filteredRoles = item1?.roles;
                      if (rolesFilter.length === 0) {
                        return item1;
                      } else {
                        return (
                          rolesFilter.every((item2: string) => filteredRoles?.[item2]) &&
                          Object.keys(filteredRoles).some((key: string) => rolesFilter.includes(key))
                        );
                      }
                    })
                    ?.filter((item1: any) => {
                      if (GradesFilter.includes("None") || GradesFilter.length === 0) {
                        return item1;
                      } else {
                        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
                      }
                    })
                    ?.filter((item1: any) => {
                      if (sectionsFilter.includes("None") || sectionsFilter.length === 0) {
                        return item1;
                      } else {
                        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
                      }
                    })
                    ?.filter((j: any) => {
                      if (empFunction === "None" || empFunction === "") {
                        return j;
                      } else {
                        return j?.function
                          ?.toLocaleLowerCase() === empFunction?.toLocaleLowerCase();
                        //?.includes(empFirstName?.toLocaleLowerCase());
                      }
                    })
                    .filter((j: any) => {
                      if (AppName === "None" || AppName === "") {
                        return j;
                      } else {
                        return j?.appraiser_name
                          ?.toLocaleLowerCase() === AppName?.toLocaleLowerCase();
                        //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    .filter((j: any) => {
                      if (RevName === "None" || RevName === "") {
                        return j;
                      } else {
                        return j?.reviewer_name
                          ?.toLocaleLowerCase() === RevName?.toLocaleLowerCase();
                        //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    .filter((j: any) => {
                      if (norName === "None" || norName === "") {
                        return j;
                      } else {
                        return j?.normalizer_name
                          ?.toLocaleLowerCase() === norName?.toLocaleLowerCase();
                        //.includes(empgrades.toLocaleLowerCase());
                      }
                    })
                    // empFunction
                    // ?.filter((j: any) => {
                    //   if (empFunction === "None" || empFunction === "") {
                    //     return j;
                    //   } else {
                    //     return j?.function?.toLocaleLowerCase()?.includes(
                    //       empFunction?.toLocaleLowerCase()
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
                          ?.toLocaleLowerCase() === empPositionCode?.toLocaleLowerCase();
                        //?.includes(empPositionCode?.toLocaleLowerCase());
                      }
                    })

                    ?.filter((j: any) => {
                      if (empService === "None" || empService === "") {
                        return j;
                      } else {
                        return j?.service_reference_date
                          ?.toLocaleLowerCase() === empService?.toLocaleLowerCase();
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
                      if (empSubSection === "None" || empSubSection === "") {
                        return j;
                      } else {
                        return j["sub section"]
                          ?.toLocaleLowerCase() === empSubSection?.toLocaleLowerCase();
                        //.includes(empSubSection.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empGradeset === "None" || empGradeset === "") {
                        return j;
                      } else {
                        return j?.grade_set
                          ?.toLocaleLowerCase() === empGradeset?.toLocaleLowerCase();
                        //?.includes(empGradeset?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empManagerCode === "None" || empManagerCode === "") {
                        return j;
                      } else {
                        return j?.manager_code
                          ?.toLocaleLowerCase() === empManagerCode?.toLocaleLowerCase();
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
                          ?.toLocaleLowerCase() === empManagerPosition?.toLocaleLowerCase();
                        //?.includes(empManagerPosition?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empManagerName === "None" || empManagerName === "") {
                        return j;
                      } else {
                        return j?.manager_name
                          ?.toLocaleLowerCase() === empManagerName?.toLocaleLowerCase();
                        //?.includes(empManagerName?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empjobtitle === "None" || empjobtitle === "") {
                        return j;
                      } else {
                        return j?.job_title
                          ?.toLocaleLowerCase() === empjobtitle?.toLocaleLowerCase();
                        //?.includes(empjobtitle?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empJobcode === "None" || empJobcode === "") {
                        return j;
                      } else {
                        return j?.job_code
                          ?.toLocaleLowerCase() === empJobcode?.toLocaleLowerCase();
                        //?.includes(empJobcode?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empjoblevel === "None" || empjoblevel === "") {
                        return j;
                      } else {
                        return j?.job_level
                          ?.toLocaleLowerCase() === empjoblevel?.toLocaleLowerCase();
                        //?.includes(empjoblevel?.toLocaleLowerCase());
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
                        //?.includes(empWorkLocation?.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      if (empsections === "None" || empsections === "") {
                        return j;
                      } else {
                        return j.section
                          .toLocaleLowerCase() === empsections?.toLocaleLowerCase();
                        //.includes(empsections.toLocaleLowerCase());
                      }
                    })
                    ?.filter((j: any) => {
                      console.log(sNS, "superv");
                      if (sNS === "None" || sNS === "") {
                        return j;
                      }
                      if (sNS === "SP") {
                        return j?.isSupervisor === true;
                      } else if (sNS === "N-SP") {
                        return j?.isSupervisor != true;
                      }
                    })
                    
                     
                      // else if (searchName == "N-SP") {
                      //   return j?.isSupervisor != true;
                      // } 
                      //   if (searchName == "N-SP") {
                      //   if(j?.isSupervisor == false){
                      //     console.log("true")
                      //     return j
                      //   }else{
                      //     console.log("false")
                      //   }
                      //   // return j?.isSupervisor == false;
                      // }else if(searchName === "None" || searchName === "") {
                      //   return j;
                      // }
                    ?.filter((j: any) => {
                      if (searchName === "") {
                        return j;
                      }else if (
                        (j?.employee_code !== undefined &&
                          j?.employee_code
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase())) ||
                        (j?.legal_full_name !== undefined &&
                          j?.legal_full_name
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase())) ||
                        (j?.section !== undefined &&
                          j?.section
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase())) ||
                        (j?.position_long_description !== undefined &&
                          j?.position_long_description
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
                        (j?.grade !== undefined &&
                          j?.grade
                            .toLocaleLowerCase()
                            .includes(searchName.toLocaleLowerCase()))
                      )
                       {
                        return j;
                      }
                      else if(searchName !== ""){
                        if (searchName == "N-SP") {
                          return j?.isSupervisor != true;
                        }
                       else if (searchName == "SP") {
                            return j?.isSupervisor === true;
                          }
                      }
                    })
                    //  {emp?.isSupervisor != true ? "N-SP" : "SP"}
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //  (rowsPerPage > 0
                    //    ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //    : data.data
                    //  )
                    ?.map((emp: any, index: number) => {
                      console.log(emp, 'emppppppppp')
                      return (
                        // console.log(emp?.roles[])
                        <TableRow
                          // key={index}
                          tabIndex={-1}
                          key={emp?.employee_code}
                          sx={{
                            "& td, & th": {
                              // whiteSpace: "nowrap",
                              // border: 1,
                              // borderColor: "#e0e0e0",
                            },
                          }}
                        >

                          <TableCell
                            align="left"
                            style={{ color: "#368DC5", }}
                            padding="checkbox"

                          >
                            {/* <input
                            name={emp?._id}
                            checked={emp?.isChecked}
                            //onChange={handleOnCheckselectedData}
                            onChange={handleOnCheck11}
                            type="checkbox"
                            style={{
                              height: "18px",
                              width: "18px",
                              borderColor: "#D5D5D5",
                              cursor: "pointer",
                            }}
                          /> */}
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                                onClick={() => { editingPage(emp) }}
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>

                          {columnHeadersDisplay?.Ecode && (
                            <TableCell
                              align="center"
                              width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingRight: "40px"
                              }}
                            >
                              {emp.employee_code}
                            </TableCell>
                          )}
                          {columnHeadersDisplay?.Ename && (
                            <TableCell
                              align="left"
                              // width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              style={{ minWidth: 290 }}
                            >
                              {emp.legal_full_name}
                            </TableCell>
                          )}
                          <TableCell
                              align="left"
                              width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingRight: "40px"
                              }}
                            >
                              {emp.first_name}
                            </TableCell>
                          {/* {columnHeadersDisplay?.FirstName && (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.first_name}
                          </TableCell>
                        )} */}


                          {/* {columnHeadersDisplay?.ServiceReferenceDate &&  (
                          <TableCell
                            align="center"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight:"40px"

                            }}
                          >
                            {emp.service_reference_date}
                          </TableCell>
                        )} */}
                          {columnHeadersDisplay?.Eposition && (
                            <TableCell
                              align="left"
                              // width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              style={{ minWidth: 250 }}
                            >
                              {emp.position_long_description}
                            </TableCell>
                          )}
                          {columnHeadersDisplay?.EGrade && (
                            <TableCell
                              align="center"
                              width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingRight: "50px"

                              }}
                            >
                              {emp.grade}
                            </TableCell>
                          )}
                          <TableCell
                          width="200px"
                            align="left"
                          // style={{ color: "#368DC5", }}
                          // padding="checkbox"
                          // tabIndex={-1}
                          // key={emp?.employee_code}

                          >
                            {getRoles(emp)}
                            {/* {emp[index]?.roles[0]} */}

                          </TableCell>
                          <TableCell
                            align="center"
                            width="200px"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              whiteSpace: "nowrap",
                              paddingRight: "40px"

                            }}
                          >
                            {emp?.probation_status}
                          </TableCell>
                          {columnHeadersDisplay?.SupervisoryRolee && (
                            <TableCell
                              align="center"
                              width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                whiteSpace: "nowrap",
                                fontFamily: "Arial",
                                paddingRight: "40px"

                              }}
                            >
                              {emp?.isSupervisor != true ? "N-SP" : "SP"}
                            </TableCell>
                          )}
                          {columnHeadersDisplay?.Function && (
                            <TableCell
                              align="left"
                              width="200px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                whiteSpace: "nowrap",
                                fontFamily: "Arial",
                              }}
                            >
                              {emp?.function}
                            </TableCell>
                          )}
                          <TableCell
                            align="left"
                            width="200px"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              whiteSpace: "nowrap",
                              fontFamily: "Arial",

                            }}
                          >
                            {emp.appraiser_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            // width="200px"
                            sx={{
                              fontSize: "14px",
                              whiteSpace: "nowrap",
                              color: "#333333",
                              fontFamily: "Arial",

                            }}
                          >
                            {emp.reviewer_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            // width="200px"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              whiteSpace: "nowrap",
                              fontFamily: "Arial",

                            }}
                          >
                            {emp.normalizer_name}
                          </TableCell>

                          {/* {columnHeadersDisplay?.PositionCode &&(
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.position_code}
                          </TableCell>
                        )}
                      {columnHeadersDisplay?.division &&  (
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.division}
                          </TableCell>
                        )} */}
                          {columnHeadersDisplay?.Section && (
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
                          )}
                          {/* 
                         {columnHeadersDisplay?.SubSection && (
                          <TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp["sub section"]}
                          </TableCell>
                        )}
                         {columnHeadersDisplay?.ManagerCode && (
                          <TableCell
                            align="center"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight:"30px"

                            }}
                          >
                            {emp.manager_code}
                          </TableCell>
                        )}
                      {columnHeadersDisplay?. ManagerName && (
                          <TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.manager_name}
                          </TableCell>
                        )}
                        {columnHeadersDisplay?.ManagerPosition &&  (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.manager_position}
                          </TableCell>
                        )}
                        {columnHeadersDisplay?.WorkLocation &&  (
                          <TableCell
                            align="left"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.work_location}
                          </TableCell>
                        )}
                     {columnHeadersDisplay?.GradeSet &&  (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.grade_set}
                          </TableCell>
                        )}
                        {columnHeadersDisplay?.JobCode &&  (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.job_code}
                          </TableCell>
                        )}
                      {columnHeadersDisplay?.JobTitle && (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.job_title}
                          </TableCell>
                        )}
                       {columnHeadersDisplay?.JobLevel && (
                          <TableCell
                            align="left"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.job_level}
                          </TableCell>
                        )} */}
                        </TableRow>
                      )
                    })}
              </TableBody>}
              {tableDataFilterdLength?.length == 0 &&
              <TableRow>
                  <TableCell 
                  colSpan={8}
                  align="center" 
                  style={{ fontWeight: 'bold',border:"none",color:"#808080",fontSize:"18px",fontFamily:"arial",display:"flex",width:"max-content"  }}
                  >
                    No data to display
                  </TableCell>
                </TableRow>
                } 
           
            </Table>
          </CustomScrollbar>
        </Scroll>
      {/* </TableContainer>  */}
      {tableDataFilterdLength?.length > 0 && 
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
      />}
       <AlertDialogSuccess
          isAlertOpen={clearAlert}
          handleAlertClose={handleClearAlert}
        >
          {message}
        </AlertDialogSuccess>
    </>
  );
}
