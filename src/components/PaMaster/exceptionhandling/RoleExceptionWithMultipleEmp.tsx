import React, { useEffect, useState, useRef, useMemo, useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Container,
  Box,
  TablePagination,
  Breadcrumbs,
  FormGroup,
  Snackbar,
  // Link,
} from "@mui/material";
import { ListItemText, MenuItem, ListItemIcon } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from 'react-router-dom';
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Drawer, FormControlLabel } from "@mui/material";
import Newexcel from "../../../assets/Images/Newexcel.svg"
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useGetEmployeeByFilterQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptEmployeeNamesChangeMutation,
  useAcceptEmployeeNamesChangeDraftMutation
} from "../../../service";
import Alert from "@mui/material/Alert";
import Autocomplete from '@mui/material/Autocomplete';
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import AlertYesNo from "../../UI/DialogYesNo"
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { Scrollbar } from "react-scrollbars-custom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from '@mui/styles';
import Searchlens from "../../../assets/Images/Searchlens.svg";

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

  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },

}));
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
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
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // maxWidth: 400,

    },
  },
};


export default function RoleExceptionWithMultipleEmp(props: any) {
  const classes = useStyles();
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);
  const CustomScrollbar = Scrollbar as any;

  console.log(navPrompt, 'navPrompt')
  const formIsDirty = navPrompt;
  usePrompt(
    "Any changes you have made will not be saved if you leave the page.",
         formIsDirty);
  //prompt ------functions
 const location: any = useLocation();
  const EmpCode = location?.state?.selectCode
  console.log(EmpCode, "EmpCode")
  const [employeeUpdateName] = useUpdateEmployeeAppraisalMutation();
  const [employeeUpdateNames] = useAcceptEmployeeNamesChangeMutation();
  const [employeeUpdateNamesDraft,{isLoading:loadEmpUpdate}] = useAcceptEmployeeNamesChangeDraftMutation();
  const navigate = useNavigate();
  const SELECT_FOR_DASHBOARD = `employee_code,section,appraiser_code,reviewer_code,normalizer_code,legal_full_name,position_long_description,grade,
  appraiser_name,normalizer_name,overall_rating,isRoleExceptionDraft,isLeaversDraft,appraiser_code_Draft,appraiser_name_Draft,reviewer_code_Draft,reviewer_name_Draft,normalizer_code_Draft,normalizer_name_Draft,reviewer_name,roles,first_name,employee_upload_flag`
  const { data,isLoading } = useGetEmployeeByFilterQuery(
    `?limit=700&select=${SELECT_FOR_DASHBOARD}&employee_upload_flag=true`
  );
  console.log(data, "EmpCode")
  const allIds = EmpCode?.map((i: any) => {
    return i?._id
  })
  console.log(allIds, "EmpCode")
  const [hideCheckbox, setHideCheckbox] = React.useState<any>(false);
  const [columnHeaders, setcolumnHeaders] = useState<any>({
    AppraiserActivation: false,
    reviewerActivation: false,
    normalizerActivation: false,
  })
  console.log(columnHeaders, "columnHeaders")
  //states forediting the employee data 
  const [roleExceptionData, setRoleExceptionData] = React.useState<any>([]);
  const [appraiserNameVal, setAppraiserNameVal] = React.useState<any>('');
  const [reviewerNameVal, setreviewerNameVal] = React.useState<any>('');
  const [normalizerNameVal, setnormalizerNameVal] = React.useState<any>('');
  const [employeeCodeVal, setemployeeCodeVal] = React.useState<any>("");
  const [employeeCodeValRev, setemployeeCodeValRev] = React.useState<any>("");
  const [employeeCodeValNor, setemployeeCodeValNor] = React.useState<any>("");
  const [saveAlert, setsaveAlert] = React.useState<any>(false);
  const [saverolevalidation, setSaverolevalidation] = React.useState<any>(false);
  const [handleChangeCheckboxValue, sethandleChangeCheckboxValue] = React.useState<string[]>([]);
  console.log(appraiserNameVal, roleExceptionData, "appraiserNameVal")
  console.log(employeeCodeVal, "appraiserNamesNew")
  console.log(handleChangeCheckboxValue, "handleChangeCheckboxValue")
  //search Functionality
  const [activeAdvancedSearch, setactiveAdvancedSearch] = useState(false);
  const [enteredName, setenteredName] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //dialog for showing the msg "confirm emp master"
  const [saveDialog, setsaveDialog] = React.useState<any>(false);
  const handleSavePopup = () =>{
    setsaveDialog(false)
    navigate("/exceptionhandling", 
    { state: { 
      user: 'toRoleexception' ,
      EmpCode:EmpCode,
      appraiserName:appraiserNameVal,
      employeeCodeValApp:employeeCodeVal,
      reviewerName:reviewerNameVal,
      employeeCodeValRev:employeeCodeValRev,
      normalizerName:normalizerNameVal,
      employeeCodeValNor:employeeCodeValNor,
      handleChangeCheckboxValue:handleChangeCheckboxValue,    
    } 
  });
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [tablecount, settablecount] = React.useState<any>(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };
  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);

  useEffect(() => {
    const paginate =data?.data
    ?.filter((item1: any) => {
      if (sectionsFilter?.includes("None") || sectionsFilter?.length === 0) {
        return item1;
      } else {
        return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
      }
    })
    ?.filter((item1: any) => {
      if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
        return item1;
      } else {
        return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
      }
    })
    ?.filter((item1: any) => {
      if (GradesFilter?.includes("None") || GradesFilter?.length === 0) {
        return item1;
      } else {
        return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
      }
    })
    ?.filter((j: any) => {
      if (enteredName === "") {
        return j;
      } else if (
        (j?.employee_code !== undefined &&
          j?.employee_code
            ?.toLocaleLowerCase() === enteredName?.toLocaleLowerCase()
        ) ||
        (j?.legal_full_name !== undefined &&
          j?.legal_full_name
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j.position_long_description !== undefined &&
          j?.position_long_description
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
        (j?.section !== undefined &&
          j?.section
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            ))

      ) {
        return j;
      }
    })
    settablecount(paginate?.length)
  }, [data,enteredName,GradesFilter,positionsFilter])
  //For multislect options
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  useEffect(() => {
    let grades = data?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      .map((i: any) => {
        return i?.grade;
      });
      // search functionality based on grade
     if (enteredName?.length > 0) {
      grades = data?.data
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.grade?.localeCompare(
            b?.grade
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const searchTerms = enteredName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.grade
                ?.toLowerCase()
                .includes(term)
            );
          } else {
            return true;
          }
        })
        ?.map((i: any) => {
          return i?.grade;
        });
    }
    const gradeContents = grades
      ?.filter((c: any, index: any) => {
        return grades?.indexOf(c) === index && c != null && c != undefined;
      });
    setgradesArray(gradeContents);
    let position = data?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.position_long_description?.localeCompare(b?.position_long_description);
      })
      ?.map((i: any) => {
        return i?.position_long_description;
      });
    const positionContents = position?.filter((c: any, index: any) => {
      return position?.indexOf(c) === index && c != null && c != undefined;
    });
       // search functionality based on position
        if (enteredName?.length > 0) {
        position = data?.data
          .slice()
          ?.sort(function (a: any, b: any) {
            return a?.position_long_description?.localeCompare(
              b?.position_long_description
            );
          })
          ?.filter((i: any) => {
            if (enteredName.length > 0) {
              const searchTerms = enteredName.toLowerCase().split(" ");
              return searchTerms.every(term =>
                i?.position_long_description
                  ?.toLowerCase()
                  .includes(term)
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
    setpositionArray(positionContents);
    const section = data?.data
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      .map((i: any) => {
        return i?.section;
      });
    const sectionContents = section?.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
  }, [data,enteredName])
  //for section multiselect
  const [sectionsFilter, setsectionsFilter] = React.useState<string[]>([]);
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
  };

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
    setPage(0)
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
  //For multislect options

  //for alert
  const [LaunchValDialog, setLaunchValDialog] = useState(false);
  const [LaunchValDialogMSG, setLaunchValDialogMSG] = useState("");
  const [EmptyValDialogMSG, setEmptyValDialogMSG] = useState("");

  const handleLaunchValDialog = () => {
    setLaunchValDialog(false);
    setLaunchValDialogMSG("")
    setsaveDialog(true)
    //show the dialog here
    //for tab changing to role exception
  //   navigate("/exceptionhandling", 
  //   { state: { 
  //     user: 'toRoleexception' ,
  //     EmpCode:EmpCode,
  //     appraiserName:appraiserNameVal,
  //     employeeCodeValApp:employeeCodeVal,
  //     reviewerName:reviewerNameVal,
  //     employeeCodeValRev:employeeCodeValRev,
  //     normalizerName:normalizerNameVal,
  //     employeeCodeValNor:employeeCodeValNor,
  //     handleChangeCheckboxValue:handleChangeCheckboxValue,    
  //   } 
  // });
  };
  const handleemptyValDialog = () => {
    setsaveAlert(false);
    setEmptyValDialogMSG("")
  };
  const handleclearRoleValidatorDialog = () => {
    setSaverolevalidation(false);
    setEmptyValDialogMSG("")
  };
  //foralert

  const appraiserNames = Array.from(
    new Set(data?.data?.map((i: any) => i?.roles?.appraiser === true ? i?.legal_full_name: undefined))
  )
  .sort((a: any, b: any) => a?.localeCompare(b))
  .filter((i: any) => i !== undefined);

  const appraiserObjects = data?.data
    ?.filter((i: any) => i && i.legal_full_name)
    ?.reduce((unique: any, item: any) => {
      return unique.some((i: any) => i.name === item.legal_full_name)
        ? unique
        : [...unique, { name: item.legal_full_name, code: item.employee_code }];
    }, []);
  console.log(appraiserObjects,"appraiserNamesNew")  
//codesoptions
const appraiserCodes = Array.from(
 // new Set(data?.data?.map((i: any) => i?.appraiser_code))
   new Set(data?.data?.map((i: any) => i?.roles?.appraiser === true ? i?.employee_code: undefined))
  )
    .sort((a: any, b: any) => a?.localeCompare(b))
    .filter((i: any) => {
      return i != undefined
    })

  const ReviewerCodes = Array.from(
    //new Set(data?.data?.map((i: any) => i?.reviewer_code))
    new Set(data?.data?.map((i: any) => i?.roles?.reviewer === true ? i?.employee_code: undefined))
    )
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
 const NormalizerCodes = Array.from(
  //new Set(data?.data?.map((i: any) => i?.normalizer_code))
  new Set(data?.data?.map((i: any) => i?.roles?.normalizer === true ? i?.employee_code: undefined))
  )
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
    console.log(appraiserCodes,ReviewerCodes,NormalizerCodes,"codeOptions")
//codesoptions
  const gettingAppraiserCode = useMemo(() => {
    if (appraiserObjects !== undefined && appraiserObjects !== "") {
      let AppCode = appraiserObjects?.filter((i: any) => {
        return i?.code == employeeCodeVal
      }).map((i: any) => i?.name)
      console.log(AppCode, "appraiserNamesNew")
      //@ts-ignore 
      //setemployeeCodeVal(AppCode[0])
      setAppraiserNameVal(AppCode[0]);
    }
  }, [employeeCodeVal, roleExceptionData, data])

  //write a function to filter the respective object
  //reviewer_name
  const ReviewerNames = Array.from(new Set(data?.data?.map((i: any) => i?.reviewer_name)))
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
  const reviewerObjects = data?.data
    ?.filter((i: any) => i && i.legal_full_name)
    ?.reduce((unique: any, item: any) => {
      return unique.some((i: any) => i.name === item.legal_full_name)
        ? unique
        : [...unique, { name: item.legal_full_name, code: item.employee_code }];
    }, []);
  const gettingReviewerCode = useMemo(() => {
    if (reviewerObjects !== undefined && reviewerObjects !== "") {
      let AppCode = reviewerObjects?.filter((i: any) => {
        return i?.code == employeeCodeValRev
      }).map((i: any) => i?.name)
      //console.log(AppCode,"appraiserNamesNew")  
      //@ts-ignore 
      //setemployeeCodeValRev(AppCode[0])
      setreviewerNameVal(AppCode[0]);
    }
  }, [employeeCodeValRev, roleExceptionData, data])
  //reviewer_name
  //normalizer_name
  const NormalizerNames = Array.from(new Set(data?.data?.map((i: any) => i?.normalizer_name)))
    ?.sort((a: any, b: any) => a?.localeCompare(b))
    ?.filter((i: any) => {
      return i != undefined
    })
  const normalizerObjects = data?.data
    ?.filter((i: any) => i && i.legal_full_name)
    ?.reduce((unique: any, item: any) => {
      return unique.some((i: any) => i.name === item.legal_full_name)
        ? unique
        : [...unique, { name: item.legal_full_name, code: item.employee_code }];
    }, []);

  const gettingNormalizerCode = useMemo(() => {
    if (normalizerObjects !== undefined && normalizerObjects !== "") {
      let AppCode = normalizerObjects?.filter((i: any) => {
        return i?.code == employeeCodeValNor
      }).map((i: any) => i?.name)
      //console.log(AppCode,"appraiserNamesNew")  
      //@ts-ignore 
      //setemployeeCodeValNor(AppCode[0])
      setnormalizerNameVal(AppCode[0]);
    }
  }, [employeeCodeValNor, roleExceptionData, data])
  //normalizer_name

  console.log(appraiserNames,normalizerObjects, "Lists")


  //for populating the data of the employee
  useEffect(() => {
    const Temp = data?.data?.filter((i: any) => {
      return i?.employee_code === EmpCode[0]?.employee_code
    })
    if (Temp?.length == 1) {
      setRoleExceptionData(Temp[0])
    }

  }, [data])

  const onChangeAppraiserName = (name: any) => {
    setAppraiserNameVal(name);
  }
  useEffect(() => {
    // setAppraiserNameVal(roleExceptionData?.appraiser_name);
    // setreviewerNameVal(roleExceptionData?.reviewer_name)
    // setnormalizerNameVal(roleExceptionData?.normalizer_name)
    if (roleExceptionData !== undefined && roleExceptionData !== "" && EmpCode?.length === 1 ) {
      console.log(roleExceptionData, "appraiserNameVal")
      setemployeeCodeVal(roleExceptionData?.appraiser_code)
      setemployeeCodeValRev(roleExceptionData?.reviewer_code)
      setemployeeCodeValNor(roleExceptionData?.normalizer_code)
      setAppraiserNameVal(roleExceptionData?.appraiser_name);
    setreviewerNameVal(roleExceptionData?.reviewer_name)
    setnormalizerNameVal(roleExceptionData?.normalizer_name)
      //add
    }
  }, [data, roleExceptionData])

  // const settingValue = React.useMemo(() => {
  //  // setAppraiserNameVal(roleExceptionData?.appraiser_name);
  //  if(appraiserNameVal==="Anabelle Villamor Dandan"){
  //   setemployeeCodeVal(918)
  // }else if(appraiserNameVal==="Cristiana Colesnicenco "){
  // setemployeeCodeVal(1080)
  // }
  // }, [appraiserNameVal])
  console.log("valstosubmit", appraiserNameVal, employeeCodeVal, reviewerNameVal, employeeCodeValRev, normalizerNameVal, employeeCodeValNor)
  const rolesValidator = () =>{
    if(handleChangeCheckboxValue?.length === 0){
      setsaveAlert(true);
      setEmptyValDialogMSG("Please select the role before saving the changes. Otherwise, please click the Cancel button")
    }else{
      let message = "";

      if (employeeCodeVal === null) {
        message += "Please select Appraiser";
      }
      
      if (employeeCodeValRev === null) {
        message += message.length ? " and Reviewer" : "Please select Reviewer";
      }
      
      if (employeeCodeValNor === null) {
        message += message.length ? " and HR Normalizer" : "Please select HR Normalizer";
      }
      
      if (message.length === 0) {
        // All values are selected
        setsaveAlert(false);
        setSaverolevalidation(true);
        setEmptyValDialogMSG("No roles")
     
        let message = "Are you sure you wish to save changes in ";
  
        if (handleChangeCheckboxValue.includes('AppraiserActivation')) {
          message += "the Appraiser code";
        }
        
        if (handleChangeCheckboxValue.includes('reviewerActivation')) {
          if (message.endsWith("code")) {
            message += " and ";
          }
          message += "the Reviewer code";
        }
        
        if (handleChangeCheckboxValue.includes('normalizerActivation')) {
          if (message.endsWith("code")) {
            message += " and ";
          }
          message += "the HR Normalizer code";
        }
        
        if (message.endsWith("code")) {
          message += "?";
        }
        
        setEmptyValDialogMSG(message);
      } else {
        // At least one value is missing
        setsaveAlert(true);
        setEmptyValDialogMSG(message);
      }
      
    
    }
  }
  const saveHandler = () => {
   //closing previous dialog
    setSaverolevalidation(false);
     setEmptyValDialogMSG("");
    const allIds = EmpCode.map((i: any) => {
      return i?._id
    })
    console.log(allIds,"allIds")
    if (appraiserNameVal !== undefined || reviewerNameVal !== undefined  || normalizerNameVal !== undefined ) {
      //to add other comparisons
      console.log("valstosubmit")
      employeeUpdateNamesDraft({
        "appraiser_name": appraiserNameVal,
        id: allIds,
        // "employee.training_recommendation": trainingRecommendationValues,
        // "employee.area_of_improvement": area,
        "appraiser_code": employeeCodeVal,
        "reviewer_name": reviewerNameVal,
        "reviewer_code": employeeCodeValRev,
        "normalizer_name": normalizerNameVal,
        "normalizer_code": employeeCodeValNor,
        "activeCheckbox": handleChangeCheckboxValue,
      }).then((res: any) => {
        res.error ? <> </> :
          setLaunchValDialog(true);
        setLaunchValDialogMSG("Changes were successfully saved.")
        setnavPrompt(false)
      });
    } else {
      setsaveAlert(true)
      setEmptyValDialogMSG("Appraiser/Reviewer/Normalizer Name is Mandatory")
    }
  

  }
  // useEffect(() => {
  //   if (roleExceptionData !== undefined && roleExceptionData !== "") {
  //     console.log(roleExceptionData?.appraiser_code, "appraiserNameVal")
  //     setemployeeCodeVal(roleExceptionData?.appraiser_code)
  //     //add
  //   }
  // }, [data, roleExceptionData])

  const handleActivatingadvancedsearch = () => {
    setactiveAdvancedSearch(true)
    if(activeAdvancedSearch === true){
      setactiveAdvancedSearch(false)
    }
  }
  // const handleSearchBar = (e: any) => {
  //   setenteredName(e.target.value);
  //   setPage(0);
  // }
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setenteredName(e.target.value);
      setPage(0);
    }

//   const handleChangeCheckbox = (e: any) => {
// console.log(e.target.value,"handleChangeCheckbox")
// sethandleChangeCheckboxValue(e.target.value)
//   }

  const handleChangeCheckbox = (e: any) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      sethandleChangeCheckboxValue([...handleChangeCheckboxValue, checkboxValue]);
    } else {
      const newValues = handleChangeCheckboxValue.filter((value:any) => value !== checkboxValue);
      sethandleChangeCheckboxValue(newValues);
    }
  };
  //let hideCheckbox = false;
  const handleChangeCheckboxBasedonCodes = (value: any,checked:boolean) => {
    const checkboxValue = value;
    const isChecked = checked;
    setHideCheckbox(true);

    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[checkboxValue] = true;
    setcolumnHeaders(columnHeadersTemp)

    //hideCheckbox = true
     console.log(checkboxValue,isChecked,"handleChangeCheckboxBasedonCodes")
    if (isChecked) {
      sethandleChangeCheckboxValue([...handleChangeCheckboxValue, checkboxValue]);
    } else {
      const newValues = handleChangeCheckboxValue.filter((value:any) => value !== checkboxValue);
      sethandleChangeCheckboxValue(newValues);
    }
  };
  if  (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="25px"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
              cursor: "pointer",
            }}
            color="inherit"
            onClick={() => {
              navigate("/exceptionhandling", { state: { user: 'toRoleexception' } });
             }}
          >
            Exception Handling
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Role Exception
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <Typography
        style={{
          display: "flex",
          justifyContent: "flex-end",
          textDecoration: "underline",
          color: "skyblue",
         cursor: "pointer" ,
         fontFamily:"Arial",
         fontSize:"16px"
        }}
          onClick={handleActivatingadvancedsearch}
        >
          Advanced Search
        </Typography>
        <Grid container spacing={4} alignItems="center">
            <Grid item xs={5}>
              <Stack direction="column" spacing={2}>
                <Grid display="flex">
                 <Checkbox color="primary" 
                  value="AppraiserActivation" 
                  onChange={handleChangeCheckbox} 
                  disabled={columnHeaders.AppraiserActivation === false}
                  checked={handleChangeCheckboxValue.includes('AppraiserActivation')}
                  />
                  <TextField
                  fullWidth
                label="Appraiser Name"
                id="outlined-size-small"
                defaultValue={appraiserNameVal || "select"}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                //value={roleExceptionData?.appraiser_code}
                value={appraiserNameVal !== undefined ? appraiserNameVal : ''}
                // InputLabelProps={{
                //   shrink: appraiserNameVal !== undefined || null
                // }}
                disabled
              />                </Grid>
                <Grid display="flex">
               <Checkbox color="primary"
                   value="reviewerActivation" 
                   onChange={handleChangeCheckbox} 
                   disabled={columnHeaders.reviewerActivation === false}
                   checked={handleChangeCheckboxValue.includes('reviewerActivation')}
                   />
                  <TextField
                   fullWidth
                label="Reviewer Name"
                id="outlined-size-small"
                defaultValue={reviewerNameVal}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                //value={roleExceptionData?.reviewer_code}
                value={reviewerNameVal!== undefined ? reviewerNameVal : ''}
                disabled
              />                </Grid>
                <Grid display="flex">
                 <Checkbox color="primary" 
                  value="normalizerActivation" 
                  onChange={handleChangeCheckbox}
                  disabled={columnHeaders.normalizerActivation === false}
                  checked={handleChangeCheckboxValue.includes('normalizerActivation')}
                  />
                  <TextField
                   fullWidth
                label="HR Normalizer Name"
                id="outlined-size-small"
                defaultValue={normalizerNameVal}
                size="small"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                //value={roleExceptionData?.normalizer_code}
                value={normalizerNameVal!== undefined ? normalizerNameVal : ''}
                disabled
              />                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={5}>
              <Stack direction="column" spacing={2}>
                <Grid>
                {/* {(employeeCodeVal === null || employeeCodeVal || roleExceptionData.length > 1) && */}
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={appraiserCodes}
                defaultValue={roleExceptionData?.appraiser_code}
                value={employeeCodeVal}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                renderInput={(params) => <TextField {...params} label="Appraiser Code"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setemployeeCodeVal(value);
                  setnavPrompt(true)
                  handleChangeCheckboxBasedonCodes("AppraiserActivation",true);
                }}
                //onClear={handleClear}
                // onInputChange={(event, value, reason) => {
                //   if (reason === "clear") {
                //     console.log("cleared")
                //     setemployeeCodeVal("hi");
                //     //setAppraiserNameVal("");
                //   }
                // }}
                
              /> 
               {/* }               */}
               </Grid>

                <Grid>
                {/* {(employeeCodeValRev === null || employeeCodeValRev) &&  */}
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={ReviewerCodes}
                defaultValue={roleExceptionData?.reviewer_code}
                value={employeeCodeValRev}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                renderInput={(params) => <TextField {...params} label="Reviewer Code"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setemployeeCodeValRev(value);
                  setnavPrompt(true)
                  handleChangeCheckboxBasedonCodes("reviewerActivation",true);
                }}
              />
              {/* }                 */}
              </Grid>

                <Grid>
                {/* {(employeeCodeValNor === null || employeeCodeValNor) &&  */}
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={NormalizerCodes}
                defaultValue={roleExceptionData?.normalizer_code}
                value={employeeCodeValNor}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                renderInput={(params) => <TextField {...params} label="HR Normalizer Code"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setemployeeCodeValNor(value);
                  setnavPrompt(true)
                  handleChangeCheckboxBasedonCodes("normalizerActivation",true);
                }}
              />
              {/* }                 */}
              </Grid>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Button
              disabled={loadEmpUpdate || LaunchValDialog}
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  margin: "5px",
                  color: "#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                 onClick={rolesValidator}
              >
                Save
              </Button>

              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3e8cb5",
                   margin: "5px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                onClick={() => {
                  navigate("/exceptionhandling", { state: { user: 'toRoleexception' } });
                 }}
                autoFocus
              >
                Cancel
              </Button>
             
            </Grid>
          </Grid>
{/* old codes */}
        {/* <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={15}> */}
          {/* <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                sx={{ display: "none" }}
                label="Employee Code"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={roleExceptionData?.employee_code}
                disabled
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                sx={{ display: "none" }}
                label="Position"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                value={roleExceptionData?.position_long_description}
                disabled
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Appraiser Code"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                //value={roleExceptionData?.appraiser_code}
                value={employeeCodeVal}
                disabled
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Reviewer Code"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                //value={roleExceptionData?.reviewer_code}
                value={employeeCodeValRev}
                disabled
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="Normalizer Code"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
                //value={roleExceptionData?.normalizer_code}
                value={employeeCodeValNor}
                disabled
              />
            </Box>
          </div> */}
          {/* <div> */}
            {/* <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "550px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Employee Name"
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            value={roleExceptionData?.legal_full_name}
            disabled
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "550px" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Section"
            id="outlined-size-small"
            //defaultValue="Small"
            size="small"
            value={
              roleExceptionData?.section ?
              roleExceptionData?.section :
              'No section available'
            }
            disabled
          />
        </Box> */}
            {/* <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            > */}
              {/* <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditOutlinedIcon />
              </InputAdornment>
            ),
          }}
            label="Appraiser Name"
            size="small"
            value={roleExceptionData?.appraiser_name}
            onChange={(e: { target: { value: any } }) => {
              setAppraiserNameVal(e.target.value);
             }}
            /> */}
              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={appraiserNames}
                defaultValue={roleExceptionData?.appraiser_name}
                value={appraiserNameVal}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Appraiser Name"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setAppraiserNameVal(value);
                  setnavPrompt(true)
                }}
              />
            </Box> */}
            {/* <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={ReviewerNames}
                defaultValue={roleExceptionData?.reviewer_name}
                value={reviewerNameVal}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Reviewer Name"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setreviewerNameVal(value);
                  setnavPrompt(true)
                }}
              /> */}
              {/* <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditOutlinedIcon />
              </InputAdornment>
            ),
          }}
            label="Reviewer Name"
            size="small"
            value={roleExceptionData?.reviewer_name}
            /> */}
            {/* </Box> */}
            {/* <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "550px" },
              }}
              noValidate
              autoComplete="off"
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={NormalizerNames}
                defaultValue={roleExceptionData?.normalizer_name}
                value={normalizerNameVal}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Normalizer Name"

                  size="small" />}
                //@ts-ignore
                onChange={(event, value) => {
                  console.log("Selected value:", value);
                  setnormalizerNameVal(value);
                  setnavPrompt(true)
                }}
              /> */}
              {/* <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditOutlinedIcon />
              </InputAdornment>
            ),
          }}
            label="Normalizer Name"
            size="small"
            value={roleExceptionData?.normalizer_name}
          /> */}
            {/* </Box> */}
            {/* <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={appraiserNames}
      value={roleExceptionData?.appraiser_name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField 
        {...params}  
        label="Appraiser Name" 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EditOutlinedIcon />
            </InputAdornment>
          ),
        }} 
        />}
    /> */}

          {/* </div> */}

        {/* </Stack> */}
        {/* <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          paddingTop="70px"
        > */}
          {/* <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background: "transparent",
              width: "70px",
              height: "35px",

              // lineHeight:"normal",
              // padding:"9px 15px"
            }}
            variant="outlined"
            onClick={saveHandler}
          >
            Save
          </Button> */}

          {/* <Link
            // to={`/exceptionhandling`}
            to={{
              pathname: '/exceptionhandling',
              // search: '?value=2'

            }}
            state={{
              // from: "Inmediation",
              Detail: "hello"
            }}
          > */}


            {/* <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                width: "70px",
                height: "35px",
                // lineHeight:"normal",
                // padding:"9px 15px"
              }}
              variant="outlined"
            // onClick={()=>{navigate(-1)}}
            >
              Cancel
            </Button>
          </Link> */}
        {/* </Stack> */}
        {/* advanced search component */}
        {activeAdvancedSearch && 
        <div>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" marginTop="10px" >
            <Searchfeild >
              <TextField
                id="outlined-basic"
                placeholder="Search Here..."
                autoComplete="off"
                inputProps={{ maxLength: 256 }}
                onChange={handleSearchBar}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={Searchlens} alt="icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Searchfeild>
            {/* <div>
                    <img
                      src={Newexcel}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
                      onClick={handleExportFunction}
                    />
                  </div> */}
            {/* <div>
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </div> */}
          </Stack>
          <div>

            <TableContainer sx={{marginTop:"10px"}}>
              <Scroll>
                <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 435px)" }}>
                  <Table size="small" aria-label="simple table">
                    <TableHead
                      style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                    >
                      <TableRow sx={{ bgcolor: "#eaeced" }}>
                        <TableCell
                          width="5px"
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Ecode
                        </TableCell>

                        <TableCell
                          width="250px"
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          style={{ minWidth: 250 }}
                        >
                          Employee Name
                        </TableCell>
                        <TableCell
                          width="250px"
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          style={{ minWidth: 250 }}
                        >
                          Known As
                        </TableCell>

                        <TableCell align="center" width="250px">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              border: "none",
                              background: "none",
                              minWidth: 250 
                            }}
                            // style={{ }}
                          >
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
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      padding: "0px",

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
                                        size="small"
                                        style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}

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
                                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
                                          checked={positionsFilter.indexOf(option) > -1}
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

                              </Stack>
                            </FormControl>

                          </div>
                        </TableCell>

                        <TableCell align="center" width="25px">
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
                                <span>Grade</span>
                                <Select
                                  labelId="demo-multiple-checkbox-label"
                                  id="demo-multiple-checkbox"
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem",
                                  "& .MuiSvgIcon-root": {
                                    color:"#3e8cb5 !important"
                                    },
                                }}
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

                                    }}
                                    key="all"
                                    value="all"
                                    classes={{
                                      root: isAllGradesFilter ? classes.selectedAll : "",
                                    }}
                                  >
                                    <ListItemIcon>
                                      <Checkbox
                                      sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                        size="small"
                                        style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}
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
                                          paddingRight: "10px"
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
                                        sx={{ "& .MuiSvgIcon-root": { fontSize: "14px !important" } }}
                                          size="small"
                                          style={{ padding: "0px", paddingLeft: "14px", height: "0px" }}

                                          checked={GradesFilter.indexOf(option) > -1}
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

                              </Stack>
                            </FormControl>
                          </div>
                        </TableCell>

                        {/* <TableCell align="center" width="20%">
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
                            <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row" alignItems="center">
                                <span> Section </span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                 
                                  onChange={handleChangeSelectsections}
                                 
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
                                    Clear Filter
                                  </MenuItem>

                                  {sectionArray?.map((name: any) => (
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

                          </div>
                        </TableCell> */}


                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {data?.data
                      ?.filter((j:any) => j.employee_upload_flag)
                        // ?.filter((item1: any) => {
                        //   if (positionFilter.includes("None") || positionFilter.length === 0) {
                        //     return item1;
                        //   } else {
                        //     return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
                        //   }
                        // })
                        // ?.filter((item1: any) => {
                        //   if (GradeFilter.includes("None") || GradeFilter.length === 0) {
                        //     return item1;
                        //   } else {
                        //     return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
                        //   }
                        // })
                        // ?.filter((item1: any) => {
                        //   if (sectionFilter.includes("None") || sectionFilter.length === 0) {
                        //     return item1;
                        //   } else {
                        //     return !!sectionFilter?.find((item2: any) => item1?.section === item2)
                        //   }
                        // })
                        ?.filter((item1: any) => {
                          if (sectionsFilter?.includes("None") || sectionsFilter?.length === 0) {
                            return item1;
                          } else {
                            return !!sectionsFilter?.find((item2: any) => item1?.section === item2)
                          }
                        })
                        ?.filter((item1: any) => {
                          if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
                            return item1;
                          } else {
                            return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                          }
                        })
                        ?.filter((item1: any) => {
                          if (GradesFilter?.includes("None") || GradesFilter?.length === 0) {
                            return item1;
                          } else {
                            return !!GradesFilter?.find((item2: any) => item1?.grade === item2)
                          }
                        })
                        ?.filter((j: any) => {
                          if (enteredName === "") {
                            return j;
                          } else if (
                            (j?.employee_code !== undefined &&
                              j?.employee_code
                                ?.toLocaleLowerCase() === enteredName?.toLocaleLowerCase()
                            ) ||
                            (j?.legal_full_name !== undefined &&
                              j?.legal_full_name
                                ?.toLocaleLowerCase()
                                ?.includes(
                                  enteredName?.toLocaleLowerCase()
                                )) ||
                            (j.position_long_description !== undefined &&
                              j?.position_long_description
                                ?.toLocaleLowerCase()
                                ?.includes(
                                  enteredName?.toLocaleLowerCase()
                                )) ||
                            (j?.section !== undefined &&
                              j?.section
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
                          return (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  borderColor: "lightgrey",
                                },
                              }}
                            >
                              <TableCell
                                align="center"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  wordBreak: "break-word",
                                }}
                              >
                                {j?.employee_code}
                              </TableCell>

                              <TableCell
                                align="left"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  // wordBreak: "break-word",
                                }}
                                style={{ minWidth: 280 }}
                              >
                                {j?.legal_full_name}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  // wordBreak: "break-word",
                                }}
                                style={{ minWidth: 280 }}
                              >
                                {j?.first_name}
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  // wordBreak: "break-word",
                                }}
                                style={{ minWidth: 250 }}
                              >
                                {j?.position_long_description}

                              </TableCell>
                              <TableCell sx={{
                                fontFamily: "Arial",
                                borderColor: "lightgrey",
                                fontSize: "14px",
                                color: "#333333",
                                wordBreak: "break-word",
                                paddingRight: "50px"
                              }} align="center">
                                {j?.grade}
                              </TableCell>
                              {/* <TableCell
                                align="left"
                                sx={{
                                  fontFamily: "Arial",
                                  borderColor: "lightgrey",
                                  fontSize: "14px",
                                  color: "#333333",
                                  wordBreak: "break-word",
                                }}
                              >
                                {j?.section}
                              </TableCell> */}



                            </TableRow>)
                        })}
                    </TableBody>
                  </Table>
                </CustomScrollbar>
              </Scroll>
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
          </div>
        </div>}
        {/* <AlertDialogSuccess
          isAlertOpen={LaunchValDialog}
          handleAlertClose={handleLaunchValDialog}
        >
          {LaunchValDialogMSG}

        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={LaunchValDialog}
        autoHideDuration={3000}
        onClose={handleLaunchValDialog}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleLaunchValDialog}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 
        <AlertDialogSuccess
          isAlertOpen={saveAlert}
          handleAlertClose={handleemptyValDialog}
        >
          {/* {"Appraiser Name ,Reviewer Name ,Normalizer Name is mandatory"} */}
          {EmptyValDialogMSG}

        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={saveDialog}
          handleAlertClose={handleSavePopup}
        >       
         Please confirm the employee list to initiate the change.
        </AlertDialogSuccess>
        
        <AlertYesNo
          isAlertOpen={saverolevalidation}
          handleAlertYes={saveHandler}
          handleAlertClose={handleclearRoleValidatorDialog}
        >
         
          {EmptyValDialogMSG}

        </AlertYesNo>
      </Box>
    </>
  );
}
