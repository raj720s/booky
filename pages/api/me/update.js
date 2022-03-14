import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";
import { updateUserProfileController } from "../../../controllers/userAuthController";
import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).put(updateUserProfileController);
export default router;
