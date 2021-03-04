const shutThePopup = () => {
    const addToCartButton = document.querySelector('button');
    addToCartButton.textContent = 'Add to cart';
    const popup = document.getElementsByClassName('confirmation-popup');
    while (popup.length > 0) {
        popup[0].parentNode.removeChild(popup[0]);
    }
};

const confirmationPopup = (Furniture) => {
    const body = document.querySelector('body');
    window.createElement({
        containerId: 'body',
        type: 'div',
        classList: 'confirmation-popup bg',
    });
    window.createElement({
        containerId: 'body',
        type: 'div',
        classList: 'confirmation-popup content',
        contentAttribution: {
            type: 'innerHTML',
            value: `
            <button class="shut"> x </button>
            <div class="added-alert">
                <p>${Furniture.name} has been successfuly added to your Cart</p>
            </div>
            <div class="choice">
            <button class="shop">continue shopping</button>
            <button class="go-to-cart">checkout</button>
            </div>`,
        },
    });

    const shutPopup = document.querySelector('.confirmation-popup.content>button.shut');
    shutPopup.addEventListener('click', shutThePopup);

    const goBackShopping = document.querySelector('.confirmation-popup.content>div.choice>button.shop');

    goBackShopping.addEventListener('click', shutThePopup);

    const goToCart = document.querySelector('.confirmation-popup.content>div.choice>button.go-to-cart');
    goToCart.addEventListener('click', () => {
        window.location.href = 'http://127.0.0.1:5500/FRONT/cart.html';
    });
};
