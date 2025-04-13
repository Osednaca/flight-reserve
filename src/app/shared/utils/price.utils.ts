export function calculateTotalPrice(basePrice: number, multiplier: number): number {
  return basePrice * multiplier;
}

export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}