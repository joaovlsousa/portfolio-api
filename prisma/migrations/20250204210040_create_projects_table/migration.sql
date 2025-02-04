-- CreateEnum
CREATE TYPE "ProjetcType" AS ENUM ('FRONTEND', 'BACKEND');

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "type" "ProjetcType" NOT NULL,
    "image_url" TEXT,
    "image_id" TEXT,
    "github_url" TEXT NOT NULL,
    "deploy_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
