import React, { useState } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { PreviewModal } from "./previewModal";

const blocksFromHtml = htmlToDraft(
  "<p>Hi <strong>{{username}}</strong></p> <p>You have been successfully registered in the system. Your OTP to login to system is {{otp}}</p> <p>&nbsp;Regards,</p> <p><strong><em>CEREBRUM</em></strong></p> "
);
const { contentBlocks, entityMap } = blocksFromHtml;
const contentState = ContentState.createFromBlockArray(
  contentBlocks,
  entityMap
);

const getHtml = (editorState) =>
  draftToHtml(convertToRaw(editorState.getCurrentContent()));

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(contentState)
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="rich-editor demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        placeholder="The message goes here..."
      />
      <h4>Underlying HTML</h4>
      <div className="html-view">{getHtml(editorState)}</div>
      <button
        className="btn btn-success"
        data-toggle="modal"
        data-target="#previewModal"
      >
        Preview message
      </button>
      <PreviewModal output={getHtml(editorState)} />
    </div>
  );
};

export { MyEditor };
