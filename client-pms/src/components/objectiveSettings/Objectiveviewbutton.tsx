import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box, Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {
  ADD_OBJECTIVE_DESCRIPTION,
  ADD_OBJECTIVE_DESCRIPTION_1,
  EDIT_OBJECTIVE_DESCRIPTION,
} from "../../constants/routes/Routing";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Addicon from "../../assets/Images/Addicon.svg";
import Viewicon from "../../assets/Images/Viewicon.svg";
import AddObjectiveDescription from "../objective_old/AddObjectiveDescription";
import AddObjectiveDescription1 from "../objective_old/AddObjectiveDescription1";
import ViewObjectiveDescription1 from "../objective_old/ViewObjectiveDescription1";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Container, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import {
  useCreateObjectiveDescriptionMutation,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useGetSingleObjectiveDescriptionQuery,
  useUpdateObjectiveDescriptionMutation,
} from "../../service";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import {
  ADD_LEVEL,
  OBJECTIVE,
  VIEW_OBJECTIVE_DESCRIPTION,
  VIEW_OBJECTIVE_DESCRIPTION_1,
} from "../../constants/routes/Routing";
import PAMaster from "../UI/PAMaster";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import { Alert } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  MASTER_NAV,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { AlertDialog } from "..";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Plus from "../../assets/Images/Plus.svg";

import Edit from "../../assets/Images/Edit.svg";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Scrollbar } from "react-scrollbars-custom";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Downarrowsmall from "../../assets/Images/Downarrowsmall.svg";
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

