"use client";

import { updateUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  userId: string;
  currentRole: string;
}

const RoleSelector = ({ userId, currentRole }: Props) => {
  const router = useRouter();
  const [role, setRole] = useState(currentRole || "USER");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return;

    setIsLoading(true);
    const res = await updateUserRole(userId, newRole as "USER" | "ADMIN");
    setIsLoading(false);

    if (res.success) {
      setRole(newRole);
      toast({
        title: "Success",
        description: `User role changed to ${newRole}`,
      });
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
  };

  return (
    <select
      value={role}
      onChange={(e) => handleRoleChange(e.target.value)}
      disabled={isLoading}
      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
};

export default RoleSelector;
