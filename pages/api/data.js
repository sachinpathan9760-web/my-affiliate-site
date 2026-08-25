export default async function handler(req, res) {
  // Yahan bhi Step 2 wala NAYA Webhook URL paste karein
  const GOOGLE_SHEET_URL = "PASTE_YOUR_NEW_WEBHOOK_URL_HERE";

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    const textData = await response.text();
    
    // Check if Google Apps Script returned JSON or HTML error page
    let data;
    try {
      data = JSON.parse(textData);
    } catch (e) {
      return res.status(200).json([]);
    }

    if (!Array.isArray(data)) {
      return res.status(200).json([]);
    }

    const cleanedData = data.map((item) => ({
      title: item.title || "Featured Deal",
      price: item.price || "Check Price",
      image: item.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
      url: item.url || "https://www.amazon.com",
      affiliate_url: item.affiliate_url || item.url || "https://www.amazon.com"
    }));

    return res.status(200).json(cleanedData);
  } catch (error) {
    return res.status(200).json([]);
  }
}
