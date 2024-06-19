// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
    ConfigProvider,
    Alert,
    Button,
    Layout,
    Menu,
    Breadcrumb,
    Form,
    Input,
    Select,
    DatePicker,
    Spin,
    Table,
    Modal,
    Divider,
    Dropdown,
    Space,
    Card,
    Row,
    Col,
    PageHeader,
    Avatar,
    Tooltip,
    Tabs,
    Drawer,
    Descriptions,
    Tag,
    Image,
    Checkbox,
    InputNumber,
    Badge,
    Result,
    Upload,
    Skeleton,
    Switch,
} from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

// Tambahkan ini di awal file main.js atau index.js
if (typeof ResizeObserver !== 'undefined') {
    const resizeObserverErrMsg = 'ResizeObserver loop limit exceeded';
    const silentResizeObserverError = function (event) {
      if (event.message === resizeObserverErrMsg) {
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', silentResizeObserverError);
}

async function bootstrap() {
    const app = createApp(App);

    app.component('UploadOutlined', UploadOutlined);

    app.use(ConfigProvider);
    app.use(Alert);
    app.use(Switch);
    app.use(Skeleton);
    app.use(Upload);
    app.use(Result);
    app.use(Badge);
    app.use(InputNumber);
    app.use(Checkbox);
    app.use(Image);
    app.use(Tag);
    app.use(Descriptions);
    app.use(Drawer);
    app.use(Tooltip);
    app.use(Tabs);
    app.use(Avatar);
    app.use(PageHeader);
    app.use(Col);
    app.use(Row);
    app.use(Card);
    app.use(Space);
    app.use(Dropdown);
    app.use(Divider);
    app.use(Button);
    app.use(Layout);
    app.use(Menu);
    app.use(Breadcrumb);
    app.use(Form);
    app.use(Input);
    app.use(Select);
    app.use(DatePicker);
    app.use(Spin);
    app.use(Table);
    app.use(Modal);

    app.use(router);

    app.mount("#app");
    document.title = "Integrasi SIASN - SIMPEG";
}

bootstrap();
