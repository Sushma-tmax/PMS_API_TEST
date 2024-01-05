import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, Tab, Tabs, Typography } from "@mui/material";

export default function SkeletonAnimation() {
  return (
    <Box>
    <div
      style={{
        paddingLeft: "25px",
        paddingBottom: "12px",
        paddingTop: "12px",
        // borderBottom: 1,
        // borderColor: "divider",
      }}
    >
    <Stack spacing={2}>
        
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="rectangular"   width={1350} height={200} animation="wave" 
       sx={{ bgcolor: 'white' }}
      />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Stack direction={"row"} spacing={6}>
      <Skeleton variant="rectangular" width="230.2px" height="79.965px"  sx={{ bgcolor: 'white' }}/> 
       <Skeleton variant="rectangular"  width="230.2px" height="79.965px"  sx={{ bgcolor: 'white' }}/>
       <Skeleton variant="rectangular"  width="230.2px" height="79.965px" sx={{ bgcolor: 'white' }}/> 
       <Skeleton variant="rectangular" width="230.2px" height="79.965px" sx={{ bgcolor: 'white' }} />
       <Skeleton variant="rectangular"  width="230.2px" height="79.965px" sx={{ bgcolor: 'white' }}/>

       </Stack>
       <Stack  direction={"row"} spacing={3}>
      <Skeleton variant="rectangular" width={675} height={250} sx={{ bgcolor: 'white' }}/>
      <Skeleton variant="rectangular" width={650} height={250} sx={{ bgcolor: 'white' }}/>
      </Stack>
    </Stack>
    </div>
    </Box>
   
  );
}