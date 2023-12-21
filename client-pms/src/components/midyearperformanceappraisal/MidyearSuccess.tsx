import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, Container, Grid, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { MIDYEAR_PA_REPORT } from "../../constants/routes/Routing";
import { styled } from "@mui/material/styles";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f9fa",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item1 = styled("div")(({ theme }) => ({
    backgroundColor: "#fffbf2",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: "1px solid #FFA801"
  }));

export default function MidyearSuccess() {
  return (
    <React.Fragment>
      <div style={{backgroundColor:"#F1F1F1",height:"800px"}}>
      <Container
        sx={{
          maxWidth: "96.5% !important",
          backgroundColor: "#ebf1f5",
        }}
      >
        <h1
          style={{
            color: "#004c75",
            fontFamily:"regular",
            fontSize:"24px",
            fontWeight:"400"
          }}
        >
          {" "}
          Mid-Year Performance Appraisal
        </h1>
      </Container>
      <Container
        sx={{
          maxWidth: "96.5% !important",
          height: "700px",
          background: "#fff",
        }}
      >
        <Box 
          style={{
            borderLeft: "4px solid #ffffff",
            paddingTop: "10px",
            
          }}
        >
            <Box
          style={{
            borderLeft: "4px solid #008e97",
            boxShadow: "0px 0px 2px 1px rgba(0, 0, 0, 0.1)"
            
          }}
        >
            <div style={{paddingLeft:"15px"}}>

          <h2
            style={{
              color: "#008e97",
              fontSize:"20px",
              fontWeight:"200"
            }}
          >
            Successfully sent
          </h2>
          <h3 
          style={{
            color: "#b1b1b1",
            fontSize:"16px",
            fontWeight:"300"
          }}>Your changes have been successfully submitted.</h3>
          </div>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item1>
                <h2
                  style={{
                    color: "#014D76",
                fontWeight: "400",
            opacity:"0.9"
                  }}
                >
                  Self Rating
                </h2>
                <h2>4.7</h2>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Exceeding
                </p>
                <h4 style={{fontWeight: "400",
            opacity:"0.9"}}>
                  <Link to={MIDYEAR_PA_REPORT}>
                    <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                    View PA Report
                  </Link>
                </h4>
              </Item1>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <h2
                  style={{
                    color: "#014D76",
                    fontWeight: "400",
            opacity:"0.9"
                  }}
                >
                  Final Rating
                </h2>
                <h2>4.5</h2>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Exceeding
                </p>
                <h4 style={{fontWeight: "400",
            opacity:"0.9"}}>
                  <Link to={MIDYEAR_PA_REPORT}>
                    <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                    View PA Report
                  </Link>
                </h4>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <h2
                  style={{
                    color: "#014D76",
                   fontWeight: "400",
            opacity:"0.9"
                  }}
                >
                  Previous Final Rating
                </h2>
                <h2>2.5</h2>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Needed Improvement
                </p>
                <h4 style={{fontWeight: "400",
            opacity:"0.9"}}>
                  <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                  View Previous PA Report
                </h4>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
      </div>
    </React.Fragment>
  );
}
