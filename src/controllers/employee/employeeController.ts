import {Employee, ObjectiveType} from "../../models";
import asyncHandler from "../../middleware/asyncHandler";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import Template from "../../models/Template";
import mongoose from "mongoose";
import {getImage} from "../azureImageStorage";


const getRatingsfromObjectiveDescription = (data:any) => {
    return data?.map((k:any) => {
        return {
            // ratings: k.ratings,
            // rating_rejected: false,
            // rating_comments: "",
            // comments: ""
            name: k.name,
            value: k.value,
            ratings: k.ratings,
            level_1_isChecked: k.level_1_isChecked,
            level_2_isChecked: k.level_2_isChecked,
            level_3_isChecked: k.level_3_isChecked,
            level_4_isChecked: k.level_4_isChecked
        }
    })
}

const employeeUpdateMany = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.body
    // console.log(id, '`````````````````````````````````````````````````')
    // const {reviewer: appraisal} = await Employee.findById(id);

    const employee = await Employee.updateMany({_id: {$in: id}}, {
            $set: {
                "manager_code": "1080"
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const employeeAppraisalClose = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.body
    // console.log(id, '`````````````````````````````````````````````````')
    // const {reviewer: appraisal} = await Employee.findById(id);

    const employee = await Employee.updateMany({_id: {$in: id}}, {
            $set: {
                // reviewerIsChecked: false,
                // reviewerIsDisabled: true,
                // normalizerIsChecked: false,
                // normalizerIsDisabled: true,
                // appraiserIsDisabled: true,
                // appraiserIsChecked: false,
                // employee: {},
                // appraisal_template : {},
                // appraisal : {},
                // reviewer : {},
                // normalizer : {},
                "appraisal.status" : "not-started"
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})




const createEmployee = asyncHandler(async (req: Request, res: Response) => {

    const employee = await Employee.create(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        data: employee,
    });
})


const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

    const {status} = req.params

    let employees: any


    if (status === 'all') {
        employees = await Employee.find()
    } else {
        employees = await Employee.find({"appraisal.status": status})
    }
    //employees.populate('calendar')
    // employees.populate({
    //             path: 'appraisal',
    //             populate: {
    //                 path: 'objective_group.name',
    //             }
    //         }).populate({
    //             path: 'appraisal',
    //             populate: {
    //                 path: 'objective_type.name',
    //             }
    //         }).populate({
    //             path: 'appraisal',
    //             populate: {
    //                 path: 'objective_description.name'
    //             }
    //         })
    //         .populate({
    //             path: 'appraisal.objective_type',
    //             populate: {
    //                 path: 'objective_description.ratings'
    //             }
    //         }).populate('appraisal.other_recommendation')
    //         .populate('appraisal.training_recommendation')
    // employees.populate({
    //     path: 'appraisal',
    //     populate: {
    //         path: 'objective_group.name',
    //     }
    // }).populate({
    //     path: 'appraisal',
    //     populate: {
    //         path: 'objective_type.name',
    //     }
    // }).populate({
    //     path: 'appraisal',
    //     populate: {
    //         path: 'objective_description.name'
    //     }
    // }).populate({
    //     path: 'appraisal',
    //     populate: {
    //         path: 'objective_description.ratings'
    //     }
    // }).populate('appraisal.other_recommendation')
    //     .populate('appraisal.training_recommendation')


    res.status(StatusCodes.OK).json({
        success: true,
        data: employees,
    });
})


const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {


    const employee = await Employee.findById(req.params.id)
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_group.name',
            }
        })
        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('appraisal.other_recommendation.name')
        .populate('appraisal.training_recommendation.name')
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })
        .populate({
            path: 'employee.objective_description.name',
        }).populate({
            path: 'employee_draft.objective_description.name',
        })
        .populate({
            path: 'employee',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_group.name',
            }
        })

        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.name'
            }
        })

        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('appraisal_template.other_recommendation.name')
        .populate('appraisal_template.training_recommendation.name')
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })
        .populate('appraisal.other_recommendation.name')
        .populate('appraisal.feedback_questions.name')
        .populate({
            path: 'reviewer',
            populate: {
                path: 'objective_group.name',
            }
        })
        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'reviewer',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'reviewer',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('reviewer.other_recommendation.name')
        .populate('reviewer.training_recommendation.name')
        .populate({
            path: 'reviewer',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        }).populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_group.name',
            }
        })
        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('appraisal_template.other_recommendation.name')
        .populate('appraisal_template.training_recommendation.name')
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })
        .populate('reviewer.other_recommendation.name')
        .populate('reviewer.feedback_questions.name')
        .populate({
            path: 'normalizer',
            populate: {
                path: 'objective_group.name',
            }
        })
        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'normalizer',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'normalizer',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('normalizer.other_recommendation.name')
        .populate('normalizer.training_recommendation.name')
        .populate({
            path: 'normalizer',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        }).populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_group.name',
            }
        })
        // .populate({
        //     path: 'appraisal',
        //     populate: {
        //         path: 'objective_type.name',
        //     }
        // }).
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('appraisal_template.other_recommendation.name')
        .populate('appraisal_template.training_recommendation.name')
        .populate({
            path: 'appraisal_template',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })
        .populate('normalizer.other_recommendation.name')
        .populate('normalizer.feedback_questions.name')
        .populate('appraisal_template.feedback_questionnaire.name')
        .populate('calendar')

    const fun =  (test:any) => {
        return "www.google.com" + test

    }

    // @ts-ignore
    employee?.appraisal?.attachments = employee.appraisal.attachments.map((j: any) => {
        // const at : {
        //
        // }
        // console.log(getImage(j.url),'gggg')
        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })

