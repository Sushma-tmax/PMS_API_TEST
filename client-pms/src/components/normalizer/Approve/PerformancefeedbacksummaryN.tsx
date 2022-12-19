import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import NFeedbackCommentsN from "./OverallFeedbackComments";
import AppraiserAreaN from "./previousFiles/AppraiserAreaN";
import NAreaofImprovementN from "./AreasofImprovement";
import { useNormalizerContext } from "../../../context/normalizerContext";
import _ from "lodash";
import { wordBreak } from "html2canvas/dist/types/css/property-descriptors/word-break";
const Typo1 = styled("div")({
  // marginLeft: "58px",
  paddingTop: "20px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "arial",
});
const Typo2 = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});

const Tf1 = styled("div")({
  // marginLeft: "25px",
  marginTop: "5px",
  // width: "93%",
  // padding :"4px",
  backgroundColor: "white",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    fontFamily: "arial",
    textAlign:"left"
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
// const Typo3 = styled("div")({
//   marginTop: '20px',
//   color: '#008E97',
//   fontSize: '13px',
//   opacity: 0.85
// });


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
const Tf2 = styled("div")({
  width: "93%",
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
  // position: "absolute",
  width: "96%",
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
  width: "90%",
  //  marginLeft: "580px",
  //  marginTop: "300px",
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
const Pad = styled("div")({
  color: "#333333",
  fontFamily: "arial",
  fontSize: "14px",
  textAlign: "justify",
  wordBreak: "break-word",
  padding:"6px 16px"
});
const Pad1 = styled("div")({
  paddingLeft: "25px",
  textAlign: "center",
  wordBreak: "break-word",
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

const PerformancefeedbacksummaryN = (props: any) => {
  const { employeeData } = props;
  //@ts-ignore
  const { fData, appraiserFeedback, reviewerFeedback, setAppraiserFeedback, overallFeed, setOverallFeed, isLoading, empData, feedbackLoading, areaImprovement, setAreaImprovement, area, setarea, appraiserOverallFeedback, setAppraiserOverallFeedback, appraiserAreaOfImprovement, setAppraiserAreaOfImprovement, normalizerComments, setNormalizerComments
  } = useNormalizerContext()
  console.log(appraiserFeedback, "appraiserFeedback");
  const [overallFeedback, setOverallFeedback] = useState<any>([]);
  const [filterData, setFilterData] = useState([]);
  console.log(normalizerComments, "newone");
  console.log(appraiserFeedback, "appraiserFeedback");
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
    if (empData) {
      setAppraiserFeedback(() => {
        return empData.data.appraisal.feedback_questions;
      });
      setAppraiserAreaOfImprovement(() => {
        return empData.data.appraisal.area_of_improvement;
      });
    }
  }, [empData]);
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
      });
    }
  }, [fData, empData]);

  // useEffect(() => {
  //   if (area) {
  //     setAreaImprovement(area)
  //   }
  // }, [area])
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
  const [comments1, setComments1] = useState();

  const handleCommentsChange = (e: any) => {
    console.log(e);
    setComments1(e.target.value);
  };
  useEffect(() => {
    setNormalizerComments(comments1);
  }, [comments1]);
  return (
    <div>
     
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
        {/* <Typo2><b>Appraiser Overall Feedback</b> </Typo2>
          <Contain>
            <Box>
              <Tf2>

                <TextField 
                 multiline
                  disabled
                  inputProps={{ maxLength: 256 }}
                  size='small'
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder='Add'
                  value={appraiserOverallFeedback || ""}></TextField>

              </Tf2>
            </Box>
          </Contain> */}
        {/* <Typo2><b>Normalizer Overall Feedback</b> </Typo2>
          <Contain>
            <Box>
              <Tf2>

                <TextField 
                 multiline
                  disabled
                  inputProps={{ maxLength: 256 }}
                  size='small'
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder='Add'
                  // key={i._id}
                  value={appraiserOverallFeedback || ""}></TextField>

              </Tf2>
            </Box>
          </Contain> */}
        {/* <NFeedbackCommentsN employeeData={employeeData} /> */}

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {empData &&
                appraiserFeedback &&
                appraiserFeedback.map((i: any) => {
                  return (
                    <>
                      <Typo2>
                        <b>{i?.name?.name}</b>{" "}
                      </Typo2>
                      <Contain>
                        <Box>
                          <Tf1>
                            {/* <p>{i.name.name}</p> */}

                            <TextField
                              // fullWidth
                              multiline
                              autoComplete="off"
                              InputProps={{readOnly: true}}
                              size="small"
                              // variant="standard"
                              // InputProps={{
                              //   disableUnderline: true,
                              // }}
                              placeholder="Add"
                              key={i?._id}
                              value={i?.value}
                            ></TextField>
                          </Tf1>
                        </Box>
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
        </Box>
        {/* <Divide> <Divider /></Divide> */}
      </div>
      {/* } */}
      <Grid container spacing={3}></Grid>

     
     
    </div>
  );
};
export default PerformancefeedbacksummaryN;
