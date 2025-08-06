import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "llms.txt");
    const { readFile } = await import("fs/promises");
    const content = await readFile(filePath, "utf-8");
    
    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e: unknown) {
    console.error("Error reading llms.txt file:", e);
    const message = e instanceof Error ? e.message : "failed to read llms.txt file";
    return Response.json({ message }, { status: 500 });
  }
}

// Enable caching to match the Cache-Control header (3600 seconds = 1 hour)
export const revalidate = 3600;