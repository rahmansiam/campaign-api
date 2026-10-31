const apiBaseUrl = "http://127.0.0.1:8000/api";
const campignParam = new URLSearchParams(window.location.search).get("campaign");
console.log("campaign id:", campignParam);




let cta_btn = document.querySelector(".btn");
let paragraph = document.querySelector(".para");
let cls_btn = document.querySelector(".close_btn");
let ad = document.querySelector(".ad");
let collapse_btn = document.querySelector(".collapse-btn");
let campaignId = null;
let impressionFired = false;
// Adding event logger
let eventLog = [];

const eventEndpoints = {
    "impression": "/events/impression/",
    "visit site": "/events/click/",
};

async function sendEvent(name) {
    const path  = eventEndpoints[name];
    if (!path || !campaignId){
        return;
    }
    try {
        await fetch(`${apiBaseUrl}${path}`,{
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body: JSON.stringify({campaign: Number(campaignId)}),
            keepalive: true,
        });
    }catch(error) {
        console.error("Event failed",error);
    }
}


function trackEvent(name, details = {}) {
    const event = {
        name: name,
        campaignId: details.campaignId ?? null,
        timestamp: new Date().toISOString()
    };
    console.log(event);
    eventLog.push(event);
    sendEvent(name);
}

function fireImpression() {
    if (impressionFired) return;
    impressionFired = true;
    trackEvent("impression", { campaignId });
}


// expand ad

function expand_ad() {
    paragraph.classList.add("add-para");
    cta_btn.textContent = "Visit Site";
    collapse_btn.style.display = "inline-block";
    trackEvent("expand", { campaignId });
}

// CTA behavior
let destination = "https://www.google.com/";
cta_btn.addEventListener("click", () => {
    if (paragraph.classList.contains("add-para")) {
        trackEvent("visit site", { campaignId });
        window.open(destination, "_blank", "noopener,noreferrer");
        return;
    }

    expand_ad();
});

// collapse ad
function collapse_ad() {
    paragraph.classList.remove("add-para");
    cta_btn.textContent = "Learn More";
    collapse_btn.style.display = "none";
    trackEvent("collapse", { campaignId });
}

collapse_btn.addEventListener("click", () => {
    collapse_ad();
})

// Close ad

cls_btn.addEventListener("click", () => {
    trackEvent("close", { campaignId });
    ad.classList.add("ad-closing");
})



function adaptCreative(campaign){
    const c = campaign.creative_detail;
    if (!c) {
        throw new Error("Campaign has no creative");
    }
    return {
        headline : c.headline,
        Para_text :c.body_text,
        img_path: c.image_url,
        cta_labels_before_expand : c.cta_text,
        destination_url : c.click_url,
        campaignId : campaign.id,
    };
}


// Dynamic content from json

async function loadContent() {
    try {
        const response = await fetch(`${apiBaseUrl}/campaigns/${campignParam}/`);
        if (!response.ok) {
            throw new Error(`HTTP $(response.status)`)
        }
        const config = adaptCreative(await response.json());

        if (!config.headline || !config.campaignId) {
            throw new Error("Missing required field");
        }

        document.querySelector(".heading").textContent = config.headline;
        document.querySelector(".para").textContent = config.Para_text;
        document.querySelector(".ad_img").src = config.img_path;
        cta_btn.textContent = config.cta_labels_before_expand;
        campaignId = config.campaignId ?? null;
        destination = config.destination_url ?? destination;

        fireImpression();


    } catch (error) {
        console.error("Error Loading Json", error);
        ad.style.display = "none";

    }
}

loadContent();


