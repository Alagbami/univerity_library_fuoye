"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { markAsReturned, rejectBorrow } from "@/lib/actions/borrow";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  borrowId: string;
  status: string;
}

const BorrowActions = ({ borrowId, status }: Props) => {
  const router = useRouter();

  const handleReturn = async () => {
    const res = await markAsReturned(borrowId);
    if (res.success) {
      toast({ title: "Success", description: "Marked as returned" });
      router.refresh();
    } else {
      toast({ title: "Error", description: res.message, variant: "destructive" });
    }
  };

  const handleReject = async () => {
    if (confirm("Are you sure you want to reject this borrow?")) {
      const res = await rejectBorrow(borrowId);
      if (res.success) {
        toast({ title: "Success", description: "Borrow request rejected" });
        router.refresh();
      } else {
        toast({ title: "Error", description: res.message, variant: "destructive" });
      }
    }
  };

  if (status === "BORROWED") {
    return (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex gap-1 bg-green-50" onClick={handleReturn}>
          <CheckCircle size={16} />
          Mark Returned
        </Button>
        <Button size="sm" variant="destructive" className="flex gap-1" onClick={handleReject}>
          <XCircle size={16} />
          Reject
        </Button>
      </div>
    );
  }

  return <span className="text-xs text-gray-500">Completed</span>;
};

export default BorrowActions;