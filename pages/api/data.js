export default async function handler(req, res) {
  const GOOGLE_SHEET_URL = "YOUR_APPS_SCRIPT_WEBHOOK_URL_HERE";

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "GET",
      redirect: "follow" // Google Apps Script redirect handle karne ke liye
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
}
