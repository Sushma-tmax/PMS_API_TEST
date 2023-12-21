import { AccountCircle } from "@mui/icons-material";
import { Alert, Box, Container, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Logo from "../../../../assets/Images/Logo.svg";
import AreasAndSpecific from "./AreasAndSpecific";
import Header from "./header";
import ObjectiveType from "./ObjectiveType";
import OtherRecommendation from "./OtherRecommendation";
import OverallFeedback from "./OverallFeedback";
import TrainingRecommendation from "./TrainingRecommendation";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Page = styled("div")(({ theme }) => ({
  color: "#a7a9aa",
}));

const Root = styled("div")(
  ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid #e0e0e0;
      text-align: left;
      padding: 6px;
    }
  
    th {
     
    }
    `
);
const PageTable = styled("div")(
  ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
      color: "#a7a9aa"
    }
  
    td,
    th {
      border: 1px solid #e0e0e0;
      text-align: left;
      padding: 6px;
      color: "#a7a9aa"
    }
  
    th {
      background-color: #f2f6f8;
      color: "#a7a9aa"
    }
    `
);

const MidyearPAreport = (props: any) => {
  const { paData,ratingScaleData } = props;
  const [showData, setShowData] = useState([])
  const [alert, setAlert] = useState<any>(false)

  useEffect(() => {
    if (paData) {
      if (paData?.data?.normalizer !== "" && paData?.data?.normalizer?.normalizer_status !== "pending") {
        setShowData(paData.data.normalizer)
      } else if (paData?.data?.reviewer !== "" && paData?.data?.reviewer?.reviewer_status !== "pending") {
        setShowData(paData.data.reviewer)
      } else if (paData?.data?.appraisal !== "" && paData?.data?.appraisal?.appraiser_status !== "pending") {
        setShowData(paData.data.appraisal)
      }else{
        setAlert(true)
      }
    } else {
      setAlert(true)
    }

  }, [paData])
  console.log(showData, "PA   DATA");

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#F1F1F1", height: "1500px" }}>
        {alert === true && (<Alert severity="error"> Appraisal is not created !</Alert>)}
        {paData && !alert &&
          <Container
            sx={{
              maxWidth: "96.5% !important",
              background: "#fff",
              height: "calc(100vh - -1050px)",
              marginBottom: "40px",
            }}
          >
            <Header headerData={paData} ratingData={showData} ratingScaleData={ratingScaleData}/>

            <ObjectiveType objDescData={paData} />

            <Page>
              <OverallFeedback feedbackData={paData} />
            </Page>

            <Page>
              <h4>Area(s) of Improvement</h4>
            </Page>
            <PageTable>
              <AreasAndSpecific areaAndSpecificData={paData} />
            </PageTable>

            {/*<Header headerData = {paData} />*/}
            <Page>
              <h4>Training Recommendation(s)</h4>
            </Page>
            <PageTable>
              <TrainingRecommendation trainingData={paData} />
            </PageTable>

            <Page>
              <OtherRecommendation otherData={paData} />
            </Page>
          </Container>
        }
      </div>

    </React.Fragment>
  );
};

export default MidyearPAreport;
