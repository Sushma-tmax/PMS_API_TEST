import { Employee, ObjectiveType } from "../../models";
import asyncHandler from "../../middleware/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Template from "../../models/Template";
import mongoose from "mongoose";
import { getBlobUrlAsync, getImage } from "../azureImageStorage";
import AppraisalCalender from "../../models/AppraisalCalender";
import _ from "lodash";
import template from "../../models/Template";
import PreviousAppraisal from "../../models/PreviousAppraisal";
import NineBox from "../../models/NineBox";
import PerformanceDefinition from "../../models/PerformanceDefinition";


const getRatingsfromObjectiveDescription = (data: any) => {
    return data?.map((k: any) => {
        return {
            // ratings: k.ratings,
            rating_rejected: false,
            rating_resubmitted: false,
            rating_accepted: false,
            // rating_comments: "",
            comments: k.comments,
            rejection_reason: "",
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

const getRatingsfromObjectiveDescriptionForAccept = (data: any) => {
    return data?.map((k: any) => {
        return {
            // ratings: k.ratings,
            rating_rejected: false,
            // rating_resubmitted: false,
            rating_accepted: true,
            // rating_comments: "",
            comments: k.comments,
            rejection_reason: "",
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


const getRatingRejectedfromObjectiveDescription = (data: any) => {
    return data?.map((k: any) => {
        return {
            rating_rejected: false,
        }
    })
}


const employeeUpdateMany = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body

    // console.log(id, '`````````````````````````````````````````````````')
    const data = await Employee.find({ position_long_description: "Draftsman - SO" }).select('appraisal.status, manager_code,position_long_description')

    // const employee = await Employee.updateMany({ manager_code: "918"}, {
    //     $set: {
    //         // "employee": [],
    //         // "appraisal_template": [],
    //         // "appraisal.attachments": [],
    //         // "reviewer": [],
    //         // "normalizer": [],
    //         // "attachments": [],
    //         // reviewerIsChecked: false,
    //         //             reviewerIsDisabled: true,
    //         //             normalizerIsChecked: false,
    //         //              normalizerIsDisabled: true,
    //         //              appraiserIsDisabled: true,
    //         //            appraiserIsChecked: false,
    //         // calendar: ''
    //         appraiser_code: "918",
    //         appraiser_name: "Cristiana Colesnicenco",
    //         reviewer_code: "1654",
    //         reviewer_name: "Shirlie Lozano Santiago"
    //     }
    //
    // })

    res.status(StatusCodes.OK).json({
        "message": data,
        count: data.length

        // data: data.map((j:any) => j._id)
    });
})


const employeeAppraisalClose = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    // console.log(id, '`````````````````````````````````````````````````')
    // const {reviewer: appraisal} = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } }, {
        $set: {
            reviewerIsChecked: false,
            reviewerIsDisabled: true,
            normalizerIsChecked: false,
            normalizerIsDisabled: true,
            appraiserIsDisabled: true,
            appraiserIsChecked: false,
            employee: {},
            appraisal_template: {},
            appraisal: {},
            reviewer: {},
            normalizer: {},
            // "appraisal.status": "not-started"
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

const getAllPAEmployees = asyncHandler(async (req: Request, res: Response) => {

    const { status } = req.params

    let employees: any


    if (status === 'all') {
        employees = await Employee.find()
    } else {
        employees = await Employee.find({ "calendar": status })
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
            })
            .populate({
                path: 'appraisal',
                populate: {
                    path: 'objective_description.name'
                }
            })
            .populate({
                path: 'appraisal.objective_description',
                populate: {
                    path: 'objective_description.ratings'
                }
            })
            .populate({
                path: 'appraisal',
                populate: {
                    path: 'other_recommendation.name'
                }
            })
            .populate({
                path: 'appraisal',
                populate: {
                    path: 'training_recommendation.name'
                }
            })
            .populate('appraisal.performance_goal.goal_category')
            .populate('employee.performance_goal.goal_category')
            .populate({
                path: 'appraisal',
                populate: {
                    path: 'feedback_questions.name'
                }
            })
            .populate('appraisal.other_recommendation')
            .populate('appraisal.training_recommendation')
            .populate({
                path: 'appraisal_template',
                populate: {
                    path: 'objective_description.name'
                }
            })
            .select('-appraisal_previous_submission -employee_previous_submission -normalizer_previous_submission -reviewer_previous_submission -appraisal_previous_rating ')

    }
    // employees.populate('calendar')
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
    //         })
    // .populate({
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
const getPAcalendarEmployeeEmails = asyncHandler(async (req: Request, res: Response) => {
    const { calendarId } = req.params
    let employees: any
    employees = await Employee.find({ "employee_upload_flag": true }).select('email isLeavers')
    res.status(StatusCodes.OK).json({
        success: true,
        data: employees,
    });
})
const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

    const { status } = req.params

    let employees: any


    if (status === 'all') {
    //    find and sort employee code in ascending order
        employees = (await Employee.find()).sort((a, b) => parseInt(a.employee_code) - parseInt(b.employee_code));

    } else {
         //    find and sort employee code in ascending order
        employees = (await Employee.find({ "appraisal.status": status })).sort((a, b) => parseInt(a.employee_code) - parseInt(b.employee_code));
       
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

const getEmployeeByEmail = asyncHandler(async (req: Request, res: Response) => {
    let emailId = req.params.id
    //const employee = await Employee.find({ email: emailId });
    const employee = await Employee.find({ email: { $regex: new RegExp(emailId, 'i') } });
    /***********retrive employee image based on case-sensitive*****************/
    let imageURL: any = ""
    //@ts-ignore
    imageURL = await getBlobUrlAsync(`${employee.employee_code}.jpg`)
    //@ts-ignore   
    employee?.profile_image_url = imageURL
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


const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {

    //@ts-ignore
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
        })
        .populate('appraisal.other_recommendation.name')
        .populate('appraisal.training_recommendation.name')
        .populate('employee.training_recommendation.name')
        .populate('appraisal.performance_goal.goal_category')
        .populate('employee.performance_goal.goal_category')
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
        .populate('appraisal_previous_submission')
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
        .populate({
            path: 'current_rating',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'current_rating',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'current_rating',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'current_rating',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })
        .populate({
            path: 'current_previous_submission',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'current_previous_submission',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'current_previous_submission',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'current_previous_submission',
            populate: {
                path: 'objective_type.name',
                mode: 'ObjectiveGroup'
            }
        })

    const fun = (test: any) => {
        return "www.google.com" + test

    }

    // @ts-ignore
    employee?.appraisal?.attachments = employee.appraisal.attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            // url: j.url,
            // name: j.name,
            objective_description: j.objective_description,
        }
    })

    // @ts-ignore
    employee?.appraisal?.rejection_attachments = employee.appraisal.rejection_attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            // url: j.url,
            // name: j.name,
            objective_description: j.objective_description,
        }
    })

    // @ts-ignore
    employee?.reviewer?.attachments = employee.reviewer.attachments.map((j: any) => {
        console.log('removeReviewerAttachments2')
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
        return {

            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })

    //@ts-ignore
    employee?.normalizer?.meetingNotesAttachments = employee.normalizer.meetingNotesAttachments.map((j: any) => {
        return {

            url: getImage(j.url),
            name: j.url

        }
    })
    // @ts-ignore
    employee?.employee?.attachments = employee.employee.attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })
    /***********retrive employee image based on case-sensitive*****************/
    let imageURL: any = ""
    imageURL = await getBlobUrlAsync(`${employee.employee_code}.jpg`)
    //@ts-ignore   
    employee?.profile_image_url = imageURL


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
        imageURL
        // att
    });
})


