import React from 'react'
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../../../../assets/Images/Logo.svg";
import Header from "./header";
import ObjectiveGroups from "./ObjectiveType";


const Page = styled("div")(({ theme }) => ({
    color: "#a7a9aa",
}));


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


const TrainingRecommendation = (props: any) => {
    const { trainingData } = props
    // console.log(trainingData, 'tttttttttttt')
    return (
        <>
                        <table>
                    <thead
                        style={{
                            color: "#a7a9aa",
                            fontSize: "15px",
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
                            <th>Training Category</th>
                            <th>Training Name</th>
                            <th>Justification</th>
                        </tr>
                    </thead>

                    <tbody
                        style={{
                            fontSize: "14px",
                            color: "#a7a9aa",
                        }}
                    >
                        {trainingData && trainingData.data.appraisal.training_recommendation.map((i: any, index:any) => {
                            console.log(i, 'iiiiiiiiiiiiiiiiii')
                            return (
                                <>
                                    <td>{index+1}</td>
                                    <td>{i.name.title}</td>
                                    <td>{i.training_name}</td>
                                    <td>
                                        {" "}
                                       {i.justification}{" "}
                                    </td>
                                </>
                            )
                        })}
                                              
                    </tbody>
                </table>
           
        </>
    )
}

export default TrainingRecommendation