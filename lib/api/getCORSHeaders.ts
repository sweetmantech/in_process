const ALLOWED_ORIGINS = [
  "https://sirsueth-sun-spin-age.vercel.app",
  "https://sun-age-phi.vercel.app/",
];

export function getCORSHeaders(origin: string | null): HeadersInit {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  return {};
}
