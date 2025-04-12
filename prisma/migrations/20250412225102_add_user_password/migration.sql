/*
  Warnings:

  - You are about to alter the column `numeroHuespedes` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - The `estado` column on the `Reserva` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `precioTotal` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `capacidad` on the `Templo` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `precio` on the `Templo` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - Changed the type of `metodoPago` on the `Reserva` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA');

-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('TARJETA', 'TRANSFERENCIA', 'EFECTIVO');

-- AlterTable
ALTER TABLE "Reserva" ADD COLUMN     "notas" TEXT,
ALTER COLUMN "numeroHuespedes" SET DATA TYPE SMALLINT,
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoReserva" NOT NULL DEFAULT 'PENDIENTE',
ALTER COLUMN "precioTotal" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "metodoPago",
ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL;

-- AlterTable
ALTER TABLE "Templo" ALTER COLUMN "capacidad" SET DATA TYPE SMALLINT,
ALTER COLUMN "precio" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Reserva_temploId_fechaInicio_fechaFin_idx" ON "Reserva"("temploId", "fechaInicio", "fechaFin");

-- CreateIndex
CREATE INDEX "Reserva_userId_idx" ON "Reserva"("userId");
