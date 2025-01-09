export default function stringToValidURL(urlString: string): string | null {
  let urlToValidate = urlString.trim();

  // If the string doesn't already have a protocol, add 'https://'
  if (!/^https?:\/\//i.test(urlToValidate)) {
    urlToValidate = `https://${urlToValidate}`;
  }

  try {
    // Try to create a new URL object
    const url = new URL(urlToValidate);
    return url.href; // Return the valid URL as a string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null; // If invalid, return null or an appropriate error message
  }
}