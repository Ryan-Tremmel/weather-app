import '@/app/ui/global.scss';
import { roboto } from '@/app/ui/fonts';

export const metadata = {
  title: 'Weather Application',
  description: 'Weather app utilizing geolocation to show current weather.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
