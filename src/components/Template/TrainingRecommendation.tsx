import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Closeicon from "../../assets/Images/Closeicon.svg";
import {
  Button,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  IconButton,
  Snackbar
} from "@mui/material";
import _ from "lodash";
import Alert from "@mui/material/Alert";
import {
  useAddWeightageMutation,
  useGetSingleTemplateQuery,
  useGetTrainingRecommendationQuery,
} from "../../service";
import { useParams } from "react-router-dom";
import Scrollbar from "react-scrollbars-custom";
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
const TrainingRecommendation = (props: any) => {
  const classes = useStyles();
  const { tab, setTabs, setnavPrompt, navPrompt, settriggerTheNav1 } = props;
  console.log(navPrompt, "setnavPrompt");
  const { id } = useParams();
  // const id = '62b2eaa250b50c443ef9759a'
  const [users, setUsers] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const { data: trainingData, refetch: trainingDataFetch } = useGetTrainingRecommendationQuery("");
  const { data: singleTemplateData, isLoading: load, refetch: singleTemplateDataFetch } =
    useGetSingleTemplateQuery(id);
  const [addWeightage, { isError, isSuccess: isSuccessTraining }] =
    useAddWeightageMutation();
  const [save1, setSave1] = useState(isSuccessTraining);

  console.log(users, "users");
 //for snackbar
 const [successSnackBarActive, setSuccessSnackBarActive, ] = useState(false);
 const handleSnackBar = () =>{
  setSuccessSnackBarActive(false)
}
  //cancel button functionalities

  const [openCancelDialog, setopenCancelDialog] = useState(false);
  //  const [acceptCancel, setacceptCancel] = useState(false);
  //  const [rejectCancel, setrejectCancel] = useState(false);
  const cancelButtonHandler = () => {
    const Countcheck = users?.filter((j: any) => {
      return j?.isChecked === false
    })?.map((j: any) => {
      return j
    })
    console.log(Countcheck?.length,"Countcheck")
    if(Countcheck?.length > 0){
    setopenCancelDialog(true)
    }
  }
  const acceptCancelButtonHandler = () => {
    //refetch
    singleTemplateDataFetch();
    trainingDataFetch();
    settriggerTheNav1(false);
    setnavPrompt(false);
    setopenCancelDialog(false);
    setTabs(3);
  }
  const rejectCancelButtonHandler = () => {
    setopenCancelDialog(false)
  }

  //cancel button functionalities

  const saveDraft = (data: any) => {
    addWeightage({
      training_recommendation: data.training_recommendation,
      id,
    });
  };

  useEffect(() => {
    if (singleTemplateData) {
      setTemplateData(() => {
        return singleTemplateData.template.training_recommendation.map(
          (item: any) => {
            return {
              ...item.name,
              isChecked: item.isChecked,
            };
          }
        );
      });
    }
  }, [trainingData, singleTemplateData]);

  useEffect(() => {
    console.log("useeffect run");

    if (templateData && trainingData) {
      setUsers((prev: any) => {
        const newArr = [...templateData, ...trainingData.data];
        const newA = _.uniqBy(newArr, "_id");
        console.log(newA, "new");
        return newA;
      });
    }
  }, [trainingData, templateData]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    settriggerTheNav1(true);
    setnavPrompt(true)
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedUsers = users.map((user: any) => ({
      ...user,
      isChecked: isChecked,
    }));
    setUsers(updatedUsers)
    // set the updated users back to your state or props
  };

  // select all checkbox functionality
  const [usersSelected, setUsersSelected] = React.useState<any>(0);
  const [Total, setTotal] = React.useState<any>(0);
  useEffect(() => {
    const Count = users?.filter((j: any) => {
      return j?.isChecked === true
    })?.map((j: any) => {
      return j
    })
    setUsersSelected(Count?.length)
    setTotal(users?.length)
    console.log(users?.length, Count?.length, "count")
  }, [users])
  const handleOnCheck = (e: any) => {
    setnavPrompt(true);
    settriggerTheNav1(true);
    const { name, checked } = e.target;

    if (name === "allSelect") {
      const tempUser = users.map((other: any) => {
        return { ...other, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      const tempUser = users.map((other: any) => {
        return other._id === name ? { ...other, isChecked: checked } : other;
      });
      setUsers(tempUser);
      console.log(tempUser, "temp");
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

  useEffect(() => {
    //@ts-ignore
    console.log(checkboxIdHandler(checkboxHandler(users)));
  }, [users]);

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };

  const selectOneError = (i: any) => {
    setSave1(false);

    // if (i && i.length === 0) {
    //   setError(true);
    //   setSave1(false);
    //   setHideAlert(true);
    //   setOpen2(true);
    //   // hideAlertHandler();
    // } else 
    if (i) {
      saveDraft({
        training_recommendation: checkboxIdHandler(
          checkboxHandler(users)
        ),
      });
      setError(false);
     // setSave1(true);
      setHideAlert(true);
     // setOpen2(true);
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
  // useEffect(() => {
  //   if(isSuccessTraining) {
  //     setHideAlert(true)
  //     hideAlertHandler()
  //   }
  // },[isSuccessTraining])

  const [idAlert, setidAlert] = useState(false);
  useEffect(() => {
    if (id === undefined) {
      setidAlert(true);
      setOpen2(true);
    } else {
      setidAlert(false);
    }
  }, []);
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
    setError(false);
    setSave1(false)
  };
  return (
    <div style={{ paddingLeft: "20px" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="20px"
      >
        <div
          style={{
            fontSize: "18px",
            fontFamily: "Arial",
            color: "#3e8cb5",
          }}
        >
          {" "}
          Training Recommendations{" "}
        </div>
        <div
          // style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          //   width: "220px"
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
                  selectOneError(checkboxIdHandler(checkboxHandler(users)));
                  // saveDraft({
                  //   training_recommendation: checkboxIdHandler(
                  //     checkboxHandler(users)
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
        <Alert severity="error">Select Objective Type for the template!</Alert>
      )}
      {hideAlert && error && (
        <Alert severity="error">
          Changes have not been saved. Please select atleast 1 Training Recommendation!
        </Alert>
      )}

      {hideAlert && save1 && (
        <Alert severity="info">Training Recommendation details added</Alert>
      )} */}
      <div style={{ width: "50%", }}>
        <Dialog
          open={open2}
          onClose={handleClose3}
          // BackdropProps={{ style: { background: "#000000", opacity: "3%" } }}
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

              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              //height: "100px",
              //width: "300px",
              alignItems: "center",
              overflowY: "hidden",
            }}
          >
            {idAlert && (
              <div >Please add objective type to the template.</div>
            )}
            {hideAlert && error && (
              <div >
                Changes have not been saved. Please select atleast 1 Training Recommendation.
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
                color: "#3e8cb5",
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
                        fontWeight: "600"
                      }}
                      align="right"
                    >
                      {/* <Stack

                        direction="column"
                      > */}
                       <div
                        style={{
                          display:"flex",
                          justifyContent:"right"
                        }}
                        >
                        <span>Action</span>
                        <span>
                          {users?.length !== 0 &&
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
                    checked={
                      users &&
                      users.filter((employee: any) => employee.isChecked !== true)
                        .length < 1
                    }
                    onChange={handleOnCheck}
                    type="checkbox"
                    style={{
                      height: "17px",
                      width: "17px",
                      border: "1px solid #D5D5D5",
                    }}
                  />
                </TableCell>

              </TableRow> */}
                  {users &&
                    // singleTemplateData &&
                    users.map((i: any) => {
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
                              wordBreak: "break-word"
                            }}
                            align="left"
                          >
                            {i.title}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="right"
                          >
                            <input
                              name={i._id}
                              checked={i?.isChecked || false}
                              onChange={handleOnCheck}
                              type="checkbox"
                              style={{
                                height: "17px",
                                width: "17px",
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
  );
};

export default TrainingRecommendation;
