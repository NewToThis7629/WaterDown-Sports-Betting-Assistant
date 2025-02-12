import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommunicationsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Communication Preferences</h1>

      <Tabs defaultValue="email" className="w-full">
        <TabsList>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-updates">Product Updates</Label>
                <Switch id="email-updates" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-alerts">Betting Alerts</Label>
                <Switch id="email-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-newsletter">Weekly Newsletter</Label>
                <Switch id="email-newsletter" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-promos">Promotional Offers</Label>
                <Switch id="email-promos" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>Email Address</Label>
              <div className="flex gap-2">
                <Input placeholder="your@email.com" />
                <Button>Update</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-updates">App Updates</Label>
                <Switch id="push-updates" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-bets">Bet Status Changes</Label>
                <Switch id="push-bets" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-analysis">Analysis Complete</Label>
                <Switch id="push-analysis" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-promos">Special Offers</Label>
                <Switch id="push-promos" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Digest Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quiet Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      From
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
