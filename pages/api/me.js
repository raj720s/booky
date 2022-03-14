import nc from "next-connect";
import dbConnect from "../../utils/dBconnect";
import { currentUserController } from "../../controllers/userAuthController";
import errorMiddleware from "../../middlewares/ErrorMidware";
import { checklogin } from "../../middlewares/authMidware";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).get(currentUserController);
export default router;
