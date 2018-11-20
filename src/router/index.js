import React from "react";
import Layout from '../container/layout/Layout'
import { HashRouter as Router, Route, Link } from "react-router-dom";

import ArticleContent from '../components/ArticleContent'
import ArticleList from '../components/ArticleList'
import FeedbackForm from '../components/FeedbackForm'
import TagList from "../components/TagList";
import ArchiveList from "../components/ArchiveList";
import AboutMe from "../components/AboutMe";

const EnterRouter = () => (
    <Router>
        <Layout>
            <Route exact path="/" component={ArticleList} />
            <Route path="/article/:pathName" component={ArticleContent} />
            <Route path="/feedback" component={FeedbackForm} />
            <Route path="/tagList" component={TagList} />
            <Route path="/archive" component={ArchiveList} />
            <Route path="/about" component={AboutMe} />
        </Layout>
    </Router>
);

export default EnterRouter