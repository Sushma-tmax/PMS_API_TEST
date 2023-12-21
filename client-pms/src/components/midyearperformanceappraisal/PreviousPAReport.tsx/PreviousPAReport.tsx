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
import { useGetEmployeeAppraisalQuery, useGetRatingScaleQuery } from '../../../service'
import { useParams } from 'react-router-dom'

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

const PreviousPAReport = (props: any) => {
  const { employee_id } = useParams()
  const { data, isLoading } = useGetEmployeeAppraisalQuery(employee_id)
  const [showData, setShowData] = useState<any>([])
  const [alert, setAlert] = useState<any>('')

  useEffect(() => {
    if (data?.past_appraisal?.normalizer != undefined && data?.past_appraisal?.normalizer != "") {
      setShowData(data);
      setAlert('')
      { console.log(alert, 'errorrr1') }

    } else if (data?.past_appraisal === undefined || data?.past_appraisal?.normalizer === undefined || data?.past_appraisal?.normalizer === "") {

      setShowData([])
      setAlert("There is no previous report")
      { console.log(alert, 'errorrr2') }

    }

  }, [data])
  { console.log(alert, 'errorrr3') }

  if (isLoading) {
    return <p>Loading... </p>
  }

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#F1F1F1", height: "1500px" }}>

       
        <Container
          sx={{
            maxWidth: "96.5% !important",
            background: "#fff",
            height: "calc(100vh - -1050px)",
            marginBottom: "40px",
          }}
        >
         
          <Header headerData={data} />
         <p>{alert && (<Alert severity="error"> {alert}</Alert>)}</p> 
          <ObjectiveType objDescData={showData} />

          <Page>
            <OverallFeedback feedbackData={showData} />
          </Page>

          <Page>
            <h4>Area(s) of Improvement</h4>
          </Page>
          <PageTable>
            <AreasAndSpecific areaAndSpecificData={showData} />
          </PageTable>

          {/*<Header headerData = {paData} />*/}
          <Page>
            <h4>Training Recommendation(s)</h4>
          </Page>
          <PageTable>
            <TrainingRecommendation trainingData={showData} />
          </PageTable>

          <Page>
            <OtherRecommendation otherData={showData} />
          </Page>
        </Container>
      </div>

    </React.Fragment>
  );
};

export default PreviousPAReport;
