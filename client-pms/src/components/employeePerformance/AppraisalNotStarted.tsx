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
import { EMPLOYEE_DOWNLOAD } from "../../constants/routes/Routing";

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

  const [show1, setShow1] = useState("Your Performance Appraisal is not yet completed.");
  useEffect(() => {
    if (employeeData?.data?.appraisal?.status == "rejected") {
      setShow1("Your Performance Appraisal has been submitted.");
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
        // height: "1500px",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          maxWidth: "96.5% !important",
          backgroundColor: "#ebf1f5",
        }}
      ></Container>
      <Container
        sx={{
          maxWidth: "96.5% !important",
          maxHeight: "80%",
          background: "#fff",
          marginTop: "25px",
          //   minHeight: "100px",
          //   overflow: "hidden",
        }}
      >
        <Box
          style={{
            paddingLeft: "35px",
            paddingRight: "35px",
            paddingTop: "35px",
            height: "calc(100vh - 165px)"
          }}
        >
          <h2
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "28px",
              fontFamily: "Arial",
            }}
          >
            Welcome to Performance Appraisal!
          </h2>
          <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
            <Grid container spacing={0} sx={{ alignItems: "center" }}>
              <Grid item xs={1} md={0.7}>
                <Typography
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
                </Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Stack direction="column" spacing={1}>
                  <span
                    style={{
                      fontSize: "17px",
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                    }}
                  >
                    {employeeData?.data?.legal_full_name}
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
                    <span
                      style={{
                        borderRadius: "50%",
                        marginRight: "10px",
                        verticalAlign: "middle",
                        width: "4px",
                        height: "4px",
                        display: "inline-block",
                        background: "#999999",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                      }}
                    />
                    {/* {employeeData?.data?.division} */}
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
              </Grid>
              {show && (
                <Grid item xs={1}>
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
                  <img src={Downloadss} alt="Download" />
                  <label style={{ paddingLeft: "5px" }}> ViewPa </label>
                </Button>
                </Grid>
              )}
              <Grid item xs={1}></Grid>
            </Grid>
          </Box>
          <Box >
            <Stack direction="column" spacing={3} style={{ alignItems: "center", justifyContent: "center", paddingTop: "100px" }}>

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
                }}
              >
                {/* {show1} */}
                The performance appraisal has not yet started.
              </h2>
              {/* )} */}

              <span
                style={{
                  opacity: "50%",
                  fontSize: "12px",
                  fontFamily: "Arial",
                  marginTop: "5px",
                }}
              >
                <b>You will get email notification once appraiser completed the appraisal.</b>
              </span>


            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
