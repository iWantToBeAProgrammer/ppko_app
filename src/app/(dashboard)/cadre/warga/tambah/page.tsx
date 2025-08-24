"use client";

import UserForm from "@/app/(dashboard)/_components/user-form";
import { useAuthStore } from "@/stores/auth-store";

export default function TambahOrangTuaPage() {
  const cadreSubVillage = useAuthStore((state) => state.profile.subVillage);

  return (
    <UserForm
      userType="PARENT"
      pageTitle="Orang Tua"
      subVillage={cadreSubVillage}
    />
  );
}
