import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Base64Tool() {
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');
    const [isDecoding, setIsDecoding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOutputVisible, setIsOutputVisible] = useState(false);

    const handleInputChange = (event) => {
        setInputData(event.target.value.trim()); // Remove leading and trailing spaces
        setIsDecoding(isBase64Encoded(event.target.value.trim()));
    };

    const autoPasteFromClipboard = async () => {
        const clipboardData = await navigator.clipboard.readText();
        setInputData(clipboardData.trim()); // Remove leading and trailing spaces
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
        <div className="w-full max-w-screen-md mx-auto mt-10 p-5 rounded-lg bg-gray-100 shadow-lg">
            <AnimatePresence>
                {!isOutputVisible && (
                    <textarea
                        placeholder="Enter data to encode/decode..."
                        value={inputData}
                        onChange={handleInputChange}
                        rows={10}
                        className="w-full border rounded-none p-2 mb-3 border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            </AnimatePresence>
            <div className='flex gap-3'>
                <motion.button
                    className="w-full bg-blue-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-nonefocus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleButtonClick}
                >
                    {isDecoding ? 'Decode' : 'Encode'}
                </motion.button>
                <motion.button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-nonefocus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={autoPasteFromClipboard}
                >
                    Auto Paste
                </motion.button>
                <motion.button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-nonefocus:outline-none"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.navigator.clipboard.writeText(outputData)}
                >
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
                        className="w-full border rounded-none p-2 mt-3 border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            </AnimatePresence>

            <div className="flex justify-end mt-3">
                {isOutputVisible && (<button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-nonefocus:outline-none"
                    onClick={toggleVisibility}
                >
                    {/* {isOutputVisible  "Show Input"} */}
                    Show Input
                </button>)}
            </div>
        </div>
    );
}

export default Base64Tool;
