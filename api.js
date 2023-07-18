const axios = require('axios');
const link = `https://v2.jokeapi.dev/joke/Any`;

module.exports = async function() {
    const response = await axios.get(link);
    const data = response.data;
    return data;
}