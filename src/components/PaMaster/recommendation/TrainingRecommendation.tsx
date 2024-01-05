/* eslint-disable */
import * as React from "react";
import Stack from "@mui/material/Stack";
import { Container, Snackbar, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MASTER_NAV, TRAINING_VIEW } from "../../../constants/routes/Routing";
import { styled } from "@mui/system";
import PAMaster from "../../UI/PAMaster";
import IconButton from "@mui/material/IconButton";

import { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DriveEtaOutlined } from "@mui/icons-material";
import Closeicon from "../../../assets/Images/Closeicon.svg"
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

//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

const Text = styled("div")({
  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
  },
});

const Text1 = styled("div")({
  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    minHeight: "100px",
  },
});

export default function TrainingRecommendation(this: any, props: any) {
  const classes = useStyles();
  const {successAlertTrigerMSG,successAlertTriger,savingData,handleCloseSnackbar, onSubmit, defaultValue, dataError, dataError1, open, handleClickClose,from  } = props;
  console.log(successAlertTriger,"successAlertTriger")
  const [duplicateError, setDuplicateError] = useState<any>(dataError);
  const [duplicateErrorEdit, setDuplicateErrorEdit] = useState<any>(dataError1);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [charErrorTitle, setCharErrorTitle] = useState<any>("");
  const [charErrorDesc, setCharErrorDesc] = useState<any>("");
  const [textfeildErrorTitle, settextfeildErrorTitle] = useState<any>("");
  const [textfeildErrorDesc, settextfeildErrorDesc] = useState<any>("");

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };
  const handleClose4 = () => {
    setOpen3(false);
  };


  useEffect(() => {
    if (defaultValue) {
      setTitle(defaultValue.data.title);
      setDescription(defaultValue.data.definition);
    }
  }, [defaultValue]);

  //console.log(setName);
  const errorHandler = () => {
    if (title === "") {
      return settextfeildErrorTitle("Enter Training Title field");
    } else if (description === "") {
      settextfeildErrorDesc("Enter Training Description field");
    }
     else {
      const removeSpace = title.trim();
      return (
        settextfeildErrorTitle(""),
        settextfeildErrorDesc(""),
        onSubmit(removeSpace, description),
        setnavPrompt(false)    
      ); 
      
    } 
  };
  // useEffect(() => {
  //   if (title != "") {
  //     settextfeildErrorTitle("");
  //     // settextfeildErrorDesc("");
      
  //   }
  // }, [title]);
  // useEffect(()=>{
  //   if(dataError === false){
  //     setOpen3(true)
  //   }else if(dataError1 === false){
  //     setOpen3(true)
  //   }
  // },[])
  useEffect(() => {
    if (title != "") {
      return settextfeildErrorTitle("");
    }
  }, [title]);

  useEffect(() => {
    if (description != "") {
      return settextfeildErrorDesc("");
    }
  }, [description]);

  useEffect(() => {
    if (dataError === true) {
      setDuplicateError(true);
      setOpen2(true)
    }
  }, [dataError]);

  useEffect(() => {
    if (dataError1 === true) {
      setDuplicateErrorEdit(true);
      setOpen2(true)
    }
  }, [dataError1]);

  useEffect(() => {
    if (title === "") {
      setDuplicateError(false);
      setDuplicateErrorEdit(false);
    }
  }, [title]);

  // useEffect(() => {

  //   if (title === "" || title.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/)) {
  //     setCharErrorTitle("");
  //     settextfeildError("");
  //     setCharErrorDesc("")

  //   }
  //   else {
  //     setCharErrorTitle("Only characters are allowed");

  //   }
  // }, [title])
  // useEffect(() => {

  //   if ((description === "" || title == "") || (title != "" && description.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/))) {

  //     setCharErrorDesc("")
  //   }
  //   else {
  //     setCharErrorDesc("Only characters are allowed");

  //   }
  // }, [description])

  const navigate = useNavigate();
  console.log(dataError, dataError1, "dataerror");
  console.log(props, "onSubmit");

  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (title !== '' || description !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [title,description]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions

  return (
    <>
      <PAMaster 
      name={from + " Training Recommendations"} 
      nav={`${TRAINING_VIEW}`}  
      secondName={"Training Recommendations"} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
        padding:"20px",
        marginLeft:"25px",
          marginRight:"25px"

          // boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          // marginTop: "15px",
        }}
      >
        {/* <div
          style={{ paddingTop: "10px", position: "absolute", width: "96.5%" }}
        >
           {duplicateError && (
            <Alert style={{
              fontFamily:"Arial",
            }}  severity="error">
              {" "}
              Entered Training Recommendation already exists!
            </Alert>
          )}
          {duplicateErrorEdit && (
            <Alert style={{
              fontFamily:"Arial",
            }}  severity="error">
              {" "}
              Entered Training Recommendation already exists!
            </Alert>
          )} 
        </div> */}
        <AlertDialogSuccess
          isAlertOpen={open}
          handleAlertClose={handleClickClose}
        >
          Changes were successfully saved.
        </AlertDialogSuccess>
        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            //  onClose={handleClose2} 
            // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            PaperProps={{
              style: {
                // borderColor:'blue',
                //border:'1px solid',
                boxShadow: "none",
                  borderRadius: "6px",
                  //marginTop: "155px",
                  maxWidth: "0px",
                  minWidth: "26%",
                  margin: "0px",
                  padding: "30px",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
              },
            }}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleClose3}  >
                <img src={Closeicon} alt="icon" />
              </IconButton>
            </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",

                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                // width :"300px",
                alignItems: "center",
                overflowY:"hidden",
              }}

            >
              <div >
                {duplicateError && (
                  <div style={{
                    fontFamily: "Arial",
                  }}>
                    {" "}
                    Entered Training Recommendation already exists.
                  </div>
                )}
                {duplicateErrorEdit && (
                  <div style={{
                    fontFamily: "Arial",
                  }} >
                    {" "}
                    Entered Training Recommendation already exists.
                  </div>
                )}
              </div>
            </DialogContentText></DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{

                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color:"#3e8cb5",
                  // marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent"
                }}
                variant="outlined"
                autoFocus
                onClick={handleClose3}
              >
                Ok
              </Button>
            </DialogActions>

          </Dialog>
          <Dialog
            open={open3}
            //  onClose={handleClose2} 
            // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            PaperProps={{
              style: {
                // borderColor:'blue',
                //border:'1px solid',
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin:"0px",
                padding:"30px",
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
              },
            }}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleClose4}  >
                <img src={Closeicon} alt="icon" />
              </IconButton>
            </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",

                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                // width :"300px",
                alignItems: "center",
              }}

            >
              <div >
              Changes were successfully saved.
              </div>
            </DialogContentText></DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{

                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "10px",
                  color:"#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent"
                }}
                variant="outlined"
                autoFocus
                onClick={handleClose4}
              >
                Ok
              </Button>
            </DialogActions>

          </Dialog>
        </div>
        {/* <Grid item xs={12}>
          <Stack spacing={1}> */}
            {/* <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              paddingTop="60px"
            >
              <p> </p>

             <Typography
                style={{
                  color: "#3E8CB5",
                  fontSize: "18px",
                  paddingLeft: "100px",
                  fontFamily: "Arial",

                  //marginRight: "-180px",
                }}
              >
                Add Training Recommendation
              </Typography> 

              <Link to={`${TRAINING_VIEW}`}>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    width: "70px",
                    height: "35px",
                  }}
                  variant="outlined"
                >
                  View
                </Button>
              </Link>
            </Stack> */}
            {/* <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            > */}
              <div>

                <Text>

                  <p style={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      multiline
                      inputProps={{ maxLength: 256 }}
                      // maxRows={4}
                      size="small"
                      id="outlined-basic"
                      // label="Training Title"
                      placeholder="Add training title"
                      autoComplete="off"
                      value={title}
                      onKeyPress={(event) => {
                        var key = event.keyCode || event.which;
                        if (key === 13) {
                          errorHandler(),
                            event.preventDefault()
                          console.log("Enter Button has been clicked");
                        }
                      }}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setnavPrompt(true);
                      }}
                      variant="outlined"
                      style={{ width: "45%", borderRadius: "5px" }}
                      helperText={textfeildErrorTitle}
                      error={textfeildErrorTitle}
                    ></TextField>
                  </p>
                </Text>
                <Text1>
                <p style={{ display: "flex", justifyContent: "center" }}>
               
                  <TextField
                    aria-label="empty textarea"
                    autoComplete="off"
                    // label="Description"
                    placeholder="Add description "
                    multiline
                    inputProps={{ maxLength: 512 }}
                    value={description}
                    onKeyPress={(event) => {
                      var key = event.keyCode || event.which;
                      if (key === 13) {
                        errorHandler(),
                          event.preventDefault()
                        console.log("Enter Button has been clicked");
                      }
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const trimmedValue = inputValue.trimStart();                     
                      setDescription(trimmedValue);
                      setnavPrompt(true);
                    }}
                    style={{ width: "45%", borderRadius: "5px" }}
                    helperText={textfeildErrorDesc}
                    error={textfeildErrorDesc}
                  ></TextField>
 </p>
                </Text1>
              
                <Stack
                   direction="row"
                   justifyContent="center"
                   alignItems="center"
                   spacing={2}
                   paddingTop="15px"
                >
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                      width: "70px",
                      height: "35px",
                    }}
                    variant="outlined"
                    disabled={successAlertTriger || savingData}
                    onClick={() => {
                      //  onSubmit(title, description);
                      errorHandler();
                    }}
                  >
                    Save
                  </Button>
                  <Link to={`${TRAINING_VIEW}`}>
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                        width: "70px",
                        height: "35px",
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              </div>
            {/* </Stack>
          </Stack>
        </Grid> */}
          <Snackbar
        className={classes.customSnackbar}
        open={successAlertTriger}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b>{successAlertTrigerMSG}</b>
        </Alert>
      </Snackbar> 
      </Box>
    </>
  );
}
