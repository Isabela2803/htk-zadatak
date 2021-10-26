fetch("/data.json")
    .then(response => response.json())
    .then(data => renderCards(data));

function renderCards(data) {
    let htmlOutput = '';
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
                <button type="button" class="card-btn"> Udomi me</button>
            </div>
        </div>`;
    });

    document.getElementById('cards-wrapper').innerHTML += htmlOutput;

}