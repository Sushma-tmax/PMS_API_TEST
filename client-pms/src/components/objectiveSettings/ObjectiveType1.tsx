import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  NativeSelect,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AlertDialog } from "..";
import Addicon from "../../assets/Images/Addicon.svg";
import { Alert } from "@mui/material";
import { Paper } from "@mui/material";
import { Menu } from "@mui/material";
import AlertDialogSuccess from "../UI/DialogSuccess";


const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  
});
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
    delTypeError,
    duplicateError1,
    setDuplicateError1,
    duplicateError2,
    setDuplicateError2,
    delType,
    setDelType,
    navPrompt,
    setnavPrompt,
    open2,
    setOpen2,
    openobjType,
    handleClickobjTypeClose,
    handleClickobjTypedelClose,
    openobjTypedel
  } = props;
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  // const [duplicateError1, setDuplicateError1] = useState<any>(errorType1);
  // const [duplicateError2, setDuplicateError2] = useState(errorType2);
  // const [delType, setDelType] = useState(delTypeError)
  // const [state, setState] = useState(false);
  const [objectiveGroup, setObjectiveGroup] = useState("");
  const [objectiveType, setObjectiveType] = useState("");
  const [objectiveTypeId, setObjectiveTypeId] = useState("");
  const [edit, setEdit] = useState(false);

  const [newId, setNewId] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const [textfeildError, settextfeildError] = useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
    setEdit(false);
    setObjectiveType("");
    setObjectiveGroup("");
  };

  const handleMenuEdit = (
    name: string,
    objective_group: string,
    id: string,
    event: any
  ) => {
    setAnchorEl1(event.currentTarget);
    setObjectiveTypeId(id);
    setObjectiveType(name);
    setObjectiveGroup(objective_group);
    setEdit(true);
  };

  const handleClose = () => {
    setAnchorEl1(null);
    setEdit(false);
    settextfeildError(false);
    // setObjectiveGroup(""),
    // setObjectiveType("")
  };

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateError1(false);
      setDuplicateError2(false);
    }
  }, [textfeildError]);

  //console.log(setName);
  // const errorHandler = () => {
  //   if (objectiveType !== "" && objectiveGroup !== "") {
  //     return (
  //       settextfeildError(false),
  //       setState(false),
  //       setHide(true),

  //       addButtonHandler(),
  //       setObjectiveGroup(""),
  //       setObjectiveType("")
  //     );
  //   } else {
  //     return settextfeildError(true), setState(true);
  //   }
  // };

  useEffect(() => {
    if (errorType1 === false) {
      setDuplicateError1(false);
    } else if (errorType1 === true) {
      setDuplicateError1(true);
      setOpen2(true)
      // setTimeout(() => {
      //   setDuplicateError1(false);
      // }, 3000);
    }
  }, [errorType1]);

  useEffect(() => {
    if (errorType2 === false) {
      setDuplicateError2(false);
    } else if (errorType2 === true) {
      setDuplicateError2(true);
      setOpen2(true)
      // setTimeout(() => {
      //   setDuplicateError2(false);
      // }, 3000);
    }
  }, [errorType2]);

  useEffect(() => {
    if (delTypeError === true) {
      setDelType(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDelType(false);
      // }, 3000);
    } else if (delTypeError === false) {
      setDelType(false);
    }
  }, [delTypeError]);

  const CancelError = () => {
    setDuplicateError1(false);
    setDuplicateError2(false);
    settextfeildError(false);
  };

  const navigate = useNavigate();

  console.log(props, "sumb");

  const handleSelectChange = (event: { target: { value: any } }) => {
    setnavPrompt(true);
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

  const editHandler = (name: string, objective_group: string, id: string) => {
    // setObjectiveGroup(objective_group);
    // setState(true);
    // setObjectiveType(name);
    // setEdit(true);
    // navigate(`/objective/${id}`);
    // console.log("workinggg");

    if (objectiveType === "" || objectiveGroup === "") {
      return settextfeildError(true);
    } else {
      return (
        settextfeildError(false),
        onEdit({
          name: name,
          objective_group: objective_group,
          id: id,
        }),
        setAnchorEl1(null),
        setEdit(false)
      );
    }
    // setState(false),
    // setHide(true),

    // addButtonHandler(),
    // setObjectiveGroup(""),
    // setObjectiveType("")
  };

  const addButtonHandler = (name: string, group: string, id: string) => {
    // setState(false);
    // setAnchorEl1(null);
    // if (edit) {
    //   return onEdit(objectiveType, objectiveGroup);
    // } else {
    //   return onSubmit(objectiveType, objectiveGroup);
    // }
    if (edit) {
      editHandler(name, group, id);
    } else {
      if (name === "" || group === "") {
        return settextfeildError(true), setnavPrompt(false);
      } else {
        return (
          settextfeildError(false),
          onSubmit(objectiveType, objectiveGroup),
          handleClose(),
          setnavPrompt(false)
        );
      }
    }
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
      // setOpen2(true);
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

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
        fontSize:"14px !important",
        fontFamily:"arial !important",
        color:"#333333 !important"
      },
    },
  };

  return (
    <div>
      {/* {duplicateError1 && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error">Entered Objective Type already exists!</Alert>
      )}
      {duplicateError2 && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error">Entered Objective Type already exists!</Alert>
      )}
       {delType && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error"> The Objective Type is linked to Objective Title, cannot be deleted!! </Alert>
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
            alignItems="center"
          >
            <p
              style={{
                color: "#3E8CB5",
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Objective Type{" "}
            </p>
            <div>
              <Tooltip title="Add">
                <IconButton
                  style={{
                    backgroundColor: "#ebf2f4",
                    color: "#005477",
                    height: "38px",
                    width: "38px",
                  }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl1)}
                onClose={handleClose}
                sx={{
                  padding: "5px",
                  "& .MuiPopover-paper": {
                    padding: "10px  ",
                    border: "1px solid #3e8cb5",
                    backgroundColor: "#ffffff",
                    boxShadow:
                      "0px 0px 0px 0px rgb(0 0 0 / 10%), 0px 0px 0px 0px rgb(0 0 0 / 10%), 0px 0px 0px 1px rgb(0 0 0 / 10%)",
                  },
                }}
              >
                <Stack direction="row">
                  <Stack direction="column">
                    <p
                      style={{
                        display: "flex",
                        // paddingLeft: "15px",
                        fontSize: "12px",
                      color: "#333333",
                      opacity:"80%",
                      fontFamily:"arial"
                      }}
                    >
                      {" "}
                      Objective Type Name
                    </p>

                    <TextField
                     sx={{
                      "& .MuiInputBase-input": {
                        // color: "rgb(62 140 181 / 28%)",
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                      // autoFocus={true}
                      inputProps={{ maxLength: 256 }}
                      multiline
                      // multiline = {textfeildError ? false : true}
                      placeholder="Add"
                      autoComplete="off"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      style={{
                        width: "calc(100vh - 380px)",
                        // paddingLeft: "15px",
                      }}
                      value={objectiveType}
                      error={!objectiveType && textfeildError}
                      helperText={
                        !objectiveType && textfeildError
                          ? "*Name required."
                          : " "
                      }
                      onKeyPress={(event: any) => {
                        var key = event.keyCode || event.which;
                        if (key === 13) {
                          addButtonHandler(
                            objectiveType,
                            objectiveGroup,
                            objectiveTypeId
                          );
                          event.preventDefault()
                          // errorHandler()
                          console.log("Enter Button has been clicked");
                        }
                      }}
                      onChange={(e) => {
                        setObjectiveType(e.target.value);
                        setName(e.target.value);
                        setnavPrompt(true);
                      }}
                    ></TextField>
                  </Stack>

                  <Stack direction="column">
                    <p
                      style={{
                        display: "flex",
                        paddingLeft: "15px",
                        fontSize: "12px",
                      color: "#333333",
                      opacity:"80%",
                      fontFamily:"arial"
                      }}
                    >
                      Objective Group
                    </p>
                    <FormControl
                      sx={{
                        width: "calc(100vh - 380px)",
                        marginBottom: "10px",
                        maxHeight: "110px",
                        paddingLeft: "15px",
                      }}
                    >
                      <Select
                       sx={{
                        "& .MuiInputBase-input": {
                          // color: "rgb(62 140 181 / 28%)",
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                        },
                      }}
                      MenuProps={MenuProps}
                        size="small"
                        id="demo-simple-select"
                        displayEmpty
                        renderValue={
                          objectiveGroup !== ""
                            ? undefined
                            : () => <div style={{ color: "#aaa" }}>Select</div>
                        }
                        // style={{maxHeight:"110px"}}
                        value={objectiveGroup}
                        error={!objectiveGroup && textfeildError}
                        // helperText={
                        //   !objectiveGroup && textfeildError
                        //     ? "*Objective group required"
                        //     : " "
                        // }
                        onChange={handleSelectChange}
                        onKeyPress={(event: any) => {
                          var key = event.keyCode || event.which;
                          if (key === 13) {
                            addButtonHandler(
                              objectiveType,
                              objectiveGroup,
                              objectiveTypeId
                            );
                          
                            // errorHandler()
                            console.log("Enter Button has been clicked");
                          }
                        }}
                        // MenuProps={{ sx: { maxHeight: "30%" } }}
                        // onScroll={loadMoreItems}
                        // style={{
                        //   maxHeight:"50px",
                        //   overflowY:'scroll'
                        // }}
                        // MenuProps={{autoFocus: false}}
                        // SelectProps={{
                        //   MenuProps: {
                        //     sx: { maxHeight: '30%' }
                        //   }
                        // }}
                        // MenuProps={{
                        //   PaperProps: {
                        //     onScroll: (event: any) => {
                        //       console.log("we scroll");
                        //       // console.log(event);
                        //       // if (event.target.scrollTop === event.target.scrollHeight) {
                        //       //   setCategoryNamePagination(categoryNamePagination + 1);
                        //       // }
                        //     },
                        //   },
                        //   style: { maxHeight: 100 },
                        //   id: "id-menu",
                        //   anchorOrigin: {
                        //     vertical: "center",
                        //     horizontal: "center",
                        //   },
                        //   // getContentAnchorEl: null
                        // }}
                      >
                        {ObjectiveGroupData?.data.map((objectiveGroup: any) => {
                          return [
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "Arial",
                                color: "#333333",
                                paddingLeft: "15px",
                              
                              }}
                              value={objectiveGroup?._id}
                            >
                              {objectiveGroup?.name}
                            </MenuItem>,
                          ];
                        })}
                      </Select>
                      <FormHelperText error={!objectiveGroup && textfeildError}>
                        {!objectiveGroup && textfeildError
                          ? "*Objective group required"
                          : " "}
                      </FormHelperText>
                      {/* <p style={helper} >*Required</p> */}
                    </FormControl>
                    {/* {!objectiveGroup && textfeildError &&
                  <div style={{ width: '100%', margin: '0px', padding: '0px' }} >
                    <p style={{ fontSize: '0.75rem', color: '#d32f2f', margin: '0', marginLeft: '15px' }} >
                      *Objective group required
                    </p>
                  </div>} */}
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  sx={{  paddingTop: "0px" }}
                  spacing={2}
                >
                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      padding: "2px 9px",
background:"transparent",
                      borderColor: "#3e8cb5",
                      color: "#333333",
                    }}
                    variant="outlined"
                    onClick={() => {
                      addButtonHandler(
                        objectiveType,
                        objectiveGroup,
                        objectiveTypeId
                      );
                    }}
                  >
                    Save
                  </Button>

                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "12px",
                      fontFamily: "arial",
                      padding: "2px 9px",
                      background:"transparent",
                      borderColor: "#3e8cb5",
                      color: "#333333",
                    }}
                    variant="outlined"
                    onClick={() => {
                      handleClose();
                      CancelError();
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Popover>
            </div>
          </Stack>
          <Scroll>
          <Scrollbar style={{ width: "auto", height: "385px" }}>
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
                        {/* <span
                          style={{
                            borderRadius: "50%",
                            marginRight: "10px",
                            verticalAlign: "middle",
                            width: "6px",
                            height: "6px",
                            display: "inline-block",
                            background: "#939393",
                          }}
                        /> */}
                        <p
                          style={{
                            fontFamily: "Arial",
                              fontSize: "14px",
                              color: "#333333",
                            // wordWrap: "break-word",
                            // width: "140px",
                            wordBreak:"break-word",
                            textAlign:"left"
                            
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
                              onClick={(event) =>
                                handleMenuEdit(
                                  i.name,
                                  i.objective_group._id,
                                  i._id,
                                  event
                                )
                              }
                              // onClick={() =>
                              //   editHandler(
                              //     i.name,
                              //     i.objective_group._id,
                              //     i._id
                              //   )
                              // }
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
                          Are you sure you wish to delete this item?
                        </AlertDialog>
                      </div>
                    </Stack>
                  );
                })}
            </div>
          </Scrollbar>
          </Scroll>
        </Stack>
      </Box>
      <AlertDialogSuccess
          isAlertOpen={openobjType}
          handleAlertClose={ handleClickobjTypeClose}
        >
          Changes have been saved.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={ openobjTypedel}
          handleAlertClose={ handleClickobjTypedelClose}
        >
          {name} has been deleted successfully.
        </AlertDialogSuccess>
    </div>
  );
};

export default ObjectiveType1;
