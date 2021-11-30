import React from "react";

class Announcements extends React.Component {

    render() {
        return(
            <div>
                <h1 style={{paddingLeft:"5%"}}>Announcements</h1>
                <h5 style={{paddingLeft:"5%", color:"red"}}>[11/30/2021 @ 2:59 PM]</h5>
                <p style={{paddingLeft:"5%"}}>
                    Thank you all for an amazing season for tennis club! We got to know
                    so many great people this year and played some amazing matches. Hopefully by
                    next season we can find a way to play into the colder months.
                    <span style={{color:"green"}}> Kyle placed 1st overall for competitive play!</span> Please
                    make sure to give Kyle a high-five if you see him on campus. And give all of you a pat
                    on the back for showing up and giving it your all this season. We look forward to seeing you
                    all next semester!
                </p>
                
            </div>
           
        )
    }
}

export default Announcements