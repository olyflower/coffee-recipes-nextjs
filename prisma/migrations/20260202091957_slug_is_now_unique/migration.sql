/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CoffeeRecipe` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `CoffeeRecipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."CoffeeRecipe" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeRecipe_slug_key" ON "public"."CoffeeRecipe"("slug");
