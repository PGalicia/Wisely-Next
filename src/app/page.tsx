/**
 * Imports
 */

// Auth0
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

/**
 * Reasoning for ts-ignore below:
 * 
 * There is typing conflict with PageProps and arguments for withPageAuthRequired.
 * That comment is needed to ignore those error because it works fine with the typing error.
 * It's possible since NextJs with App router is still new, this error hasn't been fixed with
 * the nextjs-auth0 library
 */

// @ts-ignore: Check above for reasoning
async function HomePage() {
  return <MainHome />;
}

// @ts-ignore: Check above for reasoning
export default withPageAuthRequired(HomePage);