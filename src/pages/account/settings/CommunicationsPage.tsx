import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CommunicationsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Communication Preferences</h1>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email">Email Updates</Label>
            <Switch id="email" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms">SMS Notifications</Label>
            <Switch id="sms" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter">Weekly Newsletter</Label>
            <Switch id="newsletter" />
          </div>
        </div>
      </Card>
    </div>
  );
}
