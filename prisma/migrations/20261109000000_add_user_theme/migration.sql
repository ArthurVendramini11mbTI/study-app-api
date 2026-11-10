-- CreateEnum
CREATE TYPE "ThemePalette" AS ENUM ('blue', 'emerald', 'crimson', 'violet', 'amber');

-- AlterTable
ALTER TABLE "users"
ADD COLUMN "theme" "ThemePalette" NOT NULL DEFAULT 'blue';
