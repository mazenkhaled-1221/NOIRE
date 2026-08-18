/* =====================================================
   NOIRÉ — MAIN JAVASCRIPT
===================================================== */


/* ================= PAGE LOADER ================= */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
            document.body.classList.add("loaded");
        }, 900);
    }
});


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );
});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

let menuOpen = false;

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        menuOpen = !menuOpen;

        mobileMenu.classList.toggle(
            "open",
            menuOpen
        );

        const lines =
            menuBtn.querySelectorAll("span");

        if (menuOpen) {

            lines[0].style.transform =
                "rotate(45deg) translateY(5px)";

            lines[1].style.transform =
                "rotate(-45deg) translateY(-5px)";

            document.body.style.overflow = "hidden";

        } else {

            lines[0].style.transform = "";
            lines[1].style.transform = "";

            document.body.style.overflow = "";

        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuOpen = false;

            mobileMenu.classList.remove("open");

            document.body.style.overflow = "";

            const lines =
                menuBtn.querySelectorAll("span");

            lines[0].style.transform = "";
            lines[1].style.transform = "";

        });

    });

}


/* ================= CART ================= */

/* Renamed from "cartCount" to "homeCartCount": cart.js also
   declares a global named "cartCount" (a DOM element reference),
   and since both files share the page's global scope, having the
   same name twice threw "Identifier 'cartCount' has already been
   declared". */
let homeCartCount =
    Number(
        localStorage.getItem("noireCartCount")
    ) || 0;

const cartCounter =
    document.getElementById("cart-count");


function updateCartCounter() {

    if (cartCounter) {
        cartCounter.textContent = homeCartCount;
    }

}

updateCartCounter();


function addToCart(productName) {

    homeCartCount++;

    localStorage.setItem(
        "noireCartCount",
        homeCartCount
    );

    updateCartCounter();

    showNotification(
        `${productName} added to your bag`
    );
}


/* ================= HOME QUICK ADD ================= */

const quickAddButtons =
    document.querySelectorAll(".quick-add");

quickAddButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        const productCard =
            button.closest(".product-card");

        const name =
            productCard?.querySelector("h3")
                ?.textContent
                .trim() || "Product";

        addToCart(name);

    });

});


/* =====================================================
   SHOP PAGE
===================================================== */


/* ================= FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

/* Renamed from "shopProducts" to avoid clashing with any
   other declaration of the same name elsewhere on the page
   (e.g. an inline <script> in shop.html, or script.js being
   included twice). This was the cause of:
   "Uncaught SyntaxError: Identifier 'shopProducts' has
   already been declared" */
const shopProductElements =
    document.querySelectorAll(".shop-product");

const noProducts =
    document.getElementById("noProducts");


function filterProducts(category) {

    let visibleProducts = 0;

    shopProductElements.forEach(product => {

        const productCategory =
            product.dataset.category;

        if (
            category === "all" ||
            productCategory === category
        ) {

            product.classList.remove("hidden");

            visibleProducts++;

        } else {

            product.classList.add("hidden");

        }

    });


    if (noProducts) {

        noProducts.style.display =
            visibleProducts === 0
                ? "block"
                : "none";

    }

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts(
            button.dataset.category
        );

    });

});


/* ================= SEARCH ================= */

const searchBtn =
    document.getElementById("searchBtn2");

const searchBox =
    document.getElementById("shopSearch");

const closeSearch =
    document.getElementById("closeSearch");

const productSearch =
    document.getElementById("productSearch");


if (searchBtn && searchBox) {

    searchBtn.addEventListener("click", () => {

        searchBox.classList.toggle("open");

        if (searchBox.classList.contains("open")) {

            setTimeout(() => {
                productSearch?.focus();
            }, 300);

        }

    });

}


if (closeSearch && searchBox) {

    closeSearch.addEventListener("click", () => {

        searchBox.classList.remove("open");

        if (productSearch) {
            productSearch.value = "";
        }

        shopProductElements.forEach(product => {
            product.classList.remove("hidden");
        });

    });

}


if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            const searchValue =
                productSearch.value
                    .toLowerCase()
                    .trim();

            let visibleProducts = 0;

            shopProductElements.forEach(product => {

                const name =
                    product.dataset.name
                        .toLowerCase();

                if (
                    name.includes(searchValue)
                ) {

                    product.classList.remove(
                        "hidden"
                    );

                    visibleProducts++;

                } else {

                    product.classList.add(
                        "hidden"
                    );

                }

            });


            if (noProducts) {

                noProducts.style.display =
                    visibleProducts === 0
                        ? "block"
                        : "none";

            }

        }
    );

}


/* ================= SORT ================= */

const sortProducts =
    document.getElementById("sortProducts");


