const log = console.log
var OrderItems = [];

function addItem(item) {
    let newitem = JSON.parse(JSON.stringify(item));
    // log('push', item)
    OrderItems.push(newitem);
};

var item = {
    "title": "Thai Tofu-Pork Soup",
    "image": "https://spoonacular.com/recipeImages/Thai-Tofu-Pork-Soup-201331.jpg",
    "id": 201331,
    "rating": 61,
    "ingredients": [
        "broth",
        "cilantro",
        "cilantro leaves",
        "fish sauce",
        "garlic",
        "green onions",
        "ground pork",
        "light soy sauce",
        "tofu",
        "white peppercorns"
    ],
    "price": 38
};

log(OrderItems);
// item.price=40
addItem(item);
item.id=13
addItem(item);
item.id=14
addItem(item);
// item.price=20
// OrderItems[1].price = 333;

log(OrderItems);

// OrderItems.map((val, idx) => log('item', val.price, idx))



log(OrderItems.findIndex(i => i.id === 201331))

OrderItems.splice(1,1)

log('spliced', OrderItems);