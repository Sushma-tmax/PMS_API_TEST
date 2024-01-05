import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, TablePagination,Breadcrumbs, TextField, Drawer, FormGroup, ListItemIcon, } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton,FormControlLabel,FormControl,MenuItem,Menu } from "@mui/material";
import Expand from "../../../../assets/Images/Expand.svg";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import ListItemText from '@mui/material/ListItemText';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Newexcel from  "../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { useGetActiveCalenderQuery, useGetEmployeeByFilterQuery } from "../../../../service";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useNavigate ,Link} from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Searchlens from "../../../../assets/Images/Searchlens.svg";
import * as XLSX from "xlsx";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from '@mui/styles';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

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

  
  
}));

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
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
export default function FilteredTableofExpNineboxODChild(props: any) {
const {EmployeeData,hideEmployeeRating,AllEmployee} = props;
const classes = useStyles();
const { data: activecalendardata} = useGetActiveCalenderQuery('')
let CalendarName =activecalendardata?.data[0]?.name
console.log(EmployeeData,"FilteredExpandtable")
console.log(AllEmployee,"AllEmployee")
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
const CustomScrollbar = Scrollbar as any;

const [tablecount, settablecount] = React.useState<any>(0);
// const countofTable = React.useMemo(() => 
// {
//     settablecount(AllEmployee?.length)
// }, [AllEmployee])


const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
  // setPageNumber(pageNumber + 1)
};
const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
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
//search Functionality
const [enteredName, setenteredName] = useState("");
//For multislect options
const [gradesArray, setgradesArray] = React.useState<any>([]);
const [positionArray, setpositionArray] = React.useState<any>([]);
const [sectionArray, setsectionArray] = React.useState<any>([]);
const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);

