const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Retrieve the URL of the proxied M3U8 file from the query parameter
        const proxiedM3U8Url = req.query.url;
        if (!proxiedM3U8Url) {
            console.error('Missing URL parameter');
            return res.status(400).send('Missing URL parameter');
        }

        console.log('Fetching M3U8 file from:', proxiedM3U8Url);

        // Fetch the original proxied M3U8 file
        const response = await axios.get(proxiedM3U8Url, {
            headers: {
                'Referer': req.query.headers ? JSON.parse(req.query.headers).referer : ''
            }
        });

        // Log the response data
        console.log('M3U8 file fetched successfully, replacing "ts" with "m3u8"');

        // Replace all occurrences of 'ts' with 'm3u8' in the playlist content
        const modifiedPlaylist = response.data.replace(/\bts\b/g, 'm3u8');

        // Set the correct content type for M3U8 files
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

        // Send the modified M3U8 file
        res.send(modifiedPlaylist);
    } catch (error) {
        console.error('Error fetching or modifying the M3U8 file:', error.message);
        res.status(500).send('Error fetching or modifying the playlist');
    }
};
