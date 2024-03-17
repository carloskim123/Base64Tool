import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Base64Tool() {
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');
    const [isDecoding, setIsDecoding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOutputVisible, setIsOutputVisible] = useState(false);

    const handleInputChange = (event) => {
        setInputData(event.target.value);
        setIsDecoding(isBase64Encoded(event.target.value.trim()));
    };

    const autoPasteFromClipboard = async () => {
        const clipboardData = await navigator.clipboard.readText();
        setInputData(clipboardData.trim());
        setIsDecoding(isBase64Encoded(clipboardData.trim()));
    }

    const handleButtonClick = () => {
        if (inputData.trim().length >= 20) {
            setIsLoading(true);
            setTimeout(() => {
                if (isDecoding) {
                    setOutputData(atob(inputData));
                } else {
                    setOutputData(btoa(inputData));
                }
                setIsOutputVisible(true);
                setIsLoading(false);
            }, 1500);
        } else {
            alert("Input must have at least 20 characters of non-space text.");
        }
    };

    const isBase64Encoded = (str) => {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    };

    const toggleVisibility = () => {
        setIsOutputVisible(!isOutputVisible);
    };

    return (
        <div className="w-full max-w-screen-md mx-auto mt-10 p-5 rounded-lg  shadow-none">
            <AnimatePresence>
                {!isOutputVisible && (
                    <textarea
                        placeholder="Enter data to encode/decode..."
                        value={inputData}
                        onChange={handleInputChange}
                        rows={10}
                        className="w-full text-white border-black border-[2px] rounded-none p-2 mb-3 bg-transparent focus:border-black outline-none"
                        style={{ backdropFilter: 'blur(100px)' }} />

                )}
            </AnimatePresence>
            <div className='flex gap-3'>
                <motion.button
                    className="w-full text-white border-black border-[2px] font-bold py-2 px-4 rounded-none focus:outline-none bg-blur"
                    // whileHover={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleButtonClick}
                    style={{ backdropFilter: 'blur(90px)' }}>
                    {isDecoding ? 'Decode' : 'Encode'}
                </motion.button>
                <motion.button
                    className="w-full text-white border-black border-[2px] font-bold py-2 px-4 rounded-none focus:outline-none "
                    // whileHover={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: 0.9 }}
                    onClick={autoPasteFromClipboard}
                    style={{ backdropFilter: 'blur(20px)' }}>

                    Auto Paste
                </motion.button>
                <motion.button
                    className="w-full text-white border-black border-[2px] font-bold py-2 px-4 rounded-none focus:outline-none "

                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.navigator.clipboard.writeText(outputData)}
                    style={{ backdropFilter: 'blur(20px)' }}>

                    Copy Output
                </motion.button>
            </div>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="h-1 mt-4 bg-blue-500 rounded-md overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 1.5 }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOutputVisible && (
                    <textarea
                        placeholder="Result..."
                        value={outputData}
                        readOnly
                        rows={10}
                        className="mt-4 w-full text-white border-black border-[2px] rounded-none p-2 mb-3 bg-transparent focus:border-black outline-none"
                        style={{ backdropFilter: 'blur(100px)' }}

                    />
                )}
            </AnimatePresence>

            <div className="flex justify-end mt-3">
                {isOutputVisible && (<button
                    className="text-white border-black border-[2px] font-bold py-2 px-4 rounded-none focus:outline-none bg-blur"
                    onClick={toggleVisibility}
                >
                    Show Input
                </button>)}
            </div>
        </div>
    );
}

export default Base64Tool;
