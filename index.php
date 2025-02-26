<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termékkatalógus</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="">Szerelvénybolt Kft.</a>
            <button class="btn btn-primary" id="open-cart">Kosár (<span id="cart-count">0</span>)</button>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row" id="product-list">
            
        </div>
    </div>

    <!-- Kosár modál -->
    <div id="cart-modal" class="modal">
    <div class="modal-content">
        <span id="close-cart" class="close">&times;</span>
        <h2>Kosár</h2>
        <div id="cart-details"></div>
    </div>
     </div>

    <footer class="bg-dark text-white text-center p-3 mt-4">
        &copy; 2025 Szerelvénybolt Kft. Minden jog fenntartva.
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
