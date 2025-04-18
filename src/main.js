import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api';
import { clearGallery, createGallery, hideLoader, showLoader } from './js/render-functions';
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const query = form.elements['search-text'].value;
    clearGallery();
    if (query === '') {
        iziToast.error({ message: 'Please enter a search query!', position: 'topRight' });
        return;
    }
    showLoader();
    const data = getImagesByQuery(query);
    data.then(response => {
        if (response.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
            return;
        }
        createGallery(response.hits);
    }).catch(() => {
        iziToast.error({ message: "❌ Error fetching images from PIXABAY`", position: 'topRight' });
    })
        .finally(() => {
            hideLoader();
        });
    form.reset();
});