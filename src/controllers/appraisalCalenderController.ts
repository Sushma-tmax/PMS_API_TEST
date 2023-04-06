import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";
import AppraisalCalender from "../models/AppraisalCalender";
import { StatusCodes } from "http-status-codes";
import Template from "../models/Template";
import { Employee } from "../models";
import Calender from "../models/Calender";
import { BadRequestError } from "../errors";
import mongoose from "mongoose";
import RatingScaleDescription from "../models/Ratings/RatingScaleDescription";
import schedule from 'node-schedule'
import calender from "../models/Calender";
import PreviousAppraisal from "../models/PreviousAppraisal";


const validateTemplate = asyncHandler(async (req: Request, res: Response) => {
    const { template } = req.body;
    const validateTemplate = await Template.findOne({ _id: template });
    const {
        name: templateName,
        other_recommendation,
        training_recommendation,
        position,
        calendar,
        weightage
    } = validateTemplate;

    const weightageValidator = (a: any) => {
        return a.map((j: any) => !!j.value)
    }

    if (other_recommendation.length <= 0 || training_recommendation.length <= 0 || position.length <= 0 || (weightageValidator(weightage.objective_description)[0] === false)) {
        // throw new BadRequestError('Please fill all the required fields')
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Weightage,Position,Other Recommendation,Training Recommendation must not be empty!! ',
            wro: weightageValidator(weightage.objective_description),
            obj: weightage.objective_description

        })
    }
})

const createAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {
    const {
        template,
        calendar: calendarID
    } = req.body;

    const validateTemplate = await Template.findOne({ _id: template });
    const {
        name: templateName,
        other_recommendation,
        training_recommendation,
        // position,
        calendar,
        weightage,
        feedback_questionnaire
    } = validateTemplate;
    const validateCalendar = await Calender.findOne({ _id: calendarID });
    console.log("calendar ", calendarID)


    const { name: calendarName } = validateCalendar

    // if (other_recommendation && training_recommendation && position && calendar) {
    //     throw new BadRequestError('Please fill all the required fields')
    // }

    // if (other_recommendation.length > 0 && training_recommendation.length > 0 && position.length > 0 && calendar) {



    // const weightageValidator = (a:any) => a.map((j:any) => j.value ? true : false)  => ()


    // const checkValidation = () => {
    //     weightageValidator(weightage.objective_group)
    //     weightageValidator(weightage.objective_type)
    //     weightageValidator(weightage.objective_description)
    // }


    // const len = other_recommendation.length
    // if (calender) {
    //     const {start_date, end_date} = await Calender.findById(calender);
    // }

    const name = `${templateName} ${calendarName} Appraisal 2022`;

    const checkNameExists = await AppraisalCalender.findOne({ name })

    if (checkNameExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Appraisal template Calendar already exists',
            // wro: weightageValidator(weightage.objective_description)
        })
    }

    const Acalender = await AppraisalCalender.create({
        name,
        calendar: calendarID,
        template,
        other_recommendation,
        training_recommendation,
        // position,
        weightage,
        feedback_questionnaire
    })

    res.status(StatusCodes.CREATED).json({
        success: true,
        // wro:  weightageValidator(weightage.objective_description)
        Acalender
        // templateName,
        // calenderName
    });


})


const addPositionsToAppraisalCalendar = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { employee } = req.body
    const data = employee
    console.log(data)

    // const updatedCalendarr = await AppraisalCalender.findById(id)

    const updatedCalendar = await AppraisalCalender.findByIdAndUpdate(id,
        {
            $push: {
                position: { $each: employee },
            }
        }, { new: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });


})

const removePositionsToAppraisalCalendar = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { employee } = req.body
    const data = employee.map((j: any) => j.name)
    console.log(data)


    const updatedCalendar = await AppraisalCalender.findByIdAndUpdate(id,
        {
            $pull: {
                position: { "name": { $in: data } },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})


const getAllAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {

    const calenders = await AppraisalCalender.find().sort({ createdAt: -1 }).populate('template').populate('calendar').populate('position.name');

    res.status(StatusCodes.OK).json({
        success: true,
        data: calenders,
    });
})

const getRecentAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    const calenders = await AppraisalCalender.find({ updatedAt: { $gte: start } }).sort({ updatedAt: -1 }).populate('template').populate('calendar').populate('position.name');

    res.status(StatusCodes.OK).json({
        success: true,
        data: calenders,
    });
})


const getAppraisalCalendarForTemplate = asyncHandler(async (req: Request, res: Response) => {
    const { templateId } = req.body
    const calenders = await AppraisalCalender.find({
        status: "Draft",
        template: templateId
    }).sort({ updatedAt: -1 }).count();  

    res.status(StatusCodes.OK).json({
        success: true,
        data: calenders      
    });
})

const getAppraisalCalenderById = asyncHandler(async (req: Request, res: Response) => {

    const calender = await AppraisalCalender.findById(req.params.id);

    if (!calender) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "No PA Calender found",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: calender,
    });
})

const updateAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {
    const {
        template,
        calendar: calendarID
    } = req.body;

    const validateTemplate = await Template.findOne({ _id: template });
    const validateCalendar = await Calender.findOne({ _id: calendarID });

    const { name: templateName } = validateTemplate;
    const { name: calendarName } = validateCalendar;

    const name = `${templateName} ${calendarName} Appraisal 2022`;
    console.log(name, "name")
    const checkNameExists = await AppraisalCalender.findOne({ name })

    if (checkNameExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Appraisal template Calendar already exists',
            // wro: weightageValidator(weightage.objective_description)
        })
    }

    const calender = await AppraisalCalender.findByIdAndUpdate(req.params.id,
        {
            name,
            calendar: calendarID,
            template
        }, {
        new: true,
        runValidators: true,
    });

    if (!calender) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "No PA Calender found",
        });
    }

    res.status(StatusCodes.OK).json({
        success: true,
        data: calender,
    });
})

// const deleteAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {
//
//     const calender = await AppraisalCalender.findByIdAndDelete(req.params.id);
//
//     if (!calender) {
//         return res.status(StatusCodes.NOT_FOUND).json({
//             success: false,
//             error: "No calender found",
//         });
//     }
//
//     res.status(StatusCodes.OK).json({
//         success: true,
//         data: calender,
//     });
// })


const startAppraisal = asyncHandler(async (req: Request, res: Response) => {


    // const appraisalinCurrentCalendar = await  AppraisalCalender.find({})

    const { template, calendar, position } = await AppraisalCalender.findById(req.params.id);
    const { _id: templateId } = template;
    // const news  = new mongoose.Types.ObjectId(calender)
    const getIdFromRating = (arr: any) => {
        return arr.map((item: any) => {
            return {
                name: item._id,
            }
        })
    }

    const ratingScale = await RatingScaleDescription.find()

    const update = await AppraisalCalender.findByIdAndUpdate(req.params.id, {
        status: 'active',
        rating: getIdFromRating(ratingScale)

    }, {
        new: true,
        runValidators: true,
    });
    console.log(templateId)
    // template.forEach(templateId => {
    updateTemplateForPositions(templateId, calendar, ratingScale, req, res, position)
    // })

})

