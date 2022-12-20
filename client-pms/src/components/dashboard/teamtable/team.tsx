import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MobiledataOffIcon from "@mui/icons-material/MobiledataOff";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import excel from "./excelresize.jpg";
import Myteamtable from "./myteamtable";


export default function Team() {
    return (
      <div>
           <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            minHeight: "400px",
            marginBottom: 2,
            
          }}
        >
          <Typography
            variant="h6"
            align="left"
            sx={{ paddingTop: 2 }}
            gutterBottom
            component="div"
            color={"#004c75"}
          >
            {" "}
            My team
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs={8}>
              {/*<STabs />*/}
              <Myteamtable/>
            </Grid>
            {/*<Grid item xs={2} borderBottom={1} borderColor={"#e0e0e0"}>
             
                <TextField
             
           value={"Search..."}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               <SearchIcon/>
              </InputAdornment>
             
            ),
          }}
      
          variant="standard"
          sx={{ 
            border:"none",
            borderRadius:5,                
            bgcolor: "#f2f6f8",
            paddingTop: 2,}}
        />
            </Grid>
            <Grid item xs={2} borderBottom={1} borderColor={"#e0e0e0"}>
              <MobiledataOffIcon sx={{ paddingRight: 3 }} />
              <img src={excel} style={{ width: "30px", height: "30px" }}  />
              <OpenInNewIcon sx={{ paddingLeft: 2,width:"50%" }} />
            </Grid>*/}
          </Grid>
        </Box>
      </div>
    );
  }