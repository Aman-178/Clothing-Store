document.addEventListener("DOMContentLoaded", function () {
    function fetchAndDisplayProducts(categoryName) {
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => {
                const categoryProducts = data.categories.find(category => category.category_name === categoryName).category_products;

                const containDiv = document.querySelector('.contain');
                containDiv.innerHTML = '';

                categoryProducts.forEach(product => {
                    const div = document.createElement('div');
                    div.classList.add('first');

                    // Create badge text element if badge text exists
                    if (product.badge_text) {
                        const badgeText = document.createElement('span');
                        badgeText.classList.add('badge');
                        badgeText.textContent = product.badge_text;
                        div.appendChild(badgeText);
                    }

                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = product.title;
                    img.width = 88;
                    img.height = 100;
                    div.appendChild(img);

                    const brandDiv = document.createElement('div');
                    brandDiv.classList.add('brand');
                    const clothNameP = document.createElement('p');
                    clothNameP.classList.add('clothname');
                    clothNameP.textContent = product.title;
                    const brandNameUl = document.createElement('ul');
                    const brandNameLi = document.createElement('li');
                    brandNameLi.classList.add('brandname');
                    brandNameLi.textContent = product.vendor;
                    brandNameUl.appendChild(brandNameLi);
                    brandDiv.appendChild(clothNameP);
                    brandDiv.appendChild(brandNameUl);
                    div.appendChild(brandDiv);

                    const priceDiv = document.createElement('div');
                    priceDiv.classList.add('price');
                    const offPriceP = document.createElement('p');
                    offPriceP.classList.add('offprice');
                    offPriceP.textContent = product.price;
                    const originalPriceP = document.createElement('p');
                    originalPriceP.classList.add('orignalprice');
                    originalPriceP.textContent = product.compare_at_price;
                    const offPercentP = document.createElement('p');
                    offPercentP.classList.add('offpercent');

                    // Calculate offer percentage
                    const offerPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                    offPercentP.textContent = `${offerPercentage}% Off`;

                    priceDiv.appendChild(offPriceP);
                    priceDiv.appendChild(originalPriceP);
                    priceDiv.appendChild(offPercentP);
                    div.appendChild(priceDiv);

                    const addToCartBtn = document.createElement('button');
                    addToCartBtn.classList.add('Addtocart');
                    addToCartBtn.textContent = 'Add to Cart';
                    div.appendChild(addToCartBtn);

                    containDiv.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const menButton = document.getElementById("men");
    menButton.addEventListener("click", function () {
        fetchAndDisplayProducts('Men');
    });

    const womenButton = document.getElementById("women");
    womenButton.addEventListener("click", function () {
        fetchAndDisplayProducts('Women');
    });

    const kidButton = document.getElementById("kid");
    kidButton.addEventListener("click", function () {
        fetchAndDisplayProducts('Kids');
    });
});
