-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "whatItIs" TEXT NOT NULL,
    "whyItMatters" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "architecture" JSONB NOT NULL,
    "keyFeatures" JSONB NOT NULL,
    "whenToUse" TEXT NOT NULL,
    "exampleProject" JSONB NOT NULL,
    "papers" JSONB NOT NULL,
    "projects" JSONB NOT NULL,
    "companies" JSONB NOT NULL,
    "resources" JSONB NOT NULL,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "featuredDate" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_name_key" ON "Tool"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_featuredDate_key" ON "Tool"("featuredDate");
