export default function AnchorExercise() {
    return (
        <div id="wd-images">
            <h4>Image tag</h4>
            Loading an image from the internet:
            <br/>
            <img id="wd-starship"
                 width="400px"
                 src={"https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"}
                 alt="Starship Image"
            />
            <br/>
            Loading a local image:
            <br/>
            <img id="wd-teslabot" src={"teslabot.jpg"} alt="Local Image" height="200px"/>
        </div>
    );
}