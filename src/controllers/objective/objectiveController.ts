import asyncHandler from "../../middleware/asyncHandler";
import {Request, Response} from "express";
import Objective from "../../models/Objective";
import {StatusCodes} from "http-status-codes";
import {ObjectiveDescription, ObjectiveGroup, ObjectiveType} from "../../models";
// import { objectiveDescriptionValidation, objectiveGroupValidation, objectiveTypeValidation } from "../../validation";
import ObjectiveTitle from "../../models/Objective/ObjectiveTitle";
import {BadRequestError} from "../../errors";
import Template from "../../models/Template";

const createObjectiveGroup = asyncHandler(async (req: Request, res: Response) => {
    // const result = await objectiveGroupValidation.validateAsync(req.body);
    const newObjectiveGroup = await ObjectiveGroup.create(
        req.body
    );
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjectiveGroup
    });

    const {name} = req.body
    const checkNameExists = await ObjectiveGroup.findOne({name})

    if (checkNameExists) {
        throw new BadRequestError('Objective Group already exists');
    }
})





const getObjectiveGroup = asyncHandler(async (req: Request, res: Response) => {
    const objectiveGroup = await ObjectiveGroup.findById(req.params.id);
    if (!objectiveGroup) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective group not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveGroup
    });


})

const getAllObjectiveGroups = asyncHandler(async (req: Request, res: Response) => {
    const objectiveGroups = await ObjectiveGroup.find().sort({createdAt: -1});
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveGroups
    });
})

const updateObjectiveGroup = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveGroupId} = req.params;

    const objectiveGroup = await ObjectiveGroup.findOneAndUpdate({_id: objectiveGroupId},
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!objectiveGroup) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective group not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveGroup
    });

    const {name} = req.body
    const checkNameExists = await ObjectiveGroup.findOne({name})

    if (checkNameExists) {
        throw new BadRequestError('Objective Group already exists');
    }
})

const deleteObjectiveGroup = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveGroupId} = req.params;
    // const objectiveGroup = await ObjectiveGroup.findOneAndDelete({_id: objectiveGroupId});

    const ifExist = await ObjectiveType.exists({objective_group: objectiveGroupId})

    if (ifExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "Objective Group  is Used In Objective Type."
        });
    }

    if(!ifExist) {
        const objectiveGroup = await ObjectiveGroup.findOneAndDelete({_id: objectiveGroupId});

        if (!objectiveGroup) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "Objective group not found"
            });
        }
    }




    res.status(StatusCodes.OK).json({
        success: true,
        message: "Objective group deleted"

    });
})


const createObjectiveType = asyncHandler(async (req: Request, res: Response) => {
    // const result = await objectiveTypeValidation.validateAsync(req.body);
    const newObjectiveType = await ObjectiveType.create(
        req.body
    );
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjectiveType
    });

    const {name} = req.body
    const checkNameExists = await ObjectiveType.findOne({
        name
    });
    if (checkNameExists) {
        throw new BadRequestError('Objective Type already exists');
    }
})

const updateObjectiveType = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveTypeId} = req.params;

    const objectiveType = await ObjectiveType.findOneAndUpdate({_id: objectiveTypeId},
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!objectiveType) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective type not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveType
    });

    const {name} = req.body
    const checkNameExists = await ObjectiveType.findOne({
        name
    });
    if (checkNameExists) {
        throw new BadRequestError('Objective Type already exists');
    }
})

const deleteObjectiveType = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveTypeId} = req.params;
    // const objectiveType = await ObjectiveType.findOneAndDelete({ _id: objectiveTypeId });

    const objectiveType = await ObjectiveDescription.exists({objective_type: objectiveTypeId})
    console.log(objectiveType)


    if (objectiveType) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "Objective type is Used In Objective Description"
        });
    }


    if (!objectiveType) {
        const objectiveTypeDelete = await ObjectiveType.findOneAndDelete({ _id: objectiveTypeId });
        return  res.status(StatusCodes.OK).json({
            success: true,
            message: "Objective type deleted",
            objectiveTypeDelete
        });
    }


    // if (!objectiveType) {
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //         success: false,
    //         error: "Objective type not found"
    //     });
    // }


})


const getObjectiveType = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveId} = req.params;

    const objectiveType = await ObjectiveType.findOne({_id: objectiveId}).populate('objective_group');

    if (!objectiveType) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "objective type not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveType
    });
})


const getAllObjectiveTypes = asyncHandler(async (req: Request, res: Response) => {
    const objectiveTypes = await ObjectiveType.find({}).sort({createdAt: -1}).populate('objective_group');
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveTypes
    });
})

