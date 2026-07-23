// مصفوفة لتخزين المنتجات المضافة إلى السلة
let cart = [];

// دالة فتح وإغلاق سلة التسوق
function toggleCartModal() {
    document.body.classList.toggle('cart-open');
}

// دالة إضافة منتج إلى السلة (يتم استدعاؤها من زر "إضافة إلى السلة")
function addToCart(productName, productPrice, spoolOption) {
    // التحقق إذا كان المنتج بنفس خيار البكرة موجود مسبقاً
    let existingItem = cart.find(item => item.name === productName && item.spool === spoolOption);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName + (spoolOption ? ` (${spoolOption})` : ''),
            price: parseFloat(productPrice),
            quantity: 1
        });
    }
    
    updateCartUI();
    toggleCartModal5(); // فتح السلة تلقائياً عند الإضافة (اختياري) أو يمكنك تركها
}

// دالة فتح السلة تلقائياً عند الإضافة (اختياري)
function toggleCartModal5() {
    if (!document.body.classList.contains('cart-open')) {
        document.body.classList.add('cart-open');
    }
}

// دالة تحديث واجهة السلة (العداد، العناصر، الإجمالي)
function updateCartUI() {
    const cartCounter = document.getElementById('cart-counter');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    // حساب العدد الإجمالي
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalCount;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-text">سلة التسوق فارغة حالياً</p>`;
        cartTotalPrice.textContent = `0 د.ع`;
        return;
    }
    
    let itemsHTML = '';
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        itemsHTML += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9;">
                <div>
                    <h4 style="margin: 0 0 5px 0; font-size: 0.95rem; color: #1e293b;">${item.name}</h4>
                    <span style="font-size: 0.85rem; color: #64748b;">${item.price.toLocaleString()} د.ع × ${item.quantity}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.1rem;" title="حذف">🗑️</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    cartTotalPrice.textContent = `${totalPrice.toLocaleString()} د.ع`;
}

// دالة حذف منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// دالة إرسال الطلب عبر واتساب
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("سلة التسوق فارغة!");
        return;
    }
    
    const phoneNumber = "9640000000000"; // استبدل الأصفار برقم هاتفك الحقيقي مع رمز الدولة
    let message = "مرحباً، أريد طلب المنتجات التالية:\n\n";
    
    let totalPrice = 0;
    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        message += `▪️ ${item.name} | الكمية: ${item.quantity} | السعر: ${itemTotal.toLocaleString()} د.ع\n`;
    });
    
    message += `\n💰 الإجمالي الكلي: ${totalPrice.toLocaleString()} د.ع`;
    
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
