const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = "vi";

const randomCategoryList = (number) => {
  if (number <= 0) return [];

  const categoryList = [];

  // Loop and push category
  Array.from(new Array(number)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];

  // Random data
  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.random.uuid(),
        categoryId: category.id,
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        price: Number.parseFloat(faker.commerce.price()),
        thumbnailUrl: faker.image.imageUrl(400, 400),
        description: faker.commerce.productDescription(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }

  return productList;
};

// IFFE
(() => {
  // Random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5); // Return 20 product

  // Prepare db object
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Xoan",
    },
  };

  // Write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate data successfully :))");
  });
})();
