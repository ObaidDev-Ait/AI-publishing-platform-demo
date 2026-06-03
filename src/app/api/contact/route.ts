import { NextResponse } from "next/server";
import { contactService } from "@backend/services/contact.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const message = await contactService.submitMessage({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("CONTACT ROUTE ERROR:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
