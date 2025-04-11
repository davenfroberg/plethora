import { useState } from "react";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";

function Files() {
  const [files, setFiles] = useState([
    {
      name: "Documents",
      isDirectory: true, // Folder
      path: "/Documents", // Located in Root directory
      updatedAt: "2024-09-09T10:30:00Z", // Last updated time
    },
    {
      name: "Pictures",
      isDirectory: true,
      path: "/Pictures", // Located in Root directory as well
      updatedAt: "2024-09-09T11:00:00Z",
    },
    {
      name: "Picture.png",
      isDirectory: false, // File
      path: "/Pictures/Picture.png", // Located inside the "Pictures" folder
      updatedAt: "2024-09-08T16:45:00Z",
      size: 2048, // File size in bytes (example: 2 KB)
    },
  ]);

  const onDownload = (files) => {
    console.log("Download files:", files);
  };
  
  return (
    <>
      <FileManager
        files={files} 
        onDownload={onDownload} 
        enableFilePreview={false} 
        filePreviewPath="https://example.com"
        layout="list"
      />;
    </>
  );
}

export default Files;