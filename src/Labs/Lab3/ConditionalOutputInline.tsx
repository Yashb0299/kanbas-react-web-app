const ConditionalOutputInline = () => {
    const loggedIn = false;
    return (
        <div id="wd-conditional-output-inline">
            {loggedIn && <><h2>Welcome Inline</h2><hr /></>}
            {!loggedIn && <><h2>Please login Inline</h2><hr /></>}
        </div>
    );
};
export default ConditionalOutputInline;

