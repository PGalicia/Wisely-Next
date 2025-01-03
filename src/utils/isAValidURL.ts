/**
 * Validates if a given string is a valid URL
 * Note: It preprends https if you omit it
 */
export default function isAValidURL(url: string): boolean {
  try {
    let urlToValidate = url;

    // Add 'https://' if the URL doesn't have a protocol
    if (!/^https?:\/\//i.test(urlToValidate)) {
      urlToValidate = `https://${urlToValidate}`;
    }

    const parsedUrl = new URL(urlToValidate);

    // Ensure the hostname contains at least one dot and is not malformed
    const hostname = parsedUrl.hostname;
    if (!hostname.includes(".") || hostname.startsWith(".") || hostname.endsWith(".")) {
      return false;
    }

    return true; // Valid URL
  } catch {
    return false;
  }
}