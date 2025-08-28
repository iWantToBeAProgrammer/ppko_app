"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { StuntingCalculator } from "../../../_components/stunting-calculator";

type Child = {
  id: string;
  first_name: string;
  last_name: string;
  gender: "MALE" | "FEMALE";
  dateOfBirth: string;
  parent_name: string;
  address: string;
  sub_village: string;
  phone_number: string;
};

export default function DetailAnakPage() {
  const params = useParams();
  const childId = params.id as string;

  const { data: childData, isLoading } = useQuery<{ child: Child }>({
    queryKey: ["child-detail", childId],
    queryFn: async () => {
      const res = await fetch(`/api/children/${childId}`);
      if (!res.ok) throw new Error("Failed to fetch child details");
      return res.json();
    },
    enabled: !!childId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (!childData?.child) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Data anak tidak ditemukan</p>
      </div>
    );
  }

  const child = childData.child;

  return (
    <div className="min-h-screen bg-gray-50">
      <StuntingCalculator
        showChart={true}
        showMeasurementHistory={true}
        showSubVillageFilter={false}
        preSelectedChildId={childId}
        readOnly={true}
        title={`Detail Data Anak - ${child.first_name} ${child.last_name}`}
        description={`Data lengkap dan riwayat pengukuran ${child.first_name} ${child.last_name}`}
        className="py-8"
      />
    </div>
  );
}
