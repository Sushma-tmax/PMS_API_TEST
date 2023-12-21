import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { TextField, Tooltip } from "@mui/material";
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
import Blueplus from "../ReviewerRejection/Icons/Blueplus.svg";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
import AppraiserArea from "../../normalizer/AppraiserArea";
import { Appraiser } from "../../../pages";
import NAreaofImprovementComments from "./NormalizerAreaComments";
import NFeedbackComments from "./NormalizerFeedbackComments";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
 import Blueminus from "../../../assets/appraiser/Reviewericons/Blueminus.svg";
import { Navcancelbuttons } from "../../normalizer/Navcancelbuttons";

const Typo1 = styled("div")({
  marginLeft: "60px",
  paddingTop: "20px",
  // marginTop : "10px",
  // color: "#008E97",
  // fontSize: "18px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
});
const Typo2 = styled("div")({
  marginLeft: "60px",
  // marginTop: "20px",
  // color: "#008E97",
  // fontSize: "13px",
  // opacity: 0.85,
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Tf1 = styled("div")({
  marginLeft: "60px",
  marginRight:"60px",
  marginTop: "5px",
  backgroundColor: "#f8f8f8",
  // backgroundColor: "rgb(255 255 255/70%)",
  borderRadius: "5px",
  // width :"90.5%",

  "& . MuiTextField-root": {
        width:"100%"
      },
      "& .MuiTextField-root": {
        color: "#333333",
        fontSize: "10px",
        fontWeight: "400",
        textTransform: "none",
    fontFamily: "arial",
        // opacity: 0.4,
        
        width:"100%"
      },
      "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "14px",
    // padding: "4px",
        textTransform: "none",
    fontFamily: "arial",
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
    fontFamily: "arial",
  },
});
const Tf6 = styled("div")({
  marginLeft: "60px",
  //  position: "absolute",
  //  marginTop: '305px',
  // color: "#008E97",
  // fontSize: "13px",
  // fontFamily: "arial",
  // opacity: 0.85,
});
const Typo4 = styled("div")({
  marginLeft: "75px",
  //  position: "absolute",
  //  marginTop: '305px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
  fontFamily: "arial",
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
    textAlign:"left"
    // padding: "8px",
    // height: "110px !important",
  },
});
const Typo5 = styled("div")({
  // marginLeft: "580px",
  // position: "absolute",
  // marginTop: '285px',
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
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
    textAlign:"left"
  },
});
const Areasofimprovement = styled("div")({
  marginLeft: "60px",
  // marginTop: "10px",
  color: "#717171",
  fontSize: "16px",
  paddingTop:"20px",
  fontFamily: "arial",
  //opacity: 0.7
});
const Contain = styled("div")({
  // marginRight: "20px",

  marginTop: "10px",

});
const Tf8 = styled("div")({
  // position: "absolute",
  // marginTop: '628px',
  marginLeft: '75px',
  color: "#008E97",
  fontSize: "12px",
});
const Divide = styled("div")({
  //position: "absolute",
  marginTop: "20px",
  marginLeft: "75px",
  marginRight: "20px",
});
const Addmore = styled("div")({
  // position: "absolute",
  // marginTop: '628px',
  // marginLeft: '58px',
  marginLeft: "7px",
  color: "#008E97",
  fontSize: "12px",
});
const Divide1 = styled("div")({
  //position: "absolute",
  marginTop: "15px",
  marginLeft: "75px",
  marginRight: "20px",
});
const Overallfeedback = styled("div")({
  marginLeft: "75px",
  marginTop: "20px",
  color: "rgb(51 51 51/70%)",
  fontSize: "13px",
});
const Overallfeedbackss = styled("div")({
  marginLeft: "75px",
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
  const { fData, appraiserFeedback, setAppraiserFeedback, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appraiserOverallFeedback,setAppraiserOverallFeedback } = useAppraiserRejectsNormalizerContext();
  const { employeeData, navPrompt, setnavPrompt,moveTab,setMoveTab  } = props;
  console.log("usenormContext");
  console.log(appraiserFeedback,"appraiserFeedback")
  console.log(empData, "ffffff");
  console.log(employeeData, "data");
  console.log(fData, "edata");
  const [action, setAction] = useState<any>([]);
  console.log(action, "action");
  console.log(moveTab,"moveTab")
  console.log(navPrompt,"jjjjjj")
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
      return employeeData?.data?.normalizer?.normalizer_rejected_value?.filter(
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
  const [otherComments, setOtherComments] = useState("");
  console.log(appraiserOverallFeedback,"feedback")
  useEffect(()=>{
    setOtherComments(appraiserOverallFeedback)
  },[])

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
        const filter = empData.data.appraisal_template?.feedback_questionnaire?.map((i: any) => {
          return empData.data.appraisal.feedback_questions.filter((j: any) => {
            if (j.name) {
              return i.name?.name === j.name.name;
            }

            // console.log({
            //     name: i.name,
            //     value: j.value
            // }, 'setOverallFeed')x
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
  }, []);
  // useEffect(()=>{
  //   setAppraiserOverallFeedback(otherComments)
  
  // },[otherComments])

  useEffect(() => {
    if (area) {
      setAreaImprovement(area);
    }
  }, [area]);

 
  if (feedbackLoading) {
    return <div>Loading...</div>;
  }

  const filterSpecificAction = (name: any) => {
    return specificActionList.filter((i: any) => i.improvement === name);
  };

  const handleappraiserReCommentsChange = (e: any) => {
    setnavPrompt(true)
    console.log(e);
    setOtherComments(e.target.value)
    setAppraiserOverallFeedback(e.target.value)
}

// }, [otherComments])

  return (
    <div>
       {employeeData &&
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
        {/* <Navcancelbuttons /> */}
        {/* <Typo2><b>Appraiser Overall Feedback</b> </Typo2>
          <Contain>
            <Box>
              <Tf1>

                <TextField
                  placeholder="Add"
                  multiline
                  size='small'
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={otherComments || ""}
                  onChange={e => handleappraiserReCommentsChange(e)}
                />
               
              </Tf1>
            </Box>
          </Contain> */}
          
        {/* <NFeedbackComments /> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
        
            <Grid item xs={12}>
              {overallFeedback &&
                overallFeedback.map((j: any, mapIndex: any) => {
                  return (
                    <>
                      <Typo2><b> {j.name.name}</b> <span style={{fontSize:"22px"}}>*</span> </Typo2>
                      <Contain>
                     
                          <Tf1>

                            <TextField
                              // fullWidth
                              placeholder="Add"
                              multiline
                              inputProps={{ maxLength: 500 }}
                              // variant="standard"
                              // InputProps={{
                              //   disableUnderline: true,
                              // }}
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
                            />

                          </Tf1>
                       
                      </Contain>
                    </>
                  );
                })}

              <Tf2></Tf2>
            </Grid>
          </Grid>
         
        </Box>
        {/* <Divide>
          {" "}
          <Divider />
        </Divide> */}
      </div>
     )}  
      {/* {employeeData && checkIfRejected("area_of_improvement") && ( */}
      <div>
        {/*<Table1 />*/}
        <NAreaofImprovementComments />

        <Box sx={{ flexGrow: 1  }}>
          
        <Areasofimprovement> <b>Areas of Improvement</b>  <span style={{fontSize:"22px"}}>*</span>
         </Areasofimprovement>
        <Tf6>
        <Table  style={{ marginTop: "7px" }} size="small">
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
                        setnavPrompt(true)
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
                                    fullWidth
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
                <TableCell style={{ borderColor: "rgb(255 255 255 / 0%)" }}>
                  
          
                  {area.length !== 1 &&
                    <Stack
                      direction="row"
                      alignItems="center"
                      // width="100px"
                      // marginLeft="25px"
                      // // marginTop="18px"
                      spacing={0}
                    >
<Tooltip  title="Delete">
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
                      <Tooltip  title="Add">
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
        </Tf6>
        </Box>

        
      </div>
      {/* )}  */}
    </div>
  );
};

export default Performancefeedbacksummary;
