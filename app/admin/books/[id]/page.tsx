import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const book = await db.select().from(books).where(eq(books.id, id)).limit(1);

  if (!book.length) {
    notFound();
  }

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...book[0]} />
      </section>
    </>
  );
};

export default Page;