const createObjectiveDescription = asyncHandler(async (req: Request, res: Response) => {
  

    // const {objectiveTitle, description} = req.body
    const {objectiveTitle, description,  level_definition} = req.body
    const checkNameExists = await ObjectiveDescription.findOne({objectiveTitle, description})
    if (checkNameExists) {
        throw new BadRequestError('Objective title already exists');
    }

    // const checkLevelExists = await ObjectiveDescription.findOne({ level_definition})
    // if (checkLevelExists) {
    //     throw new BadRequestError('Level 1 already exists');
    // }

    const newObjectiveDescription = await ObjectiveDescription.create(
        req.body
    );
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjectiveDescription
    });
})

const updateObjectiveDescription = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveDescriptionId} = req.params;

    const objectiveDescription = await ObjectiveDescription.findOneAndUpdate({_id: objectiveDescriptionId},
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!objectiveDescription) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective description not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveDescription
    });

    const {objective_title} = req.body
    const checkNameExists = await ObjectiveDescription.findOne({
        objective_title
    });
    if (checkNameExists) {
        throw new BadRequestError('Objective Description already exists');
    }
})

const deleteObjectiveDescription = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveDescriptionId} = req.params;


    const ifExist = await Template.exists({"weightage.objective_description.name":  req.params.id})


    if (ifExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: "Objective Description is Used In Appraisal."
        });
    }

    if(!ifExist) {
        const objectiveDescription = await ObjectiveDescription.findOneAndDelete({_id: objectiveDescriptionId});
        if (!objectiveDescription) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                error: "Objective description not found"
            });
        }
    }

    res.status(StatusCodes.OK).json({
        success: true,
        message: "Objective description deleted"

    });
})

const getObjectiveDescription = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveDescriptionId} = req.params;

    const objectiveDescription = await ObjectiveDescription.findOne({_id: objectiveDescriptionId}).populate('objective_type').populate('objective_title');

    if (!objectiveDescription) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective description not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveDescription
    });
})


const createObjectiveTitle = asyncHandler(async (req: Request, res: Response) => {
   

     const {objectiveTitle, description} = req.body
    const checkNameExists = await ObjectiveDescription.findOne({objectiveTitle, description})

    if (checkNameExists) {
        throw new BadRequestError('Objective Title already exists');
    }


    const newObjectiveTitle = await ObjectiveTitle.create(
        req.body
    );
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjectiveTitle
    });
})

const getObjectiveTitle = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveTitleId} = req.params;

    const objectiveTitle = await ObjectiveTitle.findOne({_id: objectiveTitleId}).populate('objective_type');

    if (!objectiveTitle) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective title not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveTitle
    });
})

const getAllObjectiveTitles = asyncHandler(async (req: Request, res: Response) => {
    const objectiveTitles = await ObjectiveTitle.find({}).sort({createdAt: -1})
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveTitles
    });
})

const updateObjectiveTitle = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveTitleId} = req.params;

    const objectiveTitle = await ObjectiveTitle.findOneAndUpdate({_id: objectiveTitleId},
        req.body,
        {
            new: true,
            runValidators: true
        });
    if (!objectiveTitle) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective title not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveTitle
    });
})

const deleteObjectiveTitle = asyncHandler(async (req: Request, res: Response) => {
    const {id: objectiveTitleId} = req.params;
    const objectiveTitle = await ObjectiveTitle.findOneAndDelete({_id: objectiveTitleId});

    if (!objectiveTitle) {
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: "Objective title not found"
        });
    }
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Objective title deleted"

    });
})


const getAllObjectiveDescriptions = asyncHandler(async (req: Request, res: Response) => {
    const objectiveDescriptions = await ObjectiveDescription.find({}).sort({createdAt: -1}).populate('objective_type').populate('objective_title');
    res.status(StatusCodes.OK).json({
        success: true,
        data: objectiveDescriptions
    });
})


const createObjective = asyncHandler(async (req: Request, res: Response) => {
    const {objectiveDescription, objectiveType, objectiveGroup} = req.body;
    console.log(req.body);
    const newObjective = await Objective.create({
        objectiveDescription,
        objectiveType,
        objectiveGroup
    });
    res.status(StatusCodes.CREATED).json({
        success: true,
        data: newObjective
    });
})


export {
    createObjectiveGroup,
    createObjectiveType,
    getAllObjectiveTypes,
    getAllObjectiveGroups,
    createObjectiveDescription,
    getObjectiveType,
    getAllObjectiveDescriptions,
    createObjective,
    updateObjectiveGroup,
    deleteObjectiveGroup,
    deleteObjectiveDescription,
    getObjectiveDescription,
    updateObjectiveDescription,
    deleteObjectiveType,
    updateObjectiveType,
    // objectiveDescriptionValidation,
    getObjectiveGroup,
    createObjectiveTitle,
    deleteObjectiveTitle,
    getAllObjectiveTitles,
    getObjectiveTitle,
    updateObjectiveTitle
};
