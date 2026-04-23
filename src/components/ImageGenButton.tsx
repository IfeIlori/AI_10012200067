import React, { useState } from "react";
import { generateImage } from "../utils/imageGen";

interface ImageGenButtonProps {
  prompt: string;
}

const ImageGenButton: React.FC<ImageGenButtonProps> = ({ prompt }) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const url = await generateImage(prompt);
    setImgUrl(url);
    setLoading(false);
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: "7px 18px",
          borderRadius: 8,
          border: "none",
          background: "#0AAFAF",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 15,
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imgUrl && (
        <div style={{ marginTop: 12 }}>
          <img
            src={imgUrl}
            alt={prompt}
            style={{
              maxWidth: 320,
              borderRadius: 10,
              boxShadow: "0 2px 12px rgba(0,0,0,.12)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenButton;
