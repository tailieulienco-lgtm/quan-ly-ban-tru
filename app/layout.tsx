export const metadata = {
  title: 'Phần mềm Quản lý Bán trú Mầm non',
  description: 'Hệ thống điểm danh và quản lý học phí dịch vụ mầm non',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-50 font-sans">{children}</body>
    </html>
  )
}
