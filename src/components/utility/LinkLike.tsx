/**
 * Imports
 */
// React
import React from "react";

/**
 * Props typing
 */
interface LinkLikeProps {
  tag: 'a' | 'button',
  text: string,
  extraProperties?: { [key: string]: unknown }
}

export default function LinkLike({ text, tag, extraProperties = {} }: LinkLikeProps) {
  return React.createElement(
    tag,
    {
      className: 'uppercase underline text-link underline-offset-2 transition-all hover:text-black hover:font-bold',
      ...extraProperties
    },
    text
  );
}
