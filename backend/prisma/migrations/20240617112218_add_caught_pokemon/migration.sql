-- CreateTable
CREATE TABLE "CaughtPokemon" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaughtPokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaughtPokemon_userId_pokemonId_key" ON "CaughtPokemon"("userId", "pokemonId");

-- AddForeignKey
ALTER TABLE "CaughtPokemon" ADD CONSTRAINT "CaughtPokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
