
const apiBaseUrl = "http://127.0.0.1:8000/api";

async function loadCampaigns() {
    const errorMessage = document.getElementById("message");
    try {
        const response = await fetch(apiBaseUrl + '/campaigns/');
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            errorMessage.textContent = "No campaigns yet";
            return;
        }

        const campaigns = document.getElementById("campaign-list");
        data.forEach((campaign) => {
            const element = document.createElement("li");
            element.addEventListener("click", () => showDetail(campaign.id))
            element.textContent = `${campaign.name} - ${campaign.status}`;
            campaigns.append(element);
        });
    } catch (error) {
        errorMessage.textContent = "Could not load campaigns";
        console.error(error);

    }

}

const detailEl = document.getElementById("detail");

async function showDetail(id) {
    try {
        const response = await fetch(`${apiBaseUrl}/campaigns/${id}`);
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const campaign = await response.json();

        const title = document.createElement("h2");
        title.textContent = campaign.name;

        const creative = document.createElement("P");
        creative.textContent = `Creative: ${campaign.creative_detail ? campaign.creative_detail.name : "None"}`;

        const status = document.createElement("p");
        status.textContent = `Status ${campaign.status}`;

        const budget = document.createElement("p");
        budget.textContent = `Budget ${Number(campaign.budget).toLocaleString()}`

        const previewBtn = document.createElement("button");
        previewBtn.textContent = "Preview Creative";
        previewBtn.disabled = !campaign.creative_detail;

        detailEl.replaceChildren(title, creative, status, budget, previewBtn);

    } catch (error) {
        detailEl.textContent = "Could not load campaigns";
        console.error(error);
    }


}





loadCampaigns();