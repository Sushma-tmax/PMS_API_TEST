/* eslint-disable */
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AlertDialog } from "..";
import Addicon from "../../assets/Images/Addicon.svg";
import { Alert } from "@mui/material";
import { Scrollbar } from "react-scrollbars-custom";

const ObjectiveType = (props: any) => {
  const {
    data,
    onSubmit,
    ObjectiveGroupData,
    loading,
    objectiveTypeData,
    onDelete,
    onEdit,
    errorType1,
    errorType2,
  } = props;
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);

  // const [state, setState] = useState(false);
  const [objectiveGroup, setObjectiveGroup] = useState("");
  const [objectiveTypeName, setObjectiveType] = useState("");
  const [edit, setEdit] = useState(false);

  const [newId, setNewId] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const [textfeildError, settextfeildError] = useState(false);
  //console.log(setName);
  const errorHandler = () => {
    if (objectiveTypeName !== "" && objectiveGroup !== "") {
      return (
        settextfeildError(false),
        setState(false),
        setHide(true),
        addButtonHandler(),
        navigate(`/objective`),
        setObjectiveGroup(""),
        setObjectiveType("")
      );
    } else {
      return settextfeildError(true), setState(true);
    }
  };

  const navigate = useNavigate();

  console.log(props, "sumb");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setObjectiveGroup(event.target.value as string);
  };

  if (loading) {
    return <div>Loading</div>;
  }

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
      return onEdit(objectiveTypeName, objectiveGroup);
    } else {
      return onSubmit(objectiveTypeName, objectiveGroup);
    }
  };

  const editHandler = (name: string, objective_group: string, id: string) => {
    setObjectiveGroup(objective_group);
    setState(true);
    setObjectiveType(name);
    setEdit(true);
    navigate(`/objective/${id}`);
    console.log("workinggg");
  };

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setName(nameAlert);
    console.log(name);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      console.log(newId);
    }
  };

  const helper = {
    color: "red",
  };

  return (
    <div>
      {errorType1 && (
        <Alert severity="error">
          Either text field must be empty or entered Objective Type already
          exists!
        </Alert>
      )}
      {errorType2 && (
        <Alert severity="error">
          Either text field must be empty or entered Objective Type already
          exists!
        </Alert>
      )}
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        p={1}
        margin="15px 0px"
        minHeight="calc(100vh - 200px)"
        height="auto"
        border={1.5}
        borderColor="#e0e0e0"
      >
        <Stack style={{ width: "100%" }} direction="column" spacing={1}>
          <div
            style={{ alignItems: "center", borderBottom: "1px solid #e0e0e0" }}
          >
            <p
              style={{
                color: "#004C75",
                fontSize: "20px",
                marginTop: "10px",
                marginLeft: "12px",
              }}
            >
              Objective Type
            </p>
          </div>
          <Scrollbar style={{ width: "auto", height: "150px" }}>
            <div>
              {objectiveTypeData &&
                objectiveTypeData.data.map((i: any) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                      borderBottom="1px solid #e0e0e0"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "15px",
                        }}
                      >
                        <p
                          style={{
                            color: "#333333",
                            fontSize: "15px",
                          }}
                        >
                          {/*<span>
                      <FiberManualRecordIcon
                        sx={{ fontSize: "small", color: "gray" }}
                      />
                    </span>*/}
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
                          ></span>
                          {i.name}
                        </p>
                      </div>

                      <div>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() =>
                              editHandler(i.name, i.objective_group._id, i._id)
                            }
                          >
                            <img src={Edit} alt="icon" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            //onClick={() => onDelete(i._id)}
                            onClick={() => handleClickOpen(i._id, i.name)}
                          >
                            <img src={Close} alt="icon" />
                          </IconButton>
                        </Tooltip>
                        <AlertDialog
                          isAlertOpen={open}
                          handleAlertOpen={() => handleClickOpen(i._id, i.name)}
                          handleAlertClose={handleClickClose}
                          handleAlertIdClose={handleClickIdClose}
                          rowAlert={i}
                        >
                          {/* All the details mapped with this type will be deleted. */}
                          Do you want to delete {name}?
                        </AlertDialog>
                      </div>
                    </Stack>
                  );
                })}
            </div>
          </Scrollbar>
          <Typography align="center">
            {hide && (
              <Button
                variant="outlined"
                style={{
                  borderColor: "#004C75",
                  textTransform: "none",
                  color: "#004C75",
                  padding: "6px 18px",
                  fontSize: "14px",
                  borderRadius: 9,
                  fontFamily: " Arial",
                  marginTop: "20px",
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
                  <div>Add Objective Type</div>
                </Stack>
              </Button>
            )}
            {state && (
              <div>
                <Box
                  sx={{
                    width: "95%",
                    //height: "calc(100vh - 470px)",
                    backgroundColor: "white",
                    marginTop: "8px",
                    marginLeft: "6px",
                    paddingBottom: "10px",
                  }}
                  boxShadow={"1px 1px 1px 2px rgba(0, 0, 0, 0.1)"}
                >
                  {/* <Scrollbar style={{ width: "100%", height: "130px" }}> */}
                  <Stack spacing={2}>
                    <form>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: "13px",
                          color: "#757272",
                        }}
                        marginTop="8px"
                      >
                        <p style={{ display: "flex", paddingLeft: "20px" }}>
                          Enter Objective Type Name 
                        </p>

                        <TextField
                          autoComplete="off"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          style={{ width: "90%" }}
                          value={objectiveTypeName}
                          inputProps={{ maxLength: 256 }}

                          onChange={(e) => setObjectiveType(e.target.value)}
                          error={!objectiveTypeName && textfeildError}
                          helperText={
                            !objectiveTypeName && textfeildError
                              ? "*Name required."
                              : " "
                          }
                        />

                        <p style={{ display: "flex", paddingLeft: "20px", }}>
                          Select Objective Group
                        </p>
                        {/* <FormControl
                        sx={{ width: "90%", marginBottom: "10px" }}
                      >
                        <InputLabel
                          style={{ marginTop: "-7px", fontSize: "15px" }}
                          id="demo-simple-select-label"
                          variant="outlined"
                        >

                          
                          Select
                        </InputLabel>

                        <Select
                          label="Select"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={objectiveGroup}
                          error={!objectiveGroup && textfeildError}
                                        
                          onChange={handleSelectChange}
                          size="small"
                        >
                          {ObjectiveGroupData.data.map(
                            (objectiveGroup: any) => {
                              return [
                                <MenuItem
                                  style={{ fontSize: "13px" }}
                                  value={objectiveGroup._id}
                                >
                                  {objectiveGroup.name}
                                </MenuItem>,
                              ];
                            }
                          )}
                        </Select>
                        <p style={helper} >*Required</p>
                      </FormControl> */}
                        <form noValidate autoComplete="off">
                          <TextField
                            select
                            sx={{ width: "90%", textAlign: "left", height:"100px"}}
                            label={objectiveGroup === "" ? "Select" : ""}
                            id="outlined-size-small"
                            size="small"
                            value={objectiveGroup}
                            InputLabelProps={{ shrink: false }}
                            variant="outlined"
                            // onChange={handleSelectChange}
                            onChange={(e: { target: { value: any } }) => {
                              setObjectiveGroup(e.target.value);
                            }}
                            error={!objectiveGroup && textfeildError}
                            helperText={
                              !objectiveGroup && textfeildError
                                ? "*Objective group required."
                                : " "
                            }
                          >
                            {ObjectiveGroupData.data.map(
                              (objectiveGroup: any) => {
                                return [
                                  <Scrollbar
                                    style={{
                                     overflowY:"hidden",
                                     float:"left",
                                     maxHeight:"100px !important"
                                    }}
                                  >
                                    <MenuItem
                                      style={{ fontSize: "13px", minHeight:"100px !important", }}
                                      value={objectiveGroup._id}
                                    >
                                      {objectiveGroup.name}
                                    </MenuItem>
                                  </Scrollbar>
                                ];
                              }
                            )}
                          </TextField>
                        </form>
                      </Typography>
                      <Typography
                        style={{ display: "flex", paddingLeft: "24px" }}
                      >
                        {/* <Grid item xs={7}> */}
                        {state && (
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
                            onClick={() => {
                              errorHandler();
                              // addButtonHandler();
                              //setState(textfeildError ? false : true);
                              // setState(false);
                              //boxHandler();
                              // setObjectiveGroup("");
                              // setObjectiveType("");
                              //navigate(`/objective`);
                            }}
                          >
                            Save
                          </Button>
                        )}

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
                          onClick={() => {
                            setState(false);
                            boxHandler();
                            setObjectiveGroup("");
                            setObjectiveType("");
                            navigate(`/objective`);
                          }}
                        >
                          Cancel
                        </Button>
                        {/* </Grid> */}
                      </Typography>
                    </form>
                  </Stack>
                  {/* </Scrollbar>   */}
                </Box>
              </div>
            )}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};

export default ObjectiveType;
