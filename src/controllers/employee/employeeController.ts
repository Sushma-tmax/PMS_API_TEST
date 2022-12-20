import { Employee, ObjectiveType } from "../../models";
import asyncHandler from "../../middleware/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Template from "../../models/Template";
import mongoose from "mongoose";
import { getImage } from "../azureImageStorage";
import AppraisalCalender from "../../models/AppraisalCalender";
import _ from "lodash";
import template from "../../models/Template";


const getRatingsfromObjectiveDescription = (data: any) => {
    return data?.map((k: any) => {
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
    const { id } = req.body
   const empClient = [
       "62ac2037c1c19127416aafe9",
       "62ac2037c1c19127416aafea",
       "62ac2037c1c19127416aafeb",
       "62ac2037c1c19127416aafec",
       "62ac2037c1c19127416aafed",
       "62ac2037c1c19127416aafee",
       "62ac2037c1c19127416aafef",
       "62ac2037c1c19127416aaff0",
       "62ac2037c1c19127416aaff1",
       "62ac2037c1c19127416aaff2",
       "62ac2037c1c19127416aaff3",
       "62ac2037c1c19127416aaff4",
       "62ac2037c1c19127416aaff5",
       "62ac2037c1c19127416aaff6",
       "62ac2037c1c19127416aaff7",
       "62ac2037c1c19127416aaff8",
       "62ac2037c1c19127416aaff9",
       "62ac2037c1c19127416aaffa",
       "62ac2037c1c19127416aaffb",
       "62ac2037c1c19127416aaffc",
       "62ac2037c1c19127416aaffd",
       "62ac2037c1c19127416aaffe",
       "62ac2037c1c19127416aafff",
       "62ac2037c1c19127416ab000",
       "62ac2037c1c19127416ab001",
       "62ac2037c1c19127416ab002",
       "62ac2037c1c19127416ab003",
       "62ac2037c1c19127416ab004",
       "62ac2037c1c19127416ab005",
       "62ac2037c1c19127416ab006",
       "62ac2037c1c19127416ab007",
       "62ac2037c1c19127416ab008",
       "62ac2037c1c19127416ab009",
       "62ac2037c1c19127416ab00a",
       "62ac2037c1c19127416ab00b",
       "62ac2037c1c19127416ab00c",
       "62ac2037c1c19127416ab00d",
       "62ac2037c1c19127416ab00e",
       "62ac2037c1c19127416ab00f",
       "62ac2037c1c19127416ab010",
       "62ac2037c1c19127416ab011",
       "62ac2037c1c19127416ab012",
       "62ac2037c1c19127416ab013",
       "62ac2037c1c19127416ab014",
       "62ac2037c1c19127416ab015",
       "62ac2037c1c19127416ab016",
       "62ac2037c1c19127416ab017",
       "62ac2037c1c19127416ab018",
       "62ac2037c1c19127416ab019",
       "62ac2037c1c19127416ab01a",
       "62ac2037c1c19127416ab01b",
       "62ac2037c1c19127416ab01c",
       "62ac2037c1c19127416ab01d",
       "62ac2037c1c19127416ab01e",
       "62ac2037c1c19127416ab01f",
       "62ac2037c1c19127416ab020",
       "62ac2037c1c19127416ab021",
       "62ac2037c1c19127416ab022",
       "62ac2037c1c19127416ab023",
       "62ac2037c1c19127416ab024",
       "62ac2037c1c19127416ab025",
       "62ac2037c1c19127416ab026",
       "62ac2037c1c19127416ab027",
       "62ac2037c1c19127416ab028",
       "62ac2037c1c19127416ab029",
       "62ac2037c1c19127416ab02a",
       "62ac2037c1c19127416ab02b",
       "62ac2037c1c19127416ab02c",
       "62ac2037c1c19127416ab02d",
       "62ac2037c1c19127416ab02e",
       "62ac2037c1c19127416ab02f",
       "62ac2037c1c19127416ab030",
       "62ac2037c1c19127416ab031",
       "62ac2037c1c19127416ab032",
       "62ac2037c1c19127416ab033",
       "62ac2037c1c19127416ab034",
       "62ac2037c1c19127416ab035",
       "62ac2037c1c19127416ab036",
       "62ac2037c1c19127416ab037",
       "62ac2037c1c19127416ab038",
       "62ac2037c1c19127416ab039",
       "62ac2037c1c19127416ab03a",
       "62ac2037c1c19127416ab03b",
       "62ac2037c1c19127416ab03c",
       "62ac2037c1c19127416ab03d",
       "62ac2037c1c19127416ab03e",
       "62ac2037c1c19127416ab03f",
       "62ac2037c1c19127416ab040",
       "62ac2037c1c19127416ab041",
       "62ac2037c1c19127416ab042",
       "62ac2037c1c19127416ab043",
       "62ac2037c1c19127416ab044",
       "62ac2037c1c19127416ab045",
       "62ac2037c1c19127416ab046",
       "62ac2037c1c19127416ab047",
       "62ac2037c1c19127416ab048",
       "62ac2037c1c19127416ab049",
       "62ac2037c1c19127416ab04a",
       "62ac2037c1c19127416ab04b",
       "62ac2037c1c19127416ab04c",
       "62ac2037c1c19127416ab04d",
       "62ac2037c1c19127416ab04e",
       "62ac2037c1c19127416ab04f",
       "62ac2037c1c19127416ab050",
       "62ac2037c1c19127416ab051",
       "62ac2037c1c19127416ab052",
       "62ac2037c1c19127416ab053",
       "62ac2037c1c19127416ab054",
       "62ac2037c1c19127416ab055",
       "62ac2037c1c19127416ab056",
       "62ac2037c1c19127416ab057",
       "62ac2037c1c19127416ab058",
       "62ac2037c1c19127416ab059",
       "62ac2037c1c19127416ab05a",
       "62ac2037c1c19127416ab05b",
       "62ac2037c1c19127416ab05c",
       "62ac2037c1c19127416ab05d",
       "62ac2037c1c19127416ab05e",
       "62ac2037c1c19127416ab05f",
       "62ac2037c1c19127416ab060",
       "62ac2037c1c19127416ab061",
       "62ac2037c1c19127416ab062",
       "62ac2037c1c19127416ab063",
       "62ac2037c1c19127416ab064",
       "62ac2037c1c19127416ab065",
       "62ac2037c1c19127416ab066",
       "62ac2037c1c19127416ab067",
       "62ac2037c1c19127416ab068",
       "62ac2037c1c19127416ab069",
       "62ac2037c1c19127416ab06a",
       "62ac2037c1c19127416ab06b",
       "62ac2037c1c19127416ab06c",
       "62ac2037c1c19127416ab06d",
       "62ac2037c1c19127416ab06e",
       "62ac2037c1c19127416ab06f",
       "62ac2037c1c19127416ab070",
       "62ac2037c1c19127416ab071",
       "62ac2037c1c19127416ab072",
       "62ac2037c1c19127416ab073",
       "62ac2037c1c19127416ab074",
       "62ac2037c1c19127416ab075",
       "62ac2037c1c19127416ab076",
       "62ac2037c1c19127416ab077",
       "62ac2037c1c19127416ab078",
       "62ac2037c1c19127416ab079",
       "62ac2037c1c19127416ab07a",
       "62ac2037c1c19127416ab07b",
       "62ac2037c1c19127416ab07c",
       "62ac2037c1c19127416ab07d",
       "62ac2037c1c19127416ab07e",
       "62ac2037c1c19127416ab07f",
       "62ac2037c1c19127416ab080",
       "62ac2037c1c19127416ab081",
       "62ac2037c1c19127416ab082",
       "62ac2037c1c19127416ab083",
       "62ac2037c1c19127416ab084",
       "62ac2037c1c19127416ab085",
       "62ac2037c1c19127416ab086",
       "62ac2037c1c19127416ab087",
       "62ac2037c1c19127416ab088",
       "62ac2037c1c19127416ab089",
       "62ac2037c1c19127416ab08a",
       "62ac2037c1c19127416ab08b",
       "62ac2037c1c19127416ab08c",
       "62ac2037c1c19127416ab08d",
       "62ac2037c1c19127416ab08e",
       "62ac2037c1c19127416ab08f",
       "62ac2037c1c19127416ab090",
       "62ac2037c1c19127416ab091",
       "62ac2037c1c19127416ab092",
       "62ac2037c1c19127416ab093",
       "62ac2037c1c19127416ab094",
       "62ac2037c1c19127416ab095",
       "62ac2037c1c19127416ab096",
       "62ac2037c1c19127416ab097",
       "62ac2037c1c19127416ab098",
       "62ac2037c1c19127416ab099",
       "62ac2037c1c19127416ab09a",
       "62ac2037c1c19127416ab09b",
       "62ac2037c1c19127416ab09c",
       "62ac2037c1c19127416ab09d",
       "62ac2037c1c19127416ab09e",
       "62ac2037c1c19127416ab09f",
       "62ac2037c1c19127416ab0a0",
       "62ac2037c1c19127416ab0a1",
       "62ac2037c1c19127416ab0a2",
       "62ac2037c1c19127416ab0a3",
       "62ac2037c1c19127416ab0a4",
       "62ac2037c1c19127416ab0a5",
       "62ac2037c1c19127416ab0a6",
       "62ac2037c1c19127416ab0a7",
       "62ac2037c1c19127416ab0a8",
       "62ac2037c1c19127416ab0a9",
       "62ac2037c1c19127416ab0aa",
       "62ac2037c1c19127416ab0ab",
       "62ac2037c1c19127416ab0ac",
       "62ac2037c1c19127416ab0ad",
       "62ac2037c1c19127416ab0ae",
       "62ac2037c1c19127416ab0af",
       "62ac2037c1c19127416ab0b0",
       "62ac2037c1c19127416ab0b1",
       "62ac2037c1c19127416ab0b2",
       "62ac2037c1c19127416ab0b3",
       "62ac2037c1c19127416ab0b4",
       "62ac2037c1c19127416ab0b5",
       "62ac2037c1c19127416ab0b6",
       "62ac2037c1c19127416ab0b7",
       "62ac2037c1c19127416ab0b8",
       "62ac2037c1c19127416ab0b9",
       "62ac2037c1c19127416ab0ba",
       "62ac2037c1c19127416ab0bb",
       "62ac2037c1c19127416ab0bc",
       "62ac2037c1c19127416ab0bd",
       "62ac2037c1c19127416ab0be",
       "62ac2037c1c19127416ab0bf",
       "62ac2037c1c19127416ab0c0",
       "62ac2037c1c19127416ab0c1",
       "62ac2037c1c19127416ab0c2",
       "62ac2037c1c19127416ab0c3",
       "62ac2037c1c19127416ab0c4",
       "62ac2037c1c19127416ab0c5",
       "62ac2037c1c19127416ab0c6",
       "62ac2037c1c19127416ab0c7",
       "62ac2037c1c19127416ab0c8",
       "62ac2037c1c19127416ab0c9",
       "62ac2037c1c19127416ab0ca",
       "62ac2037c1c19127416ab0cb",
       "62ac2037c1c19127416ab0cc",
       "62ac2037c1c19127416ab0cd",
       "62ac2037c1c19127416ab0ce",
       "62ac2037c1c19127416ab0cf",
       "62ac2037c1c19127416ab0d0",
       "62ac2037c1c19127416ab0d1",
       "62ac2037c1c19127416ab0d2",
       "62ac2037c1c19127416ab0d3",
       "62ac2037c1c19127416ab0d4",
       "62ac2037c1c19127416ab0d5",
       "62ac2037c1c19127416ab0d6",
       "62ac2037c1c19127416ab0d7",
       "62ac2037c1c19127416ab0d8",
       "62ac2037c1c19127416ab0d9",
       "62ac2037c1c19127416ab0da",
       "62ac2037c1c19127416ab0db",
       "62ac2037c1c19127416ab0dc",
       "62ac2037c1c19127416ab0dd",
       "62ac2037c1c19127416ab0de",
       "62ac2037c1c19127416ab0df",
       "62ac2037c1c19127416ab0e0",
       "62ac2037c1c19127416ab0e1",
       "62ac2037c1c19127416ab0e2",
       "62ac2037c1c19127416ab0e3",
       "62ac2037c1c19127416ab0e4",
       "62ac2037c1c19127416ab0e5",
       "62ac2037c1c19127416ab0e6",
       "62ac2037c1c19127416ab0e7",
       "62ac2037c1c19127416ab0e8",
       "62ac2037c1c19127416ab0e9",
       "62ac2037c1c19127416ab0ea",
       "62ac2037c1c19127416ab0eb",
       "62ac2037c1c19127416ab0ec",
       "62ac2037c1c19127416ab0ed",
       "62ac2037c1c19127416ab0ee",
       "62ac2037c1c19127416ab0ef",
       "62ac2037c1c19127416ab0f0",
       "62ac2037c1c19127416ab0f1",
       "62ac2037c1c19127416ab0f2",
       "62ac2037c1c19127416ab0f3",
       "62ac2037c1c19127416ab0f4",
       "62ac2037c1c19127416ab0f5",
       "62ac2037c1c19127416ab0f6",
       "62ac2037c1c19127416ab0f7",
       "62ac2037c1c19127416ab0f8",
       "62ac2037c1c19127416ab0f9",
       "62ac2037c1c19127416ab0fa",
       "62ac2037c1c19127416ab0fb",
       "62ac2037c1c19127416ab0fc",
       "62ac2037c1c19127416ab0fd",
       "62ac2037c1c19127416ab0fe",
       "62ac2037c1c19127416ab0ff",
       "62ac2037c1c19127416ab100",
       "62ac2037c1c19127416ab101",
       "62ac2037c1c19127416ab102",
       "62ac2037c1c19127416ab103",
       "62ac2037c1c19127416ab104",
       "62ac2037c1c19127416ab105",
       "62ac2037c1c19127416ab106",
       "62ac2037c1c19127416ab107",
       "62ac2037c1c19127416ab108",
       "62ac2037c1c19127416ab109",
       "62ac2037c1c19127416ab10a",
       "62ac2037c1c19127416ab10b",
       "62ac2037c1c19127416ab10c",
       "62ac2037c1c19127416ab10d",
       "62ac2037c1c19127416ab10e",
       "62ac2037c1c19127416ab10f",
       "62ac2037c1c19127416ab110",
       "62ac2037c1c19127416ab111",
       "62ac2037c1c19127416ab112",
       "62ac2037c1c19127416ab113",
       "62ac2037c1c19127416ab114",
       "62ac2037c1c19127416ab115",
       "62ac2037c1c19127416ab116",
       "62ac2037c1c19127416ab117",
       "62ac2037c1c19127416ab118",
       "62ac2037c1c19127416ab119",
       "62ac2037c1c19127416ab11a",
       "62ac2037c1c19127416ab11b",
       "62ac2037c1c19127416ab11c",
       "62ac2037c1c19127416ab11d",
       "62ac2037c1c19127416ab11e",
       "62ac2037c1c19127416ab11f",
       "62ac2037c1c19127416ab120",
       "62ac2037c1c19127416ab121",
       "62ac2037c1c19127416ab122",
       "62ac2037c1c19127416ab123",
       "62ac2037c1c19127416ab124",
       "62ac2037c1c19127416ab125",
       "62ac2037c1c19127416ab126",
       "62ac2037c1c19127416ab127",
       "62ac2037c1c19127416ab128",
       "62ac2037c1c19127416ab129",
       "62ac2037c1c19127416ab12a",
       "62ac2037c1c19127416ab12b",
       "62ac2037c1c19127416ab12c",
       "62ac2037c1c19127416ab12d",
       "62ac2037c1c19127416ab12e",
       "62ac2037c1c19127416ab12f",
       "62ac2037c1c19127416ab130",
       "62ac2037c1c19127416ab131",
       "62ac2037c1c19127416ab132",
       "62ac2037c1c19127416ab133",
       "62ac2037c1c19127416ab134",
       "62ac2037c1c19127416ab135",
       "62ac2037c1c19127416ab136",
       "62ac2037c1c19127416ab137",
       "62ac2037c1c19127416ab138",
       "62ac2037c1c19127416ab139",
       "62ac2037c1c19127416ab13a",
       "62ac2037c1c19127416ab13b",
       "62ac2037c1c19127416ab13c",
       "62ac2037c1c19127416ab13d",
       "62ac2037c1c19127416ab13e",
       "62ac2037c1c19127416ab13f",
       "62ac2037c1c19127416ab140",
       "62ac2037c1c19127416ab141",
       "62ac2037c1c19127416ab142",
       "62ac2037c1c19127416ab143",
       "62ac2037c1c19127416ab144",
       "62ac2037c1c19127416ab145",
       "62ac2037c1c19127416ab146",
       "62ac2037c1c19127416ab147",
       "62ac2037c1c19127416ab148",
       "62ac2037c1c19127416ab149",
       "62ac2037c1c19127416ab14a",
       "62ac2037c1c19127416ab14b",
       "62ac2037c1c19127416ab14c",
       "62ac2037c1c19127416ab14d",
       "62ac2037c1c19127416ab14e",
       "62ac2037c1c19127416ab14f",
       "62ac2037c1c19127416ab150",
       "62ac2037c1c19127416ab151",
       "62ac2037c1c19127416ab152",
       "62ac2037c1c19127416ab153",
       "62ac2037c1c19127416ab154",
       "62ac2037c1c19127416ab155",
       "62ac2037c1c19127416ab156",
       "62ac2037c1c19127416ab157",
       "62ac2037c1c19127416ab158",
       "62ac2037c1c19127416ab159",
       "62ac2037c1c19127416ab15a",
       "62ac2037c1c19127416ab15b",
       "62ac2037c1c19127416ab15c",
       "62ac2037c1c19127416ab15d",
       "62ac2037c1c19127416ab15e",
       "62ac2037c1c19127416ab15f",
       "62ac2037c1c19127416ab160",
       "62ac2037c1c19127416ab161",
       "62ac2037c1c19127416ab162",
       "62ac2037c1c19127416ab163",
       "62ac2037c1c19127416ab164",
       "62ac2037c1c19127416ab165",
       "62ac2037c1c19127416ab166",
       "62ac2037c1c19127416ab167",
       "62ac2037c1c19127416ab168",
       "62ac2037c1c19127416ab169",
       "62ac2037c1c19127416ab16a",
       "62ac2037c1c19127416ab16b",
       "62ac2037c1c19127416ab16c",
       "62ac2037c1c19127416ab16d",
       "62ac2037c1c19127416ab16e",
       "62ac2037c1c19127416ab16f",
       "62ac2037c1c19127416ab170",
       "62ac2037c1c19127416ab171",
       "62ac2037c1c19127416ab172",
       "62ac2037c1c19127416ab173",
       "62ac2037c1c19127416ab174",
       "62ac2037c1c19127416ab175",
       "62ac2037c1c19127416ab176",
       "62ac2037c1c19127416ab177",
       "62ac2037c1c19127416ab178",
       "62ac2037c1c19127416ab179",
       "62ac2037c1c19127416ab17a",
       "62ac2037c1c19127416ab17b",
       "62ac2037c1c19127416ab17c",
       "62ac2037c1c19127416ab17d",
       "62ac2037c1c19127416ab17e",
       "62ac2037c1c19127416ab17f",
       "62ac2037c1c19127416ab180",
       "62ac2037c1c19127416ab181",
       "62ac2037c1c19127416ab182",
       "62ac2037c1c19127416ab183",
       "62ac2037c1c19127416ab184",
       "62ac2037c1c19127416ab185",
       "62ac2037c1c19127416ab186",
       "62ac2037c1c19127416ab187",
       "62ac2037c1c19127416ab188",
       "62ac2037c1c19127416ab189",
       "62ac2037c1c19127416ab18a",
       "62ac2037c1c19127416ab18b",
       "62ac2037c1c19127416ab18c",
       "62ac2037c1c19127416ab18d",
       "62ac2037c1c19127416ab18e",
       "62ac2037c1c19127416ab18f",
       "62ac2037c1c19127416ab190",
       "62ac2037c1c19127416ab191",
       "62ac2037c1c19127416ab192",
       "62ac2037c1c19127416ab193",
       "62ac2037c1c19127416ab194",
       "62ac2037c1c19127416ab195",
       "62ac2037c1c19127416ab196",
       "62ac2037c1c19127416ab197",
       "62ac2037c1c19127416ab198",
       "62ac2037c1c19127416ab199",
       "62ac2037c1c19127416ab19a",
       "62ac2037c1c19127416ab19b",
       "62ac2037c1c19127416ab19c",
       "62ac2037c1c19127416ab19d",
       "62ac2037c1c19127416ab19e",
       "62ac2037c1c19127416ab19f",
       "62ac2037c1c19127416ab1a0",
       "62ac2037c1c19127416ab1a1",
       "62ac2037c1c19127416ab1a2",
       "62ac2037c1c19127416ab1a3",
       "62ac2037c1c19127416ab1a4",
       "62ac2037c1c19127416ab1a5",
       "62ac2037c1c19127416ab1a6",
       "62ac2037c1c19127416ab1a7",
       "62ac2037c1c19127416ab1a8",
       "62ac2037c1c19127416ab1a9",
       "62ac2037c1c19127416ab1aa",
       "62ac2037c1c19127416ab1ab",
       "62ac2037c1c19127416ab1ac",
       "62ac2037c1c19127416ab1ad",
       "62ac2037c1c19127416ab1ae",
       "62ac2037c1c19127416ab1af",
       "62ac2037c1c19127416ab1b0",
       "62ac2037c1c19127416ab1b1",
       "62ac2037c1c19127416ab1b2",
       "62ac2037c1c19127416ab1b3",
       "62ac2037c1c19127416ab1b4",
       "62ac2037c1c19127416ab1b5",
       "62ac2037c1c19127416ab1b6",
       "62ac2037c1c19127416ab1b7",
       "62ac2037c1c19127416ab1b8",
       "62ac2037c1c19127416ab1b9",
       "62ac2037c1c19127416ab1ba",
       "62ac2037c1c19127416ab1bb",
       "62ac2037c1c19127416ab1bc",
       "62ac2037c1c19127416ab1bd",
       "62ac2037c1c19127416ab1be",
       "62ac2037c1c19127416ab1bf",
       "62ac2037c1c19127416ab1c0",
       "62ac2037c1c19127416ab1c1",
       "62ac2037c1c19127416ab1c2",
       "62ac2037c1c19127416ab1c3",
       "62ac2037c1c19127416ab1c4",
       "62ac2037c1c19127416ab1c5",
       "62ac2037c1c19127416ab1c6",
       "62ac2037c1c19127416ab1c7",
       "62ac2037c1c19127416ab1c8",
       "62ac2037c1c19127416ab1c9",
       "62ac2037c1c19127416ab1ca",
       "62ac2037c1c19127416ab1cb",
       "62ac2037c1c19127416ab1cc",
       "62ac2037c1c19127416ab1cd",
       "62ac2037c1c19127416ab1ce",
       "62ac2037c1c19127416ab1cf",
       "62ac2037c1c19127416ab1d0",
       "62ac2037c1c19127416ab1d1",
       "62ac2037c1c19127416ab1d2",
       "62ac2037c1c19127416ab1d3",
       "62ac2037c1c19127416ab1d4",
       "62ac2037c1c19127416ab1d5",
       "62ac2037c1c19127416ab1d6",
       "62ac2037c1c19127416ab1d7",
       "62ac2037c1c19127416ab1d8",
       "62ac2037c1c19127416ab1d9",
       "62ac2037c1c19127416ab1da",
       "62ac2037c1c19127416ab1db",
       "62ac2037c1c19127416ab1dc",
       "62ac2037c1c19127416ab1dd",
       "62ac2037c1c19127416ab1de",
       "62ac2037c1c19127416ab1df",
       "62ac2037c1c19127416ab1e0",
       "62ac2037c1c19127416ab1e1",
       "62ac2037c1c19127416ab1e2",
       "62ac2037c1c19127416ab1e3",
       "62ac2037c1c19127416ab1e4",
       "62ac2037c1c19127416ab1e5",
       "62ac2037c1c19127416ab1e6",
       "62ac2037c1c19127416ab1e7",
       "62ac2037c1c19127416ab1e8",
       "62ac2037c1c19127416ab1e9",
       "62ac2037c1c19127416ab1ea",
       "62ac2037c1c19127416ab1eb",
       "62ac2037c1c19127416ab1ec",
       "62ac2037c1c19127416ab1ed",
       "62ac2037c1c19127416ab1ee",
       "62ac2037c1c19127416ab1ef",
       "62ac2037c1c19127416ab1f0",
       "62ac2037c1c19127416ab1f1",
       "62ac2037c1c19127416ab1f2",
       "62ac2037c1c19127416ab1f3",
       "62ac2037c1c19127416ab1f4",
       "62ac2037c1c19127416ab1f5",
       "62ac2037c1c19127416ab1f6",
       "62ac2037c1c19127416ab1f7",
       "62ac2037c1c19127416ab1f8",
       "62ac2037c1c19127416ab1f9",
       "62ac2037c1c19127416ab1fa",
       "62ac2037c1c19127416ab1fb",
       "62ac2037c1c19127416ab1fc",
       "62ac2037c1c19127416ab1fd",
       "62ac2037c1c19127416ab1fe",
       "62ac2037c1c19127416ab1ff",
       "62ac2037c1c19127416ab200",
       "62ac2037c1c19127416ab201",
       "62ac2037c1c19127416ab202",
       "62ac2037c1c19127416ab203",
       "62ac2037c1c19127416ab204",
       "62ac2037c1c19127416ab205",
       "62ac2037c1c19127416ab206",
       "62ac2037c1c19127416ab207",
       "62ac2037c1c19127416ab208",
       "62ac2037c1c19127416ab209",
       "62ac2037c1c19127416ab20a",
       "62ac2037c1c19127416ab20b",
       "62ac2037c1c19127416ab20c",
       "62ac2037c1c19127416ab20d",
       "62ac2037c1c19127416ab20e",
       "62ac2037c1c19127416ab20f",
       "62ac2037c1c19127416ab210",
       "62ac2037c1c19127416ab211",
       "62ac2037c1c19127416ab212",
       "62ac2037c1c19127416ab213",
       "62ac2037c1c19127416ab214",
       "62ac2037c1c19127416ab215",
       "62ac2037c1c19127416ab216",
       "62ac2037c1c19127416ab217",
       "62ac2037c1c19127416ab218",
       "62ac2037c1c19127416ab219",
       "62ac2037c1c19127416ab21a",
       "62ac2037c1c19127416ab21b",
       "62ac2037c1c19127416ab21c",
       "62ac2037c1c19127416ab21d",
       "62ac2037c1c19127416ab21e",
       "62ac2037c1c19127416ab21f",
       "62ac2037c1c19127416ab220",
       "62ac2037c1c19127416ab221",
       "62ac2037c1c19127416ab222",
       "62ac2037c1c19127416ab223",
       "62ac2037c1c19127416ab224",
       "62ac2037c1c19127416ab225",
       "62ac2037c1c19127416ab226",
       "62ac2037c1c19127416ab227",
       "62ac2037c1c19127416ab228",
       "62ac2037c1c19127416ab229",
       "62ac2037c1c19127416ab22a",
       "62ac2037c1c19127416ab22b",
       "62ac2037c1c19127416ab22c",
       "62ac2037c1c19127416ab22d",
       "62ac2037c1c19127416ab22e",
       "62ac2037c1c19127416ab22f",
       "62ac2037c1c19127416ab230",
       "62ac2037c1c19127416ab231",
       "62ac2037c1c19127416ab232",
       "62ac2037c1c19127416ab233",
       "62ac2037c1c19127416ab234",
       "62ac2037c1c19127416ab235",
       "62ac2037c1c19127416ab236",
       "62ac2037c1c19127416ab237",
       "62ac2037c1c19127416ab238",
       "62ac2037c1c19127416ab239",
       "62ac2037c1c19127416ab23a",
       "62ac2037c1c19127416ab23b",
       "62ac2037c1c19127416ab23c",
       "62ac2037c1c19127416ab23d",
       "62ac2037c1c19127416ab23e",
       "62ac2037c1c19127416ab23f",
       "62ac2037c1c19127416ab240",
       "62ac2037c1c19127416ab241",
       "62ac2037c1c19127416ab242",
       "62ac2037c1c19127416ab243",
       "62ac2037c1c19127416ab244",
       "62ac2037c1c19127416ab245",
       "62ac2037c1c19127416ab246",
       "62ac2037c1c19127416ab247",
       "62ac2037c1c19127416ab248",
       "62ac2037c1c19127416ab249",
       "62ac2037c1c19127416ab24a",
       "62ac2037c1c19127416ab24b",
       "62ac2037c1c19127416ab24c",
       "62ac2037c1c19127416ab24d",
       "62ac2037c1c19127416ab24e",
       "62ac2037c1c19127416ab24f",
       "62ac2037c1c19127416ab250",
       "62ac2037c1c19127416ab251",
       "62ac2037c1c19127416ab252",
       "62ac2037c1c19127416ab253",
       "62ac2037c1c19127416ab254",
       "62ac2037c1c19127416ab255",
       "62ac2037c1c19127416ab256",
       "62ac2037c1c19127416ab257",
       "62ac2037c1c19127416ab258",
       "62ac2037c1c19127416ab259",
       "62ac2037c1c19127416ab25a",
       "62ac2037c1c19127416ab25b",
       "62ac2037c1c19127416ab25c",
       "62ac2037c1c19127416ab25d",
       "62ac2037c1c19127416ab25e",
       "62ac2037c1c19127416ab25f",
       "62ac2037c1c19127416ab260",
       "62ac2037c1c19127416ab261",
       "62ac2037c1c19127416ab262",
       "62ac2037c1c19127416ab263",
       "62ac2037c1c19127416ab264",
       "62ac2037c1c19127416ab265",
       "62ac2037c1c19127416ab266",
       "62ac2037c1c19127416ab267",
       "62ac2037c1c19127416ab268",
       "62ac2037c1c19127416ab269"
   ]
    // console.log(id, '`````````````````````````````````````````````````')
    // const data = await Employee.find().select('_id')

        const employee = await Employee.updateOne({ _id: new mongoose.Types.ObjectId("62ac2037c1c19127416aafe9")}, {
            $set: {
                // "employee": [],
                // "appraisal_template": [],
                "appraisal.attachments": [],
                // "reviewer": [],
                // "normalizer": [],
                // "attachments": [],
                // reviewerIsChecked: false,
                //             reviewerIsDisabled: true,
                //             normalizerIsChecked: false,
                //              normalizerIsDisabled: true,
                //              appraiserIsDisabled: true,
                //            appraiserIsChecked: false,
                // calendar: ''

            }
        }
        )
    res.status(StatusCodes.OK).json({
        "message": employee,

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


const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {

    const { status } = req.params

    let employees: any


    if (status === 'all') {
        employees = await Employee.find()
    } else {
        employees = await Employee.find({ "appraisal.status": status })
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
        return {

            url: getImage(j.url),
            name: j.url,
            objective_description: j.objective_description,
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
    // @ts-ignore   
    employee?.profile_image_url = getImage(`${employee.employee_code}.jpg`)


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
        rating_value,
        rating_rejected,
        action_performed,
        objective_group,
        objective_type,
        objective_description_name,
        objective_description,
        rating_comments,
        value,
        remarks
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
                "appraisal.objective_description.$[description].action_performed": action_performed,

                "appraisal.objective_description.$[description].remarks": remarks,
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
        action_performed,
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
                "reviewer.objective_description.$[description].action_performed": action_performed,
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

    const { id } = req.params

    const {
        ratings,
        comments,
        rating_comments,
        rating_value,
        rating_rejected,
        action_performed,
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
                // "normalizer.objective_description.$[description].rating_rejected": true,
                "normalizer.objective_description.$[description].rating_rejected": rating_rejected,
                "normalizer.objective_description.$[description].action_performed": action_performed,

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
        rating_rejected,
        action_performed,
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
                "employee.objective_description.$[description].action_performed": action_performed,

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
    const { id } = req.body
    console.log(id, '`````````````````````````````````````````````````')
    const { reviewer: appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {
                "employee.employee_status": "pending",
                "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer.objective_type": appraisal.objective_type,
                "normalizer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizer.normalizer_rating": appraisal.reviewer_rating,
                "normalizer.training_recommendation": appraisal.training_recommendation,
                "normalizer.other_recommendation": appraisal.other_recommendation,
                "normalizer.area_of_improvement": appraisal.area_of_improvement,
                "normalizer.feedback_questions": appraisal.feedback_questions,
                // "appraisal.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
                "normalizerIsChecked": true,
                "normalizerIsDisabled": true,
                "normalizer.normalizer_acceptance": true,
                "normalizer.normalizer_status": 'accepted',
                "appraisal.normalizer_status": 'accepted',
                "appraisal.status": "normalized",
                // "employee":{},
                // "employee.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description),
            }
        }
    )
    res.status(StatusCodes.OK).json({
        employee
    });
})


// const acceptNormalizer = asyncHandler(async (req: Request, res: Response) => {
const acceptReviewer = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body
    console.log(id, '`````````````````````````````````````````````````')

    const { appraisal } = await Employee.findById(id);

    const employee = await Employee.updateMany({ _id: { $in: id } },
        {
            $set: {

                "reviewer.objective_group": appraisal.objective_group,
                "reviewer.objective_type": appraisal.objective_type,
                "reviewer.objective_description": getRatingsfromObjectiveDescription(appraisal.objective_description) ,
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
                "reviewer.reviewer_rating": appraisal.appraiser_rating,
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
                "reviewer.reviewer_status": 'draft',
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
                "appraisal.appraiser_rating":findEmpoloyee.reviewer.reviewer_rating,
                "appraisal.objective_description": getRatingsfromObjectiveDescription(findEmpoloyee.reviewer.objective_description),
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
                "reviewer.rejection_count":0,
                "appraiser.rejection_count":0
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

const employeeRejectionSave = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const { comments } = req.body

    console.log('```````````` running ', id, comments)

    // const  id = "62ac2037c1c19127416aaff1"

    const emp = await Employee.findById(id)


    const agreeValue = emp.employee.employee_agree

    if (agreeValue === true) {

        const employee = await Employee.updateMany({ _id: { $in: id } }, {
            $set: {
                "employee.comments": comments,
                "appraisal.appraiser_status": 'employee-rejected',
                "appraisal.status":"rejected",
                "employee.employee_status" : "rejected"
            }
        })

    } else if (agreeValue === false) {
        const employee = await Employee.updateMany({ _id: { $in: id } }, {
            $set: {
                "employee.comments": comments,
                "normalizerIsChecked": false,
                "normalizerIsDisabled": false,
                "normalizer.normalizer_status": 'employee-rejected',
                "appraisal.status":"rejected",
                "employee.employee_status" : "rejected"
            }
        })
    }
    res.status(StatusCodes.OK).json({ "message": agreeValue });
})

const normalizerRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const { empoloyee, normalizer } = await Employee.findById(id)

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
    const { comments } = req.body

    const { employee, normalizer, appraisal } = await Employee.findById(id)

    if (employee.employee_rating - normalizer.normalizer_rating <= 0.5) {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            $set: {
                "appraisal.appraiser_status": 'appraiser-accepted-employee',
                "appraisal.status": 'completed',
                "appraisal.comments": comments,
                "normalizer.normalizer_rating": appraisal.appraiser_rating,
                // "normalizer.normalizer_status": 'completed',
                "normalizer.objective_description": appraisal.objective_description,

            }
        })
        console.log('comppp')
        res.status(StatusCodes.OK).json({ "message": updatedEmployee });
    }

    if (employee.employee_rating - normalizer.normalizer_rating >= 0.5) {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
            $set: {
                "appraisal.appraiser_status": 'appraiser-accepted-employee',
                "appraisal.appraiser_rating": employee.employee_rating,
                "appraisal.comments": comments,
                // "appraisal.objective_description": getRatingsfromObjectiveDescription(employee.objective_description),
                "appraisal.status": 'rejected',
                "normalizer.normalizer_status":"pending",
                "normalizerIsChecked": false,
                "normalizerIsDisabled": false,
            }
        })

        console.log('2nd case')

    }

    res.status(StatusCodes.OK).json({ "message": "success" })

})


const appraiserRejectsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.appraiser_status": 'appraiser-rejected-employee',
            "employee.employee_status":"pending"
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})

