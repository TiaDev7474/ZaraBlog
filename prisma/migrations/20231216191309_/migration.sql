-- CreateTable
CREATE TABLE "CategoriesOnUsers" (
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnUsers_pkey" PRIMARY KEY ("user_id","category_id")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnUsers" ADD CONSTRAINT "CategoriesOnUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnUsers" ADD CONSTRAINT "CategoriesOnUsers_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
