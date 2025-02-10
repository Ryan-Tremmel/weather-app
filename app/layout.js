import '@/app/ui/global.scss';

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
