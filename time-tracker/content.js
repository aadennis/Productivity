// Create overlay element
const box = document.createElement("div");
box.id = "timeTrackerOverlay";
document.body.appendChild(box);

// Format seconds → HH:MM:SS
function format(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// Update overlay based on URL + stored time
function updateOverlay() {
  chrome.storage.local.get(null).then(data => {
    const url = location.href;
    let text = "";

    if (url.includes("youtube.com/shorts")) {
      text = "Tracking: YouTube Shorts\n" +
             format(data.yt_shorts_seconds || 0);
    } else if (url.includes("facebook.com/marketplace")) {
      text = "Tracking: FB Marketplace\n" +
             format(data.fb_marketplace_seconds || 0);
    }

    box.textContent = text;
    box.style.display = text ? "block" : "none";
  });
}

// Update when storage changes or URL changes
chrome.storage.onChanged.addListener(updateOverlay);
updateOverlay();

