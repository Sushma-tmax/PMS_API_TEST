import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Checkbox, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Table1 from "./AppraiserArea";
import Table2 from "./Table2";
import RTrecommandation from "./NormalizerTrainingRecommendation";
import Checkboxs from "./NormalizerOtherRecommendation";
import Footerbuttons from "./Footerbuttons";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Blueadd from "./Reviewericons/Blueadd.svg";
import Blueminus from "./Reviewericons/Blueminus.svg";
import Bluenegative from "../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueplus from "./Reviewericons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useNormalizerContext } from "../../context/normalizerContext";
import AppraiserArea from "./AppraiserArea";
import ReviewerArea from "./ReviewerArea";
import { ContrastOutlined } from "@mui/icons-material";
import NFeedbackComments from "./NormalizerFeedbackComments";
import NAreaofImprovementComments from "./NormalizerAreaComments";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";

const Tf6 = styled("div")({
  marginLeft: "58px",
  //  position: "absolute",
  //  marginTop: '305px',
  color: "#3e8cb5",
  fontSize: "20px",
});
const Pad = styled("div")({
  fontSize: "14px",
  color: "#333333",
  fontFamily: "Arial",
  textAlign: "left",
  padding:"6px 16px",
  lineHeight:"23px"
});
const Pad1 = styled("div")({
  textAlign: "center",
});
const Areasofimprovement = styled("div")({
  marginLeft: "58px",
  marginTop: "40px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  //opacity: 0.7
});
const Typo1 = styled("div")({
  marginLeft: "58px",
  // paddingTop: '20px',
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
});
const Typo2 = styled("div")({
  marginLeft: "58px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  // opacity: 0.85
});
const Tf1 = styled("div")({
  marginLeft: "58px",
  marginRight:"58px",
  marginTop: "5px",
  backgroundColor: "white",
  // backgroundColor: "rgb(255 255 255/70%)",
  borderRadius: "5px",
  // width: "91%",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    fontFamily: "arial",
    textAlign: "left",
  },
  //   "& .MuiTextField-root": {
  //     width:"95%"
  // },
});
const Typo3 = styled("div")({
  marginTop: "20px",
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});
const Tf2 = styled("div")({
  // width: "96%",
  // marginTop: "5px",
  marginLeft: "58px",
  backgroundColor: "#f8f8f8",

  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    opacity: 0.4,
  },
});
const Contain = styled("div")({
  // marginRight: "20px",

  marginTop: "10px",
});
const Typo4 = styled("div")({
  marginLeft: "25px",
  //  position: "absolute",
  //  marginTop: '305px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});
const Tf3 = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
  },
});
const Typo5 = styled("div")({
  // marginLeft: "580px",
  // position: "absolute",
  // marginTop: '285px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});
const Tf4 = styled("div")({
  //position: "absolute",
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  //opacity: 0.7,
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
  },
});
const Tablecontainer = styled("div")({
  marginLeft: "58px",
  marginRight: '58px',
  //position: "absolute",
  marginTop: "12px",
});

const Root = styled("div")`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    // padding: 5px;

    background-color: #eaeced;
    fontsize: 12px;
    fontfamily: "Arial";
  }

  td {
    background-color: #ffffff;
    fontsize: 12px;
    fontfamily: "Arial";
  }
`;
const Tf5 = styled("div")({
  //position: "absolute",
  borderRadius: "5px",
  backgroundColor: "white",
  marginLeft: "58px",
  //opacity: 0.7,
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
  },
});
const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Addmore = styled("div")({
  // position: "absolute",
  // marginTop: '628px',
  // marginLeft: '45px',
  color: "#008E97",
  fontSize: "12px",
});
const Divide1 = styled("div")({
  //position: "absolute",
  marginTop: "15px",
  marginLeft: "25px",
  marginRight: "20px",
});
const Overallfeedbackss = styled("div")({
  marginLeft: "58px",
  // marginTop: "10px",
  color: "#3e8cb5",
  //color: "#333333",
  fontSize: "20px",
  fontFamily: "Avenir semibold Italics",
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
});

