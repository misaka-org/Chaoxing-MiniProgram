// client.js
import { defineClientConfig } from '@vuepress/client';
import GitHubRelease from './components/GitHubRelease.vue';
import UploadTable from './components/UploadTable.vue';
import ImageUpload from './components/ImageUpload.vue';
import SignList from './components/SignList.vue';

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.component('SignList', SignList);
        app.component('ImageUpload', ImageUpload);
        app.component('UploadTable', UploadTable);
        app.component('GitHubRelease', GitHubRelease);
    },
});

