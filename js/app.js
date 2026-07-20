// متغير السلة الرئيسي
let cart = [];

// عند تحميل عناصر الصفحة
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

// عرض المنتجات في الصفحة وتنسيق الحجم المباشر للصور
function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // تنسيق تصميم الكارت ليكون متناسقاً ومترتباً
        productCard.style.cssText = 'background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);';

        productCard.innerHTML = `
            <div>
                <!-- التنسيق المباشر يحل مشكلة حجم الصور والتداخل فوراً -->
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; display: block; margin-bottom: 10px;">
                <h3 style="font-size: 1.05em; margin: 8px 0; color: #0f172a;">${product.name}</h3>
                <p class="price" style="font-weight: bold; color: #2563eb; margin-bottom: 12px;">${product.price} د.ع</p>
            </div>
            <button onclick="addToCart('${product.name}', ${product.price})" style="background-color: #2563eb; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%;">إضافة للسلة</button>
        `;
        container.appendChild(productCard);
    });
}

// إضافة منتج للسلة وتجميع العناصر المتكررة
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartUI();

    // تأثير انكماش/تكبير سريع لزر السلة العلوي لتنبيه الزبون
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

    // إجمالي عدد القطع مع مراعاة الكميات
    const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // تحديث الأرقام والعدادات
    if (navCountContainer) navCountContainer.innerText = totalItemsCount;
    if (countContainer) countContainer.innerText = `عدد المنتجات المطلوبة: ${totalItemsCount} قطعة`;

    if (!cartContainer) return;

    // إذا كانت السلة فارغة
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="color: #94a3b8; text-align: center; margin-top: 40px;">السلة فارغة حالياً.</p>';
        if (totalContainer) totalContainer.innerText = 'المجموع الكلي: 0 د.ع';
        return;
    }

    // عرض عناصر السلة
    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemQuantity = item.quantity || 1;
        const itemTotal = item.price * itemQuantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;';
        
        itemElement.innerHTML = `
            <div>
                <strong style="display: block; color: #1e293b; font-size: 0.95em;">${item.name} ${itemQuantity > 1 ? `(×${itemQuantity})` : ''}</strong>
                <span style="color: #2563eb; font-size: 0.85em;">${itemTotal} د.ع</span>
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
    let totalPieces = 0;

    cart.forEach((item, index) => {
        const qty = item.quantity || 1;
        const itemTotal = item.price * qty;
        orderText += `${index + 1}. ${item.name} ${qty > 1 ? `(العدد: ${qty})` : ''} - ${itemTotal} د.ع\n`;
        total += itemTotal;
        totalPieces += qty;
    });

    orderText += `\n*عدد القطع الكلي:* ${totalPieces}`;
    orderText += `\n*المجموع الكلي:* ${total} د.ع`;

    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
