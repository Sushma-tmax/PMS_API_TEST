import asyncHandler from "../middleware/asyncHandler";
import {Request, Response} from "express";
import FeedBackQuestionarie from "../models/FeedBackQuestionarie";

const createFeedBackQuestionarie = asyncHandler(async (req: Request, res: Response) => {
    const newFeedBackQuestionarie = await FeedBackQuestionarie.create(req.body);

    res.status(200).json({
        success: true,
        data: newFeedBackQuestionarie
    });
});

const getAllFeedBackQuestionarie = asyncHandler(async (req: Request, res: Response) => {
    const feedBackQuestionarie = await FeedBackQuestionarie.find().sort({createdAt: -1});

    res.status(200).json({
        success: true,
        data: feedBackQuestionarie
    });
});

const getFeedBackQuestionarie = asyncHandler(async (req: Request, res: Response) => {
    const feedBackQuestionaire = await FeedBackQuestionarie.findById(req.params.id);

    if (!feedBackQuestionaire) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: feedBackQuestionaire
    });
});

const updateFeedBackQuestionarie = asyncHandler(async (req: Request, res: Response) => {
    const feedBackQuestionaire = await FeedBackQuestionarie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!feedBackQuestionaire) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    res.status(200).json({
        success: true,
        data: feedBackQuestionaire
    });
});

const deleteFeedBackQuestionarie = asyncHandler(async (req: Request, res: Response) => {
    const feedBackQuestionaire = await FeedBackQuestionarie.findById(req.params.id);

    if (!feedBackQuestionaire) {
        return res.status(404).json({
            success: false,
            error: 'No recommendation found'
        });
    }

    await feedBackQuestionaire.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});


export {
    createFeedBackQuestionarie,
    getAllFeedBackQuestionarie,
    getFeedBackQuestionarie,
    updateFeedBackQuestionarie,
    deleteFeedBackQuestionarie
};
