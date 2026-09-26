// components/ImageUploader.jsx
// Handles selecting multiple images, previewing them, and removing before upload
import { useRef } from 'react';
import './ImageUploader.css';

const MAX_IMAGES = 6;

// existingImages: URLs already saved on the product (edit mode)
// newFiles: File[] selected locally, not yet uploaded
const ImageUploader = ({ existingImages = [], newFiles = [], onFilesChange, onRemoveExisting }) => {
  const inputRef = useRef(null);
  const totalCount = existingImages.length + newFiles.length;

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - totalCount;
    if (remainingSlots <= 0) return;
    onFilesChange([...newFiles, ...selected.slice(0, remainingSlots)]);
    e.target.value = ''; // reset input so same file can be re-selected if removed
  };

  const removeNewFile = (index) => {
    onFilesChange(newFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      <div className="image-preview-grid">
        {existingImages.map((url) => (
          <div className="image-preview" key={url}>
            <img src={url} alt="Product" />
            <button type="button" className="remove-btn" onClick={() => onRemoveExisting(url)}>
              ×
            </button>
          </div>
        ))}

        {newFiles.map((file, idx) => (
          <div className="image-preview" key={`${file.name}-${idx}`}>
            <img src={URL.createObjectURL(file)} alt="Preview" />
            <button type="button" className="remove-btn" onClick={() => removeNewFile(idx)}>
              ×
            </button>
          </div>
        ))}

        {totalCount < MAX_IMAGES && (
          <button type="button" className="image-add-btn" onClick={() => inputRef.current?.click()}>
            <span>+</span>
            <small>Add Photo</small>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileSelect}
      />
      <p className="image-uploader-hint">{totalCount}/{MAX_IMAGES} images added</p>
    </div>
  );
};

export default ImageUploader;
