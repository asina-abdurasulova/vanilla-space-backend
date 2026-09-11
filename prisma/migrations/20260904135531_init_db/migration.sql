-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "mileage_km" INTEGER NOT NULL,
    "engine" TEXT NOT NULL,
    "min_bid_rub" DOUBLE PRECISION NOT NULL,
    "vin" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "auction_type" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