// @ts-ignore
    employee?.reviewer?.attachments = employee.reviewer.attachments.map((j: any) => {
        // const at : {
        //
        // }
        // console.log(getImage(j.url),'gggg')
        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })


    // @ts-ignore
    employee?.normalizer?.attachments = employee.normalizer.attachments.map((j: any) => {
        // const at : {
        //
        // }
        // console.log(getImage(j.url),'gggg')
        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })

    // @ts-ignore
    employee?.employee?.attachments = employee.employee.attachments.map((j: any) => {
        // const at : {
        //
        // }
        // console.log(getImage(j.url),'gggg')
        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })

    // const att = {
    //     ...employee,
    //     //@ts-ignore
    //    attachments:  employee.appraisal.attachments.map((j: any) => {
    //         // const at : {
    //         //
    //         // }
    //         return {
    //             attachments: j.name,
    //             //@ts-ignore
    //             attach: "www.google.com"
    //         }
    //     })
    // }

    // console.log(att.appraisal.attachments)

    if (!employee) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: 'No employee found'
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: employee,
        // att
    });
})


const updateEmployee = asyncHandler(async (req: Request, res: Response) => {

    // console.log(req.body, '1111111111111111111')
    // const {obj} = req.body;
    // console.log(obj, '1111111111111')

    // const objectiveDescriptionMapped = obj.map((i: any) => {
    //     console.log(i.value, '1111111111111111')
    //     // if (i.ratings) {
    //     const sum = (i.value * i.objective_type) / 10000
    //     const newSum = sum * i.ratings.rating
    //     // console.log(sum, '1111111111111111111')
    //     return newSum
    //     // }
    // })

    // console.log(objectiveDescriptionMapped, '1111111111111111111')

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!employee) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: 'No employee found'
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: employee,
    });
})


const addTemplateToEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params;


    // const {weightage} = template;
    //
    const employee = await Employee.findOne(
        {
            "_id": new mongoose.Types.ObjectId(id),
        }
    )

    const {appraisal_template: {objective_group, objective_type, objective_description}} = employee;
    const {appraisal: {objective_description: appraisal_objective_description}} = employee;

    if (appraisal_objective_description.length === 0) {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            {
                "_id": new mongoose.Types.ObjectId(id),
            },
            {
                $set:
                    {
                        appraisal_status: 'appraiser',
                        appraisal: {
                            status: 'in-progress',
                        }
                    },
                new: true,
                runValidators: true
            }
        )
        res.status(StatusCodes.OK).json({
            // "employee.appraisal_template.objective_group": employee.appraisal_template,
            updatedEmployee
        });

    } else {
        res.status(StatusCodes.OK).json({
            success: true,
            data: employee,
        });
    }


})

