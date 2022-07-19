import React, { useState, useEffect } from 'react';
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

  // var pointSize = 3;

  // function getPosition(event){
  //     var rect = canvas.getBoundingClientRect();
  //     var x = event.clientX - rect.left;
  //     var y = event.clientY - rect.top;
          
  //     drawCoordinates(x,y);
  // }

  // function drawCoordinates(x,y){	
  //     var ctx = document.getElementById("canvas").getContext("2d");


  //     ctx.fillStyle = "#ff2626"; // Red color

  //     ctx.beginPath();
  //     ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
  //     ctx.fill();
  // }

  // create a preview as a side effect, whenever selected file is changed
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

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
      setShowUploadScreen(false)
  }

  const handleCommentChange = (event) => {
    // console.log(event.target.value);
    setCommentText(event.target.value);
  }

  const submitComment = () => {
    console.log(commentText);
    console.log(extractEmails(commentText)?.join(','));
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
          <div>
            <div><img src={preview} className='main-img' /></div>
            {/* <canvas id="canvas" className='canvas-style main-img' style={{ backgroundImage: `url(${preview})` }}></canvas> */}
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
