"use server";

import React from "react";
import { db } from "@/database/drizzle";
import { users, books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  // Fetch statistics
  const totalUsers = await db.select().from(users);
  const totalBooks = await db.select().from(books);
  const totalBorrows = await db.select().from(borrowRecords);

  const approvedUsers = totalUsers.filter(
    (u) => u.status === "APPROVED"
  ).length;
  const pendingUsers = totalUsers.filter(
    (u) => u.status === "PENDING"
  ).length;
  const rejectedUsers = totalUsers.filter(
    (u) => u.status === "REJECTED"
  ).length;

  const activeBorrows = totalBorrows.filter(
    (b) => b.status === "BORROWED"
  ).length;
  const returnedBorrows = totalBorrows.filter(
    (b) => b.status === "RETURNED"
  ).length;

  const totalCopiesCount = totalBooks.reduce(
    (sum, book) => sum + book.totalCopies,
    0
  );
  const totalAvailableCopies = totalBooks.reduce(
    (sum, book) => sum + book.availableCopies,
    0
  );

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.length,
      color: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      label: "Approved Users",
      value: approvedUsers,
      color: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      label: "Pending Users",
      value: pendingUsers,
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
    {
      label: "Total Books",
      value: totalBooks.length,
      color: "bg-purple-100",
      textColor: "text-purple-800",
    },
    {
      label: "Available Copies",
      value: totalAvailableCopies,
      color: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      label: "Total Copies",
      value: totalCopiesCount,
      color: "bg-indigo-100",
      textColor: "text-indigo-800",
    },
    {
      label: "Active Borrows",
      value: activeBorrows,
      color: "bg-orange-100",
      textColor: "text-orange-800",
    },
    {
      label: "Returned Books",
      value: returnedBorrows,
      color: "bg-gray-100",
      textColor: "text-gray-800",
    },
  ];

  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold mb-7">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 ${stat.color} shadow-sm hover:shadow-md transition`}
          >
            <p className={`text-sm font-medium ${stat.textColor} mb-2`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Status Breakdown */}
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <h3 className="text-lg font-semibold mb-5">User Status Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Approved
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {approvedUsers}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      totalUsers.length > 0
                        ? (approvedUsers / totalUsers.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Pending
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {pendingUsers}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${
                      totalUsers.length > 0
                        ? (pendingUsers / totalUsers.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Rejected
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {rejectedUsers}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{
                    width: `${
                      totalUsers.length > 0
                        ? (rejectedUsers / totalUsers.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Availability */}
        <div className="rounded-2xl bg-white p-7 shadow-sm">
          <h3 className="text-lg font-semibold mb-5">Book Availability</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Available Copies
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalAvailableCopies}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      totalCopiesCount > 0
                        ? (totalAvailableCopies / totalCopiesCount) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Borrowed Copies
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {totalCopiesCount - totalAvailableCopies}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{
                    width: `${
                      totalCopiesCount > 0
                        ? ((totalCopiesCount - totalAvailableCopies) /
                            totalCopiesCount) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
