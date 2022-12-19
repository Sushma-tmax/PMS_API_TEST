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
import { Button, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import {
  MIDYEAR_PA_REPORT,
  MIDYEAR_PERFORMANCE,
  MIDYEAR_REJECT_RATING,
  MIDYEAR_SUCCESS,
} from "../../constants/routes/Routing";
import Command from "../../assets/Images/Command.svg";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#f2f9fa",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 231%;
  }

  td,
  th {
    border: 1px solid #e0e0e0;
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: #f2f9fa;
  }
  `
);

export default function MidyearRejectSave() {
  return (
    <React.Fragment>

      <div style={{backgroundColor:"#F1F1F1", height: "1500px",}}>
      <Container
        sx={{
          maxWidth: "96.5% !important",
          backgroundColor: "#ebf1f5",
        }}
      >
        <h1
          style={{
            color: "#004c75",
            fontWeight: "400",
            opacity: "0.9",
          }}
        >
          <Link to={MIDYEAR_REJECT_RATING}>
            <ArrowBackIosRounded
              style={{ verticalAlign: "middle" }}
              fontSize="large"
            />
          </Link>
          Mid-Year Performance Appraisal
        </h1>
      </Container>
      <Container
        sx={{
          maxWidth: "96.5% !important",
          height: "1408px",
          // height: "calc(100vh - 165px)",
          background: "#fff",
         
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item>
                <h2
                  style={{
                    color: "#014D76",
                    fontWeight: "400",
                    opacity: "0.9",
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
                <h4 style={{ fontWeight: "400", opacity: "0.9" }}>
                  <Link to={MIDYEAR_PA_REPORT}>
                    <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                    View PA Report
                  </Link>
                </h4>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h2
                  style={{
                    color: "#014D76",
                    fontWeight: "400",
                    opacity: "0.9",
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
                <h4 style={{ fontWeight: "400", opacity: "0.9" }}>
                  <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                  View Previous PA Report
                </h4>
              </Item>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h2 style={{ fontWeight: "400", opacity: "0.9" }}>Summary</h2>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                paddingLeft: "42%",
                marginTop: "18px",
              }}
            >
              <Link to={MIDYEAR_REJECT_RATING}>
                <Button
                  style={{
                    fontSize: "15px",
                    width: "100px",
                    color: "#FFA801",

                    borderColor: "#FFA801",
                  }}
                  variant="outlined"
                >
                  <EditOutlined style={{ verticalAlign: "middle" }} /> Edit
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Root sx={{ width:"43.3%" }}>
          <table>
            <thead
              style={{
                color: "#014D76",
                fontSize: "15px",
                fontWeight: "400",
                opacity: "0.9",
              }}
            >
              <tr
                style={{
                  height: "70px",
                  textAlign: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <th>Objective Group</th>
                <th>Objective Description</th>
                <th>Rating</th>
                <th>Self Rating</th>
                <th>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
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
                    color: "#014D76",
                  }}
                >
                  Knowledge of the job
                </td>
                <td>Quality of work</td>
                <td>
                  <h3>4.5</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: "#f2f9fa",
                }}
              >
                <td>Time management</td>
                <td>
                  <h3>5.0</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Communication skills</td>
                <td>
                  <h3>5.0</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: "#f2f9fa",
                }}
              >
                <td
                  rowSpan={3}
                  style={{
                    color: "#014D76",
                    fontSize: "13px",
                  }}
                >
                  Core Competencies
                </td>

                <td>Drive for results</td>
                <td>
                  <h3>4.5</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Fostering innovation</td>
                <td>
                  <h3>4.0</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td>
                  <div>
                    <h3>4.5</h3>
                    <p
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Exceeding
                    </p>
                  </div>
                  <img src={Command} alt="icon" />
                </td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: "#f2f9fa",
                }}
              >
                <td>Teamwork</td>
                <td>
                  <h3>4.5</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td>
                  <h3>5.0</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceptional
                  </p>
                  <img src={Command} alt="icon" />
                </td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
                  style={{
                    color: "#014D76",
                    fontSize: "13px",
                  }}
                >
                  Management Competencies
                </td>
                <td>Business acumen</td>
                <td>
                  <h3>5.0</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: "#f2f9fa",
                }}
              >
                <td>Building partnerships</td>
                <td>
                  <h3>3.5</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Managing others</td>
                <td>
                  <h3>4.5</h3>
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Exceeding
                  </p>
                </td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Root>

        <div
          style={{
            fontSize: "22px",
            fontFamily: " Arial, Helvetica, sans-serif",
            // margin: "30px",
            // paddingLeft: "606px",
            display:"flex",
            backgroundColor: "#FFFBF2",
            justifyContent: "center",
            // paddingTop: "33px",
            height: "85px",
            width: "100%",
            marginTop:"20px",
            alignItems:"center"
          }}
        >
          <Link to={MIDYEAR_REJECT_RATING}>
            <Button
              style={{
                fontSize: "15px",
                color: "#FFA801",

                borderColor: "#FFA801",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Link>
          <Link style={{ color: "#fff3db" }} to={MIDYEAR_SUCCESS}>
            <Button
              style={{
                backgroundColor: "#FFA801",
                fontSize: "14px",
                fontFamily: "sans-serif",
                padding: "6px 30px",
                marginLeft: "10px",
              }}
              variant="contained"
            >
              Submit
            </Button>
          </Link>
        </div>
      </Container>
      </div>
    </React.Fragment>
  );
}
