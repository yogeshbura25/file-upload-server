/*
  Warnings:

  - You are about to drop the column `fileData` on the `userFile` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `userFile` table without a default value. This is not possible if the table is not empty.
  - Made the column `fileName` on table `userFile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userFile" DROP COLUMN "fileData",
ADD COLUMN     "filePath" TEXT NOT NULL,
ALTER COLUMN "fileName" SET NOT NULL;
