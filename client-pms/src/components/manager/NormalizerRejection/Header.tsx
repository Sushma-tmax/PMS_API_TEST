import React,{useEffect, useState } from "react";
import { Container, Grid, FormControl, Paper, Typography, Box, Stack, IconButton, } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
// import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Popover from "@mui/material/Popover";
import Infoicon from "../../manager/appraiserOverview/icons/Infoicon.svg";
import { useUpdateEmployeeAppraisalMutation } from "../../../service";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";

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
  fontFaily:"arial",
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
  fontFamily:"arial",
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
  const { appraisalData,ratingScaleData, nineBoxData } = props;
  const { employee_id } = useParams();
  console.log(appraisalData, "aaaaaaaaaaaaaaaaaaaa");
  // const [calc] = useCalculateRatingsMutation();
  // @ts-ignore
  // const { overAllRating } = useAppraisalContext();
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingScaleData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };
  // @ts-ignore
  // const { overAllRating } = useAppraisalContext();
  const [addPotential] = useUpdateEmployeeAppraisalMutation();
  const [potential, setPotential] = React.useState<any>(
    appraisalData?.data?.appraisal?.potential
  );
 
  console.log(appraisalData, "aaaaaaaaaaaaaaaaaaaa");
  const [potentialArray, setPotentialArray] = React.useState<any>([
    "Low",
    "Moderate",
    "High",
  ]);
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

  const handleChange = (event: any) => {
    setPotential(event.target.value as string);
    addPotential({
      "appraisal.potential": event.target.value,
      id: employee_id,
    });
    // setnavPrompt(true);
  };

  return (
    <div>
      <Box
        sx={{
          height: "70px",
          width: "96%",
          marginLeft: "20px",
          //  marginRight: "20px",
          marginTop: "0px",
          // background: "#004c75",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
          paddingBottom: "10px",
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
                <Box width="28rem" height="50px">
                  <Stack direction="row" spacing={1}>
                    <Avatar>H</Avatar>
                    <Box>
                      <Stack direction="row" spacing={1}>
                        {/* <Name>{appraisalData && appraisalData.data.name}</Name> */}
                        <Grade>
                          {/* {appraisalData && appraisalData.data.grade} */}
                        </Grade>
                      </Stack>
                      <Speciality>
                        {/* {appraisalData && appraisalData.data.position} */}
                      </Speciality>
                    </Box>
                  </Stack>
                </Box>
              </Item>

              <Item width="50rem">
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="baseline"
                  textAlign="center"
                >
                  <Pastrating>Employee Code :</Pastrating>
                  <Pastratingvalue>EMP2314</Pastratingvalue>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="baseline"
                  textAlign="center"
                >
                  <Appraisal>Appraisal period :</Appraisal>
                  <Appdate>******</Appdate>
                </Stack>
                <Link>Line Manager Details</Link>
              </Item>

              <Item width="30rem">
                <Stack direction="row" spacing={2}>
                  <Overallrating>Rating</Overallrating>
                  <div style={{ marginLeft: "20px" }}>
                    <Overallratingvalue>
                      {/* {appraisalData &&
                        appraisalData.data.appraisal.appraiser_rating} */}
                    </Overallratingvalue>
                    <Overallratingcomments>
                      Exceeds Expectations
                    </Overallratingcomments>
                  </div>
                </Stack>
              </Item>
            </Stack>
          </Dividerroot>
        </div>
      </Box>
    </div>
  );
};

export default Header;
