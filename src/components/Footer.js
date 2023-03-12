import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Contact from "./Contact";

const Footer = () => {
  const { language } = useContext(GlobalContext);
  return (
    <footer>
      <div className="footerSub">
        <Contact />
        <div>
          {language === "English" ? (
            <h3>Useful Links</h3>
          ) : (
            <h3>Yararlı Linkler</h3>
          )}
          <div className="footerImg">
            <div>
              <div>
                <a href="https://www.rdw.nl/over-rdw">
                  <img
                    src="https://logovtor.com/wp-content/uploads/2020/01/rdw-logo-vector.png"
                    alt="RDW Logo"
                  />
                  <span>Rijksdienst voor het Wegverkeer (RDW)</span>
                </a>
              </div>
              <div>
                <a href="https://www.cbr.nl/nl.htm">
                  <img
                    src="https://www.mijnhuisartsgoirle.nl/wp-content/uploads/sites/138/2019/10/Afbeelding-CBR-logo-300x182.png"
                    alt="CBR Logo"
                  />
                  <span>Centraal Bureau Rijvaardigheid (CBR)</span>
                </a>
              </div>
              <div>
                <a href="https://www.mobielschademelden.nl">
                  <img
                    src="https://www.mobielschademelden.nl/assets/images/logo.png"
                    alt="Mobiel Schademelden Logo"
                  />
                  <span>Mobiel Schademelden</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {language === "English" ? (
          <div className="footerText">
            <h6>
              Designed By{" "}
              <a
                href="https://www.linkedin.com/in/yusuf-demir-91439719b/"
                target="_blank"
                rel="noreferrer"
              >
                Yusuf Demir
              </a>{" "}
            </h6>
          </div>
        ) : (
          <div className="footerText">
            <h6>
              <a
                href="https://www.linkedin.com/in/yusuf-demir-91439719b/"
                target="_blank"
                rel="noreferrer"
              >
                Yusuf Demir
              </a>{" "}
              tarafından tasarlanmıştır
            </h6>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
