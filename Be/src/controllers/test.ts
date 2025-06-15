import { Request , Response } from "express";

export const test = (req:Request, res:Response) => {
    try {
        res.status(200).json({ message: "Test Route working fine" });
    } catch (error) {
        res.status(500).json({messgae:"Something went wrong"})
    }
}