const getEmployeeByIdForViewPA = asyncHandler(async (req: Request, res: Response) => {
    //@ts-ignore
    const employee = await Employee.findById(req.params.id)
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_group.name',
            }
        })
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
        })
        .populate('appraisal.other_recommendation.name')
        .populate('appraisal.training_recommendation.name')
        .populate('employee_previous_submission.training_recommendation.name')
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
        .populate('appraisal_previous_submission.feedback_questions.name')
        .populate('appraisal_previous_submission.training_recommendation.name')
        .populate('appraisal_previous_submission.other_recommendation.name')
        .populate('appraisal_previous_submission.performance_goal.goal_category')
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
        .populate({
            path: 'appraisal_previous_submission',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'appraisal_previous_submission',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'appraisal_previous_submission',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'reviewer_previous_submission',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'reviewer_previous_submission',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'reviewer_previous_submission',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'normalizer_previous_submission',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'normalizer_previous_submission',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'normalizer_previous_submission',
            populate: {
                path: 'objective_description.ratings'
            }
        })
        .populate({
            path: 'employee_previous_submission',
            populate: {
                path: 'objective_group.name',
            }
        })
        .populate({
            path: 'employee_previous_submission',
            populate: {
                path: 'objective_description.name'
            }
        })
        .populate({
            path: 'employee_previous_submission',
            populate: {
                path: 'objective_description.ratings'
            }
        }).populate('employee_previous_submission.performance_goal.goal_category')



    const fun = (test: any) => {
        return "www.google.com" + test

    }

    // @ts-ignore
    employee?.appraisal?.attachments = employee.appraisal.attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            // url: j.url,
            // name: j.name,
            objective_description: j.objective_description,
        }
    })

    // @ts-ignore
    employee?.appraisal?.rejection_attachments = employee.appraisal.rejection_attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            // url: j.url,
            // name: j.name,
            objective_description: j.objective_description,
        }
    })

    // @ts-ignore
    employee?.reviewer?.attachments = employee.reviewer.attachments.map((j: any) => {
        console.log('removeReviewerAttachments2')
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
        return {

            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })

    //@ts-ignore
    employee?.normalizer?.meetingNotesAttachments = employee.normalizer.meetingNotesAttachments.map((j: any) => {
        return {

            url: getImage(j.url),
            name: j.url

        }
    })
    // @ts-ignore
    employee?.employee?.attachments = employee.employee.attachments.map((j: any) => {

        return {
            // attachments: j.name,
            // //@ts-ignore
            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
        }
    })
    /***********retrive employee image based on case-sensitive*****************/
    let imageURL: any = ""
    imageURL = await getBlobUrlAsync(`${employee.employee_code}.jpg`)
    //@ts-ignore   
    //employee?.profile_image_url = getImage(`${employee.employee_code}.jpg`)
    employee?.profile_image_url = imageURL

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

    const { id } = req.params;


    // const {weightage} = template;
    //
    const employee = await Employee.findOne(
        {
            "_id": new mongoose.Types.ObjectId(id),
        }
    )

    const { appraisal_template: { objective_group, objective_type, objective_description } } = employee;
    const { appraisal: { objective_description: appraisal_objective_description } } = employee;

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

    const { id, rating } = req.body
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

    const { id } = req.params

    const {
        ratings,
        comments,
        rejection_reason,
        rating_value,
        rating_rejected,
        rating_accepted,
        reviewer_objective_description,
        action_performed,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        rating_comments,
        value,
        remarks,
        rating_resubmitted,
        employee_objective_description,
        pa_status,
        appraiser_status,
        current_objective_description,
        potential
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
                "appraisal.objective_description.$[description].rejection_reason": rejection_reason,
                "appraisal.objective_description.$[description].rating_value": rating_value,
                "appraisal.objective_description.$[description].rating_comments": rating_comments,
                "appraisal.objective_description.$[description].rating_rejected": rating_rejected,
                "appraisal.objective_description.$[description].action_performed": action_performed,
                "appraisal.objective_description.$[description].rating_resubmitted": rating_resubmitted,
                "appraisal.objective_description.$[description].rating_accepted": rating_accepted,
                "appraisal.objective_description.$[description].remarks": remarks,
                "reviewer.objective_description": reviewer_objective_description,
                "employee.objective_description": employee_objective_description,
                "appraisal.appraiser_status": appraiser_status,
                "appraisal.pa_status": pa_status,
                "current_rating.objective_description": current_objective_description,
                "appraisal.potential": potential

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

    const { id } = req.params

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

    const { id } = req.params

    const {
        ratings,
        rating_comments,
        rating_rejected,
        rejection_reason,
        action_performed,
        reason_for_rejection,
        rating_value,
        objective_description_name,
        objective_description,
        value,
        comments,
        appraiser_objective_description,
        reviewerOverallFeedComments,
        current_objective_description,
        reviewer_status,
        pa_status
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
                "reviewer.objective_description.$[description].rejection_reason": rejection_reason,
                "reviewer.objective_description.$[description].rating_value": rating_value,
                "reviewer.objective_description.$[description].rating_rejected": rating_rejected,
                "reviewer.objective_description.$[description].action_performed": action_performed,
                "reviewer.objective_description.$[description].reason_for_rejection": reason_for_rejection,
                "reviewer.objective_description.$[description].comments": comments,
                "appraisal.objective_description": appraiser_objective_description,
                "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
                "current_rating.objective_description": current_objective_description,
                "reviewer.reviewer_status": reviewer_status,
                "appraisal.pa_status": pa_status,
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

    const { id } = req.params

    const {
        ratings,
        comments,


        rating_comments,
        rejection_reason,
        rating_value,
        rating_rejected,
        action_performed,
        reason_for_rejection,
        objective_description_name,
        objective_description,
        rating_resubmitted,
        value,
        pa_status,
        normalizer_status,
        current_objective_description
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
                "normalizer.objective_description.$[description].reason_for_rejection": reason_for_rejection,
                "normalizer.objective_description.$[description].rejection_reason": rejection_reason,
                "normalizer.objective_description.$[description].rating_value": rating_value,
                "normalizer.objective_description.$[description].comments": comments,
                // "normalizer.objective_description.$[description].rating_rejected": true,
                "normalizer.objective_description.$[description].rating_rejected": rating_rejected,
                "normalizer.objective_description.$[description].rating_resubmitted": rating_resubmitted,
                "normalizer.objective_description.$[description].action_performed": action_performed,
                "appraisal.pa_status": pa_status,
                "normalizer.normalizer_status": normalizer_status,
                "current_rating.objective_description": current_objective_description

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

    const { id } = req.params

    const {
        ratings,
        comments,
        rejection_reason,
        rating_rejected,
        action_performed,
        objective_description_name,
        objective_description,
        appraiser_objective_description,
        pa_status,
        employee_status,
        current_objective_description

    } = req.body

    console.log(ratings,
        comments,
        rejection_reason,
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
                "employee.objective_description.$[description].rejection_reason": rejection_reason,
                "employee.objective_description.$[description].rating_rejected": rating_rejected,
                "employee.objective_description.$[description].action_performed": action_performed,
                "appraisal.objective_description": appraiser_objective_description,
                "appraisal.pa_status": pa_status,
                "employee.employee_status": employee_status,
                "current_rating.objective_description": current_objective_description,


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

    const { status } = req.params

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
    const { id, current_overallRating, reviewerObjectiveDescription, normalized_Date, current_previous_submission, previous_overall_rating, appraisal_previous_rating, normalized_overallRating, normalizer_comments } = req.body
    console.log(id, '`````````````````````````````````````````````````')
    const { reviewer: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "employee.employee_status": "pending",
                "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer.objective_type": appraisal.objective_type,
                "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "appraisal_previous_submission.objective_description": appraisal.objective_description,
                "normalizer_previous_submission.normalizer_rating": appraisal.reviewer_rating,
                "normalizer.normalizer_rating": current_overallRating,
                "normalizer.normalized_overallRating": normalized_overallRating,
                "appraisal.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizerIsChecked": true,
                "normalizerIsDisabled": true,
                "normalizer.normalizer_acceptance": true,
                "normalizer.normalizer_rejected": false,
                "normalizer.normalizer_status": 'accepted',
                "appraisal.normalizer_status": 'accepted',
                "appraisal.status": "normalized",
                "appraisal.pa_status": "Pending with Employee",
                "appraisal.pa_rating": current_overallRating,
                "appraisal_previous_rating.objective_description": appraisal_previous_rating,
                "reviewer.objective_description": reviewerObjectiveDescription,
                "reviewer.rejection_count": 0,
                "normalizer.normalized_Date": normalized_Date,
                "current_previous_submission.objective_description": current_previous_submission,
                "current_previous_submission.overall_rating": previous_overall_rating,
                "normalizer.normalizer_PA_rejected": false,
                /** making normalizer rejection reason empty if normalizer accepted PA */
                "normalizer.normalizer_overall_feedback": "",
                "normalizer_previous_submission.normalizer_overall_feedback": "",
                "normalizer.reason_for_rejection": normalizer_comments,
                "normalizer_previous_submission.reason_for_rejection": normalizer_comments,
                // "employee":{},
                // "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})



const acceptNormalizerGradeException = asyncHandler(async (req: Request, res: Response) => {
    const { id, talentCategory, current_overallRating, normalizer_comments } = req.body
    console.log(id, '`````````````````````````````````````````````````')
    const { reviewer: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "normalizer.objective_type": appraisal.objective_type,
                "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer_previous_submission.normalizer_rating": appraisal.reviewer_rating,
                "normalizer.normalizer_rating": current_overallRating,
                "employee.employee_rating": current_overallRating,
                "appraisal.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizerIsChecked": true,
                "normalizerIsDisabled": true,
                "normalizer.normalizer_acceptance": true,
                "normalizer.normalizer_status": 'normalizer-accepted',
                "appraisal.status": "completed",
                "appraisal.pa_status": "Completed",
                "appraisal_previous_submission.pa_status": "Completed",
                "appraisal.pa_rating": current_overallRating,
                "talent_category": talentCategory,
                "normalizer.normalizer_PA_rejected": false,
                "normalizer.reason_for_rejection": normalizer_comments,
                "normalizer_previous_submission.reason_for_rejection": normalizer_comments,
                "normalizer.normalizer_overall_feedback": "",
                "normalizer_previous_submission.normalizer_overall_feedback": "",
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const acceptNormalizerGradeExceptionBulk = asyncHandler(async (req: Request, res: Response) => {
    const { id, potential, current_overallRating } = req.body

    console.log(potential, current_overallRating, 'potentialcheckkkk')

    if (potential == "false") {
        res.status(StatusCodes.OK).json({
            data: ""
        });
    }

    const performance = await PerformanceDefinition.findOne({
        "from": { $lte: current_overallRating },
        "to": { $gte: current_overallRating }
    })

    const nineBoxValue = await NineBox.findOne({
        "box_9_definitions.performance_level": performance.category,
        "box_9_definitions.potential_level": potential,
    })
    let boxdefinitions: any[] = nineBoxValue?.box_9_definitions
    let definitionValue = boxdefinitions?.find(item => {
        console.log(item, 'itemssss')
        return ((item?.performance_level == performance?.category) && (item?.potential_level == potential))
    })

    const { reviewer: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "normalizer.objective_type": appraisal.objective_type,
                "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer_previous_submission.normalizer_rating": appraisal.reviewer_rating,
                "normalizer.normalizer_rating": current_overallRating,
                "normalizer.training_recommendation": appraisal.training_recommendation,
                "normalizer.other_recommendation": appraisal.other_recommendation,
                "normalizer.area_of_improvement": appraisal.area_of_improvement,
                "normalizer.feedback_questions": appraisal.feedback_questions,
                "appraisal.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizerIsChecked": true,
                "normalizerIsDisabled": true,
                "normalizer.normalizer_acceptance": true,
                "normalizer.normalizer_status": 'normalizer-accepted',
                "appraisal.status": "completed",
                "appraisal.pa_status": "Completed",
                "appraisal.pa_rating": current_overallRating,
                "talent_category": definitionValue?.title,
                "employee.employee_rating": current_overallRating,
                "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer.normalizer_PA_rejected": false,
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee, performance, nineBoxValue
    });
})


// const acceptNormalizer = asyncHandler(async (req: Request, res: Response) => {
const acceptReviewer = asyncHandler(async (req: Request, res: Response) => {
    const { id, appraisal_objective_description, current_overallRating, current_previous_submission } = req.body
    console.log(id, '`````````````````````````````````````````````````')

    const { appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "appraisal.pa_status": "Pending with HR Normalizer",
                "appraisal.pa_rating": current_overallRating,
                "appraisal.show_reviewer": false,
                "reviewer.objective_group": appraisal.objective_group,
                "reviewer.objective_type": appraisal.objective_type,
                "reviewer.objective_description": getRatingsfromObjectiveDescriptionForAccept(appraisal.objective_description),
                "appraisal.appraiser_rejected": false,
                "appraisal.objective_description": appraisal_objective_description,
                "appraisal_previous_submission.objective_description": appraisal_objective_description,
                "appraisal_previous_submission.pa_status": "Pending with HR Normalizer",
                // "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "reviewer_previous_submission.objective_description": getRatingsfromObjectiveDescriptionForAccept(appraisal.objective_description),
                "reviewer_previous_submission.reviewer_rating": appraisal.appraiser_rating,
                // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                "reviewer.reviewer_rating": current_overallRating,
                "reviewer.reviewer_overall_feedback": "",
                "reviewer_previous_submission.reviewer_overall_feedback": "",
                "reviewer.reviewer_acceptance": true,
                "reviewerIsChecked": true,
                "reviewerIsDisabled": true,
                "reviewer.reviewer_status": 'accepted',
                "normalizerIsDisabled": false,
                "normalizerIsChecked": false,
                "normalizer.normalizer_status": 'pending',
                "current_previous_submission.objective_description": current_previous_submission,
                "reviewer.reviewer_PA_rejected": false,
                "appraisal.appraiser_PA_rejected": false,
                // "normalizer.normalizer_rating" : current_overallRating,
                // "reviewer.reviewer_rating": appraisal.appraiser_rating,
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})




// reviewer accepts appraiser after employee rejection
const acceptReviewerEmployeeRejection = asyncHandler(async (req: Request, res: Response) => {
    const { id, current_overallRating, talentCategory, current_previous_submission, appraisal_previous_submission, appraisal_objective_description, reviewer_comments, reviewer_comments_draft } = req.body
    console.log(id, '`````````````````````````````````````````````````')
    const { appraisal, reviewer, normalizer } = await Employee.findById(id);
    // const employee = await Employee.updateMany({ _id: { $in: id } },
    //     {
    //         $set: {
    //             "appraisal.pa_status": "Pending with HR Normalizer",
    //             "appraisal.pa_rating": appraisal.appraiser_rating,
    //             "appraisal.show_reviewer": false,
    //             "reviewer.objective_group": appraisal.objective_group,
    //             "appraisal.appraiser_rejected": false,
    //             "reviewer.objective_type": appraisal.objective_type,
    //             "reviewer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
    //             "normalizer.objective_description": getRatingsfromObjectiveDescription(reviewer.objective_description),
    //             "reviewer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
    //             "reviewer_previous_submission.reviewer_rating": appraisal.appraiser_rating,
    //             "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //             "reviewer.training_recommendation": appraisal.training_recommendation,
    //             "reviewer.other_recommendation": appraisal.other_recommendation,
    //             "reviewer.area_of_improvement": appraisal.area_of_improvement,
    //             "reviewer.feedback_questions": appraisal.feedback_questions,
    //             "reviewer.reviewer_overall_feedback" : "",
    //             "reviewer.reviewer_acceptance": true,
    //             "reviewerIsChecked": true,
    //             "reviewerIsDisabled": true,
    //             "reviewer.reviewer_status": 'accepted',
    //             "normalizerIsDisabled": false,
    //             "normalizerIsChecked": false,
    //             "normalizer.normalizer_status": 'pending',
    //             "normalizer.normalizer_rating": appraisal.appraiser_rating,
    //             // "reviewer.reviewer_rating": appraisal.appraiser_rating,
    //         }
    //     }
    // )
    // res.status(StatusCodes.OK).json({
    //     employee
    // });

    if (Math.abs(current_overallRating - normalizer.normalized_overallRating) <= 0.3) {
        const employee = await Employee.updateMany({ _id: { $in: id } },
            {
                $set: {
                    "appraisal.pa_status": "Completed",
                    "appraisal.status": "completed",
                    "appraisal.show_reviewer": false,
                    "appraisal.pa_rating": current_overallRating,
                    "appraisal_previous_submission.objective_description": appraisal_previous_submission,
                    "appraisal_previous_submission.pa_status": "Completed",
                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "reviewer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                    "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                    "reviewer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                    // "reviewer_previous_submission.reviewer_rating": appraisal.appraiser_rating,
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    "reviewer.reviewer_rating": current_overallRating,
                    "normalizer.normalizer_rating": current_overallRating,
                    "reviewer.training_recommendation": appraisal.training_recommendation,
                    "reviewer.other_recommendation": appraisal.other_recommendation,
                    "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    "reviewer.feedback_questions": appraisal.feedback_questions,
                    // "reviewer.reviewer_acceptance": true,
                    "reviewerIsChecked": true,
                    "reviewerIsDisabled": true,
                    "reviewer.reviewer_status": 'accepted-employee',
                    // "normalizerIsDisabled": false,
                    // "normalizerIsChecked": false,
                    // "normalizer.normalizer_status": 'pending'
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    "talent_category": talentCategory,
                    "current_previous_submission.objective_description": current_previous_submission,
                    "appraisal.objective_description": appraisal_objective_description,
                    "reviewer.reviewer_PA_rejected": false,
                    "reviewer.reviewer_PA_accepted": true,
                    "appraisal.appraiser_PA_rejected": false,
                    "reviewer.reviewer_comments": reviewer_comments,
                    "reviewer.reviewer_comments_draft": reviewer_comments_draft,
                    "reviewer_previous_submission.reviewer_comments": reviewer_comments,
                    "reviewer.reviewer_overall_feedback": "",
                    "reviewer_previous_submission.reviewer_overall_feedback": "",
                }
            }
        )
        res.status(StatusCodes.OK).json({
            employee
        });
    }

    if (Math.abs(current_overallRating - normalizer.normalized_overallRating) >= 0.3) {
        const employee = await Employee.updateMany({ _id: { $in: id } },
            {
                $set: {
                    "appraisal.pa_status": "Pending with HR Normalizer (Re-normalization)",
                    "appraisal.pa_rating": current_overallRating,
                    "appraisal.status": "rejected",
                    "appraisal.show_reviewer": false,
                    "appraisal_previous_submission.objective_description": appraisal_previous_submission,
                    "appraisal_previous_submission.pa_status": "Pending with HR Normalizer (Re-normalization)",
                    "reviewer.objective_group": appraisal.objective_group,
                    "reviewer.objective_type": appraisal.objective_type,
                    "reviewer.objective_description": getRatingsfromObjectiveDescriptionForAccept(appraisal.objective_description),
                    "normalizer.objective_description": getRatingsfromObjectiveDescriptionForAccept(appraisal.objective_description),
                    "reviewer_previous_submission.objective_description": getRatingsfromObjectiveDescriptionForAccept(appraisal.objective_description),
                    "reviewer_previous_submission.reviewer_rating": appraisal.appraiser_rating,
                    "reviewer.reviewer_rating": current_overallRating,
                    // "normalizer.normalizer_rating": current_overallRating,
                    "reviewer.training_recommendation": appraisal.training_recommendation,
                    "reviewer.other_recommendation": appraisal.other_recommendation,
                    "reviewer.area_of_improvement": appraisal.area_of_improvement,
                    "reviewer.feedback_questions": appraisal.feedback_questions,
                    "reviewer.reviewer_acceptance": true,
                    "reviewerIsChecked": true,
                    "reviewerIsDisabled": true,
                    "reviewer.reviewer_status": 'accepted-employee',
                    "normalizerIsDisabled": false,
                    "normalizerIsChecked": false,
                    "normalizer.normalizer_status": 'pending',
                    // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                    "current_previous_submission.objective_description": current_previous_submission,
                    "appraisal.objective_description": appraisal_objective_description,
                    "reviewer.reviewer_PA_rejected": false,
                    "reviewer.reviewer_PA_accepted": true,
                    "appraisal.appraiser_PA_rejected": false,
                    "reviewer.reviewer_comments": reviewer_comments,
                    "reviewer_previous_submission.reviewer_comments": reviewer_comments,
                    "reviewer.reviewer_overall_feedback": "",
                    "reviewer_previous_submission.reviewer_overall_feedback": "",
                }
            }
        )
        res.status(StatusCodes.OK).json({
            employee
        });
    }


})

const acceptReviewerRatings = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    console.log(id, '`````````````````````````````````````````````````')

    const { appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {

                "reviewer.objective_group": appraisal.objective_group,
                "reviewer.objective_type": appraisal.objective_type,
                "reviewer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                // "reviewer.reviewer_rating": appraisal.appraiser_rating,
                "reviewer.training_recommendation": appraisal.training_recommendation,
                "reviewer.other_recommendation": appraisal.other_recommendation,
                "reviewer.area_of_improvement": appraisal.area_of_improvement,
                "reviewer.feedback_questions": appraisal.feedback_questions,
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const acceptAppraisalEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
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
    const { id } = req.params
    const { value } = req.body




    const employee = await Employee.updateMany({
        "_id": new mongoose.Types.ObjectId(id),
    },
        {
            $set: {
                "reviewer.reviewer_acceptance": false,
                // "reviewer.reviewer_rejected_value": value,
                // "reviewer.reviewer_status": 'draft',
            }
        }
    )

    // if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true) {
    const { appraisal, reviewer } = await Employee.findById(id)
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

    console.log(reviewer, '```````````````````')
    if (reviewer.rejection_count === 0 || reviewer.rejection_count === undefined) {
        // if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const { appraisal } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    "reviewer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                    // "reviewer_previous_submission.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                    // "reviewer_previous_submission.reviewer_rating": appraisal.appraiser_rating,
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
            stat: reviewer
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

    const { id } = req.params

    const findEmpoloyee = await Employee.findById(id)

    const value = findEmpoloyee.reviewer.reviewer_rejected_value

    const employee = await Employee.updateMany({
        "_id": new mongoose.Types.ObjectId(id),
    },
        {
            $set: {
                "appraisal.appraisal_acceptance": true,
                "reviewer.reviewer_status": 'appraiser-accepted',
                "appraisal.appraiser_status": "accepted",
                // "appraisal.appraiser_rating": findEmpoloyee.reviewer.reviewer_rating,
                // "appraisal.objective_description": getRatingsfromObjectiveDescription(findEmpoloyee.reviewer.objective_description),
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
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
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

    const { id } = req.params

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
                "reviewer.reviewer_status": 'pending',
                "reviewer.rejection_count": 0,
                // "appraiser.rejection_count": 0
            }
        }
    )


    if (findEmpoloyee.normalizer.normalizer_rejected_value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const { normalizer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "appraisal.objective_description": normalizer.objective_description,
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
    const { id } = req.params
    const { value } = req.body

    const employee = await Employee.updateMany({
        "_id": new mongoose.Types.ObjectId(id),
    },
        {
            $set: {
                "normalizer.normalizer_rejected_value": value,
                // "normalizer.normalizer_status": 'draft',
                "normalizer.normalizer_acceptance": false,
                // "reviewerIsDisabled": true,
            }
        }
    )

    if (value.filter((i: any) => i.value === 'rating')[0].isChecked === true || value.filter((i: any) => i.value === 'rating')[0].isChecked === false) {
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
            {
                $set: {

                    // "reviewer.objective_group": appraisal.objective_group,
                    // "reviewer.objective_type": appraisal.objective_type,
                    // "normalizer.objective_description": reviewer.objective_description,
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
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
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
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
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
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
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
        const { reviewer } = await Employee.findById(id)

        const employee = await Employee.updateMany({ _id: { $in: id } },
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
    const { status } = req.params
    console.log(status)

    const employee = await Employee.find({ "appraisal.appraiser_status": status })


    res.status(StatusCodes.OK).json({
        employee
    });
})

const appraisalStatusReviewer = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.params
    console.log(status)

    const employee = await Employee.find({ "reviewer.reviewer_status": status })


    res.status(StatusCodes.OK).json({
        employee
    });
})

const appraisalStatusNormalizer = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.params
    console.log(status)

    const employee = await Employee.find({ "normalizer.normalizer_status": status })


    res.status(StatusCodes.OK).json({
        employee
    });
})

const filterByRatings = asyncHandler(async (req: Request, res: Response) => {
    const { gt, lt } = req.params

    const employee = await Employee.find({ "appraisal.appraiser_rating": { $gt: gt, $lt: lt } })

    res.status(StatusCodes.OK).json({
        employee
    });
})

const filterByPotential = asyncHandler(async (req: Request, res: Response) => {
    const { potential } = req.params

    const employee = await Employee.find({ "appraisal.potential": { potential } })

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
//------------------------------------------------------------------For reminder notification
const totalAppraiserDetails = asyncHandler(async (req, res) => {
    // Find all employees with the "appraiser" role
    const employeesWithAppraiserRole = await Employee.find({ "roles.appraiser": true });

    // Create an array to store appraiser details
    const appraiserDetails = [];

    // Iterate through all employees
    const allEmployees = await Employee.find({ "employee_upload_flag": true });//employeeUploadflag true when they r part of the calendar teams msg

    allEmployees.forEach(employee => {
        const appraiserName = employee.appraiser_name;

        // Check if the appraiser_name matches any name in employeesWithAppraiserRole
        if (employeesWithAppraiserRole.some(e => e.legal_full_name === appraiserName)) {
            const existingAppraiser = appraiserDetails.find(appraiser => appraiser.appraiserName === appraiserName);

            if (!existingAppraiser) {
                appraiserDetails.push({
                    appraiserName,
                    appraiserCode: employee?.appraiser_code,
                    appraiserEmail: employee?.email,
                    count: 0,
                    employees: [],
                });
            }
            //check below functions
            // Check if pa_status is "Pending with Appraiser" before pushing the employee
            if (employee.appraisal && employee.appraisal.pa_status === "Pending with Appraiser") {
                const updatedAppraiser = appraiserDetails.find(appraiser => appraiser.appraiserName === appraiserName);
                updatedAppraiser.count++;
                updatedAppraiser?.employees?.push(employee);
            }
        }
    });

    // Send the appraiser details in the response
    return res.status(StatusCodes.OK).json(appraiserDetails);
});
const totalReviewerDetails = asyncHandler(async (req, res) => {

    const employeesWithReviewerRole = await Employee.find({ "roles.reviewer": true });
    const reviewerDetails = [];
    const allEmployees = await Employee.find({ "employee_upload_flag": true });
    allEmployees.forEach(employee => {
        const reviewerName = employee.reviewer_name;
        if (employeesWithReviewerRole.some(e => e.legal_full_name === reviewerName)) {
            const existingReviewer = reviewerDetails.find(reviewer => reviewer.reviewerName === reviewerName);
            if (!existingReviewer) {
                reviewerDetails.push({
                    reviewerName,
                    reviewerCode: employee?.reviewer_code,
                    reviewerEmail: employee?.email,
                    count: 0,
                    //employees: [],
                });
            }
            if (employee.appraisal && employee.appraisal.pa_status === "Pending with Reviewer") {
                const updatedReviewer = reviewerDetails.find(appraiser => appraiser.reviewerName === reviewerName);
                updatedReviewer.count++;
                updatedReviewer?.employees?.push(employee);
            }
        }
    });
    return res.status(StatusCodes.OK).json(reviewerDetails);
});
// const totalNormalizerDetailsbbbb = asyncHandler(async (req, res) => {
//     const employeesWithNormalizerRole = await Employee.find({ "roles.normalizer": true });
//     const normalizerEmails = [];
//     const allEmployees = await Employee.find({"employee_upload_flag":true});

//     allEmployees.forEach(employee => {
//         const normalizerName = employee.normalizer_name;

//         if (
//             employeesWithNormalizerRole.some(e => e.legal_full_name === normalizerName) &&
//             employee.appraisal &&
//             employee.appraisal.pa_status === "Pending with Normalizer"
//         ) {
//             // Push the email address of this normalizer to the array
//             normalizerEmails.push(employee.email);
//         }
//     });

//     return res.status(StatusCodes.OK).json(normalizerEmails);
// });

// const totalNormalizerDetailvs = asyncHandler(async (req, res) => {
//     const employeesWithNormalizerRole = await Employee.find({ "roles.normalizer": true });
//     const normalizerDetails = [];
//     const allEmployees = await Employee.find({"employee_upload_flag":true});
//     allEmployees.forEach(employee => {
//         const normalizerName = employee.normalizer_name;
//         if (employeesWithNormalizerRole.some(e => e.legal_full_name === normalizerName)) {
//             const existingNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);
//             if (!existingNormalizer) {
//                 normalizerDetails.push({
//                     normalizerName,
//                     normalizerCode: employee?.normalizer_code,
//                     normalizerEmail: employee?.email,
//                     count: 0,
//                     employees: [],
//                 });
//             }
//             //is it "Pending with HR Normalizer"
//             if (employee.appraisal && employee.appraisal.pa_status === "Pending with Normalizer") {
//                 const updatedNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);
//                 updatedNormalizer.count++;
//                 updatedNormalizer?.employees?.push(employee);
//             }
//         }
//     });
//     return res.status(StatusCodes.OK).json(normalizerDetails);
// });
//updated function
const totalNormalizerDetails = asyncHandler(async (req, res) => {
    const employeesWithNormalizerRole = await Employee.find({ "roles.normalizer": true });
    const normalizerDetails = [];
    const allEmployees = await Employee.find({ "employee_upload_flag": true });

    allEmployees.forEach(employee => {
        const normalizerName = employee.normalizer_name;

        if (employeesWithNormalizerRole.some(e => e.legal_full_name === normalizerName)) {
            const existingNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);

            if (!existingNormalizer) {
                normalizerDetails.push({
                    normalizerName,
                    normalizerCode: employee?.normalizer_code,
                    normalizerEmail: employee?.email,
                    count: 0,
                    employees: [],
                });
            }

            if (employee.appraisal && employee.appraisal.pa_status === "Pending with Normalizer") {
                const updatedNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);
                updatedNormalizer.count++;
                updatedNormalizer?.employees?.push(employee);
            }
        }
    });

    // Filter out normalizers with a count of zero
    const filteredNormalizerDetails = normalizerDetails
        .filter(normalizer => normalizer.count > 0)
        .map(normalizer => normalizer.normalizerEmail);

    return res.status(StatusCodes.OK).json(filteredNormalizerDetails);
});

const totalNormalizerDetailsEmail = async () => {
    const employeesWithNormalizerRole = await Employee.find({ "roles.normalizer": true });
    const normalizerDetails = [];
    const allEmployees = await Employee.find({ "employee_upload_flag": true });
    allEmployees.forEach(employee => {
        const normalizerName = employee.normalizer_name;
        if (employeesWithNormalizerRole.some(e => e.legal_full_name === normalizerName)) {
            const existingNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);
            if (!existingNormalizer) {
                normalizerDetails.push({
                    normalizerName,
                    normalizerCode: employee?.normalizer_code,
                    normalizerEmail: employee?.email,
                    count: 0,
                    //employees: [],
                });
            }
            if (employee.appraisal && employee.appraisal.pa_status === "Pending with Normalizer") {
                const updatedNormalizer = normalizerDetails.find(normalizer => normalizer.normalizerName === normalizerName);
                updatedNormalizer.count++;
                updatedNormalizer?.employees?.push(employee);
            }
        }
    });
    // Extract the email addresses from normalizerDetails
    //const normalizerEmails = normalizerDetails.map(normalizer => normalizer.normalizerEmail);
    const normalizerEmails = normalizerDetails.filter(normalizer => normalizer.count > 0).map(normalizer => normalizer.normalizerEmail);
    //return res.status(StatusCodes.OK).json(normalizerEmails);
    return normalizerEmails;
};
const totalAppraiserDetailsEmail = async () => {

    //Find the appraisers of all live employees whose status is Pending with Appraiser   
    const allAppraisers = await Employee.distinct("appraiser_code", {
        "employee_upload_flag": true,
        "appraisal.pa_status": /.*Pending with Appraiser.*/i
    })

    //Find email of those appraisers
    const allAppraiserEmails = await Employee.find({
        "employee_code": { $in: allAppraisers }
    }, {
        "email": 1
    })
    const appraiserEmails = allAppraiserEmails.map(appraiser => appraiser.email);
    return appraiserEmails;
};
const totalReviewerDetailsEmail = async () => {

    //Find the reviewers of all live employees whose status is Pending with Reviewer 
    const allReviewers = await Employee.distinct("appraiser_code", {
        "employee_upload_flag": true,
        "appraisal.pa_status": /.*Pending with Reviewer.*/i
    })
    //Find email of those reviewers
    const allReviewerEmails = await Employee.find({
        "employee_code": { $in: allReviewers }
    }, {
        "email": 1
    })
    const reviewerEmails = allReviewerEmails.map(reviewer => reviewer.email);
    return reviewerEmails;
    // return res.status(StatusCodes.OK).json(reviewerDetails);  
};
// const totalAppraiserDetailsEmail = async () => {
//     // Find all employees with the "appraiser" role and "Pending with Appraiser" status
//     const employeesWithAppraiserRoleAndStatus = await Employee.find({
//         "roles.appraiser": true,
//         "appraisal.pa_status": "Pending with Appraiser"
//     });
// console.log(employeesWithAppraiserRoleAndStatus,"employeesWithAppraiserRoleAndStatus")
//     // Create an array to store appraiser email addresses
//     const appraiserEmails = employeesWithAppraiserRoleAndStatus.map(employee => employee.email);

//     return appraiserEmails;
// };
//------------------------------------------------------------------For reminder notification

const employeeRejectionSave = asyncHandler(async (req: Request, res: Response) => {
    const { id, agreeValue } = req.body

    const emp = await Employee.findById(id)

    if (agreeValue == true) {
        const employee = await Employee.updateMany({ _id: { $in: id } }, {          
            $set: {
                // "employee.comments": comments,
                "appraisal.appraiser_status": 'employee-rejected',
                // "appraisal.status": "rejected",
                // "employee.employee_status": "rejected"
            }
        })

    } else if (agreeValue == false) {
        const employee = await Employee.updateMany({ _id: { $in: id } }, {
            $set: {
                // "employee.comments": comments,
                "normalizerIsChecked": false,
                "normalizerIsDisabled": false,
                "normalizer.normalizer_status": 'employee-rejected',
                // "appraisal.status": "rejected",
                // "employee.employee_status": "rejected"
            }
        })
    }
    res.status(StatusCodes.OK).json({ "message": agreeValue });
})

const normalizerRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "normalizer.normalizer_status": 'normalizer-rejected',
            "employee.objective_description": normalizer.objective_description,
            "appraisal.status": 'completed'

        }
    })

    res.status(StatusCodes.OK).json({ "message": updatedEmployee });

})

const normalizerAcceptsEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "normalizer.normalizer_status": 'normalizer-accepted',
            "normalizer.objective_description": employee.objective_description,
            "appraisal.status": 'completed',

        }
    })

    res.status(StatusCodes.OK).json({ "message": updatedEmployee });

})

const appraiserAcceptsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { comments,
        // previousRating,
        talentCategory,
        employeeObjectiveDescription,
        current_overallRating,
        current_previous_submission,
        appraisalObjectiveDescription,
        employee_previous_submission,
        appraiser_overall_feedback,
        performancegoalValues
    } = req.body

    const { employee, normalizer, appraisal } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.objective_description": appraisalObjectiveDescription,
            "appraisal.appraiser_status": 'appraiser-accepted-employee',
            "appraisal.status": 'rejected',
            "appraisal.pa_status": "Pending with Reviewer (Employee Rejection)",
            "appraisal.comments": comments,
            "appraisal.appraiser_overall_feedback": appraiser_overall_feedback?.trim(),
            "appraisal.performance_goal": performancegoalValues,
            "appraisal_previous_submission.performance_goal": performancegoalValues,
            "appraisal_previous_submission.objective_description": appraisal.objective_description,
            "appraisal_previous_submission.appraiser_rating": appraisal.appraiser_rating,
            "appraisal_previous_submission.appraiser_overall_feedback": appraiser_overall_feedback?.trim(),
            "appraisal_previous_submission.pa_status": "Pending with Reviewer (Employee Rejection)",
            // "normalizer.normalizer_rating": appraisal.appraiser_rating,
            // "normalizer.normalizer_rating": current_overallRating,
            // "normalizer.normalizer_status": 'completed',
            // "normalizer.objective_description": appraisal.objective_description,
            "employee.objective_description": employeeObjectiveDescription,
            "appraisal.appraiser_rejected": false,
            "reviewer.reviewer_status": "pending",
            "reviewerIsDisabled": false,
            "reviewerIsChecked": false,
            // "employee.employee_status": "accepted",
            "appraisal.appraiser_rating": current_overallRating,
            // "appraisal_previous_rating.objective_description": previousRating,
            "current_previous_submission.objective_description": current_previous_submission,
            "employee_previous_submission.objective_description": employee_previous_submission,
            "employee.employee_PA_rejected": false,
            "appraisal.appraiser_PA_rejected": false,
            "appraisal.appraiser_PA_accepted": true,


        }
    })
    console.log('comppp')
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });

    // if (Math.abs(employee.employee_rating - normalizer.normalizer_rating) <= 0.3) {
    //     const updatedEmployee = await Employee.findByIdAndUpdate(id, {
    //         $set: {
    //             "appraisal.appraiser_status": 'appraiser-accepted-employee',
    //             "appraisal.status": 'completed',
    //             "appraisal.pa_status": "Completed",
    //             "appraisal.pa_rating": appraisal.appraiser_rating,
    //             "appraisal.comments": comments,
    //             "talent_category": talentCategory,
    //             "appraisal.appraiser_rejected": false,
    //             "appraisal_previous_submission.objective_description": appraisal.objective_description,
    //             "appraisal_previous_rating.objective_description": previousRating,
    //             "appraisal_previous_submission.appraiser_rating": appraisal.appraiser_rating,
    //             "normalizer.normalizer_rating": appraisal.appraiser_rating,
    //             // "normalizer.normalizer_status": 'completed',
    //             "normalizer.objective_description": appraisal.objective_description,

    //         }
    //     })
    //     console.log('comppp')
    //     res.status(StatusCodes.OK).json({ "message": updatedEmployee });
    // }

    // if (Math.abs(employee.employee_rating - normalizer.normalizer_rating) >= 0.3) {
    //     const updatedEmployee = await Employee.findByIdAndUpdate(id, {
    //         $set: {
    //             "appraisal.appraiser_status": 'appraiser-accepted-employee',
    //             "appraisal.appraiser_rating": employee.employee_rating,
    //             "appraisal.comments": comments,
    //             "appraisal_previous_submission.objective_description": appraisal.objective_description,
    //             "appraisal_previous_submission.appraiser_rating": appraisal.appraiser_rating,
    //             "appraisal_previous_rating.objective_description": previousRating,
    //             // "appraisal.objective_description": getRatingsfromObjectiveDescription(employee.objective_description),
    //             "appraisal.status": 'rejected',
    //             "appraisal.appraiser_rejected": false,
    //             "appraisal.pa_status": "Pending with Reviewer",
    //             "appraisal.pa_rating": appraisal.appraiser_rating,
    //             // "normalizer.normalizer_status": "pending",
    //             // "normalizerIsChecked": false,
    //             // "normalizerIsDisabled": false,
    //             "reviewerIsChecked": false,
    //             "reviewerIsDisabled": false,
    //             "reviewer.reviewer_status": "pending"
    //         }
    //     })
    //     res.status(StatusCodes.OK).json({ "message": previousRating })
    //     console.log('2nd case')

    // }



})


const appraiserRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.appraiser_status": 'appraiser-rejected-employee',
            "employee.employee_status": "pending",
            "appraisal.pa_status": "Pending with Employee",
            "appraisal.appraiser_rejected": true,
            "appraisal_previous_submission.pa_status": "Pending with Employee",

        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})

const normalizerSubmitEmployeeRejection = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { comments,
        current_OverAllRating,
        talentCategory,
        meetingNotes,
        normalizerComments,
        normalizerObjDesc,
        current_previous_submission,
        appraisal_previous_submission,
        isAppraiserChecked,
        isReviewerChecked,
        isEmployeeChecked
    } = req.body
    console.log(talentCategory, 'talentCategory')

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.status": 'completed',
            "appraisal.pa_status": "Completed",
            "appraisal_previous_submission.pa_status": "Completed",
            "appraisal.pa_rating": current_OverAllRating,
            "normalizer.comments": comments,
            "normalizer_previous_submission.comments": comments,
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "normalizer.objective_description": normalizerObjDesc,
            "normalizer.reason_for_rejection": normalizerComments,
            "normalizer_previous_submission.reason_for_rejection": normalizerComments,
            "normalizer.normalizer_meeting_notes": meetingNotes,
            "normalizer_previous_submission.normalizer_meeting_notes": meetingNotes,
            "normalizer.isAppraiserChecked": isAppraiserChecked,
            "normalizer_previous_submission.isAppraiserChecked": isAppraiserChecked,
            "normalizer.isReviewerChecked": isReviewerChecked,
            "normalizer_previous_submission.isReviewerChecked": isReviewerChecked,
            "normalizer.isEmployeeChecked": isEmployeeChecked,
            "normalizer_previous_submission.isEmployeeChecked": isEmployeeChecked,
            // "employee.objective_description": normalizer.objective_description,
            // "employee.employee_rating": normalizer.normalizer_rating,
            "normalizer.normalizer_status": "re-normalized",
            "normalizer.normalizer_rating": current_OverAllRating,
            "talent_category": talentCategory,
            "current_previous_submission.objective_description": current_previous_submission,
            "normalizer_previous_submission.objective_description": normalizerObjDesc,
            "appraisal_previous_submission.objective_description": appraisal_previous_submission
        }
    })
    res.status(StatusCodes.OK).json({
        "message": updatedEmployee, current_OverAllRating,
        talentCategory,
        meetingNotes,
        normalizerComments,
        normalizerObjDesc
    });
})

const attachmentsAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "appraisal.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})

const rejectionAttachmentsAppraiser = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "appraisal.rejection_attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})

const attachmentsAppraiserOverview = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})


const attachmentsReviewer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { attachments } = req.body;

    try {
        // Find the employee by id
        let employee: any = await Employee.findById(id);

        if (employee) {
            let reviewerAttachments = employee?.reviewer?.attachments;

            // Update existing attachment with the same objective description and url
            reviewerAttachments = reviewerAttachments.map((item: any) => {
                if (item.objective_description === attachments?.objective_description && item?.name === attachments?.url) {
                    return attachments;
                } else {
                    return item;
                }
            });

            // Check if the attachment already exists
            const isAttachmentExist = reviewerAttachments.find((item: any) => {
                console.log(item, attachments?.url, 'isAttachmentExist')
                return item.objective_description === attachments.objective_description && item?.url === attachments?.url
            });

            if (!isAttachmentExist) {
                // Push the new attachment
                reviewerAttachments.push(attachments);
            }

            // Update the employee document
            console.log(employee, "employeeDetails")
            employee.reviewer.attachments = reviewerAttachments;
            const updatedEmployee = await employee.save();

            console.log(updatedEmployee);



            // Return the updatedEmployee or any other response as needed
            res.status(200).json({ message: "Employee attachments updated successfully", employee: updatedEmployee });
        } else {
            // Employee not found
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        // Handle the error
        res.status(500).json({ message: "Error updating employee attachments", error: error.message });
    }
});


