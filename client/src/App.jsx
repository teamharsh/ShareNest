import { useRef, useState, useEffect } from "react";
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const fileInputRef = useRef();
  const resultRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
          window.location.reload();
        }, 2000); // Refresh after 2 seconds
      })
      .catch((error) => {
        console.error('Error copying to clipboard: ', error);
      });
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  return (
    <div className="relative h-screen w-screen">
      <img
        src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/05/quick-share-files.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Simple File Sharing</h1>
          <p className="text-lg mb-4">Share your files quickly and easily with our simple file sharing service.</p>
          <button
            onClick={() => onUploadClick()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 rounded"
          >
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {result && (
            <div>
              <input
                ref={resultRef}
                type="text"
                readOnly
                value={result}
                className="hidden"
              />
              <a
                href={result}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black py-2 px-4 mb-4 hover:underline block"
              >
                {result}
              </a>
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                {copySuccess ? "Copied!" : "Copy Link"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
