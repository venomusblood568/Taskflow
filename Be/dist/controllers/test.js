"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test = (req, res) => {
    try {
        res.status(200).json({ message: "Test Route working fine" });
    }
    catch (error) {
        res.status(500).json({ messgae: "Something went wrong" });
    }
};
exports.test = test;
