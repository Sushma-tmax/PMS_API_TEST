import React from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Button } from "@mui/material";

function DisplayingErrors(props: any) {
  const { from,uploadError, setHideErrors, errorsList, setErrorsList } = props;
  let titleToDisplay = "File upload failed";
  if(from === "employeeMasterConfirmation"){
    titleToDisplay = "Employee confirmation failed"
  }
  console.log(errorsList, "errorsList")
  let errormsg = errorsList?.data?.message;
  const sentences = [errormsg];
  // const sentences = [
  //   "This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.This is the first sentence.",
  //   "Here is another sentence.",
  //   "And one more sentence for the example.",
  // ];
  
  const handleRetry = () => {
    setHideErrors(false)
    setErrorsList("")
  }
  const handleBack = () => {
    setHideErrors(false)
    setErrorsList("")
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#ffd3da",
          color: "red",
          fontFamily: "Arial",
          marginTop: "5px",
        }}
      >
        <WarningAmberIcon style={{ marginRight: "10px", fontSize: "medium" }} />
        <span>{titleToDisplay}</span>
      </div>
      <div
        style={{
          padding: "10px",
          color: "#333333",
          fontFamily: "Arial",
        }}
      >
        <ul
          style={{
            paddingLeft: "10px"
          }}
        >
          {sentences?.map((sentence: any, index: any) => (
            <li
              key={index}
              style={{
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {sentence}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Button
          style={{
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Arial",
            borderColor: "#3E8CB5",
            marginRight: "10px",
            color: "#3e8cb5",
            width: "70px",
            height: "35px",
            background: "transparent",
          }}
          variant="outlined"
          onClick={handleRetry}
        >
          Retry
        </Button>

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
          onClick={handleBack}
          autoFocus
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default DisplayingErrors;
