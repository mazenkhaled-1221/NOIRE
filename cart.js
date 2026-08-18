/* =====================================================
   NOIRÉ — CART + REAL CHECKOUT SYSTEM
===================================================== */

const CART_KEY = "noireCart";


/* =====================================================
   GET CART
===================================================== */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch {

        return [];

    }

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =====================================================
   ELEMENTS
===================================================== */

const cartBtn =
    document.querySelector(".cart-btn");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartBottom =
    document.getElementById("cartBottom");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartCount =
    document.getElementById("cart-count");

const continueShopping =
    document.getElementById("continueShopping");


/* =====================================================
   FREE SHIPPING
===================================================== */

const FREE_SHIPPING_LIMIT = 200;

const shippingMessage =
    document.getElementById(
        "shippingMessage"
    );

const shippingBar =
    document.getElementById(
        "shippingBar"
    );

const shippingPercent =
    document.getElementById(
        "shippingPercent"
    );


function updateShippingProgress(subtotal) {

    if (
        !shippingBar ||
        !shippingMessage ||
        !shippingPercent
    ) {
        return;
    }


    const percentage =
        Math.min(
            (subtotal / FREE_SHIPPING_LIMIT) * 100,
            100
        );


    shippingBar.style.width =
        `${percentage}%`;


    shippingPercent.textContent =
        `${Math.round(percentage)}%`;


    if (
        subtotal >=
        FREE_SHIPPING_LIMIT
    ) {

        shippingMessage.textContent =
            "YOU UNLOCKED FREE SHIPPING ✦";

    } else {

        const remaining =
            FREE_SHIPPING_LIMIT -
            subtotal;

        shippingMessage.textContent =
            `ADD $${remaining} MORE FOR FREE SHIPPING`;

    }

}


/* =====================================================
   CHECKOUT ELEMENTS
===================================================== */

const checkoutBtn =
    document.querySelector(".checkout-btn");

const checkoutOverlay =
    document.getElementById(
        "checkoutOverlay"
    );

const checkoutClose =
    document.getElementById(
        "checkoutClose"
    );

const checkoutSummaryItems =
    document.getElementById(
        "checkoutSummaryItems"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const checkoutForm =
    document.getElementById("checkoutForm");


checkoutForm?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const cart = getCart();


        if (cart.length === 0) {

            showNotification?.(
                "Your bag is empty."
            );

            return;
        }


        const name =
            document
                .getElementById("customerName")
                ?.value
                .trim();


        const phone =
            document
                .getElementById("customerPhone")
                ?.value
                .trim();


        const email =
            document
                .getElementById("customerEmail")
                ?.value
                .trim();


        const address =
            document
                .getElementById("customerAddress")
                ?.value
                .trim();


        const city =
            document
                .getElementById("customerCity")
                ?.value
                .trim();


        if (
            !name ||
            !phone ||
            !email ||
            !address ||
            !city
        ) {

            showNotification?.(
                "Please complete all required fields."
            );

            return;
        }


        /*
         * Disable button
         */

        const placeOrderBtn =
            checkoutForm.querySelector(
                ".place-order-btn"
            );


        if (placeOrderBtn) {

            placeOrderBtn.disabled = true;

            placeOrderBtn.querySelector(
                "span"
            ).textContent =
                "REDIRECTING...";

        }


        try {

            /*
             * =========================
             * SEND ORDER TO BACKEND
             * =========================
             */

            const response =
                await fetch(
                    "/create-payment",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            name,

                            phone,

                            email,

                            address,

                            city,

                            items: getCart()

                        })

        });


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "payment initialize failed ."
                );

            }


            /*
             * =========================
             * SAVE ORDER INFORMATION
             * =========================
             */

            localStorage.setItem(
                "noirePendingOrder",
                JSON.stringify({

                    orderNumber:
                        data.orderNumber,

                    customer: {

                        name,

                        phone,

                        email,

                        address,

                        city

                    },

                    items: cart

                })
            );


            /*
             * =========================
             * PAYMOB UNIFIED CHECKOUT
             * =========================
             */

            if (!data.checkoutUrl) {
    throw new Error("Payment checkout URL was not returned.");
}

window.location.href = data.checkoutUrl;


        } catch (error) {

            console.error(
                "Checkout error:",
                error
            );


            showNotification?.(
                error.message ||
                "Something went wrong."
            );


            /*
             * Enable button again
             */

            if (placeOrderBtn) {

                placeOrderBtn.disabled =
                    false;

                placeOrderBtn.querySelector(
                    "span"
                ).textContent =
                    "PLACE ORDER";

            }

        }

    }
);


/* =====================================================
   OPEN CHECKOUT
===================================================== */

function openCheckout() {

    const cart =
        getCart();


    if (
        cart.length === 0
    ) {

        showNotification?.(
            "Your bag is empty."
        );

        return;

    }


    renderCheckout();


    checkoutOverlay?.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeCheckout() {

    checkoutOverlay?.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   CHECKOUT EVENTS
===================================================== */

checkoutBtn?.addEventListener(
    "click",
    openCheckout
);


checkoutClose?.addEventListener(
    "click",
    closeCheckout
);


checkoutOverlay?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            checkoutOverlay
        ) {

            closeCheckout();

        }

    }
);