const addRating = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body
    // {"appraisal.objective_group.objective_type.objective_description._id": "6207ec6ac1226d3f36fc4"}
    const employee = await Employee.updateOne({
            "_id": "6204935ebca89023952f2da9",
            "appraisal.objective_group._id": ("6207ec6a8bfc1226d3f36fb1")
        }, {

            $set: {
                "appraisal.objective_group.$.value": 23
            }

        }
        // {"appraisal.objective_group.objective_type.value": 1}
    )
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_group.name',
            }
        }).populate({
            path: 'appraisal',
            populate: {
                path: 'objective_type.name',
            }
        }).populate({
            path: 'appraisal',
            populate: {
                path: 'objective_description.name'
            }
        })


    res.status(StatusCodes.OK).json({

        employee
    });
})

const appraisal = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {
        ratings,
        comments,
        rating_value,
        rating_rejected,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        rating_comments,
        value
    } = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId(objective_description_name)
                }
            }
        },
        {
            $set: {
                "appraisal.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
                "appraisal.objective_description.$[description].comments": comments,
                "appraisal.objective_description.$[description].rating_value": rating_value,
                "appraisal.objective_description.$[description].rating_comments": rating_comments,
                // "appraisal.appraiser_status": 'draft'
                "appraisal.objective_description.$[description].rating_rejected": rating_rejected,
            }
        },
        {

            arrayFilters: [
                {
                    'description._id': new mongoose.Types.ObjectId(objective_description)
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const uploadAttachmentsAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {
        ratings,
        rating_rejected,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        value
    } = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId(objective_description_name)
                }
            }
        },
        {
            $set: {
                "appraisal.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
            }
        },
        {

            arrayFilters: [
                {
                    'description._id': new mongoose.Types.ObjectId(objective_description)
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const reviewerRejection = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {
        ratings,
        rating_comments,
        rating_rejected,
        reason_for_rejection,
        rating_value,
        objective_description_name,
        objective_description,
        value,
        comments
    } = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "reviewer.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId(objective_description_name)
                }
            }
        },
        {
            $set: {
                "reviewer.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
                "reviewer.objective_description.$[description].rating_comments": rating_comments,
                "reviewer.objective_description.$[description].rating_value": rating_value,
                "reviewer.objective_description.$[description].rating_rejected": rating_rejected,
                "reviewer.objective_description.$[description].reason_for_rejection": reason_for_rejection,
                "reviewer.objective_description.$[description].comments": comments,

            }
        },
        {

            arrayFilters: [
                {
                    'description._id': new mongoose.Types.ObjectId(objective_description)
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const normalizerRejection = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {
        ratings,
        comments,
        rating_comments,
        rating_value,
        objective_description_name,
        objective_description,
        value
    } = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "normalizer.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId(objective_description_name)
                }
            }
        },
        {
            $set: {
                "normalizer.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
                "normalizer.objective_description.$[description].rating_comments": rating_comments,
                "normalizer.objective_description.$[description].rating_value": rating_value,
                "normalizer.objective_description.$[description].comments": comments,
                "normalizer.objective_description.$[description].rating_rejected": true,
            }
        },
        {

            arrayFilters: [
                {
                    'description._id': new mongoose.Types.ObjectId(objective_description)
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const employeeRejection = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {
        ratings,
        comments,
        rating_rejected,
        objective_description_name,
        objective_description,
    } = req.body

    console.log(ratings,
        comments,
        objective_description_name,
        objective_description, id)

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "employee.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId(objective_description_name)
                }
            }
        },
        {
            $set: {
                "employee.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
                "employee.objective_description.$[description].comments": comments,
                "employee.objective_description.$[description].rating_rejected": rating_rejected,

            }
        },
        {

            arrayFilters: [
                {
                    'description._id': new mongoose.Types.ObjectId(objective_description)
                },
            ]
        }
    )


    res.status(StatusCodes.OK).json({
        employee
    });
})


