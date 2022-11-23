import { GitHub, Instagram, LinkedIn, Roles, Website } from "./Socials";
import KrishnaPic from "./../Images/KrishnaPic.jpeg";
import DhairyaPic from "./../Images/DhairyaPic.jpeg";
import ChenikaPic from "./../Images/ChenikaPic.jpeg";
import BerkePic from "./../Images/Berke.jpeg";
import AidanPic from "./../Images/AidanPic.jpeg";

function Bio(props) {
  return (
    <div className="card">
      <img className="member-img" src={props.pic} alt={props.name} />
      <h2 className="member-name">{props.name}</h2>
      <h3 className="member-position">{props.positions}</h3>
      <ul className="socials">{props.children}</ul>
    </div>
  );
}

function Execs() {
  return (
    <div className="row">
      <Bio
        name="Dhairya Khara"
        pic={DhairyaPic}
        positions={[Roles.founder, Roles.chiefExec, Roles.teamLead]}
      >
        <Website>https://abyx.dev</Website>
        <GitHub>DhairyaKhara</GitHub>
        <LinkedIn>https://linkedin.com/in/tyler-jon-wong</LinkedIn>
      </Bio>
      <Bio
        name="Krishna Cheemalapati"
        pic={KrishnaPic}
        positions={[Roles.teamLead, Roles.frontend, Roles.backend]}
      >
        <Website>https://krishnacheemalapati.github.io</Website>
        <GitHub>krishnacheemalapati</GitHub>
        <LinkedIn>https://linkedin.com/in/krishnacheemalapati</LinkedIn>
      </Bio>
      <Bio
        name="Berke Altiparmak"
        pic={BerkePic}
        positions={[Roles.founder, Roles.vp]}
      >
        <Website>https://shreyanshnair.wixsite.com/portfolio</Website>
        <GitHub>Berke</GitHub>
        <LinkedIn>https://linkedin.com/in/shreyansh-nair</LinkedIn>
      </Bio>
      <Bio
        name="Aidan Li"
        pic={AidanPic}
        positions={[Roles.treasurer, Roles.teamLead, Roles.frontend]}
      >
        <GitHub>Niwri</GitHub>
        <LinkedIn>https://linkedin.com/in/irwin-ngo-9b306980</LinkedIn>
      </Bio>
      <Bio name="Chenika Bukes" pic={ChenikaPic} positions={[Roles.secretary]}>
        <LinkedIn>
          https://linkedin.com/in/khondoker-intiser-alam-aa4417229
        </LinkedIn>
        <Instagram>khondokerintiser</Instagram>
      </Bio>
    </div>
  );
}

function Bios() {
  return (
    <div className="dev-bios">
      <div className="inner">
        <h1>About Us</h1>
        <div className="create-text centered">
          We are the Techy Blinders; an innovative team of developers with
          incredible code that will leave you stunned.
        </div>
		<h1>Meet the Team</h1>
        <Execs />
      </div>
    </div>
  );
}

export default Bios;
