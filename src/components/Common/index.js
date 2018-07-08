import React from 'react'
import Bundle from 'router/Bundle';
import Loading from 'components/Loading/Loading';
//懒加载
export const createBundle = (component) => () => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component/> : <Loading/>
        }
    </Bundle>
);
