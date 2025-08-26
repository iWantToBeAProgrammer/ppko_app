"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { profile } = useAuthStore();

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", profile.id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${profile.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const result = await response.json();
      return result.user;
    },
  });

  if (isLoadingUser) {
    return (
      <div className="flex flex-col space-y-3 w-full p-8">
        <Skeleton className="h-[125px] w-full rounded-xl bg-muted-foreground" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted-foreground" />
          <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
        </div>
        <Skeleton className="h-[125px] w-full rounded-xl bg-muted-foreground" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted-foreground" />
          <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
        </div>
        <Skeleton className="h-[125px] w-full rounded-xl bg-muted-foreground" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-muted-foreground" />
          <Skeleton className="h-4 w-[200px] bg-muted-foreground" />
        </div>
      </div>
    );
  }

  console.log(userData);

  return (
    <div className=" px-4 space-y-4 sm:mt-0 mt-8">
      <div className="name-profile-card flex items-center px-8 py-4 shadow-md w-full rounded-lg bg-white">
        <div className="initial-username text-2xl font-semibold tracking-wide w-16 h-16 rounded-full bg-white border border-foreground p-2 flex items-center justify-center">
          {userData.first_name.charAt(0) + userData.last_name.charAt(0)}
        </div>
        <h3 className="username ms-4 text-xl font-semibold tracking-wide">
          {userData.first_name + " " + userData.last_name}
        </h3>
      </div>
      <div className="data-information-card p-8 shadow-md rounded-lg">
        <h1 className="text-lg font-semibold mb-4">Informasi Data</h1>

        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Depan
            </label>
            <h4 className="font-semibold mb-4">{userData.first_name}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Belakang
            </label>
            <h4 className="font-semibold mb-4">{userData.last_name}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Alamat Email
            </label>
            <h4 className="font-semibold mb-4">{userData.email}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              No. Handphone
            </label>
            <h4 className="font-semibold mb-4">{userData.phoneNumber}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Jenis Kelamin
            </label>
            <h4 className="font-semibold mb-4">
              {userData.gender === "MALE" ? "Laki-laki" : "Perempuan"}
            </h4>
          </div>
        </div>
      </div>
      <div className="address-card p-8 shadow-md rounded-lg">
        <h1 className="text-lg font-semibold mb-4">Alamat</h1>
        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">Dusun</label>
            <h4 className="font-semibold mb-4">{userData.subVillage}</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">Desa</label>
            <h4 className="font-semibold mb-4">Gemawang</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Alamat Lengkap
            </label>
            <h4 className="font-semibold max-w-lg text-justify">
              {userData.address}
            </h4>
          </div>
        </div>
      </div>
      <div className="data-information-card p-8 shadow-md rounded-lg bg-white">
        <h1 className="text-lg font-semibold mb-4">Data Anak</h1>
        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Depan
            </label>
            <h4 className="font-semibold mb-4">
              {userData.children[0].first_name}
            </h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Belakang
            </label>
            <h4 className="font-semibold mb-4">
              {userData.children[0].last_name}
            </h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Jenis Kelamin
            </label>
            <h4 className="font-semibold mb-4">
              {userData.children[0].gender === "MALE"
                ? "Laki-laki"
                : "Perempuan"}
            </h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Tingi Badan
            </label>
            <h4 className="font-semibold mb-4">90 cm</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Tanggal Lahir
            </label>
            <h4 className="font-semibold mb-4">
              {format(
                new Date(userData.children[0].dateOfBirth),
                "dd MMMM yyyy",
                {
                  locale: id,
                }
              )}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
