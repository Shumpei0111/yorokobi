import { cookies } from "next/headers";

const TOKEN_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

export function generateCSRFToken(): string {
  const token = crypto.randomUUID();
  const timestamp = Date.now();
  return `${token}.${timestamp}`;
}

export async function validateCSRFToken(token: string): Promise<boolean> {
  const storedToken = cookies().get("csrfToken")?.value;
  if (!storedToken || !token) return false;

  const [storedTokenValue, storedTimestamp] = storedToken.split(".");
  const [receivedTokenValue, receivedTimestamp] = token.split(".");

  if (
    !storedTokenValue ||
    !storedTimestamp ||
    !receivedTokenValue ||
    !receivedTimestamp
  ) {
    return false;
  }

  const storedTime = parseInt(storedTimestamp, 10);
  const receivedTime = parseInt(receivedTimestamp, 10);

  if (isNaN(storedTime) || isNaN(receivedTime)) {
    return false;
  }

  const isExpired = Date.now() - storedTime > TOKEN_EXPIRATION;
  if (isExpired) {
    return false;
  }

  return storedTokenValue === receivedTokenValue;
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? ("strict" as const)
        : ("lax" as const),
    path: "/",
    maxAge: TOKEN_EXPIRATION / 1000, // Convert to seconds
  };
}
