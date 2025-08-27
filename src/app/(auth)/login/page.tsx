import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./_components/Login";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <Image
              width={150}
              height={150}
              src={"/assets/images/common/logo.svg"}
              alt="logo"
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg p-12 border border-muted rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-4">
              Selamat Datang
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/images/login/login.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
          width={1200}
          height={1200}
        />
      </div>
    </div>
  );
}
