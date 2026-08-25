export default async function handler(req, res) {
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwoPLI-FLw5ebT8MrggVdH1EW1ZRZPz7zoAHEaUs_xXdiErsup6O3Nd2AY2aZV052NE9g/exec";

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    const data = await response.json();
    
    // Ensure har item me image property proper pass ho
    const formattedData = data.map((item) => ({
      title: item.title || "",
      price: item.price || "",
      image: item.image || "",
      url: item.url || "",
      affiliate_url: item.affiliate_url || item.url || ""
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from Google Sheet" });
  }
}
