import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, TablePagination, Breadcrumbs, TextField, Drawer, FormGroup, FormControlLabel, Checkbox, MenuItem, ListItemText, FormControl, ListItemIcon } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Expand from "../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Newexcel from "../../../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import { useGetEmployeeByFilterQuery } from "../../service";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { useNavigate, Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Searchlens from "../../assets/Images/Searchlens.svg";
import * as XLSX from "xlsx";
import AppraiserDashboardContext from '../reviewer/Dashboard/AppraiserDashboardContext';
import { useDashboardContext } from "../reviewer/Dashboard/AppraiserDashboardContext";
import { makeStyles } from '@mui/styles';

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
export default function FilteredExpandTableofODNormalizer(props: any) {
  const classes = useStyles();
  const { EmployeeData, hideEmployeeRating } = props;
  console.log(EmployeeData, "FilteredExpandtable")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const CustomScrollbar = Scrollbar as any;

  const [tablecount, settablecount] = React.useState<any>(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };
  useEffect(() => {
    settablecount(EmployeeData?.length)
  }, [EmployeeData])
  //For multislect options
  const [gradesArray, setgradesArray] = React.useState<any>([]);
  const [positionArray, setpositionArray] = React.useState<any>([]);
  const [sectionArray, setsectionArray] = React.useState<any>([]);
  useEffect(() => {
    const grades = EmployeeData
      ?.slice()
      ?.sort(function (a: any, b: any) {
        return a?.grade - b?.grade;
      })
      .map((i: any) => {
        return i?.grade;
      });
    const gradeContents = grades
      ?.filter((c: any, index: any) => {
        return grades?.indexOf(c) === index && c != null && c != undefined;
      });
    setgradesArray(gradeContents);
    const position = EmployeeData
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
    setpositionArray(positionContents);
    const section = EmployeeData
      .slice()
      ?.sort(function (a: any, b: any) {
        return a?.section?.localeCompare(b?.section);
      })
      .map((i: any) => {
        return i?.section;
      });
    const sectionContents = section.filter((c: any, index: any) => {
      return section?.indexOf(c) === index && c != null && c != undefined;
    });
    setsectionArray(sectionContents);
  }, [EmployeeData])
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

  const [GradesFilter, setGradesFilter] = React.useState<string[]>([]);
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
  };

  const [positionsFilter, setpositionsFilter] = React.useState<string[]>([]);
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
  };
  //For multislect options
  //@ts-ignore
  const { FilteredEmployeeData, setFilteredEmployeeData, statusofUnknown } = useDashboardContext();
  console.log(FilteredEmployeeData, statusofUnknown, "FilteredEmployeeDataN")

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

  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  const [headingOfEcode, setheadingOfEcode] = React.useState(true);
  const [columnHeaders, setcolumnHeaders] = useState<any>({
    Ecode: true,
    Ename: true,
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
  })
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
    Ename: true,
    Eposition: true,
    EGrade: true,
    Rating: true
  })
  // console.log(isDrawerOpen, "position");
  const handleEmployeeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfEcode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //this state is used to re-render checkbox. Pls don't removes
    setheading1(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSection(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handlePAStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPAStatus(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleDivision = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfDivision(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };

  const handleSubSection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfSubSection(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleAppraiserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfAppraiserName(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleReviewerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfReviewerName(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleNormalizerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfNormalizerName(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleOverallRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfOverallRating(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handlePreviousRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPreviousRating(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handlePotentialLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfPotentialLevel(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleTalentCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfTalentCategory(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleWorkLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfWorkLocation(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleManagerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerCode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleManagerName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerName(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  const handleManagerPosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingOfManagerPosition(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)

  };
  //drawer functions

  //Excel export Function
  const handleExport = () => {

    const mapped = EmployeeData
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
        if (sectionFilter.includes("None") || sectionFilter.length === 0) {
          return item1;
        } else {
          return !!sectionFilter?.find((item2: any) => item1?.section === item2)
        }
      })
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
      ?.map((j: any) => {

        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["Employee Name"] = j?.legal_full_name
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["ESection"] == true) exportData["Section"] = j?.section
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        if (columnHeaders["EDivision"] == true) exportData["Division"] = j?.division
        if (columnHeaders["ESubSection"] == true) exportData["Sub-section"] = j?.sub_section
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["NormalizerName"] == true) exportData["Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = j?.normalizer?.normalizer_rating
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating
        if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = j?.appraisal?.potential
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.talent_category
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
        return exportData
      });
    const a = [1]
    const Emptymapped = a.map((j: any) => {
      let exportData: any = {}
      if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
      if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
      if (columnHeaders["Eposition"] == true) exportData["Eposition"] = ""
      if (columnHeaders["ESection"] == true) exportData["ESection"] = ""
      if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
      if (columnHeaders["EDivision"] == true) exportData["Division"] = ""
      if (columnHeaders["ESubSection"] == true) exportData["SubSection"] = ""
      if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
      if (columnHeaders["ReviewerName"] == true) exportData["Reviewer Name"] = ""
      if (columnHeaders["NormalizerName"] == true) exportData["Normalizer Name"] = ""
      if (columnHeaders["OverallRating"] == true) exportData["Overall Rating"] = ""
      if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = ''
      if (columnHeaders["PotentialLevel"] == true) exportData["Potential Level"] = ""
      if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = ""
      if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
      if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
      if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
      if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
      // if(columnHeaders["PAStatus"] == true)exportData["PAStatus"] = {getStatus(j?.appraisal?.status)}
      return exportData
    });
    //Export Funcs
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped == "" ? Emptymapped : mapped);

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
  };
  const handleCloseGrade = () => {

    setisDrawerOpen(false);
    setcolumnHeaders({
      Ecode: true,
      Ename: true,
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
    })
  };
  //Functions for apply and cancel buttons
  //multiselect
  const [positionFilter, setpositionFilter] = React.useState<string[]>([]);
  const [GradeFilter, setGradeFilter] = React.useState<string[]>([]);
  const [sectionFilter, setSectionFilter] = React.useState<string[]>([]);
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
  const handleChangeSelectSection = (event: SelectChangeEvent<typeof sectionFilter>) => {
    const {
      target: { value },
    } = event;

    if (value.includes("None")) { setSectionFilter([]) } else {
      setSectionFilter(

        typeof value === 'string' ? value.split(',') : value,
      );
    }
  };
  const maxLengthForSearch = 30;
  const handleSearchBar = (e: any) => {
      if (e.target.value.length > maxLengthForSearch) {
        e.target.value = e.target.value.slice(0, maxLengthForSearch);
      }
      setenteredName(e.target.value);
    }
  return (
    <>
      <AppraiserDashboardContext>

        <Box
          sx={{
            // maxWidth: "95% !important",
            // width: "100%",
            // height: "calc(100vh - 165px)",
            background: "#fff",
            padding: "20px",
            marginLeft: "25px",
            marginRight: "25px"
          }}
        >
          <div>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              paddingBottom="20px"
            >

              <Typography style={{ fontSize: "20px", color: "333333", fontFamily: "Arial" }}>
                {/* All Employee Details */}
              </Typography>


              <div>
                <Stack direction="row" alignItems="flex-start" >
                  <Searchfeild >
                    <TextField
                      id="outlined-basic"
                      placeholder="Search Here..."
                      autoComplete="off"
                      // inputProps={{ maxLength: 256 }}
                      onChange={handleSearchBar}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src={Searchlens} alt="icon" />
                          </InputAdornment>
                        ),
                        inputProps:  {maxLengthForSearch}
                      }}
                    />
                  </Searchfeild>
                  <div>
                    <img
                      src={Newexcel}
                      alt="icon"
                      style={{ marginLeft: "15px", marginTop: "5px", cursor: "pointer" }}
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
                  }}
                  variant="subtitle1"
                  align="center"
                >
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
                                checked={columnHeaders.OverallRating}
                                name="Overall Rating"
                                onChange={handleOverallRating} />
                            }
                            label="Overall Rating"
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
                          width="300px"
                          align="center"
                          sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Employee Name
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
                      Position
                    </TableCell> */}
                        <TableCell align="center" width="250px">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              border: "none",
                              background: "none",
                              // margin:"-5px"
                            }}
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
                                    },
                                }}
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

                                      <ListItemText sx={{
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
                                {/* {icon2 && (
                                  <FilterAltTwoToneIcon />)} */}
                              </Stack>
                            </FormControl>

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
                    >  Grade
                    </TableCell> */}
                        <TableCell align="center" width="30px">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              border: "none",
                              background: "none",
                              // margin:"-5px"
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

                                      <ListItemText sx={{
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
                                {/* {icon3 && (
                                  <FilterAltTwoToneIcon />)} */}
                              </Stack>
                            </FormControl>
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
                      Section
                    </TableCell> */}
                        <TableCell align="center" width="200px">
                          <div
                            style={{
                              color: "#3e8cb5",
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Arial",
                              border: "none",
                              background: "none",
                              // margin:"-5px"
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
                                  onChange={handleChangeSelectsections}
                                  // input={<OutlinedInput label="Name" />}
                                  variant="standard"
                                  MenuProps={MenuProps}
                                >
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      fontFamily: "Arial",
                                      color: "#333333",
                                      justifyContent: "left",
                                padding: "0px 10px 2px 17px"
                                    }}
                                    key="None"
                                    value="None"
                                  >
                                    Clear Filter
                                  </MenuItem>

                                  {sectionArray.map((name: any) => (
                                    <MenuItem
                                      style={{
                                        fontSize: "13px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        padding: "0px 10px 2px 17px"
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
                        </TableCell>
                        <TableCell
                         width="60px"
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
                        {hideEmployeeRating && <TableCell
                          align="center"
                          width="60px"
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
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {EmployeeData
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
                          if (sectionFilter.includes("None") || sectionFilter.length === 0) {
                            return item1;
                          } else {
                            return !!sectionFilter?.find((item2: any) => item1?.section === item2)
                          }
                        })
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
                        })?.slice(
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
                                paddingRight: "50px"
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
                                {(
                                  j?.normalizer?.normalizer_rating == 0 || j.normalizer.normalizer_status == "draft") ? (
                                  <span> - </span>
                                ) : (
                                  j?.normalizer?.normalizer_rating
                                )}
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
                                  j?.employee?.employee_rating == 0 || j.employee.normalizer_status == "draft") ? (
                                  <span> - </span>
                                ) : (
                                  j?.employee?.employee_rating
                                )}
                              </TableCell>}
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
                                {j?.talent_category}
                              </TableCell>
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
        </Box>
      </AppraiserDashboardContext>
    </>
  );
}
