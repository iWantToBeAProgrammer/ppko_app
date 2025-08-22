"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    parents_name: string;
    childs_name: string;
  };
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  user,
}: DeleteConfirmationDialogProps) {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Data orang tua dan anak berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["dashboard-users"] });
      queryClient.invalidateQueries({ queryKey: ["kader-warga-users"] });
      onClose();
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast.error("Gagal menghapus data");
    },
  });

  const handleDelete = () => {
    deleteUserMutation.mutate(user.id);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Hapus Data</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Apakah Anda yakin ingin menghapus data berikut?</p>
            <div className="bg-gray-50 p-3 rounded-md">
              <div>
                <strong>Orang Tua:</strong> {user.parents_name}
              </div>
              <div>
                <strong>Anak:</strong> {user.childs_name}
              </div>
            </div>
            <p className="text-red-600 font-medium">
              Tindakan ini akan menghapus semua data terkait termasuk data
              pengukuran anak dan tidak dapat dibatalkan.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteUserMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteUserMutation.isPending ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
