// مصفوفة لتخزين المنتجات في السلة
let cart = [];

// دالة فتح وإغلاق سلة التسوق
function toggleCartModal() {
    document.body.classList.toggle('cart-open');
}

// دالة تحديث واجهة السلة (العداد، العناصر، الإجمالي)
function updateCartUI() {
    const cartCounter = document.getElementById('cart-counter');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    if (!cartCounter || !cartItemsContainer || !cartTotalPrice) return;
    
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
    
    const phoneNumber = "9647700000000"; // استبدل هذا الرقم برقم هاتفك الحقيقي مع رمز الدولة العراقية
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

// نظام تلقائي يلتقط أي ضغطة على زر "إضافة إلى السلة" في المتجر استناداً لبطاقة المنتج
document.addEventListener('click', function(event) {
    if (event.target.closest('.add-to-cart-btn') || event.target.matches('.add-to-cart-btn')) {
        const card = event.target.closest('.product-card') || event.target.closest('div');
        
        if (card) {
            // محاولة استخراج اسم المنتج وسعره من البطاقة الحالية
            const titleElement = card.querySelector('h2, h3, h4, .product-title');
            const priceElement = card.querySelector('.price, span');
            
            let productName = titleElement ? titleElement.innerText : "منتج Toop3D";
            let productPrice = 17000; // السعر الافتراضي
            
            if (priceElement) {
                let priceText = priceElement.innerText.replace(/[^\d]/g, '');
                if (priceText) productPrice = parseInt(priceText);
            }
            
            // التحقق من خيار البكرة (مع بكرة / بدون بكرة) إذا كان موجوداً
            let spoolOption = "";
            const activeSpoolBtn = card.querySelector('.product-options button.active, .spool-options button.active, input[type="radio"]:checked');
            if (activeSpoolBtn) {
                spoolOption = activeSpoolBtn.innerText || activeSpoolBtn.value;
            }
            
            let finalName = productName + (spoolOption ? ` (${spoolOption})` : '');
            
            // إضافة المنتج للمصفوفة
            let existingItem = cart.find(item => item.name === finalName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: finalName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCartUI();
            toggleCartModal(); // فتح السلة للتأكد من الإضافة
        }
    }
});
