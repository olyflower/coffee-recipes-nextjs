-- DropForeignKey
ALTER TABLE "public"."CoffeeRecipe" DROP CONSTRAINT "CoffeeRecipe_userId_fkey";

-- AlterTable
ALTER TABLE "public"."CoffeeRecipe" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."CoffeeRecipe" ADD CONSTRAINT "CoffeeRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
