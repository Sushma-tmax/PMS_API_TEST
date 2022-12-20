import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import { Alert, Button } from "@mui/material";
import AlertDialogSuccess from "../../UI/DialogSuccess";

const Contain = styled("div")({
  // marginLeft: "25px",
  marginRight: "20px",
  marginTop: "10px",
  width: "100%",
  paddingTop: "0px",
});
const Checkcontainer = styled("div")({
  width: "1000",
});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "5px",
  fontFamily:"arial"
});
const HRActions = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  // opacity: 0.85,
});
const Checkboxs = (props: any) => {
  const { other2Data, setnavPrompt, navPrompt } = props;
  // const [otherRecommendation, setOtherRecommendation] = useState<any>([])
  //@ts-ignore
  const { otherRecommendation, setOtherRecommendation, openSnackbar, setOpenSnackbar, moveTab, setMoveTab } = useAppraisalContext()

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpenSnackbar(true);
  };

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

  const handleOnCheck = (e: any) => {
    // setnavPrompt(true);
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
    console.log(tempUser, "temp");
  };

  const checkedOtherRecommendation = otherRecommendation?.filter(
    (j: any) => j.isChecked === true
  );


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
  console.log(otherRecommendation, "sort_value");

  useEffect(() => {
    // console.log(checkboxIdHandler(checkboxHandler(otherRecommendation)))
    //@ts-ignore
    // setOtherRecommendation(checkboxIdHandler(checkboxHandler(otherRecommendation)))
  }, [otherRecommendation]);

  return (
    <div>
      <HRActions>
        <b> Other Recommendations</b>
      </HRActions>
      <Contain>
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {otherRecommendation &&
            otherRecommendation
              .sort((a: any, b: any) => a.sort_value - b.sort_value)
              .map((OtherData: any, index: any) => {
                return (
                  // <Box
                  //   sx={{
                  //     display: "flex",
                  //     flexDirection: "row",
                  //     // width: '201px',
                  //     width: "20%",
                  //     float: "left",
                  //     paddingBottom: "15px",
                  //   }}
                  // >
                  <Grid display="flex" item xs={2} sm={4} md={3} key={index}>

                    <input
                      name={OtherData._id}
                      checked={OtherData?.isChecked || false}
                      onChange={handleOnCheck}
                      type="checkbox"
                    />
                    <Labels>
                      <label> {OtherData.name}</label>{" "}
                    </Labels>
                  </Grid>

                  // </Box>
                );
              })}
        </Grid>
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
