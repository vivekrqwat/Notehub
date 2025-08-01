import React from 'react'
import  Editor  from 'react-simple-code-editor'
import {highlight, languages} from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism-tomorrow.css';;

export default function CodeEditor({cd}) {
  
    const[lang,setlang]=React.useState('javascript');
  return (
    <div>
       
        <Editor
            value={cd}
            readOnly={true}
           
            highlight={(code) => highlight(code, languages[lang]||languages.js)}
            padding={10}
            style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: '#1F1D1D',
            color: 'white'
            }}
        />
      
    </div>
  )
}
