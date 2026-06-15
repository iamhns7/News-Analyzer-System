import axios from 'axios';

export const fetchArticles = async () => {
    const response = await axios.get('http://localhost:3000/api/articles');
    return response.data;
};
