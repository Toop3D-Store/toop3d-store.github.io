
// مصفوفة لتخزين عناصر السلة
let cart = [];

// 1. دالة جلب المنتجات وعرضها عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    // جلب بيانات المنتجات باستخدام مسار نسبي
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
            console.error('خطأ:', error);
        });
}

// 2. دالة بناء بطاقات المنتجات في الصفحة
function renderProducts(products) {
    const container = document.getElementById('products-container');
    
    // إذا لم يكن العنصر موجوداً في HTML سنتركه حتى لا يسبب خطأ
    if (!container) return;

    container.innerHTML = ''; // تنظيف المكونات القديمة

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="./${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price} د.ع</p>
            <button onclick="addToCart('${product.name}', ${product.price})">إضافة للسلة</button>
        `;
        
        container.appendChild(productCard);
    });
}

// 3. دالة إضافة منتج للسلة
function addToCart(name, price) {
    cart.push({ name, price });
    alert(`تمت إضافة "${name}" إلى السلة`);
}

// 4. دالة إرسال الطلب عبر الواتساب (sendWhatsApp)
function sendWhatsApp() {
    // ضع رقم هاتفك مع المفتاح الدولي بدون علامة + (مثلاً للعراق: 9647700000000)
    const phoneNumber = "9647827573964"; 

    if (cart.length === 0) {
        // رسالة عامة إذا لم يختر أي منتج بعد
        const message = encodeURIComponent("مرحباً Toop3D، أود الاستفسار عن منتجات الطباعة ثلاثية الأبعاد.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        return;
    }

    // تجميع عناصر السلة في نص واحد
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
