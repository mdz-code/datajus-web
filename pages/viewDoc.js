import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { Document, Page, pdfjs } from 'react-pdf'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { useState } from 'react'

import Header from '../components/headers/Header'
import Button from '../components/buttons/Button'

export default function ViewDoc({ pdf }) {

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [showModal, setModal] = useState(false)

  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const dataModal = {
        value: showModal,
        setValue: setModal
    }

    return (
        <div className="w-full">
            {showModal && <div className="w-full min-h-screen bg-black opacity-50 overflow-x-hidden overflow-y-auto fixed z-49"></div>}
            <Header/>
            <div className="flex flex-col items-center py-6">
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={350} />
                </Document>
            </div>
            <div className="w-full">
                <Button data={dataModal} infos={{type: 'modal'}} type="action">Próximo</Button>
            </div>
            {showModal && <Signer/>}
        </div>
    )
}

function Signer() {

    return(
        <div className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="justify-center items-center flex flex-col w-full bg-white rounded-t-xl">
                <div className="mt-12">
                    <h1>Assinador</h1>
                </div>
                <div className="mt-6">
                    <h1>Assinador</h1>
                </div>
                <div className="mt-8 mb-4">
                    <h1>Assinador</h1>
                </div>
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