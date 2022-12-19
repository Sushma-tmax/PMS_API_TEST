import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress,{ linearProgressClasses, LinearProgressProps }  from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack } from "@mui/material";
import { useGetEmployeeQuery } from "../../../service";
import { styled } from "@mui/material/styles";



const Text = styled("div")({
  "& .MuiLinearProgress-determinate": {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ffffff",
  
      borderRadius: 1,
      height: "20px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: "#C00000",
    },
  }
});
const Text2 = styled("div")({
  "& .MuiLinearProgress-determinate": {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ffffff",
  
      borderRadius: 1,
      height: "20px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: "#EE8A1E",
    },
  }
});
const Text3 = styled("div")({
  "& .MuiLinearProgress-determinate": {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ffffff",
  
      borderRadius: 1,
      height: "20px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: "#00B050",
    },
  }
});
const Text4 = styled("div")({
  "& .MuiLinearProgress-determinate": {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ffffff",
  
      borderRadius: 1,
      height: "20px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: "#00B050",
    },
  }
});
const Text5 = styled("div")({
  "& .MuiLinearProgress-determinate": {
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ffffff",
  
      borderRadius: 1,
      height: "20px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 1,
      backgroundColor: "black",
    },
  }
});



function LinearProgressWithLabel(props: JSX.IntrinsicAttributes & LinearProgressProps) {
  const { data, isLoading } = useGetEmployeeQuery("all");
  const checklengthinRange = (min: number, max: number) => {
    return (
      (data?.data?.filter((item: any) => {
        console?.log(item?.appraisal?.appraiser_rating, "appraisal_rating");
        return (
          item?.appraisal?.appraiser_rating >= min &&
          item?.appraisal?.appraiser_rating <= max
        );
      })?.length *
        100) /
      data?.data?.length
    );
  };
  
  if (isLoading) {
    return <p>Loading </p>;
  }
  console.log(checklengthinRange(1, 1.9),'data3')
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Box sx={{ width: "50px", mr: 1 }}> */}
        {/* <Box sx={{  mr: 4 }}>  */}
        <div
         style={{width:"50px"}}>
        <LinearProgress variant="determinate"  
         value={checklengthinRange(2.5, 2.99)}
        // value={50}
        />
        </div>
      {/* </Box> */}
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(checklengthinRange(2.5, 2.99))}`}</Typography>
      </Box>
    </Box>
  );
}
function LinearProgressWithLabel2(props: JSX.IntrinsicAttributes & LinearProgressProps) {
  const { data, isLoading } = useGetEmployeeQuery("all");
  const checklengthinRange = (min: number, max: number) => {
    return (
      (data?.data?.filter((item: any) => {
        console?.log(item?.appraisal?.appraiser_rating, "appraisal_rating");
        return (
          item?.appraisal?.appraiser_rating >= min &&
          item?.appraisal?.appraiser_rating <= max
        );
      })?.length *
        100) /
      data?.data?.length
    );
  };
  
  if (isLoading) {
    return <p>Loading </p>;
  }
  console.log((checklengthinRange(1, 1.9),'data2'))
  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
       {/* <Box sx={{ width: "50px", mr: 1 }}> */}
       <div
       style={{width:"50px"}}
       >
        <LinearProgress variant="determinate"   
        value={checklengthinRange(1, 1.99)}
          // value={50}
        
        />
        </div>
      {/* <Box sx={{ minWidth: 35 }}> */}
      <div>
        <Typography variant="body2" color="text.secondary">{`${Math.round(checklengthinRange(1, 1.99))}`}</Typography>
        </div>
      {/* </Box> */}
     
    </Box>
    
   </>
  );
  }
  function LinearProgressWithLabel3(props: JSX.IntrinsicAttributes & LinearProgressProps) {
    const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
      return (
        (data?.data?.filter((item: any) => {
          console?.log(item?.appraisal?.appraiser_rating, "appraisal_rating");
          return (
            item?.appraisal?.appraiser_rating >= min &&
            item?.appraisal?.appraiser_rating <= max
          );
        })?.length *
          100) /
        data?.data?.length
      );
    };
    
    if (isLoading) {
      return <p>Loading </p>;
    }
    return (
      <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         {/* <Box sx={{ width: "50px", mr: 1 }}> */}
         <div
         style={{width:"50px"}}>
          <LinearProgress variant="determinate"   
          value={checklengthinRange(2, 2.49)} 
          // value={50}
          />
        </div>
        {/* <Box sx={{ minWidth: 35 }}> */}
        <div>
          <Typography variant="body2" color="text.secondary">{`${Math.round(checklengthinRange(2, 2.49))}`}</Typography>
          </div>
        {/* </Box> */}
       
      </Box>
      
     </>
    );
    }
    function LinearProgressWithLabel4(props: JSX.IntrinsicAttributes & LinearProgressProps) {
      const { data, isLoading } = useGetEmployeeQuery("all");
      const checklengthinRange = (min: number, max: number) => {
        return (
          (data?.data?.filter((item: any) => {
            console?.log(item?.appraisal?.appraiser_rating, "appraisal_rating");
            return (
              item?.appraisal?.appraiser_rating >= min &&
              item?.appraisal?.appraiser_rating <= max
            );
          })?.length *
            100) /
          data?.data?.length
        );
      };
      
      if (isLoading) {
        return <p>Loading </p>;
      }
      return (
        <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
           {/* <Box sx={{ width: "50px", mr: 1 }}> */}
           {/* <Box sx={{  mr: 4 }}>  */}
           <div
         style={{width:"50px"}}>
            <LinearProgress variant="determinate" 
            value={checklengthinRange(3, 3.49)}
            // value={50}
             />
             </div>
          {/* </Box> */}
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math?.round(checklengthinRange(3, 3.49))}`}</Typography>
          </Box>
         
        </Box>
        
       </>
      );
      }
      function LinearProgressWithLabel5(props: JSX.IntrinsicAttributes & LinearProgressProps) {
        const { data, isLoading } = useGetEmployeeQuery("all");
        const checklengthinRange = (min: number, max: number) => {
          return (
            (data?.data?.filter((item: any) => {
              console.log(item?.appraisal?.appraiser_rating, "appraisal_rating");
              return (
                item?.appraisal?.appraiser_rating >= min &&
                item?.appraisal?.appraiser_rating <= max
              );
            })?.length *
              100) /
            data?.data?.length
          );
        };
        
        if (isLoading) {
          return <p>Loading </p>;
        }
        console?.log((checklengthinRange(1, 1.9),'data5'))
        return (
          <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
             {/* <Box sx={{ width: "50px", mr: 1 }}> */}
         {/* <Box sx={{  mr: 4 }}>  */}
         <div
         style={{width:"50px"}}>
              <LinearProgress variant="determinate"  
               value={(checklengthinRange(3.5, 3.99))}
              //  value={50}
               />
            
            </div>
            {/* </Box> */}
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(checklengthinRange(3.5, 3.99))}`}</Typography>
            </Box>
           
          </Box>
          
         </>
        );
        }
      

export default function LinearWithValueLabel5() {
  

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        marginTop="40px"
      >
    <Text> <LinearProgressWithLabel2   /></Text>
    <Text2> <LinearProgressWithLabel3  /></Text2>
     <Text3> <LinearProgressWithLabel   /></Text3>
     <Text4> <LinearProgressWithLabel4   /></Text4>
     <Text5> <LinearProgressWithLabel5  /></Text5>
      

      </Stack>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        marginTop="40px"
      >
      <div>
     <p
       style={{
         justifyContent: "center",
         fontSize: "16px",
         color: "#333333",
         opacity: "75%",
       }}
     >
       1 - 1.99
     </p>
   </div>
   <span>
            <p
              style={{
                justifyContent: "center",
                fontSize: "16px",
                color: "#333333",
                opacity: "75%",
              }}
            >
              2 - 2.49
            </p>
          </span>
          <span>
            <p
              style={{
                justifyContent: "center",
                fontSize: "16px",
                color: "#333333",
                opacity: "75%",
              }}
            >
              2.5 - 2.99
            </p>
          </span>
          <span>
            <p
              style={{
                justifyContent: "center",
                fontSize: "16px",
                color: "#333333",
                opacity: "75%",
              }}
            >
              3 - 3.49
            </p>
          </span>
          <span>
            <p
              style={{
                justifyContent: "center",
                fontSize: "16px",
                color: "#333333",
                opacity: "75%",
              }}
            >
            3.5 - 3.99
            </p>
          </span>
          </Stack>
    </Box>
  );
}
