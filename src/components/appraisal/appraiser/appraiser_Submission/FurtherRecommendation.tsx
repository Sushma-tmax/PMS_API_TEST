import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useAppraiserRejectsNormalizerContext } from '../../../../context/AppraiserRejectsNormalizer';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Grid, TextField } from "@mui/material";
import AlertDialogSuccess from '../../../UI/DialogSuccess';

const Contain = styled("div")({
  // marginLeft: "35px",
  // marginRight: "20px",
  // marginTop: '10px',
  // // width: '100%',
  // paddingTop: '0px'

});

const ROrecommendation = styled("div")({
  // marginLeft: "35px",
  // marginTop: '25px',
  color: '#717171',
  fontSize: '16px',
  fontFamily: "arial",
  marginBottom: "10px"

});

const Labels = styled("div")({
  fontSize: '14px',
  color: '#333333',
  marginLeft: '5px',
  fontFamily: "arial",
  lineHeight:"1.5"
});

const TextField1 = styled(TextField)({
  width: "100%",
  // marginLeft: "25px",
  marginTop: "5px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
  },
});


const Checkboxs = (props: any) => {
  const { employeeData, setnavPrompt, setMoveTab, isCheckedothers, setisCheckedothers,othersdisable,setothersdisable } = props
  //@ts-ignore
  const { otherRecommendation, setOtherRecommendation, setOpenSnackbar, appraiserOtherRecommendationComments, setOtherRecommendationothers, OtherRecommendationothers, setotherscheckbox, otherscheckbox , disableTextAfterSubmission } = useAppraiserRejectsNormalizerContext()
  const [isCheckedotherstextfield, setisCheckedotherstextfield] = useState(true);
  // const [othersdisable, setothersdisable] = useState(false);
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })

  const handleOnCheck1 = (event: any) => {
    // Do something with the event object.
    setotherscheckbox(event.target.checked);
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    const id = checkbox.id;
    // Do something with the checkbox state and ID.
    // setisCheckedothers(isChecked)
    if (isChecked == true) {
      // setisCheckedothers(true)
      setisCheckedothers(true)
      setisCheckedotherstextfield(false)
    } else {
      setisCheckedothers(false)
      // setisCheckedothers(false)
      setisCheckedotherstextfield(true)
    }
  };
  console.log(isCheckedothers, "checkbox")


  useEffect(() => {
    setotherscheckbox(employeeData?.data?.appraisal?.others_checkbox)
    setOtherRecommendationothers(employeeData?.data?.appraisal?.other_recommendation_others)
  }, [employeeData])


  useEffect(() => {
    if (otherscheckbox == true) {
      setisCheckedotherstextfield(false)
    } else {
      setisCheckedotherstextfield(true)
    }
  }, [otherscheckbox, employeeData])


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
    setotherscheckbox(false);
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
      setToastMessage("Promotion and demotion cannot be selected together.");
      validateOtherRecommendation(name, checked)
    }
    else if ((othervalues.includes("salary increase") || othervalues.includes("promotion")) && othervalues.filter((item: any) => item.includes("termination")).length > 0) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Termination cannot be selected with salary increase / promotion.");
      validateOtherRecommendation(name, checked)
    }
    else if ((othervalues.includes("salary increase") || othervalues.includes("salary review")) && othervalues.filter((item: any) => item.includes("demotion")).length > 0) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Demotion cannot be selected with salary increase or salary review.");
      validateOtherRecommendation(name, checked)
    }
    else if (tempUser.filter((j: any) => j.isChecked === true).length > 1 && othervalues.includes("pip")) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("PIP cannot be selected with other options.");
      validateOtherRecommendation(name, checked)
    }
  }

  useEffect(() => {
    const otherrrecomendation = otherRecommendation?.filter(
      (j: any) => j.isChecked === true
    );
    if (otherrrecomendation?.length > 0) {
      setothersdisable(true)
    } else {
      setothersdisable(false)
    }
  }, [otherRecommendation])
  // let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

  // const toggleOthersCheckboxes = () => {
  //   setotherscheckbox(!otherscheckbox);
  //   const updatedOtherRecommendation = otherRecommendation.map((item:any) => ({
  //     ...item,
  //     isChecked: !otherscheckbox, // Toggle the isChecked state
  //   }));
  //   setOtherRecommendation(updatedOtherRecommendation);
  // };
  // const toggleIndividualCheckbox = (index :any) => {
  //   const updatedOtherRecommendation = [...otherRecommendation];
  //   updatedOtherRecommendation[index].isChecked = !updatedOtherRecommendation[index].isChecked;
  //   setOtherRecommendation(updatedOtherRecommendation);
  //   setotherscheckbox(!updatedOtherRecommendation.some(item => !item.isChecked));
  // };
  // const toggleIndividualCheckbox = (index:any) => {
  //   const updatedOtherRecommendation = [...otherRecommendation];
  //   updatedOtherRecommendation[index].isChecked = !updatedOtherRecommendation[index].isChecked;
  //   setOtherRecommendation(updatedOtherRecommendation);
  //   setotherscheckbox(false); // Uncheck "Others"
  // };
  const toggleIndividualCheckbox = (index: any) => {
    const updatedOtherRecommendation = [...otherRecommendation];
    updatedOtherRecommendation[index].isChecked = !updatedOtherRecommendation[index].isChecked;
    // const toggledItem = updatedOtherRecommendation[index];
    // toggledItem.isChecked = !toggledItem.isChecked;
    setOtherRecommendation(updatedOtherRecommendation);
    setotherscheckbox(false);
  
    // Add your validation logic here
    setnavPrompt(true);
    setMoveTab(true)
    const othervalues = updatedOtherRecommendation
      .filter((j: any) => j.isChecked === true)
      .map((k: any) => k?.name?.toLowerCase());
      let errorPresent = false;

    if (othervalues.includes("demotion") && othervalues.includes("promotion")) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Promotion and demotion cannot be selected together.");
      errorPresent = true;
    } else if (
      (othervalues.includes("salary increase") ||
        othervalues.includes("promotion")) &&
      othervalues.filter((item: any) => item.includes("termination")).length > 0
    ) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Termination cannot be selected with salary increase / promotion.");
      errorPresent = true;
    } else if (
      (othervalues.includes("salary increase") ||
        othervalues.includes("salary review")) &&
      othervalues.filter((item: any) => item.includes("demotion")).length > 0
    ) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("Demotion cannot be selected with salary increase or salary review.");
      errorPresent = true;
    } else if (updatedOtherRecommendation.filter((j: any) => j.isChecked === true).length > 1 && othervalues.includes("pip")) {
      setShowToast(true);
      setOpenSnackbar(true);
      setToastMessage("PIP cannot be selected with other options.");
      errorPresent = true;
    }else{
      errorPresent = false;
    }
    if (errorPresent) {
      // Identify the checkboxes causing the error
      const checkboxesCausingError = updatedOtherRecommendation
        .filter((j: any) => j.isChecked === true)
        .map((k: any) => k?.name?.toLowerCase());
  
      // Uncheck the checkboxes causing the error
      updatedOtherRecommendation.forEach((item: any) => {
        if (checkboxesCausingError.includes(item?.name?.toLowerCase())) {
          item.isChecked = false;
        }
      });
    }
    setOtherRecommendation(updatedOtherRecommendation);
  };
  const toggleOthersCheckboxes = () => {
    setMoveTab(true)
    setotherscheckbox(!otherscheckbox);
    const updatedOtherRecommendation = otherRecommendation.map((item:any) => ({
      ...item,
      isChecked: false, // Uncheck all items in otherRecommendation
    }));
    setOtherRecommendation(updatedOtherRecommendation);
    // if (otherscheckbox == true) {
    //   // setisCheckedothers(true)
    //   setisCheckedothers(false)
    //   // setisCheckedotherstextfield(false)
    // } else {
    //   setisCheckedothers(true)
    //   // setisCheckedothers(false)
    //   // setisCheckedotherstextfield(true)
    // }
  };
  useEffect(()=>{
    if (otherscheckbox == true) {
      setisCheckedothers(true)
      setisCheckedotherstextfield(false)
    } else {
      setisCheckedotherstextfield(true)
      setisCheckedothers(false)
    }
  },[otherscheckbox])
  return (    
      <>
    {employeeData?.data?.employee?.employee_status !== "rejected" && (
      <>
        <div style={{ marginBottom: "20px" }}>
        <ROrecommendation>
          <b> Further Recommendations </b>
        </ROrecommendation>
        <Contain>
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            {otherRecommendation && otherRecommendation
              .sort((a: any, b: any) => a.sort_value - b.sort_value)
              .map((OtherData: any, index: any) => {
                return (
                  <>
                    

                    <Grid display="flex"  alignItems="center" item xs={2} sm={4} md={3} key={index}>
                      <input
                        disabled={isCheckedothers || disableTextAfterSubmission}
                        name={OtherData._id}
                        checked={OtherData?.isChecked || false}
                        type="checkbox"
                        onChange={e => {
                          handleOnCheck(e)
                          setnavPrompt(true);
                          setMoveTab(true)
                          // setMoveTab(true);
                        }}
                        // onChange={() => {toggleIndividualCheckbox(index)
                        //    setnavPrompt(true);
                        //   // setMoveTab(true)
                        // }}
                      />
                      <Labels> <label style={{ overflowWrap: 'break-word' }}> {OtherData.name}</label>  </Labels>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Contain>


      </div>
      <div style={{ marginBottom: "20px" }}>
        <Contain>
          <Stack direction="row" >
            <input
              disabled={othersdisable || disableTextAfterSubmission}
              checked={otherscheckbox}
              // onChange={handleOnCheck1}
              // onChange={toggleOthersCheckboxes}
              onChange={toggleOthersCheckboxes}
              type="checkbox"              
            />
            <Labels>
              <label> Others</label>{" "}
            </Labels>
          </Stack>

          <div style={{ marginRight: "33px", marginTop: "10px", }}>
            <TextField1
           style={{
            backgroundColor:
            employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
    ? "#f8f8f8"
    : "#ffffff",
          }}
              disabled={isCheckedotherstextfield}
              size="small"
              multiline
              placeholder="Add"
              autoComplete="off"
              value={OtherRecommendationothers}
              onChange={(e: any) => {
                setOtherRecommendationothers(e.target.value);
                setnavPrompt(true);
                setMoveTab(true);
              }}
              InputProps={{readOnly : disableTextAfterSubmission}}
            />
          </div>
        </Contain>
      </div>
      <AlertDialogSuccess
                      isAlertOpen={showToast}
                      handleAlertClose={handleClose}
                    >
                      {toastMessage}
                    </AlertDialogSuccess>
      </>
    )}
    </>
    
    

  );
}

export default Checkboxs
