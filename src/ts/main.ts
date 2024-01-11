import "../scss/main.scss";

import { createFooterHtml } from "./Components/footer";

import { createNavbar } from "./Components/nav";
import { createHamburgerOpen } from "./Components/nav";
import { navbarHideShowScroll } from "./Components/nav";

createFooterHtml();

createNavbar();

navbarHideShowScroll();
