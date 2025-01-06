/**
 * Imports
 */

// Auth0
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// Components
import MainHome from '@/components/MainHome';

interface HomePageProps {
  params?: Record<string, string | string[]>;
}

export default function HomePage({}: HomePageProps) {
  return <MainHome />
}

export const getServerSideProps = withPageAuthRequired();