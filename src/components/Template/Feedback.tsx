import Stack from "@mui/material/Stack";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/material";
import Closeicon from "../../assets/Images/Closeicon.svg";
import React, { useEffect, useState } from "react";
import {
  useAddWeightageMutation,
  useGetFeedBackQuery,
  useGetSingleTemplateQuery,
} from "../../service";
import { useParams } from "react-router-dom";
import _ from "lodash";
import {
  Alert,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  Snackbar
} from "@mui/material";
import Scrollbar from "react-scrollbars-custom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AlertAcceptDialog from "../UI/DialogAccept";
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

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },

});
const Feedback = (props: any) => {
  const classes = useStyles();
  const { tab, setTabs, navPrompt, setnavPrompt,settriggerTheNav1 } = props;
  const { id } = useParams();
  const { data: feedbackData } = useGetFeedBackQuery("");
  const { data: singleTemplateData, isLoading: load } =
    useGetSingleTemplateQuery(id);
  console.log(singleTemplateData, "singlefeedbackData");
  const [feedback, setFeedback] = React.useState<any>([]);
  const [addWeightage, { isError, isSuccess: isSuccessFeed }] =
    useAddWeightageMutation();
  const [templateData, setTemplateData] = useState<any>([]);
  const [save1, setSave1] = useState(isSuccessFeed);
  const [hideAlert, setHideAlert] = useState(false);
  const [error, setError] = useState(false);
  const [idAlert, setidAlert] = useState(false);
//for snackbar
const [successSnackBarActive, setSuccessSnackBarActive] = useState(false);
const handleSnackBar = () =>{
  setSuccessSnackBarActive(false)
}

  const [selectAll, setSelectAll] = useState(false);

  //cancel button functionalities

const [openCancelDialog, setopenCancelDialog] = useState(false);
//  const [acceptCancel, setacceptCancel] = useState(false);
//  const [rejectCancel, setrejectCancel] = useState(false);
 const cancelButtonHandler = () =>{
  const Countcheck = feedback?.filter((j: any) => {
    return j?.isChecked === false
  })?.map((j:any)=>{
    return j
  })
  console.log(Countcheck?.length,"Countcheck")
  if(Countcheck?.length > 0){
   setopenCancelDialog(true)
  }else{
    setopenCancelDialog(false)
  }
 }
 const acceptCancelButtonHandler = () =>{
   //refetch
   //feedbackDataFetch();
   //singleTemplateDataFetch();
   settriggerTheNav1(false);
   setnavPrompt(false);
   setopenCancelDialog(false);
   setTabs(1);
 }
 const rejectCancelButtonHandler = () =>{
   setopenCancelDialog(false)
 }

  //cancel button functionalities

const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { checked } = event.target;
  settriggerTheNav1(true)
  setSelectAll(checked);
  const newFeedback = feedback.map((item: any) => {
    return { ...item, isChecked: checked };
  });
  console.log(newFeedback?.length,"newFeedback")
  setnavPrompt(true)
  setFeedback(newFeedback);
};
console.log(feedback?.length,"feedback")
console.log(selectAll,"selectAll")
  useEffect(() => {
    if (id === undefined) {
      setidAlert(true);
      setOpen2(true);
    } else {
      setidAlert(false);
    }
  }, []);

  useEffect(() => {
    if (singleTemplateData) {
      setTemplateData(() => {
        return singleTemplateData.template.feedback_questionnaire.map(
          (item: any) => {
            return {
              ...item.name,
              isChecked: item.isChecked,
            };
          }
        );
      });
    }
  }, [feedbackData, singleTemplateData]);

  useEffect(() => {
    if (singleTemplateData) {
      console.log(singleTemplateData, "singlefeedbackData");
      // setFeedback(singlefeedbackData.data)
    }
  }, [singleTemplateData]);

  useEffect(() => {
    console.log("useeffect run");
    if (templateData && feedbackData) {
      setFeedback((prev: any) => {
        const newArr = [...templateData, ...feedbackData.data];
        const newA = _.uniqBy(newArr, "_id");
        console.log(newA, "new");
        return newA;
      });
    }
  }, [feedbackData, templateData]);

  console.log(feedback, "feedback");


   // select all checkbox functionality
  const [usersSelected, setUsersSelected] = React.useState<any>(0);
  const [Total, setTotal] = React.useState<any>(0);

  useEffect(()=>{
    const Count = feedback?.filter((j: any) => {
      return j?.isChecked === true
    })?.map((j:any)=>{
      return j
    })
    
    console.log(Count?.length,feedback?.length,"Count")
    setUsersSelected(Count?.length)
    setTotal(feedback?.length)
    // if(Count?.length == feedback?.length){
    //   setnavPrompt(false)
    // }else{
    //   setnavPrompt(true)
    //   // settriggerTheNav1(true)
    // }
  },[feedback])
  const handleOnCheck = (e: any) => {
    setnavPrompt(true);
    settriggerTheNav1(true);
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const tempUser = feedback.map((other: any) => {
        return { ...other, isChecked: checked };
      });
      setFeedback(tempUser);
    } else {
      console.log(feedback, "isLoading");
      const tempUser = feedback.map((other: any) => {
        return other._id === name ? { ...other, isChecked: checked } : other;
      });
      setFeedback(tempUser);
      console.log(tempUser, "temp");
    }
  };
  const addOtherRecommendation = (data: any) => {
    console.log(data, "data");
    addWeightage({
      feedback_questionnaire: data.feedback_questionnaire,
      id: id,
    });
  };
  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

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

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };

  const selectOneError = (i: any) => {
    setSave1(false);

    if (i && i.length === 0) {
      setError(true);
      setSave1(false);
      setOpen2(true);
      setHideAlert(true);
      // hideAlertHandler();
    } else if (i && i.length > 0) {
      addOtherRecommendation({
        feedback_questionnaire: checkboxIdHandler(
          checkboxHandler(feedback)
        ),
      });
      setError(false);
     // setSave1(true);
     // setOpen2(true);
      setHideAlert(true);
      //snackbar
      setSuccessSnackBarActive(true)
      // hideAlertHandler();
      // setTabs(tab + 1);
      console.log(error, "save");
      setnavPrompt(false);
      settriggerTheNav1(false);
    } else {
      setSave1(false);
    }
    console.log(i, "setSelectedUser");
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
    setError(false);
    setSave1(false)
  };
  return (
    <>
      <div style={{ paddingLeft: "20px" }}>
        <Stack direction="row" paddingBottom="20px" justifyContent="space-between" alignItems="center">
          <div
            style={{
              fontSize: "18px",
              fontFamily: "Arial",
              color: "#3e8cb5",
            }}
          >
            {" "}
            Feedback Questionnaire{" "}
          </div>
          <div
            // style={{

            //   display: "flex",
            //   justifyContent: "space-between",
            //   width:"220px"
            // }}
          >
            {id && (
               <>
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                }}
                variant="outlined"
                onClick={() => {
                  selectOneError(checkboxIdHandler(checkboxHandler(feedback)));
                  // addOtherRecommendation({
                  //   feedback_questionnaire: checkboxIdHandler(
                  //     checkboxHandler(feedback)
                  //   ),
                  // });
                }}
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

          </div>
        </Stack>
        {/* {idAlert && (
          <Alert severity="error">
            Select Objective Type for the template!
          </Alert>
        )}
        {hideAlert && error && (
          <Alert severity="error">
            Changes have not been saved. Please select atleast 1 Feedback Questionnaire!
          </Alert>
        )}

        {hideAlert && save1 && (
          <Alert severity="info">Feedback Questionnaire details added</Alert>
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
                margin:"0px",
                padding:"30px",
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
                <IconButton  >
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
                <div>
                 Please add objective type to the template.
                </div>
              )}
              {hideAlert && error && (
                <div >
                  Changes have not been saved. Please select atleast 1 Feedback Questionnaire.
                </div>
              )}

              {hideAlert && save1 && (
                <div>Changes were successfully saved.</div>
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
                color: "#3E8CB5",
                // marginRight: "10px",
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
        <Snackbar
        className={classes.customSnackbar}
        open={successSnackBarActive}
        autoHideDuration={3000}
        onClose={handleSnackBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleSnackBar}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar>  
        </div>


        {!idAlert && (
          <TableContainer>
            <Scroll>
              <Scrollbar style={{ width: "100%", height: "calc(100vh - 263px)" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}
                        align="center"
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          textAlign: 'justify'
                        }}
                        align="right"
                      >
                        {/* <Stack
                        gap="1"                        
                        direction="row"
                        > */}
                        <div
                        style={{
                          display:"flex",
                          justifyContent:"right"
                        }}
                        >
                        <span>Action</span>
                      <span> 
                        {feedback?.length !== 0 &&
                             <input
                             name="allSelect"
            type="checkbox"
            style={{
              height: "17px",
              width: "17px",
              borderColor: "#D5D5D5",
            }}
            checked={usersSelected == Total}
            onChange={handleSelectAll}
          />
}</span> 
</div>
{/* </Stack> */}
                      </TableCell>
               
                       
                          
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      color: "#33333",
                      opacity: "80%",
                      fontFamily: "regular",
                    }}
                    align="left"
                  >
                    Select All
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      color: "#33333",
                      opacity: "80%",
                      fontFamily: "regular",
                    }}
                    align="right"
                  >
                    <input
                      name="allSelect"
                      type="checkbox"
                      checked={feedback &&
                        feedback.filter((employee: any) => employee.isChecked !== true)
                          .length < 1}
                      onChange={handleOnCheck}
                      style={{
                        height: "17px",
                        width: "17px",
                        border: "1px solid #D5D5D5",
                      }}
                    />
                  </TableCell>
    
                </TableRow> */}
                    {feedback?.filter((j: any) => j?.name != null)?.map((j: any) => {
                      return (
                        <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderColor: "#lightgrey",
                          },
                        }}
                        >
                          <TableCell
                          width="80%"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak:"break-word"
                            }}
                            align="left"
                          >
                            {j.name}
                          </TableCell>
                          <TableCell
                          width="20%"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="right"
                          >
                            <input
                              name={j._id}
                              checked={j?.isChecked || false}
                              onChange={handleOnCheck}
                              type="checkbox"
                              style={{
                                height: "17px",
                                width: "17px",
                                // border: "1px solid #D5D5D5",
                                borderColor: "#D5D5D5",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
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

export default Feedback;
