-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryPiece" (
    "id" TEXT NOT NULL,
    "categoryKey" TEXT NOT NULL,
    "mediaUrls" TEXT[],
    "publishedLocales" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JewelryPiece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JewelryTranslation" (
    "id" TEXT NOT NULL,
    "pieceId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JewelryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "JewelryPiece_categoryKey_idx" ON "JewelryPiece"("categoryKey");

-- CreateIndex
CREATE INDEX "JewelryTranslation_locale_idx" ON "JewelryTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "JewelryTranslation_pieceId_locale_key" ON "JewelryTranslation"("pieceId", "locale");

-- AddForeignKey
ALTER TABLE "JewelryTranslation" ADD CONSTRAINT "JewelryTranslation_pieceId_fkey" FOREIGN KEY ("pieceId") REFERENCES "JewelryPiece"("id") ON DELETE CASCADE ON UPDATE CASCADE;
