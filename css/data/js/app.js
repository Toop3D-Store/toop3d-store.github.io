fetch("data/products.json")
.then(response => response.json())
.then(products => {

    const container = document.getElementById("products");

    container.innerHTML = "<h2>المنتجات</h2>";

    products.forEach(product => {

        container.innerHTML += `
        <div class="product">
            <img src="${product.image}" 
                 alt="${product.name_en}"
                 width="250">

            <h3>${product.name_ar}</h3>
            <p>اللون: ${product.color}</p>
            <p>السعر: ${product.price}</p>

            <button onclick="addToCart(${product.id})">
                أضف للسلة
            </button>
        </div>
        `;
    });

})
.catch(error => console.log(error));


function addToCart(id){
    alert("تمت إضافة المنتج رقم " + id + " إلى السلة");
}
