// const sandboxMode = true;
const sandboxMode = false;
let apiUrl;
let imageUrl;
let mediaUrl;

if (sandboxMode) {
    apiUrl = 'http://localhost:8080/api/v1/';
    imageUrl = 'http://localhost:8080';
    mediaUrl = 'http://localhost:8080';
} else {
    apiUrl = 'http://api.ashish-website.in/api/v1/';
    imageUrl = 'http://api.ashish-website.in/';
    mediaUrl = 'http://api.ashish-website.in/';
}

module.exports = {
    apiUrl,
    imageUrl,
    mediaUrl,
};
