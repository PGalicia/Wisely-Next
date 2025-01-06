/**
 * Imports
 */

// Auth0
import { withPageAuthRequired, AppRouterPageRoute } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

// Types
import type React from 'react';

async function HomePage() {
  return <MainHome />;
}

export default withPageAuthRequired(HomePage as AppRouterPageRoute);