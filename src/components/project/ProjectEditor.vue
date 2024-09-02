<!--
 * fileName       : TipTap
 * author         : Yeong-Huns
 * date           : 2024-08-27
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-27        Yeong-Huns       최초 생성
 * 2024-08-27        Yeong-Huns       toolbar & editor layout
 * 2024-08-27        Yeong-Huns       Heading(헤딩) 기능 구현
 * 2024-08-27        Yeong-Huns       Blockquote(인용구) 추가
 * 2024-08-28        Yeong-Huns       Bold(강조) 구현
 * 2024-08-28        Yeong-Huns       Italic(기울임) 구현
 * 2024-08-28        Yeong-Huns       Strike(취소선) 구현
 * 2024-08-28        Yeong-Huns       PlaceHolder 로 변경
 * 2024-08-28        Yeong-Huns       URL(링크 삽입) 구현
 * 2024-08-28        Yeong-Huns       이미지업로드 (URL) 구현
 * 2024-08-28        Yeong-Huns       이미지업로드 (디렉토리에서 선택) 으로 변경
 * 2024-08-28        Yeong-Huns       코드 블록 구현
 * 2024-08-28        Yeong-Huns       코드 블록 하이라이팅(구문 강조) 변경(진행중)

-->
<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card-title variant="h6" class="mb-2 title-text"> 프로젝트 설명 </v-card-title>
                    <p class="mb-4">❗ 진행하고자 하는 프로젝트에 대한 상세한 설명을 적어주세요.</p>
                </v-col>
            </v-row>
        </v-container>
        <div v-if="editor" class="container">
            <div id="toolbar">
                <button class="toolbar-button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ heading: editor.isActive('heading', { level: 1 }) }">
                    <div>H<span>1</span></div>
                    <!-- H1 버튼-->
                </button>
                <button class="toolbar-button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ heading: editor.isActive('heading', { level: 2 }) }">
                    <div>H<span>2</span></div>
                    <!-- H2 버튼-->
                </button>
                <button class="toolbar-button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ heading: editor.isActive('heading', { level: 3 }) }">
                    <div>H<span>3</span></div>
                    <!-- H3 버튼-->
                </button>
                <div class="split-bar"></div>
                <button class="toolbar-button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
                        ></path>
                    </svg>
                    <!-- Bold 버튼-->
                </button>
                <button class="toolbar-button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
                    </svg>
                    <!-- Italic(기울임) 버튼 -->
                </button>
                <button class="toolbar-button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path>
                    </svg>
                    <!--strike(취소선) 버튼-->
                </button>
                <div class="split-bar"></div>
                <button class="toolbar-button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
                    </svg>
                    <!--BlockQuote(인용구) 버튼-->
                </button>
                <button class="toolbar-button" @click="addLink">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
                        ></path>
                    </svg>
                    <!--Link(URL 링크) 삽입 버튼-->
                </button>
                <button class="toolbar-button" @click="insertFile">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
                    </svg>
                    <!--이미지 삽입 버튼-->
                </button>

                <button class="toolbar-button" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                    <svg viewBox="0 0 24 24" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
                    </svg>
                    <!--코드 블럭 삽입 버튼-->
                </button>
            </div>
            <editor-content :editor="editor" class="editor-content" />
            <!-- display : none 으로 평상시엔 파일 업로드 창 숨김-->
            <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none" />
            <!--showLinkPopup 이 true 일때만 보임-->
            <div v-if="showLinkPopup" class="link-popup" :style="{ top: linkPosition.y + 'px', left: linkPosition.x + 'px' }">
                <v-card>
                    <v-card-title class="headline">링크 등록</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="linkUrl" label="URL을 입력하세요" prepend-icon="mdi-link" outlined></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="confirmUrlLink">확인</v-btn>
                        <v-btn color="grey" text @click="closeLinkPopup">취소</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';

import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';

const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('css', css);
export default {
    name: 'TipTap',
    components: { EditorContent },
    data() {
        return {
            editor: null,
            showLinkPopup: false,
            linkUrl: '',
            linkPosition: { x: 0, y: 0 },
        };
    },
    methods: {
        insertFile() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // 파일을 읽고 URL로 변환
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target.result;
                this.editor.chain().focus().setImage({ src: url }).run();
            };
            reader.readAsDataURL(file);
        },
        addLink() {
            this.updatePopupPosition();
            this.showLinkPopup = true; // link-popup 을 보이도록 변경
        },
        updatePopupPosition() {
            const { view } = this.editor;
            const { from } = view.state.selection; // 현재 포인터 위치 (키보드)
            const coords = view.coordsAtPos(from);

            this.linkPosition = {
                x: coords.left + window.scrollX - 100,
                y: coords.bottom + window.scrollY + 5,
            };
        },
        confirmUrlLink() {
            let url = this.linkUrl.trim();
            if (!/^https?:\/\//i.test(url)) {
                url = `http://${url}`;
            }

            if (url) {
                this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
            this.closeLinkPopup();
        },
        closeLinkPopup() {
            this.showLinkPopup = false;
            this.linkUrl = '';
        },
        getEditorContent() {
            return this.editor.getHTML();
        },
    },
    mounted() {
        this.editor = new Editor({
            content:
                '<h3>1. 프로젝트의 시작 동기</h3><br>' + '<h3>2. 회의 진행/모임 방식</h3><br>' + '<h3>3. 나의 경험 및 경력 및 맡게 되는 역할</h3><br>' + '<h3>4. 자유 기재</h3>',
            extensions: [
                StarterKit.configure({
                    heading: { levels: [1, 2, 3] },
                    codeBlock: false,
                }),
                Link.configure({ openOnClick: true }), // 링크 클릭 시, 새창에서 열기
                Placeholder.configure({
                    placeholder: '당신의 이야기를 적어보세요...', // 플레이스홀더 텍스트 설정
                    emptyEditorClass: 'is-editor-empty', // 에디터가 비어 있을 때 적용될 클래스
                }),
                Image.configure({ inline: true }),
                CodeBlockLowlight.configure({ lowlight }),
            ],
        });
    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.destroy();
        }
    },
};
</script>

<style lang="scss" scoped>
#toolbar {
    display: flex; /* 1행으로 정렬 */
    align-items: center;
    padding: 5px;
}
.toolbar-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 8px;
    transition: background-color 0.3s ease;
    color: #868e96;
}
.split-bar {
    width: 1px;
    height: 30px;
    background-color: #ccc;
    margin: 0 8px;
}
.toolbar-button svg {
    fill: #868e96; /* SVG 내부 색상 변경 */
    width: 1.25em;
    height: 1.25em;
}
.editor-content {
    padding: 16px;
    min-height: 150px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#toolbar .heading,
.toolbar-button.is-active {
    font-weight: bold;
    background-color: #f0f0f0;
}

::v-deep blockquote {
    border-left: 3px solid #ccc;
    margin: 1.5rem 0;
    padding-left: 1rem;
    color: #666;
    font-style: italic;
}
::v-deep .ProseMirror:focus {
    /* 포커스시 테두리 제거 */
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}
.link-popup {
    position: absolute;
    background-color: #fff;
    padding: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
/* 강제 CSS 수정 (placeholder)*/
::v-deep .ProseMirror > p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
::v-deep pre {
    /* 코드블록*/
    background: #000;
    border-radius: 0.5rem;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
}

::v-deep pre code {
    background: none;
    color: inherit;
    font-size: 0.8rem;
    padding: 0;
}

.title-text {
    font-size: 32px;
    font-weight: bold;
}
</style>
