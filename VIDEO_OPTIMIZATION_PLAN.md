# Video Optimization Plan

## Problem Statement

The hero video file `public/videos/golf-course-hero.mp4` is **145.84 MB**, which exceeds GitHub's file size limit of **100 MB**. This file has been removed from the repository to allow successful pushes to GitHub.

**Current Status:**
- Video file removed from git history via `git filter-branch`
- Added `*.mp4` to `.gitignore` to prevent future accidental commits
- Repository successfully pushed to GitHub without the video

---

## Options for Video Handling

### Option 1: Video Compression (Recommended)
**Compress the existing video to reduce file size while maintaining quality**

**Pros:**
- Keeps video self-hosted (no external dependencies)
- Better privacy and control
- Faster loading times for users
- No recurring costs

**Cons:**
- Requires video processing tools
- May lose some quality
- One-time effort needed

**Target Size:** Under 10 MB (ideally 5-8 MB for web)

**Tools to Use:**
- **HandBrake** (Free, cross-platform GUI)
- **FFmpeg** (Free, command-line)
- **Adobe Media Encoder** (Professional, paid)
- **Online tools** like CloudConvert, Compressor.io

**Recommended Settings:**
```bash
# FFmpeg command for high-quality compression
ffmpeg -i golf-course-hero.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf scale=1920:1080 \
  -acodec aac \
  -b:a 128k \
  -movflags +faststart \
  golf-course-hero-optimized.mp4

# For even smaller size (720p)
ffmpeg -i golf-course-hero.mp4 \
  -vcodec libx264 \
  -crf 30 \
  -preset slow \
  -vf scale=1280:720 \
  -acodec aac \
  -b:a 96k \
  -movflags +faststart \
  golf-course-hero-720p.mp4
```

**Quality Settings Explained:**
- `-crf 28-30`: Constant Rate Factor (lower = better quality, 18-28 is good range)
- `-preset slow`: Better compression (slower encoding, but smaller file)
- `-movflags +faststart`: Enables progressive download/streaming
- `scale=1920:1080` or `scale=1280:720`: Resolution (720p is usually sufficient for web)

---

### Option 2: External Video Hosting
**Host the video on a CDN or video platform**

**Platforms to Consider:**

#### A. **Cloudflare R2 / AWS S3** (Recommended for control)
- **Cost:** ~$0.015/GB storage + $0.01/GB bandwidth
- **Monthly estimate:** $1-2/month for this video
- **Pros:** Full control, fast CDN delivery, no platform branding
- **Cons:** Requires setup, small ongoing cost

#### B. **Vimeo** (Best for professional presentation)
- **Cost:** Free plan available, Plus $7/month for better features
- **Pros:** Professional, customizable player, privacy controls
- **Cons:** Vimeo branding on free plan, monthly cost

#### C. **YouTube** (Free but less control)
- **Cost:** Free
- **Pros:** Unlimited bandwidth, auto-quality adjustment, no storage limits
- **Cons:** YouTube branding, ads on free accounts, less privacy control

#### D. **Bunny CDN** (Cost-effective CDN)
- **Cost:** ~$0.01/GB storage + $0.01-0.04/GB bandwidth
- **Pros:** Very affordable, fast global delivery, video optimization included
- **Cons:** Requires setup

---

### Option 3: Git Large File Storage (LFS)
**Use Git LFS to store large files**

**Pros:**
- Files stay in repository structure
- Easy to manage with git

**Cons:**
- GitHub LFS costs: $5/month for 50GB bandwidth
- Adds complexity to git workflow
- Still need to optimize video for web performance

**Not Recommended:** Even with LFS, the video should be optimized for web delivery

---

### Option 4: Multiple Quality Versions
**Provide different video qualities based on user's connection**

**Approach:**
- Create 3 versions: 1080p (5-8MB), 720p (3-5MB), 480p (1-2MB)
- Use adaptive streaming or JavaScript to detect connection speed
- Serve appropriate version based on bandwidth

**Pros:**
- Best user experience across all connection speeds
- Optimal loading times

**Cons:**
- More files to manage
- Requires implementation of quality selection logic

---

## Recommended Implementation Plan

### Phase 1: Immediate Solution (Do This First)
**Compress the video to under 10 MB**

1. **Install FFmpeg** (if not already installed)
   - Windows: `winget install FFmpeg` or download from https://ffmpeg.org
   - Mac: `brew install ffmpeg`
   - Linux: `sudo apt install ffmpeg`

2. **Compress the video**
   ```bash
   cd public/videos

   # Create 1080p optimized version (target: 5-8 MB)
   ffmpeg -i golf-course-hero.mp4 \
     -vcodec libx264 \
     -crf 28 \
     -preset slow \
     -vf scale=1920:1080 \
     -acodec aac \
     -b:a 128k \
     -movflags +faststart \
     golf-course-hero-optimized.mp4

   # Check the file size
   dir golf-course-hero-optimized.mp4
   ```

3. **Test the compressed video**
   - Play it locally to ensure quality is acceptable
   - Check file size (should be under 10 MB)

4. **Replace the original**
   ```bash
   # Backup original (move to separate location outside repo)
   move golf-course-hero.mp4 ../../backups/

   # Rename optimized version
   move golf-course-hero-optimized.mp4 golf-course-hero.mp4
   ```

