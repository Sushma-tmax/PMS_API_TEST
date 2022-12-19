import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useAcceptReviewerMutation

} from "../../../../service";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import Closeicon from "../../../../assets/Images/Closeicon.svg";
import { IconButton } from "@mui/material";
import AlertYesNo from "../../../UI/DialogYesNo";

const Typo1 = styled("div")({
  // fontSize: '16px',
  // fontWeight: 400
  paddingRight: "5px",
});
const Footer = styled("div")({
  marginLeft: "450px",
  marginTop: "120px",
  paddingBottom: "45px",
  display: "flex",
  justifyContent: "center",
});
const AddButton = styled(Button)({
  fontSize: "15px",
  textTransform: "none",
  color: "#3e8cb5",
  fontFamily: "Arial",
  background: "transparent",
  borderColor: "#3e8cb5",
  height: "35px",
  width: "70px",
  fontWeight: 400,

  // "&:hover": {
  //     borderColor: "#004C75",
  // },
  "&:disabled": {

    color: '#a9a4a4',
    borderColor: "#a9a4a4",
  },
  "&:active": {},
  "&:focus": {},
});
// const checkboxHandler = (event: any) => {
//     console.log(event.target.value);
//   };





const FooterButoons1 = (props: any) => {
  const { setnavPrompt, navPrompt, handleChange, value1, setValue1, moveTab , setMoveTab} = props;
  // const { updateMutation, employee_id, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments } = useReviewerContext()
  //@ts-ignore
  const { updateMutation, empData, reviewerOverallFeedComments, reviewerOtherRecommendationComments, reviewerAreaImprovementComments, reviewerTrainingRecommendationComments} = useReviewerContext()

  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employee_id, 'paramsid')
  const [acceptReviewer] = useAcceptReviewerMutation();
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [zeroselect, setzeroselect] = React.useState(false);
  const [opendialog, setOpendialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);

  const [zeroselectApprove, setzeroselectApprove] = React.useState(false);
  const [errorApprove, seterrorApprove] = React.useState(false);
  const [checkedEmployeeid, setcheckedEmployeeid] = React.useState("");
  const [approved, setApproved] = React.useState(false);

  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  console.log(users, "users");
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
      setUsers(employeeData.data);
    }
  }, [employeeData]);
  const navigate = useNavigate();
  const updateRejectionCount = (count: any) => {

        if (count === 0 || count === undefined) {
            return 1;
        } else if (count === 1) {
            return 2;
        } else if (count === 2) {
            return 3;
        }
    }
    const handleDialogOpen = () => {
        setOpendialog(true);
      };
    
      const handleDialogClose = () => {
        setOpendialog(false);
        setIsOpen(false);
      };
    
      const handleDialogNo = () => {
        setOpendialog(false);
        setIsOpen(true);
      };
    const handleBackButton = () => {
        setValue1(0);
      };
      // const rejectHandler = () => {
      // const rejectfilter = users.filter((i: any) => {
      //   return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
      // });
      // const reviewerValue = rejectfilter.map(
      //   (j: any) => j.reviewer.reviewer_status
      // )[0];
     
      //   if (rejectfilter.length > 1) {
      //       setError(true);
      //       setOpenAlert(true);
      //     }else if (
      //       (rejectfilter.length === 1 && reviewerValue === "pending") ||
      //       reviewerValue === "draft"
      //     ){
      //      return ( setError(false),
      //   setOpenAlert(false),
      //   setzeroselect(false),
      //   handleDialogOpen(),
      //   setcheckedEmployeeid(() => {
      //       return rejectfilter.map((j: any) => j._id);
      //     })
      //      );
      //     }else if (rejectfilter.length === 0) {
      //       setzeroselect(true);
      //       setOpenAlert(true);
      //     }
      // }
      // const checkboxIdHandler = (res: any) => {
      //   if (res) {
      //     const check = res?.map((i: any) => {
      //       return i?._id;
      //     });
      //     console.log(check, "check");
      //     return check;
      //   }
      // };
      // const checkboxHandler = (checkbox: any) => {
      //   if (checkbox) {
      //     const res = checkbox?.filter((i: any) => {
      //       return i?.reviewerIsChecked === true && !i?.reviewerIsDisabled;
      //     });
      //     return res;
      //   }
      // };
      // const approvedSuccessfully = () => {
      //   return setApproved(true),
      //   setOpen1(true);
      // };
      // const handleApprove = () => {
      //   const rejectfilter = users.filter((i: any) => {
      //     return i.reviewerIsChecked === true && i.reviewerIsDisabled === false;
      //   });
      //   console.log(rejectfilter,"rejectfilter")
      //   if (rejectfilter.length > 1) {
      //     seterrorApprove(true);
      //     setOpenAlert(true);
      //   } else if (rejectfilter.length === 0) {
      //     setzeroselectApprove(true);
      //     setOpenAlert(true);
      //   } else {
      //     return (
      //       acceptReviewer({
      //         id: checkboxIdHandler(checkboxHandler(users)),
      //       }),
      //       approvedSuccessfully()
      //     );
      //   }
      // };
      const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
      const [allFeedMandatory2, setAllFeedMandatory2] = React.useState(false);
      const [message, setmessage] = React.useState('');
      const [message1, setmessage1] = React.useState('');

      const [disableSubmit, setdisableSubmit] = React.useState(false);
      const handleAllFeedMandatory = () => {
         setAllFeedMandatory(false);
       };
       const handleAllFeedMandatory2 = () => {
        setAllFeedMandatory2(false);
      };

  const submithandler = () => {
    setOpenYes(true);
    setmessage("Did you review the recommendations ?")
    console.log('submitted')
    // acceptReviewer({
    //   id: employee_id
    // })
    // setmessage('The performance appraisal has been submitted successfully to normalizer.')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setnavPrompt(false);
  }
