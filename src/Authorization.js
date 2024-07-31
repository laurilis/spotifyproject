const clientId = '86097fe3b6634a188e5b003eb45decc6';
const redirectUri = 'http://localhost:3000/callback';

// Create code verifier
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Transform code verifier
const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

const clearStorage = () => {
    localStorage.removeItem('code_verifier');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const authenticate = async () => {
    clearStorage(); // Clear storage before new authentication
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    window.localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
};

const getToken = async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier');
   
    console.log("Code Verifier:", codeVerifier); // Log code verifier

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),
    };

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', payload);
        const data = await response.json();

        console.log("Response Status:", response.status); // Log response status
        console.log("Response Data:", data); // Log response data

        if (response.ok) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            console.log("Access Token stored:", data.access_token); // Log token response
            return data.access_token;
        } else {
            console.error("Error fetching token:", data);
            throw new Error(data.error_description);
        }
    } catch (error) {
        console.error("Network or server error:", error);
        throw error;
    }

  
};


const getRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        console.error("Refresh token not found in local storage.");
        return;
    }

    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
        }),
    };

    const response = await fetch(url, payload);
    const data = await response.json();

    console.log("Refresh Token Response:", data); // Log refresh token response

    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token); // Store new refresh token if provided
        }
        console.log("Access Token Refreshed:", data.access_token); // Log refreshed token
    } else {
        console.error("Error refreshing token:", data);
    }

    return data.access_token;
};

export { getToken, authenticate, getRefreshToken };
