import * as React from 'react';
import {TextField,InputAdornment} from "@mui/material";
import { styled } from "@mui/system";
import Searchicon from "../../../assets/Images/Searchicon.svg";

export default function TableSearch(props: any) {
    const {searchName, setSearchName} = props
    const [searchValue, setSearchValue] = React.useState("")
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
      console.log("searchValue",searchValue)
      const maxLengthForSearch = 30;
      const handleSearchBar = (e: any) => {
        if (e.target.value.length > maxLengthForSearch) {
          e.target.value = e.target.value.slice(0, maxLengthForSearch);
        }
        setSearchName(e.target.value);
      }
      return (
        <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
        //  onChange={(e) => setSearchName(e.target.value)}
          onChange={handleSearchBar}
          // value={searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Searchicon} alt="icon" />
              </InputAdornment>
            ),
            inputProps:  {maxLengthForSearch}
          }}
        />
      </Searchfeild>
      )
}