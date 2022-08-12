import asyncHandler from "../middleware/asyncHandler";
import {Request, Response} from "express";
import {Employee} from "../models";
import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";

const addRating = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body
    // {"appraisal.objective_group.objective_type.objective_description._id": "6207ec6ac1226d3f36fc4"}
    const employee = await Employee.updateOne({
            "_id": "6204935ebca89023952f2da9",
            "appraisal.objective_group._id": ("6207ec6a8bfc1226d3f36fb1")
        }, {

            $set: {
                "appraisal.objective_group.$.value": 4
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
            path: 'appraisal.objective_group',
            populate: {
                path: 'objective_type.name',
            }
        }).populate({
            path: 'appraisal.objective_group.objective_type',
            populate: {
                path: 'objective_description.name'
            }
        })


    res.status(StatusCodes.OK).json({

        employee
    });
})

const reading = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body
    // {"appraisal.objective_group.objective_type.objective_description._id": "6207ec6ac1226d3f36fc4"}
    const employee = await Employee.find({

            // "appraisal.objective_group.value": "23"
            "appraisal.status": "in progress"
        }
        // {"appraisal.objective_group.objective_type.value": 1}
    )
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_group.name',
            }
        }).populate({
            path: 'appraisal.objective_group',
            populate: {
                path: 'objective_type.name',
            }
        }).populate({
            path: 'appraisal.objective_group.objective_type',
            populate: {
                path: 'objective_description.name'
            }
        })

    res.status(StatusCodes.OK).json({
        employee
    });
})

const reading2 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body
    // {"appraisal.objective_group.objective_type.objective_description._id": "6207ec6ac1226d3f36fc4"}
    const employee = await Employee.find({

            // "appraisal.objective_group.value": "23"
            "appraisal.objective_group.objective_type.objective_description.name": "620957b9c453d7c1c46b8729"
        }
        // {"appraisal.objective_group.objective_type.value": 1}
    )


    res.status(StatusCodes.OK).json({
        employee
    });
})

const reading3 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body
    // {"appraisal.objective_group.objective_type.objective_description._id": "6207ec6ac1226d3f36fc4"}
    const employee = await Employee.findOneAndUpdate({
            "_id": "6204935ebca89023952f2da9",

            // "appraisal.objective_group.value": "23"
            // "appraisal.objective_group.objective_type.objective_description.name":  "620957b9c453d7c1c46b8729"
        },{

            $set: {
                "appraisal.$[objective_group].value": 123
            }

        },
        {

            arrayFilters: [{'objective_group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")}]

        }
        // {"appraisal.objective_group.objective_type.value": 1}
    )
        .populate({
            path: 'appraisal',
            populate: {
                path: 'objective_group.name',
            }
        }).populate({
            path: 'appraisal.objective_group',
            populate: {
                path: 'objective_type.name',
            }
        }).populate({
            path: 'appraisal.objective_group.objective_type',
            populate: {
                path: 'objective_description.name'
            }
        })

    res.status(StatusCodes.OK).json({
        employee
    });
})


const updateValue = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": "6204935ebca89023952f2da9",


            '$elemMatch': {
                "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
                "name": "61fe1f3bb2fa7bad1aaa81c4"
            },
        },
        {
            $set: {
                "appraisal.objective_group.$[objective_group].value": 1234
            }
        },
        {

            arrayFilters: [
                {
                    'objective_group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")
                }
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})

const updateValue1 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id":  new mongoose.Types.ObjectId("6204935ebca89023952f2da9"),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_group": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId("61fe1f838a20e5c4eaa48d5f")
                }
            }
        },
        {
            $set: {
                "appraisal.objective_group.$[group].value": 66
            }
        },
        {

            arrayFilters: [
                {
                    'group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fbc")
                }
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const updateValue3 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id":  new mongoose.Types.ObjectId("6204935ebca89023952f2da9"),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_group.objective_type.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId("61fe20c78a20e5c4eaa48d6d")
                }
            }
        },
        {
            $set: {
                "appraisal.objective_group.$[group].objective_type.$[type].objective_description.$[description].value":  69
            }
        },
        {

            arrayFilters: [
                {
                    'group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")
                },
                {
                    'type._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb2")
                },
                {
                    'description._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb2")
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const updateValue5 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id":  new mongoose.Types.ObjectId("6204935ebca89023952f2da9"),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_group.objective_type": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId("61fe1fc78a20e5c4eaa48d65")
                }
            }
        },
        {
            $set: {
                "appraisal.objective_group.$[group].objective_type.$[type].value":  69
            }
        },
        {

            arrayFilters: [
                {
                    'group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")
                },
                {
                    'type._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb2")
                },
                {
                    'description._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb3")
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


const updateValue7 = asyncHandler(async (req: Request, res: Response) => {

    const {id, rating} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id":  new mongoose.Types.ObjectId("6204935ebca89023952f2da9"),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_group.objective_type.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId("61fe20c78a20e5c4eaa48d6d")
                }
            }
        },
        {
            $set: {
                "appraisal.objective_group.$[group].objective_type.$[type].objective_description.$[description].value":  69
            }
        },
        {

            arrayFilters: [
                {
                    'group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")
                },
                {
                    'type._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb2")
                },
                {
                    'description._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb3")
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})



const getAllEmployeess = asyncHandler(async (req: Request, res: Response) => {

    const employees = await Employee.find().populate({
        path: 'appraisal',
        populate: {
            path: 'objective_group.name',
        }
    }).populate({
        path: 'appraisal.objective_group',
        populate: {
            path: 'objective_type.name',
        }
    }).populate({
        path: 'appraisal.objective_group.objective_type',
        populate: {
            path: 'objective_description.name'
        }
    }).populate({
        path: 'appraisal.objective_group.objective_type',
        populate: {
            path: 'objective_description.name'
        }
    }).populate({
        path: 'appraisal',
        populate: {
            path: 'other_recommendation._id',
        }
    })

    res.status(StatusCodes.OK).json({
        success: true,
        data: employees,
    });
})


const appraisal = asyncHandler(async (req: Request, res: Response) => {

    const {id} = req.params

    const {ratings} = req.body

    const employee = await Employee.findOneAndUpdate({
            "_id": new mongoose.Types.ObjectId(id),

            // "appraisal.objective_group._id": "6207ec6a8bfc1226d3f36fb1",
            "appraisal.objective_group.objective_type.objective_description": {
                $elemMatch: {
                    name: new mongoose.Types.ObjectId("61fe20c78a20e5c4eaa48d6d")
                }
            }
        },
        {
            $set: {
                "appraisal.objective_group.$[group].objective_type.$[type].objective_description.$[description].ratings": new mongoose.Types.ObjectId("62035e2e60857107ff22e53e")
            }
        },
        {

            arrayFilters: [
                {
                    'group._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb1")
                },
                {
                    'type._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb2")
                },
                {
                    'description._id': new mongoose.Types.ObjectId("6207ec6a8bfc1226d3f36fb3")
                },
            ]
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})
