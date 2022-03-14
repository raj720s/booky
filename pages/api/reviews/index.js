import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";
import create_reviewController from "../../../controllers/roomcontrollers";
import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).post(create_reviewController);
export default router;
