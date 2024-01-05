import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Box, Tooltip } from "@mui/material";
import Blueadd from "../../../../assets/Images/Blueadd.svg";
import Blueminus from "../../../../assets/Images/Blueminus.svg";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FeedbackQuestionnaire from "./FeedbackQuestionnaire";

const PerformanceFeedbackSummary = styled("div")({
  // marginLeft: "25px",
  paddingTop: "20px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
  paddingBottom: "20px"
});

const Overallfeedback = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});

const FeedbackQuestionnaireTextfield = styled(TextField)({
  width: "100%",
  // marginLeft: "25px",
  marginTop: "5px",
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


const Areasofimprovement = styled("div")({
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  marginBottom: "10px"
});


const SpecificAreaTextField = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",

  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "left"
  },
});


const SpecificActionTextField = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    padding: "8px",
    textAlign: "left"
  },
  "& .MuiTextField-root": {
    width: "100%",
  },
});


const Performancefeedbacksummary = (props: any) => {
  //   @ts-ignore
  const { isLoading, setAreaImprovement, area, setarea, setMoveTab, disableTextAfterSubmission } = useAppraisalContext();
  const { navPrompt, setnavPrompt } = props;

  const handleAreaImprovementRemove = (index: any) => {
    setMoveTab(true);
    const newAreaList = [...area];
    newAreaList.splice(index, 1);
    setarea(newAreaList);
  };

  const handleAreaImprovementAdd = () => {
    return setarea((prevState: any) => {
      const toSpread = {
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }],
      };
      const newArea = [...prevState, toSpread];
      return newArea;
    });
  };


  useEffect(() => {
    if (area) {
      setAreaImprovement(area);
    }
    if (area.length == 0) {
      handleAreaImprovementAdd()
    }
  }, [area]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ marginRight: "33px" }}>

        <PerformanceFeedbackSummary>
          Performance Feedback Summary
        </PerformanceFeedbackSummary>

        <FeedbackQuestionnaire
          navPrompt={navPrompt}
          setnavPrompt={setnavPrompt} />
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "20px" }}>
          <Areasofimprovement>
            <b>Areas for Improvement</b>
          </Areasofimprovement>

          <Table size="small">
            <TableHead>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                    bgcolor: "#eaeced",
                  },
                }}
              >
                <TableCell
                  width="30%"
                  align="center"
                  style={{
                    border: "1px solid #e0e0e0",
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Specific Areas
                </TableCell>
                <TableCell
                  width="70%"
                  align="center"
                  style={{
                    fontFamily: "Arial",
                    border: "1px solid #e0e0e0",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Specific Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {area && area.map((singleImprovementList: any, index: any) => (
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    },
                  }}
                >
                  <TableCell>
                    <SpecificAreaTextField>
                      <TextField
                        size="small"
                        fullWidth
                        autoComplete="off"
                        multiline
                        placeholder="Add"
                        name="improvement"
                        key={index}
                        value={area[index].value}
                        inputProps={{ maxLength: 500 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: disableTextAfterSubmission
                        }}
                        onChange={(e) => {
                          setarea(
                            area.map((previousState: any, ix: any) => {
                              console.log(area, 'areaaaaaa')
                              if (ix === index) {
                                return {
                                  ...previousState,
                                  value: e.target.value
                                }
                              }
                              return previousState
                            }))
                          setnavPrompt(true);
                          setMoveTab(true);
                        }}
                      />
                    </SpecificAreaTextField>
                  </TableCell>

                  <TableCell>
                    {area.map((i: any, mapIndex: number) => {
                      return (
                        <>
                          {(index === mapIndex) && area && i.specific_actions.map((j: any, index1: any) => {
                            return (
                              <>
                                <SpecificActionTextField>
                                  <Box>
                                    <TextField
                                      multiline
                                      autoComplete="off"
                                      size="small"
                                      placeholder="Add"
                                      name="specificAction"
                                      inputProps={{ maxLength: 500 }}
                                      value={area[index].specific_actions[index1].value}
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true, // <== added this
                                        readOnly: disableTextAfterSubmission
                                      }}
                                      onChange={(e) => {
                                        setarea(
                                          area.map((previousState: any, ix: any) => {
                                            if (ix === index) {
                                              return {
                                                ...previousState,
                                                specific_actions: previousState.specific_actions.map((previousState1: any, ix1: any) => {
                                                  if (ix1 === index1) {
                                                    return {
                                                      ...previousState1,
                                                      value: e.target.value
                                                    }
                                                  }
                                                  return previousState1
                                                })
                                              }
                                            }
                                            return {
                                              ...previousState,
                                            }
                                          }))
                                        setnavPrompt(true);
                                        setMoveTab(true);
                                      }}
                                    />
                                  </Box>
                                </SpecificActionTextField>
                              </>
                            )
                          })}
                        </>
                      )
                    })}
                  </TableCell>
                  <TableCell style={{ borderColor: "#ffffff", padding: "0px", paddingLeft: "12px" }}>

                    {area.length !== 0 && (
                      <div>
                        <Tooltip title="Delete">
                          {disableTextAfterSubmission ? <img
                            style={{ cursor: "default" }}
                            src={Blueminus}
                            alt="Delete icon"
                          /> :
                            <img
                              style={{ cursor: "pointer" }}
                              src={Blueminus}
                              onClick={() => handleAreaImprovementRemove(index)}
                              alt="Delete icon"
                            />}
                        </Tooltip>
                      </div>
                    )}

                    {area.length - 1 === index &&
                      <div>
                        <Tooltip title="Add">
                          {disableTextAfterSubmission ? 
                          <img style={{ cursor: "default" }} src={Blueadd}
                            alt="icon" /> :
                            <img style={{ cursor: "pointer" }} src={Blueadd}
                              onClick={() => {
                                handleAreaImprovementAdd();
                                setMoveTab(true);
                              }}
                              alt="icon" />}
                        </Tooltip>
                      </div>
                    }


                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Box>
    </div>
  );
};

export default Performancefeedbacksummary;
