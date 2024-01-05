import * as React from "react";

import { useState, useEffect, useRef } from "react";

import {
  Box,
  Container,
  Paper,
  Grid,
  Menu,
  Toolbar,
  Typography,
  TextField,
  Stack,
  styled,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  DialogContentText,
  DialogActions,
  Snackbar
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";

import PAMaster from "../UI/PAMaster";
import Position from "./Position";
import Searchicon from "../../assets/Images/Searchicon.svg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Weightage from "./Weightage";
import ObjectiveTemplate from "./ObjectiveTemplate";
import ObjectiveDescription from "./ObjectiveDescription";
import ObjectiveDescriptionEdit from "./ObjectiveDescriptionEdit";
import OtherRecommendation from "./OtherRecommendation";
import TrainingRecommendation from "./TrainingRecommendation";
import TemplateObjectives from "./Objective";
import FeedBackQuestionnaire from "../PaMaster/feedBackQuestionnarie/FeedBackQuestionnaire";
import { useEditTemplateMutation, useGetSingleTemplateQuery } from "../../service";
import Potential from "./Potential";
import Feedback from "./Feedback";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AlertYesNo from "../../components/UI/DialogYesNo";
import AlertDialogSuccess from "../UI/DialogSuccess";
import AlertAcceptDialog  from "../UI/DialogAccept";
import { makeStyles } from "@mui/styles";
//prompt -------functions


const useStyles = makeStyles( ({
  box: {

    ['@media (max-width:768px)']: 
    {
      minHeight: "100px",
      overflow: "hidden",
       height: "auto",
       width:"355px"
      
    }
  },
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
    </div>
  );
}

export default function EditTemplate1(props: any) {
  const classes = useStyles();
  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (name !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [name]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const {
    weightageData,
    isLoading,
    calenderData,
    onSubmit,
    otherRecommendationData,
    trainingRecommendationData,
    saveDraft,
    createAppraisalCalenderHandler,
    createWeightage,
    addOtherRecommendation,
    addCaleander,
    isSuccessMapping,
    weightageError,
    calendarIsError,
    calendarError,
  } = props;

  const [tabValue, setTabValue] = React.useState<any>(0);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   console.log("handle change run");
  //   console.log(newValue, "index check");
  //   setTabValue(newValue);
  // };

  
  //tab navigationalert
  const [tabNum, setTabNum] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue, "newValue")
    setTabNum(newValue);
    // setValue(newValue);
    if (triggerTheNav1 === false) {
      setTabValue(newValue);
    } else {
      setTabNav(true)
    }


  };

  const [tabNav, setTabNav] = useState(false);
  const [triggerTheNav, settriggerTheNav] = useState(false);
  const [triggerTheNav1, settriggerTheNav1] = useState(false);
  console.log(triggerTheNav1, "triggerTheNav1")
  const handleAlertYes = () => {
//tabNum
    setTabNav(false)
    //setTabValue(tabNum)

  };
  console.log(tabNav,"tabNav")
  const inputRef = useRef<HTMLInputElement>(null);
const inputRefdef = useRef<HTMLInputElement>(null);
  const handleAlertNo = () => {


    //settriggerTheNav(false)
    settriggerTheNav1(false)
    setTabNav(false)
    setTabValue(tabNum);
    setnavPrompt(false)
  };
  //tab navigationalert

  const { id } = useParams();
  const { data: singleTemplateData } = useGetSingleTemplateQuery(id);
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [statusObjectiveType, setStatusObjectiveType] = useState(false);
  const [statusWeightage, setStatusWeightage] = useState(false);
  const [statusOther, setStatusOther] = useState(false);
  const [statusTraining, setStatusTraining] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(false);
  const [statusPotential, setStatusPotential] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emptyDescriptionTextError, setEmptyDescriptionTextError] = useState(false)
  const navigate = useNavigate();

  //cancel button functionalities

  const [openCancelDialog, setopenCancelDialog] = useState(false);
  const [acceptCancel, setacceptCancel] = useState(false);
  const [rejectCancel, setrejectCancel] = useState(false);
  const cancelButtonHandler = () =>{
    setopenCancelDialog(true)
  }
  const acceptCancelButtonHandler = () =>{
    //refetch
    settriggerTheNav1(false);
    setnavPrompt(false);
    setopenCancelDialog(false);
  }
  const rejectCancelButtonHandler = () =>{
    setopenCancelDialog(false)
  }

   //cancel button functionalities


  React.useEffect(() => {
    if (singleTemplateData) {
      setTitle(singleTemplateData.template.name);
      setDescription(singleTemplateData.template.description);
      // if (singleTemplateData.template.feedback_questionnaire.length > 0) {
      //   setStatusFeedback(true);
      // }
      // else setStatusFeedback(false);
      // if (
      //   singleTemplateData.template.weightage.objective_group &&
      //   singleTemplateData.template.weightage.objective_group.length > 0
      // )
      //   setStatusObjectiveType(true);
      //   else  setStatusObjectiveType(false);
      // if (
      //   singleTemplateData.template.weightage.objective_group &&
      //   singleTemplateData.template.weightage.objective_group.length > 0 &&
      //   singleTemplateData.template.weightage.objective_group[0].value
      // )
      //   setStatusWeightage(true);
      //   else  setStatusWeightage(false);
      // if (singleTemplateData.template.other_recommendation.length > 0)
      //   setStatusOther(true);
      //   else  setStatusOther(false);
      // if (singleTemplateData.template.training_recommendation.length > 0)
      //   setStatusTraining(true);
      //   else  setStatusTraining(false)
      // if (singleTemplateData.template.potential != undefined)
      //   setStatusPotential(true);
      //   else   setStatusPotential(false);
      if (singleTemplateData.template.feedback_questionnaire.length > 0) {
        setStatusFeedback(true);
      }
      else setStatusFeedback(false);
      if (
        singleTemplateData.template.weightage.objective_group &&
        singleTemplateData.template.weightage.objective_group.length > 0
      )
        setStatusObjectiveType(true);
      else setStatusObjectiveType(false);
      if (
        singleTemplateData.template.weightage.objective_group &&
        singleTemplateData.template.weightage.objective_group.length > 0 &&
        singleTemplateData.template.weightage.objective_group[0].value
      )
        setStatusWeightage(true);
      else setStatusWeightage(false);
      if (singleTemplateData.template.other_recommendation.length > 0)
        setStatusOther(true);
      else setStatusOther(false);
      if (singleTemplateData.template.training_recommendation.length > 0)
        setStatusTraining(true);
      else setStatusTraining(false)
      if (singleTemplateData.template.potential != undefined)
        setStatusPotential(true);
      else setStatusPotential(false);

    }
  }, [singleTemplateData]);


  // For Edit Template Name dialog
  const [saveEdit, setSaveEdit] = useState<any>(false);
  const [newTitle, setNewTitle] = useState("")
  const [newDescription , setNewDescription] = useState("")
  const [hideAlert, setHideAlert] = useState(false);
  const [editTemplate, { isError: isErrorEdit }] = useEditTemplateMutation();
  const [error2, setError2] = useState<any>(isErrorEdit);
  const [textfeildError, settextfeildError] = useState(false);
  const [duplicate, setDuplicate] = useState(false)
  const [preview, setPreview] = useState<any>("Edit")
 

  console.log(newTitle, title, "titletitle")
  console.log(title, "titletitl")
  useEffect(() => {
    if (isErrorEdit === true) {
      setError2(true);
      setTimeout(() => {
        setError2(false);
      }, 3000)
    } else if (isErrorEdit === false) {
      setError2(false)
    }
  }, [isErrorEdit])

  const handleDialogCloseEdit = () => {
    // setIsOpenEdit(false);
    setSaveEdit(false);
    settextfeildError(false);
    setEmptyDescriptionTextError(false)
  }

  const SaveEditTitle = (e: any) => {
    e.preventDefault();
    setnavPrompt(false);
    if (newTitle === "") {
      return settextfeildError(true);
      // setIsOpen(true)
    }
    else if (newDescription === "") {
      return setEmptyDescriptionTextError(true);
      // setIsOpen(true)
    }
    if (id) {
      return (
        settextfeildError(false),
        setEmptyDescriptionTextError(false),
        editTemplate({
          name: newTitle,
          description: newDescription,
          id: id,
        }).then((res: any) => {
          if (!res.error) {
            setSaveEdit(false);
            setTitle(newTitle);
            setDescription(newDescription);           
            setTitleChange(true);
            //   setEditAlert(true);
            //   setTimeout(() => {
            //     setEditAlert(false);
            //   }, 3000);
            //   setSaveEdit(false)
            // } else if (res.error === true) {
            //   setIsOpenEdit(true);
          } else if (res.error === true) {
            setSaveEdit(true);
          }
        })
      )

    }

  }

  const Tf3 = styled("div")({
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontFamily: "Arial",
      textTransform: "none",
      width: "300px"
    },
  });
  const Tf4 = styled("div")({
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontFamily: "Arial",
      textTransform: "none",
    },
  });


  // React.useEffect(() => {
  //   if (weightageData) {
  //     if (id) {
  //       setValue(() => {
  //         // @ts-ignore
  //         let temp = weightageData.templates.slice().sort(function (a: any, b: any) {
  //           return (a.name.localeCompare(b.name));
  //         })
  //         return temp.findIndex((item:any) => item._id === id);
  //       });
  //     } else {
  //       return navigate(`${CREATE_MAPPING}/${weightageData.templates[0]._id}`);
  //     }
  //   }
  // }, []);

  const [TitleChange, setTitleChange] = useState(false);

  const handleClickSuccess = () => {
    setTitleChange(false);

  };
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingDef, setIsEditingDef] = useState(false);
  const handleFocus = () => {
    setIsEditing(true);
  };
  const handleFocusDef = () => {
    setIsEditingDef(true);
  };
  useEffect(() => {
    if (isEditing && inputRef.current) {
      const inputElement = inputRef.current;
      inputElement.setSelectionRange(newTitle.length, newTitle.length);
      inputElement.focus();
    }
  }, [isEditing, newTitle]);
  useEffect(() => {
    if ( isEditingDef && inputRefdef.current) {
      const inputElement = inputRefdef.current;
      inputElement.setSelectionRange(newDescription.length, newDescription.length);
      inputElement.focus();
    }
  }, [isEditingDef,newDescription]);
  const handleInputChange = (e:any) => {
    setNewTitle(e.target.value);
  };
  const handledescriptionChange = (e:any) => {
    setNewDescription(e.target.value);
  };
  return (
    <>
    <div style={{
background:"#f1f1f1",
      minHeight: "100px",
          overflow: "hidden",
           height: "auto",
    }}>
      {" "}
      <PAMaster name={`Edit Template`} nav={`${VIEW_TEMPLATE}`} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          // height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          marginLeft: "25px",
          marginRight: '25px',
          padding: "20px",
          // paddingTop:"0px"
        }}
      >

        <Stack
          direction="row"
          justifyContent="left"
          alignItems="baseline"
          spacing={1}
          sx={{
            paddingBottom:"6px",
            // paddingTop: "2px",
            // background: 'lightgray',
            // width: '239px',
          }}
        >
          <span style={{ fontSize: "18px", fontFamily: "Arial", color: "grey" }}>{title}</span>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setSaveEdit(true);
                setNewTitle(title);
                setNewDescription(description)
              }}>
              <img src={Edit} alt="icon" />
            </IconButton>
          </Tooltip>
          {/* <Tf4>
                    <TextField
                     style={{
                      //marginTop: "25px",
                      width: "340px",
                      // marginLeft: "-15px",
                    }}
                    placeholder="Enter a Template Title"
                    margin="dense"
                    id="name"
                    multiline
                    inputProps={{ maxLength: "200" }}
                    // maxRows={3}
                    type="text"
                    size="small"
                    variant="outlined"
                      value={newTitle}
                      onChange={(e) => { setNewTitle(e.target.value) }}
                      error={!title && textfeildError}
                      helperText={
                        !title && textfeildError
                          ? "*Title required."
                          : " "
                      }
                  
                    />
                  </Tf4> */}
          {/* <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => { setNewTitle(e.target.value) }}
                  >
                  </input> */}
          {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                            autoFocus
                onClick={(e) => {
                  SaveEditTitle(e);
                  // errorHandler()
                }}
              // autoFocus
              >
                Save
              </Button> */}

          {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogCloseEdit}
              >
                Cancel
              </Button> */}

          <Dialog
            style={{
              marginTop: "80px",
              height: "calc(100vh - 50px)",
            }}
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
                // maxHeight:"30%"
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
              },
            }}
            // fullWidth           
            open={saveEdit}
            onClose={handleDialogCloseEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle
              style={{
                // backgroundColor: "#EBF1F5",
                display: "flex",
                justifyContent: "end",               
               
              }}
              id="alert-dialog-title"

            >       
                <IconButton>
                  <img
                    src={Closeicon}
                    onClick={handleDialogCloseEdit}
                  />
                </IconButton>           
            </DialogTitle> */}
            <DialogContent
            // sx={{padding:'0px'}}         
            >
              {/* {duplicateError && (
                          <Alert severity="error">
                            {duplicateError.data.message}
                          </Alert>
                        )} */}
              {/* {hideAlert && error1 === true && (
                  <Alert severity="error">
                    The Template already exists{" "}
                  </Alert>
                )} */}
              {error2 === true && (
                <Alert severity="error">
                 Please change the template name. The template name already exists.{" "}
                </Alert>
              )}
              <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  // paddingBottom: "12px",
                  // display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordBreak: "break-word",
                  //height: "100px",
                  // width: "300px",
                  alignItems: "center",
                }}
              >
                {/* Enter a template title */}

                {/* <Tf3>
                    <TextField
                     style={{
                      //marginTop: "25px",
                      width: "340px",
                      // marginLeft: "-15px",
                    }}
                    placeholder="Enter a Template Title"
                    margin="dense"
                    id="name"
                    multiline
                    inputProps={{ maxLength: "200" }}
                    // maxRows={3}
                    type="text"
                    size="small"
                    variant="outlined"
                      value={newTitle}
                      onChange={(e) => { setNewTitle(e.target.value) }}
                                           error={!title && textfeildError}
                      helperText={
                        !title && textfeildError
                          ? "*Title required."
                          : " "
                      }
                   
                    />
                  </Tf3> */}
                <Stack>
                  {/* <Tf3> */}
                    <TextField
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "Arial",
                        textTransform: "none",
                        width: "300px"
                      },
                    }}
                    fullWidth 
                    inputRef={inputRef}
                      size="small"
                      type="text"
                      value={newTitle}
                      placeholder="Enter a template title"
                      onChange={handleInputChange}
                     // onFocus={handleFocus}
                      // onChange={(e) => { setNewTitle(e.target.value) }}
                      multiline
                      // autoFocus
                      inputProps={{ maxLength: "200" }}
                      error={!newTitle && textfeildError}
                      helperText={
                        !newTitle && textfeildError
                          ? "*Title required."
                          : " "
                      }
                    // style={{
                    //   height:"35px",
                    //   width:"100%",
                    //   color: "#333333",
                    //  fontSize: "14px",
                    //  fontFamily: "Arial"
                    // }}
                    // onKeyPress={(event: any) => {
                    //   var key = event.keyCode || event.which;
                    //   if (key === 13) {
                    //     SaveEditTitle(event);
                    //     console.log(
                    //       "Enter Button has been clicked"
                    //     );
                    //   }
                    // }}
                    >
                    </TextField>
                    {/* </Tf3> */}
                  {/* {title && textfeildError &&
                <div
                style={{
                  color:"red",
                  fontSize: "14px",
                  fontFamily: "Arial"
                }}
                >
                *Title required.
              </div>
              } */}
                  {/* <Tf3> */}
                    <TextField
                    fullWidth 
                   // inputRef={inputRefdef}
                   sx={{
                    "& .MuiInputBase-input": {
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "Arial",
                      textTransform: "none",
                      width: "300px"
                    },
                  }}
                      size="small"
                      type="text"               
                      value={newDescription}                   
                      placeholder="Enter a template description"
                      onChange={handledescriptionChange}
                      //onFocus={handleFocusDef}
                      // onChange={(e) => { setNewDescription(e.target.value) }}
                      multiline
                      // autoFocus
                      inputProps={{ maxLength: "500" }}
                      error={!newDescription && emptyDescriptionTextError}
                      helperText={
                        !newDescription && emptyDescriptionTextError
                          ? "*Description required."
                          : " "
                      }
                    // style={{
                    //   height:"35px",
                    //   width:"100%",
                    //   color: "#333333",
                    //  fontSize: "14px",
                    //  fontFamily: "Arial"
                    // }}
                    // onKeyPress={(event: any) => {
                    //   var key = event.keyCode || event.which;
                    //   if (key === 13) {
                    //     SaveEditTitle(event);
                    //     console.log(
                    //       "Enter Button has been clicked"
                    //     );
                    //   }
                    // }}
                    >
                    </TextField>
                  {/* </Tf3> */}

                </Stack>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //paddingTop: "20px"
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                  color: "#3e8cb5"

                }}
                variant="outlined"
                autoFocus
                onClick={(e) => {
                  SaveEditTitle(e);
                  // errorHandler()
                }}
              // autoFocus
              >
                Save
              </Button>

              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                  color: "#3e8cb5"
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogCloseEdit}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            // bgcolor: "background.paper",
            display: "flex",
            // paddingTop: "15px",
          }}
        >
          <Box 
            className={classes.box}
          height="calc(100vh - 210px)" bgcolor="#fbfbfb" borderRadius="10px" paddingTop="5px">
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Vertical tabs example"
              sx={{ borderColor: "divider", textTransform: "capitalize" }}
              TabIndicatorProps={{
                style: {
                  left: 0,
                  borderColor: "divider",
                  alignItems: "start",
                },
              }}
            >
              {/* Tab for Objective Type */}
              {statusObjectiveType && tabValue !== 0 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start",fontSize: "24px" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontFamily: "Arial",
                    fontSize: "15px",
                    color: "#333333",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Objective Type"
                />
              )}
              {(!statusObjectiveType || tabValue == 0) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Objective Type"
                />
              )}
              {/* Tab for Weightage */}
              {statusWeightage && tabValue !== 1 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontSize: "15px",
                    fontFamily: "Arial",
                    color: "#333333",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Weightage"
                />
              )}
              {(!statusWeightage || tabValue == 1) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Weightage"
                />
              )}
              {/* Tab for Feedback */}
              {statusFeedback && tabValue !== 2 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    whiteSpace: "nowrap",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Feedback Questionnaire"
                />
              )}
              {(!statusFeedback || tabValue == 2) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Feedback Questionnaire"
                />
              )}
              {/* Tab for Other Recommendation */}
              {statusOther && tabValue !== 3 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    whiteSpace: "nowrap",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Further Recommendations"
                />
              )}
              {(!statusOther || tabValue == 3) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Further Recommendations"
                />
              )}
              {/* Tab for Training */}
              {statusTraining && tabValue !== 4 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    whiteSpace: "nowrap",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Training Recommendations"
                />
              )}
              {(!statusTraining || tabValue == 4) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Training Recommendations"
                />
              )}
              {/* Tab for Potential */}
              {statusPotential && tabValue != 5 && (
                <Tab
                  icon={
                    <DoneIcon sx={{ color: "#333333", alignItems: "start" }} />
                  }
                  iconPosition="start"
                  sx={{
                    fontSize: "15px",
                    fontFamily: "Arial",
                    color: "#333333",
                    textTransform: "capitalize",
                    alignItems: "center",
                    paddingLeft: "2px",
                    justifyContent: "start",
                    minHeight: '30px',
                  }}
                  label="Potential Level"
                />
              )}
              {(!statusPotential || tabValue == 5) && (
                <Tab
                  sx={{
                    fontSize: "15px",
                    color: "#333333",
                    fontFamily: "Arial",
                    textTransform: "capitalize",
                    alignItems: "start",
                    paddingLeft: "5px",
                  }}
                  label="Potential Level"
                />
              )}
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
                      <TemplateObjectives
            singleTemplateData={singleTemplateData}
              tab={tabValue}
              setTabs={setTabValue}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              saveEdit={saveEdit}
              setSaveEdit={setSaveEdit}
              settriggerTheNav1={settriggerTheNav1}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Weightage
              data={weightageData}
              singleTemplateData={singleTemplateData}
              saveDraft={createWeightage}
              tab={tabValue}
              setTabs={setTabValue}
              weightageError={weightageError}
              isSuccessWeightage={isSuccessMapping}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              settriggerTheNav1={settriggerTheNav1}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Feedback
              tab={tabValue}
              setTabs={setTabValue}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              settriggerTheNav1={settriggerTheNav1}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <OtherRecommendation
              otherData={otherRecommendationData}
              tab={tabValue}
              setTabs={setTabValue}
              singleTemplateData={singleTemplateData}
              saveDraft={addOtherRecommendation}
              isSuccessOther={isSuccessMapping}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              settriggerTheNav1={settriggerTheNav1}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={4}>
            <TrainingRecommendation
              trainingData={trainingRecommendationData}
              singleTemplateData={singleTemplateData}
              tab={tabValue}
              setTabs={setTabValue}
              saveDraft={saveDraft}
              isSuccessTraining={isSuccessMapping}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              settriggerTheNav1={settriggerTheNav1}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={5}>
            <Potential
              tab={tabValue}
              setTabs={setTabValue}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
              settriggerTheNav1={settriggerTheNav1}
              setPreview={setPreview}
              preview={preview}
            />
          </TabPanel>
        </Box>
        {/* <AlertAcceptDialog
          isAlertOpen={tabNav}
          handleAlertClose={handleAlertNo}
        handleAlertYes={handleAlertYes}
        > */}
          {/* Please save the changes before you leave the page. */}
          {/* If you leave the page, your changes will be discarded. */}
        {/* </AlertAcceptDialog> */}
        <Dialog
      open={tabNav}
    //  BackdropProps={{ style: { background: "#333333 !important", opacity: "0.1" } }}
      PaperProps={{
        style: {
          boxShadow: "none",
          borderRadius: "6px",
          maxWidth: "0px",
          minWidth: "26%",
          margin: "0px",
          padding: "30px",
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            color: "#333333",
            fontSize: "14px",
            fontFamily: "Arial",
            // paddingBottom: "12px",
            // paddingRight: "10px",
            // paddingLeft: "10px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            wordBreak: "break-word",
            // height: "100px",
            alignItems: "center",
            overflowY: "hidden",
          }}
        >
       Any changes you have made will not be saved if you leave the page.
        </DialogContentText>
      </DialogContent>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >

        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background: "transparent",
              height:"35px",
              width:"70px"
            }}
            variant="outlined"
            onClick={handleAlertNo}
            autoFocus
          >
            Ok
          </Button>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background: "transparent",
              height:"35px",
              width:"70px"
            }}
            variant="outlined"
            onClick={handleAlertYes}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
        {/* <AlertDialogSuccess
          isAlertOpen={TitleChange}
          handleAlertClose={handleClickSuccess}
        >
          Changes were successfully saved.
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={TitleChange}
        autoHideDuration={3000}
        onClose={handleClickSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickSuccess}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 
          <AlertAcceptDialog 
             isAlertOpen={openCancelDialog}
             handleAlertClose={rejectCancelButtonHandler}
             handleAlertIdClose={acceptCancelButtonHandler}
            >
            Do you want to discard the changes made?
          </AlertAcceptDialog>
      </Box>
      </div>
    </>
  );
}
