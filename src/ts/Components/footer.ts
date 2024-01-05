import "../../scss/main.scss";

// Function to create footer

export const createFooterHtml = () => {
  const container = document.createElement("footer");
  container.id = "sandqvist_footer";

  // Footer Containers
  const footerLinks = document.createElement("div");
  const footerContactLinks = document.createElement("div");
  const footerNavButtons = document.createElement("div");
  const footerFaqLinks = document.createElement("div");

  // Add classes to footers
  footerLinks.classList.add("footer_links");
  footerContactLinks.classList.add("footer_contact__links");
  footerNavButtons.classList.add("footer_nav__buttons");
  footerFaqLinks.classList.add("footer_faq__links");

  // Create a contact us title
  const contactTitle = document.createElement("p");
  contactTitle.textContent = "CONTACT US";
  contactTitle.classList.add("contact_list__title");

  // Create unordered lists for footer items
  const ulCategories = document.createElement("ul");
  const ulFAQ = document.createElement("ul");
  const ulContact = document.createElement("ul");
  const ulButtons = document.createElement("ul");

  // Append the contact us title to the ul for contact details
  ulContact.appendChild(contactTitle);

  ulFAQ.classList.add("footer_faq__links");

  // Create category links
  const linkTexts = ["Fusion", "Hike", "Urban Outdoor", "Everyday Originals"];

  for (let i = 0; i < linkTexts.length; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = linkTexts[i];
    link.setAttribute("id", linkTexts[i].toLowerCase().replace(/\s/g, "-"));
    li.appendChild(link);
    ulCategories.appendChild(li);
  }

  // Create FAQ Links
  const faqLinks = [
    "Delivery & Returns",
    "Payment",
    "Sustainability",
    "FAQ",
    "Stores",
  ];

  for (let i = 0; i < faqLinks.length; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = faqLinks[i];
    li.appendChild(link);
    ulFAQ.appendChild(li);
  }

  // Create contact links
  const contactLinks = ["0761338833", "info@sandqvist.com"];

  for (let i = 0; i < contactLinks.length; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `mailto:${contactLinks[i]}`;
    link.textContent = contactLinks[i];
    ulContact.classList.add("footer_list__contact");
    li.appendChild(link);
    ulContact.appendChild(li);
  }

  // Create SoMe Buttons
  const socialLinks = ["Instagram", "Facebook", "TikTok"];

  for (let i = 0; i < socialLinks.length; i++) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = socialLinks[i];
    ulButtons.classList.add("footer_list__button");
    link.setAttribute("id", `footer_${socialLinks[i]}__button`.toLowerCase());
    li.appendChild(link);
    ulButtons.appendChild(li);
  }

  // Append all the lists to the main footer wrapper
  container.appendChild(footerLinks);
  footerLinks.appendChild(ulCategories);
  footerFaqLinks.appendChild(ulFAQ);
  footerContactLinks.appendChild(ulContact);
  footerNavButtons.appendChild(ulButtons);
  container.appendChild(footerFaqLinks);
  container.appendChild(footerContactLinks);
  container.appendChild(footerNavButtons);
  return container;
};

// Add the footer to the dom
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const footer = createFooterHtml();
  body.appendChild(footer);
});
