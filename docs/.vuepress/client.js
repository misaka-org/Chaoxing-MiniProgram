// client.js
import { defineClientConfig } from '@vuepress/client';
import UploadTable from './components/UploadTable.vue';

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.component('UploadTable', UploadTable);
    },
});

