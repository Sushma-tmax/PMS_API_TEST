import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Checkbox, Typography } from "@mui/material";
import { TextField } from "@mui/material";
// import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Blueadd from "../Reviewericons/Blueadd.svg";
import Bluenegative from "../../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueplus from "../Reviewericons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ReviewerFeedbackComments1 from "./ReviewerFeedbackComments";
import Table11 from "./Table11";
import Table21 from "./Table21";
import ReviewerAreaComments1 from "./ReviewerAreaComments1";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useGetEmployeeAppraisalQuery } from "../../../../service";
import { useParams, useNavigate } from "react-router-dom";
import ProvidedReviewerContextProvider from "../../../../context/reviewerContextContext";




const Typo1 = styled("div")({
  marginLeft: "25px",
  paddingTop: "20px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial"
});
const Contain = styled("div")({
  marginRight: "20px",

  marginTop: "10px",

});
const Tf1 = styled("div")({
  marginLeft: "25px",
  marginTop: "5px",
  
  backgroundColor: "white",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontFamily:"arial",
      fontWeight: "400",
      textTransform: "none",
      // padding: "4px",
      textAlign:"left"
    },
});
const Typo2 = styled("div")({
  marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily:"arial"
});
const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Divide1 = styled("div")({
  //position: "absolute",
  marginTop: "15px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Overallfeedbackss = styled("div")({
  //marginLeft: "58px",
 // marginTop: "10px",
 color:'#3e8cb5',
 //color: "#333333",
 fontSize: "20px",
 fontFamily:'Avenir semibold Italics',
 display:"flex",
 justifyContent:"center",
 fontStyle:"italic"
});

