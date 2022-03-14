import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { newBookingController } from "../../../controllers/BookingControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).post(newBookingController);
export default router;
