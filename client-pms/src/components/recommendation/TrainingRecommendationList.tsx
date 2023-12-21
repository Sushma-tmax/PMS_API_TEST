import React from "react";
import { useState } from "react";
import { Alert, Container, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { TRAINING_RECOMMENDATION_PAGE } from "../../constants/routes/Routing";
import PAMaster from "../../components/UI/PAMaster";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import { AlertDialog } from "..";
import { Scrollbar } from "react-scrollbars-custom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"
import AlertDialogSuccess from "../UI/DialogSuccess";
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  
});
interface TrainingRecommendationViewListProps {
  trainingData: any;
  onDelete: (id: string) => void;
  error:any
}

const TrainingRecommendationViewList = (props: any) => {
  const { trainingData, onDelete, onUpdate, error, openDeletedSuccess, handleClickCloseDeletedSuccess } = props;

  console.log(props);
  const [open, setOpen] = useState(false);
 
  const [newId, setNewId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [hideAlert, setHideAlert] = useState(false)
  console.log(newId, "id from modal");
  console.log(newTitle, "name from modal");
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

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewTitle(nameAlert);
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
      <PAMaster name={"Training Recommendation"} />
      <Container
        sx={{
          maxWidth: "95% !important",
          height: "calc(100vh - 165px)",
          background: "#fff",
          padding: "30px",
          //boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          // marginTop: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            height:"40px"

          }}
        >
          {/* <div style={{ width: "92%" }}>
            {trainingData?.data?.length === 0 ? <Alert severity="error">There is no data for Training Recommendation!</Alert> : ""}
            {hideAlert && error && (
              <Alert severity="error">{newTitle} is used in Appraisal!!</Alert>
            )}
          </div> */}
          <div style={{ width: "50%", }}>
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
             margin:"0px",
             padding:"30px",
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
        <DialogContent><DialogContentText
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
        {trainingData?.data?.length === 0 ? <div>There is no data for Training Recommendation.</div> : ""}
            {hideAlert && error && (
              // <div>{newTitle} is used in the performance appraisal and cannot be deleted.</div>
              <div>This recommendation is used in the performance appraisal and cannot be deleted.</div>
            )}
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
                    color:"#3e8cb5",
                    // marginRight: "10px",
                    width: "70px",
                    height: "35px",
                    background:"transparent"

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
          {/* <h2
            style={{
              color: "#3E8CB5",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            View Training Recommendation
          </h2> */}
          <Link to={`${TRAINING_RECOMMENDATION_PAGE}`}>
            <Button
             style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              width: "70px",
              height: "35px",
              background:"transparent"
            }}
              variant="outlined"
            >

              Add 

            </Button>
          </Link>
        </Box>

        <TableContainer>
          <Scroll>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 292px)" }}>
            <Table size="small" aria-label="simple table">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor:"#eaeced"}}>
                  {/* <TableCell
                    align="center"
                    sx={{
                      fontFamily: "regular",
                      padding: 1,
                      borderColor: "#F7F9FB",
                      color: "#004C75",
                      fontSize: "12px",
                      width: "5%",
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
                      fontWeight: "600"
                    }}
                  >
                    Training Title
                    {/* <FormControl
                      variant="standard"
                      sx={{minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Training Title
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                      ></Select>
                    </FormControl> */}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      width: "65%",
                      fontWeight: "600"
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                  width="10%"
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingData &&
                  trainingData.data.map((row: any, index: number) => {
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
                          align="center"
                          sx={{
                            fontSize: "12px",
                            color: "#004C75",
                            fontFamily: "regular",
                          }}
                        >
                          {index + 1}
                        </TableCell> */}
                        <TableCell
                          align="left"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "lightgrey",
                            fontSize: "14px",
                            color: "#333333",
                            wordBreak:"break-word"
                          }}
                        >
                    {row.title}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "lightgrey",
                            fontSize: "14px",
                            color: "#333333",
                            wordBreak:"break-word"
                          }}
                        >
                   {row.definition}
                        </TableCell>
                        <TableCell align="center">
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
                                  handleClickOpen(row._id, row.title)
                                }
                                // onClick={() => onDelete(row._id)}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <AlertDialog
                              isAlertOpen={open}
                              handleAlertOpen={() =>
                                handleClickOpen(row._id, row.title)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleClickIdClose}
                              rowAlert={row}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Scrollbar>
          </Scroll>
        </TableContainer>
        <AlertDialogSuccess
          isAlertOpen={ openDeletedSuccess}
          handleAlertClose={ handleClickCloseDeletedSuccess}
        >
          {newTitle} has beed Deleted successfully.
        </AlertDialogSuccess>
      </Container>
    </>
  );
};

export default TrainingRecommendationViewList;
