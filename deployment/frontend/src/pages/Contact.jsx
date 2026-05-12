import { Mail, MapPin, University, UserRound } from 'lucide-react';

export default function Contact() {
  return (
    <section className="infoPage">

      {/* ✅ FIXED HERO SPACING */}
      <div className="infoSection infoHeroSection">
        <div className="infoHero">

          {/* cleaned title style */}
          <h1 className="titleRow">
            Contact Our Team <span className="arabicTitle">  | اتصل بنا</span>
          </h1>

          <p>
            For questions, collaboration opportunities, access requests, or academic use
            of the QAMAR resource, please contact the project maintainer.
          </p>

        </div>
      </div>

      {/* ✅ CLEAN CARD SECTION */}
      <div className="infoSection infoWhiteSection">
        <div className="infoSectionInner">

          <div className="contactCard">

            <div className="contactRow">
              <UserRound />
              <div>
                <h3>Sara Faqihi</h3>
                <p>PhD Candidate – Arabic NLP</p>
              </div>
            </div>

            <div className="contactDivider"></div>

            <div className="contactRow">
              <Mail />
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:sara_faqihi@um5.ac.ma">
                    sara_faqihi@um5.ac.ma
                  </a>
                </p>
              </div>
            </div>

            <div className="contactDivider"></div>

            <div className="contactRow">
              <University />
              <div>
                <h3>Institution</h3>
                <p>Mohammadia School of Engineers (EMI)</p>
                <p>Mohammed V University, Morocco</p>
              </div>
            </div>

            <div className="contactDivider"></div>

            <div className="contactRow">
              <MapPin />
              <div>
                <h3>Research Area</h3>
                <p>Arabic NLP, Quranic Arabic morphology, and linguistic resources</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}