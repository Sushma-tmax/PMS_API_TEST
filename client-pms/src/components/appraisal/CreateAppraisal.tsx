import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar, Box, Container, Typography } from "@mui/material";
import Header from "./components/Header";
import Body from "./components/Body";
import { styled } from "@mui/material/styles";
import Headleft from "./components/Icons/Headleft.svg";
import Greendot from "./components/Icons/Greendot.svg";
import IconButton from '@mui/material/IconButton';
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import { Link } from "react-router-dom";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useGetAllAppraiserStatusQuery, useGetEmployeeAppraisalQuery } from "../../service";
import { Description } from "@mui/icons-material";


//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const[positionHide,setpositionHide]=useState('false')
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

const Profilecontainer = styled("div")({
  paddingTop: "20px",
});
const Bodycontainer = styled("div")({
  marginTop: "5px",
});
const Heading1 = styled("div")({
  fontSize: "24px",
  // fontWeight: 400,
  color: "#004C75",
  marginLeft: "18px",
  marginTop: "20px",
  fontFamily: "regular",
});
const Autosave = styled("div")({
  fontSize: "11px",
  fontWeight: 400,
  color: "#333333",
  marginLeft: "94%",
  marginTop: "30px",
  //opacity: 0.5,
});
const Autosaveicon = styled("div")({
  opacity: 0.5,
  marginLeft: "5px",
});

const CreateAppr = (props: any) => {

  //prompt ------functions
 const [navPrompt, setnavPrompt] = React.useState(false);
  
 console.log(navPrompt, 'navPrompt')
 const formIsDirty = navPrompt;
 usePrompt('Please save the changes before you leave the page.', formIsDirty);
 //prompt ------functions



  const { ratings, appraisal, mutation, calendarData } = props;
  console.log(appraisal, "appraisal");
  // if(appraisal){
  //   const {calendar } = appraisal.data.calendar;
  // }


//  console.log( appraisal)
//   useEffect(() =>{
//     if (appraisal.description !== undefined){
//     setpositionHide(true)
//   }else{
//     setpositionHide(false)
//   }
// },[description]);


  return (
    <div
      style={{
        background: "#F1F1F1",
        // height: "calc(100vh - 65%)",
        height: "52rem",
      }}
    >
      {/* <Heading1>
        <img src={Headleft} alt="icon" /> 
        
        Mid-year Performance Appraisal 
      </Heading1> */}

      <Heading1>
        <Typography
          style={{
            color: "#004C75",
            fontSize: "24px",
          }}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <span style={{ marginRight: "8px" }}>
            <IconButton>
            <Link to = {`/dashboardreview`}> 
              <img src={Leftarrow} alt="button" />
              </Link>
            </IconButton>
          </span>
         
         <label>{appraisal.data && appraisal.data?.calendar?.name} Appraisal</label>
        </Typography>
      </Heading1>
      <Container
        sx={{
          background: "#fff",
          maxWidth: "96% !important",
          // height: "calc(100vh - 40px)",
          height: "45rem",
          // marginLeft: "27px",
          // marginRight: "25px",
          marginTop: "10px",
        }}
      >
        <Profilecontainer>
          <Header appraisalData={appraisal} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
        </Profilecontainer>
        <Autosave>
          <Stack direction="row">
            <img src={Greendot} alt="icon" />
            <Autosaveicon> Auto save</Autosaveicon>
          </Stack>
        </Autosave>
        <Box
          sx={{
            marginTop: "0px",
          }}
        >
          <Body
            appraiser1Data={appraisal}
            ratingsData={ratings}
            mutation={mutation}
            navPrompt={navPrompt} 
            setnavPrompt={setnavPrompt}
          />
        </Box>
      </Container>
    </div>
  );
};

export default CreateAppr;
function setpositionHide(arg0: boolean) {
  throw new Error("Function not implemented.");
}

