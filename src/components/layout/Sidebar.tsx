import {
  Home,
  TrendingDown,
  TrendingUp,
  Trophy,
  Brain,
  User,
  HelpCircle,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthContext";

type NavItem = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  href: string;
  onClick?: () => void;
  children?: NavItem[];
};

export function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      children: [
        { title: "Water Down", href: "/water-down", icon: TrendingDown },
        { title: "Increase Risk", href: "/increase-risk", icon: TrendingUp },
      ],
    },
    {
      title: "Scores and Live Odds",
      href: "/scores",
      icon: Trophy,
    },
    {
      title: "Social HQ",
      href: "/social",
      children: [
        { title: "Community Forum/Discussions", href: "/social/forum" },
        { title: "Leaderboards", href: "/social/leaderboards" },
      ],
    },
    {
      title: "AI Bet-Alytics",
      href: "/analytics",
      icon: Brain,
      children: [
        { title: "Parlay Suggestions", href: "/analytics/parlays" },
        { title: "Straight Bet Suggestions", href: "/analytics/straight-bets" },
        { title: "Advanced Statistics", href: "/analytics/stats" },
      ],
    },
    {
      title: "My Account",
      href: "/account",
      icon: User,
      children: [
        { title: "Link History", href: "/account/history" },
        {
          title: "My Settings",
          href: "/account/settings",
          children: [
            {
              title: "Notifications Center",
              href: "/account/notifications",
              children: [
                { title: "Updates", href: "/account/notifications/updates" },
                { title: "Alerts", href: "/account/notifications/alerts" },
                {
                  title: "Promotional Offers",
                  href: "/account/notifications/promos",
                },
              ],
            },
            {
              title: "Communication Preferences",
              href: "/account/communications",
            },
            { title: "Delete My Account", href: "/account/delete" },
          ],
        },
        {
          title: "Manage My Subscription",
          href: "/account/subscription",
          children: [
            { title: "Pause/Cancel", href: "/account/subscription/manage" },
          ],
        },
        {
          title: "Profile",
          href: "/account/profile",
          children: [
            { title: "Edit Profile", href: "/account/profile/edit" },
            { title: "Privacy and Security", href: "/account/profile/privacy" },
          ],
        },
      ],
    },
    {
      title: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      children: [
        { title: "FAQs", href: "/help/faqs" },
        { title: "Tutorials", href: "/help/tutorials" },
        { title: "Contact Support", href: "/help/contact" },
      ],
    },
    { title: "Notifications Center", href: "/notifications", icon: Bell },
    {
      title: "Appearance Settings",
      href: "/appearance",
      icon: Settings,
      children: [
        { title: "Light/Dark Mode", href: "/appearance/theme" },
        { title: "Language Selection", href: "/appearance/language" },
      ],
    },
    { title: "Logout", href: "#", icon: LogOut, onClick: handleLogout },
  ];

  return (
    <div className="h-screen w-64 border-r bg-background">
      <ScrollArea className="h-full py-6">
        <Accordion type="multiple" className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}

function NavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  if (item.children) {
    return (
      <AccordionItem value={item.href} className="border-none">
        <AccordionTrigger
          className={cn(
            "flex items-center gap-2 py-2 px-4 w-full hover:no-underline hover:bg-accent/50 rounded-lg transition-colors",
            depth > 0 && "ml-4",
            depth > 1 && "ml-8",
            isActive && "bg-accent",
          )}
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-1">
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2",
        depth > 0 && "ml-4",
        depth > 1 && "ml-8",
        isActive && "bg-accent",
      )}
      asChild
    >
      <Link
        to={item.href}
        className="flex items-center gap-2"
        onClick={(e) => {
          if (item.onClick) {
            e.preventDefault();
            item.onClick();
          }
        }}
      >
        {item.icon && <item.icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    </Button>
  );
}
