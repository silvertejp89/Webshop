import "../scss/main.scss";

import { createFooterHtml } from "./Components/footer";

import { createNavbar } from "./Components/nav.ts";
import { navbarHideShowScroll } from "./Components/nav.ts";

createFooterHtml();

createNavbar();

navbarHideShowScroll();
