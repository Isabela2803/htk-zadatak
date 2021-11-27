function carousel(data) {
    this.data = data;
    this.start();
    this.showSlides();
    this.plusSlides();
    this.currentSlide();
}

carousel.prototype.filterFourYoungest = function() {

}

carousel.prototype.start = function() {
    this.renderCarousel();

}
carousel.prototype.showSlides = function(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let slideIndex = 1;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[slideIndex - 1].style.display = "block";
    }
}


carousel.prototype.plusSlides = function(n) {
    let slideIndex = 1;
    this.showSlides(slideIndex += n);
}

carousel.prototype.currentSlide = function(n) {
    let slideIndex = 1;
    this.showSlides(slideIndex = n);

}

carousel.prototype.renderCarousel = function() {
    let htmlCarousel = '';
    this.data.forEach(function(element) {
        htmlCarousel += `
<div class="slideshow-container">
    <div class="mySlides fade">
        <div class="card current--card">
            <div class="card__image">
                <img src="${element.imgUrl}">
            </div>
        </div>
        <div class="info current--info">
            <div class="text">
                <h1 class="text name">Name: ${element.name}</h1>
                <h4 class="text location">Age:${element.age} months</h4>
                <p class="text description">Color: ${element.color}</p>
            </div>
        </div>
    </div>
</div>
<div class="mySlides fade">
    <div class="card next--card">
        <div class="card__image">
            <img src="${element.imgUrl}">
        </div>
    </div>
    <div class="info next--info">
        <div class="text">
            <h1 class="text name">Name: ${element.name}</h1>
            <h4 class="text location">Age:${element.age} months</h4>
            <p class="text description">Color: ${element.color}</p>
        </div>
    </div>
</div>

<div class="mySlides fade">
    <div class="card next2--card">
        <div class="card__image">
            <img src="${element.imgUrl}">
        </div>
    </div>
    <div class="info next2--info">
        <div class="text">
            <h1 class="text name">Name: ${element.name}</h1>
            <h4 class="text location">Age:${element.age} months</h4>
            <p class="text description">Color: ${element.color}</p>
        </div>
    </div>
</div>

<div class="mySlides fade">

    <div class="card previous--card">
        <div class="card__image">
            <img src="${element.imgUrl}">
        </div>
    </div>
    <div class="info previous--info">
        <div class="text">
            <h1 class="text name">Name: ${element.name}</h1>
            <h4 class="text location">Age:${element.age} months</h4>
            <p class="text description">Color: ${element.color}</p>
        </div>
    </div>
</div>
<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
<a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>`;
    });

    document.getElementById('carousel-wrapper').innerHTML = htmlCarousel;
}


// carousel.prototype.showSlides1 = function() {
//   let slideIndex1 = 0;
//     let i;
//     let slides1 = document.getElementsByClassName("mySlides");
//     for (i = 0; i < slides1.length; i++) {
//         slides1[i].style.display = "none";
//     }
//     slideIndex1++;
//     if (slideIndex1 > slides1.length) { slideIndex1 = 1 }
//     slides1[slideIndex1 - 1].style.display = "block";
//     setTimeout(showSlides1, 3500); 
// }

// this.showSlides1();
export default carousel;