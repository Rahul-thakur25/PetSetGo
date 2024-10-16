import express from 'express';
import axios from 'axios';

const app = express();

const getVetArticles = async (req,res) => {
    const apiKey = '2c7d5ca23c6847c1888e0550db60268a';
    const query = 'pet health tips';
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;

        // Map the articles to a format you want to send to the frontend
        const formattedArticles = articles.map(article => ({
            title: article.title,
            source: article.source.name,
            publishedAt: article.publishedAt,
            url: article.url,
            description: article.description || 'No description available.', // Include description if available
        }));

        return res.send(formattedArticles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw new Error('Failed to fetch articles');
    }
};

export default getVetArticles;