import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { checkBookedDates_controller } from "../../../controllers/BookingControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.get(checkBookedDates_controller);
export default router;
