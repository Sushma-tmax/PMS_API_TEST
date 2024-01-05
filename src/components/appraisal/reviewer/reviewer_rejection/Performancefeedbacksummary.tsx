import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Checkbox, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Footerbuttons from "./Footerbuttons";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Blueadd from "../../../../assets/Images/Blueadd.svg";
import Bluenegative from "../../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueplus from "../../../../assets/Images/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { Appraiser } from "../../../../pages";
import ReviewerAreaComments from "./ReviewerAreaComments";

const Typo1 = styled("div")({
  marginLeft: "35px",
  // paddingTop: "20px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial"
  // color: "#008E97",
  // fontFamily:"Arial",
  // fontSize: "18px"
});
const Typo2 = styled("div")({
  marginLeft: "35px",
  marginTop: "20px",
  color: "#717171",
  fontFamily:"arial",
  fontSize: "16px",
  //opacity: 0.85,
});
const Tf1 = styled("div")({
  marginLeft: "35px",
  marginTop: "5px",
  // backgroundColor: "rgb(255 255 255/70%)",

  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontSize: "13px",
  //   fontWeight: "400",
  //   textTransform: "none",
  //   opacity: 0.4,
  // },
  backgroundColor: "#ffffff",
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
const Typo3 = styled("div")({
  marginTop: "20px",
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
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
  },
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
  // position: "absolute",
  width: "96%",

  marginLeft: "25px",
  // marginTop: "320px",
  backgroundColor: "rgb(255 255 255/70%)",

  "& .MuiInputBase-input": {
    color: "rgb(51 51 51/50%)",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
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
  // position: "absolute",
  width: "90%",
  //  marginLeft: "580px",
  //  marginTop: "300px",
  marginTop: "8px",
  backgroundColor: "rgb(255 255 255/70%)",
  //opacity: 0.7,
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    opacity: 0.5,
  },
});
const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "58px",
  marginRight: "58px",
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
  marginLeft: "58px",
  marginRight: "58px ",
});
const Overallfeedback = styled("div")({
  marginLeft: "25px",
  marginTop: "20px",
  color: "rgb(51 51 51/70%)",
  fontSize: "13px",
});

const Contain = styled("div")({
  marginRight: "35px",
  
  marginTop: "10px",

});
const Overallfeedbackss = styled("div")({
   marginLeft: "58px",
  // marginTop: "10px",
  color:'#3e8cb5',
  //color: "#333333",
  fontSize: "20px",
  fontFamily:'Avenir semibold Italics',
  display:"flex",
  justifyContent:"center",
  fontStyle:"italic"
});

