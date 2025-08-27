import ErrorPage from "@/components/error-pages/error-page";

export default function UnauthorizedPage() {
  return (
    <ErrorPage
      statusCode={401}
      title="Unauthorized"
      description="You don’t have permission to access this page."
      showHomeButton
    />
  );
}
