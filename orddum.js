document.addEventListener('DOMContentLoaded', function () {
    // Delivery option toggle
    const dineInRadio = document.getElementById('dine-in-radio');
    const takeawayRadio = document.getElementById('takeaway-radio');
    const deliveryAddress = document.getElementById('delivery-address');

    dineInRadio.addEventListener('click', function () {
        dineInRadio.classList.add('checked');
        takeawayRadio.classList.remove('checked');
        deliveryAddress.classList.add('hidden');
    });

    takeawayRadio.addEventListener('click', function () {
        takeawayRadio.classList.add('checked');
        dineInRadio.classList.remove('checked');
        deliveryAddress.classList.remove('hidden');
    });

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const upiDetails = document.querySelector('.upi-details');

    paymentMethods.forEach(method => {
        method.addEventListener('click', function () {
            // Remove active class and checked radio from all methods
            paymentMethods.forEach(m => {
                m.classList.remove('active');
                m.querySelector('.custom-radio').classList.remove('checked');
            });

            // Add active class and checked radio to clicked method
            this.classList.add('active');
            this.querySelector('.custom-radio').classList.add('checked');

            // Show/hide UPI details
            if (this.id === 'upi-payment') {
                upiDetails.classList.remove('hidden');
            } else {
                upiDetails.classList.add('hidden');
            }
        });
    });

    // Quantity controls
    const decreaseBtns = document.querySelectorAll('.decrease-qty');
    const increaseBtns = document.querySelectorAll('.increase-qty');

    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const quantitySpan = this.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateTotals();
            }
        });
    });

    increaseBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const quantitySpan = this.previousElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity < 10) {
                quantity++;
                quantitySpan.textContent = quantity;
                updateTotals();
            }
        });
    });

    function updateTotals() {
        // This would be implemented to recalculate totals based on quantity changes
        // For this demo, we'll just show a toast
        showToast('Cart updated');
    }

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
});