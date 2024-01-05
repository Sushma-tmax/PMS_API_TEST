import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Switch,
} from "@mui/material";
import {
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
  CREATE_TEMPLATE_1,
  OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE,
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
import AlertDialogSuccess from "../UI/DialogSuccess";
import { QrCodeScannerOutlined } from "@mui/icons-material";
import { useAddWeightageMutation } from "../../service";
import { useAppraisalCalendarByTemplateMutation } from "../../service/appraisalCalender/AppraisalCalender";
import Eye from "../../assets/Images/Eye.svg";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
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
  const { ViewTemplateData,errorMSG, onDelete, deleteError, successfullyDeletedAlert, successfullyDeletedAlertClose, appraisalCalendarData } = props;
 
  console.log(ViewTemplateData,"calenderData")
  console.log(errorMSG,deleteError,"calenderData")
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [hide, setHide] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(deleteError);
  const [templateData, setTemplateData] = useState<any>([])
  const [templateActiveAlert, setTemplateActiveAlert] = useState(false);
  const [message, setMessage] = useState("")
  const navigate = useNavigate();
  const [updateActiveStatus] = useAddWeightageMutation()
  const [appraisalCalendarByTemplateId] = useAppraisalCalendarByTemplateMutation()

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (ViewTemplateData) {
      setTemplateData(ViewTemplateData?.templates)
    }
  }, [ViewTemplateData])

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

  {/*  to make template status (Active / Inactive):
 1) If template status is Completed then only it will be made Active else Inactive
 2) To make template inactive must check if the Appraisal Calendar including template has status draft */}


  const handleTemplateActiveStatus = (e: any, item: any) => {
    const { name, checked } = e.target;
    if (checked) {
      //Activate Template
      if (item.status_template == "Completed") {
        updateActiveStatus({
          template_active_status: checked,
          id: item._id
        })
      }
      else {
        setTemplateActiveAlert(true);
        setMessage("Save Template as Final to activate the template")
      }
    } else {
      //Deactivate Template
      appraisalCalendarByTemplateId({
        templateId: item._id
      }).then((res: any) => {
        if (res?.data?.data == 0) {
          updateActiveStatus({
            template_active_status: checked,
            id: item._id
          })
        } else {
          setTemplateActiveAlert(true);
          setMessage("This template is mapped to a calendar and cannot be deactivated.")
        }
      })
    }
  }



  const handleCloseTemplateAlert = () => {
    setTemplateActiveAlert(false)
  }


  // navigate to template preview screen
  const onView = (templateId: any) => {
    navigate(`${OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE}/${templateId}`)
  }

  // const getStatus = (status_template:any) =>{  if(status_template ="Completed"){      return "Completed"  }else {      return "Draft"}}

  return (
    <>
      <PAMaster name={"View Template"} nav={`${`${CREATE_TEMPLATE_1}`}`} />

      <Box
        sx={{
          // maxWidth: "95% !important",
          height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: '25px'
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
                // maxHeight:"30%"
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
            <DialogContent><DialogContentText
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
              {hideAlert && deleteAlert === true && (
                <div >
                  {/* This template is used in the performance appraisal and cannot be deleted. */}
                  {errorMSG?.data?.error}
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
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 180px)" }}>
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
                      width="350px"
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
                    // width="350px"
                    >
                      Template Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                      width="75px"
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
                      width="150px"
                    >
                      Last Modified Date
                    </TableCell>
                    <TableCell
                      width="70px"
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
                      console.log(row, 'rowwwwwww')
                      // templateData?.map((row: any, index: any) => {
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
                            {row?.name}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="left"
                          >
                            {row?.description}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="center"
                          >
                            {row?.status_template}
                            {/* {getStatus(row.status_template)} */}
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
                            <Stack direction="row" alignItems="center"
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
                              <IconButton>
                                <FormGroup>
                                  {/* <FormControlLabel
                                sx={{ marginRight: '-14px !important', cursor: 'progress !important' }}
                                control={} */}
                                  <FormControlLabel control={
                                    <Switch
                                      size="small"
                                      // sx={{cursor:'progress !important'}}
                                      // disabled={row?.status_template == "draft"}
                                      //defaultChecked 
                                      // style={{styles}}
                                      name={row?._id}
                                      checked={row?.template_active_status || false}
                                      onChange={(e) => { handleTemplateActiveStatus(e, row) }}
                                    />
                                  } label="" />
                                  {/* } */}
                                  {/* label={
                                  <Typography
                                  // className={classes.formControlLabel}
                                  >
                                    <FormControlLabelStyled> */}
                                  {/* Set active */}
                                  {/* </FormControlLabelStyled>
                                  </Typography>
                                }
                              /> */}
                                </FormGroup>
                              </IconButton>
                              <Tooltip title="View">
                                <IconButton
                                  onClick={() => onView(row._id)}
                                >
                                  <img src={Eye} alt="icon" />
                                </IconButton>
                              </Tooltip>
                            </Stack>


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
        <AlertDialogSuccess
          isAlertOpen={successfullyDeletedAlert}
          handleAlertClose={successfullyDeletedAlertClose}
        >
          {newName} has been deleted successfully.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={templateActiveAlert}
          handleAlertClose={handleCloseTemplateAlert}
        >
          {message}
        </AlertDialogSuccess>
      </Box>
    </>
  );
}
