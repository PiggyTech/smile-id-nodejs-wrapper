import express from "express";

import ImageVerificationService from "../services/imageVerificationService";

const router = express.Router();
const imageVerificationService = new ImageVerificationService();

router.post("/verifySelfie", (req, res) => {
    // res.promise(() => imageVerificationService.verifyImage(req.body))
  imageVerificationService
    .verifyImage(req.body)
    .then((response) => {
      return res.status(200).json({
        data: response,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
});

export default router;
