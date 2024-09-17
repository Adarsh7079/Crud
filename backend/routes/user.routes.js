import express from "express"
import { deleteUser, getall, register, updateUserProfile } from "../controllers/user.controller.js";


const router=express();

router.route("/register").post(register);
router.route("/all").get(getall);
router.route("/update/:id").put(updateUserProfile);
router.route("/:id").delete(deleteUser);
export default router;