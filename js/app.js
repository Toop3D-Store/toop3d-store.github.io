// دالة إظهار وإخفاء النافذة المنبثقة للسلة
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-nav-btn');
    
    if (!cartModal) return;

    // إذا كانت السلة مخفية ونريد فتحها
    if (cartModal.style.display === 'none' || cartModal.style.display === '') {
        cartModal.style.display = 'block';
        if (cartBtn) cartBtn.style.display = 'none'; // 👈 إخفاء زر السلة العائم فوراً
    } else {
        // عند إغلاق السلة
        cartModal.style.display = 'none';
        if (cartBtn) cartBtn.style.display = 'flex'; // 👈 إعادة إظهار زر السلة العائم
    }
}

// التأكد من إعادة إظهار الزر عند الضغط على زر الإغلاق (X)
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartBtn = document.getElementById('cart-nav-btn');
    
    if (cartModal) cartModal.style.display = 'none';
    if (cartBtn) cartBtn.style.display = 'flex';
}
