import React from 'react';

const EMBED_LINK = 'https://cdn.icomoon.io/158286/Bit/style.css';

export type IconFontProps = {
  /** query id for cache busting (copy this from Icomoon's _production_ link) */
  query?: string;
} & React.LinkHTMLAttributes<HTMLLinkElement>;

/**
 * Embeds the official icon font of [bit.dev](https://bit.dev).
 * Place at the root element, and use [bit-icon](https://bit.dev/bit/evangelist/atom/bit-icon) to place icons anywhere in the page.
 * @name IconFont
 * @example
 * <html>
 * 	<head>
 * 		<IconFont query='aqq93z' />
 * 	<head>
 * </html>
 */
export function IconFont(props: IconFontProps) {
  const { query = 'd4g8l8' } = props;
  return <link rel="stylesheet" href={`${EMBED_LINK}?${query}`} />;
}
