import Stack from "@mui/material/Stack";
import { Alert, Container, TextField } from "@mui/material";
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
import { CALENDER } from "../../constants/routes/Routing";
import { format } from "date-fns";
import dayjs from "dayjs";
import PAMaster from "../../components/UI/PAMaster";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import { AlertDialog } from "..";
import { Scrollbar } from "react-scrollbars-custom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"
import AlertDialogSuccess from "../UI/DialogSuccess";


const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
interface ICalenderViewListProps {
  calendarData: any;
  onDelete: any;
  onUpdate: any;
  deleteCalendarAlert: any;
  error: any;
  openDeletedSuccess: any;
  handleClickCloseDeletedSuccess:any
}

const CalenderViewList: React.FC<ICalenderViewListProps> = (
  props: ICalenderViewListProps
) => {
  const { calendarData, onDelete, onUpdate, deleteCalendarAlert, error,  handleClickCloseDeletedSuccess, openDeletedSuccess } =
    props;
  const [editOtherRecommendation, setEditOtherRecommendation] = useState("");
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [showError, setShowError] = useState(error);
  const [hideAlert, setHideAlert] = useState(false);
  console.log(newId, "id from modal");
  console.log(newName, "name from modal");

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

  return (
    <>
      <PAMaster name={"Calendar Setting"} />
      <Container
        sx={{
          maxWidth: "95% !important",
          width: "100%",
          height: "calc(100vh - 165px)",
          background: "#fff",
          padding: "30px",
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
        <TableContainer>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 259px)" }}>
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
                    width="40%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Appraisal Calendar
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
                      Start Date
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
                      End Date
                    </TableCell>
                    <TableCell
                      align="center"
                      width="10%"
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
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
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
                            {dayjs(row.start_date).format("DD/MM/YYYY")}

                            {/* {row.start_date} */}
                          </TableCell>
                          <TableCell
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
                            align="center"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
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
                          {/*<TableCell align="center"></TableCell>*/}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
        </TableContainer>
        <AlertDialogSuccess
          isAlertOpen={openDeletedSuccess}
          handleAlertClose={handleClickCloseDeletedSuccess}
        >
           {newName} has been deleted successfully.
        </AlertDialogSuccess>
      </Container>
    </>
  );
};

export default CalenderViewList;
