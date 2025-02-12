import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PLANS = [
  {
    name: "Basic",
    price: "$9.99",
    features: [
      "Basic bet analysis",
      "Limited alternatives",
      "Standard support",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "Advanced bet analysis",
      "Unlimited alternatives",
      "Priority support",
      "AI predictions",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "$49.99",
    features: [
      "Custom solutions",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    current: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Subscription</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Current Plan</h2>
              <p className="text-sm text-muted-foreground">
                Billing cycle: Monthly
              </p>
            </div>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
              Pro Plan
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Usage</span>
                <span className="text-sm font-medium">750/1000 requests</span>
              </div>
              <Progress value={75} />
            </div>

            <div className="flex items-center justify-between py-4 border-t">
              <div>
                <p className="font-medium">Next billing date</p>
                <p className="text-sm text-muted-foreground">April 1, 2024</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel Subscription</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to cancel your subscription? You'll
                      lose access to premium features at the end of your current
                      billing period.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                      Cancel Subscription
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 ${plan.current ? "border-blue-500" : ""}`}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={plan.current ? "default" : "outline"}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 border-destructive/50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="text-xl font-semibold text-destructive">
                Danger Zone
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>
                      This action cannot be undone. This will permanently delete
                      your account and remove all of your data from our servers,
                      including:
                    </p>
                    <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-1">
                      <li>Your profile and personal information</li>
                      <li>All betting history and analysis data</li>
                      <li>Saved preferences and settings</li>
                      <li>Subscription and billing information</li>
                    </ul>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </div>
    </div>
  );
}
