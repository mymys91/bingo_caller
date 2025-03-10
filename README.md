# Bingo Caller

This is a simple Bingo Caller web application that randomly calls out Bingo numbers and highlights them on a Bingo table. It also plays corresponding audio files for each number called.

## Features

- Randomly calls out Bingo numbers from 1 to 75.
- Highlights called numbers on a Bingo table.
- Plays corresponding audio files for each number.
- Allows setting an interval for automatic number calling.
- Provides controls to start, pause, continue, and stop the game.

## Setup

1. Clone the repository or download the project files.
2. Ensure all audio files (1.mp3 to 75.mp3) are placed in the `Sound` directory.
3. Ensure the background image (`background.jpg`) is placed in the `Images` directory.

## Usage

1. Open `index.html` in a web browser.
2. Set the interval (in seconds) for automatic number calling.
3. Click the "Start" button to begin the game.
4. Use the "Pause", "Continue", and "End" buttons to control the game.

## Project Structure

```
index.html
Images/
    background.jpg
Sound/
    1.mp3
    2.mp3
    ...
    75.mp3
```

## Customization

- You can customize the appearance of the application by modifying the CSS styles in `index.html`.
- You can change the audio files by replacing the `.mp3` files in the `Sound` directory.

## License

This project is licensed under the MIT License.
