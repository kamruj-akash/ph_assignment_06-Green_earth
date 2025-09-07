// re-usable function
const getID = (id) => document.getElementById(id);

const removeActive = () => {
  const activeBtn = document.querySelectorAll(".activeBtn");
  activeBtn.forEach((btn) => {
    btn.classList.remove("bg-[#15803c]", "text-white", "hover:bg-[#15803c]");
  });
};
// spinner control function

const managerSpinner = (status) => {
  if (status == true) {
    getID("spinner").classList.remove("hidden");
  } else {
    getID("spinner").classList.add("hidden");
  }
};

// category_name btn function
const loadBtns = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  managerSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadCategories(data.categories));
};

const loadCategories = (data) => {
  const btnContainer = getID("btn_container");
  data.forEach((btn) => {
    const newBtns = document.createElement("div");
    newBtns.innerHTML = `
        <button id="activeBtn_${btn.id}"  onclick="loadViaCategory(${btn.id})"
            class="mb-1 w-full text-left px-3 py-2 rounded-lg hover:bg-[#15803c48] cursor-pointer activeBtn"
          >
           ${btn.category_name}
          </button>
    `;
    btnContainer.appendChild(newBtns);
  });
};

// all plants load function
const allPlantsLoad = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadAllPlants(data.plants));
};

const loadAllPlants = (data) => {
  const productContainer = getID("produces_container");

  data.forEach((cards) => {
    const newCards = document.createElement("div");
    newCards.innerHTML = `
    <div class="bg-white p-4 rounded-xl shadow">
            <div class="h-52 bg-gray-200 rounded overflow-hidden md:h-32">
             <img
                class="w-full"
                 src="${cards.image}"
                alt=""
              />
            </div>
            <h3 onclick="modalDescription(${cards.id})" class="font-semibold mt-3 hover:text-[#15803c] hover:underline hover:cursor-pointer" >${cards.name}</h3>
            <p class="text-sm text-gray-500">
             ${cards.description}
            </p>
            <div class="flex justify-between items-center mt-4">
              <span
                class="text-sm bg-green-100 text-green-700 px-2 py-1 rounded"
                >${cards.category}</span
              >
              <span class="font-semibold">৳${cards.price}</span>
            </div>
                <button class="btn btn-block mt-5 bg-[#15803D] border-0 rounded-4xl shadow-none text-white">Add to Cart</button>
          </div>
    `;
    productContainer.appendChild(newCards);
    managerSpinner(false);

    // add to cart function
    const addToCartButton = newCards.querySelector("button");
    addToCartButton.addEventListener("click", () => {
      const cartContainer = document.getElementById("cart_container");
      const newCart = document.createElement("div");
      newCart.innerHTML = `
            <div
              class="flex justify-between items-center mb-2 bg-[#F0FDF4] py-3 px-4 cartSignle"
            >
              <div>
                <h1 class="mb-1 text-[#1F2937] font-semibold">${cards.name}</h1>
                <p>
                  ৳<span class="item_price">${cards.price}</span>
                 
                </p>
              </div>
              <butto class="btn btn-ghost button-cart"
                ><i class="fa-solid fa-xmark"></i
              ></butto>
            </div>
     `;
      alert(`${cards.name} has been added to the cart`);
      cartContainer.appendChild(newCart);
      const clearBtn = newCart.querySelector(".button-cart");
      clearBtn.addEventListener("click", () => {
        const singleCart = newCart.querySelector(".cartSignle");

        const removedPrice = Number(
          newCart.querySelector(".item_price").innerText
        );

        let currentTotal = Number(getID("item_total_price").innerText);
        const newTotal = currentTotal - removedPrice;
        getID("item_total_price").innerText = newTotal;

        singleCart.classList.add("hidden");
      });

      let totalPrice = Number(getID("item_total_price").innerText);
      const cartItemPrice = Number(
        newCart.querySelector(".item_price").innerText
      );
      const newTotal = totalPrice + cartItemPrice;
      getID("item_total_price").innerText = newTotal;
    });
  });
};

