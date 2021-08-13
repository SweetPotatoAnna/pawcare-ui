import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import * as urlPaths from '../constants/paths';
import SignUp from './SignUp';
import SignIn from './SignIn';
import reactionTracker from "./reactionTracker";


function Main(props) {
    const {signedIn, signedInSuccess} = props;

    const showSignIn = () => {
        return signedIn ? (
            <Redirect to={urlPaths.MY_PROFILE_PATH}/>
        ) : (
            <SignIn signedInSuccess={signedInSuccess}/>
        );
    };


    const showMyProfile = () => {
        return signedIn ? <div>myProfile</div> : <Redirect to={urlPaths.SIGN_IN_PATH}/>;
    };


    return (
        <div>
            <Switch>
                <Route path={urlPaths.START_PATH} exact render={showSignIn}/>

                <Route path={urlPaths.SIGN_IN_PATH} render={showSignIn}/>

                <Route path={urlPaths.SIGN_UP_PATH} component={SignUp}/>


                <Route path={urlPaths.FOOD_TRACKER_PATH}>foodTrancker</Route>
                <Route path={urlPaths.REACTION_TRACKER_PATH}render={reactionTracker}/>
                <Route path={urlPaths.ALLERGEN_ANALYSIS_PATH}>allergenAnalysis</Route>
                <Route path={urlPaths.MY_PROFILE_PATH} render={showMyProfile}/>

            </Switch>
        </div>
    );
}

export default Main;