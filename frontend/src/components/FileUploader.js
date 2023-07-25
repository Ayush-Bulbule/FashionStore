import React, { useRef } from 'react'


const FileUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        const fsize = Math.round((file.size / 1024));
        if (fsize > 4096)
            onFileSelectError({ error: "File size cannot exceed more than 1MB" });
        else onFileSelectSuccess(file);
    };

    return (
        <div className="file-uploader">
            <input type="file" className="form-control" onChange={handleFileInput} />
            {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"></button> */}
        </div>
    )
}

export default FileUploader
