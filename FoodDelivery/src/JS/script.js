const itemDetails = [
    { 
        name: "Pizza Paradise", 
        image: "src/images/pizza.jpg", 
        time: "30 mins", 
        ratings: "3",
        price: "$15.99",
        description: "Delicious handcrafted pizza with premium toppings and our secret sauce blend.",
        options: ["Small", "Medium", "Large"]
    },
    { 
        name: "Burger Bonanza", 
        image: "src/images/burger.jpg", 
        time: "25 mins", 
        ratings: "4",
        price: "$12.99",
        description: "Juicy beef patty with fresh vegetables and special house sauce.",
        options: ["Classic", "Cheese", "Double"]
    },
    { 
        name: "Momo Magic", 
        image: "src/images/momo.jpg", 
        time: "20 mins", 
        ratings: "5",
        price: "$10.99",
        description: "Authentic steamed dumplings filled with seasoned meat or vegetables.",
        options: ["Steamed", "Fried", "Jhol"]
    },
    { 
        name: "Pasta Perfection", 
        image: "src/images/pasta.jpg", 
        time: "35 mins", 
        ratings: "4",
        price: "$13.99",
        description: "Al dente pasta in rich creamy sauce with your choice of toppings.",
        options: ["Alfredo", "Marinara", "Pesto"]
    },
    { 
        name: "Fries Fiesta", 
        image: "src/images/fries.jpg", 
        time: "15 mins", 
        ratings: "3",
        price: "$7.99",
        description: "Crispy golden fries seasoned to perfection.",
        options: ["Regular", "Cheese", "Loaded"]
    },
    { 
        name: "Coffee Craze", 
        image: "src/images/coffee.jpg", 
        time: "10 mins", 
        ratings: "4",
        price: "$4.99",
        description: "Premium coffee made from freshly ground beans.",
        options: ["Espresso", "Latte", "Cappuccino"]
    },
    { 
        name: "Sushi Supreme", 
        image: "", 
        time: "40 mins", 
        ratings: "5",
        price: "$18.99",
        description: "Fresh sushi rolls prepared by expert chefs.",
        options: ["California Roll", "Spicy Tuna", "Dragon Roll"]
    },
    { 
        name: "Taco Town", 
        image: "", 
        time: "20 mins", 
        ratings: "4",
        price: "$9.99",
        description: "Authentic tacos with your choice of fillings and toppings.",
        options: ["Beef", "Chicken", "Vegetarian"]
    },
    { 
        name: "Salad Sensation", 
        image: "", 
        time: "15 mins", 
        ratings: "3",
        price: "$8.99",
        description: "Fresh garden salad with premium ingredients and house dressing.",
        options: ["Garden", "Caesar", "Greek"]
    },
    { 
        name: "Ice Cream Island", 
        image: "", 
        time: "10 mins", 
        ratings: "5",
        price: "$6.99",
        description: "Creamy, delicious ice cream in various flavors.",
        options: ["Vanilla", "Chocolate", "Strawberry"]
    },
    { 
        name: "Sandwich Station", 
        image: "", 
        time: "25 mins", 
        ratings: "4",
        price: "$11.99",
        description: "Freshly made sandwiches with premium ingredients.",
        options: ["Club", "BLT", "Veggie"]
    },
    { 
        name: "Steakhouse Special", 
        image: "", 
        time: "45 mins", 
        ratings: "5",
        price: "$24.99",
        description: "Premium cut steak cooked to your preference.",
        options: ["Rare", "Medium", "Well Done"]
    }
];
function createItemsBox(){
    const foods = document.getElementsByClassName("foods");
    const foodsElements = itemDetails.map((item , index) => {
        const items = document.createElement("div");
        items.className = "items";
        items.setAttribute("data-index", index);
        const image = document.createElement("img")
        image.classList = "itemsImage"
        image.setAttribute("src" , item.image || "images/default.jpg")
        const h2 = document.createElement("h2");
        h2.innerText = item.name;
        const itemsFooter = document.createElement("div");
        itemsFooter.className = "itemsFooter";
        const ratings = document.createElement("div");
        ratings.className = "ratings";
        Array.from({length:5}).map((_ , i) => {
            const iTag = document.createElement("i");
            iTag.classList.add("fa" ,"fa-star" , "unfulfilled");
            if (i < item.ratings){
                iTag.classList.replace("unfulfilled" , "fulfilled");
            }
            ratings.appendChild(iTag)
            itemDetails[index]["ratingDiv"] = ratings;
        });
        const h3 = document.createElement("h3");
        h3.innerText = item.time
        itemsFooter.appendChild(ratings);
        itemsFooter.appendChild(h3);
        items.appendChild(image);
        items.appendChild(h2);
        items.appendChild(itemsFooter);
        items.addEventListener("click", () => showItemDetails(index))

        return items
    })
    console.log(itemDetails)
    foodsElements.forEach(items => {
        foods[0].appendChild(items);
    })
}