if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            const container =
                document.getElementById(
                    "shopProducts"
                );

            if (!container) return;

            const products =
                Array.from(
                    container.querySelectorAll(
                        ".shop-product"
                    )
                );


            const value =
                sortProducts.value;


            if (value === "low") {

                products.sort(
                    (a, b) =>
                        Number(a.dataset.price) -
                        Number(b.dataset.price)
                );

            }


            if (value === "high") {

                products.sort(
                    (a, b) =>
                        Number(b.dataset.price) -
                        Number(a.dataset.price)
                );

            }


            if (value === "default") {

                products.sort(
                    (a, b) =>
                        Number(
                            a.dataset.originalIndex
                        ) -
                        Number(
                            b.dataset.originalIndex
                        )
                );

            }


            products.forEach(product => {
                container.appendChild(product);
            });

        }
    );

}


/* ================= STORE ORIGINAL ORDER ================= */

shopProductElements.forEach(
    (product, index) => {

        product.dataset.originalIndex =
            index;

    }
);


/* ================= SHOP ADD TO BAG (card-based) ================= */

const shopAddButtons =
    document.querySelectorAll(".shop-add");

shopAddButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        const productCard =
            button.closest(".shop-product");

        if (!productCard) return;


        /* ================= PRODUCT DATA ================= */

        const productName =
            productCard.dataset.name ||
            "Product";

        const productPrice =
            Number(productCard.dataset.price) || 0;


        /* Get product ID from VIEW link */

        const productLink =
            productCard.querySelector("a");

        const url =
            productLink
                ? new URL(
                    productLink.href,
                    window.location.href
                )
                : null;

        const productId =
            url?.searchParams.get("id") ||
            productName
                .toLowerCase()
                .replace(/\s+/g, "-");


        /* ================= PRODUCT IMAGE ================= */

        const imageElement =
            productCard.querySelector(
                ".shop-product-image"
            );

        let productImage = "";

        if (imageElement) {

            const background =
                getComputedStyle(
                    imageElement
                ).backgroundImage;

            if (
                background &&
                background !== "none"
            ) {

                productImage =
                    background
                        .replace(/^url\(["']?/, "")
                        .replace(/["']?\)$/, "");

            }

        }


        /* ================= ADD TO CART ================= */

        if (
            typeof addProductToCart ===
            "function"
        ) {

            addProductToCart({

                id: productId,

                name: productName,

                price: productPrice,

                image: productImage,

                size: "M",

                color: "Default",

                quantity: 1

            });

        } else {

            console.error(
                "Cart system is not loaded. Make sure cart.js is loaded before script.js."
            );

            return;

        }


        /* ================= BUTTON EFFECT ================= */

        const originalText =
            button.textContent;

        button.textContent =
            "ADDED ✓";

        button.classList.add("added");


        setTimeout(() => {

            button.textContent =
                originalText;

            button.classList.remove(
                "added"
            );

        }, 1500);


        /* ================= OPEN CART ================= */

        const cartDrawer =
            document.getElementById(
                "cartDrawer"
            );

        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );


        cartDrawer?.classList.add(
            "active"
        );

        cartOverlay?.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    });

});

/* =====================================================
   WISHLIST
===================================================== */

const wishlistButtons =
    document.querySelectorAll(".wishlist-btn");

let wishlist =
    JSON.parse(
        localStorage.getItem("noireWishlist")
    ) || [];


/* ================= SAVE ================= */

function saveWishlist() {

    localStorage.setItem(
        "noireWishlist",
        JSON.stringify(wishlist)
    );

}


/* ================= INITIAL STATE ================= */

wishlistButtons.forEach(button => {

    const product =
        button.closest(".shop-product");

    if (!product) return;

    const productName =
        product.dataset.name;

    if (
        wishlist.includes(productName)
    ) {

        button.classList.add("active");

        button.textContent = "♥";

    }

});


/* ================= CLICK ================= */

wishlistButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            const product =
                button.closest(
                    ".shop-product"
                );

            if (!product) return;


            const productName =
                product.dataset.name;


            const index =
                wishlist.indexOf(
                    productName
                );


            /* REMOVE */

            if (index !== -1) {

                wishlist.splice(
                    index,
                    1
                );

                button.classList.remove(
                    "active"
                );

                button.textContent = "♡";


                showNotification(
                    "Removed from wishlist"
                );

            }

            /* ADD */

            else {

                wishlist.push(
                    productName
                );

                button.classList.add(
                    "active"
                );

                button.textContent = "♥";


                showNotification(
                    "Added to wishlist ♥"
                );

            }


            saveWishlist();

        }
    );

});

/* ================= NOTIFICATION ================= */

