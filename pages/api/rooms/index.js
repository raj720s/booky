import nc from "next-connect";
import {
  addNewRoomController,
  getAllRoomsctrl,
} from "../../../controllers/roomcontrollers";
import errorMiddleware from "../../../middlewares/ErrorMidware";
import dbConnect from "../../../utils/dBconnect";
const router = nc({ onError: errorMiddleware });
dbConnect();

router.get(getAllRoomsctrl);
router.post(addNewRoomController);

export default router;
