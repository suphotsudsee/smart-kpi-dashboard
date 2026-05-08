-- CreateTable
CREATE TABLE "Strategy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Cluster" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strategyId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Cluster_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dimension" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Kpi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "strategyId" INTEGER NOT NULL,
    "clusterId" INTEGER,
    "dimensionId" INTEGER,
    "dataSource" TEXT NOT NULL DEFAULT 'HDC',
    "targetPercent" REAL NOT NULL DEFAULT 100,
    "hdcUrl" TEXT,
    "customUrl" TEXT,
    CONSTRAINT "Kpi_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "Strategy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kpi_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "Cluster" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Kpi_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "Dimension" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KpiScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kpiId" INTEGER NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "valueA" REAL NOT NULL DEFAULT 0,
    "valueB" REAL NOT NULL DEFAULT 0,
    "percent" REAL NOT NULL DEFAULT 0,
    "score" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KpiScore_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "Kpi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'รพ.ชุมชน'
);

-- CreateTable
CREATE TABLE "HospKpiScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hospitalId" INTEGER NOT NULL,
    "kpiId" INTEGER NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "valueA" REAL NOT NULL DEFAULT 0,
    "valueB" REAL NOT NULL DEFAULT 0,
    "percent" REAL NOT NULL DEFAULT 0,
    "score" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HospKpiScore_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HospKpiScore_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "Kpi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'viewer',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_code_key" ON "Strategy"("code");

-- CreateIndex
CREATE UNIQUE INDEX "KpiScore_kpiId_fiscalYear_key" ON "KpiScore"("kpiId", "fiscalYear");

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_code_key" ON "Hospital"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HospKpiScore_hospitalId_kpiId_fiscalYear_key" ON "HospKpiScore"("hospitalId", "kpiId", "fiscalYear");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
