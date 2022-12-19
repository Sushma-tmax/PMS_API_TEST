import * as React from 'react';
import { styled } from "@mui/material/styles";
import HeaderTabs from './HeaderTabs';
import Table2 from './Table2';
import RTrecommandation from './NormalizerTrainingRecommendation';
import Checkboxs from './NormalizerOtherRecommendation';
import Footerbuttons from './Footerbuttons';
import Performancefeedbacksummary from './Performancefeedbacksummary';
import AppraiserOtherRecommendations from './AppraiserOtherRecommendations';
import { Navcancelbuttons } from './Navcancelbuttons';
import ReviewerOtherRecommendations from './ReviewerOtherRecommendation';
import ReviewerTraining from './ReviewerTraining';
import Table1 from './AppraiserArea';
import AppraiserArea from './AppraiserArea';
import ReviewerArea from './ReviewerArea';
import NormalizerOtherComments from './NormalizerOtherRecommendation';
import NTrainingComments from './NormalizerTrainingRecommendationComments';
import NormalizerRating from "./Rating/ReviewerRating";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { Breadcrumbs, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import {Typography,  Button } from "@mui/material";
import Headleft from "../appraisal/components/Icons/Headleft.svg"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ProvidedReviewerContextProvider from '../../context/reviewerContextContext';
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


const Container1 = styled("div")({
    // position: "relative",
   // background: "#fff",
    // width: "96%",
    // height: "1907px",
    // marginLeft: "25px",
    // marginRight: "25px",
    // marginTop: "10px",
    textTransform: 'none'

});
const Container2 = styled("div")({
    // marginLeft: "25px",
    // marginRight:"25px",
    //background: "#F2F9FA",
    //height: "1280px",
    // marginLeft: "25px",
    background: "#FFFFFF",
    marginLeft: "2.5%",
  marginRight: "2.5%",
    marginTop: "-10px",
    textTransform: 'none'
});

const Footer = styled("div")({
    // marginLeft: "450px",
    paddingTop: "120px",
    paddingBottom: "45px",
  });
const Normalizer = (props:any) => {
  const [value, setValue] = React.useState(0);
  const [rejectAlert, setrejectAlert] = React.useState(false);
    //prompt ------functions
    const [navPrompt, setnavPrompt] = React.useState(false);
    const [moveTab,setMoveTab] = React.useState<any>(false)

    console.log(navPrompt, 'navPrompt')
    const formIsDirty = navPrompt;
    usePrompt('Please save the changes before you leave the page.', formIsDirty);
    //prompt ------functions

    const {employeeData, trainingData,ratingData,otherData,appraisalData} = props
    console.log(employeeData, 'dddd')
    const checkIfRejected = (value: string) => {
        if (employeeData !== undefined ) {
            return employeeData.data.normalizer.normalizer_rejected_value.filter((j:any) => j.value === value)[0].isChecked
        }
    }
    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //   setValue(newValue);
    // };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      if(moveTab === true){
        setrejectAlert(true);
      }else{
        setValue(newValue);
      }
     };
    const handleSliderDialogClose = () => {
      
      setrejectAlert(false);
      
    };
    const handleSliderDialogCancel = () => {
      if(value === 0){
        setValue(1)
      }else{
        setValue(0)
      }
      setrejectAlert(false);
      
    };
    
    return (
        <div style={{backgroundColor:"#F1F1F1"}}>
           <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin:"0px",
              padding:"30px",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText
                id="alert-dialog-description"
                style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  // paddingBottom: "12px",
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordBreak: "break-word",
                  // height: "100px",
                  // width: "300px",
                  alignItems: "center",
                }}
              >
     Please save the changes before leaving the page.
            </DialogContentText>
          </DialogContent>
          <div style={{ alignItems: "center" }}>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "10px",
                  height:"35px",
                  width:"70px",
                  background:"transparent"
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogClose}
              // onClick={() => {
              //   handleClickOpen1();
              //   handleClose();
              // }}
              >
                Ok
              </Button>
              {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "10px",
                  height:"35px",
                  width:"70px",
                  background:"transparent"
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogCancel}
              // onClick={() => {
              //   handleClickOpen1();
              //   handleClose();
              // }}
              >
                Cancel
              </Button> */}
            </DialogActions>
          </div>
        </Dialog>
          <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          marginLeft ="32px"
          // marginTop='20px'
          minHeight ="50px" 
        >
        {/* <IconButton >
            <Link
              to={`/normalizer`}
            // onClick={() => startAppraisal(j._id)}
            >
              <img src={Headleft} alt="icon" />
            </Link>
          </IconButton> */}
          {/* <Typography
            style={{
              paddingLeft: "5px",
              fontSize: "24px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            {" "}
            {employeeData && employeeData?.data?.calendar?.name}
          </Typography> */}
           <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit" to={`/normalizer`}>PA Dashboard</Link>
            <Link style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }} 
            color="inherit" 
            to={`/normalizer`}
            state={{
              from:`${1}`
            }}
           
            >My Actions</Link>
            <Link style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }} color="text.primary" to={""} aria-current="page">
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
          </Stack>
            <Container1>
                
            {employeeData  && 
             <NormalizerRating navPrompt={navPrompt} setnavPrompt={setnavPrompt} handleChange={handleChange }  value={value}
             setValue={setValue} appraisalData={appraisalData} moveTab={moveTab} setMoveTab={setMoveTab}/>
             }
               {/* {employeeData && checkIfRejected('rating') &&<Navcancelbuttons/>} */}
                  <Container2>
         {value === 1 && 
         <div>
                    <Performancefeedbacksummary  employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt}  moveTab={moveTab} setMoveTab={setMoveTab}/>
                    {employeeData  &&<Table2 />}
                    {/* {employeeData &&<NTrainingComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} moveTab={moveTab} setMoveTab={setMoveTab} />} */}
                    {/*{employeeData && checkIfRejected('training_recommendation(s)') &&<ReviewerTraining/>}*/}
                    {/*{employeeData && checkIfRejected('training_recommendation(s)') &&<RTrecommandation training1Data = {trainingData}/>}*/}
                    
                    {/* <Table2 />
                    <ReviewerTraining/>
                    <RTrecommandation training1Data = {trainingData}/> */}
                    
                    
                    {employeeData  &&<AppraiserOtherRecommendations navPrompt={navPrompt} setnavPrompt={setnavPrompt}  moveTab={moveTab} setMoveTab={setMoveTab}/>}
                    {/* {employeeData  &&<AppraiserOtherRecommendations navPrompt={navPrompt} setnavPrompt={setnavPrompt} />} */}
                    {employeeData  &&
                    <>
                    <ProvidedReviewerContextProvider>
                    <NormalizerOtherComments navPrompt={navPrompt} setnavPrompt={setnavPrompt}  moveTab={moveTab} setMoveTab={setMoveTab} />
                             {/* <Checkboxs other1Data={otherData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
                             </ProvidedReviewerContextProvider>
                             </>

                    }


                    {/*{employeeData && checkIfRejected('other_recommendation(s)') &&<ReviewerOtherRecommendations />}*/}
                    {/*{employeeData && checkIfRejected('other_recommendation(s)') &&<Checkboxs other1Data = {otherData}/>}*/}

                    {/* <ReviewerOtherRecommendations />
                    <ReviewerOtherRecommendations />
                    <Checkboxs other1Data = {otherData}/> */}

                    <Footer>
                    <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} setValue={setValue}  moveTab={moveTab} setMoveTab={setMoveTab}/>
                    </Footer>
                    </div>
                    } 
                </Container2>
               
            </Container1>
        </div>
    )
}

export default Normalizer;
