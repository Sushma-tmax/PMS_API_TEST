import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Container, Box, TextField, InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Expand from "../../../assets/Images/Expand.svg";
import Searchicon from "../../../assets/Images/Searchicon.svg";
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
  const { indexBasedValue, indexBasedTitle,DataforInitial,setindexBasedValue,setindexBasedTitle,BaseStateValue, indexValue,handleNavigationForNineBoxEmployee} = props
  console.log(indexBasedValue, "indexBasedValue")
  console.log(indexBasedTitle,"indexBasedTitle")
  //search func
  const [enteredName, setenteredName] = useState("");
  const [value, setValue] = useState("");
  const [noData, setnoData] = useState(false);
  
  useEffect(() => {
    let empty= indexBasedValue?.filter((j: any) => {
      // console.log(j,"jjjjj")
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
    })?.map((i: any, index: number) =>{
      return (
        i
      )
      }
    )
    console.log(empty,"empty")
 if (indexBasedValue?.length == 0 || empty?.length == 0 ) { setnoData(true) } else { setnoData(false) }


  }, [indexBasedValue,enteredName])
console.log(BaseStateValue,"BaseStateValue")
useEffect(()=>{
  setindexBasedTitle(BaseStateValue?.indexBasedTitle)
  // if(indexValue){
  setindexBasedValue(BaseStateValue?.indexBasedValue?.data)
  // }
},[BaseStateValue])
useEffect(()=>{
  setenteredName("")
},[indexValue])
console.log(enteredName,"enteredName")
const maxLengthForSearch = 30;
const handleSearchBar = (e: any) => {
    if (e.target.value.length > maxLengthForSearch) {
      e.target.value = e.target.value.slice(0, maxLengthForSearch);
    }
    setenteredName(e.target.value);
  }
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
         
          sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >
          {indexBasedTitle}
        </Typography>
        <img style={{ cursor: "pointer" }}  src={Expand} onClick={handleNavigationForNineBoxEmployee}/>
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
          value={enteredName}
         // onChange={(e) => setenteredName(e.target.value)}
         onChange={handleSearchBar}
        />
      </Searchfeild>
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        {noData  && <Typography
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
        {indexBasedValue?.filter((j: any) => {
          // console.log(j,"jjjjj")
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
        })
        ?.slice(0, 10)
        ?.map((i: any, index: number) => {
          return(
            <Stack padding="8px" 
            // borderBottom="1px solid #d5d5d5"
             direction="row" spacing={3}>

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
                  opacity: "80%",
                }}
              >
                {i?.legal_full_name}
              </Typography>
            </Stack>
          )
        })
        }
      </div>
    </div>
  );
}


