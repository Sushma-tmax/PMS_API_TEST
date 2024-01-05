import React from "react";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import Box from "@mui/material/Box";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { Grid, Typography,TextField, Checkbox,FormControlLabel } from "@mui/material";
const Typo7 = styled("div")({
  marginLeft: "35px",
  // position: "absolute",
  marginBottom: "10px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Typos1 = styled("div")({
  marginLeft: "58px",
  // position: "absolute",
  //marginTop: '15px',
  fontSize: "13px",
  color: "#333333",
  opacity: "0.7",
});
const Tf1 = styled("div")({
  // marginLeft: "35px",
  marginTop: "10px",
  // backgroundColor: "rgb(255 255 255/70%)",
//    color:"white",
  // "& .MuiInputBase-input": {
  //   color: "#333333",
  //   fontSize: "13px",
  //   fontWeight: "400",
  //   textTransform: "none",
  //   opacity: 0.4,
  // },
  backgroundColor: "white",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      color: "#333333",
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "none",
      fontFamily:"arial",
      // padding:"4px",
      textAlign:"left"
      // padding: "-2px",
    },
  //   "& .MuiTextField-root": {
  //     // color: "#333333",
  //     // fontSize: "13px",
  //     // fontWeight: "400",
  //     // textTransform: "none",
  //     // padding: "8px",
  //     width: "100%",
  //   },
});
const Contain1 = styled("div")({
  marginRight: "35px",
  
  marginTop: "-15px",

});
const Typos2 = styled("div")({
  // marginLeft: "250px",
  // position: "absolute",
  // marginTop: '325px',
  fontSize: "13px",
  color: "#333333",
  opacity: "0.7",
});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  lineHeight:"1.5",
  marginLeft: "5px",
  fontFamily:"arial"
});
const Contain = styled("div")({
  marginLeft: "35px",
   marginRight: "35px",
  marginTop: "15px",
  // marginTop: "10px",
  // // width: "95%",
  // paddingTop: "0px",
});
const AppraiserOtherRecommendations = (props: any) => {
  // @ts-ignore
 const { empData,appraiserOtherRecommendation, setAppraiserOtherRecommendation,OtherRecommendationothers} = useNormalizerContext()

  const [showToast, setShowToast] = useState(false);
  //  //@ts-ignore
  //  const {otherRecommendation,setOtherRecommendation ,setReviewerOverallFeedComments,reviewerOverallFeedComments, setOpenSnackbar,appraiserOtherRecommendationComments,setAppraiserOtherRecommendationComments,appraiserOverallFeedback,setAppraiserOverallFeedback} = useAppraiserRejectsNormalizerContext()
  //     console.log(otherRecommendation,"otherRecommendation")
  const handleOnCheck = (e: any) => {
    // setnavPrompt(true)
    const { name, checked } = e.target;

    const tempUser = appraiserOtherRecommendation.map(
      (appraiserOtherRecommendation: any) => {
        return appraiserOtherRecommendation._id === name
          ? { ...appraiserOtherRecommendation, isChecked: checked }
          : appraiserOtherRecommendation;
      }
    );
    setAppraiserOtherRecommendation(tempUser);
    console.log(tempUser, "temp");
  };
  //   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setShowToast(false);
  //   };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast(false);
  };
  useEffect(() => {
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true).filter((k:any) => {
    //   console.log(k.name, 'augustya')
    //   return (k.name === 'Promotion' ||  k.name === 'Demotion')
    //
    // }), 'filterother')
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true)[0]?.name === 'Promotion', 'augustya')

    if (
      appraiserOtherRecommendation
        ?.filter((j: any) => j.isChecked === true)
        .filter((k: any) => {
          console.log(k.name, "augustya");
          return k.name === "Promotion" || k.name === "Demotion";
        }).length > 1
    ) {
      setShowToast(true);
      //   setOpenSnackbar(true)
    } else {
      //   setOpenSnackbar(false)
      setShowToast(false);
    }
  }, [appraiserOtherRecommendation]);

  useEffect(() => {
    if (empData) {
      setAppraiserOtherRecommendation(
        empData?.data?.appraisal?.other_recommendation
      );
    }
  }, [empData]);

  const [hideotherRecommendation, setHideotherRecommendation] = useState(false);
  const Otherrecommendation=appraiserOtherRecommendation &&
  appraiserOtherRecommendation.map((i: any, index: any) => {

    return(
      <>
      {i.name.name}
      </>

    )
    })
 useEffect(()=>{
    const Otherrecommendation=appraiserOtherRecommendation &&
    appraiserOtherRecommendation.map((i: any, index: any) => {

      return(
        <>
        {i.name.name}
        </>

      )
      })
      if(Otherrecommendation == "" || Otherrecommendation == null || Otherrecommendation == undefined){
        setHideotherRecommendation(false);
      }else{
        setHideotherRecommendation(true)
      }
      console.log(Otherrecommendation,"Otherrecommendation")
  })
  return (
    <div>
      <div style={{marginBottom:"20px"}}>
      {Otherrecommendation?.length >0 || OtherRecommendationothers !== "" ? (
        <div>
      <Typo7>
        <b>Further Recommendations </b>
      </Typo7>
      {/* </div>
       )} */}
       {/* {hideotherRecommendation && (
                <> */}
      <Contain >
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      
          {appraiserOtherRecommendation &&
            appraiserOtherRecommendation.map((i: any, index: any) => {
              return (
                <>
                  {/* <Typos1>{i.name.name}</Typos1> */}
                  <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3} key={index}>

                   <input
                      checked
                      type="checkbox"
                    /> 
                    <Labels>
                 {i?.name?.name}
                    </Labels>
                    </Grid>
                </>
              );
            })}
         </Grid>
      </Contain>
      </div>
      ) : ""}
      {OtherRecommendationothers !== ""  &&
      <>
            
            
                       
                  
      <Contain>  
                    <div >
                    <Stack direction="row" >
                      <input 
                      type="checkbox" 
                      checked readOnly 
                      />
                      <Labels>
              <label> Others</label>
            </Labels>
            </Stack>
                    </div>
                    <div >
                        <Tf1>
                          <Box>
                            <TextField
                            //  inputProps={{ maxLength: 500 }}
                            size="small"
                            InputProps={{readOnly: true}}
                              fullWidth
                              multiline
                            //   rows={1}
                              value={OtherRecommendationothers || ""} 
                            ></TextField>
                          </Box>
                        </Tf1>
                        </div>
                        </Contain>
                        
                       
      </>
        } 
        </div>
    </div>
  );
};

export default AppraiserOtherRecommendations;
