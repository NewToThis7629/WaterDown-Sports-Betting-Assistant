import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Settings,
  Trash2,
  Megaphone,
  AlertTriangle,
  Info,
} from "lucide-react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "update" | "alert" | "promo";
  timestamp: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Feature Available",
    message: "Try our new parlay builder with AI suggestions!",
    type: "update",
    timestamp: "2h ago",
    read: false,
  },
  {
    id: "2",
    title: "Bet Slip Analysis Complete",
    message: "We've found 3 alternative options for your bet slip.",
    type: "alert",
    timestamp: "4h ago",
    read: true,
  },
  {
    id: "3",
    title: "Special Offer",
    message: "Get 50% off on our premium features this week!",
    type: "promo",
    timestamp: "1d ago",
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <Bell className="h-4 w-4" /> All
          </TabsTrigger>
          <TabsTrigger value="updates" className="gap-2">
            <Info className="h-4 w-4" /> Updates
          </TabsTrigger>
          <TabsTrigger value="alerts" className="gap-2">
            <AlertTriangle className="h-4 w-4" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="promos" className="gap-2">
            <Megaphone className="h-4 w-4" /> Promos
          </TabsTrigger>
        </TabsList>

        {["all", "updates", "alerts", "promos"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.filter(
                (notification) =>
                  tab === "all" || notification.type === tab.slice(0, -1),
              ).map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 ${!notification.read ? "border-blue-500/50" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        notification.type === "update"
                          ? "bg-blue-500/10"
                          : notification.type === "alert"
                            ? "bg-amber-500/10"
                            : "bg-green-500/10"
                      }`}
                    >
                      <Bell
                        className={`h-4 w-4 ${
                          notification.type === "update"
                            ? "text-blue-500"
                            : notification.type === "alert"
                              ? "text-amber-500"
                              : "text-green-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
