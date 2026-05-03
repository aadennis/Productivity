let activeCategory = null;
let lastTimestamp = Date.now();

function categoryFromUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/shorts")) return "yt_shorts";
  if (url.includes("facebook.com/marketplace")) return "fb_marketplace";
  return null;
}

async function addTime(category, ms) {
  if (!category) return;
  const seconds = Math.floor(ms / 1000);

  const data = await chrome.storage.local.get({
    yt_shorts_seconds: 0,
    fb_marketplace_seconds: 0
  });

  const key = category + "_seconds";
  data[key] += seconds;

  await chrome.storage.local.set({ [key]: data[key] });
}

async function updateActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const url = tabs[0]?.url || "";
  const newCategory = categoryFromUrl(url);

  const now = Date.now();
  const elapsed = now - lastTimestamp;

  if (activeCategory) {
    await addTime(activeCategory, elapsed);
  }

  activeCategory = newCategory;
  lastTimestamp = now;
}

/* -------------------------
   Midnight Reset (MV3-safe)
-------------------------- */

chrome.storage.local.get({ last_date: null }, data => {
  if (!data.last_date) {
    const today = new Date().toISOString().slice(0, 10);
    chrome.storage.local.set({ last_date: today });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checkDate", { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("checkDate", { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name !== "checkDate") return;

  const today = new Date().toISOString().slice(0, 10);
  const data = await chrome.storage.local.get({
    last_date: today,
    yt_shorts_seconds: 0,
    fb_marketplace_seconds: 0
  });

  if (data.last_date !== today) {
    await chrome.storage.local.set({
      last_date: today,
      yt_shorts_seconds: 0,
      fb_marketplace_seconds: 0
    });
  }
});

/* -------------------------
   Event listeners
-------------------------- */

chrome.tabs.onActivated.addListener(updateActiveTab);
chrome.tabs.onUpdated.addListener(updateActiveTab);

// macOS Edge: chrome.idle is undefined, so guard it
if (chrome.idle && chrome.idle.onStateChanged) {
  chrome.idle.onStateChanged.addListener(async (state) => {
    const now = Date.now();
    const elapsed = now - lastTimestamp;

    if (state === "active" && activeCategory) {
      await addTime(activeCategory, elapsed);
    }

    lastTimestamp = now;
  });
}
