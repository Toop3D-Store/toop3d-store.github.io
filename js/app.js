// قائمة المنتجات
// قائمة المنتجات مع المسارات الصحيحة للصور
// قائمة المنتجات مع المسارات المباشرة والمطابقة لمجلد images
const products = [
    { 
        id: 1, 
        name: "خيط PETG - أسود", 
        price: 25000, 
        image: "images/petg black.jpg"
    },
    { 
        id: 2, 
        name: "خيط PETG - أزرق", 
        price: 25000, 
        image: "images/petg blue.jpg"
    },
    { 
        id: 3, 
        name: "خيط PETG - شفاف", 
        price: 28000, 
        image: "images/petg clear.jpg"
    },
    { 
        id: 4, 
        name: "خيط PETG - بيج (Latte)", 
        price: 25000, 
        image: "images/petg latte.png" // 👈 انتبه هذا الملف بصيغة png
    },
    { 
        id: 5, 
        name: "خيط PETG - برتقالي", 
        price: 25000, 
        image: "images/petg orange.jpg"
    },
    { 
        id: 6, 
        name: "خيط PETG - بنفسجي (Taro Purple)", 
        price: 25000, 
        image: "images/petg taro purple.jpg"
    }
];

let cart = [];

// دالة عرض المنتجات داخل الشبكة
function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price.toLocaleString()} د.ع</p>
            <button onclick="addToCart(${product.id})">إضافة للسلة 🛒</button>
        `;
        container.appendChild(card);
    });
}

// إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// تحديث الواجهة وتفاصيل السلة
function updateCartUI() {
    const cartCount = document.getElementById('nav-cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.innerText = totalCount;
    if (cartTotalPrice) cartTotalPrice.innerText = `${totalPrice.toLocaleString()} د.ع`;

    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align:center; color:#64748b;">السلة فارغة حالياً</p>';
        } else {
            cart.forEach(item => {
                cartItems.innerHTML += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <div>
                            <strong>${item.name}</strong>
                            <br><small>${item.price.toLocaleString()} × ${item.quantity}</small>
                        </div>
                        <button onclick="removeFromCart(${item.id})" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">حذف</button>
                    </div>
                `;
            });
        }
    }
}

// حذف عنصر من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// إظهار/إخفاء النافذة المنبثقة
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
        }
    }
}

// إرسال الطلب عبر الواتساب
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    let message = "مرحباً Toop3D، أرغب بتأكيد الطلب التالي:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.name} (العدد: ${item.quantity}) = ${itemTotal.toLocaleString()} د.ع\n`;
    });

    message += `\nالمجموع الكلي: ${total.toLocaleString()} د.ع`;

    const phone = "9647000000000"; // ضع رقم الواتساب الخاص بك هنا
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// تشغيل العرض عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();
});
