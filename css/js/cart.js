let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(id) {

    fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        let product = products.find(p => p.id === id);

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("تمت إضافة المنتج إلى السلة");

    });

}


function showCart(){

    let cartBox = document.getElementById("cart");

    cartBox.innerHTML = "";

    cart.forEach(item => {

        cartBox.innerHTML += `
        <div>
            ${item.name_ar}
            - ${item.color}
            - ${item.price}
        </div>
        `;

    });

}
