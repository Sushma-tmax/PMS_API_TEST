import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { TextField, Box, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { IconButton } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Blueadd from "../../../assets/appraiser/Reviewericons/Blueadd.svg";
import Blueminus from "../../../assets/appraiser/Reviewericons/Blueminus.svg";
import Bluenegative from "../../../assets/appraiser/Reviewericons/Bluenegative.svg";
import Blueplus from "../../../assets/appraiser/Reviewericons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import { Feedback } from "@mui/icons-material";
import _, { cloneDeep } from "lodash";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const PerformanceFeedbackSummary = styled("div")({
  // marginLeft: "25px",
  paddingTop: "10px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
});
const Overallfeedback = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Overallfeedbackss = styled("div")({
  // marginLeft: "25px",
  // marginTop: "10px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: 'Avenir semibold Italics',
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic"
});
const Divide = styled("div")({
  marginTop: "18px",
  // marginLeft: "25px",
  // marginRight: "20px",
});
const Tf1 = styled("div")({
  width: "100%",
  marginLeft: "25px",
  marginTop: "5px",
  backgroundColor: "#FFFFFF",
  opacity: 0.7,
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
  "& label.Mui-focused": {
    color: "green",
  },
  // '&.MuiOutlinedInput-notchedOutline': {

  //     border: ` 1px solid red`,
  //     '&:focus': {

  //         border: ` 1px solid red`,
  //     },
  // },
  // '&.MuiOutlinedInput-root': {

  //     border: "1px solid red",
  //     '& fieldset': {
  //         border: "1px solid red",
  //       },

  // }
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
    fontFamily: "Arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign:"left"
  },
  // "& label.Mui-focused": {
  //   //color: 'green',
  // },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "green",
  // },
  // "& .MuiOutlinedInput-root": {
  //   "& fieldset": {
  //     borderColor: "#EBEBEB",
  //   },
  //   "&:hover fieldset": {
  //     borderColor: "#E7EEEE",
  //   },
  //   "&.Mui-focused fieldset": {
  //     borderColor: "#EBEBEB",
  //   },
  // },
});

const TextField2 = styled(TextField)({
  width: "96%",
  marginLeft: "25px",
  marginTop: "5px",
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  opacity: "70%",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    //opacity: 0.5
  },
  "& .MuiInputLabel-root": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    //opacity: 0.5
  },
  "& label.Mui-focused": {
    //color: 'green',
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EBEBEB",
      // backgroundColor: '#FFFFFF',
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
      // opacity: 0.5
    },
    "&:hover fieldset": {
      borderColor: "#E7EEEE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBEBEB",
    },
  },
});
const TextField3 = styled(TextField)({
  width: "100%",
  marginTop: "5px",
  borderColor: "#EBEBEB",
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",

  // backgroundColor: '#FFFFFF',
  opacity: "70%",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    minHeight: "130px",
    // opacity: 0.5
  },
  "& .MuiInputLabel-root": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    //opacity: 0.5
  },
  "& label.Mui-focused": {
    //color: 'green',
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EBEBEB",
      // backgroundColor: '#FFFFFF',
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",

      // opacity: 0.5
    },
    "&:hover fieldset": {
      borderColor: "#E7EEEE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBEBEB",
    },
  },
});
const Areasofimprovement = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  //opacity: 0.7
});
const SpecificAreas = styled("div")({
  marginLeft: "25px",
  marginTop: "10px",
  color: "rgb(51 51 51/70%)",
  fontSize: "13px",
  //opacity: 0.7
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
    textAlign:"left"
  },
});
const SpecificActions = styled("div")({
  marginTop: "10px",
  color: "rgb(51 51 51/70%)",
  fontSize: "13px",
  position: "absolute",
  left: "50.5%",
});
const Tf4 = styled("div")({
  // position: "absolute",
  // width: "95%",
  //  marginLeft: "580px",
  //  marginTop: "300px",
  // marginTop: "10px",
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
    textAlign:"left"
  },

  "& .MuiTextField-root": {
    width: "100%",
  },
});

const Addmore = styled("div")({
  color: "#008E97",
  fontSize: "12px",
  marginLeft: "7px",
});
const Divide1 = styled("div")({
  // marginLeft: "25px",
  marginRight: "15px",
  marginTop: "15px",
});

