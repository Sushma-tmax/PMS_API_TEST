import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Alert, Box, Container, Grid, IconButton } from "@mui/material";
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

const AreasAndSpecific = (props: any) => {
  const {areaAndSpecificData } = props;
   const [areaData, setAreaData] = useState([])
   const [alert,setAlert] = useState<any>(false)

  // useEffect(() => {
  //   if (areaAndSpecificData) {
  //     if ( areaAndSpecificData?.data?.normalizer?.area_of_improvement !== "") {
  //       setAreaData(areaAndSpecificData.data.normalizer.area_of_improvement)
  //     } else if ( areaAndSpecificData?.data?.reviewer?.area_of_improvement !== "") {
  //       setAreaData(areaAndSpecificData.data.reviewer.area_of_improvement)
  //     } else if ( areaAndSpecificData?.data?.appraisal?.area_of_improvement !== "") {
  //       setAreaData(areaAndSpecificData.data.appraisal.area_of_improvement)
  //     } 
  //   } else {
  //     setAlert(true)
  //   }

  // },[areaAndSpecificData])
  
  return (
   
    
    <>
    {/* <Alert severity="error"> Appraisal is not created !</Alert> */}
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
          {areaAndSpecificData &&
            areaAndSpecificData?.data?.past_appraisal?.normalizer.area_of_improvement.map(
              (i: any, index: any) => {
             console.log(i,'iiiii')
                return (
                  <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{i.value}</td>
                    <td>{i.specific_actions.map((specific:any, index1:any)=> {
                     if (specific.value !== "") {
                      return (
                        <p>{`${index1 + 1} ${""} ${specific.value}`}</p> 
                       )
                     }
                     })}
                     
                     
                     </td>
                    </tr>
                   
                  </>
                );
              }
            )}
        </tbody>
      </table>
  
    </>
  );
};

export default AreasAndSpecific;
