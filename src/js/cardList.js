function cardList(data) {
    this.data = data;
    this.sortBy = 'age';
    this.sortOrder = 'asc';
    // this.lessThan6Sorted = 'sort-less-6';
    // this.lessThan12Sorted = 'sort-less-12';
    // this.colorBlackSorted = 'sort-black-color';
    this.visibleItems = 20;
    this.updateFiltersEvent = new Event('filtersUpdated');


    this.init();
    this.bind();
    this.search1();


}

cardList.prototype.init = function() {
    this.sortItems();
    this.adoptCat();
    this.renderCards();
}

cardList.prototype.bind = function() {
    let sortByBtns = document.getElementsByName('sort-by');
    let sortOrderBtns = document.getElementsByName("sort-order");
    let sortLessSixBtn = document.getElementById("less-than-six");
    let sortLessTwelveBtn = document.getElementById("less-than-twelve");
    let sortColorCatsBtn = document.getElementById("filter-by-color");

    sortLessSixBtn.addEventListener('change', (e) => {
        this.lessThan6Sorted = e.target.value;
        document.dispatchEvent(this.updateFiltersEvent)

    })

    sortLessTwelveBtn.addEventListener('change', (e) => {
        this.lessThan12Sorted = e.target.value;
        document.dispatchEvent(this.updateFiltersEvent)
    })

    sortColorCatsBtn.addEventListener('change', (e) => {
        this.colorBlackSorted = e.target.value;
        document.dispatchEvent(this.updateFiltersEvent)
    })

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
    this.onClickAdoptBtn();
    this.closeAdoptBtn();
    this.onClickLoadMoreBtn();



}

cardList.prototype.sortItems = function() {
    return this.data.sort(function(a, b) {
        return a.age - b.age;
    });
}

cardList.prototype.sortCards = function() {
    this.sortByOrder();
    this.sortByValue();
    this.sortByLessThan6();
    this.sortByLessThan12();
    this.sortByBlackColor();
}

cardList.prototype.sortByBlackColor = function() {
    let sortedByColor;
    if (this.colorBlackSorted === 'sort-black-color') {
        sortedByColor = this.data.filter((item) => {
            return item.color === "black";
        });
        this.data = sortedByColor;
    }
    let isChecked = document.getElementById("filter-by-color").checked;

    if (isChecked) {
        console.log("Input is checked");
    } else {
        console.log("Input is off")
    }

}

cardList.prototype.sortByLessThan6 = function() {
    let sortedLess6;
    if (this.lessThan6Sorted === 'sort-less-6') {
        sortedLess6 = this.data.filter((item) => {
            return item.age < 6;
        });
        this.data = sortedLess6;
    }
    this.sortByOrder();
    this.sortByValue();
    this.renderCards();
}

cardList.prototype.sortByLessThan12 = function() {
    let sortedLess12;
    if (this.lessThan12Sorted === 'sort-less-12') {
        sortedLess12 = this.data.filter((item) => {
            return item.age < 12;
        });
        this.data = sortedLess12;
    }
    this.sortByOrder();
    this.sortByValue();
    this.renderCards();
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
                <button type="button" class="card-btn" value="${element.id}"> Adopt me</button>
            </div>
        </div>`
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
cardList.prototype.search1 = function() {

    const searchWrapper = document.querySelector(".search-input");
    const inputBox = searchWrapper.querySelector("input");
    let data = this.data;

    inputBox.addEventListener('keyup', (e) => {
        let found = this.data.filter(el => el.name.toLowerCase().includes(inputBox.value.toLowerCase()))
        this.data = found;
        if (inputBox.value === "") {
            this.data = data;
        }
        this.renderCards();
    });
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
            this.renderCards();
        }

    }
    // cardList.prototype.closeAdoptBtn = function() {
    //     document.getElementsByClassName('close').addEventListener('click',
    //         function() {
    //             document.getElementsByClassName('bg-modal').style.display
    //         })

// }

// cardList.prototype.onClickAdoptBtn = function() {
//     let adoptBtn = document.getElementsByClassName("card-btn");
//     for (let i = 0; i < adoptBtn.length; i++) {
//         adoptBtn[i].addEventListener('click', function(e) {
//             console.log(e);
//             alert(document.getElementsByClassName("modal"))
//             console.log(adoptBtn)
//         })
//     }
// }

// sortOrderBtns.forEach(el => {
//     el.addEventListener('change', () => {
//         this.sortOrder = el.value;
//         document.dispatchEvent(this.updateFiltersEvent)
export default cardList;