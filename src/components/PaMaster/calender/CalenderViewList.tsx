import React, { useEffect } from 'react';
import Stack from "@mui/material/Stack";
import { Alert, Container, TextField,Snackbar } from "@mui/material";
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
import { useState } from "react";
import { CALENDAR_VIEW, CALENDER } from "../../../constants/routes/Routing";
import { format } from "date-fns";
import dayjs from "dayjs";
import PAMaster from "../../UI/PAMaster";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import { AlertDialog } from "../..";
import { Scrollbar } from "react-scrollbars-custom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import AlertDialogSuccess from "../../UI/DialogSuccess";
import EditDisable from "../../../assets/Images/Editcopy.svg"
import { useAppraisalCalenderFiltersQuery } from '../../../service';
import Eye from "../../normalizerMain/Reviewericons/Eyeicon.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles( ({
  calendarname: {
    align: "left !important",
    width: "40% !important",
    fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",

      // @media Querry for responsive codes
    ['@media (max-width:950px)']: {
      fontSize: "14px !important",
    color: "#333333 !important",
    fontFamily: "Arial !important",
    width: "30% !important",
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
interface ICalenderViewListProps {
  calendarData: any;
  onDelete: any;
  onUpdate: any;
  onView: any
  deleteCalendarAlert: any;
  error: any;
  openDeletedSuccess: any;
  handleClickCloseDeletedSuccess:any
}

const CalenderViewList: React.FC<ICalenderViewListProps> = (
  props: ICalenderViewListProps
) => {
  const classes = useStyles();
  const { calendarData, onDelete, onUpdate,onView, deleteCalendarAlert, error,  handleClickCloseDeletedSuccess, openDeletedSuccess } =
    props;
    // const {data ,isLoading} = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')

  const [editOtherRecommendation, setEditOtherRecommendation] = useState("");
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [showError, setShowError] = useState(error);
  const [hideAlert, setHideAlert] = useState(false);
  console.log(newId, "id from modal");
  console.log(newName, "name from modal");
  const [EditButton, setEditButton] = React.useState(false);

  const [open2, setOpen2] = useState(false);

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleClose3 = () => {
    setOpen2(false);
  };
  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 7000);
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
      setOpen2(true);
      console.log(newId);
      setHideAlert(true);
      // hideAlertHandler();
    }
  };

  useEffect(()=>{
    {calendarData &&
      calendarData?.data?.map((row: any, index: number) => {
      // console.log(row,"newrow")
       if(row?.isActive =="true" 
      ){
        return setEditButton(true)
      }else {
        setEditButton(false)
      }
    })

  }
  },[calendarData])
  return (
    <>
      <PAMaster name={"Calendar Setting"} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft:"25px",
          marginRight:"25px",
  
          //boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          //marginTop: "15px",
        }}
      >
        {" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
          //   height: "40px",
          }}
        >
          {/* <div style={{ width: "92%" }}>
            {calendarData?.data?.length === 0 ? <Alert severity="error">There is no data for Calendar!</Alert> : ""}
            {hideAlert && error && (<Alert severity="error"> */}
          {/* {newName} is used in Appraisal!! */}
          {/* Cannot be deleted. PA templates were mapped to this calendar!
      </Alert>)}
          </div> */}
          {/* <div style={{ width: "50%" }}> */}
            <Dialog
              open={open2 && error}
              onClose={handleClose2}
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
              <DialogContent>
                <DialogContentText
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
                    // height: "100px",
                    //  width :"300px",
                    alignItems: "center",
                    overflowY:"hidden",
                  }}
                >
                  <div style={{ width: "92%" }}>
                    {calendarData?.data?.length === 0 ? (
                      <div>There is no data for Calendar.</div>
                    ) : (
                      ""
                    )}
                    {hideAlert && error && (
                      <div>
                        Cannot be deleted. PA templates were mapped to this
                        calendar.
                      </div>
                    )}
                  </div>
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
          {/* </div> */}
          <h2
            style={{
              color: "#014D76",
              fontFamily: "sans-serif",
              fontSize: "16px",
              fontWeight: "540",
            }}
          >
            {" "}
            {/* Add Calendar */}
          </h2>
          <Link to={`${CALENDER}`}>
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px"
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
                      //borderColor: "lightgrey",
                      color: "#014D76",
                      fontSize: "13px",
                    }}
                  >
                    #
                  </TableCell> */}
                    <TableCell
                    // width="40%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                       Calendar Name
                    </TableCell>
                    <TableCell
                     width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                    //  width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Start Date
                    </TableCell>
                    <TableCell
                      // width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      End Date
                    </TableCell>
                    <TableCell
                      align="center"
                      // width="10%"
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
                  {calendarData &&
                    calendarData.data.map((row: any, index: number) => {
                      console.log(row,"rowkk")
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
                          sx={{ fontSize: "12px", color: "#014D76" }}
                        >
                          {index + 1}
                        </TableCell> */}
                          <TableCell
                            align="left"
                            className={ classes.calendarname }
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
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                             {row.status === "Live" ? (
                           <span style={{ color: "#008E97", fontWeight: "600", }}>Live</span>
                            ) : (row.status === "Closed") ?
                              <span style={{ fontWeight: "600", }}>Closed</span>
                              : (row.status === "Draft") ? <span style={{ fontWeight: "600", }}>Draft</span>
                              : <span> ""</span>

                            }
                          </TableCell>
                          <TableCell
                          width="10%"
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {dayjs(row.start_date).format("DD/MM/YYYY")}

                            {/* {row.start_date} */}
                          </TableCell>
                          <TableCell
                          width="10%"
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            {dayjs(row.end_date).format("DD/MM/YYYY")}
                            {/* {row.end_date} */}
                          </TableCell>
                          <TableCell
                          width="10%"
                            align="left"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          >
                            <>
                            {row?.status == "Closed" ?
                               <Tooltip title="Edit">
                               <IconButton
                                 aria-label="EditIcon"
                                 disabled={(row?.status == "Closed")}

                               >
                                 <img src={EditDisable} alt="icon" />
                                    
                                    </IconButton>
                                  </Tooltip>
                                  : 
                                  <Tooltip title="Edit">
                                  <IconButton
                                    aria-label="EditIcon"
                                    disabled={(row?.status == "Closed")
                                      // dayjs(row?.end_date).isBefore(
                                      // dayjs())
                                    }
                                    onClick={() => onUpdate(row._id)}
                                  >
                                    <img src={Edit} alt="icon" />
                                    
                                    </IconButton>
                                  </Tooltip>
                            }
                              {(row?.status == "Live") || (row?.status == "Closed") ?
                              
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="CancelOutlinedIcon "
                                  disabled={(row?.status == "Live") || (row?.status == "Closed"
                                  // ||dayjs(row?.end_date).isBefore(
                                  //   dayjs())

                                    )}
                                    sx={{opacity:0.2}}
                                  onClick={() =>
                                    handleClickOpen(row._id, row.name)
                                  }
                                // onClick={() => onDelete(row._id)}
                                >
                                  <img src={Close} alt="icon" />
                                </IconButton>
                              </Tooltip> :
                              <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                disabled={(row?.status == "Live") || (row?.status == "Closed")}
                                onClick={() =>
                                  handleClickOpen(row._id, row.name)
                                }
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                              }
                              { (row?.status == "Closed"
                                      ) && (
                                        <>
                              <Tooltip title="View">
                                <IconButton
                                  aria-label="CancelOutlinedIcon "
                                  onClick={() => onView(row._id)}
                                >
                                  <img src={Eye} alt="icon" />
                                </IconButton>
                              </Tooltip>
                              </>
                                      )}
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
                          {/*<TableCell align="center"></TableCell>*/}
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

export default CalenderViewList;
