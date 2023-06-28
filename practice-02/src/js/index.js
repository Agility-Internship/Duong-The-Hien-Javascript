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
        let filteredProducts = products.filter(product => product.name.toLowerCase().includes(brand.toLowerCase()));
        filteredResults.unshift(...filteredProducts);
    });

    return filteredResults;
};

/**
 * This function is used to convert price string to a numeric value
 * @param price: the price string to convert
 * @returns {number} The numeric value of the price
 */
const convertPriceToNumber = price => {
    let numericString = price.replace(/[.]+/g, "");
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
        let price = convertPriceToNumber(product.price);
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

    listProduct.innerHTML = '';

    products.forEach(product => {
        const { images, name, version, resolution, price, installment } = product;

        const newItem = document.createElement('li');
        newItem.classList.add('item');

        newItem.innerHTML = createProductCard(product);

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
          <span class="${lbInstallmentClass}">${product.installment}</span>
        </div>
        <div class="card__img">
          <img class="thumb" src="${product.images}" alt="${product.name}" />
        </div>
        <h3 class="card__name">${product.name}</h3>
        <div class="card__compare">
          <span class="text">${product.version}</span>
          <span class="text">${product.resolution}</span>
        </div>
        <strong class="price">${product.price}&#8363;</strong>
      </div>
    `;
};

document.addEventListener('DOMContentLoaded', function () {
    const filterContent = document.querySelector('.filter__main');
    const filterBrand = document.querySelectorAll('.filter__item--brand');
    const filterPrice = document.querySelectorAll('.filter__item--price');

    let selectedBrands = []; // Array to store selected brands
    let displayProducts = LIST_PRODUCTS; // Initialize the displayProducts with the data from LIST_PRODUCTS

    filterContent.addEventListener('mouseover', (event) => {
        const filter = event.target.closest('.filter__item');
        console.log(filter)
        if (filter) {
            const filterShow = filter.querySelector('.filter__popover');
            const filterTitle = filter.querySelector('.filter__item--title');

            filterShow.style.display = 'block';
            filterTitle.classList.add('hovered');
        }
    });

    filterContent.addEventListener('mouseout', (event) => {
        const filter = event.target.closest('.filter__item');
        if (filter) {
            const filterShow = filter.querySelector('.filter__popover');
            const filterTitle = filter.querySelector('.filter__item--title');

            filterShow.style.display = 'none';
            filterTitle.classList.remove('hovered');
        }
    });

    // Handle click event on logo buttons
    filterBrand.forEach(button => {
        button.addEventListener('click', (event) => {
            const nameProduct = event.target.name;
            let sameFilterBrands = document.querySelectorAll(`.filter__item--brand img[src="${event.target.getAttribute('src')}"]`);
            let isFirstIteration = true; // Variable to check the first iteration

            // Synchronization for filters about the same manufacturer
            sameFilterBrands.forEach((sameFilterBrand) => {
                if (!sameFilterBrand.parentNode.classList.contains('selected')) {
                    // Add 'selected' class and add product to selectedBrands
                    sameFilterBrand.parentNode.classList.add('selected');
                    if (isFirstIteration) {
                        selectedBrands.push(nameProduct);
                        isFirstIteration = false;
                    }
                } else {
                    // Remove 'selected' class and remove product from selectedBrands
                    sameFilterBrand.parentNode.classList.remove('selected');
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
            let sameFilterPrices = document.querySelectorAll(`.filter__item--price[data-min="${minPrice}"][data-max="${maxPrice}"]`);
            let isFirstIteration = true;

            displayProducts = filterProductsByPrice(displayProducts, minPrice, maxPrice);

            // Synchronize for price filters with the same function
            sameFilterPrices.forEach((sameFilterPrice) => {
                if (!sameFilterPrice.classList.contains('selected')) {
                    // Add 'selected' class and add product to displayProducts
                    sameFilterPrice.classList.add('selected');
                    if (isFirstIteration) {
                        isFirstIteration = false;
                    }
                } else {
                    // Remove 'selected' class and remove product from displayProducts
                    sameFilterPrice.classList.remove('selected');
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
