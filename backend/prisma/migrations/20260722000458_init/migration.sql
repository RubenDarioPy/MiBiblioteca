-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "genero" TEXT,
    "anioPublicacion" INTEGER,
    "portadaUrl" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "calificacion" INTEGER,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);
