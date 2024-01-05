import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import _ from "lodash";

const Typo1 = styled("div")({
  marginLeft: "35px",
  //position: "absolute",
  marginTop: "20px",
  // color: "#008E97",
  // fontSize: '13px',
  // opacity: '0.85'
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Tablecontainer = styled("div")({
  marginLeft: "35px",
  marginRight: "35px",
  //position: "absolute",
  marginTop: "10px",
});
const Pad = styled("div")({
  fontSize: "14px",
  color: "#333333",
  fontFamily: "Arial",
  padding:"6px 16px",
  textAlign:"left",
  lineHeight:"23px"
});
const Pad0 = styled("div")({
  paddingLeft: "25px",
  paddingRight: "50px",
  paddingBottom: "10px",
});
const Pad1 = styled("div")({
  textAlign: "center",
});
const Pad2 = styled("div")({
  paddingLeft: "10px",
  marginTop: "-40px",
  alignItems: "center",
  textAlign: "center",
});
const Pad3 = styled("div")({
  paddingLeft: "10px",
});

const Root = styled("div")`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    // padding: 5px;

    background-color: #eaeced;
    fontsize: 12px;
    fontfamily: "Arial";
  }

  td {
    background-color: #ffffff;
    fontsize: 12px;
    fontfamily: "Arial";
  }
`;

const Table1 = (props: any) => {
  // @ts-ignore
  const { appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } =
    useReviewerContext();
  const [filterData, setFilterData] = useState([]);
  const [showArea, setShowArea] = useState(false)

  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area:any) => {
        console.log(area[1]?.[0],"areaa")
        if(area[1]?.[0]?.employee_comments !== "" || area[0] == "" || area[0] == undefined ){
          setShowArea(false);
        }else {
          setShowArea(true);
            setFilterData(name);
        }
        return area[0] !== "" && area[0] !== undefined 
        
      })
      console.log(tempArea,"tempArea")
      // if (tempArea && tempArea?.length > 0) {
      //   setShowArea(true);
      //   setFilterData(name);
      // }
      //  else {
      //   setShowArea(false);
      // }
    }
  };

  useEffect(() => {
    const group = _.groupBy(appraiserAreaOfImprovement, "value");
    console.log(Object.entries(group), "ggggggg");

    const groupName = groupNAmeHandler(Object.entries(group));

    console.log(
      Object.entries(group).map((i: any) => {
        console.log(i);
        console.log(i, "000000000");
        console.log(
          i[1].map((j: any) => {
            console.log(j, "jjjjjjjjjj");

            // console.log(j.description, j.comments,j.rating, 'group')
          }),
          "group"
        );
      }),
      "appraiserAreaOfImprovement"
    );
  }, [appraiserAreaOfImprovement]);

  return (
    <div>
    {showArea && (
    <>
      <Typo1>
        {" "}
        <b>Areas for Improvement</b>
      </Typo1>
      <Tablecontainer>
        <Root sx={{ width: "100%" }}>
          <table>
            <thead>
              <tr>
                {/* <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, textAlign: "center" }} ><Pad3>#</Pad3></th> */}
                <th
                  style={{
                  
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    fontFamily: "arial",
                    padding:"6px 16px",
                    textAlign:"center"
                  }}
                >
                  Specific Areas
                </th>
                <th
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#3E8CB5",
                    fontFamily: "arial",
                    padding:"6px 16px",
                    textAlign:"center"
                  }}
                >
                 Specific Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filterData &&
                filterData.map((i: any, index: any) => {
                  return (
                    <>
                      <tr>
                        {/* <td width="5%" ><Pad2>{index + 1}</Pad2></td> */}
                        <td width="25%">
                          <Pad>{i[0]}</Pad>
                        </td>
                        <td >
                          {filterData &&
                            filterData.map((i: any, ix: any) => {
                              return i[1].map((j: any, jx: any) => {
                                return j.specific_actions.map(
                                  (k: any, ix1: any) => {
                                    if (index === ix)
                                      return (
                                        <Pad>
                                          {/* {ix1+1}. */}
                                          {k.value}
                                          <br />
                                        </Pad>
                                      );
                                  }
                                );
                              });
                            })}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </Root>
      </Tablecontainer>
    </>
      )}
    </div>
  );
};

export default Table1;
