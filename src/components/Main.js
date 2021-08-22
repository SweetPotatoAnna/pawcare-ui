import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as urlPaths from '../constants/paths';

import SignUp from './SignUp';
import SignIn from './SignIn';
import MyProfile from "./MyProfile";
import AllergenAnalysis from './AllergenAnalysis';
import ReactionTracker from './ReactionTracker';

function Main(props) {
    const { signedIn, signedInSuccess } = props;

    const showSignIn = () => {
        return signedIn ? (
          <Redirect to={urlPaths.MY_PROFILE_PATH}/>
        ) : (
            <SignIn signedInSuccess={signedInSuccess}/>
        );
    };

    const showMyProfile = () => {
        return signedIn ? <MyProfile /> : <Redirect to={urlPaths.SIGN_IN_PATH} />;
    };

    return (
        <div class="main">
            <Switch>
                <Route path={urlPaths.START_PATH} exact render={showSignIn} />
                <Route path={urlPaths.SIGN_IN_PATH} render={showSignIn} />
                <Route path={urlPaths.SIGN_UP_PATH} component={SignUp}/>


                <Route path={urlPaths.FOOD_TRACKER_PATH}>foodTrancker</Route>
                <Route path={urlPaths.REACTION_TRACKER_PATH}><ReactionTracker /></Route>
                <Route path={urlPaths.ALLERGEN_ANALYSIS_PATH}><AllergenAnalysis /></Route>
                <Route path={urlPaths.MY_PROFILE_PATH} render={showMyProfile} />
            </Switch>
        </div>
    );
}

export default Main;