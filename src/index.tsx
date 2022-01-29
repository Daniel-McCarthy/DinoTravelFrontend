import * as React from "react";
import * as ReactDOM from "react-dom";

// We load PageRouting so that we can redirect the app to different
// components depending on the url give, simulating multiple pages.
import { PageRouting } from "./PageRouting";

ReactDOM.render(
    <PageRouting/>,
    document.getElementById("DinoTravelEntryPoint")
);
