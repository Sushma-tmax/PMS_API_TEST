import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField, Typography } from "@mui/material";
import { useAppraiserRejectsNormalizerContext } from '../../../../context/AppraiserRejectsNormalizer';
import { useReviewerContext } from '../../../../context/reviewerContextContext';

const Contain = styled("div")({
  marginRight: "33px",
  // marginLeft: "35px",

});

const TrainingRecommendations = styled("div")({
  marginBottom: "10px",
  // marginLeft: "35px",
  color: "#717171",
  fontFamily: "arial",
  fontSize: "16px",
});

const Tf1 = styled("div")({
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& . MuiTextField-root": {
  },
  "& .MuiTextField-root": {
    color: "#333333",
    fontWeight: "400",
    textTransform: "none",
    width: "100%",
    fontFamily: "arial",
  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left"
  },
});

const Contain1 = styled("div")({
  // marginLeft: "35px",
  marginRight: "33px",
});

const Recommendation = styled("div")({
  // marginTop: '30px',
  // marginLeft: "35px",
  marginBottom: "10px",
  fontFamily: "arial",
  color: '#717171',
  fontSize: '16px',

});
const EmployeeText = styled("div")({
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
  },
  "& .MuiTextField-root": {
    width: "100%",
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
  },
});
const Tf2 = styled("div")({
  // width: "93%",
  // marginTop: "5px",
  // backgroundColor: 'rgb(255 255 255/70%)',

  '& .MuiInputBase-input': {
    color: '#333333',
    fontSize: '14px',
    fontFamily: "arial",
    fontWeight: '400',
    // padding: "4px",
    textTransform: 'none',
    textAlign: "left",

  },
  "& .MuiTextField-root": {
    // color: "#333333",
    // fontSize: "13px",
    // fontWeight: "400",
    // textTransform: "none",
    // padding: "8px",
    width: "100%",
  },

});

const NFeedbackComments = (props: any) => {
  const { setnavPrompt, setMoveTab, employeeData } = props;
  // @ts-ignore
  const { setAppraiserOverallFeedback, disableTextAfterSubmission } = useAppraiserRejectsNormalizerContext();
  //@ts-ignore
  const { reviewerComments,reviewerOverallFeedComments,  empData } = useReviewerContext()
  const [hidecomments, setHidcomments] = useState(false);
  const [otherComments1, setOtherComments1] = useState<any>("");
  const [employeeComments, setEmployeeComments] = useState("");
  const [oneToOneMeetingDate, setOneToOneMeetingDate] = useState<any>("")


  useEffect(() => {
    setOtherComments1(employeeData?.data?.appraisal?.appraiser_overall_feedback)
    setEmployeeComments(employeeData?.data?.employee?.comments);
    setOneToOneMeetingDate(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10))

  }, [employeeData])

  const handleappraiserReCommentsChange = (e: any) => {
    setOtherComments1(e.target.value)
    setAppraiserOverallFeedback(e.target.value)
  }

  // useEffect(() => {
  //   if (reviewerComments == "" || reviewerComments == null || reviewer) {
  //     setHidcomments(false)
  //   } else {
  //     setHidcomments(true)
  //   }
  // }, [empData])



  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Recommendation><b>Appraiser Message for Employee</b> </Recommendation>
        <Contain1>
          <Tf1>
            <TextField
      //       style={{
      //         backgroundColor:
      //         employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
      // ? "#f8f8f8"
      // : "#ffffff",
      //       }}
              placeholder="Add"
              multiline
              size='small'
              value={otherComments1 || ""}
              onChange={e => {
                handleappraiserReCommentsChange(e)
                setMoveTab(true);
                setnavPrompt(true)
              }}
              InputProps={{ readOnly: disableTextAfterSubmission }}
            />
          </Tf1>
        </Contain1>
      </div>


      {employeeData?.data?.reviewer?.reviewer_comments !== undefined &&
        employeeData?.data?.reviewer?.reviewer_comments !== "" &&
        employeeData?.data?.reviewer?.reviewer_PA_rejected !== true && (
          <div style={{ marginBottom: "20px" }}>
            <TrainingRecommendations>
              <b>Reviewer Comments</b>
            </TrainingRecommendations>
            <Contain>
              <Tf2>
                <TextField
                style={{
                  backgroundColor:
                  employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
          ? "#f8f8f8"
          : "#ffffff",
                }}
                  size="small"
                  InputProps={{ readOnly: true }}
                  autoComplete="off"
                  name="comments"
                  value={reviewerComments}
                />
              </Tf2>
            </Contain>
          </div>
        )}   
         {(employeeData?.data?.employee?.employee_status == "rejected" &&

       <>
       
       <div style={{ marginBottom: "20px" }}>
                    <Recommendation>
                      <b>Employee Comments</b>
                      {/* <span style={{
                        fontSize: "22px",
                      }}>*</span> */}
                    </Recommendation>

                    {/* <div style={{ marginRight: "65px" }}> */}
                      <Contain1>
                        <Tf1>
                        <TextField
                        style={{
                          backgroundColor:
                          employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                  ? "#f8f8f8"
                  : "#ffffff",
                        }}
                          autoComplete="off"
                          size="small"
                          multiline
                          placeholder="Add"
                          value={employeeComments}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                        </Tf1>
                          </Contain1>
                  </div>

                    <div style={{ marginBottom: "20px" }}>
                      <Recommendation
                        style={{
                          fontSize: "16px",
                          fontFamily: "arial",
                          color: "#717171",
                          marginBottom: "10px",
                        }}
                      >
                        {" "}
                        <b>One-to-One Meeting Date</b>
                        {/* <span style={{
                          fontSize: "22px",
                        }}>*</span> */}
                      </Recommendation>
                      <div>
                      <Contain1>
                        <Tf1>
                        <TextField
                        style={{
                          backgroundColor:
                          employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                  ? "#f8f8f8"
                  : "#ffffff",
                        }}
                          autoComplete="off"
                          size="small"
                          multiline
                          placeholder="Add"
                          value={oneToOneMeetingDate}
                          InputProps={{
                            readOnly: true
                          }}
                        />
                         </Tf1>
                          </Contain1>
                      </div>
                    </div>
                    </>      
                 
         )}
    </>

  );
}

export default NFeedbackComments

