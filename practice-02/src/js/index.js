import LIST_PRODUCTS from '../../database/products.json' assert {type: 'json'};

/**
 * This function is used to filter products by name
 * @param products: data is passed from products.json file with type json
 * @param name: the value of the name tag passed in the argument
 * @returns {Array} An array of filtered products
 */
const filterProductsByName = (products, selectedBrands) => {
    const filteredResults = [];

    selectedBrands.forEach(brand => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(brand.toLowerCase()));
        filteredResults.unshift(...filteredProducts);
    });

    return filteredResults;
};

/**
 * This function is used to convert price string to a numeric value
 * @param price: the price string to convert
 * @returns {number} The numeric value of the price
 */
function convertPriceToNumber(price) {
    const numericString = price.replace(/[.]+/g, "");
    return parseInt(numericString);
};

/**
 * This function is used to filter products by price
 * @param products: data is passed from products.json file with type json
 * @param minPrice: the minimum price to filter
 * @param maxPrice: the maximum price to filter
 * @returns {Array} An array of filtered products
 */
const filterProductsByPrice = (products, minPrice, maxPrice) => {
    return products.filter(product => {
        const price = convertPriceToNumber(product.price);
        return price >= minPrice && (maxPrice === undefined || price <= maxPrice);
    });
};

/**
 * This function is Updated the total count of displayed products
 * @param count: the count of displayed products
 */
const updateTotalProductsCount = count => {
    const totalProductsCount = document.querySelector('.category__result--display .category__result--total');
    totalProductsCount.textContent = count;
};

/**
 * This function is used to display product cards in a list
 * @param products: data is passed from products.json file with type json
 */
const renderProductsCard = products => {
    const listProduct = document.querySelector('.products__list');

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
};

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
const createProductCard = (product) => {
    let lbInstallmentClass = product.installment ? 'card__installment text' : '';
    return `
      <div class="product__card">
        <div class="card__label">
              <span class="${lbInstallmentClass}">${installment}</span>
        </div>
        <div class="card__img">
              <img class="thumb" src="${images}" alt="${name}" />
        </div>
            <h3 class="card__name">${name}</h3>
        <div class="card__compare">
              <span class="text">${version}</span>
              <span class="text">${resolution}</span>
        </div>
            <strong class="price">${price}&#8363;</strong>
      </div>
    `;
};

document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.filter__item');
    const logoButtons = document.querySelectorAll('.filter__item--brand');
    const priceButtons = document.querySelectorAll('.filter__item--price');

    let selectedBrands = []; // Array to store selected brands
    let displayProducts = LIST_PRODUCTS; // Initialize the displayProducts with the data from LIST_PRODUCTS

    // Show/hide filter options on mouse hover
    filters.forEach(filter => {
        const filterShow = filter.querySelector('.filter__popover');
        const filterTitle = filter.querySelector('.filter__item--title');

        filter.addEventListener('mouseenter', () => {
            filterShow.style.display = 'block';
            filterTitle.style.border = '1px solid var(--secondary)';
        });
        filter.addEventListener('mouseleave', () => {
            filterShow.style.display = 'none';
            filterTitle.style.border = '';
        });
    });

    // Handle click event on logo buttons
    filterBrand.forEach(button => {
        button.addEventListener('click', (event) => {
            const nameProduct = event.target.name;
            let sameLogoButtons = document.querySelectorAll(`.filter__item--brand img[src="${event.target.getAttribute('src')}"]`);
            let isFirstIteration = true; // Variable to check the first iteration

            // Synchronization for filters about the same manufacturer
            sameLogoButtons.forEach(function (sameLogoButton) {
                if (!sameLogoButton.parentNode.classList.contains('selected')) {
                    // Add 'selected' class and add product to selectedBrands
                    sameLogoButton.parentNode.classList.add('selected');
                    if (isFirstIteration) {
                        selectedBrands.push(nameProduct);
                        isFirstIteration = false;
                    }
                } else {
                    // Remove 'selected' class and remove product from selectedBrands
                    sameLogoButton.parentNode.classList.remove('selected');
                    let index = selectedBrands.indexOf(nameProduct);
                    if (index !== -1) {
                        selectedBrands.splice(index, 1); // Remove product from selectedBrands array
                    }
                }
            });

            displayProducts = filterProductsByName(LIST_PRODUCTS, selectedBrands);

            if (displayProducts.length < 1) {
                renderProductsCard(LIST_PRODUCTS);
                updateTotalProductsCount(LIST_PRODUCTS.length);

            } else {
                renderProductsCard(displayProducts);
                updateTotalProductsCount(displayProducts.length);

            }
        });
    });

    // Handle click event on price buttons
    filterPrice.forEach((button) => {
        button.addEventListener('click', (event) => {
            const minPrice = parseFloat(event.target.getAttribute('data-min'));
            const maxPrice = parseFloat(event.target.getAttribute('data-max'));
            let samePriceButtons = document.querySelectorAll(`.filter__item--price[data-min="${minPrice}"][data-max="${maxPrice}"]`);
            let isFirstIteration = true;

            displayProducts = filterProductsByPrice(displayProducts, minPrice, maxPrice);

            // Synchronize for price filters with the same function
            samePriceButtons.forEach(function (samePriceButton) {
                if (!samePriceButton.classList.contains('selected')) {
                    // Add 'selected' class and add product to displayProducts
                    samePriceButton.classList.add('selected');
                    if (isFirstIteration) {
                        isFirstIteration = false;
                    }
                } else {
                    // Remove 'selected' class and remove product from displayProducts
                    samePriceButton.classList.remove('selected');
                }
            });

            renderProductsCard(displayProducts);
            updateTotalProductsCount(displayProducts.length);
        });
    });

    // Initial rendering of products and total count
    renderProductsCard(displayProducts);
    updateTotalProductsCount(displayProducts.length);

});

// Initial rendering of products from LIST_PRODUCTS
renderProductsCard(LIST_PRODUCTS);
