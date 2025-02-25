document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartInfo = document.getElementById("cart-count");
    const cartDetails = document.getElementById("cart-details");
    const cartModal = document.getElementById("cart-modal");

    // Termékek betöltése
    function loadProducts() {
        fetch('products.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Hiba a termékek betöltésekor:', data.error);
                    return;
                }
                productList.innerHTML = data.map(product => `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${product.kep}" class="card-img-top" alt="${product.nev}">
                            <div class="card-body">
                                <h5 class="card-title">${product.nev}</h5>
                                <p class="card-text">Ár: ${product.ar} Ft</p>
                                <button class="btn btn-primary add-to-cart" data-id="${product.id}" data-nev="${product.nev}" data-ar="${product.ar}">Kosárba</button>
                            </div>
                        </div>
                    </div>`).join('');
            })
            .catch(error => {
                console.error('Hiba a fetch kérés során:', error);
            });
    }

    // Kosárba helyezés
    function addToCart(productId, productName, productPrice) {
        fetch('cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, nev: productName, ar: productPrice })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
            } else {
                alert(data.error);
            }
            loadCart(); // Frissíti a kosár tartalmát
        })
        .catch(error => {
            console.error('Hiba a kosárba helyezés során:', error);
        });
    }

    // Kosár adatainak betöltése és megjelenítése
    function loadCart() {
        fetch('cart.php')
            .then(response => response.json())
            .then(data => {
                if (cartInfo) {
                    cartInfo.textContent = data.length; // Frissíti a kosár termékek számát
                }

                // Kosár termékek listázása a kosár részletekben
                if (cartDetails) {
                    cartDetails.innerHTML = data.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <p><strong>Termék neve:</strong> ${item.nev}</p>
                            <p><strong>Ár:</strong> ${item.ar} Ft</p>
                            <button class="btn btn-danger remove-item-btn">Törlés</button>
                        </div>
                    `).join('');
                }

                // Törlés gombok eseménykezelése
                const removeButtons = document.querySelectorAll('.remove-item-btn');
                removeButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const itemId = e.target.closest('.cart-item').getAttribute('data-id');
                        removeFromCart(itemId); //Törlés funkció meghívása
                    });
                });
            })
            .catch(error => console.error('Hiba a kosár betöltésekor:', error));
    }

    // Kosárból való törlés(sajnos részlegesen működik)
    function removeFromCart(productId) {
        fetch('cart.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
            } else {
                alert(data.error);
            }
            loadCart(); // Frissíti a kosár tartalmát
        })
        .catch(error => {
            console.error('Hiba a kosár törlésénél:', error);
        });
    }

    // Kosár gombok kezelése
    productList.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.nev;
            const productPrice = event.target.dataset.ar;
            if (!productId) {
                console.error("Hiányzó termék ID!");
                return;
            }
            addToCart(productId, productName, productPrice);
        }
    });

    // Kosár modál megnyitása
    const openCartBtn = document.getElementById("open-cart"); 
    if (openCartBtn) {
        openCartBtn.addEventListener("click", () => {
            cartModal.style.display = 'block'; 
        });
    }

    // Kosár modál bezárása
    function closeCart() {
        cartModal.style.display = 'none';
    }

    // Kosár modál bezárása(sajnos nem működik)
    const closeCartBtn = document.getElementById("close-cart");
    if (closeCartBtn) {
        closeCartBtn.addEventListener("click", closeCart);
    }

   // Kosár betöltése, amikor az oldal betöltődik
   loadProducts();
   loadCart();
   closeCart();
   removeFromCart();
});





