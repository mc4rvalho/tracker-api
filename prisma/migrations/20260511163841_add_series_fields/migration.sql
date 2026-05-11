/*
  Warnings:

  - Added the required column `tmdbId` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "posterPath" TEXT,
ADD COLUMN     "review" TEXT,
ADD COLUMN     "tmdbId" INTEGER NOT NULL,
ALTER COLUMN "totalEpisodes" DROP NOT NULL;
