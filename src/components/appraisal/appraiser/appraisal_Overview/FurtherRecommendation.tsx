import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import { TextField } from "@mui/material";
import AlertDialogSuccess from "../../../UI/DialogSuccess";

const Contain = styled("div")({
  // marginLeft: "25px",
  marginRight: "20px",
  marginTop: "10px",
  width: "100%",
  paddingTop: "0px",
});


const TextField1 = styled(TextField)({
  width: "100%", // This sets the default width
  // Add an explicit width to override the default
  // width: "500px", // Adjust this value as needed
  marginTop: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
  },
});

const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  marginLeft: "5px",
  fontFamily: "arial"
});

const FurtherRecommendationHeader = styled("div")({
  marginBottom: "10px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});


const Checkboxs = (props: any) => {
  const { setnavPrompt, isCheckedothers, setisCheckedothers } = props;
  //@ts-ignore
  const { otherRecommendation, empData, setOtherRecommendation, otherRecommendationothers, otherscheckbox, setotherscheckbox, setOtherRecommendationothers, setOpenSnackbar, setMoveTab, disableTextAfterSubmission  } = useAppraisalContext()
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCheckedotherstextfield, setisCheckedotherstextfield] = useState(true);
  const [othersdisable, setothersdisable] = useState(false);
 

  useEffect(() => {
    if (empData) {
      setOtherRecommendationothers(empData?.data?.appraisal?.other_recommendation_others);
      setotherscheckbox(empData?.data?.appraisal?.others_checkbox)
    }
  }, [empData]);


  useEffect(() => {
    if (otherscheckbox == true) {
      setisCheckedotherstextfield(false)
    } else {
      setisCheckedothers(false)
      setisCheckedotherstextfield(true)
    }
  }, [otherscheckbox, empData])


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
    setOpenSnackbar(false);
  };

  const validateOtherRecommendation = (selectedOtherRecommendation: any, isChecked: any) => {
    const tempUser = otherRecommendation.map((OtherData: any) => {
      return OtherData._id === selectedOtherRecommendation ? { ...OtherData, isChecked: false } : OtherData
    });
    setOtherRecommendation(tempUser);
  }

  const handleOthersCheckbox = (event: any) => {
    setotherscheckbox(event.target.checked);
    // Do something with the event object.
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    const id = checkbox.id;
    // Do something with the checkbox state and ID.
    console.log(otherscheckbox, isCheckedothers, "checkbox")
    if (otherscheckbox == true) {
      setisCheckedothers(true)
    } else {
      setisCheckedothers(false)
    }
  };


  const handleFurtherRecommendationCheckbox = (e: any) => {
    setnavPrompt(true);
    setMoveTab(true);
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
  };


  useEffect(() => {
    const otherrrecomendation = otherRecommendation?.filter((j: any) => j.isChecked === true);
    if (otherrrecomendation?.length > 0) {
      setothersdisable(true)
      setisCheckedotherstextfield(true)
    } else {
      setothersdisable(false)
      setisCheckedotherstextfield(false)
    }
  }, [otherRecommendation])
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

  const toggleIndividualCheckbox = (index: any) => {
    const updatedOtherRecommendation = [...otherRecommendation];
    updatedOtherRecommendation[index].isChecked = !updatedOtherRecommendation[index].isChecked;
    setOtherRecommendation(updatedOtherRecommendation);
    setotherscheckbox(false);
    
    setnavPrompt(true);
    setMoveTab(true);
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
  };
  useEffect(()=>{
    if (otherscheckbox == true) {
      setisCheckedothers(true)
      setisCheckedotherstextfield(false)
      // isCheckedotherstextfield
    } else {
      setisCheckedothers(false)
      setisCheckedotherstextfield(true)
    }
  },[otherscheckbox])
  return (
    <div  style={{ marginBottom: "20px" }}>
      <FurtherRecommendationHeader>
        <b> Further Recommendations</b>
      </FurtherRecommendationHeader>

      <Contain>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {otherRecommendation &&
            otherRecommendation
              .sort((a: any, b: any) => a.sort_value - b.sort_value)
              .map((OtherData: any, index: any) => {
                return (                
                  <Grid display="flex" alignItems="center"  item xs={2} sm={4} md={3} key={index}>
                    <input
                      disabled={isCheckedothers || disableTextAfterSubmission}
                      name={OtherData._id}
                      checked={OtherData?.isChecked || false}
                       onChange={e => {
                          handleOnCheck(e)
                          setnavPrompt(true);
                          setMoveTab(true)
                          // setMoveTab(true);
                        }}
                      // onChange={handleFurtherRecommendationCheckbox}
                      // onChange={() => {toggleIndividualCheckbox(index)}}
                        // setMoveTab(true)
                      //   setnavPrompt(true);
                      //  setMoveTab(true)
                    //  }}
                      type="checkbox"
                    />
                    <Labels>
                      <label style={{ overflowWrap: 'break-word' }}> {OtherData?.name}</label>{" "}
                    </Labels>
                  </Grid>
                );
              })}
        </Grid>
      </Contain>

      <Contain>
        <div>
          <Stack direction="row" >
            <input
              disabled={othersdisable || disableTextAfterSubmission}
              checked={otherscheckbox}
              // onChange={handleOthersCheckbox}
              onChange={toggleOthersCheckboxes}
              type="checkbox"             
            />
            <Labels>
              <label> Others</label>{" "}
            </Labels>
          </Stack>
        </div>

        <div style={{ marginRight: "33px" }}>
          <TextField1
            disabled={isCheckedotherstextfield}
            size="small"
            multiline
            placeholder="Add"
            autoComplete="off"
            value={otherRecommendationothers}
            onChange={(e: any) => {
              setOtherRecommendationothers(e.target.value);
              setnavPrompt(true);
              setMoveTab(true);
            }}
            InputProps={{ readOnly: disableTextAfterSubmission }}
          />
        </div>

        <AlertDialogSuccess
          isAlertOpen={showToast}
          handleAlertClose={handleClose}
        >
          {toastMessage}
        </AlertDialogSuccess>        
      </Contain>
    </div>
  );
};

export default Checkboxs;
