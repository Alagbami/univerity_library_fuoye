"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, SquarePen } from "lucide-react";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  bookId: string;
}

const BookActions = ({ bookId }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      const result = await deleteBook(bookId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Book deleted successfully",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Link href={`/admin/books/${bookId}`}>
        <Button size="sm" variant="outline" className="flex gap-1">
          <SquarePen size={16} />
          Edit
        </Button>
      </Link>
      <Button
        size="sm"
        variant="destructive"
        className="flex gap-1"
        onClick={handleDelete}
      >
        <Trash2 size={16} />
        Delete
      </Button>
    </div>
  );
};

export default BookActions;