
import toastr from 'toastr';
import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardTmp from './templates/card.hbs';
import LoadMoreBtn from './js/load-more-btn';
import * as basicLightbox from 'basiclightbox';



const refs = {
    searchForm: document.querySelector('#search-form'),
    cardContainer: document.querySelector('.js-gallery'),
};



const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchCard)

function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        return toastr.warning('Please, enter smth');;

    }
    loadMoreBtn.show();
    imageApiService.resetPage();
    refs.cardContainer.innerHTML = '';;
    fetchCard();

    
}

function fetchCard() {
    loadMoreBtn.disable();
    imageApiService.fetchImageCard().then(render);

    loadMoreBtn.enable();
}

function render(data) {
    const markup = cardTmp(data);
    refs.cardContainer.insertAdjacentHTML('beforeend', markup);
    refs.cardContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
}

refs.cardContainer.onclick = (event) => {

    const instance = basicLightbox.create(`
		<img src="${event.target.dataset.source}" alt="${event.target.alt}">
	`);
    instance.show(event);
}
