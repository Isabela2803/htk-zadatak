function cardList(data) {
    this.data = data;
    this.sortBy = 'age';
    this.sortOrder = 'asc';
    this.visibleItems = 20;
    this.updateFiltersEvent = new Event('filtersUpdated');

    this.init();
    this.bind();

}

cardList.prototype.init = function() {
    this.sortItems();
    this.renderCards();
}

cardList.prototype.bind = function() {
    let sortByBtns = document.getElementsByName('sort-by');
    let sortOrderBtns = document.getElementsByName("sort-order");

    sortByBtns.forEach(el => {
        el.addEventListener('change', () => {
            this.sortBy = el.value;
            document.dispatchEvent(this.updateFiltersEvent)
        })
    });

    sortOrderBtns.forEach(el => {
        el.addEventListener('change', () => {
            this.sortOrder = el.value;
            document.dispatchEvent(this.updateFiltersEvent)
        })
    });

    document.addEventListener('filtersUpdated', () => {
        this.sortCards();
        this.renderCards();
    })

    this.onClickLoadMoreBtn();
    // this.onClickAdoptBtn();
}

cardList.prototype.sortItems = function() {
    return this.data.sort(function(a, b) {
        return a.age - b.age;
    });
}

cardList.prototype.sortCards = function() {
    this.sortByOrder();
    this.sortByValue();
}

cardList.prototype.sortByOrder = function() {
    let sortedData;
    if (this.sortBy === "age") {
        if (this.sortOrder === "asc") {
            sortedData = this.data.sort(function(a, b) {
                return a.age - b.age;
            });
        }
        if (this.sortOrder === "desc") {
            sortedData = this.data.sort(function(a, b) {
                return b.age - a.age;
            });
        }
        this.data = sortedData;
    }
}

cardList.prototype.sortByValue = function() {
    let sortedBy;
    if (this.sortBy === "name") {

        if (this.sortOrder === "asc") {
            sortedBy = this.data.sort(function(a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;

                return 0;
            });
        }
        if (this.sortOrder === "desc") {
            sortedBy = this.data.sort(function(a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                if (nameA > nameB) return -1;
                if (nameA > nameB) return 1;

                return 0;
            });
        }
        this.data = sortedBy;
    }
}

cardList.prototype.renderCards = function() {
    let htmlOutput = '';
    let data = this.data.slice(0, this.visibleItems)
    data.forEach(function(element) {
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

cardList.prototype.onClickLoadMoreBtn = function() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", () => {
        this.visibleItems = this.visibleItems + 20;
        if (this.visibleItems >= 35) {
            loadMoreBtn.remove();
        }
        this.sortByOrder();
        this.sortByValue();
        this.renderCards();
    })
}


cardList.prototype.onClickAdoptBtn = function() {
    let adoptCatBtn = document.getElementsByClassName("card-btn");
    let adoptCatCard = document.getElementsByClassName("card");
    adoptCatBtn.addEventListener("click", () => {
        adoptCatBtn.remove() + adoptCatCard.remove();
    })

    this.renderCards();
}

console.log(document.getElementsByClassName("card-btn"))


export default cardList;