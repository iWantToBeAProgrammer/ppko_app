"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Profile } from "@/types/auth";
import { createClient } from "@/utils/supabase/client";
import { ReactNode, useEffect } from "react";

export default function AuthStoreProvider({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile;
}) {
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      useAuthStore.getState().setUser(user);
      useAuthStore.getState().setProfile(profile);
    });
  });

  return <>{children}</>;
}
