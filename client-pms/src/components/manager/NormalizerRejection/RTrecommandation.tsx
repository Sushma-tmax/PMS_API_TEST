import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button, Popover, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Blueadd from"../ReviewerRejection/Icons/Blueadd.svg";
import Blueminus from "../ReviewerRejection/Icons/Blueminus.svg";
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
import Infoicon from "./Icons/Infoicon.svg";

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
    textAlign:"left"
  },
});
const Contain = styled("div")({
    // marginRight: "20px",
    marginLeft: "60px",
    marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
    marginLeft: "60px",
    // marginTop: '10px',
    color: "#717171",
    fontSize: "16px",
    paddingTop:"20px",
    fontFamily:"arial"

    // opacity: 0.85
});
const TextField1 = styled(TextField)({
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    //opacity: 0.7,
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
        // borderColor: "#EBEBEB",
        //backgroundColor: '#FFFFFF',
        color: "#333333",
        fontSize: "13px",
        fontWeight: "400",
        textTransform: "none",
        // opacity: 0.5
      },
    //   "&:hover fieldset": {
    //     borderColor: "#E7EEEE",
    //   },
    //   "&.Mui-focused fieldset": {
    //     borderColor: "#EBEBEB",
    //   },
    },
  });
const Tfbox = styled('div')({
    width: '400px',
    backgroundColor: "#f8f8f8",
    '& .MuiInputLabel-root': {
        color: '#333333',
        opacity: '0.5',
        fontSize: "14px",
        fontWeight: '400',
        textTransform: 'none',
    },
});
const Tf = styled('div')({
    fontSize: '14x',

    backgroundColor: "#f8f8f8",
    '& .MuiInputLabel-root': {
        color: '#333333',
        textTransform: "none",
        // opacity: '0.5',
        fontSize: '13px',
        fontWeight: '400',
        borderRadius: "5px",
        // textTransform: 'none',
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
    width:"96%"

    
  },
 "& .MuiInputBase-input": {
     color: "#333333",
   fontSize: "14px",
   fontFamily:"Arial",
     textAlign:"left",
    //  paddingRight:"8px"
   
   },
   "& .MuiInputBase-root": {
  backgroundColor:"#f8f8f8",
  padding:"3px"
  },
  // "& .MuiOutlinedInput-root": {
  //     "& fieldset": {
  //       borderColor: "#f8f8f8",
  //     },
  // "&:hover fieldset": {
  //       borderColor: "#f8f8f8",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "#f8f8f8",
  //     },
  //   },
});
const Containers = styled('div')({
    marginTop: 18,
    marginLeft: 12,
    marginRight: 16,
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
});
const Griditems1 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems2 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems3 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});

