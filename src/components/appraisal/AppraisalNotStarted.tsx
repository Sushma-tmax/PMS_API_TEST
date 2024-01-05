import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TableContainer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Downloadss from "../../assets/Images/Downloadss.svg";

import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
} from "../../service";
import performance from "../../assets/Images/performance.svg";
import Avatar from "@mui/material/Avatar";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { EMPLOYEE_DOWNLOAD, EMPLOYEE_PREVIOUS_PA_NO_CALENDAR, EMPLOYEE_PREVIOUS_PAs } from "../../constants/routes/Routing";
import { Link } from "react-router-dom";

export default function AppraisalNotStarted() {
  const { employee_id } = useParams();
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");
  const navigate = useNavigate();
  const [show, setShow] = useState<any>(false);

  useEffect(() => {
    if (employeeData?.data?.appraisal?.status == "rejected") {
      setShow(true);
    }
    else {
      setShow(false);
    }
  }, [employeeData]);

  const [show1, setShow1] = useState("The performance appraisal is not initiated.");
  useEffect(() => {
    if (employeeData?.data?.appraisal?.status == "rejected") {
      setShow1("Your Performance Appraisal was submitted.");
    }  else if (employeeData?.data?.calendar?.status == "Live" && employeeData?.data?.appraisal?.status !== "excepted"){
      setShow1("The performance appraisal has been initiated and is currently in progress with the Appraiser.");
    }
  }, [employeeData]);

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(
      document.getElementById("pdf") as HTMLElement
    );
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Employee_Appraisal.pdf");
  };
  const ViewPa = () =>{
    navigate(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`);
  
  }
  return (

    <div
      style={{
        backgroundColor: "#F1F1F1",
        height: "auto",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
     
      
        <Box
          style={{
            background: "#fff",
        margin: "25px",
        minHeight: "100px",
        overflow: "hidden",
        height:"auto",
          }}
        >
          <Box 
          style={{
            padding: "35px",
          }}
          >
          <Typography
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "28px",
              fontFamily: "Arial",
              marginBottom:"25px"
            }}
          >
            Welcome to Performance Appraisal
          </Typography>
          <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
          <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >

              <div>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                  >
                      <Avatar style={{ width: "55px", height: "55px" }}>
                      </Avatar>
                   
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <span
                      style={{
                        fontSize: "17px",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                      }}
                    >
                      {employeeData?.data?.first_name}
                    </span>
                    <span
                      style={{
                        color: "#333333",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.position_long_description}{" "}
                      
                    </span>

                    <span
                      style={{
                        color: "#333333",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                       Grade {employeeData?.data?.grade}{" "}
                      </span>


                    <span
                      style={{
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.employee_code}
                    </span>
                  </Stack>

                </Stack>
              </div>
              {/* <div>
              <Link to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`} state={{ employeeCodeFromLanding: employeeData?.data?.employee_code }}>
                    <button
                      style={{
                        color: "#3E8CB5",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }}
                    >
                      Previous Appraisal {""}
                    </button>
                    </Link>
              </div> */}
               {show && ( 
              <div>

              
                <Stack
                  direction="column"
                  display="flex"
                  alignItems="center"
                  // gap="8px"
                 
                >
                 
              

                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                  }}
                  onClick={ViewPa}
                >
                  {/* <img src={Downloadss} alt="Download" /> */}
                  <label > ViewPA </label>
                </Button>

               
              </Stack>
              </div>
                )} 
</Stack>
          </Box>
          <Box >
            <Stack direction="column" spacing={3} style={{ alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>

              <img src={performance} alt="performance" height={60} width={100}></img>


              {/* <h2
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "26px",
              fontFamily: "Arial",
            }}
          >
            Your Performance Appraisal is not yet completed.
          </h2>
        */}
              {/* {show && ( */}
              <h2
                style={{
                  color: "#3E8CB5",
                  fontWeight: "400",
                  fontSize: "26px",
                  fontFamily: "Arial",
                  marginTop:"40px"
                }}
              >
                {show1}          
              
              </h2>
              {/* )} */}

              <span
                style={{
                  // opacity: "50%",
                  fontSize: "17px",
                  fontFamily: "Arial",
                  color:"#717171",
                  marginTop: "15px",
                }}
              >
                   {(employeeData?.data?.calendar?.status == "Live" && employeeData?.data?.appraisal?.status !== "excepted") ? 
                 <b> You will receive email notifications when your performance appraisal is normalized.</b> : 
                 <b>You will receive the email notification in due time.</b>}
              </span>

              {/* <Link to={`${EMPLOYEE_PREVIOUS_PA_NO_CALENDAR}/employee/${employee_id}`} state={{ employeeCodeFromLanding: employeeData?.data?.employee_code }}>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial",
                  marginTop: "5px",
                  color:"#0099FF"
                }}
              >
                      Previous Appraisal {""}
                    </span>
                    </Link> */}


            </Stack>
          </Box>
          </Box>
        </Box>
      
    </div>
  );
}