useEffect(() => {
  let grades = AllEmployee
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.grade - b?.grade;
  })
  .map((i: any) => {
    return i?.grade;
  });
  // positionsFilter
  if (positionsFilter.length > 0) {
    grades = AllEmployee
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
    else if (enteredName?.length > 0) {
      grades = AllEmployee
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
            )|| searchTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || searchTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
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
?.filter((c: any, index: any) => {
    return grades?.indexOf(c) === index && c != null && c != undefined;
  });
setgradesArray(gradeContents);
  let position = AllEmployee
  ?.slice()
  ?.sort(function (a: any, b: any) {
    return a?.position_long_description?.localeCompare(b?.position_long_description);
  })
  ?.map((i: any) => {
    return i?.position_long_description;
  });
  // GradesFilter
  if (GradesFilter.length > 0) {
    position = AllEmployee
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
       // search functionality based on position
       else if (enteredName?.length > 0) {
        position = AllEmployee
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
              )|| searchTerms.every(term =>
                i?.grade?.toLowerCase().includes(term)
              ) || searchTerms.every(term =>
                i?.position_long_description?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.section?.toLowerCase().includes(term)
              )|| searchTerms.every(term =>
                i?.employee_code?.toLowerCase().includes(term)
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
  return position?.indexOf(c) === index && c != null && c != undefined;
});
setpositionArray(positionContents);
  let section = AllEmployee
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      ?.map((i: any) => {
        return i?.section;
      });
      if (positionsFilter.length > 0) {
        section = AllEmployee
          ?.slice()
          ?.sort(function (a: any, b: any) {
            return a?.section - b?.section;
          })
          ?.filter((i: any) => {
            return !!positionsFilter?.find(item2 => i?.position_long_description === item2)
          })
          ?.map((i: any) => {
            return i?.section;
          });
      }
       else if (GradesFilter?.length > 0) {
        section = AllEmployee
        ?.slice()
        ?.sort(function (a: any, b: any) {
          return a?.section - b?.section;
        })
        ?.filter((i: any) => {
          return !!GradesFilter?.find(item2 => i?.grade === item2)
        })
        ?.map((i: any) => {
          return i?.section;
        });
    }
    else if (enteredName?.length > 0) {
      section = AllEmployee
        .slice()
        ?.sort(function (a: any, b: any) {
          return a?.section?.localeCompare(
            b?.section
          );
        })
        ?.filter((i: any) => {
          if (enteredName.length > 0) {
            const searchTerms = enteredName.toLowerCase().split(" ");
            return searchTerms.every(term =>
              i?.section
                ?.toLowerCase()
                .includes(term)
            ) || searchTerms.every(term =>
              i?.grade?.toLowerCase().includes(term)
            ) || searchTerms.every(term =>
              i?.position_long_description?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.section?.toLowerCase().includes(term)
            )|| searchTerms.every(term =>
              i?.employee_code?.toLowerCase().includes(term)
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
    const sectionContents = section?.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
}, [AllEmployee,positionsFilter,enteredName,GradesFilter])
 //for section multiselect
 const [sectionsFilter, setsectionsFilter] = React.useState("");
 console.log(sectionsFilter,"sectionsFilter")
   const [anchorElSections, setAnchorElSections] = React.useState<null | HTMLElement>(
     null
   );
   const openSections = Boolean(anchorElSections);
   const handleClickSections = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElSections(event.currentTarget);
   };
   const handleClloseSections = (event: React.MouseEvent<HTMLElement>) => {
 
     setAnchorElSections(null);
   };
   const handleChangeSelectsections = (event: any) => {
   console.log(event,"sectionsFilter")
   setsectionsFilter(event?.target?.getAttribute("value"));
   setAnchorElSections(null)
   setPage(0);
 };
//for section multiselect
  
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
//For multislect options

//for icons
const [icon3, setIcon3] = React.useState<any>([]);
  const [icon1, setIcon1] = React.useState<any>([]);
  const [icon2, setIcon2] = React.useState<any>([]);
React.useEffect(() => {
  if (sectionsFilter === "None" || sectionsFilter == "") {
    setIcon3(false);
  } else {
    setIcon3(true);
  }
}, [sectionsFilter]);
React.useEffect(() => {
  if (GradesFilter?.length == 0) {
    setIcon2(false);
  } else {
    setIcon2(true);
  }
}, [GradesFilter]);
React.useEffect(() => {
  if (positionsFilter?.length == 0) {
    setIcon1(false);
  } else {
    setIcon1(true);
  }
}, [positionsFilter]);

 //drawer functions
 const [heading1, setheading1] = React.useState(true);
 const [heading2, setheading2] = React.useState(true);
 const [heading3, setheading3] = React.useState(true);
 const [heading4, setheading4] = React.useState(true);
 const [headingOfSection, setheadingOfSection] = React.useState(true);
 const [headingOfPAStatus, setheadingOfPAStatus] = React.useState(true);
 const [headingOfDivision, setheadingOfDivision] = React.useState(true);
 const [headingOfSubSection, setheadingOfSubSection] = React.useState(true);
 const [headingOfAppraiserName, setheadingOfAppraiserName] = React.useState(true);
 const [headingOfReviewerName, setheadingOfReviewerName] = React.useState(true);
 const [headingOfNormalizerName, setheadingOfNormalizerName] = React.useState(true);
 const [headingOfOverallRating, setheadingOfOverallRating] = React.useState(true);
 const [headingOfPreviousRating, setheadingOfPreviousRating] = React.useState(true);
 const [headingOfPotentialLevel, setheadingOfPotentialLevel] = React.useState(true);
 const [headingOfTalentCategory, setheadingOfTalentCategory] = React.useState(true);
 const [headingOfWorkLocation, setheadingOfWorkLocation] = React.useState(true);
 const [headingOfManagerCode, setheadingOfManagerCode] = React.useState(true);
 const [headingOfManagerName, setheadingOfManagerName] = React.useState(true);
 const [headingOfManagerPosition, setheadingOfManagerPosition] = React.useState(true);
 const [ServiceReferenceDateData, setServiceReferenceDateData] = React.useState(true);
  const [FunctionData, setFunctionData] = React.useState(true);
  const [SupervisoryRoleData, setSupervisoryRoleData] = React.useState(true);
  const [EmailIDData, setEmailIDData] = React.useState(true);
  const [rejstatusValue, rejsetstatusValue] = React.useState(true);
  const [appraiserRating, setAppraiserRating] = React.useState(true);
   const [reviewerRating, setReviewerRating] = React.useState(true);
   const [normalizeRating, setNormalizeRating] = React.useState(true);
   const [employeerating, setemployeerating] = React.useState(true);
  const handleemployeerating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemployeerating(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleAppraiserRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiserRating(event.target.checked)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleReviewerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerRating(event.target.checked)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNormalizerRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNormalizeRating(event.target.checked)
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleRejectionStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    rejsetstatusValue(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const handleServiceReferenceDateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceReferenceDateData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleFunctionData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleSupervisoryRoleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupervisoryRoleData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleEmailIDData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIDData(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const [firstName, setfirstName] = React.useState(true);

const handlefirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setfirstName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));

};
 const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
 const [headingOfEcode, setheadingOfEcode] = React.useState(true);
 const [columnHeaders, setcolumnHeaders] = useState<any>({
  Ecode: true,
   Ename: true,
   Firstname:true,
   Eposition: true,
   ESection: true,
   EGrade: true,
   EDivision: true,
   ESubSection: true,
   AppraiserName: true,
   ReviewerName: true,
   NormalizerName: true,
   OverallRating: true,
   PreviousRating: true,
   PotentialLevel: true,
   TalentCategory: true,
   WorkLocation: true,
   ManagerCode: true,
   ManagerName: true,
   ManagerPosition: true,
   Rating: true,
   PAStatus: true,
   appraiserCode:true,
   reviewerCode:true,
   normalizerCode:true,
   status:true,
    rejectionStatus:true,
    ServiceReferenceDate:true,
    Function:true,
    SupervisoryRole:true,
    EmailID:true,
    employeerating:true,
    appraiserRating: true,
    reviewerRating:true,
    normalizerRating:true,
    CalendarName:true,
    SelectAll: true,
  })
  const [appCodes, setappCodes] = React.useState(true);
  const [revCodes, setrevCodes] = React.useState(true);
  const [norCodes, setnorCodes] = React.useState(true);
  const [statusValue, setstatusValue] = React.useState(true);
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatusValue(event.target.checked);
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
  const handleAppCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setappCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));
  };
  const handleRevCodes = (event: React.ChangeEvent<HTMLInputElement>) => {  
    setrevCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleNorCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnorCodes(event.target.checked);
    const { name, checked } = event.target;
    setcolumnHeaders((prevColumnHeaders:any) => ({
      ...prevColumnHeaders,
      [name]: checked,
    }));

  };
  const handleCodes = (event: React.ChangeEvent<HTMLInputElement>) => {   
  
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
 const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
   Ename: true,
   Eposition: true,
   EGrade: true,
   Rating: true
 })


 //multiselect
 const [employeeNamefilter, setEmployeeNameFilter] = React.useState<string[]>([]);
 const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
 const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
 const [sectionfilter, setSectionfilter] = React.useState<string[]>([]);
 const [potentialfilter, setPotentialfilter] = React.useState<string[]>([]);

 console.log(positionFilter, "positionFilter");

 const handleChangeSelectEmployee = (event: SelectChangeEvent<typeof positionFilter>) => {
  const {
    target: { value },
  } = event;
  if (value.includes("None")) { setEmployeeNameFilter([]) } else {
    setEmployeeNameFilter(

      typeof value === 'string' ? value.split(',') : value,
    );
  }

};
const handleChangeSelectSection = (event: SelectChangeEvent<typeof positionFilter>) => {
  const {
    target: { value },
  } = event;
  if (value.includes("None")) { setSectionfilter([]) } else {
    setSectionfilter(

      typeof value === 'string' ? value.split(',') : value,
    );
  }

};
const handleChangeSelectPotential = (event: SelectChangeEvent<typeof positionFilter>) => {
  const {
    target: { value },
  } = event;
  if (value.includes("None")) { setPotentialfilter([]) } else {
    setPotentialfilter(

      typeof value === 'string' ? value.split(',') : value,
    );
  }

};
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
 // console.log(isDrawerOpen, "position");
 const handleEmployeeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfEcode(event.target.checked);
  // let columnHeadersTemp = columnHeaders
  // columnHeadersTemp[event.target.name] = event.target.checked;
  // setcolumnHeaders(columnHeadersTemp)
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
};
 const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
   //this state is used to re-render checkbox. Pls don't removes
   setheading1(event.target.checked);
   const { name, checked } = event.target;
   setcolumnHeaders((prevColumnHeaders:any) => ({
     ...prevColumnHeaders,
     [name]: checked,
   }));
  
 };
 const [headingcalendar, setheadingcalendar] = React.useState(true);
  const handleheadingCalendar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingcalendar(event.target.checked);
    const { name, checked } = event.target;
      setcolumnHeaders((prevColumnHeaders:any) => ({
        ...prevColumnHeaders,
        [name]: checked,
      }));
  }

 const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
   setheading2(event.target.checked);
   const { name, checked } = event.target;
   setcolumnHeaders((prevColumnHeaders:any) => ({
     ...prevColumnHeaders,
     [name]: checked,
   }));
   
 };
 const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
   setheading3(event.target.checked);
   const { name, checked } = event.target;
   setcolumnHeaders((prevColumnHeaders:any) => ({
     ...prevColumnHeaders,
     [name]: checked,
   }));
  
 };
 const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
   setheading4(event.target.checked);
   let columnHeadersTemp = columnHeaders
   columnHeadersTemp[event.target.name] = event.target.checked;
   setcolumnHeaders(columnHeadersTemp)
  
 };
 const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfSection(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfPAStatus(event.target.checked);
  let columnHeadersTemp = columnHeaders
  columnHeadersTemp[event.target.name] = event.target.checked;
  setcolumnHeaders(columnHeadersTemp)
  
};
const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfDivision(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
  
};

