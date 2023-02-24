import { useState, useEffect } from 'react';

import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

import '../../styles/react-draft-wysiwyg.css'

import { htmlDecode } from '../tools';


const WYSIWYG = (props) => {
    const [editorData, setEditorData] = useState({
        editorState: EditorState.createEmpty()
    })
    const onEditorStateChange = (editorData) => {
        let htmlData = stateToHTML(editorData.getCurrentContent())
        setEditorData({
            editorState: editorData
        })
        props.setEditorState(htmlData)
    }
    const checkError = () => {
        if (props.onError || (props.onError && props.editorBlur)) {
            return true
        }
        return false
    }

    useEffect( () => {
        // console.log("editor window data changed")
        if (props.editorContent) {
            const blockFromHtml = htmlToDraft(htmlDecode(props.editorContent));
            const { contentBlocks, entityMap } = blockFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks,entityMap)

            setEditorData({
                editorState: EditorState.createWithContent(contentState)
            })
        }
    }, [props.editorContent]);

    return (
        <div>
            <Editor 
                editorState={editorData.editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName={`demo-wrapper ${checkError() ? 'error':''}`}
                editorClassName="demo-editor"
                onBlur={props.setEditorBlur}
            />
        </div>
    )
}
export default WYSIWYG;