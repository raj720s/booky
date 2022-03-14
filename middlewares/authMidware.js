import catchAsync from "./asyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { getSession } from "next-auth/client";

export const checklogin = catchAsync(async (req, res, nxt) => {
  const usersession = await getSession({ req });
  // get session gets the auth token from req.headers
  if (!usersession) {
    return nxt(new ErrorHandler("login to access the resource", 401));
  }
  req.user = usersession.user; // sets the req user to the sesson user ..
  // gets the req user from the session user
  nxt();
});
