import React from 'react';
import logofooter from '../../resources/logofooter.png';
import localization from '../../utils/localization';




const Footer = () => (
    <footer className="App-footer">
        <img src={logofooter} className="App-logofooter" alt="logofooter"/>
        <p className="App-copyrightfooter">{localization.footer.Akka} <br/>{localization.footer.Copyright} </p>
        <a className="App-reportfooter" href="../report_problem" >{localization.footer.Report}</a>
    </footer>
)

export default Footer;