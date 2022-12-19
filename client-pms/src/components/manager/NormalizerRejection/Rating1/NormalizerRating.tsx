import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  ArrowBackIosRounded,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Button, Container, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Command from "../../ReviewerRejection/Icons/Command.svg";
import Header from "../Header";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f9fa",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "188px",
}));

const Item1 = styled("div")(({ theme }) => ({
  backgroundColor: "#FFFBF2",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "188px",
}));

const Root = styled("div")(
  ({ theme }) => `
  table {
    // font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 231%;
    
  }

  td,
  th {
    border: 1px solid #e0e0e0;
    text-align: left;
    // padding: 6px;
   
  }

  th {
    background-color: #f2f9fa;
  }
  `
);

export default function ReviewerRating() {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#F1F1F1", height: "1500px" }}>
        <Container
          sx={{
            maxWidth: "96.5% !important",
            height: "1408px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
          }}
        >
          <div>{/* <Header /> */}</div>
          <Box sx={{ flexGrow: 1, paddingBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item>
                  <h2
                    style={{
                      color: "#004C75",
                      fontWeight: "400",
                      opacity: "0.9",
                    }}
                  >
                    Sharaban Abdullah Rating
                  </h2>
                  <h2>4.5</h2>
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    10-Jun-21
                  </p>
                  <h4 style={{ fontWeight: "400" }}>Exceeds Expectations</h4>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item1>
                  <h2
                    style={{
                      color: "#004C75",
                      fontWeight: "400",
                      opacity: "0.9",
                    }}
                  >
                    Your Rating
                  </h2>
                  <h2>3.0</h2>
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Delivering
                  </p>
                </Item1>
              </Grid>
            </Grid>
          </Box>

          <Root sx={{ width: "43.3%" }}>
            <table>
              <thead
                style={{
                  color: "#004C75",
                  fontSize: "15px",
                  fontWeight: "400",
                  opacity: "0.9",
                  height: "50px",
                }}
              >
                <tr>
                  <th
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      borderBottom: "1px solid #fff",
                      width:"18%"
                    }}
                  >
                    <form>
                      <select
                        style={{
                          fontWeight: "100",
                          fontFamily: "regular",
                          fontSize: "14px",
                          color: "#004C75",
                          border: "none",
                          background: "none",
                          // margin:"-5px"
                        }}
                      >
                        <option value="Training Title">Objective Group</option>
                      </select>
                    </form>
                  </th>
                  <th
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      borderBottom: "1px solid #fff",
                      width:"18%"
                    }}
                  >
                    <form>
                      <select
                        style={{
                          fontWeight: "100",
                          fontFamily: "regular",
                          fontSize: "14px",
                          color: "#004C75",
                          border: "none",
                          background: "none",
                          // margin:"-5px"
                        }}
                      >
                        <option value="Training Title">
                          Objective Description
                        </option>
                      </select>
                    </form>
                  </th>
                  <th
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      borderBottom: "1px solid #fff",
                      width:"18%"

                    }}
                  >
                    <form>
                      <select
                        style={{
                          fontWeight: "100",
                          fontFamily: "regular",
                          fontSize: "14px",
                          color: "#004C75",
                          border: "none",
                          background: "none",
                          // margin:"-5px"
                        }}
                      >
                        <option value="Training Title">
                          Normalizer Rating
                        </option>
                      </select>
                    </form>
                  </th>
                  <th
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      borderBottom: "1px solid #fff",
                      width:"22%"
                    }}
                  >
                    <form>
                      <select
                        style={{
                          fontWeight: "100",
                          fontFamily: "regular",
                          fontSize: "14px",
                          color: "#004C75",
                          border: "none",
                          background: "none",
                          // margin:"-5px"
                        }}
                      >
                        <option value="Training Title">Appraiser Rating</option>
                      </select>
                    </form>
                  </th>
                  <th
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      borderBottom: "1px solid #fff",
                      width:"15%"
                    }}
                  >
                    <form>
                      <select
                        style={{
                          fontWeight: "100",
                          fontFamily: "regular",
                          fontSize: "14px",
                          color: "#004C75",
                          border: "none",
                          background: "none",
                          // margin:"-5px"
                        }}
                      >
                        <option value="Training Title">Appraiser Action</option>
                      </select>
                    </form>
                  </th>
                </tr>
              </thead>
              <tbody
                style={{
                  fontSize: "14px",
                }}
              >
                <tr>
                  <td
                    rowSpan={3}
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      fontFamily: "regular",
                      fontSize: "15px",
                    }}
                  >
                    Knowledge of the job
                  </td>
                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                    }}
                  >
                    Quality of work
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                          
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                          
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                          
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          1.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                          
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Not Delivering
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "#f2f9fa",
                  }}
                >
                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                    }}
                  >
                    Time management
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                          
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          5.0
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                          
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                           
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                          
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <select
                      style={{
                        width: "50%",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      <option value="Action">Action</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                    }}
                  >
                    Communication skills
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                           
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          5.0
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                           
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                           
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          3.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                          
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    rowSpan={3}
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      fontFamily: "regular",
                      fontSize: "15px",
                    }}
                  >
                    Core Competencies
                  </td>

                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                      backgroundColor: "#f2f9fa",
                    }}
                  >
                    Drive for results
                  </td>
                  <td
                    style={{ textAlign: "center", backgroundColor: "#f2f9fa" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td
                    style={{ textAlign: "center", backgroundColor: "#f2f9fa" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          1.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Not Delivering
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ backgroundColor: "#f2f9fa" }}></td>
                </tr>
                <tr>
                  <td
                    style={{
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                      paddingLeft:"20px"
                    }}
                  >
                    Fostering innovation
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          1.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Not Delivering
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "#f2f9fa",
                  }}
                >
                  <td
                    style={{
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                      paddingLeft:"20px"
                    }}
                  >
                    Teamwork
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          1.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Not Delivering
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    rowSpan={3}
                    style={{
                      color: "#004C75",
                      paddingLeft: "20px",
                      fontFamily: "regular",
                      fontSize: "15px",
                    }}
                  >
                    Management Competencies
                  </td>
                  <td
                    style={{
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                      paddingLeft:"20px"
                    }}
                  >
                    Business acumen
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.8",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          5.0
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <select
                      style={{
                        width: "50%",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      <option value="Action">Action</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "#f2f9fa",
                  }}
                >
                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                    }}
                  >
                    Building partnerships
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          5.0
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {" "}
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td
                    style={{
                      paddingLeft: "20px",
                      opacity: "0.8",
                      fontSize: "14px",
                      fontFamily: "regular",
                    }}
                  >
                    Managing others
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          5.0
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Exceeding
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>
                        <h3
                          style={{
                            opacity: "0.7",
                            fontSize: "14px",
                            fontFamily: "regular",
                          }}
                        >
                          4.5
                        </h3>
                        <p
                          style={{
                            fontSize: "12px",
                         
                            opacity: "0.7",
                            fontFamily: "regular",
                          }}
                        >
                          Delivering
                        </p>
                      </p>

                      <h3
                        style={{
                          fontSize: "12px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontWeight: "200",
                        }}
                      >
                        Details
                      </h3>
                    </Stack>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Root>
        </Container>
      </div>
    </React.Fragment>
  );
}
