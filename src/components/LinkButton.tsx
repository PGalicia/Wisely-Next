/**
 * Imports
 */
// Components
import LinkLike from '@/components/utility/LinkLike';

/**
 * Props Typing
 */
interface LinkButtonProps {
  text: string,
  onClick: () => void
}

export default function LinkButton({ text, onClick }: LinkButtonProps) {
  return <LinkLike tag="button" text={text} extraProperties={{ onClick }} />;
}