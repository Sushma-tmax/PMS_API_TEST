import * as React from 'react';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { useReviewerContext } from '../../../context/reviewerContextContext';

const Contain = styled("div")({
  marginLeft: "25px",
  marginRight: "20px",
  marginTop: '10px',
  width: '1200',
  paddingTop: '0px'

});
const I1 = styled("div")({
  fontSize: '14px',
  color: '#008E97',
  opacity: 0.84
});
const ROrecommendation = styled("div")({
  marginLeft: "25px",
  marginTop: '25px',
  color: '#008E97',
  fontSize: '13px',
  opacity: 0.85,

});
const Labels = styled("div")({
  fontSize: '14px',
  color: 'rgb(0 142 151/84%)',
 // opacity: 0.84,
  marginLeft: '5px'
});
const Checkboxs = (props: any) => {
  const { other1Data } = props
  // const [users, setUsers] = useState<any>([])
   //@ts-ignore
  const {otherRecommendation,setOtherRecommendation } = useReviewerContext()
console.log(otherRecommendation,'okkkkk')
  // useEffect(() => {
  //   console.log('useeffect run')
  //   if (other1Data) {
  //     setUsers(other1Data.data)
  //   }

  // }, [other1Data])

  const handleOnCheck = (e: any) => {
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


  return (
    <div>
      <ROrecommendation>
        Reviewer Other Recommendation(s)
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
                  <Box
                 
                 sx={{
                   display: 'flex',
                   flexDirection: 'row',
                   width: '20%',
                   float: 'left',
                   
                   
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
