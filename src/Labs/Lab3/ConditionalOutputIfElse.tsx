const ConditionalOutputIfElse = () => {
    const loggedIn = true;
    if (loggedIn) {
        return (<><h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2><hr /></>);
    } else {
        return (<><h2 id="wd-conditional-output-if-else-login">Please login If Else</h2><hr /></>);
    }
};
export default ConditionalOutputIfElse;