export function formatDateForAPI(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function calculateDuration(start: Date, end: Date): string {
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}