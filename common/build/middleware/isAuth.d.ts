import { Request, Response, NextFunction } from "express";
export interface IUser {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    restaurantId: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const isSeller: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
