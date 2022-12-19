import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Editicon from "../../../assets/appraiser/Reviewericons/Editicon.svg";
import { Button, IconButton } from "@mui/material";
import { useGetObjectiveTitleQuery } from "../../../service";
import { Link } from "react-router-dom";
import {
  CREATE_APPRAISAL,
  REVIEWER_PAGE,
} from "./../../../constants/routes/Routing";
import { useNavigate, useParams } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Tabcontainer = styled("div")({
  "& .MuiButtonBase-root": {
    textTransform: "none",
    color: "#3C8BB5",
    fontWeight: 400,
  },
  "& .Mui-selected": {
    color: "#3C8BB5 !important",
  },
  "& .MuiTabs-indicator": {
    background: "  #3C8BB5",
  },
});

const Heading = styled("div")({
  fontSize: "14px",
  color: "#333333",
  marginLeft: "13.5px",
  paddingTop: "5px",
});
const Description = styled("div")({
  fontSize: "13px",
  color: "#333333",
  opacity: 0.6,
  marginLeft: "13.5px",
  paddingBottom: "15px",
});
var alternatingColor;
alternatingColor = alternatingColor === "none" ? "#F2F6F8" : "#FFFFFF";
const Bgcolor = styled("div")({
  // background: "#F2F6F8",
  // background:{ i % 2 ? '#d5d5d5' : '#a9a9a9' },
  marginTop: "5px",
});
const Ratingbox = styled("div")({
  padding: "0px",
  paddingRight: "25px",
  // paddingBottom: "140px",
});
const Rating = styled("div")({
  marginTop: "-7px",
  fontSize: "20px",
});
const Comments = styled("div")({
  fontSize: "11px",
  marginTop: "-26px",
});
const Divide = styled("div")({
  marginTop: "3px",
  paddingbottom: "35px",
});
const Editiconstyle = styled("div")({
  //paddingLeft: '60px',
  //display:'none'
  // paddingLeft: "550px",
  // paddingTop: "7px",
  position: "absolute",
  left: "94.5%",
  top: "10%",
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const colors = ["#d5d5d5", "#a9a9a9"];
const Tabcontents = (props: any) => {
  const { employeeData, ratingScaleData } = props;
  const { employee_id } = useParams();
  const [tabValue, setTabValue] = React.useState<any>(0);
  const [activeObjectiveType, setActiveObjectiveType] = useState(null);
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState<any>([]);

  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");

  console.log(activeObjectiveDescription, "activeObjectiveDescription");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingScaleData.data.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setActiveObjectiveDescription(() => {
        return employeeData.data.appraisal.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
            };
          }
        );
      });
    }
  }, [employeeData, objectiveTitleData]);

  useEffect(() => {
    if (employeeData) {
      setActiveObjectiveType(
        employeeData.data.appraisal.objective_type[tabValue].name._id
      );
    }
  }, [tabValue, employeeData]);

  const filterObjectiveDescription = (data: any) => {
    if (data && activeObjectiveType) {
      const res = data.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        return i.name.objective_type === activeObjectiveType;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <Tabcontainer>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {employeeData &&
              employeeData.data.appraisal.objective_type.map(
                (objType: any, index: number) => {
                  return <Tab label={objType.name.name} />;
                }
              )}
            <Editiconstyle>
              <Link
                to={`${CREATE_APPRAISAL}/employee/${employee_id}`}
                // onClick={() => startAppraisal(j._id)}
              >
                <Button
                  style={{
                    borderRadius: "4px",
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    padding: "2px 9px",

                    borderColor: "#004C75",
                    color: "#004C75",
                  }}
                  variant="outlined"
                >
                  Edit
                </Button>
              </Link>
            </Editiconstyle>
          </Tabs>
        </Tabcontainer>
      </Box>

      {employeeData &&
        activeObjectiveType &&
        activeObjectiveDescription.map((objDesc: any, index: number) => {
          return (
            <div>
              <TabPanel value={tabValue} index={index}>
                {activeObjectiveDescription &&
                  activeObjectiveType &&
                  filterObjectiveDescription(activeObjectiveDescription).map(
                    (objDesc: any, index: number) => {
                      return (
                        <>
                          <Bgcolor>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              //sx={{background: "#F2F6F8"}}
                              style={
                                index % 2
                                  ? { background: "White" }
                                  : { background: "#F2F6F8" }
                              }
                            >
                              <Stack direction="column">
                                <Heading>
                                  <div>{objDesc?.name?.objectiveTitle}</div>
                                </Heading>
                                <div>
                                  <div>
                                    {objDesc.level_1_isChecked && (
                                      // <Typography
                                      //   style={
                                      //     {
                                      //       // borderBottom: "1px solid lightgrey",
                                      //       // marginLeft: "5px",
                                      //       // marginRight: "5px",
                                      //       // width: "240px",
                                      //     }
                                      //   }
                                      // >
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "5px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            L1 :
                                          </span>
                                          <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_1
                                                .level_definition
                                            }
                                          </p>
                                        </div>

                                        {objDesc.name.level_1.behavioral_objective.map(
                                          (i: any) => {
                                            return (
                                              <p
                                                style={{
                                                  paddingLeft: "37px",
                                                  fontSize: "12px",
                                                  opacity: "75%",
                                                }}
                                              >
                                                {i}
                                              </p>
                                            );
                                          }
                                        )}
                                      {/* </Typography> */}
                                      </div>
                                    )}

                                    {objDesc.level_2_isChecked && (
                                      <Typography
                                        style={
                                          {
                                            // borderBottom: "1px solid lightgrey",
                                            // marginLeft: "5px",
                                            // marginRight: "5px",
                                          }
                                        }
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "5px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            L2 :
                                          </span>
                                          <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_2
                                                .level_definition
                                            }
                                          </p>
                                        </div>

                                        {objDesc.name.level_2.behavioral_objective.map(
                                          (i: any) => {
                                            return (
                                              <p
                                                style={{
                                                  paddingLeft: "37px",
                                                  fontSize: "12px",
                                                  opacity: "75%",
                                                }}
                                              >
                                                {i}
                                              </p>
                                            );
                                          }
                                        )}
                                      </Typography>
                                    )}
                                    {objDesc.level_2_isChecked && (
                                      <Typography
                                        style={
                                          {
                                            //   borderBottom: "1px solid lightgrey",
                                            // marginLeft: "5px",
                                            // marginRight: "5px",
                                          }
                                        }
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            L3 :
                                          </span>
                                          <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_3
                                                .level_definition
                                            }
                                          </p>
                                        </div>

                                        {objDesc.name.level_3.behavioral_objective.map(
                                          (i: any) => {
                                            return (
                                              <p
                                                style={{
                                                  paddingLeft: "37px",
                                                  fontSize: "12px",
                                                  opacity: "75%",
                                                }}
                                              >
                                                {i}
                                              </p>
                                            );
                                          }
                                        )}
                                      </Typography>
                                    )}

                                    {objDesc.level_4_isChecked && (
                                      <Typography
                                        style={
                                          {
                                            //   borderBottom: "1px solid lightgrey",
                                            // marginLeft: "5px",
                                            // marginRight: "5px",
                                          }
                                        }
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            L4 :
                                          </span>
                                          <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_4
                                                .level_definition
                                            }
                                          </p>
                                        </div>

                                        {objDesc.name.level_4.behavioral_objective.map(
                                          (i: any) => {
                                            return (
                                              <p
                                                style={{
                                                  paddingLeft: "37px",
                                                  fontSize: "12px",
                                                  opacity: "75%",
                                                }}
                                              >
                                                {i}
                                              </p>
                                            );
                                          }
                                        )}
                                      </Typography>
                                    )}
                                  </div>
                                </div>

                              <Heading>  <p>Remarks : {objDesc.remarks}</p></Heading>
                              </Stack>
                              <div>
                                <Ratingbox>
                                  <Box>
                                    <Rating>
                                      <p>{objDesc.ratings.rating}</p>
                                    </Rating>
                                    <Comments>
                                      <p>
                                        {getRatingDescription(
                                          objDesc.ratings.rating
                                        )}
                                      </p>
                                    </Comments>
                                  </Box>
                                </Ratingbox>
                              </div>
                            
                              {/* <Box >
                                <Heading>
                                  <p>
                                    {objDesc?.name?.objectiveTitle}
                                    <div>
                                      {objDesc.level_1_isChecked && (
                                        <Typography
                                          style={
                                            {
                                              // borderBottom: "1px solid lightgrey",
                                              // marginLeft: "5px",
                                              // marginRight: "5px",
                                              // width: "240px",
                                            }
                                          }
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              paddingLeft: "5px",
                                              paddingTop: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                paddingLeft: "7px",
                                                fontSize: "14px",
                                              }}
                                            >
                                              L1 :
                                            </span>
                                            <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_1
                                                .level_definition
                                            }
                                          </p>
                                          </div>                                        

                                          {objDesc.name.level_1.behavioral_objective.map(
                                            (i: any) => {
                                              return (
                                                <p
                                                  style={{
                                                    paddingLeft: "37px",
                                                    fontSize: "12px",
                                                    opacity: "75%",
                                                  }}
                                                >
                                                  {i}
                                                </p>
                                              );
                                            }
                                          )}
                                        </Typography>
                                      )}

                                      {objDesc.level_2_isChecked && (
                                        <Typography
                                          style={
                                            {
                                              // borderBottom: "1px solid lightgrey",
                                              // marginLeft: "5px",
                                              // marginRight: "5px",
                                            }
                                          }
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              paddingLeft: "5px",
                                              paddingTop: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                paddingLeft: "7px",
                                                fontSize: "14px",
                                              }}
                                            >
                                              L2 : 
                                            </span>
                                            <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_2
                                                .level_definition
                                            }
                                          </p>
                                          </div>
                                        

                                          {objDesc.name.level_2.behavioral_objective.map(
                                            (i: any) => {
                                              return (
                                                <p
                                                  style={{
                                                    paddingLeft: "37px",
                                                    fontSize: "12px",
                                                    opacity: "75%",
                                                  }}
                                                >
                                                  {i}
                                                </p>
                                              );
                                            }
                                          )}
                                        </Typography>
                                      )}
                                      {objDesc.level_2_isChecked && (
                                        <Typography
                                          style={
                                            {
                                              //   borderBottom: "1px solid lightgrey",
                                              // marginLeft: "5px",
                                              // marginRight: "5px",
                                            }
                                          }
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              paddingLeft: "5px",
                                              paddingTop: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                paddingLeft: "7px",
                                                fontSize: "14px",
                                              }}
                                            >
                                              L3 : 
                                            </span>
                                            <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_3
                                                .level_definition
                                            }
                                          </p>
                                          </div>
                                         

                                          {objDesc.name.level_3.behavioral_objective.map(
                                            (i: any) => {
                                              return (
                                                <p
                                                  style={{
                                                    paddingLeft: "37px",
                                                    fontSize: "12px",
                                                    opacity: "75%",
                                                  }}
                                                >
                                                  {i}
                                                </p>
                                              );
                                            }
                                          )}
                                        </Typography>
                                      )}

                                      {objDesc.level_4_isChecked && (
                                        <Typography
                                          style={
                                            {
                                              //   borderBottom: "1px solid lightgrey",
                                              // marginLeft: "5px",
                                              // marginRight: "5px",
                                            }
                                          }
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              paddingLeft: "5px",
                                              paddingTop: "20px",
                                            }}
                                          >
                                            <span
                                              style={{
                                                paddingLeft: "7px",
                                                fontSize: "14px",
                                              }}
                                            >
                                              L4 : 
                                            </span>
                                            <p
                                            style={{
                                              paddingLeft: "13px",
                                              fontSize: "12px",
                                              opacity: "75%",
                                            }}
                                          >
                                            {
                                              objDesc.name.level_4
                                                .level_definition
                                            }
                                          </p>
                                          </div>
                                         

                                          {objDesc.name.level_4.behavioral_objective.map(
                                            (i: any) => {
                                              return (
                                                <p
                                                  style={{
                                                    paddingLeft: "37px",
                                                    fontSize: "12px",
                                                    opacity: "75%",
                                                  }}
                                                >
                                                  {i}
                                                </p>
                                              );
                                            }
                                          )}
                                        </Typography>
                                      )}
                                    </div>
                                  </p>
                                </Heading>
                              </Box> */}
                              {/* <Ratingbox>
                                <Box>
                                  <Rating>
                                    <p>{objDesc.ratings.rating}</p>
                                  </Rating>
                                  <Comments>
                                    <p>{getRatingDescription(objDesc.ratings.rating)}</p>
                                  </Comments>
                                </Box>
                              </Ratingbox> */}
                              {/* <Editiconstyle>
                            <IconButton ><img src={Editicon} alt='icon' /></IconButton>
                          </Editiconstyle> */}
                            </Stack>
                           
                          </Bgcolor>
                          {/* <Divide><Divider /></Divide> */}
                        </>
                      );
                    }
                  )}
              </TabPanel>
            </div>
          );
        })}
    </Box>
  );
};

export default Tabcontents;
