import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useAppraiserRejectsNormalizerContext } from '../../context/AppraiserRejectsNormalizer';
// import { useAppraiserRejectsNormalizerContext } from '../../../context/AppraiserRejectsNormalizer';
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Contain = styled("div")({
  marginLeft: "58px",
    marginRight: "20px",
  marginTop: '10px',
  width: '100%',
  paddingTop: '0px'

});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const ROrecommendation = styled("div")({
  marginLeft: "58px",
    marginTop: '25px',
  color: '#717171',
  fontSize: '16px',

});
const Labels = styled("div")({
  fontSize: '14px',
  color: 'rgb(0 142 151/84%)',
 // opacity: 0.84,
  marginLeft: '5px',
  fontFamily:"arial"
});
const Checkboxs = (props: any) => {
  const { other1Data,navPrompt, empData,setnavPrompt,moveTab,setMoveTab } = props
  // const [users, setUsers] = useState<any>([])
   //@ts-ignore
  const {otherRecommendation,setOtherRecommendation , setOpenSnackbar,setAppraiserOverallFeedback,appraiserOverallFeedback }= useAppraiserRejectsNormalizerContext()
console.log(otherRecommendation,'okkkkk')
  // useEffect(() => {
  //   console.log('useeffect run')
  //   if (other1Data) {
  //     setUsers(other1Data.data)
  //   }

  // }, [other1Data])
  useEffect(() => {
    if (empData) {
      setOtherRecommendation(() => {
        return empData.data.appraisal.other_recommendation
      });
      // setAppraiserOverallFeedback(() => {
      //   return empData.data.appraisal.appraiser_overall_feedback
      // })
    }
  }, [empData])
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
      props,
      ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })


  const [showToast, setShowToast] = useState(false)



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };

  const handleOnCheck = (e: any) => {
    setnavPrompt(true)
    const { name, checked } = e.target

    const tempUser = otherRecommendation.map((OtherData: any) => {
      return OtherData._id === name ? { ...OtherData, isChecked: checked } : OtherData
    });
    setOtherRecommendation(tempUser)
    console.log(tempUser, 'temp')

  }
  const checkboxHandler = (checkbox: any[]) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return i._id;
      });
      return check;
    }
  };

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
  }, [otherRecommendation])

  useEffect(() => {
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true).filter((k:any) => {
    //   console.log(k.name, 'augustya')
    //   return (k.name === 'Promotion' ||  k.name === 'Demotion')
    //
    // }), 'filterother')
    // console.log(otherRecommendation?.filter((j:any) => j.isChecked === true)[0]?.name === 'Promotion', 'augustya')

    if(otherRecommendation?.filter((j:any) => j.isChecked === true).filter((k:any) => {
      console.log(k.name, 'augustya')
      return (k.name === 'Promotion' ||  k.name === 'Demotion')

    }).length > 1) {
      setShowToast(true)
      setOpenSnackbar(true)
    } else  {
      setOpenSnackbar(false)
      setShowToast(false)
    }
  }, [otherRecommendation])


  return (
    <div>
      <ROrecommendation>
    Normalizer Other Recommendation(s)
      </ROrecommendation>
      <Contain>
        <Box   >
          {/* <Stack direction="row"
            spacing={2}
            style={{ width: "100%", display: "block" }}> */}
            {otherRecommendation && otherRecommendation.map((OtherData: any) => {
              return (
                <>
                  {/* <li
                    style={{
                      width: "8%",
                      float: "left",
                      // marginBottom: "20px",
                      listStyleType: "none",
                    }}
                  >
                  <input
                    name={OtherData._id}
                    checked={OtherData?.isChecked || false}
                    onChange={handleOnCheck}
                    type="checkbox" />
                  <label> {OtherData.name}</label>
                  </li> */}
                  <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      You cannot select Promotion and Demotion Together!
                    </Alert>
                  </Snackbar>
                  <Box
                 
                 sx={{
                   display: 'flex',
                   flexDirection: 'row',
                   width: '20%',
                   float: 'left',
                   paddingBottom:"15px"
                   
                 }}
               >
                 <input
                   name={OtherData._id}
                   checked={OtherData?.isChecked || false}
                   onChange={handleOnCheck}
                   type="checkbox" />
                 <Labels> <label> {OtherData.name}</label>  </Labels>
               </Box>
                </>
              );
            })}
          {/* </Stack> */}
        </Box>
      </Contain>
    </div>
  );
}

export default Checkboxs
