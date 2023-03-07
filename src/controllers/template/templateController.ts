import asyncHandler from "../../middleware/asyncHandler";
import {Request, Response} from "express";
import Template from "../../models/Template";
import {StatusCodes} from "http-status-codes";
import template from "../../models/Template";
import mongoose from "mongoose";
import { BadRequestError } from "../../errors";
import AppraisalCalender from "../../models/AppraisalCalender";

const createTemplate = asyncHandler(async (req: Request, res: Response) => {
    const {name} = req.body
    const checkNameExists = await Template.findOne({name})
    console.log(checkNameExists)

    if (checkNameExists) {
        throw new BadRequestError('Template name  already exists');
    }
    const newTemplate = await Template.create(req.body);

    res.status(StatusCodes.CREATED).json({
        newTemplate
    });
});


const deleteTemplate = asyncHandler(async (req: Request, res: Response) => {


    const ifExist = await AppraisalCalender.exists({template: req.params.id})


    if(ifExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "This Template is used in the performance appraisal and cannot be deleted."
        });
    }

    if(!ifExist) {
        const template = await Template.findByIdAndDelete(req.params.id);
    }

    if (!template) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Template not found"
        });
    }
    res.status(StatusCodes.OK).json({
        message: "Template deleted"
    });
});


const addObjective = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        weightage
    } = req.body

    const checkNameExist = await Template.findOne({
        name
    });

    if(checkNameExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Template name already exists"
        });
    }
    const template = await Template.create(req.body);

    // console.log(req.body)
    // weightage.map((data: any) => {
    //     // console.log(data)
    //     data.objective_group.map((data: any) => {
    //         console.log(data, '2')
    //     })
    // })


    // console.log(objective_group)

    res.status(StatusCodes.CREATED).json({

        template
    });
});


const addWeightage = asyncHandler(async (req: Request, res: Response) => {
    const {
        name,
        weightage
    } = req.body

    const template = await Template.findOne({"weightage.objective_group.objective_type.objective_description": {$elemMatch: {value: 99}}});

    // const temp = Template.updateOne({_id: req.params.id}, {
    //
    // })

    res.status(StatusCodes.CREATED).json({
        template
    });
});


const addPosition = asyncHandler(async (req: Request, res: Response) => {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(StatusCodes.OK).json({
        template
    });
});


const getAllTemplates = asyncHandler(async (req: Request, res: Response) => {

    const templates = await Template.find({}).sort({createdAt: -1}).populate({
            path: 'weightage',
            populate: {
                path: 'objective_group.name',
                // path: 'objective_group.objective_type',
                // path: 'objective_group.objective_type.objective_description'
            }
        }).populate({
            path: 'weightage',
            populate: {
                path: 'objective_type.name',
                // populate: {
                //     path: 'objective_description.name'
                // }
            }
        }).populate({
            path: 'weightage',
            populate: {
                path: 'objective_description.name'
            }
        }).populate({
            path: 'training_recommendation.name'
        }).populate({
            path: 'other_recommendation.name'
        })
        // .populate({
        //     path: 'position.name'
        // })
        .populate(
            {
                path: 'calendar'
            }
        ).populate(
            {
                path: 'feedback_questionnaire.name'
            }
        )
    ;


    res.status(StatusCodes.OK).json({
        templates
    });
});

const getTemplate = asyncHandler(async (req: Request, res: Response) => {

    const template = await Template.findById(req.params.id).populate({
            path: 'weightage',
            populate: {
                path: 'objective_group.name',
            }
        }).populate({
            path: 'weightage',
            populate: {
                path: 'objective_type.name',
            }
        }).populate({
            path: 'weightage',
            populate: {
                path: 'objective_description.name'
            }
        }).populate({
            path: 'training_recommendation.name'
        }).populate({
            path: 'other_recommendation.name'
        }).populate({
            path: 'position.name'
        }).populate(
            {
                path: 'calendar'
            }
        ).populate(
            {
                path: 'feedback_questionnaire.name'
            }
        )
    ;

    if (!template) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: 'No template found'
        });
    }

    res.status(StatusCodes.OK).json({
        template
    });
});

const updateTemplate = asyncHandler(async (req: Request, res: Response) => {

    const template = await Template.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(req.params.id),
        },
        req.body,
        {
            new: true,
            returnOriginal: false,
            runValidators: true
        });

    console.log(req.body, 'tempp``````')

    if (!template) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: 'No template found'
        });
    }

    res.status(StatusCodes.OK).json({
        template
    });
});

const addCalendar = asyncHandler(async (req: Request, res: Response) => {
    const {template, calendar} = req.body

    const getName = (arr: any) => {
        return arr.map((e: any) => e.name)
    }

    const updatedTemplate = await Template.updateMany({_id: {$in: template}},
        {
            $set: {
                calendar: calendar
            }
        })

    res.status(StatusCodes.OK).json({
        updatedTemplate
    });

})

const filterTemplate = asyncHandler(async (req: Request, res: Response) => {

    const template = await Template.find()
    
    const weightageValidator = (a: any) => {
        return a.map((j: any) => !!j.value)
    }

    const filterTemplate = template.filter((e: any) => {
        return weightageValidator(e.weightage.objective_description).length>0
    })

    res.status(StatusCodes.OK).json({
        data: filterTemplate,
        // temp: template
    });
})

// const getTemplates = asyncHandler(async (req: Request, res: Response) => {
//
//     const templates = await Template.find({})
//         .populate('weightage.objective_group.name')
//         .populate('weightage.objective_group.objective_type')
//         // .populate(' weightage.objective_group.objective_type.objective_description');
//
//
//     res.status(StatusCodes.OK).json({
//         success: true,
//         data: templates
//     });
// });
export {
    createTemplate,
    getAllTemplates,
    getTemplate,
    updateTemplate,
    addObjective,
    addWeightage,
    addPosition,
    deleteTemplate,
    addCalendar,
    filterTemplate
};
