import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { TextField, Tooltip } from "@mui/material";
import Blueadd from "../../../../assets/Images/Blueadd.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Blueminus from "../../../../assets/Images/Blueminus.svg";

const Typo1 = styled("div")({
  // marginLeft: "35px",
  marginBottom: "20px",
  paddingTop: "20px",
  // color: "#008E97",
  // fontSize: "18px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
});


const Typo2 = styled("div")({
  // marginLeft: "35px",
  marginBottom: "10px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});

const Tf1 = styled("div")({
  // marginLeft: "35px",
  marginRight: "33px",
  marginTop: "5px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& . MuiTextField-root": {
    width: "100%"
  },
  "& .MuiTextField-root": {
    color: "#333333",
    fontSize: "10px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "arial",
    width: "100%"
  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    // padding: "4px",
    textTransform: "none",
    fontFamily: "arial",
    textAlign: "left"
  },
});

const Tf2 = styled("div")({
  width: "96%",
  marginTop: "5px",
  backgroundColor: "rgb(255 255 255/70%)",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    opacity: 0.4,
    fontFamily: "arial",
  },
});

const Tf6 = styled("div")({
  // marginLeft: "35px",
});

const Tf3 = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  // marginLeft: "58px",

  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    padding: "8px",
    color: "#333333",
    textAlign: "left"
    // padding: "8px",
    // height: "110px !important",
  },
});

const Tf5 = styled("div")({
  // position: "absolute",
  borderRadius: "5px",
  backgroundColor: "#ffffff",
  // marginLeft: "58px",

  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "left"
  },
});
const Tf4 = styled("div")({
  // position: "absolute",
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  // marginLeft: "58px",

  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "left"
  },
});
const Areasofimprovement = styled("div")({
  // marginLeft: "35px",
  // marginTop: "10px",
  color: "#717171",
  fontSize: "16px",
  marginBottom: "10px",
  fontFamily: "arial",
  //opacity: 0.7
});

const Addmore = styled("div")({
  marginLeft: "7px",
  color: "#008E97",
  fontSize: "12px",
});

