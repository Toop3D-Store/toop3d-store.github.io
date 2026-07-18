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
function sendWhatsApp(){

    if(cart.length === 0){
        alert("السلة فارغة");
        return;
    }

    let message = "طلب جديد من متجر Toop3D:%0A%0A";

    cart.forEach((item, index)=>{

        message += `${index + 1}- ${item.name_ar} - ${item.color} - ${item.price}%0A`;

    });

    let phone = "9647827573964";

    let url = "https://wa.me/" + phone + "?text=" + message;

    window.open(url, "_blank");

}
