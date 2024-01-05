import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Popover,
  Typography,
} from "@mui/material";
import Blueadd from "../../../../assets/Images/Blueadd.svg";
import Blueminus from "../../../../assets/Images/Blueminus.svg";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import Infoicon from "../../../../assets/Images/Infoicon.svg";


const Tf3 = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",
  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "left"
  },
});

// const Contain = styled("div")({
//   marginTop: "10px",
// });

const TrainingRecommendation = styled("div")({
  // marginLeft: "25px",
  marginBottom: "10px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  //opacity: 0.85
});


const Train = styled("div")({
  "& .MuiTextField-root": {
    // color: "rgb(51 51 51/50%)",
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    padding: "8px",
    // paddingRight:"0px",
    width: "96%"

  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",
    textAlign: "left",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
    padding: "3px",
  },
  "& .MuiOutlinedInput-root": {
    maxWidth:"0px",
    minWidth:"100%",
    "& fieldset": {
      borderColor: "#f8f8f8",
    },
    "&:hover fieldset": {
      borderColor: "#f8f8f8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f8f8f8",
    },
  },
});

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200 ,
      fontSize: "14px !important",
      fontFamily: "arial !important",
      color: "#333333 !important",
    },
  },
};


const TrainingRecommendations = (props: any) => {
  const { setnavPrompt } = props;
  //@ts-ignore
  const { trainingRecommendation, trainingSelectValue, setTrainingRecommendationFormValues, setMoveTab, disableTextAfterSubmission,empData
  } = useAppraisalContext();
  const [formValues, setFormValues] = useState([
    { name: "", training_name: "", justification: "" },
  ]);
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(null);
  const openInfo6 = Boolean(anchorEls);
  const id6 = openInfo6 ? "simple-popover" : undefined;
  const [popoverIndex, setPopoverIndex] = useState<any>("");


  useEffect(() => {
    if (formValues?.length == 0) {
      addFormFields()
    }
  }, [formValues])


  const handleTrainingChange = (i: any, e: any) => {
    setnavPrompt(true);
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {   
    setFormValues([
      ...formValues,
      { name: "", training_name: "", justification: "" },
    ]);
  };

  const removeFormFields = (i: any) => {
    setnavPrompt(true);
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  useEffect(() => {
    if (empData) {
      setFormValues(() => {
        return empData.data.appraisal.training_recommendation.map((j: any) => {
          return {
            name: j?.name._id,
            training_name: j.training_name,
            justification: j.justification,
          };
        });
      });
    }
  }, [empData]);

  useEffect(() => {
    setTrainingRecommendationFormValues(formValues);
  }, [formValues]);


  const handleClickOpenInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };


  const handleClickCloseInfo = () => {
    setAnchorEls(null);
  };


  return (
    <div style={{ marginBottom: "20px" }}>
      <TrainingRecommendation>
        <b>
          Training Recommendations
        </b>
      </TrainingRecommendation>


      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              "& td, & th": {
                border: "1px solid #e0e0e0",
                bgcolor: "#eaeced",
              },
            }}
          >
            <TableCell
              align="center"
              width="30% !important"
              style={{
                border: "1px solid #e0e0e0",
                fontFamily: "Arial",
                color: "#3E8CB5",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Training Category
            </TableCell>
            <TableCell
              align="center"
              width="36%"
              style={{
                border: "1px solid #e0e0e0",
                fontFamily: "Arial",
                color: "#3E8CB5",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Training Name
            </TableCell>
            <TableCell
              align="center"
              width="36%"
              style={{
                border: "1px solid #e0e0e0",
                fontFamily: "Arial",
                color: "#3E8CB5",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Justification
            </TableCell>
          </TableRow>
        </TableHead>


        {formValues.map((element, index) => (
          <TableBody>
            <TableRow
              sx={{
                "& td, & th": {
                  border: "1px solid #e0e0e0",
                },
              }}
            >
              <TableCell
               width="30% !important"
              >
                <Train>
                  <Stack 
                  direction={"row"}
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  >
                       {element?.name != "" && (
                      <IconButton
                      style={{padding:"0px"}}
                        onClick={(e: any) => {
                          handleClickOpenInfo(e)
                          setPopoverIndex(index);
                        }}
                      >
                        <img width="12px" src={Infoicon} alt="icon" />
                      </IconButton>
                    )}
                    <Select
                      sx={{
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        background: "#f8f8f8",
                        // minWidth:"338px",
                        // maxWidth:"0px"
                      }}
                      fullWidth
                      autoComplete="off"
                      // label="Add  Name"
                      // label="Select"
                      placeholder="Select"
                      size="small"
                      name="name"
                      displayEmpty
                      MenuProps={MenuProps}
                      value={element.name || ""}
                      renderValue={
                        element.name || ""
                          ? undefined
                          : () => <div style={{ color: "#aaa" }}>Select</div>
                      }
                      onChange={(e) => {
                        handleTrainingChange(index, e);
                        setMoveTab(true);

                      }}
                      disableUnderline
                    >
                      {trainingSelectValue &&
                        trainingSelectValue.map((TrainingData: any) => {
                          return (
                            <MenuItem
                              style={{
                                fontSize: "14px",
                                fontFamily: "arial",
                                color: "#333333",
                              }}
                              value={TrainingData.name._id}
                              disabled={disableTextAfterSubmission}
                            >

                              {TrainingData.name.title}
                            </MenuItem>
                          );
                        })}
                    </Select>

                 

                    <Popover
                      id={id6}
                      open={(popoverIndex === index) && openInfo6}
                      anchorEl={anchorEls}
                      onClose={handleClickCloseInfo}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: "FEFCF8",
                          boxShadow: "none",
                          maxWidth: "400px",
                          borderRadius: "5px",
                        },
                      }}
                      sx={{
                        "& .MuiPopover-paper": {
                          border: "1px solid #3e8cb5",
                          backgroundColor: "#ffffff",
                        },
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "12px",
                          fontFamily: "arial",
                          padding: "5px",
                        }}
                      >
                        {trainingSelectValue &&
                          trainingSelectValue.map((TrainingData: any) => {
                            return (
                              <>
                                {openInfo6 && formValues &&
                                  formValues[index]?.name === TrainingData.name._id && TrainingData.name.definition}
                              </>
                            );
                          })}
                      </Typography>
                    </Popover>
                  </Stack>
                </Train>
              </TableCell>
              <TableCell>
                <Tf3>
                  <TextField
                    fullWidth
                    multiline
                    autoComplete="off"
                    placeholder="Add"
                    size="small"
                    name="training_name"
                    value={element.training_name || ""}
                    onChange={(e) => {
                      handleTrainingChange(index, e);
                      setMoveTab(true);
                    }}
                    inputProps={{ maxLength: 500 }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      readOnly: disableTextAfterSubmission
                    }}
                  />
                </Tf3>
              </TableCell>
              <TableCell>
                <Tf3>
                  <TextField
                    fullWidth
                    multiline
                    placeholder="Add"
                    autoComplete="off"
                    size="small"
                    name="justification"
                    id="outlined-select-select"
                    inputProps={{ maxLength: 500 }}
                    value={element.justification || ""}
                    onChange={(e) => {
                      handleTrainingChange(index, e);
                      setMoveTab(true);
                    }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      readOnly: disableTextAfterSubmission
                    }}
                  ></TextField>
                </Tf3>
              </TableCell>

              <TableCell
                style={{ borderColor: "#ffffff", padding: "0px", paddingLeft: "12px" }}
              >
                {formValues.length !== 0 && (
                  <>
                    <Tooltip title="Delete">
                      {disableTextAfterSubmission ? <img
                        style={{ cursor: "default" }}
                        src={Blueminus}
                        alt="icon"
                      /> :
                        <img
                          style={{ cursor: "pointer" }}
                          src={Blueminus}
                          onClick={() => {
                            removeFormFields(index);
                            setMoveTab(true);
                          }}
                          alt="icon"
                        />}
                    </Tooltip>
                  </>
                )}
                {formValues.length - 1 === index && formValues.length < 6 && (
                  <>
                  <Tooltip title="Add">
                    <div>
                     {disableTextAfterSubmission ?  <img src={Blueadd}
                        style={{ cursor: "default" }}                                               
                        alt="icon" /> : 
                        <img src={Blueadd}
                        style={{ cursor: "pointer" }}                       
                        onClick={() => {
                          addFormFields();
                          setMoveTab(true);
                          setnavPrompt(true);
                        }}
                        alt="icon" />}
                    </div>
                  </Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default TrainingRecommendations;
