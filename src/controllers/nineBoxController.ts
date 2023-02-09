import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express"
import NineBox from "../models/NineBox";
import PerformanceDefinition from "../models/PerformanceDefinition";
import { Employee } from "../models";
import { StatusCodes } from "http-status-codes";

const createNineBox = asyncHandler(async (req: Request, res: Response) => {

    const nineBox = await NineBox.create(req.body);
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: nineBox
    });

})

const updateNineBox = asyncHandler(async (req: Request, res: Response) => {
    const { potential_definitions, performance_definitions, box_9_definitions } = req.body
    const nineBox = await NineBox.findByIdAndUpdate(req.params.id, {
        $set: {
            "potential_definitions": potential_definitions,
            "performance_definitions": performance_definitions,
            "box_9_definitions": box_9_definitions
        },
        // $push: {
        //     "box_9_definitions": box_9_definitions
        // }
    }
        , {
            new: true,
            runValidators: true
        });
    res.status(StatusCodes.OK).json({
        success: true,
        nineBox
    });
})

const getAllNineBox = asyncHandler(async (req: Request, res: Response) => {
    const nineBox = await NineBox.find({}).sort({ createdAt: -1 })
    res.status(StatusCodes.OK).json({
        data: nineBox
    });

})

// to get talent category of the employee
const getTalentCategory = asyncHandler(async (req: Request, res: Response) => {
    // const { id } = req.params
    const { overall_rating, potential } = req.params;
    // console.log("overall_rating", overall_rating)

    if (potential == "false") {
        res.status(StatusCodes.OK).json({
            data: ""
        });
    }
    console.log("overall_rating", overall_rating, potential)
    // const performance = await PerformanceDefinition.find()
    const performance = await PerformanceDefinition.findOne({
        "from": { $lte: overall_rating },
        "to": { $gte: overall_rating }
    })

    const nineBoxValue = await NineBox.findOne({
        "box_9_definitions.performance_level": performance.category,
        "box_9_definitions.potential_level": potential,
    })
    let boxdefinitions : any[] = nineBoxValue.box_9_definitions
    let definitionValue = boxdefinitions?.find(item => {  
        console.log(item,'itemssss')     
        return ((item?.performance_level == performance?.category) && (item?.potential_level == potential))
    })  

    res.status(StatusCodes.OK).json({
        data: definitionValue?.title      
    });

})


export {
    createNineBox,
    updateNineBox,
    getAllNineBox,
    getTalentCategory
}
