
import React from 'react'

import Register from './components/Register'
import Login from './components/Login'


export default function LandingBody(){
    return (
        <div>
            <div>
                <img></img>
                <div className="join">
                    <div className="main-text">
                    The easiest way to make chatbots <strong>quickly.</strong>
                    </div>
                    <button className="join-button">Join Today</button>
                </div>
            </div>
            <div>
                <div className="create-text">
                    Create new chatbots for your retail company at <strong>record pace.</strong>
                </div>
            </div>
            <div className='para'>
                <img></img>
                <div className="para-with-subtext">
                    <div className="visualize-your-transcripts-wit">
                        Visualize your transcripts with ease
                    </div>
                    <div className="nemo-enim-ipsam-voluptatem-qui">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                        aut fugit, sed quia consequuntur magni dolores eos qui ratione
                        voluptatem sequi nesciunt. Neque porro quisquam est, qui
                        dolorem.
                    </div>
                </div>
            </div>
            <div className='para'>
                <div className="para-with-subtext">
                    <div className="visualize-your-transcripts-wit">
                        Visualize your transcripts with ease
                    </div>
                    <div className="nemo-enim-ipsam-voluptatem-qui">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                        aut fugit, sed quia consequuntur magni dolores eos qui ratione
                        voluptatem sequi nesciunt. Neque porro quisquam est, qui
                        dolorem.
                    </div>
                </div>
                <img></img>
            </div>
            <div>
                <div className="final-join">
                    <div className="final-join-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore
                    </div>
                    <div className="register">
                        <div className="register-button">Join Today</div>
                    </div>
                    <div className="login">
                        <div className="login-button">Login</div>
                    </div>
                </div>
            </div>
        </div>
    )
}