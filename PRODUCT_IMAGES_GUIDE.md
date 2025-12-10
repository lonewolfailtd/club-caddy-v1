# Product Images Setup Guide

This guide provides instructions for setting up all product images for Club Caddy. The application requires 14 product images for the golf cart product catalog.

## Overview

Product images are displayed in:
- Product listing page (`/products`)
- Individual product detail pages
- Shopping cart previews
- Order confirmations

## Image Requirements

### File Format
- **Format**: JPEG (.jpg) or PNG (.png)
- **Recommended**: JPEG for best compression and quality balance
- **Naming Convention**: `caddy-cart01.jpg` through `caddy-cart14.jpg`

### Dimensions
- **Recommended Size**: 1200 x 900 pixels (4:3 aspect ratio)
- **Alternative**: 1024 x 768 pixels for smaller file sizes
- **Minimum**: 800 x 600 pixels (not recommended)
- **Maximum**: 2400 x 1800 pixels

### File Size
- **Target**: 100-300 KB per image
- **Maximum**: 500 KB (for performance)
- **Quality Setting**: 85-90% JPEG quality

### Quality Standards
- **Resolution**: Minimum 72 DPI for web (96 DPI recommended)
- **Color Profile**: sRGB for web compatibility
- **Sharp and Clear**: High-quality product photos
- **Well-lit**: Good lighting without harsh shadows
- **Consistent**: Similar color tone and style across all images

## Required Images

The application expects 14 product images in the following naming convention:

| Image Number | Filename | Purpose |
|---|---|---|
| 1 | caddy-cart01.jpg | Standard 2-Seater |
| 2 | caddy-cart02.jpg | Standard 2-Seater (alternate angle) |
| 3 | caddy-cart03.jpg | Standard 2-Seater (detail view) |
| 4 | caddy-cart04.jpg | 4-Seater |
| 5 | caddy-cart05.jpg | 4-Seater (alternate angle) |
| 6 | caddy-cart06.jpg | 4-Seater (detail view) |
| 7 | caddy-cart07.jpg | 6-Seater |
| 8 | caddy-cart08.jpg | 6-Seater (alternate angle) |
| 9 | caddy-cart09.jpg | 6-Seater (detail view) |
| 10 | caddy-cart10.jpg | Premium Edition |
| 11 | caddy-cart11.jpg | Premium Edition (alternate angle) |
| 12 | caddy-cart12.jpg | Premium Edition (detail view) |
| 13 | caddy-cart13.jpg | Utility Model |
| 14 | caddy-cart14.jpg | Utility Model (alternate angle) |

## Directory Structure

Images must be placed in the following location:

```
C:\Users\lonewolf\club-caddy-v1\public\images\products\
```

Expected structure:
```
public/
├── images/
│   ├── products/
│   │   ├── caddy-cart01.jpg
│   │   ├── caddy-cart02.jpg
│   │   ├── caddy-cart03.jpg
│   │   ├── caddy-cart04.jpg
│   │   ├── caddy-cart05.jpg
│   │   ├── caddy-cart06.jpg
│   │   ├── caddy-cart07.jpg
│   │   ├── caddy-cart08.jpg
│   │   ├── caddy-cart09.jpg
│   │   ├── caddy-cart10.jpg
│   │   ├── caddy-cart11.jpg
│   │   ├── caddy-cart12.jpg
│   │   ├── caddy-cart13.jpg
│   │   ├── caddy-cart14.jpg
│   ├── hero-golf-cart.jpg
│   └── [other images]
```

## Step 1: Prepare Your Images

### If You Have Raw Photos

1. **Resize Images**
   - Use any image editor (Photoshop, GIMP, Paint.net, etc.)
   - Resize to 1200 x 900 pixels
   - Keep aspect ratio consistent

2. **Crop for Consistency**
   - Ensure all product images have similar framing
   - Center the golf cart in each image
   - Leave appropriate white space around product

3. **Adjust Colors**
   - Ensure consistent color temperature across images
   - Adjust brightness/contrast if needed
   - Make sure lighting is even and not washed out

4. **Remove Backgrounds (Optional)**
   - For a professional look, consider white background
   - Use eraser tool or background removal software
   - Ensure clean edges

### If You Need Stock Photos

Use these services to find golf cart images:

