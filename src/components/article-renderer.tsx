import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Article {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
}

interface ArticleRendererProps {
  article: Article;
  className?: string;
}

const ArticleRenderer = ({ article, className }: ArticleRendererProps) => {
  // Estimated reading time (assuming 200 words per minute)
  const estimateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = estimateReadingTime(article.content);

  return (
    <article className={cn("max-w-4xl mx-auto", className)}>
      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4" />
          <span>Published recently</span>
          <Separator orientation="vertical" className="h-4" />
          <Clock className="h-4 w-4" />
          <span>{readingTime} min read</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-foreground">
          {article.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {article.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Parenting</Badge>
          <Badge variant="secondary">Child Development</Badge>
          <Badge variant="secondary">Nutrition</Badge>
        </div>
      </div>

      {/* Article Content */}
      <Card className="border-0 shadow-none p-0">
        <CardContent className="p-0">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children, ...props }) => (
                  <h1
                    className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground border-b pb-2"
                    {...props}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2
                    className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3
                    className="text-lg md:text-xl font-semibold mt-6 mb-3 text-foreground"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children, ...props }) => (
                  <p
                    className="text-base leading-7 mb-4 text-muted-foreground"
                    {...props}
                  >
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li
                    className="text-base leading-6 text-muted-foreground"
                    {...props}
                  >
                    {children}
                  </li>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-foreground" {...props}>
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em className="italic text-muted-foreground" {...props}>
                    {children}
                  </em>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/30 rounded-r-lg"
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                code: ({ children, ...props }) => (
                  <code
                    className="bg-muted px-2 py-1 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                ),
                hr: ({ ...props }) => <Separator className="my-8" {...props} />,
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default ArticleRenderer;
