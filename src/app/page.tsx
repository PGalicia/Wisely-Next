/**
 * Imports
 */

// Auth0
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

async function HomePage() {
  return <MainHome />
}

export default withPageAuthRequired(HomePage);