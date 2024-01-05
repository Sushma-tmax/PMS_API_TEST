import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../assets/Images/Newexcel.svg";
import Expand from "../../../assets/Images/Expand.svg";
import Topperformers from "../TopPerformers";
import AlertYesNo from "../../UI/DialogYesNo";
import Popover from '@mui/material/Popover';



export default function NineBoxcardenlarge(props: any) {
  const { title, count, color, icon,defenition } = props;
  let [over,setOver]=React.useState(false);
  console.log(defenition,"defenition")
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  
  return (
    <div>
      
        <Box
        // title={defenition}
        // title="helllo"
          sx={{
            background: color,
            // width: "230px",
            height: "130px",
            padding: "15px",
          }} 
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        
        >
          
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <div>
              <Stack
                direction="column"
                alignItems="left"
                justifyContent="space-between"
                spacing={8}
               
              >
                <Typography
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    // maxWidth:"150px",
                    // wordBreak:"break-word"
                  }}
                  
                >
                  {title}
                </Typography>
                <Typography
                  style={{
                    fontSize: "25px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                  }}
                >
                  {count}
                </Typography>
              </Stack>
            </div>
            <Typography>{icon}</Typography>
          </Stack>
        </Box>
        <Popover
        id="mouse-over-popover"
        // sx={{
        //   pointerEvents: 'none',
        // }}
        open={defenition && open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            backgroundColor: "FEFCF8",
            boxShadow: "none",
            maxWidth: "400px",
            borderRadius: "5px",
          },
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
          // // width: "60%",
          // "& .MuiPopover-paper": {
          //   border: "1px solid #3e8cb5",
          //   backgroundColor: "#ffffff",
          //   // width:"30%"
          // },
        }}
      >
        <Typography style={{
                fontSize: "14px",
                fontFamily: "arial",
                padding: "5px",
              }}>{defenition}</Typography>
      </Popover>
    </div>
  );
}
