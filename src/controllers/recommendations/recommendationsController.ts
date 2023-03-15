import asyncHandler from "../../middleware/asyncHandler";
import {Request, Response} from "express";
import TrainingRecommendation from "../../models/Recommendation/TrainingRecommendation";
import OtherRecommendation from "../../models/Recommendation/OtherRecommendation";
import Template from "../../models/Template";
import {StatusCodes} from "http-status-codes";

const createTrainingRecommendation = asyncHandler(async (req: Request, res: Response) => {

    const newTrainingRecommendation = await TrainingRecommendation.create(req.body);

    res.status(200).json({
        success: true,
        data: newTrainingRecommendation
    });


});


const getAllTrainingRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const trainingRecommendation = await TrainingRecommendation.find().sort({updatedAt: -1});

    res.status(200).json({
        success: true,
        data: trainingRecommendation
    });
});

const getTrainingRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const trainingRecommendation = await TrainingRecommendation.findById(req.params.id);

    if (!trainingRecommendation) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: trainingRecommendation
    });
});

const updateTrainingRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const trainingRecommendation = await TrainingRecommendation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!trainingRecommendation) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: trainingRecommendation
    });
});


const deleteTrainingRecommendation = asyncHandler(async (req: Request, res: Response) => {

    // const ifExist = await Template.exists({"training_recommendation.name": req.params.id})
    const templateName : any = await Template.findOne({"training_recommendation.name": req.params.id})
    if (templateName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: `This item is mapped to  ${templateName.name} and a calendar and cannot be deleted.`
        });
    }

    if (!templateName) {
        const trainingRecommendation = await TrainingRecommendation.findByIdAndDelete(req.params.id);
    }


    // if (!trainingRecommendation) {
    //     return res.status(404).json({
    //         success: false,
    //         error: 'No recommendation found'
    //     });
    // }

    // await trainingRecommendation.remove();

    res.status(200).json({
        success: true,
        // ifExist,
        data: {}
    });
});

const createOtherRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const newOtherRecommendation = await OtherRecommendation.create(req.body);

    res.status(200).json({
        success: true,
        data: newOtherRecommendation
    });
});

const getAllOtherRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const otherRecommendation = await OtherRecommendation.find().sort({updatedAt: -1});

    res.status(200).json({
        success: true,
        data: otherRecommendation
    });
});

const getOtherRecommendaion = asyncHandler(async (req: Request, res: Response) => {
    const otherRecommendation = await OtherRecommendation.findById(req.params.id);

    if (!otherRecommendation) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: otherRecommendation
    });
});

const updateOtherRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const otherRecommendation = await OtherRecommendation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!otherRecommendation) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: otherRecommendation
    });
});

const deleteOtherRecommendation = asyncHandler(async (req: Request, res: Response) => {
    const otherRecommendation = await OtherRecommendation.findById(req.params.id);


    // const ifExist = await Template.exists({"other_recommendation.name": req.params.id})
    const templateName : any = await Template.findOne({"other_recommendation.name": req.params.id})

    if (templateName) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: `This item is mapped to ${templateName.name} and a calendar and cannot be deleted.`
        });
    }

    if (!templateName) {
        const trainingRecommendation = await TrainingRecommendation.findByIdAndDelete(req.params.id);
    }


    if (!otherRecommendation) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    await otherRecommendation.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

export {
    createTrainingRecommendation,
    getAllTrainingRecommendation,
    createOtherRecommendation,
    getAllOtherRecommendation,
    deleteOtherRecommendation,
    deleteTrainingRecommendation,
    getTrainingRecommendation,
    getOtherRecommendaion,
    updateOtherRecommendation,
    updateTrainingRecommendation
};
