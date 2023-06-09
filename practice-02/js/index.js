import myJson from '../database/products.json' assert {type: 'json'};

/**
 * This function is used to filter products by name and save them on localStorage
 * @param products: data is passed from products.json file with type json
 * @param name: the value of the name tag passed in the argument
 */
function filterAndSaveProductsByName(products, name) {
    const filteredProducts = products.filter(product => product.name.includes(name));
    localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
}

/**
 * This function is used to display product cards in a list
 * @param products: data is passed from products.json file with type json
 */
function renderProductsCard(products) {
    const listProduct = document.querySelector('.list-product');

    // Clear the existing list
    listProduct.innerHTML = '';

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
    const lbInstallmentClass = installment ? 'lb-installment text' : '';
    return `
        <a href="#" class="main-contain">
            <div class="item-label">
              <span class="${lbInstallmentClass}">${installment}</span>
            </div>
            <div class="item-img">
              <img class="thumb" src="${images}" alt="${name}" />
            </div>
            <h3 class="item-name">${name}</h3>
            <div class="item-compare">
              <span class="text">${version}</span>
              <span class="text">${resolution}</span>
            </div>
            <strong class="price">${price}&#8363;</strong>
        </a>
    `;
}

// Show/hide filter options on hover
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

// Handle click event on logo buttons
document.addEventListener('DOMContentLoaded', function () {
    const logoButtons = document.querySelectorAll('.logo-item');

    // TODO: Using localStorage getItem here
    logoButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the name attribute of the clicked logo button's image
            const name = button.querySelector('img').getAttribute('name');
            filterAndSaveProductsByName(myJson, name);

            // Get data in localStorage and render products
            const filteredProducts = JSON.parse(localStorage.getItem('filteredProducts'));
            renderProductsCard(filteredProducts);
        });
    });
});

// Initial rendering of products from myJson
renderProductsCard(myJson);
