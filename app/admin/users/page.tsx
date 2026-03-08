"use server";

import React from "react";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { Button } from "@/components/ui/button";
import UserActions from "@/components/admin/UserActions";

const Page = async () => {
  const allUsers = await db.select().from(users);

  const statusMap: { [key: string]: { label: string; color: string } } = {
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    APPROVED: { label: "Approved", color: "bg-green-100 text-green-800" },
    REJECTED: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  const roleMap: { [key: string]: string } = {
    USER: "User",
    ADMIN: "Admin",
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-7">
        <h2 className="text-xl font-semibold">All Users</h2>
        <p className="text-sm text-gray-600">Total: {allUsers.length}</p>
      </div>

      <div className="mt-7 w-full overflow-x-auto">
        {allUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found yet.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  University ID
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Joined
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => {
                const statusInfo = statusMap[user.status ?? "PENDING"];
                const joinDate = user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—";

                return (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.universityId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span className="font-medium">
                        {roleMap[user.role ?? "USER"]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {joinDate}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <UserActions userId={user.id!} status={user.status!} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Page;
