import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";
import checkReviewAvailabilityController from "../../../controllers/roomcontrollers";
import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).get(checkReviewAvailabilityController);
export default router;
