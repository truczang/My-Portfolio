import "./globals.css";

export const metadata = {
  title: "Le Truc Giang | 2D Artist Portfolio",
  description:
    "Interactive game-art portfolio for Le Truc Giang, featuring project slides and game showcase work."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
