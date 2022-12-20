import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Cancel from "@mui/icons-material/Cancel";
import { Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PAMaster from "../../components/UI/PAMaster";
import { AlertDialog } from "..";
import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import {
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
  CREATE_TEMPLATE_1,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
const BT = () => {
  return (
    <>
      <Link to="/template/edit-template">
        <Tooltip title="Edit">
          <IconButton>
            <img src={Edit} alt="icon" />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title="Delete">
        <IconButton>
          <img src={Close} alt="icon" />
        </IconButton>
      </Tooltip>
    </>
  );
};

function createData(
  number: number,
  templateName: string,
  date: string,
  action: any
) {
  return { number, templateName, date, action };
}

const rows = [
  createData(1, "Manager", "20/09/21", <BT />),
  createData(2, "Juniors", "20/09/21", <BT />),
];

export default function ViewTemplate(props: any) {
  const { ViewTemplateData, onDelete, deleteError } = props;
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [hide, setHide] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(deleteError);
  const navigate = useNavigate();

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
      console.log(newId);
    }
  };
  React.useEffect(() => {
    if (deleteError === true) {
      setDeleteAlert(true);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    } else {
      setDeleteAlert(false);
    }
  }, [deleteError]);
  //  dialogue
  const [open2, setOpen2] = React.useState(false);



  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
  };

  return (
    <>
      <PAMaster name={"View Template"} nav={`${`${CREATE_TEMPLATE_1}`}`} />

      <Container
        sx={{
          maxWidth: "95% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          padding: "25px",
          //boxShadow:'2px 4px 6px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* {hideAlert && deleteAlert === true && (
          <Alert severity="error">
            Template is used in Appraisal, cannot be deleted !
          </Alert>
        )}
         {ViewTemplateData?.templates?.length === 0 ? (
              <Alert severity="error">
                There is no Template created!
              </Alert>
            ) : (
              ""
            )} */}

        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            // onClose={handleClose2}
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
              {hideAlert && deleteAlert === true && (
                <div >
                  This template is used in the performance appraisal and cannot be deleted.
                </div>
              )}
              {ViewTemplateData?.templates?.length === 0 ? (
                <div >
                  There is no Template created!
                </div>
              ) : (
                ""
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
                  marginRight: "10px",
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
        <TableContainer>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 245px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    {/* <TableCell
                                        sx={{
                                            borderColor: "#F7F9FB",
                                            color: "#004C75",
                                            fontSize: "14px",
                                        }}
                                        width={20}
                                    >
                                        #
                                    </TableCell> */}
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                      width="35%"
                    >
                      Template Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                      width="15%"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                      width="15%"
                    >
                      Last Modified Date
                    </TableCell>
                    <TableCell
                    width="10%"
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
                  {ViewTemplateData &&
                    ViewTemplateData.templates.map((row: any, index: any) => {
                      return (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {/* <TableCell
                                                    sx={{ fontSize: "14px", color: "#33333" }}
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {index + 1}
                                                </TableCell> */}
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="left"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="center"
                          >
                            {row.status_template}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="center"
                          >
                            {/* {row.createdAt} */}
                            {dayjs(row.updatedAt).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell
                            sx={{ fontSize: "14px", color: "#7A7A7A" }}
                            align="center"
                          >
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                                onClick={() =>
                                  //meenakshi 27/06
                                  // routing updated
                                  navigate(`${EDIT_TEMPLATE_1}/${row._id}`)
                                }
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                onClick={() => handleClickOpen(row._id, row.name)}
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
        </TableContainer>
      </Container>
    </>
  );
}
