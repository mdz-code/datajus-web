import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { Document, Page, pdfjs } from 'react-pdf'
import { parseCookies } from 'nookies'
import axios from 'axios'
import { useState } from 'react'

import Header from '../components/headers/Header'
import Button from '../components/buttons/Button'

export default function ViewDoc({ pdf, contractId, signerId }) {

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
            <Header />
            {showModal ? (<div className="flex flex-col items-center py-6 opacity-50">
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={350} />
                </Document>
            </div>) : <div className="flex flex-col items-center py-6">
                <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} width={350} />
                </Document>
            </div>}
            <div className="py-4">
                <Button data={dataModal} infos={{ type: 'modal' }} type="action">Próximo</Button>
            </div>
            {showModal && <Signer contractId={contractId} signerId={signerId} />}
        </div>
    )
}

function Signer({ contractId, signerId }) {

    const [isModal, setIsModal] = useState(true)
    const [colorButton, setColorButton] = useState({ type: 'color', style: 'h-5 w-5 bg-black rounded-full', color: 'black' })
    const [fontButton, setFontButton] = useState({ type: 'font', style: 'h-5 w-h text-sm text-gray-400', font: 'sans' })
    const [optionButton, setOptionButton] = useState(null)
    const [confirmationScreen, setConfirmationScreen] = useState(false)

    const [signatureText, setSignatureText] = useState('')

    const signatureData = {
        value: signatureText,
        setValue: setSignatureText
    }

    const data = {
        value: confirmationScreen,
        setValue: setConfirmationScreen
    }

    const buttonsSetStyles = {
        color: setColorButton,
        font: setFontButton
    }

    const confirmationData = {
        config: { color: colorButton.color, font: fontButton.font },
        contractId,
        signerId,
        source: signatureText
    }


    return (
        <div>
            {confirmationScreen ? <ConfirmationModal data={confirmationData} /> : isModal ? (
                <div className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                    <div className="justify-center items-center flex flex-col w-full bg-white rounded-t-3xl">
                        <div className="mt-12 flex w-full px-4 space-x-4">
                            <ButtonSelect setValue={setIsModal} value={isModal} type={colorButton} setOption={setOptionButton} />
                            <ButtonSelect setValue={setIsModal} value={isModal} type={fontButton} setOption={setOptionButton} />
                        </div>
                        <div className="mt-6 w-full mx-4">
                            <InputArea data={signatureData} />
                        </div>
                        <div className="w-full mt-8 mb-4">
                            <div className="w-full">
                                <Button infos={{ type: 'modal' }} data={data} type="action">Enviar Assinatura</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : optionButton === 'color' ? <ButtonChoice setValue={setIsModal} modalValue={isModal} option={optionButton} setOption={buttonsSetStyles} /> : <ButtonChoice setValue={setIsModal} modalValue={isModal} option={optionButton} setOption={buttonsSetStyles} />}

        </div>
    )
}

function ConfirmationModal({ data }) {

    const [allowDownload, setAllowDownload] = useState(false)

    const allowData = {
        value: allowDownload,
        setValue: setAllowDownload
    }

    return (
        <div className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            
                {
                    allowDownload ? (
                        <div className="bg-green-50 m-4 space-y-3 p-3 rounded-xl">
                            <div className="space-y-2">
                                <h1 className="text-green-700 font-medium">Seu documento foi assinado com sucesso!</h1>
                                <h2 className="text-green-600">Faça o download do documento assinado</h2>
                            </div>
                            <Button infos={{ type: 'download' }} data={data.contractId} type="download">Baixar documento</Button>
                        </div>
                    ) : (
                        <div className="justify-center items-center flex flex-col w-full bg-white rounded-t-3xl space-y-8">
                        <div className="space-y-4">
                            <div className="flex pt-12 space-x-4">
                                <input className="form-checkbox text-blue-500" type="checkbox" />
                                <h3 className="text-xs">Confirmo que li e aceito os termos e condições de uso.</h3>
                            </div>
                            <div className="w-full pb-4">
                                <Button infos={{ type: 'signature' }} data={data} transaction={allowData} type="action">Aceitar</Button>
                            </div>
                        </div>
                        </div>
                    )
                }
            
        </div>
    )
}

function ButtonChoice({ option, setOption, modalValue, setValue }) {

    const objectStyle = {
        color: {
            black: 'h-5 w-5 bg-black rounded-full',
            blue: 'h-5 w-5 bg-blue-800 rounded-full',
            red: 'h-5 w-5 bg-red-700 rounded-full',
        },
        font: {
            sans: 'h-5 w-h text-sm text-gray-400 font-sans',
            serif: 'h-5 w-h text-sm text-gray-400 font-serif',
            mono: 'h-5 w-h text-sm text-gray-400 font-mono'
        }
    }

    const seOptionFunction = setOption[option]

    function ClickEvent(event) {
        const { value } = event.currentTarget

        // Close option Modal
        setValue(!modalValue)

        // Change Option Style
        const optionStyle = objectStyle[option]
        const optionObject = { type: option, style: optionStyle[value] }
        optionObject[option] = value
        console.log(optionObject)
        seOptionFunction(optionObject)
    }



    return (
        <div className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="justify-center items-center flex flex-col w-full bg-white rounded-t-3xl">
                {option === 'color' ? (<div className="space-y-8 py-12">
                    <h2 className="text-gray-800 text-center">Escolha a cor da assinatura:</h2>
                    <div className="flex items-center justify-center space-x-8">
                        <button value="black" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg w-11">
                            <div className="h-5 w-5 bg-black rounded-full"></div>
                        </button>
                        <button value="blue" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg w-11">
                            <div className="h-5 w-5 bg-blue-800 rounded-full"></div>
                        </button>
                        <button value="red" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg w-11">
                            <div className="h-5 w-5 bg-red-700 rounded-full"></div>
                        </button>
                    </div>
                </div>) : <div className="space-y-8 py-12">
                    <h2 className="text-gray-800 text-center">Escolha a fonte da assinatura:</h2>
                    <div className="flex items-center justify-center space-x-8">
                        <button value="sans" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg">
                            <h1 className="h-5 w-h text-sm text-gray-400 font-sans">Sans-serif</h1>
                        </button>
                        <button value="serif" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg">
                            <h1 className="h-5 w-h text-sm text-gray-400 font-serif">Serif</h1>
                        </button>
                        <button value="mono" onClick={ClickEvent} className="bg-gray-100 p-3 rounded-lg">
                            <h1 className="h-5 w-h text-sm text-gray-400 font-mono">Monospaced</h1>
                        </button>
                    </div>
                </div>}

            </div>
        </div>

    )
}

function ButtonSelect({ type, setOption, value, setValue }) {


    function ClickEvent() {
        console.log(type)
        // console.log('fechar modal maior')
        setValue(!value)
        setOption(type.type)
    }

    return (
        <div>
            <button onClick={ClickEvent} className="bg-gray-100 px-4 py-4 rounded-lg flex space-x-3">
                {type.type === 'color' ? <div className={type.style}></div> : <h1 className={type.style}>Trocar fonte</h1>}
                <div className="py-1.5">
                    <svg width="12" height="8" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.59368 0.289343C1.3155 -0.0182278 0.840012 -0.0426531 0.531632 0.234787C0.223253 0.512228 0.198763 0.986473 0.476934 1.29404L4.47295 5.71241C4.77229 6.04339 5.29328 6.04248 5.59146 5.71046L9.52481 1.33066C9.8019 1.02212 9.77575 0.547965 9.46639 0.271602C9.15704 -0.00476013 8.68164 0.0213247 8.40455 0.329864L5.32592 3.75793C5.16735 3.93449 4.89083 3.93497 4.73165 3.75897L1.59368 0.289343Z" fill="#6B7280" />
                    </svg>
                </div>
            </button>
        </div>

    )
}


function InputArea({ data }) {

    const { value, setValue } = data

    function getSignatureText(event) {
        const { value } = event.target
        setValue(value)
    }

    return (
        <div className=" flex flex-col items-center justify-center mx-4">
            <input onChange={getSignatureText} value={value} className="bg-gray-100 w-full text-center py-24 outline-none text-gray-400 text-lg" placeholder="Clique para digitar" />
            <div className="w-4/5 bg-gray-300 h-0.5 absolute mt-36 rounded-t-full" />
        </div>
    )
}
export async function getServerSideProps(context) {

    const { contractId, onBoardingId, signerId } = parseCookies(context)

    const response = await axios({
        method: 'GET',
        url: `https://datajus-apis.herokuapp.com/getDocument/${contractId}/false`
    })

    return {
        props: {
            pdf: response.data,
            contractId: contractId,
            signerId: signerId
        }
    }

}