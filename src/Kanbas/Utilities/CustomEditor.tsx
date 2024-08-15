import React, { useRef, useState } from 'react';

const CustomEditor = () => {
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    const execCommand = (command: any) => {
        document.execCommand(command, false, '');
    };

    const handleInput = () => {
        if (editorRef.current) {
            setContent((editorRef.current as HTMLElement).innerHTML);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => execCommand('bold')} role="button" className='fw-semibold fs-4 btn'>B</button>
                <button onClick={() => execCommand('italic')} role="button" className='fst-italic fs-4 btn'>I</button>
                <button onClick={() => execCommand('underline')} role="button" className='fs-4 btn'><u>U</u></button>
                {/* Add more buttons for other commands */}
            </div>
            <div className="form-control" 
                ref={editorRef}
                contentEditable
                style={{
                    border: '1px solid #ccc',
                    minHeight: '200px',
                    padding: '10px'
                }}
                onInput={handleInput}
            >
            </div>
        </div>
    );
};

export default CustomEditor;
