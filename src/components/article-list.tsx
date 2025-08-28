import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
}

interface ArticleListProps {
  articles: Article[];
  className?: string;
}

const ArticleList = ({ articles, className }: ArticleListProps) => {
  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {articles.map((article) => {
        const readingTime = estimateReadingTime(article.content);

        return (
          <Card
            key={article.id}
            className="flex flex-col hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-3 w-3" />
                <span>{readingTime} min read</span>
              </div>

              <CardTitle className="line-clamp-2 text-lg leading-tight hover:text-primary transition-colors">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </CardTitle>

              <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                {article.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    Parenting
                  </Badge>
                </div>

                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={`/articles/${article.slug}`}
                    className="flex items-center gap-1"
                  >
                    Read more
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export { ArticleList };
