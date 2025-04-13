/*
  Warnings:

  - You are about to drop the column `imagen` on the `Templo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Templo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descripcionCorta` to the `Templo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenPrincipal` to the `Templo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Templo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Templo" DROP COLUMN "imagen",
ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "camas" TEXT[],
ADD COLUMN     "descripcionCorta" TEXT NOT NULL,
ADD COLUMN     "imagenPrincipal" TEXT NOT NULL,
ADD COLUMN     "imagenes" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "disponibilidad" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Templo_slug_key" ON "Templo"("slug");
