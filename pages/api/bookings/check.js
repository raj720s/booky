import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { checkBookingAvaliability } from "../../../controllers/BookingControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.get(checkBookingAvaliability);
export default router;
