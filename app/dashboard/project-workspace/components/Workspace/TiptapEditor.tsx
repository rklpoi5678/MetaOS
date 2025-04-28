'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAppStore } from "@/src/store/appStore"
import { motion } from 'framer-motion'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Link,
  Image
} from 'lucide-react'
import LinkExtension from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import { useEffect } from 'react'

interface TiptapEditorProps {
  nodeId: string;
}

export default function TiptapEditor({ nodeId }: TiptapEditorProps) {
  const { editorState, setEditorContent } = useAppStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'rounded-lg shadow-sm',
        },
      }),
    ],
    content: editorState.editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      }
    },
    immediatelyRender: false,
  })
  

  useEffect(() => {
    if (editor && editorState.editorContent !== undefined) {
      editor.commands.setContent(editorState.editorContent);
    }
  }, [nodeId, editorState.editorContent, editor]);

  if (!editor) return <div>에디터 초기화 중...</div>;

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력하세요:')
    const alt = window.prompt('이미지 설명을 입력하세요:')
    if (url) {
      editor.chain().focus().setImage({ 
        src: url,
        alt: alt || '이미지'
      }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('링크 URL을 입력하세요:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* 툴바 */}
      <div className="flex flex-wrap gap-2 p-2 bg-white border rounded-lg shadow-sm">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
          title="굵게"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
          title="기울임"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100' : ''}`}
          title="제목 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''}`}
          title="제목 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100' : ''}`}
          title="제목 3"
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
          title="글머리 기호"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('orderedList') ? 'bg-gray-100' : ''}`}
          title="번호 매기기"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('blockquote') ? 'bg-gray-100' : ''}`}
          title="인용"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('codeBlock') ? 'bg-gray-100' : ''}`}
          title="코드 블록"
        >
          <Code size={18} />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-100 text-gray-800 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
          title="링크 추가"
        >
          <Link size={18} />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100 text-gray-800"
          title="이미지 추가"
        >
          <Image size={18} aria-label="이미지 추가 아이콘" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100 text-gray-800"
          title="실행 취소"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100 text-gray-800"
          title="다시 실행"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* 에디터 */}
      <EditorContent 
        editor={editor} 
        className="border rounded-lg p-4 bg-white min-h-[500px] shadow-sm hover:shadow-md transition-shadow prose max-w-none text-gray-800" 
      />
    </motion.div>
  )
} 