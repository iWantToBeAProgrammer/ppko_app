-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'CADRE', 'PARENT');

-- CreateEnum
CREATE TYPE "public"."SubVillage" AS ENUM ('GEMAWANG', 'PENANGKAN', 'DEPOK', 'KLODRAN', 'KALINONGKO', 'TEGAL_PARAKAN', 'DERMONGANTI', 'MARGOSARI');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "public"."FoodCategory" AS ENUM ('AGE_6_11', 'AGE_12_23', 'AGE_24_35', 'AGE_36_47', 'AGE_48_60');

-- CreateEnum
CREATE TYPE "public"."StuntingStatus" AS ENUM ('NORMAL', 'STUNTING', 'STUNTING_BERAT');

-- CreateEnum
CREATE TYPE "public"."ArticleCategory" AS ENUM ('NUTRISI', 'KESEHATAN', 'PARENTING', 'RESEP', 'BERITA', 'TIPS');

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'PARENT',
    "phoneNumber" TEXT,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subVillage" "public"."SubVillage",
    "createdBy" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "public"."Gender",

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Child" (
    "id" TEXT NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "birthHeight" DOUBLE PRECISION,
    "parentId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Measurement" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "measurementDate" TIMESTAMP(3) NOT NULL,
    "ageInMonths" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "heightForAgeZScore" DOUBLE PRECISION NOT NULL,
    "stuntingStatus" "public"."StuntingStatus" NOT NULL,
    "measuredById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "public"."FoodCategory" NOT NULL,
    "youtubeUrl" TEXT,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "spices" TEXT[],
    "groundSpices" TEXT[],
    "createdById" UUID NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Gallery" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdById" UUID NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "profiles_email_key" ON "public"."profiles"("email");

-- CreateIndex
CREATE INDEX "profiles_email_idx" ON "public"."profiles"("email");

-- CreateIndex
CREATE INDEX "profiles_role_idx" ON "public"."profiles"("role");

-- CreateIndex
CREATE INDEX "profiles_subVillage_idx" ON "public"."profiles"("subVillage");

-- CreateIndex
CREATE INDEX "Child_parentId_idx" ON "public"."Child"("parentId");

-- CreateIndex
CREATE INDEX "Measurement_childId_idx" ON "public"."Measurement"("childId");

-- CreateIndex
CREATE INDEX "Measurement_measurementDate_idx" ON "public"."Measurement"("measurementDate");

-- CreateIndex
CREATE INDEX "Measurement_stuntingStatus_idx" ON "public"."Measurement"("stuntingStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_childId_measurementDate_key" ON "public"."Measurement"("childId", "measurementDate");

-- CreateIndex
CREATE INDEX "Recipe_category_idx" ON "public"."Recipe"("category");

-- CreateIndex
CREATE INDEX "Recipe_createdById_idx" ON "public"."Recipe"("createdById");

-- CreateIndex
CREATE INDEX "Gallery_createdById_idx" ON "public"."Gallery"("createdById");

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
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Child" ADD CONSTRAINT "Child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Measurement" ADD CONSTRAINT "Measurement_childId_fkey" FOREIGN KEY ("childId") REFERENCES "public"."Child"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Measurement" ADD CONSTRAINT "Measurement_measuredById_fkey" FOREIGN KEY ("measuredById") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Gallery" ADD CONSTRAINT "Gallery_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Article" ADD CONSTRAINT "Article_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
