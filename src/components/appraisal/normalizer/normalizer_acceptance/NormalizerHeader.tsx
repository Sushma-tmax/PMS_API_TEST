import * as React from "react";
import { Avatar, Box, Button, Grid, Stack, Typography, Popover, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NORMALIZER_VIEW_PA, EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import Downloadss from "../../../../assets/Images/Downloadss.svg"
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useGetRatingScaleQuery } from "../../../../service"
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";
import Infoicon from "../../../../assets/Images/Infoicon.svg"
import Eye from "../../../../assets/Images/Eye.svg"
import { Link } from "react-router-dom";

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

const Dividerroot = styled("div")({
  "& .MuiDivider-root": {
    marginTop: "10px",
    marginBottom: "15px",
    marginLeft: "0px",
  },
});
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
  display: "flex",
  alignItems: "center",
  fontFamily: "arial",

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

const Header = (props: any) => {
  const classes = useStyles();
  const { appraisalData, ratingScaleData, employeeData } = props;
  console.log(employeeData, "calendar")
  const { data: nineBoxData } = useGetNineboxQuery("");
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })
  const [ratingdefenition, setratingdefenition] = React.useState<any>();
  const [ratingscaledef, setratingscaledef] = React.useState<any>();
  React.useEffect(() => {
    const Overall_rating = employeeData?.data?.current_rating?.overall_rating;
    const RatinGscale = ratingsData?.data?.map((j: any) => ({
      rating: j?.rating,
      definition: j?.definition,
      rating_titile: j?.rating_scale,
    }));
    console.log(RatinGscale, "Overall_rating is", Overall_rating);
    const filterRatingScale = (item: any, minRating: any, maxRating: any) => {
      return (item?.rating >= minRating && item?.rating <= maxRating) && (Overall_rating >= minRating && Overall_rating <= maxRating);
    }

    const FilteredRatingScale = RatinGscale?.filter((item: any) => {
      const match = filterRatingScale(item, 1, 1.99) ||
        filterRatingScale(item, 2, 2.49) ||
        filterRatingScale(item, 2.5, 2.99) ||
        filterRatingScale(item, 3, 3.49) ||
        filterRatingScale(item, 3.5, 3.99) ||
        filterRatingScale(item, 4, 4.49) ||
        filterRatingScale(item, 4.5, 4.99) ||
        filterRatingScale(item, 5.0, 5.0);

      console.log(`Item with rating ${item.rating} matches: ${match}`);
      return match;
    });

    console.log("FilteredRatingScale is", FilteredRatingScale);

    if (FilteredRatingScale && FilteredRatingScale.length > 0) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile);
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
    }
    // console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg");
  }, [ratingsData, employeeData]);
  // React.useEffect(() => {
  //   const Overall_rating = employeeData?.data?.current_rating?.overall_rating
  //   const RatinGscale = ratingsData?.data?.map((j: any) => ({
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
  //     }else if ((item?.rating >= 2 && item?.rating <= 2.49) && (Overall_rating >= 2 && Overall_rating <= 2.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
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
  //   console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg")

  // }, [ratingsData, employeeData])
  const [anchorE22, setAnchorE22] = React.useState<HTMLButtonElement | null>(null);
  const handleClose22 = () => {
    setAnchorE22(null);
  };
  const handleClick22 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE22(event.currentTarget);
  };
  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const handleClose1 = () => {
    setAnchorE(null);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  const open1 = Boolean(anchorE);
  const id = open1 ? "simple-popover" : undefined;
  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;
  React.useEffect(() => {
    // Now you can take any action when ratingdefenition changes,
    // such as displaying it.
    console.log("Rating Definition has changed:", ratingdefenition);
  }, [ratingdefenition]);
  //  to get PA status
  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "in-progress" || data?.appraisal?.status == "normalized") {
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
  const { employee_id } = useParams();

  const [moveTab, setMoveTab] = React.useState<any>(false)

  const [value, setValue] = React.useState<any>(0);

  const [rejectAlert, setrejectAlert] = React.useState(false);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if (navPrompt === true) {
    //   setrejectAlert(true);
    // }
    if (moveTab === true) {
      setrejectAlert(true);
    } else {
      setValue(newValue);
    }
  };
  const handleViewPA = () => {
    window.open(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }

  const handleSliderDialogClose = () => {

    setrejectAlert(false);

  };
  return (

    <div>
      <Stack
        className={classes.heading}
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

          }}
        >
          Welcome to Performance Appraisal
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography
            style={{
              fontSize: "17px",
              color: "#3e8cb5",
              fontFamily: "Arial",
              // paddingRight: "60px",
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
              {/* {employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
              employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                employeeData?.data?.appraisal?.status} */}
              {getPAStatus(employeeData?.data)}
            </span>
          </Typography>
          {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
            <> */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Overallrating style={{ display: "flex", alignItems: "center",fontSize: "17px", }} >
              Previous Rating:
              {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && ( */}
              <Overallratingvalue style={{ fontSize: "17px" }} >
                <span style={{
                  color: "#717171",
                  fontSize: "17px",
                  fontFamily: "Arial",
                }} > {(employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0  && employeeData?.data?.previous_rating !== undefined)  ? employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
              </Overallratingvalue>
              {/* )} */}
            </Overallrating>
            {employeeData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
              <>
              <Link
                to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                state={{
                  employeeCodeFromLanding: employeeData?.data?.employee_code,
                  calendarTypeFrom: employeePA_Data?.employees[0]?.calendar,
                  yearFrom: employeePA_Data?.employees[0]?.createdAt?.slice(0, 4)
                }}
              >
                <Typography style={{ marginTop: "2px" }}>
                  <img src={Eye} alt="Eye Icon" />
                </Typography>
              </Link>
              </>
              )}

          </Stack>
          {/* </>
          )} */}
          <Tooltip title="Download" placement="top" arrow>
          <Button
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                fontSize: "15px",
                                fontFamily: "Arial",
                                borderColor: "#3E8CB5",
                                color: "#3E8CB5",
                                // marginRight: "63px",
                              }}
                            >
            <label 
              onClick={() => {
                handleViewPA();
              }}>            
               <img 
               style={{width:"15px",height:"15px",cursor: "pointer",}}
               src={Downloadss} alt="Download" />

            </label>
          </Button>
          </Tooltip>
        </Stack>
      </Stack>
      <Box
        sx={{
          // height: "80px",
          // width: "96%",
          // marginLeft: "25px",
          // marginRight: "25px",
          // marginTop: "0px",
          // background: "#004c75",
          // borderRadius: "5px",
          // boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
          // paddingBottom: "10px",
          backgroundColor: "#f3fbff",
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
                    {/* <Avatar style={{ width: "50px", height: "50px" }}>
                      {appraisalData &&
                        appraisalData.data.legal_full_name.substring(0, 1)}
                    </Avatar> */}
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
                          {appraisalData && appraisalData?.data?.first_name}
                        </Name>
                        {/* <Grade>
                              (Grade{appraisalData && appraisalData.data.grade})
                            </Grade> */}
                      </Stack>
                      <Speciality>
                        {appraisalData &&
                          appraisalData.data.position_long_description}
                      </Speciality>
                      <Speciality>
                        Grade {appraisalData &&
                          appraisalData.data.grade}
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


              <Item >
                <Stack direction="column" alignItems="center" >
                  <Overallrating>Overall Rating

                    <Popover
                      id={id22}
                      open={open22}
                      anchorEl={anchorE22}
                      onClose={handleClose22}
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
                          //  left:"840px !important"
                          // width: "30%",
                        },
                      }}
                    >
                      <div
                        style={{
                          padding: "10px",
                          fontSize: "14px",
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
                          }}
                        >
                          {ratingdefenition}
                        </span>
                      </div>
                    </Popover>
                  </Overallrating>

                  <Overallratingvalue>
                    {ratingdefenition?.length > 0 &&
                      <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    <b>
                      {appraisalData?.data?.current_rating?.overall_rating.toFixed(2)}
                      {/* {appraisalData &&
                        appraisalData?.data?.normalizer?.normalizer_rating == 0 ? "Yet to be rated." :
                        appraisalData?.data.normalizer?.normalizer_rating} */}
                      {/* {appraisalData &&
                        appraisalData?.data?.reviewer?.reviewer_rating } */}
                    </b>
                  </Overallratingvalue>
                  {/* <Overallratingcomments>                   
                        {appraisalData &&
                          getRatingDescription(
                            appraisalData.data.appraisal.appraiser_rating
                          )}
                      </Overallratingcomments> */}
                </Stack>
              </Item>
            </Stack>

          </Dividerroot>
        </div>
      </Box>
      <Box sx={{ paddingTop: "20px" }}>
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
              {employeeData?.data?.calendar?.name}
            </Typography>

          </Grid>
          <Grid item xs={4}>
            {appraisalData?.data?.appraisal?.potential != false &&
              appraisalData?.data?.appraisal?.potential !== undefined &&
              // <Item>
              <Stack direction="column" alignItems="flex-end">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography
                    // position="absolute"
                    // variant="caption"
                    color="#3e8cb5"
                    fontFamily="arial"
                    fontSize="17px"
                  // paddingTop="3px"
                  >
                    <IconButton style={{padding:"4px"}} onClick={handleClick1} >
                      <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                    </IconButton> 
                    Potential Level
                    <Popover
                      id={id}
                      open={open1}
                      anchorEl={anchorE}
                      onClose={handleClose1}
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
                          // width: "30%",
                        },
                      }}
                    >
                      <div
                        style={{
                          padding: "10px",
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                      >
                        {employeeData?.data?.appraisal?.potential === "High" && (
                          <Typography
                            style={{
                              fontSize: "14px",
                              // color: "#3e8cb5",
                              fontFamily: "Arial",
                              // paddingBottom: "5px",
                              //borderBottom: "1px solid #d9d9d9",
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
                        )}

                        {employeeData?.data?.appraisal?.potential == "Moderate" && (
                          <Typography
                            style={{
                              fontSize: "14px",
                              // color: "#3e8cb5",
                              fontFamily: "Arial",
                              // paddingBottom: "5px",
                              // paddingTop: "5px",
                              // borderBottom: "1px solid #d9d9d9",
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
                          </Typography>)}
                        {employeeData?.data?.appraisal?.potential == "Low" && (
                          <Typography
                            style={{
                              fontSize: "14px",
                              //color: "#3e8cb5",
                              fontFamily: "Arial",
                              // paddingTop: "5px",
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
                          </Typography>)}


                      </div>
                    </Popover>
                  </Typography>
                  <span
                    style={{
                      color: "#717171",
                      marginTop: "8px",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    {appraisalData?.data?.appraisal?.potential}
                  </span>
                </div>
              </Stack>

              // </Item>
            }
          </Grid>

        </Stack>
      </Box>
    </div>
  );
}
export default Header;