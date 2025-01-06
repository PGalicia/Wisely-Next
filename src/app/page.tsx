/**
 * Imports
 */

// Components
import MainHome from '@/components/MainHome';

/**
 * Why is did I create MainHome component instead of putting the logic instead that component here?
 * 
 * I originally want to use "withPageAuthRequired" to prevent user from accessing this page if they are not authenticated.
 * Although it works fine in dev, it seems that there are typing issue during build times. From what I've read people
 * are running into the same issue and there needs to be a fix in the nextjs-auth0 library for this to properly work with nextJs app router.
 * For the meantime, I updated my middleware to copy the same functionality of the "withPageAuthRequired" method.
 */

export default function HomePage() {
  return <MainHome />;
}