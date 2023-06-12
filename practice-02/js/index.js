import myJson from '../database/products.json' assert {type: 'json'};

/**
 * This function is used to filter products by name
 * @param products: data is passed from products.json file with type json
 * @param name: the value of the name tag passed in the argument
 * @returns {Array} An array of filtered products
 */
function filterProductsByName(products, name) {
    return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
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

document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.filter-item');
    const logoButtons = document.querySelectorAll('.logo-item');

    // Show/hide filter options on hover
    filters.forEach(function (filter) {
        const filterShow = filter.querySelector('.filter-show');

        filter.addEventListener('mouseenter', function () {
            filterShow.style.display = 'block';
        });

        filter.addEventListener('mouseleave', function () {
            filterShow.style.display = 'none';
        });
    });

    // Handle click event on logo buttons
    logoButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const nameProduct = button.querySelector('img').getAttribute('name');
            const filteredProducts = filterProductsByName(myJson, nameProduct);
            renderProductsCard(filteredProducts);

            // Remove the 'selected' class from all logo buttons
            logoButtons.forEach(function (logoButton) {
                logoButton.classList.remove('selected');
            });

            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
        });
    });
});

// Initial rendering of products from myJson
renderProductsCard(myJson);
