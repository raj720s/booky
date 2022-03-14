import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { getUserBookingsController } from "../../../controllers/BookingControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).get(getUserBookingsController);
export default router;
