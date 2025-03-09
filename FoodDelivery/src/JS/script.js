const itemDetails = [
    { name: "Pizza Paradise", image: "src/images/pizza.jpg", time: "30 mins", ratings: "3" },
    { name: "Burger Bonanza", image: "src/images/burger.jpg", time: "25 mins", ratings: "4" },
    { name: "Momo Magic", image: "src/images/momo.jpg", time: "20 mins", ratings: "5" },
    { name: "Pasta Perfection", image: "src/images/pasta.jpg", time: "35 mins", ratings: "4" },
    { name: "Fries Fiesta", image: "src/images/fries.jpg", time: "15 mins", ratings: "3" },
    { name: "Coffee Craze", image: "src/images/coffee.jpg", time: "10 mins", ratings: "4" }
]

function createItemsBox(){
    const foods = document.getElementsByClassName("foods");
    const foodsElements = itemDetails.map((item) => {
        const items = document.createElement("div");
        items.className = "items";
        const image = document.createElement("img")
        image.classList = "itemsImage"
        image.setAttribute("src" , item.image)
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
        });
        const h3 = document.createElement("h3");
        h3.innerText = item.time
        itemsFooter.appendChild(ratings);
        itemsFooter.appendChild(ratings);
        itemsFooter.appendChild(h3);
        items.appendChild(image);
        items.appendChild(h2);
        items.appendChild(itemsFooter);
        return items
    })

    foodsElements.forEach(items => {
        foods[0].appendChild(items);
    })
}

function searchItems () {
    const searchInput = document.getElementById("input").value;
    const result = itemDetails.filter( (item) => {
        if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return item.name;
        }
    })
    console.log(result)



}

createItemsBox();