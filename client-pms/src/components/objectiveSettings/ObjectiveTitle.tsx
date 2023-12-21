import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  FormHelperText,
  Grid,
  Popover,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import Addicon from "../../assets/Images/Addicon.svg";
import Viewicon from "../../assets/Images/Viewicon.svg";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "..";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
// import { makeStyles } from '@mui/styles';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  styled,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  ADD_LEVEL,
  EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT,
} from "../../constants/routes/Routing";
import { SelectAll } from "@mui/icons-material";
import {

  useUpdateObjectiveDescriptionMutation,
  useCreateObjectiveDescriptionMutation,
} from "../../service";
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialogSuccess from "../UI/DialogSuccess";

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

// const useStyles = makeStyles(() => ({
//   formControlLabel: { fontSize: "12px",
//  "& label": { fontSize: "13px" , fontFamily: "sans-serif"} }
// }));
const FormControlLabelStyled = styled("div")({
  color: "#333333",
  opacity: "80%",
  fontSize: "12px",
  fontFamily: "Arial"

  // "& label": { fontSize: "13px", fontFamily: "sans-serif" },
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const styles = (theme: any) => ({
  '@global': {
    '*, *::after, *::before, *::hover': {
      userSelect: 'none',
      userDrag: 'none',
      cursor: 'default'
    }
  }
})
const ObjectiveTitle = (props: any) => {
  const {
    objectiveDescriptionData,
    onEdit,
    onEditActive,
    onDelete,
    onSubmit,
    objectiveTitleCreate,
    objectiveTypeData,
    titleError1,
    titleError2,
    delTitleError,
    duplicateError1,
    duplicateError2,
    setDuplicateError1,
    setDuplicateError2,
    delTitle,
    setDelTitle,
    navPrompt,
    setnavPrompt,
    open2,
    setOpen2,
    openobjTitle,
    handleClickobjTitleClose,
    handleClickobjTitledelClose,
    openobjTitledel
  } = props;
  console.log(duplicateError2, titleError2, "titleError2");

  console.log(objectiveDescriptionData, "yyyyyy");
  const [updateObjectiveDescription, { isError: errorObjectiveTitle1, isSuccess }] =
    useUpdateObjectiveDescriptionMutation();
  useEffect(() => {
    console.log(isSuccess, 'isSuccessTrue')
  }, [isSuccess])

  // const classes = useStyles();
  const navigate = useNavigate();
  const [newId, setNewId] = useState("");
  //const [duplicateError1, setDuplicateError1] = useState<any>(titleError1);
  //const [duplicateError2, setDuplicateError2] = useState(titleError2);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [textfeildError, settextfeildError] = useState(false);
  //const [delTitle, setDelTitle] = useState(delTitleError)
  const [objdescriptionId, setobjdescriptionId] = useState<any>("");
  console.log(objdescriptionId, "objdescriptionId");
  const idd = objdescriptionId;
  console.log(idd, "objdescriptionId");
  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const handleMenu3 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl3(event.currentTarget);
    setObjectiveTitleSelect("");
    setObjectiveDefinition("");
    setObjectiveTypeSelect("");
    setcheckboxSelect(false);
    setactiveCheckbox(false);
    setEdit(false);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
    setEdit(false);
    settextfeildError(false);
  };

  //validation added
  useEffect(() => {
    if (titleError2 === true) {
      setDuplicateError2(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDuplicateError2(false);
      // }, 3000);
    }
  }, [titleError2]);
  useEffect(() => {
    if (titleError1 === true) {
      setDuplicateError1(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDuplicateError1(false);
      // }, 3000);
    }
  }, [titleError1]);
  useEffect(() => {
    if (delTitleError === true) {
      setDelTitle(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDelTitle(false);
      // }, 3000);
    }
  }, [delTitleError]);
  //validation added

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateError1(false);
      setDuplicateError2(false);
    }
  }, [textfeildError]);

  const errorHandler = () => {
    if (
      objectiveTitleSelect !== "" &&
      objectiveDefinition !== "" &&
      objectiveTypeSelect != ""
    ) {
      return (
        settextfeildError(false),
        setState(false),
        setHide(true),
        addButtonHandler(),
        // navigate(`/objective`),
        setObjectiveTitleSelect(""),
        setObjectiveDefinition(""),
        setObjectiveTypeSelect(""),
        setnavPrompt(false)
      );
    } else {
      return settextfeildError(true), setState(true);
    }
  };

  // useEffect(() => {
  //   if (titleError1 === false) {
  //     setDuplicateError1(false);
  //   } else if (titleError1 === true) {
  //     setDuplicateError1(true);
  //   }
  // }, [titleError1]);

  // useEffect(() => {
  //   if (titleError2 === false) {
  //     setDuplicateError2(false);
  //   } else if (titleError2 === true) {
  //     setDuplicateError2(true);
  //   }
  // }, [titleError2]);

  useEffect(() => {
    if (delTitleError === true) {
      setDelTitle(true);
      setOpen2(true);
    } else if (delTitleError === false) {
      setDelTitle(false);
    }
  }, [delTitleError]);

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
    setnavPrompt(false);
    setState(false);
    setAnchorEl3(null);
    const idd = objdescriptionId;
    if (edit) {
      if (checkboxSelect === true) {
        setnavTriggerEdit(true)
        //navigate(`${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${objdescriptionId}`);
      }
      setAnchorEl3(null);
      // setobjdescriptionId("");
      return onEdit(
        objectiveTitleSelect,
        objectiveDefinition,
        objectiveTypeSelect,
        objectiveTitleId,
        checkboxSelect,
        activeCheckbox
      );
    } else {
      if (checkboxSelect === true) {
        //  navigate(`${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${objdescriptionId}`)
        // navigate(`${ADD_LEVEL}/ objectiveTitleSelect.trim()`)
        setnavTrigger(true);
        // navigate(`${ADD_LEVEL}`)
      }
      setAnchorEl3(null);
      onSubmit({
        description: objectiveDefinition,
        objective_type: objectiveTypeSelect,
        objectiveTitle: objectiveTitleSelect.trim(),
        isTitleChecked: checkboxSelect,
        isTitleActive: activeCheckbox,
      }).then((data: any) => {
        console.log(data);
      });
      return true;
    }
  };
  // navigate(`${ADD_LEVEL}`)

  //nav prompt
  const [navTrigger, setnavTrigger] = useState(false);
  useEffect(() => {
    if (navPrompt === false && navTrigger === true) {
      navigate(`${ADD_LEVEL}`);
    }
  }, [navTrigger]);
  const [navTriggerEdit, setnavTriggerEdit] = useState(false);
  useEffect(() => {
    if (navPrompt === false && navTriggerEdit === true) {
      navigate(`${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${objdescriptionId}`);
      setobjdescriptionId("");
    }
  }, [navTriggerEdit]);
  //nav prompt

  const editHandler = (
    title: any,
    definition: any,
    objectiveTitleItem: any,
    event: React.MouseEvent<HTMLElement>,
    id: any
  ) => {
    setAnchorEl3(event.currentTarget);
    setObjectiveTitleId(objectiveTitleItem._id);
    setObjectiveTitleSelect(title);
    setObjectiveTypeSelect(objectiveTitleItem.objective_type._id);
    setObjectiveDefinition(definition);
    setState(true);
    setEdit(true);
    setcheckboxSelect(objectiveTitleItem.isTitleChecked);
    setactiveCheckbox(objectiveTitleItem.isTitleActive)
    setobjdescriptionId(id);
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

  const handleClickIdClose = (title: any) => {
    if (newId) {
      onDelete(newId);
      // setOpen2(true);
      setOpen(false);
      console.log(newId);
    }
  };
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [edit, setEdit] = useState(false);

  const [objectiveTitleId, setObjectiveTitleId] = useState("");
  const [objectiveDefinition, setObjectiveDefinition] = useState("");
  const [objectiveTitleSelect, setObjectiveTitleSelect] = useState("");
  const [objectiveTypeSelect, setObjectiveTypeSelect] = useState("");
  console.log(props, "sumb");

  const [checkboxSelect, setcheckboxSelect] = useState(false);
  console.log(checkboxSelect, "checkbox");
  const handlecheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnavPrompt(true);
    setcheckboxSelect(event.target.checked);
  };
  //Active-status
  const [users, setUsers] = useState<any>([]);
  const [usersTrigger, setUsersTrigger] = useState<any>([]);
  useEffect(() => {
    console.log("useeffect run");
    if (objectiveDescriptionData) {
      setUsers(objectiveDescriptionData.data);
    }
  }, [objectiveDescriptionData]);
  const [activeCheckbox, setactiveCheckbox] = useState(false);
  console.log(activeCheckbox, "checkbox");
  console.log(activeCheckbox, objdescriptionId, 'ttt')
  const handleactiveCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnavPrompt(true);
    setactiveCheckbox(event.target.checked);
  };

  const [activeOuterCheckbox, setactiveOuterCheckbox] = useState(false);
  console.log(activeOuterCheckbox, "checkbox");
  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
          isChecked: i.isChecked,
        };
      });
      return check;
    }
  };
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };
  const [activeLoader, setactiveLoader] = useState(false);
  const handleactiveOuterCheckbox = (e: any) => {
    //event: React.ChangeEvent<HTMLInputElement>,id:any,active:any
    //setnavPrompt(true);
    //setactiveOuterCheckbox(event.target.checked);
    const { name, checked } = e.target;
    const tempUser = users.map((employee: any) => {
      console.log(employee, name, checked, 'tempUserUN')
      return employee._id === name
        ? { ...employee, isTitleActive: checked }
        : employee;
    });
    console.log(tempUser, 'tempUserUN')
    setUsers(tempUser);
    setactiveOuterCheckbox(checked)
    setactiveCheckbox(checked)
    setobjdescriptionId(name);
    setactiveLoader(true)
    // onEdit(
    //   checkboxIdHandler(checkboxHandler(users))
    // );
    //onEdit mutation here
    console.log(name, checked, 'ooo')
    updateObjectiveDescription({


      isTitleActive: checked,
      id: name,
    });
    setTimeout(() => {
      setactiveLoader(false)
    }, 3000);
    //  onEditActive(

    //   objectiveTitleId,

    //   activeOuterCheckbox
    // );
    // onEdit(
    //   objectiveTitleSelect,
    //   objectiveDefinition,
    //   objectiveTypeSelect,
    //   objectiveTitleId,
    //   checkboxSelect,
    //   activeCheckbox
    // );
    //setUsersTrigger(true)
  };
  // useEffect(() => {
  //   onEdit(
  //     objectiveTitleSelect,
  //     objectiveDefinition,
  //     objectiveTypeSelect,
  //     objectiveTitleId,
  //     checkboxSelect,
  //     activeCheckbox
  //   );
  //   setUsersTrigger(false)
  // }, [usersTrigger])


  //Active-status

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
        fontSize: "14px !important",
        fontFamily: "arial",
        color: "#333333"
      },
    },
  };
  return (
    <>
      {/* {duplicateError1 && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error"> Entered Objective Title already exists </Alert>
      )}

      {duplicateError2 && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error"> Entered Objective Title already exists </Alert>
      )}
      {delTitle && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error"> The Objective Title is linked to Appraisal, cannot be deleted!! </Alert>
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
            <Stack
              spacing={1}
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
                Objective Title
              </p>
              {activeLoader && <CircularProgress size={15} thickness={7} />}

            </Stack>



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
                  onClick={handleMenu3}
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl3}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl3)}
                onClose={handleClose3}
                sx={{
                  padding: "5px",
                  width: "calc(100vh - 50px)",
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
                  <div style={{ width: "50%" }}>
                    <Stack direction="column">
                      <p
                        style={{
                          display: "flex",
                          // paddingLeft: "15px",
                          fontSize: "12px",
                          color: "#333333",
                          opacity: "80%",
                          fontFamily: "arial"
                        }}
                      >
                        Objective Title
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
                        inputProps={{ maxLength: 256 }}
                        multiline
                        placeholder="Add"
                        autoComplete="off"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        style={{
                          // width: "calc(100vh - 400px)",
                          // paddingLeft: "15px",
                        }}
                        value={objectiveTitleSelect}
                        onChange={(e) => {
                          setObjectiveTitleSelect(e.target.value);
                          setnavPrompt(true);
                        }}
                        error={!objectiveTitleSelect && textfeildError}
                        helperText={
                          !objectiveTitleSelect && textfeildError
                            ? "*Title required."
                            : " "
                        }
                        onKeyPress={(event: any) => {
                          var key = event.keyCode || event.which;
                          if (key === 13) {
                            errorHandler();
                            event.preventDefault()
                            console.log("Enter Button has been clicked");
                          }
                        }}
                      ></TextField>
                    </Stack>
                  </div>
                  <div style={{ width: "50%" }}>
                    <Stack>
                      <p
                        style={{
                          display: "flex",
                          paddingLeft: "15px",
                          fontSize: "12px",
                          color: "#333333",
                          opacity: "80%",
                          fontFamily: "arial"
                        }}
                      >
                        Objective Type
                      </p>
                      <FormControl
                        style={{
                          // width: "calc(100vh - 400px)",
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
                          // label={objectiveType === "" ? "Select" : ""}
                          variant="outlined"
                          size="small"
                          value={objectiveTypeSelect}
                          displayEmpty
                          renderValue={
                            objectiveTypeSelect !== ""
                              ? undefined
                              : () => <div style={{ color: "#aaa" }}>Select</div>
                          }
                          // error={!objectiveType && textfeildError}
                          // helperText={
                          //     !objectiveType && textfeildError
                          //         ? "*Objective type required."
                          //         : " "
                          // }
                          // onChange={handleSelectChange}
                          onChange={(e: { target: { value: any } }) => {
                            setObjectiveTypeSelect(e.target.value);
                            setnavPrompt(true);
                          }}
                          error={!objectiveTypeSelect && textfeildError}
                          // helperText={
                          //   !objectiveTypeSelect && textfeildError
                          //     ? "*Objective type required."
                          //     : " "
                          // }
                          onKeyPress={(event: any) => {
                            var key = event.keyCode || event.which;
                            if (key === 13) {
                              errorHandler();
                              console.log("Enter Button has been clicked");
                            }
                          }}
                        // MenuProps={{
                        //   sx: { maxHeight: "30%" },
                        // }}
                        >
                          {objectiveTypeData &&
                            objectiveTypeData.data.map((objectiveTypes: any) => {
                              return [
                                <MenuItem
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    paddingLeft: "15px",

                                  }}
                                  value={objectiveTypes._id}
                                >
                                  {objectiveTypes.name}
                                </MenuItem>,
                              ];
                            })}
                        </Select>
                        <FormHelperText
                          error={!objectiveTypeSelect && textfeildError}
                        >
                          {!objectiveTypeSelect && textfeildError
                            ? "*Objective type required."
                            : " "}
                        </FormHelperText>
                      </FormControl>
                    </Stack>
                  </div>
                </Stack>
                {/* <div style={{marginLeft:'15px'}} >
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={checkboxSelect} onChange={handlecheckbox} />} label="Add Levels" />
                </FormGroup>
                </div> */}
                <div style={{ width: "100%" }}>
                  <Stack direction="column">
                    <p
                      style={{
                        display: "flex",
                        // paddingLeft: "15px",
                        fontSize: "12px",
                        color: "#333333",
                        opacity: "80%",
                        fontFamily: "Arial"
                      }}
                    >
                      Objective Description
                    </p>

                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          // color: "rgb(62 140 181 / 28%)",
                          fontSize: "14px",
                          textTransform: "none",
                          fontFamily: "Arial",
                          color: "#333333",
                          minHeight: "50px"
                        },
                      }}
                      multiline
                      // rows={3}
                      inputProps={{ maxLength: 512 }}
                      placeholder="Add"
                      autoComplete="off"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      style={{
                        width: "calc(100vh - 100px)",
                        // paddingLeft: "15px",
                      }}
                      value={objectiveDefinition}
                      onChange={(e) => {
                        setObjectiveDefinition(e.target.value);
                        setnavPrompt(true);
                      }}
                      error={!objectiveDefinition && textfeildError}
                      helperText={
                        !objectiveDefinition && textfeildError
                          ? "*Objective description required."
                          : " "
                      }
                      onKeyPress={(event: any) => {
                        var key = event.keyCode || event.which;
                        if (key === 13) {
                          errorHandler();
                          event.preventDefault()
                          console.log("Enter Button has been clicked");
                        }
                      }}
                    ></TextField>
                  </Stack>
                </div>
                <div >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={checkboxSelect}
                          onChange={handlecheckbox}
                        />
                      }
                      label={
                        <Typography
                        // className={classes.formControlLabel}
                        >
                          <FormControlLabelStyled>
                            Add Levels
                          </FormControlLabelStyled>
                        </Typography>
                      }
                    />
                  </FormGroup>
                </div>
                {/* <div style={{ marginLeft: "15px" }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={activeCheckbox}
                          onChange={handleactiveCheckbox}
                        />
                      }
                      label={
                        <Typography
                        // className={classes.formControlLabel}
                        >
                          <FormControlLabelStyled>
                           Set active
                          </FormControlLabelStyled>
                        </Typography>
                      }
                    />
                  </FormGroup>
                </div> */}

                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      padding: "2px 9px",
                      background: "transparent",
                      borderColor: "#3e8cb5",
                      color: "#333333",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setnavPrompt(false);
                      errorHandler().then((data: any) => {
                        console.log(data, "ddddd");
                      });
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      padding: "2px 9px",
                      background: "transparent",
                      borderColor: "#3e8cb5",
                      color: "#333333",
                    }}
                    variant="outlined"
                    onClick={() => {
                      handleClose3();
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
            <Scrollbar
              id="our-find-part"
              style={{ width: "auto", height: "385px" }}
            >
              <div>
                {users?.map((i: any, index: any) => {
                  console.log(i, "iiiiiiiii");
                  return (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      // spacing={0}
                      borderBottom="1px solid #e0e0e0"
                    // sx={{cursor:'progress !important'}}
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
                            // padding:"10px",
                            wordBreak: "break-word",
                            textAlign: "left",
                            width: "250px",
                            // background:"red"
                          }}
                        >
                          {/* <FormGroup>
                            <FormControlLabel
                              control={<Checkbox checked={objtitleSelect}
                                onChange={handlecheckbox} />}
                              key={index}
                              label={i.objectiveTitle}
                              value={i.objectiveTitle}
                              name={i.objectiveTitle}
                            />
                          </FormGroup> */}
                          {/* <div key={index}>
                            <input value={i.objectiveTitle} type="checkbox" />
                            <span>{i.objectiveTitle}</span>
                          </div> */}
                          {/* <input type='checkbox' name={i.objectiveTitle} value={i.objectiveTitle} ></input>
                          {i.objectiveTitle} */}
                          {i.objectiveTitle}
                          {/* <div
                            style={{
                              marginTop: "5px",
                              fontFamily: "Arial",
                              opacity:"80%",
                              fontSize: "12px",
                              color: "#333333",
                            }}
                          >
                            {i.description}
                          </div> */}
                        </p>
                      </div>

                      <div>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <div >
                            <FormGroup>
                              <FormControlLabel
                                sx={{ marginRight: '-14px !important', cursor: 'progress !important' }}
                                control={
                                  <FormControlLabel control={
                                    <Switch
                                      size="small"
                                      // sx={{cursor:'progress !important'}}
                                      disabled={activeLoader}
                                      //defaultChecked 
                                      // style={{styles}}
                                      name={i?._id}
                                      checked={i?.isTitleActive || false}
                                      // checked={activeCheckbox}
                                      onChange={handleactiveOuterCheckbox}
                                    //onChange={(event) => {handleactiveOuterCheckbox(event,i._id,i.isTitleActive)}}
                                    />
                                  } label="" />
                                }
                                label={
                                  <Typography
                                  // className={classes.formControlLabel}
                                  >
                                    <FormControlLabelStyled>
                                      {/* Set active */}
                                    </FormControlLabelStyled>
                                  </Typography>
                                }
                              />
                            </FormGroup>
                          </div>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={(event) =>
                                editHandler(
                                  i.objectiveTitle,
                                  i.description,
                                  i,
                                  event,
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
                            handleClickOpen(i._id, i.objective_title)
                          }
                          handleAlertClose={handleClickClose}
                          handleAlertIdClose={() =>
                            handleClickIdClose(i.objectiveTitle)
                          }
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
          </Scroll>
        </Stack>
        <AlertDialogSuccess
          isAlertOpen={openobjTitle}
          handleAlertClose={handleClickobjTitleClose}
        >
          Changes have been saved.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={openobjTitledel}
          handleAlertClose={handleClickobjTitledelClose}
        >
          {description} has been deleted successfully.
        </AlertDialogSuccess>
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

export default ObjectiveTitle;