const updateTemplateForPositions = async (template, calendar, ratingScale, req, res, position) => {

    const { weightage, training_recommendation, other_recommendation, feedback_questionnaire, potential } = await Template.findById(template);
    console.log(position, "position", template)
    const getIdFromRating = (arr: any) => {
        return arr.map((item: any) => {
            return {
                name: item._id,
            }
        })
    }
    const filterExceptions = position?.filter((i: any) => {
        return i.isExcluded === false && i.isLeavers === false && i.isCEORole === false
    })
    console.log(filterExceptions, "filterExceptionsfilterExceptions")
    const getName = (arr: any) => {
        return arr.map((e: any) => e.name)
    }

    const getProbationEmployee = (arr: any) => {
        console.log(arr)
        console.log(arr.filter((e: any) => {
            console.log(e)
        }), 'the probation')

        return console.log(arr.filter((e: any) => e))
    }


    getProbationEmployee(position)

    const getNameRec = (arr: any) => {
        return arr.map((item: any) => {
            return {
                name: item.name,
                isChecked: false
            }

        })
    }

    const appraisal = {
        objective_group: weightage.objective_group,
        objective_type: weightage.objective_type,
        objective_description: weightage.objective_description,
        training_recommendation: getNameRec(training_recommendation),
        other_recommendation: getNameRec(other_recommendation),
        feedback_questionnaire: getNameRec(feedback_questionnaire),
        potential: potential,
        rating: getIdFromRating(ratingScale)
    }

    const probationAppraisal = {
        objective_group: weightage.objective_group,
        objective_type: weightage.objective_type,
        objective_description: weightage.objective_description,
        training_recommendation: getNameRec(training_recommendation),

    }

    // const probationEmployee = await Employee.updateMany({_id: {$in: getProbationEmployee(position)}},
    //     {
    //         $set: {
    //             appraisal_template: probationAppraisal,
    //             reviewerIsChecked: false,
    //             reviewerIsDisabled: true,
    //             normalizerIsChecked: false,
    //             normalizerIsDisabled: true,
    //             appraiserIsDisabled: true,
    //             appraiserIsChecked: false,
    //             calendar:new mongoose.Types.ObjectId(calender),
    //             appraisal: {
    //                 appraiser_status: 'pending',
    //                 status: 'in-progress',
    //                 objective_group: weightage.objective_group,
    //                 objective_type: weightage.objective_type,
    //                 objective_description: weightage.objective_description,
    //                 appraiser_rating: 0,
    //                 training_recommendation: [],
    //                 other_recommendation: [],
    //                 other_recommendation_comments: '',
    //                 training_recommendation_comments: '',
    //                 feedback_questions: [],
    //                 area_of_improvement: []
    //
    //             },
    //             reviewer: {
    //                 status: 'in-progress',
    //                 reviewer_status: 'pending',
    //                 objective_group: weightage.objective_group,
    //                 objective_type: weightage.objective_type,
    //                 objective_description: weightage.objective_description,
    //                 reviewer_rating: 0,
    //                 reviewer_rejected_value: [],
    //                 training_recommendation: [],
    //                 other_recommendation: [],
    //                 other_recommendation_comments: '',
    //                 training_recommendation_comments: '',
    //                 feedback_questions: [],
    //                 area_of_improvement: []
    //
    //             },
    //             normalizer: {
    //                 status: 'in-progress',
    //                 objective_group: weightage.objective_group,
    //                 objective_type: weightage.objective_type,
    //                 objective_description: weightage.objective_description,
    //                 normalizer_status: 'pending',
    //                 normalizer_rating: 0,
    //                 normalizer_rejected_value: [],
    //                 training_recommendation: [],
    //                 other_recommendation: [],
    //                 other_recommendation_comments: '',
    //                 training_recommendation_comments: '',
    //                 feedback_questions: [],
    //                 area_of_improvement: [],
    //
    //             }
    //         },
    //
    //     },
    //     )


    // const checkEmployeeStatus = await Employee.find({ _id: { $in: getName(position) }, "appraisal.status": 'in-progress' })

    // if (checkEmployeeStatus.length > 0) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         // success: true,
    //         // data: position,
    //         // appraisal,
    //         // position,
    //         "message": "Employee Already Exist in appraisal"
    //     });

    // }

    const employee = await Employee.updateMany({
        _id: { $in: getName(position) },
        "isLeavers": false,
        "isExcluded": false,
        "isCEORole": false
    },
        {
            $set: {
                appraisal_template: appraisal,
                reviewerIsChecked: false,
                reviewerIsDisabled: true,
                normalizerIsChecked: false,
                normalizerIsDisabled: true,
                appraiserIsDisabled: true,
                appraiserIsChecked: false,
                calendar: new mongoose.Types.ObjectId(calendar),
                appraisal: {
                    appraiser_status: 'pending',
                    status: 'not-started',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                    appraiser_rating: 0,
                    training_recommendation: [],
                    other_recommendation: [],
                    other_recommendation_comments: '',
                    training_recommendation_comments: '',
                    feedback_questions: [],
                    area_of_improvement: [],
                    attachments: [],                    

                },
                current_rating : {
                    overall_rating : 0,
                },

                appraisal_previous_submission: {
                    appraiser_rating: 0,
                    appraiser_status: 'pending',
                    pa_status: 'not-started',
                    potential: false,
                    status: 'not-started',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                },

                reviewer: {
                    status: 'not-started',
                    reviewer_status: 'pending',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                    reviewer_rating: 0,
                    reviewer_rejected_value: [],
                    training_recommendation: [],
                    other_recommendation: [],
                    other_recommendation_comments: '',
                    training_recommendation_comments: '',
                    feedback_questions: [],
                    area_of_improvement: [],
                    attachments: []
                },

                reviewer_previous_submission: {
                    reviewer_rating: 0,
                    reviewer_status: 'pending',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                },

                normalizer: {
                    status: 'not-started',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                    normalizer_status: 'pending',
                    normalizer_rating: 0,
                    normalizer_rejected_value: [],
                    training_recommendation: [],
                    other_recommendation: [],
                    other_recommendation_comments: '',
                    training_recommendation_comments: '',
                    feedback_questions: [],
                    area_of_improvement: [],
                    attachments: []
                },

                normalizer_previous_submission: {
                    normalizer_rating: 0,
                    normalizer_status: 'pending',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                },

                employee: {},

                employee_previous_submission: {
                    employee_rating: 0,
                    employee_status: 'pending',
                    objective_group: weightage.objective_group,
                    objective_type: weightage.objective_type,
                    objective_description: weightage.objective_description,
                },

            },

        },
        { multi: true });

    // const template = await Template.findById(req.body.templateId);

    res.status(StatusCodes.OK).json({
        // success: true,
        // data: position,
        appraisal,
        position,
        data: weightage.objective_description,
        employee,
        calendar,
        filterExceptions,
        rating: ratingScale,
        // prob:probationEmployee
    });
}