const attachmentsNormalizer = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    try {
        // Find the employee by id
        let employee: any = await Employee.findById(id);

        if (employee) {
            let normalizerAttachments = employee?.normalizer?.attachments;

            // Update existing attachment with the same objective description and url
            normalizerAttachments = normalizerAttachments.map((item: any) => {
                if (item.objective_description === attachments?.objective_description && item?.name === attachments?.url) {
                    return attachments;
                } else {
                    return item;
                }
            });

            // Check if the attachment already exists
            const isAttachmentExist = normalizerAttachments.find((item: any) => {
                console.log(item, attachments?.url, 'isAttachmentExist')
                return item.objective_description === attachments.objective_description && item?.url === attachments?.url
            });

            if (!isAttachmentExist) {
                // Push the new attachment
                normalizerAttachments.push(attachments);
            }

            // Update the employee document
            employee.normalizer.attachments = normalizerAttachments;
            const updatedEmployee = await employee.save();

            console.log(updatedEmployee);



            // Return the updatedEmployee or any other response as needed
            res.status(200).json({ message: "Employee attachments updated successfully", employee: updatedEmployee });
        } else {
            // Employee not found
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        // Handle the error
        res.status(500).json({ message: "Error updating employee attachments", error: error.message });
    }
})


const meetingNotesAttachmentsNormalizer = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "normalizer.meetingNotesAttachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})
const attachmentsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    try {
        // Find the employee by id
        let employee: any = await Employee.findById(id);

        if (employee) {
            let employeeAttachments = employee?.employee?.attachments;

            // Update existing attachment with the same objective description and url
            employeeAttachments = employeeAttachments.map((item: any) => {
                if (item.objective_description === attachments?.objective_description && item?.name === attachments?.url) {
                    return attachments;
                } else {
                    return item;
                }
            });

            // Check if the attachment already exists
            const isAttachmentExist = employeeAttachments.find((item: any) => {
                console.log(item, attachments?.url, 'isAttachmentExist')
                return item.objective_description === attachments.objective_description && item?.url === attachments?.url
            });

            if (!isAttachmentExist) {
                // Push the new attachment
                employeeAttachments.push(attachments);
            }

            console.log(employee, 'employeeAttachments')
            // Update the employee document
            employee.employee.attachments = employeeAttachments;
            const updatedEmployee = await employee.save();

            console.log(updatedEmployee);



            // Return the updatedEmployee or any other response as needed
            res.status(200).json({ message: "Employee attachments updated successfully", employee: updatedEmployee });
        } else {
            // Employee not found
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        // Handle the error
        res.status(500).json({ message: "Error updating employee attachments", error: error.message });
    }
})