const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfSubSection(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfAppraiserName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfReviewerName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfNormalizerName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfOverallRating(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfPreviousRating(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfPotentialLevel(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfTalentCategory(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfWorkLocation(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfManagerCode(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfManagerName(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
 
};
const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
  setheadingOfManagerPosition(event.target.checked);
  const { name, checked } = event.target;
  setcolumnHeaders((prevColumnHeaders:any) => ({
    ...prevColumnHeaders,
    [name]: checked,
  }));
};
//drawer functions

//Excel export Function
const handleExport = () => {
  
  const mapped = AllEmployee
  ?.filter((item1: any) => {
    if (employeeNamefilter.includes("None") || employeeNamefilter.length === 0) {
      return item1;
    } else {
      return !!employeeNamefilter?.find((item2: any) => item1?.legal_full_name === item2)
    }
  })
  ?.filter((item1: any) => {
    if (positionFilter.includes("None") || positionFilter.length === 0) {
      return item1;
    } else {
      return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
    }
  })
  ?.filter((item1: any) => {
    if (GradeFilter.includes("None") || GradeFilter.length === 0) {
      return item1;
    } else {
      return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
    }
  })
  ?.filter((item1: any) => {
    if (potentialfilter.includes("None") || potentialfilter.length === 0) {
      return item1;
   } else {
        return !!potentialfilter?.find((item2: any) => item1?.appraisal?.potential === item2)
         }
      })
      ?.filter((item1: any) => {
        if (sectionfilter.includes("None") || sectionfilter.length === 0) {
          return item1;
       } else {
            return !!sectionfilter?.find((item2: any) => item1?.section === item2)
             }
          })
  ?.filter((j: any) => {
    if (enteredName === "") {
      return j;
    } else if (
    
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
              )) ||
      (getStatus(j?.appraisal?.status) !== undefined &&
      getStatus(j?.appraisal?.status)
          ?.toLocaleLowerCase()
          ?.includes(enteredName?.toLocaleLowerCase()))
    ) {
      return j;
    }
  })
  ?.map((j: any) => {
    let inputDate = j?.service_reference_date
    const dateParts = inputDate?.split("-");
    console.log(inputDate,dateParts,"inputDate")
    let date = new Date(inputDate);
    const year = date?.getFullYear();
    const month = date?.toLocaleString("default", { month: "short" });
    const day = date?.getDate();
    //const day = dateParts[2]?.slice(0, 2)
    const formattedDate = `${day}-${month}-${year}`;
    let exportData:any = {}
    if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = CalendarName
    if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Firstname"] == true) exportData["Known As"] = j?.first_name
        if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = formattedDate
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description     
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["Function"] == true) exportData["Function"] = j?.function
        if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = j?.isSupervisor != undefined ? "SP" : "N-SP"
        if (columnHeaders["EmailID"] == true) exportData["Email ID"] = j?.email
        if (columnHeaders["EDivision"] == true) exportData["Division"] = j?.division
        if (columnHeaders["ESection"] == true) exportData["Section"] = j?.section
        //if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating   
        if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = j?.sub_section
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["appraiserCode"] == true) exportData["Appraiser Code"] = j?.appraiser_code
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["reviewerCode"] == true) exportData["Reviewer Code"] = j?.reviewer_code
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["normalizerCode"] == true) exportData["HR Normalizer Code"] = j?.normalizer_code
        if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = j?.employee?.employee_rating?.toFixed(2)
        if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = j?.appraisal?.appraiser_rating?.toFixed(2)
        if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = j?.reviewer?.reviewer_rating?.toFixed(2)
        if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = j?.normalizer?.normalizer_rating?.toFixed(2)
        if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = j?.normalizer?.normalizer_rating?.toFixed(2)
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating?.toFixed(2)
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = j?.appraisal?.potential
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.talent_category      
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
        if (columnHeaders["status"] == true) exportData["Status"] = getStatus(j?.appraisal?.status)
        //if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = getRejectionstatus(j)
        return exportData
  });
  const a = [1]
  const Emptymapped = a.map((j: any) => {
    let exportData: any = {}
    if (columnHeaders["CalendarName"] == true) exportData["Calendar Name"] = ""
    if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
    if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
    if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
    if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date "] = ""      
    if (columnHeaders["Eposition"] == true) exportData["Position"] = ""   
    if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
    if (columnHeaders["Function"] == true) exportData["Function"] = ""
    if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = ""
    if (columnHeaders["EmailID"] == true) exportData["Email ID"] = ""
    if (columnHeaders["EDivision"] == true) exportData["Division"] = ""
    if (columnHeaders["ESection"] == true) exportData["Section"] = ""
    //if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating   
    if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = ""
    if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
    if (columnHeaders["appraiserCode"] == true) exportData["Appraiser Code"] = ""
    if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
    if (columnHeaders["reviewerCode"] == true) exportData["Reviewer Code"] = ""
    if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = ""
    if (columnHeaders["normalizerCode"] == true) exportData["HR Normalizer Code"] = ""
    if (columnHeaders["NormalizerName"] == true) exportData["HR Normalizer Name"] = ""
    if (columnHeaders["employeerating"] == true) exportData["Employee Rating "] = ""
    if (columnHeaders["appraiserRating"] == true) exportData["Appraiser Rating"] = ""
    if (columnHeaders["reviewerRating"] == true) exportData["Reviewer Rating"] = ""
    if (columnHeaders["normalizerRating"] == true) exportData["HR Normalizer Rating"] = ""
    if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = ""
    if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = ""
    if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = ""
    if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = ""      
    if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
    if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
    if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
    // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
    if (columnHeaders["status"] == true) exportData["Status"] = ""
   // if (columnHeaders["rejectionStatus"] == true) exportData["Rejection Status"] = ""
      return exportData
});
  //Export Funcs
  var wb = XLSX.utils.book_new(),
  ws = XLSX.utils.json_to_sheet(mapped == "" ? Emptymapped :mapped);

  XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

  XLSX.writeFile(wb, "MyExcel.xlsx");
};