const Performancefeedbacksummary = (props: any) => {
  const { employeeData, setnavPrompt, setMoveTab } = props;
  //@ts-ignore
  const { fData, setOverallFeed, empData, feedbackLoading, setAreaImprovement, area, setarea, appraiserOverallFeedback, disableTextAfterSubmission } = useAppraiserRejectsNormalizerContext();
  const [overallFeedback, setOverallFeedback] = useState<any>([]);
  const [area1, setarea1] = useState<any>([
    {
      id: Date.now(),
      value: "",
      specific_actions: [{ value: "" }],
    },
  ]);
  const handleSpecificRemove = (index: any) => {
    setnavPrompt(true)
    setMoveTab(true);
    const newAreaList = [...area];
    newAreaList.splice(index, 1);
    setarea(newAreaList);
  };

  const handleImprovementAdd = () => {
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
    setOverallFeed(pre(overallFeedback));
  }, [overallFeedback]);
  useEffect(() => {
    setarea1(employeeData?.data?.employee?.area_of_improvement);

  }, [employeeData]);
  const pre = (arr: any) => {
    return arr.map((i: any) => {
      return {
        name: i?.name?._id,
        value: i.value,
      };
    });
  };

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
  }, [empData]);


  useEffect(() => {
    if (area) {
      setAreaImprovement(area);
    }
    if (area.length == 0) {
      handleImprovementAdd()
    }
  }, [area]);


  if (feedbackLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {employeeData && (
        <div>
          <Typo1>Performance Feedback Summary</Typo1>
          <Grid item xs={12}>
            {overallFeedback &&
              overallFeedback.map((j: any, mapIndex: any) => {
                return (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typo2><b> {j.name.name}</b> <span style={{ fontSize: "22px" }}>*</span> </Typo2>
                      <Tf1>
                        <TextField
                          style={{
                            backgroundColor:
                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                ? "#f8f8f8"
                                : "#ffffff",
                          }}
                          placeholder="Add"
                          multiline
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
                            setnavPrompt(true)
                            setMoveTab(true);
                          }}
                          InputProps={{
                            readOnly: disableTextAfterSubmission,
                            disabled:
                              (employeeData?.data?.employee?.employee_status == "rejected" ||
                              employeeData?.data?.appraisal?.status == "rejected"),
                          }}
                        />
                      </Tf1>
                    </div>
                  </>
                );
              })}
            <Tf2></Tf2>
          </Grid>
        </div>
      )}


      <div>
        <Box sx={{ flexGrow: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <Areasofimprovement> <b>Areas for Improvement</b>
            </Areasofimprovement>
            <Tf6>
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
                        <Tf3>
                          <TextField
                            style={{
                              backgroundColor:
                                employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                  ? "#f8f8f8"
                                  : "#ffffff",
                            }}
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
                              readOnly: disableTextAfterSubmission,
                              disabled:
                                (employeeData?.data?.employee?.employee_status == "rejected" ||
                                employeeData?.data?.appraisal?.status == "rejected"),
                            }}
                            onChange={(e) => {
                              setarea(
                                area.map((previousState: any, ix: any) => {
                                  if (ix === index) {
                                    return {
                                      ...previousState,
                                      value: e.target.value
                                    }
                                  }
                                  return previousState
                                }))
                              setnavPrompt(true)
                              setMoveTab(true);
                            }}
                          />
                        </Tf3>
                      </TableCell>

                      <TableCell>
                        {area.map((i: any, mapIndex: number) => {
                          return (
                            <>
                              {(index === mapIndex) && area && i.specific_actions.map((j: any, index1: any) => {
                                return (
                                  <>
                                    <Tf4>
                                      <Box>
                                        <TextField
                                          style={{
                                            backgroundColor:
                                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                                ? "#f8f8f8"
                                                : "#ffffff",
                                          }}
                                          fullWidth
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
                                            readOnly: disableTextAfterSubmission,
                                            disabled:
                                              (employeeData?.data?.employee?.employee_status == "rejected" ||
                                              employeeData?.data?.appraisal?.status == "rejected"),
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
                                              }
                                              )
                                            )
                                            setnavPrompt(true)
                                            setMoveTab(true);
                                          }}

                                        />
                                      </Box>
                                    </Tf4>
                                  </>
                                )
                              })}
                            </>
                          )
                        })}
                      </TableCell>
                      <TableCell style={{ borderColor: "#ffffff", padding: "0px", paddingLeft: "12px" }}>
                        {(employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected") &&
                          <span>
                            {area.length !== 0 &&
                              // <Stack
                              //   direction="row"
                              //   alignItems="center"
                              //   spacing={0}
                              // >
                              <div>
                                <Tooltip title="Delete">
                                  {/* <Addmore
                                style={{
                                  // cursor: "pointer",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                }}
                              >
                                {" "} */}
                                  {disableTextAfterSubmission ?
                                    <img src={Blueminus}
                                      alt="icon"
                                      style={{ cursor: "default" }} /> :
                                    <img src={Blueminus}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => handleSpecificRemove(index)}
                                      alt="icon" />}
                                  {/* </Addmore> */}
                                </Tooltip>
                              </div>
                            }
                            {/* </Stack> */}

                            {area.length - 1 === index &&
                              // <Stack
                              //   direction="row"
                              //   alignItems="center"
                              //   spacing={1}
                              // >
                              <div>
                                <Tooltip title="Add">
                                  {/* <Addmore
                                style={{
                                  cursor: "pointer",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                }}

                              > */}
                                  {disableTextAfterSubmission ?
                                    <img src={Blueadd}
                                      style={{ cursor: "default" }}
                                      alt="icon" /> :
                                    <img src={Blueadd}
                                      onClick={() => {
                                        handleImprovementAdd();
                                        setnavPrompt(true);
                                        setMoveTab(true)
                                      }}
                                      style={{ cursor: "pointer" }}
                                      alt="icon" />}
                                  {/* </Addmore> */}
                                </Tooltip>
                              </div>
                              // </Stack>
                            }
                          </span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tf6>
          </div>
        </Box>
      </div>
      {(employeeData?.data?.employee?.employee_status == "rejected" && area1?.length > 0 &&
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <div style={{ marginBottom: "20px", marginRight: "20px" }}>
              {/* <div style={{ paddingTop: "10px", paddingBottom: "5px", color: "#717171" }}>
                          Employee Area(s) of Improvement
                        </div> */}

              <div
                style={{
                  color: "#717171",
                  fontSize: "16px",
                  fontFamily: "Arial",
                  // color: "#3E8CB5",
                  // fontSize: "14px",
                  // fontWeight: "600",
                }}
              >
                <Areasofimprovement><b> Areas for Improvement (Employee)</b></Areasofimprovement>
              </div>

              {/* <div style={{ marginRight: "10px", marginBottom: "20px" }}> */}
              <Tf6>
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
                    {area1 &&
                      area1.map(
                        (singleImprovementList: any, index: any) => (
                          <TableRow
                            sx={{
                              "& td, & th": {
                                border: "1px solid #e0e0e0",
                              },
                            }}
                          >
                            <TableCell>
                              <Tf3>
                                <TextField
                                  style={{
                                    backgroundColor: "#ffffff",
                                    //         employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                    // ? "#f8f8f8"
                                    // : "#ffffff",
                                  }}
                                  size="small"
                                  fullWidth
                                  autoComplete="off"
                                  multiline
                                  placeholder="Add"
                                  name="improvement"
                                  key={index}
                                  value={area1[index].value}
                                  inputProps={{ maxLength: 500 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true,
                                    readOnly: true
                                  }}
                                  onChange={(e) => {
                                    setarea1(
                                      area1.map(
                                        (previousState: any, ix: any) => {
                                          console.log(area1, "areaaaaaa");
                                          if (ix === index) {
                                            return {
                                              ...previousState,
                                              value: e.target.value,
                                            };
                                          }
                                          return previousState;
                                        }
                                      )
                                    );
                                    setMoveTab(true);
                                    setnavPrompt(true)
                                  }}
                                />
                              </Tf3>
                            </TableCell>

                            <TableCell
                              style={{
                                width: "100%",
                                paddingBottom: "10px",
                                paddingTop: "0px",
                              }}
                            >
                              {/* <Typo5>
                            <p>Specific Actions(s)</p>
                          </Typo5> */}
                              {area1.map((i: any, mapIndex: number) => {
                                return (
                                  <>
                                    {index === mapIndex &&
                                      area1 &&
                                      i.specific_actions.map(
                                        (j: any, index1: any) => {
                                          console.log(j, "console");
                                          return (
                                            <Stack
                                            // direction="row"
                                            // alignItems="center"
                                            // spacing={1}
                                            // width="200%"
                                            >
                                              <Tf5>
                                                <Box>
                                                  <TextField
                                                    style={{
                                                      backgroundColor: "#ffffff",
                                                      //         employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                                      // ? "#f8f8f8"
                                                      // : "#ffffff",
                                                    }}
                                                    // fullWidth
                                                    multiline
                                                    autoComplete="off"
                                                    // rows={1}
                                                    size="small"
                                                    placeholder="Add"
                                                    name="specificAction"
                                                    // key={index}
                                                    inputProps={{
                                                      maxLength: 500,
                                                    }}
                                                    value={
                                                      area1[index]
                                                        .specific_actions[
                                                        index1
                                                      ].value
                                                    }
                                                    variant="standard"
                                                    InputProps={{
                                                      disableUnderline:
                                                        true, // <== added this
                                                      readOnly: true
                                                    }}
                                                    onChange={(e) => {
                                                      setarea1(
                                                        area1.map(
                                                          (
                                                            previousState: any,
                                                            ix: any
                                                          ) => {
                                                            if (
                                                              ix === index
                                                            ) {
                                                              return {
                                                                ...previousState,
                                                                specific_actions:
                                                                  previousState.specific_actions.map(
                                                                    (
                                                                      previousState1: any,
                                                                      ix1: any
                                                                    ) => {
                                                                      if (
                                                                        ix1 ===
                                                                        index1
                                                                      ) {
                                                                        return {
                                                                          ...previousState1,
                                                                          value:
                                                                            e
                                                                              .target
                                                                              .value,
                                                                        };
                                                                      }
                                                                      return previousState1;
                                                                    }
                                                                  ),
                                                              };
                                                            }
                                                            return {
                                                              ...previousState,
                                                              // employeeAgreevalue: e.target.employeeAgreevalue
                                                            };
                                                          }

                                                          //     ix === index
                                                          //         ? {
                                                          //             ...i,
                                                          //             values: e.target.employeeAgreevalue,
                                                          //         }
                                                          //         : i
                                                        )
                                                      );
                                                      setMoveTab(true);
                                                      setnavPrompt(true);
                                                    }}
                                                  />
                                                </Box>
                                              </Tf5>

                                            </Stack>
                                          );
                                        }
                                      )}
                                  </>
                                );
                              })}
                            </TableCell>
                            <TableCell style={{ borderColor: "#ffffff" }}>
                              {/* <Stack
                                direction="row"
                                alignItems="center"
                                // marginLeft= "7px"
                                // width="100px"
                                // marginLeft="25px"
                                // marginTop="18px"
                                spacing={1}
                              > */}
                              {/* <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" /> */}
                              {/* <Tooltip title="Add">
                                        <Addmore
                                          style={{
                                            cursor: "pointer",
                                            color: "#3E8CB5",
                                            fontSize: "14px",
                                          }}
                                          onClick={() => {
                                            handleImprovementAdd();
                                            setMoveTab(true);
                                          }}
                                        >
                                          <img src={Blueadd} alt="icon" />
                                        </Addmore>
                                      </Tooltip> */}
                              {/* <Button
                                   style={{
                                    display: "flex",
                                    // justifyContent: "right",
                                    // alignItems: "right",
                                    textTransform: "none",
                                    height: "20px",
                                    minWidth: "2px",
                                    textDecoration: "underline",
                                    color: "#93DCFA",
                                    fontSize: "14px",
                                    marginTop: '25px'
                                  }}
                                  onClick={handleImprovementAdd}
                                  >
                                  Add More
                                  </Button> */}
                              {/* </Stack> */}
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0}
                              >
                                <Tooltip title="Delete">
                                  <Addmore
                                    style={{
                                      cursor: "pointer",
                                      color: "#3E8CB5",
                                      fontSize: "14px",
                                    }}
                                  // onClick={() =>
                                  //   handleSpecificRemove(index)
                                  // }
                                  >
                                    {" "}
                                    {/* <img src={Blueminus} alt="icon" /> */}
                                  </Addmore>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>

                </Table>
              </Tf6>

            </div>
          </Box>
        </div>
      )}
    </div>

  );
};

export default Performancefeedbacksummary;