const calculateRatings = asyncHandler(async (req: Request, res: Response) => {


    const findObjectiveType = async (id: string) => {
        const objective_type = await ObjectiveType.findById("62b4458f0e7b97416df32950")
        return objective_type
    }


    console.log(findObjectiveType("62b4458f0e7b97416df32950"), '`````````````````````````````')
    const objective_description = req.body.objective_description

    const employee_rating = objective_description.map((j: any) => {


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

    res.status(StatusCodes.OK).json({ "message": findObjectiveType("62b4458f0e7b97416df32950") });
    // res.status(StatusCodes.OK).json({"message": "fgfgf"});
})


const filterEmployeeByManagerCode = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.params

    const toSte = code.toString()

    console.log(typeof toSte)

    const data = await Employee.find({ manager_code: `"${code}"` })


    res.status(StatusCodes.OK).json(data);


})



const statusBasedCount = asyncHandler(async (req: Request, res: Response) => {

    const { manager_code } = req.body
    console.log(manager_code, '````````````````')

    const filter = { manager_code: `${manager_code}` }

    const resp = await Employee.aggregate([
        { $match: filter },
        // {$group: {
        //         "appraisal.status": "not-started",
        //         // count: ""
        //
        //     }}
    ])
    res.status(StatusCodes.OK).json(resp);


})

const getEmployeeTemplate = asyncHandler(async (req: Request, res: Response) => {

    const calendar = req.params.id


    const appraisalCalendar = await AppraisalCalender.find({ calendar: "633ab35409a387dbad930bcb" })

    // const  getEmployee = await Employee.find({})
    // const templates = await Template.find()

    const findEmployee = async (id: any) => {
        const emp = await Employee.find({})

        console.log(id)
        return emp.find((k: any) => k._id == id)
    }
    const findTemplate = async (id: any) => {
        const emp = await Template.find({})

        return emp.find((k: any) => k._id === id)
    }
    const getEmployeefromAppraisalCalendar = appraisalCalendar.map((j: any) => {

        const data = j.position.map((k: any) => {

            return {
                employee: findEmployee(k.name.toString()),
                template: findTemplate(j.template.toString())
            }
        })
        // return {
        //     employee: data,
        //     "employee.template": j.template,
        //     template: j.template
        // }

        return data

    }).flat()

    res.status(StatusCodes.OK).json({
        // getEmployeefromAppraisalCalendar,
        //     newArray,
        //     employeeId
        //     getEmployee,
        data: getEmployeefromAppraisalCalendar
    });







})

const getAllMappedEmployee = asyncHandler(async (req: Request, res: Response) => {

    // const appraisalCalendar = await AppraisalCalender.find({calendar:req.params.id})
    const appraisalCalendar = await AppraisalCalender.find({ status: "Draft" })

    const getEmployeefromAppraisalCalendar = appraisalCalendar.map((calendar: any) => {
        const data = calendar.position.map((k: any) => k.name.toString())
        return data
    }).flat()

    // const getEmployee = await Employee.find({})

    // const employeeId = getEmployee?.map(k => k._id.toString())

    // const myArray = getEmployee.filter(ar => !getEmployeefromAppraisalCalendar.includes(ar._id.toString()))

    // const newArray = _.difference(getEmployee.map((j: any) => j._id.toString()), getEmployeefromAppraisalCalendar)

    // console.log(getEmployeefromAppraisalCalendar)


    res.status(StatusCodes.OK).json({
        // getEmployeefromAppraisalCalendar,
        //   newArray,
        //     employeeId
        //     getEmployee,
        // data: myArray,
        getEmployeefromAppraisalCalendar
    });
})

const getUnMappedEmployee = asyncHandler(async (req: Request, res: Response) => {

    // const appraisalCalendar = await AppraisalCalender.find({calendar:req.params.id})
    const appraisalCalendar = await AppraisalCalender.find({ calendar: req.params.id })

    const getEmployeefromAppraisalCalendar = appraisalCalendar.map((j: any) => {
        const data = j.position.map((k: any) => k.name.toString())
        return data
    }).flat()

    const getEmployee = await Employee.find({
        "employee_upload_flag": true,
        "isCEORole": false,
        "isLeavers": false,
        "isExcluded": false,
    })

    const myArray = getEmployee.filter(ar => !getEmployeefromAppraisalCalendar.includes(ar._id?.toString()))

    // const newArray = _.difference(getEmployee.map((j: any) => j._id?.toString()), getEmployeefromAppraisalCalendar)

    console.log(getEmployeefromAppraisalCalendar)


    res.status(StatusCodes.OK).json({
        // getEmployeefromAppraisalCalendar,
        //   newArray,
        //     employeeId
        //     getEmployee,
        data: myArray,
        getEmployeefromAppraisalCalendar
    });
})
//Length of unmapped employees
const getUnMappedEmployeeLength = asyncHandler(async (req: Request, res: Response) => {
    const appraisalCalendar = await AppraisalCalender.find({ calendar: req.params.id })
    const getEmployeefromAppraisalCalendar = appraisalCalendar.map((j: any) => {
        const data = j.position.map((k: any) => k.name?.toString())
        return data
    }).flat()
    //const getEmployee = await Employee.find({})
    const getEmployees = await Employee.find({
        "isCEORole": false,
        "isLeavers": false,
        "isExcluded": false,
        "employee_upload_flag": true,
    })
    const myArray = getEmployees.filter(ar => !getEmployeefromAppraisalCalendar.includes(ar._id?.toString())).length
    console.log(getEmployeefromAppraisalCalendar)
    res.status(StatusCodes.OK).json({
        data: myArray,
        // getEmployee
    });
})
const getReviewerEmployee = asyncHandler(async (req: Request, res: Response) => {
    const emp: any = await Employee.findById({ _id: req.params.id })
    // console.log(emp.legal_full_name, 'emppp')
    // const emp2 = await Employee.findOne({manager_code: emp.employee_code})
    const reviewerData = await Employee.find({ manager_code: emp?.appraiser_code })


    res.status(StatusCodes.OK).json({
        // getEmployeefromAppraisalCalendar,
        //   newArray,
        //     employeeId
        //     getEmployee,
        // appraiserOfReviewer: emp2,
        emp,
        reviewerData
    });
})

const removeAppraiserAttachments = asyncHandler(async (req: Request, res: Response) => {



    const { id } = req.params
    const { name } = req.body



    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "appraisal.attachments": { "url": name },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})
const removeRejectionAppraiserAttachments = asyncHandler(async (req: Request, res: Response) => {



    const { id } = req.params
    const { name, objective_description } = req.body


    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "appraisal.rejection_attachments": { "url": name, "objective_description": new mongoose.Types.ObjectId(objective_description) },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });


})


const removeAppraiserAttachmentsOverview = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name, objective_description } = req.body


    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "appraisal.attachments": { "url": name, "objective_description": new mongoose.Types.ObjectId(objective_description) },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})





const removeReviewerAttachments = asyncHandler(async (req: Request, res: Response) => {


    const { id } = req.params
    const { name, objective_description } = req.body

    console.log('removeReviewerAttachments1', req.body)

    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "reviewer.attachments": { "url": name, "objective_description": objective_description },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({
        "message": updatedCalendar,
        "request": req.body
    });

})

const removeNormalizerAttachments = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name } = req.body

    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "normalizer.attachments": { "url": name },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})

const removeMeetingNotesNormalizerAttachments = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name } = req.body
    console.log(id, name, 'checknormalizer')


    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "normalizer.meetingNotesAttachments": { "url": name },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})

const removeEmployeeAttachments = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name } = req.body

    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "employee.attachments": { "url": name },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})

const appraiserDashboard = asyncHandler(async (req: Request, res: Response) => {

    // const data = await Employee.aggregate([
    //     {
    //
    //
    //     }
    // ])
    res.status(StatusCodes.OK).json({ message: "works " });
    //  res.status(StatusCodes.OK).json(data);
})


