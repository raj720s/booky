import nc from "next-connect";
import { registerUserController } from "../../../controllers/userAuthController";
import errorMiddleware from "../../../middlewares/ErrorMidware";
import dbConnect from "../../../utils/dBconnect";
const router = nc({ onError: errorMiddleware });
dbConnect();

router.post(registerUserController);
router.get((req, res) => {
  res.send("roiute working");
});

export default router;