function searchItems () {
    const foods = document.getElementsByClassName("foods");
    foods[0].innerHTML = "";
    const searchInput = document.getElementById("input").value;
    const result = itemDetails.filter((item) => {
        if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return item.name;
        }
    });
    result.forEach( (item) => {
        const items = document.createElement("div");
        items.classList = "items"
        const image = document.createElement("img");
        image.classList = "itemsImage"
        image.setAttribute("src", item.image || "images/default.jpg")
        const h2 = document.createElement("h2");
        h2.innerText = item.name
        const itemsFooter = document.createElement("div");
        itemsFooter.className = "itemsFooter"
        const ratings = document.createElement("div");
        Array.from({length : 5}).map((_, i) => {
            const iTag = document.createElement("i")
            iTag.classList.add("fa","fa-star", "unfulfilled");
            if (i < item.ratings){
                iTag.classList.replace("unfulfilled", "fulfilled");
            }
            ratings.appendChild(iTag)

        })
        const h3 = document.createElement("h3")
        h3.innerText = item.time
        itemsFooter.append(ratings, h3);
        items.append(image, h2, itemsFooter );
        foods[0].appendChild(items)


    })

}

let activeItemDetailCard = null;

createItemsBox();

function showItemDetails (index) {
    if (activeItemDetailCard){
        activeItemDetailCard.remove();
        activeItemDetailCard = null;
    }
    const foods = document.getElementsByClassName("foods")[0]
    const item = itemDetails[index]
    //creating main container to display in pop
    const itemDetailCard = document.createElement("div")
    itemDetailCard.classList.add("itemDetailCard")
    const mainContainer = document.createElement("div")
    mainContainer.classList.add("mainContainer")


    //creating left container
    const leftContainer = document.createElement("div")
    leftContainer.classList = "leftContainer";
    const image = document.createElement("img")
    image.setAttribute("src", item.image || "images/default.jpg")
    image.classList = "detailImage";
    leftContainer.appendChild(image)
    
    mainContainer.appendChild(leftContainer);
    itemDetailCard.appendChild(mainContainer)

    //creating right container
    const h2 = document.createElement("h2")
    h2.innerText = item.name;
    const rightContainer = document.createElement("div")
    rightContainer.classList = "rightContainer"
    const description = document.createElement("p")
    description.innerText = item.description;


    const price = document.createElement("h3")
    price.innerText = item.price;
    price.classList = "rightContainerPrice"

    const ratingPriceDiv = document.createElement("div")
    ratingPriceDiv.classList = "ratingPriceDiv"
    const ratings = itemDetails[index]["ratingDiv"]
    const time = document.createElement("p")
    time.innerText = `Delivery: ${item.time}`
    ratingPriceDiv.append(ratings, time)

    const optionSection = document.createElement("div")
    optionSection.classList = "optionSection"
    const optionLabel = document.createElement("label")
    optionLabel.setAttribute("for", "option")
    optionLabel.innerText = "Options: "
    const optionSelect = document.createElement("select")
    optionSelect.id = "optionSelect"
    item.options.forEach((option) => {
        const optionElement = document.createElement("option")
        optionElement.innerText = option
        optionElement.value = option;
        optionSelect.appendChild(optionElement)
    })
    optionSection.append(optionLabel, optionSelect);


    const quantitySection = document.createElement("div")
    quantitySection.classList = "quantitySection"
    const quantityLabel = document.createElement("label")
    quantityLabel.innerText = "Quantity"
    const innerSection = document.createElement("div")
    innerSection.classList = "innerSection"
    const minusButton = document.createElement("button")
    minusButton.classList = "button"
    minusButton.value = "-"
    minusButton.innerText = "-";
    const quantityInput = document.createElement("input")
    quantityInput.id = "quantityInput"
    quantityInput.setAttribute("min",0)
    quantityInput.setAttribute("max",100)
    quantityInput.setAttribute("type","number")
    quantityInput.setAttribute("inputmode","numeric")
    const addButton = document.createElement("button")
    addButton.value = "+"
    addButton.innerText = "+";
    addButton.classList = "button"

    innerSection.append(minusButton, quantityInput, addButton)
    quantitySection.append(quantityLabel,innerSection)


    rightContainer.append(h2)
    rightContainer.append(description)
    rightContainer.appendChild(price)
    rightContainer.appendChild(ratingPriceDiv)
    rightContainer.appendChild(optionSection)
    rightContainer.appendChild(quantitySection)
    mainContainer.appendChild(rightContainer)
    //creating close button
    const closeButton = document.createElement("button")
    closeButton.innerHTML = "&times"
    closeButton.classList = "closeButton"
    itemDetailCard.appendChild(closeButton)
    closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        activeItemDetailCard.remove();
        activeItemDetailCard = null;
    })

    foods.appendChild(itemDetailCard);
    activeItemDetailCard = itemDetailCard;

}