import React from "react";

// Zoho Sales IQ widget code
export default function ZohoSalesIQ(props) {
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || {
        widgetcode: "fb692d75e56b9ef8a602b9140461303ab23262f3fa05af9f10890001872063a8",
        values: {},
        ready: function () {},
    };
    const d = document;
    let s;
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.id = 'zsiqscript';
    s.defer = true;
    s.src = 'https://salesiq.zoho.com/widget';
    let t;
    t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
    return (
        <React.Fragment>
            <div id='zsiqwidget'></div>
        </React.Fragment>
    );
}