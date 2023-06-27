// calculateTotalPrice function
function calculateTotalPrice(cartItems) {
  let totalPrice = 0;
  for (let item of cartItems) {
    if (item.price) {
      totalPrice += parseFloat(item.price);
    }
  }
  return totalPrice;
}

module.exports = {
  calculateTotalPrice,
};
