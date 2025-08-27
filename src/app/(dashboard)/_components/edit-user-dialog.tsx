"use client";

import { useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender, SubVillage } from "@prisma/client";

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    parentId: string;
    parents_name: string;
    cadres_name: string;
    address: string;
    subVillage?: string;
    gender?: string;
    phoneNumber?: string;
  };
  // Add these props to get current user data for editing
  currentUserData?: {
    subVillage?: string;
    gender?: string;
    phoneNumber?: string;
  };
}

export function EditUserDialog({
  isOpen,
  onClose,
  user,
  currentUserData,
}: EditUserDialogProps) {
  const queryClient = useQueryClient();

  // Split the full name for editing
  const nameParts =
    user?.parents_name?.split(" ") || user?.cadres_name?.split(" ");
  const firstName = nameParts?.[0] || "";
  const lastName = nameParts?.slice(1)?.join(" ") || "";

  const [formData, setFormData] = useState({
    id: "",
    first_name: firstName,
    last_name: lastName,
    address: user.address === "Alamat tidak tersedia" ? "" : user.address,
    subVillage: user?.subVillage,
    gender: user?.gender,
    phoneNumber: user?.phoneNumber || "",
  });

  // Fetch current user data when dialog opens
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", user.parentId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${user.parentId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const result = await response.json();
      return result.user;
    },
    enabled: isOpen && !currentUserData,
  });

  // Update form data when user data is loaded
  useEffect(() => {
    if (userData && isOpen) {
      setFormData({
        id: userData.id,
        first_name: userData.first_name || firstName,
        last_name: userData.last_name || lastName,
        address: userData.address || "",
        subVillage: userData.subVillage,
        gender: userData.gender,
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData, isOpen, firstName, lastName]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`/api/users/${user.parentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Data orang tua berhasil diupdate");
      queryClient.invalidateQueries({ queryKey: ["user", user.parentId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      queryClient.invalidateQueries({ queryKey: ["kader-warga-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-cadre"] });
      onClose();
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast.error("Gagal mengupdate data orang tua");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Data Orang Tua</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isLoadingUser ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-muted-foreground">
                Memuat data...
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Nama Depan</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleChange("first_name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Nama Belakang</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleChange("last_name", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Jenis Kelamin</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Laki-laki</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">No. Telepon</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subVillage">Dusun</Label>
                <Select
                  value={formData.subVillage}
                  onValueChange={(value) => handleChange("subVillage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Dusun" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SubVillage).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button
              type="submit"
              disabled={updateUserMutation.isPending || isLoadingUser}
            >
              {updateUserMutation.isPending ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
