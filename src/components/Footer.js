
import myIcon from "../media/logo512.png"
import ghIcon from "../media/github.svg"
import liIcon from "../media/linkedInIcon.png"
import twIcon from "../media/twitter-icon.png"


const Footer = () => {

    return(
        <div className='Footer align-center'>
            <img className='my-icon' src={myIcon}></img>
            <span>Designed, developed, and deployed by Josiah Eakle.</span>
            <span className='my-link-container'>
                <a className='my-link' href='https://github.com/josiaheakle'><img className='link-icon' src={ghIcon}></img></a>
                <a className='my-link' href='https://www.linkedin.com/in/josiah-eakle-10a7a6204/'><img className='link-icon' src={liIcon}></img></a>
                <a className='my-link' href='https://twitter.com/JosiahEakle' title='Twitter' ><img className='link-icon' src={twIcon} alt='Twitter Icon'></img></a>
            </span>
            <span className='attribute'>
            <div>Uicons by <a href="https://www.flaticon.com/uicons" title="Flaticon">Flaticon</a></div>
            </span>
        </div>
    );
}

export default Footer;