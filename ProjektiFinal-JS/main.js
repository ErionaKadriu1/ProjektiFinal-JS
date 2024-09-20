function registerProduct() {
  const name = document.getElementById("productName").value;
  const category = document.getElementById("productCategory").value;
  const description = document.getElementById("productDescription").value;
  const image = document.getElementById("productImage").files[0];

  if (!name || !category || !description || !image) {
    alert("Ju lutemi plotësoni të gjitha fushat.")
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const product = {
      name,
      category,
      description,
      image: event.target.result,
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Produkti u regjistrua me sukses!");
  };
  reader.readAsDataURL(image);
}

function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const productList = document.getElementById("productList");

  if (productList) {
    productList.innerHTML = "";

    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product-item";
      div.innerHTML = `<img src="${product.image}" alt="${product.name}"><h2>${product.name}</h2><p>${product.category}</p><p>${product.description}
      </p><button class="btn-delete" onclick="deleteProduct(${index})">Fshije</button>`;
      productList.appendChild(div);
    });
  }
}

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function searchProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const productList = document.getElementById("productList");

  if (productList) {
    productList.innerHTML = "";

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchInput) ||
        product.category.toLowerCase().includes(searchInput)
    );

    products.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product-item";
      div.innerHTML = `<img src="${product.image}" alt="${product.name}"><h2>${product.name}</h2><p>${product.category}</p><p>${product.description}</p><button class="btn-delete" onclick="deleteProduct(${index})">Fshije</button>`;
      productList.appendChild(div);
    });
  }
}

function fetchApiData() {
  fetch("https://dummyjson.com/carts?limit=10")
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("productList");
      if (productList) {
        productList.innerHTML = "";

        data.carts.forEach((cart) => {
          const div = document.createElement("div");
          div.className = "api-item";
          div.innerHTML = `<h3>ID: ${cart.id}</h3>
          <p>Total Products: ${cart.totalProducts}</p>
          <p>Total Price: ${cart.total}</p>
          <p>Total discountedTotal: ${cart.discountedTotal}</p>`;

          productList.appendChild(div);
        });
      }
    })
    .catch((error) =>
      console.error("Gabim gjatë marrjes së të dhënave nga API-ja:", error)
    );
}

document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.getElementById("registerButton");
  if (registerButton) {
    registerButton.addEventListener("click", registerProduct);
  }

  const showProductsButton = document.getElementById("showProductsButton");
  if (showProductsButton) {
    showProductsButton.addEventListener("click", loadProducts);
  }

  const searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.addEventListener("click", searchProducts);
  }

  const fetchApiButton = document.getElementById("fetchApiButton");
  if (fetchApiButton) {
    fetchApiButton.addEventListener("click", fetchApiData);
  }

  loadProducts();
});


