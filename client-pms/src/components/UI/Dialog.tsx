import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Deleteicon from "../../assets/Images/Deleteicon.svg";
import Closeicon from "../../assets/Images/Closeicon.svg";
import { borderRadius, display } from "@mui/system";

const AlertDialog: React.FC<any> = (props: any) => {
  const {
    rowDialog,
    isAlertOpen,
    handleAlertClose,
    handleAlertIdClose,
    children,
  } = props;

  return (
    <Dialog
      open={isAlertOpen}
      onClose={handleAlertClose}
      BackdropProps={{ style: { background: "#333333 !important",opacity:"1%" } }}
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
        <IconButton onClick={handleAlertClose} >
          <img src={Closeicon} alt="icon" />
        </IconButton>
      </DialogTitle> */}
      {/* <DialogTitle
        style={{
          display: "flex",
          justifyContent: "center",
          // paddingRight: "100px",
          // paddingLeft: "100px",
        }}
        id="alert-dialog-title"
      >
        <img src={Deleteicon} alt="icon" />
      </DialogTitle> */}
      <DialogContent>
        {/* <DialogContentText
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "18px",
            color: "#333333",
            opacity: "100%",
            // paddingTop: "13px",
            paddingBottom: "10px",
            // paddingRight: "100px",
            // paddingLeft: "100px",
          }}
        >
          Delete
        </DialogContentText> */}
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
          {children}
        </DialogContentText>
      </DialogContent>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        // paddingBottom="30px"
      >
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background:"transparent",
              height:"35px",
              width:"70px"
            }}
            variant="outlined"
            onClick={handleAlertIdClose}
          >
            Yes
          </Button>
        </DialogActions>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3E8CB5",
              background:"transparent",
              height:"35px",
              width:"70px"

            }}
            variant="outlined"
            onClick={handleAlertClose}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default AlertDialog;
