/**
 * Imports
 */

// Auth0
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

interface HomePageProps {}

async function HomePage({}: HomePageProps) {
  return <MainHome />
}

export default withPageAuthRequired(HomePage);