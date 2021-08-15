import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { Document, Page, pdfjs } from 'react-pdf'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { useState } from 'react'

export default function ViewDoc({ pdf }) {

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <div>
            <h1>Viewr</h1>
            <div className="flex flex-col items-center justify-center py-5 bg-gray-200">
                <Document
                    file={pdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                <Page pageNumber={pageNumber} width={400} />
                </Document>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const { contractId, onBoardingId, signerId } = parseCookies(context)

    const response = await axios({
        method: 'GET',
        url: `https://datajus-apis.herokuapp.com/getDocument/${contractId}`
    })

    return {
        props: {
            pdf: response.data
        }
    }

}