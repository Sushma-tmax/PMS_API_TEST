import React from "react";
import { styled } from "@mui/material/styles";
import { Popover, Typography } from "@mui/material";
import { useNormalizerContext } from "../../context/normalizerContext";
import Infoicon from "./icons/Infoicon.svg";
// import {useAppraisalContext} from "../../../context/appraiserOverviewContext";
import { useAppraisalContext } from "../../context/appraiserOverviewContext";
// import {useReviewerContext} from "../../../context/reviewerContextContext";
import { useState, useEffect } from "react";
import { useAppraiserRejectsNormalizerContext } from "../../context/AppraiserRejectsNormalizer";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { Box, lineHeight } from "@mui/system";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import Blueadd from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import Blueminus from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // TextField,
  Tooltip,
  Button,
} from "@mui/material";
const Typo1 = styled("div")({
  marginLeft: "58px",
  //position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "Arial",
});
const Tf = styled("div")({
  fontSize: "14x",

  backgroundColor: "#f8f8f8",
  "& .MuiInputLabel-root": {
    color: "#333333",
    textTransform: "none",
    // opacity: '0.5',
    fontSize: "13px",
    fontWeight: "400",
    borderRadius: "5px",
    // textTransform: 'none',
  },
});
const Tablecontainer = styled("div")({
  marginLeft: "58px",
  marginRight: "58px",
  // position: "absolute",
  marginTop: "10px",
});
const Pad1 = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const Pad2 = styled("div")({
  fontSize: "14px",
  color: "#333333",
  fontFamily: "Arial",
  textAlign: "left",
});

const Train = styled("div")({
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    padding: "8px",
  },
});
const Root = styled("div")`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: center;
    // padding: 7px;
  }

  th {
    background-color: #eaeced;
    fontsize: 12px;
    fontfamily: "Arial";
  }
  td {
  }
`;

// const Tablecontainer = styled("div")({
//   marginLeft: "58px",
//  // position: "absolute",
//   marginTop: '10px',

// });
const Contain = styled("div")({
  marginRight: "20px",
  marginLeft: "58px",
  marginTop: "10px",
});
const Griditems1 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
});
const Griditems2 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
});
const Griditems3 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
});
const Containers = styled("div")({
  marginTop: 18,
  marginLeft: 12,
  marginRight: 16,
  fontSize: "14px",
  color: "#333333",
  textTransform: "none",
  fontFamily: "Arial",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
});
const Tfbox = styled("div")({
  width: "400px",
  backgroundColor: "#f8f8f8",
  "& .MuiInputLabel-root": {
    color: "#333333",
    opacity: "0.5",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
  },
});
const Table2 = (props: any) => {
  const { training1Data, setnavPrompt, navPrompt } = props;
  //@ts-ignore
 const { empData, trainingRecommendation, setTrainingRecommendation, setnavPromptsetAppraiserTrainingRecommendation, trainingSelectValue, setTrainingSelectValue,trainingRecommendationFormValues, setTrainingRecommendationFormValues, appraiserTrainingRecommendation, setAppraiserTrainingRecommendation } = useNormalizerContext()
  // const { trainingRecommendation, setTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues, errorHandler, fieldError, setFieldError,
  // } = useAppraisalContext();
  console.log(trainingSelectValue,"trainingSelectValue")
  console.log(appraiserTrainingRecommendation, "trainingRecommendation");
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);

  const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };
  // const { trainingRecommendation, setTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues
  // } = useAppraiserRejectsNormalizerContext()
  //     const [formValues, setFormValues] = useState([{ name: "", training_name: "", justification: "" }])

  //     const handleTrainingChange = (i: any, e: any) => {
  //         setnavPrompt(true)
  //         const newFormValues = [...formValues];
  //         //@ts-ignore
  //         newFormValues[i][e.target.name] = e.target.value;
  //         setFormValues(newFormValues);

  //     }
  //     const addFormFields = () => {
  //       setnavPrompt(true)
  //       setFormValues([...formValues, { name: "", training_name: "", justification: "" }])
  //   }

  //   const removeFormFields = (i: any) => {
  //     setnavPrompt(true)
  //     const newFormValues = [...formValues];
  //     newFormValues.splice(i, 1);
  //     setFormValues(newFormValues)
  // }
  //     useEffect(() => {
  //         if (trainingRecommendation.length > 0) {
  //             setFormValues(() => {
  //                 return trainingRecommendation.map((j: any) => {
  //                     return {
  //                         name: j.name._id,
  //                         training_name: j.training_name,
  //                         justification: j.justification,
  //                     };
  //                 });
  //             });
  //         }
  //     }, [trainingRecommendation]);

  //     useEffect(() => {
  //         setTrainingRecommendationFormValues(formValues);
  //     }, [formValues]);
  useEffect(() => {
    if (empData) {
      setAppraiserTrainingRecommendation(() => {
        return empData.data.appraisal.training_recommendation;
      });
    }
  }, [empData]);
  return (
    <div>
      <Typo1>
        <b>Training Recommendations</b>
      </Typo1>
      <Tablecontainer >
        <Root >
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    width: "152px",
                    fontFamily: "arial",
                    padding:"6px 16px",
                    textAlign:"center"
                   

                  }}
                >
                  Training Category
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    width: "152px",
                    fontFamily: "arial",
                    padding:"6px 16px",
                    textAlign:"center"
                  }}
                >
                  Training Name
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    fontFamily: "arial",
                    padding:"6px 16px",
                    textAlign:"center"
                  }}
                >
                 Justification
                </th>
              </tr>
            </thead>
            <tbody>
              {appraiserTrainingRecommendation.map((item: any, index: any) => {
                console.log(appraiserTrainingRecommendation,"appraiserTrainingRecommendation")
                return (
                  <tr>
                    {/* <td width='20' >1</td> */}
                    <td
                    width="190px"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
                        lineHeight:"23px"
                      }}
                    >
                      {item.name.title}
                      <IconButton
                        // aria-describedby={id2}
                        onClick={handleClickInfo}
                        // style={{marginRight:"5px"}}
                      >
                        <img width="12px"  src={Infoicon} alt="icon" />
                      </IconButton>
                      <Popover
              id={id2}
              open={openInfo}
              anchorEl={anchorEls}
              onClose={handleCloseInfo}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "FEFCF8",
                  boxShadow: "none",
                  maxWidth: "400px",
                  borderRadius: "5px",
                },
              }}
              sx={{
                // width: "60%",
                "& .MuiPopover-paper": {
                  border: "1px solid #3e8cb5",
                  backgroundColor: "#ffffff",
                  // width:"30%"
                },
              }}
            >
              <Typography
               style={{
                fontSize: "12px",
                fontFamily: "arial",
                padding: "5px",
              }}
              >
              {/* {trainingSelectValue.map((TrainingData: any) => {
                          console.log(TrainingData,"TrainingData")
                          return (
                            <>
                             {TrainingData.name.defenition}

                             </>
                            );
                        })} */}
                   
{item?.name?.definition}
              </Typography>
            </Popover>
                    </td>
                    <td
                       width="200px"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
                        lineHeight:"23px"
                      }}
                    >
                      {item.training_name}
                    </td>
                    <td
                      width="400"
                      style={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
                        lineHeight:"23px"
                      }}
                    >
                      {item.justification}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Root>
      </Tablecontainer>
    </div>
  );
};

export default Table2;