const Performancefeedbacksummary = (props: any) => {
  //@ts-ignore
   const { fData, appraiserFeedback, reviewerFeedback, setAppraiserFeedback, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appraiserOverallFeedback, setAppraiserOverallFeedback, appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } = useNormalizerContext()
  // const { appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } = useNormalizerContext()

  const { employeeData, navPrompt, setnavPrompt } = props;
  const [action, setAction] = useState<any>([]);
  console.log(action, "action");
  console.log(employeeData, "dddd");
  const [improvementList, setImprovementList] = useState([{ improvement: "" }]);
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

  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData.data.normalizer.normalizer_rejected_value.filter(
        (j: any) => j.value === value
      )[0];
    }
  };
  const [filterData, setFilterData] = useState([]);

  const groupNAmeHandler = (name: any) => {
    if (name) {
      setFilterData(name);
    }
  };

  useEffect(() => {
    const group = _.groupBy(appraiserAreaOfImprovement, "value");
    console.log(Object.entries(group), "ggggggg");

    const groupName = groupNAmeHandler(Object.entries(group));

    console.log(
      Object.entries(group).map((i: any) => {
        console.log(i);
        console.log(i, "000000000");
        console.log(
          i[1].map((j: any) => {
            console.log(j, "jjjjjjjjjj");

            // console.log(j.description, j.comments,j.rating, 'group')
          }),
          "group"
        );
      }),
      "appraiserAreaOfImprovement"
    );
  }, [appraiserAreaOfImprovement]);
  const handleSpecificAdd = (e: any) => {
    const { name, value } = e.target;
    console.log(name, "name value");

    // @ts-ignore
    setarea((prevState: any) => {
      console.log(prevState, "prevState");
      const { specific_actions: test } = prevState[0];
      // console.log(prevState[0], 'prevState[0]')
      // console.log(specific_actions, 'prevState')
      // console.log(prevState[0].specific_actions.push({value: ""}))

      // console.log(prevState.map((item: any) => {
      //     console.log(item, 'item')
      //
      //     item.specific_actions.push({value: ""})
      // }))
      // console.log(  ...prevState[0].specific_actions.map((item: any) => {
      //     // console.log(item, 'item')
      //     return {
      //         ...item,
      //         value: ""
      //     }
      // }),'prevState[0]')
      //
      // const spec = prevState.map((item: any) => {
      //     console.log(item, 'item')
      //     item.specific_actions.push({value: ""})
      // })
      //
      // return [...prevState, ...spec]

      // return [
      //     // ...prevState,
      //      ...prevState[0].specific_actions.map((item: any) => {
      //          console.log(item, 'item')
      //          return {
      //              ...item,
      //              value: "",
      //          }
      //      })
      // ]

      // return  prevState.map((item: any) => {
      //     return {
      //         ...item,
      //         specific_actions:  prevState[0].specific_actions.specific_actions.push({value: ""})
      //     }
      // })

      // return [
      //     {
      //         // specific_actions: [{value: ""}],
      //
      //         // specific_actions: [{value: ""}]
      //     }]
      return prevState.map((item: any) => {
        console.log(item, "item");
        return {
          value: item.value,
          specific_actions: [...item.specific_actions, { value: "" }],
        };
      });
      // return [{
      //     value: "",
      //     specific_actions: [{value: "test"}, {value: "test2"}],
      // }]
    });

    // setSpecificActionList([...specificActionList, {specificAction: ""}])
  };

  const handleSpecificRemove = (index: any) => {
    const newAreaList = [...area];
    newAreaList.splice(index, 1);
    setarea(newAreaList);
  };

  const handleSpecificChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newSpecificActionList = [...specificActionList];
    // @ts-ignore
    newSpecificActionList[index][name] = value;
    setSpecificActionList(newSpecificActionList);
  };

  const handleImprovementAdd = () => {
    console.log("clicked");
    // setImprovementList([...improvementList, {improvement: ""}])
    // setarea([...area, {value: "", specific_actions: []}])
    return setarea((prevState: any) => {
      console.log(...prevState, "area item");

      const toSpread = {
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }],
      };

      const newArea = [...prevState, toSpread];
      console.log(newArea, "newArea");

      return newArea;
    });
  };

  const handleImprovementRemove = (index: any) => {
    const newImprovementList = [...improvementList];
    newImprovementList.splice(index, 1);
    setImprovementList(newImprovementList);
  };

  const handleImprovementChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newImprovementList = [...improvementList];
    // @ts-ignore
    newImprovementList[index][name] = value;
    setImprovementList(newImprovementList);
  };

  useEffect(() => {
    setOverallFeed(pre(overallFeedback));
  }, [overallFeedback]);

  const pre = (arr: any) => {
    return arr.map((i: any) => {
      return {
        name: i.name._id,
        value: i.value,
      };
    });
  };

  useEffect(() => {
    if (fData && empData) {
      setOverallFeedback(() => {
        const filter =
          empData.data.appraisal_template?.feedback_questionnaire?.map(
            (i: any) => {
              return empData.data.normalizer.feedback_questions.filter(
                (j: any) => {
                  console.log(
                    empData.data.normalizer.feedback_questions,
                    "mmm"
                  );
                  if (j.name) {
                    return i.name?.name === j.name.name;
                  }

                  // console.log({
                  //     name: i.name,
                  //     value: j.value
                  // }, 'setOverallFeed')
                  // if (i.name === j.name.name) {
                  //     return {
                  //         name: i.name,
                  //         value: j.value
                  //     }
                  // }
                }
              );
            }
          );

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
          return empData.data.appraisal_template?.feedback_questionnaire?.map(
            (i: any) => {
              return {
                name: i?.name,
                value: "",
              };
            }
          );
        }

        // return  filter.map((k: any) => {
        //     return {
        //         name: k.name.name,
        //         value: k.value
        //     }
        // })
        // .map((i: any) => {
        //     empData.data.appraisal.feedback_questions.map((j: any) => {
        //         if (i === j.name) {
        //             const res =  {
        //                 name: i,
        //                 value: j.value
        //             }
        //             console.log(res, 'res')
        //             return res
        //         }
        //         console.log(empData.data.appraisal.feedback_questions.map((j: any) => {
        //             if (i === j.name.name) {
        //                 const res =  {
        //                     name: i,
        //                     value: j.value
        //                 }
        //                 console.log(res, 'res')
        //                 return res
        //             }}),'works')
        //
        //         // console.log({
        //         //     name: i,
        //         //     value: j
        //         // },'works')
        //         // return {
        //         //     name: i,
        //         //     value: j.value
        //         // }
        //     })
        // })
      });
    }
  }, [fData, empData]);

  useEffect(() => {
    if (area) {
      setAreaImprovement(area);
    }
  }, [area]);

  useEffect(() => {
    if (empData) {
      setAppraiserFeedback(() => {
        return empData.data.appraisal.feedback_questions;
      });
      setAppraiserAreaOfImprovement(() => {
        return empData.data.appraisal.area_of_improvement;
      });
    }
  }, [empData]);

  // useEffect(() => {
  //     if(areaImprovement) {
  //         setImprovementList(areaImprovement)
  //     }
  //
  // },[])

  // useEffect(() => {
  //     if (improvementList && areaImprovement) {
  //         setarea(improvementList)
  //     }
  // },[improvementList, areaImprovement])

  // if (isLoading) {
  //     return <div>Loading...</div>
  // }
  if (feedbackLoading) {
    return <div>Loading...</div>;
  }

  const filterSpecificAction = (name: any) => {
    return specificActionList.filter((i: any) => i.improvement === name);
  };

  return (
    <div>
      {employeeData && (
        //  && checkIfRejected('Feedback_questionnaire')
        <div>
          {/* <Overallfeedbackss>
            <span
              style={{
                fontSize: "31px",
                lineHeight: "22px",
                padding: "0px 2px",
                color: "#333333"
              }}
            >
              "
            </span>
            Please review the recommendation section and add your comments.
            <span style={{
              fontSize: "31px",
              lineHeight: "22px",
              padding: "0px 2px",
              color: "#333333"
            }}>"</span> </Overallfeedbackss> */}
          <Typo1>Performance Feedback Summary</Typo1>
          {/* <Typo2><b>Appraiser Overall Feedback</b> </Typo2>
          <Contain>
            <Box>
              <Tf5>
                <TextField
                  //  fullWidth 
                  placeholder="Add"
                  multiline
                  autoComplete="off"
                  inputProps={{ maxLength: 256 }}
                  disabled
                  size='small'
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  // key={i._id}
                  value={appraiserOverallFeedback || ""}></TextField>

              </Tf5>
            </Box>
          </Contain> */}
          {/* <NFeedbackComments employeeData={employeeData} /> */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {appraiserFeedback &&
                  appraiserFeedback.map((i: any) => {
                    return (
                      <>
                        <Typo2>
                          <b>{i?.name?.name}</b>{" "}
                        </Typo2>
                        <Contain>
                         
                            <Tf1>
                              {/* <p>{i.name.name}</p> */}
                              <TextField
                                // placeholder="Add"
                                multiline
                                autoComplete="off"
                                inputProps={{ maxLength: 500 }}
                                fullWidth
                                // disabled={true}
                                InputProps={{readOnly: true}}
                                // variant="standard"
                                // InputProps={{
                                //   disableUnderline: true,
                                // }}
                                size="small"
                                key={i._id}
                                value={i.value}
                              ></TextField>
                            </Tf1>
                         
                        </Contain>
                      </>
                    );
                  })}
              </Grid>

              {/* <Grid item xs={4}>*/}

              {/*    {reviewerFeedback && reviewerFeedback.map((i: any) => {*/}

              {/*        return (*/}
              {/*            <>*/}
              {/*                <Typo2>Reviewer {i.name.name} </Typo2>*/}
              {/*                <Tf1>*/}
              {/*                    <Box>*/}
              {/*                        /!* <p>{i.name.name}</p> *!/*/}
              {/*                        <TextField fullWidth multiline rows={2}*/}
              {/*                            key={i._id}*/}
              {/*                            value={i.value}></TextField>*/}
              {/*                    </Box>*/}
              {/*                </Tf1>*/}
              {/*            </>*/}
              {/*        )*/}

              {/*    })}*/}

              {/*</Grid>*/}
              {/*<Grid item xs={4}>*/}
              {/*    {overallFeedback && overallFeedback.map((j: any, mapIndex: any) => {*/}

              {/*        return (*/}
              {/*            <>*/}
              {/*                <Typo2>Normalizer {j.name.name} </Typo2>*/}
              {/*                <Tf1>*/}
              {/*                    <Box>*/}
              {/*                        <TextField fullWidth multiline*/}
              {/*                            rows={2}*/}
              {/*                            key={j._id}*/}
              {/*                            value={overallFeedback[mapIndex].value}*/}
              {/*                            onChange={(e) => {*/}
              {/*                                setOverallFeedback(*/}
              {/*                                    overallFeedback.map((i: any, ix: any) =>*/}
              {/*                                        ix === mapIndex*/}
              {/*                                            ? {*/}
              {/*                                                ...i,*/}
              {/*                                                value: e.target.value,*/}
              {/*                                            }*/}
              {/*                                            : i*/}
              {/*                                    )*/}
              {/*                                )*/}
              {/*                            }} />*/}
              {/*                    </Box>*/}
              {/*                </Tf1>*/}
              {/*            </>*/}
              {/*        )*/}
              {/*    })}*/}

              {/*    <Tf2>*/}

              {/*    </Tf2>*/}

              {/*</Grid> */}
            </Grid>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                {overallFeedback &&
                  overallFeedback.map((j: any, mapIndex: any) => {
                    return (
                      <>
                        <Typo2><b>Normalizer {j.name.name}</b> </Typo2>
                        <Contain>
                          <Box>
                            <Tf1>

                              <TextField
                              disabled
                                fullWidth
                                placeholder="Add"
                                multiline
                                inputProps={{ maxLength: 256 }}
                                variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
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


              </Grid> */}
            </Grid>
          </Box>
          {/* <Divide> <Divider /></Divide> */}
        </div>
      )}
<div>
      <Areasofimprovement>
        {" "}
        <b>Areas of Improvement</b>{" "}
      </Areasofimprovement>
      <Tablecontainer sx={{ marginTop: "10px" }}>
        <Root>
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    width: "25%",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    fontFamily: "arial",
                    textAlign: "center",
                    padding:"6px 16px"
                  }}
                >
                  Specific Areas
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    fontFamily: "arial",
                    textAlign: "center",
                    padding:"6px 16px"
                  }}
                >
                  Specific Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filterData &&
                filterData.map((i: any, index: any) => {
                  return (
                    <>
                      <tr>
                        {/* <td width="5%" ><Pad2>{index + 1}</Pad2></td> */}
                        <td width="25%">
                          <Pad>{i[0]}</Pad>
                        </td>
                        <td>
                          {filterData &&
                            filterData.map((i: any, ix: any) => {
                              return i[1].map((j: any, jx: any) => {
                                return j.specific_actions.map(
                                  (k: any, ix1: any) => {
                                    if (index === ix)
                                      return (
                                        <Pad>
                                          {/* {ix1+1}. */}
                                          {k.value}
                                          <br />
                                        </Pad>
                                      );
                                  }
                                );
                              });
                            })}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </Root>
      </Tablecontainer>
      </div>
      {/* {employeeData && checkIfRejected('area_of_improvement') &&
        <div> */}
      {/* <AppraiserArea />
          <NAreaofImprovementComments /> */}
      {/*<ReviewerArea />*/}

      {/* 
          <Divide1> <Divider /></Divide1>
        </div>} */}
    </div>
  );
};

export default Performancefeedbacksummary;
