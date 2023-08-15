import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-light_background text-black dark:bg-dark_background dark:text-dark_text font-custom'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
