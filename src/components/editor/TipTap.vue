<!--
 * fileName       : TipTap
 * author         : Yeong-Huns
 * date           : 2024-08-27
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-27        Yeong-Huns       최초 생성
-->
<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';

export default {
    name: 'TipTap',
    components: { EditorContent },
    data() {
        return {
            editor: null,
        };
    },
    mounted() {
        this.editor = new Editor({
            content: '<p>에디터 테스트입니다.</p>',
            extensions: [StarterKit],
        });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
};
</script>

<template>
    <editor-content :editor="editor" />
</template>

<style scoped></style>
