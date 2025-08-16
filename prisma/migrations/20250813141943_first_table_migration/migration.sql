-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'cadre', 'user');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "public"."profiles" (
    "id" UUID NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "address" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'user',
    "village_id" INTEGER,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."villages" (
    "village_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "representative_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "villages_pkey" PRIMARY KEY ("village_id")
);

-- CreateTable
CREATE TABLE "public"."children" (
    "child_id" SERIAL NOT NULL,
    "parent_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("child_id")
);

-- CreateTable
CREATE TABLE "public"."z_score_records" (
    "record_id" SERIAL NOT NULL,
    "child_id" INTEGER NOT NULL,
    "cadre_id" UUID NOT NULL,
    "height_cm" DOUBLE PRECISION NOT NULL,
    "weight_kg" DOUBLE PRECISION NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "measurement_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "z_score_records_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "public"."galleries" (
    "gallery_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("gallery_id")
);

-- CreateTable
CREATE TABLE "public"."food_recipes" (
    "recipe_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_recipes_pkey" PRIMARY KEY ("recipe_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "villages_representative_id_key" ON "public"."villages"("representative_id");

-- AddForeignKey
ALTER TABLE "public"."profiles" ADD CONSTRAINT "profiles_village_id_fkey" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("village_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."villages" ADD CONSTRAINT "villages_representative_id_fkey" FOREIGN KEY ("representative_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."children" ADD CONSTRAINT "children_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."z_score_records" ADD CONSTRAINT "z_score_records_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "public"."children"("child_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."z_score_records" ADD CONSTRAINT "z_score_records_cadre_id_fkey" FOREIGN KEY ("cadre_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."galleries" ADD CONSTRAINT "galleries_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."food_recipes" ADD CONSTRAINT "food_recipes_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "public"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
