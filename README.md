# yt-playlist-backup

## Setup

```bash
git clone https://github.com/OzakIOne/yt-playlist-backup
cd yt-playlist-backup
npm i
node index.js PLAYLIST_URL
```

## Schedule task

#### I don't know how to do this on linux

1. Open task scheduler
2. Create basic task
3. Setup the name you want and the trigger
4. Pick start a program
5. Browser to where you've cloned the repo, and pick `run.cmd`
6. **❗ Edit the run.cmd to adapt the path and the playlist url ❗**
7. Finish
