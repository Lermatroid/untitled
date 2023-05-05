/*
  Warnings:

  - You are about to drop the `auth_key` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auth_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorID_fkey";

-- DropForeignKey
ALTER TABLE "auth_key" DROP CONSTRAINT "auth_key_user_id_fkey";

-- DropForeignKey
ALTER TABLE "auth_session" DROP CONSTRAINT "auth_session_user_id_fkey";

-- DropTable
DROP TABLE "auth_key";

-- DropTable
DROP TABLE "auth_session";

-- DropTable
DROP TABLE "auth_user";

-- CreateTable
CREATE TABLE "UserInfo" (
    "accID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("accID")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "accID" TEXT NOT NULL,
    "itemIDs" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_accID_key" ON "UserInfo"("accID");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
