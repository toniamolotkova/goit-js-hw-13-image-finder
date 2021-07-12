import toastr from 'toastr';
const API_KEY = '22352284-07c51f530b6e71a5deb2eb1e0';
const BASE_URL = 'https://pixabay.com/api/';


export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImageCard() {
        const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          this.incrementPage();
          return data;
        }
      }
      catch (error) {
        if (error) {
          toastr.error('Sorry, error');
        }
      }
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
