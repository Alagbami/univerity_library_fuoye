import React from "react";

const Page = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          FUOYE Library Management System
        </h1>
        <p className="text-gray-600 text-lg">
          Federal University Oye-Ekiti Library Administration Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/admin/books"
          className="rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📚 Manage Books</h2>
          <p className="text-gray-600">View, add, edit, or delete library books</p>
        </a>

        <a
          href="/admin/users"
          className="rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">👥 Manage Users</h2>
          <p className="text-gray-600">Approve registrations and manage user accounts</p>
        </a>

        <a
          href="/admin/borrows"
          className="rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📖 Borrow Management</h2>
          <p className="text-gray-600">Track borrowed books and manage returns</p>
        </a>

        <a
          href="/admin/analytics"
          className="rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">📊 Analytics</h2>
          <p className="text-gray-600">View library statistics and insights</p>
        </a>

        <a
          href="/admin/settings"
          className="rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
          <p className="text-gray-600">Configure library settings and preferences</p>
        </a>
      </div>
    </div>
  );
};
export default Page;
