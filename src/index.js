'use strict';


import './sass/main.scss';
import ImageApiService from './js/apiService';
import cardTmp from './templates/card.hbs';



const refs = {
    searchForm: document.querySelector('#search-form'),
    cardContainer: document.querySelector('.js-gallery'),
};

const imageApiService = new ImageApiService();
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;

    if (imageApiService.query === '') {
        return alert('Wrong entry, put smth else');
    }
    imageApiService.resetPage();
    refs.articlesContainer.innerHTML = '';;
    fetchCard();
}

function fetchCard() {
    imageApiService.fetchImageCard().then(imageCard => {
        refs.cardContainer.insertAdjacentHTML('beforeend', cardTmp(imageCard))
    })
}