//Functions for apply and cancel buttons
const handleExportFunction = () => {
  setisDrawerOpen(true);
  //FiiteredExport1();
 
};

const handleheadingSortAccept = () => {
 
  // let temp = { ...columnHeaders }
  // setcolumnHeadersDisplay(temp);
  setisDrawerOpen(false);
  handleExport();
  setcolumnHeaders({
    Ecode: true,
    Ename: true,
    Firstname:true,
    Eposition: true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    PreviousRating: true,
    PotentialLevel: true,
    TalentCategory: true,
    WorkLocation: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    Rating: true,
    PAStatus: true,
    appraiserCode:true,
    reviewerCode:true,
    normalizerCode:true,
    status:true,
     rejectionStatus:true,
     ServiceReferenceDate:true,
     Function:true,
     SupervisoryRole:true,
     EmailID:true,
     employeerating:true,
     appraiserRating: true,
     reviewerRating:true,
     normalizerRating:true,
     CalendarName:true,
     SelectAll: true,
   })
  

};
const handleCloseGrade = () => {
  
  setisDrawerOpen(false);
  setcolumnHeaders({
    Ecode: true,
    Ename: true,
    Firstname:true,
    Eposition: true,
    ESection: true,
    EGrade: true,
    EDivision: true,
    ESubSection: true,
    AppraiserName: true,
    ReviewerName: true,
    NormalizerName: true,
    OverallRating: true,
    PreviousRating: true,
    PotentialLevel: true,
    TalentCategory: true,
    WorkLocation: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    Rating: true,
    PAStatus: true,
    appraiserCode:true,
    reviewerCode:true,
    normalizerCode:true,
    status:true,
     rejectionStatus:true,
     ServiceReferenceDate:true,
     Function:true,
     SupervisoryRole:true,
     EmailID:true,
     employeerating:true,
     appraiserRating: true,
     reviewerRating:true,
     normalizerRating:true,
     CalendarName:true,
     SelectAll: true,
   })
  
};
const getRejectionstatus = (j:any) =>{
  if(j?.employee?.employee_agree === true) return "Re-normalization"
  else return "Mediation"
}
useEffect(()=>{
  const Paginate =AllEmployee
  ?.filter((j: any) => {
    if (sectionsFilter === "None" || sectionsFilter === "") {
      return j;
    } else {
      return j?.section
        ?.toLocaleLowerCase() === sectionsFilter?.toLocaleLowerCase();
      //?.includes(empManagerCode?.toLocaleLowerCase());
    }
  })?.filter((item1: any) => {
            if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
              return item1;
            } else {
              return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
            }
          })
          .filter((item1: any) => {
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
  
    (j?.legal_full_name !== undefined &&
      j?.legal_full_name
        ?.toLocaleLowerCase()
        ?.includes(
          enteredName?.toLocaleLowerCase()
        )) ||  
        (j?.grade !== undefined &&
          j?.grade
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            ))||               
    (j.position_long_description !== undefined &&
      j?.position_long_description
        ?.toLocaleLowerCase()
        ?.includes(
          enteredName?.toLocaleLowerCase()
        )) ||
        (j?.appraisal?.potential !== undefined &&
          j?.appraisal?.potential
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            ))||
            (j?.talent_category !== undefined &&
              j?.talent_category
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                )) ||
   (j?.section !== undefined &&
          j?.section
            ?.toLocaleLowerCase()
            ?.includes(
              enteredName?.toLocaleLowerCase()
            )) ||
    (getStatus(j?.appraisal?.status) !== undefined &&
    getStatus(j?.appraisal?.status)
        ?.toLocaleLowerCase()
        ?.includes(enteredName?.toLocaleLowerCase()))
  ) {
    return j;
  }
})
console.log(Paginate?.length,"paginate")
settablecount(Paginate?.length)

},[AllEmployee,positionsFilter,GradesFilter,sectionsFilter,enteredName])
 //Functions for apply and cancel buttons

 const tableDataFilterdLength = AllEmployee
 ?.filter((item1: any) => {
   if (employeeNamefilter?.includes("None") || employeeNamefilter?.length === 0) {
     return item1;
   } else {
     return !!employeeNamefilter?.find((item2: any) => item1?.legal_full_name === item2)
   }
 })
