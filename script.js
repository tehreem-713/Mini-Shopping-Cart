let products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 1500,
        image: "images/tshirt.jpg"
    },
    {
        id: 2,
        name: "Jeans",
        price: 3000,
        image: "images/jeans.jpg"
    },
    {
        id: 3,
        name: "Hoodie",
        price: 2500,
        image: "images/hoodie.jpg"
    },
    {
        id: 4,
        name: "Shoes",
        price: 4000,
        image: "images/shoes.jpg"
    },
    {
        id: 5,
        name: "Cap",
        price: 800,
        image: "images/cap.jpg"
    },
    {
        id: 6,
        name: "Watch",
        price: 2000,
        image: "images/watch.jpg"
    }
];

let cart = [];

let productList = document.querySelector(".product-list");
let cartItems = document.querySelector(".cart-items");
let productSection = document.querySelector(".product-section");
let cartSection = document.querySelector(".cart-section");
let cartInfo = document.querySelector(".cart-info");
let closeCart = document.querySelector(".close-cart");

cartInfo.addEventListener("click", () => {
        productSection.style.display = "none";
        cartSection.style.display = "block";
});

closeCart.addEventListener("click", () => {
        productSection.style.display = "block";
        cartSection.style.display = "none";
});

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty";
    }
    cart.forEach((item) => {
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        let cartName = document.createElement("h4");
        cartName.textContent = item.name;
        cartItem.append(cartName);
        let cartPrice = document.createElement("p");
        cartPrice.textContent = "Rs." + item.price;
        cartItem.append(cartPrice);
        let cartQuantity = document.createElement("span");
        cartQuantity.textContent = "Quantity :" + item.quantity;
        cartItem.append(cartQuantity);
        let decreaseBtn = document.createElement("button");
        decreaseBtn.className = "decrease-btn";
        decreaseBtn.textContent = "-";
        cartItem.append(decreaseBtn);
        let increaseBtn = document.createElement("button");
        increaseBtn.className = "increase-btn";
        increaseBtn.textContent = "+";
        cartItem.append(increaseBtn);
        let cartImage = document.createElement("img");
        cartImage.src = item.image;
        cartImage.alt = item.name;
        cartItem.append(cartImage);
        let removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        cartItem.append(removeBtn);

        cartItems.append(cartItem);

        increaseBtn.addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });

        decreaseBtn.addEventListener("click", () => {
            if (item.quantity>1) {
                item.quantity--;
            }
            renderCart();
        });

        removeBtn.addEventListener("click", () => {
            cart = cart.filter((cartItem) => cartItem.id !== item.id);
            let totalQuantity = cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        let cartCount = document.querySelector("#cart-count");
        cartCount.textContent = totalQuantity;
        renderCart();

        
    });
    });

    let totalPrice = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        let totalPriceElement = document.querySelector("#total-price");
        totalPriceElement.textContent = totalPrice;
}

products.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.className = "product-card";
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    let productName = document.createElement("h3");
    productName.textContent = product.name;
    let productPrice = document.createElement("p");
    productPrice.textContent = "Rs." + product.price;
    let addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.className = "add-cart";
    
    productCard.append(productImage);
    productCard.append(productName);
    productCard.append(productPrice);
    productCard.append(addButton);
    
    productList.append(productCard);

    addButton.addEventListener("click", () => {
        let existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        }
        else {
            cart.push({
                ...product,
                quantity : 1,
            })
        }

        let totalQuantity = cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        let cartCount = document.querySelector("#cart-count");
        cartCount.textContent = totalQuantity;
        renderCart();
    });
});


