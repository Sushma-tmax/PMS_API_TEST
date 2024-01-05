import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import AddIcon from "@mui/icons-material/Add";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import { styled } from "@mui/system";
import ScrollbarThumb from "react-scrollbars-custom/dist/types/ScrollbarThumb";
import { useNavigate } from "react-router-dom";
import { Alert, fabClasses, Popover, Snackbar } from "@mui/material";

import { AlertDialog } from "../..";

import Tooltip from "@mui/material/Tooltip";
import Addicon from "../../../assets/Images/Addicon.svg";
import { OBJECTIVE } from "../../../constants/routes/Routing";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },
}));
let box = document.querySelector(".our-find-part");
console.log(box);

//let height = box.offsetTop;

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
  
});

const ObjectiveGroup1 = (props: any) => {
  const [showAddObjectiveGroup, setShowAddObjectiveGroup] = useState(false);
  const [name, setName] = useState("");
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [edit, setEdit] = useState(false);

  const [newId, setNewId] = useState("");
  const [open, setOpen] = useState(false);
  const [nname, setNname] = useState("");

  const {
    onSubmit,
    ObjectiveGroupData,
    loading,
    onDelete,
    onEdit,
    errorGroup1,
    errorGroup2,
    delGroupError,
    duplicateError1,
    setDuplicateError1,
    duplicateError2,
    setDuplicateError2,
    delGroup,
    setDelGroup,
    navPrompt,
    setnavPrompt,
    open2,
    setOpen2,
    openobjGroup,
    handleClickobjGroupClose,
    openobjGroupdel,
    handleClickobjGroupdelClose
  } = props;
  // console.log(onSubmit, "grp");
  const classes = useStyles();
  //const [duplicateError1, setDuplicateError1] = useState<any>(errorGroup1);
  //const [duplicateError2, setDuplicateError2] = useState(errorGroup2);
  const [textfeildError, settextfeildError] = useState(false);
  const [selectGroup, setSelectGroup] = useState<any>("");
  const [selectObjectiveGroupId, setSelectObjectiveGroupId] = useState<any>("");
  //const [delGroup,setDelGroup] = useState(delGroupError)
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);

  const handleMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
    setEdit(false);
    setName("");
  };

  const handleMenuEdit = (
    name: string,
    id: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl2(event.currentTarget);
    setSelectObjectiveGroupId(id);
    setSelectGroup(name);
    setEdit(true);
    // setName(name);
  };
  const handleClose = () => {
    setAnchorEl2(null);
    setnavPrompt(false)
    setEdit(false);
    settextfeildError(false);
  };
  //console.log(setName);

  // const errorHandler = () => {
  //   if (name === "") {
  //     return settextfeildError(true);
  //   } else {
  //     return settextfeildError(false), setState(false), setHide(true);
  //   }
  // };

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateError1(false);
      setDuplicateError2(false);
    }
  }, [textfeildError]);

  // useEffect(()=>{
  //   if (textfeildError && textfeildError === true) {
  //    settextfeildError(false)
  //   }
  // },[onSubmit])

  useEffect(() => {
    if (errorGroup1 === false) {
      setDuplicateError1(false);
    } else if (errorGroup1 === true) {
      setDuplicateError1(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDuplicateError1(false);
      // }, 3000);
    }
  }, [errorGroup1]);

  useEffect(() => {
    if (errorGroup2 === false) {
      setDuplicateError2(false);
    } else if (errorGroup2 === true) {
      setDuplicateError2(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDuplicateError2(false);
      // }, 3000);
    }
  }, [errorGroup2]);

  const CancelError = () => {
    setDuplicateError1(false);
    setDuplicateError2(false);
    settextfeildError(false);
  };

  useEffect(() => {
    if (delGroupError === true) {
      setDelGroup(true);
      setOpen2(true);
      // setTimeout(() => {
      //   setDelGroup(false);
      // }, 3000);
    } else if (delGroupError === false) {
      setDelGroup(false);
    }
  }, [delGroupError]);

  const navigate = useNavigate();

  if (!loading) {
    const  data  = ObjectiveGroupData;
    console.log(data);
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const editHandler = (id: string) => {
    // setState(true);
    // setHide(false);
    // setName(name);
    // setShowAddObjectiveGroup(true);
    // setEdit(true);
    // navigate(`${OBJECTIVE}/${id}`);
    if (selectGroup === "") {
      return settextfeildError(true);
    } else if (duplicateError1 === true) {
      settextfeildError(false);
    } else {
      return (
        settextfeildError(false),
        onEdit({
          name: selectGroup.trim(),
          id: id,
          // id: selectObjectiveGroupId
        }),
        setAnchorEl2(null),
        setEdit(false)
      );
    }
  };

  const addButtonHandler = (name: string, id: string) => {
    console.log(id, "idddddd");
    if (edit) {
      editHandler(id);
      setnavPrompt(false);
    } else {
      if (name === "") {
        return settextfeildError(true);
      } else if (duplicateError1 === true) {
        settextfeildError(false);
        // setAnchorEl2(true);
      } else {
        return (
          settextfeildError(false),
          setState(false),
          setHide(true),
          onSubmit(name),
          setName(""),
          handleClose(),
          setnavPrompt(false)
        );
      }
    }
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

  const handleClickOpen = (id: string, nameAlert: string) => {
    console.log(id, nameAlert, "nnnnnnn");
    setOpen(true);
    setNewId(id);
    setNname(nameAlert);
  };

  const handleClickClose = () => {
    setOpen(false);
   
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      // setOpen2(true);
      setOpen(false);
      console.log(newId, "idddd");
    }
  };
//  dialogue
// const [open2, setOpen2] = React.useState(false);



// // const handleClose2 = () => {
// //   setOpen(false);
// // };

// const handleClose3 = () => {
//   setOpen2(false);
// };

  return (
    <div>
      {/* {duplicateError1 && (
        <Alert  style={{
          fontFamily:"Arial"
        }}severity="error">Entered Objective Group already exists!</Alert>
      )}
       {duplicateError2 && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error">Entered Objective Group already exists!</Alert>
      )} */}
      {/* {delGroup && (
        <Alert style={{
          fontFamily:"Arial"
        }} severity="error"> The Objective Group is linked to Objective Type, cannot be deleted!! </Alert>
      )}  */}

      <Box
        display="flex"
        alignItems="flex-start"
        flexDirection="column"
       
        margin="15px 0px"
        minHeight="28rem"
        border={1.5}
        borderColor="#e0e0e0"
      >
        {/*<Box p={1} color="#368DC5" fontSize="25px">*/}
        {/*    Objective Group*/}
        {/*</Box>*/}

        <Stack style={{ width: "100%" }} direction="column" spacing={1}>
          <Stack
            borderBottom="1px Solid lightgray"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
           padding="5px 8px"
          >
            <p
              style={{
                color: "#3E8CB5",
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Objective Group
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
                  onClick={handleMenu2}
                  color="inherit"
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Popover
                id="menu-appbar"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl2)}
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
                <Stack direction="column">
                  <p
                    style={{
                      display: "flex",
                      // paddingLeft: "15px",
                      fontSize: "12px",
                      color: "#333333",
                      opacity: "80%",
                      fontFamily:"arial"
                    
                    }}
                  >
                    Objective Group Name
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
                    //autoFocus={true}
                    multiline
                    placeholder="Add"
                    autoComplete="off"
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    style={{
                      width: "calc(100vh - 350px)",
                      // paddingLeft: "15px",
                    }}
                    value={edit ? selectGroup : name}
                    error={!name && textfeildError}
                    helperText={
                      !name && textfeildError ? "*Name required." : " "
                    }
                    onChange={(e) => {
                      setName(e.target.value);
                      setSelectGroup(e.target.value);
                      setnavPrompt(true);
                    }}
                    onKeyPress={(event: any) => {
                      var key = event.keyCode || event.which;
                      if (key === 13) {
                        addButtonHandler(name, selectObjectiveGroupId);
                        event.preventDefault()
                        console.log("Enter Button has been clicked");
                      }
                    }}
                  // inputProps={{
                  //   onKeyPress: event => {
                  //     const { key } = event;
                  //     console.log(key);
                  //     if (key === "Enter") {
                  //      // textFieldForPasswordRef.current.focus();
                  //      buttonForSaveRef.current.click()
                  //      console.log("enter")
                  //     }
                  //   }
                  // }}
                  ></TextField>
                </Stack>
                <Stack direction="row"  spacing={2}>
                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "12px",
                      fontFamily: "Arial",
                      padding: "2px 9px",
                      borderColor: "#3e8cb5",
                      color: "#333333",
                      background:"transparent",
                    }}
                    variant="outlined"
                    // buttonRef={buttonForSaveRef}
                    onClick={() => {
                      addButtonHandler(name, selectObjectiveGroupId);
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
              {/* {hide && (  */}
              <div id="our-find-part">
                {ObjectiveGroupData?.data &&
                  ObjectiveGroupData?.data?.map((i: any) => {
                    console.log(i, "iiii");
                    return (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        // spacing={2}
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
                                width: "5px",
                                height: "5px",
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
                              // width: "100%",
                              wordBreak:"break-word",
                              textAlign:"left"
                            }}
                          >
                            {i?.name}
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
                                  handleMenuEdit(i.name, i._id, event)
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
                            handleAlertOpen={() =>
                              handleClickOpen(i._id, i.name)
                            }
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
              {/* )}  */}
            </Scrollbar>
          </Scroll>
        </Stack>
      </Box>
      {/* <AlertDialogSuccess
          isAlertOpen={openobjGroup}
          handleAlertClose={handleClickobjGroupClose}
        >
         Changes were successfully saved.
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={openobjGroup}
        autoHideDuration={3000}
        onClose={handleClickobjGroupClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickobjGroupClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 
      <Snackbar
        className={classes.customSnackbar}
        open={openobjGroupdel}
        autoHideDuration={3000}
        onClose={handleClickobjGroupdelClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickobjGroupdelClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b>{nname} has been deleted successfully.</b>
        </Alert>
      </Snackbar> 
        {/* <AlertDialogSuccess
          isAlertOpen={openobjGroupdel}
          handleAlertClose={handleClickobjGroupdelClose}
        >
          {nname} has been deleted successfully.
        </AlertDialogSuccess> */}
    </div>
  );
};

export default ObjectiveGroup1;
