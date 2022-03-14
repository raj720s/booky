import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { getBookiongDetailsbyId_controller } from "../../../controllers/BookingControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();

router.use(checklogin).get(getBookiongDetailsbyId_controller);
export default router;
