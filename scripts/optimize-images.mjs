import sharp from "sharp";
import fs from "fs";
import path from "path";

const rootDir = "C:\\Users\\Benjamin\\Desktop\\ssotta-website-ready";

const targets = [
  // public/hd-images
  {
    dir: path.join(rootDir, "public", "hd-images"),
    files: ["img-1.png", "img-2.png", "img-3.png", "img-4.png"],
    type: "png",
    options: { quality: 75, palette: true, effort: 10 }
  },
  {
    dir: path.join(rootDir, "public", "hd-images"),
    files: ["manager.jpg"],
    type: "jpg",
    options: { quality: 80, progressive: true }
  },
  // public/ root
  {
    dir: path.join(rootDir, "public"),
    files: ["kids-riding-uganda-01.png", "kids-riding-uganda-02.png"],
    type: "png",
    options: { quality: 75, palette: true, effort: 10 }
  },
  {
    dir: path.join(rootDir, "public"),
    files: ["favicon.png"],
    type: "png",
    resize: { width: 64, height: 64 },
    options: { quality: 85, palette: true }
  },
  // src/assets
  {
    dir: path.join(rootDir, "src", "assets"),
    files: [
      "carrier-bike.png",
      "mountain-bike.png",
      "hero-dirt-road.png",
      "kids-bikes.png",
      "city-commuter.png",
      "showroom.png",
      "workshop.png",
      "spare-parts.png",
      "road-cycling.png",
      "cargo-rental.png",
      "ChatGPT_Image_May_25,_2026,_01_28_35_PM_1780641993032.png"
    ],
    type: "png",
    options: { quality: 75, palette: true, effort: 10 }
  },
  // src/assets/brand
  {
    dir: path.join(rootDir, "src", "assets", "brand"),
    files: [
      "ssotta-logo-original.png",
      "ssotta-logo-full.png",
      "ssotta-helmet.png",
      "ssotta-wordmark.png"
    ],
    type: "png",
    options: { quality: 80, palette: true }
  }
];

async function run() {
  console.log("Starting image optimization...");
  for (const target of targets) {
    for (const file of target.files) {
      const filePath = path.join(target.dir, file);
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }

      const tempPath = filePath + ".tmp";
      const stats = fs.statSync(filePath);
      const originalSizeKB = (stats.size / 1024).toFixed(1);

      try {
        let pipeline = sharp(filePath);
        if (target.resize) {
          pipeline = pipeline.resize(target.resize);
        }

        if (target.type === "png") {
          pipeline = pipeline.png(target.options);
        } else if (target.type === "jpg") {
          pipeline = pipeline.jpeg(target.options);
        }

        await pipeline.toFile(tempPath);
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        const newStats = fs.statSync(filePath);
        const newSizeKB = (newStats.size / 1024).toFixed(1);
        const ratio = ((1 - newStats.size / stats.size) * 100).toFixed(0);

        console.log(`Optimized ${file}: ${originalSizeKB} KB -> ${newSizeKB} KB (-${ratio}%)`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }
  }
  console.log("Image optimization complete.");
}

run();