const deleteAppraisalCalender = asyncHandler(async (req: Request, res: Response) => {
    const { template } = await AppraisalCalender.findById(req.params.id);

    const update = await AppraisalCalender.findByIdAndUpdate(req.params.id, {
        status: 'active'
    }, {
        new: true,
        runValidators: true,
    });

    console.log(template)


    const { weightage, position, training_recommendation, other_recommendation } = await Template.findById(template);


    const getName = (arr: any) => {
        return arr.map((e: any) => e.name)
    }

    const getNameRec = (arr: any) => {
        return arr.map((item: any) => {
            return {
                name: item.name,
                isChecked: false
            }

        })
    }


    const appraisal = {
        objective_group: [],
        objective_type: [],
        objective_description: [],
        training_recommendation: [],
        other_recommendation: []
    }

    const employee = await Employee.updateMany({ _id: { $in: getName(position) } },
        {
            $set: {
                reviewerIsChecked: false,
                reviewerIsDisabled: false,
                normalizerIsChecked: false,
                normalizerIsDisabled: false,
                appraisal_template: appraisal,
                appraisal: {
                    status: 'not-started',
                    objective_group: [],
                    objective_type: [],
                    objective_description: [],
                    training_recommendation: [],
                    other_recommendation: [],
                    appraiser_rating: 0,
                    appraisal_acceptance: false,
                },


            },

        },
        { multi: true });

    // const template = await Template.findById(req.body.templateId);
    const calender = await AppraisalCalender.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
        // success: true,
        // data: position,
        // appraisal,
        // position,
        employee
    });
})



const startProbationAppraisal = asyncHandler(async (req: Request, res: Response) => {

    const employee = await Employee.find({ _id: '62a94e8368ab2d3848e6f9f1' })
    console.log(employee[0]._id)

    // @ts-ignore
    const { name } = employee

    const {
        weightage,
        position,
        training_recommendation,
        other_recommendation
    } = await Template.findById('62a9be34ee9b7b39044d2e52');


    res.status(StatusCodes.OK).json({
        // success: true,
        // data: position,
        // appraisal,
        // position,
        probation: employee
    })
})




let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();

const today_date = year + "-" + month + "-" + date

