-- CreateEnum
CREATE TYPE "public"."ArticleCategory" AS ENUM ('NUTRISI', 'KESEHATAN', 'PARENTING', 'RESEP', 'BERITA', 'TIPS');

-- CreateTable
CREATE TABLE "public"."Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" "public"."ArticleCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "public"."Article"("slug");

-- CreateIndex
CREATE INDEX "Article_createdById_idx" ON "public"."Article"("createdById");

-- CreateIndex
CREATE INDEX "Article_category_idx" ON "public"."Article"("category");

-- CreateIndex
CREATE INDEX "Article_isPublished_idx" ON "public"."Article"("isPublished");

-- CreateIndex
CREATE INDEX "Article_isFeatured_idx" ON "public"."Article"("isFeatured");

-- CreateIndex
CREATE INDEX "Article_publishedAt_idx" ON "public"."Article"("publishedAt");

-- CreateIndex
CREATE INDEX "Article_slug_idx" ON "public"."Article"("slug");

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
