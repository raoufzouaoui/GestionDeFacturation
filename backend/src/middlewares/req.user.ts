import { Request } from "express"
import { User } from "../models/user.model"
export interface IGetUserAuthInfoRequest extends Request {
  user: User // or any other type
}