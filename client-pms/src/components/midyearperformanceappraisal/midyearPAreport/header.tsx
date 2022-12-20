import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import Logo from "../../../assets/Images/Logo.svg";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Header = (props: any) => {
  const { headerData, showData,ratingScaleData } = props;
  const [CurrentRating, setCurrentRating] = useState<any>([])
  useEffect(() => {
    let latestrating: any;
    if (headerData?.data?.normalizer !== "" && headerData?.data?.normalizer?.normalizer_status !== "pending") {
      latestrating = (headerData.data.normalizer.normalizer_rating)
    } else if (headerData?.data?.reviewer !== "" && headerData?.data?.reviewer?.reviewer_status !== "pending") {
      latestrating = (headerData.data.reviewer.reviewer_rating)
    } else if (headerData?.data?.appraisal !== "" && headerData?.data?.appraisal?.appraiser_status !== "pending") {
      latestrating = (headerData.data.appraisal.appraiser_rating)
    }
    setCurrentRating(latestrating)

  }, [headerData])

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingScaleData.data.find((item: any) => item.rating == ratingValue);
    if (ratingDataValue)
      return ratingDataValue.rating_scale
    else
      return ""
  }

  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Item>
                <img src={Logo} alt="icon" />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h1
                  style={{
                    color: "#014D76",
                    fontWeight: "400",
                    opacity: "0.9",
                  }}
                >
                  Mid-Year Performance Appraisal
                </h1>
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <p>{headerData.data.employee_code} </p>
                <p
                  style={{
                    color: "#014D76",
                  }}
                >
                  Appraisal period: ********
                </p>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ backgroundColor: "#f2f9fa" }}>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Item sx={{ backgroundColor: "#f2f9fa" }}>
                <AccountCircle
                  style={{ verticalAlign: "middle", height: "92px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ backgroundColor: "#f2f9fa", textAlign: "left" }}>
                <p>{headerData.data.legal_full_name}</p>
                <p>
                  {headerData.data.section} * {headerData.data.position_long_description}
                </p>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item sx={{ backgroundColor: "#f2f9fa", textAlign: "right" }}>
                <h2>Final Rating</h2>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item sx={{ backgroundColor: "#f2f9fa" }}>
                <div style={{ borderLeft: "3px solid #e4ebef" }}>
                  <h2>{CurrentRating}</h2>
                  <p>{getRatingDescription(CurrentRating)}</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default Header;
