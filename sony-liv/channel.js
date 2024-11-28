export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    res.status(400).send("Missing 'id' query parameter.");
    return;
  }

  const originalUrl = `https://fifabd.xyz/KIDxRANAPKs/play.m3u8?id=${id}`;

  try {
    const response = await fetch(originalUrl, {
      headers: {
        Referer: "RANAPK", // Add the required Referer header
      },
    });

    if (!response.ok) {
      res.status(response.status).send("Error fetching the M3U8 playlist.");
      return;
    }

    const m3u8Data = await response.text();
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(m3u8Data);
  } catch (error) {
    console.error("Error fetching M3U8:", error);
    res.status(500).send("Internal server error.");
  }
}
