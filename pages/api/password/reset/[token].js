import nextConnect from "next-connect";
import { resetPasswordController } from "../../../../controllers/userAuthController";
import errorMiddleware from "../../../../middlewares/ErrorMidware";
import dbConnect from "../../../../utils/dBconnect";

const router = nextConnect({ onError: errorMiddleware });

dbConnect();

router.put(resetPasswordController);

export default router;
