import * as React from "react";
import { useState, useEffect } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


import _ from "lodash";
import Stack from "@mui/material/Stack";

export default function ObjectiveDescription(props: any) {
    const { templateDescriptionData, getIds, valueData, descriptionData, setDescriptionData, setObjectiveType, all, singleTemplate } = props;


    console.log(props, 'descriptionData');
    // console.log(valueData)

    // const [descriptionData, setDescriptionData] = useState<any>();
    const [filteredData, setFilteredData] = useState<any>([]);


    console.log(descriptionData)
    const filteredDescription = (descriptions: any) => {
        if (descriptions && valueData) {
            const res = descriptions.filter((i: any) => {
                const filter = i.objective_type === valueData;
                // setFilteredData(filter);
                return filter;
            });
            console.log(res, 'res')
            return res;
        }
    };
    // console.log(descriptionData);

    const checkboxHandler = (checkbox: any[]) => {
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

    const objectiveTypeUpdater = () => {
        console.log( 'check')
        setObjectiveType((prevState: any) => {
            const fil = prevState
                .filter((descc: any) => {
                    return descc._id === valueData;
                })
                .map((descc: any) => {
                    console.log( descc, 'check')
                    return { ...descc, isChecked: true };
                });

            console.log(fil, 'check')

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
    }

    const handleCheckboxLevel1 = (e: any, id: any) => {
        console.log(id, 'newid')


        const { name, checked } = e.target;


        setDescriptionData((prevState: any) => {
            return descriptionData.map((desc: any) => {
                // console.log(desc._id,desc._id === name , name,checked, 'checked');
                return desc._id === name ? {
                    ...desc,
                    level_1_isChecked: checked,
                    isChecked: checked,
                    level_2_isChecked: false,
                    level_3_isChecked: false,
                    level_4_isChecked: false
                } : desc
            })
        })

        objectiveTypeUpdater()


        // const tempDesc = descriptionData.map((desc: any) =>
        //     desc._id === name ? { ...desc, isChecked: checked } : desc
        // );
        // // // console.log(tempDesc, "run");
        // setDescriptionData(tempDesc);
    }

    const handleCheckboxLevel2 = (e: any) => {
        const { name, checked } = e.target;


        setDescriptionData((prevState: any) => {
            return descriptionData.map((desc: any) => {
                return desc._id === name ? {
                    ...desc,
                    level_2_isChecked: checked,
                    isChecked: checked,
                    level_1_isChecked: false,
                    level_3_isChecked: false,
                    level_4_isChecked: false
                } : desc
            })
        })

        objectiveTypeUpdater()
    }

    const handleCheckboxLevel3 = (e: any) => {
        const { name, checked } = e.target;


        setDescriptionData((prevState: any) => {
            return descriptionData.map((desc: any) => {
                return desc._id === name ? {
                    ...desc,
                    level_3_isChecked: checked,
                    isChecked: checked,
                    level_1_isChecked: false,
                    level_2_isChecked: false,
                    level_4_isChecked: false
                } : desc
            })
        })

        objectiveTypeUpdater()
    }

    const handleCheckboxLevel4 = (e: any) => {
        const { name, checked } = e.target;


        setDescriptionData((prevState: any) => {
            return descriptionData.map((desc: any) => {
                return desc._id === name ? {
                    ...desc,
                    level_4_isChecked: checked,
                    isChecked: checked,
                    level_2_isChecked: false,
                    level_3_isChecked: false,
                    level_1_isChecked: false
                } : desc
            })
        })

        objectiveTypeUpdater()
    }




    // useEffect(() => {
    //     if (templateDescriptionData) {
    //         setDescriptionData(templateDescriptionData);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     //@ts-ignore
    //     getIds(checkboxHandler(descriptionData));
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
                const newArr = [...tempDesc, ...fil]
                // @ts-ignore
                let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()];
                console.log(uniqueObjArray, 'new')
                return uniqueObjArray
            });
        } else {
            const tempDesc = descriptionData.map((desc: any) =>
                desc._id === name ? { ...desc, isChecked: checked } : desc
            );
            // // console.log(tempDesc, "run");
            setDescriptionData(tempDesc);
        }

        setObjectiveType((prevState: any) => {
            const fil = prevState.filter((descc: any) => {
                return descc._id === valueData;
            }).map((descc: any) => {
                return { ...descc, isChecked: true };
            });

            console.log(prevState.filter((descc: any) => {
                return descc._id === valueData;
            }), "prevState");
            const newArr = [...prevState, ...fil];
            // @ts-ignore
            let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values(),
            ];
            console.log(uniqueObjArray, "new");
            return uniqueObjArray;
        });
    };

    // const onSubmit = (e: any) => {
    //   e.preventDefault()
    // //   console.log(checkboxHandler(descriptionData), 'filtered data ')
    // }

    useEffect(() => {
        console.log('useEffect')
        // @ts-ignore
        if (checkboxHandler(filteredDescription(descriptionData)).length === 0) {
            console.log('zeroo')
            return setObjectiveType((prevState: any) => {
                const fil = prevState.filter((descc: any) => {
                    return descc._id === valueData;
                }).map((descc: any) => {
                    return { ...descc, isChecked: false };
                });
                const newArr = [...prevState, ...fil];
                // @ts-ignore
                let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values(),]
                return uniqueObjArray;

            })
        }

    }, [descriptionData, valueData])

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        return setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [state, setState] = useState(false);
    const [hide, setHide] = useState(true);
    const [showAddObjectiveDescription, setShowAddObjectiveDescription] =
        useState(false);


    const addObjectiveHandler = () => {
        console.log("run");
        setState(true);
        setHide(false);
    };



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
                        color: "#014D76",
                        fontSize: "22px",
                        fontFamily: "regular",
                        marginTop: "5px",
                        margin: "25px",
                    }}
                >
                    Objective Title
                </p>
            </div>
            <Scrollbar style={{ width: 380, height: "calc(100vh - 265px)" }}>
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
                            {all && <>
                                <input
                                    style={{
                                        height: "20px",
                                        width: "19px",
                                    }}
                                    type="checkbox"
                                    name="allselect"

                                    checked={
                                        descriptionData &&
                                        filteredDescription(descriptionData).filter((desc: any) => desc.isChecked !== true)
                                            .length < 1
                                    }
                                    onChange={handleChange}
                                />
                                <label> All</label>
                            </>}

                        </div>
                        { }
                        {descriptionData &&
                            filteredDescription(descriptionData).map((desc: any) => {
                                console.log(desc, '222222222')
                                console.log(desc.level_1_isChecked, '2222')
                                console.log(desc.level_2_isChecked, '2222')
                                console.log(desc.level_3_isChecked, '2222')
                                console.log(desc.level_4_isChecked, '2222')
                                return (
                                    <>
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
                                                disabled={desc.isDisabled}
                                                name={desc._id}
                                                checked={(desc.isChecked || false) &&
                                                    checkboxHandler(filteredDescription(descriptionData))
                                                }
                                                onChange={handleChange}
                                            // onClick={onSubmit}
                                            />
                                            <label style={{ fontSize: "16px" }}>
                                                {" "}
                                                {desc.objectiveTitle}
                                            </label>
                                        </div>
                                        <div style={{ paddingLeft: "27px" }}>
                                            {/* <Button
                                                style={{
                                                    textTransform: "none",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    textDecoration: "underline",
                                                    color: "skyblue",
                                                }}
                                                id="basic-button"
                                                color="inherit"
                                                aria-controls={open ? "basic-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? "true" : undefined}
                                                onClick={handleClick}
                                            >
                                                {/* Levels:1.2.3 */}
                                            {/* </Button> */}

                                            {/*<Menu*/}
                                            {/*  style={{ width: "50%" }}*/}
                                            {/*  id="basic-menu"*/}
                                            {/*  anchorEl={anchorEl}*/}
                                            {/*  open={open}*/}
                                            {/*  onClose={handleClose}*/}
                                            {/*  MenuListProps={{*/}
                                            {/*    "aria-labelledby": "basic-button",*/}
                                            {/*  }}*/}
                                            {/*>*/}
                                            <div>
                                                {desc.level_1.level_definition && (
                                                    <Typography
                                                        style={{
                                                            borderBottom: "1px solid lightgrey",
                                                            marginLeft: "5px",
                                                            marginRight: "5px",
                                                            width: "240px"
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                paddingLeft: "5px",
                                                                paddingTop: "20px",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name={desc._id}
                                                                onChange={(e: any) => handleCheckboxLevel1(e, desc._id)}
                                                                checked={desc.level_1_isChecked}
                                                                style={{
                                                                    height: "17px",
                                                                    width: "17px",
                                                                }}
                                                            />
                                                            <span
                                                                style={{ paddingLeft: "7px", fontSize: "14px" }}
                                                            >
                                                                Level 1
                                                            </span>
                                                        </div>
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_1.level_definition}
                                                        </p>
                                                        {desc.level_1.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div>
                                                {desc.level_2.level_definition && (
                                                    <Typography
                                                        style={{
                                                            borderBottom: "1px solid lightgrey",
                                                            marginLeft: "5px",
                                                            marginRight: "5px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                paddingLeft: "5px",
                                                                paddingTop: "20px",
                                                            }}
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                name={desc._id}
                                                                onChange={handleCheckboxLevel2}
                                                                checked={desc.level_2_isChecked || false}
                                                                style={{
                                                                    height: "17px",
                                                                    width: "17px",
                                                                }}
                                                            />
                                                            <span
                                                                style={{ paddingLeft: "7px", fontSize: "14px" }}
                                                            >
                                                                Level 2
                                                            </span>
                                                        </div>
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_2.level_definition}
                                                        </p>
                                                        {desc.level_2.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })}
                                                    </Typography>
                                                )}
                                            </div>

                                            <div>
                                                {desc.level_3.level_definition && (
                                                    <Typography
                                                        style={{
                                                            //   borderBottom: "1px solid lightgrey",
                                                            marginLeft: "5px",
                                                            marginRight: "5px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                paddingLeft: "5px",
                                                                paddingTop: "20px",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={desc.level_3_isChecked || false}
                                                                onChange={handleCheckboxLevel3}
                                                                style={{
                                                                    height: "17px",
                                                                    width: "17px",
                                                                }}
                                                                name={desc._id}
                                                            />
                                                            <span
                                                                style={{ paddingLeft: "7px", fontSize: "14px" }}
                                                            >
                                                                Level 3
                                                            </span>
                                                        </div>
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_3.level_definition}
                                                        </p>
                                                        {desc.level_3.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div>
                                                {desc.level_3.level_definition && (
                                                    <Typography
                                                        style={{
                                                            //   borderBottom: "1px solid lightgrey",
                                                            marginLeft: "5px",
                                                            marginRight: "5px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                paddingLeft: "5px",
                                                                paddingTop: "20px",
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name={desc._id}
                                                                checked={desc.level_4_isChecked || false}
                                                                onChange={handleCheckboxLevel4}
                                                                style={{
                                                                    height: "17px",
                                                                    width: "17px",
                                                                }}
                                                            />
                                                            <span
                                                                style={{ paddingLeft: "7px", fontSize: "14px" }}
                                                            >
                                                                Level 4
                                                            </span>
                                                        </div>
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_4.level_definition}
                                                        </p>
                                                        {desc.level_4.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })}
                                                    </Typography>
                                                )}
                                            </div>
                                            {/*</Menu>*/}
                                        </div>
                                    </>
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
            </Scrollbar>
        </Box>
    );
}
