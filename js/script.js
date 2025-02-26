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
                if (!Array.isArray(data)) {
                    console.warn("Érvénytelen válasz a termékek betöltésekor:", data);
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
            .catch(error => console.error('Hiba a termékek betöltésekor:', error));
    }

    // Termék kosárba helyezése
    function addToCart(productId, productName, productPrice) {
        fetch('cart.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId, nev: productName, ar: productPrice })
        })
        .then(response => response.json())
        .then(data => {
            loadCart(); 
        })
        .catch(error => console.error('Hiba a kosárba helyezés során:', error));
    }

    // Kosár betöltése és frissítése
    function loadCart() {
        fetch('cart.php')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    console.warn("Hibás válasz a kosár betöltésekor:", data);
                    return;
                }
                cartInfo.textContent = data.length; 

                cartDetails.innerHTML = data.length > 0 ? data.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <p><strong>${item.nev}</strong> - ${item.ar} Ft</p>
                        <button class="btn btn-danger remove-item-btn">Törlés</button>
                    </div>`).join('') 
                    : "<p>A kosár üres.</p>";

                
                document.querySelectorAll('.remove-item-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const itemId = e.target.closest('.cart-item').getAttribute('data-id');
                        removeFromCart(itemId);
                    });
                });
            })
            .catch(error => console.error('Hiba a kosár betöltésekor:', error));
    }

    // Termék törlése a kosárból
    function removeFromCart(productId) {
        fetch('cart.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: productId })
        })
        .then(response => response.json())
        .then(data => {
            loadCart(); 
        })
        .catch(error => console.error('Hiba a törlés során:', error));
    }

    // Kosár gombok kezelése
    productList.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.nev;
            const productPrice = event.target.dataset.ar;
            if (productId) {
                addToCart(productId, productName, productPrice);
            }
        }
    });

    // Kosár modál nyitása/zárása
    document.getElementById("open-cart")?.addEventListener("click", () => cartModal.style.display = 'block');
    document.getElementById("close-cart")?.addEventListener("click", () => cartModal.style.display = 'none');

    // Betöltéskor frissítés
    loadProducts();
    loadCart();
});







