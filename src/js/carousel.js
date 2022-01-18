import modal from "/src/js/modal.js"

function carousel(data) {
    this.data = data;
    this.carouselItems;
    this.visibleSlides = 3;
    this.sliderIntervalTime = 3000;

    this.init();
    this.bind();

}

carousel.prototype.init = function() {
    // this.startSlider();
    this.filterFourYoungest();
    this.renderCarousel(this.carouselItems);

}

carousel.prototype.bind = function() {
    this.onClickNextBtn();
    this.onClickPreviousBtn();
    // this.onMouseInteractActiveItem();
    this.clickOnSlide();

    document.addEventListener('catAdopted', (e) => {
        let removedItem = this.data.filter((item) => {
            return item.id != e.detail.id;
        });

        this.data = removedItem;
        this.filterFourYoungest();
        this.renderCarousel(this.carouselItems);
    });

}

carousel.prototype.filterFourYoungest = function() {
    this.carouselItems = this.data.sort(function(a, b) {
        return a.age - b.age;
    });

    this.carouselItems = this.carouselItems.slice(0, 4);
}

carousel.prototype.nextSlide = function() {
    let firstSlide = this.carouselItems.shift();
    this.carouselItems.push(firstSlide);
    this.renderCarousel(this.carouselItems);
    this.onMouseInteractActiveItem();
    this.clickOnSlide();
}

carousel.prototype.previousSlide = function() {
    let lastSlide = this.carouselItems.pop();
    this.carouselItems.unshift(lastSlide);
    this.renderCarousel(this.carouselItems);
    this.onMouseInteractActiveItem();
    this.clickOnSlide();
}

carousel.prototype.startSlider = function() {
    this.sliderInterval = setInterval(() => {
        this.nextSlide();
    }, this.sliderIntervalTime);
}

carousel.prototype.stopSlider = function() {
    clearInterval(this.sliderInterval);
}

carousel.prototype.onClickNextBtn = function() {
    document.getElementById('next-slide').addEventListener('click', () => {
        this.nextSlide();
    })
}

carousel.prototype.onClickPreviousBtn = function() {
    document.getElementById('prev-slide').addEventListener('click', () => {
        this.previousSlide();
    })
}

carousel.prototype.onMouseInteractActiveItem = function() {
    const mouseTarget = document.getElementsByClassName('item-active')[0];
    mouseTarget.addEventListener('mouseenter', () => {
        this.stopSlider();
    });
    mouseTarget.addEventListener('mouseleave', () => {
        this.startSlider();
    });
}

carousel.prototype.renderCarousel = function(visibleData) {
    let htmlCarousel = '';
    let data = visibleData.slice(0, this.visibleSlides)

    data.forEach(function(element, index) {
        let activeClass = '';
        (index === 1) ? activeClass = 'item-active': '';

        htmlCarousel += `
            <div class="slide-item ${activeClass}" data-cat-id="${element.id}">
                    <div class="slide-item-image">
                        <img src="${element.imgUrl}">
                    </div>
                    <div class="slide-item-text">
                        <h3 class="slide-item-text--name">Name: ${element.name}</h3>
                        <p class="slide-item-text--age">Age: ${element.age} months</p>
                    </div>
            </div>
        `;
    });

    document.getElementById('carousel-wrapper').innerHTML = htmlCarousel;
}

carousel.prototype.clickOnSlide = function() {
    let cardSlideCarousel = document.querySelector(".slide-item.item-active");
    const that = this;

    cardSlideCarousel.addEventListener('click', () => {
        new modal(that.data, cardSlideCarousel.dataset.catId)
    });
}

export default carousel;