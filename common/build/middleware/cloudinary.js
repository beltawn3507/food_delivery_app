"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const parser_js_1 = __importDefault(require("datauri/parser.js"));
const path_1 = __importDefault(require("path"));
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new parser_js_1.default();
    const extName = path_1.default.extname(file.originalname).toString();
    const buffer = parser.format(extName, file.buffer);
    if (!(buffer === null || buffer === void 0 ? void 0 : buffer.content)) {
        console.log("Buffer.content not found ");
        return;
    }
    try {
        const cloud = yield cloudinary_1.default.v2.uploader.upload(buffer.content);
        return { url: cloud.secure_url };
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.uploadImage = uploadImage;
