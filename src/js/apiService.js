const API_KEY = '22352284-07c51f530b6e71a5deb2eb1e0';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
    //mode: 'no-cors',
    headers: {

        'Content-Type': 'application/json',
        Authorization: API_KEY,
    },
};

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImageCard() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url, options)
            .then(response => {
                response.json()
                console.log
            })
            .then(({ imageCard }) => {
                this.incrementPage();
                return imageCard;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
