import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Notifications Settings</h1>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="updates">Product Updates</Label>
            <Switch id="updates" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="alerts">Betting Alerts</Label>
            <Switch id="alerts" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="promos">Promotional Offers</Label>
            <Switch id="promos" />
          </div>
        </div>
      </Card>
    </div>
  );
}
