"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

interface ActionResult {
  success: boolean;
  message?: string;
}

export const approveUser = async (id: string): Promise<ActionResult> => {
  try {
    await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, id));

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to approve user" };
  }
};

export const rejectUser = async (id: string): Promise<ActionResult> => {
  try {
    await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, id));

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to reject user" };
  }
};

export const deleteUser = async (id: string): Promise<ActionResult> => {
  try {
    await db.delete(users).where(eq(users.id, id));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const updateUserRole = async (id: string, role: "USER" | "ADMIN"): Promise<ActionResult> => {
  try {
    await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id));
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user role" };
  }
};