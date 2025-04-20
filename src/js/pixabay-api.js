
import axios from 'axios';
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

export async function getImagesByQuery(query, page) {
    const PIXABAY_API_KEY = '49809160-ecb9db209c3e158eb7196d46c';
    const PIXABAY_API_URL = 'https://pixabay.com/api/';

    const response = await axios
        .get(PIXABAY_API_URL, {
            params: {
                key: PIXABAY_API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15,
            }
        });
    return response.data;
}


