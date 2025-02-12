import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Camera,
  Trash2,
  Upload,
  Globe,
  Gamepad2,
  Shield,
  Wallet,
} from "lucide-react";

export default function EditProfilePage() {
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Edit Profile</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Gamepad2 className="h-4 w-4" /> Preferences
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="betting" className="gap-2">
            <Wallet className="h-4 w-4" /> Betting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-8 mb-8">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Profile Photo</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Upload className="h-4 w-4" /> Upload
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Trash2 className="h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="John D." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="(555) 555-5555" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Display Preferences</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your profile
                    </p>
                  </div>
                  <Switch id="public-profile" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-bets">Show My Bets</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your betting history publicly
                    </p>
                  </div>
                  <Switch id="show-bets" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-stats">Show Statistics</Label>
                    <p className="text-sm text-muted-foreground">
                      Share your betting statistics
                    </p>
                  </div>
                  <Switch id="show-stats" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-online">Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're online
                    </p>
                  </div>
                  <Switch id="show-online" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="betting" className="mt-6 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Betting Preferences</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default Sportsbook</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sportsbook" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fanduel">FanDuel</SelectItem>
                      <SelectItem value="draftkings">DraftKings</SelectItem>
                      <SelectItem value="caesars">Caesars</SelectItem>
                      <SelectItem value="betmgm">BetMGM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Odds Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="decimal">Decimal</SelectItem>
                      <SelectItem value="fractional">Fractional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Sport</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nba">NBA</SelectItem>
                      <SelectItem value="nfl">NFL</SelectItem>
                      <SelectItem value="mlb">MLB</SelectItem>
                      <SelectItem value="nhl">NHL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Risk Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-water">Auto Water Down</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically suggest lower risk alternatives
                    </p>
                  </div>
                  <Switch id="auto-water" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="parlay-suggestions">
                      Parlay Suggestions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-powered parlay recommendations
                    </p>
                  </div>
                  <Switch id="parlay-suggestions" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
