// Create overlay
const box = document.createElement("div");
box.style.position = "fixed";
box.style.bottom = "10px";
box.style.right = "10px";
box.style.padding = "6px 10px";
box.style.background = "rgba(0,0,0,0.7)";
box.style.color = "white";
box.style.fontSize = "12px";
box.style.borderRadius = "4px";
box.style.zIndex = "999999";
box.style.fontFamily = "sans-serif";
box.style.pointerEvents = "none";
document.body.appendChild(box);

function format(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function updateOverlay() {
  chrome.storage.local.get(null).then(data => {
    let text = "";

    if (location.href.includes("youtube.com/shorts/")) {
      text = "Tracking: YouTube Shorts\n" +
             format(data.yt_shorts_seconds || 0);
    } else if (location.href.includes("facebook.com/marketplace")) {
      text = "Tracking: FB Marketplace\n" +
             format(data.fb_marketplace_seconds || 0);
    } else {
      text = "";
    }

    box.textContent = text;
    box.style.display = text ? "block" : "none";
  });
}

setInterval(updateOverlay, 1000);
updateOverlay();

