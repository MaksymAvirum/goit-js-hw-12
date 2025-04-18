// зберігай функції для виконання HTTP-запитів:
// getImagesByQuery(query).Ця функція повинна приймати один параметр query(пошукове слово, яке є рядком),
//     здійснювати HTTP - запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



export function getImagesByQuery(query) {
    const PIXABAY_API_KEY = '49782329-6d8bd30771b2969fa2e08a84b';
    const PIXABAY_API_URL = 'https://pixabay.com/api/';
    const PIXABAY_PARAMS = {
        // key: PIXABAY_API_KEY,
        // q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    };
    return axios
        .get(
            `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${query}&image_type=${PIXABAY_PARAMS.image_type}&orientation=${PIXABAY_PARAMS.orientation}&safesearch=${PIXABAY_PARAMS.safesearch}`
            // PIXABAY_API_URL, { PIXABAY_PARAMS }
        )
        .then((response) => { return response.data; })
        .catch(error => {
            iziToast.error({ message: `❌ Error fetching images from PIXABAY`, position: 'topRight' });
        })
}