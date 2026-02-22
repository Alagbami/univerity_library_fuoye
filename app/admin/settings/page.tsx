import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const Page = () => {
  return (
    <section className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-7">Settings</h2>

      <div className="rounded-2xl bg-white p-7 shadow-sm space-y-6">
        {/* Library Information */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-3 border-b">
            Library Information
          </h3>

          <div className="space-y-5">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Library Name
              </Label>
              <Input
                type="text"
                placeholder="FUOYE Library"
                defaultValue="Federal University Oye-Ekiti Library System"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </Label>
              <Input
                type="email"
                placeholder="library@fuoye.edu.ng"
                defaultValue="library@fuoye.edu.ng"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </Label>
              <Input
                type="tel"
                placeholder="+234 123 456 7890"
                defaultValue="+234 (0) 123 456 7890"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </Label>
              <Textarea
                placeholder="Oye-Ekiti, Ekiti State, Nigeria"
                defaultValue="Federal University Oye-Ekiti, Oye-Ekiti, Ekiti State, Nigeria"
                className="w-full"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Borrow Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-3 border-b">
            Borrow Settings
          </h3>

          <div className="space-y-5">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Borrow Duration (days)
              </Label>
              <Input
                type="number"
                placeholder="30"
                defaultValue="30"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Books Per User
              </Label>
              <Input
                type="number"
                placeholder="5"
                defaultValue="5"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Late Fee Per Day ($)
              </Label>
              <Input
                type="number"
                placeholder="0.50"
                defaultValue="0.50"
                step="0.01"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-3 border-b">
            Notifications
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Send email when book is overdue
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Send email when new user requests approval
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Send notification when book is returned
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">
                Enable SMS notifications
              </span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="text-lg font-semibold mb-5 pb-3 border-b">
            Appearance
          </h3>

          <div className="space-y-5">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#ff0000"
                  className="w-12 h-10 rounded border border-gray-300"
                />
                <Input type="text" defaultValue="#ff0000" className="flex-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 pt-6 border-t">
          <Button className="bg-primary-admin text-white flex gap-2">
            <Save size={18} />
            Save Settings
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
