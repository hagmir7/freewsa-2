import {React} from "react";
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";



function About() {
  const {t} = useTranslation()
  return (
    <div className="About">
      <Helmet>
        <title>{t("About Us - FreeWsad")}</title>
        <link rel='canonical' href="/policy" />
      </Helmet>
          <div className="container">
            <div className="row">
            <div className='card shadow-sm p-3'>
            <h1 className="h4">{t("About Us")}.</h1>
            <p>We respect the property rights of others, and are always keen not to violate their rights, so authors and publishing houses have the right to demand the removal of a download link for a book from the site. If you find a book that belongs to you and do not agree to the publication of the download link for the book, or you have a suggestion or complaint, write to us through the Contact Us page, or by e-mail at: supprot@freewsad.com
            </p>
            <p>We also confirm our full commitment to preserving the intellectual property rights and copyrights of books and that they belong to their owners and publishing houses, and we strive to publish books whose owners have authorized the right to publish them electronically, and we do not seek at all to violate the rights of others, and in the event that a book has ownership rights, we have put a link to request the deletion of a book We will not hesitate to remove any book that we find to be proprietary.
            </p>
            <p>We also strive to spread knowledge and make it available to the Arab reader, by providing useful content and distinguished books in various sciences. We believe that knowledge has no homeland, and that it is a general right that we must strive to circulate and disseminate, not restrict and besiege it.
            </p>
            <p>We thank you for visiting the site, and we hope that you will always be our friend, convey a positive idea, and contribute to the dissemination of the site through social networking sites for the benefit of all.
            </p>
            <p>Be philanthropic and help others reach the library.</p>
            <p>
              The site is a library of e-books, ideas and programming codes that seeks to spread awareness, culture and knowledge among different segments of the world through the participation of international books and articles in all fields and in most knowledge and scientific disciplines, in addition to definitions of translated global programming languages ​​and providing them for free and easier download Methods on smart devices and our belief that knowledge should reach everyone who searches for it while keeping pace with technical and technological developments that necessitated resorting to such type of libraries for easy access to and obtaining books and software topics required with ease.

            </p>
            <p>All rights to books or articles belong to their authors in terms of printing, publishing and privacy.
              Our site does not infringe any copyright, copyright, publishing or infringement of the book authors. All books available in the library are for free download.
            </p>
        </div>
            </div>
          </div>
    </div>
  );
}

export default About;