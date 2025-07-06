// src/components/ImageUploader.tsx
import React, { useState } from "react";
import { CrossIcon, DeleteIcon, Image as ImageIcon, Trash } from "lucide-react";
import { uploadImage, deleteImage } from "@/services/MediaApi";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  disabled?: boolean;
}

const ImageUploader = ({ onImageUploaded, disabled }: ImageUploaderProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const { id, url, name } = await uploadImage(file);

      setFileName(file.name); // sử dụng `name` thay vì `file.name`
      setImageId(id);
      onImageUploaded(url);

      toast({
        title: "Tải ảnh thành công",
        description: "Ảnh đã sẵn sàng để sử dụng.",
      });
    } catch (err) {
      toast({
        title: "Lỗi tải ảnh",
        description: "Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageId) return;
    try {
      await deleteImage(imageId);
      setFileName(null);
      setImageId(null);
      onImageUploaded(""); // clear URL
      toast({
        title: "Đã xoá ảnh",
        description: "Bạn có thể chọn ảnh mới.",
      });
    } catch {
      toast({
        title: "Xoá ảnh thất bại",
        description: "Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={loading || disabled}
      />

      <label
        htmlFor="upload-image"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md cursor-pointer hover:bg-green-200 transition"
      >
        <ImageIcon className="w-4 h-4" />
        {loading ? "Đang tải ảnh..." : "Thêm ảnh"}
      </label>

      {fileName && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          📁 {fileName}
          <button
            onClick={handleDelete}
            className="text-red-500 underline hover:text-red-700"
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
