import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import { Typography } from '@mui/material';
import { useAppraiserRejectsReviewerContext } from '../../../context/AppraiserRejectsReviewer';
import _ from "lodash";

const Typo1 = styled("div")({
    marginLeft: "25px",
    //position: "absolute",
    marginTop: '16px',
    color: "#008E97",
    fontSize: '13px',
    opacity: '0.85'

});
const Tablecontainer = styled("div")({
    marginLeft: "25px",
    marginRight: '32px',
    //position: "absolute",
    marginTop: '12px',

});
const Pad = styled("div")({
    paddingLeft: '25px',
    paddingRight: '50px',
    paddingBottom: '10px',
    marginTop: '-10px'

});
const Pad0 = styled("div")({
    paddingLeft: '25px',
    paddingRight: '50px',
    paddingBottom: '10px',


});
const Pad1 = styled("div")({
    paddingLeft: '25px',
    textAlign: "left",
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
    padding: 5px;
    background-color: #eaf2f5;
    fontSize:12px;
    fontWeight:400
  }

 
  td{
    background-color: #f7fbfc;  
    fontSize:12px ;
    fontWeight:400;
   
  }
 
`;

const Table1 = (props: any) => {
    // @ts-ignore
    const { appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } = useAppraiserRejectsReviewerContext()
    const [filterData, setFilterData] = useState([])


    const groupNAmeHandler = (name: any) => {
        if (name) {
            setFilterData(name)
        }
    }

    useEffect(() => {
        const group = _.groupBy(appraiserAreaOfImprovement, 'value')
        console.log(Object.entries(group),'ggggggg')

        const groupName = groupNAmeHandler(Object.entries(group))

        console.log(Object.entries(group).map((i: any) => {
            console.log(i)
            console.log(i, '000000000')
            console.log(i[1].map((j: any) => {
                console.log(j, 'jjjjjjjjjj')

                // console.log(j.description, j.comments,j.rating, 'group')

            }), 'group')
        }), 'appraiserAreaOfImprovement')


    }, [appraiserAreaOfImprovement])



    return (
        <div><Typo1>  Reviewer  Area(s) of Improvement</Typo1>
            <Tablecontainer>
                <Root sx={{ width: "100%" }}   >
                    <table   >
                        <thead >
                            <tr>

                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, textAlign: "center" }} ><Pad3>#</Pad3></th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} ><Pad1>Areas of improvement</Pad1></th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} ><Pad1>Specific actions</Pad1></th>

                            </tr>
                        </thead>
                        <tbody>
                            {filterData && filterData.map((i: any, index: any) => {
                              
                                return (
                                    <>
                                        <tr style={{ fontWeight: '400', fontSize: '12px', padding: '5px', textAlign: 'left', color: '#707070', opacity: 0.8, lineHeight: '20px' }}  >
                                            <td width="5%" ><Pad2>{index + 1}</Pad2></td>
                                            <td width='50%' >

                                                <Pad>{i[0]}</Pad>


                                            </td>
                                            <td style={{ lineHeight: '35px' }} >
                                                {
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
                                               
                                            </td>

                                        </tr>
                                       
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </Root>
            </Tablecontainer>
        </div>
    )
}

export default Table1;
