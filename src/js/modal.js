function modal(data, catId) {
    this.data = data;
    this.catId = catId;
    this.catAdoptedEvent = new CustomEvent('catAdopted', {
        detail: {
            id: this.catId,
        }
    });

    this.renderModal();
    this.closeAdoptBtn();

    this.bind();
}

modal.prototype.bind = function() {
    this.onClickConfirm();
    this.dontWantToAdoptBtn();
}

modal.prototype.renderModal = function() {
    const catItem = this.data.filter((item) => {
        return item.id == this.catId;
    });

    let htmlOutput = `
        <img src="${catItem[0].imgUrl}" class="modal-image" alt="${catItem[0].name} image">
        <div class="modal-text">
                        <h3 class="modal-title">Name: ${catItem[0].name} </h3>
                        <div class="modal-age">Age: ${catItem[0].age} months </div>
                        <div class="modal-color"> Color: ${catItem[0].color} </div>  
                    </div>
        
    `;
    document.getElementById('modal-cat-content').innerHTML = htmlOutput;

    let modal = document.getElementById("modal");
    modal.style.display = "flex";
}

modal.prototype.closeAdoptBtn = function() {
    let cardButtonModal = document.querySelectorAll(".close");
    cardButtonModal.forEach(el => {
        el.addEventListener('click', () => {
            let modal = document.getElementById("modal");
            modal.style.display = "none";
        });
    });
}


modal.prototype.onClickConfirm = function() {
    document.getElementById('want-to-adopt').addEventListener('click', () => {
        document.dispatchEvent(this.catAdoptedEvent);
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    })
}

modal.prototype.dontWantToAdoptBtn = function() {
    document.getElementById('dont-want-to-adopt').addEventListener('click', () => {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
    })
}

export default modal;