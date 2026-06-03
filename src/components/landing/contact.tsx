"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Message sent successfully! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative border-t border-border/50">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/20 bg-violet/5 text-xs font-medium text-violet mb-6">
              Contact Sales
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight mb-6">
              Ready to scale your publishing empire?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Get in touch with our enterprise team to discuss custom features, high-volume generation limits, and dedicated support options tailored to your business needs.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-violet/10 text-violet">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-sm text-muted-foreground">enterprise@contentflow.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-chart-2/10 text-chart-2">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Live Chat</h4>
                  <p className="text-sm text-muted-foreground">Available 24/7 for premium users</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold font-heading mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" placeholder="John Doe" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" placeholder="john@company.com" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Sales Inquiry" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" placeholder="Tell us about your publishing needs..." rows={4} required />
              </div>
              <Button type="submit" className="w-full h-11 gradient-bg text-white" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
