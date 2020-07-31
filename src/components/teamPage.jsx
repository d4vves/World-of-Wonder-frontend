import React from 'react';
import './teamPage.css'

const teamPage = () => {
    return (
        <div className="container center-align teamPage">
            <h1>Meet the Team!</h1>
            <div className="">
                <h2>Back end</h2>
                <hr />
                <div className="row valign-wrapper">
                    <div className="col s12 m6 l6">
                        <div>
                            <h3 class="card-title">Dave Stach</h3>
                        </div>


                        <a href="https://www.linkedin.com/in/davves/">
                            <img src="https://ca.slack-edge.com/T0351JZQ0-U013QC43Y65-05cbbc63ff21-512" className="hoverable circle" alt='Dave Stach profile' />
                        </a>


                    </div>
                    <div className="col s12 m6 l6">
                        <div class="">
                            <div>
                                <h3 class="card-title">Caitlin Smith</h3>
                            </div>

                            <a href="https://www.linkedin.com/in/caitlin-e-smith/">
                                <img src="https://ca.slack-edge.com/T0351JZQ0-U013BVCGJEP-d66e669ac8c5-512" className="hoverable circle" alt="Caitlin Smith profile" />
                            </a>



                        </div>
                    </div>
                </div>


                <h2>Front end</h2>
                <hr />
                <div className="row">
                    <div className="col 12 m6 l6">
                        <div>
                            <div>
                                <h3 class="card-title">Eric Young</h3>
                            </div>

                            <a href="https://www.linkedin.com/in/eric-young-se/">
                                <img src="https://ca.slack-edge.com/T0351JZQ0-U013HUG6X6G-8c81eb7f9880-512" className="hoverable circle" alt="Eric Young profile" />
                            </a>




                        </div>
                    </div>
                    <div className="col 12 m6 l6">
                        <div>
                            <div>
                                <h3 class="card-title">Jennifer De Phillips</h3>
                            </div>

                            <a href="https://www.linkedin.com/in/jenniferpaigedephillips/">
                                <img src="https://ca.slack-edge.com/T0351JZQ0-U01351NQPGW-629600a5fd01-512" className="hoverable circle" alt="Jennifer De Phillips profile" />
                            </a>





                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default teamPage;