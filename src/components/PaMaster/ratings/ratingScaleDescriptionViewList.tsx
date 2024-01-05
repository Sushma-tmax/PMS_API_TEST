import React, { useEffect } from "react";
import { useState } from "react";
import { Alert, Container, Snackbar, Stack, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Margin } from "@mui/icons-material";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { IconButton } from "@mui/material";
import { RATING_SCALE_DESCRIPTION } from "../../../constants/routes/Routing";
import { Link } from "react-router-dom";
import PAMaster from "../../UI/PAMaster";
import { Scrollbar } from "react-scrollbars-custom";

import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import {useGetCalenderQuery} from "../../../service";
import { AlertDialog } from "../..";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
interface IRatingScaleDescriptionViewListProps {
  ratingScaleData: any;
  onDelete: any;
  onUpdate: any;
  error: any;
  openDelSuccess: any;
  handleDelSuccessClose: any;
  displayError: any
}

const RatingScaleDescriptionViewList: React.FC<
  IRatingScaleDescriptionViewListProps
> = (props: IRatingScaleDescriptionViewListProps) => {
  const { ratingScaleData, onDelete, onUpdate, error,openDelSuccess,handleDelSuccessClose, displayError } = props;
  const classes = useStyles();
  //-----------------------------------------------------------------------for disabling delete icon button
  const {data:calendarData} =useGetCalenderQuery('')
  const [disableDelete, setDisableDelete] = useState(false);
  console.log(disableDelete,calendarData,"calendarData")
  useEffect(() => {
    if (calendarData && calendarData.data.some((i: any) => i.isActive === true)) {
      setDisableDelete(true);
    } else {
      setDisableDelete(false);
    }
  }, [calendarData]);
  //-----------------------------------------------------------------------for disabling delete icon button
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newRatingScale, setNewRatingScale] = useState("");
  const [hideAlert, setHideAlert] = useState(false);

  console.log(newId, "id from modal");
  console.log(newRatingScale, "name from modal");
  console.log(ratingScaleData, "ratingScaleData");
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

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

  const handleClickOpen = (id: string, nameAlert: string, rating: any) => {
    setOpen(true);
    setNewId(id);
    setNewRatingScale(nameAlert);
    setNewRating(rating);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      
      console.log(newId);
    }
  };

  useEffect(() => {
    if (error === true) {
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    }
  }, [error]);
  console.log(error, "error");
  return (
    <>
      <PAMaster name={"Rating Scale"} />
      {/* {ratingScaleData?.data?.length === 0 ? <Alert severity="error">There is no data for Rating Scale!</Alert> : ""}

      {hideAlert && error && (
        <Alert severity="error">{newRating} is used in Appraisal!!</Alert>
      )} */}
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft:"25px",
          marginRight:"25px"
          //boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          //marginTop: "15px",
        }}
      >
        <Box
           sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
            height:"40px"
          }}
        >
          {/* <div style={{ width: "92%" }}>
            {ratingScaleData?.data?.length === 0 ? <Alert severity="error">There is no data for Rating Scale!</Alert> : ""}

            {hideAlert && error && (
              <Alert severity="error">{newRating} is used in Appraisal!!</Alert>
            )}
          </div> */}
          <div style={{ width: "50%", }}>
          <Dialog
         open={open2} 
         onClose={handleClose2} 
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
          <Stack>
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
          overflowY:"hidden",
        }}
        >
         <div >
            {ratingScaleData?.data?.length === 0 ? <div>There is no data for Rating Scale.</div> : ""}

            {hideAlert && error && (
              // <div >{newRating} is used in the performance appraisal and cannot be deleted.</div>
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
              </Stack>
            </Dialog>
            </div>
          <h2
            style={{
              color: "#004C75",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {" "}
            {/* Add Rating Scale Description */}
          </h2>
          <Link to={RATING_SCALE_DESCRIPTION}>
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
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor: "#eaeced" }}>
                  {/* <TableCell
                    align="left"
                    sx={{
                      borderColor: "#F7F9FB",
                      color: "#004C75",
                      fontSize: "12px",
                      width: "40px",
                    }}
                  >
                    {" "}
                    #
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      width: "70px",
                    }}
                  >
                    <form>
                      <div
                        style={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Rating
                        {/* <option value="Training Title">Rating</option> */}
                      </div>
                    </form>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{

                      width: "200px",
                    }}
                  >
                    <form>
                      <div
                        style={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Rating Scale Title
                        {/* <option>Rating Scale Title</option> */}
                      </div>
                    </form>
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
                    Definition
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
                {ratingScaleData &&
                  ratingScaleData.data
                    .slice()
                    .sort(function (a: any, b: any) {
                      return a.rating - b.rating;
                    })
                    .map((row: any, index: any) => {
                      return (
                        <TableRow
                          key={row._id}
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
                          sx={{
                            fontSize: "12px",
                            color: "#014D76",
                            lineHeight: "50px",
                          }}
                        >
                          <div style={{ width:'100px', wordWrap:'break-word'}} >{index + 1}</div>
                        </TableCell> */}
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {/* <div style={{ width:'100px', wordWrap:'break-word'}} >{row.rating.toFixed(1)}</div> */}
                            <div
                              style={{ width: "100px", wordWrap: "break-word" }}
                            >
                              {row.rating}
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak:"break-word"
                            }}
                          >
                           
                              {row.rating_scale}

                          </TableCell>
                          <TableCell
                          align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak:"break-word"
                            }}
                          >
                            
                              {row.definition}
                           
                          </TableCell>
                          <TableCell
                            align="center"
                            width={115}
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            <Tooltip title="Edit">
                              <IconButton onClick={() => onUpdate(row._id)}>
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                // disabled = {disableDelete}
                                onClick={() =>
                                  handleClickOpen(
                                    row._id,
                                    row.rating_scale,
                                    row.rating
                                  )
                                }
                              // onClick={() => onDelete(row._id)}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <AlertDialog
                              isAlertOpen={open}
                              handleAlertOpen={() =>
                                handleClickOpen(
                                  row._id,
                                  row.rating_scale,
                                  row.rating
                                )
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleClickIdClose}
                              rowAlert={row}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </Scrollbar>
          </Scroll>
        {/* </TableContainer> */}
        {/* <AlertDialogSuccess
          isAlertOpen={openDelSuccess}
          handleAlertClose={handleDelSuccessClose }
        >          
        {newRatingScale} has been deleted successfully. 
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={openDelSuccess}
        autoHideDuration={3000}
        onClose={handleDelSuccessClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleDelSuccessClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b>  {newRatingScale} has been deleted successfully. </b>
        </Alert>
      </Snackbar> 
      </Box>
    </>
  );
};

export default RatingScaleDescriptionViewList;
