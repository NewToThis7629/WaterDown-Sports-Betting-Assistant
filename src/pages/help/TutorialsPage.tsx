import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, Book } from "lucide-react";

const TUTORIALS = [
  {
    category: "getting-started",
    items: [
      {
        title: "Getting Started with Water Down",
        duration: "5:30",
        thumbnail:
          "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Uploading Your First Bet Slip",
        duration: "3:45",
        thumbnail:
          "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60",
      },
    ],
  },
  {
    category: "advanced",
    items: [
      {
        title: "Advanced Bet Analysis",
        duration: "7:15",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      },
      {
        title: "Using AI Predictions",
        duration: "6:00",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      },
    ],
  },
];

export default function TutorialsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Tutorials</h1>
        <p className="text-muted-foreground">
          Learn how to use Water Down effectively
        </p>
      </div>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList>
          <TabsTrigger value="videos" className="gap-2">
            <Play className="h-4 w-4" /> Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="guides" className="gap-2">
            <FileText className="h-4 w-4" /> Written Guides
          </TabsTrigger>
          <TabsTrigger value="docs" className="gap-2">
            <Book className="h-4 w-4" /> Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TUTORIALS.map((category) =>
              category.items.map((tutorial, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Duration: {tutorial.duration}
                    </p>
                    <Button className="w-full mt-4 gap-2">
                      <Play className="h-4 w-4" /> Watch Tutorial
                    </Button>
                  </div>
                </Card>
              )),
            )}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Written Guides</h2>
            <p className="text-muted-foreground">
              Written guides coming soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Documentation</h2>
            <p className="text-muted-foreground">
              API documentation coming soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
