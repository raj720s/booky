import nc from "next-connect";
import { hook_checkout } from "../../controllers/PaymentControllers";
import errorMiddleware from "../../middlewares/ErrorMidware";
import dbConnect from "../../utils/dBconnect";
const router = nc({ onError: errorMiddleware });
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(hook_checkout);

export default router;
