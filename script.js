// Product Details
const products = {
    1: {
        name: "Handwoven Basket",
        price: "$24.99",
        size: "12\" diameter x 8\" height",
        description: "Perfect for home storage, made from natural materials by skilled artisans.",
        image: "https://images.pexels.com/photos/4466176/pexels-photo-4466176.jpeg"
    },
    2: {
        name: "Ceramic Mug Set",
        price: "$32.50",
        size: "Set of 4 (12oz each)",
        description: "Unique hand-painted designs, microwave and dishwasher safe.",
        image: "https://images.pexels.com/photos/4207785/pexels-photo-4207785.jpeg"
    },
    3: {
        name: "Wooden Serving Tray",
        price: "$45.00",
        size: "18\" x 12\"",
        description: "Handcrafted from oak with natural finish, perfect for serving snacks.",
        image: "https://images.pexels.com/photos/4207788/pexels-photo-4207788.jpeg"
    }
};

// Initialize product click handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all product overlays
    document.querySelectorAll('.product-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            showProductFlashcard(productId);
        });
    });

    // Category filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('bg-amber-600', 'text-white'));
            // Add active class to clicked button
            button.classList.add('bg-amber-600', 'text-white');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

// Show product flashcard modal
function showProductFlashcard(productId) {
    const product = products[productId];
    
    // Create modal HTML
    const modalHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div class="bg-white rounded-lg max-w-2xl w-full overflow-hidden shadow-xl">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <div class="p-6">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded-lg">
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2">${product.name}</h3>
                        <p class="text-amber-600 text-xl font-bold mb-4">${product.price}</p>
                        <p class="text-gray-600 mb-2"><strong>Size:</strong> ${product.size}</p>
                        <p class="text-gray-600 mb-6">${product.description}</p>
                        <button onclick="closeFlashcard()" class="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.id = 'product-flashcard';
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close flashcard
function closeFlashcard() {
    const modal = document.getElementById('product-flashcard');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Make closeFlashcard available globally
window.closeFlashcard = closeFlashcard;