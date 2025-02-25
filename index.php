<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termékkatalógus</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <style>
        /*Kevés css miatt ide láttam ezt egyszerűbbnek írni*/
        /*Sajnos a bootsrap és a css is részlegesen van kész*/
        .card-img-top {
            transition: transform 0.3s ease; 
        }

        .card-img-top:hover {
            transform: scale(1.1); 
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            width: 80%;
        }
    </style>
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
            <h2>Kosár tartalma</h2>
            <div id="cart-details">
                <!-- Kosár tartalma itt jelenik meg -->
            </div>
            <button class="btn btn-secondary" onclick="closeCart()">Bezárás</button>
        </div>
    </div>

    <footer class="bg-dark text-white text-center p-3 mt-4">
        &copy; 2025 Szerelvénybolt Kft. Minden jog fenntartva.
    </footer>

    <script src="js/script.js"></script>
</body>
</html>
