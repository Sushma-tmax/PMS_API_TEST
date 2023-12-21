import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";



const Typo1 = styled("div")({
    // marginLeft: "25px",
    //position: "absolute",
    marginTop: '16px',
    color: "#717171",
    fontSize: '16px',
    fontFamily:"arial",

});
const Tablecontainer = styled("div")({
    // marginLeft: "8px",
    marginRight: '22px',
    //position: "absolute",
    marginTop: '12px',

});
const Pad = styled("div")({
    
    fontSize:"14px",
    color:"#333333",
    fontFamily:"arial",
});
const Pad0 = styled("div")({
    paddingLeft: '25px',
    paddingRight: '50px',
    paddingBottom: '10px',


});
const Pad1 = styled("div")({
    textAlign: "center",
    fontSize:"14px",
    color:"#3e8cb5",
    fontFamily:"arial",
    fontWeight:"600",
    
});
const Pad2 = styled('div')({
    paddingLeft: '10px',
    marginTop: '-40px',
    alignItems: "center",
    textAlign: "center",
});
const Pad3 = styled('div')({
    paddingLeft: '10px',

});



const Root = styled('div')`
  table {
    
    border-collapse: collapse;
    width: 100%;
    
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
    background-color: #eaeced;
    fontSize:12px;
    fontWeight:400
  }

 
  td{
    background-color: #f7fbfc;  
    fontSize:12px ;
    fontWeight:400;
   
  }
 
`;
const AppraiserAreaN = (props:any) => {
   // @ts-ignore
    const [filterData, setFilterData] = useState([])
  return (
    <div>
        <Typo1> <b> Area of Improvement</b></Typo1>
            <Tablecontainer sx={{width:"96.5%"}}>
                <Root sx={{ width: "100%" }}   >
                    <table   >
                        <thead style={{background: "#eaeced"}}>
                            <tr>

                                {/* <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, textAlign: "center" }} ><Pad3>#</Pad3></th> */}
                                <th style={{ background:"eaeced"}} ><Pad1>Areas of improvement</Pad1></th>
                                <th style={{ background:"eaeced"}} ><Pad1>Specific actions</Pad1></th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {filterData && filterData.map((i: any, index: any) => {
                              
                                return ( */}
                                    <>
                                        <tr style={{ fontWeight: '400', fontSize: '12px', padding: '5px', textAlign: 'left', color: '#707070', opacity: 0.8, lineHeight: '20px' }}  >
                                            {/* <td width="5%" ><Pad2>{index + 1}</Pad2></td> */}
                                            <td width='50%' >

                                                <Pad>
                                                    {/* {i[0]} */}
                                                </Pad>


                                            </td>
                                            <td style={{ lineHeight: '35px' }} >
                                                {/* {
                                                    filterData && filterData.map((i: any, ix:any) => {
                                                       
                                                        return (
                                                            i[1].map((j: any, jx:any) => {
                                                              
                                                                return (
                                                                    j.specific_actions.map((k: any,ix1:any) => {
                                                                        
                                                                        if(index === ix )
                                                                        return (
                                                                            <Pad>
                                                                               {ix1+1}.{k.value}<br />
                                                                            </Pad>
                                                                        )
                                                                    })
                                                                )
                                                            }))
                                                    })
                                                }
                                                */}
                                            </td>

                                        </tr>
                                       
                                    </>
                                {/* )
                            })} */}
                        </tbody>
                    </table>
                </Root>
            </Tablecontainer>

    </div>
  )
}
export default AppraiserAreaN