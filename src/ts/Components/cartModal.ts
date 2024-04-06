import "../../scss/main.scss";
import { createHTMLCart } from "./cart.ts";

export function openCartModal(): void {
  const cartSvg = document.querySelector(
    ".navbar_icons__container img[alt='Cart']"
  );
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("modal-overlay");
  document.body.appendChild(modalOverlay);

  const cartModal = document.createElement("div");
  cartModal.classList.add("cart-modal");
  document.body.appendChild(cartModal);

  cartSvg?.addEventListener("click", () => {
    modalOverlay.style.display = "block";
    cartModal.style.display = "block";

    setTimeout(() => {
      cartModal.classList.add("show");
    }, 10);
  });

  modalOverlay.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    cartModal.style.display = "none";

    cartModal.classList.remove("show");
  });

  const container = document.createElement("div");
  container.className = "cart-container";

  createHTMLCart(container);

  cartModal.appendChild(container);
}
