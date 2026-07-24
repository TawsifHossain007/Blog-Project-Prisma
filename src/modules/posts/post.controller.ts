import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./posrt.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await postService.createPostInDB(payload, id as string);

     sendResponse(res, {
        success : true,
        statusCode : httpStatus.CREATED,
        message : "Post Created SuccessFully",
        data : result
    })
})

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostsFromDB();

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Posts Fetched SuccessFully",
        data : result
    })
})

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if(!postId) {
        throw new Error("Post Id is Required");
    }   

    const result = await postService.getPostByIdFromDB(postId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post Fetched SuccessFully",
        data : result
    })
})

const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    if(!postId){
        throw new Error("Post Id Must be Provided")
    }
    const payload = req.body;

    const result = await postService.updatePostInDB(postId as string, payload, authorId as string, isAdmin);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post Updated SuccessFully",
        data : result
    })
})

const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    if(!postId){
        throw new Error("Post Id Must be Provided")
    }

    await postService.deletePostFromDB(postId as string, isAdmin, authorId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post Deleted SuccessFully",
        data : null
    })
})

const getPostsStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsStatsFromDB()

     sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "Post Stats Retrieved SuccessFully",
        data : result
    })
})

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;

    const result = await postService.getMyPostsFromDB(authorId as string);

    sendResponse(res, {
        success : true,
        statusCode : httpStatus.OK,
        message : "My Posts Fetched SuccessFully",
        data : result
    })
})

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};