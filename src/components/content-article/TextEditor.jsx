import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function TextEditor({ peerHeight }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve) => {
          loader.file.then((file) => {
            const imageLink = URL.createObjectURL(file);
            resolve({ default: imageLink });
          })
        })
      }
    }
  }
  
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    }
  }

  return (
    <div className="mt-6">
      <CKEditor
        editor={ ClassicEditor }
        config={{
          extraPlugins: [uploadPlugin]
        }}
        data="<p></p>"
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              `${peerHeight.current.clientHeight - 150}px`,
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "padding-left",
              `24px`,
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
        } }
      />
    </div>
  )
}

export default TextEditor