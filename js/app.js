// مصفوفة لتخزين عناصر السلة
let cart = [];

// 1. دالة جلب المنتجات وعرضها عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartUI(); // ✅ لتحديث السلة فور فتح الصفحة
});

function fetchProducts() {
    fetch('./products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل في جلب ملف المنتجات');
            }
            return response.json();
        })
        .then(products => {
            renderProducts(products);
        })
        .catch(error => {
            console.error('خطأ في جلب المنتجات:', error);
        });
}

// 2. دالة بناء بطاقات المنتجات في الصفحة
function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} د.ع</p>
            <button onclick="addToCart('${product.name}', ${product.price})">إضافة للسلة</button>
        `;
        
        container.appendChild(productCard);
    });
}

// 3. دالة إضافة منتج للسلة وتحديث الواجهة
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// 4. دالة حذف منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 5. دالة تحديث عرض السلة في الصفحة
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>السلة فارغة حالياً.</p>';
        if (totalContainer) totalContainer.innerText = 'المجموع الكلي: 0 د.ع';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;';
        
        itemElement.innerHTML = `
            <span>${item.name} - ${item.price} د.ع</span>
            <button onclick="removeFromCart(${index})" style="background-color: #ff4d4d; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">حذف</button>
        `;
        
        cartContainer.appendChild(itemElement);
    });

    if (totalContainer) {
        totalContainer.innerText = `المجموع الكلي: ${total} د.ع`;
    }
}

// 6. دالة إرسال الطلب عبر الواتساب
function sendWhatsApp() {
    const phoneNumber = "9647827573964"; 

    if (cart.length === 0) {
        const message = encodeURIComponent("مرحباً Toop3D، أود الاستفسار عن منتجات الطباعة ثلاثية الأبعاد.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        return;
    }

    let orderText = "مرحباً Toop3D، أرغب بتأكيد الطلب التالي:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        orderText += `${index + 1}. ${item.name} - ${item.price} د.ع\n`;
        total += item.price;
    });

    orderText += `\n*المجموع الكلي:* ${total} د.ع`;

    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
