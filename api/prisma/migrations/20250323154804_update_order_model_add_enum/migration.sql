/*
  Warnings:

  - You are about to drop the `_CakeToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `Cake` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `PaymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ESPECES', 'CB', 'CHEQUE', 'VIREMENT');

-- DropForeignKey
ALTER TABLE "_CakeToOrder" DROP CONSTRAINT "_CakeToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_CakeToOrder" DROP CONSTRAINT "_CakeToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Cake" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "PaymentMethod" "PaymentMethod" NOT NULL,
ADD COLUMN     "deposit" DOUBLE PRECISION,
ADD COLUMN     "remaining_balance" DOUBLE PRECISION;

-- DropTable
DROP TABLE "_CakeToOrder";

-- CreateTable
CREATE TABLE "_OrderCakes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderCakes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderCakes_B_index" ON "_OrderCakes"("B");

-- AddForeignKey
ALTER TABLE "_OrderCakes" ADD CONSTRAINT "_OrderCakes_A_fkey" FOREIGN KEY ("A") REFERENCES "Cake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderCakes" ADD CONSTRAINT "_OrderCakes_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
