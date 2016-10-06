import React from 'react'

const Footer = () => {
  return(
    <footer id='pageFooter'>
      <div className='socialMediaLinks'>
        <a className='socialLink' href="https://twitter.com/emceenoesis" target="new"><img width='32' src='/public/twitter.png' /></a>
        <a className='socialLink' href="https://github.com/benpolinsky" target="new"><img width='32' src='/public/github.png' /></a>        
      </div>

      <h1>© {new Date().getFullYear()} <a target="new" href='http://benpolinsky.com'>Ben Polinsky</a></h1>
    </footer>
  )
}

export default Footer