const acceptEmployeeGradeException = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "isGradeException": true,
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const updateEmployeeRoles = asyncHandler(async (req: Request, res: Response) => {
    const { id, appraiser, reviewer, normalizer, removeAppraiser, removeReviewer, removeNormalizer, PaAdmin, removePaAdmin } = req.body
    console.log(id, appraiser, reviewer, normalizer, removeAppraiser, removeReviewer, removeNormalizer, "roles.appraiser")
    // const { employee: appraisal } = await Employee.findById(id);
    let setRolesValue = {};
    if (appraiser) {
        setRolesValue["roles.appraiser"] = true
    }
    if (reviewer) {
        setRolesValue["roles.reviewer"] = true
    }
    if (normalizer) {
        setRolesValue["roles.normalizer"] = true
    }
    if (PaAdmin) {
        setRolesValue["roles.pa_admin"] = true
    }

    if (removeAppraiser) {
        setRolesValue["roles.appraiser"] = false
    }
    if (removeReviewer) {
        setRolesValue["roles.reviewer"] = false
    }
    if (removeNormalizer) {
        setRolesValue["roles.normalizer"] = false
    }
    if (removePaAdmin) {
        setRolesValue["roles.pa_admin"] = false
    }
    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: setRolesValue
            // $set: {
            //     "roles": roles,
            // }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const acceptEmployeeRoleExceptions = asyncHandler(async (req: Request, res: Response) => {
    const { id, masterAppraiserCode, masterAppraiserName } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        [{
            $set: {
                "isRoleException": true,
               // "master_appraiser_code": "$appraiser_code",
                // "master_appraiser_name": "$appraiser_name",
                // "master_reviewer_code": "$reviewer_code",
                // "master_reviewer_name": "$reviewer_name",
                // "master_normalizer_code": "$normalizer_code",
                // "master_normalizer_name": "$normalizer_name",
                "appraiser_code": "$appraiser_code_Draft",   
                "appraiser_name": "$appraiser_name_Draft",
                "reviewer_code": "$reviewer_code_Draft",
                "reviewer_name": "$reviewer_name_Draft",
                "normalizer_code": "$normalizer_code_Draft",
                "normalizer_name": "$normalizer_name_Draft",

            }

        }]
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})
const acceptEmployeeRoleExceptionsDraft = asyncHandler(async (req: Request, res: Response) => {
    const { id, masterAppraiserCode, masterAppraiserName } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        [{
            $set: {
                "isRoleExceptionDraft": true,
                "master_appraiser_code": "$appraiser_code",
                "master_appraiser_name": "$appraiser_name",
                "master_reviewer_code": "$reviewer_code",
                "master_reviewer_name": "$reviewer_name",
                "master_normalizer_code": "$normalizer_code",
                "master_normalizer_name": "$normalizer_name",
                "appraiser_name_Draft": "$appraiser_name",
                "appraiser_code_Draft": "$appraiser_code",
                "reviewer_name_Draft": "$reviewer_name",
                "reviewer_code_Draft": "$reviewer_code",
                "normalizer_name_Draft": "$normalizer_name",
                "normalizer_code_Draft": "$normalizer_code",

            }

        }]
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const acceptEmployeeCEORole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "isCEORole": true,
                "isGradeException": false,
                "isRoleException": false,
                "appraisal.pa_status": "excepted",
                "appraisal.status": "excepted",
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const acceptEmployeeLeavers = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                //"isLeaversDraft": true,
                "isLeavers": true,
                "isGradeException": false,
                "isRoleException": false,
                "appraisal.status": "excepted",
                "appraisal.pa_status": "excepted",
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})
const acceptEmployeeLeaversDraft = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        [{
            $set: {
                //"isLeaversDraft": true,
                "isLeaversDraft": true,
                "isGradeException": false,
                "isRoleException": false,
                "appraisal.status": "excepted",
                "appraisal.pa_status": "excepted",
            }
        }]
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})
const acceptEmployeeExcluded = asyncHandler(async (req: Request, res: Response) => {
    const { id, Inprobation } = req.body

    // const { employee: appraisal } = await Employee.findById(id);

    // const employee = await Employee.updateMany({ _id: { $in: id } },
    //     {
    //         $set: {
    //             "isExcluded": true,
    //             "isGradeException": false,
    //             "isRoleException": false,
    //             "appraisal.pa_status": "excepted",
    //             "appraisal.status": "excepted",
    //         }
    //     }
    // )
    const updateFields = {
        "isExcluded": true,
        "isGradeException": false,
        "isRoleException": false,
        "appraisal.pa_status": "excepted",
        "appraisal.status": "excepted",
    };

    if (Inprobation === "Inprobationcheck") {
        updateFields["probation_status"] = "In-Probation";
    }
    const employee = await Employee.updateMany({ _id: { $in: id } }, { $set: updateFields });
    res.status(StatusCodes.OK).json({
        employee
    });
})
const acceptEmployeeNamesChange = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    const employee = await Employee.updateMany({ _id: { $in: id } },
        //filter by role exception true
        [{
            $set: {
                "appraiser_name": "$appraiser_name_Draft",
                "appraiser_code": "$appraiser_code_Draft",
                "reviewer_name": "$reviewer_name_Draft",
                "reviewer_code": "$reviewer_code_Draft",
                "normalizer_name": "$normalizer_name_Draft",
                "normalizer_code": "$normalizer_code_Draft",
                //set isroleexceptionDraft false
                //"isRoleExceptionDraft":false
            }
        }]
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const acceptEmployeeNamesChangeDraft = asyncHandler(async (req: Request, res: Response) => {
    const { id, appraiser_name, appraiser_code, reviewer_name,
        reviewer_code, normalizer_name, normalizer_code, activeCheckbox
    } = req.body

    // const { employee: appraisal } = await Employee.findById(id);
    let setValues = {};
    if (activeCheckbox.includes("AppraiserActivation")) {
        setValues["appraiser_name_Draft"] = appraiser_name
        setValues["appraiser_code_Draft"] = appraiser_code
    }
    if (activeCheckbox.includes("reviewerActivation")) {
        setValues["reviewer_name_Draft"] = reviewer_name
        setValues["reviewer_code_Draft"] = reviewer_code
    }
    if (activeCheckbox.includes("normalizerActivation")) {
        setValues["normalizer_name_Draft"] = normalizer_name
        setValues["normalizer_code_Draft"] = normalizer_code
    }
    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            // $set: {
            //     "appraiser_name": appraiser_name,
            //     "appraiser_code": appraiser_code,
            //     "reviewer_name": reviewer_name,
            //     "reviewer_code": reviewer_code,
            //     "normalizer_name": normalizer_name,
            //     "normalizer_code": normalizer_code,
            // },
            $set: setValues
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})
const removeBulkEmployeesfromRoleException = asyncHandler(async (req: Request, res: Response) => {
    const { id, exception } = req.body
    let exceptionValues = {};
    // const { employee: appraisal } = await Employee.findById(id);
    console.log(id, "removeBulkEmployeesfromRoleException")
    if (exception == "Excluded") {
        exceptionValues["isExcluded"] = false
    }
    if (exception == "RoleException") {
        exceptionValues["isRoleException"] = false
        exceptionValues["isRoleExceptionDraft"] = false
    }
    if (exception == "GradeException") {
        exceptionValues["isGradeException"] = false
    }
    if (exception == "CEORole") {
        exceptionValues["isCEORole"] = false
    }
    if (exception == "Leavers") {
        exceptionValues["isLeavers"] = false
        exceptionValues["isLeaversDraft"] = false
    }
    const employee = await Employee.updateMany({ _id: { $in: id } },
        [{
            $set: exceptionValues
        }]
    )
    res.status(StatusCodes.OK).json({

        employee
    });
})

// appraiser accepts reviewer's rating 
const appraiserAcceptsReviewerRating = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const {
        ratings,
        comments,
        rejection_reason,
        rating_value,
        rating_rejected,
        rating_accepted,
        action_performed,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        rating_comments,
        reviewer_objective_description,
        value,
        remarks,
        potential,
        current_objective_description
    } = req.body

    const employee = await Employee.findOneAndUpdate({
        "_id": new mongoose.Types.ObjectId(id),

        // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
        "appraisal.objective_description": {
            $elemMatch: {
                name: new mongoose.Types.ObjectId(objective_description_name)
            }
        },

    },
        {
            $set: {
                "appraisal.objective_description.$[description].ratings": new mongoose.Types.ObjectId(ratings),
                "appraisal.objective_description.$[description].comments": comments,
                "appraisal.objective_description.$[description].rejection_reason": rejection_reason,
                "appraisal.objective_description.$[description].rating_value": rating_value,
                "appraisal.objective_description.$[description].rating_comments": rating_comments,
                // "appraisal.appraiser_status": 'draft'
                "appraisal.objective_description.$[description].rating_rejected": rating_rejected,
                "appraisal.objective_description.$[description].rating_accepted": rating_accepted,
                "appraisal.objective_description.$[description].action_performed": action_performed,
                "appraisal.objective_description.$[description].remarks": remarks,
                "reviewer.objective_description": reviewer_objective_description,
                "appraisal.potential": potential,
                "current_rating.objective_description": current_objective_description
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

// reviewer accepts appraiser's rating
const reviewerAcceptsAppraiserRating = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const {
        ratings,
        rating_comments,
        rating_rejected,
        rejection_reason,
        action_performed,
        reason_for_rejection,
        rating_value,
        objective_description_name,
        objective_description,
        value,
        comments,
        appraiser_objective_description,
        current_objective_description,
        reviewerOverallFeedComments
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
                "reviewer.objective_description.$[description].rejection_reason": rejection_reason,
                "reviewer.objective_description.$[description].rating_value": rating_value,
                "reviewer.objective_description.$[description].rating_rejected": rating_rejected,
                "reviewer.objective_description.$[description].action_performed": action_performed,
                "reviewer.objective_description.$[description].reason_for_rejection": reason_for_rejection,
                "reviewer.objective_description.$[description].comments": comments,
                "appraisal.objective_description": appraiser_objective_description,
                "current_rating.objective_description": current_objective_description,
                "reviewer.reviewer_overall_feedback": reviewerOverallFeedComments,
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

// appraiser accepts employee rating
const appraiserAcceptsEmployeeRating = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const {
        ratings,
        comments,
        rejection_reason,
        rating_value,
        rating_rejected,
        action_performed,
        rating_resubmitted,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        rating_comments,
        value,
        remarks,
        employee_objective_description,
        pa_status,
        appraiser_status,
        current_objective_description
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
                "appraisal.objective_description.$[description].rejection_reason": rejection_reason,
                "appraisal.objective_description.$[description].rating_value": rating_value,
                "appraisal.objective_description.$[description].rating_comments": rating_comments,
                // "appraisal.appraiser_status": 'draft'
                "appraisal.objective_description.$[description].rating_rejected": rating_rejected,
                "appraisal.objective_description.$[description].rating_resubmitted": rating_resubmitted,
                "appraisal.objective_description.$[description].action_performed": action_performed,

                "appraisal.objective_description.$[description].remarks": remarks,
                "employee.objective_description": employee_objective_description,
                "appraisal.appraiser_rating": false,
                "appraisal.pa_status": pa_status,
                "appraisal.appraiser_status": appraiser_status,
                "current_rating.objective_description": current_objective_description,
                "appraisal.appraiser_PA_accepted": true
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

// employee accepts appraiser rating 
const employeeAcceptsAppraiserRating = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const {
        ratings,
        comments,
        rejection_reason,
        rating_rejected,
        action_performed,
        objective_description_name,
        objective_description,
        appraiser_objective_description,
        current_objective_description
    } = req.body

    console.log(ratings,
        comments,
        rejection_reason,
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
                "employee.objective_description.$[description].rejection_reason": rejection_reason,
                "employee.objective_description.$[description].rating_rejected": rating_rejected,
                "employee.objective_description.$[description].action_performed": action_performed,
                "appraisal.objective_description": appraiser_objective_description,
                "current_rating.objective_description": current_objective_description,

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




const lineManagerEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { employee_code } = req.params

    const getEmployee = await Employee.find({ manager_code: employee_code }).limit(5)
    res.status(StatusCodes.OK).json({
        getEmployee
    });

})

// const lineManagerPlusOneEmployee = asyncHandler(async (req: Request, res: Response) => {

//     const { employee_code } = req.params

//     const lineManager = await Employee.find({ manager_code: employee_code })
//     const lineManagerPlusOne = await Employee.find({ manager_code: { $in: lineManager.map((j: any) => j.employee_code) } })
//     const lineManagerPlusTwo = await Employee.find({ manager_code: { $in: lineManagerPlusOne.map((j: any) => j.employee_code) } })
//     const lineManagerPlusThree = await Employee.find({ manager_code: { $in: lineManagerPlusTwo.map((j: any) => j.employee_code) } })

//     const Temp = lineManager.map((j: any) => j.employee_code)
//     res.status(StatusCodes.OK).json({
//         lineManagerPlusThree,
//         lineManagerPlusTwo,
//         lineManagerPlusOne,
//         lineManager
//         //Temp
//     });

// })
const lineManagerPlusOneEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { employee_code, calId } = req.params;
    console.log(employee_code, calId, "lineManagerPlusOneEmployeeConsoled")
    const lineManager = await Employee.find({ manager_code: employee_code, calendar: calId, employee_upload_flag: true, "appraisal.status": { $ne: "excepted" } }).populate('appraisal.training_recommendation,employee.training_recommendation');
    const lineManagerIds = lineManager.map((j: any) => j.employee_code);

    const lineManagerPlusOne = await Employee.find({ manager_code: { $in: lineManagerIds }, calendar: calId, employee_upload_flag: true, "appraisal.status": { $ne: "excepted" } }).populate('appraisal.training_recommendation,employee.training_recommendation');
    const lineManagerPlusOneIds = lineManagerPlusOne.map((j: any) => j.employee_code);

    const lineManagerPlusTwo = await Employee.find({ manager_code: { $in: lineManagerPlusOneIds }, calendar: calId, employee_upload_flag: true, "appraisal.status": { $ne: "excepted" } }).populate('appraisal.training_recommendation,employee.training_recommendation');
    const lineManagerPlusTwoIds = lineManagerPlusTwo.map((j: any) => j.employee_code);

    const lineManagerPlusThree = await Employee.find({ manager_code: { $in: lineManagerPlusTwoIds }, calendar: calId, employee_upload_flag: true, "appraisal.status": { $ne: "excepted" } }).populate('appraisal.training_recommendation,employee.training_recommendation');

    res.status(StatusCodes.OK).json({
        lineManagerPlusThree,
        lineManagerPlusTwo,
        lineManagerPlusOne,
        lineManager,
        lineManagerIds, lineManagerPlusOneIds, lineManagerPlusTwoIds
    });
});



const previousAppraisal = asyncHandler(async (req: Request, res: Response) => {


    const { id } = req.params
    const { objective_group, objective_type, objective_description, training_recommendation, other_recommendation, appraiser_overall_feedback, potential } = req.body

    const employee = await Employee.findById(id)

    const emp = await Employee.findByIdAndUpdate(id, {
        $push: {
            previous_appraisal: {
                rating: employee.normalizer.normalizer_rating,
                calendar: employee.calendar,
                appraiser_code: employee.appraiser_code,
                reviewer_code: employee.reviewer_code,
                normalizer_code: employee.normalizer_code,
                section: employee.section,
                sub_section: employee.sub_section,
                division: employee.division,
                manager_code: employee.manager_code,
                employee_code: employee.employee_code,
                "appraisal.objective_group": objective_group,
                "appraisal.objective_type": objective_type,
                "appraisal.objective_description": objective_description,
                "appraisal.training_recommendation": training_recommendation,
                "appraisal.other_recommendation": other_recommendation,
                "appraisal.appraiser_overall_feedback": appraiser_overall_feedback,
                "appraisal.potential": potential,

            }
        },
        new: true
    })

    res.status(StatusCodes.OK).json({
        emp
    });
})




/*
populating 9 box based on calendar selected



for 9 box we need employee and rating
so we need ratings

create a query to get the previous rating


how to populate employee based on the calendar selected

filter employee based on calendar


 */


const addEmployeestoPrevioisAppraisal = asyncHandler(async (req: Request, res: Response) => {

    const { data } = req.body

    // const lineManager = await Employee.find({ _id:  "62ac2037c1c19127416aafef" })

    // const getEmployeesinAppraisal = await Employee.find({ calendar: "63f7a9bb72a021d4cebb3ea3" })
    const previousAppraisal = await PreviousAppraisal.insertMany(data)
    // const lineManagerPlusOne = await Employee.find({ manager_code: { $in: lineManager.map((j: any) => j.employee_code) } })
    // const Temp = lineManager.map((j: any) => j.employee_code)

    res.status(StatusCodes.OK).json({
        // lineManagerPlusOne,
        // lineManager
        //Temp
        previousAppraisal
    });

})


// const addEmployeestoPrevioisAppraisal = asyncHandler(async (req: Request, res: Response) => {
//
//     const {id} = req.body
//
//     const getEmployeesinAppraisal = await Employee.find({first_name:  "Kokab Hussain"})
//
//     // const  previousAppraisal = await PreviousAppraisal.insertMany({getEmployeesinAppraisal})
//
//     res.status(StatusCodes.CREATED).json({
//         success: true,
//         getEmployeesinAppraisal,
//         // previousAppraisal
//     })
//
// })
const updateSubsectionForEmployees = asyncHandler(async (req: Request, res: Response) => {
    const updateSubsection = await Employee.collection.updateMany({}, [{
        "$set": {
            "sub_section": "$sub section"
        }
    }])
    res.status(StatusCodes.OK).json({
        updateSubsection
    });

})


const checkRoleLogs = asyncHandler(async (req: Request, res: Response) => {
    const { pa_action_by, id } = req.body
    const updateEmployeeLogs = await Employee.findByIdAndUpdate(id, {
        $push: {
            activity_Log: {
                pa_action_by: pa_action_by
            }
        },
        new: true
    })
    res.status(StatusCodes.OK).json({
        updateEmployeeLogs
    });
})



export {
    createEmployee,
    getAllEmployees,
    getAllPAEmployees,
    addTemplateToEmployee,
    addRating,
    appraisal,
    getEmployeeById,
    getEmployeeByEmail,
    appraisalStatusFilter,
    updateEmployee,
    acceptReviewer,
    acceptReviewerRatings,
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
    totalAppraiserDetails,
    totalReviewerDetails,
    totalNormalizerDetails,
    employeeRejection,
    normalizerAcceptsEmployee,
    normalizerRejectsEmployee,
    employeeRejectionSave,
    employeeUpdateMany,
    appraiserAcceptsEmployee,
    appraiserRejectsEmployee,
    normalizerSubmitEmployeeRejection,
    attachmentsAppraiser,
    attachmentsAppraiserOverview,
    calculateRatings,
    attachmentsReviewer,
    attachmentsNormalizer,
    attachmentsEmployee,
    filterEmployeeByManagerCode,
    employeeAppraisalClose,
    statusBasedCount,
    getUnMappedEmployee,
    getUnMappedEmployeeLength,
    getEmployeeTemplate,
    getReviewerEmployee,
    removeAppraiserAttachments,
    removeAppraiserAttachmentsOverview,
    removeNormalizerAttachments,
    removeEmployeeAttachments,
    removeReviewerAttachments,
    appraiserDashboard,
    meetingNotesAttachmentsNormalizer,
    acceptNormalizerGradeException,
    acceptEmployeeGradeException,
    acceptEmployeeExcluded,
    rejectionAttachmentsAppraiser,
    removeRejectionAppraiserAttachments,
    appraiserAcceptsReviewerRating,
    reviewerAcceptsAppraiserRating,
    appraiserAcceptsEmployeeRating,
    employeeAcceptsAppraiserRating,
    acceptEmployeeRoleExceptions,
    acceptEmployeeRoleExceptionsDraft,
    acceptEmployeeCEORole,
    acceptEmployeeLeavers,
    acceptEmployeeLeaversDraft,
    lineManagerEmployee,
    lineManagerPlusOneEmployee,
    acceptReviewerEmployeeRejection,
    acceptEmployeeNamesChange,
    acceptEmployeeNamesChangeDraft,

    addEmployeestoPrevioisAppraisal,

    getAllMappedEmployee,
    updateSubsectionForEmployees,
    removeBulkEmployeesfromRoleException,
    updateEmployeeRoles,
    getEmployeeByIdForViewPA,
    acceptNormalizerGradeExceptionBulk,
    getPAcalendarEmployeeEmails,
    removeMeetingNotesNormalizerAttachments,
    totalAppraiserDetailsEmail,
    totalNormalizerDetailsEmail,
    totalReviewerDetailsEmail,
    checkRoleLogs

}