5. **Update .gitignore if needed**
   - Remove the blanket `*.mp4` exclusion
   - Add specific exclusions for large files only
   ```gitignore
   # Large video backups
   backups/
   *-original.mp4
   ```

6. **Commit and push**
   ```bash
   git add public/videos/golf-course-hero.mp4
   git commit -m "feat: Add optimized hero video (compressed from 145MB to ~8MB)"
   git push
   ```

---

### Phase 2: Future Optimization (Optional)
**If Phase 1 video is still too large or slow to load**

1. **Create multiple quality versions**
   ```bash
   # 720p version (3-5 MB)
   ffmpeg -i golf-course-hero.mp4 \
     -vcodec libx264 \
     -crf 30 \
     -preset slow \
     -vf scale=1280:720 \
     -acodec aac \
     -b:a 96k \
     -movflags +faststart \
     golf-course-hero-720p.mp4

   # 480p version (1-2 MB)
   ffmpeg -i golf-course-hero.mp4 \
     -vcodec libx264 \
     -crf 32 \
     -preset slow \
     -vf scale=854:480 \
     -acodec aac \
     -b:a 64k \
     -movflags +faststart \
     golf-course-hero-480p.mp4
   ```

2. **Implement adaptive video selection**
   - Detect user's connection speed
   - Serve appropriate quality
   - Add manual quality selector

3. **Consider lazy loading**
   - Only load video when it's in viewport
   - Use poster image placeholder
   - Implement intersection observer

---

### Phase 3: Advanced Optimization (If Needed)
**Move to external hosting for better performance**

1. **Sign up for Cloudflare R2 or Bunny CDN**
2. **Upload video file(s)**
3. **Update video source URLs in components**
4. **Configure CDN caching and optimization**
5. **Monitor bandwidth usage**

---

## Implementation Checklist

- [ ] **Install FFmpeg** on local machine
- [ ] **Locate original video file** (currently removed from repo)
- [ ] **Compress video** using recommended FFmpeg command
- [ ] **Test compressed video** for quality and file size
- [ ] **Verify file size** is under 10 MB (ideally 5-8 MB)
- [ ] **Backup original** to external location
- [ ] **Update .gitignore** to allow compressed video
- [ ] **Add optimized video to repository**
- [ ] **Test video playback** on website
- [ ] **Commit and push** to GitHub
- [ ] **Monitor page load performance** with optimized video

---

## Video Component Best Practices

When implementing the video, ensure these optimizations are in place:

```tsx
// Example optimized video component
<video
  autoPlay
  muted
  loop
  playsInline
  poster="/images/hero-golf-cart.jpg"  // Fallback poster image
  className="..."
  preload="metadata"  // Only preload metadata, not entire video
>
  <source src="/videos/golf-course-hero.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

**Additional optimizations:**
- Use `loading="lazy"` attribute (if supported)
- Implement Intersection Observer for viewport-based loading
- Compress poster image as well
- Consider using WebM format alongside MP4 for better compression

---

## Expected Results

**Before:**
- File size: 145.84 MB
- Cannot push to GitHub
- Slow page loads
- Poor user experience on mobile/slow connections

**After (Phase 1):**
- File size: 5-10 MB (95% reduction)
- Successfully commits to GitHub
- Faster page loads (10-20x faster)
- Better user experience
- Self-hosted (no external dependencies)

**After (Optional Phase 2):**
- Multiple quality options
- Adaptive streaming
- Optimal experience for all users
- Even faster load times

---

## Cost Analysis

| Solution | Initial Cost | Monthly Cost | Effort | Control |
|----------|-------------|--------------|---------|---------|
| **Compression (Recommended)** | Free | $0 | Low | Full |
| Cloudflare R2 | Free | ~$1-2 | Medium | Full |
| Bunny CDN | Free | ~$1 | Medium | Full |
| Vimeo Plus | $7 | $7 | Low | Medium |
| YouTube | Free | $0 | Low | Low |
| Git LFS | Free | $5+ | Low | Full |

**Recommendation:** Start with compression (Phase 1). It's free, gives you full control, and should reduce the file size by 90-95% while maintaining acceptable quality.

---

## Next Steps

1. **Review this plan**
2. **Decide on approach** (Compression recommended)
3. **Schedule implementation** (when ready to work on video)
4. **Follow Phase 1 checklist** to compress and add video
5. **Test on live site**
6. **Monitor performance**
7. **Proceed to Phase 2 if needed**

---

## Notes

- Original video location: `public/videos/golf-course-hero.mp4` (currently removed)
- Video was removed from repository on: December 10, 2025
- Git history was cleaned using `git filter-branch`
- Video files are currently excluded via `.gitignore`

---

## Resources

- **FFmpeg Documentation:** https://ffmpeg.org/documentation.html
- **HandBrake (GUI tool):** https://handbrake.fr/
- **Cloudflare R2:** https://www.cloudflare.com/products/r2/
- **Bunny CDN:** https://bunny.net/
- **Web Video Best Practices:** https://web.dev/fast/#optimize-your-videos

---

*This plan can be executed later when ready to re-add the hero video to the website.*
