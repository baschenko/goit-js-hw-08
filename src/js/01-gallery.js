// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);




const galleryContainer = document.querySelector('.gallery');

const markupGallery = createGaleryCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', markupGallery);


galleryContainer.addEventListener('click', onGalleryContainerClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
});

function createGaleryCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li> 
    `;
    })
    .join('');
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isGalleryImageEl = evt.target.classList.contains('gallery__image');
  if (!isGalleryImageEl) {
    return;
  }
}

