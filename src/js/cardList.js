function cardList(data) {
    this.data = data;

    this.init();
    this.bind();
}

cardList.prototype.init = function() {
    this.renderCards();
}

cardList.prototype.bind = function() {
    document.getElementById("nameAsc").addEventListener("click", () => {
        this.sortByNameAsc();
        this.renderCards();
    });

    document.getElementById("nameDes").addEventListener("click", () => {
        this.sortByNameDes();
        this.renderCards();
    });

    document.getElementById("ageAsc").addEventListener("click", () => {
        this.sortByAgeAsc();
        this.renderCards();
    });

    document.getElementById("ageDes").addEventListener("click", () => {
        this.sortByAgeDes();
        this.renderCards();
    });
}

cardList.prototype.renderCards = function() {
    let htmlOutput = '';
    this.data.forEach(function(element) {
        htmlOutput += `
        <div class="card">
            <img src="${element.imgUrl}" class="card-image" alt="${element.name} image" />
            
            <div class="card-overlay">
                <div class="card-header">
                    <div class="card-header-text">
                        <h3 class="card-title">Name: ${element.name} </h3>
                        <div class="card-age">Age: ${element.age} months </div>
                        <div class="card-color"> Color: ${element.color} </div>  
                    </div>
                </div>
                <button type="button" class="card-btn"> Adopt me</button>
            </div>
        </div>`;
    });

    document.getElementById('cards-wrapper').innerHTML = htmlOutput;
}

cardList.prototype.sortByAgeAsc = function() {
    const sortedDataAsc = this.data.sort(function(a, b) {
        return a.age - b.age;
    });
    this.data = sortedDataAsc;
}

cardList.prototype.sortByAgeDes = function() {
    const sortedDataDes = this.data.sort(function(a, b) {
        return b.age - a.age;
    });
    this.data = sortedDataDes;
}

cardList.prototype.sortByNameAsc = function() {
    const sortedDataNameAsc = this.data.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
    this.data = sortedDataNameAsc;
}

cardList.prototype.sortByNameDes = function() {
    const sortedDataNameDes = this.data.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
    this.data = sortedDataNameDes;
}

export default cardList;