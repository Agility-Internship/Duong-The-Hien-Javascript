import myJson from '../database/products.json' assert {type: 'json'};

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
renderProductsCard(myJson);

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

// Total filter
document.addEventListener('DOMContentLoaded', function () {
    let filterItem = document.querySelector('.filter-total');
    let filterShow = filterItem.querySelector('.filter-show');

    filterItem.addEventListener('mouseenter', function () {
        filterShow.style.display = 'block';
        filterShow.innerHTML = `
        <div class="show-total-main">
            <div class="show-total-item clearfix">
                <div class="show-total-title">Manufacture</div>
                <div class="filter-list ">
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/Realme42-b_37.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg" width="30" class="logo" />
                    </a>
                    <a href="#" class="logo-item">
                        <img src="//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg" width="30" class="logo" />
                    </a>
                </div>
            </div>
            <div class="show-total-item">
                <div class="show-total-title">Price</div>
                <div class="filter-list ">
                    <a href="#" class="logo-item"> 2 - 4 million </a>
                    <a href="#" class="logo-item"> 4 - 8 million </a>
                    <a href="#" class="logo-item"> 8 - 15 million </a>
                    <a href="#" class="logo-item"> over 15 million </a>
                </div>
            </div>
         </div>
      `
    });

    filterItem.addEventListener('mouseleave', function () {
        filterShow.style.display = 'none';
    });
});

// Manufacture filter
document.addEventListener('DOMContentLoaded', function () {
    let filterItem = document.querySelector('.manufacture');
    let filterShow = filterItem.querySelector('.filter-show');

    filterItem.addEventListener('mouseenter', function () {
        filterShow.style.display = 'block';
        filterShow.innerHTML = `
        <div class="filter-list ">
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/Realme42-b_37.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/Masstel42-b_0.png" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/Itel42-b_54.jpg" width="30" class="logo" />
          </a>
          <a href="#" class="logo-item">
              <img src="//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg" width="30" class="logo" />
          </a>
      </div>
      `
    });

    filterItem.addEventListener('mouseleave', function () {
        filterShow.style.display = 'none';
    });
});

// Price filter
document.addEventListener('DOMContentLoaded', function () {
    let filterItem = document.querySelector('.price');
    let filterShow = filterItem.querySelector('.filter-show');

    filterItem.addEventListener('mouseenter', function () {
        filterShow.style.display = 'block';
        filterShow.innerHTML = `
        <div class="filter-list ">
          <a href="#" class="logo-item"> 2 - 4 million </a>
          <a href="#" class="logo-item"> 4 - 8 million </a>
          <a href="#" class="logo-item"> 8 - 15 million </a>
          <a href="#" class="logo-item"> over 15 million </a>
      </div>
      `
    });

    filterItem.addEventListener('mouseleave', function () {
        filterShow.style.display = 'none';
    });
});
