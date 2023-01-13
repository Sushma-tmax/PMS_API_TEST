import asyncHandler from "../../middleware/asyncHandler";
import { Request, Response } from "express";
import Ratings from "../../models/Ratings/Ratings";
import RatingScaleDescription from "../../models/Ratings/RatingScaleDescription";
import AppraisalCalender from "../../models/AppraisalCalender";
import { StatusCodes } from "http-status-codes";
import { ObjectID } from "mongodb"
// var ObjectID = require()
const createRatings = asyncHandler(async (req: Request, res: Response) => {
    const newRating = await Ratings.create(req.body);
    res.status(201).json({
        success: true,
        data: newRating
    });
})




const getAllRatings = asyncHandler(async (req: Request, res: Response) => {
    const ratings = await Ratings.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: ratings
    });
})

const getRating = asyncHandler(async (req: Request, res: Response) => {
    const rating = await Ratings.findById(req.params.id);
    if (!rating) {
        return res.status(404).json({
            success: false,
            error: 'Rating not found'
        });
    }
    res.status(200).json({
        success: true,
        data: rating
    });
})
const updateRatings = asyncHandler(async (req: Request, res: Response) => {
    const rating = await Ratings.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false
    });
    if (!rating) {
        return res.status(404).json({
            success: false,
            error: 'Rating not found'
        });
    }
    res.status(200).json({
        success: true,
        data: rating
    });
})

const deleteRatings = asyncHandler(async (req: Request, res: Response) => {
    const rating = await Ratings.findByIdAndDelete(req.params.id);
    if (!rating) {
        return res.status(404).json({
            success: false,
            error: 'Rating not found'
        });
    }
    res.status(200).json({
        success: true,
        data: {}
    });
})

const createRatingScaleDescription = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body)

    const [rating] = req.body
    const rat = req.body

    const mapped = rat.map((j: any) => j.rating)

    const newRatingScaleDescription = await RatingScaleDescription.find({ rating: { $in: mapped } })

    if (newRatingScaleDescription.length > 0) {
        const temp = newRatingScaleDescription.map((j: any) => j.rating)

        res.status(400).json({
            success: false,
            message: "Rating" + " " + temp.toString() + " Already exist",
            data: rating,
            body: newRatingScaleDescription
        });
    } else if (newRatingScaleDescription.length === 0) {
        const newRatingScaleDescriptiondone = await RatingScaleDescription.insertMany(req.body);

        res.status(201).json({
            success: true,
            data: rating,
            body: newRatingScaleDescriptiondone
        });
    }


})


const getAllRatingScaleDescription = asyncHandler(async (req: Request, res: Response) => {
    const ratingScaleDescription = await RatingScaleDescription.find({}).populate('rating');
    res.status(200).json({
        success: true,
        data: ratingScaleDescription
    });
})
const getRatingScaleDescription = asyncHandler(async (req: Request, res: Response) => {
    const ratingScaleDescription = await RatingScaleDescription.findById(req.params.id).populate('rating');
    if (!ratingScaleDescription) {
        return res.status(404).json({
            success: false,
            error: 'RatingScaleDescription not found'
        });
    }
    res.status(200).json({
        success: true,
        data: ratingScaleDescription
    });
})

const updateRatingScaleDescription = asyncHandler(async (req: Request, res: Response) => {


    const { rating } = req.body
    const _id = new ObjectID(req.params.id)
    const newRatingScaleDescription = await RatingScaleDescription.find({
        $and: [
            { rating: rating },
            { '_id': { $ne: _id } }
        ]
    })
    console.log("newRatingScaleDescription", newRatingScaleDescription)
    if (newRatingScaleDescription.length > 0) {
        const temp = newRatingScaleDescription.map((j: any) => j.rating)

        res.status(400).json({
            success: false,
            message: "Rating" + " " + temp.toString() + " already exist",

            body: newRatingScaleDescription
        });
    }
    //  else  if (newRatingScaleDescription.length === 0)
    else if (newRatingScaleDescription.length  === 0) {
        const ratingScaleDescription = await RatingScaleDescription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            body: ratingScaleDescription
        });
    }

    // const ratingScaleDescription = await RatingScaleDescription.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // });

    // res.status(200).json({
    //     success: true,
    //     body: ratingScaleDescription
    // });
    // const ratingScaleDescription = await RatingScaleDescription.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // });
    // if (!ratingScaleDescription) {
    //     return res.status(404).json({
    //         success: false,
    //         error: 'RatingScaleDescription not found'
    //     });
    // }
    // res.status(200).json({
    //     success: true,
    //     data: ratingScaleDescription
    // });
})

const deleteRatingScaleDescription = asyncHandler(async (req: Request, res: Response) => {

    const ifExist = await AppraisalCalender.exists({ "rating.name": req.params.id })

    if (ifExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "This Rating Scale is used in the performance appraisal and cannot be deleted."
        });
    }

    if (!ifExist) {
        const ratingScaleDescription = await RatingScaleDescription.findByIdAndDelete(req.params.id);

        if (!ratingScaleDescription) {
            return res.status(404).json({
                success: false,
                error: 'RatingScaleDescription not found'
            });
        }

    }




    res.status(200).json({
        success: true,
        data: {},
        ifExist
    });
})

export {
    createRatings,
    getAllRatings,
    createRatingScaleDescription,
    getAllRatingScaleDescription,
    getRatingScaleDescription,
    deleteRatings,
    deleteRatingScaleDescription,
    getRating,
    updateRatings,
    updateRatingScaleDescription
}
