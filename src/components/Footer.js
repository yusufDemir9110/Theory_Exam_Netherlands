import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Footer = () => {
  const { language } = useContext(GlobalContext);
  return (
    <footer>
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
          </div>
        </div>
      </div>
      <div>
        {language === "English" ? (
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
        ) : (
          <h6>
            <a
              href="https://www.linkedin.com/in/yusuf-demir-91439719b/"
              target="_blank"
              rel="noreferrer"
            >
              Yusuf Demir
            </a>{" "}
            tarafindan tasarlanmistir
          </h6>
        )}
      </div>
    </footer>
  );
};

export default Footer;
