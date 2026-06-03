import { NextResponse } from "next/server";
import { contactService } from "@backend/services/contact.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const messages = await contactService.listMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 });
  }
}
