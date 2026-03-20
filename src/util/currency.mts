const currencyFormatter = Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

export function formatCurrency(money: number) {
  return currencyFormatter.format(money);
}
