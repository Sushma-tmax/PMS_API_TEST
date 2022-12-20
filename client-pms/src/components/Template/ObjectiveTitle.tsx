import * as React from "react";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import _ from "lodash";
import Stack from "@mui/material/Stack";

export default function ObjectiveTitle(props: any) {
  const {
    templateDescriptionData,
    getIds,
    valueData,
    descriptionData,
    setDescriptionData,
    setObjectiveType,
  } = props;
  // console.log(valueData)

  // const [descriptionData, setDescriptionData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>([]);

  const filteredDescription = (descriptions: any) => {
    if (descriptions && valueData) {
      console.log(descriptions, "descriptions");
      const res = descriptions.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        const filter = i.objective_type._id === valueData;
        // setFilteredData(filter);
        return filter;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };
  // console.log(descriptionData);

  const checkboxHandler = (checkbox: any) => {
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
        return {
          name: i._id,
        };
      });
      return check;
    }
  };

  // useEffect(() => {
  //   if (templateDescriptionData) {
  //     setDescriptionData(templateDescriptionData.data);
  //   }
  // }, []);

  // useEffect(() => {
  //   //@ts-ignore
  //   getIds(checkboxHandler(descriptionData));
  // }, [descriptionData]);

  // const handleChange = (e: any) => {
  //     const {name, checked} = e.target;
  //     // console.log(name);
  //     if (name === "allselect") {
  //
  //
  //         const tempDesc = filteredDescription(descriptionData).map((desc: any) => {
  //             return { ...desc, isChecked: checked };
  //         });
  //         setDescriptionData(tempDesc);
  //
  //         const tempDescc = filteredDescription([...descriptionData]).map((desc: any) => {
  //
  //             setDescriptionData((prevState: any) => {
  //                 return {...prevState, isChecked: checked};
  //             });
  //             return {...desc, isChecked: checked};
  //         });
  //
  //
  //      // console.log(filteredDescription(descriptionData).map((desc: any) => {
  //      //
  //      //        return {...desc, isChecked: checked};
  //      //
  //      //    }));
  //     } else {
  //
  //         const tempDesc = descriptionData.map((desc: any) =>
  //             desc._id === name ? {...desc, isChecked: checked} : desc
  //         );
  //         // // console.log(tempDesc, "run");
  //         setDescriptionData(tempDesc);
  //     }
  // };
  const handleChange = (e: any) => {
    let checkZero = false;
    const { name, checked } = e.target;
    // console.log(name);
    if (name === "allselect") {
      const tempDesc = descriptionData.map((desc: any) => {
        // return { ...desc, isChecked: checked };
        return { ...desc };
      });
      // setDescriptionData(tempDesc);
      setDescriptionData((prevState: any) => {
        console.log(prevState, "prevState");
        const fil = filteredDescription(prevState).map((descc: any) => {
          return { ...descc, isChecked: checked };
        });

        const newArr = [...tempDesc, ...fil];
       
        let uniqueObjArray = [
           // @ts-ignore
          ...new Map(newArr.map((item) => [item["_id"], item])).values(),
        ];
        console.log(uniqueObjArray, "new");
        return uniqueObjArray;
      });
    } else {
      const tempDesc = descriptionData.map((desc: any) =>
        desc._id === name ? { ...desc, isChecked: checked } : desc
      );
      // // console.log(tempDesc, "run");
      setDescriptionData(tempDesc);
    }

    setObjectiveType((prevState: any) => {
      const fil = prevState
        .filter((descc: any) => {
          return descc._id === valueData;
        })
        .map((descc: any) => {
          return { ...descc, isChecked: true };
        });

      console.log(
        prevState.filter((descc: any) => {
          return descc._id === valueData;
        }),
        "prevState"
      );
      const newArr = [...prevState, ...fil];
    
      let uniqueObjArray = [
          // @ts-ignore
        ...new Map(newArr.map((item) => [item["_id"], item])).values(),
      ];
      console.log(uniqueObjArray, "new");
      return uniqueObjArray;
    });
  };

  useEffect(() => {
    console.log("useEffect");
    if (checkboxHandler(descriptionData).length === 0) {
      console.log("zeroo");
      return setObjectiveType((prevState: any) => {
        const fil = prevState
          .filter((descc: any) => {
            return descc._id === valueData;
          })
          .map((descc: any) => {
            return { ...descc, isChecked: false };
          });
        const newArr = [...prevState, ...fil];
      
        let uniqueObjArray = [
            // @ts-ignore
          ...new Map(newArr.map((item) => [item["_id"], item])).values(),
        ];
        return uniqueObjArray;
      });
    }
  }, [descriptionData]);

  // const onSubmit = (e: any) => {
  //   e.preventDefault()
  // //   console.log(checkboxHandler(descriptionData), 'filtered data ')
  // }

  return (
    <Box
      /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
      height="calc(100vh - 180px)"
      border={1}
      borderColor="#e0e0e0"
      width={380}
      marginTop={2}
      marginLeft="-50px"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <p
          style={{
            color: "#3E8CB5",
            fontSize: "14px",
            fontFamily: "Arial",
            fontWeight:"600",
            marginTop: "5px",
            margin: "25px",
          }}
        >
          Objective Title
        </p>
      </div>

      <div style={{ margin: "25px" }}>
        <form>
          <div
            style={{
              paddingBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            <input
              style={{
                height: "20px",
                width: "19px",
              }}
              type="checkbox"
              name="allselect"
              checked={
                descriptionData &&
                filteredDescription(descriptionData).filter(
                  (desc: any) => desc.isChecked !== true
                ).length < 1
              }
              onChange={handleChange}
            />
            <label> All</label>
          </div>

          {descriptionData &&
            filteredDescription(descriptionData).map((desc: any) => {
              return (
                <div
                  style={{
                    paddingBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                  }}
                  key={desc._id}
                >
                  <input
                    type="checkbox"
                    style={{
                      height: "20px",
                      width: "19px",
                    }}
                    name={desc._id}
                    checked={
                      (desc.isChecked || false) &&
                      checkboxHandler(filteredDescription(descriptionData))
                    }
                    onChange={handleChange}
                    // onClick={onSubmit}
                  />
                  <label style={{ fontSize: "12px",color:"#717171",fontFamily:"Arial" }}>
                    {" "}
                    {desc.description}
                  </label>
                </div>
              );
            })}

          {/*{descriptionData &&*/}
          {/*    descriptionData.map((desc: any) => {*/}
          {/*        return (*/}
          {/*            <div key={desc._id}>*/}
          {/*                <input*/}
          {/*                    type="checkbox"*/}
          {/*                    name={desc._id}*/}
          {/*                    checked={desc.isChecked || false}*/}
          {/*                    onChange={handleChange}*/}
          {/*                    // onClick={onSubmit}*/}
          {/*                />*/}
          {/*                <label> {desc.description}</label>*/}
          {/*            </div>*/}
          {/*        );*/}
          {/*    })}*/}
        </form>
      </div>
    </Box>
  );
}
