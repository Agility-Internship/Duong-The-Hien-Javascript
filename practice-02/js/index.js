import myJson from '../database/products.json' assert {type: 'json'};


function filterAndSaveProductsByName(products, name) {
    const filteredProducts = products.filter(product => product.name.includes(name));
    localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
}
filterAndSaveProductsByName(myJson, "OPPO")

const filteredProducts = JSON.parse(localStorage.getItem('filteredProducts'));

console.log(filteredProducts)
/**
 * This function is used to display product cards in a list
 * @param products: data is passed from products.json file with type json
 */
function renderProductsCard(products) {
    const listProduct = document.querySelector('.list-product');

    // TODO: Using array.reduce here
    products.forEach((product) => {
        let images = product.images,
            name = product.name,
            version = product.version,
            resolution = product.resolution,
            price = product.price,
            installment = product.installment;

        let newItem = document.createElement('li');
        newItem.classList.add('item');

        // Create product cards
        newItem.innerHTML = createProductCard(images, name, version, resolution, price, installment);

        listProduct.appendChild(newItem);
    });
}
renderProductsCard(filteredProducts);

/**
 * This function is used to add new product cards to the list
 * @param images: the data contains the product's image path
 * @param name: the data containing the name of the product
 * @param version: the data contains the version of the product
 * @param resolution: the data contains information about the product's resolution
 * @param price: the data contains the cost of the product
 * @param installment: the data contains information about the product's installment offer
 * @returns {string} A string containing the structure of HTML tags
 */
function createProductCard(images, name, version, resolution, price, installment) {
    return `
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
}

document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.filter-item');

    filters.forEach(function (filter) {
        const filterShow = filter.querySelector('.filter-show');

        filter.addEventListener('mouseenter', function () {
            filterShow.style.display = 'block';
        });

        filter.addEventListener('mouseleave', function () {
            filterShow.style.display = 'none';
        });
    });
});
