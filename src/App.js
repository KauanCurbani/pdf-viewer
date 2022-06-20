import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import catalogoBLue from "./catalogoBlueL.pdf";
import "./style.css";

import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdReturnRight,
  IoMdReturnLeft,
} from "react-icons/io";

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function toStart() {
    setPageNumber(1);
  }
  function toEnd() {
    setPageNumber(numPages);
  }

  function pageNext() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    } else {
      setNumPages(pageNumber);
    }
  }

  function pageInput() {
    var input = document.querySelector(".page-input").value;

    setPageNumber(Number(input));
  }

  function pagePrevious() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else setPageNumber(pageNumber);
  }
  return (
    <div className="App">
      <div class="pdf-viewer">
        <Document file={catalogoBLue} onLoadSuccess={onDocumentLoadSuccess}>
          <Page loading="Carregando Pagina..." pageIndex={1} height="500" id="pages" pageNumber={pageNumber} />
        </Document>
        <p className="pagenumbers">
          Pagina {pageNumber} de {numPages}
        </p>
      </div>
      <div class="navigation">
        <div className="inputs">
          <button onClick={toStart}>
            <IoMdReturnLeft />
          </button>
          <button className="previous-button" onClick={pagePrevious}>
            <IoIosArrowBack />
          </button>
          <input
            className="page-input"
            type="number"
            min="1"
            max={numPages}
            onKeyUp={pageInput}
            placeholder={pageNumber}
          ></input>
          <button className="next-button" onClick={pageNext}>
            <IoIosArrowForward />
          </button>
          <button onClick={toEnd}>
            <IoMdReturnRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