const normalizerSubmitEmployeeRejection = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { comments } = req.body

    const { employee, normalizer } = await Employee.findById(id)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $set: {
            "appraisal.status": 'completed',
            "normalizer.comments": comments,
            "normalizerIsChecked": true,
            "normalizerIsDisabled": true,
            "employee.objective_description": normalizer.objective_description,
            "employee.employee_rating": normalizer.normalizer_rating,
            "normalizer.normalizer_status": "re-normalized",
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
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

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "reviewer.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})


const attachmentsNormalizer = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "normalizer.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
})

const attachmentsEmployee = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const { attachments } = req.body
    console.log(attachments)

    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        $push: {
            "employee.attachments": attachments,
        }
    })
    res.status(StatusCodes.OK).json({ "message": updatedEmployee });
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

const getUnMappedEmployee = asyncHandler(async (req: Request, res: Response) => {

    // const appraisalCalendar = await AppraisalCalender.find({calendar:req.params.id})
    const appraisalCalendar = await AppraisalCalender.find({ calendar: req.params.id })

    const getEmployeefromAppraisalCalendar = appraisalCalendar.map((j: any) => {
        const data = j.position.map((k: any) => k.name.toString())
        return data
    }).flat()

    const getEmployee = await Employee.find({})

    const employeeId = getEmployee?.map(k => k._id.toString())

    const empp = [
        '62ac2037c1c19127416ab019',
        '62ac2037c1c19127416ab01a',
        '62ac2037c1c19127416ab01b',
        '62ac2037c1c19127416ab016',
        '62ac2037c1c19127416ab016',
        '62ac2037c1c19127416ab017'

    ]

    // const myArray = getEmployeefromAppraisalCalendar.filter(ar => !getEmployee.find(rm => (rm._id === ar.name ) ))
    // const myArray = employeeId.filter(ar => !getEmployeefromAppraisalCalendar.includes(rm => (rm === ar ) ))

    const appraisalCal = [
        "62ac2037c1c19127416ab004",
        "62ac2037c1c19127416ab005",
        "62ac2037c1c19127416ab006",
        "62ac2037c1c19127416ab007",
        "62ac2037c1c19127416ab008",
        "62ac2037c1c19127416ab009",
        "62ac2037c1c19127416ab00a",
        "62ac2037c1c19127416ab00b",
        "62ac2037c1c19127416ab00c",
        "62ac2037c1c19127416ab00d",
        "62ac2037c1c19127416ab00e",
        "62ac2037c1c19127416ab00f",
        "62ac2037c1c19127416ab010",
        "62ac2037c1c19127416ab011",
        "62ac2037c1c19127416ab012",
        "62ac2037c1c19127416ab013",
        "62ac2037c1c19127416ab014",
        "62ac2037c1c19127416ab015",
        "62ac2037c1c19127416aafe9",
        "62ac2037c1c19127416aafea",
        "62ac2037c1c19127416aafeb",
        "62ac2037c1c19127416aafec",
        "62ac2037c1c19127416aafed",
        "62ac2037c1c19127416aafee",
        "62ac2037c1c19127416aafef",
        "62ac2037c1c19127416aaff0",
        "62ac2037c1c19127416aaff1",
        "62ac2037c1c19127416aaff2",
        "62ac2037c1c19127416aaff3",
        "62ac2037c1c19127416aaff4",
        "62ac2037c1c19127416aaff5",
        "62ac2037c1c19127416aaff6",
        "62ac2037c1c19127416aaff7",
        "62ac2037c1c19127416aaff8",
        "62ac2037c1c19127416aaff9",
        "62ac2037c1c19127416aaffa",
        "62ac2037c1c19127416aaffb",
        "62ac2037c1c19127416aaffc",
        "62ac2037c1c19127416aaffd",
        "62ac2037c1c19127416aaffe",
        "62ac2037c1c19127416aafff",
        "62ac2037c1c19127416ab000",
        "62ac2037c1c19127416ab001",
        "62ac2037c1c19127416ab002",
        "62ac2037c1c19127416ab003"
    ]



    const myArray = getEmployee.filter(ar => !getEmployeefromAppraisalCalendar.includes(ar._id.toString()))

    const newArray = _.difference(getEmployee.map((j: any) => j._id.toString()), getEmployeefromAppraisalCalendar)

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

const getReviewerEmployee = asyncHandler(async (req: Request, res: Response) => {
    const emp = await Employee.findById({ _id: req.params.id })
    console.log(emp.legal_full_name, 'emppp')
    // const emp2 = await Employee.findOne({manager_code: emp.employee_code})
    const reviewerData = await Employee.find({ manager_code: emp.appraiser })


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
const removeAppraiserAttachmentsOverview = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name,objective_description } = req.body


    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "appraisal.attachments": { "url": name,"objective_description": new mongoose.Types.ObjectId(objective_description) },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

})





const removeReviewerAttachments = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params
    const { name } = req.body

    const updatedCalendar = await Employee.findByIdAndUpdate(id,
        {
            $pull: {
                "reviewer.attachments": { "url": name },
            }
        }, { new: true, multi: true }
    )
    res.status(StatusCodes.OK).json({ "message": updatedCalendar });

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
    res.status(StatusCodes.OK).json({message: "works "});
   //  res.status(StatusCodes.OK).json(data);
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
    getEmployeeTemplate,
    getReviewerEmployee,
    removeAppraiserAttachments,
    removeAppraiserAttachmentsOverview,
    removeNormalizerAttachments,
    removeEmployeeAttachments,
    removeReviewerAttachments,
    appraiserDashboard
}