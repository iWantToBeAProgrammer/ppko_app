'use client'

import ErrorPage from "@/components/error-pages/error-page"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <ErrorPage 
          statusCode={500}
          title="Critical System Error"
          description="Terjadi kesalahan kritis pada sistem. Silakan refresh halaman atau coba lagi nanti."
          image="/images/500-illustration.svg"
          showHomeButton={true}
          showRefreshButton={true}
        />
      </body>
    </html>
  )
}