// The performance appraisal has been submitted successfully to Normalizer.
  const handleAlertYes = () => {
    setOpenYes1(true);
    //  acceptReviewer({
    //   id: employee_id
    // })
    setmessage1('Are you sure you would like to accept the Performance Appraisal?')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setnavPrompt(false);
  }
  const handleAlertYes1 = () => {
    setOpenYes1(true);
     acceptReviewer({
      id: employee_id
    })
    setmessage('The performance appraisal has been submitted successfully to Normalizer.')
    setAllFeedMandatory(true);
    setdisableSubmit(true);
    setnavPrompt(false);
  }

  const handleAlertNo = () => {
    setOpenYes(false);
    console.log(value1,'valueeeeee')
    setValue1(1)
  }
  const handleAlertNo1 = () => {
    setOpenYes1(false);
    console.log(value1,'valueeeeee')
    // setValue1(1)
  }
  const handleCloseAlert = () => {
    setOpenAlert(false);
    setError(false);
    setzeroselectApprove(false);
    seterrorApprove(false);
    setzeroselect(false);
  };

      const saveHandler = () => {
        updateMutation({
            
            "reviewer.reviewer_status": 'draft',
            //  "reviewer.other_recommendation_comments": reviewerOtherRecommendationComments,
            // "reviewer.training_recommendation_comments": reviewerTrainingRecommendationComments,
            "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
            // "reviewer.area_of_improvement_comments": reviewerAreaImprovementComments,
            id: employee_id,
        })
        //setmessage('The changes are saved successfully.')
        setAllFeedMandatory2(true);
        setnavPrompt(false);
     }

  return (
    <div>
      {approved && (
        <Dialog
          open={open1}
          //   onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
        >
          <DialogContent>
            <DialogContentText
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
            >Approved successfully.</DialogContentText>
          </DialogContent>
        </Dialog>
      )}

      <AlertYesNo
        isAlertOpen={openYes}
        handleAlertClose={handleAlertNo}
        handleAlertYes={handleAlertYes}>
          {message}
      </AlertYesNo>
      
      <AlertYesNo
        isAlertOpen={openYes1}
        handleAlertClose={handleAlertNo1}
        handleAlertYes={handleAlertYes1}>
          {message1}
      </AlertYesNo>
      

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText
            style={{
              fontFamily: "Arial",
            }}
          >
            {error && (
              // <Alert severity="error">
              <div>
                Multiple employees cannot be rejected - select one employee.
              </div>
              // </Alert>
            )}
            {zeroselect && (
              // <Alert severity="error">
              <div>
                {" "}
                Atleast one employees should be selected - select one
                employee.
              </div>

              // </Alert>
            )}
            {errorApprove && (
              <div>
                Multiple employees cannot be rejected - select one employee.
              </div>
            )}
            {zeroselectApprove && (
              <div>
                {" "}
                Atleast one employees should be selected - select one
                employee.
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <div style={{ alignItems: "center" }}>
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
                background: "transparent",
                height: "35px",
                width: "70px",
                color:"#3e8cb5",
              }}
              variant="outlined"
              autoFocus
              onClick={handleCloseAlert}
            >
              Ok
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Stack justifyContent="center" spacing={2} paddingTop="30px" direction="row">
        <Button
          variant="outlined"
          style={{
            backgroundColor: "Transparent",
            fontSize: "15px",
            fontWeight: 400,
            textTransform: "none",
            color: "#3e8cb5",
            borderColor: "#3E8CB5",
            height: "35px",
            fontFamily:"arial"
          //  width: "150px"
          }}
          onClick={() => {
            // saveRecommendationsHandler();
            // handleBackButton();
            saveHandler()
          }}
        >
          {/* <Link to={`/reviewer`}> */}
          Save as Draft
          {/* </Link> */}

        </Button>
        <AddButton
          // variant="outlined"
          variant="outlined"
          disabled={disableSubmit}
          style={{
              backgroundColor: "Transparent",
              fontSize: "15px",
              fontWeight: 400,
              textTransform: "none",
              color: "#3e8cb5",
              borderColor: "#3E8CB5",
              height:"35px",
             width:"155px",
             fontFamily:"arial"
            }}
          onClick={() => {
            // handleApprove();
            // approvedSuccessfully()
            // handleClickOpen1();
            // setnavPrompt(false)
            // setnavTrigger(true)
            // return (
            //       acceptReviewer({
            //         id: checkboxIdHandler(checkboxHandler(users)),
            //       }),
            //       approvedSuccessfully()
            //     );
            submithandler()
          }}
        >
          Save and Submit 
        </AddButton>
        <Link
              to={`/reviewer`}
              state={{
                from: `${1}`
              }}
            >
        <Button
          variant="outlined"
          style={{
            backgroundColor: "Transparent",
            fontSize: "15px",
            fontWeight: 400,
            textTransform: "none",
            color: "#3e8cb5",
            borderColor: "#3E8CB5",
            height: "35px",
            width: "70px",
            fontFamily:"arial"
          }}
          // onClick={() => {
          //   // saveRecommendationsHandler();
          //   // handleBackButton();
          //   saveHandler()
          // }}
        >
          {/* <Link to={`/reviewer`}> */}
          Cancel
          {/* </Link> */}

        </Button>
        </Link>
        
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory}
          onClose={handleAllFeedMandatory}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton onClick={handleAllFeedMandatory}>
              <img src={Closeicon} alt="icon" />
            </IconButton>
          </DialogTitle> */}
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

              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // paddingBottom: "30px"
            }}
          >
            <Link
              to={`/reviewer`}
              state={{
                from: `${1}`
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
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleAllFeedMandatory}
              >
                Ok
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory2}
          onClose={handleAllFeedMandatory2}
          BackdropProps={{ style: { background: "#333333 !important",opacity:"10%" } }}
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
          // maxHeight:"30%"
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // textAlign: "center",
        },
      }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton onClick={handleAllFeedMandatory}>
              <img src={Closeicon} alt="icon" />
            </IconButton>
          </DialogTitle> */}
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily:"Arial",
                // paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY:"hidden",
              }}
            >
              
              Changes have been saved.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // paddingBottom: "30px"
            }}
          >
            
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                // marginRight: "10px",
                width: "70px",
                height: "35px",
                background: "transparent",
                color:"#3e8cb5",
              }}
              variant="outlined"
              autoFocus
              onClick={handleAllFeedMandatory2}
            >
              Ok
            </Button>
           
          </DialogActions>
        </Dialog>
      </Stack>
    </div>
  )
}
export default FooterButoons1