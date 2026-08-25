export default async function handler(req, res) {
  // Aapka Google Sheet Webhook URL
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwoPLI-FLw5ebT8MrggVdH1EW1ZRZPz7zoAHEaUs_xXdiErsup6O3Nd2AY2aZV052NE9g/exec";

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Data fetch karne me dikkat aayi" });
  }
}
