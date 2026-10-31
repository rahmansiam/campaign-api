
const apiBaseUrl = "http://127.0.0.1:8000/api";

async function loadCampaigns() {
    const errorMessage = document.getElementById("message");
    const campaigns = document.getElementById("campaign-list");
    errorMessage.textContent = "";
    campaigns.replaceChildren();

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

//login

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        }),

    });
    if (!response.ok) {
        document.getElementById("auth-status").textContent = "Login Failed!";
        return;
    }
    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    document.getElementById("auth-status").textContent = "Logged in"
})

//camapaign create

const dialog = document.getElementById("create-dialog");

document.getElementById("open-create").addEventListener("click", async () => {
    const response = await fetch(`${apiBaseUrl}/creatives/`);
    const creatives = await response.json();
    const select = document.getElementById("creative-select");
    select.replaceChildren(new Option("No creative", ""));
    creatives.forEach((c) => select.append(new Option(c.name, c.id)));
    dialog.showModal();
})

document.getElementById("cancel-create").addEventListener("click", () => {
    dialog.close();
})

document.getElementById("create-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));
    payload.creative = payload.creative ? Number(payload.creative) : null;

    const response = await fetch(`${apiBaseUrl}/campaigns/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const errors = response.json();
        document.getElementById("create-error").textContent = JSON.stringify(errors);
        return
    }
    e.target.reset();
    dialog.close();
    loadCampaigns()
})




loadCampaigns();