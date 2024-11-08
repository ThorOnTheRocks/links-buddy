/*
  Warnings:

  - Added the required column `firstName` to the `EmailSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailSubscription" ADD COLUMN     "firstName" TEXT NOT NULL;
