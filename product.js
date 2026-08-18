/* =====================================================
   NOIRÉ — PRODUCT SYSTEM
===================================================== */


/* ================= PRODUCT DATA ================= */

const products = {

    tee: {
        name: "Essential Oversized Tee",
        category: "MEN / COLLECTION 01",
        price: 49,

        description:
            "A refined everyday essential designed with a relaxed silhouette and premium heavyweight cotton.",

        colors: [
            {
                name: "Black",
                value: "#111111"
            },
            {
                name: "Cream",
                value: "#e8e2d8"
            },
            {
                name: "Stone",
                value: "#8d8981"
            }
        ],

        sizes: [
            "S",
            "M",
            "L",
            "XL"
        ],

        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1583743814966-8936f37f4678?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    denim: {
        name: "Structured Denim Jacket",
        category: "MEN / COLLECTION 01",
        price: 129,

        description:
            "A structured denim jacket with a modern silhouette, designed to become an effortless everyday layer.",

        colors: [
            {
                name: "Indigo",
                value: "#273747"
            },
            {
                name: "Black",
                value: "#151515"
            }
        ],

        sizes: [
            "S",
            "M",
            "L",
            "XL"
        ],

        images: [
            "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    coat: {
        name: "Minimal Wool Coat",
        category: "WOMEN / COLLECTION 01",
        price: 189,

        description:
            "A timeless wool coat defined by a clean silhouette, refined structure and exceptional warmth.",

        colors: [
            {
                name: "Camel",
                value: "#a88b6a"
            },
            {
                name: "Black",
                value: "#151515"
            }
        ],

        sizes: [
            "XS",
            "S",
            "M",
            "L"
        ],

        images: [
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e1?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    bag: {
        name: "Classic Leather Bag",
        category: "ACCESSORIES / COLLECTION 01",
        price: 149,

        description:
            "A refined leather bag crafted for everyday movement with a timeless and understated character.",

        colors: [
            {
                name: "Black",
                value: "#111111"
            },
            {
                name: "Brown",
                value: "#5b3828"
            }
        ],

        sizes: [
            "ONE SIZE"
        ],

        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    shirt: {
        name: "Silk Essential Shirt",
        category: "WOMEN / COLLECTION 01",
        price: 79,

        description:
            "An effortless silk shirt with a fluid silhouette designed for understated elegance.",

        colors: [
            {
                name: "Ivory",
                value: "#e9e2d4"
            },
            {
                name: "Black",
                value: "#111111"
            }
        ],

        sizes: [
            "XS",
            "S",
            "M",
            "L"
        ],

        images: [
            "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1564257577054-6e1f3c7b9a6d?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    pants: {
        name: "Relaxed Tailored Pants",
        category: "MEN / COLLECTION 01",
        price: 99,

        description:
            "Relaxed tailored trousers combining everyday comfort with a refined contemporary silhouette.",

        colors: [
            {
                name: "Black",
                value: "#111111"
            },
            {
                name: "Charcoal",
                value: "#3e3e3e"
            }
        ],

        sizes: [
            "S",
            "M",
            "L",
            "XL"
        ],

        images: [
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1506629905607-d9c297d5e2f4?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    dress: {
        name: "Modern Knit Dress",
        category: "WOMEN / COLLECTION 01",
        price: 119,

        description:
            "A modern knit dress with a clean silhouette, soft texture and effortless movement.",

        colors: [
            {
                name: "Black",
                value: "#111111"
            },
            {
                name: "Mocha",
                value: "#806552"
            }
        ],

        sizes: [
            "XS",
            "S",
            "M",
            "L"
        ],

        images: [
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90"
        ]
    },


    belt: {
        name: "Minimal Leather Belt",
        category: "ACCESSORIES / COLLECTION 01",
        price: 59,

        description:
            "A minimal leather belt designed with clean hardware and timeless everyday appeal.",

        colors: [
            {
                name: "Black",
                value: "#111111"
            },
            {
                name: "Brown",
                value: "#56382b"
            }
        ],

        sizes: [
            "S",
            "M",
            "L"
        ],

        images: [
            "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1585856330926-6c8f3c5f6a9e?auto=format&fit=crop&w=1200&q=90",
            "https://images.unsplash.com/photo-1612902456551-333ac5afa26e?auto=format&fit=crop&w=1200&q=90"
        ]
    }

};


/* ================= GET PRODUCT ================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const productId =
    params.get("id") || "tee";

const product =
    products[productId] || products.tee;


/* ================= ELEMENTS ================= */

const title =
    document.getElementById(
        "productTitle"
    );

const category =
    document.getElementById(
        "productCategory"
    );

const price =
    document.getElementById(
        "productPrice"
    );

const description =
    document.getElementById(
        "productDescription"
    );

const mainImage =
    document.getElementById(
        "mainProductImage"
    );

const thumbnails =
    document.getElementById(
        "productThumbnails"
    );

const colorOptions =
    document.getElementById(
        "colorOptions"
    );

const sizeOptions =
    document.getElementById(
        "sizeOptions"
    );

const selectedColor =
    document.getElementById(
        "selectedColor"
    );

const quantityElement =
    document.getElementById(
        "quantity"
    );

const addPrice =
    document.getElementById(
        "addPrice"
    );

const breadcrumb =
    document.getElementById(
        "breadcrumbProduct"
    );

const imageNumber =
    document.getElementById(
        "imageNumber"
    );

    /* ================= WISHLIST ================= */

const productWishlist =
    document.getElementById(
        "productWishlist"
    );

let noireWishlist =
    JSON.parse(
        localStorage.getItem(
            "noireWishlist"
        )
    ) || [];


function updateProductWishlist() {

    if (!productWishlist) return;

    const exists =
        noireWishlist.includes(
            productId
        );

    productWishlist.textContent =
        exists ? "♥" : "♡";

    productWishlist.classList.toggle(
        "active",
        exists
    );

}


updateProductWishlist();


productWishlist?.addEventListener(
    "click",
    () => {

        const index =
            noireWishlist.indexOf(
                productId
            );


        if (index !== -1) {

            noireWishlist.splice(
                index,
                1
            );

        } else {

            noireWishlist.push(
                productId
            );

        }


        localStorage.setItem(
            "noireWishlist",
            JSON.stringify(
                noireWishlist
            )
        );


        updateProductWishlist();

    }
);


/* ================= FILL PRODUCT ================= */

document.title =
    `${product.name} — NOIRÉ`;

title.textContent =
    product.name;

category.textContent =
    product.category;

price.textContent =
    `$${product.price}`;

addPrice.textContent =
    `$${product.price}`;

description.textContent =
    product.description;

breadcrumb.textContent =
    product.name;


/* ================= MAIN IMAGE ================= */

let currentImage = 0;

function setMainImage(index) {

    currentImage = index;

    if (!mainImage) return;


    mainImage.style.backgroundImage =
        `url("${product.images[index]}")`;


    imageNumber.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(product.images.length).padStart(2, "0")}`;


    document
        .querySelectorAll(".product-thumb")
        .forEach((thumb, i) => {

            thumb.classList.toggle(
                "active",
                i === index
            );

        });

}


setMainImage(0);

/* ================= GALLERY CONTROLS ================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "ArrowRight" &&
            currentImage < product.images.length - 1
        ) {

            setMainImage(
                currentImage + 1
            );

        }


        if (
            event.key === "ArrowLeft" &&
            currentImage > 0
        ) {

            setMainImage(
                currentImage - 1
            );

        }

    }
);

/* ================= THUMBNAILS ================= */

product.images.forEach(
    (image, index) => {

        const thumbnail =
            document.createElement("button");

        thumbnail.className =
            "product-thumb";

        thumbnail.style.backgroundImage =
            `url("${image}")`;

        if (index === 0) {
            thumbnail.classList.add(
                "active"
            );
        }
        
        thumbnail.addEventListener(
    "click",
    event => {
        event.preventDefault();

        setMainImage(index);

        document
            .querySelectorAll(".product-thumb")
            .forEach(thumb => {
                thumb.classList.remove("active");
            });

        thumbnail.classList.add("active");
    }
);
       

        thumbnails.appendChild(
            thumbnail
        );

    }
);


/* ================= COLORS ================= */

let activeColor =
    product.colors[0].name;


product.colors.forEach(
    (color, index) => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "color-btn";

        button.style.background =
            color.value;

        button.title =
            color.name;

        if (index === 0) {
            button.classList.add(
                "active"
            );
        }

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".color-btn"
                    )
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                activeColor =
                    color.name;

                selectedColor.textContent =
                    color.name;

            }
        );

        colorOptions.appendChild(
            button
        );

    }
);


/* ================= SIZES ================= */

let activeSize =
    product.sizes[0];


product.sizes.forEach(
    (size, index) => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "size-btn";

        button.textContent =
            size;

        if (index === 0) {
            button.classList.add(
                "active"
            );
        }

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".size-btn"
                    )
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "active"
                            )
                    );

                button.classList.add(
                    "active"
                );

                activeSize = size;

            }
        );

        sizeOptions.appendChild(
            button
        );

    }
);


/* ================= QUANTITY ================= */

let quantity = 1;


const decrease =
    document.getElementById(
        "decreaseQty"
    );

const increase =
    document.getElementById(
        "increaseQty"
    );


decrease.addEventListener(
    "click",
    () => {

        if (quantity > 1) {

            quantity--;

            quantityElement.textContent =
                quantity;

        }

    }
);


increase.addEventListener(
    "click",
    () => {

        if (quantity < 10) {

            quantity++;

            quantityElement.textContent =
                quantity;

        }

    }
);

/* ================= ADD TO BAG ================= */

const productAdd = document.getElementById("productAdd");

if (productAdd) {

    productAdd.addEventListener("click", function () {

        console.log("ADD TO BAG CLICKED");

        const cartProduct = {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: activeSize,
            color: activeColor,
            quantity: quantity
        };

        if (typeof addProductToCart !== "function") {

            console.error("addProductToCart is not available!");

            return;
        }

        addProductToCart(cartProduct);

        /* Button animation */

        const oldHTML = productAdd.innerHTML;

        productAdd.innerHTML = `
            <span>ADDED TO BAG ✓</span>
            <strong>${quantity} ITEM${quantity > 1 ? "S" : ""}</strong>
        `;

        productAdd.classList.add("added");

        /* Open Cart */

        const cartDrawer =
            document.getElementById("cartDrawer");

        const cartOverlay =
            document.getElementById("cartOverlay");

        cartDrawer?.classList.add("active");
        cartOverlay?.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(() => {

            productAdd.innerHTML = oldHTML;

            productAdd.classList.remove("added");

        }, 1800);

    });

}

/* ================= RELATED PRODUCTS ================= */

const relatedContainer =
    document.getElementById(
        "relatedProducts"
    );


const relatedIds =
    Object.keys(products)
        .filter(id => id !== productId)
        .slice(0, 4);


relatedIds.forEach(id => {

    const item =
        products[id];


    const card =
        document.createElement("a");

    card.href =
        `product.html?id=${id}`;

    card.className =
        "product-card";


   card.innerHTML = `

    <div
        class="product-image"
        style="
            background-image:
            url('${item.images[0]}')
        "
    >

        <button
            class="quick-add"
            type="button"
            aria-label="Quick add">

            +

        </button>

    </div>


    <div class="product-info">

        <div>

            <h3>
                ${item.name}
            </h3>

            <p>
                ${item.category}
            </p>

        </div>

        <strong>
            $${item.price}
        </strong>

    </div>

`;


    relatedContainer.appendChild(
        card
    );
    
    const quickAdd =
    card.querySelector(
        ".quick-add"
    );


quickAdd?.addEventListener(
    "click",
    event => {

        event.preventDefault();
        event.stopPropagation();


        if (
            typeof addProductToCart ===
            "function"
        ) {

            addProductToCart({

                id,

                name: item.name,

                price: item.price,

                image: item.images[0],

                color: item.colors[0].name,

                size: item.sizes[0],

                quantity: 1

            });


            quickAdd.textContent =
                "✓";


            setTimeout(() => {

                quickAdd.textContent =
                    "+";

            }, 1200);

        }

    }
);

});


/* ================= HEADER ================= */

const header =
    document.getElementById(
        "header"
    );


window.addEventListener(
    "scroll",
    () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }
);


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });

}