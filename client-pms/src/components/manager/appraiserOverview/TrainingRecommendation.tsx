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
  Button,
  Input,
  Popover,
  Typography,
} from "@mui/material";

import Blueadd from "../../../assets/appraiser/Reviewericons/Blueadd.svg";
import Blueminus from "../../../assets/appraiser/Reviewericons/Blueminus.svg";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import { Alert } from "@mui/material";
import { size } from "lodash";

import Infoicon from "./icons/Infoicon.svg";
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
const Contain = styled("div")({
  // marginRight: "20px",
  // marginLeft: "25px",
  marginTop: "10px",
});
const TrainingRecommendation = styled("div")({
  // marginLeft: "25px",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
  //opacity: 0.85
});

// const Tfbox = styled('div')({
//   width: '420px',
//   backgroundColor: '#FFFFFF',
//   '& .MuiInputLabel-root': {
//     color: '#333333',
//     opacity: '0.5',
//     fontSize: '13px',
//     fontWeight: '400',
//     textTransform: 'none',
//   },
// });
// const Addicon1= styled('div')({
//   marginLeft:'0px',
//   '&.MuiButtonBase-root': {
//     marginLeft:'0px',
//   }
// });
// const Tf = styled('div')({
//   fontSize: '13x',

//   backgroundColor: '#FFFFFF',
//   '& .MuiInputLabel-root': {
//     color: '#333333',
//     opacity: '0.5',
//     fontSize: '13px',
//     fontWeight: '400',
//     textTransform: 'none',
//   },
// });
const TextField1 = styled(TextField)({
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  opacity: "70%",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    //opacity: 0.5
  },
  "& .MuiInputLabel-root": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    opacity: 0.5,
  },
  "& .MuiFormLabel-root": {
    lineHeight: "1.75em",
  },
  "& label.Mui-focused": {
    color: "#008E97",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EBEBEB",
      //backgroundColor: '#FFFFFF',
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
      // opacity: 0.5
    },
    "&:hover fieldset": {
      borderColor: "#E7EEEE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBEBEB",
    },
  },
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
    // width: "96%"
    //  paddingRight:"8px"

  },
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
    padding: "3px",
   
  },
  "& .MuiOutlinedInput-root": {
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
const Stext = styled(TextField)({
  "& .MuiTextField-root": {
    // color: "rgb(51 51 51/50%)",
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    padding: "8px",

  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",

  },
  // "& label.Mui-focused": {
  //   //color: 'green',
  // },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "green",
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#f8f8f8",
    },
    "&:hover fieldset": {
      borderColor: "#f8f8f8",
    },
    //   "&.Mui-focused fieldset": {
    //     borderColor: "#EBEBEB",
    //   },
  },
});
const TextField2 = styled(TextField)({
  backgroundColor: "#FFFFFF",
  borderRadius: "5px",
  opacity: "70%",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    //opacity: 0.5
  },
  "& .MuiInputLabel-root": {
    color: "#333333",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
    opacity: 0.5,
  },
  "& .MuiFormLabel-root": {
    lineHeight: "1.75em",
  },
  "& label.Mui-focused": {
    color: "#008E97",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    paddingBottom: "4px",
    "& fieldset": {
      borderColor: "#EBEBEB",
      //backgroundColor: '#FFFFFF',
      color: "#333333",
      fontSize: "13px",
      fontWeight: "400",
      textTransform: "none",
      // opacity: 0.5
    },
    "&:hover fieldset": {
      borderColor: "#E7EEEE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#EBEBEB",
    },
  },
});

const Containers = styled("div")({
  marginTop: 18,
  marginLeft: 12,
  marginRight: 16,
});
const Griditems1 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
});
const Griditems2 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
  borderLeft: "0px",
});
const Griditems3 = styled("div")({
  width: "33%",
  border: "1px solid #ddd",
  height: 75,
  borderLeft: "0px",
});

