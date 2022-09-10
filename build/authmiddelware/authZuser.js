"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secretToken = process.env.SECRET_TOKEN;
var verifyAuthToken = function (req, res, next) {
    try {
        var authzHeader = req.headers.authorization || ' ';
        // console.log('auth ' + authzHeader)
        var token = authzHeader.split(' ')[1];
        // console.log('token: ' + token)
        //  console.log('secretToken: ' + secretToken)
        if (!token) {
            throw new Error('Authentication failed!');
        }
        var verified = jsonwebtoken_1.default.verify(token, secretToken);
        req.body = verified;
        // console.log(verified)
        next();
    }
    catch (err) {
        res.status(401);
        res.json("token requir ".concat(err));
    }
};
exports.default = verifyAuthToken;
