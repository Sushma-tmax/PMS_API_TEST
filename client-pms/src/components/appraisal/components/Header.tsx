import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useUpdateEmployeeAppraisalMutation } from "../../../service";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import Infoicon from "../components/Icons/Infoicon.svg";
import IconButton from '@mui/material/IconButton';
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import {APPRAISER,VIEW_PA} from "../../../constants/routes/Routing";
import {Link} from "react-router-dom";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Name = styled("div")({
  fontSize: "17px",
  fontWeight: 400,
  color: "#004C75",
  textAlign: "left",
  paddingBottom: "5px",
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
  // fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
  paddingBottom: "5px",
});
const Appraisaldate = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#004C75",
  marginTop: "5px",
  textAlign: "left",
  // fontFamily:"regular"
});
const Links = styled("div")({
  fontSize: "13px",
  fontWeight: 400,
  color: "#52C8F8",
  textDecoration: "underline",
  textAlign: "left",
  marginTop: "3px",
});
const Link1 = styled("div")({
  color: "#52C8F8",
  textDecoration: "underline",
  textAlign: "left",
});
const Pastrating = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
  paddingBottom: "5px",
});
const Pastratingvalue = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  // paddingTop:'2px',
  textAlign: "left",
});
const Dividerroot = styled("div")({
  "& .MuiDivider-root": {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
  },
});

const Header = (props: any) => {
  const { appraisalData, navPrompt, setnavPrompt } = props;
  const { employee_id } = useParams();
  if (appraisalData) {
    // const calendarStartDate = appraisalData.data.calendar.start_date;
    // const calendarEndDate = appraisalData.data.calendar.end_date;
  }
  const [addPotential] = useUpdateEmployeeAppraisalMutation();
  const [potential, setPotential] = React.useState(appraisalData?.data?.appraisal?.potential);
  console.log(appraisalData, "aaaaaaaaaaaaaaaaaaaa");
  const [potentialArray, setPotentialArray] = React.useState<any>([
    "Low",
    "Moderate",
    "High",
  ]);
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
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

  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(
    null
  );
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
        
        setActiveEmployee( appraisalData.data._id);
    }
}, [appraisalData]);



  const handleChange = (event: any) => {

    setPotential(event.target.value as string);
    addPotential({
      "appraisal.potential": event.target.value,
      id: employee_id,
    });
    // setnavPrompt(true);
  };

  useEffect(() => {
    console.log(appraisalData?.data?.appraisal?.potential, potential, 'potential')
    setPotential(appraisalData?.data?.appraisal?.potential);
  },[appraisalData] );
  return (
    <div>
      <Box
        sx={{
          height: "75px",
          width: "100%",
          // marginLeft: "20px",
          marginTop: "0px",
          // background: "#004c75",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <Dividerroot>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>
                <Box width="20rem" height="50px">
                  <Stack direction="row" spacing={1}>
                    <Avatar>
                      {appraisalData &&
                        appraisalData.data.legal_full_name.substring(0, 1)}
                    </Avatar>
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
                      <Employeecode>
                  {/* Employee Code:{" "} */}
                  {appraisalData && appraisalData.data.employee_code}
                </Employeecode>
                    </Box>
                  </Stack>
                </Box>
              </Item>
              {potentialHide && (
                <Item width="50rem">
                  <Stack direction="column" spacing={2}>
                    <Typography
                      position="absolute"
                      variant="caption"
                      color="#a9a9a9"
                    >
                      Potential Level
                    </Typography>

                    <Typography
                      sx={{
                        position: "absolute",
                        variant: "caption",
                      }}
                    >
                      {/* <TextField
                        select
                        sx={{ m: 1, minWidth: 120 }}
                        // label="Select"
                        id="fullWidth"
                        variant="standard"
                        size="small"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {potentialArray.map((item: any, index: any) => {
                          return (
                            <MenuItem
                              key={index}
                              sx={{ height: "16px" }}
                              value={item}
                            ><p>
                              <input
                                type="checkbox"
                                style={{
                                  height: "17px",
                                  width: "17px",
                                  borderColor: "#D5D5D5",
                                }}
                              />
                              <span style={{ padding: "2px" }}>
                                {" "}
                                {item}{" "}
                                <IconButton>
                                  <img src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  open
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                ></Popover>
                              </span>
                              </p>
                            </MenuItem>
                            
                          );
                        })}
                      </TextField> */}
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
                              <span style={{ fontSize: "14px" }}>
                                Low
                                <IconButton onClick={handleClick}
                                >
                                  <img src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id}
                                  open={open}
                                  anchorEl={anchorE}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                 
                                  PaperProps={{
                                    style: {
                                      backgroundColor: "FEFCF8",
                                      boxShadow: "none",
                                      borderRadius: 0,
                                    },
                                  }}
                                  sx={{width:"60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #FFCF7A",
                                      backgroundColor: "#f8f8ff",
                                    },
                                  }}
                                >
                                  <div style={{ padding: "10px", fontSize:"14px", color:"#333333", fontFamily:"Arial" }}>Employee is working at full potential and is not expected to improve, either because they are at maximum capacity or because of a lack of motivation. </div>
                                </Popover>
                                {" "}
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
                              <span style={{ fontSize: "14px" }}>
                                Moderate
                                <IconButton onClick={handleClick2}
                                >
                                  <img src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id2}
                                  open={open2}
                                  anchorEl={anchorE2}
                                  onClose={handleClose2}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                  PaperProps={{
                                    style: {
                                       backgroundColor: "FEFCF8",
                                      boxShadow: "none",
                                      borderRadius: 0,
                                    },
                                  }}
                                  sx={{width:"60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #FFCF7A",
                                      backgroundColor: "#f8f8ff",
                                    },
                                  }}
                                >
                                  <div style={{ padding: "10px", fontSize:"14px", color:"#333333", fontFamily:"Arial" }}> Employee has the potential to further develop within their current role and may be considred for promotion within the next 12 to 24 months.</div>
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
                              <span style={{ fontSize: "14px" }}>
                                High
                                <IconButton onClick={handleClick3}
                                >
                                  <img src={Infoicon} alt="icon" />
                                </IconButton>
                                <Popover
                                  id={id3}
                                  open={open3}
                                  anchorEl={anchorE3}
                                  onClose={handleClose3}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                    
                                  }}
                                  PaperProps={{
                                    style: {
                                       backgroundColor: "FEFCF8",
                                      boxShadow: "none",
                                      borderRadius: 0,
                                    },
                                  }}
                                  sx={{width:"60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #FFCF7A",
                                      backgroundColor: "#f8f8ff",
                                    },
                                  }}
                                >
                                  <div style={{ padding: "10px", fontSize:"14px", color:"#333333", fontFamily:"Arial" }}>Employee is at full potential of the current role and is eligible for promotion, either immediately, or within the next 12 months.</div>
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
              )}

              <Item width="30rem">
                <Stack direction="row" spacing={1}>
                  <Pastrating>Previous Ratings </Pastrating>
                  <Pastratingvalue>4.0</Pastratingvalue>
                </Stack>
                <Link to={`${VIEW_PA}/employee/${activeEmployee}`}>
                 <Links>
                View Appraisal
                </Links>
               </Link>
              </Item>
             
            </Stack>
          </Dividerroot>
        </div>
      </Box>
    </div>
  );
};

export default Header;