const appraisalStatusFilter = asyncHandler(async (req: Request, res: Response) => {

    const {status} = req.params

    const employee = await Employee.find({
            "appraisal.status": status
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


// const calculateRating = asyncHandler(async (req: Request, res: Response) => {
//
//     const {id} = req.params
//
//     const employee = await Employee.findOne({
//             "_id": new mongoose.Types.ObjectId(id),
//         }
//     ).populate({
//         path: 'appraisal',
//         populate: {
//             path: 'objective_description.ratings'
//         }
//     })
//
//     const {appraisal: {objective_group, objective_type, objective_description}} = employee;
//     const {ratings} = objective_description;
//
//     if(objective_description) {
//         console.log(objective_description.ratings)
//         console.log(objective_description, 'rating')
//
//     }
//
//     const total = objective_group.reduce((acc, curr) => {
//         return acc + curr.value
//     }, 0)
//
//     const average = total / objective_group.length
//
//     res.status(StatusCodes.OK).json({
//         objective_description
//     });
// })


const acceptNormalizer = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.body
    console.log(id, '`````````````````````````````````````````````````')
    const {reviewer: appraisal} = await Employee.findById(id);

    const employee = await Employee.updateMany({_id: {$in: id}},
        {
            $set: {
                "normalizer.objective_type": appraisal.objective_type,
                "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer.normalizer_rating": appraisal.reviewer_rating,
                "normalizer.training_recommendation": appraisal.training_recommendation,
                "normalizer.other_recommendation": appraisal.other_recommendation,
                "normalizer.area_of_improvement": appraisal.area_of_improvement,
                "normalizer.feedback_questions": appraisal.feedback_questions,
                "appraisal.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizerIsChecked": true,
                "normalizerIsDisabled": true,
                "normalizer.normalizer_acceptance": true,
                "normalizer.normalizer_status": 'accepted',
                "appraisal.normalizer_status": 'accepted',
                "appraisal.status":"normalized"


            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


// const acceptNormalizer = asyncHandler(async (req: Request, res: Response) => {
const acceptReviewer = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.body
    console.log(id, '`````````````````````````````````````````````````')

    const {appraisal} = await Employee.findById(id);

    const employee = await Employee.updateMany({_id: {$in: id}},
        {
            $set: {

                "reviewer.objective_group": appraisal.objective_group,
                "reviewer.objective_type": appraisal.objective_type,
                "reviewer.objective_description": appraisal.objective_description,
                "reviewer.reviewer_rating": appraisal.appraiser_rating,
                "reviewer.training_recommendation": appraisal.training_recommendation,
                "reviewer.other_recommendation": appraisal.other_recommendation,
                "reviewer.area_of_improvement": appraisal.area_of_improvement,
                "reviewer.feedback_questions": appraisal.feedback_questions,
                "reviewer.reviewer_acceptance": true,
                "reviewerIsChecked": true,
                "reviewerIsDisabled": true,
                "reviewer.reviewer_status": 'accepted',
                "normalizerIsDisabled": false,
                "normalizerIsChecked": false,
                "normalizer.normalizer_status": 'pending'
                // "reviewer.reviewer_rating": appraisal.appraiser_rating,
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const acceptAppraisalEmployee = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const employee = await Employee.updateMany({
            "_id": new mongoose.Types.ObjectId(id),
        },
        {
            $set: {
                "appraisal.status": "completed"
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const rejectedReviewerValues = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const {value} = req.body




    const employee = await Employee.updateMany({
            "_id": new mongoose.Types.ObjectId(id),
        },
        {
            $set: {
                "reviewer.reviewer_acceptance": false,
                // "reviewer.reviewer_rejected_value": value,
                "reviewer.reviewer_status": 'draft',
            }
        }
    )

    // if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true) {
    const {appraisal,reviewer} = await Employee.findById(id)
    // console.log(reviewer.rejection_count,'111111111111``````')

    // const employeeRating = await Employee.updateMany({_id: {$in: id}},
    //     {
    //         $set: {
    //
    //             // "reviewer.objective_group": appraisal.objective_group,
    //             // "reviewer.objective_type": appraisal.objective_type,
    //             "reviewer.objective_description": appraisal.objective_description,
    //             // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             // "reviewer.training_recommendation": appraisal.training_recommendation,
    //             // "reviewer.other_recommendation": appraisal.other_recommendation,
    //             // "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //             // "reviewer.feedback_questions": appraisal.feedback_questions,
    //             // "reviewer.reviewer_acceptance": true,
    //             // "reviewerIsChecked": true,
    //             // "reviewerIsDisabled": true,
    //             // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //         }
    //     }
    // )


    // console.log(employee, 'employee')
    // }

    console.log(reviewer,'```````````````````')
    if (reviewer.rejection_count === 0 ||  reviewer.rejection_count === undefined) {
        // if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const {appraisal} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    "reviewer.objective_description": appraisal.objective_description,
                    "reviewer.other_recommendation": appraisal.other_recommendation,
                    "reviewer.training_recommendation": appraisal.training_recommendation,
                    "reviewer.feedback_questions": appraisal.feedback_questions,
                    "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )

        res.status(StatusCodes.OK).json({
           message: "WOrks",
            stat:   reviewer
        });

    } else if (reviewer.rejection_count > 0) {

        res.status(StatusCodes.OK).json({
            message: "2nd rejection "
        });

    }


    // if (value.filter((i: any) => i.value === 'other_recommendation')[0].isChecked === false) {
    //     const {appraisal} = await Employee.findById(id)
    //
    //     const employee = await Employee.updateMany({_id: {$in: id}},
    //         {
    //             $set: {
    //
    //                 // "reviewer.objective_group": appraisal.objective_group,
    //                 // "reviewer.objective_type": appraisal.objective_type,
    //                 // "normalizer.objective_description": reviewer.objective_description,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //                 // "reviewer.training_recommendation": appraisal.training_recommendation,
    //                 "reviewer.other_recommendation": appraisal.other_recommendation,
    //                 // "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //                 // "reviewer.feedback_questions": appraisal.feedback_questions,
    //                 // "reviewer.reviewer_acceptance": true,
    //                 // "reviewerIsChecked": true,
    //                 // "reviewerIsDisabled": true,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             }
    //         }
    //     )
    //
    //
    //     console.log(employee, 'employee')
    // }
    // if (value.filter((i: any) => i.value === 'training_recommendation')[0].isChecked === false) {
    //     const {appraisal} = await Employee.findById(id)
    //
    //     const employee = await Employee.updateMany({_id: {$in: id}},
    //         {
    //             $set: {
    //
    //                 // "reviewer.objective_group": appraisal.objective_group,
    //                 // "reviewer.objective_type": appraisal.objective_type,
    //                 // "normalizer.objective_description": reviewer.objective_description,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //                 "reviewer.training_recommendation": appraisal.training_recommendation,
    //                 // "reviewer.other_recommendation": appraisal.other_recommendation,
    //                 // "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //                 // "reviewer.feedback_questions": appraisal.feedback_questions,
    //                 // "reviewer.reviewer_acceptance": true,
    //                 // "reviewerIsChecked": true,
    //                 // "reviewerIsDisabled": true,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             }
    //         }
    //     )
    //
    //
    //     console.log(employee, 'employee')
    // }
    //
    // if (value.filter((i: any) => i.value === 'Feedback_questionnaire')[0].isChecked === false) {
    //     const {appraisal} = await Employee.findById(id)
    //
    //     const employee = await Employee.updateMany({_id: {$in: id}},
    //         {
    //             $set: {
    //
    //                 // "reviewer.objective_group": appraisal.objective_group,
    //                 // "reviewer.objective_type": appraisal.objective_type,
    //                 // "normalizer.objective_description": reviewer.objective_description,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //                 // "reviewer.training_recommendation": appraisal.training_recommendation,
    //                 // "reviewer.other_recommendation": appraisal.other_recommendation,
    //                 // "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //                 "reviewer.feedback_questions": appraisal.feedback_questions,
    //                 // "reviewer.reviewer_acceptance": true,
    //                 // "reviewerIsChecked": true,
    //                 // "reviewerIsDisabled": true,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             }
    //         }
    //     )
    //
    //
    //     console.log(employee, 'employee')
    // }
    //
    // if (value.filter((i: any) => i.value === 'area_of_improvement')[0].isChecked === false) {
    //     const {appraisal} = await Employee.findById(id)
    //
    //     const employee = await Employee.updateMany({_id: {$in: id}},
    //         {
    //             $set: {
    //
    //                 // "reviewer.objective_group": appraisal.objective_group,
    //                 // "reviewer.objective_type": appraisal.objective_type,
    //                 // "normalizer.objective_description": reviewer.objective_description,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //                 // "reviewer.training_recommendation": appraisal.training_recommendation,
    //                 // "reviewer.other_recommendation": appraisal.other_recommendation,
    //                 "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //                 // "normalizer.feedback_questions": reviewer.feedback_questions,
    //                 // "reviewer.reviewer_acceptance": true,
    //                 // "reviewerIsChecked": true,
    //                 // "reviewerIsDisabled": true,
    //                 // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             }
    //         }
    //     )
    //
    //
    //     console.log(employee, 'employee')
    // }


    // res.status(StatusCodes.OK).json({
    //     employee
    // });
})


const acceptReviewerRejectedAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const findEmpoloyee = await Employee.findById(id)

    const value = findEmpoloyee.reviewer.reviewer_rejected_value

    const employee = await Employee.updateMany({
            "_id": new mongoose.Types.ObjectId(id),
        },
        {
            $set: {
                "appraisal.appraisal_acceptance": true,
                "reviewer.reviewer_status": 'appraiser-accepted',
                // "normalizer.normalizer_rejected_value": value,
                // "normalizer.normalizer_status": 'draft',
                // "normalizer.normalizer_acceptance": false,
                // "reviewerIsDisabled": true,
                "reviewerIsDisabled": false,
                "reviewerIsChecked": false,
            }
        }
    )


    if (findEmpoloyee.reviewer.reviewer_rejected_value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    "appraisal.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        // console.log(employee, 'employee')
    }
    console.log(findEmpoloyee.reviewer.reviewer_rejected_value.filter((i: any) => i.value === 'area_of_improvement'), '```````````````````````')
    console.log(findEmpoloyee.reviewer.reviewer_rejected_value, '```````````````````````')


    res.status(StatusCodes.OK).json({
        // @ts-ignore
        res: value
    });

})


const acceptNormalizerRejectedAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const findEmpoloyee = await Employee.findById(id)

    const value = findEmpoloyee.normalizer.normalizer_rejected_value

    const employee = await Employee.updateMany({
            "_id": new mongoose.Types.ObjectId(id),
        },
        {
            $set: {
                "appraisal.appraisal_acceptance": false,
                // "normalizer.normalizer_rejected_value": value,
                // "normalizer.normalizer_status": 'draft',
                // "normalizer.normalizer_acceptance": false,
                "appraisal.appraiser_status": "accepted",
                "reviewerIsDisabled": false,
                "reviewerIsChecked": false,
                "reviewer.reviewer_status": 'pending'
            }
        }
    )


    if (findEmpoloyee.normalizer.normalizer_rejected_value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const {normalizer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    "appraisal.objective_description": normalizer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        // console.log(employee, 'employee')
    }


    res.status(StatusCodes.OK).json({
        // @ts-ignore
        res: value
    });

})

const rejectedNormalizerValues = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const {value} = req.body

    const employee = await Employee.updateMany({
            "_id": new mongoose.Types.ObjectId(id),
        },
        {
            $set: {
                "normalizer.normalizer_rejected_value": value,
                "normalizer.normalizer_status": 'draft',
                "normalizer.normalizer_acceptance": false,
                // "reviewerIsDisabled": true,
            }
        }
    )

    if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    "normalizer.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        console.log(employee, 'employee')
    }


    if (value.filter((i: any) => i.value === 'other_recommendation')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "normalizer.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    "normalizer.other_recommendation": reviewer.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        console.log(employee, 'employee')
    }
    if (value.filter((i: any) => i.value === 'training_recommendation')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "normalizer.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    "normalizer.training_recommendation": reviewer.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    // "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        console.log(employee, 'employee')
    }

    if (value.filter((i: any) => i.value === 'Feedback_questionnaire')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "normalizer.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    // "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    "normalizer.feedback_questions": reviewer.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )
        console.log(employee, 'employee')
    }

    if (value.filter((i: any) => i.value === 'area_of_improvement')[0].isChecked === false) {
        const {reviewer} = await Employee.findById(id)

        const employee = await Employee.updateMany({_id: {$in: id}},
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "normalizer.objective_description": reviewer.objective_description,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.training_recommendation": appraisal.training_recommendation,
                    // "reviewer.other_recommendation": appraisal.other_recommendation,
                    "normalizer.area_of_improvement": reviewer.area_of_improvement,
                    // "normalizer.feedback_questions": reviewer.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    // "reviewerIsChecked": true,
                    // "reviewerIsDisabled": true,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                }
            }
        )


        console.log(employee, 'employee')
    }


    res.status(StatusCodes.OK).json({
        employee
    });
})


const startProbationAppraisal = asyncHandler(async (req: Request, res: Response) => {


})

const appraisalStatusAppraiser = asyncHandler(async (req: Request, res: Response) => {
    const {status} = req.params
    console.log(status)
    const employee = await Employee.find({"appraisal.appraiser_status": status})

    res.status(StatusCodes.OK).json({
        employee
    });
})

const appraisalStatusReviewer = asyncHandler(async (req: Request, res: Response) => {
    const {status} = req.params
    console.log(status)
    const employee = await Employee.find({"reviewer.reviewer_status": status})

    res.status(StatusCodes.OK).json({
        employee
    });
})

const appraisalStatusNormalizer = asyncHandler(async (req: Request, res: Response) => {
    const {status} = req.params
    console.log(status)
    const employee = await Employee.find({"normalizer.normalizer_status": status})

    res.status(StatusCodes.OK).json({
        employee
    });
})

const filterByRatings = asyncHandler(async (req: Request, res: Response) => {
    const {gt, lt} = req.params

    const employee = await Employee.find({"appraisal.appraiser_rating": {$gt: gt, $lt: lt}})

    res.status(StatusCodes.OK).json({
        employee
    });
})

const filterByPotential = asyncHandler(async (req: Request, res: Response) => {
    const {potential} = req.params

    const employee = await Employee.find({"appraisal.potential": {potential}})

    res.status(StatusCodes.OK).json({
        employee
    });
})


const testFilter = asyncHandler(async (req: Request, res: Response) => {
    // const {potential} = req.params
    console.log(req)

    // const employee = await Employee.find({"appraisal.potential": {potential} })
//@ts-ignore
    res.status(200).json(res.advancedResults);
})

const employeeRejectionSave = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const {comments} = req.body

    console.log('```````````` running ',id,comments)

    // const  id = "62ac2037c1c19127416aaff1"

    const emp = await Employee.findById(id)


    const agreeValue = emp.employee.employee_agree

    if (agreeValue === true) {

        const employee = await Employee.updateMany({_id: {$in: id}}, {
            $set: {
                "employee.comments": comments,
                "appraisal.appraiser_status": 'employee-rejected',
                "appraisal.status":"rejected",
            }
        })

    } else if (agreeValue === false) {
        const employee = await Employee.updateMany({_id: {$in: id}}, {
            $set: {
                "employee.comments": comments,
                "normalizerIsChecked": false,
                "normalizerIsDisabled": false,
                "normalizer.normalizer_status": 'employee-rejected',
                "appraisal.status":"rejected",
            }
        })
    }
    res.status(StatusCodes.OK).json({"message": agreeValue});
})

const normalizerRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params

    const {empoloyee, normalizer} = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "normalizer.normalizer_status": 'normalizer-rejected',
            "employee.objective_description": normalizer.objective_description,
            "appraisal.status": 'completed'

        }
    })

    res.status(StatusCodes.OK).json({"message": updatedEmployee});

})

