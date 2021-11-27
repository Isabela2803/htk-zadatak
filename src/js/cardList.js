function cardList(data) {
    this.data = data;

    this.sortBy = 'age';
    this.sortOrder = 'asc';

    this.visibleItems = 20;
    this.updateFiltersEvent = new Event('filtersUpdated');

    this.filters = {
        lessThenSixMonths: '',
        lessThenTwelveMonths: '',
        colorBlack: '',
    }

    this.init();
    this.bind();
    this.search1();
}

cardList.prototype.init = function() {
    this.sortItems();
    this.adoptCat();
    this.renderCards(this.data);
}

cardList.prototype.bind = function() {
    let sortByBtns = document.getElementsByName('sort-by');
    let sortOrderBtns = document.getElementsByName("sort-order");
    let sortLessSixBtn = document.getElementById("less-than-six");
    let sortLessTwelveBtn = document.getElementById("less-than-twelve");
    let sortColorCatsBtn = document.getElementById("filter-by-color");

    sortLessSixBtn.addEventListener('change', (e) => {
        this.filters.lessThenSixMonths = e.target.checked;
        document.dispatchEvent(this.updateFiltersEvent);
    })

    sortLessTwelveBtn.addEventListener('change', (e) => {
        this.filters.lessThenTwelveMonths = e.target.checked;
        document.dispatchEvent(this.updateFiltersEvent);
    })

    sortColorCatsBtn.addEventListener('change', (e) => {
        this.filters.colorBlack = e.target.checked;
        document.dispatchEvent(this.updateFiltersEvent)
    })

    sortByBtns.forEach(el => {
        el.addEventListener('change', () => {
            this.sortBy = el.value;
            document.dispatchEvent(this.updateFiltersEvent);
        })
    });

    sortOrderBtns.forEach(el => {
        el.addEventListener('change', () => {
            this.sortOrder = el.value;
            document.dispatchEvent(this.updateFiltersEvent);
        })
    });

    document.addEventListener('filtersUpdated', () => {
        this.sortItems();
        let filteredData = this.filterItems();
        this.renderCards(filteredData);
    })

    this.onClickAdoptBtn();
    this.closeAdoptBtn();
    this.onClickLoadMoreBtn();
}

cardList.prototype.filterItems = function() {
    let filteredData = this.data;

    if (this.filters.lessThenSixMonths) {
        filteredData = filteredData.filter((item) => {
            return item.age < 6;
        });
    }

    if (this.filters.lessThenTwelveMonths) {
        filteredData = filteredData.filter((item) => {
            return item.age < 12;
        });
    }

    if (this.filters.colorBlack) {
        filteredData = filteredData.filter((item) => {
            return item.color === "black";
        });
    }

    return filteredData;
}

cardList.prototype.sortItems = function() {
    this.sortByOrder();
    this.sortByValue();
}

cardList.prototype.search1 = function() {
    const searchWrapper = document.querySelector(".search-input");
    const inputBox = searchWrapper.querySelector("input");

    inputBox.addEventListener('keyup', (e) => {
        let data = this.filterItems();
        let found = data.filter(el => el.name.toLowerCase().includes(inputBox.value.toLowerCase()))
        this.renderCards(found);
    });
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

cardList.prototype.renderCards = function(visibleData) {
    let htmlOutput = '';
    let data = visibleData.slice(0, this.visibleItems)
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
                <button type="button" class="card-btn" value="${element.id}"> Adopt me</button>
            </div>
        </div>`
    });
    document.getElementById('cards-wrapper').innerHTML = htmlOutput;
}

cardList.prototype.onClickLoadMoreBtn = function() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", () => {
        this.visibleItems += 20;

        if (this.visibleItems >= 35) {
            loadMoreBtn.remove();
        }

        this.sortItems();
        let filteredData = this.filterItems();
        this.renderCards(filteredData);
    })
}

cardList.prototype.onClickAdoptBtn = function() {
    let cardButtonModal = document.querySelectorAll(".card-btn");
    cardButtonModal.forEach(el => {
        el.addEventListener('click',
            function() {
                let modal = document.querySelectorAll(".bg-modal");
                modal.forEach(el => {
                    el.style.display = "flex";
                })
            });
    });

}

cardList.prototype.closeAdoptBtn = function() {
    let cardButtonModal = document.querySelectorAll(".close");
    cardButtonModal.forEach(el => {
        el.addEventListener('click',
            function() {
                let modal = document.querySelectorAll(".bg-modal");
                modal.forEach(el => {
                    el.style.display = "none";
                })
            });
    });

}

cardList.prototype.adoptCat = function(catName) {
    for (let i = 0; i < this.data.length; i += 1) {
        if (this.data[i].name === catName) {
            this.data.splice(i, 1)
            return;
        }
    }
}
export default cardList;