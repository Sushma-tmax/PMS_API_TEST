import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, TextField, InputAdornment } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Expand from "../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import { useGetEmployeeByFilterQuery } from "../../service";
import Searchicon from "../../assets/Images/Searchicon.svg";

const Contain = styled("div")({
  "& .MuiButton-root": {
    // border: ` 1px solid `,
    // borderColor: "#D4D4D4",
    background: "rgb(155 155 155 / 17%)",
    minWidth: "0px",
    borderRadius: "50px",
    width: "55px",
    height: "55px",
    // "&:focus": {
    //   // borderColor: '#3C8BB5',
    // },
  },
});
const Searchfeild = styled("div")({
  // marginLeft: "auto",
  // marginRight: "8px",
  marginTop: "8px",
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "100%",
    borderRadius: "25px",
    background: "#F2F6F8",
    // border:'2px solid white'
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#D5D5D5",
    marginTop: "-10px",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "12px",
    color: "#333333",
    opacity: "70%",
  },
  "& .MuiTextField-root": {
    minWidth: "100%",
    //   paddingLeft: "10px",
    //   paddingRight: "10px"
  },
});
export default function SolidTalents(props: any) {
  const { emp, indexBasedTitle } = props
  console.log(emp, "emp")
  //search func
  const [enteredName, setenteredName] = useState("");

  const [noData, setnoData] = useState(false);
  useEffect(() => {
   if(emp?.count == 0){setnoData(true)}else{setnoData(false)}
  }, [emp])
  
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          gutterBottom
          component="div"
          sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >
          {/* Solid Talents */}
          {indexBasedTitle}
        </Typography>
        {/* <div>
          <img src={Expand} />
        </div> */}
      </Stack>
      <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Searchicon} alt="icon" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setenteredName(e.target.value)}
        />
      </Searchfeild>
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        {noData && <Typography
          style={{
            fontSize: "14px",
            fontFamily: "Arial",
            color: "#abb0b0",
            opacity: "80%",
            textAlign: "center"
          }}
        >
          No Data Available
        </Typography>}
        {emp?.data?.filter((j: any) => {
          if (enteredName === "") {
            return j;
          } else if (
            (j?.legal_full_name !== undefined &&
              j?.legal_full_name
                ?.toLocaleLowerCase()
                ?.includes(
                  enteredName?.toLocaleLowerCase()
                ))) {
            return j;
          }
        })?.map((i: any, index: number) => {
          return (
            <Stack padding="8px" borderBottom="1px solid #d5d5d5" direction="row" spacing={3}>

              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial",
                  color: "#333333",
                  opacity: "80%"
                }}
              >
                {index + 1}
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial",
                  wordBreak: "break-word",
                  color: "#333333",
                  opacity: "80%"
                }}
              >
                {i?.legal_full_name}
              </Typography>
            </Stack>
          )
        })}
        {/* <Stack  padding="8px" borderBottom="1px solid #d5d5d5" direction="row" spacing={3}>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              color:"#333333",
              opacity:"80%"
            }}
          >
            2
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              wordBreak:"break-word",
              color:"#333333",
              opacity:"80%"
            }}
          >
           Marius Poulsen
          </Typography>
        </Stack>
        <Stack  padding="8px" borderBottom="1px solid #d5d5d5" direction="row" spacing={3}>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              color:"#333333",
              opacity:"80%"
            }}
          >
            3
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              wordBreak:"break-word",
              color:"#333333",
              opacity:"80%"
            }}
          >
          Simon Larsen
          </Typography>
        </Stack>
        <Stack padding="8px"  borderBottom="1px solid #d5d5d5" direction="row" spacing={3}>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              color:"#333333",
              opacity:"80%"
            }}
          >
            4
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              fontFamily: "Arial",
              wordBreak:"break-word",
              color:"#333333",
              opacity:"80%"
            }}
          >
          Elias Olsen
          </Typography>
        </Stack> */}
      </div>
    </div>
  );
}
