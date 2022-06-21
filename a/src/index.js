import pdfjs from "pdfjs-dist";
import {PageFlip} from "page-flip";

//global worker, it makes the pdf rendering faster
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

let currPage = 0;
let allPagesNum;
// creates pdf viewer and page flip 
handlePdf()


function handlePdf(){
    pdfjs.getDocument("./catalogoBlueL.pdf").promise.then((pdf) => pdf.getPage(1).then((page) => handlePages(page, pdf)));
}


function handlePages(page, pdf) {
  
  var viewport = page.getViewport({scale:1});

  const canvasPage = createCanvasPage();
  appendPageToBook(canvasPage)

  page.render({ canvasContext: canvasPage.getContext("2d"), viewport: viewport });
  loopForAllPdfPages(pdf)
}

function createCanvasPage(){
    var canvasPage = document.createElement("canvas");
    canvasPage.style.display = "block";
    canvasPage.height = 800;
    canvasPage.width = 600;
    canvasPage.classList.add("page")
    canvasPage.style={zIndex:"1"}
    return canvasPage
}

function loopForAllPdfPages(pdf){
    allPagesNum = pdf.numPages
    currPage++;
    if (pdf != undefined && pdf !== null && currPage <= allPagesNum) {
        pdf.getPage(currPage).then((page) => handlePages(page, pdf));
      }else{
        createPageFlip()
      }
}

function appendPageToBook(canvasPage){
    document.getElementById("book").appendChild(canvasPage)
}

function createPageFlip(){



    var widthView = Number(window.innerWidth / 6)
    var heightView = parseInt(widthView * 1.6);
    const pageFlip = new PageFlip(document.getElementById("book"),{width: widthView,height: heightView ,maxHeight:800,maxWidth:1100,usePortrait:true,showCover:true})
    let teste = document.querySelectorAll(".page")
    pageFlip.loadFromHTML(teste);
    createButtonListeningForcingFlipNext(pageFlip)
    createButtonListeningForcingFlipPrevious(pageFlip)
    createButtonListeningTurnPageTo(pageFlip)

    loader()
}

function createButtonListeningForcingFlipNext(pageFlip){
    document.getElementById("buttonN").addEventListener("click",() => pageFlip.flipNext())
}
function createButtonListeningForcingFlipPrevious(pageFlip){
    document.getElementById("buttonP").addEventListener("click",() => pageFlip.flipPrev())
}
function createButtonListeningTurnPageTo(pageFlip){
    document.getElementById("Home").addEventListener("click",() => pageFlip.turnToPage(0))
}


/* Loader */

function loader(){
    var loaderDiv = document.getElementById('Loader')
    loaderDiv.style.display = "none"
}