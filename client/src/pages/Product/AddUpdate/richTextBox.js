import React, { useState,useEffect,forwardRef,useImperativeHandle } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const RichTextBox = forwardRef((props,ref)=>{
	const html = props.value||''
	
	const [editorState,setEditorState] = useState(EditorState.createEmpty())
	
	useEffect(()=>{
		const contentBlock = htmlToDraft(html);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);
		setEditorState(editorState)
	},[])
	
	function onEditorStateChange(editorState){
		setEditorState(editorState)
	}
	function getRichBox(){
		return draftToHtml(convertToRaw(editorState.getCurrentContent()))
	}
	useImperativeHandle(ref,()=>({
		getRichBox
	}))
	return (
	  <div>
	    <Editor
	      editorState={editorState}
	      wrapperClassName="demo-wrapper"
	      editorClassName="demo-editor"
		  editorStyle={{border:'1px solid #000', height:200 }}
	      onEditorStateChange={onEditorStateChange}
	    />
	  </div>
	);
})
export default RichTextBox