const normalizerAcceptsEmployee = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params

    const {employee, normalizer} = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "normalizer.normalizer_status": 'normalizer-accepted',
            "normalizer.objective_description": employee.objective_description,
            "appraisal.status": 'completed'

        }
    })

    res.status(StatusCodes.OK).json({"message": updatedEmployee});

})

const appraiserAcceptsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {employee, normalizer, appraisal} = await Employee.findById(id)

    if (employee.employee_rating - normalizer.normalizer_rating <= 0.5) {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            $set: {
                "appraisal.appraiser_status": 'appraiser-accepted-1',
                "appraisal.status": 'completed',
                "normalizer.normalizer_rating": appraisal.appraiser_rating,
                // "normalizer.normalizer_status": 'completed',
                "normalizer.objective_description": appraisal.objective_description,

            }
        })
        console.log('comppp')
        res.status(StatusCodes.OK).json({"message": updatedEmployee});
    }

    if (employee.employee_rating - normalizer.normalizer_rating >= 0.5) {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            $set: {
                "appraisal.appraiser_status": 'appraiser-accepted-employee',
                "appraisal.appraiser_rating": employee.employee_rating,
                "appraisal.objective_description": employee.objective_description,
                "appraisal.status": 'in-progress',
                "normalizerIsChecked": false,
                "normalizerIsDisabled": false,
            }
        })

        console.log('2nd case')

    }

    res.status(StatusCodes.OK).json({"message": "success"})

})


const appraiserRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {employee, normalizer} = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.appraiser_status": 'appraiser-rejected-employee',
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})

const normalizerSubmitEmployeeRejection = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {employee, normalizer} = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.status": 'completed',
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "employee.objective_description": normalizer.objective_description,
            "employee.employee_rating": normalizer.normalizer_rating,
            "normalizer.normalizer_status":"re-normalized"
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})

const attachmentsAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {attachments} = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "appraisal.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})


const attachmentsReviewer = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {attachments} = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "reviewer.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})


const attachmentsNormalizer = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {attachments} = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "normalizer.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})

const attachmentsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {attachments} = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "employee.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({"message": updatedEmployee});
})


const  calculateRatings = asyncHandler(async (req: Request, res: Response) => {


    const findObjectiveType =  async (id: string) => {
        const  objective_type = await ObjectiveType.findById("62b4458f0e7b97416df32950")
        return  objective_type
    }


    console.log(findObjectiveType("62b4458f0e7b97416df32950"),'`````````````````````````````')
    const objective_description = req.body.objective_description

    const employee_rating = objective_description.map((j:any) => {


    })

    // const {id} = req.params
    //
    // const {attachments} = req.body
    // console.log(attachments)
    //
    // const updatedEmployee = await Employee.findByIdAndUpdate(id, {
    //     $push: {
    //         "appraisal.attachments": attachments,
    //     }
    // })

    const data = req.body

    res.status(StatusCodes.OK).json({"message": findObjectiveType("62b4458f0e7b97416df32950")});
    // res.status(StatusCodes.OK).json({"message": "fgfgf"});
})


