"use client";

import { useEffect, useState } from "react";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "ContentFlow AI",
    defaultLanguage: "english",
    aiProvider: "openai",
    aiModel: "gpt-4o",
    payoutThreshold: 50,
    maintenanceMode: false,
    smtpEnabled: false,
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error();
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <>
      <Topbar title="Platform Settings" subtitle="Manage global configuration" />

      <div className="p-4 sm:p-6 max-w-4xl space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ai">AI Models</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">General Settings</CardTitle>
                <CardDescription>Configure global platform behavior.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input 
                    value={settings.siteName} 
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable access to the platform.</p>
                  </div>
                  <Switch 
                    checked={settings.maintenanceMode} 
                    onCheckedChange={(c) => setSettings({ ...settings, maintenanceMode: c })} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SMTP Email</Label>
                    <p className="text-sm text-muted-foreground">Send transactional emails.</p>
                  </div>
                  <Switch 
                    checked={settings.smtpEnabled} 
                    onCheckedChange={(c) => setSettings({ ...settings, smtpEnabled: c })} 
                  />
                </div>
                <Button onClick={handleSave} disabled={saving} className="gradient-bg text-white">
                  <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">AI Configuration</CardTitle>
                <CardDescription>Manage your AI generation settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>AI Provider</Label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={settings.aiProvider}
                    onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value })}
                  >
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Default Generation Model</Label>
                  <Input 
                    value={settings.aiModel} 
                    onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })} 
                    placeholder="e.g. gpt-4o"
                  />
                </div>
                <Button onClick={handleSave} disabled={saving} className="gradient-bg text-white">
                  <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-heading">Payout Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Minimum Payout Threshold ($)</Label>
                  <Input 
                    type="number" 
                    value={settings.payoutThreshold} 
                    onChange={(e) => setSettings({ ...settings, payoutThreshold: Number(e.target.value) })} 
                  />
                </div>
                <Button onClick={handleSave} disabled={saving} className="gradient-bg text-white">
                  <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </>
  );
}
