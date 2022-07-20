import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import './App.css';

function extractEmails ( text ){
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}

function App() {

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [showUploadScreen, setShowUploadScreen] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [foundEmailIds, setFoundEmailIds] = useState('')

  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      setSelectedFile(e.target.files[0])
      setShowUploadScreen(false)
  }

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  }

  const submitComment = () => {
    // console.log(commentText);
    // console.log(extractEmails(commentText)?.join(','));
    setFoundEmailIds(extractEmails(commentText)?.join(','));
    
  }

  const cancelComment = () => {
    setCommentText('');
  }

  return (
    <div className='app-cont'>
      {
        showUploadScreen ?
        <div className='btn-cont'>
          {/* <label htmlFor="file"><button>Select an image from your computer</button></label> */}
          {/* <button>Select an image from your computer</button> */}
          <input id="imgFile" type='file' onChange={onSelectFile} />
        </div>
        :
        <div className='img-n-comment-cont'>
          <div className='canvas-cont'>
            {/* <div><img src={preview} className='main-img' /></div> */}
            {/* <canvas id="canvas" className='canvas-style main-img' style={{ backgroundImage: `url(${preview})` }}></canvas> */}
            <Canvas backgroundImage={preview} />
          </div>
          <div className='rhs-section-cont'>
            <div className='comment-input-cont'>
              <textarea className='comment-input' placeholder='Comment here...' value={commentText} onChange={(event) => handleCommentChange(event)}></textarea>
              <div>
                <button className='submit-comment' onClick={submitComment}>Comment</button>
                <button onClick={cancelComment}>Cancel</button>
              </div>
            </div>
            <div className='identified-emails-list'>EmailIDs in comment:</div>
            <div>{foundEmailIds}</div>
          </div>
        </div>
      }
      
      
    </div>
  );
}

export default App;
