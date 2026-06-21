import express from "express";
import cloudinary from "cloudinary";
import DataUriParser from "datauri/parser.js";
import path from "path";


export const uploadImage = async (file:any)=>{
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();

  const buffer =  parser.format(extName,file.buffer);

  if(!buffer?.content){
    console.log("Buffer.content not found ")
    return
  }

  try{
    const cloud = await cloudinary.v2.uploader.upload(buffer.content);
    return {url : cloud.secure_url};
  }catch(error:any){
    console.log(error.message)
  }

}