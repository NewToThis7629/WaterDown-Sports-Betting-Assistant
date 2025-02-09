import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, TrendingUp, Clock } from "lucide-react";

type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
};

const MOCK_POSTS: ForumPost[] = [
  {
    id: "1",
    title: "Best NBA Props for Tonight's Games",
    content:
      "Looking at some player props for tonight's NBA slate. I'm seeing value in...",
    author: {
      name: "HoopsAnalyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HoopsAnalyst",
    },
    likes: 24,
    comments: 12,
    timestamp: "2h ago",
    tags: ["NBA", "Props", "Analysis"],
  },
  {
    id: "2",
    title: "MLB Season Opening Day Strategy",
    content:
      "With MLB opening day approaching, here's my betting strategy for the first week...",
    author: {
      name: "BaseballGuru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BaseballGuru",
    },
    likes: 18,
    comments: 8,
    timestamp: "4h ago",
    tags: ["MLB", "Strategy"],
  },
  {
    id: "3",
    title: "March Madness Bracket Challenge",
    content:
      "Join our March Madness bracket challenge! Prize pool and details inside...",
    author: {
      name: "BracketBuster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BracketBuster",
    },
    likes: 45,
    comments: 32,
    timestamp: "6h ago",
    tags: ["NCAAB", "Contest"],
  },
];

export default function ForumPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Button className="gap-2">
          <MessageSquare className="h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-3/4 space-y-6">
          <Card className="p-4">
            <Input placeholder="Search discussions..." className="w-full" />
          </Card>

          <Tabs defaultValue="trending" className="w-full">
            <TabsList>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" /> Trending
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" /> Recent
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6 space-y-4">
              {MOCK_POSTS.map((post) => (
                <Card
                  key={post.id}
                  className="p-6 hover:border-blue-500/20 transition-colors cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Posted by {post.author.name} · {post.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          {post.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recent" className="mt-6">
              <Card className="p-6">
                <p className="text-muted-foreground">
                  Recent posts will be shown here...
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-1/4 space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                #NBA
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                #NFL
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                #MLB
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                #Props
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                #Analysis
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Top Contributors</h3>
            <div className="space-y-4">
              {["ProPicker", "BetMaster", "OddsKing"].map((name) => (
                <div key={name} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                    />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">150+ posts</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
