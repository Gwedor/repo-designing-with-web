// Ce code est une recopie du code visible sur https://github.com/methio/dww-assignment-vanilla
// Développé par Thomas Perivolas
// Seule la partie innerHTML a été modifiée afin de correspondre à mon design

document.addEventListener("DOMContentLoaded", ()=>{

    // url of my dataset
    const datasetURL = "https://makerslab.em-lyon.com/dww/data/products.json";
    
    // a function to fetch the dataset
    const loadData = async (doStuffs) => {
        try {
            const response = await fetch(datasetURL);
            if(!response.ok){
                throw new Error('Network response not ok :' + response.statusText);
            }
            const data = await response.json();
            doStuffs(data);

        } catch (error) {
            console.error("Problem occured while getting your data" + error)
        }
    }

    // target where to display the cards
    const cardsContainer = document.querySelector("#cards-container"); // On utilise .product-grid et non #product-grid car product-grid est une class et non un id

    // when the dataset is loaded, it become available as an object, in the data variable.
    loadData((data)=>{

        // store length of elements
        let products_length = 0;

        // loop through the brands
        data.brands.forEach((brand, brandIndex) => {
            // then loop through the model
            data.items[brand].forEach((model, modelIndex) => {
                // console.log(model);

                // generate all the cards
                generateACard(cardsContainer, brand, model, modelIndex);


            });

            // update products length for each brands 
            products_length += data.items[brand].length;
        });

        // update the "how many shoes are displayed info"
        updateResultsLengthDisplay(products_length);

        // display the icons
        lucide.createIcons();

    });

         // functions
    const generateACard = (whereToPutTheCard, brand, model, modelIndex) => {
        let sizes = "";

        model.availability.forEach((size, indexofSize) => {
            console.log(indexofSize, size)
            if(size.quantity > 0){
                sizes += `
                    <li class="size-available flex align-center center">${size.size}</li>
                `;
            }else{
                sizes += `
                    <li class="size-unavailable flex align-center center">${size.size}</li>
                `;
            }
            
        });

        // push the card for the current model
        // J'ai demandé à Claude comment faire en sorte que je sois bien renvoyé sur la page du rpoduit sur lequel j'ai cliqué
        // <a href="product.html?brand=${brand}&index=${modelIndex}">
        whereToPutTheCard.innerHTML += `
            <!-- the card preview -->
            <article class="product-card">
                <i data-lucide="star" style="margin-left: 16em"></i>
                <a href="product.html?brand=${brand}&index=${modelIndex}">
                    <img src="${model.image}" alt="image of ${model.name}">
                </a>
                <h3 class="product_title">${model.name}</h3>
                <p class="short_description">${model.description}</p>
                <p class="price">${model.price}€</p>
                <button class="button">Ajouter au panier</button>
            </article> 

        `;
    }

    const capitalizeFirstLetter = (str) => {
        let w = str.trim().toLowerCase();      
        return w.charAt(0).toUpperCase() + w.slice(1);
    }

    const updateResultsLengthDisplay = (length) => {
        const target = document.querySelector("#results-lenght");
        target.innerHTML = length;
    }

});