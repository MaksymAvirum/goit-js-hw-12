// створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:
// createGallery(images).Ця функція повинна приймати масив images, створювати HTML - розмітку для галереї,
//     додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh().Нічого не повертає.
// clearGallery().Ця функція нічого не приймає та повинна очищати вміст контейнера галереї.Нічого не повертає.
// showLoader().Ця функція нічого не приймає, повинна додавати клас для відображення лоадера.Нічого не повертає.
// hideLoader().Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера.Нічого не повертає.

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryLightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

const gallery = document.querySelector('.gallery');
export function createGallery(images) {
    const markup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<li class="gallery-item">
                    <a href="${largeImageURL}">
                        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                        <div class='info'>
                            <p><b>likes</b> ${likes}</p>
                            <p><b>views</b> ${views}</p>
                            <p><b>comments</b> ${comments}</p>
                            <p><b>downloads</b> ${downloads}</p>
                        </div>
                    </a>
                </li>`;
        })
        .join('');
    gallery.innerHTML = markup;
    galleryLightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

const loader = document.querySelector('.loader');
export function showLoader() {
    loader.classList.remove('hidden');
}

export function hideLoader() {
    loader.classList.add('hidden');
}
