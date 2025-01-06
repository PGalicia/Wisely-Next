/**
 * Imports
 */

// Auth0
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

// @ts-ignore
async function HomePage() {
  return <MainHome />;
}

// @ts-ignore
export default withPageAuthRequired(HomePage);