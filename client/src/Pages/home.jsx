import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <>
                <div className="hero  ">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" className="max-w-sm rounded-lg shadow-2xl h-[200px]" />
                        <div>
                            <h5 className="text-4xl ">Welcome To The home of champions!</h5>
                            <div className="avatar-group -space-x-6">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                    </div>
                                </div>
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src="https://res.cloudinary.com/dqab6gg7d/image/upload/v1683296721/mern-authentication/pexels-tain%C3%A1-bernard-3586091_o1ub2a.jpg" />
                                    </div>
                                </div>
                                <div className="avatar placeholder">
                                    <div className="w-12 bg-neutral-focus text-neutral-content">
                                        <span>+99</span>
                                    </div>
                                </div>
                            </div>
                            <p className="py-6">Keep visiting for more cool updates</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;
