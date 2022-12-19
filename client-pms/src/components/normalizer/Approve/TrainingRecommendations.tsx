import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNormalizerContext } from "../../../context/normalizerContext";
import Popover from "@mui/material/Popover";
import { IconButton,Typography } from "@mui/material";
import Infoicon from "../icons/Infoicon.svg";
const Typo1 = styled("div")({
  // marginLeft: "25px",
  //position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "Arial",
});
const Tablecontainer = styled("div")({
  // marginLeft: "25px",
  // position: "absolute",
  marginTop: "10px",
});
const Pad1 = styled("div")({
  textAlign: "center",
  fontWeight: "600",
  fontFamily: "arial",
  fontSize: "14px",
  color: "#3e8cb5",
  padding:"6px 16px"
});
const Pad2 = styled("div")({
  // paddingRight: '48px',
  // paddingLeft: '50px',
  fontFamily: "Arial",
  fontSize: "14px",
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
    // padding: 8px;
  }

  th {
    background-color: #eaeced;
    fontsize: 12px;
  }
  //   td{
  //     background-color: #f7fbfc;
  //   }
`;

const TrainingRecommendations = () => {
  //@ts-ignore
  const { empData, trainingRecommendation, setTrainingRecommendation, appraiserTrainingRecommendation, setAppraiserTrainingRecommendation,setnavPromptsetAppraiserTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues } = useNormalizerContext()
  console.log(appraiserTrainingRecommendation, "newww");
console.log(trainingSelectValue,"trainingSelectValue")
  useEffect(() => {
    if (empData) {
      setAppraiserTrainingRecommendation(() => {
        return empData.data.appraisal.training_recommendation;
      });
    }
  }, [empData]);
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
  return (
    <div>
      <Typo1>
        <b>Training Recommendations</b>
      </Typo1>
      <Tablecontainer sx={{ width: "100%" }}>
        <Root sx={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                <th >
                  <Pad1>Training Category</Pad1>
                </th>
                <th >
                  <Pad1>Training Name</Pad1>
                </th>
                <th >
                  <Pad1>Justification</Pad1>
                </th>
              </tr>
            </thead>
            <tbody>
              {appraiserTrainingRecommendation?.map((item: any, index: any) => {
                return (
                  <tr>
                    <td
                     width="225px"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "14px",
                        color: "#333333",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
                        width:"200px",
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
                     width="310px"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "14px",
                        color: "#333333",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
                         width:"200px",
                         lineHeight:"23px"
                      }}
                    >
                      {item.training_name}
                    </td>
                    <td 
                     width="427px" 
                    style={{
                        fontFamily: "Arial",
                        fontSize: "14px",
                        color: "#333333",
                        textAlign: "left",
                        wordBreak:"break-word",
                        padding:"6px 16px",
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
    </div>
  );
};
export default TrainingRecommendations;
