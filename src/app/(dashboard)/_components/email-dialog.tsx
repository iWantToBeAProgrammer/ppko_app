import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { email: string }) => void;
  currentEmail?: string;
}

export default function EmailDialog({
  open,
  onOpenChange,
  onSubmit,
  currentEmail,
}: EmailDialogProps) {
  const emailForm = useForm<{ email: string }>({
    defaultValues: {
      email: currentEmail || "",
    },
  });

  // Update form when currentEmail changes
  useEffect(() => {
    emailForm.setValue("email", currentEmail || "");
  }, [currentEmail, emailForm]);

  const handleSubmit = emailForm.handleSubmit((data) => {
    if (data.email && data.email.includes("@")) {
      onSubmit(data);
      emailForm.reset();
    } else {
      toast.error("Format email tidak valid");
    }
  });

  const handleCancel = () => {
    emailForm.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-blue-500/10 text-blue-500 max-w-48 hover:bg-blue-500 hover:text-background"
        >
          <Plus className="w-4 h-4 mr-2" />
          {currentEmail ? "Ubah Email" : "Add Email Address"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentEmail ? "Ubah" : "Tambah"} Alamat Email
          </DialogTitle>
          <DialogDescription>
            Masukkan alamat email yang valid untuk pengguna ini.
          </DialogDescription>
        </DialogHeader>

        <Form {...emailForm}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              rules={{
                required: "Email harus diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format email tidak valid",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email: </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contoh@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Batal
              </Button>
              <Button type="submit">Simpan Email</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
