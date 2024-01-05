import * as React from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import StatusCard from "./UI/StatusCard";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width:"25%",padding:"15px 10px",
    ['@media (max-width:768px)']: {
         flexWrap:"wrap",
     }
  },
  box: {
 
    ['@media (max-width:768px)']: {
         flexWrap:"wrap",
     }
  },
  
}));

function StatusBar(props: any) {
  const classes = useStyles();

  const {StatusValues,setValue,handleOnClickCard} = props
  console.log(StatusValues,"StatusValues")
  
  return (
    <>
      <Stack className={classes.box} direction="row" width="100%"  sx={{ borderBottom: "1px solid #e6e6e6" }}>
        {StatusValues?.map((value: any) => {
          const { title, percentage, count,color } = value;
          return (
            <>
            <div className={classes.root}>
            {/* style={{width:"25%",padding:"15px 10px"}} */}
              <StatusCard 
              title={title} 
              percentage={percentage} 
              count={count} 
              color={color} 
              handleOnClickCard={handleOnClickCard}
              />
              </div>
            </>
          );
        })}
      </Stack>
    </>
  );
}

export default StatusBar;
