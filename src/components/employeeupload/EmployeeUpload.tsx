import React, { useEffect, useState, useContext, useCallback } from "react";
import Stack from "@mui/material/Stack";
import { Alert, CircularProgress, Container, makeStyles, TextField } from "@mui/material";
import { Button, TableContainer } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EmployeeUploadlisttable from "./EmployeeUploadListtable";
import PAMaster from "../../components/UI/PAMaster";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import * as XLSX from "xlsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Scrollbar } from "react-scrollbars-custom";
import Newexcel from "../employee/icons/Newexcel.svg";
import { useUpdateEmployeeinBulkMutation } from "../../service/employee/bulkUpload";
import AlertDialogSuccess from "../UI/DialogSuccess";
import { ADD_EMPLOYEE } from "../../constants/routes/Routing";
import { useLocation } from "react-router-dom";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useGetActiveCalenderQuery } from "../../service";
import dayjs from 'dayjs'
import DisplayingErrors from "./DisplayingErrors"
const Text = styled("div")({
  fontSize: "14px",
  color: "#333333",
  paddingBottom: "6px",
  // opacity: 0.84,
  // marginLeft: "5px",
});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Headings = styled("div")({
  fontSize: "12px",
  color: "#717171",

  fontFamily: "Arial",
  // marginLeft: "23px",
});
const Labels = styled("div")({
  fontSize: "12px",
  // opacity: 0.64,
  color: "#717171",
  fontFamily: "Arial",
});

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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Item(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) => (theme.palette.mode === "dark" ? "black" : "black"),

        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 1,
        fontSize: "1.1rem",
        fontWeight: "100",
        // height: "80px",
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    />
  );
}
const steps = ["Export Template", "Excel File"];

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  // @ts-ignore
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

