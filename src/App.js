import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DropFileArea from "./components/DropFileArea";
import PreviewFiles from "./components/PreviewFile";
import SearchBar from "./components/SearchBar";
import uploadImg from './assets/upload.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileUpload = (file, content) => {
    setFile(file);
    setFileContent(content);
    toast.success("File uploaded successfully!");
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (!term) toast.info("Search cleared.");
  };

  return (
    <Container className="mt-5">
      <h1 id="title-content" className="text-center">
        <img src={uploadImg} alt=""/>
        Upload Files and Search
        </h1>
      <DropFileArea onFileUpload={handleFileUpload} />
      <SearchBar onSearchChange={handleSearchChange} />
      {file && (
        <PreviewFiles file={file} content={fileContent} searchTerm={searchTerm} />
      )}
      <ToastContainer />
    </Container>
  );
};

export default App;