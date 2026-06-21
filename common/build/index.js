"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureCloudinary = void 0;
__exportStar(require("./middleware/cloudinary"), exports);
__exportStar(require("./middleware/isAuth"), exports);
// middleware/cloudinary.ts
const cloudinary_1 = __importDefault(require("cloudinary"));
const configureCloudinary = () => {
    const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;
    if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
        throw new Error("Missing Cloudinary environment variables");
    }
    cloudinary_1.default.v2.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUD_API_KEY,
        api_secret: CLOUD_SECRET_KEY,
    });
};
exports.configureCloudinary = configureCloudinary;
