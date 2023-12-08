import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';

function TextEditor({ text, setArticleData, titleWidth, peerHeight, reduceHeight = 0 }) {
  const [textData, setTextData] = useState("");
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTextData(text || "");
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text])

  return (
    <div className={`mt-6`}>
      <CKEditor
        editor={ ClassicEditor }
        config={{
          extraPlugins: [uploadPlugin],

          removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
        }}
        data={textData}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              `${peerHeight.current?.clientHeight - reduceHeight - 150}px`,
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "width",
              `${titleWidth.current?.clientWidth}px`,
              editor.editing.view.document.getRoot()
            );
            writer.setStyle(
              "padding-left",
              `24px`,
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={ ( _, editor ) => {
            const data = editor.getData();
            setArticleData(prev => ({ ...prev, content: data }))
        } }
      />
    </div>
  )
}

export default TextEditor