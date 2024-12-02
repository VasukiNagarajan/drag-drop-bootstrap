import React from "react";
import { Card, Table } from "react-bootstrap";
import wordImg from "../assets/word.png";
import txtImg from "../assets/txt-file.png";
import xlsImg from "../assets/xls.png";
import "../../src/styles.css";

const FilePreview = ({ file, content, searchTerm }) => {
  // Highlight search terms in table content
  const tableContent = (cell) => {
    if (!searchTerm || typeof cell !== "string") return cell;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return cell.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const extension = file.name.split(".").pop().toLowerCase();
  const isExcel = extension === "xls" || extension === "xlsx";
  const isWord = extension === "doc" || extension === "docx";
  const isText = extension === "txt";

  return (
    <Card className="p-3 mt-5">
      <Card.Title>
        {/* Images set for document */}
        {isText && <img className="icon-small" src={txtImg} alt="" />}
        {isExcel && <img className="icon-small" src={xlsImg} alt="" />}
        {isWord && <img className="icon-small" src={wordImg} alt="" />}
        Preview: {file.name}
      </Card.Title>
      <Card.Text as="div">
        {/* Render rows and colums if it is Excel Files */}
        {isExcel && Array.isArray(content) && (
          <Table striped bordered hover>
            <thead>
              <tr>
                {content[0].map((header, index) => (
                  <th key={index}>{header || `Column ${index + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      dangerouslySetInnerHTML={{
                        __html: tableContent(String(cell || "")),
                      }}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Render for Word/txt Text Files */}
        {!isExcel && (
          <div
            dangerouslySetInnerHTML={{
              __html: searchTerm
                ? content.replace(
                    new RegExp(`(${searchTerm})`, "gi"),
                    (match) => `<mark>${match}</mark>`
                  )
                : content,
            }}
            style={{ whiteSpace: "pre-wrap" }}
          ></div>
        )}
      </Card.Text>
    </Card>
  );
};

export default FilePreview;