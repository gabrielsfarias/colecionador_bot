import DOMParser from 'xmldom';

async function fetchCardDetails(cardname) {
    const url = `https://marvelsnapzone.com/cards/${cardname}`;
    try {
        // Use fetch to make an HTTP GET request
        const response = await fetch(url);
        const data = await response.text(); // Get the response body as text
    
        // Parse HTML using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
    
        // Extract image URL and description from the page
        const imageElement = doc.querySelector(".card-image-selector img");
        const descriptionElement = doc.querySelector(".card-info");
    
        const imageUrl = imageElement?.getAttribute("src");
        const description = descriptionElement?.textContent.trim();
    
        if (imageUrl && description) {
          return { imageUrl, description };
        } else {
          return null; // Return null if the card details can't be found
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
        return null;
      }
}