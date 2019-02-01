import React from "react";
import Layout from '../container/layout/Layout'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import ArticleContent from '../components/ArticleContent'
import ArticleList from '../components/ArticleList'
import FeedbackForm from '../components/FeedbackForm'
import TagList from "../components/TagList";
import ArchiveList from "../components/ArchiveList";
import AboutMe from "../components/AboutMe";
import NoMatch from "../components/NoMatch";

const EnterRouter = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path="/" component={ArticleList} />
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