/* ================= PRODUCT DATA ================= */
const coffeeItems = [
  ["Espresso", 120, "https://images.unsplash.com/photo-1510707577719-ae7c14805e9f?auto=format&fit=crop&w=600&q=80"],
  ["Americano", 130, "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=600&q=80"],
  ["Cappuccino", 140, "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80"],
  ["Caramel Latte", 150, "https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=600&q=80"],
  ["Mocha", 160, "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&w=600&q=80"]
];
const pastryItems = [
  ["Butter Croissant", 90, "https://images.unsplash.com/photo-1555507036-ab794f4adee5?auto=format&w=600&q=80"],
  ["Chocolate Croissant", 100, "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&w=600&q=80"]
];
const cakeItems = [
  ["Chocolate Cake", 180, "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&w=600&q=80"],
  ["Red Velvet Cake", 190, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&w=600&q=80"]
];

let cart = [];
let total = 0;

/* ================= DISPLAY ITEMS ================= */
function displayItems(items, containerId) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
    const safeId = item[0].replace(/\s+/g, "-");
    container.innerHTML += `
      <div class="card">
        <img src="${item[2]}" alt="${item[0]}">
        <div class="card-content">
          <h3>${item[0]}</h3>
          <p class="price">₱${item[1]}</p>
          <div class="qty">
            <input type="number" min="1" value="1" id="${safeId}">
            <button onclick="addToCart('${item[0]}',${item[1]},'${safeId}')">Add</button>
          </div>
        </div>
      </div>
    `;
  });
}

displayItems(coffeeItems, "coffeeContainer");
displayItems(pastryItems, "pastryContainer");
displayItems(cakeItems, "cakeContainer");

/* ================= CART FUNCTIONS ================= */
function addToCart(name, price, id) {
  const qty = parseInt(document.getElementById(id).value);
  const existing = cart.find(p => p.name === name);
  if (existing) {
    existing.qty += qty;
    existing.subtotal = existing.qty * price;
  } else {
    cart.push({ name, price, qty, subtotal: qty * price });
  }
  renderCart();
}

function renderCart() {
  const cartTable = document.getElementById("cart");
  cartTable.innerHTML = "";
  total = 0;
  cart.forEach(item => {
    total += item.subtotal;
    cartTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₱${item.price}</td>
        <td>₱${item.subtotal}</td>
      </tr>
    `;
  });
  document.getElementById("total").innerText = total;
  calculateChange();
}

function togglePayment() {
  const method = document.getElementById("paymentMethod").value;
  document.getElementById("cashBox").style.display = method === "Cash" ? "block" : "none";
  document.getElementById("gcashBox").style.display = method === "GCash" ? "block" : "none";
}

function calculateChange() {
  const cash = parseFloat(document.getElementById("cashAmount").value) || 0;
  const change = cash - total;
  document.getElementById("change").innerText = change > 0 ? change : 0;
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  alert("Order placed successfully ☕");
  cart = [];
  total = 0;
  renderCart();
  document.getElementById("cashAmount").value = "";
  document.getElementById("change").innerText = "0";
}