?.filter((item1: any) => {
 if (positionFilter?.includes("None") || positionFilter?.length === 0) {
   return item1;
 } else {
   return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
 }
})
?.filter((item1: any) => {
if (GradeFilter?.includes("None") || GradeFilter?.length === 0) {
  return item1;
} else {
    return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
     }
  })
  ?.filter((item1: any) => {
   if (potentialfilter?.includes("None") || potentialfilter?.length === 0) {
     return item1;
  } else {
       return !!potentialfilter?.find((item2: any) => item1?.appraisal?.potential === item2)
        }
     })
?.filter((item1: any) => {
       if (sectionfilter?.includes("None") || sectionfilter?.length === 0) {
         return item1;
      } else {
           return !!sectionfilter?.find((item2: any) => item1?.section === item2)
            }
         })
         ?.filter((j: any) => {
          if (sectionsFilter === "None" || sectionsFilter === "") {
            return j;
          } else {
            return j?.section
              ?.toLocaleLowerCase() === sectionsFilter?.toLocaleLowerCase();
            //?.includes(empManagerCode?.toLocaleLowerCase());
          }
        })
         ?.filter((item1: any) => {
           if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
             return item1;
           } else {
             return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
           }
         })
         .filter((item1: any) => {
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
 
   (j?.legal_full_name !== undefined &&
     j?.legal_full_name
       ?.toLocaleLowerCase()
       ?.includes(
         enteredName?.toLocaleLowerCase()
       )) ||  
       (j?.grade !== undefined &&
         j?.grade
           ?.toLocaleLowerCase()
           ?.includes(
             enteredName?.toLocaleLowerCase()
           ))||               
   (j.position_long_description !== undefined &&
     j?.position_long_description
       ?.toLocaleLowerCase()
       ?.includes(
         enteredName?.toLocaleLowerCase()
       )) ||
       (j?.appraisal?.potential !== undefined &&
         j?.appraisal?.potential
           ?.toLocaleLowerCase()
           ?.includes(
             enteredName?.toLocaleLowerCase()
           ))||
           // ( j?.normalizer?.normalizer_rating !== undefined &&
           //   j?.normalizer?.normalizer_rating
           //     ?.toLocaleLowerCase()
           //     ?.includes(
           //       enteredName?.toLocaleLowerCase()
           //     )) ||
  (j?.section !== undefined &&
         j?.section
           ?.toLocaleLowerCase()
           ?.includes(
             enteredName?.toLocaleLowerCase()
           )) ||
   (getStatus(j?.appraisal?.status) !== undefined &&
   getStatus(j?.appraisal?.status)
       ?.toLocaleLowerCase()
       ?.includes(enteredName?.toLocaleLowerCase()))
 ) {
   return j;
 }
})
const maxLengthForSearch = 30;
const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setenteredName(e.target.value);
    setPage(0);
  }
  return (
    <>
    

    <Box
      sx={{
        // maxWidth: "95% !important",
        // width: "100%",
        // height: "calc(100vh - 165px)",
        background: "#fff",
        padding: "20px",
        marginLeft: "25px",
        marginRight:"25px",
        marginBottom:"25px"
      }}
    >
      <div>
      <Stack 
        direction="row" 
        alignItems="center"
         justifyContent="space-between" 
         paddingBottom="20px"
>       

 <Typography style={{fontSize:"20px",color:"333333",fontFamily:"Arial"}}>
   {/* All Employee Details */}
</Typography> 

          <div>
            <Stack direction="row" alignItems="flex-start" >
          <Searchfeild >
            <TextField
              id="outlined-basic"
              placeholder="Search Here..."
              autoComplete="off"
              inputProps={{ maxLength: 256 }}
             // onChange={(e) => setenteredName(e.target.value)}
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
            <div>
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer"  }}
              onClick={handleExportFunction}
            />
            </div>
            {/* <div>
              <img
                src={Expand}
                alt="icon"
                style={{ marginLeft: "15px", marginTop: "5px" }}
              />
            </div> */}
            </Stack>
          </div>
          </Stack>
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
                              <Checkbox
                                checked={columnHeaders.CalendarName}
                                name="CalendarName"
                                onChange={handleheadingCalendar} />
                            }
                            label="Calendar Name"
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
                              checked={columnHeaders.Ecode}
                              name="Ecode"
                              onChange={handleEmployeeCode} />
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
                              checked={columnHeaders.Ename}
                              name="Ename"
                              onChange={handleheading1} />
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
                              checked={columnHeaders.Firstname}
                              name="Firstname"
                              onChange={handlefirstName} />
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
                              checked={columnHeaders.ServiceReferenceDate}
                              name="ServiceReferenceDate"
                              onChange={handleServiceReferenceDateData} />
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
                              checked={columnHeaders.Eposition}
                              name="Eposition"
                              onChange={handleheading2} />
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
                              checked={columnHeaders.EGrade}
                              name="EGrade"
                              onChange={handleheading3}
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
                              checked={columnHeaders.Function}
                              name="Function"
                              onChange={handleFunctionData} />
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
                              checked={columnHeaders.SupervisoryRole}
                              name="SupervisoryRole"
                              onChange={handleSupervisoryRoleData} />
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
                              checked={columnHeaders.EmailID}
                              name="EmailID"
                              onChange={handleEmailIDData} />
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
                            <Checkbox
                              checked={columnHeaders.EDivision}
                              name="EDivision"
                              onChange={handleDivision} />
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
                              checked={columnHeaders.ESection}
                              name="ESection"
                              onChange={handleSection} />
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
                              checked={columnHeaders.ESubSection}
                              name="ESubSection"
                              onChange={handleSubSection} />
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
                              onChange={handleWorkLocation} />
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
                              checked={columnHeaders.appraiserCode}
                            name="appraiserCode"
                              onChange={handleAppCodes} />
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
                              onChange={handleAppraiserName} />
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
                              checked={columnHeaders.reviewerCode}
                              name="reviewerCode"
                              onChange={handleRevCodes}  />
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
                              checked={columnHeaders.ReviewerName}
                              name="ReviewerName"
                              onChange={handleReviewerName} />
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
                              checked={columnHeaders.normalizerCode}
                             name="normalizerCode"
                              onChange={handleNorCodes}  />
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
                              checked={columnHeaders.NormalizerName}
                              name="NormalizerName"
                              onChange={handleNormalizerName} />
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
                              checked={columnHeaders.employeerating}
                              name="employeerating"
                              onChange={handleemployeerating} />
                          }
                          label="Employee Rating "
                        />
                        {/* handleemployeerating */}
                     
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
                              checked={columnHeaders.appraiserRating}
                              name="appraiserRating"
                              onChange={handleAppraiserRating} />
                          }
                          label="Appraiser Rating"
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
                              checked={columnHeaders.reviewerRating}
                              name="reviewerRating"
                              onChange={handleReviewerRating} />
                          }
                          label="Reviewer Rating"
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
                              checked={columnHeaders.normalizerRating}
                              name="normalizerRating"
                              onChange={handleNormalizerRating} />
                          }
                          label="HR Normalizer Rating"
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
                              checked={columnHeaders.OverallRating}
                              name="OverallRating"
                              onChange={handleOverallRating} />
                          }
                          label="Overall Rating"
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
                              checked={columnHeaders.normalizerRating}
                              name="pendingAction"
                              onChange={handlependingAction} />
                          }
                          label="Pending Action"
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
                              checked={columnHeaders.PreviousRating}
                              name="PreviousRating"
                              onChange={handlePreviousRating} />
                          }
                          label="Previous Period Rating"
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
                              checked={columnHeaders.PotentialLevel}
                              name="PotentialLevel"
                              onChange={handlePotentialLevel} />
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
                              checked={columnHeaders.TalentCategory}
                              name="TalentCategory"
                              onChange={handleTalentCategory} />
                          }
                          label="Talent Category"
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
                              checked={columnHeaders.ManagerCode}
                              name="ManagerCode"
                              onChange={handleManagerCode} />
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
                              onChange={handleManagerName} />
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
                              onChange={handleManagerPosition} />
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
                              checked={columnHeaders.status}
                              name="status"
                              onChange={handleStatus} />
                          }
                          label="Status"
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
                              checked={columnHeaders.rejectionStatus}
                              name="rejectionStatus"
                              onChange={handleRejectionStatus} />
                          }
                          label="Rejection Status"
                        />*/}
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
        <TableContainer>
          <Scroll>
            <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 270px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    {/* <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >  Employee Code</TableCell> */}
                    <TableCell
                      width="250px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >Employee Name
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
                                  value={employeeNamefilter}
                                  onChange={handleChangeSelectEmployee}
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
                                      primaryTypographyProps={{  fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                      primary="None" />
                                  </MenuItem>

                                  {AllEmployee
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.legal_full_name.localeCompare(b.legal_full_name); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data.legal_full_name }).indexOf(item.legal_full_name) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px"
                                        }}
                                      
                                        key={name?.legal_full_name}
                                        value={name?.legal_full_name}
                                      >
                                        <Checkbox
                                        style={{padding:"3px",paddingLeft:"14px"}}
                                          size="small"
                                          checked={employeeNamefilter.indexOf(name?.legal_full_name) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                          primary={name?.legal_full_name} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                              
                              </Stack>
                            </FormControl> */}
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
                                      paddingLeft: "37px"
                                    }}
                                  >
                                  
                                    <ListItemText
                                      primaryTypographyProps={{  fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                      primary="None" />
                                  </MenuItem>

                                  {AllEmployee
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a?.position_long_description?.localeCompare(b?.position_long_description); })
                                    ?.filter((item: any, index: any, array: any) => array?.map((data: any) => { return data?.position_long_description }).indexOf(item?.position_long_description) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px"
                                        }}
                                      
                                        key={name?.position_long_description}
                                        value={name?.position_long_description}
                                      >
                                        <Checkbox
                                        style={{padding:"3px",paddingLeft:"14px"}}
                                          size="small"
                                          checked={positionFilter.indexOf(name?.position_long_description) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                          primary={name?.position_long_description} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                               
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
                                {icon1 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
                    </TableCell>
                      <TableCell
                       width="30px"
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
                                {icon2 && (
                                  <FilterAltTwoToneIcon />)}
                              </Stack>
                            </FormControl>
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
                    >
                 <Stack direction="row" alignItems="center" justifyContent="center" >
                      <div
                        aria-controls={openSections ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSections ? "true" : undefined}
                        onClick={handleClickSections}
                      >
                        <Stack direction="row" alignItems="center">
                          Section
                          <ArrowDropDownOutlinedIcon style={{ cursor: "pointer" }} />
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
                        anchorEl={anchorElSections}
                        open={openSections}
                        onClose={handleClloseSections}

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
                          onClick={handleChangeSelectsections}
                        >Clear Filter
                        </MenuItem>

                        {sectionArray.map((name: any) => (
                          <MenuItem
                            style={{
                              fontSize: "13px",
                              fontFamily: "Arial",
                              color: "#333333",
                              padding: "0px 10px 2px 17px",
                              backgroundColor: sectionsFilter === name ? "#EAECED" : "",

                            }}
                            key={name}
                            value={name}
                            onClick={handleChangeSelectsections}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Menu>
                      {icon3 && <FilterAltTwoToneIcon />}
                    </Stack>
                    </TableCell>
                    <TableCell
                    width="80px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >Potential<br></br> Level
                      {/* <FormControl sx={{ m: 0, width: 100, height: "0" }}>
                              <Stack direction="row">
                                <span> Potential Level</span>
                                <Select
                                  size="small"
                                  sx={{ width: "25px", fontSize: "0rem" }}
                                  disableUnderline
                                  variant="standard"
                                  MenuProps={MenuProps}
                                  multiple
                                  value={potentialfilter}
                                  onChange={handleChangeSelectPotential}
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
                                      primaryTypographyProps={{  fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                      primary="None" />
                                  </MenuItem>

                                  {AllEmployee
                                    ?.slice()
                                    ?.sort(function (a: any, b: any) { return a.section.localeCompare(b?.appraisal?.potential); })
                                    ?.filter((item: any, index: any, array: any) => array.map((data: any) => { return data?.appraisal?.potential}).indexOf(item?.appraisal?.potential) === index)
                                    ?.map((name: any, index: any) => (
                                      <MenuItem
                                        sx={{
                                          padding: "0px",
                                          fontSize: "14px"
                                        }}
                                        key={name?.appraisal?.potential}
                                        value={name?.appraisal?.potential}
                                      >
                                        <Checkbox
                                        style={{padding:"3px",paddingLeft:"14px"}}
                                          size="small"
                                          checked={potentialfilter.indexOf(name?.appraisal?.potential) > -1} />
                                        <ListItemText
                                          primaryTypographyProps={{ fontSize: "14px",fontFamily:"arial",color:"#333333" }}
                                          primary={name?.appraisal?.potential} />
                                      </MenuItem>
                                    )
                                    )}
                                </Select>
                              
                              </Stack>
                            </FormControl> */}
                    </TableCell>
                   
                    {hideEmployeeRating && 
                    <TableCell
                    width="70px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Employee<br></br> Rating
                    </TableCell>}
                    <TableCell
                     width="250px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Talent<br></br> Category
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
                      PA Status
                    </TableCell> */}
                     <TableCell
                     width="80px"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     Overall<br></br> Rating
                    </TableCell>
                  </TableRow>
                </TableHead>
                {tableDataFilterdLength?.length > 0 ? (
                <TableBody>
                  
              {AllEmployee
               .sort((a: any, b: any) => b?.normalizer?.normalizer_rating - a?.normalizer?.normalizer_rating)
              // normalizer?.normalizer_rating
                ?.filter((item1: any) => {
                  if (employeeNamefilter?.includes("None") || employeeNamefilter?.length === 0) {
                    return item1;
                  } else {
                    return !!employeeNamefilter?.find((item2: any) => item1?.legal_full_name === item2)
                  }
                })
               ?.filter((item1: any) => {
                if (positionFilter?.includes("None") || positionFilter?.length === 0) {
                  return item1;
                } else {
                  return !!positionFilter?.find((item2: any) => item1?.position_long_description === item2)
                }
              })
              ?.filter((item1: any) => {
               if (GradeFilter?.includes("None") || GradeFilter?.length === 0) {
                 return item1;
              } else {
                   return !!GradeFilter?.find((item2: any) => item1?.grade === item2)
                    }
                 })
                 ?.filter((item1: any) => {
                  if (potentialfilter?.includes("None") || potentialfilter?.length === 0) {
                    return item1;
                 } else {
                      return !!potentialfilter?.find((item2: any) => item1?.appraisal?.potential === item2)
                       }
                    })
              ?.filter((item1: any) => {
                      if (sectionfilter?.includes("None") || sectionfilter?.length === 0) {
                        return item1;
                     } else {
                          return !!sectionfilter?.find((item2: any) => item1?.section === item2)
                           }
                        })
                        ?.filter((j: any) => {
                          if (sectionsFilter === "None" || sectionsFilter === "") {
                            return j;
                          } else {
                            return j?.section
                              ?.toLocaleLowerCase() === sectionsFilter?.toLocaleLowerCase();
                            //?.includes(empManagerCode?.toLocaleLowerCase());
                          }
                        })
                        ?.filter((item1: any) => {
                          if (positionsFilter?.includes("None") || positionsFilter?.length === 0) {
                            return item1;
                          } else {
                            return !!positionsFilter?.find((item2: any) => item1?.position_long_description === item2)
                          }
                        })
                        .filter((item1: any) => {
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
                
                  (j?.legal_full_name !== undefined &&
                    j?.legal_full_name
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||  
                      (j?.grade !== undefined &&
                        j?.grade
                          ?.toLocaleLowerCase()
                          ?.includes(
                            enteredName?.toLocaleLowerCase()
                          ))||               
                  (j.position_long_description !== undefined &&
                    j?.position_long_description
                      ?.toLocaleLowerCase()
                      ?.includes(
                        enteredName?.toLocaleLowerCase()
                      )) ||
                      (j?.appraisal?.potential !== undefined &&
                        j?.appraisal?.potential
                          ?.toLocaleLowerCase()
                          ?.includes(
                            enteredName?.toLocaleLowerCase()
                          ))||
                          // ( j?.normalizer?.normalizer_rating !== undefined &&
                          //   j?.normalizer?.normalizer_rating
                          //     ?.toLocaleLowerCase()
                          //     ?.includes(
                          //       enteredName?.toLocaleLowerCase()
                          //     )) ||
                 (j?.section !== undefined &&
                        j?.section
                          ?.toLocaleLowerCase()
                          ?.includes(
                            enteredName?.toLocaleLowerCase()
                          )) ||
                  (getStatus(j?.appraisal?.status) !== undefined &&
                  getStatus(j?.appraisal?.status)
                      ?.toLocaleLowerCase()
                      ?.includes(enteredName?.toLocaleLowerCase()))
                ) {
                  return j;
                }
              })?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).map((j:any)=>{
                          return (
 <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              borderColor: "lightgrey",
                            },
                          }}
                        >
                          {/* <TableCell  align="center">
                          {j?.employee_code}
                          </TableCell> */}
                          
                          <TableCell
                            align="left"
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "lightgrey",
                              fontSize: "14px",
                              color: "#333333",
                              wordBreak: "break-word",
                            }}
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
                              wordBreak: "break-word",
                            }}
                          >
                           	{j?.position_long_description}
                              
                          </TableCell>
                           <TableCell sx={{
                              fontFamily: "Arial",
                              borderColor: "lightgrey",
                              fontSize: "14px",
                              color: "#333333",
                              wordBreak: "break-word",
                              paddingRight:"50px"
                            }} align="center">
                          {j?.grade}
                          </TableCell>
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
                            	{j?.section}
                          </TableCell>
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
                            	{j?.appraisal?.potential}
                          </TableCell>
                         
                          {hideEmployeeRating && <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "lightgrey",
                              fontSize: "14px",
                              color: "#333333",
                              wordBreak: "break-word",
                            }}
                          >
                         {(
                                  j?.employee?.employee_rating == 0 || j?.employee?.normalizer_status == "draft") ? (
                                    <span> - </span>
                                ) : (
                                  j?.employee?.employee_rating?.toFixed(2)
                                )}
                          </TableCell>}
                          {/* <TableCell
                            align="center"
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "lightgrey",
                              fontSize: "14px",
                              color: "#333333",
                              wordBreak: "break-word",
                            }}
                          >
                        {getStatus(j?.appraisal?.status)}
                          </TableCell> */}
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
                        {/* {getStatus(j?.appraisal?.status)} */}
                        {/* - */}
                        {j?.talent_category}
                          </TableCell>
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
                           {(
                                  j?.normalizer?.normalizer_rating == 0 || j?.normalizer?.normalizer_status == "draft") ? (
                                    <span> - </span>
                                ) : (
                                  j?.normalizer?.normalizer_rating?.toFixed(2)
                                )}
                          </TableCell>
                        </TableRow>)
                     })}
                </TableBody>):(
    <TableBody>
    <TableRow>
      <TableCell 
      colSpan={6}
      align="left" 
      style={{ fontWeight: '500',border:"none",color:"#808080",fontSize:"18px",fontFamily:"arial",paddingTop:"10px"  }}
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
        {tableDataFilterdLength?.length > 0 && <TablePagination
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  component="div"
                  // count={users.length}
                  count={tablecount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />}
      </div>
    </Box>
    </>
  );
}
