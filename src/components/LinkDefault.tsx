/**
 * Imports
 */
// Components
import LinkLike from '@/components/utility/LinkLike';

/**
 * Props typing
 */
interface LinkDefaultProps {
  linkText: string;
  url: string;
  isExternal?: boolean;
}

export default function LinkDefault({linkText, url, isExternal = false}: LinkDefaultProps) {
  const defaultProperties = {
    href: url
  };

  const linkProperties = isExternal
    ? { ...defaultProperties, target: '_blank' }
    : defaultProperties;


  return <LinkLike tag="a" text={linkText} extraProperties={linkProperties} />;
}