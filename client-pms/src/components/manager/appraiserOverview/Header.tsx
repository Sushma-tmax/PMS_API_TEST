import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useCalculateRatingsMutation } from "../../../service";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useUpdateEmployeeAppraisalMutation } from "../../../service";
import Infoicon from "../../manager/appraiserOverview/icons/Infoicon.svg";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import { borderRadius } from "@mui/system";
const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Name = styled("div")({
  fontSize: "17px",
  fontWeight: 400,
  color: "#3e8cb5",
  fontFamily: "Arial",
  textAlign: "left",
});
const Speciality = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
});
const Grade = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#004C75",
  //opacity: 0.5,
  textAlign: "left",
  paddingTop: "3px",
});
const Employeecode = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
});
const Appraisaldate = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#004C75",
  marginTop: "5px",
  textAlign: "left",
});
const Link = styled("div")({
  fontSize: "13px",
  fontWeight: 400,
  color: "#52C8F8",
  textDecoration: "underline",
  textAlign: "left",
  marginTop: "3px",
});
const Pastrating = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
  marginTop: "4px",
});
const Pastratingvalue = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  opacity: 0.5,
  color: "#333333",
  // paddingTop:'2px',
  textAlign: "left",
  paddingBottom: "5px",
});
const Dividerroot = styled("div")({
  "& .MuiDivider-root": {
    marginTop: "10px",
    marginBottom: "15px",
    marginLeft: "0px",
  },
});
const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
});
const Overallratingvalue = styled("div")({
  fontSize: "16px",
  fontFaily: "arial",
  // fontWeight: 400,
  // color: "#3e8cb5",
  //opacity: 0.5,
  //textAlign: 'left'
  // marginTop:'10px'
});
const Overallratingcomments = styled("div")({
  fontSize: "14px",
  fontWeight: 400,
  color: "#333333",
  fontFamily: "arial",
  opacity: 0.8,
  //textAlign: 'left'
  //marginTop:'10px'
});

const Appraisal = styled("div")({
  fontSize: "12px",
  color: "#004C75",
});

