/*
  Warnings:

  - A unique constraint covering the columns `[team]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "team" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_team_key" ON "Movie"("team");
