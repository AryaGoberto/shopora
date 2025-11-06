import "./globals.css"; // <-- WAJIB biar Tailwind masuk
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
