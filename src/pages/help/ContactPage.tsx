import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contact Support</h1>
        <p className="text-muted-foreground">Get help from our support team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question"
                  className="min-h-[150px]"
                />
              </div>

              <Button className="w-full">Send Message</Button>
            </form>
          </Card>
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Support Hours</h3>
            <p className="text-sm text-muted-foreground">Monday - Friday</p>
            <p className="text-sm text-muted-foreground">
              9:00 AM - 5:00 PM EST
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground">
              support@waterdown.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Response Time</h3>
            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours during business hours.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
