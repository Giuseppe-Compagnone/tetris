import { ProvidersWrapper } from "@/components";
import "./../styles/main.scss";

const tags = {
  title: "Tetris Game",
  description:
    "Play the classic Tetris game online for free! Enjoy endless fun with smooth controls, increasing difficulty, and a retro design. No downloads, just pure Tetris action!",
  image: "./meta/game.png",
  url: "https://giuseppe-compagnone.github.io/tetris/",
  icon: "./meta/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{tags.title}</title>
        <meta name="description" content={tags.description} />
        <meta property="og:title" content={tags.title} />
        <meta property="og:description" content={tags.description} />
        <meta property="og:image" content={tags.image} />
        <meta property="og:url" content={tags.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tags.title} />
        <meta name="twitter:description" content={tags.description} />
        <meta name="twitter:image" content={tags.image} />
        <link rel="icon" href={tags.icon} />
      </head>
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  );
}
