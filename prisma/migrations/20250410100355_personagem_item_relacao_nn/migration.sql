-- CreateTable
CREATE TABLE "Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idItensMagicos" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "nome_aventureiro" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "defesa" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ItemMagico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "forca" INTEGER NOT NULL,
    "defesa" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PersonagemItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PersonagemItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemMagico" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PersonagemItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Personagem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_PersonagemItem_AB_unique" ON "_PersonagemItem"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonagemItem_B_index" ON "_PersonagemItem"("B");
