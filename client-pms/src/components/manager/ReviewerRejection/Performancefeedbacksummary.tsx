import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import Table1 from "./Table1";
import Table2 from "./Table2";
import RTrecommandation from "./RTrecommandation";
import Checkboxs from "./Checkboxs";
import Footerbuttons from "./Footerbuttons";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Blueadd from "../ReviewerRejection/Icons/Blueadd.svg";
import Bluenegative from "../../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueminus from "../../../assets/appraiser/Reviewericons/Blueminus.svg";
import Blueplus from "../ReviewerRejection/Icons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAppraiserRejectsReviewerContext } from "../../../context/AppraiserRejectsReviewer";
import AppraiserArea from "../../normalizer/AppraiserArea";
import { Appraiser } from "../../../pages";
import ReviewerFeedbackComments from "./ReviewerFeedbackComments";
import ReviewerAreaComments from "./ReviewerAreaComments";

const Typo1 = styled("div")({
  marginLeft: "58px",
  paddingTop: "20px",
  // color: "#008E97",
  // fontFamily:"Arial",
  // fontSize: "18px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial"
});
const Typo2 = styled("div")({
  marginLeft: "58px",
  marginTop: "20px",
  // color: "#008E97",
  // fontFamily:"Arial",
  // fontSize: "13px",
  // opacity: 0.85,
  color: "#717171",
  fontFamily: "arial",
  fontSize: "16px",
});
const Tf1 = styled("div")({
  marginLeft: "58px",
  marginRight: "58px",
  marginTop: "5px",
  // backgroundColor: "rgb(255 255 255/70%)",

  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontFamily:"Arial",
  //   fontSize: "14px",
  //   textTransform: "none",
  //   height:"40px !important"

  // },'
  // width: "90%",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    fontFamily: "arial",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left"
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
    textTransform: "none",
  },
});
const Areasofimprovement = styled("div")({
  // marginLeft: "58px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial"
  //opacity: 0.7
});
const Typo4 = styled("div")({
  marginLeft: "58px",
  //  position: "absolute",
  //  marginTop: '305px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});
const Tf3 = styled("div")({
  // position: "absolute",
  // width: "96%",

  // marginLeft: "58px",
  // marginTop: "320px",
  // backgroundColor: "rgb(255 255 255/70%)",

  // "& .MuiInputBase-input": {
  //   fontSize: "14px",
  //   fontFamily: "Arial",
  //   color: "#333333",
  //   textTransform: "none",
  //   height: "115px !important",
  //   padding: "10px"
  // },
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",

  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "justify"
    // height: "110px !important",
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
  // width: "96%",
  //  marginLeft: "580px",
  //  marginTop: "300px",
  // marginTop: "8px",
  // backgroundColor: "rgb(255 255 255/70%)",
  //opacity: 0.7,
  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontSize: "14px",
  //   fontFamily: "Arial",
  //   textTransform: "none",
  //   height: "115px !important",
  //   padding: "10px"
  // },

  borderRadius: "5px",
  backgroundColor: "#f8f8f8",

  //opacity: 0.7,
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    // minHeight: "110px !important",
    padding: "8px",
    textAlign: "justify"
  },

  "& .MuiTextField-root": {
    width: "100%",
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
  marginRight: "58px",
});
const Overallfeedback = styled("div")({
  marginLeft: "25px",
  marginTop: "20px",
  color: "rgb(51 51 51/70%)",
  fontSize: "13px",
});
const Contain = styled("div")({
  // marginRight: "58px",

  marginTop: "10px",

});
const Overallfeedbackss = styled("div")({
  marginLeft: "58px",
  // marginTop: "10px",
  color: '#3e8cb5',
  //color: "#333333",
  fontSize: "20px",
  fontFamily: 'Avenir semibold Italics',
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic"
});
const Performancefeedbacksummary = (props: any) => {
  //@ts-ignore
  const { fData, appraiserFeedback, setAppraiserFeedback, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appraiserOverallFeedback, setAppraiserOverallFeedback } = useAppraiserRejectsReviewerContext();
  const { employeeData, navPrompt, setnavPrompt, moveTab, setMoveTab } = props;
  console.log("useReviewerContext");
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
  const [overallAppraiserFeedback, setoverallAppraiserFeedback] = useState<any>('');
  console.log(appraiserOverallFeedback, "appraiserOverallFeedback");

  useEffect(() => {
    setoverallAppraiserFeedback(appraiserOverallFeedback)
  }, [])

  const onHandleAppraiserfeedback = (event: any) => {
    setoverallAppraiserFeedback(event.target.value)
    //add & check--> setAppraiserOverallFeedback(event.target.value)
    setAppraiserOverallFeedback(event.target.value)
  };
  const checkIfRejected = (value: string) => {
    if (employeeData !== undefined) {
      return employeeData?.data?.reviewer?.reviewer_rejected_value?.filter(
        (j: any) => j?.value === value
      )[0]?.isChecked;
    }
  };
  console.log(employeeData, "empdata");

  const handleSpecificAdd = (e: any) => {
    setnavPrompt(true)
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
    setnavPrompt(true)
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
    setnavPrompt(true)
    console.log("clicked");
    // setImprovementList([...improvementList, {improvement: ""}])
    // setarea([...area, {value: "", specific_actions: []}])
    return setarea((prevState: any) => {
      console.log(...prevState, "area item");

      const toSpread = {
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }],
        // removed { value: "" }
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
        value: i.value,
      };
    });
  };

  useEffect(() => {
    if (fData && empData) {
      setOverallFeedback(() => {
        const filter = empData.data.appraisal_template?.feedback_questionnaire.map((i: any) => {
          return empData.data.appraisal.feedback_questions.filter((j: any) => {
            if (j.name) {
              return i?.name?.name === j?.name?.name;
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
                    name: a?.name?.name,
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
          return empData.data.appraisal_template?.feedback_questionnaire.map((i: any) => {
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

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                {/*<Grid item xs={6}>*/}
                {/*  {appraiserFeedback &&*/}
                {/*    appraiserFeedback.map((i: any) => {*/}
                {/*      return (*/}
                {/*        <>*/}
                {/*          <Typo2> Reviewer {i.name.name} </Typo2>*/}
                {/*          <Tf1>*/}
                {/*            <Box>*/}
                {/*              <TextField*/}
                {/*                fullWidth*/}
                {/*                multiline*/}
                {/*                rows={2}*/}
                {/*                key={i._id}*/}
                {/*                value={i.value}*/}
                {/*              ></TextField>*/}
                {/*            </Box>*/}
                {/*          </Tf1>*/}
                {/*        </>*/}
                {/*      );*/}
                {/*    })}*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                  {/* <Typo2><b> Appraiser Overall Feedback </b></Typo2>
                  <Contain>
                    <Box>
                      <Tf1>

                        <TextField
                          fullWidth
                          multiline
                          // disabled
                          size='small'
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          placeholder='Add'
                          value={overallAppraiserFeedback || ""}
                          onChange={(e) => { onHandleAppraiserfeedback(e) }}
                        />

                      </Tf1>
                    </Box>
                  </Contain> */}
                  {/* <ReviewerFeedbackComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
                  {overallFeedback &&
                    overallFeedback.map((j: any, mapIndex: any) => {
                      return (
                        <>
                          <Typo2> <b>{j?.name?.name}</b> <span  style={{fontSize:"22px",}}>*</span>
     </Typo2>
                          <Contain>
                            <Box>
                              <Tf1>

                                <TextField
                                  fullWidth
                                  multiline
                                  inputProps={{ maxLength: 500 }}
                                  // variant="standard"
                                  // InputProps={{
                                  //   disableUnderline: true,
                                  // }}
                                  placeholder='Add'
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
                                    setnavPrompt(true);
                                    setMoveTab(true);
                                  }}
                                />

                              </Tf1>
                            </Box>
                          </Contain>
                        </>
                      );
                    })}

                  <Tf2></Tf2>
                </Grid>
              </Grid>

              {/* <ReviewerFeedbackComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
            </Box>

            {/* <Divide>
              {" "}
              <Divider />
            </Divide> */}
          </div>
        )}
      {employeeData && (
        <div>
          {/*<Table1 />*/}


          <Box sx={{ flexGrow: 1, marginLeft: "58px", marginRight: "6px" }}>
            <Areasofimprovement> <b>Areas of Improvement</b>  <span style={{fontSize:"22px",}}>*</span> 
            </Areasofimprovement>
            <TableContainer>
              <Table style={{ marginTop: "10px", }} size="small">
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
                    {/* <TableCell>

              </TableCell> */}
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
                        </Tf3>
                      </TableCell>

                      <TableCell
                      // style={{
                      //   width: "100%",
                      //   paddingBottom: "10px",
                      //   paddingTop: "0px",
                      // }}
                      >

                        {area.map((i: any, mapIndex: number) => {
                          return (
                            <>
                              {(index === mapIndex) && area && i.specific_actions.map((j: any, index1: any) => {
                                return (
                                  <>
                                    <Tf4>
                                      <Box>
                                        <TextField
                                          // fullWidth
                                          multiline
                                          autoComplete="off"
                                          // rows={1}
                                          size="small"
                                          placeholder="Add"
                                          name="specificAction"
                                          // key={index}
                                          inputProps={{ maxLength: 500 }}
                                          value={area[index].specific_actions[index1].value}
                                          variant="standard"
                                          InputProps={{
                                            disableUnderline: true, // <== added this
                                          }}
                                          onChange={(e) => {
                                            setarea(
                                              area.map((previousState: any, ix: any) => {
                                                console.log(area, 'bbbbbbbb')
                                                if (ix === index) {
                                                  console.log(ix, 'bbbbbbbb')
                                                  return {
                                                    ...previousState,
                                                    specific_actions: previousState.specific_actions.map((previousState1: any, ix1: any) => {
                                                      console.log(ix1, 'bbbbbbbb')
                                                      if (ix1 === index1) {
                                                        console.log(ix1, 'bbbbbbbb')
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
                                                  // value: e.target.value
                                                }
                                              }


                                                //     ix === index
                                                //         ? {
                                                //             ...i,
                                                //             values: e.target.value,
                                                //         }
                                                //         : i
                                              )
                                            )
                                            setnavPrompt(true);
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
                      <TableCell style={{ borderColor: "#ffffff" }}>

                        {/* {specificActionList.length < 6 &&
                    (
                      <Stack
                        direction="row"
                        alignItems="center"
                        // width="100px"
                        // marginLeft="25px"
                        // marginTop="18px"
                        spacing={1}
                      >
                       // <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" />
                        <Addmore
                          style={{
                            cursor: "pointer",
                            color: "#3E8CB5",
                            fontSize: "14px",
                          }}
                        >
                          <img src={Blueadd}
                            onClick={handleSpecificAdd}
                            alt="icon" />
                        </Addmore>

                      </Stack>

                    )} */}
                        {area.length !== 1 &&
                          <Stack
                            direction="row"
                            alignItems="center"
                            // width="100px"
                            // marginLeft="25px"
                            // // marginTop="18px"
                            spacing={1}
                          >
                            <Tooltip title="Delete">
                              <Addmore
                                style={{
                                  cursor: "pointer",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                }}

                              >
                                {" "}
                                <img src={Blueminus}
                                  onClick={() => handleSpecificRemove(index)}
                                  alt="icon" />
                              </Addmore>
                            </Tooltip>
                          </Stack>
                        }
                        {area.length - 1 === index &&
                          <Stack
                            direction="row"
                            alignItems="center"
                            // width="100px"
                            // marginLeft="25px"
                            // marginTop="18px"
                            spacing={1}
                          >
                            {/* <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" /> */}
                            <Tooltip title="Add">
                              <Addmore
                                style={{
                                  cursor: "pointer",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                }}
                              >
                                <img src={Blueadd}
                                  onClick={() => {
                                    handleImprovementAdd();
                                    setMoveTab(true);
                                  }}
                                  alt="icon" />
                              </Addmore>
                            </Tooltip>
                          </Stack>
                        }
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* <Stack
            direction="row"
            alignItems="center"
            width="100px"
            marginLeft="25px"
            marginTop="18px"
            spacing={1}
          >
            <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" />
            <Addmore>Add</Addmore>
          </Stack> */}
          {/* <ReviewerAreaComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
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
