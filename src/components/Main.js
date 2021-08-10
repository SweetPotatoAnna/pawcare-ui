import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as urlPaths from '../constants/paths';
import MyProfile from "./MyProfile";

function Main(props) {
    const { signedIn, signedInSuccess } = props;

    const showSignIn = () => {
        return signedIn ? (
          <Redirect to={urlPaths.MY_PROFILE_PATH}/>
        ) : (
          <div>signIn</div>
        );
    };

    const showMyProfile = () => {
        return signedIn ? <MyProfile signedIn = { signedIn } /> : <Redirect to={urlPaths.SIGN_IN_PATH} />;
    };

    return (
        <div>
            <Switch>
                <Route path={urlPaths.START_PATH} exact render={showSignIn} />
                <Route path={urlPaths.SIGN_IN_PATH} render={showSignIn} />
                <Route path={urlPaths.SIGN_UP_PATH}>signUp</Route>
                <Route path={urlPaths.FOOD_TRACKER_PATH}>foodTrancker</Route>
                <Route path={urlPaths.REACTION_TRACKER_PATH}>reactionTracker</Route>
                <Route path={urlPaths.ALLERGEN_ANALYSIS_PATH}>allergenAnalysis</Route>
                <Route path={urlPaths.MY_PROFILE_PATH} render={showMyProfile} />
            </Switch>
        </div>
    );
}

export default Main;