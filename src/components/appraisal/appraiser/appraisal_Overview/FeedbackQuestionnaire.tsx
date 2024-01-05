import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField,} from "@mui/material";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";


const Overallfeedback = styled("div")({
    color: "#717171",
    fontSize: "16px",
    fontFamily: "arial",
    marginBottom: "10px",
});

const FeedbackQuestionnaireTextfield = styled(TextField)({
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
        fontFamily: "Arial",
        fontWeight: "400",
        textTransform: "none",
        // padding: "4px",
        textAlign: "left"
    },
});

const FeedbackQuestionnaire = (props: any) => {
    //   @ts-ignore
    const { fData, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, setAppOverallFeed, setMoveTab, disableTextAfterSubmission } = useAppraisalContext();
    const { navPrompt, setnavPrompt } = props
    const [overallFeedback, setOverallFeedback] = useState<any>([]);

    useEffect(() => {
        setOverallFeed(pre(overallFeedback));
      }, [overallFeedback]);
    
      const pre = (arr: any) => {
        return arr.map((i: any) => {
          return {
            name: i?.name?._id,
            value: i?.value,
          };
        });
      };
    
      useEffect(() => {
        if (fData && empData) {
          setOverallFeedback(() => {
            const filter = empData.data.appraisal_template?.feedback_questionnaire.map((i: any) => {
              return empData.data.appraisal?.feedback_questions.filter((j: any) => {
                if (j.name) {
                  return i?.name?.name === j?.name?.name;
                }
              });
            });
    
            if (filter?.flat().length > 0) {
              return filter
                .map((j: any) =>
                  j.map((a: any) => {
                    console.log(
                      {
                        name: a?.name?.name,
                        value: a?.value,
                      },
                      "setOverallFeed"
                    );
                    return {
                      name: a?.name,
                      value: a?.value,
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
    

      useEffect(() => {
        if (empData) {
          setAppOverallFeed(empData?.data?.appraisal?.appraiser_overall_feedback);
        }
      }, [empData]);

      if (isLoading) {
        return <div>Loading...</div>;
      }
      if (feedbackLoading) {
        return <div>Loading...</div>;
      }
    
      if (overallFeed.length === 0) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            {overallFeed &&
                overallFeedback &&
                overallFeedback.map((j: any, mapIndex: any) => {
                    return (
                        <>
                         <div style={{ marginBottom: "20px" }}>
                            <Overallfeedback> <b>{j?.name?.name}</b> <span style={{
                                fontSize: "22px",
                            }}>*</span></Overallfeedback>

                            <FeedbackQuestionnaireTextfield
                                size="small"
                                placeholder="Add"
                                multiline
                                autoComplete="off"
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
                                    setnavPrompt(true);
                                    setMoveTab(true);
                                }}
                                InputProps={{ readOnly: disableTextAfterSubmission }}
                            />
                            </div>
                        </>
                    );
                })}</div>
    )
}

export default FeedbackQuestionnaire