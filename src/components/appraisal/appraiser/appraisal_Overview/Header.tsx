import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Stack,
  IconButton,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import { useParams } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import { EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Eye from "../../../../assets/Images/Eye.svg";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";


const useStyles = makeStyles(({
  heading: {
    color: "#3E8CB5",
    fontWeight: "400",
    fontSize: "28px",
    fontFamily: "Arial",
    // @media Querry for responsive codes
    ['@media (max-width:868px)']: {
      flexWrap: "wrap",
    }
  },
}));

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

const Pastratingvalue = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  opacity: 0.5,
  color: "#333333",
  // paddingTop:'2px',
  textAlign: "left",
  // paddingBottom: "5px",
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
  fontSize: "17px",
  fontFaily: "arial",
  display:"flex",
  alignItems:"center"
});


const Header = (props: any) => {
  const classes = useStyles();
  const { appraisalData, ratingScaleData, nineBoxData, employeeDataIsFetching, employeeDataIsLoading, navPrompt, setnavPrompt, } = props;
  // @ts-ignore
  const { setPotentialValue, setMoveTab, disableTextAfterSubmission } = useAppraisalContext();
  const { employee_id } = useParams();
  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();
  const [potential, setPotential] = React.useState<any>("");
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: appraisalData?.data?.employee_code })
  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorE);
  const id = open ? "simple-popover" : undefined;
  const [anchorE22, setAnchorE22] = React.useState<HTMLButtonElement | null>(null);
  const openOverallRatingInfo = Boolean(anchorE22);
  const overallRatingInfoId = openOverallRatingInfo ? "simple-popover" : undefined;
  React.useEffect(() => {
    const Overall_rating = appraisalData?.data?.current_rating?.overall_rating;
    const RatinGscale = ratingScaleData?.data?.map((j: any) => ({
      rating: j?.rating,
      definition: j?.definition,
      rating_titile: j?.rating_scale,
    }));
  
    const filterRatingScale = (item:any, minRating:any, maxRating:any) => {
      return (item?.rating >= minRating && item?.rating <= maxRating) && (Overall_rating >= minRating && Overall_rating <= maxRating);
    }
  
    const FilteredRatingScale = RatinGscale?.filter((item: any) => {
      if (filterRatingScale(item, 1, 1.99) ||
          filterRatingScale(item, 2, 2.49) ||
          filterRatingScale(item, 2.5, 2.99) ||
          filterRatingScale(item, 3, 3.49) ||
          filterRatingScale(item, 3.5, 3.99) ||
          filterRatingScale(item, 4, 4.49) ||
          filterRatingScale(item, 4.5, 4.99) ||
          filterRatingScale(item, 5.0, 5.0)) {
        return {
          ratingScale: item?.rating_titile,
          definition: item?.definition,
          // rating: item?.rating,
        };
      }
    });
  
    if (FilteredRatingScale && FilteredRatingScale.length > 0) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile);
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
    }
    console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg");
  }, [ratingScaleData, appraisalData]);

  // useEffect(() => {
  //   const Overall_rating = appraisalData?.data?.current_rating?.overall_rating
  //   const RatinGscale = ratingScaleData?.data?.map((j: any) => ({
  //     rating: j?.rating,
  //     definition: j?.definition,
  //     rating_titile: j?.rating_scale,
  //   }))
  //   const FilteredRatingScale = RatinGscale?.filter((item: any) => {
  //     if ((item?.rating > 0 && item?.rating <= 1.99) && (Overall_rating > 0 && Overall_rating <= 1.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     }
  //     else if ((item?.rating >= 2 && item?.rating <= 2.49) && (Overall_rating >= 2 && Overall_rating <= 2.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     }
  //      else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 3 && item?.rating <= 3.49) && (Overall_rating >= 3 && Overall_rating <= 3.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 3.5 && item?.rating <= 3.99) && (Overall_rating >= 3.5 && Overall_rating <= 3.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 4 && item?.rating <= 4.49) && (Overall_rating >= 4 && Overall_rating <= 4.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 4.5 && item?.rating <= 4.99) && (Overall_rating >= 4.5 && Overall_rating <= 4.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 5.0) && (Overall_rating >= 5.0)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     }
  //   })
  //   if (FilteredRatingScale && FilteredRatingScale.length > 0) {
  //     setratingdefenition(FilteredRatingScale[0]?.definition);
  //     setratingscaledef(FilteredRatingScale[0]?.rating_titile)
  //   } else {
  //     // Handle the case when FilteredRatingScale is empty
  //     // setratingdefenition("No rating definition found");
  //   }
  // }, [ratingScaleData, appraisalData])


  const handleClickOverallRatingInfoClose = () => {
    setAnchorE22(null);
  };

  const handleClickOverallRatingInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE22(event.currentTarget);
  };


  useEffect(() => {
    // Now you can take any action when ratingdefenition changes,
    // such as displaying it.
    console.log("Rating Definition has changed:", ratingdefenition);
  }, [ratingdefenition]);


  const handlePotentialClose = () => {
    setAnchorE(null);
  };

  const handleClickPotential = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  useEffect(() => {
    if (appraisalData) {
      setPotential(appraisalData?.data?.appraisal?.potential);
    }
  }, [appraisalData]);

  useEffect(() => {
    setPotentialValue(potential);
  }, [potential]);


  const handleChangePotential = (event: any) => {
    setPotential(event.target.value as string);
    setMoveTab(true);
    setnavPrompt(true);
  };

  // to get PA Status

  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "in-progress" || data?.appraisal?.status == "normalized") {
      return "In progress";
    } else if (data?.appraisal?.status == "completed") {
      return "Completed";
    } else if (data?.appraisal?.status == "not-started") {
      return "Not started";
    } else if (data?.appraisal?.status == "rejected") {
      return "Employee rejected";
    }
  };

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 200,
        fontSize: "14px !important",
        fontFamily: "arial !important",
        color: "#333333 !important",
      },
    },
  };

  return (
    <div>
      <Stack
        className={classes.heading}
        direction="row"
        alignItems="baseline"
        paddingBottom="10px"
        justifyContent="space-between"
        paddingRight="33px"
      >
        <Typography
          style={{
            color: "#3E8CB5",
            fontWeight: "400",
            fontSize: "28px",
            fontFamily: "Arial",
            // marginLeft: "16px",
          }}
        >
          Welcome to Performance Appraisal
        </Typography>

        <Stack
          direction="row"
          alignItems="center" 
          gap={3}>
          <Typography
            style={{
              fontSize: "17px",
              color: "#3E8CB5",
              fontFamily: "Arial",
            }}
          >
            PA Status:
            <span
              style={{
                color: "#717171",
                marginTop: "8px",
                fontSize: "17px",
                fontFamily: "Arial",
              }}
            >
              {appraisalData && getPAStatus(appraisalData?.data)}
            </span>
          </Typography>

          {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && ( */}
             {/* <> */}

              <Stack
                direction="row"
                alignItems="center"
                spacing={0.8}
              >
                <Overallrating style={{ display: "flex", alignItems: "center",}} >
                  Previous Rating:
                  {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && ( */}
                  <Overallratingvalue  >
                    <span style={{ color: "#717171",fontSize: "17px",fontFamily: "Arial" }} > 
                    {appraisalData?.data?.previous_rating && appraisalData?.data?.previous_rating !== 0 ? 
                    appraisalData?.data?.previous_rating?.toFixed(2) : "-"}
                    </span>
                  </Overallratingvalue>
                  {/* )} */}
                </Overallrating>
                    {appraisalData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
                <Link
                  to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                  state={{
                    employeeCodeFromLanding: appraisalData?.data?.employee_code,
                    calendarTypeFrom: employeePA_Data?.employees[0]?.calendar,
                    yearFrom: employeePA_Data?.employees[0]?.createdAt?.slice(0, 4)
                  }}
                >
                  <Typography style={{ marginTop: "2px" }}>
                    <img
                      src={Eye}
                      alt="Eye Icon"
                    />
                  </Typography>
                </Link>
                    )}

              </Stack>
             {/* </> */}
          {/* )} */}
        </Stack>
      </Stack>

      <Box
        sx={{
          marginRight: "33px",
          marginTop: "0px",
          backgroundColor: "#f3fbff",
        }}
      >
        <div>
          <Dividerroot>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              spacing={2}
            >
              <Item>
                <Box>
                  <Stack direction="row" spacing={1}>
                    {appraisalData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={appraisalData?.data?.profile_image_url} />
                    ) : (
                      <Avatar style={{ width: "55px", height: "55px" }}>
                        {appraisalData &&
                          appraisalData.data.legal_full_name.substring(0, 1)}
                      </Avatar>
                    )}
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Name>
                          {appraisalData && appraisalData.data.first_name}
                        </Name>
                      </Stack>
                      <Speciality>
                        {appraisalData &&
                          appraisalData.data.position_long_description}
                      </Speciality>
                      <Speciality>
                        Grade {appraisalData && appraisalData.data.grade}
                      </Speciality>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                        textAlign="center"
                      >
                        <Pastratingvalue>
                          {appraisalData?.data?.employee_code}
                        </Pastratingvalue>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Item>


              <Item>
                <Stack
                  direction="column"
                  alignItems="center"
                >
                  <Stack direction="row" gap={1}>
                    {employeeDataIsFetching && (
                      <CircularProgress size={15} thickness={7} />
                    )}
                    <Overallrating> 
                      Overall Rating
                     
                      <Popover
                        // anchorReference="anchorPosition"
                        id={overallRatingInfoId}
                        open={openOverallRatingInfo}
                        anchorEl={anchorE22}
                        onClose={handleClickOverallRatingInfoClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}

                        PaperProps={{
                          style: {
                            backgroundColor: "FEFCF8",
                            boxShadow: "none",
                            maxWidth: "450px",
                            borderRadius: "5px",
                          },
                        }}
                        sx={{
                          "& .MuiPopover-paper": {
                            border: "1px solid #3e8cb5",
                            backgroundColor: "#ffffff",
                            // left: "750px !important"
                          },
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                            padding: "10px",
                            color: "#333333",
                            fontFamily: "Arial",
                            paddingBottom: "5px",
                            paddingTop: "5px",
                            lineHeight: "20px",
                          }}
                        >
                          <b  >{ratingscaledef}</b>:
                          <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            paddingBottom: "5px",
                            paddingTop: "5px",
                          }}
                        >
                          {ratingdefenition}
                          </span>
                        </div>
                      </Popover>
                    </Overallrating>
                  </Stack>

                  <Overallratingvalue>
                     {ratingdefenition?.length > 0 && 
                      <IconButton style={{ padding: "4px" }} onClick={handleClickOverallRatingInfo} >
                          <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                        </IconButton>
                       }  
                    <b>
                  
                      {appraisalData &&
                        appraisalData?.data?.current_rating &&
                        appraisalData?.data?.current_rating?.overall_rating.toFixed(2)}
                    </b>
                  </Overallratingvalue>
                </Stack>
              </Item>
            </Stack>
          </Dividerroot>
        </div>
      </Box>

      <Box
        sx={{ paddingTop: "20px", paddingRight: "33px" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
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
              >
                <Typography color="#3e8cb5" fontFamily="arial" fontSize="17px" >
                <IconButton style={{ padding: "4px" }} onClick={handleClickPotential} >
                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  </IconButton>
                  Potential Level
                 
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorE}
                    onClose={handlePotentialClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    PaperProps={{
                      style: {
                        backgroundColor: "FEFCF8",
                        boxShadow: "none",
                        maxWidth: "450px",
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
                    <div
                      style={{
                        padding: "10px",
                        fontSize: "134px",
                        lineHeight: "20px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "14px",
                         // color: "#3e8cb5",
                          fontFamily: "Arial",
                          paddingBottom: "5px",
                         // borderBottom: "1px solid #d9d9d9",
                        }}
                      >
                       <b>High:</b> 
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
                          //color: "#3e8cb5",
                          fontFamily: "Arial",
                          paddingBottom: "5px",
                          paddingTop: "5px",
                          //borderBottom: "1px solid #d9d9d9",
                        }}
                      >
                         <b>Moderate:</b> 
                      
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {nineBoxData &&
                            nineBoxData?.data[0]?.potential_definitions
                              ?.moderate}{" "}
                        </span>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          //color: "#3e8cb5",
                          fontFamily: "Arial",
                          paddingTop: "5px",
                        }}
                      >
                         <b>Low:</b> 
                       
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {nineBoxData &&
                            nineBoxData?.data[0]?.potential_definitions
                              ?.low}{" "}
                        </span>
                      </Typography>
                    </div>
                  </Popover>
                </Typography>

                {appraisalData?.data?.appraisal && (
                  <>
                    <Select
                      sx={{
                        width: "84%",
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
                      disabled={employeeDataIsLoading || employeeDataIsFetching }
                      onChange={(e) => {
                        handleChangePotential(e);
                      }}
                    >
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",
                        }}
                        value="High"
                        disabled = {disableTextAfterSubmission}
                      >
                        High
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",
                        }}
                        value="Moderate"
                        disabled = {disableTextAfterSubmission}
                      >
                        Moderate
                      </MenuItem>
                      <MenuItem
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",
                        }}
                        value="Low"
                        disabled = {disableTextAfterSubmission}
                      >
                        Low
                      </MenuItem>
                    </Select>
                  </>
                )}
              </Stack>
            </Grid>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
