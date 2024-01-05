import React, { useEffect, useState, useRef, useMemo,useCallback, useContext } from "react";
import Grid from "@mui/material/Grid";
import {
  Container,
  Box,
  TablePagination,
  Breadcrumbs,
  FormGroup,
  Link,
  CardActionArea,
  CardMedia,
  CardHeader,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Drawer, FormControlLabel } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/styles";
import Card from "@mui/material/Card";
import Closeiconred from "../../../assets/Images/Closeiconred.svg";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';


//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
  }
  React.useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {

          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
    width:"6px !important"
    },
});

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    width: "300px",
    height: "80px",
    position: "relative",
  },
}));

export default function RoleExceptionforMultipleEmployee(props: any) {
   //prompt ------functions
   const [navPrompt, setnavPrompt] = React.useState(false);

   console.log(navPrompt, 'navPrompt')
   const formIsDirty = navPrompt;
   usePrompt(
          "Any changes you have made will not be saved if you leave the page.",
     formIsDirty);
   //prompt ------functions
  
  const classes = useStyles();

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="25px"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
          >
            Master
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Exception Handling
          </Typography>
        </Breadcrumbs>
      </Stack>

      <Box
        sx={{
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px",
        }}
      >
        <div>
          <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            Role Change
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Appraiser Name</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Appraiser Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">Reviewer Name</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="Reviewer Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small">HR Normalizer Name</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              label="HR Normalizer Name"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ paddingTop: "10px" }}>
          <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            Employee Details
          </Typography>
          <div style={{ paddingTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={3} >
                <Card className={classes.root}>
                  <CardContent>
                    <div >
                      <img style={{position:"absolute",left:"93%",top:"0%"}} src={Closeiconred} alt="icon" />
                    </div>
                    <Typography>Mohammed Abdull</Typography>
                    <Typography>1001</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </Box>
    </>
  );
}
