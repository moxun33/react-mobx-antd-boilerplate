
import React, {Component} from 'react';
import { Button,DatePicker } from 'antd';

export default class Antd extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <div>
               <Button type="primary" icon="user" >
                   antd按钮
               </Button>
                <DatePicker/>
            </div>
        )
    }
}