import carousel from '/src/js/carousel.js';
import cardList from '/src/js/cardList.js';

fetch("/data.json")
    .then(response => response.json())
    .then(data => new cardList(data));