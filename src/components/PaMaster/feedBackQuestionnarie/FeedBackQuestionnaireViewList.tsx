import * as React from "react";
import Stack from "@mui/material/Stack";
import { Alert, Container,Snackbar,TextField } from "@mui/material";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FEEDBACK_QUESTIONNAIRE } from "../../../constants/routes/Routing";
import PAMaster from "../../UI/PAMaster";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import { AlertDialog } from "../..";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbar } from "react-scrollbars-custom";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles( ({
  questions: {
    align: "left !important",
    width: "90% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

      // @media Querry for responsive codes
    ['@media (max-width:1100px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "50% !important",
    }
  },

  actions: {
    width: "10% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

    // @media Querry for responsive codes
    ['@media (max-width:900px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "10% !important",
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

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important",
    top:"35px !important",
    right:"4px !important",
    height:"calc(100% - 34px) !important"
    },
  
});
// function createData(symbol: number, title: string, action: any) {
//   return { symbol, title, action };
// }

// const rows = [
//   createData(
//     1,
//     "PIP",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
//   createData(
//     2,
//     "Promotion",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
//   createData(
//     3,
//     "Demotion",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
//   createData(
//     4,
//     "Salary Review",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
//   createData(
//     5,
//     "Job Rotation",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
//   createData(
//     6,
//     "Disciplinary Action",
//     <>
//       {" "}
//       <EditIcon /> <CancelOutlinedIcon />{" "}
//     </>
//   ),
// ];

interface IFeedBackQuestionnaireViewListProps {
  FeedbackData: any;
  onDelete: any;
  onUpdate: any;
  error: any;
  openDeletedSuccess: any;
  displayError : any;
  handleClickCloseDeletedSuccess:any
}

const FeedBackQuestionnaireViewList: React.FC<
  IFeedBackQuestionnaireViewListProps
> = (props: IFeedBackQuestionnaireViewListProps) => {
  const classes = useStyles();
  const { FeedbackData, onDelete, onUpdate,error, handleClickCloseDeletedSuccess, openDeletedSuccess , displayError } = props;
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [hideAlert, setHideAlert] = useState(false);
  const [newName, setNewName] = useState("");
  console.log(newId, "id from modal");
  console.log(newName, "name from modal");

  const [open2, setOpen2] = useState(false);
  const [stateTrigger, setStateTrigger] = useState(false);
  console.log(stateTrigger,'stateTrigger')

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 5000);
  };

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewName(nameAlert);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      // setOpen2(true);
      console.log(newId);
      setHideAlert(true)
     setOpen2(true)
    // if (hideAlert === true){
    //     setOpen2(true)
    //   }
    //   else {
    //     setOpen2(false)
    //   }
    // setStateTrigger(true);
      
    }
  };
 
// useEffect(()=>{
//     // if(hideAlert){
//     //   setOpen2(true);
//     // }
//    if (hideAlert === false){
//     // setHideAlert(true)
//       setOpen2(false)
//     }else if(hideAlert === true){
//       setOpen2(true)
//     }
//     setStateTrigger(false)
//     // else{
//     //   setOpen2(true)
//     // }
// },[stateTrigger])
// useEffect(()=>{
//   if(setHideAlert){
//     setOpen2(true)
//   }else{
//     setOpen2(false)
//   }
// },[hideAlert])
  // const [editOtherRecommendation, setEditOtherRecommendation] = useState("");

  return (
    <>
      <PAMaster name={"Feedback Questionnaire"} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft:"25px",
          marginRight:"25px",
  
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            // height:"40px"
          }}
        >
          {/* <div style={{ width: "92%" }}>
            {FeedbackData?.data?.length === 0 ? <Alert severity="error">There is no data for Feedback Questionnaire!</Alert> : ""}
            {hideAlert && error && (
              <Alert severity="error">{newName} is used in Appraisal!!</Alert>
            )}

          </div> */}
          <div style={{ width: "50%", }}>
          <Dialog
         open={open2 && error} 
        //  BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
        //  aria-labelledby="alert-dialog-title"
        //  aria-describedby="alert-dialog-description"
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
          // paddingBottom: "12px",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          wordBreak: "break-word",
          //height: "100px",
          // width :"300px",
          alignItems: "center",
        }}
        >
        <div style={{ width: "92%" }}>
            {FeedbackData?.data?.length === 0 ? <div>There is no data for Feedback Questionnaire.</div> : ""}
            {hideAlert && error && (
              // <div >{newName} is used in the performance appraisal and cannot be deleted.</div>
              <div >{displayError?.data?.error}</div>
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
                    // marginRight: "10px",
                    color: "#3E8CB5",
                    background: "transparent",
                      width: "70px",
                    height: "35px",
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
          <h2
            style={{
              color: "#014D76",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {" "}
            {/* View Feedback Questionnaire */}
          </h2>
          <Link to={`${FEEDBACK_QUESTIONNAIRE}`}>
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
              Add
            </Button>
          </Link>
        </Box>
        {/* <TableContainer> */}
          <Scroll>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 235px)" }}>
            <Table size="small" aria-label="simple table">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor: "#eaeced" }}>
                  {/* <TableCell
                    align="left"
                    sx={{
                      fontFamily:"regular",
                      borderColor: "#F7F9FB",
                      color: "#014D76",
                      fontSize: "12px",
                    }}
                  >
                    #
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Questions
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FeedbackData &&
                  FeedbackData.data.map((row: any, index: number) => {
                    return (
                      <TableRow
                        key={row.symbol}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderColor: "lightgrey",
                          },
                        }}
                      >
                        {/* <TableCell
                          component="th"
                          scope="row"
                          align="left"
                          width="5%"
                          sx={{ fontSize: "12px", color: "#014D76", fontFamily:"regular", }}
                        >
                          {index + 1}
                        </TableCell> */}
                        <TableCell
                        className={ classes.questions }
                          align="left"
                          // width="90%"
                          sx={{
                            // fontSize: "14px",
                            // color: "#333333",
                            // fontFamily: "Arial",
                            wordBreak:"break-word"
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={ classes.actions }
                          // width="10%"
                          // sx={{
                          //   fontSize: "14px",
                          //   color: "#333333",
                          //   fontFamily: "Arial",
                          // }}
                        >
                          <>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                                onClick={() => onUpdate(row._id)}
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                onClick={() =>
                                  handleClickOpen(row._id, row.name)
                                }
                              // onClick={() => onDelete(row._id)}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <AlertDialog
                              isAlertOpen={open}
                              handleAlertOpen={() =>
                                handleClickOpen(row._id, row.name)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleClickIdClose}
                              rowAlert={row}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </>
                        </TableCell>
                        {/* <TableCell align="center"></TableCell>*/}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Scrollbar>
          </Scroll>
        {/* </TableContainer> */}
        {/* <AlertDialogSuccess
          isAlertOpen={openDeletedSuccess}
          handleAlertClose={handleClickCloseDeletedSuccess}
        >
           {newName} has been deleted successfully.
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={openDeletedSuccess}
        autoHideDuration={3000}
        onClose={handleClickCloseDeletedSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickCloseDeletedSuccess}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> {newName} has been deleted successfully.</b>
        </Alert>
      </Snackbar> 
      </Box>
    </>
  );
};

export default FeedBackQuestionnaireViewList;
