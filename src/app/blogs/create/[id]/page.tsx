"use client";
import React, { useCallback, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";
import Image from "next/image";
import StarterKit from "@tiptap/starter-kit";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { Image as tiptapImage } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { BeatLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { users } from ".prisma/client";
import { useEditor } from "@tiptap/react";
import { lato } from "../../../../utils/fonts";

const limit = 20000;
const extensions = [
  StarterKit,
  CharacterCount.configure({
    limit,
  }),
  Color,
  TextStyle,
  Highlight.configure({ multicolor: true }),
  tiptapImage,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
];

function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { status, data: session } = useSession();

  const [error, setError] = useState("");
  const [formProcessing, setFormProcessing] = useState(false);
  const content = ``;
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "m-2 p-2 bg-default-200/50 h-[70vh] rounded-md overflow-y-scroll focus:outline-none active:outline-none border-none",
      },
    },
  });
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  if (!editor) return null;

  function formsubmit(formdata: FormData) {
    setFormProcessing(true);
    setError("");
    console.log(formdata);
    const data = editor?.getHTML();
    console.log(data);
    if (!data || data.length < 20)
      setError("Blog content should atleast be 20 characters");
    else if (data?.includes("&lt;script&gt;"))
      setError("Script tags are not allowed");
    else {
      uploadBlog(params.id, formdata, data);
      router.push("/blogs");
    }
    setFormProcessing(false);
  }

  // @ts-ignore
  return (
    <div className="flex-grow min-h-screen bg-default-50 p-2 flex flex-col md:flex-row gap-2">
      <div className="bg-default-100 rounded-md p-2 w-full md:basis-1/3">
        <form action={formsubmit} className="flex flex-col gap-2 ">
          <Input
            label="Blog title"
            color="default"
            variant="bordered"
            isRequired
            name="title"
            required={true}
          />
          <Input
            label="Blog author"
            color="default"
            variant="bordered"
            isRequired
            name="author"
            required={true}
          />
          <RadioGroup
            label="Status"
            className="text-sm border-2 border-default-200 p-2 rounded-xl hover:border-default-400"
            defaultValue="publish"
            name="publish-status"
          >
            <Radio value="publish">Publish</Radio>
            <Radio value="draft">Draft</Radio>
          </RadioGroup>
          <Textarea
            label="Blog Excerpt"
            color="default"
            variant="bordered"
            isRequired={true}
            maxLength={500}
            maxRows={6}
            name="excerpt"
            required={true}
          />
          <Input
            label="Tags"
            color="default"
            variant="bordered"
            placeholder="add comma seperated tags"
            name="tags"
            required={true}
            isRequired={true}
          />
          <Input
            type="file"
            label="choose banner image"
            placeholder="x"
            className="h-20"
            variant="bordered"
            accept="image/*"
            name="image"
            required={true}
            classNames={{ inputWrapper: "h-16" }}
            isRequired={true}
          />
          <Button
            className="w-full bg-blue-400 p-2 font-semibold text-white rounded-md"
            type="submit"
            value="submit"
            isDisabled={formProcessing}
          >
            {formProcessing && <BeatLoader color="#ffffff" size={6} />}
            {!formProcessing && "Save"}
          </Button>

          <p className="bg-default-200 rounded-md m-2 p-3 text-red-700">
            {error}
          </p>
        </form>
      </div>
      <div className="bg-default-100 rounded-md w-full md:basis-2/3">
        <div>
          <div className="grid grid-cols-10 place-items-center justify-center items-center gap-2 bg-default-200/50 m-2 mr-6 p-2 pr-0 rounded-md">
            <button onClick={addImage}>
              <Image
                src="/editor/image.svg"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/align-left.png"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/align-center.png"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/align-right.png"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/justify.png"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <Image
                src="/editor/bold.svg"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <Image
                src="/editor/italics.svg"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "is-active" : ""}
            >
              <Image
                src="/editor/highlight.svg"
                alt="bold button"
                width="15"
                height="15"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <Image
                src="/editor/strike.svg"
                alt="bold button"
                width="17"
                height="17"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive("subscript") ? "is-active" : ""}
            >
              <Image
                src="/editor/subscript.png"
                alt="bold button"
                width="17"
                height="17"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive("superscript") ? "is-active" : ""}
            >
              <Image
                src="/editor/superscript.png"
                alt="bold button"
                width="17"
                height="17"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
            >
              <Image
                src="/editor/code.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive("paragraph") ? "is-active" : ""}
            >
              <Image
                src="/editor/p.svg"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/h1.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/h2.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              <Image
                src="/editor/h3.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <Image
                src="/editor/bulletlist.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <Image
                src="/editor/number-list.png"
                alt="bold button"
                width="20"
                height="12"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              <Image
                src="/editor/quote.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Image
                src="/editor/hr.png"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <Image
                src="/editor/undo.svg"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <Image
                src="/editor/redo.svg"
                alt="bold button"
                width="20"
                height="20"
              />
            </button>
          </div>

          <EditorContent
            editor={editor}
            maxLength={limit}
            className={`tiptap  rounded-md  ${lato.className}`}
          />

          <div className="character-count flex justify-between px-4 mx-2 my-2 bg-default-200/50 rounded-md">
            <span>
              {editor.storage.characterCount.characters()}/{limit} characters
            </span>
            <span>{editor.storage.characterCount.words()} words</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
