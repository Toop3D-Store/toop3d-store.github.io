let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartUI();
});

// دالة فتح وإغلاق النافذة المنبثقة للسلة
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}

// جلب المنتجات من ملف JSON
function fetchProducts() {
    fetch('./products.json')
        .then(response => {
            if (!response.ok) throw new Error('فشل في جلب ملف المنتجات');
            return response.json();
        })
        .then(products => renderProducts(products))
        .catch(error => console.error('خطأ في جلب البيانات:', error));
}

// عرض المنتجات في الصفحة
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

// إضافة منتج للسلة دون فتح النافذة المنبثقة تلقائياً
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();

    // إضافة تأثير انكماش/تكبير سريع لزر السلة العلوي لتنبيه الزبون
    const navBtn = document.getElementById('cart-nav-btn');
    if (navBtn) {
        navBtn.style.transform = 'scale(1.15)';
        setTimeout(() => navBtn.style.transform = 'scale(1)', 200);
    }
}

// حذف منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// تحديث الواجهة والعدادات
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const countContainer = document.getElementById('cart-items-count');
    const navCountContainer = document.getElementById('nav-cart-count');

    const itemCount = cart.length;
    
    // تحديث الأرقام
    if (navCountContainer) navCountContainer.innerText = itemCount;
    if (countContainer) countContainer.innerText = `عدد المنتجات المطلوبة: ${itemCount} قطعة`;

    if (!cartContainer) return;

    // إذا كانت السلة فارغة
    if (itemCount === 0) {
        cartContainer.innerHTML = '<p style="color: #94a3b8; text-align: center; margin-top: 40px;">السلة فارغة حالياً.</p>';
        if (totalContainer) totalContainer.innerText = 'المجموع الكلي: 0 د.ع';
        return;
    }

    // عرض عناصر السلة
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;';
        
        itemElement.innerHTML = `
            <div>
                <strong style="display: block; color: #1e293b; font-size: 0.95em;">${item.name}</strong>
                <span style="color: #2563eb; font-size: 0.85em;">${item.price} د.ع</span>
            </div>
            <button onclick="removeFromCart(${index})" style="background-color: #fee2e2; color: #ef4444; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8em;">حذف</button>
        `;
        
        cartContainer.appendChild(itemElement);
    });

    if (totalContainer) {
        totalContainer.innerText = `المجموع الكلي: ${total} د.ع`;
    }
}

// إرسال الطلب عبر الواتساب
function sendWhatsApp() {
    const phoneNumber = "9647827573964"; 

    if (cart.length === 0) {
        alert("سلتك فارغة حالياً!");
        return;
    }

    let orderText = "مرحباً Toop3D، أرغب بتأكيد الطلب التالي:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        orderText += `${index + 1}. ${item.name} - ${item.price} د.ع\n`;
        total += item.price;
    });

    orderText += `\n*عدد القطع:* ${cart.length}`;
    orderText += `\n*المجموع الكلي:* ${total} د.ع`;

    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
