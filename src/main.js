import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
    clearGallery,
    createGallery,
    hideLoader,
    showLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions';
const form = document.querySelector('.form');
let page = 1;
let totalPages = 1;
let query = "";

form.addEventListener('submit', async event => {
    event.preventDefault();
    query = form.elements['search-text'].value;
    clearGallery();
    if (query === '') {
        iziToast.error({
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return;
    }
    showLoader();

    try {
        const response = await getImagesByQuery(query, page);

        if (response.hits.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }
        createGallery(response.hits);

        totalPages = Math.ceil(response.totalHits / 15);
        if (totalPages > 1) {
            showLoadMoreButton();
        }
    }
    catch (error) {
        iziToast.error({
            message: '❌ Error fetching images from PIXABAY`',
            position: 'topRight',
        });
    }
    finally {
        hideLoader();
    };

    form.reset();
});

const loadMoreBtn = document.querySelector('.btn-load-more');
loadMoreBtn.addEventListener('click', moreBtnClick);
async function moreBtnClick() {
    page += 1;
    hideLoadMoreButton();
    showLoader();
    try {
        const response = await getImagesByQuery(query, page);
        createGallery(response.hits);

        const { height: cardHeight } = document
            .querySelector('.gallery-item')
            .getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: 'You have reached the end of search results'
            });
        } else {
            showLoadMoreButton();
        }

    } catch (error) {
        iziToast.error({
            message: '❌ Error fetching images from PIXABAY`',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    };
}