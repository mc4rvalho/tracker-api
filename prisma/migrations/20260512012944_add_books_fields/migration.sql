/*
  Warnings:

  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openLibraryId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookFormat" AS ENUM ('HARDCOVER', 'PAPERBACK', 'EBOOK', 'AUDIOBOOK', 'PDF');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "coverPath" TEXT,
ADD COLUMN     "format" "BookFormat" NOT NULL DEFAULT 'PAPERBACK',
ADD COLUMN     "openLibraryId" TEXT NOT NULL,
ADD COLUMN     "review" TEXT;
