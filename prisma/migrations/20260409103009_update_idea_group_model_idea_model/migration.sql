-- CreateTable
CREATE TABLE "idea_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "position" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "idea_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idea" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "position" INTEGER NOT NULL,
    "ideaGroupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "idea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idea_groups_userId_idx" ON "idea_groups"("userId");

-- CreateIndex
CREATE INDEX "idea_ideaGroupId_idx" ON "idea"("ideaGroupId");

-- CreateIndex
CREATE INDEX "idea_userId_idx" ON "idea"("userId");

-- AddForeignKey
ALTER TABLE "idea_groups" ADD CONSTRAINT "idea_groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea" ADD CONSTRAINT "idea_ideaGroupId_fkey" FOREIGN KEY ("ideaGroupId") REFERENCES "idea_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea" ADD CONSTRAINT "idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
