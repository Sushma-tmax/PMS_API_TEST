import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  paddingBottom: "5px",
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

const Header = (props: any) => {
  const { appraisalData, ratingScaleData, nineBoxData, employeeData } = props;
  console.log(employeeData, "calendar")
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingScaleData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  //  to get PA status
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

          }}
        >
          Welcome to Performance Appraisal!
        </Typography>
        <Typography
          style={{
            fontSize: "16px",
            color: "#717171",
            fontFamily: "Arial",
            // paddingRight: "60px",
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
            {/* {employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
              employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                employeeData?.data?.appraisal?.status} */}
                 {getPAStatus(employeeData?.data)}
          </span>
        </Typography>
      </Stack>
      <Box
        sx={{
          height: "80px",
          // width: "96%",
          // marginLeft: "25px",
          // marginRight: "25px",
          marginTop: "0px",
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
                    <Avatar style={{ width: "50px", height: "50px" }}>
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
                <Stack direction="column" alignItems="flex-end" >
                  <Overallrating>Overall Rating</Overallrating>

                  <Overallratingvalue>
                    <b>
                      {/* {appraisalData &&
                        appraisalData?.data?.normalizer?.normalizer_rating == 0 ? "Yet to be rated." :
                        appraisalData?.data.normalizer?.normalizer_rating} */}
                        {appraisalData &&
                        appraisalData?.data?.reviewer?.reviewer_rating }
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