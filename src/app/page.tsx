/**
 * Imports
 */

// Auth0
import { withPageAuthRequired, AppRouterPageRoute } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

const HomePage: AppRouterPageRoute = async () => {
  return <MainHome />;
};

export default withPageAuthRequired(HomePage);