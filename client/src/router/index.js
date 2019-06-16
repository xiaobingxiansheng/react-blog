import React from "react";
import Layout from '../container/layout/Layout'
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Loadable from 'react-loadable';

const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>正在加载中...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

let ArticleList = Loadable({
    loader: () => import('../components/ArticleList'),
    loading: LoadingComponent
});
let ArticleContent = Loadable({
    loader: () => import('../components/ArticleContent'),
    loading: LoadingComponent
});
let FeedbackForm = Loadable({
    loader: () => import('../components/FeedbackForm'),
    loading: LoadingComponent
});
let TagList = Loadable({
    loader: () => import('../components/TagList'),
    loading: LoadingComponent
});
let ArchiveList = Loadable({
    loader: () => import('../components/ArchiveList'),
    loading: LoadingComponent
});
let AboutMe = Loadable({
    loader: () => import('../components/AboutMe'),
    loading: LoadingComponent
});
let NoMatch = Loadable({
    loader: () => import('../components/NoMatch'),
    loading: LoadingComponent
});

const EnterRouter = () => (
    <Router>
        <Layout>    
            <Switch>
                <Redirect exact from='/' to='/articleList/0' component={ArticleList} />
                <Redirect exact from='/(articleList)' to='/articleList/0' component={ArticleList} />
                <Route path="/articleList/:pageIndex(\d\d?)" component={ArticleList} />
                <Route path="/article/:pathName" component={ArticleContent} />
                <Route path="/tagList" component={TagList} />
                <Route path="/archive" component={ArchiveList} />
                <Route path="/about" component={AboutMe} />
                <Route path="/feedback" component={FeedbackForm} />
                <Route component={NoMatch} />
            </Switch>
        </Layout>
    </Router>
);

export default EnterRouter