export const job = schedule.scheduleJob('* * * * *', async () => {

    //get current appraisal calendar then check there dates  and match it
    //if current data = end data then change the status

    // const appraisalCalen = await AppraisalCalender

    const getTodayCalendars = await Calender.find({ end_date: today_date }, '_id')

    const getAppraislaCalendar = await AppraisalCalender.find({ calendar: { $in: getTodayCalendars } })

    const updateStatus = await AppraisalCalender.updateMany({ calendar: { $in: getTodayCalendars } }, { status: "completed" })

    // const getAppraisal = await AppraisalCalender.findById({_id: "63a15b5e1ed678e5e7db8d05"})
    // console.log(getAppraisal.position.map((k:any) => k.name), 'workeddddd')

    // const getEmployee = await  Employee.find({_id: {$in:  getAppraisal.position.map((k:any) => k.name)}})

    // console.log(getEmployee)




    console.log('sdfsdf', getTodayCalendars, "appraisal" + getAppraislaCalendar);
});
const getAppraisalCalendarofCurrentYear = asyncHandler(async (req: Request, res: Response) => {

    const getTodayCalendars = await Calender.find({ star_date: { $gte: year } }, '_id')


    // const getAppraislaCalendar  = await AppraisalCalender.find({calendar: {$in: getTodayCalendars}}).select('createdAt,calendar,template').sort({ createdAt: -1 }).populate('calendar').populate('template');
    const getAppraislaCalendar = await AppraisalCalender.aggregate([
        // { $match: { calendar: { $in: getTodayCalendars } } },
        {
            $project: {
                createdAt: 1,
                calendar: 1,
                template: 1,
                positionCount: { $cond: { if: { $isArray: "$position" }, then: { $size: "$position" }, else: 0 } }
            }
        },
        {
            $sort: { "createdAt": -1 }
        },

    ])

    const getAppraisalCalendarData = await AppraisalCalender.populate(getAppraislaCalendar, [{ path: "calendar" }, { path: "template" }])


    res.status(StatusCodes.OK).json({
        // success: true,
        // data: position,
        // appraisal,
        // position,
        data: getAppraislaCalendar
    })

})

const appraisalCalendarEmployeeValidation = asyncHandler(async (req: Request, res: Response) => {

    const getAppraisalCalendar = await AppraisalCalender.find({ calendar: req.params.id })

    const checkIfEmpty = getAppraisalCalendar.map((j: any) => {
        if (j.position.length <= 0) {
            // throw  new Error(`Appraisal Calendar Doesn't have employee Mapped`)
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Appraisal Calendar Doesn't have employee Mapped" });
        }
    })
    res.status(StatusCodes.OK).json({ message: "OK", data: checkIfEmpty });

})


const appraisalCalendarClose = asyncHandler(async (req: Request, res: Response) => {

    const {id}  =  req.body

    const calendar = await Calender.findByIdAndUpdate(id, {status: "Closed", isActive: false} )

    const appraisalCalendar = await AppraisalCalender.updateMany({calendar: id}, {status: "Closed"} )

    // const employeeFromCalendar  = await AppraisalCalender.find({_id: appraisal_calendar_id})
    // const employee = employeeFromCalendar.map((data:any) => {
    //     return data.position.map((k: any) => k.name.toString())
    // }).flat()


// @ts-ignore

const updatePreviousRating = await Employee.collection.updateMany({}, [{
    "$set": {
        "previous_rating":  "$appraisal.pa_rating"
    }
}])
//     const addEmployeetoPreviousAppraisal = PreviousAppraisal.insertMany(emp)

    res.status(StatusCodes.OK).json({
        // calendar,
        // appraisalCalendar,
        // updateEmployee,
        // addEmployeetoPreviousAppraisal
        // normalizer_rating,
        updatePreviousRating,
        calendar,
        appraisalCalendar
    })

})

export {
    createAppraisalCalender,
    deleteAppraisalCalender,
    getAppraisalCalenderById,
    getAllAppraisalCalender,
    getRecentAppraisalCalender,
    updateAppraisalCalender,
    startAppraisal,
    startProbationAppraisal,
    addPositionsToAppraisalCalendar,
    removePositionsToAppraisalCalendar,
    getAppraisalCalendarofCurrentYear,
    appraisalCalendarEmployeeValidation,
    getAppraisalCalendarForTemplate,
    appraisalCalendarClose
}