/*
  Warnings:

  - You are about to drop the column `completed` on the `goals` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `goals` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - Added the required column `accumulated_seconds` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_seconds` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" DROP COLUMN "completed",
ADD COLUMN     "accumulated_seconds" INTEGER NOT NULL,
ADD COLUMN     "color" VARCHAR(6) NOT NULL,
ADD COLUMN     "icon" VARCHAR(30) NOT NULL,
ADD COLUMN     "started_at" TIMESTAMP(3),
ADD COLUMN     "target_seconds" INTEGER NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(150);
