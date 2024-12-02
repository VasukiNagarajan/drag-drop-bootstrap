import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import mammoth from "mammoth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../src/styles.css';
import documentImg from '../assets/document.png';

const DropFileArea = ({ onFileUpload }) => {
  const [error, setError] = useState("");

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = async (file) => {
    if (!file) return;
    const supportedFormats = ["doc", "docx", "txt", "xls", "xlsx"];
    const extension = file.name.split(".").pop().toLowerCase();

    if (!supportedFormats.includes(extension)) {
      setError("Unsupported file type!");
      toast.error("Unsupported file type!")
      return;
    }

    setError("");

    let content = "";
    if (extension === "txt") {
      content = await file.text();
    } else if (extension === "doc" || extension === "docx") {
      content = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: content });
      content = result.value;
    } else if (extension === "xls" || extension === "xlsx") {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName]

      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      content = rows;
    } 
    onFileUpload(file, content);
  };

  return (
    <Card
      className="p-4 text-center"
      id= "border-dashed"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <Form.Group controlId="fileUpload">
        <Form.Label id="drop-place">
          <img className="icon-small" src={documentImg} alt=""/>
          <strong>Drag & Drop your file here</strong> 
          <p>(OR)</p>
          <Form.Control
            type="file"
            className="d-inline"
            onChange={handleFileSelect}
            style={{ display: "inline", width: "auto" }}
          />
        </Form.Label>
      </Form.Group>
      {error && <p className="text-danger mt-2">{error}</p>}
    </Card>
  );
};

export default DropFileArea;
