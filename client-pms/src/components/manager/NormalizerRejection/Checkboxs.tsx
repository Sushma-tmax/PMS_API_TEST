import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Grid, TextField } from "@mui/material";
import { useReviewerContext } from '../../../context/reviewerContextContext';
import AlertDialogSuccess from '../../UI/DialogSuccess';


const Contain = styled("div")({
  marginLeft: "60px",
  marginRight: "20px",
  marginTop: '10px',
  // width: '100%',
  paddingTop: '0px'

});
const Contain1 = styled("div")({
  marginLeft: "75px",
  //   marginRight: "20px",
  // marginTop: '10px',
  width: '98.5%',
  paddingTop: '10px'

});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const ROrecommendation = styled("div")({
  marginLeft: "60px",
  // marginTop: '25px',
  color: '#717171',
  fontSize: '16px',
  fontFamily: "arial",
  paddingTop: "20px"

});
const Recommendation = styled("div")({
  marginTop: '30px',
  marginLeft: "75px",
  paddingTop: "15px",
  color: '#717171',
  fontSize: '16px',

});
const Labels = styled("div")({
  fontSize: '14px',
  color: '#333333',
  // opacity: 0.84,
  marginLeft: '5px',
  fontFamily:"arial"
});
const Tf1 = styled("div")({
  // marginLeft: "58px",
  // paddingTop :"25px",
  // marginTop: "85px",
  backgroundColor: "#f8f8f8",
  // backgroundColor: "rgb(255 255 255/70%)",
  borderRadius: "5px",
  width: "90%",

  "& . MuiTextField-root": {
    //     width:"100%"
  },
  "& .MuiTextField-root": {
    color: "#333333",
    //     fontSize: "10px",
    fontWeight: "400",
    textTransform: "none",
    // opacity: 0.4,
    //     padding: "8px",
    width: "100%"
  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    textTransform: "none",
  },


});
const Checkboxs = (props: any) => {
  const { other1Data, navPrompt, setnavPrompt, moveTab, setMoveTab } = props
  // const [users, setUsers] = useState<any>([])
  //@ts-ignore
  const { otherRecommendation, setOtherRecommendation, setReviewerOverallFeedComments, reviewerOverallFeedComments, setOpenSnackbar, appraiserOtherRecommendationComments, setAppraiserOtherRecommendationComments, appraiserOverallFeedback, setAppraiserOverallFeedback } = useAppraiserRejectsNormalizerContext()
  //@ts-ignore
  //   const { reviewerOverallFeedComments, setReviewerOverallFeedComments } = useReviewerContext()
  //@ts-ignore
  console.log(otherRecommendation, 'okkkkk')
  console.log(reviewerOverallFeedComments, 'reviewerOverallFeedComments')
  // useEffect(() => {
  //   console.log('useeffect run')
  //   if (other1Data) {
  //     setUsers(other1Data.data)
  //   }

  // }, [other1Data])
  const [overallFeedback, setOverallFeedback] = useState<any>([]);

  // useEffect(()=>{
  //   setOverallFeedback(() => {
  //      {}
  //   })
  // })
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })


  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast(false);
    setOpenSnackbar(false)
  };

  const validateOtherRecommendation = (selectedOtherRecommendation: any, isChecked: any) => {
    const tempUser = otherRecommendation.map((OtherData: any) => {
      return OtherData._id === selectedOtherRecommendation ? { ...OtherData, isChecked: false } : OtherData
    });
    setOtherRecommendation(tempUser);
  }

  const handleOnCheck = (e: any) => {
    setnavPrompt(true)
    const { name, checked } = e.target;

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
    else if ((othervalues.includes("salary increase") || othervalues.includes("promotion")) && othervalues.filter((item: any) => item.includes("termination")).length > 0) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Termination cannot be mapped together with Salary Increase / Promotion.");
      validateOtherRecommendation(name, checked)
    }
    else if ((othervalues.includes("salary increase") || othervalues.includes("salary review")) && othervalues.filter((item: any) => item.includes("demotion")).length > 0) {
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
  const [otherComments1, setOtherComments1] = useState();

  const handleOtherCommentsChange = (e: any) => {
    setnavPrompt(true)
    console.log(e);
    setAppraiserOtherRecommendationComments(e.target.value)
  }
  useEffect(() => {
    setOtherComments1(appraiserOtherRecommendationComments)
  }, [appraiserOtherRecommendationComments])


  const handleappraiserReCommentsChange = (e: any) => {
    setnavPrompt(true)
    console.log(e);
    setOtherComments1(e.target.value)
    setAppraiserOverallFeedback(e.target.value)
  }


  return (
    <div>
      <ROrecommendation>
        <b> Other Recommendations </b>
      </ROrecommendation>
      <Contain>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

          {otherRecommendation && otherRecommendation
            .sort((a: any, b: any) => a.sort_value - b.sort_value)
            .map((OtherData: any, index: any) => {
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
                    onChange={e => {handleOnCheck(e)
                      setnavPrompt(true);
                      setMoveTab(true);
                     }}
                    type="checkbox" />
                  <label> {OtherData.name}</label>
                  </li> */}
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
                      type="checkbox"
                      onChange={e => {
                        handleOnCheck(e)
                        setnavPrompt(true);
                        setMoveTab(true);
                      }}
                    />
                    <Labels> <label> {OtherData.name}</label>  </Labels>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Contain>

    </div>
  );
}

export default Checkboxs
