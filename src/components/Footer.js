import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        <h3>Usefull Links</h3>
        <div className="footerImg">
          <div>
            <div>
              <a href="https://www.rdw.nl/over-rdw">
                <img src="https://logovtor.com/wp-content/uploads/2020/01/rdw-logo-vector.png" />
                <span>Rijksdienst voor het Wegverkeer (RDW)</span>
              </a>
            </div>
            <div>
              <a href="https://www.cbr.nl/nl.htm">
                <img src="https://www.mijnhuisartsgoirle.nl/wp-content/uploads/sites/138/2019/10/Afbeelding-CBR-logo-300x182.png" />
                <span>Centraal Bureau Rijvaardigheid (CBR)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
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
    </footer>
  );
};

export default Footer;