/* =====================================================
   RENDER CHECKOUT SUMMARY
===================================================== */

function renderCheckout() {

    const cart =
        getCart();


    if (
        !checkoutSummaryItems
    ) {
        return;
    }


    checkoutSummaryItems.innerHTML =
        "";


    let total = 0;


    cart.forEach(
        item => {

            const price =
                Number(item.price);

            const quantity =
                Number(item.quantity);


            const itemTotal =
                price * quantity;


            total +=
                itemTotal;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "checkout-summary-item";


            element.innerHTML = `

                <span>

                    ${item.name}

                    <br>

                    ${quantity} × $${price}

                </span>

                <strong>
                    $${itemTotal}
                </strong>

            `;


            checkoutSummaryItems.appendChild(
                element
            );

        }
    );


    if (
        checkoutTotal
    ) {

        checkoutTotal.textContent =
            `$${total}`;

    }

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    cartDrawer?.classList.add(
        "active"
    );


    cartOverlay?.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    renderCart();

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCartDrawer() {

    cartDrawer?.classList.remove(
        "active"
    );


    cartOverlay?.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   CART EVENTS
===================================================== */

cartBtn?.addEventListener(
    "click",
    openCart
);


closeCart?.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay?.addEventListener(
    "click",
    closeCartDrawer
);


continueShopping?.addEventListener(
    "click",
    closeCartDrawer
);


/* =====================================================
   ADD PRODUCT
===================================================== */

function addProductToCart(product) {

    const cart =
        getCart();


    const existing =
        cart.find(
            item =>
                item.id === product.id &&
                item.size === product.size &&
                item.color === product.color
        );


    if (
        existing
    ) {

        existing.quantity +=
            product.quantity;

    } else {

        cart.push(
            product
        );

    }


    saveCart(
        cart
    );


    updateCartCount();

    renderCart();

    bumpCart();

}


/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const cart =
        getCart();


    const count =
        cart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    Number(item.quantity)
                );

            },
            0
        );


    if (
        cartCount
    ) {

        cartCount.textContent =
            count;

    }

}


/* =====================================================
   CART BUMP
===================================================== */

function bumpCart() {

    if (
        !cartBtn
    ) {
        return;
    }


    cartBtn.classList.remove(
        "bump"
    );


    void cartBtn.offsetWidth;


    cartBtn.classList.add(
        "bump"
    );


    setTimeout(
        () => {

            cartBtn.classList.remove(
                "bump"
            );

        },
        300
    );

}


