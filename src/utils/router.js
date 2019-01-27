/**
 * 返回404路由组件
 * */
import { Route } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';
import React from 'react';

export const createNotFoundRoute = _ => <Route exact component={NotFound} />;
