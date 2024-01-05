import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button, Popover, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import Blueadd from "../../../../assets/Images/Blueadd.svg";
import Blueminus from "../../../../assets/Images/Blueminus.svg";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import { SpaceBarOutlined } from '@mui/icons-material';

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
  // marginLeft: "35px",

});

const TrainingRecommendations = styled("div")({
  // marginLeft: "35px",
  // marginTop: '10px',
  color: "#717171",
  fontSize: "16px",
  marginBottom: "10px",
  fontFamily: "arial"
});

const Train = styled("div")({
  "& .MuiTextField-root": {
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    padding: "8px",
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
    padding: "3px"
  },
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
      color: "#333333 !important"
    },
  },
};
const RTrecommandation = (props: any) => {
  const { employeeData, setnavPrompt, setMoveTab } = props;
  // @ts-ignore
  const { trainingRecommendation, trainingSelectValue, setTrainingRecommendationFormValues, disableTextAfterSubmission
  } = useAppraiserRejectsNormalizerContext()
  // @ts-ignore
  const [formValues, setFormValues] = useState([{ name: "", training_name: "", justification: "" }])
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(null);
  const openInfo = Boolean(anchorEls);
  const id2 = openInfo ? "simple-popover" : undefined;
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [anchorEls1, setAnchorEls1] = React.useState<HTMLButtonElement | null>(null);
  const openInfo1 = Boolean(anchorEls1);
  const id21 = openInfo1 ? "simple-popover" : undefined;
  const [formValues1, setFormValues1] = useState([
    { name: "", training_name: "", justification: "" },
  ]);
  const handleTrainingChange = (i: any, e: any) => {
    setnavPrompt(true)
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }

  const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls1(event.currentTarget);
  };
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo1 = () => {
    setAnchorEls1(null);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };

  const addFormFields = () => {
    // setnavPrompt(true)
    setFormValues([...formValues, { name: "", training_name: "", justification: "" }])
  }

  const removeFormFields = (i: any) => {
    setnavPrompt(true);
    setMoveTab(true);
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
  }

  useEffect(() => {
    if (formValues?.length == 0) {
      addFormFields()
    }
  }, [formValues])

  useEffect(() => {
    if (employeeData) {
      setFormValues(() => {
        return employeeData?.data?.appraisal?.training_recommendation?.map((j: any) => {
          return {
            name: j.name._id,
            training_name: j.training_name,
            justification: j.justification,
          };
        });
      });
    }
  }, [employeeData]);
  useEffect(() => {
    setFormValues1(() => {
      return employeeData.data.employee.training_recommendation.map(
        (i: any) => {
          console.log(i, "Training");
          return {
            ...i,
            name: i.name,
            justification: i.justification,
            trainingName: i.training_name,
          };
        }
      );
    });
  }, [employeeData]);
  useEffect(() => {
    setTrainingRecommendationFormValues(formValues);
  }, [formValues]);

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <TrainingRecommendations>
          <b> Training Recommendations</b>
        </TrainingRecommendations>
        <Contain>

          <Table size="small" >
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
                  <TableCell>
                    <Train>
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse"
                        }}
                        direction={"row"}>
                        <Select
                          style={{
                            backgroundColor:
                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                ? "#f8f8f8"
                                : "#ffffff",
                          }}
                          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, background: "f8f8f8" }}
                          MenuProps={MenuProps}
                          fullWidth
                          autoComplete="off"
                          disabled={(employeeData?.data?.employee?.employee_status == "rejected" ||
                          employeeData?.data?.appraisal?.status == "rejected") }
                          size="small"
                          name="name"
                          displayEmpty
                          value={element.name || ""}
                          renderValue={
                            element.name || ""
                              ? undefined
                              : () => <div style={{ color: "#aaa" }}>Select</div>
                          }
                          onChange={(e) => {
                            handleTrainingChange(index, e)
                            setnavPrompt(true);
                            setMoveTab(true)
                          }}
                        >
                          {trainingSelectValue &&
                            trainingSelectValue.map((TrainingData: any) => {
                              return (
                                <MenuItem style={{
                                  fontSize: "14px",
                                  fontFamily: "arial",
                                  color: "#333333"
                                }}
                                  disabled={disableTextAfterSubmission}
                                  value={TrainingData.name._id}>
                                  {TrainingData.name.title}

                                </MenuItem>
                              );
                            })}
                        </Select>

                        {element?.name != "" && (
                          <IconButton
                            onClick={(e: any) => {
                              handleClickInfo(e)
                              setPopoverIndex(index);
                            }}
                          >
                            <img width="12px" src={Infoicon} alt="icon" />
                          </IconButton>
                        )}
                        <Popover
                          id={id2}
                          open={(popoverIndex === index) && openInfo}
                          anchorEl={anchorEls}
                          onClose={handleCloseInfo}
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
                                console.log(TrainingData, "TrainingData")
                                return (
                                  <>
                                    {openInfo && formValues &&
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
                        style={{
                          backgroundColor:
                            employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                              ? "#f8f8f8"
                              : "#ffffff",
                        }}
                        fullWidth
                        multiline
                        autoComplete="off"
                        // label="Add"
                        placeholder='Add'
                        size="small"
                        name="training_name"
                        value={element.training_name || ""}
                        onChange={(e) => {
                          handleTrainingChange(index, e)
                          setnavPrompt(true);
                          setMoveTab(true)
                        }}
                        inputProps={{ maxLength: 500 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: disableTextAfterSubmission,
                          disabled:
                                (employeeData?.data?.employee?.employee_status == "rejected" ||
                                employeeData?.data?.appraisal?.status == "rejected"),
                        }}
                      />
                    </Tf3>
                  </TableCell>
                  <TableCell>
                    <Tf3>
                      <TextField
                        style={{
                          backgroundColor:
                            employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                              ? "#f8f8f8"
                              : "#ffffff",
                        }}
                        fullWidth
                        placeholder='Add'
                        autoComplete="off"
                        size="small"
                        multiline
                        name="justification"
                        id="outlined-select-select"
                        inputProps={{ maxLength: 500 }}
                        value={element.justification || ""}
                        onChange={(e) => {
                          handleTrainingChange(index, e)
                          setnavPrompt(true);
                          setMoveTab(true)
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: disableTextAfterSubmission,
                          disabled:
                                employeeData?.data?.employee?.employee_status == "rejected" ||
                                employeeData?.data?.appraisal?.status == "rejected",
                        }}
                      ></TextField>
                    </Tf3>
                  </TableCell>
                  <TableCell style={{ borderColor: "#ffffff", padding: "0px", paddingLeft: "12px" }}>
                    
                  { (employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected") && 
                  <span>
                    {formValues.length !== 0 && (
                      <div
                      // size="small"
                      // style={{
                      //   display: "flex",
                      //   justifyContent: "right",
                      //   alignItems: "right",
                      //   textTransform: "none",
                      //   // height: "20px",
                      //   minWidth: "2px",
                      //   textDecoration: "underline",
                      //   color: "#93DCFA",
                      //   fontSize: "14px",
                      //   // marginTop: "25px",
                      // }}
                      // disabled={disableTextAfterSubmission}
                      >
                        {disableTextAfterSubmission ?
                          <Tooltip title="Delete">
                            <img src={Blueminus}
                              style={{ cursor: "default" }}
                              alt="icon" />
                          </Tooltip> :
                          <Tooltip title="Delete">
                            <img src={Blueminus}
                              style={{ cursor: "pointer" }}
                              onClick={() => removeFormFields(index)}
                              alt="icon" />
                          </Tooltip>
                        }
                      </div>
                    )}
                    {formValues.length - 1 === index &&
                      formValues.length < 6 && (
                        <div
                        // size="small"
                        // style={{
                        //   display: "flex",
                        //   justifyContent: "right",
                        //   alignItems: "right",
                        //   textTransform: "none",
                        //   height: "20px",
                        //   minWidth: "0px",
                        //   textDecoration: "underline",
                        //   color: "#3e8cb5",
                        //   fontSize: "14px",
                        //   // marginTop: "25px",
                        // }}

                        // disabled={disableTextAfterSubmission}
                        >
                          {disableTextAfterSubmission  ?
                            <Tooltip title="Add">
                              <img src={Blueadd} alt="icon"
                                style={{ cursor: "default" }}
                               />
                            </Tooltip> :
                            <Tooltip title="Add">
                              <img src={Blueadd} alt="icon"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  addFormFields();
                                  setnavPrompt(true);
                                  setMoveTab(true)
                                }} />
                            </Tooltip>
                          }

                        </div>
                      )}
                      </span>
                    }
                  </TableCell>
          
                </TableRow>
              </TableBody>
            ))}

          </Table>
        </Contain>
      </div >
      {(employeeData?.data?.employee?.employee_status == "rejected" && formValues1?.length > 0 &&
        <div style={{ marginRight: "30px", marginBottom: "20px" }}>
          <TrainingRecommendations>
            <b> Training Recommendations (Employee)</b>
          </TrainingRecommendations>
          <Contain>

            <Table size="small" >
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
                </TableRow>
              </TableHead>


              {formValues1.map((element, index) => (
                <TableBody>
                  <TableRow
                    sx={{
                      "& td, & th": {
                        border: "1px solid #e0e0e0",
                      },
                    }}
                  >
                    <TableCell>
                      <Train>
                        <Stack direction={"row"}>
                          {element?.name != "" && (
                            <IconButton
                              onClick={(e: any) => {
                                handleClickInfo1(e)
                                setPopoverIndex1(index);
                              }}
                            >
                              <img width="12px" src={Infoicon} alt="icon" />
                            </IconButton>
                          )}
                          <Select
                            style={{
                              backgroundColor:
                                employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                  ? "#f8f8f8"
                                  : "#ffffff",
                            }}
                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, background: "f8f8f8" }}
                            MenuProps={MenuProps}
                            fullWidth
                            autoComplete="off"
                            size="small"
                            name="name"
                            displayEmpty
                            value={element.name || ""}
                            renderValue={
                              element.name || ""
                                ? undefined
                                : () => <div style={{ color: "#aaa" }}>Select</div>
                            }
                            onChange={(e) => {
                              handleTrainingChange(index, e)
                              setnavPrompt(true);
                              setMoveTab(true)
                            }}
                          >
                            {trainingSelectValue &&
                              trainingSelectValue.map((TrainingData: any) => {
                                return (
                                  <MenuItem style={{
                                    fontSize: "14px",
                                    fontFamily: "arial",
                                    color: "#333333"
                                  }}
                                    disabled={true}
                                    value={TrainingData.name._id}>
                                    {TrainingData.name.title}

                                  </MenuItem>
                                );
                              })}
                          </Select>


                          <Popover
                            id={id21}
                            open={(popoverIndex1 === index) && openInfo1}
                            anchorEl={anchorEls1}
                            onClose={handleCloseInfo1}
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
                                  console.log(TrainingData, "TrainingData")
                                  return (
                                    <>
                                      {openInfo1 && formValues1 &&
                                        formValues1[index]?.name === TrainingData.name._id && TrainingData.name.definition}
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
                          style={{
                            backgroundColor:
                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                ? "#f8f8f8"
                                : "#ffffff",
                          }}
                          fullWidth
                          multiline
                          autoComplete="off"
                          // label="Add"
                          placeholder='Add'
                          size="small"
                          name="training_name"
                          value={element.training_name || ""}
                          onChange={(e) => {
                            handleTrainingChange(index, e)
                            setnavPrompt(true);
                            setMoveTab(true)
                          }}
                          inputProps={{ maxLength: 500 }}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true
                          }}
                        />
                      </Tf3>
                    </TableCell>
                    <TableCell>
                      <Tf3>
                        <TextField
                          style={{
                            backgroundColor:
                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                ? "#f8f8f8"
                                : "#ffffff",
                          }}
                          fullWidth
                          placeholder='Add'
                          autoComplete="off"
                          size="small"
                          multiline
                          name="justification"
                          id="outlined-select-select"
                          inputProps={{ maxLength: 500 }}
                          value={element.justification || ""}
                          onChange={(e) => {
                            handleTrainingChange(index, e)
                            setnavPrompt(true);
                            setMoveTab(true)
                          }}
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true
                          }}
                        ></TextField>
                      </Tf3>
                    </TableCell>

                    <TableCell style={{ borderColor: "#ffffff" }}>
                      {/* {formValues1.length !== 0 && (
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
                      disabled = {disableTextAfterSubmission}
                    >
                      <img src={Blueminus}
                        onClick={() => removeFormFields(index)}                        
                        alt="icon" />
                    </Button>
                  )} */}
                      {/* {formValues1.length - 1 === index &&
                    formValues1.length < 6 && (
                      <Button
                        size="small"
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                          textTransform: "none",
                          height: "20px",
                          minWidth: "0px",
                          textDecoration: "underline",
                          color: "#3e8cb5",
                          fontSize: "14px",
                          // marginTop: "25px",
                        }}
                        onClick={() => addFormFields()}
                        disabled = {disableTextAfterSubmission}
                      >
                        <img src={Blueadd} alt="icon" />
                      </Button>
                    )} */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}

            </Table>
          </Contain>
        </div>
      )
      }
    </>
  );
}

export default RTrecommandation

