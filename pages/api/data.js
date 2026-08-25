export default async function handler(req, res) {
  // Demo Data Array (Yeh dynamic API fetch karega)
  const products = [
    { title: "Sample Book 1", price: "£51.77", url: "http://books.toscrape.com/" },
    { title: "Sample Book 2", price: "£53.74", url: "http://books.toscrape.com/" }
  ];

  res.status(200).json(products);
}
