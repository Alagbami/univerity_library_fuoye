"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { approveUser, rejectUser, deleteUser } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  status: string;
}

const UserActions = ({ userId, status }: Props) => {
  const router = useRouter();

  const handleApprove = async () => {
    const res = await approveUser(userId);
    if (res.success) {
      toast({ title: "Success", description: "User approved" });
      router.refresh();
    } else {
      toast({ title: "Error", description: res.message, variant: "destructive" });
    }
  };

  const handleReject = async () => {
    const res = await rejectUser(userId);
    if (res.success) {
      toast({ title: "Success", description: "User rejected" });
      router.refresh();
    } else {
      toast({ title: "Error", description: res.message, variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res = await deleteUser(userId);
      if (res.success) {
        toast({ title: "Success", description: "User deleted" });
        router.refresh();
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    }
  };

  return (
    <div className="flex gap-2">
      {status === "PENDING" && (
        <>
          <Button size="sm" variant="outline" className="flex gap-1 bg-green-50" onClick={handleApprove}>
            <CheckCircle size={16} />
            Approve
          </Button>
          <Button size="sm" variant="destructive" className="flex gap-1" onClick={handleReject}>
            <XCircle size={16} />
            Reject
          </Button>
        </>
      )}
      <Button size="sm" variant="destructive" className="flex gap-1" onClick={handleDelete}>
        <Trash2 size={16} />
        Delete
      </Button>
    </div>
  );
};

export default UserActions;