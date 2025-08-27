'use client'
import ErrorPage from '@/components/error-pages/error-page'
import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <ErrorPage 
      statusCode={500}
      title="Internal Server Error"
      description="Aduh! Terjadi kesalahan pada server kami. Coba lagi dalam beberapa saat atau hubungi tim support."
      image="/images/500-illustration.svg" // Your custom 500 illustration
      showHomeButton={true}
      showRefreshButton={true}
    />
  )
}