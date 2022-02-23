/*
  Warnings:

  - You are about to drop the column `team` on the `Movie` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_team_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "team";
