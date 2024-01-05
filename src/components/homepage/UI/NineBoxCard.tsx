import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Popover, Tooltip } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Newexcel from "../../../assets/Images/Newexcel.svg";
import Expand from "../../../assets/Images/Expand.svg";
import Topperformers from "../TopPerformers";
import { Link, useNavigate } from "react-router-dom";
import { useGetEmployeeByFilterQuery } from "../../../service";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { MAPPED_TEMPLATE_3 } from "../../../constants/routes/Routing";
import SolidTalents from "../MyTeamDashboardComponents/SolidTalents";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  box: {
    // height: "100px",
    // width: "100%",
    padding: "10px",
    // maxWidth: "300px",
    // ["@media (max-width:600px)"]: {
    //   width: "100%",
    //   height: "100px",
    // },
    // ["@media (max-width:900px)"]: {
    //   width: "100%",
    //   height: "100px",
    // },
  },
}));

export default function NineBoxcard(props: any) {
  const classes = useStyles();
  const { data: RangeValue } = useGetNineboxQuery("");
  const { data: user } = useLoggedInUser();
  const {
    title,
    count,
    color,
    icon,
    defenition,
    navigationFrom,
    handleNavigationForNineBox,
    HandleNaviation,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [indexValue, setindexValue] = React.useState<any>(null);
  const [indexBasedValue, setindexBasedValue] = React.useState<any>([]);
  // const [indexBasedTitle, setindexBasedTitle] = React.useState<any>('');
  const [Range, setRange] = React.useState<any>([]);
  const [select, setSelect] = React.useState<any>([]);
  const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
  const navigate = useNavigate();
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (RangeValue?.data[0]?.performance_definitions !== undefined) {
      setRange(RangeValue?.data[0]?.performance_definitions);
      setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from);
      setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to);
      setRangeMediumFrom(
        RangeValue?.data[0]?.performance_definitions?.medium_from
      );
      setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to);
      setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from);
      setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to);
    }
  }, [RangeValue]);

  const open = Boolean(anchorEl);
  return (
    <div>
      <>
        <Tooltip title={defenition} arrow placement="bottom">
          {/* <Link to={"/"+select }> */}

          {/* <Box
            sx={{
              background: color,
              //  width: "200px",
              height: "100px",
              padding: "10px",
            }}
            onClick={HandleNaviation}
          >
            <Stack direction="column" spacing={5}>
              <div>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    // maxWidth:"150px",
                    // minWidth:"100px",
                    //  wordBreak:"break-word",
                    //  height:"58px"
                  }}
                  // onClick={HandleNaviation}
                >
                  {title}
                </Typography>
              </div>
              <div>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    style={{
                      fontSize: "22px",
                      fontFamily: "Arial",
                      color: "#ffffff",
                    }}
                  >
                    {count}
                  </Typography>
                  <Typography>{icon}</Typography>
                </Stack>
              </div>
            </Stack>
          </Box> */}
          <Box
          className={ classes.box }
            sx={{
              background: color,
              display: "flex",
              flexDirection: "column",
              // width: { xs: "100%", sm: "50%", md: "33.33%", lg: "100%" },
              height: { xs: "100px", sm: "100px", md: "100px", lg: "100px" },

              //   height: "100px",
              //   padding: "10px",
              //   width: "100%", // make the box fill the available space
              //   maxWidth: "300px", // set a maximum width to avoid stretching on large screens
            }}
            onClick={HandleNaviation}
          >
            {/* <Stack direction="column" >
              <div>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    maxWidth: "100%", // allow the text to wrap on smaller screens
                    overflow: "hidden", // prevent text from overflowing the box
                    textOverflow: "ellipsis", // add an ellipsis if the text is too long
                    // whiteSpace: "nowrap", // prevent text from wrapping
                  }}
                >
                  {title}
                </Typography>
              </div>
              <div>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    style={{
                      fontSize: "22px",
                      fontFamily: "Arial",
                      color: "#ffffff",
                    }}
                  >
                    {count}
                  </Typography>
                  <Typography>{icon}</Typography>
                </Stack>
              </div>
            </Stack> */}
             <Typography
              sx={{
                flex: "1 1 auto", // make the heading expand to fill available space
             fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    maxWidth: "100%", // allow the text to wrap on smaller screens
                    overflow: "hidden", // prevent text from overflowing the box
                    textOverflow: "ellipsis", // add an ellipsis if the text is too long
             
              }}
            >
                {title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center",justifyContent:"space-between" }}>
              <Typography
                variant="h6"
                sx={{
                   fontSize: "22px",
                      fontFamily: "Arial",
                      color: "#ffffff",
                  mr: "8px", // add some margin to the right of the number
                }}
              >
              {count}
              </Typography>
              <Typography>{icon}</Typography>
          </Box>
           </Box>

          {/* <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <div>
              <Stack
                direction="column"
                alignItems="left"
                justifyContent="space-between"
                spacing={1}
               
              ><div>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontFamily: "Arial",
                    color: "#ffffff",
                    maxWidth:"150px",
                    minWidth:"100px",
                     wordBreak:"break-word",
                     height:"58px"
                     
                  }}
                >
                  {title}
                </Typography>
                
                </div>
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
          </Stack> */}
          {/* </Link> */}
        </Tooltip>
        {/* <Popover
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
            maxWidth: "240px",
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
              }}>
                {defenition}
                </Typography>
      </Popover> */}
      </>
    </div>
  );
}
