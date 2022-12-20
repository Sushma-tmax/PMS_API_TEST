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
  VIEW_MAPPED_TEMPLATE,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  useCreatePositionTemplateMutation,
  useGetEmployeeQuery,
  useGetSingleTemplateQuery,
  useGetAppraisalCalenderQuery,
  useGetEmployeeUnmappedQuery,
  useGetCalenderQuery,
  useAddEmpolyeAppraisalCalenderMutation,

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
import Closeicon from "../../assets/Images/Closeicon.svg";
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import * as XLSX from 'xlsx';
import Newexcel from "./icons/Newexcel.svg"

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C7C7C7 !important",
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

export default function ViewMappedPositions(props: any) {
  const { ViewTemplateData, onDelete, checkedTemplatesID, name, setnavPrompt, refetch, MappedTemplates, calendarId, templateId, year, displayEdit } =
    props;
  console.log(setnavPrompt, "setnavPrompt");
  const { data, isLoading, error } = useGetEmployeeQuery("all");
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


  //Appraisal calendar


  const [activeAppId, setActiveAppId] = useState<any>([]);
  const [activeTemplate, setactiveTemplate] = useState<any>([]);
  const [unmappedEmpDatum, setunmappedEmpDatum] = useState<any>([]);
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

    let employeesMapp = MappedTemplates?.filter((i: any) => {
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
      .filter((j: any) => {
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
        if (sNS === "S") {
          return j?.name?.isSupervisor === true;
        } else if (sNS === "NS") {
          return j?.name?.isSupervisor === undefined;
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
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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
          return j.isSupervisor === undefined;
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
          return j.isSupervisor === undefined;
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
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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
        }
      })
      .map((j: any) => j.employee_code);

    let filteredUsersID = users
      // .filter((item: any) => {
      //   return item.isChecked === true;
      // })
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
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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
  const [sNS, setsNS] = React.useState("");
  //console.log(sNS, "sNS");
  const handleChangesNS = (event: SelectChangeEvent) => {
    setsNS(event.target.value);
  };
  const [sNSOther, setsNSOther] = React.useState("");
  //console.log(sNSOther, "sNSOther");
  const handleChangesNSOther = (event: SelectChangeEvent) => {
    setsNSOther(event.target.value);
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
  const [functionData, setfunctionData] = React.useState("");
  //console.log(functionData, "functionData");
  const handleChangefunctionData = (event: SelectChangeEvent) => {
    setfunctionData(event.target.value);
  };
  const [roleCategory, setRoleCategory] = React.useState("");
  const handleChangeRoleCategory = (event: SelectChangeEvent) => {
    setRoleCategory(event.target.value);
  };
  const [roleCategoryOther, setRoleCategoryOther] = React.useState("");
  const handleChangeRoleCategoryOther = (event: SelectChangeEvent) => {
    setRoleCategoryOther(event.target.value);
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
  //states for filtering
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
  const sNSvalues = ["SP", "N-SP"];
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
  const [divisionArray, setdivisionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  const [subSectionArray, setsubSectionArray] = React.useState<any>([]);
  const [managerCodeArray, setmanagerCodeArray] = React.useState<any>([]);
  const [managerNameArray, setmanagerNameArray] = React.useState<any>([]);
  const [workLocationArray, setworkLocationArray] = React.useState<any>([]);

  useEffect(() => {
    const grades = activeTemplate
      ?.slice()

      ?.sort(function (a: any, b: any) {

        return a?.name?.grade - b?.name?.grade;

      })
      .filter((item: any) => {
        return item.isChecked === true;
      })
      .map((i: any) => {
        return i?.name?.grade;
      });
    const gradeContents = grades?.filter((c: any, index: any) => {
      return grades?.indexOf(c) === index && c != null && c != undefined;
    });
    setgradesArray(gradeContents);
    //console.log(gradeContents, "contents");
    const position = activeTemplate
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
    const positionContents = position?.filter((c: any, index: any) => {
      return position?.indexOf(c) === index && c != null && c != undefined;
    });
    setpositionArray(positionContents);
    //console.log(positionContents, "contents");

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
    const sectionContents = section?.filter((c: any, index: any) => {
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
  }, [users]);
  //populating filter dropdown

  //populating filter dropdown-UNMAPPED EMP
  const [gradesArrayU, setgradesArrayU] = React.useState<any>([]);
  const [positionArrayU, setpositionArrayU] = React.useState<any>([]);
  const [divisionArrayU, setdivisionArrayU] = React.useState<any>([]);
  const [sectionArrayU, setsectionArrayU] = React.useState<any>([]);
  const [subSectionArrayU, setsubSectionArrayU] = React.useState<any>([]);
  const [managerCodeArrayU, setmanagerCodeArrayU] = React.useState<any>([]);
  const [managerNameArrayU, setmanagerNameArrayU] = React.useState<any>([]);
  const [workLocationArrayU, setworkLocationArrayU] = React.useState<any>([]);

  useEffect(() => {
    const grades = unmappedEmpDatum
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
    const gradeContents = grades
      .slice()
      .sort(function (a: any, b: any) {
        return a.grade - b.grade;
      })
      .filter((c: any, index: any) => {
        return grades.indexOf(c) === index && c != null && c != undefined;
      });
    setgradesArrayU(gradeContents);
    //console.log(gradeContents, "contents");
    const position = unmappedEmpDatum
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
    //console.log(sectionContents, "contents");

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
  }, [users]);
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
  useEffect(() => {
    if (employeeCode === "None" || employeeCode === "") {
      setIcon(false);
    } else {
      setIcon(true);
    }

    if (employeeCodeOther === "None" || employeeCodeOther === "") {
      setIconUN(false);
    } else {
      setIconUN(true);
    }
  }, [employeeCode, employeeCodeOther])

  useEffect(() => {
    if (employeeName === "None" || employeeName === "") {
      setIcon1(false);
    } else {
      setIcon1(true);
    }

    if (employeeNameOther === "None" || employeeNameOther === "") {
      setIcon1UN(false);
    } else {
      setIcon1UN(true);
    }
  }, [employeeName, employeeNameOther])


  useEffect(() => {
    {
      if (positions === "None" || positions === "Grade" || positions === "") {
        setIcon2(false);
      } else {
        setIcon2(true);
      }
    }

    if (positionsother === "None" || positionsother === "") {
      setIcon2UN(false);
    } else {
      setIcon2UN(true);
    }
  }, [positions, positionsother])

  useEffect(() => {
    if (empgrades === "None" || empgrades === "") {
      setIcon3(false);
    } else {
      setIcon3(true);
    }

    if (empgradesother === "None" || empgradesother === "") {
      setIcon3UN(false);
    } else {
      setIcon3UN(true);
    }

  }, [empgrades, empgradesother])

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

  }, [empdivisions, empdivisionsOther])


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

  }, [sNS, sNSOther])


  useEffect(() => {
    if (empsections === "None" || empsections === "") {
      setIcon6(false);
    } else {
      setIcon6(true);
    }

    if (empsectionsother === "None" || empsectionsother === "") {
      setIcon6UN(false);
    } else {
      setIcon6UN(true);
    }

  }, [empsections, empsectionsother])

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

  }, [empsubSections, empsubSectionsOther])

  useEffect(() => {
    if (functionData === "None" || functionData === "") {
      setIcon8(false);
    } else {
      setIcon8(true);
    }

    if (functionDataOther === "None" || functionDataOther === "") {
      setIcon8UN(false);
    } else {
      setIcon8UN(true);
    }

  }, [functionData, functionDataOther])



  //pagination
  const [filCount, setfilCount] = React.useState<any>([]);
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
      .filter((j: any) => {
        console.log(j?.name?.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "S") {
          return j?.name?.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j?.name?.isSupervisor === undefined;
        }
      })
      .filter((j: any) => {
        if (positionsother === "None" || positionsother === "") {
          return j;
        } else {
          return j?.name?.position_long_description
            .toLocaleLowerCase()
            .includes(positionsother.toLocaleLowerCase());
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
        }
      })

    let filteredPaginationUnmapped = unmappedEmpDatum
      .filter((item: any) => {

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
        console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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

  }, [users, tabValues, employeeCodeOther, empsectionsother, employeeNameOther, empgradesother, positionsother, sNSOther, searchName2])
  console.log(filCount, filData, 'filfil')

  useEffect(() => {
    let pagination = activeTemplate?.filter((j: any) => {
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
        console.log(j?.name?.isSupervisor, "superv");
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
        }
      })

    console.log(pagination?.length, "length")
    if (tabValues === 0 && pagination == null) {
      setMappedCount(0);
    } else {
      setMappedCount(pagination?.length)
    }
  }, [tabValues, activeTemplate, searchName2, employeeCode, employeeName, empsections, empgrades, searchName2, positions, sNS])





  useEffect(() => {
    const unmapped = unmappedEmpDatum?.filter((item: any) => {

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
        console.log(j.isSupervisor, "superv");
        if (sNSOther === "None" || sNSOther === "") {
          return j;
        }
        if (sNSOther === "S") {
          return j.isSupervisor === true;
        } else if (sNSOther === "NS") {
          return j.isSupervisor === undefined;
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
        }
      })
      .map((j: any, emp: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")

        return {
          ECode: j.employee_code,
          EmployeeName: j.legal_full_name,
          Grade: j.grade,
          Position: j.position_long_description,
          Function: j?.attachments,
          RoleCategory: j?.feedback_questionnaire,
          supervisoryRole: j.isSupervisor != undefined
            ? "SP"
            : "N-SP",
          Division: j.division,
          Section: j.section,
          SubSection: j["sub section"],

        }

      })
    console.log(unmapped, "unmapped")

    // if (tabValues === 0) {
    //   setfilData(mapped);
    // } else {
    setfilData(unmapped);
    // }
    console.log(filData, "filData")
  }, [unmappedEmpDatum, tabValues, employeeCodeOther, empsectionsother, employeeNameOther, empgradesother, positionsother, sNSOther, searchName2])


  useEffect(() => {
    const mapped = activeTemplate?.filter((j: any) => {
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
        if (sNS === "S") {
          return j?.name?.isSupervisor === true;
        } else if (sNS === "NS") {
          return j?.name?.isSupervisor === undefined;
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
        }
      })
      .map((j: any, emp: any, employee: any) => {
        // console.log(emp,"emp")
        // console.log(j,"j")
        console.log(j?.name?.grade, "code")
        return {
          ECode: j?.name?.employee_code,
          EmployeeName: j?.name?.legal_full_name,
          Grade: j?.name?.grade,
          Position: j?.name?.position_long_description,
          Function: j?.attachments,
          RoleCategory: j?.feedback_questionnaire,
          supervisoryRole: j.isSupervisor != undefined
            ? "SP"
            : "N-SP",
          Division: j?.name?.division,
          Section: j?.name?.section,
          SubSection: j?.name?.["sub section"],

        }

      })
    if (tabValues == 0) {
      setfilData(mapped)
    }
    console.log(mapped, "mapped")
  }, [tabValues, activeTemplate, searchName2, employeeCode, employeeName, empsections, empgrades, searchName2, positions, sNS])
  useEffect(() => {
    if (filCount > 0) {
      setStateTrigger(true)
    }
  }, [filCount])

  //Export to excel
  const handleExport = () => {
    // setShow(0);
    console.log(users, 'excel')
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filData);



    XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');



    XLSX.writeFile(wb, 'MyExcel.xlsx');
  }
  return (
    <div>
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
              {tabValues !== 1 && (
                <Searchfeild1>
                  <TextField
                    autoComplete="off"
                    id="outlined-basic"
                    placeholder="Search Here..."
                    onChange={(e) => setSearchName(e.target.value)}
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
                    onChange={(e) => setSearchName2(e.target.value)}
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
                onClick={handleExport}
              />
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
              <TableContainer style={{ marginTop: "10px", height: "calc(100vh - 330px)", }}>
                {/* <Scroll>
                <Scrollbar
                  style={{ width: "100%", height: "calc(100vh - 330px)" }}
                > */}
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
                      >
                        <FormControl sx={{ m: 0, height: "0" }}>
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
                                  return a?.name?.grade - b?.name?.grade;
                                })
                                // ?.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.grade}
                                    value={name?.name?.grade}
                                  >
                                    {name?.name?.grade}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon3 && (
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
                                    {name?.name?.position_long_description}
                                  </MenuItem>
                                ))}
                              {/* </Select> */}
                              {/* {positionArray?.map((name: any) => (
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
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
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
                            <span> Role Category</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={roleCategory}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeRoleCategory}
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
                                Sales-support
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
                                Business-support
                              </MenuItem>
                              {/*  
                                {Sections.map((name) => (
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
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
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        <FormControl sx={{ m: 0, height: "0", width: 130 }}>

                          <Stack direction="row">

                            <span
                              style={{

                                whiteSpace: "pre-line"
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>

                              {sNSvalues
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.name?.localeCompare(b?.name);
                                })
                                ?.map((name) => (
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
                              {/* {divisionArray?.map((name: any) => (
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
                            </Select>
                            {icon4 && (
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
                                  return a?.name?.section?.localeCompare(b?.name?.section);
                                })
                                ?.map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name?.name?.section}
                                    value={name?.name?.section}
                                  >
                                    {name?.name?.section}
                                  </MenuItem>
                                ))}
                              {/* {sectionArray?.map((name: any) => (
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
                            </Select>
                            {icon6 && (
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
                                  >
                                    {name?.name?.["sub section"]}
                                  </MenuItem>
                                ))}

                              {/* {subSectionArray?.map((name: any) => (
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
                            </Select>
                            {icon7 && (
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

                  <TableBody>
                    {/* <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ><span style={{
                    fontSize: "14px",
                    color: "#333333",
                    opacity: "80%",
                    fontFamily: "regular",
                  }}>
                      Selected Employees
                    </span>
                  </TableRow> */}

                    {/* {mappData?.filter((j: any) => { */}
                    {/* {users
                        .filter((item: any) => {
                          // console.log(item, "itemeff");
                          // console.log(item.isChecked, "ischeckeff");
                          return item.isChecked === true;
                        }) */}
                    {activeTemplate
                      ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                    ?.filter((j: any) => {
                      if (employeeName === "None" || employeeName === "") {
                        return j;
                      } else {
                        return j?.name?.legal_full_name?.toLocaleLowerCase()
                          ?.includes(employeeName?.toLocaleLowerCase());
                      }
                    })
                      .filter((j: any) => {
                        if (employeeCode === "None" || employeeCode === "") {
                          return j;
                        } else {
                          return j?.name?.employee_code?.toLocaleLowerCase()
                            .includes(employeeCode?.toLocaleLowerCase());
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
                        // console.log(j.isSupervisor, "superv");
                        if (sNS === "None" || sNS === "") {
                          return j;
                        }
                        if (sNS === "SP") {
                          return j?.name?.isSupervisor === true;
                        } else if (sNS === "N-SP") {
                          return j?.name?.isSupervisor === undefined;
                        }
                      })
                      .filter((j: any) => {
                        if (empdivisions === "None" || empdivisions === "") {
                          return j;
                        } else {
                          return j?.name?.division
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
                          return j?.name["sub section"]
                            ?.toLocaleLowerCase()
                            .includes(empsubSections.toLocaleLowerCase());
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
                          (j?.name?.grade !== undefined &&
                            j?.name?.grade
                              .toLocaleLowerCase()
                              .includes(searchName.toLocaleLowerCase()))
                        ) {
                          return j;
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
                                whiteSpace: "nowrap",
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
                                whiteSpace: "nowrap",
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
                                // whiteSpace:"nowrap"
                                whiteSpace: "nowrap",
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
                                // whiteSpace:"nowrap"
                                whiteSpace: "nowrap",
                              }}
                              align="left"
                            >
                              Sales/sales-support
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
                              {employee?.name?.isSupervisor != undefined
                                ? "SP"
                                : "N-SP"}
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
                  </TableBody>
                </Table>
                {/* </Scrollbar>
                </Scroll> */}
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
            </TabPanel>
            <TabPanel value={tabValues} index={1}>
              <TableContainer style={{ marginTop: "10px", height: "calc(100vh - 330px)", }}>
                {/* <Scroll>
                <Scrollbar
                  style={{ width: "100%", height: "calc(100vh - 330px)" }}
                > */}
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
                        <FormControl sx={{ m: 0, height: "0" }}>
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
                                  return a.grade - b.grade;
                                })
                                ?.filter((item: any, i: any, ar: any) => ar.indexOf(item) === i)
                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.grade}
                                    value={name.grade}
                                  >
                                    {name.grade}
                                  </MenuItem>
                                ))}
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>


                              {unmappedEmpDatum
                                ?.slice()
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
                                    key={name.position_long_description}
                                    value={name.position_long_description}
                                  >
                                    {name.position_long_description}
                                  </MenuItem>
                                ))}
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
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                            </Select>
                            {icon8UN && (
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
                        <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                          <Stack direction="row">
                            <span>Role Category</span>
                            <Select
                              size="small"
                              sx={{ width: "25px", fontSize: "0rem" }}
                              disableUnderline
                              value={roleCategoryOther}
                              // value={personName}
                              // onChange={handleChanges}
                              onChange={handleChangeRoleCategoryOther}
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
                                Sales-support
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
                                Bsiness-support
                              </MenuItem>
                              {/* 
                                {Sections.map((name) => (
                                  // <MenuItem style={{ fontSize: "12px" }} key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))} */}
                            </Select>
                            {icon8UN && (
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
                        <FormControl sx={{ m: 0, height: "0" }}>

                          <Stack direction="row">

                            <span
                              style={{

                                whiteSpace: "pre-line"
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
                                  return a?.name?.localeCompare(b?.name);
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
                            {icon5UN && (
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>

                              {unmappedEmpDatum
                                ?.slice()
                                ?.sort(function (a: any, b: any) {
                                  return a?.division?.localeCompare(b?.division);
                                })

                                .map((name: any) => (
                                  <MenuItem
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                    key={name.division}
                                    value={name.division}
                                  >
                                    {name.division}
                                  </MenuItem>
                                ))}
                              {/* </Scrollbar> */}
                            </Select>
                            {icon4UN && (
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
                              </MenuItem>

                              {unmappedEmpDatum
                                ?.slice()
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
                                    key={name.section}
                                    value={name.section}
                                  >
                                    {name.section}
                                  </MenuItem>
                                ))}
                            </Select>
                            {icon6UN && (
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
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                key="None"
                                value="None"
                              >
                                None
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
                                  >
                                    {name?.["sub section"]}
                                  </MenuItem>
                                ))}
                              {/* </Scrollbar> */}
                            </Select>
                            {icon7UN && (
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
                  <TableBody>

                    {/* {unmappData?.filter((j: any) => { */}
                    {/* {users
                        .filter((item: any) => {
                          // console.log(item, "itemeff");
                          // console.log(item.isChecked, "ischeckeff");
                          return item.isChecked !== true;
                        }) */}
                    {/* // unMappedEmployees */}
                    {unmappedEmpDatum
                     ?.filter((item: any, i: any, ar: any) => ar?.indexOf(item) === i)
                    ?.filter((j: any) => {
                      if (
                        employeeNameOther === "None" ||
                        employeeNameOther === ""
                      ) {
                        return j;
                      } else {
                        return j?.legal_full_name
                          ?.toLocaleLowerCase()
                          .includes(employeeNameOther?.toLocaleLowerCase());
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
                            .includes(employeeCodeOther.toLocaleLowerCase());
                        }
                      })
                      .filter((j: any) => {
                        // console.log(j.isSupervisor, "superv");
                        if (sNSOther === "None" || sNSOther === "") {
                          return j;
                        }
                        if (sNSOther === "S") {
                          return j.isSupervisor === true;
                        } else if (sNSOther === "NS") {
                          return j.isSupervisor === undefined;
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
                            .includes(empdivisionsOther.toLocaleLowerCase());
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
                                whiteSpace: "nowrap",
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
                                whiteSpace: "nowrap",
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
                              {employee.position_long_description}
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
                              Sales/ Non-Sales
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
                              sales-support/ Business-sales
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
                              {employee.isSupervisor != undefined
                                ? "SP"
                                : "N-SP"}
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
                              {employee.division}
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
                            <TableCell
                              sx={{
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
                  </TableBody>
                </Table>
                {/* </Scrollbar>
                </Scroll> */}
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
            </TabPanel>
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
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
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
                  fontFamily:"Arial",
                  // paddingBottom: "12px",
                  // paddingRight: "10px",
                  // paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordBreak: "break-word",
                  // height: "100px",
                  alignItems: "center",
                  overflowY:"hidden",
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
          margin:"0px",
          padding:"30px",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
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
                    fontFamily:"Arial",
                    // paddingBottom: "12px",
                    // paddingRight: "10px",
                    // paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    wordBreak: "break-word",
                    // height: "100px",
                    alignItems: "center",
                    overflowY:"hidden",
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
