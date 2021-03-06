import * as React from 'react';

import '@styles/index.scss';
import '@styles/components/main.scss';

export class Main extends React.Component {
	render() {
		return(
			<React.Fragment>
				<header className="push-bottom">
					Hey I'm Matt
				</header>
				<div className="flex-center push-bottom">
					<img className="rounded-edges profile-pic" src={'./assets/images/mugshot.png'} />
				</div>
				<div className="flex-center push-bottom tagline">
					Full stack developer. Unironic sports fan.
				</div>
				<div className="flex-center">
					<div className="icon-link-container">
						<a target="_blank" href="https://github.com/MattySheikh" title="GitHub">
							<img className="mini-icon" src={'./assets/images/github.png'} alt="GitHub" />
						</a>
					</div>
					<div className="icon-link-container">
						<a target="_blank" href="https://www.linkedin.com/in/malsheikh" title="LinkedIn">
							<img className="mini-icon" src={'./assets/images/linkedin.png'} alt="LinkedIn" />
						</a>
					</div>
					<div className="icon-link-container">
						<a target="_blank" href="./assets/images/resume.pdf" title="LinkedIn">
							<img className="mini-icon" src={'./assets/images/resume-icon.png'} alt="LinkedIn" />
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}