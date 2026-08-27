export const formatCurrency = (value: number) => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(".0", "")} млрд $`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")} млн $`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(".0", "")} тыс. $`;
  }

  return `${value} $`;
};
