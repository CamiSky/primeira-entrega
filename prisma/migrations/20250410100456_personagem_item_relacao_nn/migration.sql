/*
  Warnings:

  - You are about to drop the column `idItensMagicos` on the `Personagem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Personagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nome_aventureiro" TEXT NOT NULL,
    "classe" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "defesa" INTEGER NOT NULL
);
INSERT INTO "new_Personagem" ("classe", "defesa", "forca", "id", "level", "nome", "nome_aventureiro") SELECT "classe", "defesa", "forca", "id", "level", "nome", "nome_aventureiro" FROM "Personagem";
DROP TABLE "Personagem";
ALTER TABLE "new_Personagem" RENAME TO "Personagem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
