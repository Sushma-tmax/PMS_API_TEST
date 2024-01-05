// export default function nineBoxGrid() {
//     return (
//         <div>
//             9box
//         </div>
//     )
// }
import * as React from "react";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import NineBoxCard from "../../UI/NineBoxCard";
import Grid from "@mui/material/Grid";
import Potentialtalents from "../../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../../assets/Images/Solidtalents.svg";
import Newexcel from "../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import Star from "../../../../assets/Images/Star.svg";
import Inconsistent from "../../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../../assets/Images/Highperformers.svg";
function ExpandNineBox(props:any) {
    const {nineboxValues, setindexValue,BaseStateValue,defenition} = props
    console.log(nineboxValues,"nineboxValues")
    // console.log(BaseStateValue,"BaseStateValue")
  const NineBoxValues = [
    {
      title: "Potential Talents",
      count: "20",
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Potentialtalents} alt="image" />,
    },
    {
      title: "Solid Talents",
      count: "20",
      color: "linear-gradient(to right, #71E1F6, #28B7D3)",
      icon: <img src={Solidtalents} alt="image" />,
    },
    {
      title: "Star (A Future Leader)",
      count: "20",
      color: "#71E1F6",
      icon: <img src={Star} alt="image" />,
    },
    {
      title: "Inconsistent Performers",
      count: "20",
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Inconsistent} alt="image" />,
    },
    {
      title: "Solid Performers With Potential",
      count: "20",
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformers} alt="image" />,
    },
    {
      title: "High Performers With Potential",
      count: "20",
      color: "#71E1F6",
      icon: <img src={HighPerformerstop} alt="image" />,
    },
    {
      title: "Low Performers",
      count: "20",
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Lowperformers} alt="image" />,
    },
    {
      title: "Solid Performers",
      count: "20",
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformer} alt="image" />,
    },
    {
      title: "High Performers",
      count: "20",
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Highperformers} alt="image" />,
    },
  ];
  //For showing first title in the beginning for solid talents
  // useEffect(() => {
  //   if(BaseStateValue == "" || BaseStateValue == undefined || BaseStateValue == null ){
  //     // setTimeout(() => {
  //       setindexValue(0)
  //     // },5000);
  //   }
  // }, [])
  
  const handleClick = (event:any, index:any) => {
    //console.log(event.target.value);
    console.log('index: ', index);
    setindexValue(index)
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div
              style={{
                marginLeft: "25px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "440px",
                  background: "#eeeeee",
                  position: "relative",
                }}
              >
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "13px solid #EEEEEE",
                  position: "absolute",
                  //   top: " -12px",
                  left: "3px",
                  // top: "800px",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <span
                style={{
                  position: "absolute",
                  left: "-23px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "62px",
                }}
              >
                High
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "-37px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "198px",
                }}
              >
                Moderate
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "-23px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "332px",
                }}
              >
                Low
              </span>
            </div>
           
            </div>
          </Grid>
          <Grid item xs={11}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                columnGap: "15px",
                rowGap: "15px",
                //   paddingTop: "60px",
                //   padding: "40px",
                //   paddingRight: "0px",
                paddingLeft: "40px",
                paddingBottom: "40px",
                paddingTop:"10px"
                // height: "calc(100vh - 225px)"
              }}
            >
              <div
              style={{
                transform: "rotateZ(270deg)",
                position: "absolute",
                left: "108px",
                // top: "572px",
                marginTop:"192px",
                fontSize: "12px",
              }}
            >
              Potential
            </div> 
              {nineboxValues?.map((value: any,index:number) => {
                const { title, count, color, icon,defenition } = value;

                return (
                  <>
                  <div
                  onClick={event => handleClick(event, index)}
                  style={{ cursor: "pointer" }}
                  >
                    <NineBoxCard
                      title={title}
                      count={count}
                      color={color}
                      icon={icon}
                      defenition={defenition}
                     
                     
                    />
                     {/* <img
                      src={Newexcel}
                      // style={{float:"right"}}
                      alt="icon"
                      style={{ marginLeft: "80%", marginTop: "5px" ,float:"right"}}
                      // onClick={handleExport}
                    /> */}
                  </div>
                  </>
                  
                );
              })}
              <div
              style={{
                position: "absolute",
                left: "35%",
                fontSize: "12px",
                marginTop:"410px"
                // top:"96%"
              }}
              >

                Performance
              </div>
            </Box>
            <div>
            <div
                style={{
                  height: "5px",
                  background: "#eeeeee",
                  width: "100%",
                  marginTop: "20px",
                  position: "relative",
                }}
              >
               <div
                style={{
                  width: "0",
                  height: "0",
                  borderTop: "10px solid transparent",
                  borderLeft: "10px solid transparent",
                  borderBottom: "10px solid #EEEEEE",
                  position: "absolute",
                  //   top: " -12px",
                  top: " -10px",
                  left: "99%",
                  transform: "rotate(316deg)",
                }}
              ></div> 
              <span
                style={{
                  position: "absolute",
                   left: "16%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                Low
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "48%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                Moderate
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "81%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                High
              </span>
              </div>
              
              </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default ExpandNineBox;
