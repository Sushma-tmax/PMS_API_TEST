import React, { useEffect, useState, useRef, useMemo,useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Container,
  Box,
  TablePagination,
  Breadcrumbs,
  FormGroup,
  Link,
} from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Drawer, FormControlLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Newexcel from "../../../assets/Images/Newexcel.svg"
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import {  useNavigate, useLocation } from "react-router-dom";
import { useGetEmployeeQuery,
  useGetEmployeeByFilterQuery,
  useUpdateEmployeeAppraisalMutation 
} from "../../../service";
import Autocomplete from '@mui/material/Autocomplete';
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

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

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
});



export default function RoleException(props: any) {
   //prompt ------functions
   const [navPrompt, setnavPrompt] = React.useState(false);

   console.log(navPrompt, 'navPrompt')
   const formIsDirty = navPrompt;
   usePrompt(
          "Any changes you have made will not be saved if you leave the page.",
     formIsDirty);
   //prompt ------functions
  const location: any = useLocation();
  const EmpCode = location?.state?.selectCode
  console.log(EmpCode,"EmpCode")
  const [employeeUpdateName] = useUpdateEmployeeAppraisalMutation();
  const navigate = useNavigate();
  const SELECT_FOR_DASHBOARD = `employee_code,appraiser_code,reviewer_code,normalizer_code,legal_full_name,position_long_description,grade,
  appraiser_name,normalizer_name,reviewer_name,overall_rating,isRoleExceptionDraft,isLeaversDraft,appraiser_code_Draft,appraiser_name_Draft,reviewer_code_Draft,reviewer_name_Draft,normalizer_code_Draft,normalizer_name_Draft,first_name,employee_upload_flag`
  const { data,isLoading } = useGetEmployeeByFilterQuery(
    `?limit=700&select=${SELECT_FOR_DASHBOARD}&employee_upload_flag=true`
  );
  console.log(data,"EmpCode")

  
//states forediting the employee data 
  const [roleExceptionData, setRoleExceptionData] = React.useState<any>([]);
  const [appraiserNameVal, setAppraiserNameVal] = React.useState<any>('');
  const [reviewerNameVal, setreviewerNameVal] = React.useState<any>('');
  const [normalizerNameVal, setnormalizerNameVal] = React.useState<any>('');
  const [employeeCodeVal, setemployeeCodeVal] = React.useState<any>("");
  const [employeeCodeValRev, setemployeeCodeValRev] = React.useState<any>("");
  const [employeeCodeValNor, setemployeeCodeValNor] = React.useState<any>("");
  const [saveAlert, setsaveAlert] = React.useState<any>(false);
  console.log(appraiserNameVal,roleExceptionData,"appraiserNameVal")
  console.log(employeeCodeVal,"appraiserNamesNew")  
 

 //for alert
 const [LaunchValDialog, setLaunchValDialog] = useState(false);
 const [LaunchValDialogMSG, setLaunchValDialogMSG] = useState("");
 const handleLaunchValDialog = () => {
   setLaunchValDialog(false);
   setLaunchValDialogMSG("")
  };
  //foralert

 const appraiserNames = Array.from(new Set(data?.data?.map((i:any) => i?.appraiser_name )))
  .sort((a: any, b: any) => a?.localeCompare(b))
  .filter((i:any) =>{
    return i != undefined
  })
 
  const appraiserObjects = data?.data
      ?.filter((i:any) => i && i.appraiser_name)
      ?.reduce((unique: any, item: any) => {
        return unique.some((i:any) => i.name === item.appraiser_name)
          ? unique
          : [...unique, { name: item.appraiser_name, code: item.appraiser_code }];
      }, []);
  //console.log(appraiserObjects,"appraiserNamesNew")  
  
  
  const gettingAppraiserCode = useMemo(() => {
    if(appraiserObjects !== undefined && appraiserObjects !== ""){
    let AppCode = appraiserObjects?.filter((i:any)=>{
      return i?.name == appraiserNameVal
    }).map((i:any) => i?.code)
    console.log(AppCode,"appraiserNamesNew")  
    //@ts-ignore 
   setemployeeCodeVal(AppCode[0])}
  }, [appraiserNameVal,roleExceptionData,data])
 
  //write a function to filter the respective object
  //reviewer_name
 const ReviewerNames =  Array.from(new Set(data?.data?.map((i:any) => i?.reviewer_name)))
 ?.sort((a: any, b: any) => a?.localeCompare(b))
 ?.filter((i:any) =>{
  return i != undefined
})
 const reviewerObjects = data?.data
 ?.filter((i:any) => i && i.reviewer_name)
 ?.reduce((unique: any, item: any) => {
   return unique.some((i:any) => i.name === item.reviewer_name)
     ? unique
     : [...unique, { name: item.reviewer_name, code: item.reviewer_code }];
 }, []);
 const gettingReviewerCode = useMemo(() => {
  if(reviewerObjects !== undefined && reviewerObjects !== ""){
  let AppCode = reviewerObjects?.filter((i:any)=>{
    return i?.name == reviewerNameVal
  }).map((i:any) => i?.code)
  //console.log(AppCode,"appraiserNamesNew")  
  //@ts-ignore 
  setemployeeCodeValRev(AppCode[0])}
}, [reviewerNameVal,roleExceptionData,data])
//reviewer_name
//normalizer_name
const NormalizerNames =  Array.from(new Set(data?.data?.map((i:any) => i?.normalizer_name)))
?.sort((a: any, b: any) => a?.localeCompare(b))
?.filter((i:any) =>{
  return i != undefined
})
const normalizerObjects = data?.data
 ?.filter((i:any) => i && i.normalizer_name)
 ?.reduce((unique: any, item: any) => {
   return unique.some((i:any) => i.name === item.normalizer_name)
     ? unique
     : [...unique, { name: item.normalizer_name, code: item.normalizer_code}];
 }, []);
 const gettingNormalizerCode = useMemo(() => {
  if(normalizerObjects !== undefined && normalizerObjects !== ""){
  let AppCode = normalizerObjects?.filter((i:any)=>{
    return i?.name == normalizerNameVal
  }).map((i:any) => i?.code)
  //console.log(AppCode,"appraiserNamesNew")  
  //@ts-ignore 
  setemployeeCodeValNor(AppCode[0])}
}, [normalizerNameVal,roleExceptionData,data])
//normalizer_name

console.log(appraiserNames,"Lists")


 //for populating the data of the employee
  useEffect(() => {
  const Temp = data?.data?.filter((i:any)=>{
      return i?.employee_code === EmpCode
  })
  if(Temp?.length == 1){
  setRoleExceptionData(Temp[0])
  }
  
  }, [data])

const onChangeAppraiserName = (name:any) => {
  setAppraiserNameVal(name);
}
useEffect(() => {
  setAppraiserNameVal(roleExceptionData?.appraiser_name);
  setreviewerNameVal(roleExceptionData?.reviewer_name)
  setnormalizerNameVal(roleExceptionData?.normalizer_name)
}, [data,roleExceptionData])

// const settingValue = React.useMemo(() => {
//  // setAppraiserNameVal(roleExceptionData?.appraiser_name);
//  if(appraiserNameVal==="Anabelle Villamor Dandan"){
//   setemployeeCodeVal(918)
// }else if(appraiserNameVal==="Cristiana Colesnicenco "){
// setemployeeCodeVal(1080)
// }
// }, [appraiserNameVal])
console.log("valstosubmit",appraiserNameVal,employeeCodeVal,reviewerNameVal,employeeCodeValRev,normalizerNameVal,employeeCodeValNor)
const saveHandler =()=>{
  //setnavPrompt()
  if(appraiserNameVal !== null && appraiserNameVal !== undefined && appraiserNameVal !== ""){
    //to add other comparisons
    employeeUpdateName({
       "appraiser_name": appraiserNameVal,
      id: roleExceptionData?._id,
      // "employee.training_recommendation": trainingRecommendationValues,
      // "employee.area_of_improvement": area,
       "appraiser_code": employeeCodeVal,
       "reviewer_name": reviewerNameVal,
       "reviewer_code": employeeCodeValRev,
       "normalizer_name": normalizerNameVal,
       "normalizer_code": employeeCodeValNor,
    }).then((res: any) => {
     // res.error ? <> </> : 
      // setLaunchValDialog(true);
      // setLaunchValDialogMSG("Employees details were updated")
      // setnavPrompt(false)
      if(res.error){
      }else{
        if(navPrompt){
          setLaunchValDialog(true)
          setLaunchValDialogMSG("Employees details were updated")
          setnavPrompt(false)
        }else{
          setLaunchValDialog(true)
          setLaunchValDialogMSG("No Changes were made to update ")
        }}
  });
  }else{
    setsaveAlert(true)
  }
 
}
useEffect(() => {
  if(roleExceptionData !== undefined && roleExceptionData !== ""){
    console.log(roleExceptionData?.appraiser_code,"appraiserNameVal")
  setemployeeCodeVal(roleExceptionData?.appraiser_code)
  }
},[data,roleExceptionData])

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
            }}
            color="inherit"
          >
            Master
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Exception Handling
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
        {/* <Stack direction="row" justifyContent="space-around">
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '550px' },
      }}
      noValidate
      autoComplete="off"
    >
       <div>
          <div>
            <TextField
              label="Employee Code"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Appraiser Code"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Reviewer Code"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Normalier code"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          </div>
          </Box>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '550px' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
          <div>
            <TextField
              label="Employee Name"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Appraiser Name"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Reviewer Name"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Normalier Name"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          <div>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              size="small"
            />
            
          </div>
          </div>
          </Box>
          </Stack> */}
          <Stack direction="row" justifyContent="space-around">
          <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "550px" },
          }}
          noValidate
          autoComplete="off"
        >
          
          <TextField
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
            value = {employeeCodeVal}
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
            label="HR Normalizer Code"
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            //value={roleExceptionData?.normalizer_code}
            value={employeeCodeValNor}
            disabled
          />
        </Box>
        </div>
         <div>
        <Box
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
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "550px" },
          }}
          noValidate
          autoComplete="off"
        >
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
             <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={appraiserNames}
      defaultValue={roleExceptionData?.appraiser_name}
      value={appraiserNameVal}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}  label="Appraiser Name" 
      
       size="small"  />}
       //@ts-ignore
       onChange={(event, value) => {
        console.log("Selected value:", value);
        setAppraiserNameVal(value);
        setnavPrompt(true);
      }}
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
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={ReviewerNames}
      defaultValue={roleExceptionData?.reviewer_name}
      value={reviewerNameVal}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params}  label="Reviewer Name" 
      
       size="small"  />}
       //@ts-ignore
       onChange={(event, value) => {
        console.log("Selected value:", value);
        setreviewerNameVal(value);
        setnavPrompt(true);
      }}
    />
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
        </Box>
        <Box
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
      renderInput={(params) => <TextField {...params}  label="HR Normalizer Name" 
      
       size="small"  />}
       //@ts-ignore
       onChange={(event, value) => {
        console.log("Selected value:", value);
        setnormalizerNameVal(value);
        setnavPrompt(true);
      }}
    />
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
        </Box>
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

        </div>
       
        </Stack>
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            paddingTop="70px"
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

                // lineHeight:"normal",
                // padding:"9px 15px"
              }}
              variant="outlined"
              onClick={saveHandler}
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
                  width: "70px",
                  height: "35px",
                  // lineHeight:"normal",
                  // padding:"9px 15px"
                }}
                variant="outlined"
                onClick={()=>{navigate(-1)}}
              >
                Cancel
              </Button>
           
          </Stack>
          <AlertDialogSuccess
           isAlertOpen={LaunchValDialog}
           handleAlertClose={handleLaunchValDialog}
        >
         {LaunchValDialogMSG}
        
        </AlertDialogSuccess>
      </Box>
    </>
  );
}