const Performancefeedbacksummary1 = (props: any) => {
  //@ts-ignore
  const {fData,appraiserFeedback,setAppraiserFeedback,overallFeed,setOverallFeed,isLoading,empData,feedbackLoading,areaImprovement,setAreaImprovement,area,setarea,appraiserOverallFeedback,setAppraiserOverallFeedback
  } = useReviewerContext();
  const {moveTab,setMoveTab} = props
  console.log(fData,'fData')
  // const { employeeData,setnavPrompt,navPrompt } = props;
  // console.log(employeeData, "edata");
  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  // console.log(fData, "ffffffff");
  const [action, setAction] = useState<any>([]);
  console.log(action, "action");
  const [specificActionList, setSpecificActionList] = useState([
    { specificAction: "action1", id: 1, improvement: "improvement1" },
    { specificAction: "action2", id: 2, improvement: "improvement1" },
    { specificAction: "action3", id: 3, improvement: "improvement1" },
    { specificAction: "action4", id: 4, improvement: "improvement2" },
    { specificAction: "action5", id: 5, improvement: "improvement2" },
    { specificAction: "action6", id: 6, improvement: "improvement2" },
    { specificAction: "action7", id: 7, improvement: "improvement3" },
    { specificAction: "action8", id: 8, improvement: "improvement4" },
    { specificAction: "action9", id: 9, improvement: "improvement4" },
  ]);
  const [overallFeedback, setOverallFeedback] = useState<any>([]);
  
  useEffect(() => {
    if (fData && empData) {
      setOverallFeedback(() => {
        const filter = empData.data.appraisal_template?.feedback_questionnaire?.map((i: any) => {
          return empData.data.appraisal.feedback_questions.filter((j: any) => {
            if (j.name) {
              return i.name?.name === j.name.name;
            }

          
          });
        });

        console.log(filter.flat(), "filter");
        if (filter.flat().length > 0) {
          return filter
            .map((j: any) =>
              j.map((a: any) => {
                console.log(
                  {
                    name: a.name.name,
                    value: a.value,
                  },
                  "setOverallFeed"
                );
                return {
                  name: a.name,
                  value: a.value,
                };
              })
            )
            .flat();
        } else {
          return empData.data.appraisal_template?.feedback_questionnaire?.map((i: any) => {
            return {
              name: i?.name,
              value: "",
            };
          });
        }

       
      });
    }
  }, [fData, empData]);
  


  const handleSpecificAdd = (e: any) => {
    const { name, value } = e.target;
    console.log(name, "name value");

    // @ts-ignore
    setarea((prevState: any) => {
      console.log(prevState, "prevState");
      const { specific_actions: test } = prevState[0];
      return prevState.map((item: any) => {
        console.log(item, "item");
        return {
          value: item.value,
          specific_actions: [...item.specific_actions, { value: "" }],
        };
      });
    });

  };
  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData?.data?.reviewer?.reviewer_rejected_value?.filter(
        (j: any) => j.value === value
      )[0]?.isChecked;
    }
  };

  return (

    <div>
      {employeeData && (
        <div>
             {/* <Overallfeedbackss> 
      <span 
      style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#333333"
    }}
      >
        "
      </span>
      Please review the recommendation section and add your comments.
      <span  style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#333333"
    }}>"</span> </Overallfeedbackss> */}
          <Typo1>Performance Feedback Summary</Typo1>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              {/* <Typo2><b>Appraiser Overall Feedback</b></Typo2>
                        <Contain>
                        <Tf1>
                          <Box>
                            <TextField
                            disabled
                              fullWidth
                              multiline
                              rows={1}
                              value={appraiserOverallFeedback || ""} 
                            ></TextField>
                          </Box>
                        </Tf1>
                        </Contain> */}
                        {/* <ReviewerFeedbackComments1 employeeData = {employeeData}/> */}
                {/* {appraiserFeedback &&
                  appraiserFeedback.map((i: any) => {
                    return (
                      <>
                        <Typo2><b>Appraiser {i.name.name}</b> </Typo2>
                        <Contain>
                        <Tf1>
                          <Box>
                            <TextField
                            disabled
                              fullWidth
                              multiline
                              rows={2}
                              key={i._id}
                              value={i.value}
                            ></TextField>
                          </Box>
                        </Tf1>
                        </Contain>
                      </>
                    );
                  })} */}
                   {overallFeedback &&
                    overallFeedback.map((j: any, mapIndex: any) => {
                      return (
                        <>
                          <Typo2> <b>{j?.name?.name}</b> </Typo2>
                          <Contain>
                            <Box>
                              <Tf1>

                                <TextField
                                  fullWidth
                                  InputProps={{readOnly: true}}
                                  multiline
                                  inputProps={{ maxLength: 500 }}
                                  // variant="standard"
                                  // InputProps={{
                                  //   disableUnderline: true,
                                  // }}
                                  // placeholder='Add'
                                  size='small'
                                  key={j._id}
                                  value={overallFeedback[mapIndex].value}
                                  onChange={(e) => {
                                    setOverallFeedback(
                                      overallFeedback.map((i: any, ix: any) =>
                                        ix === mapIndex
                                          ? {
                                            ...i,
                                            value: e.target.value,
                                          }
                                          : i
                                      )
                                    );
                                    // setnavPrompt(true)
                                  }}
                                />

                              </Tf1>
                            </Box>
                          </Contain>
                        </>
                      );
                    })}
              </Grid>
              {/* <Grid item >
             
             </Grid> */}
            </Grid>
           
            {/* <ReviewerFeedbackComments1 employeeData = {employeeData}/> */}
          </Box>
          {/* <Divide>
            {" "}
            <Divider />
          </Divide> */}
        </div>
      )}

      {employeeData && checkIfRejected("area_of_improvement") && (
        <div>
          <Table11 />
          <ReviewerAreaComments1 moveTab = { moveTab} setMoveTab= { setMoveTab} />
          {/* <Divide1>
            {" "}
            <Divider />
          </Divide1> */}
        </div>
      )}
    </div>
  )
}
export default Performancefeedbacksummary1