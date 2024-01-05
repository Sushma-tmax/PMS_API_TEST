import { Alert, IconButton, Stack } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import {
  Button,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
} from "@mui/material";
import Scrollbar from "react-scrollbars-custom";
import {
  useAddWeightageMutation,
  useGetSingleTemplateQuery,
} from "../../service";
import { OBJECTIVE_PREVIEW, VIEW_TEMPLATE } from "../../constants/routes/Routing";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useLocation } from "react-router-dom";
import AlertAcceptDialog from "../UI/DialogAccept";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles( ({
  button1: {
    ['@media (max-width:768px)']: 
    {
      fontSize: "13px !important",
      
    }
  },
  button: {
    ['@media (max-width:768px)']: 
    {
      fontSize: "12px !important",
      
    }
  },
  
  
}));
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },

});
const Potential = (props: any) => {
  const classes = useStyles();
  const { tab, setTabs, setnavPrompt, settriggerTheNav1, preview, setPreview } = props;
  const { id } = useParams();
  let navigate = useNavigate();
  const { data: singleTemplateData, isLoading: load, refetch:singleTemplateDataFetch } =
    useGetSingleTemplateQuery(id);
  const [addWeightage, { isError, isSuccess: isSuccessOther }] =
    useAddWeightageMutation();
  const [potential, SetPotential] = useState(false);
  console.log(potential,"potentialpotential")
  const [hideAlert, setHideAlert] = useState(false);
  const [hideAlert1, setHideAlert1] = useState(false);
  const [hideAlert2, setHideAlert2] = useState(false);
  const [Draft,setDraft ] = useState(false);
  const [disableSave,setdisableSave ] = useState(false);
  const [save1, setSave1] = useState(isSuccessOther);
  const [save1Draft, setSave1Draft] = useState(isSuccessOther);
  const [idAlert, setidAlert] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [status, setStatus] = useState("")
  const [emptyWeightageAlert, setEmptyWeightageAlert] = useState(false)
  const [emptyField, setEmptyField] = useState("")
  const [previewValue,setPreviewValue] = useState("")

 //cancel button functionalities





 const [openCancelDialog, setopenCancelDialog] = useState(false);
//  anychanges applied state becomes true
 const [cancel, setcancel] = useState(false);

 //  const [acceptCancel, setacceptCancel] = useState(false);
 //  const [rejectCancel, setrejectCancel] = useState(false);
  const cancelButtonHandler = () =>{
    if(cancel == true){
      setopenCancelDialog(true)
    }else{
    setopenCancelDialog(false)
    }
  }
  const acceptCancelButtonHandler = () =>{
    //refetch
    singleTemplateDataFetch();
    settriggerTheNav1(false);
    setnavPrompt(false);
    setopenCancelDialog(false);
    setTabs(4);
    setcancel(false);
  }
  const rejectCancelButtonHandler = () =>{
    setopenCancelDialog(false)
  }

   //cancel button functionalities

  useEffect(() => {
    if (preview && preview == "Edit") {
      setPreviewValue("Edit")
    } else if (preview && preview == "Create") {
      setPreviewValue("Create")
    }
  },[preview])

  console.log(previewValue,'previewValue')

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };
  const hideAlertHandler2 = () => {
    setTimeout(() => {
      setHideAlert2(false);
    }, 3000);
  };
  const hideAlertHandler1 = () => {
    setTimeout(() => {
      setHideAlert1(false);
    }, 3000);
  };

  const navigateHandler = () => {
    setTimeout(() => {
      navigate(`${VIEW_TEMPLATE}`);
    }, 3000);
  };

  useEffect(() => {
    if (id === undefined) {
      setidAlert(true);
      setOpen2(true);
    } else {
      setidAlert(false);
    }
  }, []);

  const addPotential = () => {
    setnavPrompt(false);
    settriggerTheNav1(false);
    // console.log(potential);
    // addWeightage({
    //   potential: potential,
    //   // status_template: "Final",
    //   id: id,
    // }).then((data: any) => {
    if (singleTemplateData) {
      let weightageData = singleTemplateData.template.weightage.objective_description.filter(
        (element: any) => {
          return element.value == undefined;
        }
      );

      if (weightageData.length > 0) {
        setEmptyWeightageAlert(true);
        setEmptyField("Weightage fields are empty.")
        setHideAlert2(true);
        setOpen2(true);
        // hideAlertHandler2();
      // }
      // else if (singleTemplateData.template.other_recommendation.length === 0) {
      //   setEmptyWeightageAlert(true);
      //   setEmptyField("Select atleast 1 Other recommnedation.")
      //   setHideAlert2(true);
      //   setOpen2(true);
        // hideAlertHandler2();
      // } else if (singleTemplateData.template.training_recommendation.length === 0) {
      //   setEmptyWeightageAlert(true);
      //   setEmptyField("Select atleast 1 Training recommnedation.")
      //   setHideAlert2(true);
      //   setOpen2(true);
        // hideAlertHandler2();
      } else if (singleTemplateData.template.feedback_questionnaire.length === 0) {
        setEmptyWeightageAlert(true);
        setEmptyField("Select atleast 1 Feedback Questionnaire.")
        setHideAlert2(true);
        setOpen2(true);
        // hideAlertHandler2();
      } else {
        addWeightage({
          potential: potential,
          status_template: "Completed",
          id: id,
        });
        setEmptyWeightageAlert(false);
        setSave1(true);
        setSave1Draft(false);
        setHideAlert(true);
        setOpen2(true);
        setDraft(true);
        // hideAlertHandler();

      }
    }
    // navigateHandler()
    // navigate(`${VIEW_TEMPLATE}`)
    // });
  };
  const addPotential1 = () => {
    // Draft after clicking save as final and clicking save as draft status as draft
    if(Draft == true){
      addWeightage({
        potential: potential,
        status_template: "Draft",
        id: id,
      });
    }else{
    setnavPrompt(false);
    settriggerTheNav1(false);
    console.log(potential);
    addWeightage({
      potential: potential,
      id: id,
    }).then((data: any) => {
      setSave1Draft(true);
      setSave1(false);
      setHideAlert1(true);
      setOpen2(true);
     
      // hideAlertHandler1();
      // navigateHandler()
      // navigate(`${VIEW_TEMPLATE}`)
    });
  }
  };

  useEffect(() => {
    if (singleTemplateData) {
      console.log(singleTemplateData, "singleTemplateData");
      SetPotential(singleTemplateData.template.potential);
      setTemplateName(singleTemplateData.template.name);
      if(singleTemplateData?.template?.template_active_status  == true){
        setdisableSave(true)
      }else{
        setdisableSave(false)
      }
    }
  }, [singleTemplateData]);

  // alert to dialog
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
    setSave1(false);
    setSave1Draft(false);
    setEmptyWeightageAlert(false)
  };

  return (
    <>
      <div style={{ paddingLeft: "20px" }}>
        <Stack
          direction="row" justifyContent="space-between" alignItems="center" paddingBottom="20px"
        >
          <div
          className={classes.button1}
            style={{
              fontSize: "18px",
              fontFamily: "Arial",
              color: "#3e8cb5",
            }}
          >
            {" "}
            Potential Level
          </div>
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}>
            {/* <div
            style={{
              display: "flex",
              justifyContent: "right",
             
            }} */}
            {/* > */}

            {id && (
              <>
                {singleTemplateData?.template?.status_template == "Completed" && (
                  <Link to = {`${OBJECTIVE_PREVIEW}/${id}`}                   
                  state={{
                    name: `${previewValue}`
                  }}>
                    <Button
                      className={classes.button}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                      }}
                      variant="outlined"
                    // onClick={addPotential}
                    >
                      Preview
                    </Button>
                </Link>

                )}
                <Button
                className={classes.button}
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                  }}
                  variant="outlined"
                  onClick={addPotential}
                >
                  Save as Final
                </Button>
                <Button
                className={classes.button}
                disabled={disableSave}
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                  }}
                  variant="outlined"
                  onClick={addPotential1}
                >
                  Save as Draft
                </Button>
                {/* <Button
             style={{
               textTransform: "none",
               fontSize: "15px",
               fontFamily: "Arial",
               borderColor: "#3E8CB5",
               color: "#3E8CB5",
               background: "transparent",
             }}
             variant="outlined"
             onClick={cancelButtonHandler}
           >
             Cancel
           </Button> */}
              </>
            )}

            {/* </div> */}
          </Stack>
        </Stack>
        {/* {idAlert && (
          <Alert severity="error">
            Select Objective Type for the template!
          </Alert>
        )}
        {hideAlert && save1 && (
          <Alert severity="info">{templateName} submitted successfully.</Alert>
        )}

        {hideAlert1 && save1Draft && (
          <Alert severity="info">{templateName} draft saved successfully.</Alert>
        )}

        {hideAlert2 && emptyWeightageAlert && (
          <Alert severity="error">{emptyField}</Alert>
        )} */}
        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            onClose={handleClose3}
            // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            style={{
              marginTop: "80px",
              height: "calc(100vh - 50px)",
            }}
            PaperProps={{
              style: {
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin: "0px",
                padding: "30px",
              },
            }}
          >
            {/* <DialogTitle
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                id="alert-dialog-title"
              >
                <IconButton>
                  <img src={Closeicon} alt="icon"
                    onClick={handleClose3} />
                </IconButton>

              </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
              }}
            >
              {idAlert && (
                <div >
                  Please add objective type to the template.
                </div>
              )}
              {hideAlert && save1 && (
                <div >The template {templateName} is successfully saved and is ready for mapping.</div>
              )}

              {hideAlert1 && save1Draft && (
                <div >The template {templateName} is saved as draft.</div>
              )}

              {hideAlert2 && emptyWeightageAlert && (
                <div>{emptyField}</div>
              )}
            </DialogContentText></DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //paddingBottom: "20px"
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "10px",
                  color: "#3E8CB5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleClose3}
              >
                Ok
              </Button>
            </DialogActions>

          </Dialog>
        </div>
        {!idAlert && (
          <TableContainer>
            <Scroll>
              <Scrollbar style={{ width: "100%", height: "calc(100vh - 350px)" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Add potential level to the template?
                      </TableCell>

                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        width="90%"
                        sx={{
                          fontSize: "14px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                        align="left"
                      >
                        Yes
                      </TableCell>
                      <TableCell
                        width="10%"
                        sx={{
                          fontSize: "12px",
                          color: "#717171",
                          fontFamily: "Arial",
                        }}
                        align="center"
                      >
                        <input
                          name="action"
                          type="radio"
                          value={"true"}
                          checked={potential}
                          style={{
                            height: "17px",
                            width: "17px",
                            borderColor: "#D5D5D5",
                            verticalAlign: "middle",
                          }}
                          onClick={(e: any) =>
                            SetPotential(e.target.value === "true" ? true : false)
                          }
                          onChange={(e: any) => {
                            setnavPrompt(true);
                            settriggerTheNav1(true);
                            setcancel(true)
                          }}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        width="10%"
                        sx={{
                          fontSize: "14px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                        align="left"
                      >
                        No
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="center"
                      >
                        <input
                          type="radio"
                          name="action"
                          value={"false"}
                          checked={!potential}
                          onClick={(e: any) =>
                            SetPotential(e.target.value === "true" ? true : false)
                          }
                          onChange={(e: any) => {
                            setnavPrompt(true);
                            settriggerTheNav1(true);
                            setcancel(true);
                          }}
                          style={{
                            height: "17px",
                            width: "17px",
                            borderColor: "#D5D5D5",
                            verticalAlign: "middle",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Scrollbar>
            </Scroll>
            <AlertAcceptDialog 
             isAlertOpen={openCancelDialog}
             handleAlertClose={rejectCancelButtonHandler}
             handleAlertIdClose={acceptCancelButtonHandler}
            >
            Do you want to discard the changes made?
          </AlertAcceptDialog>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default Potential;