function showNotification(message) {

    const old =
        document.querySelector(
            ".notification"
        );

    if (old) old.remove();


    const notification =
        document.createElement("div");

    notification.className =
        "notification";


    notification.innerHTML = `
        <span>${message}</span>
        <span>✓</span>
    `;


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.classList.add(
            "show"
        );

    });


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(() => {
            notification.remove();
        }, 400);

    }, 2300);

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".intro, .section-heading, .collection-card, .product-card, .shop-product, .story-content, .cta-content"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}


/* ================= HERO PARALLAX ================= */

const heroImage =
    document.querySelector(".hero-image");


if (heroImage) {

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (
                scroll <
                window.innerHeight
            ) {

                heroImage.style.transform =
                    `scale(1) translateY(${scroll * 0.12}px)`;

            }

        }
    );

}


/* ================= MAGNETIC BUTTONS ================= */

const magneticButtons =
    document.querySelectorAll(
        ".hero-btn, .outline-btn, .text-link"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });

}


/* ================= NEWSLETTER ================= */

const newsletterForm =
    document.querySelector(
        ".footer-newsletter form"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const input =
                newsletterForm.querySelector(
                    "input"
                );

            if (
                !input ||
                !input.value.trim()
            ) return;

            input.value = "";

            showNotification(
                "You're on the list."
            );

        }
    );

}


/* ================= CUSTOM CURSOR ================= */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    const cursor =
        document.createElement("div");

    cursor.className =
        "custom-cursor";

    document.body.appendChild(
        cursor
    );


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.15;

        cursorY +=
            (mouseY - cursorY) * 0.15;

        cursor.style.transform =
            `translate3d(${cursorX}px, ${cursorY}px, 0)`;

        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    document.addEventListener(
        "mouseover",
        event => {

            if (
                event.target.closest(
                    "a, button, input, select"
                )
            ) {

                cursor.classList.add(
                    "cursor-hover"
                );

            }

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            if (
                event.target.closest(
                    "a, button, input, select"
                )
            ) {

                cursor.classList.remove(
                    "cursor-hover"
                );

            }

        }
    );

}


/* ================= ESCAPE ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            menuOpen
        ) {

            menuOpen = false;

            mobileMenu?.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

            const lines =
                menuBtn?.querySelectorAll(
                    "span"
                );

            if (lines) {

                lines[0].style.transform =
                    "";

                lines[1].style.transform =
                    "";

            }

        }

    }
);

/* =====================================================
   SHOP — ADD TO BAG (id-based product lookup)
===================================================== */

const shopProduct = {

    tee: {
        name: "Essential Oversized Tee",
        price: 49,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",
        color: "Black",
        size: "M"
    },

    denim: {
        name: "Structured Denim Jacket",
        price: 129,
        image:
            "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1200&q=90",
        color: "Indigo",
        size: "M"
    },

    coat: {
        name: "Minimal Wool Coat",
        price: 189,
        image:
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=90",
        color: "Camel",
        size: "M"
    },

    bag: {
        name: "Classic Leather Bag",
        price: 149,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
        color: "Black",
        size: "ONE SIZE"
    },

    shirt: {
        name: "Silk Essential Shirt",
        price: 79,
        image:
            "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=90",
        color: "Ivory",
        size: "M"
    },

    pants: {
        name: "Relaxed Tailored Pants",
        price: 99,
        image:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90",
        color: "Black",
        size: "M"
    },

    dress: {
        name: "Modern Knit Dress",
        price: 119,
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
        color: "Black",
        size: "M"
    },

    belt: {
        name: "Minimal Leather Belt",
        price: 59,
        image:
            "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=90",
        color: "Black",
        size: "M"
    }

};


/* ================= ADD BUTTON ================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(".shop-add");

        if (!button) return;


        const productId =
            button.dataset.productId;


        /* Fixed: was reading from "shopProducts" (the NodeList
           of DOM elements) instead of "shopProduct" (the data
           object above). That mismatch meant this lookup could
           never work even once the redeclaration error was gone. */
        const product =
            shopProduct[productId];


        if (!product) {

            console.error(
                "Product not found:",
                productId
            );

            return;

        }


        /* Add to Cart */

        if (
            typeof addProductToCart ===
            "function"
        ) {

            addProductToCart({

                id: productId,

                name: product.name,

                price: product.price,

                image: product.image,

                color: product.color,

                size: product.size,

                quantity: 1

            });

        } else {

            console.error(
                "Cart system is not loaded."
            );

            return;

        }


        /* ================= BUTTON ANIMATION ================= */

        const originalText =
            button.innerHTML;


        button.innerHTML =
            "ADDED ✓";


        button.classList.add(
            "added"
        );


        setTimeout(
            () => {

                button.innerHTML =
                    originalText;

                button.classList.remove(
                    "added"
                );

            },
            1500
        );


        /* ================= OPEN CART ================= */

        const cartDrawer =
            document.getElementById(
                "cartDrawer"
            );

        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );


        cartDrawer?.classList.add(
            "active"
        );

        cartOverlay?.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }
);