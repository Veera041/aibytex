// src/utils/analytics.js

/**
 * Simple Analytics Tracking (improved)
 * - Prevents double-counting on refresh / StrictMode by debouncing rapid duplicate hits
 * - Stores data in localStorage under STORAGE_KEY
 * - Exports:
 *    - trackPageView(pathname)
 *    - trackTimeSpent()
 *    - getMostVisitedPage()
 *    - getAllPageStats()
 *    - getTotalVisits()
 *    - syncAnalyticsToServer()  (optional server sync)
 */

const STORAGE_KEY = "aibytex_analytics";
// ignore repeated hits to the same page within this window (ms)
const MIN_VISIT_INTERVAL_MS = 3000; // 3 seconds

/* -------- LOCAL DATA HANDLER -------- */
function readStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { pages: {}, lastPage: null, sessionStart: null };
  } catch (err) {
    console.warn("analytics: readStorage failed", err);
    return { pages: {}, lastPage: null, sessionStart: null };
  }
}

function writeStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("analytics: writeStorage failed", err);
  }
}

/* -------- TRACK PAGE VISIT -------- */
export function trackPageView(pathname) {
  if (!pathname) return;

  const analytics = readStorage();
  if (!analytics.pages) analytics.pages = {};

  const now = Date.now();

  // ensure page entry exists and track lastVisitAt
  if (!analytics.pages[pathname]) {
    analytics.pages[pathname] = { visits: 0, totalTime: 0, lastVisitAt: null };
  }

  // Dedupe: if the last recorded visit for this path is very recent, ignore it.
  const lastVisitAt = analytics.pages[pathname].lastVisitAt || 0;
  if (now - lastVisitAt < MIN_VISIT_INTERVAL_MS) {
    // update session info but don't increment visits
    analytics.lastPage = pathname;
    analytics.sessionStart = now;
    writeStorage(analytics);
    return;
  }

  // Otherwise, count as a real visit
  analytics.pages[pathname].visits = (analytics.pages[pathname].visits || 0) + 1;
  analytics.pages[pathname].lastVisitAt = now;

  // track last page & session start time
  analytics.lastPage = pathname;
  analytics.sessionStart = now;

  writeStorage(analytics);
}

/* -------- TRACK TIME SPENT -------- */
export function trackTimeSpent() {
  const analytics = readStorage();
  const last = analytics.lastPage;
  if (!last || !analytics.sessionStart) return;

  const now = Date.now();
  // time in seconds
  const durationSecs = Math.floor((now - analytics.sessionStart) / 1000);
  if (!analytics.pages[last]) analytics.pages[last] = { visits: 0, totalTime: 0, lastVisitAt: null };

  analytics.pages[last].totalTime = (analytics.pages[last].totalTime || 0) + durationSecs;
  // reset sessionStart to now (for next navigation)
  analytics.sessionStart = now;

  writeStorage(analytics);
}

/* -------- GET MOST VISITED PAGE -------- */
export function getMostVisitedPage() {
  const analytics = readStorage();
  let maxPage = null;
  let maxVisits = 0;
  if (!analytics.pages) return { path: null, visits: 0 };

  for (const path in analytics.pages) {
    if ((analytics.pages[path].visits || 0) > maxVisits) {
      maxVisits = analytics.pages[path].visits;
      maxPage = path;
    }
  }
  return { path: maxPage, visits: maxVisits };
}

/* -------- GET ALL PAGE STATS -------- */
export function getAllPageStats() {
  const analytics = readStorage();
  const pages = analytics.pages || {};
  const arr = Object.keys(pages).map((path) => ({
    path,
    visits: pages[path].visits || 0,
    totalTime: pages[path].totalTime || 0, // in seconds
    lastVisitAt: pages[path].lastVisitAt || null,
  }));
  arr.sort((a, b) => b.visits - a.visits || b.totalTime - a.totalTime);
  return arr;
}

/* -------- TOTAL VISITS -------- */
export function getTotalVisits() {
  const analytics = readStorage();
  const pages = analytics.pages || {};
  return Object.values(pages).reduce((sum, p) => sum + (p.visits || 0), 0);
}

/* -------- OPTIONAL: SEND DATA TO BACKEND -------- */
export async function syncAnalyticsToServer() {
  const data = readStorage();
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn("Analytics sync failed:", err);
  }
}
