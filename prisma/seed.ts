import { PrismaClient, IngredientType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Clean existing data
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Create Admin
  await prisma.adminUser.create({
    data: {
      email: 'admin@kristinebergpizzeria.se',
      role: 'ADMIN',
    },
  });

  // 3. Create Categories
  const catClass1 = await prisma.category.create({
    data: { nameSv: 'Pizzor Klass 1', nameEn: 'Pizzas Class 1', slug: 'pizzor-klass-1' },
  });
  const catClass2 = await prisma.category.create({
    data: { nameSv: 'Pizzor Klass 2', nameEn: 'Pizzas Class 2', slug: 'pizzor-klass-2' },
  });
  const catKebab = await prisma.category.create({
    data: { nameSv: 'Kebab & Grill', nameEn: 'Kebab & Grill', slug: 'kebab-grill' },
  });

  // 4. Create Standard Ingredients
  const tomato = await prisma.ingredient.create({
    data: { nameSv: 'Tomatsås', nameEn: 'Tomato Sauce', type: IngredientType.BASE, price: 0 },
  });
  const cheese = await prisma.ingredient.create({
    data: { nameSv: 'Ost', nameEn: 'Cheese', type: IngredientType.CHEESE, price: 0 },
  });
  const ham = await prisma.ingredient.create({
    data: { nameSv: 'Skinka', nameEn: 'Ham', type: IngredientType.TOPPING, price: 15 },
  });
  const mushrooms = await prisma.ingredient.create({
    data: { nameSv: 'Färsk Svamp', nameEn: 'Fresh Mushrooms', type: IngredientType.TOPPING, price: 10 },
  });
  const pineapple = await prisma.ingredient.create({
    data: { nameSv: 'Ananas', nameEn: 'Pineapple', type: IngredientType.TOPPING, price: 10 },
  });
  const kebab = await prisma.ingredient.create({
    data: { nameSv: 'Kebabkött', nameEn: 'Kebab Meat', type: IngredientType.TOPPING, price: 20 },
  });

  // 5. Create Recipes
  // Class 1
  const margherita = await prisma.recipe.create({
    data: {
      categoryId: catClass1.id,
      nameSv: 'Margherita',
      nameEn: 'Margherita',
      descriptionSv: 'Tomatsås, ost',
      descriptionEn: 'Tomato sauce, cheese',
      basePrice: 70,
      isPublished: true,
    },
  });

  const vesuvio = await prisma.recipe.create({
    data: {
      categoryId: catClass1.id,
      nameSv: 'Vesuvio',
      nameEn: 'Vesuvio',
      descriptionSv: 'Tomatsås, ost, skinka',
      descriptionEn: 'Tomato sauce, cheese, ham',
      basePrice: 75,
      isPublished: true,
    },
  });

  // Class 2
  const capricciosa = await prisma.recipe.create({
    data: {
      categoryId: catClass2.id,
      nameSv: 'Capricciosa',
      nameEn: 'Capricciosa',
      descriptionSv: 'Tomatsås, ost, skinka, färska champinjoner',
      descriptionEn: 'Tomato sauce, cheese, ham, fresh mushrooms',
      basePrice: 85,
      isPublished: true,
      isPopular: true,
    },
  });

  const hawaii = await prisma.recipe.create({
    data: {
      categoryId: catClass2.id,
      nameSv: 'Hawaii',
      nameEn: 'Hawaii',
      descriptionSv: 'Tomatsås, ost, skinka, ananas',
      descriptionEn: 'Tomato sauce, cheese, ham, pineapple',
      basePrice: 85,
      isPublished: true,
    },
  });

  // Kebab
  const kebabPizza = await prisma.recipe.create({
    data: {
      categoryId: catKebab.id,
      nameSv: 'Kebabpizza',
      nameEn: 'Kebab Pizza',
      descriptionSv: 'Kebabkött, lök, feferoni, kebabsås',
      descriptionEn: 'Kebab meat, onion, pepperoni, kebab sauce',
      basePrice: 95,
      isPublished: true,
      isPopular: true,
    },
  });

  // 6. Link Ingredients to Recipes (Standard)
  const recipesWithIngredients = [
    { recipe: margherita, ingredients: [tomato, cheese] },
    { recipe: vesuvio, ingredients: [tomato, cheese, ham] },
    { recipe: capricciosa, ingredients: [tomato, cheese, ham, mushrooms] },
    { recipe: hawaii, ingredients: [tomato, cheese, ham, pineapple] },
  ];

  for (const item of recipesWithIngredients) {
    for (const ingredient of item.ingredients) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: item.recipe.id,
          ingredientId: ingredient.id,
          isStandard: true,
        },
      });
    }
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
