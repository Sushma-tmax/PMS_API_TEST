import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box ,TextField,InputAdornment} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Expand from "../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Searchicon from "../../assets/Images/Searchicon.svg";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import PAMaster from "../UI/PAMaster";
import EmpMaster from "./EmpMaster";
import RoleExceptionTable from "./RoleExceptionTable";
import GradeException from "./GradeException";
import Exclusions from "./Exclusions";
import CEORole from "./CEORole";
import Leavers from "./Leavers";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Newexcel from "../../assets/Images/Newexcel.svg"
import { useLocation } from "react-router-dom";
import { useGetEmployeeDetailsPreviousQuery } from "../../service/employee/previousAppraisal";

const Searchfeild = styled("div")({
    // marginLeft: "auto",
    // marginRight: "8px",
    marginTop: "8px",
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
    "& .MuiTextField-root": {
      minWidth: "100%",
      //   paddingLeft: "10px",
      //   paddingRight: "10px"
    },
  });
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
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
export default function ViewExceptionHandling(props: any) {
  const location: any = useLocation();
  console.log(location?.state?.role,"locationnnn")
  const tabChange = location?.state?.user
  const breadcrumbs =location?.state?.role
  // getting calendar Id from previous appraisal calendar from PA dashboard
  const calendarFromDashboard = location?.state?.calendarId
  console.log(tabChange, "tabChange")
  //for employee confirmation toggle
  const [checkedSwitch, setCheckedSwitch] = React.useState(false);
  //for employee confirmation toggle
  const [age, setAge] = React.useState("");
  const [calendarId, setCalendarId] = useState("642c1ff02981b635437b828c")
  const {data : employeeList} = useGetEmployeeDetailsPreviousQuery({calendarId : calendarFromDashboard})
  console.log(calendarFromDashboard,employeeList,'checkcalendarFromDashboard')

  const [searchName, setSearchName] = React.useState("");
  const [searchNameForTabs, setsearchNameForTabs] = React.useState("");
  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [value, setValue] = React.useState<any>(0);
  console.log(value,"valuevalue")
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setsearchNameForTabs('');
    setSearchName('')
  };
  const changingTabs =  React.useMemo(() => {
    if(tabChange === "toRoleexception"){
      setValue(2)
    }
      }, [tabChange]);
  // const ClearingSearch =React.useMemo(() => {
  //   setsearchNameForTabs('');
  //   setSearchName('')
  // },[value])
//  React.useEffect(()=>{
//    if(location?.state?.Detail == "hello"){
//    return setValue(2)
//    }
//   },[location])
  return (
    <>
    <PAMaster breadcrumbs ={breadcrumbs} name={"Exception Handling"} />
    <Box
      sx={{
        // maxWidth: "95% !important",
        // width: "100%",
        height: "calc(100vh - 180px)",
        background: "#fff",
        padding: "20px",
        marginLeft:"25px",
        marginRight:"25px",

        
        // marginTop: "50px",
      }}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: 1, borderColor: "divider", left: 20 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
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
              label="Employee Master"
              {...a11yProps(0)}
            />
          
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
              label="Exclusions"
              {...a11yProps(1)}
            />
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
              label="Role Exceptions"
              {...a11yProps(1)}
            />
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
              label="Grade Exceptions"
              {...a11yProps(1)}
            />
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
              label="CEO Role"
              {...a11yProps(1)}
            />
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
              label="Leavers"
              {...a11yProps(1)}
            />
          </Tabs>
          {/* <div
         style={{display:'flex'}}
          >
          <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "15px", marginTop: "5px" }}
              //onClick={handleExport}
            />
         {value !== 0 && <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
          onChange={(e) => setsearchNameForTabs(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Searchicon} alt="icon" />
              </InputAdornment>
            ),
          }}
        />
      </Searchfeild>}
      </div> */}
        </Stack>
      </Box>
      {/* <TabPanel value={value} index={0}> */}
       
       {/* {value === 0 && */}
       <div
       style={{
        display: value===0 ? "block" : "none" 
       }}
       >
          <EmpMaster
          searchName={searchName}
           setSearchName={setSearchName}
           values={value}
           checkedSwitch = {checkedSwitch}
           setCheckedSwitch = {setCheckedSwitch}
           employeeList = {employeeList}
          />
        </div>
        {/* } */}
      
      {/* </TabPanel> */}
      
      {/* <TabPanel value={value} index={1}> */}
      {/* {value === 1 && */}
      <div
       style={{
        display: value===1 ? "block" : "none" 
       }}
      >
        <Exclusions searchNameForTabs={searchNameForTabs}  
        values={value}
        employeeList = {employeeList}/>
        </div>
        {/* } */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={2}> */}
      {value === 2 &&<div>
        <RoleExceptionTable  
          searchNameForTabs={searchNameForTabs}  
          values={value} 
          checkedSwitch = {checkedSwitch}
          setCheckedSwitch = {setCheckedSwitch}
          employeeList = {employeeList}
          />
        </div>}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={3}> */}
      {value === 3 &&<div>
        <GradeException  searchNameForTabs={searchNameForTabs}         
         values={value} 
         employeeList = {employeeList}/>
        </div>}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={4}> */}
      {value === 4 &&<div>
       <CEORole  searchNameForTabs={searchNameForTabs}  
       values={value}
       employeeList = {employeeList} />
       </div>}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={5}> */}
      {value === 5 &&<div>
       <Leavers  searchNameForTabs={searchNameForTabs} 
        values={value}
        employeeList = {employeeList} />
       </div>}
      {/* </TabPanel> */}
    </Box>
    </>
  );
}
