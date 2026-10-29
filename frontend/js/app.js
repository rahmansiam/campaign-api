
const apiBaseUrl = "http://127.0.0.1:8000/api";

async function loadCampaigns() {
    const errorMessage = document.getElementById("message");
    try {
        const response = await fetch(apiBaseUrl + '/campaigns/');
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
         if (data.length === 0){
            errorMessage.textContent = "No campaigns yet";
            return;
        }
        
        const campaigns = document.getElementById("campaign-list");
        data.forEach((campaign) => {
            const element = document.createElement("li");
            element.textContent = `${campaign.name} - ${campaign.status}`;
            campaigns.append(element);
        });
    } catch(error) {
        errorMessage.textContent = "Could not load campaigns";
        console.error(error);
       
    }

}

loadCampaigns();