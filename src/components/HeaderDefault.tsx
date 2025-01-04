/**
 * Imports
 */
// Next
import { headers } from 'next/headers';

export default async function HeaderDefault() {
  // Get pathName
  const headersData = await headers();
  const pathname = headersData.get('x-pathname');

  // Show the proper link in the header based on the current page you are on
  function determineLink() {
    let link = '/api/auth/login';
    let linkText = 'Login';

    if (pathname === '/') {
      link = '/api/auth/logout';
      linkText = 'Logout';
    } else if (pathname === '/demo') {
      return <a className="uppercase underline text-link underline-offset-2" href="/login">LOGIN</a>
    }

    return <a className="uppercase underline text-link underline-offset-2" href={link}>{linkText}</a>
  }
  
  return (
    <div className={`flex justify-between items-center p-4 ${pathname === '/login' ? 'hidden': ''}`}>
      <h1 className="text-3xl font-black">Wisely 💰</h1>
      {determineLink()}
    </div>
  );
}