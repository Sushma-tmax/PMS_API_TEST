import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Contain = styled("div")({
  //   "& .MuiButtonBase-root": {
  //     color: "#333333",
  //     backgroundColor: "#FFFFFF",
  //     height: "34px",
  //     width: "34px",
  //     boxShadow: "0px 0px 1px 1px #D4D4D4",
  //   },

  "& .MuiButton-root": {
    // border: ` 1px solid `,
    // borderColor: "#D4D4D4",
    background: "rgb(255 255 255 / 17%)",
    minWidth: "0px",
    borderRadius: "50px",
    width: "55px",
    height: "55px",
    // "&:focus": {
    //   // borderColor: '#3C8BB5',
    // },
  },
});
function StatusCard(props:any) {
    const {title,percentage,color,count}  =props
  return (
    <div >
      <Box
        sx={{
          background:color,
        //    width: "25%",
          padding: "15px 10px",
          // margin:"0px 10px"
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <div>
            <Typography
              style={{
                fontSize: "16px",
                fontFamily: "Arial",
                color: "#ffffff",
              }}
            >
              {title}
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                fontFamily: "Arial",
                color: "#ffffff",
              }}
            >
             {percentage}%
            </Typography>
          </div>
          {/* <Contain>
            <Button size="small">
              <span
                style={{
                  fontSize: "25px",
                  fontFamily: "Arial",
                  color: "#ffffff",
                }}
              >
               {count}
              </span>
            </Button>
          </Contain> */}
          <div
            // style={{
            //   display: "block",
            //   background: "rgb(255 255 255 / 17%)",
            //   minWidth: "0px",
            //   borderRadius: "50px",
            //   width: "55px",
            //   height: "55px",
            // }}
          >
            <div
              style={{
                // fontSize: "23px",
                // fontFamily: "Arial",
                // color: "#ffffff",
                // background:"rgb(255 255 255/10%)",
                // borderRadius:"50%",
                // padding:"12px 12px"

                width: "55px",
                color: "#ffffff",
                lineHeight:"50px",
                fontFamily: "Arial",
                borderRadius: "50%",

                textAlign:"center",

                fontSize: "16px",

                background: "rgb(255 255 255/10%)",
              }}
            >
             {count}
            </div>
          </div>
        </Stack>
      </Box>
    </div>
  );
}
export default StatusCard;
