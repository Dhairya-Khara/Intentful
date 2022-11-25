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
        name="Berke Altiparmak"
        pic={BerkePic}
        positions={[Roles.backend]}
      >
        <GitHub>BerkeAltiparmak</GitHub>
        <LinkedIn>https://www.linkedin.com/in/berke-altiparmak/</LinkedIn>
      </Bio>
      <Bio name="Chenika Bukes" 
           pic={ChenikaPic} 
           positions={[Roles.backend, Roles.frontend]}>
        
        <GitHub>chenikabukes</GitHub>
        <LinkedIn>
        https://www.linkedin.com/in/chenika-bukes-754398245/
        </LinkedIn>
      </Bio>
      <Bio
        name="Krishna Cheemalapati"
        pic={KrishnaPic}
        positions={[Roles.frontend, Roles.designer]}
      >
        <Website>https://krishnacheemalapati.github.io</Website>
        <GitHub>krishnacheemalapati</GitHub>
        <LinkedIn>https://linkedin.com/in/krishnacheemalapati</LinkedIn>
      </Bio>
      <Bio
        name="Dhairya Khara"
        pic={DhairyaPic}
        positions={[Roles.teamLead, Roles.backend]}
      >
        <Website>https://dhairya-khara.github.io/personal-website/</Website>
        <GitHub>DhairyaKhara</GitHub>
        <LinkedIn>https://www.linkedin.com/in/dhairya-khara/</LinkedIn>
      </Bio>
      <Bio
        name="Aidan Li"
        pic={AidanPic}
        positions={[Roles.backend]}
      >
        <GitHub>aidanmrli</GitHub>
        <LinkedIn>https://www.linkedin.com/in/aidan-li/</LinkedIn>
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
