"use server";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { borrowRecords, books as booksTable, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

async function handleLogout() {
  "use server";
  await signOut();
}

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  // Fetch user profile
  let userProfile = null;
  if (userId) {
    const profiles = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    userProfile = profiles[0];
  }

  // Fetch user's borrowed books
  let borrowedBooks: Book[] = [];

  if (userId) {
    const records = await db
      .select({
        id: booksTable.id,
        title: booksTable.title,
        author: booksTable.author,
        genre: booksTable.genre,
        rating: booksTable.rating,
        totalCopies: booksTable.totalCopies,
        availableCopies: booksTable.availableCopies,
        description: booksTable.description,
        coverColor: booksTable.coverColor,
        coverUrl: booksTable.coverUrl,
        videoUrl: booksTable.videoUrl,
        summary: booksTable.summary,
        createdAt: booksTable.createdAt,
      })
      .from(borrowRecords)
      .innerJoin(booksTable, eq(borrowRecords.bookId, booksTable.id))
      .where(eq(borrowRecords.userId, userId));

    borrowedBooks = records as Book[];
  }

  const statusColors: { [key: string]: string } = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  const roleColors: { [key: string]: string } = {
    USER: "bg-blue-100 text-blue-800",
    ADMIN: "bg-purple-100 text-purple-800",
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex gap-4 items-center">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-white text-2xl font-bold">
              {getInitials(userProfile?.fullName || "User")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-dark-400 mb-1">
              {userProfile?.fullName || "User Profile"}
            </h1>
            <p className="text-gray-600">{userProfile?.email}</p>
          </div>
        </div>
        <form action={handleLogout}>
          <Button variant="destructive">Logout</Button>
        </form>
      </div>

      {/* Profile Details Card */}
      <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-dark-400 mb-5">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Full Name</p>
            <p className="text-dark-400 font-semibold">
              {userProfile?.fullName || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Email Address</p>
            <p className="text-dark-400 font-semibold">
              {userProfile?.email || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">University ID</p>
            <p className="text-dark-400 font-semibold">
              {userProfile?.universityId || "—"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Role</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                roleColors[userProfile?.role || "USER"]
              }`}
            >
              {userProfile?.role || "USER"}
            </span>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Account Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                statusColors[userProfile?.status || "PENDING"]
              }`}
            >
              {userProfile?.status || "PENDING"}
            </span>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Member Since</p>
            <p className="text-dark-400 font-semibold">
              {userProfile?.createdAt
                ? new Date(userProfile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Borrowing Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl bg-blue-100 p-6 shadow-sm">
          <p className="text-blue-800 text-sm mb-2">Total Books Borrowed</p>
          <p className="text-blue-900 text-4xl font-bold">
            {borrowedBooks.length}
          </p>
        </div>
        <div className="rounded-xl bg-green-100 p-6 shadow-sm">
          <p className="text-green-800 text-sm mb-2">Currently Borrowed</p>
          <p className="text-green-900 text-4xl font-bold">
            {
              borrowedBooks.filter((b: any) => b.status === "BORROWED")
                .length
            }
          </p>
        </div>
        <div className="rounded-xl bg-orange-100 p-6 shadow-sm">
          <p className="text-orange-800 text-sm mb-2">Books Returned</p>
          <p className="text-orange-900 text-4xl font-bold">
            {
              borrowedBooks.filter((b: any) => b.status === "RETURNED")
                .length
            }
          </p>
        </div>
      </div>

      <BookList
        title="My Borrowed Books"
        books={borrowedBooks}
        containerClassName={borrowedBooks.length === 0 ? "mt-5" : ""}
      />

      {borrowedBooks.length === 0 && (
        <div className="mt-10 p-8 bg-white rounded-lg border border-gray-200 text-center shadow-sm">
          <p className="text-gray-600 text-lg">
            You haven't borrowed any books yet.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Visit the library page to browse and borrow books.
          </p>
        </div>
      )}
    </>
  );
};
export default Page;
