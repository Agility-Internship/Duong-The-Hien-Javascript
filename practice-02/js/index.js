import myJson from '../database/products.json' assert {type: 'json'};

const listProduct = document.querySelector('.list-product');
const products = document.getElementsByClassName("products-box");
for (var i = 0; i < myJson.length; i++) {
    var images = myJson[i].images,
        name = myJson[i].name,
        version = myJson[i].version,
        resolution = myJson[i].resolution,
        price = myJson[i].price,
        installment = myJson[i].installment;

    const newItem = document.createElement('li');
    newItem.classList.add('item');

    newItem.innerHTML = `
          <a href="#" class="main-contain">
            <div class="item-label">
              <span class="lb-installment text">${installment}</span>
            </div>
            <div class="item-img">
              <img class="thumb" src="${images}" alt="${name}" />
            </div>
            <h3 class="item-name">${name}</h3>
            <div class="item-compare">
              <span class="text">${version}</span>
              <span class="text">${resolution}</span>
            </div>
            <strong class="price">${price}&#273;</strong>
          </a>
        `;

    listProduct.appendChild(newItem);

}