/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const cart =
        getCart();


    if (
        !cartItems
    ) {
        return;
    }


    cartItems.innerHTML =
        "";


    /* ================= EMPTY ================= */

    if (
        cart.length === 0
    ) {

        cartItems.style.display =
            "none";


        cartEmpty?.classList.add(
            "active"
        );


        if (
            cartBottom
        ) {

            cartBottom.style.display =
                "none";

        }


        updateCartCount();

        return;

    }


    /* ================= HAS PRODUCTS ================= */

    cartItems.style.display =
        "block";


    cartEmpty?.classList.remove(
        "active"
    );


    if (
        cartBottom
    ) {

        cartBottom.style.display =
            "block";

    }


    cart.forEach(
        (
            item,
            index
        ) => {

            const element =
                document.createElement(
                    "article"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div
                    class="cart-item-image"
                    style="
                        background-image:
                        url('${item.image}')
                    "
                ></div>


                <div class="cart-item-info">

                    <div>

                        <h3>
                            ${item.name}
                        </h3>


                        <p class="cart-item-meta">

                            SIZE:
                            ${item.size || "N/A"}

                            <br>

                            COLOR:
                            ${item.color || "N/A"}

                        </p>

                    </div>


                    <div class="cart-item-controls">

                        <div class="cart-qty">

                            <button
                                type="button"
                                data-action="minus"
                                data-index="${index}">
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                data-action="plus"
                                data-index="${index}">
                                +
                            </button>

                        </div>


                        <button
                            type="button"
                            class="remove-item"
                            data-action="remove"
                            data-index="${index}">

                            REMOVE

                        </button>

                    </div>

                </div>


                <strong class="cart-item-price">

                    $${Number(item.price) *
                    Number(item.quantity)}

                </strong>

            `;


            cartItems.appendChild(
                element
            );

        }
    );


    /* ================= SUBTOTAL ================= */

    const subtotal =
        cart.reduce(
            (
                total,
                item
            ) => {

                return (
                    total +
                    Number(item.price) *
                    Number(item.quantity)
                );

            },
            0
        );


    if (
        cartSubtotal
    ) {

        cartSubtotal.textContent =
            `$${subtotal}`;

    }


    updateShippingProgress(
        subtotal
    );


    updateCartCount();

}


/* =====================================================
   CART ACTIONS
===================================================== */

cartItems?.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (
            !button
        ) {
            return;
        }


        const index =
            Number(
                button.dataset.index
            );


        const action =
            button.dataset.action;


        const cart =
            getCart();


        if (
            !cart[index]
        ) {
            return;
        }


        /* ================= PLUS ================= */

        if (
            action === "plus"
        ) {

            if (
                Number(
                    cart[index].quantity
                ) < 10
            ) {

                cart[index].quantity++;

            }

        }


        /* ================= MINUS ================= */

        if (
            action === "minus"
        ) {

            cart[index].quantity--;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(
                    index,
                    1
                );

            }

        }


        /* ================= REMOVE ================= */

        if (
            action === "remove"
        ) {

            cart.splice(
                index,
                1
            );

        }


        saveCart(
            cart
        );


        renderCart();


        /*
         * If checkout is already open,
         * update its summary too.
         */

        if (
            checkoutOverlay?.classList.contains(
                "active"
            )
        ) {

            renderCheckout();

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCartDrawer();

            closeCheckout();

        }

    }
);


/* =====================================================
   REAL PAYMENT CHECKOUT
===================================================== */

checkoutForm?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const cart =
            getCart();


        /* ================= EMPTY CART ================= */

        if (
            cart.length === 0
        ) {

            showNotification?.(
                "Your bag is empty."
            );

            return;

        }


        /* =================================================
           CUSTOMER DATA
        ================================================= */

        const customer = {

            name:
                document
                    .getElementById(
                        "customerName"
                    )
                    ?.value
                    .trim(),

            phone:
                document
                    .getElementById(
                        "customerPhone"
                    )
                    ?.value
                    .trim(),

            email:
                document
                    .getElementById(
                        "customerEmail"
                    )
                    ?.value
                    .trim(),

            address:
                document
                    .getElementById(
                        "customerAddress"
                    )
                    ?.value
                    .trim(),

            city:
                document
                    .getElementById(
                        "customerCity"
                    )
                    ?.value
                    .trim(),

            country:
                "Egypt",

            notes:
                document
                    .getElementById(
                        "orderNotes"
                    )
                    ?.value
                    .trim()

        };


        /* =================================================
           VALIDATION
        ================================================= */

        if (
            !customer.name ||
            !customer.phone ||
            !customer.email ||
            !customer.address ||
            !customer.city
        ) {

            showNotification?.(
                "Please complete all required fields."
            );

            return;

        }


        /* =================================================
           CALCULATE TOTAL
        ================================================= */

        const total =
            cart.reduce(
                (
                    sum,
                    item
                ) => {

                    return (
                        sum +
                        Number(item.price) *
                        Number(item.quantity)
                    );

                },
                0
            );


        if (
            !Number.isFinite(total) ||
            total <= 0
        ) {

            showNotification?.(
                "Invalid order total."
            );

            return;

        }


        /* =================================================
           BUTTON
        ================================================= */

        const button =
            checkoutForm.querySelector(
                ".place-order-btn"
            );


        const buttonText =
            button?.querySelector(
                "span"
            );


        if (
            button
        ) {

            button.disabled =
                true;


            button.classList.add(
                "loading"
            );

        }


        if (
            buttonText
        ) {

            buttonText.textContent =
                "PROCESSING...";

        }


        /* =================================================
           SEND ORDER TO BACKEND
        ================================================= */

        try {

            const response =
                await fetch(
                    "/api/create-payment",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                customer,

                                items:
                                    cart,

                                total

                            })

                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Payment initialization failed."
                );

            }


            /* =================================================
               SAVE PENDING ORDER

               DO NOT CLEAR CART HERE.

               Cart is cleared only after payment
               is successfully confirmed.
            ================================================= */

            localStorage.setItem(
                "noirePendingOrder",
                JSON.stringify({

                    orderNumber:
                        data.orderNumber,

                    customer,

                    items:
                        cart,

                    total,

                    createdAt:
                        new Date()
                            .toISOString()

                })
            );


            /* =================================================
               PAYMOB CHECKOUT
            ================================================= */

            if (
                !data.clientSecret ||
                !data.publicKey
            ) {

                throw new Error(
                    "Payment session was not created."
                );

            }


            if (!data.checkoutUrl) {
    throw new Error("Payment checkout URL was not returned.");
}

window.location.href = data.checkoutUrl;

        } catch (
            error
        ) {

            console.error(
                "Checkout Error:",
                error
            );


            showNotification?.(
                error.message ||
                "Unable to start payment."
            );


            /* ================= RESET BUTTON ================= */

            if (
                button
            ) {

                button.disabled =
                    false;


                button.classList.remove(
                    "loading"
                );

            }


            if (
                buttonText
            ) {

                buttonText.textContent =
                    "PAY NOW";

            }

        }

    }
);


/* =====================================================
   INIT
===================================================== */

updateCartCount();

renderCart();