- **Shutterstock** (https://www.shutterstock.com)
  - Search: "golf cart" or "golf vehicle"
  - Filter by license type
  - Download appropriate sizes

- **Getty Images** (https://www.gettyimages.com)
  - Professional golf cart photography
  - Various angles and styles

- **Unsplash** (https://unsplash.com)
  - Free high-quality images
  - Search: "golf cart"

- **Pexels** (https://www.pexels.com)
  - Free stock photos
  - No attribution required

## Step 2: Optimize Images

### Using Online Tools (Easiest)

1. **TinyJPG** (https://tinyjpg.com)
   - Visit the website
   - Drag and drop your images
   - Set quality to 85-90%
   - Download optimized versions

2. **Compressor.io** (https://compressor.io)
   - Similar to TinyJPG
   - Supports JPEG and PNG
   - No registration required

### Using Desktop Software

**Windows:**
- **Paint.net**: Free, easy to use
  1. Open image
  2. Go to File → Export As
  3. Set JPEG quality to 85-90%
  4. Save as .jpg

- **XnConvert**: Batch optimization
  1. Add all images
  2. Set format to JPEG
  3. Set quality to 85-90%
  4. Export all at once

**Mac:**
- **ImageOptim**: Free, drag-and-drop
  1. Drag images to ImageOptim
  2. Automatically optimizes
  3. Replace original files

**Linux:**
- **ImageMagick**: Command line tool
  ```bash
  convert input.jpg -quality 85 output.jpg
  ```

### Batch Optimization Command (Windows PowerShell)

If you have all images ready:
```powershell
# Navigate to image directory
cd "C:\Users\lonewolf\club-caddy-v1\public\images\products\"

# Verify images are there
Get-ChildItem *.jpg
```

## Step 3: Upload Images to Project

1. **Create Directory** (if not exists)
   ```
   C:\Users\lonewolf\club-caddy-v1\public\images\products\
   ```

2. **Copy Images**
   - Copy all 14 optimized JPG files to the products directory
   - Ensure filenames match exactly: `caddy-cart01.jpg` through `caddy-cart14.jpg`
   - No spaces in filenames
   - All lowercase

3. **Verify File Placement**
   - Open File Explorer
   - Navigate to: `C:\Users\lonewolf\club-caddy-v1\public\images\products\`
   - Confirm all 14 images are present
   - Check filenames are correct

## Step 4: Configure Image References

### Image Paths in Code

Images are referenced using relative paths from the `public` directory:

```typescript
// Example usage in product components
const imagePath = `/images/products/caddy-cart01.jpg`;

// In Next.js Image component
<Image
  src="/images/products/caddy-cart01.jpg"
  alt="2-Seater Golf Cart"
  width={1200}
  height={900}
/>
```

### Product Mapping

The application automatically maps product IDs to image numbers:
- Product 1 → caddy-cart01.jpg
- Product 2 → caddy-cart02.jpg
- etc.

No additional code changes needed if following naming convention.

## Step 5: Test Image Display

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Check Product Listing**
   - Navigate to: `http://localhost:3000/products`
   - Verify all products display correctly
   - Check images load without errors
   - Verify image quality and sizing

3. **Check Product Details**
   - Click on each product
   - Verify detail image loads correctly
   - Check responsive layout on different screen sizes

4. **Check Performance**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Reload page
   - Check image file sizes
   - Verify images load quickly

## Verification Checklist

### Before Uploading
- [ ] All 14 images are ready
- [ ] Images are in JPEG format (.jpg)
- [ ] File sizes are 100-300 KB each
- [ ] Images are 1200 x 900 pixels or larger
- [ ] Image quality is sharp and clear
- [ ] All images have consistent lighting
- [ ] Filenames follow convention: caddy-cart01.jpg through caddy-cart14.jpg
- [ ] No spaces or special characters in filenames

### After Uploading
- [ ] All 14 images are in `/public/images/products/`
- [ ] File names are correct (exactly as specified)
- [ ] No duplicate files
- [ ] Permissions allow web server to read files

### Testing
- [ ] Development server starts without errors
- [ ] `/products` page loads all images
- [ ] Each product detail page displays image
- [ ] Images display correctly on mobile devices
- [ ] Images are responsive and scale properly
- [ ] No broken image icons (404 errors)
- [ ] Page load time is acceptable (< 3 seconds)
- [ ] Browser DevTools shows no 404 errors for images

## Troubleshooting

### Images Not Displaying

**Problem**: Broken image icon appears instead of image

**Solutions**:
1. Verify filename spelling exactly matches
   - Should be: `caddy-cart01.jpg` (lowercase, no spaces)
   - Check in File Explorer

2. Verify path is correct
   - Should be: `/images/products/caddy-cart01.jpg` in code
   - Should be: `C:\Users\lonewolf\club-caddy-v1\public\images\products\` on disk

3. Check file permissions
   - Right-click image → Properties
   - Ensure "Read" permission is enabled

4. Restart development server
   ```bash
   # Stop current server (Ctrl+C)
   # Restart with:
   npm run dev
   ```

5. Clear Next.js cache
   ```bash
   rm -r .next
   npm run dev
   ```

### Images Load Slowly

**Problem**: Images take a long time to display

**Solutions**:
1. Verify image file sizes (should be < 300 KB)
   - Use TinyJPG or Compressor.io if too large

2. Check image dimensions
   - Should be exactly 1200 x 900 or larger
   - Not larger than 2400 x 1800

3. Enable image optimization in Next.js
   - Already configured in `next.config.js`
   - No additional changes needed

### Image Quality Issues

**Problem**: Image is blurry or pixelated

**Solutions**:
1. Use higher resolution source image
   - Minimum: 1200 x 900 pixels
   - Better: 1600 x 1200 pixels

2. Increase JPEG quality
   - Use 90% quality instead of 85%
   - File size will be slightly larger but acceptable

3. Verify original source image quality
   - May need to re-download from stock photo service
   - Select "high resolution" option

## Advanced: Image Optimization

### Recommended Tools by Use Case

**For Quick Optimization**:
- TinyJPG or Compressor.io (online, no installation)
- Paint.net (desktop, free)

**For Batch Processing**:
- XnConvert (desktop, handles 14 images easily)
- ImageMagick (command line, most powerful)

**For Professional Results**:
- Adobe Photoshop (premium, most features)
- GIMP (free, powerful alternative to Photoshop)

### WebP Format (Advanced)

For even better optimization, consider using WebP format:

1. Convert JPEG to WebP using online tools
2. Name as: `caddy-cart01.webp`
3. Update image references in code
4. Verify browser compatibility (modern browsers support)

WebP can reduce file size by 25-35% while maintaining quality.

## Resources

- **Image Optimization**: https://tinyjpg.com
- **Stock Photos**: https://unsplash.com, https://pexels.com
- **Edit Images**: https://www.photopea.com (online Photoshop)
- **Next.js Image Optimization**: https://nextjs.org/docs/basic-features/image-optimization

## Next Steps

1. Gather or source all 14 golf cart images
2. Optimize images using recommended tools
3. Place images in `/public/images/products/` directory
4. Test image display on products page
5. Verify responsive design on mobile devices
6. Monitor page load performance

Once all images are in place, the product catalog will be fully functional!
