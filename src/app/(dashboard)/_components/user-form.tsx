"use client";

import { createUser } from "@/app/(dashboard)/action";
import FormInput from "@/components/common/form-card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
} from "@/constants/auth-constants";
import { cn } from "@/lib/utils";
import {
  childDataSchema,
  CreateParentWithChildForm,
  createParentWithChildSchema,
  CreateUserForm,
  createUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, Role, SubVillage } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Mail, Plus, User, CalendarIcon } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface UserFormProps {
  userType: "CADRE" | "PARENT";
  pageTitle: string;
  subVillage?: string;
}

export default function UserForm({
  userType,
  pageTitle,
  subVillage,
}: UserFormProps) {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  // Determine role based on user type
  const defaultRole = userType === "CADRE" ? Role.CADRE : Role.PARENT;

  // Create initial values based on user type
  const getInitialValues = (): CreateParentWithChildForm => {
    const baseValues = {
      ...INITIAL_CREATE_USER_FORM,
      role: defaultRole,
      subVillage: subVillage as SubVillage,
      password: "",
    };

    if (userType === "PARENT") {
      return {
        ...baseValues,
        childData: {
          first_name: "",
          last_name: "",
          dateOfBirth: "",
          gender: Gender.MALE, // Set a default value instead of empty string
        },
      };
    }

    return baseValues;
  };

  // Use the appropriate schema based on user type
  const validationSchema =
    userType === "PARENT" ? createParentWithChildSchema : createUserSchema;

  const form = useForm<CreateParentWithChildForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: getInitialValues(),
    mode: "onSubmit",
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    let password = data.password || "";
    if (userType === "PARENT" && data.childData) {
      // Generate password from child data
      const { first_name, dateOfBirth } = data.childData;
      const dob = new Date(dateOfBirth);
      const formattedDob = `${String(dob.getDate()).padStart(2, "0")}${String(
        dob.getMonth() + 1
      ).padStart(2, "0")}${String(dob.getFullYear()).slice(-2)}`;
      password = `${first_name.toLowerCase()}${formattedDob}`;
      console.log(password);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== "childData" &&
        key !== "password" &&
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        formData.append(key, value as string);
      }
    });

    formData.append("password", password);

    if (userType === "PARENT" && data.childData) {
      Object.entries(data.childData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(`child_${key}`, value as string);
        }
      });
    }

    startTransition(() => {
      createUserAction(formData);
    });
  });
  console.log(form);

  const handleEmailSave = () => {
    const email = form.getValues("email");
    if (email && email.includes("@")) {
      setIsEmailDialogOpen(false);
      toast.success("Email berhasil ditambahkan");
    } else {
      toast.error("Format email tidak valid");
    }
  };

  const handleRemoveEmail = () => {
    form.setValue("email", "");
    toast.info("Email dihapus");
  };

  const currentEmail = form.watch("email");
  const firstName = form.watch("first_name");
  const lastName = form.watch("last_name");

  useEffect(() => {
    if (subVillage) {
      form.setValue("subVillage", subVillage as SubVillage);
    }

    if (createUserState?.status === "error") {
      console.log("Create user error:", createUserState);
      toast.error(`Create ${pageTitle} Failed`, {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      toast.success(`Create ${pageTitle} Success`);
      form.reset(getInitialValues());
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
    }
  }, [createUserState, pageTitle, form, subVillage]);

  return (
    <div className="px-8 py-4">
      <Card className="px-0 pt-0 overflow-hidden">
        <CardHeader className="w-full h-32 bg-gradient-to-r from-primary via-transparent to-primary"></CardHeader>

        <CardContent>
          <div className="personal-information w-full flex gap-4 items-center mb-4">
            {firstName !== "" && (
              <div className="avatar w-18 h-18 rounded-full flex uppercase items-center justify-center border border-black font-semibold text-3xl">
                {firstName.charAt(0) + lastName.charAt(0)}
              </div>
            )}
            <h1 className="font-semibold text-xl">
              {firstName + " " + lastName}
            </h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="form-wrapper w-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 space-y-4 sm:gap-x-64 font-sans"
            >
              {/* Main User Data Section */}
              <div className="flex flex-col gap-1">
                <FormInput
                  form={form}
                  name="first_name"
                  label="Nama Depan"
                  placeholder="Nama depan anda..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <FormInput
                  form={form}
                  name="last_name"
                  label="Nama Belakang"
                  placeholder="Nama belakang anda..."
                />
              </div>

              {/* Gender Select Field */}
              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="max-w-2xl w-full">
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Jenis Kelamin</SelectLabel>
                            <SelectItem value={Gender.MALE}>
                              Laki-laki
                            </SelectItem>
                            <SelectItem value={Gender.FEMALE}>
                              Perempuan
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <FormInput
                  form={form}
                  name="phone_number"
                  label="No. Handphone"
                  placeholder="Nomor Handphone anda..."
                />
              </div>

              <div className="flex flex-col gap-1">
                <FormInput
                  form={form}
                  name="address"
                  label="Alamat Lengkap"
                  placeholder="Alamat lengkap anda..."
                />
              </div>

              {/* Penempatan Select Field */}
              <div className="flex flex-col gap-1">
                {!subVillage ? (
                  <FormField
                    control={form.control}
                    name="subVillage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penempatan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="max-w-2xl w-full">
                              <SelectValue placeholder="Pilih penempatan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Dusun</SelectLabel>
                              <SelectItem value={SubVillage.GEMAWANG}>
                                {SubVillage.GEMAWANG}
                              </SelectItem>
                              <SelectItem value={SubVillage.PENANGKAN}>
                                {SubVillage.PENANGKAN}
                              </SelectItem>
                              <SelectItem value={SubVillage.DEPOK}>
                                {SubVillage.DEPOK}
                              </SelectItem>
                              <SelectItem value={SubVillage.KLODRAN}>
                                {SubVillage.KLODRAN}
                              </SelectItem>
                              <SelectItem value={SubVillage.KALINONGKO}>
                                {SubVillage.KALINONGKO}
                              </SelectItem>
                              <SelectItem value={SubVillage.TEGAL_PARAKAN}>
                                {SubVillage.TEGAL_PARAKAN}
                              </SelectItem>
                              <SelectItem value={SubVillage.DERMONGANTI}>
                                {SubVillage.DERMONGANTI}
                              </SelectItem>
                              <SelectItem value={SubVillage.MARGOSARI}>
                                {SubVillage.MARGOSARI}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="subVillage"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type="text"
                          value={field.value ?? ""} // ✅ use RHF value
                          disabled
                        />
                      </FormControl>
                    )}
                  />
                )}
              </div>

              {/* Child Data Section - Only for PARENT type */}
              {userType === "PARENT" && (
                <div className="sm:col-span-2 space-y-4">
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                    <User className="w-5 h-5 text-blue-500" />
                    <h2 className="font-semibold text-lg text-gray-800">
                      Data Anak
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="childData.first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Depan Anak</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nama depan anak..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="childData.last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Belakang Anak</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nama belakang anak..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="childData.dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Lahir</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "dd MMM yyyy", {
                                          locale: id,
                                        })
                                      ) : (
                                        <span>Pilih tanggal</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(date) =>
                                      field.onChange(
                                        date ? format(date, "yyyy-MM-dd") : ""
                                      )
                                    }
                                    disabled={(date) =>
                                      date > new Date() ||
                                      date < new Date("1900-01-01")
                                    }
                                    autoFocus
                                    captionLayout="dropdown"
                                    startMonth={new Date(1900, 0)}
                                    endMonth={new Date()}
                                    locale={id}
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <FormField
                        control={form.control}
                        name="childData.gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jenis Kelamin Anak</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Jenis Kelamin</SelectLabel>
                                  <SelectItem value={Gender.MALE}>
                                    Laki-laki
                                  </SelectItem>
                                  <SelectItem value={Gender.FEMALE}>
                                    Perempuan
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Section */}
              <div className="flex flex-col gap-3 sm:col-span-2">
                <label htmlFor="email" className="font-semibold text-lg">
                  Alamat Email
                </label>

                {currentEmail ? (
                  <div className="flex items-center justify-between gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 flex items-center justify-center bg-blue-500/10 rounded-full font-semibold tracking-wide">
                        <Mail className="text-blue-400" />
                      </div>
                      <span className="text-gray-700">{currentEmail}</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveEmail}
                      className="text-red-500 hover:text-red-700"
                    >
                      Hapus
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 flex items-center justify-center bg-gray-200 rounded-full">
                      <Mail className="text-gray-400" />
                    </div>
                    <span className="text-gray-500">
                      Belum ada email ditambahkan
                    </span>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => setIsEmailDialogOpen(true)}
                  className="bg-blue-500/10 text-blue-500 max-w-48 hover:bg-blue-500 hover:text-background"
                >
                  <Plus className="ws-4 h-4 mr-2" />
                  {currentEmail ? "Ubah Email" : "Add Email Address"}
                </Button>

                <Dialog
                  open={isEmailDialogOpen}
                  onOpenChange={setIsEmailDialogOpen}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        {currentEmail ? "Ubah" : "Tambah"} Alamat Email
                      </DialogTitle>
                      <DialogDescription>
                        Masukkan alamat email yang valid untuk pengguna ini.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
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
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEmailDialogOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button type="button" onClick={handleEmailSave}>
                        Simpan Email
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {userType === "CADRE" && (
                <div className="flex flex-col gap-1">
                  <FormInput
                    form={form}
                    name="password"
                    label="Password"
                    placeholder="Password anda..."
                    type="password"
                  />
                </div>
              )}

              {/* Hidden role field - properly integrated with RHF */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormControl>
                    <input type="hidden" {...field} value={defaultRole} />
                  </FormControl>
                )}
              />

              <Button
                type="submit"
                disabled={isPendingCreateUser}
                className="bg-blue-500 text-background max-w-32 mt-8 ml-auto sm:col-span-2"
              >
                {isPendingCreateUser ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