const filterEmployeeByManagerCode = asyncHandler(async (req: Request, res: Response) => {
    const {code} = req.params

    const toSte = code.toString()

    console.log(typeof  toSte)

    const data = await Employee.find({manager_code: `"${code}"`})


    res.status(StatusCodes.OK).json(data);


})



const statusBasedCount = asyncHandler(async (req: Request, res: Response) => {

    const {manager_code} = req.body
    console.log(manager_code, '````````````````')

    const filter = {manager_code:  `${manager_code}`}

    const resp = await Employee.aggregate([
        {$match: filter},
        // {$group: {
        //         "appraisal.status": "not-started",
        //         // count: ""
        //
        //     }}
    ])
    res.status(StatusCodes.OK).json(resp);


})





export {
    createEmployee,
    getAllEmployees,
    addTemplateToEmployee,
    addRating,
    appraisal,
    getEmployeeById,
    appraisalStatusFilter,
    updateEmployee,
    acceptReviewer,
    acceptNormalizer,
    acceptAppraisalEmployee,
    rejectedNormalizerValues,
    rejectedReviewerValues,
    reviewerRejection,
    normalizerRejection,
    acceptReviewerRejectedAppraiser,
    acceptNormalizerRejectedAppraiser,
    appraisalStatusAppraiser,
    appraisalStatusReviewer,
    appraisalStatusNormalizer,
    filterByPotential,
    filterByRatings,
    testFilter,
    employeeRejection,
    normalizerAcceptsEmployee,
    normalizerRejectsEmployee,
    employeeRejectionSave,
    employeeUpdateMany,
    appraiserAcceptsEmployee,
    appraiserRejectsEmployee,
    normalizerSubmitEmployeeRejection,
    attachmentsAppraiser,
    calculateRatings,
    attachmentsReviewer,
    attachmentsNormalizer,
    attachmentsEmployee,
    filterEmployeeByManagerCode,
    employeeAppraisalClose,
    statusBasedCount
}