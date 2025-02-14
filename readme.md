# Image Processor

## Overview
The Pictures 2 notes (p2n) project is a tool used for loading images for haptification and sonification.

## Features
- Load images as query parameters.
- Comes with a prebuilt library.
- Various scales for sonification.

## Installation
To install the Image Processor, clone the repository and install the dependencies:
```bash
git clone https://github.com/yourusername/image_processor.git
cd image_processor
pip install -r requirements.txt
```

## Usage
To use the Image Processor, refer to the Docker container:
```bash
docker compose build
docker compose up -d
```

Then visit your `http://localhost:80`.

## Functions in script.js
- **Loading an image as query param**: The script allows loading an image using a query parameter.
- **Various scales for sonification**: The script includes functions for different musical scales used in sonification. These are controlled in script.js.
- **Websocket implementation with haptiverse**: It's possible to stream arbitrary info (for example, RGB of pixel hovered) to the Haptiverse platform.

## License
This project is licensed under the ACSL license.