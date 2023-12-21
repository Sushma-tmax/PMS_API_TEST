import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ArrowBackIosRounded, CollectionsOutlined, ConstructionOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  MIDYEAR_PA_REPORT,
  MIDYEAR_PERFORMANCE,
  MIDYEAR_REJECT_RATING,
} from "../../constants/routes/Routing";
import { useGetObjectiveTypeQuery } from "../../service";
import _ from "lodash";

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

const MidyearCheckbox = (props: any) => {
  const { employeeData, onSubmit } = props
  const { employee_id } = useParams()
  const [k1, setK1] = useState<any>([])
  const [k2, setK2] = useState<any>([])
  const [objSelect, setObjSelect] = useState<any>([])
  const [objSelect1, setObjSelect1] = useState<any>([])
  const { data } = useGetObjectiveTypeQuery("")
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  const [filterData, setFilterData] = useState([]);
  console.log(objectiveDescription, 'objectiveDescription')

  const getObjectiveTypeName = (id: any) => {
    console.log(id, " type");
    if (data) {
      return data.data.find((item: any) => {
        return id === item._id;
      });
    }
  };

  useEffect(() => {
    if (employeeData && data) {
      setObjectiveDescription(() => {
        const newObjType =
          employeeData.data.appraisal.objective_description.map((i: any) => {
            return {
              ...i.name,
              comments: i.comments,
              rating: i.ratings,
              objective_type: getObjectiveTypeName(i.name.objective_type),
            };
          });

        return newObjType;
      });
    }
  }, [employeeData, data]);

  const groupNameHandler = (name: any) => {
    if (name) {
      setFilterData(name);
    }
  };

  useEffect(() => {
    const group = _.groupBy(objectiveDescription, "objective_type.name");
    // console.log(Object.entries(group), 'group')

    const groupName = groupNameHandler(Object.entries(group));

    console.log(
      Object.entries(group).map((i: any) => {
        console.log(i);
        console.log(i[0]);
        console.log(
          i[1].map((j: any) => {
            console.log(j.description, j.comments, j.rating, "group");
          }),
          "group"
        );
      }),
      "objective description"
    );
  }, [objectiveDescription]);



  useEffect(() => {

    if (objectiveDescription) {
      setObjSelect(objectiveDescription)
    }

  }, [objectiveDescription]);




  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const tempUser = objSelect.map((j: any) => {
        return { ...j, isChecked: checked }
      })
      setObjSelect(tempUser)
    } else {
      const tempUser = objSelect.map((j:any)=> {
        return j._id === name
        ? {...j, isChecked:checked} 
        : j;
      })
      setObjSelect(tempUser)
    
    }
  }

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
          // isChecked: i.isChecked,
        };
      });
      return check;
    }
  };


  useEffect(()=>{
    console.log(checkboxIdHandler(checkboxHandler(objSelect)),'ppppppp')
  },[objSelect])

  const [Checked, setChecked] = useState(true);

  // const handleChange = (e: any) => {
  //   let isChecked = e.target.checked;
  //   console.log(isChecked, "handleChange");
  //   if (isChecked == false) {
  //     setChecked(true);
  //   } else {
  //     setChecked(false);
  //   }
  // };


  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#F1F1F1", height: "1500px" }}>
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
              opacity: "0.9"
            }}
          >
            <Link to={MIDYEAR_PERFORMANCE}>
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
                      opacity: "0.9"
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
                  <h4 style={{
                    fontWeight: "400",
                    opacity: "0.9"
                  }}>
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
                      opacity: "0.9"
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
                  <h4 style={{
                    fontWeight: "400",
                    opacity: "0.9"
                  }}>
                    <RemoveRedEyeOutlined style={{ verticalAlign: "middle" }} />{" "}
                    View Previous PA Report
                  </h4>
                </Item>
              </Grid>
            </Grid>
          </Box>

          <h2 style={{
            fontWeight: "400",
            opacity: "0.9"
          }}>Summary</h2>
          <Root sx={{ width: "43.3%" }}>
            <table>
              <thead
                style={{
                  color: "#014D76",
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
                    alignItems: "center"

                  }}
                >
                  <th>Objective Group</th>
                  <th>Objective Description</th>
                  <th>Rating</th>
                  <th>Comments</th>
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        objSelect &&
                        objSelect.filter(
                          (j: any) => j.isChecked !== true
                        ).length < 1
                      }
                      style={{
                        height: "20px",
                        width: "19px",
                        verticalAlign: "middle",
                      }}
                      onChange={handleOnCheck}
                    />
                  </th>
                </tr>
              </thead>

              {objSelect &&
                objSelect.map((k: any) => {
                
                  return (
                    <>
                      <tbody
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        <tr
                          style={{
                            backgroundColor: "#f2f9fa",
                          }}>
                          <td
                            rowSpan={6}
                            style={{
                              color: "#014D76",
                            }}
                          >

                            {/* {k[0]} */}
                          </td>
                        </tr>

                        {/* {k[1].map((j: any) => { */}

                        {/* return ( */}
                        <tr>
                          <td>{k.objectiveTitle}</td>
                          <td>
                            <h3>{k.rating.rating}</h3>
                            <p
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              Exceeding
                            </p>
                          </td>
                          <td>
                            {" "}
                            {k.comments}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              name={k._id}
                              checked={k?.isChecked || false}
                              onChange={handleOnCheck}
                              style={{
                                height: "20px",
                                width: "19px",
                                verticalAlign: "middle",
                              }}

                            />
                          </td>
                        </tr>
                        {/* );
                        })}   */}
                       
                      </tbody>
                    </>
                  );
                })}

            </table>
          </Root>

          <div
            style={{
              fontSize: "22px",
              fontFamily: " Arial, Helvetica, sans-serif",
              // margin: "30px",
              // paddingLeft: "606px",
              backgroundColor: "#FFFBF2",
              display: "flex",
              justifyContent: "center",
              // paddingTop: "33px",
              height: "125px",
              width: "100%",
              // marginLeft: "auto",
              marginTop: "20px",
              alignItems: "center"
            }}
          >
            <Link style={{ color: "#fff3db" }} to={`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}>
              <Button
                style={{
                  backgroundColor: "#FFA801",
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  padding: "6px 30px",
                  marginRight: "10px",
                }}
                variant="contained"
              >
                BACK
              </Button>
            </Link>
            <Link to={`${MIDYEAR_REJECT_RATING}/employee/${employee_id}`}>
              <Button
                style={{
                  fontSize: "15px",
                  color: "#FFA801",

                  borderColor: "#FFA801",
                }}
                variant="outlined"
              // disabled={Checked}
              onClick={() => {
                onSubmit(checkboxIdHandler(checkboxHandler(objSelect)));
              }}
              >
                REJECT
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
export default MidyearCheckbox
