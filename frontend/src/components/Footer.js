import "../styles/footer.css";

function Footer() {
  const logos = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Old_Visa_Logo.svg/1090px-Old_Visa_Logo.svg.png",
    },
    {
      image:
        "https://freelogopng.com/images/all_img/1655830761shopify-logo-png.png",
    },
    {
      image:
        "https://www.seekpng.com/png/detail/359-3598989_badges-for-light-backgrounds-mcafee-secure.png",
    },
    {
      image:
        "https://www.pngall.com/wp-content/uploads/2/SSL-PNG-Image-File.png",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/MasterCard_early_1990s_logo.svg",
    },
  ];
  return (
    <>
      <div className="footer">
        {logos.map((item, index) => (
          <div key={index} className="vis-container">
            <img src={item.image} alt="vis" className="vis-image" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Footer;
