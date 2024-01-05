import React, { useEffect } from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Alert, Container,Snackbar, TextField, Typography } from "@mui/material";
import { Grid } from "@mui/material";
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
import { Link } from "react-router-dom";
import { OTHER_RECOMMENDATION_PAGE } from "../../../constants/routes/Routing";
import PAMaster from "../../UI/PAMaster";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { AlertDialog } from "../..";
import { Scrollbar } from "react-scrollbars-custom";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles( ({
  recommendation: {
    align: "left !important",
    width: "65% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

      // @media Querry for responsive codes
    ['@media (max-width:950px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "15% !important",
    }
  },

  sortorder: {
    width: "10% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

      // @media Querry for responsive codes
    ['@media (max-width:950px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "5% !important",
    }
  },
  actions: {
    width: "10% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

    // @media Querry for responsive codes
    ['@media (max-width:950px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "5% !important",
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
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important",
    top:"35px !important",
    right:"4px !important",
    height:"calc(100% - 34px) !important"
    },
});
interface IOtherRecommendationViewListProps {
  otherData: any;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  error: any;
  deleteOtherAlert: any;
  openDeletedSuccess: any;
  handleClickCloseDeletedSuccess: any;
}

const OtherRecommendationViewList: React.FC<
  IOtherRecommendationViewListProps
> = (props: IOtherRecommendationViewListProps) => {
  const classes = useStyles();
  const {
    otherData,
    onDelete,
    onEdit,
    deleteOtherAlert,
    error,
    handleClickCloseDeletedSuccess,
    openDeletedSuccess,
  } = props;

  const [editOtherRecommendation, setEditOtherRecommendation] = useState("");
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [showError, setShowError] = useState(error);
  const [hideAlert, setHideAlert] = useState(false);
  console.log(newId, "id from modal");
  console.log(newName, "name from modal");

  console.log(error, "error");
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickClose = () => {
    setOpen2(false);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewName(nameAlert);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      handleClickOpen2();
      setOpen(false);
      console.log(newId);
      setHideAlert(true);
      // hideAlertHandler();
    }
  };
  // useEffect(()=>{
  //   if(otherData?.data?.length === 0){
  //     setOpen2(true)
  //   }
  // })
  return (
    <>
      {" "}
      <PAMaster name={"Further Recommendations"} />
      <Box
        sx={{
          // maxWidth: "95% !important",

          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            height: "40px",
          }}
        >
          {/* <div style={{ width: "92%" }}>
            {otherData?.data?.length === 0 ? (
              <Alert severity="error">
                There is no data for Other Recommendation!
              </Alert>
            ) : (
              ""
            )}
            {hideAlert && error && (
              <Alert severity="error">{newName} is used in Appraisal!!</Alert>
            )}
          </div> */}
          <div style={{ width: "50%" }}>
            <Dialog
              open={open2 && error}
              onClose={handleClose2}
              // BackdropProps={{
              //   style: { background: "#333333 !important", opacity: "10%" },
              // }}
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
                        <IconButton onClick={handleClickClose}  >
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
                  {otherData?.data?.length === 0 ? (
                    <div>There is no data for Further Recommendation.</div>
                  ) : (
                    ""
                  )}
                  {error && (
                    // <div>{newName} is used in the performance appraisal and cannot be deleted.</div>
                    <div>
                     {deleteOtherAlert?.data?.error}
                    </div>
                  )}
                </DialogContentText>
              </DialogContent>
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
                    color: "#e8cb5",
                    // marginRight: "10px",
                    width: "70px",
                    height: "35px",
                    background: "transparent",
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={handleClickClose}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          {/* <Typography
            style={{
              color: "#3E8CB5",
              fontSize: "18px",
              // fontWeight: "500",
              fontFamily: "Arial",
            }}
          >
            View Other Recommendation
          </Typography> */}
          <Link to={`${OTHER_RECOMMENDATION_PAGE}`}>
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

       
          <Scroll>
            <Scrollbar
              style={{
                width: "100%",
                height: "calc(100vh - 235px)",
              }}
            >
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
                    color: "#004C75",
                    fontSize: "12px",
                  }}
                >
                  #
                </TableCell> */}
                    <TableCell
                      style={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      Recommendations
                      {/* <option value="Training Title">Recommendation</option> */}
                    </TableCell>
                    <TableCell
                      style={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      Sort Order
                      {/* <option value="Training Title">Recommendation</option> */}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        ontFamily: "Arial",
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
                  {otherData &&
                    otherData.data.map((row: any, index: number) => {
                      return (
                        <TableRow
                          key={row.symbol}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              borderColor: "#lightgrey",
                            },
                          }}
                        >
                          {/* <TableCell
                        component="th"
                        scope="row"
                        width="8%"
                        align="left"
                        sx={{ fontSize: "12px", color: "#004C75" }}
                      >
                        {index + 1}
                      </TableCell> */}
                          <TableCell  align="left"className={ classes.recommendation }>
                          <div style={{ wordWrap: "break-word" }}>
                              {row.name}
                              </div>
                          </TableCell>
                          <TableCell
                          className={ classes.sortorder }
                            align="center"
                           
                          >
                            <div style={{ wordWrap: "break-word" }}>
                              {row.sort_value}
                            </div>
                          </TableCell>
                          <TableCell
                           className={ classes.sortorder }
                            align="center"
                            // width="10%"
                            // sx={{
                            //   fontSize: "14px",
                            //   color: "#333333",
                            // }}
                          >
                            <>
                              <Tooltip title="Edit">
                                <IconButton
                                  aria-label="EditIcon"
                                  onClick={() => onEdit(row._id)}
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
                                handleAlertClose={handleClose2}
                                handleAlertIdClose={handleClickIdClose}
                                rowAlert={row}
                              >
                                Are you sure you wish to delete this item?
                              </AlertDialog>

                              {/* <IconButton
                            aria-label="CancelOutlinedIcon "
                             onClick={() => onDelete(row._id)}
                          >
                            <CancelOutlinedIcon />
                          </IconButton> */}
                            </>
                          </TableCell>
                          {/*<TableCell align="center"></TableCell>*/}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
         {/* //old dialog display */}
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

export default OtherRecommendationViewList;
