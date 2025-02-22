import '@/app/ui/global.scss';
import { roboto } from '@/app/ui/fonts';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

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
