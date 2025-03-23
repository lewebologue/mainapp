/*
  Warnings:

  - Added the required column `parts` to the `Cake` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cake" ADD COLUMN     "parts" DOUBLE PRECISION NOT NULL;
