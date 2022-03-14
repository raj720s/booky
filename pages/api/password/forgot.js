import nc from "next-connect";
import { forgotPasswordController } from "../../../controllers/userAuthController";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import dbConnect from "../../../utils/dBconnect";
const router = nc({ onError: errorMiddleware });
dbConnect();

router.post(forgotPasswordController);

export default router;