const Typo1 = styled("div")({
  marginTop: "-18px",
  fontSize: "13px",
  opacity: "0.5",
  fontWeight: "400",
  color: "#3C8BB5",
});

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      fontSize: "14px !important",
      fontFamily: "arial !important",
      color: "#333333 !important",

    },
  },
};
const TrainingRecommendations = (props: any) => {
  const { training2Data, navPrompt, setnavPrompt } = props;
  const [formValues, setFormValues] = useState([
    { name: "", training_name: "", justification: ""},
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  //@ts-ignore
  const { trainingRecommendation, setTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues, errorHandler, fieldError, setFieldError, moveTab, setMoveTab
  } = useAppraisalContext();

  console.log(trainingSelectValue, "trainingRecommendation````");

  const handleTrainingChange = (i: any, e: any) => {
    // setnavPrompt(true);
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setInfo( e.target.value)
  };
  console.log(formValues,"formValues")
console.log(info,"show")
  const addFormFields = () => {
    // setnavPrompt(true);
    setFormValues([
      ...formValues,
      { name: "", training_name: "", justification: "" },
    ]);
  };

  const removeFormFields = (i: any) => {
    // setnavPrompt(true);
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  //

  useEffect(() => {
    if (trainingRecommendation.length > 0) {
      setFormValues(() => {
        return trainingRecommendation.map((j: any) => {
          return {
            name: j.name._id,
            training_name: j.training_name,
            justification: j.justification,
          };
        });
      });
    }
  }, [trainingRecommendation]);
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();

  useEffect(() => {
    setTrainingRecommendationFormValues(formValues);
  }, [formValues]);
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo6 = Boolean(anchorEls);

  const id6 = openInfo6 ? "simple-popover" : undefined;
  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEls(null);
  };
 
 
  //
  // const area: {
  //         name: "works",
  //         specific: [
  //             value: "",
  //             value: "",
  //             value: "",
  //         ]
  // }
  //
  // console.log(area)

  // useEffect(() => {

  //     (trainingRecommendationFormValues && trainingRecommendationFormValues.map((i: any) => {

  //         if (i.name != "" && i.training_name === "" && i.justification === "") {
  //             setFieldError(true)
  //         }
  //         else {
  //             setFieldError(false)
  //         }

  //     }))
  //     // if (trainingRecommendationFormValues && trainingRecommendationFormValues.)
  // }, [trainingRecommendationFormValues])
  // console.log(fieldError, 'ffffffffffff')

  return (
    <div>
      <TrainingRecommendation>

        <b>
          Training Recommendations
        </b> <span style={{
      fontSize:"22px",}}>*</span>
        
      </TrainingRecommendation>
      {/* <Contain>
        {fieldError && (
          <Alert severity="error">Please enter the required text fields!</Alert>
        )}

        {formValues.map((element, index) => (
          <Grid container spacing={0}>
            <Griditems1>
              <Grid item>
                <Containers>
                  <Box>
                    <FormControl size='small' sx={{ minWidth: 373, }}>
                      <InputLabel ><Typo1><p>Select</p></Typo1></InputLabel>
                      <Select
                        input={<SelectTextField />}
                        label="select"
                        name="dropSelect"
                        value={element.dropSelect || ""}
                        onChange={e => handleTrainingChange(index, e)}>
                        {training2Data && training2Data.data.map((TrainingData: any) => {
                          return (
                            <MenuItem value={TrainingData._id}>
                              {TrainingData.title}
                            </MenuItem>
                          )

                        })}
                      </Select>
                    </FormControl>
                    <TextField1
                      select
                      fullWidth
                      label="Select"
                      id="outlined-select-select"
                      autoComplete="off"
                      size="small"
                      name="name"
                      value={element.name || ""}
                      onChange={(e) => handleTrainingChange(index, e)}
                    >
                      {trainingSelectValue &&
                        trainingSelectValue.map((TrainingData: any) => {
                          return (
                            <MenuItem value={TrainingData.name._id}>
                              {TrainingData.name.title}
                            </MenuItem>
                          );
                        })}
                    </TextField1>
                  </Box>
                </Containers>
              </Grid>
            </Griditems1>
            <Griditems2>
              <Grid item>
                <Containers>
                  <Box>
                    <TextField2
                      fullWidth
                      inputProps={{ maxLength: 256 }}

                      autoComplete="off"
                      label="Add Training Name"
                      size="small"
                      id="outlined-select-select"
                      name="training_name"
                      value={element.training_name || ""}
                      // error={fieldError}
                      // helperText={
                      //     fieldError && "*Enter training name."}
                      onChange={(e) => handleTrainingChange(index, e)}
                    />
                  </Box>
                </Containers>
              </Grid>
            </Griditems2>
            <Griditems3>
              <Grid item>
                <Containers>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <TextField2
                        fullWidth
                        inputProps={{ maxLength: 256 }}

                        autoComplete="off"
                        label="Add Your justification"
                        size="small"
                        id="outlined-select-select"
                        name="justification"
                        // error={fieldError}
                        // helperText={
                        //     fieldError && "*Enter justification."}
                        value={element.justification || ""}
                        onChange={(e) => handleTrainingChange(index, e)}
                      />

                      {formValues.length - 1 === index &&
                        formValues.length < 6 && (
                          <Tooltip title="Add">
                          <IconButton onClick={() => addFormFields()}>
                            <img src={Blueadd} alt="icon" />
                          </IconButton>
                          </Tooltip>
                        )}

                      {formValues.length  !== 1 && (
                        <Tooltip title="Remove">
                        <IconButton onClick={() => removeFormFields(index)}>
                          <img src={Blueminus} alt="icon" />
                        </IconButton></Tooltip>
                      )}
                    </Stack>
                  </Box>
                </Containers>
              </Grid>
            </Griditems3>
          </Grid>
        ))}
      </Contain> */}
      <Contain>
        <Table size="small" style={{ marginTop: "10px" }}>
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
                width="30%"
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
              {/* <TableCell
              
            >
             

              </TableCell> */}
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
                // style={{  width: "200px" }}
                >
                  {/* {item.name.title} */}

                  <Train>
                    <Stack direction={"row"}>
                      {/* <InputLabel htmlFor="name-multiple">Division</InputLabel> */}

                      <Select
                        sx={{
                          boxShadow: "none",
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          background: "f8f8f8",
                        }}

                        // sx={{
                        //   "& label": {
                        //     marginLeft: "3%",
                        //     // marginBottom:"5%",
                        //     // "&.Mui-focused": {
                        //     //   marginLeft: 0
                        //     // }
                        //   },
                        // }}
                        // input={<Input id="name-multiple" />}

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
                        // variant="standard"
                        // InputProps={{
                        //   disableUnderline: true,
                        // }}
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
                              >

                                {TrainingData.name.title}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      {/* {info && ( */}
                        <IconButton
                          
                          onClick={(e: any) => {
                           
                            handleClickInfo6(e)
                            
                          }}
                        >
                          <img width="12px" src={Infoicon} alt="icon" />
                        </IconButton>
                       {/* )}                            */}

                      <Popover
                        id={id6}
                        open={openInfo6}
                        anchorEl={anchorEls}
                        onClose={handleCloseInfo6}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
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
                          // width: "60%",
                          "& .MuiPopover-paper": {
                            border: "1px solid #3e8cb5",
                            backgroundColor: "#ffffff",
                            // width:"30%"
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
                              // console.log(TrainingData, "TrainingData")
                              // console.log(formValues[0]?.name,"name")
                              // console.log(formValues &&
                              //   formValues[0]?.name === TrainingData.name._id && TrainingData.name.definition ,"jjjjjjjj")
                           
                                return (
                                <>

                                  {/* {openInfo6 &&TrainingData.name.definition} */}
                                  {openInfo6 && formValues &&
                                formValues[0]?.name === TrainingData.name._id && TrainingData.name.definition}
                                </>
                              );

                            })}
                          {/* {item?.name?.definition} */}
                        </Typography>
                      </Popover>
                    </Stack>
                  </Train>
                </TableCell>
                <TableCell>
                  <Tf3>
                    <TextField
                      // sx={{
                      //   "& label": {
                      //     marginLeft: "3%",
                      //     // marginBottom: "5%",
                      //     // "&.Mui-focused": {
                      //     //   marginLeft: 0,
                      //     // },
                      //   },
                      // }}
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
                      }}
                    />
                  </Tf3>
                </TableCell>
                <TableCell>
                  <Tf3>
                    <TextField
                      // sx={{
                      //   "& label": {
                      //     marginLeft: "3%",
                      //     // margin:"-10px",
                      //     // marginTop:"-10px",
                      //     // "&.Mui-focused": {
                      //     //   marginLeft: 0
                      //     // }
                      //   },
                      // }}
                      fullWidth
                      multiline
                      // label="Add"
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
                      }}
                    ></TextField>
                  </Tf3>
                </TableCell>

                <TableCell
                  style={{ borderColor: "#ffffff", paddingLeft: "11px" }}
                >
                  {formValues.length !== 1 && (
                    <Tooltip title="Delete">
                      <Button
                        size="small"
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                          textTransform: "none",
                          // height: "20px",
                          minWidth: "2px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontSize: "14px",
                          // marginTop: "25px",
                        }}
                      >
                        <img
                          src={Blueminus}
                          onClick={() => {
                            removeFormFields(index);
                            setMoveTab(true);
                          }}
                          alt="icon"
                        />
                      </Button>
                    </Tooltip>
                  )}
                  {formValues.length - 1 === index && formValues.length < 6 && (
                    <Tooltip title="Add">
                      <Button
                        size="small"
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                          textTransform: "none",
                          // height: "20px",
                          minWidth: "2px",
                          textDecoration: "underline",
                          color: "#93DCFA",
                          fontSize: "14px",
                          // marginTop: "25px",
                        }}
                        onClick={() => {
                          addFormFields();
                          setMoveTab(true);
                        }}
                      >
                        <img src={Blueadd}
                          onClick={() => {
                            removeFormFields(index);
                            setMoveTab(true);
                          }}
                          alt="icon" />
                      </Button>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </Contain>
    </div>
  );
};

export default TrainingRecommendations;
