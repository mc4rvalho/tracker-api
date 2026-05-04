-- CreateTable
CREATE TABLE "Tracker" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,

    CONSTRAINT "Tracker_pkey" PRIMARY KEY ("id")
);
