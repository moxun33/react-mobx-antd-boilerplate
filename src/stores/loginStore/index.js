import { observable, action } from 'mobx';

class LoginStore {
  @observable username;
  @observable password;
  @observable logined = window.localStorage.getItem('logined');
  constructor() {
    this.username = '';
    this.password = '';
  }

  @action changeUsername = value => {
    this.username = value;
    console.log(value, '新value');
  };
  @action changePassword = value => {
    this.password = value;
    console.log(value, '新value');
  };

  @action.bound
  loginSubmit = async (values, successcb = () => {}) => {
    //post login form; if successed then
    window.localStorage.setItem('logined', true);
    this.logined = true;
    successcb();
  };
}

const loginStore = new LoginStore();

export default loginStore;
export { LoginStore };
