import React from 'react';
import { Route, HashRouter } from 'react-router-dom';

import BlogsContainer from './store/containers/BlogsContainer';
import ContactContainer from './store/containers/ContactContainer';
import CourseContainer from './store/containers/CourseContainer';
import EventsContainer from './store/containers/EventsContainer';
import FooterContainer from './store/containers/FooterContainer';
import HeaderContainer from './store/containers/HeaderContainer';
import HomeContainer from './store/containers/HomeContainer';
import JoinUsContainer from './store/containers/JoinUsContainer';
import LoginContainer from './store/containers/LoginContainer';
import PageContainer from './store/containers/PageContainer';
import ProfileContainer from './store/containers/ProfileContainer';
import ResetPasswordContainer from './store/containers/ResetPasswordContainer';
import TeamContainer from './store/containers/TeamContainer';

function App() {
    return (
        <HashRouter>
            <HeaderContainer />
            <Route exact path = "/" component = {HomeContainer} />
            <Route exact path = "/courses" component = {CourseContainer} />
            <Route exact path = "/events" component = {EventsContainer} />
            <Route exact path = "/blogs" component = {BlogsContainer} />
            <Route path = "/course/:slug" component = {CourseContainer} />
            <Route path = "/event/:slug" component = {EventsContainer} />
            <Route path = "/blog/:slug" component = {BlogsContainer} />
            <Route path = "/courses/:category_slug" component = {CourseContainer} />
            <Route path = "/student-login" component = {LoginContainer} />
            <Route path = "/reset_password" component = {ResetPasswordContainer} />
            <Route path = "/my-account" component = {ProfileContainer} />
            <Route path = "/user/:id" component = {ProfileContainer} />
            <Route path = "/pages/:page_url" component = {PageContainer} />
            <Route path = "/our-team" component = {TeamContainer} />
            <Route path = "/join-us" component = {JoinUsContainer} />
            <Route path = "/contact" component = {ContactContainer} />

            <FooterContainer />
        </HashRouter >
    );
}

export default App;
