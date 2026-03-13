# Black Video Landing

A minimal, production-ready static landing page built for GitHub + Vercel deployment.

## Project structure

```text
black-video-landing/
├── .gitignore
├── README.md
├── index.html
├── vercel.json
└── assets/
    ├── css/
    │   └── styles.css
    ├── images/
    │   └── video-fallback.svg
    ├── js/
    │   └── main.js
    └── videos/
        └── replace-me.mp4
```

## Run locally

Because this is a plain static site, you can open `index.html` directly in a browser.

For a cleaner local test with a lightweight local server, run one of these from the project root:

### Python

```bash
python -m http.server 3000
```

Then open `http://localhost:3000`.

### Node

```bash
npx serve .
```

## Where to place your video

Put your video file in:

```text
/assets/videos/
```

### Easiest replacement option

Replace this file:

```text
/assets/videos/replace-me.mp4
```

with your own MP4 and keep the same filename.

The included placeholder video now contains a short test tone so you can confirm audio is working after you enable sound.

### Or change the filename manually

If you want to use a different filename, update this line in `index.html`:

```html
<source src="assets/videos/replace-me.mp4" type="video/mp4" />
```

## Audio behavior

Modern browsers usually allow reliable autoplay only when the video starts muted.

This project now:

- autoplays the video muted
- lets the visitor enable sound with the on-screen button
- also lets the visitor tap/click the video itself to enable sound
- remembers the sound preference for the next visit when possible

If your replacement video has no audio track, enabling sound will not produce audio.

## Recommended video format

For best browser compatibility and reliable playback:

- Use MP4
- Encode with H.264 video
- Add AAC audio if you want sound
- Optimize/compress the file before upload for faster loading

## Upload to GitHub

### 1. Create a new repository on GitHub

Create an empty repo, then from this project folder run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Deploy to Vercel

### Option 1: Import from GitHub

1. Push this project to GitHub
2. Log into Vercel
3. Click **Add New Project**
4. Import your GitHub repository
5. Deploy

No build command is required because this is a static site.

### Option 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and deploy the root folder.

## Notes

- No framework is required
- No `package.json` is needed
- The page is responsive and centered around the video
- If the browser cannot play the video, a fallback message appears automatically
