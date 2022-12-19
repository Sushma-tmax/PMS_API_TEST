import * as React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TablePagination,
  Tooltip,
} from "@mui/material";

import {
  useAddEmpolyeAppraisalCalenderMutation,
  useCreatePositionTemplateMutation,
  useGetEmployeeQuery,
} from "../../service/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import _ from "lodash";
import InputAdornment from "@mui/material/InputAdornment";
import Searchicon from "../../assets/Images/Searchicon.svg";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
import { Grade } from "@mui/icons-material";
import Infoicon from "../appraisal/components/Icons/Infoicon.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { MAPPED_TEMPLATE_3 } from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import * as XLSX from 'xlsx';
import Newexcel from "./icons/Newexcel.svg"
const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  // marginTop: "8px",
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

const Position = (props: any) => {
  const { tab, setTabs, checkedTemplatesID, setnavPrompt, navPrompt } = props;
  console.log(checkedTemplatesID, 'iddddddddddddd')
  const { data, isLoading, error } = useGetEmployeeQuery("all");
  console.log(data, "dataaaaaa");
  const { id } = useParams();
  const [employee, setEmployee] = React.useState("");
  const [users, setUsers] = useState<any>([]);
  const [userId, setUserId] = useState<any>([])
  const [usersChecked, setUsersChecked] = useState<any>([])
  const [filteredTrue, setFilteredTrue] = useState<any>(false)
  const [templateData, setTemplateData] = useState<any>([]);
  const [errors, setErrors] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [saveAlert, setSaveAlert] = useState(false)
  const navigate = useNavigate();
  const [show, setShow] = React.useState<any>(0);
  //sorting
  const [employeeName, setemployeeName] = React.useState("");
  // console.log(employeeName, "position");
  const handleChangeemployeeName = (event: SelectChangeEvent) => {
    setemployeeName(event.target.value);
  };
  const [employeeCode, setemployeeCode] = React.useState("");
  // console.log(employeeCode, "employeeCode");
  const handleChangeemployeeCode = (event: SelectChangeEvent) => {
    setemployeeCode(event.target.value);
  };
  const [positions, setPositions] = React.useState("");
  // console.log(positions, "position");
  const handleChangeposition = (event: SelectChangeEvent) => {
    setPositions(event.target.value);
  };
  const [showCheck, setShowCheck] = useState<any>(false);
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
  const [empsections, setempsections] = React.useState("");
  // console.log(empsections, "position");
  const handleChangesections = (event: SelectChangeEvent) => {
    setempsections(event.target.value);
  };
  const [sNS, setsNS] = React.useState("");
  // console.log(sNS, "sNS");
  const handleChangesNS = (event: SelectChangeEvent) => {
    setsNS(event.target.value);
  };
  const [functionData, setfunctionData] = React.useState("");
  // console.log(functionData, "functionData");
  const handleChangefunctionData = (event: SelectChangeEvent) => {
    setfunctionData(event.target.value);
  };
  const [empsubSections, setempsubSections] = React.useState("");
  // console.log(empsubSections, "empsubSections");
  const handleChangeempsubSections = (event: SelectChangeEvent) => {
    setempsubSections(event.target.value);
  };
  const [managerName, setmanagerName] = React.useState("");
  // console.log(managerName, "managerName");
  const handleChangemanagerName = (event: SelectChangeEvent) => {
    setmanagerName(event.target.value);
  };
  const [managerCode, setmanagerCode] = React.useState("");
  // console.log(managerCode, "managerCode");
  const handleChangemanagerCode = (event: SelectChangeEvent) => {
    setmanagerCode(event.target.value);
  };
  const [workLocation, setworkLocation] = React.useState("");
  // console.log(workLocation, "workLocation");
  const handleChangeworkLocation = (event: SelectChangeEvent) => {
    setworkLocation(event.target.value);
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
    "Ahmed J. S. Abdaljawad",
    "Haytham M. M. Alkurdi",
    "Lydiane Kemzeu Dongmo",
    "Yousef Said Sharabati",
  ];
  const empcodes = ["1008", "1007", "1003", "1005", "1006", "1001", "1002"];

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

  //populating filter dropdown
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [divisionArray, setdivisionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [subSectionArray, setsubSectionArray] = React.useState<any>([]);
  const [managerCodeArray, setmanagerCodeArray] = React.useState<any>([]);
  const [managerNameArray, setmanagerNameArray] = React.useState<any>([]);
  const [workLocationArray, setworkLocationArray] = React.useState<any>([]);

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
    // console.log(gradeContents, "contents");
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
        return a?.["sub section"]?.localeCompare(b?.["sub section"]);
      })
      .map((i: any) => {
        return i["sub section"];
      });
    const subSectionContents = subSection.filter((c: any, index: any) => {
      return subSection.indexOf(c) === index && c != null && c != undefined;
    });
    setsubSectionArray(subSectionContents);
    // console.log(subSectionContents, "contents");

    const managerCode = users.map((i: any) => {
      return i.manager_code;
    });
    const managerCodeContents = managerCode.filter((c: any, index: any) => {
      return managerCode.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerCodeArray(managerCodeContents);
    // console.log(managerCodeContents, "contents");

    const managerName = users.map((i: any) => {
      return i.manager_name;
    });
    const managerNameContents = managerName.filter((c: any, index: any) => {
      return managerName.indexOf(c) === index && c != null && c != undefined;
    });
    setmanagerNameArray(managerNameContents);
    // console.log(managerNameContents, "contents");

    const workLocation = users.map((i: any) => {
      return i.work_location;
    });
    const workLocationContents = workLocation.filter((c: any, index: any) => {
      return workLocation.indexOf(c) === index && c != null && c != undefined;
    });
    setworkLocationArray(workLocationContents);
    // console.log(workLocationContents, "contents");
  }, [users]);
  //populating filter dropdown

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
    "Corp Support - Admin",
    "Corp Support - CI, IT  &  BA",
    "Corp Support - HR",
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
  const Subsections = ["Installation", "Service", "SMEs"];
  const sNSvalues = [, "N-SP", "S"];
  const managercodes = ["918", "1080", "1113", "1119", "1351", "1650"];
  const managernames = [
    "Bassam Walid Moussa",
    "John Jerick Aguila",
    "Nasser Hussein Darwish Al-Derbashi",
    "Yaseen Mohammed Mohsen",
  ];
  const worklocations = ["ALN WH", "AJM WS", "GHD"];
  //sorting

  // const [createPosition, { isSuccess: isSuccessPosition }] =
  //   useCreatePositionTemplateMutation();

  const [createPosition, { isSuccess: isSuccessPosition }] = useAddEmpolyeAppraisalCalenderMutation()
  // const onSubmitP = (data: any) => {
  //   createPosition(
  //     {
  //       position: data.position,
  //       id
  //     }
  //   )
  // }
  const [templateid, settemplateid] = React.useState("");
  const [templateidReady, settemplateidReady] = React.useState(false);
  // console.log(templateid, "templateid");
  const onSubmitP = (data: any) => {

    checkedTemplatesID.forEach((element: any) => {
      console.log(data, element.name, "elementname");
      settemplateid(element.name);
      createPosition({
        employee: data.position,
        id: element.name,
      }).then((data: any) => console.log(data));
    });
  };
  // dialog navigation
  useEffect(() => {
    if (templateidReady === true) {
      navigate(`${MAPPED_TEMPLATE_3}/${templateid}`);
    }
  }, [templateidReady]);
  // dialog navigation

  const [save1, setSave1] = useState(isSuccessPosition);

  // const { data: singleTemplateData, isLoading: load } = useGetSingleTemplateQuery(id)

  // console.log(users, "checked user");

  // useEffect(() => {
  //   if (singleTemplateData) {
  //     setTemplateData(() => {
  //       return singleTemplateData.template.position.map((item: any) => {

  //           return {
  //             ...item.name,
  //             isChecked: item.isChecked,
  //           };

  //       });
  //     });
  //   }
  // }, [data, singleTemplateData]);

  useEffect(() => {
    // console.log("useeffect run");

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
    // console.log("useeffect run");
    if (data) {
      setUsers(data.data);
    }
  }, [data]);


  // const Tabler = (e: any) =>{
  //   setnavPrompt(true);
  //   const { name, checked } = e.target;
  //   if (name === "allSelect") {
  //     const tempUser = users.map((employee: any) => {
  //       return { ...employee, isChecked: checked };
  //     });
  //     setUsers(tempUser);
  //   }else {
  //     const tempUser = users.map((employee: any) => {
  //       return employee._id === name
  //         ? { ...employee, isChecked: checked }
  //         : employee;
  //     });
  //     setUsers(tempUser);
  //     console.log(tempUser, "temp");

  //   }
  // }


  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;   
    let filteredUsersID = users
      .filter((j: any) => {
        if (employeeName === "None" || employeeName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeName?.toLocaleLowerCase());
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
        }
      })
      .map((j: any) => j.employee_code);
    setnavPrompt(true);
    if (name === "allSelect") {
      const tempUser = users.map((employee: any) => {              
        return filteredUsersID.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });         
      let temp4 = tempUser.filter((i:any) => i.isChecked === true);
      if (temp4.length > 0) {
        setFilteredTrue(true)
      } else {
        setFilteredTrue(false)
      }
      setUsersChecked(temp4);
      setUsers(tempUser);
    } else {
      const tempUser = users.map((employee: any) => {       
        return employee._id === name
        // return filteredUsersID.includes(employee.employee_code)
          ? { ...employee, isChecked: checked }
          : employee;
      });
      // let temp4 = tempUser.filter((i:any) => i.isChecked === true);
      // let temp5 = tempUser.filter((i:any) => i.isChecked === true);
      // if (temp5.length > 0) {
      //   setFilteredTrue(true)
      // } else {
      //   setFilteredTrue(false)
      // }
      // setUsersChecked(temp5);
      setUsers(tempUser);
    }
  };
  // console.log(employee, "temp");


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

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)));
  }, [users]);

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
    // if (f= ""){
    setRowsPerPage(+event.target.value);

    setPage(0);
    // }

  };

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };

  const selectOneError = (i: any) => {
    if (i && i.length === 0) {
      setErrors(true);
      setSave1(false);
      setHideAlert(true);
      hideAlertHandler();
    } else if (i && i.length > 0) {
      setErrors(false);
      setSave1(true);
      setHideAlert(true);
      hideAlertHandler();
      setnavPrompt(false);
      // setTabs(tab + 1);
      // console.log(error, "save");
    } else {
      setSave1(false);
    }
    // console.log(i, "setSelectedUser");
  };

  // useEffect(() => {
  //   if (isSuccessPosition) {
  //     setHideAlert(true)
  //     hideAlertHandler()
  //   }
  // }, [isSuccessPosition])

  // console.log()

  useEffect(() => {
    if (checkedTemplatesID?.length === 0) {
      setShowCheck(true);
    } else {
      setShowCheck(false);
    }
  }, [checkedTemplatesID]);
  //dialog
  const [open1, setOpen1] = React.useState(false);
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen1 = () => {
    // @ts-ignore
    if (checkedTemplatesID?.length > 0 && checkboxIdHandler(checkboxHandler(users)).length > 0) {
      setOpen1(true);
    } else {
      setOpen1(false);
      setSaveAlert(true);
      setTimeout(() => {
        setSaveAlert(false);
      }, 3000);
    }
  };

  //filtering function
  useEffect(() => {
    const Normalizerdata = users
      ?.filter((j: any) => {
        if (positions === "None" || positions === "Grade" || positions === "") {
          return j;
        } else {
          return j?.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
        }
      })
      ?.filter((j: any) => {
        if (employeeName === "None" || employeeName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeName?.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(employeeCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.grade
            .toLocaleLowerCase()
            .includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return j?.division
            .toLocaleLowerCase()
            .includes(empdivisions.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "S") {
          return j?.isSupervisor === true;
        } else if (sNS === "NS") {
          return j?.isSupervisor === undefined;
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j?.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
        //  sushma 6/28 (filter for position search bar)
      })
      .filter((j: any) => {
        // console.log(j["sub section"], "employeesection");
        if (empsubSections === "None" || empsubSections === "") {
          return j;
        } else {
          return j["sub section"]
            ?.toLocaleLowerCase()
            .includes(empsubSections.toLocaleLowerCase());
        }
      })

      .map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")

        return {
          EmployeeCode: j.employee_code,
          EmployeeName: j.legal_full_name,

          // emp.manager_code ==  j.employee_code,
          supervisoryRole: j.isSupervisor != undefined
            ? "SP"
            : "N-SP",
          Position: j.position_long_description,
          Grade: j.grade,
          // PendingAction : getPAStatus(j),
          RoleCategory: j?.feedback_questionnaire,
          Function: j?.attachments,
          Division: j.division,
          Section: j.section,
          SubSection: j["sub section"],
        }

      })
    setOpen5(Normalizerdata)
    console.log(open5, "open5")
    console.log(Normalizerdata, "Normalizerdata")
  }, [positions, employeeName, employeeCode, empgrades, empdivisions, sNS, empsections, empsubSections])


  const [open2, setOpen2] = React.useState<any>([]);
  const [open3, setOpen3] = React.useState<any>([]);
  const [open4, setOpen4] = React.useState<any>([]);
  const [open5, setOpen5] = React.useState<any>([]);

  console.log(open2, "open2");
  // useEffect(()=>{
  //   const h =Normalizerdata

  //   console.log(open5,"open5")
  //   setOpen5(Normalizerdata)
  //   console.log(h,"kkkk")
  //   return h;
  // },[positions,employeeName,employeeCode,empgrades,empdivisions,sNS,empsections,empsubSections])
  useEffect(() => {
    const g = users?.filter((j: any) => {
      if (positions === "None" || positions === "Grade" || positions === "") {
        return j;
      } else {
        return j?.position_long_description
          .toLocaleLowerCase()
          .includes(positions.toLocaleLowerCase());
      }
    })

      .filter((j: any) => {
        if (employeeName === "None" || employeeName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeName?.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(employeeCode?.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empgrades === "None" || empgrades === "") {
          return j;
        } else {
          return j?.grade
            .toLocaleLowerCase()
            .includes(empgrades.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (empdivisions === "None" || empdivisions === "") {
          return j;
        } else {
          return j?.division
            .toLocaleLowerCase()
            .includes(empdivisions.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        // console.log(j.isSupervisor, "superv");
        if (sNS === "None" || sNS === "") {
          return j;
        }
        if (sNS === "S") {
          return j?.isSupervisor === true;
        } else if (sNS === "NS") {
          return j?.isSupervisor === undefined;
        }
      })
      .filter((j: any) => {
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j?.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
        //  sushma 6/28 (filter for position search bar)
      })
      .filter((j: any) => {
        // console.log(j["sub section"], "employeesection");
        if (empsubSections === "None" || empsubSections === "") {
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
          return j?.manager_code
            .toLocaleLowerCase()
            .includes(managerCode.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (managerName === "None" || managerName === "") {
          return j;
        } else {
          return j?.manager_name
            .toLocaleLowerCase()
            .includes(managerName.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (workLocation === "None" || workLocation === "") {
          return j;
        } else {
          return j?.work_location
            .toLocaleLowerCase()
            .includes(workLocation.toLocaleLowerCase());
        }
      })
      .filter((j: any) => {
        if (searchName === "") {
          return j;
        } else if (
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j["sub section"] !== undefined &&
            j["sub section"]
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.manager_code !== undefined &&
            j.manager_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.manager_name !== undefined &&
            j.manager_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.work_location !== undefined &&
            j.work_location
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.isSupervisor !== undefined
            ? "S".toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
            : "NS"
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.division !== undefined &&
            j.division
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          // setPage(0)
          return j;
        }
        // console.log(j, "jlength");
      });
    // console.log(open4,"open4");
    // console.log(g?.length, "gggggg");
    console.log(g, "hhhh");
    // setOpen2(true);
    // console.log(open4,"open4");
    setOpen2(g?.length)
    setOpen4(g)
    //  console.log(g,"iiiiii")
    // settableLength(f.length)

    return g;
    // setPage(0)
  }, [users, employeeCode, positions, empsubSections, empsections, employeeName, sNS, empdivisions, empgrades])
  const [icon, setIcon] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
  const [icon3, setIcon3] = React.useState<any>([]);
  const [icon4, setIcon4] = React.useState<any>([]);
  const [icon5, setIcon5] = React.useState<any>([]);
  const [icon6, setIcon6] = React.useState<any>([]);
  const [icon7, setIcon7] = React.useState<any>([]);
  const [icon8, setIcon8] = React.useState<any>([]);
  useEffect(() => {
    if (employeeCode === "None" || employeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }
  }, [employeeCode])
  useEffect(() => {
    if (employeeName === "None" || employeeName === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }
  }, [employeeName])
  useEffect(() => {
    {
      if (positions === "None" || positions === "Grade" || positions === "") {
        setIcon2(false);
      } else {
        setIcon2(true);
      }
    }
  }, [positions])
  useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }
  }, [empgrades])
  useEffect(() => {
    if (empdivisions === "None" || empdivisions === "") {
      setIcon4(false);
    } else {
      setIcon4(true);
    }
  }, [empdivisions])
  useEffect(() => {
    if (sNS === "None" || sNS === "") {
      setIcon5(false);
    } else {
      setIcon5(true);
    }
  }, [sNS])
  useEffect(() => {
    if (empsections === "None" || empsections === "") {
      setIcon6(false);
    } else {
      setIcon6(true);
    }
  }, [empsections])
  useEffect(() => {
    if (empsubSections === "None" || empsubSections === "") {
      setIcon7(false);
    } else {
      setIcon7(true);
    }
  }, [empsubSections])
  useEffect(() => {
    if (functionData === "None" || functionData === "") {
      setIcon8(false);
    } else {
      setIcon8(true);
    }
  }, [empsubSections])
  const filterHandler = () => {
    // setRowsPerPage(true);

    const f = users

      .filter((j: any) => {
        if (positions === "None" || positions === "Grade" || positions === "") {
          return j;
        } else {
          return j.position_long_description
            .toLocaleLowerCase()
            .includes(positions.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        if (employeeName === "None" || employeeName === "") {
          return j;
        } else {
          return j?.legal_full_name
            ?.toLocaleLowerCase()
            .includes(employeeName?.toLocaleLowerCase());
        }
      })

      .filter((j: any) => {
        if (employeeCode === "None" || employeeCode === "") {
          return j;
        } else {
          return j?.employee_code
            ?.toLocaleLowerCase()
            .includes(employeeCode?.toLocaleLowerCase());
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
        // console.log(j.isSupervisor, "superv");
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
        if (empsections === "None" || empsections === "") {
          return j;
        } else {
          return j.section
            .toLocaleLowerCase()
            .includes(empsections.toLocaleLowerCase());
        }
        //  sushma 6/28 (filter for position search bar)
      })
      .filter((j: any) => {
        // console.log(j["sub section"], "employeesection");
        if (empsubSections === "None" || empsubSections === "") {
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
          (j.grade !== undefined &&
            j.grade
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.employee_code !== undefined &&
            j.employee_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.legal_full_name !== undefined &&
            j.legal_full_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j["sub section"] !== undefined &&
            j["sub section"]
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.manager_code !== undefined &&
            j.manager_code
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.manager_name !== undefined &&
            j.manager_name
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.work_location !== undefined &&
            j.work_location
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.isSupervisor !== undefined
            ? "S".toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
            : "NS"
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.position_long_description !== undefined &&
            j.position_long_description
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.division !== undefined &&
            j.division
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase())) ||
          (j.section !== undefined &&
            j.section
              .toLocaleLowerCase()
              .includes(searchName.toLocaleLowerCase()))
        ) {
          // setPage(0)
          return j;
        }
        console.log(j, "jlength");
      });
    console.log(open2, "open2");
    console.log(f?.length, "ffffffff");
    // setOpen2(true);
    //  setOpen2(f?.length)

    // settableLength(f.length)

    return f;
    // setPage(0)

    // setOpen3(  <FilterAltTwoToneIcon />)
  };
  // setOpen2(f.length)
  useEffect(() => {
    // setOpen2(f?.length);
  }, [users])

  useEffect(() => {
    setPage(0);
  }, [searchName]);

  //filtering function
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // console.log(open2,"ggggg")
  console.log(show, 'show')
  // setShow(handleOnCheck)
  const handleExport = () => {
    // setShow(0);
    // console.log(users, 'excel')
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(open5);

    XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');

    XLSX.writeFile(wb, 'MyExcel.xlsx');
  }

  // console.log(Normalizerdata,"data")
  return (
    <>
      {hideAlert && errors && (
        <Alert severity="error">Select atleast 1 Position!</Alert>
      )}
      {hideAlert && save1 && (
        <Alert severity="info">Changes/mapping is saved successfully</Alert>
      )}
      {saveAlert && (
        <Alert severity="error">Select atleast 1 Template and 1 Position!</Alert>
      )}
      <div>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span
            style={{
              float: "left",
              fontSize: "18px",
              fontFamily: "Arial",
              color: "#3e8cb5",
            }}
          >
            Employee List
          </span>
          <Stack direction="row" spacing={2}>
            {" "}
            <Searchfeild>
              <TextField
                id="outlined-basic"
                autoComplete="off"
                // value={"Search Here"}
                placeholder="Search Here..."
                // value={setsearchTerm}
                onChange={(e: any) => setSearchName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Searchicon} alt="icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Searchfeild>
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
              // onClick={() => {
              //   selectOneError(checkboxIdHandler(checkboxHandler(users)));
              //   onSubmitP({
              //     position: checkboxIdHandler(checkboxHandler(users)),
              //   });
              // }}
              onClick={handleOpen1}
            >
              Save
            </Button>
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
              onClick={handleExport}
            />
          </Stack>
        </Stack>
        <Dialog
          // open={isAlertOpen}
          // onClose={handleAlertClose}
          // BackdropProps={{
          //   style: { background: "#333333 !important", opacity: "1%" },
          // }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin:"0px",
              padding:"30px",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            },
          }}
          open={open1}
          onClose={handleClose1}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton >
              <img src={Closeicon} alt="icon" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-all",
                //height: "100px",
                alignItems: "center",
              }}
            >
              Would you like to remove selected employee(s) to the template?
            </DialogContentText>
          </DialogContent>
          <div style={{ alignItems: "center", paddingBottom: "30px" }}>
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
                  color: "#3e8cb5",
                  fontFamily: "Arial",
                  borderColor: "#3e8cb5",
                  marginRight: "10px",
                }}
                variant="outlined"
                autoFocus
                // onClick={handleClose1}
                onClick={() => {
                  selectOneError(checkboxIdHandler(checkboxHandler(users)));
                  onSubmitP({
                    position: checkboxIdHandler(checkboxHandler(users)),
                  });
                  handleClose1();
                  settemplateidReady(true);
                  // navigate(`${ MAPPED_TEMPLATE_3}/${templateid}`);
                  // navigate(`${MAPPED_TEMPLATE_3}/${checkboxData[0]?._id}`);
                }}
              >
                Yes
              </Button>

              <Button
                style={{
                  textTransform: "none",
                  color: "#3e8cb5",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3e8cb5",
                  marginRight: "10px",
                }}
                variant="outlined"
                onClick={handleClose1}
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <div style={{}}>
          {/*  {(errors) && (<Alert severity="error">Select atleast 1 Other Recommendation!</Alert>)}
        {(hideAlert && save1) &&
          // (<Alert severity="info">Positions Added</Alert>)
          <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#71bf74", backgroundColor: " #eff8ef" }}>
            <p>Position is added to the template successfully</p>
          </Box>
        }
        */}

          {/* Removed to Headings. Added pagination
                Meenakshi 27/06
              */}

          {/*<FormControl variant="standard" sx={{m: 1, minWidth: 100}}>*/}
          {/*    <InputLabel htmlFor="input-with-icon-adornment">*/}
          {/*        Search Here*/}
          {/*    </InputLabel>*/}
          {/*    <Input*/}
          {/*        id="input-with-icon-adornment"*/}
          {/*        endAdornment={*/}
          {/*            <InputAdornment position="end">*/}
          {/*                <SearchIcon/>*/}
          {/*            </InputAdornment>*/}
          {/*        }*/}
          {/*    />*/}
          {/*</FormControl>*/}
        </div>

        <div>
          {isLoading ? (
            <p> Loading</p>
          ) : (
            <>
              <>
                <TableContainer
                  sx={{
                    marginTop: "10px",
                    height: "calc(100vh - 274px)",
                    // overflow: 'hidden'
                  }}
                // sx={{
                //  height:"300px",
                //  overflow: "hidden",
                // }}
                >
                  <Table
                    stickyHeader
                    sx={{
                      minWidth: 400,
                    }}
                    size="small"
                    aria-label="simple table"
                  >
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
                        <TableCell
                          align="center"
                          style={{
                            color: "#368DC5",
                          }}
                        // sx={{ padding: 1 }}
                        >
                          <input
                            name="allSelect"
                            // checked={
                            //   users &&
                            //   users
                            //     .filter(
                            //       (employee: any) => employee.isChecked !== true
                            //     ).length < 1
                            // }                                                                             
                            checked={
                             filteredTrue ? (usersChecked.filter(
                                    (employee: any) => employee.isChecked !== true
                                  ).length < 1)
                                  :
                                  (users
                                .filter(
                                  (employee: any) => employee.isChecked !== true
                                ).length < 1)
                            }                                                                             
                            onChange={handleOnCheck}
                            type="checkbox"
                            style={{ height: "18px", width: "18px" }}
                          />
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
                          <FormControl sx={{ m: 0, height: "0" }}>
                            <Stack direction="row">
                              <span
                              > ECode</span>
                              <Select
                                size="small"
                                sx={{ width: "25px", fontSize: "0rem" }}
                                disableUnderline
                                value={employeeCode}
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangeemployeeCode}
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

                                {/* {empcodes.map((name) => (
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
                                ))} */}
                                {users
                                  .slice()
                                  .sort(function (a: any, b: any) {
                                    return a.employee_code - b.employee_code;
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
                              {icon && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          width={300}
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          <FormControl sx={{ m: 0, width: 120, height: "0" }}>
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

                                {/* {empnames.map((name) => (
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
                                ))} */}
                                {users
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.legal_full_name?.localeCompare(b?.legal_full_name);
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
                              {icon1 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {/* S/NS <Tooltip title="Supervisory/Non Supervisory">
                          <IconButton
                          >
                            <img src={Infoicon} alt="icon" />
                          </IconButton>
                        </Tooltip> */}
                          <FormControl sx={{ m: 0, height: "0", width: 130 }}>

                            <Stack direction="row">

                              <span
                                style={{

                                  whiteSpace: "pre-line"
                                }}
                              >
                                {/* S/NS */}
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
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {sNSvalues
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.isSupervisor?.localeCompare(b?.isSupervisor);
                                  })
                                  .map((name) => (
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
                                {/* </Scrollbar> */}
                              </Select>
                              {icon5 && (
                                <FilterAltTwoToneIcon />)}
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
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
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
                                </MenuItem>
                                {/* 
                                {Sections.map((name) => (
                                  <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                              </Select>
                              {icon8 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          {/* <form> 
                          <select
                          
                            style={{                              
                              fontWeight: "100",
                              fontFamily: "regular",
                              fontSize: "14px",
                              color: "#004C75",
                              border: "none",
                              background: "none",
                              // margin:"-5px"
                            }}
                            value={empgrades}
                            onChange={handleChangegrades}
                          > 
                          <option  value="Grade">
                          Grade
                        </option>
                          <option  value="None">
                          None
                        </option>

                        {Grades.map((name) => (
                          <option value={name}>
                            {name}
                          </option>
                        ))}
                          </select> */}
                          {/* {/* </form> */}
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
                                {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
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

                                {/* {Grades.map((name) => (
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
                                ))} */}
                                {gradesArray
                                  // .slice()
                                  // ?.sort(function (a: any, b: any) {
                                  //   return a?.grade?.localeCompare(b?.grade);
                                  //          })
                                  .map((name: any) => (
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
                                {/* </Scrollbar> */}
                              </Select>
                              {icon3 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
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
                                // value={personName}
                                // onChange={handleChanges}
                                onChange={handleChangeposition}
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
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {positionArray
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.position_long_description?.localeCompare(b?.position_long_description);
                                  })
                                  .map((name: any) => (
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
                                {/* </Scrollbar> */}
                              </Select>
                              {icon2 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
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
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {divisionArray
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.name?.localeCompare(b?.name);
                                  })
                                  .map((name: any) => (
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

                                {/* </Scrollbar> */}
                              </Select>
                              {icon4 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
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
                                {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
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

                                {sectionArray
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.section?.localeCompare(b?.section);
                                  })
                                  .map((name: any) => (
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
                                {/* </Scrollbar> */}
                              </Select>
                              {icon6 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
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
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  key="None"
                                  value="None"
                                >
                                  None
                                </MenuItem>

                                {subSectionArray
                                  .slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a?.["sub section"]?.localeCompare(b?.["sub section"]);
                                  })
                                  .map((name: any) => (
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
                                {/* </Scrollbar> */}
                              </Select>
                              {icon7 && (
                                <FilterAltTwoToneIcon />)}
                            </Stack>
                          </FormControl>
                        </TableCell>
                        {/* <TableCell
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
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
                        {/* <MenuItem
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
                                ))} */}
                        {/* </Scrollbar> */}
                        {/* </Select>
                            </Stack>
                          </FormControl>
                        </TableCell>  */}
                        {/* <TableCell
                      align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          <FormControl sx={{ m: 0, width: 120, height: "0" }}>
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
                              > */}
                        {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                        {/* <MenuItem
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
                                ))} */}
                        {/* </Scrollbar> */}
                        {/* </Select>
                            </Stack>
                          </FormControl>
                        </TableCell> */}
                        {/* <TableCell
                         align="center"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        > */}
                        {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
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
                              > */}
                        {/* <Scrollbar
                                style={{
                                  height: "120px", overflowY: "hidden",
                                  float: "left",
                                }}
                              > */}
                        {/* <MenuItem
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
                                ))} */}
                        {/* </Scrollbar> */}
                        {/* </Select>
                            </Stack>
                          </FormControl>
                        </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {users

                      .filter((j: any) => {
                        if (
                          positions === "None" ||
                          positions === "Grade" ||
                          positions === ""
                        ) {
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
                        if (empdivisions === "None" || empdivisions === "") {
                          return j;
                        } else {
                          return j.division
                            .toLocaleLowerCase()
                            .includes(empdivisions.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        console.log(j.isSupervisor, 'superv')
                        if (sNS === "None" || sNS === "") {
                          return j;
                        }
                        if (sNS === 'S') {
                          return j.isSupervisor === true
                        } else if (sNS === 'NS') {
                          return j.isSupervisor === undefined
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
                        //  sushma 6/28 (filter for position search bar)
                      })
                      .filter((j: any) => {
                        console.log(j["sub section"], "employeesection");
                        if (empsubSections === "None" || empsubSections === "") {
                          return j;
                        } else {
                          return j["sub section"]?.toLocaleLowerCase()
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
                          (j["sub section"] !== undefined &&
                            j["sub section"]
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j.manager_code !== undefined &&
                            j.manager_code
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j.manager_name !== undefined &&
                            j.manager_name
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase())) ||
                          (j.work_location !== undefined &&
                            j.work_location
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase()))
                        ) {
                          return j;

                        }
                        console.log(j.length, 'jlength')
                      }) */}

                      {users &&
                        filterHandler()
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                            // console.log(page, "pages")
                          )

                          .map(
                            (employee: any, index: number, arrayRef: any) => {
                              // console.log(arrayRef.length, "employeel");
                              // console.log(index.length, "employee2");
                              // console.log(employee.length, "employee3");
                              return (
                                //   {data.data.map((employee: any) => (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  // key={employee.employee_code}
                                  key={employee._id}
                                >
                                  <TableCell
                                    align="left"
                                    style={{ color: "#368DC5" }}
                                    padding="checkbox"
                                  >
                                    <input
                                      name={employee._id}
                                      checked={
                                        showCheck === true
                                          ? false
                                          : employee?.isChecked || false
                                      }
                                      onChange={handleOnCheck}
                                      type="checkbox"
                                      style={{
                                        height: "18px",
                                        width: "18px",
                                        borderColor: "#D5D5D5",
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="center"
                                  >
                                    {employee.employee_code}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "14px",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    {employee.legal_full_name}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "14px",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="center"
                                  >
                                    {employee.isSupervisor != undefined
                                      ? "SP"
                                      : "N-SP"}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    Sales/Non-sales
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="center"
                                  >
                                    {employee.grade}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    {employee.position_long_description}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    {employee.division}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    {employee.section}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      whiteSpace: "nowrap",
                                    }}
                                    align="left"
                                  >
                                    {employee["sub section"]}
                                  </TableCell>
                                  {/* <TableCell
                                    style={{
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
                                    style={{
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
                                    style={{
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
                            }
                          )}
                    </TableBody>
                  </Table>
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
                  count={open2}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            </>
          )}
        </div>
        {/* <div
        style={{ display: "flex", justifyContent: "left", }}
      >
        <Button
          style={{
            textTransform: "none",
            backgroundColor: "#014D76",
            fontSize: "16px",
            fontFamily: "sans-serif",
            padding: "4px 19px",
          }}
          variant="contained"
          onClick={() => {
            selectOneError(checkboxIdHandler(checkboxHandler(users)));
            onSubmitP({
              position: checkboxIdHandler(checkboxHandler(users)),
            });

          }}
        >
          Save as Draft
        </Button>
      </div> */}
      </div>
    </>
  );
};

export default Position;
