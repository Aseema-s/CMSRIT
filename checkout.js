let cart = {
    items: {},
    total: 0,
    count: 0
};
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
    <i class="ri-checkbox-circle-line"></i>
    <span>${message}</span>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
function updateCartUI() {
    const cartCount = document.querySelector('.absolute');
    const totalAmount = document.querySelector('.text-primary.text-xl');
    cartCount.textContent = cart.count;
    totalAmount.textContent = `₹${cart.total}`;
}
document.addEventListener('DOMContentLoaded', function () {
    // Category tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            categoryTabs.forEach(t => t.classList.remove('active'));
            categoryTabs.forEach(t => t.classList.add('bg-white'));
            this.classList.add('active');
            this.classList.remove('bg-white');
        });
    });
    // Custom checkbox
    const vegCheckbox = document.getElementById('veg-checkbox');
    vegCheckbox.addEventListener('click', function () {
        this.classList.toggle('checked');
    });
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('focus', function () {
        this.parentElement.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    searchInput.addEventListener('blur', function () {
        this.parentElement.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = button.dataset.id;
            const quantitySelector = document.getElementById(`quantity-selector-${itemId}`);
            // Hide all other quantity selectors
            document.querySelectorAll('.quantity-selector').forEach(selector => {
                if (selector !== quantitySelector) {
                    selector.classList.remove('show');
                }
            });
            quantitySelector.classList.toggle('show');
        });
    });
    // Quantity selector functionality
    document.querySelectorAll('.quantity-selector').forEach(selector => {
        const decreaseBtn = selector.querySelector('.decrease-qty');
        const increaseBtn = selector.querySelector('.increase-qty');
        const input = selector.querySelector('.qty-input');
        const confirmBtn = selector.querySelector('.confirm-add');
        const addToCartBtn = selector.parentElement.querySelector('.add-to-cart-btn');
        decreaseBtn.addEventListener('click', () => {
            input.value = Math.max(1, parseInt(input.value) - 1);
        });
        increaseBtn.addEventListener('click', () => {
            input.value = Math.min(10, parseInt(input.value) + 1);
        });
        confirmBtn.addEventListener('click', () => {
            const quantity = parseInt(input.value);
            const itemId = addToCartBtn.dataset.id;
            const itemName = addToCartBtn.dataset.name;
            const itemPrice = parseInt(addToCartBtn.dataset.price);
            if (!cart.items[itemId]) {
                cart.items[itemId] = {
                    quantity: 0,
                    price: itemPrice,
                    name: itemName
                };
            }
            cart.items[itemId].quantity += quantity;
            cart.total += itemPrice * quantity;
            cart.count += quantity;
            updateCartUI();
            selector.classList.remove('show');
            showToast(`Added ${quantity} ${itemName} to cart`);
            input.value = 1;
        });
    });
    // Close quantity selector when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.quantity-selector') && !e.target.closest('.add-to-cart-btn')) {
            document.querySelectorAll('.quantity-selector').forEach(selector => {
                selector.classList.remove('show');
            });
        }
    });
});
