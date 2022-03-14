import nc from "next-connect";
import dbConnect from "../../../utils/dBconnect";

import errorMiddleware from "../../../middlewares/ErrorMidware";
import { checklogin } from "../../../middlewares/authMidware";
import { stripeCheckOutSessionController } from "../../../controllers/PaymentControllers";

const router = nc({ onError: errorMiddleware });

dbConnect();
// recieves id ,checkindate, chkoutdate , days ofstay from roomDetails components bookroom function
router.use(checklogin).get(stripeCheckOutSessionController);
export default router;
