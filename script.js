const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false; // when the page first loads, we want it to be false
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const apiKey = "44hpr-trmnEYnXmI7acGCCpKutyCNTJxEq8JzR3st0w";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images are loaded 
function imageLoaded() {
    console.log("Image loaded");
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready);
    }
}

// Helper Function to set Attributes on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


//Create Elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; //reseting back to zero to trigger ready boolean
    totalImages = photosArray.length;
    console.log("total images", totalImages);

    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement("a");
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", "_blank"); 
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        //Create <img> for photo 
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each img has finished loading 
        img.addEventListener("load", imageLoaded())


        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}



// Get photos from unsplash Api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
        console.log(error);
    }
}

// Check if scrolling is near bottom of page, Load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// Run on load
getPhotos();
