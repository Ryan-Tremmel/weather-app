import '@/app/ui/global.css';

export const metadata = {
  title: 'Weather Application',
  description: 'Weather app utilizing geolocation to show current weather.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