const Typo1 = styled("div")({

    marginTop: "-15px",
    fontSize: '13px',
    opacity: '0.5',
    fontWeight: '400',
    color: '#333333'

});
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      fontSize:"14px !important",
      fontFamily:"arial !important",
      color:"#333333 !important"
    },
  },
};
const RTrecommandation = (props: any) => {
    const { training1Data,setnavPrompt,navPrompt ,moveTab,setMoveTab } = props;

    // @ts-ignore
    const { trainingRecommendation, setTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues
    } = useAppraiserRejectsNormalizerContext()

    const [formValues, setFormValues] = useState([{ name: "", training_name: "", justification: "" }])
    const [info, setInfo] = React.useState(false);

    const handleTrainingChange = (i: any, e: any) => {
        setnavPrompt(true)
        const newFormValues = [...formValues];
        //@ts-ignore
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        setInfo( e.target.value)
    }
    const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
      null
    );
    const openInfo = Boolean(anchorEls);
  
    const id2 = openInfo ? "simple-popover" : undefined;
    const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEls(event.currentTarget);
    };
    const handleCloseInfo = () => {
      setAnchorEls(null);
    };
    const addFormFields = () => {
        setnavPrompt(true)
        setFormValues([...formValues, { name: "", training_name: "", justification: "" }])
    }

    const removeFormFields = (i: any) => {
        setnavPrompt(true)
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
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

    useEffect(() => {
        setTrainingRecommendationFormValues(formValues);
    }, [formValues]);

    return (
        <div>
            <TrainingRecommendations>
               <b> Training Recommendations</b> <span style={{fontSize:"22px"}}>*</span>
            </TrainingRecommendations>
            <Contain>

            <Table size="small" style={{ marginTop: "7px" }}>
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
                <TableCell
                // style={{  width: "200px" }}
                >
                  {/* {item.name.title} */}
                  <Train>
                  <Stack direction={"row"}>
                    <Select
                                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },background:"f8f8f8" }}

                      // sx={{
                      //   "& label": {
                      //     marginLeft: "5%",
                      //     // marginBottom:"5%",
                      //     // "&.Mui-focused": {
                      //     //   marginLeft: 0
                      //     // }
                      //   },
                      // }}
                      // select
                      MenuProps={MenuProps}
                      fullWidth
                      autoComplete="off"
                      // label="Add  Name"
                      // label="Select"
                      size="small"
                      name="name"
                      displayEmpty
                      value={element.name || ""}
                      renderValue={
                        element.name || ""
                          ? undefined
                          : () => <div style={{ color: "#aaa" }}>Select</div>
                      }
                      onChange={(e) => {handleTrainingChange(index, e)
                        setnavPrompt(true);
                        setMoveTab(true)
                      }}


                      // variant="standard"
                      // InputProps={{
                      //   disableUnderline: true,
                      // }}
                    >
                      {trainingSelectValue &&
                        trainingSelectValue.map((TrainingData: any) => {
                          return (
                            <MenuItem  style={{fontSize:"14px",
                            fontFamily:"arial",
                          color:"#333333"}} value={TrainingData.name._id}>
                              {TrainingData.name.title}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    
                    {/* {info && ( */}
                    <IconButton
                        // aria-describedby={id2}
                        onClick={handleClickInfo}
                        // style={{marginRight:"5px"}}
                      >
                        <img width="12px"  src={Infoicon} alt="icon" />
                      </IconButton>
                    {/* )} */}
                      <Popover
              id={id2}
              open={openInfo}
              anchorEl={anchorEls}
              onClose={handleCloseInfo}
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
                          console.log(TrainingData,"TrainingData")
                          return (
                            <>
                                  {openInfo && formValues &&
                                formValues[0]?.name === TrainingData.name._id && TrainingData.name.definition}                  
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
                      // sx={{
                      //   "& label": {
                      //     marginLeft: "5%",
                      //     // marginBottom: "5%",
                      //     // "&.Mui-focused": {
                      //     //   marginLeft: 0,
                      //     // },
                      //   },
                      // }}
                      fullWidth
                      multiline
                      autoComplete="off"
                      // label="Add"
                      placeholder='Add'
                      size="small"
                      name="training_name"
                      value={element.training_name || ""}
                      onChange={(e) => {handleTrainingChange(index, e)
                        setnavPrompt(true);
                        setMoveTab(true)
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
                      //     marginLeft: "5%",
                      //     // margin:"-10px",
                      //     // marginTop:"-10px",
                      //     // "&.Mui-focused": {
                      //     //   marginLeft: 0
                      //     // }
                      //   },
                      // }}
                      fullWidth
                      // label="Add"
                      placeholder='Add'
                      autoComplete="off"
                      size="small"
                      multiline
                      name="justification"
                      id="outlined-select-select"
                      inputProps={{ maxLength: 500 }}
                      value={element.justification || ""}
                      onChange={(e) => {handleTrainingChange(index, e)
                        setnavPrompt(true);
                        setMoveTab(true)
                      }}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                    ></TextField>
                  </Tf3>
                </TableCell>

                <TableCell style={{ borderColor: "#ffffff" }}>
                 
                      {formValues.length  !== 1 && (
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
                    <img src={Blueminus} 
                     onClick={() => removeFormFields(index)} 
                     alt="icon" />
                  </Button>
                   )}
                    {formValues.length - 1 === index &&
                    formValues.length < 6 && (
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
                      >
                        <img src={Blueadd} alt="icon" />
                      </Button>
                    )}
                </TableCell>

              </TableRow>
            </TableBody>
          ))}
          
          </Table>
            </Contain>
        </div>
    );
}

export default RTrecommandation

