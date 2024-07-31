# jammming

jammming is a web application that allows users to search for songs, create playlists, and export them directly to their Spotify account.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **User Authentication**: Securely log in to your Spotify account using OAuth.
- **Search Functionality**: Search for songs using Spotify's search API.
- **Playlist Management**: Create, add, and remove tracks from your playlist.
- **Export Playlist**: Save your playlist to your Spotify account.

## Demo

Check out the live demo of the application here: [jammming](https://laurilis.github.io/spotifyproject)

## Installation

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/laurilis/spotifyproject.git
   cd spotifyproject

2. **Install dependencies**:
    npm install

3. **Create a .env file in the root directory and add your Spotify API credentials**:
    REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
    REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000

4. **Start the development server**:
    npm start

5. **Build for production**:
    npm run build

6. **Deploy to GitHub Pages**:
    npm run deploy


##Usage

1. **Authenticate**: 
    Click on the "Login with Spotify" button to authenticate your Spotify account.

2. **Search for Songs**: 
    Use the search bar to find your favorite songs.

3. **Create Playlist**:    
    Add songs to your playlist and give it a name.

4. **Export Playlist**: 
    Save the playlist to your Spotify account by clicking the "Save to Spotify" button.

