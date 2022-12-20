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
} from "@mui/material";
import { styled } from "@mui/system";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { useGetEmployeeQuery } from "../../service";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Scrollbar from "react-scrollbars-custom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import { ADD_EMPLOYEE } from "../../constants/routes/Routing";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
export default function Employeelisttable() {
  const [count, setCount] = React.useState(650);
  const { data } = useGetEmployeeQuery("all");
  // console.log(data, "ghg");
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
  // console.log(empFullName, "position");
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
  console.log(empjoblevel, "position");
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
        maxWidth: 200,
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
  const Function = ["Sales/Non-Sales", "Sales/Non-Sales"];
  const sNSvalues = [, "N-SP", "S"];

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
  const SubSection = ["Installation", "SMEs", "Service"];
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
  };
  const [heading2, setheading2] = React.useState(true);
  // console.log(heading2, "h2");
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
  };
  const [heading3, setheading3] = React.useState(true);
  // console.log(heading3, "h3");
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
  };
  const [headingSN, setheadingSN] = React.useState(true);
  // console.log(headingSN, "h1");
  const handleheadingSN = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingSN(event.target.checked);
  };
  const [heading4, setheading4] = React.useState(true);
  // console.log(heading4, "h4");
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
  };
  const [heading5, setheading5] = React.useState(true);
  // console.log(heading5, "h5");
  const handleheading5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading5(event.target.checked);
  };
  const [heading6, setheading6] = React.useState(true);
  // console.log(heading6, "h6");
  const handleheading6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading6(event.target.checked);
  };
  const [heading7, setheading7] = React.useState(true);
  // console.log(heading7, "h7");
  const handleheading7 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading7(event.target.checked);
  };
  const [heading8, setheading8] = React.useState(true);

  const handleheading8 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading8(event.target.checked);
  };
  const [heading9, setheading9] = React.useState(true);

  const handleheading9 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading9(event.target.checked);
  };
  const [heading10, setheading10] = React.useState(true);
  const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading10(event.target.checked);
  };
  const [heading11, setheading11] = React.useState(true);
  const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading11(event.target.checked);
  };
  const [heading12, setheading12] = React.useState(true);
  const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading12(event.target.checked);
  };
  const [heading13, setheading13] = React.useState(true);
  const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading13(event.target.checked);
  };
  const [heading14, setheading14] = React.useState(true);
  const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading14(event.target.checked);
  };
  const [heading15, setheading15] = React.useState(true);
  const handleheading15 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading15(event.target.checked);
  };
  const [heading16, setheading16] = React.useState(true);
  const handleheading16 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading16(event.target.checked);
  };
  const [heading17, setheading17] = React.useState(true);
  const handleheading17 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading17(event.target.checked);
  };
  const [heading18, setheading18] = React.useState(true);
  const handleheading18 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading18(event.target.checked);
  };
  const [heading19, setheading19] = React.useState(true);
  const handleheading19 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading19(event.target.checked);
  };
  //headings-sort

  //Grade Select Filter
  const [openGrade, setOpenGrade] = React.useState(false);
  const handleCloseGrade = () => {
    // setOpenGrade(false);
    setisDrawerOpen(false);
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
    setempEmployeeCode(event?.target?.value?.toString());
    console.log(event?.target.value.toString(),"handleTarget")
    setAnchorElnew(null);
  };
  const [users, setUsers] = React.useState<any>([]);
  React.useEffect(() => {
    console.log("useeffect run");
    if (data) {
      setUsers(data.data);
    }
  }, [data]);
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
    const serviceRefDateContents = serviceRefDate.filter(
      (c: any, index: any) => {
        return (
          serviceRefDate.indexOf(c) === index && c != null && c != undefined
        );
      }
    );
    setserviceRef(serviceRefDateContents);
    const grades = users
      .slice()
      .sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      .map((i: any) => {
        return i.grade;
      });
    const gradeContents = grades.filter((c: any, index: any) => {
      return grades.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    console.log(gradeContents, "contents");
    const position = users
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(
          b?.position_long_description
        );
      })
      .map((i: any) => {
        return i.position_long_description;
      });
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
        return a.manager_code - b.manager_code;
      })
      .map((i: any) => {
        return i.manager_code;
      });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    console.log(managerCodeContents, "contents");

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
    console.log(managerNameContents, "contents");

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
    console.log(managerPositionContents, "contents");

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
    console.log(workLocationContents, "contents");

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
    console.log(workLocationContents, "contents");

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
    console.log(jobCodeContents, "contents");

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
    console.log(jobTitleContents, "contents");

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
  }, [users]);
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
    if (empEmployeeCode === "None" || empEmployeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [empEmployeeCode]);
  React.useEffect(() => {
    if (positions === "None" || positions === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [positions]);
  React.useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon2(false);
    } else {
      setIcon2(true);
    }
  }, [empgrades]);
  React.useEffect(() => {
    if (empdivisions === "None" || empdivisions === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empdivisions]);
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
        if (sNS === "S") {
          return j.isSupervisor === true;
        } else if (sNS === "NS") {
          return j.isSupervisor === undefined;
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
          ECode: j.employee_code,
          EmployeeName: j.legal_full_name,
          FirstName: j?.first_name,
          supervisoryRole: j.isSupervisor != undefined ? "SP" : "N-SP",
          Function: j?.attachmen,
          ServiceReferrenceDtae: j.service_reference_date,
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
      // .filter((j: any) => {
      //   if (empSubSection === "None" || empSubSection === "") {
      //     return j;
      //   } else {
      //     return j.Service
      //       .toLocaleLowerCase()
      //       .includes(empSubSection.toLocaleLowerCase());
      //   }
      // })
      .filter((j: any) => {
        console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "S") {
          return j.isSupervisor === true;
        } else if (sNS === "NS") {
          return j.isSupervisor === undefined;
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
      });

    console.log(f?.length, "fffff");
    // setPage1(f?.length)
    console.log(page1, "page1");
    // console.log(f,"excel")
    // setExcel(f)
    return f;
  }, [
    empsections,
    empWorkLocation,
    empEmployeeCode,
    positions,
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
    empService,
    empPositionCode,
    empFunction,
    empdivisions,
    empFullName,
    empgrades,
  ]);

  return (
    <>
      <Box style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginTop: 1 }}
        >
          <span
            style={{
              color: "#3e8cb5",
              fontSize: "18px",
              fontFamily: "Arial",
            }}
          >
            Employee List
          </span>
          <div style={{ paddingLeft: "10px", paddingRight: "15px" }}>
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
            />
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => {
                setisDrawerOpen(false);
              }}
            >
              <Box sx={{ paddingLeft: "10px", paddingRight: "25px" }}>
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
                      <Checkbox checked={heading1} onChange={handleheading1} />
                    }
                    label="ECode"
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
                      <Checkbox checked={heading2} onChange={handleheading2} />
                    }
                    label="Full Name"
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
                      <Checkbox checked={heading3} onChange={handleheading3} />
                    }
                    label="First Name"
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
                        onChange={handleheadingSN}
                      />
                    }
                    label="S/SN"
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
                        checked={heading19}
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
                      <Checkbox checked={heading4} onChange={handleheading4} />
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
                      <Checkbox checked={heading5} onChange={handleheading5} />
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
                      <Checkbox checked={heading6} onChange={handleheading6} />
                    }
                    label="Positions"
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
                      <Checkbox checked={heading7} onChange={handleheading7} />
                    }
                    label="Position Code"
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
                      <Checkbox checked={heading8} onChange={handleheading8} />
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
                      <Checkbox checked={heading9} onChange={handleheading9} />
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
                        checked={heading11}
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
                        checked={heading14}
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
                  />
                </FormGroup>
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    left: 140,
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                  }}
                  variant="outlined"
                  onClick={() => {
                    handleCloseGrade();
                  }}
                >
                  Close
                </Button>
              </Box>
            </Drawer>
          </div>
        </Stack>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 0 }}>
        <Scroll>
          <Scrollbar style={{ minWidth: 650, height: "calc(100vh - 300px)" }}>
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
                  {heading1 && (
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
                           >None
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
                        {icon && <FilterAltTwoToneIcon />}
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
                  )}
                  {heading2 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Full Name </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                            {/* {FullName.map((name) => (
                            <MenuItem
                              // style={{ fontSize: "12px" }}
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))} */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading3 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>First Name </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                            {/* {FirstName.map((name) => (
                            <MenuItem
                              // style={{ fontSize: "12px" }}
                              key={name}
                              value={name}
                            >
                              {name}
                            </MenuItem>
                          ))} */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {headingSN && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ height: "0" }}>
                        <Stack direction="row" alignItems="center" position="relative" >
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              position:"absolute"
                            }}
                          >
                           
                            Supervisory Role
                          </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                          {/* <div>
                            <Tooltip title="Supervisory/Non Supervisory">
                              <IconButton>
                                <img src={Infoicon} alt="icon" />
                              </IconButton>
                            </Tooltip>
                          </div> */}
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  {heading19 && (
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
                          <span>Function </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empFunction}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeFunction}
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
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="Sales"
                              value="Sales"
                            >
                              Sales
                            </MenuItem>
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              }}
                              key="Non-Sales"
                              value="Non-Sales"
                            >
                              Non-Sales
                            </MenuItem>
                            {/* 
                                {Sections.map((name) => (
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                          </Select>
                          {icon6 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  {heading4 && (
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
                      <FormControl sx={{ width: 160, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span
                            style={{
                              whiteSpace: "pre-line",
                            }}
                          >
                            Service Reference Date
                          </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading5 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 80, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span> Grade </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empgrades}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangegrades}
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
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                          {icon2 && <FilterAltTwoToneIcon />}
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  {heading6 && (
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
                        <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row" alignItems="center">
                            <span> Position</span>
                            <Select
                              //multiple
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={positions}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeposition}
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

                              {positionArray.map((name: any) => (
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
                            {icon1 && <FilterAltTwoToneIcon />}
                          </Stack>
                        </FormControl>
                      </div>
                    </TableCell>
                  )}
                  {heading7 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading8 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading9 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span> Section </span>
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangesections}
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
                              >
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                  )}
                  {heading10 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Sub Section </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
                          <Select
                            size="small"
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            // open={openGrade}
                            // onClose={handleCloseGrade}
                            // onOpen={handleOpenGrade}
                            value={empSubSection}
                            // value={personName}
                            // onChange={handleChanges}
                            onChange={handleChangeSubSection}
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
                  )}
                  {heading11 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Manager Code </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading12 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Manager Name </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading13 && (
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
                          <span>Manager Position </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading14 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Work Location </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading15 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Grade set </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading16 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Code </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading17 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Title </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                  {heading18 && (
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ width: 100, height: "0" }}>
                        <Stack direction="row" alignItems="center">
                          <span>Job Level </span>
                          {/* <span onClick={handleOpenGrade}><ArrowDropDownIcon /></span> */}
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
                      </FormControl>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {data != undefined &&
                  // (rowsPerPage > 0
                  //   ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  //   : data.data
                  // )
                  data.data
                    .filter((j: any) => {
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
                      if (
                        empEmployeeCode === "None" ||
                        empEmployeeCode === "" ||
                        empEmployeeCode === "0" 
                      ) {
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
                      if (
                        empPositionCode === "None" ||
                        empPositionCode === ""
                      ) {
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
                    // .filter((j: any) => {
                    //   if (empSubSection === "None" || empSubSection === "") {
                    //     return j;
                    //   } else {
                    //     return j.Service
                    //       .toLocaleLowerCase()
                    //       .includes(empSubSection.toLocaleLowerCase());
                    //   }
                    // })
                    .filter((j: any) => {
                      console.log(j.isSupervisor, "superv");
                      if (sNS === "None" || sNS === "") {
                        return j;
                      }
                      if (sNS === "S") {
                        return j.isSupervisor === true;
                      } else if (sNS === "NS") {
                        return j.isSupervisor === undefined;
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
                      if (
                        empManagerPosition === "None" ||
                        empManagerPosition === ""
                      ) {
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
                      if (
                        empWorkLocation === "None" ||
                        empWorkLocation === ""
                      ) {
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //  (rowsPerPage > 0
                    //    ? data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //    : data.data
                    //  )
                    .map((emp: any, index: number) => (
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
                        {heading1 && (
                          <TableCell
                            align="center"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.employee_code}
                          </TableCell>
                        )}
                        {heading2 && (
                          <TableCell
                            align="left"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.legal_full_name}
                          </TableCell>
                        )}
                        {heading3 && (
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
                        )}
                        {headingSN && (
                          <TableCell
                            align="center"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.isSupervisor != undefined ? "SP" : "N-SP"}
                          </TableCell>
                        )}
                        {heading19 && (
                          <TableCell
                            align="left"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            Sales/Non-Sales
                          </TableCell>
                        )}
                        {heading4 && (
                          <TableCell
                            align="center"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.service_reference_date}
                          </TableCell>
                        )}
                        {heading5 && (
                          <TableCell
                            align="center"
                            // width={150}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.grade}
                          </TableCell>
                        )}
                        {heading6 && (
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.position_long_description}
                          </TableCell>
                        )}
                        {heading7 && (
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
                        {heading8 && (
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
                        )}
                        {heading9 && (
                          <TableCell
                            align="left"
                            // width={200}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.section}
                          </TableCell>
                        )}
                        {heading10 && (
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
                        {heading11 && (
                          <TableCell
                            align="center"
                            // width={130}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {emp.manager_code}
                          </TableCell>
                        )}
                        {heading12 && (
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
                        {heading13 && (
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
                        {heading14 && (
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
                        {heading15 && (
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
                        {heading16 && (
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
                        {heading17 && (
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
                        {heading18 && (
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
                        )}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </Scrollbar>
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
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={page1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
