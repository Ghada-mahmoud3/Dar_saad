import './globals.css'

export const metadata = {
  title: 'دار سعد – طلب استئجار الفيلا الكاملة',
  description: 'فورم استئجار فيلا دار سعد – تجربة إقامة فاخرة في قلب الطبيعة',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
