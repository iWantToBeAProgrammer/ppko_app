"use client";

import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ErrorPageProps {
  statusCode: 401 | 404 | 500;
  title?: string;
  description: string;
  image?: string;
  showHomeButton?: boolean;
  showRefreshButton?: boolean;
  imageAlt?: string;
}

const defaultImages = {
  401: "/assets/images/errors/401.svg", // Replace with your 401 illustration
  404: "/assets/images/errors/404.svg", // Replace with your 404 illustration
  500: "/assets/images/errors/500.svg", // Replace with your 500 illustration
};

export default function ErrorPage({
  statusCode,
  title,
  description,
  image,
  showHomeButton = true,
  showRefreshButton = false,
  imageAlt,
}: ErrorPageProps) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    window.location.reload();
  };

  const displayImage = defaultImages[statusCode];
  const displayTitle = title || `${statusCode} Error`;
  const altText = imageAlt || `${statusCode} error illustration`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Error Illustration */}
        <div className="mx-auto w-full max-w-md">
          <Image
            src={displayImage}
            alt={altText}
            width={400}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">{statusCode}</h1>

          {title && (
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          )}

          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showHomeButton && (
            <Button asChild size="lg" className="px-8">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Go Home
              </Link>
            </Button>
          )}

          {showRefreshButton && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleRefresh}
              className="flex items-center gap-2 px-8"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
