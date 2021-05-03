import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';

class About extends Component {


    render() {
        return (
            <div>
                { this.props.navbar }
                <div className="App">
                    <header className="App-header">
                        <div className="App-intro">
                            <h2>Tugas RESTful API Arsitektur Perangkat Lunak</h2>
                            <div>
                                Fauzan Abdillah - 19/444049/TK/49245
                            </div>
                            <div>
                                Abdillah Akmal Firdaus - 19/440884/TK/8678
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}

export default withRouter(About);