import express from "express";
const router = express.Router();
import handleFreeBusyRequest from "../controllers/freebusyController";

router.get("/api/freeBusy", handleFreeBusyRequest);

console.log("Loaded free busy routes");

export default router;