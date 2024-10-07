-- CreateTable
CREATE TABLE "userFile" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT,
    "fileData" BYTEA NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userFile" ADD CONSTRAINT "userFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
