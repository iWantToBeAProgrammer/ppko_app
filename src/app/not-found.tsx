import ErrorPage from "@/components/error-pages/error-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      description="Oops! Halaman yang kamu cari tidak dapat ditemukan. Mungkin telah dipindahkan atau dihapus."
      image="/images/404-illustration.svg" // Your custom 404 illustration
      showHomeButton={true}
      showRefreshButton={false}
    />
  );
}
