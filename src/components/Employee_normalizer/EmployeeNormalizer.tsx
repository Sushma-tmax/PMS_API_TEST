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
    marginLeft: "25px",
    marginRight:"25px",
    marginTop: "10px",
    textTransform: 'none'

});
const Container2 = styled("div")({
    // marginLeft: "25px",
    // marginRight:"25px",
    //background: "#F2F9FA",
    //height: "1280px",
    // marginLeft: "25px",
    background: "#F2F9FA",
    marginLeft: "25px",
    marginRight:"25px",
    marginTop: "10px",
    textTransform: 'none'
});

const Footer = styled("div")({
    // marginLeft: "450px",
    paddingTop: "120px",
    paddingBottom: "45px",
  });
const EmployeeNormalizer = (props:any) => {
    const {employeeData, trainingData,ratingData,otherData} = props
    console.log(employeeData, 'dddd')
    const checkIfRejected = (value: string) => {
        if (employeeData !== undefined ) {
            return employeeData.data.normalizer.normalizer_rejected_value.filter((j:any) => j.value === value)[0].isChecked
        }
    }

    //prompt ------functions
const [navPrompt, setnavPrompt] = React.useState(false);
  
console.log(navPrompt, 'navPrompt')
const formIsDirty = navPrompt;
usePrompt(
  // 'Please save the changes before you leave the page.',
  "Any changes you have made will not be saved if you leave the page.", 
formIsDirty);
//prompt ------functions
    
    return (
        <div style={{backgroundColor:"#F1F1F1"}}>
            <Container1>
                
            {employeeData && checkIfRejected('rating') && <NormalizerRating navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
               {/* {employeeData && checkIfRejected('rating') &&<Navcancelbuttons/>} */}
                  <Container2>
                    <Performancefeedbacksummary  employeeData={employeeData} navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
                    {employeeData && checkIfRejected('training_recommendation(s)') &&<Table2 />}
                    {employeeData && checkIfRejected('training_recommendation(s)') &&<NTrainingComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
                    {/*{employeeData && checkIfRejected('training_recommendation(s)') &&<ReviewerTraining/>}*/}
                    {/*{employeeData && checkIfRejected('training_recommendation(s)') &&<RTrecommandation training1Data = {trainingData}/>}*/}
                    
                    {/* <Table2 />
                    <ReviewerTraining/>
                    <RTrecommandation training1Data = {trainingData}/> */}
                    
                    
                    
                    {employeeData && checkIfRejected('other_recommendation(s)') &&<AppraiserOtherRecommendations navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
                    {employeeData && checkIfRejected('training_recommendation(s)') &&<NormalizerOtherComments navPrompt={navPrompt} setnavPrompt={setnavPrompt} />}
                    {/*{employeeData && checkIfRejected('other_recommendation(s)') &&<ReviewerOtherRecommendations />}*/}
                    {/*{employeeData && checkIfRejected('other_recommendation(s)') &&<Checkboxs other1Data = {otherData}/>}*/}

                    {/* <ReviewerOtherRecommendations />
                    <ReviewerOtherRecommendations />
                    <Checkboxs other1Data = {otherData}/> */}

                    <Footer>
                    <Footerbuttons  navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
                    </Footer>
                </Container2>
               
            </Container1>
        </div>
    )
}

export default EmployeeNormalizer;
