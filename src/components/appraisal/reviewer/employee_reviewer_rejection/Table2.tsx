import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Popover, Typography } from "@mui/material";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
const Typo1 = styled("div")({
  marginLeft: "35px",
  //position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  //opacity: '0.85'
  fontFamily: "arial",
});
const Tablecontainer = styled("div")({
  marginLeft: "35px",
  marginRight: "35px",
  marginTop: "10px",
});
const Pad1 = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const Pad2 = styled("div")({
  fontSize: "14px",
  fontFamily: "arial",
  color: "#333333",
  textAlign: "left",
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
    
  }

  th {
    background-color: #eaeced;
    fontsize: 12px;
    fontfamily: "Arial";
  }
  td {
  }
`;

const Table2 = () => {
  //@ts-ignore
  const {appraiserTrainingRecommendation, setAppraiserTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues} = useReviewerContext()

  console.log(appraiserTrainingRecommendation, "trainingRecommendation");
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showTrainingRecommendation, setShowTrainingRecommendation] = useState(false)
  const [popoverIndex, setPopoverIndex] = useState<any>("");

  const openInfo = Boolean(anchorEls);

  const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };

  useEffect(() => {
    if (appraiserTrainingRecommendation) {
      let tempTraining = appraiserTrainingRecommendation.filter((item:any) => {
        return item.name.title !== "" || item.name.title !== undefined
      })
      if (tempTraining && tempTraining?.length > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }    
    }    
    },[appraiserTrainingRecommendation])

  return (
    <div>
   {showTrainingRecommendation && (
    <>
       <Typo1>
        <b> Training Recommendations (Appraiser) </b>{" "}
      </Typo1>
      <Tablecontainer>
        <Root sx={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "arial",
                    color: "#3E8CB5",
                    width: "200px",
                    padding:"6px 16px"
                  }}
                >
                  Training Category
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "arial",
                    color: "#3E8CB5",
                    width: "200px",
                    padding:"6px 16px"
                  }}
                >
                  Training Name
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "arial",
                    color: "#3E8CB5",
                    padding:"6px 16px",
                    width: "400px",
                  }}
                >
                 Justification
                </th>
              </tr>
            </thead>
            <tbody>
              {appraiserTrainingRecommendation.map((item: any, index: any) => {
                return (
                  <tr>
                    {/* <td width='20' >1</td> */}
                    <td
                      width="225px"
                      style={{
                        fontSize: "14px",
                        fontFamily: "arial",
                        color: "#333333",
                        textAlign: "left",
                        padding:"6px 16px",
                        wordBreak: "break-word",
                        lineHeight:"23px"
                      }}
                    > <IconButton
                    // aria-describedby={id2}
                    onClick={(e:any)=>{
                      handleClickInfo(e)
                      setPopoverIndex(index);
                    }}
                    // style={{marginRight:"5px"}}
                  >
                    <img width="12px"  src={Infoicon} alt="icon" />
                  </IconButton>
                      {item.name.title}
                     
                      <Popover
              id={id2}
              open={(popoverIndex === index) && openInfo}
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
               {/* {trainingSelectValue &&
                        trainingSelectValue.map((TrainingData: any) => {
                          console.log(TrainingData,"TrainingData")
                          return (
                            <>
                             {TrainingData.name.definition}
                             </>
                            );
                        })} */}
                   {item?.name?.definition}

              </Typography>
            </Popover>
                    </td>
                    <td
                     width="300px"
                      style={{
                        fontSize: "14px",
                        fontFamily: "arial",
                        color: "#333333",
                        textAlign: "left",
                        padding:"6px 16px",
                        wordBreak: "break-word",
                        lineHeight:"23px"
                      }}
                    >
                      {item.training_name}
                    </td>
                    <td style={{
                        fontSize: "14px",
                        fontFamily: "arial",
                        color: "#333333",
                        textAlign: "left",
                        padding:"6px 16px",
                        wordBreak: "break-word",
                        lineHeight:"23px"
                      }}>
                     {item.justification}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Root>
      </Tablecontainer>
    </>
   )}
    </div>
  );
};

export default Table2;
