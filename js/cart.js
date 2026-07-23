// ===== وظائف سلة التسوق والنافذة المنبثقة =====

// دالة فتح وإغلاق سلة التسوق
function toggleCartModal() {
    document.body.classList.toggle('cart-open');
}

// دالة إرسال الطلب عبر واتساب
function checkoutWhatsApp() {
    const phoneNumber = "9640000000000"; // استبدل الأصفار برقم هاتفك الحقيقي مع رمز الدولة
    let message = "مرحباً، أريد طلب المنتجات التالية من متجري:\n";
    
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}