const Performancefeedbacksummary = (props: any) => {
  //@ts-ignore
  const {fData,appraiserFeedback,setAppraiserFeedback,overallFeed,setOverallFeed,isLoading,empData,feedbackLoading,areaImprovement,setAreaImprovement,area,setarea,appraiserOverallFeedback,setAppraiserOverallFeedback
  } = useReviewerContext();
  const { employeeData,setnavPrompt,navPrompt } = props;
  console.log(fData, "ffffffff");
  console.log(empData, "ffffff");
  console.log(employeeData, "edata");
  const [action, setAction] = useState<any>([]);
  console.log(action, "action");

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
      return employeeData?.data?.reviewer?.reviewer_rejected_value?.filter(
        (j: any) => j.value === value
      )[0]?.isChecked;
    }
  };
  console.log(employeeData, "empdata");

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
        specific_actions: [{ value: "" }, { value: "" }, { value: "" }],
      };

      const newArea = [...prevState, toSpread];
      console.log(newArea, "newArea");

      return newArea;
    });
  };

  console.log(area, "aaaaaaaaaaaa");
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
        name: i?.name?._id,
        value: i?.value,
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
      {employeeData && 
      // checkIfRejected("Feedback_questionnaire") && 
      (
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
                        {/* <ReviewerFeedbackComments employeeData = {employeeData} setnavPrompt={setnavPrompt} /> */}
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
                                  multiline
                                  InputProps={{readOnly: true}}
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
                                    setnavPrompt(true)
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
           
            {/* <ReviewerFeedbackComments employeeData = {employeeData}/> */}
          </Box>
          {/* <Divide>
            {" "}
            <Divider />
          </Divide> */}
        </div>
      )}
      {employeeData && checkIfRejected("area_of_improvement") && (
        <div>
          <Table1 />
          <ReviewerAreaComments/>
          <Box sx={{ flexGrow: 1 }}>
            {/*{area &&*/}
            {/*  area.map((singleImprovementList: any, index: any) => (*/}
            {/*    <Grid container spacing={2}>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <Typo4>*/}
            {/*          <p> Reviewer Area(s) of improvement (if any)</p>*/}
            {/*        </Typo4>*/}

            {/*        <Tf3>*/}
            {/*          {" "}*/}
            {/*          <TextField*/}
            {/*            fullWidth*/}
            {/*            multiline*/}
            {/*            rows={5}*/}
            {/*            placeholder="Add area(s) of Improvement"*/}
            {/*            name="improvement"*/}
            {/*            key={index}*/}
            {/*            value={area[index].value}*/}
            {/*            onChange={(e) => {*/}
            {/*              setarea(*/}
            {/*                area.map((previousState: any, ix: any) => {*/}
            {/*                  console.log(area, "areaaaaaa");*/}
            {/*                  if (ix === index) {*/}
            {/*                    return {*/}
            {/*                      ...previousState,*/}
            {/*                      value: e.target.value,*/}
            {/*                    };*/}
            {/*                  }*/}
            {/*                  return previousState;*/}
            {/*                })*/}
            {/*              );*/}
            {/*            }}*/}
            {/*          />*/}
            {/*        </Tf3>*/}
            {/*        {improvementList.length !== index + 1 && (*/}
            {/*          // (<IconButton onClick={() => handleImprovementRemove(index)}><RemoveIcon />Remove</IconButton>)*/}
            {/*          <Stack*/}
            {/*            direction="row"*/}
            {/*            alignItems="center"*/}
            {/*            width="100px"*/}
            {/*            marginLeft="25px"*/}
            {/*            marginTop="18px"*/}
            {/*            spacing={0}*/}
            {/*          >*/}
            {/*            <IconButton onClick={() => handleSpecificRemove(index)}>*/}
            {/*              <img src={Bluenegative} alt="icon" />*/}
            {/*            </IconButton>*/}
            {/*            <Addmore> Remove</Addmore>*/}
            {/*          </Stack>*/}
            {/*        )}*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6}>*/}
            {/*        <Typo5>*/}
            {/*          <p>Specific Actions(s)</p>*/}
            {/*        </Typo5>*/}
            {/*        {area.map((i: any, mapIndex: number) => {*/}
            {/*          console.log(i, "consolesssss");*/}
            {/*          return (*/}
            {/*            <>*/}
            {/*              {index === mapIndex &&*/}
            {/*                area &&*/}
            {/*                i.specific_actions.map((j: any, index1: any) => {*/}
            {/*                  console.log(j, "console");*/}
            {/*                  return (*/}
            {/*                    <Stack*/}
            {/*                      direction="row"*/}
            {/*                      alignItems="center"*/}
            {/*                      spacing={1}*/}
            {/*                    >*/}
            {/*                      <Tf4>*/}
            {/*                        <Box>*/}
            {/*                          <TextField*/}
            {/*                            fullWidth*/}
            {/*                            multiline*/}
            {/*                            rows={1}*/}
            {/*                            size="small"*/}
            {/*                            placeholder="Add specific action(s)"*/}
            {/*                            name="specificAction"*/}
            {/*                            // key={index}*/}
            {/*                            value={*/}
            {/*                              area[index].specific_actions[index1]*/}
            {/*                                .value*/}
            {/*                            }*/}
            {/*                            onChange={(e) => {*/}
            {/*                              setarea(*/}
            {/*                                area.map(*/}
            {/*                                  (previousState: any, ix: any) => {*/}
            {/*                                    console.log(area, "bbbbbbbb");*/}
            {/*                                    if (ix === index) {*/}
            {/*                                      console.log(ix, "bbbbbbbb");*/}
            {/*                                      return {*/}
            {/*                                        ...previousState,*/}
            {/*                                        specific_actions:*/}
            {/*                                          previousState.specific_actions.map(*/}
            {/*                                            (*/}
            {/*                                              previousState1: any,*/}
            {/*                                              ix1: any*/}
            {/*                                            ) => {*/}
            {/*                                              console.log(*/}
            {/*                                                ix1,*/}
            {/*                                                "bbbbbbbb"*/}
            {/*                                              );*/}
            {/*                                              if (ix1 === index1) {*/}
            {/*                                                console.log(*/}
            {/*                                                  ix1,*/}
            {/*                                                  "bbbbbbbb"*/}
            {/*                                                );*/}
            {/*                                                return {*/}
            {/*                                                  ...previousState1,*/}
            {/*                                                  value:*/}
            {/*                                                    e.target.value,*/}
            {/*                                                };*/}
            {/*                                              }*/}
            {/*                                              return previousState1;*/}
            {/*                                            }*/}
            {/*                                          ),*/}
            {/*                                      };*/}
            {/*                                    }*/}
            {/*                                    return {*/}
            {/*                                      ...previousState,*/}
            {/*                                      // value: e.target.value*/}
            {/*                                    };*/}
            {/*                                  }*/}

            {/*                                  //     ix === index*/}
            {/*                                  //         ? {*/}
            {/*                                  //             ...i,*/}
            {/*                                  //             values: e.target.value,*/}
            {/*                                  //         }*/}
            {/*                                  //         : i*/}
            {/*                                )*/}
            {/*                              );*/}
            {/*                            }}*/}
            {/*                          />*/}
            {/*                        </Box>*/}
            {/*                      </Tf4>*/}

            {/*                      {specificActionList.length - 1 === index &&*/}
            {/*                        specificActionList.length < 6 && (*/}
            {/*                          <IconButton onClick={handleSpecificAdd}>*/}
            {/*                            <img src={Blueadd} alt="icon" />*/}
            {/*                          </IconButton>*/}
            {/*                        )}*/}
            {/*                      /!* {specificActionList.length !== index + 1 &&*/}
            {/*                                            (*/}
            {/*                                                <IconButton onClick={() => handleSpecificRemove(index)}><img*/}
            {/*                                                    src={Bluenegative} alt='icon' /></IconButton>*/}
            {/*                                            )*/}
            {/*                                        } *!/*/}
            {/*                    </Stack>*/}
            {/*                  );*/}
            {/*                })}*/}
            {/*            </>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*      </Grid>*/}
            {/*    </Grid>*/}
            {/*  ))}*/}
          </Box>

          {/*<Stack*/}
          {/*  direction="row"*/}
          {/*  alignItems="center"*/}
          {/*  width="100px"*/}
          {/*  marginLeft="25px"*/}
          {/*  marginTop="18px"*/}
          {/*  spacing={1}*/}
          {/*>*/}
          {/*  <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" />*/}
          {/*  <Addmore>Add More</Addmore>*/}
          {/*</Stack>*/}
          {/* <Divide1>
            {" "}
            <Divider />
          </Divide1> */}
        </div>
      )}
    </div>
  );
};

export default Performancefeedbacksummary;
