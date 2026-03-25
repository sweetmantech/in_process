export const buildChartData = (moments: { created_at: string }[]) => {
  const counts: Record<string, number> = {};
  for (const m of moments) {
    const day = m.created_at.slice(0, 10);
    counts[day] = (counts[day] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
};
