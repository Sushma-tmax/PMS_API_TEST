import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { Grid, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import { Alert, Button } from "@mui/material";
import ReviewerFeedbackComments from './ReviewerFeedbackComments';
import AlertDialogSuccess from '../../UI/DialogSuccess';


const Contain = styled("div")({
  marginLeft: "58px",
  marginRight: "58px",
  marginTop: '10px',
  // width: '1200',
  paddingTop: '0px'

});
const Tf = styled("div")({
  fontSize: "13x",

  // backgroundColor: "#FFFFFF",
  // "& .MuiInputLabel-root": {
  //   color: "#333333",
  //   opacity: "0.5",
  //   fontSize: "13px",
  //   fontWeight: "400",
  //   textTransform: "none",
  // },
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    padding: "8px",
  },
});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const ROrecommendation = styled("div")({
  marginLeft: "58px",
  marginTop: '20px',
  // color: '#008E97',
  // fontSize: '13px',
  // opacity: 0.85,
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial"

});
const ROrecommendation1 = styled("div")({
  //marginLeft: "58px",
  marginTop: '25px',
  // color: '#008E97',
  // fontSize: '13px',
  // opacity: 0.85,
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial"

});
const Labels = styled("div")({
  fontSize: '14px',
  color: '#333333',
  // opacity: 0.84,
  marginLeft: '5px',
  fontFamily: "arial"
});
const Typo2 = styled("div")({
  marginLeft: "58px",
  marginTop: "5px",
  // color: "#008E97",
 fontFamily:"Arial",
  // fontSize: "13px",
  // opacity: 0.85,
  color: "#717171",
  fontSize: "16px",
});
const Tf1 = styled("div")({
  // marginLeft: "5px",
  marginTop: "5px",
  // backgroundColor: "rgb(255 255 255/70%)",

  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontFamily:"Arial",
  //   fontSize: "14px",
  //   textTransform: "none",
  //   height:"40px !important"

  // },'
  // width: "93.5%",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign:"left"
  },
});
const Checkboxs = (props: any) => {
  const { other1Data, navPrompt, setnavPrompt, moveTab, setMoveTab } = props
  // const [users, setUsers] = useState<any>([])
  //@ts-ignore
  const { otherRecommendation, setOtherRecommendation, appraiserOtherRecommendationComments, setAppraiserOtherRecommendationComments, openSnackbar, setOpenSnackbar, appraiserOverallFeedback, setAppraiserOverallFeedback } = useAppraiserRejectsReviewerContext()
  console.log(otherRecommendation, 'okkkkk')
  // useEffect(() => {
  //   console.log('useeffect run')
  //   if (other1Data) {
  //     setUsers(other1Data.data)
  //   }

  // }, [other1Data])

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })


  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const validateOtherRecommendation = (selectedOtherRecommendation: any, isChecked: any) => {
    const tempUser = otherRecommendation.map((OtherData: any) => {
      return OtherData._id === selectedOtherRecommendation ? { ...OtherData, isChecked: false } : OtherData
    });
    setOtherRecommendation(tempUser);
  }

  const handleOnCheck = (e: any) => {
    setnavPrompt(true)
    const { name, checked } = e.target

    const tempUser = otherRecommendation.map((OtherData: any) => {
      const dash =
        OtherData._id === name
          ? { ...OtherData, isChecked: checked }
          : OtherData;      
      return dash;
    });
    setOtherRecommendation(tempUser);
    let othervalues = tempUser?.filter((j: any) => j.isChecked === true).map((k: any) => k?.name?.toLowerCase())   
    if (othervalues.includes("demotion") && othervalues.includes("promotion")) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Promotion and Demotion cannot be mapped together.");
      validateOtherRecommendation(name, checked)
    }
    else if ((othervalues.includes("salary increase") || othervalues.includes("promotion")) && othervalues.filter((item:any) => item.includes("termination")).length > 0) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Termination cannot be mapped together with Salary Increase / Promotion.");
      validateOtherRecommendation(name, checked)
    }
    else if ((othervalues.includes("salary increase") || othervalues.includes("salary review")) && othervalues.filter((item:any) => item.includes("demotion")).length > 0) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Demotion cannot be mapped together with Salary Increase or Salary Review.");
      validateOtherRecommendation(name, checked)
    }
    else if (tempUser.filter((j: any) => j.isChecked === true).length > 1 && othervalues.includes("pip")) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("PIP cannot be chosen with any other options.");
      validateOtherRecommendation(name, checked)
    }   
  }



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
    setOpenSnackbar(false)   
  };

  const checkboxHandler = (checkbox: any[]) => {
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
        return i._id;
      });
      return check;
    }
  };

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
  }, [otherRecommendation])

  const [otherComments, setOtherComments] = useState();

  const handleOtherCommentsChange = (e: any) => {
    setnavPrompt(true)
    console.log(e);
    setAppraiserOtherRecommendationComments(e.target.value)
  }
  useEffect(() => {
    setOtherComments(appraiserOtherRecommendationComments)
  }, [appraiserOtherRecommendationComments])

   const [overallAppraiserFeedback, setoverallAppraiserFeedback] = useState<any>('');
  console.log(appraiserOverallFeedback, "appraiserOverallFeedback");

  useEffect(() => {
    setoverallAppraiserFeedback(appraiserOverallFeedback)
  }, [])

  const onHandleAppraiserfeedback = (event: any) => {
    setoverallAppraiserFeedback(event.target.value)
    //add & check--> setAppraiserOverallFeedback(event.target.value)
    setAppraiserOverallFeedback(event.target.value)
  };


  return (
    <div>
      <ROrecommendation>
        <b>Other Recommendations </b>
      </ROrecommendation>
      <Contain>
        <Box   >
                  <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {otherRecommendation && otherRecommendation
            .sort((a: any, b: any) => a.sort_value - b.sort_value)
            .map((OtherData: any,index: any) => {
            return (
              <>
                {/* <li
                    style={{
                      width: "8%",
                      float: "left",
                      // marginBottom: "20px",
                      listStyleType: "none",
                    }}
                  >
                  <input
                    name={OtherData._id}
                    checked={OtherData?.isChecked || false}
                    onChange={handleOnCheck}
                    type="checkbox" />
                  <label> {OtherData.name}</label>
                  </li> */}
                {/* <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    You cannot select Promotion and Demotion Together!
                  </Alert>
                </Snackbar> */}

                <AlertDialogSuccess
                  isAlertOpen={showToast}
                  handleAlertClose={handleClose}
                >
                  {toastMessage}

                </AlertDialogSuccess>

                
                                  <Grid display="flex" item xs={2} sm={4} md={3} key={index}>

                  <input
                    name={OtherData._id}
                    checked={OtherData?.isChecked || false}
                    onChange={(e) => {
                      handleOnCheck(e);
                      setMoveTab(true);
                    }}
                    type="checkbox" />
                  <Labels> <label> {OtherData.name}</label>  </Labels>
                  </Grid>
              
              </>
            );
          })}
          </Grid>
        </Box>
        <br />
        <Box>
          {/* <ROrecommendation1>
        <b>Appraiser Other Recommendation Justifiction</b>
      </ROrecommendation1>
          <Tf>
            <TextField fullWidth
              multiline
              //label="Appraiser Other Recommendation Justifiction"
              placeholder='Appraiser Other Recommendation Justifiction'
              size='small'
              name="comments"
              value={otherComments || ""}
              inputProps={{ maxLength: 512 }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}

              onChange={e => handleOtherCommentsChange(e)} />
          </Tf> */}
        </Box>
      </Contain>
      <div >
      <Typo2><b> Appraiser Overall Feedback </b> <span style={{fontSize:"22px",}}>*</span></Typo2>

      <Contain>
          <Tf1>

            <TextField
              inputProps={{ maxLength: 500 }}
              fullWidth
              multiline
              // disabled
              size='small'
              // variant="standard"
              // InputProps={{
              //   disableUnderline: true,
              // }}
              placeholder='Add'
              value={overallAppraiserFeedback || ""}
              onChange={(e) => {
                onHandleAppraiserfeedback(e);
                setMoveTab(true);
                setnavPrompt(true);
              }}
            />

          </Tf1>
      </Contain>
      </div>
      <ReviewerFeedbackComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} />

    </div>
  );
}

export default Checkboxs
