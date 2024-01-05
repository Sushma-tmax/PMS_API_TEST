/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AlertDialog } from "../..";
import Addicon from "../../../assets/Images/Addicon.svg";
import { Alert } from "@mui/material";
import { Paper } from "@mui/material";
import { Menu } from "@mui/material";

const ObjectiveType1 = (props: any) => {
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
  const [duplicateError1, setDuplicateError1] = useState<any>(errorType1);
  const [duplicateError2, setDuplicateError2] = useState(errorType2);

  // const [state, setState] = useState(false);
  const [objectiveGroup, setObjectiveGroup] = useState("");
  const [objectiveTypeName, setObjectiveType] = useState("");
  const [edit, setEdit] = useState(false);

  const [newId, setNewId] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const [textfeildError, settextfeildError] = useState(false);

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateError1(false);
      setDuplicateError2(false);
    }
  }, [textfeildError]);

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

  useEffect(() => {
    if (errorType1 === false) {
      setDuplicateError1(false);
    } else if (errorType1 === true) {
      setDuplicateError1(true);
      setTimeout(() => {
        setDuplicateError1(false);
      }, 3000);
    }
  }, [errorType1]);

  useEffect(() => {
    if (errorType2 === false) {
      setDuplicateError2(false);
    } else if (errorType2 === true) {
      setDuplicateError2(true);
      setTimeout(() => {
        setDuplicateError1(false);
      }, 3000);
    }
  }, [errorType2]);

  const CancelError = () => {
    setDuplicateError1(false);
    setDuplicateError2(false);
    settextfeildError(false);
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

  function loadMoreItems(event: any) {
    if (event.target.scrollTop === event.target.scrollHeight) {
      //user is at the end of the list so load more items
    }
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  return (
    <div>
      {duplicateError1 && (
        <Alert severity="error">Entered Objective Type already exists.</Alert>
      )}
      {duplicateError2 && (
        <Alert severity="error">Entered Objective Type already exists.</Alert>
      )}
      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
        p={1}
        margin="15px 0px"
        minHeight="40rem"
        height="auto"
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
            <Grid xs={10}>
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
            </Grid>
            <Grid xs={2}>
              {/* {hide && ( */}
                <Button
                style={{
                  color: "skyblue",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
                  onClick={() => {
                    setState(true);
                    addObjectiveHandler();
                  }}
                >
                  Icon
                </Button>
              {/* )} */}
            </Grid>
          </div>
          <Typography align="center">
            {state && (
              <div>
                <Box
                  sx={{
                    width: "100%",
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
                        <Stack direction="row">
                        <div>
                        <p style={{ display: "flex", paddingLeft: "15px" }}>
                          Enter Objective Type Name
                        </p>

                        <TextField
                          autoComplete="off"
                          id="outlined-size-small"
                          variant="outlined"
                          size="small"
                          style={{ width: "80%" }}
                          value={objectiveTypeName}
                          onChange={(e) => setObjectiveType(e.target.value)}
                          error={!objectiveTypeName && textfeildError}
                          helperText={
                            !objectiveTypeName && textfeildError
                              ? "*Name required."
                              : " "
                          }
                        />
                        </div>
                        <div>

                        <p style={{ display: "flex", paddingLeft: "15px" }}>
                          Select Objective Group
                        </p>
                        <FormControl
                          sx={{
                            width: "90%",
                            marginBottom: "10px",
                            maxHeight: "110px",
                          }}
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
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // style={{maxHeight:"110px"}}
                            value={objectiveGroup}
                            error={!objectiveGroup && textfeildError}
                            onChange={handleSelectChange}
                            // onScroll={loadMoreItems}
                            // style={{
                            //   maxHeight:"50px",
                            //   overflowY:'scroll'
                            // }}
                            // MenuProps={{autoFocus: false}}
                            MenuProps={{
                              PaperProps: {
                                onScroll: (event: any) => {
                                  console.log("we scroll");
                                  // console.log(event);
                                  // if (event.target.scrollTop === event.target.scrollHeight) {
                                  //   setCategoryNamePagination(categoryNamePagination + 1);
                                  // }
                                },
                              },
                              style: { maxHeight: 100 },
                              id: "id-menu",
                              anchorOrigin: {
                                vertical: "center",
                                horizontal: "center",
                              },
                              // getContentAnchorEl: null
                            }}
                          >
                            {ObjectiveGroupData.data.map(
                              (objectiveGroup: any) => {
                                return [
                                  <MenuItem
                                    style={{
                                      fontSize: "13px",
                                      paddingLeft: "15px",
                                    }}
                                    value={objectiveGroup._id}
                                  >
                                    {objectiveGroup.name}
                                  </MenuItem>,
                                ];
                              }
                            )}
                          </Select>
                          {/* <p style={helper} >*Required</p> */}
                        </FormControl>
                        </div>
                        </Stack>

                        {/* <form noValidate autoComplete="off">

                          <TextField
                            select

                            sx={{ width: "90%", }}
                            label={objectiveGroup === "" ? "Select" : ""}
                            id="outlined-size-small"
                            size="small"
                            value={objectiveGroup}
                            InputLabelProps={{ shrink: false }}
                            margin="normal"
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

                                  <MenuItem
                                    style={{ fontSize: "13px" }}
                                    value={objectiveGroup._id}
                                  >
                                    {objectiveGroup.name}
                                  </MenuItem>

                                ];
                              }
                            )}
                          </TextField>
                        </form> */}
                      </Typography>

                      <Typography
                        style={{ display: "flex", paddingLeft: "15px" }}
                        align="center"
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

                            CancelError();
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

          <Scrollbar style={{ width: "auto", height: "350px" }}>
            <div>
              {objectiveTypeData &&
                objectiveTypeData.data.map((i: any) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      // spacing={1}
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
                            wordWrap: "break-word",
                            width: "140px",
                          }}
                        >
                          {i.name}
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
                                editHandler(
                                  i.name,
                                  i.objective_group._id,
                                  i._id
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
                              //onClick={() => onDelete(i._id)}
                              onClick={() => handleClickOpen(i._id, i.name)}
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
                          handleAlertOpen={() => handleClickOpen(i._id, i.name)}
                          handleAlertClose={handleClickClose}
                          handleAlertIdClose={handleClickIdClose}
                          rowAlert={i}
                        >
                          All the details mapped with this type will be deleted.
                          Are you sure to delete {name}?
                        </AlertDialog>
                      </div>
                    </Stack>
                  );
                })}
            </div>
          </Scrollbar>
                </Stack>
      </Box>
    </div>
  );
};

export default ObjectiveType1;
