import LIST_PRODUCTS from '../database/products.json' assert {type: 'json'};

/**
 * This function is used to filter products by name
 * @param products: data is passed from products.json file with type json
 * @param name: the value of the name tag passed in the argument
 * @returns {Array} An array of filtered products
 */
function filterProductsByName(products, selectedBrands) {
    const filteredResults = [];

    console.log(selectedBrands)
    selectedBrands.forEach(brand => {
        console.log(brand)
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(brand.toLowerCase()));
        filteredResults.push(...filteredProducts);
    });

    return filteredResults;
}

/**
 * This function is used to convert price string to a numeric value
 * @param price: the price string to convert
 * @returns {number} The numeric value of the price
 */
function convertPriceToNumber(price) {
    const numericString = price.replace(/[.]+/g, "");
    return parseInt(numericString);
}

/**
 * This function is used to filter products by price
 * @param products: data is passed from products.json file with type json
 * @param minPrice: the minimum price to filter
 * @param maxPrice: the maximum price to filter
 * @returns {Array} An array of filtered products
 */
function filterProductsByPrice(products, minPrice, maxPrice) {
    return products.filter(product => {
        const price = convertPriceToNumber(product.price);
        return price >= minPrice && (maxPrice === undefined || price <= maxPrice);
    });
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
    const priceButtons = document.querySelectorAll('.price-item');

    let selectedBrands = []; // Array to store selected brands
    let selectedPrices = []; // Array to store price

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
        button.addEventListener('click', function (event) {
            const nameProduct = event.target.name;

            if (!button.classList.contains('selected')) {
                button.classList.add('selected');
                selectedBrands.push(nameProduct); // Lưu trữ tên sản phẩm vào mảng selectedBrands
            } else {
                button.classList.remove('selected');
                const index = selectedBrands.indexOf(nameProduct);
                if (index !== -1) {
                    selectedBrands.splice(index, 1); // Xóa tên sản phẩm khỏi mảng selectedBrands
                }
            }
            displayProducts = filterProductsByName(displayProducts, selectedBrands);
            renderProductsCard(displayProducts);

        });
    });
    priceButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            const minPrice = parseFloat(event.target.getAttribute('data-min'));
            const maxPrice = parseFloat(event.target.getAttribute('data-max'));
            displayProducts = filterProductsByPrice(displayProducts, minPrice, maxPrice)

            if (!button.classList.contains('selected')) {
                // Add 'selected' class and add products to selectedPrices
                button.classList.add('selected');
            } else {
                // Remove 'selected' class and remove products from selectedPrices
                button.classList.remove('selected');
            }

            renderProductsCard(displayProducts);
        });
    });

});

// Initial rendering of products from LIST_PRODUCTS
renderProductsCard(LIST_PRODUCTS);
