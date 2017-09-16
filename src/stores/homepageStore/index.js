import { observable, action } from 'mobx';

class HomepageStore {
    @observable toggle;
    @observable currentMenuItem;
    @observable expanded;
    @observable breadcrumbItem;

    constructor() {
        this.toggle = false;
        this.breadcrumbItem = [{
            name: '首页'
        },{
            name: '控制台'
        }]
    }

    @action changeToggle = () => {
        this.toggle = !this.toggle;
    }

    @action changeMenuItem = (e) => {
        this.currentMenuItem = e.key;
    }

    @action changeExpand = (value) => {
        this.expanded = value;
    }

    @action changeBreadcrumb = () => {
        this.breadcrumbItem
    }
}

const homepageStore = new HomepageStore();

export default homepageStore;
export { HomepageStore };

