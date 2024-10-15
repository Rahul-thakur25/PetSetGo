import express from 'express';
import getVetArticles from '../controller/VetArticle/VetArticleController.js';

const router = express.Router();

router.get('/vetArticles', getVetArticles); // Define the route for veterinary articles

export default router;