export default function EmployeeUpload() {
  const [value, setValue] = React.useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [grade, setGrade] = useState("");
  const [Excel, setExcel] = useState<any>([]);
  const [Excelfile, setExcelfile] = useState<any>([]);
  const [Exceldata, setExceldata] = useState<any>([]);
  const [ExcelError, setExcelError] = useState<any>([]);
  const [trigger, setTrigger] = useState(false);
  const [download, setDownload] = useState<any>([]);
  const [added, setAdded] = useState<any>([]);
  const [addEmployees, { error: uploadError, isLoading: UploadingInProgress }] = useUpdateEmployeeinBulkMutation();
  const { data: activeCalendarData } = useGetActiveCalenderQuery('');
  const [addSingleData, setAddSingleData] = useState<any>({})
  const [dateofjoining, setDateofjoining] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [navPrompt, setnavPrompt] = React.useState(false);
  const formIsDirty = navPrompt;

  usePrompt(
    // 'Please save the changes before you leave the page.',
        "Any changes you have made will not be saved if you leave the page.",
     formIsDirty);
  console.log(Exceldata, "Exceldata")
  console.log(Excelfile, "Excelfile")
  const location = useLocation();
  const { state }: { state: any } = useLocation();
  console.log(location, "select")
  const CustomScrollbar = Scrollbar as any;

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
    Emailid: true,
    ceoRole: true,
    previousRating: true,

  })
  //states for error component
  const [hideErrors, setHideErrors] = useState<any>(false)
  const [errorsList, setErrorsList] = useState<any>([])
  //@ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddData = () => {
    let tempSingleData = [{
      employeeName: employeeName,
      email: email,
      department: department,
      division: division,
      grade: grade,
      date_of_joining: dateofjoining
    }]

    let data = tempSingleData && tempSingleData
    console.log(employeeName, email, department, division, grade, dateofjoining, data, 'dataaaaaaaaaaaaaaaaaa')

    if (data) {
      addEmployees({ data: data }).then((res: any) => {
        console.log(res, 'ressssss')
      })
    }




    // tempSingleData = 
  }


  // console.log(Excel, "Excel")
  const handleExport = () => {
    setTrigger(true);
    setDownload(true);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(Excel);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "Employee Upload Template.xlsx");
  }


  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const handleFile = (e: any) => {

    let selectedFile = e.target.files[0]
    if (selectedFile) {
      console.log(selectedFile.type)
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelError(null)
          setExcelfile(e.target?.result)
        }
      }
      console.log(selectedFile.type)
    } else {
      console.log("plz upload")
      setExcelError("please select only file types")
      setExcelfile(null);
    }

  }
  useEffect(() => {
    const a = [1]
    const New = a.map((j: any) => {
      let exportData: any = {}
      if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
      if (columnHeaders["Ename"] == true) exportData["Employee Name"] = ""
      if (columnHeaders["Firstname"] == true) exportData["Known As"] = ""
      if (columnHeaders["ServiceReferenceDate"] == true) exportData["Service Reference Date"] = ""
      if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
      if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
      if (columnHeaders["Function"] == true) exportData["Function"] = ""
      if (columnHeaders["SupervisoryRole"] == true) exportData["Supervisory Role"] = ""
      if (columnHeaders["ProbationStatus"] == true) exportData["Probation Status"] = ""
      if (columnHeaders["Emailid"] == true) exportData["Email Id"] = ""
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
      if (columnHeaders["ceoRole"] == true) exportData["CEO Role"] = ""
      if (columnHeaders["previousRating"] == true) exportData["Previous Rating"] = ""

      // Emailid


      return exportData
      //  });
    })
    setExcel(New)
  }, [trigger])
  // submit
  // const handleSubmit =(e: React.FormEvent<HTMLInputElement>) =>{
  //   e.preventDefault();
  //   // if(Excelfile !== null){
  //     const workbook = XLSX.read(Excelfile,{type:"buffer"});
  //     const worksheetName =workbook.SheetNames[0];
  //     const worksheet =workbook.Sheets[worksheetName]
  //     const data= XLSX.utils.sheet_to_json(worksheet)
  //     console.log(data,"data")
  //     setExceldata(data)
  //   // }else{
  //   //   setExceldata(null)
  //   // }
  // }

  // useEffect(()=>{
  const stepper = () => {
    if (download == true && added == false) {
      return 1
    } else if (download == false && added == true) {
      return 1
    } else if (download == true && added == true)
      return 2
    else return 0
  }


  // const useStyles :any[] = makeStyles(() => ({root: { "& .MuiStepIcon-active": { color: "red" }, "& .MuiStepIcon-completed": { color: "green" }, 

  //  "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" } } }));
  // const c = useStyles();


  // },[added,download])
  const readUploadFile = (e: any) => {   
    setnavPrompt(true)
    let selectedFile = e.target.files![0]
    e.preventDefault();

    if (selectedFile && fileType.includes(selectedFile.type)) {
      // if (e.target.files![0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        console.log(worksheet,"jsooon");
        //const json = XLSX.utils.sheet_to_json(worksheet);
        const json = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'mm/dd/yyyy' });
        console.log(json,"jsooon");
        console.log(data,"jsooon")
        setExceldata(json)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      setAdded(true);
    } else {
      setExcelError("please select only file types")
      setExceldata("")
    }
    console.log(selectedFile.type,"jsooon")
    
  };

  const handleOpenFile = () => {
    if (activeCalendar?.length > 0) {
      setOpenAlert(true);
      setMessage("Calendar is in live.")
    } else {
      document.getElementById("upload")?.click();
    }
  }

  const handleupload = () => {
    if (Exceldata.length > 0) {
      let data = Exceldata.map((item: any) => {
        console.log(item, 'itemmmmm')
        return {
          employee_code: item?.Ecode,
          legal_full_name: item["Employee Name"],
          first_name:item["Known As"],
          service_reference_date: new Date(item["Service Reference Date"]),
          position_long_description: item?.Position,
          grade: item?.Grade,
          function: item?.Function,
          isSupervisor: item?.["Supervisory Role"]?.toLowerCase() === "sp" ? true : false,
          probation_status: item["Probation Status"],
          email: item["Email Id"],  
          division: item?.Division,
          section: item?.Section,
          sub_section: item["Sub-section"],
          work_location: item["Work Location"],
          // service_reference_date: parsedDate.toDate(),
          appraiser_code: item["Appraiser Code"],
          appraiser_name: item["Appraiser Name"],
          reviewer_code: item["Reviewer Code"],
          reviewer_name: item["Reviewer Name"],
          normalizer_code: item["HR Normalizer Code"],
          normalizer_name: item["HR Normalizer Name"],
          manager_code: item["Manager Code"],
          manager_name: item["Manager Name"],
          manager_position: item["Manager Position"],
          isCEORole : item["CEO Role"]?.toLowerCase() === "yes" ? true : false,
          previous_rating : item["Previous Rating"],
          employee_upload_flag: true,
        }
      })
      console.log(data,"exceldata")
      addEmployees({ data: data }).then((res: any) => {
        if (res.error) {
          
          //setOpenAlert(true);
          //setShowAlert(true);
          setHideErrors(true);
          setErrorsList(res.error);
        } else {
          console.log(res, 'resssssssssssssss');
          setOpenAlert(true)
          // message change as per 5/3/2023
          setMessage("Employees were saved.")
          setnavPrompt(false)
        }
      })
    } else {
      setOpenAlert(true);
      setShowAlert(false);
      setMessage("Please choose a file to upload.")
    }
    console.log(Exceldata, "Exceldata")
  }


  const handleCancel = () => {
    const fileInput = document.getElementById('upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
      setExceldata("");
    }
    setnavPrompt(false)
    setHideErrors(false);
    setErrorsList("");
  }

  const handleAlertClose = () => {
    setOpenAlert(false);
    setShowAlert(false);
    setMessage("");
  }

  const activeCalendar = activeCalendarData?.data?.filter((i: any) => {
    return i?.isActive === true
  })

  return (
    <>
      <PAMaster
        name={"Add Employees"}
        nav={`${ADD_EMPLOYEE}`}
        secondName={state?.nav + " Master"} />
      <Box
        sx={{
          // maxWidth: "96% !important",
          // width: "100%",
          // height: 800,
          backgroundColor: "#fff",
          marginLeft: "25px",
          marginRight: "25px",
          padding: "20px",
          height: "calc(100vh - 180px)",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {/* <Tab
                style={{
                  textTransform: "capitalize",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                label="Single Upload"
                {...a11yProps(0)}
              /> */}
              <Tab
                style={{
                  textTransform: "capitalize",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                label="Multiple Upload"
                {...a11yProps(0)}
              />
            </Tabs>


          </Box>
        </Box>
        {/* <TabPanel value={value} index={0}>
          <div>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                columnGap: "40px",
                rowGap: "10px",
                marginTop: "10px",
              }}
            >
              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Employee Name"
                  id="standard-size-normal"
                  variant="standard"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Email"
                  id="standard-size-normal"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Department"
                  id="standard-size-normal"
                  variant="standard"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Division"
                  id="standard-size-normal"
                  variant="standard"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Grade"
                  id="standard-size-normal"
                  variant="standard"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </Item>

              <Item>
                <TextField
                  style={{ width: "100%" }}
                  label="Date of joining"
                  id="standard-size-normal"
                  variant="standard"
                  value={dateofjoining}
                  onChange={(e) => setDateofjoining(e.target.value)}
                />
              </Item>
            </Box>
          </div>
          <Stack direction="row" spacing={2} marginTop="20px">
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
              // onClick = {handleAddData}
            >
              Add
            </Button>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
          <EmployeeUploadlisttable />
        </TabPanel> */}
        <TabPanel value={value} index={0}>
          <div>
            {/* <Box sx={{ width: "300px", paddingTop: "25px" }}>
              <Stepper
                sx={{
                  "& .MuiStepConnector-line": {
                    borderTopWidth: "6px",
                  },
                  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                    borderColor: "red",
                  },
                  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                    borderColor: "green",
                  },
                  ".MuiSvgIcon-root": {
                    borderRadius: "50%",
                    border: "1px solid #1976d2"
                  },
                  ".MuiSvgIcon-root:not(.Mui-completed)": {
                    color: "white"
                  },

                }}

                activeStep={stepper()} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <Labels> {label}</Labels>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box> */}
            <Stack direction="row" spacing={7} marginTop="20px" alignItems="center" paddingLeft="28px">
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "30px",
                  // width: "70px",
                }}
                variant="outlined"
                onClick={handleExport}
              >
                {/* Export File */}
                Export Template
              </Button>

              {/* <input type="file" className="form-control" id="file" 
                  onChange={handleFile}
                 /> */}
              {/* <label htmlFor="upload">Upload File</label> */}
              {/* <input
                type="file"
                accept="Upload"
                name="upload"
                id="upload"
                onChange={readUploadFile}
              /> */}


              <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
                style={{ display: "none" }}
              />

              <Button
                style={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "30px",
                  // width: "70px",
                }}
                variant="outlined"
                onClick={handleOpenFile}
              >
                {/* Upload File */}
                Upload
              </Button>

              <Stack direction="row" spacing={2}>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    height: "30px",
                    // width: "70px",
                  }}
                  variant="outlined"
                  onClick={handleupload}
                >
                  {/* Upload File */}
                  Save
                </Button>

                {UploadingInProgress && (
                  <CircularProgress style={{ marginTop: "4px" }} size={15} thickness={7} />
                )}
              </Stack>


              <Button
                style={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "30px",
                  // width: "70px",
                }}
                variant="outlined"
                onClick={handleCancel}
              >
                {/* Upload File */}
                Cancel
              </Button>
              {/* handleFile */}
            </Stack>


            <hr></hr>
            {Exceldata == "" && <>No file selected</>}
            {Exceldata != "" && hideErrors === false && (
              <TableContainer style={{ marginTop: "18px", height: "calc(100vh - 330px)", }} >
                <Scroll >
                  <CustomScrollbar style={{ width: "100%", height: "calc(100vh - 330px)" }}>
                    <Table size="small" aria-label="simple table" stickyHeader>
                      <TableHead
                      // style={{
                      //   color: "#004C75",
                      //   fontSize: "15px",
                      //   fontWeight: "400",
                      //   opacity: "0.9",
                      //   height: "50px"
                      // }}
                      >
                        <TableRow
                          sx={{
                            "& td, & th": {
                             whiteSpace: "nowrap",
                              bgcolor: "#eaeced",
                              // border: 1,
                              // borderColor: "#e0e0e0",
                            },
                          }}>
                          <TableCell
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
                           align="center"
                           sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}>
                            Employee Name</TableCell>
                            <TableCell 
                           align="center"
                           sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}>
                            Known As</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Position</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Grade</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Supervisory Role</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Function</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Probation<br></br> Status</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Service Reference Date</TableCell>

                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Appraiser Name</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Appraiser Code</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Reviewer Name</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Reviewer Code</TableCell>
                          <TableCell   align="center"
                           sx={{
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}>
                           HR Normalizer Name</TableCell>

                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            HR Normalizer Code</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Manager Code</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Manager Name</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Manager Position </TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Division</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Section</TableCell>
                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Sub-section</TableCell>

                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Work Location</TableCell>

                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            Email Id</TableCell>

                          <TableCell   align="center"
                            sx={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}>
                            CEO Role</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Exceldata.map((j: any) => {
                          console.log(j, 'jjjjjjjjjjjjjjjjjjjjjjjjj')
                          return (
                            <>
                              <TableRow  
                              sx={{
                                "& td, & th": {
                                   whiteSpace: "nowrap",
                                  
                                },
                              }}
                              >
                                <TableCell  
                                align="center"
                           
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight: "40px"
                            }}>
                              {j?.Ecode}
                              </TableCell>
                                <TableCell  align="left"
                            // width={250}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                          
                            }}>{j?.["Employee Name"]}</TableCell>
                            <TableCell  
                                align="left"
                           
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight: "40px"
                            }}>
                              {j?.["Known As"]}
                              </TableCell>
                                <TableCell  
                                align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.Position}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight: "40px"
                            }}>{j?.Grade}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingRight: "40px"
                            }} >{j?.["Supervisory Role"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.Function}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Probation Status"]}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Service Reference Date"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Appraiser Name"]}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Appraiser Code"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Reviewer Name"]}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Reviewer Code"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["HR Normalizer Name"]}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["HR Normalizer Code"]}</TableCell>
                                <TableCell align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Manager Code"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Manager Name"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Manager Position"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.Division}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.Section}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j["Sub-section"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Work Location"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["Email Id"]}</TableCell>
                                <TableCell align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}>{j?.["CEO Role"]}</TableCell>

                              </TableRow>
                            </>
                          )
                        })}
                        {/* <EmployeeUploadlisttable Exceldata={Exceldata} /> */}
                      </TableBody>
                    </Table>
                  </CustomScrollbar>
                </Scroll>
              </TableContainer>
            )}

            <AlertDialogSuccess
              isAlertOpen={openAlert}
              handleAlertClose={handleAlertClose} >
              {/* @ts-ignore */}
              {showAlert && uploadError?.data?.message}
              {message}
            </AlertDialogSuccess>

          </div>
          {/* File Upload failed design */}
          {/* <div>
            <Stack sx={{ width: "100%", paddingTop: "10px" }}>
              <Alert severity="warning" color="error" style={{ fontSize: "" }}>
                File upload failed
              </Alert>
            </Stack>

            <div style={{paddingTop:"10px",paddingLeft:"3px"}}>
              <Grid display="flex">
                <Text>
                  <li > The spread of computers and layout programmes thus made </li>
                  <li > The spread of computers and layout programmes thus made </li>
                  <li > The spread of computers and layout programmes thus made </li>
                  <li > The spread of computers and layout programmes thus made </li>
                  
                </Text>
              </Grid>
            </div>
            <Stack direction="row" spacing={2} marginTop="20px" justifyContent="center">
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
            >
              Retry
            </Button>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
          </div> */}
          {/* All Files Uploaded  design */}

          {/* <div>
            <Stack sx={{ width: "100%", paddingTop: "10px" }}>
              <Alert severity="success" color="success" style={{ fontSize: "" }}>
                All Files uploaded
              </Alert>
            </Stack>

            <div style={{paddingTop:"10px",paddingLeft:"3px"}}>
              <Grid display="flex">
                <Text>
                  <li > The spread of computers and layout programmes thus made </li>
                  
                </Text>
              </Grid>
            </div>
            <Stack direction="row" spacing={2} marginTop="20px" justifyContent="center">
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
            >
              Save
            </Button>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
          </div> */}
        </TabPanel>
        {hideErrors && 
        <DisplayingErrors 
        from="employeeUpload"
        uploadError={uploadError} 
        setHideErrors={setHideErrors}
        errorsList={errorsList}
        setErrorsList={setErrorsList}
        />}
      </Box>
     
    </>
  );
}
