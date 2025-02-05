export const metadata = {
  title: "Weather Application",
  description: "Weather app that utilizes cards to show current weather.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