const Objectiveviewbutton = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const {
    onSubmit,

    errorObjectiveDescription1,
    errorObjectiveDescription2,
    data1,
  } = props;

  const [objectiveType, setObjectiveType] = React.useState("");
  const [criteria, setCriteria] = React.useState("Rating");
  const [description, setDescription] = React.useState("");
  const [detailedDescription, setDetailedDescription] = React.useState("");
  const [objectiveTitle, setObjectiveTitle] = React.useState("");
  const [activeLevel, setActiveLevel] = React.useState(0);

  const [textfeildError, settextfeildError] = useState(false);
  const [hideLevel, setHideLevel] = useState(false);
  const [checked, setChecked] = useState(false);

  const [level_1, setLevel_1] = useState<any>([{ behavioral_objective: "" }]);
  const [level_3, setLevel_3] = useState<any>([{ behavioral_objective: "" }]);
  const [level_2, setLevel_2] = useState<any>([{ behavioral_objective: "" }]);
  const [level_4, setLevel_4] = useState<any>([{ behavioral_objective: "" }]);

  const [level_1_definition, setLevel_1_definition] = useState<any>("");
  const [level_2_definition, setLevel_2_definition] = useState<any>("");
  const [level_3_definition, setLevel_3_definition] = useState<any>("");
  const [level_4_definition, setLevel_4_definition] = useState<any>("");

  console.log(level_1, "level_1");

  const { data: objectiveTypeData } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const [createObjectiveDescription] = useCreateObjectiveDescriptionMutation();
  const { data: defaultValue } = useGetSingleObjectiveDescriptionQuery(id);
  const [updateObjectiveDescription] = useUpdateObjectiveDescriptionMutation();
  console.log(defaultValue);

  const errorHandler = () => {
    if (description !== "" && objectiveType !== "") {
      return settextfeildError(false), submitHandler();
    } else {
      return settextfeildError(true);
    }
  };
  // const { name } = props;
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //   useEffect(() => {

  //   //  errorHandler ( () => {
  //   //   if (description !== "" && detailedDescription !== "") {
  //   //     return settextfeildError(false), submitHandler();
  //   //   } else {
  //   //     return settextfeildError(true);

  //   //   }

  //   // });

  //   errorHandler()
  // }, [description,detailedDescription, objectiveType]);
  const getBehavioralObjectiveFromLevel = (level: any) => {
    return level.map((item: any) => item.behavioral_objective);
  };

  const tabValue = ["Level1", "Level2", "Level3", "Level4"];
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveLevel(newValue);
  };

  const handleLevelAdd1 = () => {
    setLevel_1([...level_1, { behavioral_objective: "" }]);
  };

  const handleLevelRemove1 = (index: any) => {
    const newleLevel1 = [...level_1];
    console.log(index, "index");
    newleLevel1.splice(index, 1);
    setLevel_1(newleLevel1);
  };

  const handleChangeLevel1 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel1 = [...level_1];
    // @ts-ignore
    newleLevel1[index].behavioral_objective = value;
    setLevel_1(newleLevel1);
  };

  const handleLevelAdd2 = () => {
    setLevel_2([...level_2, { behavioral_objective: "" }]);
  };

  const handleLevelRemove2 = (index: any) => {
    const newleLevel2 = [...level_2];
    console.log(index, "index");
    newleLevel2.splice(index, 1);
    setLevel_2(newleLevel2);
  };

  const handleChangeLevel2 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel2 = [...level_2];
    // @ts-ignore
    newleLevel2[index].behavioral_objective = value;
    setLevel_2(newleLevel2);
  };

  const handleLevelAdd3 = () => {
    setLevel_3([...level_3, { behavioral_objective: "" }]);
  };

  const handleLevelRemove3 = (index: any) => {
    const newleLevel3 = [...level_3];
    console.log(index, "index");
    newleLevel3.splice(index, 1);
    setLevel_3(newleLevel3);
  };

  const handleChangeLevel3 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel3 = [...level_3];
    // @ts-ignore
    newleLevel3[index].behavioral_objective = value;
    setLevel_3(newleLevel3);
  };

  const handleLevelAdd4 = () => {
    setLevel_4([...level_4, { behavioral_objective: "" }]);
  };

  const handleLevelRemove4 = (index: any) => {
    const newleLevel4 = [...level_4];
    console.log(index, "index");
    newleLevel4.splice(index, 1);
    setLevel_4(newleLevel4);
  };

  const handleChangeLevel4 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel4 = [...level_4];
    // @ts-ignore
    newleLevel4[index].behavioral_objective = value;
    setLevel_4(newleLevel4);
  };

  useEffect(() => {
    if (defaultValue) {
      setDescription(defaultValue.data.description);
      setCriteria(defaultValue.data.criteria);
      setDetailedDescription(defaultValue.data.detailed_description);
      setObjectiveType(defaultValue.data.objective_type._id);
      setObjectiveTitle(defaultValue.data.objective_title._id);
      setLevel_1_definition(defaultValue.data.level_1.level_definition);
      setLevel_2_definition(defaultValue.data.level_2.level_definition);
      setLevel_3_definition(defaultValue.data.level_3.level_definition);
      setLevel_4_definition(defaultValue.data.level_4.level_definition);
      setLevel_1(() =>
        defaultValue.data.level_1.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );
      setLevel_2(() =>
        defaultValue.data.level_2.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );

      setLevel_3(() =>
        defaultValue.data.level_3.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );

      setLevel_4(() =>
        defaultValue.data.level_4.behavioral_objective.map((k: any) => {
          return {
            behavioral_objective: k,
          };
        })
      );
    }
  }, [defaultValue]);
  console.log(description);

  let navigate = useNavigate();

  // const [createObjectiveDescription, {isSuccess, isError}] =
  //     useCreateObjectiveDescriptionMutation();

  const submitHandler = () => {
    // if (isError === false) {

    //   navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`);
    // }

    onSubmit(objectiveType, criteria, description, detailedDescription);
    setDescription("");
    setDetailedDescription("");
    setObjectiveType("");
  };

  const ObjectiveTypeDropDown = () => {
    const handleSelectChange = (event: SelectChangeEvent) => {
      setObjectiveType(event.target.value as string);
    };
  };
  return (
    // <Typography align="center">
    //   <div>
    //     <Button
    //       variant="outlined"
    //       style={{
    //         borderColor: "#004C75",
    //         textTransform: "none",
    //         color: "#004C75",
    //         padding: "6px 8px",
    //         fontSize: "14px",
    //         width: "230px",
    //         borderRadius: 9,
    //         fontFamily: " Arial",
    //         margin: "20px",
    //         marginTop: "25px",
    //       }}
    //     >
    //       <Link to={ ADD_OBJECTIVE_DESCRIPTION_1}>
    //         <Stack
    //           direction="row"
    //           spacing={1}
    //           alignItems="center"
    //           style={{ fontFamily: "regular" }}
    //         >
    //           <div>
    //             <img src={Addicon} alt="icon" />
    //           </div>
    //           <div>
    //             Add Objective Description
    //           </div>
    //         </Stack>
    //       </Link>
    //     </Button>

    //     <Button
    //       variant="outlined"
    //       style={{
    //         borderColor: "#004C75",
    //         textTransform: "none",
    //         color: "#004C75",
    //         padding: "6px 8px",
    //         fontSize: "14px",
    //         width: "230px",
    //         borderRadius: 9,
    //         fontFamily: " Arial",
    //       }}
    //     >
    //       <Link to={ VIEW_OBJECTIVE_DESCRIPTION_1}>
    //         <Stack
    //           direction="row"
    //           spacing={1}
    //           alignItems="center"
    //           style={{ fontFamily: "regular" }}
    //         >
    //           <div>
    //             <img src={Viewicon} alt="icon" />
    //           </div>
    //           <div>View Objective Description</div>
    //         </Stack>
    //       </Link>
    //     </Button>
    //   </div>
    // </Typography>
    <>
      <div>
        {/* <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          p={1}
          margin="15px 0px"
          minHeight="40rem"
          border={1.5}
          borderColor="#e0e0e0"
        >
          <Stack style={{ width: "100%" }} direction="column" spacing={1}>
            <div
              style={{
                alignItems: "baseline",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  color: "#004C75",
                  fontSize: "20px",
                  marginTop: "10px",
                  marginLeft: "12px",
                }}
              >
                Levels
              </p>
              <div>
                <Button
                  style={{
                    color: "skyblue",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                  onClick={handleClickOpen}
                >
                 Icon
                </Button> */}

                <Dialog
                  style={{
                    marginTop: "110px",
                    height: "calc(100vh - 50px)",
                    // width:"66%"
                    // height:"520px"
                  }}
                  maxWidth="xl"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle
                    style={{
                      fontFamily: "regular",
                      backgroundColor: "#EBF1F5",
                      color: "#004C75",
                      fontSize: "18px",
                      padding: "0px 20px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    Add Levels
                    <p
                      style={{
                        display: "flex",
                        float: "right",
                        alignItems: "center",
                      }}
                    >
                      <img width={18} height={18} src={Closeicon} />
                    </p>
                  </DialogTitle>
                  {/* <DialogContent
                    style={{ height: "140px", padding: "10px 200px" }}
                  > */}
                  <DialogContentText
                    style={{
                      // marginLeft: "170px",
                      fontSize: "14px",
                      color: "#004C75",
                      fontFamily: "regular",
                      // height: "500px",
                      // padding: "10px 200px",
                      width: "920px",
                    }}
                  >
                    <p style={{ paddingLeft: "20px" }}>Objective Title</p>
                    <TextField
                      select
                      value="Knowledge of the job"
                      sx={{ width: "50%" }}
                      // label="Select text"
                      id="demo-simple-select-label"
                      variant="outlined"
                      size="small"
                      style={{ paddingLeft: "20px" }}
                    />
                  </DialogContentText>
                  <DialogContentText>
                    <div>
                      <Grid>
                        <Grid
                          container
                          style={{ paddingTop: "20px", paddingLeft: "20px" }}
                        >
                          <Grid
                            style={{
                              // borderRight: "1px solid lightgrey",
                              border: "1px solid lightgrey",
                              // height: "300px",
                              paddingTop: "20px",
                            }}
                            item
                            xs={2}
                          >
                            <Tabs
                              orientation="vertical"
                              variant="scrollable"
                              value={activeLevel}
                              onChange={handleChangeTabs}
                              TabIndicatorProps={{
                                style: {
                                  left: 0,
                                  borderColor: "divider",
                                },
                              }}
                            >
                              {tabValue.map((k: any) => {
                                return (
                                  <Tab
                                    // key={k}
                                    label={k}
                                    // value={k}
                                    // onClick={() => handleTabChange(k)}
                                  />
                                );
                              })}
                            </Tabs>
                          </Grid>

                          <Grid
                            style={{
                              border: "1px solid lightgrey",
                              borderLeft: "none",
                            }}
                            item
                            xs={9.8}
                          >
                            <TabPanel value={activeLevel} index={0}>
                              <div
                                style={{
                                  paddingLeft: "30px",
                                  // paddingBottom: "10px",
                                }}
                              >
                                <p style={{ color: "#004C75" }}>
                                  Level Definition
                                </p>
                                {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                <TextField
                                  // placeholder="Enter Level Definition"
                                  style={{ width: "90%" }}
                                  size="small"
                                  // multiline
                                  onChange={(e) =>
                                    setLevel_1_definition(e.target.value)
                                  }
                                  value={level_1_definition}
                                />
                              </div>

                              <div
                                style={{
                                  paddingLeft: "30px",
                                  paddingBottom: "6px",
                                }}
                              >
                                <p style={{ color: "#004C75" }}>
                                  Behavioral Objective
                                </p>
                                {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                {level_1 &&
                                  level_1.map((level: any, index: number) => {
                                    return (
                                      <>
                                        <TextField
                                          placeholder="Enter Behavioral Objective"
                                          style={{
                                            width: "90%",
                                            paddingBottom: "6px",
                                          }}
                                          size="small"
                                          multiline
                                          key={index}
                                          value={
                                            level_1[index].behavioral_objective
                                          }
                                          name="level_1"
                                          onChange={(e: any) =>
                                            handleChangeLevel1(e, index)
                                          }
                                        />

                                        {level_1.length - 1 === index && (
                                          <Tooltip title="Add">
                                            <IconButton
                                              onClick={handleLevelAdd1}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}

                                        {level_1.length !== index + 1 && (
                                          <Tooltip title="Delete">
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove1(index)
                                              }
                                            >
                                              <img src={Close} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                      </>
                                    );
                                  })}
                              </div>
                            </TabPanel>

                            <TabPanel value={activeLevel} index={1}>
                              <div
                                style={{
                                  paddingLeft: "30px",
                                  paddingBottom: "10px",
                                }}
                              >
                                <p style={{ color: "#004C75" }}>
                                  Level definition
                                </p>
                                {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                <TextField
                                  // placeholder="Enter Level Definition"
                                  style={{ width: "95%" }}
                                  size="small"
                                  // multiline
                                  onChange={(e: any) =>
                                    setLevel_2_definition(e.target.value)
                                  }
                                  value={level_2_definition}
                                />
                              </div>

                              <div style={{ paddingLeft: "30px" }}>
                                <p style={{ color: "#004C75" }}>
                                  Behavioral Objective
                                </p>
                                {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                {level_2 &&
                                  level_2.map((level: any, index: number) => {
                                    return (
                                      <>
                                        <TextField
                                          placeholder="Enter Behavioral Objective"
                                          style={{ width: "94%" }}
                                          size="small"
                                          multiline
                                          key={index}
                                          value={
                                            level_2[index].behavioral_objective
                                          }
                                          name="level_2"
                                          onChange={(e: any) =>
                                            handleChangeLevel2(e, index)
                                          }
                                        />

                                        {level_2.length - 1 === index && (
                                          <Tooltip title="Add">
                                            <IconButton
                                              onClick={handleLevelAdd2}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}

                                        {level_2.length !== index + 1 && (
                                          <Tooltip title="Delete">
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove2(index)
                                              }
                                            >
                                              <img src={Close} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                      </>
                                    );
                                  })}
                              </div>
                            </TabPanel>

                            <TabPanel value={activeLevel} index={2}>
                              <div
                                style={{
                                  paddingLeft: "30px",
                                  paddingBottom: "10px",
                                }}
                              >
                                <p style={{ color: "#004C75" }}>
                                  Level definition
                                </p>
                                {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                <TextField
                                  // placeholder="Enter Level Definition"
                                  style={{ width: "95%" }}
                                  size="small"
                                  // multiline
                                  onChange={(e: any) =>
                                    setLevel_3_definition(e.target.value)
                                  }
                                  value={level_3_definition}
                                />
                              </div>

                              <div style={{ paddingLeft: "30px" }}>
                                <p style={{ color: "#004C75" }}>
                                  Behavioral Objective
                                </p>
                                {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                {level_3 &&
                                  level_3.map((level: any, index: number) => {
                                    return (
                                      <>
                                        <TextField
                                          placeholder="Enter Behavioral Objective"
                                          style={{ width: "94%" }}
                                          size="small"
                                          multiline
                                          key={index}
                                          value={
                                            level_3[index].behavioral_objective
                                          }
                                          name="level_3"
                                          onChange={(e: any) =>
                                            handleChangeLevel3(e, index)
                                          }
                                        />

                                        {level_3.length - 1 === index && (
                                          <Tooltip title="Add">
                                            <IconButton
                                              onClick={handleLevelAdd3}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}

                                        {level_1.length !== index + 1 && (
                                          <Tooltip title="Delete">
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove3(index)
                                              }
                                            >
                                              <img src={Close} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                      </>
                                    );
                                  })}
                              </div>
                            </TabPanel>

                            <TabPanel value={activeLevel} index={3}>
                              Item Four
                              <div
                                style={{
                                  paddingLeft: "30px",
                                  paddingBottom: "10px",
                                }}
                              >
                                <p style={{ color: "#004C75" }}>
                                  Level definition
                                </p>
                                {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                <TextField
                                  // placeholder="Enter Level Definition"
                                  style={{ width: "95%" }}
                                  size="small"
                                  // multiline
                                  onChange={(e: any) =>
                                    setLevel_4_definition(e.target.value)
                                  }
                                  value={level_4_definition}
                                />
                              </div>
                              <div style={{ paddingLeft: "30px" }}>
                                <p style={{ color: "#004C75" }}>
                                  Behavioral Objective
                                </p>
                                {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                        <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                {level_4 &&
                                  level_4.map((level: any, index: number) => {
                                    return (
                                      <>
                                        <TextField
                                          placeholder="Enter Behavioral Objective"
                                          style={{ width: "94%" }}
                                          size="small"
                                          multiline
                                          key={index}
                                          value={
                                            level_4[index].behavioral_objective
                                          }
                                          name="level_4"
                                          onChange={(e: any) =>
                                            handleChangeLevel4(e, index)
                                          }
                                        />

                                        {level_4.length - 1 === index && (
                                          <Tooltip title="Add">
                                            <IconButton
                                              onClick={handleLevelAdd4}
                                            >
                                              <img src={Plus} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}

                                        {level_1.length !== index + 1 && (
                                          <Tooltip title="Delete">
                                            <IconButton
                                              onClick={() =>
                                                handleLevelRemove4(index)
                                              }
                                            >
                                              <img src={Close} alt="icon" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                      </>
                                    );
                                  })}
                              </div>
                            </TabPanel>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </DialogContentText>
                  {/* </DialogContent> */}
                  <DialogActions
                    style={{ display: "flex", justifyContent: "center" }}
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
                      onClick={handleClose}
                      autoFocus
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              {/* </div>
            </div> */}

            {/* <Scrollbar style={{ width: "auto", height: "45px" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                // spacing={2}
                // borderBottom="1px solid #e0e0e0"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "15px",
                  }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <img src={Downarrowsmall} alt="" />
                  </label>

                  <p
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      wordWrap: "break-word",
                      width: "100%",
                    }}
                  >
                    Knowlwdge of the job
                  </p>
                </div>

                <div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Tooltip title="Edit">
                      <IconButton>
                        <img
                          src={Edit}
                          alt="icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                      //onClick={() => onDelete(i._id)}
                      >
                        <img
                          src={Close}
                          alt="icon"
                          style={{ width: "16px", height: "16px" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </div>
              </Stack>
            </Scrollbar> */}

            {/* <div>
              {/* <dl>
                <dt>Coffee</dt>
                <dd>- black hot drink</dd>
                <dt>Milk</dt>
                <dd>- white cold drink</dd>
              </dl> */}

              {/* <ul style={{ paddingLeft: "55px" }}>
                <li style={{color:"black",opacity:"80%",fontSize:"13px"}}>Level 1</li>
                <li style={{color:"black",opacity:"50%",fontSize:"13px",listStyleType:"none"}}>Knowledge - Recall of basic Facts</li>
              </ul>
            </div>  */}
          {/* </Stack>
        </Box> */}
      </div>
    </>
  );
};

export default Objectiveviewbutton;
