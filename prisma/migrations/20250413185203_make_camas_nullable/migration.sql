-- Drop the existing camas column
ALTER TABLE "Templo" DROP COLUMN IF EXISTS "camas";

-- Add the new camas column as TEXT[]
ALTER TABLE "Templo" ADD COLUMN "camas" TEXT[] NOT NULL DEFAULT '{}';
