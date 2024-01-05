import React, { useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import {
  ADD_OBJECTIVE_DESCRIPTION,
  ADD_LEVEL,
  EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT,
  EDIT_OBJECTIVE_DESCRIPTION,
  VIEW_ALL,
  VIEW_OBJECTIVE_DESCRIPTION,
} from "../../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import Addicon from "../../../assets/Images/Addicon.svg";
import Viewicon from "../../../assets/Images/Viewicon.svg";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "../..";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Viewall from "../../objective_old/Viewall";
//var h = window.innerHeight;
//console.log(h)

//const window {
// width: window.innerWidth,
// height: window.innerHeight,
//}

let box = document.querySelector(".our-find-part");
console.log(`height of ${box}`);
//let height = box.offsetTop;

//setTimeout(() => {
// let height = document.getElementById('objectiveDescription')!.offsetHeight;
//console.log(`new height is ${height}`)
//}, 5000);

const ObjectiveLevels = (props: any) => {
  const {
    objectiveTitleData,
    objectiveDescriptionData,
    onEdit,
    onDelete,
    objectiveTitleCreate,
    titleError1,
    titleError2,
  } = props;

  const navigate = useNavigate();
  const [newId, setNewId] = useState("");
  const [duplicateError1, setDuplicateError1] = useState<any>(titleError1);
  const [duplicateError2, setDuplicateError2] = useState(titleError2);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [textfeildError, settextfeildError] = useState(false);

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateError1(false);
      setDuplicateError2(false);
    }
  }, [textfeildError]);

  const errorHandler = () => {
    if (objectiveTitle !== "" && objectiveDefinition !== "") {
      return (
        settextfeildError(false),
        setState(false),
        setHide(true),
        addButtonHandler(),
        navigate(`/objective`),
        setObjectiveTitle(""),
        setObjectiveDefinition("")
      );
    } else {
      return settextfeildError(true), setState(true);
    }
  };

  useEffect(() => {
    if (titleError1 === false) {
      setDuplicateError1(false);
    } else if (titleError1 === true) {
      setDuplicateError1(true);
    }
  }, [titleError1]);

  useEffect(() => {
    if (titleError2 === false) {
      setDuplicateError2(false);
    } else if (titleError2 === true) {
      setDuplicateError2(true);
    }
  }, [titleError2]);

  const CancelError = () => {
    setDuplicateError1(false);
    setDuplicateError2(false);
    settextfeildError(false);
  };

  const addObjectiveHandler = () => {
    console.log("run");
    setState(true);
    setHide(false);
  };

  const boxHandler = () => {
    setState(false);
    setHide(true);
  };

  const addButtonHandler = () => {
    setState(false);
    if (edit) {
      return onEdit(objectiveTitle, objectiveDefinition);
    } else {
      return objectiveTitleCreate({
        objective_title: objectiveTitle,
        objective_definition: objectiveDefinition,
      });
    }
  };

  const editHandler = (title: any, definition: any, objectiveId: any) => {
    setObjectiveTitle(title);
    setObjectiveDefinition(definition);
    setState(true);
    setEdit(true);
    navigate(`/objective/${objectiveId}`);
  };

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setDescription(nameAlert);
    console.log(description);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    console.log(newId, "iddddddddddd");
    if (newId) {
      onDelete({
        level_1: [],
        level_2: [],
        level_3: [],
        level_4: [],
        newId,
      });
      setOpen(false);
      console.log(newId);
    }
  };
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [edit, setEdit] = useState(false);

  const [objectiveTitle, setObjectiveTitle] = useState("");
  const [objectiveDefinition, setObjectiveDefinition] = useState("");

  console.log(props, "sumb");

  return (
    <>
      {/* {duplicateError1 && (
        <Alert severity="error"> Entered Objective Title already exists </Alert>
      )}

      {duplicateError2 && (
        <Alert severity="error"> Entered Objective Title already exists </Alert>
      )} */}
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        p={1}
        margin="15px 0px"
        minHeight="28rem"
        height="auto"
        border={1.5}
        borderColor="#e0e0e0"
      >
        <Stack style={{ width: "100%" }} direction="column" spacing={1}>
          <Stack
            borderBottom="1px Solid lightgray"
            direction="row"
            justifyContent="space-between"
          >
            <p
              style={{
                color: "#005477",
              }}
            >
              Objective Level
            </p>
            <IconButton
              style={{
                backgroundColor: "#ebf2f4",

                color: "#005477",
              }}
              onClick={() => navigate(`${ADD_LEVEL}`)}
            >
              <AddIcon />
            </IconButton>
          </Stack>
          <Scrollbar
            id="our-find-part"
            style={{ width: "auto", height: "350px" }}
          >
            <div>
              {objectiveDescriptionData &&
                objectiveDescriptionData.data
                  .filter(
                    (i: any) =>
                      i.level_1.level_definition != undefined ||
                      i.level_2.level_definition != undefined ||
                      i.level_3.level_definition != undefined ||
                      i.level_4.level_definition != undefined
                  )
                  .map((i: any) => {
                    console.log(i, "iiiiiiiii");
                    return (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        // spacing={0}
                        borderBottom="1px solid #e0e0e0"
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "15px",
                          }}
                        >
                          <span
                            style={{
                              borderRadius: "50%",
                              marginRight: "10px",
                              verticalAlign: "middle",
                              width: "6px",
                              height: "6px",
                              display: "inline-block",
                              background: "#939393",
                            }}
                          />
                          <p
                            style={{
                              color: "#333333",
                              fontSize: "14px",
                              // padding:"10px",
                              wordWrap: "break-word",
                              width: "100%",
                              // background:"red"
                            }}
                          >
                            {i.level_1 && i.level_1.level_definition && (
                              <span
                                style={{
                                  marginTop: "4px",
                                }}
                              >
                                L1 :{i.level_1.level_definition}
                                <br />
                              </span>
                            )}
                            {i.level_2 && i.level_2.level_definition && (
                              <span style={{
                                marginTop: "4px",
                              }}>
                                L2 :{i.level_2.level_definition}
                                <br />
                              </span>
                            )}
                            {i.level_3 && i.level_3.level_definition && (
                              <span style={{
                                marginTop: "4px",
                              }}>
                                L3 :{i.level_3.level_definition}
                                <br />
                              </span>
                            )}
                            {i.level_4 && i.level_4.level_definition && (
                              <span style={{
                                marginTop: "4px",
                              }}>
                                L4 :{i.level_4.level_definition}
                                <br />
                              </span>
                            )}
                          </p>
                        </div>

                        <div>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${i._id}`
                                  )
                                }
                              >
                                <img
                                  src={Edit}
                                  alt="icon"
                                  style={{ width: "16px", height: "16px" }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() =>
                                  handleClickOpen(i._id, i.objectiveTitle)
                                }
                              >
                                <img
                                  src={Close}
                                  alt="icon"
                                  style={{ width: "16px", height: "16px" }}
                                />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                          <AlertDialog
                            isAlertOpen={open}
                            handleAlertOpen={() =>
                              handleClickOpen(i._id, i.objectiveTitle)
                            }
                            handleAlertClose={handleClickClose}
                            handleAlertIdClose={handleClickIdClose}
                            rowAlert={i}
                          >
                            {" "}
                            Are you sure you wish to delete this item?
                          </AlertDialog>
                        </div>
                      </Stack>
                    );
                  })}
            </div>
          </Scrollbar>
        </Stack>

        {/*{objectiveDescriptionData && objectiveDescriptionData.data.map((i: any) => {*/}
        {/*    return (*/}
        {/*        <Box p={1} color="black" fontSize="18px">*/}
        {/*            <span>  <FiberManualRecordIcon sx={{fontSize: "small", color: "gray"}}/> </span>*/}
        {/*            {i.description}*/}

        {/*            <IconButton>*/}
        {/*                < EditTwoTone fontSize="small"/>*/}
        {/*            </IconButton>*/}

        {/*            <IconButton>*/}
        {/*                <CancelOutlinedIcon fontSize="small"/>*/}
        {/*            </IconButton>*/}
        {/*        </Box>*/}

        {/*    )*/}
        {/*})}*/}

        {/*<Box p={1} bgcolor="background.paper" color="black" fontSize="18px">*/}
        {/*    <span>  <FiberManualRecordIcon sx={{fontSize: "small", color: "gray"}}/> </span>*/}
        {/*   */}
        {/*    <IconButton>*/}
        {/*        < EditTwoTone fontSize="small"/>*/}
        {/*    </IconButton>*/}

        {/*    <IconButton>*/}
        {/*        <CancelOutlinedIcon fontSize="small"/>*/}
        {/*    </IconButton>*/}
        {/*</Box>*/}

        {/*<Stack spacing={3}>*/}
        {/*    <Typography align="center">*/}
        {/*        <Button variant="outlined"*/}
        {/*                style={{*/}
        {/*                    borderColor: "#185f9e",*/}
        {/*                    textTransform: "none",*/}
        {/*                    color: "#185f9e",*/}
        {/*                    padding: "6px 8px",*/}
        {/*                    fontSize: "14px",*/}
        {/*                    width: "230px",*/}
        {/*                    borderRadius: 9,*/}
        {/*                    fontFamily: " Arial"*/}
        {/*                }}*/}
        {/*        >*/}
        {/*            <Link to={`${ADD_OBJECTIVE_DESCRIPTION}`}>*/}
        {/*                &#10011; Add objective description*/}
        {/*            </Link>*/}

        {/*        </Button>*/}
        {/*    </Typography>*/}
        {/*    <Typography align="center">*/}
        {/*        <Button variant="outlined"*/}
        {/*                style={{*/}
        {/*                    borderColor: "#185f9e",*/}
        {/*                    textTransform: "none",*/}
        {/*                    color: "#185f9e",*/}
        {/*                    padding: "6px 8px",*/}
        {/*                    fontSize: "14px",*/}
        {/*                    width: "230px",*/}
        {/*                    borderRadius: 9,*/}
        {/*                    fontFamily: " Arial"*/}
        {/*                }}*/}
        {/*        >*/}
        {/*            <Link to={`${VIEW_OBJECTIVE_DESCRIPTION}`}> &#128065; View Objective Description</Link>*/}

        {/*        </Button>*/}
        {/*    </Typography>*/}
        {/*</Stack>*/}
        {/* <Typography align="center">
        <div>
          <Button
            variant="outlined"
            style={{
              borderColor: "#004C75",
              textTransform: "none",
              color: "#004C75",
              padding: "6px 8px",
              fontSize: "14px",
              width: "230px",
              borderRadius: 9,
              fontFamily: " Arial",
              margin: "20px",
              marginTop: "25px",
            }}
          >
            <Link to={`${ADD_OBJECTIVE_DESCRIPTION}`}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ fontFamily: "regular" }}
              >
                <div>
                  <img src={Addicon} alt="icon" />
                </div>
                <div>
                  Add Objective Description
                </div>
              </Stack>
            </Link>
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "#004C75",
              textTransform: "none",
              color: "#004C75",
              padding: "6px 8px",
              fontSize: "14px",
              width: "230px",
              borderRadius: 9,
              fontFamily: " Arial",
            }}
          >
            <Link to={`${VIEW_OBJECTIVE_DESCRIPTION}`}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ fontFamily: "regular" }}
              >
                <div>
                  <img src={Viewicon} alt="icon" />
                </div>
                <div>View Objective Description</div>
              </Stack>
            </Link>
          </Button>
        </div>
      </Typography> */}
        {/* <Typography align="center">
          {hide && (
            <Button
              variant="outlined"
              style={{
                borderColor: "#004C75",
                textTransform: "none",
                color: "#004C75",
                padding: "3px 15px",
                fontSize: "12px",
                borderRadius: 9,
                fontFamily: " Arial",
                marginTop: "26px",
                marginLeft: "60px",
              }}
              onClick={() => {
                setState(true);
                addObjectiveHandler();
              }}
            >
              <Stack
                style={{ fontFamily: "regular" }}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <div>
                  <img src={Addicon} alt="icon" />
                </div>
                <div>Add Objective Title</div>
              </Stack>
            </Button>
          )} */}
      </Box>
    </>
  );
};

export default ObjectiveLevels;
