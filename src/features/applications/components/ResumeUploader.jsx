import { useState, useCallback, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../../../config/constants";
import Button from "../../../components/ui/Button";

export default function ResumeUploader({ onFileSelect, existingResume }) {
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    setFileError("");
    const file = files[0];
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError("Please upload a PDF or DOCX file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be less than 5MB.");
      return;
    }

    setFileName(file.name);
    if (onFileSelect) onFileSelect(file);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(Array.from(e.dataTransfer.files));
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e) => {
      handleFiles(Array.from(e.target.files));
    },
    [onFileSelect]
  );

  const clearFile = () => {
    setFileName("");
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      {existingResume ? (
        <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium">Resume Uploaded</p>
              <p className="text-sm text-gray-600">{existingResume}</p>
            </div>
          </div>
          <button
            onClick={clearFile}
            className="rounded-md p-1 hover:bg-gray-100"
            aria-label="Remove resume"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? "border-primary-500 bg-primary-50 scale-105"
              : "border-gray-300 hover:border-primary-500 hover:bg-gray-50"}
          `}
        >
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <div className="mt-3">
            <label className="cursor-pointer">
              <span className="font-medium text-primary-600">
                Upload a resume
              </span>
              <span className="text-gray-500"> or drag and drop</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PDF or DOCX up to 5MB
          </p>
        </div>
      )}

      {fileName && (
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-gray-500" />
          <span>{fileName}</span>
        </div>
      )}

      {fileError && (
        <p className="text-sm text-red-500">{fileError}</p>
      )}

      {fileName && (
        <Button
          variant="secondary"
          size="sm"
          onClick={clearFile}
        >
          Remove
        </Button>
      )}
    </div>
  );
}
