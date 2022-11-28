export function Social(props) {
	return (
		<li className="social-wrapper">
			<a className="button button2" href={props.url} target="_blank" rel="noreferrer">
				<div className="social-icon">
					<i className={props.fab ?? ('fab fa-' + props.platform.toLowerCase())}></i>
				</div>
				<span>{props.platform}</span>
			</a>
		</li>
	);
}

export function Website(props) {
	return (
		<Social url={props.children} platform="Website" fab="fas fa-link" />
	);
}

export function GitHub(props) {
	return (
		<Social url={'https://github.com/' + props.children} platform="GitHub" />
	);
}

export function LinkedIn(props) {
	return (
		<Social url={props.children} platform="LinkedIn" />
	);
}

export function Instagram(props) {
	return (
		<Social url={'https://instagram.com/' + props.children} platform="Instagram" />
	);
}

export const Roles = {
	founder: (<div><i className="far fa-lightbulb"></i> <span>Founder</span></div>),
	chiefExec: (<div><i className="fas fa-crown"></i> <span>Chief Executive</span></div>),
	vp: (<div><i className="fas fa-crown"></i> <span>Vice President</span></div>),
	teamLead: (<div><i className="fas fa-tasks"></i> <span>Team Lead</span></div>),
	socialMedia: (<div><i className="fas fa-hashtag"></i> <span>Social Media Manager</span></div>),
	frontend: (<div><i className="fas fa-code"></i> <span>Front-end Developer</span></div>),
	backend: (<div><i className="fas fa-server"></i> <span>Back-end Developer</span></div>),
	designer: (<div><i className="fas fa-pencil-ruler"></i> <span>Designer</span></div>),
	mobile: (<div><i className="fas fa-mobile"></i> <span>Mobile Developer</span></div>),
	treasurer: (<div><i className="fas fa-dollar-sign"></i> <span>Treasurer</span></div>),
	secretary: (<div><i className="fas fa-pencil-alt"></i> <span>Secretary</span></div>)
};