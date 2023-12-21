import React, {useEffect} from 'react'
import { styled } from "@mui/material/styles";
import { TextField, Box, Tooltip } from "@mui/material";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";


const Overallfeedback = styled("div")({
    // marginLeft: "25px",
    // marginTop: "20px",
    // marginTop: "85px",
    color: "#717171",
    fontSize: "16px",
    fontFamily:"arial"
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
        fontFamily:"arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
    },
    // "& label.Mui-focused": {
    //     //color: 'green',
    // },
    // "& .MuiInput-underline:after": {
    //     borderBottomColor: "green",
    // },
    // "& .MuiOutlinedInput-root": {
    //     "& fieldset": {
    //         borderColor: "#333333",
    //     },
    //     "&:hover fieldset": {
    //         borderColor: "#E7EEEE",
    //     },
    //     "&.Mui-focused fieldset": {
    //         borderColor: "#EBEBEB",
    //     },
    // },
});

const OverallFeedback = () => {
    //   @ts-ignore
  const { fData, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appOverallFeed, setAppOverallFeed, emptyAppOverall, setEmptyAppOverall,moveTab,setMoveTab } = useAppraisalContext();

  useEffect(() => {
    if (empData) {
      setAppOverallFeed(empData?.data?.appraisal?.appraiser_overall_feedback);
    }
  }, [empData]);

    return (
        <> <div style={{marginRight:"58px",paddingTop:"20px"}} >
            <Overallfeedback> <b>Appraiser Overall Feedback </b><span style={{fontSize:"22px",}}>*</span></Overallfeedback>
           
            <TextField1
            size="small"
                multiline
                placeholder="Add"
                // name={j.name}
                autoComplete="off"  
                value={appOverallFeed}
                // error={appOverallFeed === "" && emptyAppOverall === true}
                inputProps={{ maxLength: 500 }}
                // variant="standard"
                // InputProps={{
                //     disableUnderline: true,
                // }}
                onChange={(e) => {
                    setAppOverallFeed(e.target.value);
                    // setnavPrompt(true);
                    setMoveTab(true);
                }}
            // error = {appOverallFeed === ""}
            />
            </div>
        </>
    )
}

export default OverallFeedback