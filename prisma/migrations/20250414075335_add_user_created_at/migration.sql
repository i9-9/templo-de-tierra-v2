/*
  Warnings:

  - The values [COMPLETADA] on the enum `EstadoReserva` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoReserva_new" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA');
ALTER TABLE "Reserva" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Reserva" ALTER COLUMN "estado" TYPE "EstadoReserva_new" USING ("estado"::text::"EstadoReserva_new");
ALTER TYPE "EstadoReserva" RENAME TO "EstadoReserva_old";
ALTER TYPE "EstadoReserva_new" RENAME TO "EstadoReserva";
DROP TYPE "EstadoReserva_old";
ALTER TABLE "Reserva" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';
COMMIT;

-- DropIndex
DROP INDEX "Reserva_temploId_fechaInicio_fechaFin_idx";

-- DropIndex
DROP INDEX "Reserva_userId_idx";

-- AlterTable
ALTER TABLE "Reserva" ALTER COLUMN "numeroHuespedes" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Templo" ALTER COLUMN "capacidad" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "updatedAt",
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL,
    "temploId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_temploId_userId_key" ON "Favorito"("temploId", "userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_temploId_fkey" FOREIGN KEY ("temploId") REFERENCES "Templo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