const Appdate = styled("div")({
  fontSize: "12px",
  color: "#004C75",
});
const Header = (props: any) => {
  const { appraisalData, ratingScaleData, nineBoxData } = props;
  const { employee_id } = useParams();
  const [calc] = useCalculateRatingsMutation();
  console.log(appraisalData, "aaaaaaaaaaaaaaaaaaaa");
  const today = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingScaleData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };
  // @ts-ignore
  const { potentialValue, setPotentialValue } = useAppraisalContext();
  const [addPotential] = useUpdateEmployeeAppraisalMutation();
  const [potential, setPotential] = React.useState<any>(
    // appraisalData?.data?.appraisal?.potential
    ""
  );

  console.log(appraisalData, "aaaaaaaaaaaaaaaaaaaa");
  const [potentialArray, setPotentialArray] = React.useState<any>([
    "Low",
    "Moderate",
    "High",
  ]);
  // const months = [
  //   "January", "February", "March", "April", "May", "June", "July",
  //   "August", "September", "October", "November", "December"
  // ]
  const [potentialHide, setPotentialHide] = React.useState(true);

  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE2(event.currentTarget);
  };
  const open2 = Boolean(anchorE2);
  const id2 = open2 ? "simple-popover" : undefined;

  const [anchorE3, setAnchorE3] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose3 = () => {
    setAnchorE3(null);
  };
  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE3(event.currentTarget);
  };

  const open3 = Boolean(anchorE3);
  const id3 = open3 ? "simple-popover" : undefined;

  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorE(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  const open = Boolean(anchorE);
  const id = open ? "simple-popover" : undefined;
  const [activeEmployee, setActiveEmployee] = useState("");
  useEffect(() => {
    if (appraisalData) {
      console.log(appraisalData?.data?.appraisal?.potential);
      setActiveEmployee(appraisalData.data._id);
      setPotential(appraisalData?.data?.appraisal?.potential);
    }
  }, [appraisalData]);

  useEffect(() => {
    setPotentialValue(potential)
  }, [potential])

  // useEffect(() => {
  //   if (appraisalData?.data?.appraisal?.potential) {
  //     setPotential(appraisalData?.data?.appraisal?.potential);
  //   }

  // }, [])

  const handleChange = (event: any) => {
    setPotential(event.target.value as string);
    // addPotential({
    //   "appraisal.potential": event.target.value,
    //   id: employee_id,
    // });
    // setnavPrompt(true);
  };

  // to get PA Status

  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "in-progress") {
      return "In progress";
    } else if (data?.appraisal?.status == "completed") {
      return "Completed";
    } else if (data?.appraisal?.status == "not-started") {
      return "Not started";
    }
    else if (data?.appraisal?.status == "rejected") {
      return "Employee rejected";
    }
  }
  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 200,
        fontSize:"14px !important",
        fontFamily:"arial !important",
        color:"#333333 !important"
      },
    },
  };

  return (
    <div>
      <Stack
        direction="row"
        alignItems="baseline"
        paddingBottom="10px"
        justifyContent="space-between"
      >
        <Typography
          style={{
            color: "#3E8CB5",
            fontWeight: "400",
            fontSize: "28px",
            fontFamily: "Arial",
            marginLeft: "16px",
          }}
        >
          Welcome to Performance Appraisal!
        </Typography>
        <Typography
          style={{
            fontSize: "17px",
            color: "#3E8CB5",
            fontFamily: "Arial",
            paddingRight: "80px",
          }}
        >
          PA Status:{" "}
          <span
            style={{
              color: "#717171",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Arial",
            }}
          >
            {appraisalData && getPAStatus(appraisalData?.data)}
          </span>
        </Typography>
      </Stack>
      <Box
        sx={{
          // height: "80px",
          // width: "96%",
          marginLeft: "20px",
          marginRight: "74px",
          marginTop: "0px",
          // background: "#004c75",
          // borderRadius: "5px",
          backgroundColor: "#f3fbff",
          // paddingBottom: "10px",
        }}
      >
        <div>
          <Dividerroot>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              // mr={2}
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>
                <Box>
                  <Stack direction="row" spacing={1}>
                    {/*<Avatar style={{ width: "50px", height: "50px" }}>*/}
                    {/*  {appraisalData &&*/}
                    {/*    appraisalData.data.legal_full_name.substring(0, 1)}*/}
                    {/*</Avatar>*/}
                      <img src={appraisalData?.data?.profile_image_url}/>
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Name>
                          {appraisalData && appraisalData.data.legal_full_name}
                        </Name>
                        {/* <Grade>
                          (Grade{appraisalData && appraisalData.data.grade})
                        </Grade> */}
                      </Stack>
                      <Speciality>
                        {appraisalData &&
                          appraisalData.data.position_long_description}
                      </Speciality>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                        textAlign="center"
                      >
                        {/* <Pastrating>Employee Code :</Pastrating> */}
                        <Pastratingvalue>
                          {appraisalData?.data?.employee_code}
                        </Pastratingvalue>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Item>
              {/* {potential != false &&
                <Item>
                  <Stack direction="column" alignItems="center">
                    <Typography
                      // position="absolute"
                      // variant="caption"
                      color="#3e8cb5"
                      fontFamily="arial"
                      fontSize="17px"
                      // paddingTop="3px"
                    >
                      Potential Level
                    </Typography>

                    <Typography>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={potential}
                        >
                          <FormControlLabel
                            value="Low"
                            control={<Radio size="small" />}
                            label={
                              <span style={{ fontSize: "14px", fontFamily:"arial",color:"#333333" }}>
                                Low
                                <IconButton onClick={handleClick}>
                                  <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorE}
                                  onClose={handleClose}
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
                                      maxWidth:"400px",
                                      borderRadius:"5px",
                                    },
                                  }}
                                  sx={{
                                   
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #3e8cb5",
                                      backgroundColor: "#ffffff",
                                      // width: "30%",
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "10px",
                                      fontSize: "13px",
                                      lineHeight:"20px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      
                                    }}
                                  >
                                    {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                                  </div>
                                </Popover>{" "}
                              </span>
                            }
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormControlLabel
                            value="Moderate"
                            control={<Radio size="small" />}
                            label={
                              <span style={{ fontSize: "14px", fontFamily:"arial",color:"#333333" }}>
                                Moderate
                                <IconButton onClick={handleClick2}>
                                  <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id2}
                                  open={open2}
                                  anchorEl={anchorE2}
                                  onClose={handleClose2}
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
                                      maxWidth:"400px",
                                      borderRadius:"5px",
                                    },
                                  }}
                                  sx={{
                                    // width: "60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #3e8cb5",
                                      backgroundColor: "#ffffff",
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "10px",
                                      fontSize: "13px",
                                      lineHeight:"20px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.moderate}
                                    {" "}
                                    
                                  </div>
                                </Popover>
                              </span>
                            }
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <FormControlLabel
                            value="High"
                            control={<Radio size="small" />}
                            label={
                              <span style={{ fontSize: "14px", fontFamily:"arial",color:"#333333" }}>
                                High
                                <IconButton onClick={handleClick3}>
                                  <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id3}
                                  open={open3}
                                  anchorEl={anchorE3}
                                  onClose={handleClose3}
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
                                      maxWidth:"400px",
                                      borderRadius:"5px",
                                      minWidth:"100px",
                                      
                                    },
                                  }}
                                  sx={{
                                    // width: "60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #3e8cb5",
                                      backgroundColor: "#ffffff",
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      padding: "10px",
                                      fontSize: "13px",
                                      lineHeight:"20px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                   {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.high}
                                   {""}
                                  </div>
                                </Popover>
                              </span>
                            }
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Typography>
                  </Stack>
                </Item>
              } */}

              <Item>
                <Stack
                  direction="column"
                  alignItems="flex-end"
                  paddingRight="10px"
                >
                  <Overallrating>Overall Rating</Overallrating>

                  <Overallratingvalue>
                    <b>
                      {appraisalData &&
                        // appraisalData?.data?.appraisal?.appraiser_rating == 0 ? "Not yet rated" :
                        appraisalData?.data.appraisal?.appraiser_rating}
                    </b>
                  </Overallratingvalue>
                  {/* <Overallratingcomments>                   
                     {appraisalData &&
                    getRatingDescription(
                       appraisalData.data.appraisal.appraiser_rating
                     )} 
                    Rating excefing
                  </Overallratingcomments> */}
                </Stack>
              </Item>
            </Stack>
          </Dividerroot>
        </div>
      </Box>
      <Box
        sx={{ paddingTop: "20px", paddingLeft: "17px", paddingRight: "74px" }}
      >
        {/* <Grid container spacing={0}> */}
        {/* <Grid item xs={12}> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingBottom="20px"
        >
          <Grid item xs={4}>
            <span
              style={{
                fontSize: "20px",
                color: "#3E8CB5",
                fontFamily: "Arial",
              }}
            >
              Performance Appraisal Period
            </span>
            <Typography
              style={{
                color: "#717171",
                marginTop: "8px",
                fontSize: "16px",
                fontFamily: "Arial",
              }}
            >
              {appraisalData?.data.calendar?.name}
            </Typography>
          </Grid>
          {appraisalData?.data?.appraisal_template?.potential === true && (
            <Grid item xs={4}>
              <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="flex-end"
              // paddingBottom="20px"
              >
                <Typography color="#3e8cb5" fontFamily="arial" fontSize="17px">
                  Potential Level
                  <IconButton onClick={handleClick}>
                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  </IconButton>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorE}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      style: {
                        backgroundColor: "FEFCF8",
                        boxShadow: "none",
                        maxWidth: "550px",
                        borderRadius: "5px",
                      },
                    }}
                    sx={{
                      "& .MuiPopover-paper": {
                        border: "1px solid #3e8cb5",
                        backgroundColor: "#ffffff",
                        // width: "30%",
                      },
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                        fontSize: "13px",
                        lineHeight: "20px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                    >
                      {/* <b>High :  {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.low}{" "}</b>
                    <b>Medium : {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.moderate}{" "}</b>
                    <b>Low : {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.high}{" "}   </b> */}
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#3e8cb5",
                          fontFamily: "Arial",
                          // paddingBottom:"10px",

                          paddingBottom: "5px",
                          borderBottom: "1px solid #d9d9d9"
                        }}
                      >
                        High:{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {nineBoxData &&
                            nineBoxData?.data[0]?.potential_definitions?.high}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#3e8cb5",
                          fontFamily: "Arial",
                          paddingBottom: "5px",
                          paddingTop: "5px",
                          borderBottom: "1px solid #d9d9d9"

                        }}
                      >
                        Moderate:{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {nineBoxData &&
                            nineBoxData?.data[0]?.potential_definitions?.moderate}{" "}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          color: "#3e8cb5",
                          fontFamily: "Arial",
                          paddingTop: "5px",
                        }}
                      >
                        Low:{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {nineBoxData &&
                            nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                        </span>
                      </Typography>

                    </div>
                  </Popover>
                </Typography>
                {appraisalData?.data?.appraisal && (
                  <>
                    <Select sx={{
                      width:"75%",
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    MenuProps={MenuProps}
                      size="small"
                      value={potential}
                      onChange={(e) => {
                        handleChange(e);
                      }}>

                      <MenuItem style={{ fontSize: "14px",fontFamily:"arial",color:"#333333" }} value="High">High</MenuItem>
                      <MenuItem style={{ fontSize: "14px" ,fontFamily:"arial",color:"#333333"}} value="Moderate">Moderate</MenuItem>
                      <MenuItem style={{ fontSize: "14px",fontFamily:"arial",color:"#333333" }} value="Low">Low</MenuItem>

                    </Select>
                  </>
                )}



                {/* <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
    <Select
      labelId="demo-select-small"
      id="demo-select-small"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl> */}

              </Stack>
            </Grid>
          )}
        </Stack>
        {/* </Grid> */}
        {/* </Grid> */}
      </Box>
    </div>
  );
};

export default Header;
