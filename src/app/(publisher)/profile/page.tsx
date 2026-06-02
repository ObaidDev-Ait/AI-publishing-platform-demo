"use client";

import { useState, useRef } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setAvatarUrl(result);
        toast.success("Photo updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Topbar title="Profile" subtitle="Manage your account settings" />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Profile picture */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Avatar className="h-20 w-20 border-4 border-violet/20">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Sarah Chen" />
                  ) : (
                    <AvatarFallback className="gradient-bg text-white text-2xl font-bold">SC</AvatarFallback>
                  )}
                </Avatar>
                <div
                  onClick={handleUploadClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-muted-foreground">Publisher since August 2025</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={handleUploadClick}>
                  Upload Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal info */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue="Sarah" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue="Chen" className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="sarah@contentflow.ai" type="email" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                defaultValue="Tech blogger and digital content creator with 5+ years of experience in the AI and technology space."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input defaultValue="https://sarahchen.blog" className="h-11" />
            </div>
            <Button className="gradient-bg text-white" onClick={() => toast.success("Profile updated!")}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Password */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••••" className="h-11" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="••••••••" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="••••••••" className="h-11" />
              </div>
            </div>
            <Button variant="outline" onClick={() => toast.success("Password updated!")}>
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification preferences */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-heading">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Article status updates", desc: "Get notified when your article is approved or rejected", default: true },
              { label: "Payment notifications", desc: "Get notified about payouts and earnings", default: true },
              { label: "System updates", desc: "Get notified about platform updates and maintenance", default: false },
              { label: "Marketing emails", desc: "Receive tips, guides, and promotional content", default: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-xs text-muted-foreground">{pref.desc}</p>
                </div>
                <Switch defaultChecked={pref.default} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
