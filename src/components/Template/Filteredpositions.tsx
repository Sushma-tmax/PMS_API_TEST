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
import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";

import {
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
  MAPPED_TEMPLATE_2,
  LINK_CALENDAR_OPEN,
  LINK_CALENDAR,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  useCreatePositionTemplateMutation,
  useGetEmployeeQuery,
  useGetSingleTemplateQuery,
  useGetAppraisalCalenderQuery,
} from "../../service/";
import { Alert, TablePagination } from "@mui/material";
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

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
});
const Tabb = styled("div")({
  "& .root.Mui-selected": {
    color: "#3e8cb5",
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

export default function Filteredpositions(props: any) {
  const {
    ViewTemplateData,
    onDelete,
    checkedTemplatesID,
    name,
    setnavPrompt,
    filteredTemp,
    employeeResult,
  } = props;
  const { data: appraisalCalendarData } = useGetAppraisalCalenderQuery("");
  console.log(filteredTemp, "posfilteredTemp");
  console.log(employeeResult, "employeeResult");
  console.log(setnavPrompt, "setnavPrompt");
  const { data, isLoading, error } = useGetEmployeeQuery("all");
  console.log(data, checkedTemplatesID, "dataaaaaa");
  const { id } = useParams();

  const [users, setUsers] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [employee, setEmployee] = React.useState("");
  const [name1, setName1] = useState<any>("");
  const [searchName, setSearchName] = useState("");
  const [searchName2, setSearchName2] = useState("");
  console.log(searchName, "searchName");
  const { data: singleTemplateData, isLoading: load } =
    useGetSingleTemplateQuery(id);
  const [createPosition, { isSuccess: isSuccessPosition }] =
    useCreatePositionTemplateMutation();
  const [save1, setSave1] = useState(isSuccessPosition);
  const [errors, setErrors] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [positionsHide, setpositionsHide] = useState(false);
  //filtering positions
  const [tempEmployees, settempEmployees] = useState<any>([]);
  // useEffect(() => {
  //  if(filteredTemp !== undefined){
  //   settempEmployees(filteredTemp.positions)
  //  }
  //  console.log(tempEmployees, 'tempEmployees')
  // }, [filteredTemp]);
  useEffect(() => {
    const selectedCalendar = appraisalCalendarData?.data?.filter(
      (item: any) => {
        console.log(item?.position, "selectedCalendaritems");
        return item?._id == id;
      }
    );
    settempEmployees(selectedCalendar.map((j: any) => j?.position));
    console.log(selectedCalendar, "selectedCalendar");
    console.log(tempEmployees, "tempEmployees");
  }, [id]);
  //filtering positions
  console.log(name, "name");
  console.log(users.length, "checked user");
  useEffect(() => {
    if (id !== undefined) {
      setpositionsHide(true);
    } else {
      setpositionsHide(false);
    }
  }, [id]);

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
  }, [data]);

  const handleOnCheck = (e: any) => {
    setnavPrompt(true);
    const { name, checked } = e.target;
    console.log(name, checked, "namechecked");
    setChanged(true);
    if (name === "allSelect") {
      const tempUser = users.map((employee: any) => {
        return { ...employee, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      const tempUser = users.map((employee: any) => {
        return employee._id === name
          ? { ...employee, isChecked: checked }
          : employee;
      });
      setUsers(tempUser);
      console.log(tempUser, "temp");
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
  const [isitchecked, setisitchecked] = React.useState<any>(true);
  console.log(agree, "agree");
  const [changed, setChanged] = React.useState<any>(false);
  const [changedAlert, setChangedAlert] = React.useState<any>(false);

  // console.log(checkname,isitchecked, "state");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAgree = (e: any) => {
    setAgree(true);

    console.log(checkname, isitchecked, "state");
    if (checkname === "allSelect") {
      const tempUser = users.map((employee: any) => {
        return { ...employee, isChecked: isitchecked };
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
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAgree(false);
  };

  const handleOnCheckselectedData = (e: any) => {
    setnavPrompt(true);
    const { name, checked } = e.target;
    setOpen(true);
    setcheckname(name);
    setisitchecked(checked);
    setChanged(true);
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
    createPosition({
      position: data.position,
      id: id,
    }).then((data: any) => console.log(data, "ctdata"));
  };
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

  //sorting
  //sorting
  const [employeeName, setemployeeName] = React.useState("");
  console.log(employeeName, "position");
  const handleChangeemployeeName = (event: SelectChangeEvent) => {
    setemployeeName(event.target.value);
  };
  const [employeeNameOther, setemployeeNameOther] = React.useState("");
  console.log(employeeNameOther, "employeeNameOther");
  const handleChangeemployeeNameOther = (event: SelectChangeEvent) => {
    setemployeeNameOther(event.target.value);
  };
  const [employeeCode, setemployeeCode] = React.useState("");
  console.log(employeeCode, "employeeCode");
  const handleChangeemployeeCode = (event: SelectChangeEvent) => {
    setemployeeCode(event.target.value);
  };
  const [employeeCodeOther, setemployeeCodeOther] = React.useState("");
  console.log(employeeCodeOther, "employeeCodeOther");
  const handleChangeemployeeCodeOther = (event: SelectChangeEvent) => {
    setemployeeCodeOther(event.target.value);
  };
  const [positions, setPositions] = React.useState("");
  console.log(positions, "position");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };
  const [positionsother, setPositionsother] = React.useState("");
  console.log(positionsother, "position");
  const handleChangepositionother = (event: SelectChangeEvent) => {
    setPositionsother(event.target.value);
  };

  const [empgrades, setempGrades] = React.useState("");
  console.log(empgrades, "position");
  const handleChangegrades = (event: SelectChangeEvent) => {
    setempGrades(event.target.value);
  };
  const [empgradesother, setempGradesother] = React.useState("");
  console.log(empgradesother, "position");
  const handleChangegradesother = (event: SelectChangeEvent) => {
    setempGradesother(event.target.value);
  };
  const [empdivisions, setempdivisions] = React.useState("");
  console.log(empdivisions, "position");
  const handleChangedivisions = (event: SelectChangeEvent) => {
    setempdivisions(event.target.value);
  };
  const [empdivisionsOther, setempdivisionsOther] = React.useState("");
  console.log(empdivisionsOther, "divisionOther");
  const handleChangedivisionsOther = (event: SelectChangeEvent) => {
    setempdivisionsOther(event.target.value);
  };
  const [empsections, setempsections] = React.useState("");
  console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
  };
  const [empsectionsother, setempsectionsother] = React.useState("");
  console.log(empsectionsother, "position");
  const handleChangesectionsother = (event: SelectChangeEvent) => {
    setempsectionsother(event.target.value);
  };
  const [sNS, setsNS] = React.useState("");
  console.log(sNS, "sNS");
  const handleChangesNS = (event: SelectChangeEvent) => {
    setsNS(event.target.value);
  };
  const [sNSOther, setsNSOther] = React.useState("");
  console.log(sNSOther, "sNSOther");
  const handleChangesNSOther = (event: SelectChangeEvent) => {
    setsNSOther(event.target.value);
  };
  const [empsubSections, setempsubSections] = React.useState("");
  console.log(empsubSections, "empsubSections");
  const handleChangeempsubSections = (event: SelectChangeEvent) => {
    setempsubSections(event.target.value);
  };
  const [empsubSectionsOther, setempsubSectionsOther] = React.useState("");
  console.log(empsubSectionsOther, "empsubSectionsOther");
  const handleChangeempsubSectionsOther = (event: SelectChangeEvent) => {
    setempsubSectionsOther(event.target.value);
  };
  const [managerName, setmanagerName] = React.useState("");
  console.log(managerName, "managerName");
  const handleChangemanagerName = (event: SelectChangeEvent) => {
    setmanagerName(event.target.value);
  };
  const [managerNameOther, setmanagerNameOther] = React.useState("");
  console.log(managerNameOther, "managerNameOther");
  const handleChangemanagerNameOther = (event: SelectChangeEvent) => {
    setmanagerNameOther(event.target.value);
  };
  const [managerCode, setmanagerCode] = React.useState("");
  console.log(managerCode, "managerCode");
  const handleChangemanagerCode = (event: SelectChangeEvent) => {
    setmanagerCode(event.target.value);
  };
  const [managerCodeOther, setmanagerCodeOther] = React.useState("");
  console.log(managerCodeOther, "managerCodeOther");
  const handleChangemanagerCodeOther = (event: SelectChangeEvent) => {
    setmanagerCodeOther(event.target.value);
  };
  const [functionData, setfunctionData] = React.useState("");
  console.log(functionData, "functionData");
  const handleChangefunctionData = (event: SelectChangeEvent) => {
    setfunctionData(event.target.value);
  };
  const [functionDataOther, setfunctionDataOther] = React.useState("");
  console.log(functionDataOther, "functionDataOther");
  const handleChangefunctionDataOther = (event: SelectChangeEvent) => {
    setfunctionDataOther(event.target.value);
  };
  const [workLocation, setworkLocation] = React.useState("");
  console.log(workLocation, "workLocation");
  const handleChangeworkLocation = (event: SelectChangeEvent) => {
    setworkLocation(event.target.value);
  };
  const [workLocationOther, setworkLocationOther] = React.useState("");
  console.log(workLocationOther, "workLocationOther");
  const handleChangeworkLocationOther = (event: SelectChangeEvent) => {
    setworkLocationOther(event.target.value);
  };
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 200,
        fontSize: "14px !important",
        fontFamily: "Arial",
        color: "#333333",
      },
    },
  };
  const empnames = [
    "Haytham M. M. Alkurdi",
    "Lydiane Kemzeu Dongmo",
    "Ahmed J. S. Abdaljawad",
    "Yousef Said Sharabati",
  ];
  const empcodes = ["1001", "1002", "1003", "1005", "1006", "1007", "1008"];
  const names = [
    "Senior Sales Executive I - SMEs",
    "Supervisor - House Staff",
    "Storekeeper",
    "Messenger - Admin",
    "Forklift Operator",
    "Senior Sales Engineer II - SMEs",
    "Driver - Service",
    "Labourer - Installation",
    "Technician I /Driver - Service",
    "Labourer - Warehouse",
    "Driver - Warehouse",
    "Technician - Installation",
    "Technician/Driver - Installation",
    "Application & Design Engineer",
    "Labourer - Parts",
    "Draftsman - SO",
    "Senior Technician  - Service",
    "Technician I - Service",
    "Foreman - Service",
    "Coordinator - Service",
    "Labourer - Service",
    "Asst. Storekeeper",
    "Sales Manager - SMEs",
    "Employee Shared Services Supervisor",
    "Application Engineer II",
    "Technician I - VRF",
    "Sr. Sales Engineer I - SMEs",
    "Chief Sales Officer II",
    "Accountant I",
    "ERP Specialist II",
    "Sales Executive I - IR",
    "Administration Officer I",
    "Service Centre Manager - UAE",
    "Storekeeper - Parts",
    "Foreman - Installation",
    "Warehouse Supervisor I",
    "Driver - Installation",
    "Collections Officer I",
    "Service Centre Supervisor I - DXB/NE",
    "Technician II - Service",
    "Driver - HGV",
    "Service Centre Supervisor I - ALN",
    "Government Relations Officer II",
    "Chief Accountant",
    "Coordinator - Sales Operations",
    "Area Sales Manager - PD & SMEs",
    "Senior Accountant II",
    "Product Manager - Applied",
    "Guard - Admin",
    "Administrative Assistant - Sales Support (Retd)",
    "Project Operations Manager - UAE",
    "Parts Centre Manager",
    "Service Centre Supervisor I - AUH/BDZ",
    "Logistics Manager",
    "Coordinator - Admin",
    "Foreman - Projects",
    "CSR",
    "Administration Supervisor I",
    "Sales Engineer II - Government",
    "Sales Executive II - SMEs",
    "Senior Warehouse Manager - UAE",
    "Chief Operating Officer - Marketing & Overseas II",
    "Senior Coordinator - Product",
    "Office Boy",
    "Payroll Controller",
    "Sr. Coordinator - Fleet Services",
    "Sales Manager - Projects",
    "Senior Team Leader - Service",
    "Warehouse Manager I",
    "Sales Executive II - Goverrnment",
    "Asst. Technician/Driver - Service",
    "Sr. Project Ops Engineer II",
    "Logistics Specialist I",
    "Senior Manager - Product",
    "Driver - Driver HGV",
    "ERP Manager",
    "Coordinator - Service & Installation",
    "Chief Operating Officer - UAE",
    "Office Manager - HQ",
    "Director - Morocco Ops",
    "Sales Manager - Retail",
    "Sr. Storekeeper - Parts",
    "Sales Director - Iraq",
    "Logistics Officer - Iraq",
    "Cook",
    "Senior Technician/Driver - VRF",
    "Sr. Employee Relations Specialist",
    "Technician II/Driver - Service",
    "Technician II - VRF",
    "Chief Investment Officer",
    "Sales Operations Officer II",
    "Clearance and Store Coordinator",
    "Head of Business Development II",
    "Associate",
    "Sales Director - Distribution",
    "Sr. Product Engineer - Applied",
    "Coordinator - Parts",
    "Technical Enterprise Architect",
    "Senior Portfolio Manager",
    "Sr. Project Ops Engineer I",
    "Application Engineer I",
    "Sr. Specialist  - Business Reporting",
    "Showroom Representative",
    "Sales Engineer II - SMEs",
    "Operations Manager",
    "Senior Sales Manager - SMEs",
    "Assistant Manager - Product OS",
    "Finance Planning and Analysis Manager I",
    "Project Operations Administrator",
    "Area Sales Manager - Projects",
    "Office Girl",
    "Sales Operations Officer I",
    "Clerk - Sales Operations",
    "Senior Team Leader - Sales Operations",
    "Technician - Electronics",
    "Sr. Payroll Officer",
    "Senior Accountant I",
    "Office Manager - Private Office",
    "Sales Operations Supervisor",
    "Senior Foreman",
    "Coordinator - Installation",
    "Senior Sales Engineer I - Projects",
    "Stakeholder Relationship Director",
    "Sales Operations Engineer I",
    "Sales Executive II - IR",
    "Product Engineer II",
    "Senior Sales Executive I - IR",
    "Product Engineer I",
    "Continuous Improvement Engineer I",
    "Business Analysis & Sales Planning Manager",
    "Sales Director - Projects and SMEs",
    "Service Engineer II - VRF",
    "Senior Team Leader - Call Centre",
    "Project Ops Engineer I",
    "Senior Showroom Representative",
    "Senior Director - CI, IT & BA",
    "Digital Solutions Business Partner II",
    "Call Centre Operator",
    "Business Development Manager II",
    "House Supervisor & Driver",
    "IT Support Engineer I",
    "Operations Planner",
    "Executive Assistant II",
    "Treasury Officer II",
    "Product Engineer I/Trainer",
    "Driver - House Staff",
    "Credit Controller",
    "Draftsman - Projects",
    "Application & Design Manager",
    "HR Specialist I",
    "Continuous Improvement Specialist I",
    "House Maid",
    "Senior Collections Controller",
    "Head of Information Technology II",
    "Business Development Manager I",
    "E-commerce and Marketing Manager",
    "Personal Assistant - HS",
    "Merchandiser - OR",
    "Market Intelligence Engineer I",
    "Sales Engineer I - SMEs",
    "Jr. Showroom Representative",
    "Merchandiser - IR",
    "Facilities Technician II",
    "Technical Support Manager - CAC",
    "Logistics Supervisor",
    "Visual Merchandisingr Executive II",
    "Sr. Marketing Executive I",
    "Accountant II",
    "Sales Operations Assistant",
    "Collections Officer II",
    "Coordinator - Government Sales",
    "Junior Sales Operations Engineer",
    "Caretaker",
    "Asst. Manager - Application and Design",
    "Controls Engineer II",
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
    "Foreman - Service & Installation",
    "Technical Support Specialist II - VRF",
    "Branch Manager - Jordan",
    "Coordinator - Sales Operations (Retd)",
    "Director - Operations OS",
    "Sales Operations and Projects Manager",
    "Sr. Application & Design Engineer I",
    "Senior Sales Executive II - SMEs",
    "Sr. Draftsman - Appl & Design",
    "Senior Director - Operations",
    "Talent Manager I",
    "Stock Coordinator",
    "Senior Technician - VRF",
    "Chief People and Capability Officer II",
    "Sr. ERP Specialist",
    "IT Support Supervisor",
    "Logistics Officer I",
    "Collection Specialist II",
    "Sales Manager - Government",
    "Sales Engineer II - Projects",
    "Senior Manager - Human Resources",
    "Senior Manager - Administration",
    "Asst Sales Manager - Export",
    "Showroom Rep (Mobile)",
    "Chief Finance Officer II",
    "Head of Finance and Treasury",
    "Sales Operations Engineer II",
  ];

  const Grades = [
    "15",
    "9_HS",
    "11",
    "8",
    "7",
    "16",
    "6",
    "9",
    "14",
    "10",
    "12",
    "17",
    "23",
  ];

  const Divisions = [
    "Sales",
    "Personal",
    "Operations - UAE",
    "Corporate Support",
    "Engineering",
    "Finance",
    "Operations - OS",
    "Morocco",
    "Iraq",
    "Sudan",
    "Private Office",
    "Trainees",
    "Jordan",
  ];

  const Sections = [
    "Sales - Projects & SMEs",
    "Personal - House Staff",
    "Ops UAE - Warehouse",
    "Corp Support - Admin",
    "Ops UAE - Service Centre",
    "Eng - Application & Design",
    "Ops UAE - Parts Centre",
    "Ops UAE - Sales Operations",
    "Corp Support - HR",
    "Ops UAE - Project Operations",
    "Sales - ExCom",
    "Fin - Accounting",
    "Corp Support - CI, IT  &  BA",
  ];
  const Subsections = ["SMEs", "Service", "Installation"];
  const sNSvalues = ["SP", "N-SP"];
  const managercodes = ["1462", "1351", "1038", "1119", "1113"];
  const managernames = [
    "Sabri Alhumsi",
    "Ahmed T. A. Awad",
    "John Egidio Henry Rodrigues",
    "Diana Abdel Khalek",
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
  const [tabValues, settabValues] = React.useState(0);
  console.log(tabValues, "values of tab");
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    settabValues(newValue);
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

  //search
  const [tablecount, settablecount] = React.useState(0);
  useEffect(() => {
    if (users.length !== undefined) {
      settablecount(users.length);
    }
  }, [users]);
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setSearchName(e.target.value);
      setPage(0);
    }
    const handleSearchBar2 = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setSearchName2(e.target.value);
      setPage(0);
    }
  return (
    <div>
      {positionsHide && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
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
                  height: "45px",
                  padding: "1px",
                }}
              >
                <p style={{ paddingLeft: "10px", color: "#7ec580" }}>
                  Position is added to the template successfully!
                </p>
              </Box>
            )}
            {changedAlert && (
              <Alert severity="error">No changes were made to save!</Alert>
            )}
            <Stack direction="row" sx={{ justifyContent: "right" }} spacing={2}>
              {tabValues !== 1 && (
                <Searchfeild1>
                  <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Search Here..."
                    onChange={handleSearchBar}
                   // onChange={(e) => setSearchName(e.target.value)}
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
                    //onChange={(e) => setSearchName2(e.target.value)}
                    onChange={handleSearchBar2}
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
                  backgroundColor: "#014D76",
                  height: '36px'
                }}
                variant="contained"
                size="small"
                onClick={() => {
                  selectOneError(checkboxIdHandler(checkboxHandler(users)));
                  onSubmitP({
                    position: checkboxIdHandler(checkboxHandler(users)),
                  });

                }}
              >
                Save
              </Button> */}
            </Stack>
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
              </Tabs>
            </Box>
            <TabPanel value={tabValues} index={0}>
              <TableContainer style={{ marginTop: "10px" }}>
                <Scroll>
                  <Scrollbar
                    style={{ width: "100%", height: "calc(100vh - 330px)" }}
                  >
                    <Table size="small" aria-label="simple table" stickyHeader>
                      <TableHead>
                        <TableRow
                          sx={{
                            "& td, & th": {
                              bgcolor: "#eaeced",
                              whiteSpace: "nowrap",
                            },
                          }}
                        >
                          {/* <TableCell align="left" sx={{ bgcolor: "#ebf2f4" }}>
                          <input
                            name="allSelect"
                            checked={
                              users &&
                              users.filter(
                                (employee: any) => employee.isChecked !== true
                              ).length < 1
                            }
                            onChange={handleOnCheck}
                            type="checkbox"
                            style={{
                              height: "17px",
                              border: "1px solid #D5D5D5",
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
                          >
                            <FormControl sx={{ m: 0, height: "0" }}>
                              <Stack direction="row">
                                <span> Ecode</span>
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {empcodes.map((name) => (
                                    <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            <FormControl sx={{ m: 0, width: 110, height: "0" }}>
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
                                  fontFamily: "arial",
                                  color: "#333333",
                                }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {empnames.map((name) => (
                                    <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            <FormControl sx={{ m: 0, height: "0" }}>
                              
                                <Stack direction="row">
                                  
                                    <span
                                      style={{
                                        whiteSpace:"pre-line"
                                      }}
                                    >
                                    Supervisory Role
                                    </span>
                                  
                                  <Select
                                    size="small"
                                    sx={{ width: "25px", fontSize: "0rem" }}
                                    disableUnderline
                                    value={sNS}
                                    // value={personName}
                                    // onChange={handleChanges}
                                    onChange={handleChangesNS}
                                    // input={<OutlinedInput label="Name" />}
                                    variant="standard"
                                    MenuProps={MenuProps}
                                  >
                                    {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key="None"
                                      value="None"
                                    >
                                      None
                                    </MenuItem>

                                    {sNSvalues.map((name) => (
                                      <MenuItem
                                     style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                        key={name}
                                        value={name}
                                      >
                                        {name}
                                      </MenuItem>
                                    ))}
                                    {/* </Scrollbar> */}
                                  </Select>
                                </Stack>
                                {/* <div>
                                  <Tooltip title="Supervisory/Non Supervisory">
                                    <IconButton>
                                      <img src={Infoicon} alt="icon" />
                                    </IconButton>
                                  </Tooltip>
                                </div> */}
                           
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Function</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={functionData}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangefunctionData}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    Sales
                                  </MenuItem>
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
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
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Grades.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            {/* Position{" "}
                      <ArrowDropDownIcon
                        sx={{
                          verticalAlign: "middle",
                        }}
                      /> */}
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Position</span>
                                <Select
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {names.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Divisions.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Section</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empsections}
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Sections.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
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
                                <span> Sub Section</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empsubSections}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangeempsubSections}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Subsections.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span>Manager Code</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={managerCode}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangemanagerCode}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {managercodes.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {managernames.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {worklocations.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
                              </Stack>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {/* <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ><span style={{
                    fontSize: "14px",
                    color: "#33333",
                    opacity: "80%",
                    fontFamily: "regular",
                  }}>
                      Selected Employees
                    </span>
                  </TableRow> */}

                        {/* {users.filter((item: any) => {

                          console.log(item, 'itemeff')
                          console.log(item.isChecked, 'ischeckeff')
                          return (
                            item.isChecked === true
                          )
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
                          if (searchName === "") {
                            return j;
                          } else if (
                            (j.employee_code !== undefined && j.employee_code
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                            (j.legal_full_name !== undefined && j.legal_full_name
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                            (j.section !== undefined && j.section
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                            (j.position_long_description !== undefined && j.position_long_description
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                            (j.grade !== undefined && j.grade
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase()))


                          ) {
                            return j
                          }
                        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                        {tempEmployees
                          .flat()
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .filter((j: any) => {
                            if (positions === "None" || positions === "") {
                              return j;
                            } else {
                              return j?.name?.position_long_description
                                .toLocaleLowerCase()
                                .includes(positions?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              employeeName === "None" ||
                              employeeName === ""
                            ) {
                              return j;
                            } else {
                              return j?.name?.legal_full_name
                                .toLocaleLowerCase()
                                .includes(employeeName?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              employeeCode === "None" ||
                              employeeCode === ""
                            ) {
                              return j;
                            } else {
                              return j?.name?.employee_code
                                .toLocaleLowerCase()
                                .includes(employeeCode?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empgrades === "None" || empgrades === "") {
                              return j;
                            } else {
                              return j?.name?.grade
                                .toLocaleLowerCase()
                                .includes(empgrades?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (empsections === "None" || empsections === "") {
                              return j;
                            } else {
                              return j?.name?.section
                                .toLocaleLowerCase()
                                .includes(empsections?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            console.log(j.isSupervisor, "superv");
                            if (sNS === "None" || sNS === "") {
                              return j;
                            }
                            if (sNS === "S") {
                              return j?.name?.isSupervisor === true;
                            } else if (sNS === "NS") {
                              return j?.name?.isSupervisor === undefined;
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empdivisions === "None" ||
                              empdivisions === ""
                            ) {
                              return j;
                            } else {
                              return j?.name?.division
                                .toLocaleLowerCase()
                                .includes(empdivisions?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            console.log(j["sub section"], "employeesection");
                            if (
                              empsubSections === "None" ||
                              empsubSections === ""
                            ) {
                              return j;
                            } else {
                              return j?.name["sub section"]
                                ?.toLocaleLowerCase()
                                .includes(empsubSections?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (managerCode === "None" || managerCode === "") {
                              return j;
                            } else {
                              return j?.name?.manager_code
                                .toLocaleLowerCase()
                                .includes(managerCode?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (managerName === "None" || managerName === "") {
                              return j;
                            } else {
                              return j?.name?.manager_name
                                .toLocaleLowerCase()
                                .includes(managerName?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              workLocation === "None" ||
                              workLocation === ""
                            ) {
                              return j;
                            } else {
                              return j?.name?.work_location
                                .toLocaleLowerCase()
                                .includes(workLocation?.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (searchName === "") {
                              return j;
                            } else if (
                              (j?.name?.employee_code !== undefined &&
                                j?.name?.employee_code
                                  .toLocaleLowerCase()
                                  .includes(searchName?.toLocaleLowerCase())) ||
                              (j?.name?.legal_full_name !== undefined &&
                                j?.name?.legal_full_name
                                  .toLocaleLowerCase()
                                  .includes(searchName?.toLocaleLowerCase())) ||
                              (j?.name?.section !== undefined &&
                                j?.name?.section
                                  .toLocaleLowerCase()
                                  .includes(searchName?.toLocaleLowerCase())) ||
                              (j?.name?.position_long_description !==
                                undefined &&
                                j?.name?.position_long_description
                                  .toLocaleLowerCase()
                                  .includes(searchName?.toLocaleLowerCase())) ||
                              (j?.name?.grade !== undefined &&
                                j?.name?.grade
                                  .toLocaleLowerCase()
                                  .includes(searchName?.toLocaleLowerCase()))
                            ) {
                              return j;
                            }
                          })
                          .map((employee: any) => {
                            console.log(employee, "employeett");
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                // key={employee.name.employee_code}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "nowrap",
                                    padding: "14px",
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
                                  }}
                                  align="left"
                                >
                                  {employee?.name?.legal_full_name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="center"
                                >
                                  {employee?.name?.isSupervisor != undefined
                                    ? "SP"
                                    : "N-SP"}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                >
                                  Sales/Non-sales
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                                  }}
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
                                  }}
                                  align="left"
                                >
                                  {employee?.name?.division}
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
                                  {employee?.name?.section}
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
                                  {employee?.name["sub section"]}
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
                                  {employee?.name?.manager_code}
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
                                  {employee?.name?.manager_name}
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
                                  {employee?.name?.work_location}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={tablecount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
            <TabPanel value={tabValues} index={1}>
              <TableContainer style={{ marginTop: "10px" }}>
                <Scroll>
                  <Scrollbar
                    style={{ width: "100%", height: "calc(100vh - 330px)" }}
                  >
                    <Table size="small" aria-label="simple table" stickyHeader>
                      <TableHead>
                        <TableRow
                          sx={{
                            "& td, & th": {
                              bgcolor: "#eaeced",
                              whiteSpace: "nowrap",
                            },
                          }}
                        >
                          {/* <TableCell align="left" sx={{ bgcolor: "#ebf2f4" }}>
                          <input
                            name="allSelect"
                            checked={
                              users &&
                              users.filter(
                                (employee: any) => employee.isChecked !== true
                              ).length < 1
                            }
                            onChange={handleOnCheck}
                            type="checkbox"
                            style={{
                              height: "17px",
                              border: "1px solid #D5D5D5",
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
                          >
                            <FormControl sx={{ m: 0,  height: "0" }}>
                              <Stack direction="row">
                                <span> Ecode</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={employeeNameOther}
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {empcodes.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            <FormControl sx={{ m: 0, width: 110, height: "0" }}>
                              <Stack direction="row">
                                <span>Employee Name</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={employeeCodeOther}
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {empnames.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            <FormControl sx={{ m: 0, height: "0" }}>
                              
                                <Stack direction="row">
                                 
                                    <span
                                      style={{
                                        whiteSpace:"pre-line"
                                      }}
                                    >
                                      Supervisory Role
                                    </span>
                                 

                                  <Select
                                    size="small"
                                    sx={{ width: "25px", fontSize: "0rem" }}
                                    disableUnderline
                                    value={sNSOther}
                                    // value={personName}
                                    // onChange={handleChanges}
                                    onChange={handleChangesNSOther}
                                    // input={<OutlinedInput label="Name" />}
                                    variant="standard"
                                    MenuProps={MenuProps}
                                  >
                                    {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key="None"
                                      value="None"
                                    >
                                      None
                                    </MenuItem>

                                    {sNSvalues.map((name) => (
                                      <MenuItem
                                     style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                        key={name}
                                        value={name}
                                      >
                                        {name}
                                      </MenuItem>
                                    ))}
                                    {/* </Scrollbar> */}
                                  </Select>
                                </Stack>
                                {/* <div>
                                  <Tooltip title="Supervisory/Non Supervisory">
                                    <IconButton>
                                      <img src={Infoicon} alt="icon" />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              */}
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    Sales
                                  </MenuItem>
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
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
                                <span> Grade</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empgradesother}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangegradesother}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Grades.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            {/* Position{" "}
                      <ArrowDropDownIcon
                        sx={{
                          verticalAlign: "middle",
                        }}
                      /> */}
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Position</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={positionsother}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangepositionother}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {names.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
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
                                <span> Division</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empdivisionsOther}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangedivisionsOther}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Divisions.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Section</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empsectionsother}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangesectionsother}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Sections.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
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
                          <TableCell
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
                                <span> Sub Section</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  value={empsubSectionsOther}
                                  // value={personName}
                                  // onChange={handleChanges}
                                  onChange={handleChangeempsubSectionsOther}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {Subsections.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {managercodes.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {managernames.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
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
                                  {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                                  <MenuItem
                                 style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    None
                                  </MenuItem>

                                  {worklocations.map((name) => (
                                    <MenuItem
                                   style={{
                                      fontSize: "14px",
                                      fontFamily: "arial",
                                      color: "#333333",
                                    }}
                                      key={name}
                                      value={name}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                  {/* </Scrollbar> */}
                                </Select>
                              </Stack>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users
                          .filter((item: any) => {
                            console.log(item, "itemeff");
                            console.log(item.isChecked, "ischeckeff");
                            return item.isChecked !== true;
                          })
                          .filter((j: any) => {
                            if (
                              employeeNameOther === "None" ||
                              employeeNameOther === ""
                            ) {
                              return j;
                            } else {
                              return j?.legal_full_name
                                ?.toLocaleLowerCase()
                                .includes(
                                  employeeNameOther?.toLocaleLowerCase()
                                );
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
                                .toLocaleLowerCase()
                                .includes(
                                  employeeCodeOther.toLocaleLowerCase()
                                );
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
                                .toLocaleLowerCase()
                                .includes(positionsother.toLocaleLowerCase());
                            }
                          })
                          .filter((j: any) => {
                            if (
                              empgradesother === "None" ||
                              empgradesother === ""
                            ) {
                              return j;
                            } else {
                              return j.grade
                                .toLocaleLowerCase()
                                .includes(empgradesother.toLocaleLowerCase());
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
                                .toLocaleLowerCase()
                                .includes(empsectionsother.toLocaleLowerCase());
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
                                .toLocaleLowerCase()
                                .includes(
                                  empdivisionsOther.toLocaleLowerCase()
                                );
                            }
                          })
                          .filter((j: any) => {
                            console.log(j["sub section"], "employeesection");
                            if (
                              empsubSectionsOther === "None" ||
                              empsubSectionsOther === ""
                            ) {
                              return j;
                            } else {
                              return j["sub section"]
                                ?.toLocaleLowerCase()
                                .includes(
                                  empsubSectionsOther.toLocaleLowerCase()
                                );
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
                                .includes(
                                  workLocationOther.toLocaleLowerCase()
                                );
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
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {/* <TableCell
                                align="left"
                              >
                                <input
                                  name={employee._id}
                                  checked={employee?.isChecked || false}
                                  onChange={handleOnCheck}
                                  type="checkbox"
                                  style={{
                                    height: "17px",
                                    border: "1px solid #D5D5D5",
                                  }}
                                />
                              </TableCell> */}
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                                    padding: "14px",
                                  }}
                                  align="left"
                                >
                                  {employee.legal_full_name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="center"
                                >
                                  {employee?.isSupervisor != undefined
                                    ? "SP"
                                    : "N-SP"}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                >
                                  Sales/ Non-Sales
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                                  }}
                                  align="left"
                                >
                                  {employee.position_long_description}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                >
                                  {employee.division}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                >
                                  {employee.section}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                >
                                  {employee["sub section"]}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                                  }}
                                  align="left"
                                >
                                  {employee.work_location}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={tablecount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TabPanel>
          </Box>
          <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
            <Dialog
              open={open}
              onClose={handleClose}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you want to make changes ? "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The checkbox will be unchecked on selecting agree.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button
                  onClick={(e) => {
                    handleAgree(e);
                  }}
                >
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
