import nc from "next-connect";
import {
  getOneRoomDatabyId,
  updateRoombyIdController,
  deleteRoombyIdController,
} from "../../../controllers/roomcontrollers";
import errorMiddleware from "../../../middlewares/ErrorMidware";

import dbConnect from "../../../utils/dBconnect";

const router = nc({ onError: errorMiddleware });
dbConnect();

router.get(getOneRoomDatabyId);
router.delete(deleteRoombyIdController);
router.put(updateRoombyIdController);

export default router;
