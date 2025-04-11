import { useState, useEffect } from "react";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";

function Files() {
  const [files, setFiles] = useState([]);
  
  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const data = await response.json();
      const transformedFiles = data.map(file => ({
        name: file.file_name,
        path: file.file_path,
        updatedAt: file.upload_date,
        isDirectory: file.is_directory,
        size: file.size
      }));
      setFiles(transformedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const onDownload = (files) => {
    console.log("Download files:", files);
  };

  const onCreateFolder = async (folderName, parentFolder) => {
    const newFolder = {
      name: folderName,
      isDirectory: true,
      path: parentFolder ? `${parentFolder.path}/${folderName}` : `/${folderName}`,
      updatedAt: new Date().toISOString(),
    };

    setFiles([...files, newFolder]);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`  
        },
        body: JSON.stringify({
          filename: folderName,
          filepath: parentFolder ? `${parentFolder.path}/${folderName}` : `/${folderName}`,
          size: 0,
          isDirectory: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create folder');
      }

    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const onRefresh = () => {
    console.log("current files:", files);
  };

  const onDelete = async (filesToDelete) => {
    try {
      for (const f of filesToDelete) { 
        const response = await fetch('/api/files', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            filename: f.name,
            filepath: f.path
          })
        });

        if (!response.ok) {
          throw new Error('Failed to delete file');
        }
      }
      
      await fetchFiles();
    } catch (error) { 
      console.error('Error deleting files:', error);
    }
  };

  const onFileUploading = async (file, parentFolder) => {
    console.log('File uploading:', file);
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        filename: file.name,
        filepath: parentFolder ? `${parentFolder.path}/${file.name}` : `/${file.name}`,
        size: file.size,
        isDirectory: false
      })
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
  };

  const onFileUploaded = async (file) => {
    console.log('File uploaded:', file);
    await fetchFiles();
  };
  
  return (
    <>
      <FileManager
        key={files.length}
        files={files} 
        onDownload={onDownload} 
        enableFilePreview={false} 
        filePreviewPath="https://example.com"
        layout="list"
        onCreateFolder={onCreateFolder}
        onDelete={onDelete}
        onRefresh={onRefresh}
        primaryColor="#007bff"
        onFileUploaded={onFileUploaded}
        onFileUploading={onFileUploading}
        fileUploadConfig={{
          url: 'http://localhost:5173/api/files/upload',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }}
      />
    </>
  );
}

export default Files;