const Performancefeedbacksummary = (props: any) => {
  //   @ts-ignore
  const { fData, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appOverallFeed, setAppOverallFeed, emptyAppOverall, setEmptyAppOverall, moveTab, setMoveTab } = useAppraisalContext();
  const { navPrompt, setnavPrompt } = props;
  const [action, setAction] = useState<any>([]);
  const [appraiserOverallFeedBack, setAppraiserOverallFeedback] =
    useState<any>(false);
  console.log(action, "action");
  const [improvementList, setImprovementList] = useState([]);
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


  console.log(improvementList, "improvementList");
  console.log(overallFeed, "overallFeed");
  // const [area, setarea] = useState<any>([{
  //     "value": "",
  //     "specific_actions": [
  //         {
  //             "value": "test"
  //         },
  //         {
  //             "value": ""
  //         }
  //     ]
  // }])
  // const [area, setarea] = useState<any>([{
  //     id: Date.now(),
  //     value: "",
  //     specific_actions: [{ value: "" }, { value: "" }, { value: "" }],
  // }])
  //

  console.log(area, "area state");

  const handleSpecificAdd = (e: any) => {
    // setnavPrompt(true);
    const { name, value } = e.target;
    console.log(name, "name value");

    // @ts-ignore
    setarea((prevState: any) => {
      // console.log(prevState, 'prevState')
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
    // setnavPrompt(true);
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
    // setnavPrompt(true);
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

      newArea.push(
        {
          id: Date.now(),
          value: "",
          specific_actions: [
            { value: "test2" },
            { value: "test2" },
            { value: "test2" },
          ],
        },
        {
          id: Date.now(),
          value: "",
          specific_actions: [
            { value: "test2" },
            { value: "test2" },
            { value: "test2" },
          ],
        }
      );
      // return prevState.map((k: any) => {
      //     console.log(k, 'area item')
      //     const l = _.cloneDeep(k)
      //     const newOne = {
      //         id: 1,
      //         value: "",
      //         specific_actions: [{value: "11"}, {value: ""}, {value: ""}]
      //     }
      //     console.log(k,
      //         {value: "",
      //         specific_actions: [{value: "11"}, {value: ""}, {value: ""}]}, 'created')
      //     return {
      //         ...k,
      //
      //     }
      // })
      // return    prevState.push({
      //        id: Date.now(),
      //        value: "",
      //        specific_actions: [{value: ""},{value: ""},{value: ""}],
      //    })

      // return [...prevState, {value: "", specific_actions: [{value: ""},{value: ""},{value: ""}], id:Date.now()}]
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

  // useEffect(()=>{
  //     setPerformanceSpecific(specificActionList);
  //     setPerformanceImprovement(improvementList)
  // },[specificActionList,improvementList])

  // useEffect(() => {
  //     if (fData) {
  //         setOverallFeedback(fData.data)
  //     }
  // }, [fData])

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
              return i?.name?.name === j.name.name;
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
        if (filter?.flat().length > 0) {
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
    if (area.length == 0) {
      handleImprovementAdd()
    }
  }, [area]);

  useEffect(() => {
    if (empData) {
      setAppOverallFeed(empData?.data?.appraisal?.appraiser_overall_feedback);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (feedbackLoading) {
    return <div>Loading...</div>;
  }

  console.log(empData, "EEEEEEEEEE");

  const filterSpecificAction = (name: any) => {
    return specificActionList.filter((i: any) => i.improvement === name);
  };

  if (overallFeed.length === 0) {
    return <div>Loading...</div>;
  }

  return (
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

      {/* <sup  
 style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#3e8cb5"
    }}>"</sup><span>Please review the recommendation section and add your comments.</span><sup  style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#3e8cb5"
    }}>"</sup> */}
    <div style={{marginRight:"58px"}}>
      <PerformanceFeedbackSummary>
        Performance Feedback Summary
      </PerformanceFeedbackSummary>

      {/* <Overallfeedback> <b>Appraiser Overall Feedback </b></Overallfeedback>
      <TextField1
        multiline
        placeholder="Add"
        // name={j.name}
        autoComplete="off"
        value={appOverallFeed}
        error={emptyAppOverall === true}
        inputProps={{ maxLength: 256 }}
        variant="standard"
        InputProps={{
          disableUnderline: true,
        }}
        onChange={(e) => {
          setAppOverallFeed(e.target.value);
          setnavPrompt(true);
          setMoveTab(true);
        }}
      // error = {appOverallFeed === ""}
      /> */}
      {overallFeed &&
        overallFeedback &&
        overallFeedback.map((j: any, mapIndex: any) => {
          return (
            <>
              <Overallfeedback> <b>{j?.name?.name}</b> <span style={{
      fontSize:"22px",}}>*</span></Overallfeedback>
              <TextField1
                size="small"
                placeholder="Add"
                multiline
                inputProps={{ maxLength: 500 }}
                // name={j.name}
                autoComplete="off"
                key={j._id}
                value={
                  overallFeed && overallFeedback && overallFeed[mapIndex].value
                }
                // variant="standard"
                // InputProps={{
                //   disableUnderline: true,
                // }}
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
                  // setnavPrompt(true);
                  setMoveTab(true);
                }}
              />
            </>
          );
        })}

</div>
      {/* 
      <Divide>
        <Divider />
      </Divide> */}
      <Box sx={{ flexGrow: 1 }}>
        <Areasofimprovement> <b>Areas of Improvement</b>  <span style={{fontSize:"22px",}}>*</span>
    </Areasofimprovement>
        <Table style={{ marginTop: "10px" }} size="small">
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
                        // setnavPrompt(true);
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
                                      // setnavPrompt(true);
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
                      spacing={0}
                    >
                      <Tooltip title="Delete" >
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
                            onClick={handleImprovementAdd}
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

      </Box>



    </div>
  );
};

export default Performancefeedbacksummary;