// category filter function
const loadViaCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayViaCategory(data.plants));
  removeActive();
  getID(`activeBtn_${id}`).classList.add(
    "bg-[#15803c]",
    "text-white",
    "hover:bg-[#15803c]"
  );
};

const displayViaCategory = (plantsData) => {
  const btnContainer = getID("produces_container");
  btnContainer.innerHTML = "";

  plantsData.forEach((plant) => {
    const newCards = document.createElement("div");
    newCards.innerHTML = `
        <div class="bg-white p-4 rounded-xl shadow">
            <div class="h-52 bg-gray-200 rounded overflow-hidden md:h-32">
             <img
                class="w-full"
               src="${plant.image}"
                alt=""
              />
            </div>
            <h3 onclick="modalDescription(${plant.id})"  class="font-semibold mt-3 hover:text-[#15803c] hover:underline hover:cursor-pointer" >${plant.name}</h3>
            <p class="text-sm text-gray-500">
             ${plant.description}
            </p>
            <div class="flex justify-between items-center mt-4">
              <span
                class="text-sm bg-green-100 text-green-700 px-2 py-1 rounded"
                >${plant.category}</span
              >
              <span class="font-semibold">৳${plant.price}</span>
            </div>
                <button class="btn btn-block mt-5 bg-[#15803D] border-0 rounded-4xl shadow-none text-white">Add to Cart</button>
          </div>
    `;
    btnContainer.appendChild(newCards);

    // add to cart function
    const addToCartButton = newCards.querySelector("button");
    addToCartButton.addEventListener("click", () => {
      const cartContainer = document.getElementById("cart_container");
      const newCart = document.createElement("div");
      newCart.innerHTML = `
     <div
              class="flex justify-between items-center mb-2 bg-[#F0FDF4] py-3 px-4 cartSignle "
            >
              <div>
                <h1 class="mb-1 text-[#1F2937] font-semibold">${plant.name}</h1>
                <p>
                  ৳<span class="item_price">${plant.price}</span>
                </p>
              </div>
              <button class="btn btn-ghost button-cart"
                ><i class="fa-solid fa-xmark"></i
              ></button>
            </div>
     `;
      alert(`${plant.name} has been added to the cart`);
      cartContainer.appendChild(newCart);
      const clearBtn = newCart.querySelector(".button-cart");
      clearBtn.addEventListener("click", () => {
        const singleCart = newCart.querySelector(".cartSignle");

        const removedPrice = Number(
          newCart.querySelector(".item_price").innerText
        );
        let currentTotal = Number(getID("item_total_price").innerText);
        const newTotal = currentTotal - removedPrice;
        getID("item_total_price").innerText = newTotal;

        singleCart.classList.add("hidden");
      });
      let totalPrice = Number(getID("item_total_price").innerText);
      const cartItemPrice = Number(
        newCart.querySelector(".item_price").innerText
      );
      const newTotal = totalPrice + cartItemPrice;
      getID("item_total_price").innerText = newTotal;
    });
  });
};

// modal function with description
// my_modal_1.showModal()
const modalDescription = (id) => {
  my_modal_1.showModal();
  const modalContainer = getID("modal_container");
  modalContainer.innerHTML = "";

  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => modalDes(data.plants));

  const modalDes = (details) => {
    const newModal = document.createElement("div");
    newModal.innerHTML = `
                <h3 class="font-semibold mb-3 text-xl">${details.name}</h3>
                <div class="h-52 bg-gray-200 rounded overflow-hidden">
                  <img class="w-full" alt="" />
                </div>
                <h3 class="font-semibold mt-3">
                  Category: <span class="font-normal text-sm">${details.category}</span>
                </h3>
                <p class="text-black font-bold">
                  Price: ৳<span class="text-gray-500 font-normal">${details.price}</span>
                </p>
                <p class="text-sm text-black">
                  Description:
                  <span class="text-gray-500 font-normal">
                   ${details.description}</span
                  >
                </p>
  `;
    modalContainer.appendChild(newModal);
  };
};

// default function call
loadBtns();
allPlantsLoad();
