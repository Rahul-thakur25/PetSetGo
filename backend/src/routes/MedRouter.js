import express from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import medprescription from "../controller/MedicalController/MedController.js"
const router = express();
router.post('/:petId/medicalPresc',upload.single('Prescerption'),medprescription)

export default router;