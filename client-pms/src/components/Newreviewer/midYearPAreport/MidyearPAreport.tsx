import {AccountCircle} from "@mui/icons-material";
import {Box, Container, Grid, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
import React from "react";
import Logo from "../../../../assets/Images/Logo.svg";
import Header from "./header";
import ObjectiveType from "./ObjectiveType";
import OtherRecommendation from "./OtherRecommendation";
import TrainingRecommendation from "./TrainingRecommendation";
import {useParams} from "react-router-dom";
import {useGetEmployeeAppraisalQuery} from "../../../service";

const Item = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Page = styled("div")(({theme}) => ({
    color: "#a7a9aa",
}));

const Root = styled("div")(
    ({theme}) => `
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
    ({theme}) => `
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

const AppraiserPAreport = (props : any) => {
    // const {paData} = props
    const {employee_id} = useParams()
    const { data: paData, isLoading } = useGetEmployeeAppraisalQuery(employee_id)

    console.log(paData,'PA   DATA')

    if (isLoading) {
        return <div>Loading...</div>
    }
   
     return (
        <React.Fragment>
            <Container
                sx={{
                    maxWidth: "96.5% !important",
                    background: "#fff",
                    height: "calc(100vh - -1050px)",

                    marginBottom: "40px",
                }}
            >
                <Header headerData = {paData} />
               
                <ObjectiveType objDescData = {paData}/>

                <Header headerData = {paData} />

                
               
            </Container>

            <Container
                sx={{
                    maxWidth: "96.5% !important",
                    background: "#fff",
                    height: "calc(100vh - -650px)",
                }}
            >
                {/* <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Item>
                                <img src={Logo} alt="icon"/>
                            </Item>
                        </Grid>
                        <Grid item xs={6}>
                            <Item>
                                <h1
                                    style={{
                                        color: "#014D76",
                                        fontWeight: "400",
                                        opacity: "0.9"
                                    }}
                                >
                                    Mid-Year Performance Appraisal Summary
                                </h1>
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Item>
                                <p>Employee Code: EMP****</p>
                                <p
                                    style={{
                                        color: "#014D76",
                                    }}
                                >
                                    Appraisal Date: ********
                                </p>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{backgroundColor: "#f2f9fa"}}>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <Item sx={{backgroundColor: "#f2f9fa"}}>
                                <AccountCircle
                                    style={{verticalAlign: "middle", height: "92px"}}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item sx={{backgroundColor: "#f2f9fa", textAlign: "left"}}>
                                <p>********</p>
                                <p>IT Support Engineer * Corp Support - IT</p>
                            </Item>
                        </Grid>
                        <Grid item xs={5}>
                            <Item sx={{backgroundColor: "#f2f9fa", textAlign: "right"}}>
                                <h2>Overall Final Rating</h2>
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={{backgroundColor: "#f2f9fa"}}>
                                <div style={{borderLeft: "3px solid #e4ebef"}}>
                                    <h2>4.5</h2>
                                    <p>Exceeding</p>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                <div
                    style={{
                        textAlign: "center",
                        justifyContent: "center",
                        height: "50px",
                        backgroundColor: "#eff0f1",
                        color: "#014D76",
                    }}
                >
                    <h2 style={{
                        fontWeight: "400",
                        opacity: "0.9"
                    }}>PERFORMANCE FEEDBACK SUMMARY</h2>
                </div>
                <Page>
                    <h4>Overall Feedback</h4>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry. Lorem Ipsum has been
                        the industry.Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry. Lorem Ipsum
                        has been the industry.
                    </p>
                    <h4>Area(s) of Improvement</h4>
                </Page>
                <PageTable>
                    <table>
                        <thead
                            style={{
                                color: "#a7a9aa",
                                fontSize: "15px",
                                fontWeight: "400",
                                opacity: "0.9"
                            }}
                        >
                        <tr
                            style={{
                                height: "70px",
                                textAlign: "center",
                                alignContent: "center",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#a7a9aa",
                            }}
                        >
                            <th>#</th>
                            <th>Area(s) of Improvement</th>
                            <th>Specific Action(s)</th>
                        </tr>
                        </thead>

                        <tbody
                            style={{
                                fontSize: "14px",
                                color: "#a7a9aa",
                            }}
                        >
                        <tr>
                            <td>1</td>
                            <td>
                                {" "}
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the industry. Lorem
                                Ipsum has been the industry.Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem Ipsum has been
                                the industry.{" "}
                            </td>
                            <td>
                                <p>1. Training on Life skills</p>
                                <p>2. Learn English</p>
                                <p>3. Practice daily on the skills</p>
                            </td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>
                                {" "}
                                Lorem Ipsum is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the industry. Lorem
                                Ipsum has been the industry.Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem Ipsum has been
                                the industry.{" "}
                            </td>
                            <td>
                                <p>1. Training on Life skills</p>
                                <p>2. Learn English</p>
                                <p>3. Practice daily on the skills</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </PageTable>

                 */}
                  <Page>
                <h4>Training Recommendation(s)</h4>
            </Page>
            <PageTable>
            <TrainingRecommendation trainingData = {paData}/>
                </PageTable>
             
                <Page>
                      <OtherRecommendation otherData = {paData}/>
                    
                </Page>
            </Container>
        </React.Fragment>
    )
}

export default AppraiserPAreport
