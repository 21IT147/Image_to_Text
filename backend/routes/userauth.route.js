import { Router } from "express";
import userSignup from "../controller/usersignup.controller.js";
import userLogin from "../controller/userlogin.controller.js";
import userLogout from "../controller/userlogout.controller.js";
import getUserDetails from "../controller/userdetail.controller.js";

const router = Router();

router.route("/sign-up").post(userSignup);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/details").post(getUserDetails);
export default router;
